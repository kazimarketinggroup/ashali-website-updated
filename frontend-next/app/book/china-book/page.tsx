import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { bookSchema, breadcrumbSchema } from "@/src/constants/structuredData";
import China from "@/src/Components/Pages/Book/China/China";

export const metadata: Metadata = pageMetadata({
  title: "The Unfair Advantage: China Edition | Ash Ali",
  description:
    "The Chinese edition of The Unfair Advantage: the award-winning framework for finding the edge you already have.",
  path: "/book/china-book",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Unfair Advantage", path: "/unfair-advantage" }, { name: "China Edition", path: "/book/china-book" }]), bookSchema]} />
      <China />
    </>
  );
}
