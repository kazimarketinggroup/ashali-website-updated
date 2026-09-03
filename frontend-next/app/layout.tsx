import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";

import SiteFooter from "@/src/Components/Layouts/SiteFooter";
import SiteHeader from "@/src/Components/Layouts/SiteHeader";
import PageTransition from "./_components/PageTransition";
import "./globals.css";

/*
  Self-hosted replacement for the Google Fonts @import that sat at the top of
  the old index.css. Same family, same variable weight range (100-900). Exposed
  as a CSS variable that tailwind.config.ts reads for `font-sans`.
*/
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

/*
  Root metadata, ported verbatim from the old index.html <head>.

  IMPORTANT: in the Vite build these tags were the ONLY metadata on the entire
  site — all ~35 URLs shared this one title and description, because the <Head>
  component that was supposed to override them per-page was wired into exactly
  one page (Workshops). These values are therefore the correct *fallback* but
  must be overridden per-route as pages are migrated. Phase 2 covers that.

  The commented-out og:image / twitter:image from index.html are intentionally
  left out rather than guessed at — they pointed at a /src/ path that would not
  resolve in production. Supplying a real OG image is a Phase 2 item.
*/
export const metadata: Metadata = {
  // WWW host: the apex 307-redirects to it in production, so this is the
  // origin that actually serves pages. See src/constants/site.ts.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.ashali.com"),
  title: "Ash Ali | Entrepreneur, Investor & Keynote Speaker",
  description:
    "Ash Ali is an entrepreneur, investor, keynote speaker and co-author of The Unfair Advantage, helping founders, leaders and organisations unlock hidden advantage and build AI-ready businesses.",
  openGraph: {
    type: "website",
    title: "Ash Ali | Entrepreneur, Investor & Keynote Speaker",
    description: "Helping people and organisations turn hidden advantage into performance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ash Ali | Entrepreneur, Investor & Keynote Speaker",
    description: "Helping people and organisations turn hidden advantage into performance.",
  },
  // Preserves the old behaviour exactly: an empty data URI suppresses the
  // browser's default /favicon.ico request. Revisit only if a real favicon is
  // commissioned.
  icons: { icon: "data:," },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        {/*
          Mirrors the old MainLayout wrapper div exactly. `site-root` replaces
          the `#root` selector from index.css — see the note in globals.css.
        */}
        <div className="site-root flex min-h-screen min-w-0 flex-col overflow-x-clip bg-black font-sans text-white">
          {/*
            Same three-part structure the old MainLayout rendered:
            header / animated <main> / footer. <ScrollRestoration> has no
            equivalent here and needs none — the App Router restores scroll
            position on navigation by default.
          */}
          <SiteHeader />

          <PageTransition>{children}</PageTransition>

          <SiteFooter />
        </div>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
