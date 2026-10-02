import type { Metadata } from "next";

import { pageMetadata } from "@/src/constants/metadata";
import Home from "@/src/Components/Pages/Home/Home";

export const metadata: Metadata = pageMetadata({
  title: "Ash Ali | Entrepreneur, Investor & Keynote Speaker",
  description:
    "Ash Ali is a British tech entrepreneur, investor and international keynote speaker. Co-author of the award winning The Unfair Advantage.",
  path: "/",
  ogImage: "/og/home.png",
  ogImageAlt: "Ash Ali, British tech entrepreneur, investor and international keynote speaker",
});

export default function Page() {
  return <Home />;
}
