import type { Metadata } from "next";

import PlaceholderPage from "@/src/Components/Pages/PlaceholderPage";

/*
  /investment — PLACEHOLDER. Renders only "This page is coming soon" over the shared
  header/footer chrome (~256 words, none of it about investment).

  noindex until real content exists. The page still returns 200 and stays
  crawlable on purpose: blocking it in robots.txt instead would stop Google
  reading this very directive, leaving a bare URL indexable from any inbound
  link. It is also excluded from app/sitemap.ts — listing a noindexed URL there
  would be a contradictory signal.

  WHEN REAL CONTENT LANDS: delete this metadata export AND add the path to
  CONTENT_ROUTES in app/sitemap.ts. Doing only one of the two silently keeps the
  page out of search.
*/
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function Page() {
  return <PlaceholderPage title="Investment" />;
}
