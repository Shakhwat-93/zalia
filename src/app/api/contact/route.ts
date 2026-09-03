import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase-admin';

// Simple in-memory rate limiting map (IP -> last timestamp)
const rateLimitMap = new Map<string, number>();

// Sanitize string to prevent XSS / malicious injection
function sanitize(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

// Basic email validation regex
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
  try {
    // 1. Payload size guard
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 50000) {
      return NextResponse.json(
        { success: false, error: 'Payload exceeds acceptable size limit.' },
        { status: 413 }
      );
    }

    // 2. IP Rate limiting guard (max 1 request per 3 seconds per client)
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    const now = Date.now();
    const lastRequest = rateLimitMap.get(clientIp);
    if (lastRequest && now - lastRequest < 3000) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }
    rateLimitMap.set(clientIp, now);

    const body = await req.json();

    // 3. Honeypot anti-spam check (if bot field is filled, silently succeed)
    if (body.website_url || body.honeypot || body.confirm_email) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' });
    }

    const rawName = body.name || body.full_name || '';
    const rawEmail = body.email || '';
    const rawPhone = body.phone || '';
    const rawSubject = body.subject || body.enquiry_type || body.propertyType || 'General Enquiry';
    const rawLocation = body.property_location || body.location || '';
    const rawMessage = body.message || '';
    const rawSource = body.source_page || body.source || '/contact';

    // 4. Strict Validation
    const name = sanitize(rawName);
    const email = sanitize(rawEmail).toLowerCase();
    const phone = sanitize(rawPhone);
    const subject = sanitize(rawSubject);
    const location = sanitize(rawLocation);
    const message = sanitize(rawMessage);
    const sourcePage = sanitize(rawSource);

    if (!name || name.length < 2 || name.length > 150) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name (2–150 characters).' },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email) || email.length > 254) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid corporate or personal email address.' },
        { status: 400 }
      );
    }

    if (!message || message.length < 5 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Please include a message outlining your enquiry (5–5000 characters).' },
        { status: 400 }
      );
    }

    // 5. Database Storage via Supabase (Server Admin Service Role)
    const supabase = createAdminSupabaseClient();
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          full_name: name,
          email,
          phone: phone || null,
          subject,
          enquiry_type: subject,
          property_location: location || null,
          message,
          source_page: sourcePage,
          status: 'new',
        },
      ])
      .select('id, created_at')
      .single();

    if (dbError) {
      console.error('Supabase contact submission error:', dbError);
      return NextResponse.json(
        { success: false, error: 'An error occurred recording your enquiry. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    // 6. Independent Email Notification (Protected with isolated try-catch)
    try {
      // In production, dispatch through transactional email provider (Postmark, Resend, Sendgrid, or SMTP)
      console.log('--- [ENQUIRY NOTIFICATION DISPATCH] ---');
      console.log(`To Admin: New Enquiry from ${name} <${email}>`);
      console.log(`Subject: [Zalia Enquiry] ${subject}`);
      console.log(`Message Snippet: ${message.slice(0, 100)}...`);
      console.log('----------------------------------------');
    } catch (emailErr) {
      // Log failure but DO NOT reject request - database submission succeeded
      console.warn('Non-blocking enquiry notification email failed:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your enquiry has been received by our acquisitions and design directors.',
      submissionId: submission?.id,
    });
  } catch (err: any) {
    console.error('Server error handling contact submission:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing enquiry.' },
      { status: 500 }
    );
  }
}
