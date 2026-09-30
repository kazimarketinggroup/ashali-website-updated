import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import FareExchange from "@/src/Components/Pages/FareExchange/FareExchange";

export const metadata: Metadata = pageMetadata({
  title: "Fare Exchange | Ash Ali",
  description:
    "Fare Exchange: one of the ventures in Ash Ali's portfolio of businesses and social impact work.",
  path: "/portfolio/fare-exchange",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }, { name: "Fare Exchange", path: "/portfolio/fare-exchange" }])]} />
      <FareExchange />
    </>
  );
}
