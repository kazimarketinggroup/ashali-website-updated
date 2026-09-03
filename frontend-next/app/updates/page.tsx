import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import LatestUpdates from "@/src/Components/Pages/LatestUpdates/LatestUpdates";

export const metadata: Metadata = pageMetadata({
  title: "Latest Updates | Ash Ali",
  description:
    "Insights on entrepreneurship, innovation and growth strategy from Ash Ali.",
  path: "/updates",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Updates", path: "/updates" }])]} />
      <LatestUpdates />
    </>
  );
}
