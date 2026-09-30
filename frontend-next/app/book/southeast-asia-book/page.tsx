import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { bookSchema, breadcrumbSchema } from "@/src/constants/structuredData";
import SouthEastAsia from "@/src/Components/Pages/Book/SouthEastAsia/SouthEastAsia";

export const metadata: Metadata = pageMetadata({
  title: "The Unfair Advantage: SE Asia Edition | Ash Ali",
  description:
    "Buy the Southeast Asia edition of The Unfair Advantage. Available at Kinokuniya, Daraz, Litbooks and BookXcess.",
  path: "/book/southeast-asia-book",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Unfair Advantage", path: "/unfair-advantage" }, { name: "SE Asia Edition", path: "/book/southeast-asia-book" }]), bookSchema]} />
      <SouthEastAsia />
    </>
  );
}
