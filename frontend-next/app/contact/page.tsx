import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import Contact from "@/src/Components/Pages/Contact/Contact";

export const metadata: Metadata = pageMetadata({
  title: "Work with Ash | Enquiries and Booking",
  description:
    "Enquire about speaking, advisory, media, Malaysia and Southeast Asia opportunities or Giving Back initiatives.",
  path: "/contact",
  ogImage: "/og/contact.png",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]} />
      <Contact />
    </>
  );
}
