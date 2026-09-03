import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import Uhubs from "@/src/Components/Pages/Uhubs/Uhubs";

export const metadata: Metadata = pageMetadata({
  title: "Uhubs | Ash Ali",
  description:
    "Co-founded in 2019 with Matt Miligan. Uhubs uses AI and data insights to help revenue leaders identify top talent and drive team success.",
  path: "/portfolio/uhubs",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }, { name: "Uhubs", path: "/portfolio/uhubs" }])]} />
      <Uhubs />
    </>
  );
}
