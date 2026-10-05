import { NextRequest, NextResponse } from "next/server";

const VALID_USER = "admin";
const VALID_PASS = "admin";
const AUTH_COOKIE = "cms_admin_session";
const SESSION_TOKEN = "ashali_cms_authenticated_session_token_2026";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, username, password } = body;

    if (action === "logout") {
      const response = NextResponse.json({ success: true, message: "Logged out" });
      response.cookies.delete(AUTH_COOKIE);
      return response;
    }

    // Login attempt
    const trimUser = (username || "").trim();
    const trimPass = (password || "").trim();

    if (trimUser === VALID_USER && trimPass === VALID_PASS) {
      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
        user: {
          username: "admin",
          name: "Ash Ali Admin",
          role: "Super Admin",
          avatar: "/press/ash-press-1.jpg",
        },
      });

      // Set cookie for 7 days
      response.cookies.set({
        name: AUTH_COOKIE,
        value: SESSION_TOKEN,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth POST error:", error);
    return NextResponse.json({ success: false, error: "Auth request failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get(AUTH_COOKIE);
    const isAuthenticated = cookie?.value === SESSION_TOKEN;

    if (isAuthenticated) {
      return NextResponse.json({
        authenticated: true,
        user: {
          username: "admin",
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
