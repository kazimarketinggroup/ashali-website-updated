import type { MetadataRoute } from "next";

import { SITE_ORIGIN } from "@/src/constants/site";
import { UPDATE_POSTS } from "@/src/Components/Pages/LatestUpdates/updatesData";

/*
  Native Next.js sitemap — served at /sitemap.xml.

  INCLUSION RULE: a URL belongs here only if it is canonical, live, indexable
  and returns 200. A sitemap is a statement that a page is worth indexing, so
  anything carrying `robots: { index: false }` must NOT be listed — telling
  Google "index this" and "don't index this" at once is a contradiction it
  resolves by distrusting the sitemap.

  Consequently these are deliberately EXCLUDED:

  - The 10 placeholder routes (/blog, /faq, /privacy, /terms, /podcast,
    /radio-show, /investment, /results-media, /quotes, /media). They render
    "This page is coming soon" over ~256 words of header/footer chrome and are
    noindexed at the page level. Move a route into `CONTENT_ROUTES` below the
    moment it gets real content — and delete its noindex export at the same
    time.
  - 404s and the catch-all: /book, /workshop and /unlock are broken internal
    links with no matching route.
  - Any non-canonical host. Every URL is built from SITE_ORIGIN, which is the
    www host, because the apex 307-redirects to it. A sitemap containing
    redirecting URLs wastes crawl budget and muddies canonicalisation.

  The base URL is read from SITE_ORIGIN (NEXT_PUBLIC_SITE_URL) rather than
  hardcoded, so a preview deployment cannot publish a sitemap full of
  production URLs.
*/

/** Route paths with real content, grouped by how central they are to the site. */
const CONTENT_ROUTES = [
  // Primary pages — the commercial core of the site.
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/speaking", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/workshops", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/advisory", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/unfair-advantage", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },

  // Impact / portfolio.
  { path: "/impact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/portfolio", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/portfolio/uhubs", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/portfolio/just-eat", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/portfolio/fare-exchange", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/portfolio/wash-plus", priority: 0.6, changeFrequency: "yearly" as const },

  // Book — regional editions. Distinct content per region (language,
  // retailers, testimonials), so these are canonical in their own right
  // rather than duplicates of /unfair-advantage.
  { path: "/book/usa-book", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/book/uae-book", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/book/china-book", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/book/southeast-asia-book", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/malaysia-sea", priority: 0.6, changeFrequency: "yearly" as const },

  // The Next Level programme. secret-level is included deliberately: the name
  // suggests it is hidden, but it is linked from /the-next-level and is real,
  // public content.
  { path: "/the-next-level", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/the-next-level/level-1", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/the-next-level/level-2", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/the-next-level/level-3", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/the-next-level/secret-level", priority: 0.6, changeFrequency: "yearly" as const },

  // Updates index. Individual posts are appended below.
  { path: "/updates", priority: 0.7, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  /*
    The homepage path is "/", which would render as "…ashali.com/" here while
    Next normalises the page's own canonical tag to "…ashali.com" with no
    trailing slash. Both forms are the same URL to Google, but emitting the
    same string in both places keeps Search Console reports unambiguous.
  */
  const staticEntries = CONTENT_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  /*
    Update posts are derived from UPDATE_POSTS, the same array the pages render
    from, so the sitemap cannot list a post that does not resolve. Three further
    posts are commented out in updatesData.ts; because they are absent from the
    array they are absent here too, which is correct — their URLs render
    "Post not found".
  */
  const postEntries = UPDATE_POSTS.map((post) => ({
    url: `${SITE_ORIGIN}/updates/${post.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...postEntries];
}
