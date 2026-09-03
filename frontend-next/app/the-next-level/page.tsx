import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import TheNextLevel from "@/src/Components/Pages/TheNextLevel/TheNextLevel";

export const metadata: Metadata = pageMetadata({
  title: "The Next Level — Programmes | Ash Ali",
  description:
    "Four pathways with Ash Ali: The Growth Games, Life Is Unfair, Leadership Development and a tailored Secret Level.",
  path: "/the-next-level",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Next Level", path: "/the-next-level" }])]} />
      <TheNextLevel />
    </>
  );
}
