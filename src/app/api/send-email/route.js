import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #3B82F6 0%, #F97316 100%);
              color: white;
              padding: 20px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              border: 1px solid #e0e0e0;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 5px;
              border-left: 4px solid #3B82F6;
            }
            .field-label {
              font-weight: bold;
              color: #666;
              margin-bottom: 5px;
              text-transform: uppercase;
              font-size: 12px;
            }
            .field-value {
              color: #333;
              font-size: 14px;
            }
            .message-field {
              border-left-color: #F97316;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>Marhaba Furniture Movers & Packers</p>
          </div>

          <div class="content">
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${name}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value"><a href="mailto:${email}">${email}</a></div>
            </div>

            ${phone ? `
            <div class="field">
              <div class="field-label">Phone</div>
              <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
            </div>
            ` : ''}

            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${subject}</div>
            </div>

            <div class="field message-field">
              <div class="field-label">Message</div>
              <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>

          <div class="footer">
            <p>This email was sent from the contact form on marhabamovers.ae</p>
            <p>© ${new Date().getFullYear()} Marhaba Furniture Movers & Packers</p>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Marhaba Movers Contact <onboarding@resend.dev>', // You'll need to verify your domain with Resend
      to: process.env.CONTACT_EMAIL || 'hamdullahs046@gmail.com', // Your email address
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: emailHtml,
    });

    // Send auto-reply to the customer
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for contacting Marhaba Movers</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #3B82F6 0%, #F97316 100%);
              color: white;
              padding: 30px;
              border-radius: 10px;
              text-align: center;
            }
            .content {
              padding: 30px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: linear-gradient(135deg, #3B82F6 0%, #F97316 100%);
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Thank You for Contacting Us!</h1>
            <p>We've received your message and will respond shortly</p>
          </div>

          <div class="content">
            <p>Dear ${name},</p>

            <p>Thank you for reaching out to Marhaba Furniture Movers & Packers. We have received your inquiry and our team will review it shortly.</p>

            <p>We typically respond within 2-4 hours during business hours. For urgent requests, feel free to call us directly:</p>

            <p style="text-align: center;">
              <strong>📞 +971 568 011 076</strong>
            </p>

            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your request</li>
              <li>We'll prepare a customized quote based on your needs</li>
              <li>A representative will contact you via email or phone</li>
            </ul>

            <p style="text-align: center;">
              <a href="https://marhabamovers.ae" class="button">Visit Our Website</a>
            </p>

            <p><strong>Your Message:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${message}
            </p>
          </div>

          <div class="footer">
            <p><strong>Marhaba Furniture Movers & Packers</strong></p>
            <p>Professional Moving Services in Dubai & UAE</p>
            <p>📧 info@marhabamovers.ae | 📞 +971 568 011 076</p>
            <p>© ${new Date().getFullYear()} All rights reserved</p>
          </div>
        </body>
      </html>
    `;

    // Send auto-reply
    await resend.emails.send({
      from: 'Marhaba Movers <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting Marhaba Movers',
      html: autoReplyHtml,
    });

    return NextResponse.json(
      { message: 'Email sent successfully', id: data.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}