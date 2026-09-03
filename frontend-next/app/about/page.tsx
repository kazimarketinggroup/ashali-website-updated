import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema, personSchema } from "@/src/constants/structuredData";
import About from "@/src/Components/Pages/About/About";

export const metadata: Metadata = pageMetadata({
  title: "About Ash Ali | Entrepreneur & Keynote Speaker",
  description:
    "25 years building what he now speaks about. From inner-city Birmingham to Just Eat UK's first Marketing Director, author and investor.",
  path: "/about",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]), personSchema]} />
      <About />
    </>
  );
}
