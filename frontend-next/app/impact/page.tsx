import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import Impact from "@/src/Components/Pages/Impact/Impact";

export const metadata: Metadata = pageMetadata({
  title: "Impact: Pro-Bono Talks | Ash Ali",
  description:
    "Ash gives a limited number of pro-bono talks each year to schools, colleges and organisations supporting young people from underrepresented backgrounds.",
  path: "/impact",
  ogImage: "/og/impact.png",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Impact", path: "/impact" }])]} />
      <Impact />
    </>
  );
}
