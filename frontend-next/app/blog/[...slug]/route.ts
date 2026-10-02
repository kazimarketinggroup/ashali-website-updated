import { NextRequest, NextResponse } from "next/server";

// High-value topical mapping from old blog post slugs to their closest canonical equivalents
const TOPIC_MAPPINGS: { pattern: RegExp; destination: string }[] = [
  { pattern: /(keynote|speaking|talk|event|conference|presentation)/i, destination: "/speaking" },
  { pattern: /(unfair[-_]advantage|book|miles[-_]framework|author|hasan[-_]kubba)/i, destination: "/unfair-advantage" },
  { pattern: /(workshop|leadership[-_]lab|sales[-_]lab)/i, destination: "/workshops" },
  { pattern: /(advisory|consulting|mentor|coaching)/i, destination: "/advisory" },
  { pattern: /(just[-_]eat|venture|vc[-_]investment|portfolio)/i, destination: "/portfolio/just-eat" },
  { pattern: /(about|biography|story|background)/i, destination: "/about" },
];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const slugPath = slug ? slug.join("/") : "";

  // Check if this post maps to a relevant destination
  for (const { pattern, destination } of TOPIC_MAPPINGS) {
    if (pattern.test(slugPath)) {
      return NextResponse.redirect(new URL(destination, req.url), {
        status: 301,
        headers: {
          "Cache-Control": "public, max-age=86400, must-revalidate",
        },
      });
    }
  }

  // All other old /blog/* URLs: return HTTP 410 Gone (Permanently Removed)
  // This explicitly prevents Google from flagging soft 404s and tells search engines
  // to permanently drop the deprecated URL from their index.
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>410 Gone — Post Permanently Removed | Ash Ali</title>
  <meta name="robots" content="noindex, nofollow">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0a0a; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; box-sizing: border-box; text-align: center; }
    .box { max-width: 520px; }
    h1 { font-size: 32px; font-weight: 600; margin-bottom: 12px; }
    p { color: #888; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
    a { display: inline-block; background: #fff; color: #000; padding: 10px 24px; border-radius: 4px; font-weight: 500; text-decoration: none; font-size: 14px; }
    a:hover { background: #e0e0e0; }
  </style>
</head>
<body>
  <div class="box">
    <h1>410 — Content Gone</h1>
    <p>This post from the previous blog archive has been permanently removed and is no longer available.</p>
    <a href="/">Return to Homepage</a>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
}

export async function HEAD(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const slugPath = slug ? slug.join("/") : "";

  for (const { pattern, destination } of TOPIC_MAPPINGS) {
    if (pattern.test(slugPath)) {
      return NextResponse.redirect(new URL(destination, req.url), {
        status: 301,
        headers: {
          "Cache-Control": "public, max-age=86400, must-revalidate",
        },
      });
    }
  }

  return new NextResponse(null, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
}
