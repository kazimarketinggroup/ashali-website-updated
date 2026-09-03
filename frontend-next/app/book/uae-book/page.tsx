import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { bookSchema, breadcrumbSchema } from "@/src/constants/structuredData";
import UAE from "@/src/Components/Pages/Book/UAE/UAE";

export const metadata: Metadata = pageMetadata({
  title: "The Unfair Advantage — UAE Edition | Ash Ali",
  description:
    "Buy the UAE edition of The Unfair Advantage. Available at Noon, Dubai Store and leading UAE retailers.",
  path: "/book/uae-book",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Unfair Advantage", path: "/unfair-advantage" }, { name: "UAE Edition", path: "/book/uae-book" }]), bookSchema]} />
      <UAE />
    </>
  );
}
