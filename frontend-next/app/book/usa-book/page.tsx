import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { bookSchema, breadcrumbSchema } from "@/src/constants/structuredData";
import UsaBook from "@/src/Components/Pages/Book/UsaBook/UsaBook";

export const metadata: Metadata = pageMetadata({
  title: "The Unfair Advantage: US Edition | Ash Ali",
  description:
    "Buy the US edition of The Unfair Advantage. Available at Amazon, Barnes & Noble and Books-A-Million.",
  path: "/book/usa-book",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Unfair Advantage", path: "/unfair-advantage" }, { name: "US Edition", path: "/book/usa-book" }]), bookSchema]} />
      <UsaBook />
    </>
  );
}
