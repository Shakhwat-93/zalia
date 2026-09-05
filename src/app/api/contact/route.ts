import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-admin';
import { sendEnquiryNotificationEmail } from '@/lib/email';

// Rate limiting: IP -> last request timestamp
const ipRateLimitMap = new Map<string, number>();

// Duplicate submission guard: Hash/Key -> timestamp (15s window)
const recentSubmissions = new Map<string, number>();

// Clean up maps periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  ipRateLimitMap.forEach((timestamp, ip) => {
    if (now - timestamp > 60000) ipRateLimitMap.delete(ip);
  });
  recentSubmissions.forEach((timestamp, key) => {
    if (now - timestamp > 60000) recentSubmissions.delete(key);
  });
}, 60000);

// Sanitize string to remove dangerous tags / scripts
function sanitize(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

// RFC 5322 compliant basic email check
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Request Body Size Guard (max 50KB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 50000) {
      return NextResponse.json(
        { success: false, error: 'Payload exceeds acceptable size limit.' },
        { status: 413 }
      );
    }

    // 2. IP Rate Limiting (1 request per 3 seconds per client IP)
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    const now = Date.now();
    const lastRequest = ipRateLimitMap.get(clientIp);
    if (lastRequest && now - lastRequest < 3000) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }
    ipRateLimitMap.set(clientIp, now);

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed or invalid JSON payload.' },
        { status: 400 }
      );
    }

    // 3. Anti-Spam Honeypot Check (Silently acknowledge bots without executing actions)
    if (body.website_url || body.honeypot || body.confirm_email) {
      return NextResponse.json({
        success: true,
        message: "Thank you. Your enquiry has been received. We'll be in touch shortly.",
      });
    }

    // 4. Extract & Normalize Fields (support both full_name and legacy name)
    const rawFullName = body.full_name || body.name || '';
    const rawEmail = body.email || '';
    const rawPhone = body.phone || '';
    const rawSubject = body.subject || body.enquiry_type || body.propertyType || '';
    const rawMessage = body.message || '';
    const rawSource = body.source || body.source_page || 'website';

    const fullName = sanitize(rawFullName);
    const email = sanitize(rawEmail).toLowerCase();
    const phone = sanitize(rawPhone);
    const subject = sanitize(rawSubject);
    const message = sanitize(rawMessage);
    const source = sanitize(rawSource);

    // 5. Server-Side Validation
    // - full_name: required, 2-120 chars
    if (!fullName || fullName.length < 2 || fullName.length > 120) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name (2–120 characters).' },
        { status: 400 }
      );
    }

    // - email: required, valid format, max 254 chars
    if (!email || !isValidEmail(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // - phone: optional, max 40 chars
    if (phone && phone.length > 40) {
      return NextResponse.json(
        { success: false, error: 'Telephone number is too long (maximum 40 characters).' },
        { status: 400 }
      );
    }

    // - subject: optional, max 150 chars
    if (subject && subject.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Subject is too long (maximum 150 characters).' },
        { status: 400 }
      );
    }

    // - message: required, 5-5000 chars
    if (!message || message.length < 5 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Please include a message outlining your enquiry (5–5,000 characters).' },
        { status: 400 }
      );
    }

    // 6. Duplicate Submission Protection (identical email + message within 15 seconds)
    const submissionFingerprint = `${email}::${message.slice(0, 80)}`;
    const lastSubmitted = recentSubmissions.get(submissionFingerprint);
    if (lastSubmitted && now - lastSubmitted < 15000) {
      return NextResponse.json(
        { success: false, error: 'A duplicate enquiry was recently received. Please allow our team time to respond.' },
        { status: 409 }
      );
    }
    recentSubmissions.set(submissionFingerprint, now);

    // 7. Database-First Insertion (Supabase PostgreSQL via Admin Service Role)
    const supabase = createAdminSupabaseClient();
    const { data: record, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          full_name: fullName,
          name: fullName, // legacy field sync
          email,
          phone: phone || null,
          subject: subject || 'General Enquiry',
          enquiry_type: subject || 'General Enquiry', // legacy field sync
          message,
          source: source || 'website',
          source_page: source || 'website', // legacy field sync
          status: 'new',
          email_sent: false,
          email_sent_at: null,
        },
      ])
      .select('id, created_at')
      .single();

    if (dbError || !record?.id) {
      console.error('[Supabase] Failed to store contact submission:', dbError?.message || dbError);
      return NextResponse.json(
        {
          success: false,
          error: 'An error occurred recording your enquiry. Please try again or contact us directly.',
        },
        { status: 500 }
      );
    }

    const submissionId = record.id;
    const createdAt = record.created_at || new Date().toISOString();

    // 8. Attempt Zoho Mail Notification (Post-database execution)
    // Database record is ALREADY safely stored and will never be lost.
    try {
      const emailResult = await sendEnquiryNotificationEmail({
        id: submissionId,
        fullName,
        email,
        phone,
        subject,
        message,
        createdAt,
      });

      if (emailResult.sent) {
        // Mark as sent in database
        await supabase
          .from('contact_submissions')
          .update({
            email_sent: true,
            email_sent_at: new Date().toISOString(),
          })
          .eq('id', submissionId);
      } else {
        console.warn(
          `[Zoho Mail] Email notification not dispatched for submission ${submissionId}: ${emailResult.error}`
        );
      }
    } catch (emailErr: any) {
      console.error('[Zoho Mail] Unexpected error during notification dispatch:', emailErr?.message || emailErr);
    }

    // 9. Return Controlled Success Response
    return NextResponse.json({
      success: true,
      message: "Thank you. Your enquiry has been received. We'll be in touch shortly.",
      submissionId,
    });
  } catch (err: any) {
    console.error('Server error handling contact submission:', err?.message || err);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing enquiry.' },
      { status: 500 }
    );
  }
}
