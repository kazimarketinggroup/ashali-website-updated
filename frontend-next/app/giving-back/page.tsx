import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import GivingBack from "@/src/Components/Pages/GivingBack/GivingBack";

export const metadata: Metadata = pageMetadata({
  title: "Giving Back and Unfair Access | Ash Ali",
  description:
    "Ash Ali offers a limited number of talks each year for schools, education programmes and organisations supporting young people with fewer opportunities.",
  path: "/giving-back",
  ogImage: "/og/impact.png",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Giving Back", path: "/giving-back" },
          ]),
        ]}
      />
      <GivingBack />
    </>
  );
}
