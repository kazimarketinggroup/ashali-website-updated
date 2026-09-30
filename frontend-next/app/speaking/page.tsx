import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema, speakerServiceSchema } from "@/src/constants/structuredData";
import Speaking from "@/src/Components/Pages/Speaking/Speaking";

export const metadata: Metadata = pageMetadata({
  title: "Keynote Speaker | Ash Ali",
  description:
    "Keynotes on unfair advantage, AI, entrepreneurship and human potential for leadership teams, universities, founders and conferences.",
  path: "/speaking",
  ogImage: "/og/speaking.png",
  ogImageAlt: "Ash Ali, International Keynote Speaker on Unfair Advantage and AI Transformation",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Keynotes", path: "/speaking" }]),
          speakerServiceSchema,
        ]}
      />
      <Speaking />
    </>
  );
}
