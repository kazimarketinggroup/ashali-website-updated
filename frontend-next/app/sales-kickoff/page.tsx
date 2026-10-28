import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import SalesKickoff from "@/src/Components/Pages/SalesKickoff/SalesKickoff";

export const metadata: Metadata = pageMetadata({
  title: "Sales Kickoff Keynote Speaker | Ash Ali",
  description:
    "Sales kickoff keynotes and workshops by Ash Ali. Founder experience and sales capability research to give your revenue team direction and advantage in an AI-shaped world.",
  path: "/sales-kickoff",
  ogImage: "/og/sales-kickoff.png",
  ogImageAlt: "Ash Ali, Sales Kickoff Keynote Speaker on Unfair Advantage and AI Transformation",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sales Kickoff", path: "/sales-kickoff" },
          ]),
        ]}
      />
      <SalesKickoff />
    </>
  );
}
