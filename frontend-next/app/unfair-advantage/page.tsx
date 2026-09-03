import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { bookSchema, breadcrumbSchema } from "@/src/constants/structuredData";
import Book from "@/src/Components/Pages/Book/Book";

export const metadata: Metadata = pageMetadata({
  title: "The Unfair Advantage | Ash Ali",
  description:
    "The award-winning book challenging the myth that success is purely grit and hustle. Business Book of the Year 2021, by Ash Ali & Hasan Kubba.",
  path: "/unfair-advantage",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Unfair Advantage", path: "/unfair-advantage" }]), bookSchema]} />
      <Book />
    </>
  );
}
