import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import SecretLevel from "@/src/Components/Pages/TheNextLevel/SecretLevel/SecretLevel";

export const metadata: Metadata = pageMetadata({
  title: "Secret Level: Tailored Development | Ash Ali",
  description:
    "A hands-on workshop built around your challenges — personalised solutions, industry-focused content and actionable insights.",
  path: "/the-next-level/secret-level",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Next Level", path: "/the-next-level" }, { name: "Secret Level", path: "/the-next-level/secret-level" }])]} />
      <SecretLevel />
    </>
  );
}
