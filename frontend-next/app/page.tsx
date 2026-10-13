import type { Metadata } from "next";

import { pageMetadata } from "@/src/constants/metadata";
import Home from "@/src/Components/Pages/Home/Home";

export const metadata: Metadata = pageMetadata({
  title: "Ash Ali | Keynote Speaker on AI, Advantage & Sales Capability",
  description:
    "Co-author of the award-winning The Unfair Advantage and co-founder of Uhubs. Keynotes, workshops and advisory backed by the Global Sales Capability Index.",
  path: "/",
  ogImage: "/og/home.png",
  ogImageAlt: "Ash Ali, Keynote Speaker on AI, Advantage & Sales Capability",
});

export default function Page() {
  return <Home />;
}
