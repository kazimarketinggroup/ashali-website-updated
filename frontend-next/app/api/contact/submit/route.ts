import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getTransporter, MAIL_USER, OWNER_EMAIL } from "@/src/utils/mailer";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

    const body = await req.json().catch(() => ({}));
    const { name, email, type, message, details, website_hp } = body;

    // 1. Honeypot verification: bots populate hidden fields
    if (website_hp && String(website_hp).trim().length > 0) {
      return NextResponse.json(
        { success: false, message: "Bot submission detected and rejected." },
        { status: 400 }
      );
    }

    // 2. IP rate limiting (a few submissions per IP per hour)
    if (!checkRateLimit(ip, 8, 3600000)) {
      return NextResponse.json(
        { success: false, message: "Too many enquiries submitted from this IP. Please try again in an hour." },
        { status: 429 }
      );
    }

    // 3. Field validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    // 4. Construct enquiry type and subject according to client spec
    // Spec: "ashali.com enquiry: [enquiry type]"
    let enquiryLabel = type ? String(type).toLowerCase() : "general";
    if (details && details.enquiry_source === "Uhubs Report Download") {
      enquiryLabel = "uhubs report download";
    } else if (enquiryLabel === "impact") {
      enquiryLabel = "pro-bono";
    }

    const emailSubject = `ashali.com enquiry: ${enquiryLabel}`;

    // 5. Send notification email to Ash
    const transporter = getTransporter();

    if (!transporter) {
      console.warn("Contact email skipped: MAIL_USER / MAIL_PASS not configured in environment.");
      return NextResponse.json({
        success: true,
        message: "Thank you! Your enquiry has been submitted. We will be in touch soon.",
      });
    }

    const formattedDetails = details && typeof details === "object"
      ? Object.entries(details)
          .filter(([k, v]) => Boolean(v) && k !== "enquiry_source")
          .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">${k}:</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #eee;">${v}</td></tr>`)
          .join("")
      : "";

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 6px; background: #fafafa;">
        <h2 style="color: #111; margin-top: 0; border-bottom: 2px solid #FF781D; padding-bottom: 12px;">New website enquiry</h2>
        <p style="font-size: 14px; color: #444;">A new enquiry was submitted on <strong>ashali.com</strong>:</p>
        <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 4px; overflow: hidden; margin: 16px 0;">
          <tr><td style="padding:6px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Enquiry Type:</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #eee;text-transform:capitalize;">${enquiryLabel}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Name:</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Email:</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          ${formattedDetails}
        </table>
        ${message ? `<div style="background:#fff;padding:12px;border:1px solid #eee;border-radius:4px;margin-top:12px;"><strong style="color:#555;display:block;margin-bottom:6px;">Message:</strong><p style="margin:0;color:#222;white-space:pre-wrap;font-size:14px;">${message}</p></div>` : ""}
        <p style="font-size: 12px; color: #888; margin-top: 24px; text-align: center;">IP: ${ip} • Submitted via ashali.com</p>
      </div>
    `;

    const fromAddress = MAIL_USER ? `"ashali.com" <${MAIL_USER}>` : `"ashali.com" <${OWNER_EMAIL}>`;

    await transporter.sendMail({
      from: fromAddress,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: emailSubject,
      html,
      text: `New website enquiry\nType: ${enquiryLabel}\nName: ${name}\nEmail: ${email}\n${message ? `Message: ${message}\n` : ""}`,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your enquiry has been submitted. We will be in touch soon.",
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
