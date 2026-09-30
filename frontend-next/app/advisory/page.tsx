import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import Advisory from "@/src/Components/Pages/Advisory/Advisory";

export const metadata: Metadata = pageMetadata({
  title: "Selective Strategic Advisory | Ash Ali",
  description:
    "Selective strategic advisory for founders and leadership teams: go-to-market, growth and building practical advantage in an AI-shaped world.",
  path: "/advisory",
  ogImage: "/og/advisory.png",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Advisory", path: "/advisory" }])]} />
      <Advisory />
    </>
  );
}
