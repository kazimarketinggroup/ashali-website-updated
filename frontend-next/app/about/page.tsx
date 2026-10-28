import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema, personSchema } from "@/src/constants/structuredData";
import About from "@/src/Components/Pages/About/About";

export const metadata: Metadata = pageMetadata({
  title: "About Ash Ali | Entrepreneur and Keynote Speaker",
  description:
    "Co-author of The Unfair Advantage and co-founder of Uhubs. Ash Ali brings founder experience and sales capability research to keynotes, workshops and advisory in an AI-shaped world.",
  path: "/about",
  ogImage: "/og/about.png",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), personSchema]} />
      <About />
    </>
  );
}
