import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema, faqSchema } from "@/src/constants/structuredData";
import { faqs } from "@/src/Components/Pages/Workshops/faqData";
import Workshops from "@/src/Components/Pages/Workshops/Workshops";

export const metadata: Metadata = pageMetadata({
  title: "Executive Workshops & Leadership Labs | Ash Ali",
  description:
    "Executive workshops that turn the AI conversation into decisions: the AI Advantage Lab, Human Advantage Leadership Lab and AI Era Sales Lab.",
  path: "/workshops",
  ogImage: "/og/workshops.png",
  ogImageAlt: "Ash Ali, Executive Workshops and Leadership Labs on AI Strategy",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Workshops", path: "/workshops" }]), faqSchema(faqs)]} />
      <Workshops />
    </>
  );
}
