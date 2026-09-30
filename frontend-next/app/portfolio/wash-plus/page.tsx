import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import WashPlus from "@/src/Components/Pages/WashPlus/WashPlus";

export const metadata: Metadata = pageMetadata({
  title: "WashPlus | Ash Ali",
  description:
    "WashPlus: one of the ventures in Ash Ali's portfolio of businesses and social impact work.",
  path: "/portfolio/wash-plus",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }, { name: "WashPlus", path: "/portfolio/wash-plus" }])]} />
      <WashPlus />
    </>
  );
}
