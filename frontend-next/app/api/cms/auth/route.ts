import { NextRequest, NextResponse } from "next/server";
import {
  CMS_COOKIE_NAME,
  CMS_ADMIN_USER,
  checkLoginRateLimit,
  recordFailedLogin,
  recordSuccessfulLogin,
  validateAdminCredentials,
  createSessionToken,
  verifyAdminSession,
} from "@/src/utils/cmsAuth";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const body = await req.json().catch(() => ({}));
    const { action, username, password } = body;

    // Logout request
    if (action === "logout") {
      const response = NextResponse.json({ success: true, message: "Logged out" });
      response.cookies.delete(CMS_COOKIE_NAME);
      return response;
    }

    // Brute-force rate limit check
    const rateCheck = checkLoginRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Account temporarily shielded. Please try again in ${rateCheck.retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    // Login attempt
    const trimUser = typeof username === "string" ? username.trim() : "";
    const trimPass = typeof password === "string" ? password.trim() : "";

    if (!trimUser || !trimPass) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(trimUser, trimPass);

    if (isValid) {
      recordSuccessfulLogin(ip);

      const sessionToken = createSessionToken(trimUser);
      const isProduction = process.env.NODE_ENV === "production";

      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
        user: {
          username: trimUser,
          name: "Ash Ali Admin",
          role: "Super Admin",
          avatar: "/press/ash-press-1.jpg",
        },
      });

      // Set hardened HttpOnly cookie (7 days)
      response.cookies.set({
        name: CMS_COOKIE_NAME,
        value: sessionToken,
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    // Failed login: record attempt
    const failStatus = recordFailedLogin(ip);
    const errorMsg = failStatus.locked
      ? `Too many failed attempts. Temporary lockout activated for ${failStatus.retryAfterSeconds} seconds.`
      : `Invalid username or password. (${failStatus.remainingAttempts} attempts remaining before temporary lockout)`;

    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth POST error:", error);
    return NextResponse.json({ success: false, error: "Auth request failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = verifyAdminSession(req);

    if (session.valid) {
      return NextResponse.json({
        authenticated: true,
        user: {
          username: session.user || CMS_ADMIN_USER,
          name: "Ash Ali Admin",
          role: "Super Admin",
        },
      });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error("Auth GET error:", error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
