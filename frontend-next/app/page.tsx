import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { personSchema } from "@/src/constants/structuredData";
import Home from "@/src/Components/Pages/Home/Home";

export const metadata: Metadata = pageMetadata({
  title: "Ash Ali | Entrepreneur, Investor & Keynote Speaker",
  description:
    "Ash Ali is a British tech entrepreneur, investor and international keynote speaker. Co-author of the award-winning The Unfair Advantage.",
  path: "/",
  ogImage: "/og/home.png",
  ogImageAlt: "Ash Ali, British tech entrepreneur, investor and international keynote speaker",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[personSchema]} />
      <Home />
    </>
  );
}
