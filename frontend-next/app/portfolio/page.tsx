import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import Portfolio from "@/src/Components/Pages/Portfolio/Portfolio";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio & Ventures | Ash Ali",
  description:
    "Just Eat, Uhubs, WashPlus, Fare Exchange — the ventures behind the experience Ash brings to stages and boardrooms.",
  path: "/portfolio",
  ogImage: "/og/portfolio.png",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }])]} />
      <Portfolio />
    </>
  );
}
