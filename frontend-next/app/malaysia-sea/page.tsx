import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import MalaySiaAndSEA from "@/src/Components/Pages/MalaysiaAndSEA/MalaySiaAndSEA";

export const metadata: Metadata = pageMetadata({
  title: "Malaysia & Southeast Asia | Ash Ali",
  description:
    "Speaking, advisory and impact work across Malaysia and Southeast Asia. Based between London and Kuala Lumpur.",
  path: "/malaysia-sea",
  ogImage: "/og/malaysia-sea.png",
  ogImageAlt: "Ash Ali, speaking, advisory and impact work across Malaysia and Southeast Asia",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Malaysia & SEA", path: "/malaysia-sea" }])]} />
      <MalaySiaAndSEA />
    </>
  );
}
