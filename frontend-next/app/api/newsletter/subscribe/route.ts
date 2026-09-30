import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getTransporter, MAIL_USER, OWNER_EMAIL } from "@/src/utils/mailer";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

    const body = await req.json().catch(() => ({}));
    const { name, email, website_hp } = body;

    // 1. Honeypot verification: reject bot spam
    if (website_hp && String(website_hp).trim().length > 0) {
      return NextResponse.json(
        { success: false, message: "Bot submission detected and rejected." },
        { status: 400 }
      );
    }

    // 2. IP rate limiting
    if (!checkRateLimit(ip, 8, 3600000)) {
      return NextResponse.json(
        { success: false, message: "Too many signups from this IP. Please try again later." },
        { status: 429 }
      );
    }

    // 3. Email validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    const emailSubject = "ashali.com enquiry: newsletter signup";

    // 4. Send notification email to Ash
    const transporter = getTransporter();

    if (!transporter) {
      console.warn("Newsletter email skipped: MAIL_USER / MAIL_PASS not configured in environment.");
      return NextResponse.json({
        success: true,
        message: "Thank you for subscribing!",
      });
    }

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 6px; background: #fafafa;">
        <h2 style="color: #111; margin-top: 0; border-bottom: 2px solid #FF781D; padding-bottom: 12px;">New newsletter subscription</h2>
        <p style="font-size: 14px; color: #444;">A new subscriber joined via the newsletter form on <strong>ashali.com</strong>:</p>
        <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 4px; overflow: hidden; margin: 16px 0;">
          <tr><td style="padding:6px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Name:</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #eee;">${name || "Subscriber"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Email:</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
        </table>
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
      text: `New newsletter subscription\nName: ${name || "Subscriber"}\nEmail: ${email}`,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
