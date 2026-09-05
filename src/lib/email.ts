import nodemailer from 'nodemailer';

export interface SendEnquiryEmailParams {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  createdAt: string;
}

export interface SendEnquiryEmailResult {
  sent: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a notification email via Zoho Mail SMTP upon receiving a new website enquiry.
 * Follows database-first reliability: fails gracefully without exposing sensitive credentials or crashing the request.
 */
export async function sendEnquiryNotificationEmail(
  params: SendEnquiryEmailParams
): Promise<SendEnquiryEmailResult> {
  const host = process.env.ZOHO_SMTP_HOST || 'smtppro.zoho.eu';
  const port = parseInt(process.env.ZOHO_SMTP_PORT || '465', 10);
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASSWORD;
  const fromEmail = process.env.ZOHO_FROM_EMAIL || user;
  const toEmail = process.env.ZOHO_TO_EMAIL || fromEmail;

  // Check if Zoho credentials are provided
  if (!user || !pass || !fromEmail || !toEmail) {
    console.warn(
      '[Zoho Mail] SMTP credentials not fully configured in environment (ZOHO_SMTP_USER / ZOHO_SMTP_PASSWORD). Notification skipped.'
    );
    return {
      sent: false,
      error: 'Zoho SMTP credentials not configured.',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for port 465 (SSL), false for 587 (TLS)
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const emailSubject = `New Website Enquiry — ${params.subject || 'General Enquiry'}`;

    const textBody = `New enquiry received from Zalia Properties website.

Name:
${params.fullName}

Email:
${params.email}

Phone:
${params.phone || 'Not provided'}

Subject:
${params.subject || 'General Enquiry'}

Message:
${params.message}

Submitted:
${params.createdAt}

Submission ID:
${params.id}`;

    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${emailSubject}</title>
</head>
<body style="margin: 0; padding: 30px; background-color: #F7F8F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111713; line-height: 1.6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
    <tr>
      <td style="background-color: #07381E; padding: 28px 32px;">
        <span style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #EBF2EE; display: block; margin-bottom: 4px;">Zalia Properties Ltd</span>
        <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 500;">New Website Enquiry Received</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <p style="margin-top: 0; font-size: 14px; color: #5F6661;">A prospective client or partner has submitted an enquiry through the Zalia Properties website:</p>

        <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px; border-collapse: collapse; margin: 20px 0;">
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td width="30%" style="font-weight: 600; color: #111713; padding: 10px 0;">Full Name</td>
            <td style="color: #374151; padding: 10px 0;">${escapeHtml(params.fullName)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="font-weight: 600; color: #111713; padding: 10px 0;">Email</td>
            <td style="color: #374151; padding: 10px 0;"><a href="mailto:${encodeURIComponent(params.email)}" style="color: #07381E; text-decoration: underline;">${escapeHtml(params.email)}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="font-weight: 600; color: #111713; padding: 10px 0;">Phone</td>
            <td style="color: #374151; padding: 10px 0;">${params.phone ? escapeHtml(params.phone) : '<span style="color: #9CA3AF;">Not provided</span>'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="font-weight: 600; color: #111713; padding: 10px 0;">Subject</td>
            <td style="color: #374151; padding: 10px 0;">${escapeHtml(params.subject || 'General Enquiry')}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F3F4F6;">
            <td style="font-weight: 600; color: #111713; padding: 10px 0;">Submitted</td>
            <td style="color: #374151; padding: 10px 0;">${escapeHtml(params.createdAt)}</td>
          </tr>
          <tr>
            <td style="font-weight: 600; color: #111713; padding: 10px 0;">Submission ID</td>
            <td style="font-family: monospace; font-size: 12px; color: #6B7280; padding: 10px 0;">${escapeHtml(params.id)}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <h3 style="font-size: 14px; font-weight: 600; color: #111713; margin-bottom: 8px;">Message & Particulars:</h3>
          <div style="background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 10px; padding: 16px; font-size: 14px; color: #1F2937; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(params.message)}</div>
        </div>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center;">
          <a href="mailto:${encodeURIComponent(params.email)}?subject=Re:%20${encodeURIComponent(params.subject || 'Your enquiry with Zalia Properties')}" style="display: inline-block; background-color: #07381E; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 9999px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em;">
            Reply to ${escapeHtml(params.fullName)}
          </a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #F7F8F6; padding: 16px 32px; font-size: 11px; color: #848B86; text-align: center; border-top: 1px solid #E5E7EB;">
        Zalia Properties Ltd · Confidential Acquisition & Enquiry Transmission · Source: Website
      </td>
    </tr>
  </table>
</body>
</html>`;

    const info = await transporter.sendMail({
      from: `"${fromEmail.split('@')[0].toUpperCase()} - Zalia Properties" <${fromEmail}>`,
      to: toEmail,
      replyTo: params.email,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    });

    return {
      sent: true,
      messageId: info.messageId,
    };
  } catch (err: any) {
    // Log server error safely without exposing passwords
    console.error('[Zoho Mail] SMTP dispatch failed:', err?.message || err);
    return {
      sent: false,
      error: err?.message || 'Failed to dispatch email notification.',
    };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
