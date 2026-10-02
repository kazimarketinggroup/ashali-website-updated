import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, sendTransactionalEmail, verifyTurnstileToken, OWNER_EMAIL } from "@/src/utils/mailer";
import { subscribeToNewsletterPlatform } from "@/src/utils/newsletter";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

    const body = await req.json().catch(() => ({}));
    const { name, email, website_hp } = body;
    const turnstileToken = body.turnstileToken || body["cf-turnstile-response"];

    // 1. Honeypot verification: reject bot spam
    if (website_hp && String(website_hp).trim().length > 0) {
      return NextResponse.json(
        { success: false, message: "Bot submission detected and rejected." },
        { status: 400 }
      );
    }

    // 2. Cloudflare Turnstile verification
    const isTurnstileValid = await verifyTurnstileToken(turnstileToken, ip);
    if (!isTurnstileValid) {
      return NextResponse.json(
        { success: false, message: "Security verification failed. Please try again." },
        { status: 403 }
      );
    }

    // 3. Shared IP rate limiting (Upstash Redis or in-memory fallback)
    const isAllowed = await checkRateLimit(ip, 8, 3600000);
    if (!isAllowed) {
      return NextResponse.json(
        { success: false, message: "Too many signups from this IP. Please try again later." },
        { status: 429 }
      );
    }

    // 4. Email validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    // 5. Sync to newsletter platform (Kit / Beehiiv / Mailchimp) with double opt-in
    const platformSync = await subscribeToNewsletterPlatform({ email, name });

    const emailSubject = "ashali.com enquiry: newsletter signup";

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 6px; background: #fafafa;">
        <h2 style="color: #111; margin-top: 0; border-bottom: 2px solid #FF781D; padding-bottom: 12px;">New newsletter subscription</h2>
        <p style="font-size: 14px; color: #444;">A new subscriber joined via the newsletter form on <strong>ashali.com</strong>:</p>
        <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 4px; overflow: hidden; margin: 16px 0;">
          <tr><td style="padding:6px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Name:</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #eee;">${name || "Subscriber"}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Email:</td><td style="padding:6px 12px;color:#222;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          ${platformSync.synced ? `<tr><td style="padding:6px 12px;font-weight:600;color:#555;border-bottom:1px solid #eee;">Platform:</td><td style="padding:6px 12px;color:#0e9aa8;font-weight:bold;border-bottom:1px solid #eee;">Synced to ${platformSync.provider} (Double Opt-In Pending)</td></tr>` : ""}
        </table>
        <p style="font-size: 12px; color: #888; margin-top: 24px; text-align: center;">IP: ${ip} • Submitted via ashali.com</p>
      </div>
    `;

    // 6. Deliver notification via transactional provider (Resend) or fallback
    await sendTransactionalEmail({
      to: OWNER_EMAIL,
      replyTo: email,
      subject: emailSubject,
      html,
      text: `New newsletter subscription\nName: ${name || "Subscriber"}\nEmail: ${email}\n${platformSync.synced ? `Synced to: ${platformSync.provider}` : ""}`,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! Please check your inbox to confirm your subscription.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
