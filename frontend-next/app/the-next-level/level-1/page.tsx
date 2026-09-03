import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import LevelOne from "@/src/Components/Pages/TheNextLevel/Level1/LevelOne";

export const metadata: Metadata = pageMetadata({
  title: "Level 1: The Growth Games | Ash Ali",
  description:
    "For startup founders and funded startups. Mindset, building a high-performing team, growth hacking and optimising the business.",
  path: "/the-next-level/level-1",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Next Level", path: "/the-next-level" }, { name: "Level 1", path: "/the-next-level/level-1" }])]} />
      <LevelOne />
    </>
  );
}
