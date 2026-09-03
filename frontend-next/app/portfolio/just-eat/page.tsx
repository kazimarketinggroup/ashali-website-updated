import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import JustEat from "@/src/Components/Pages/JustEat/JustEat";

export const metadata: Metadata = pageMetadata({
  title: "Just Eat | Ash Ali",
  description:
    "As Just Eat UK's first Marketing Director, Ash played a key role in the company's growth to a $2.44B IPO.",
  path: "/portfolio/just-eat",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }, { name: "Just Eat", path: "/portfolio/just-eat" }])]} />
      <JustEat />
    </>
  );
}
