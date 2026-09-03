import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import LevelTwo from "@/src/Components/Pages/TheNextLevel/Level2/LevelTwo";

export const metadata: Metadata = pageMetadata({
  title: "Level 2: Life Is Unfair | Ash Ali",
  description:
    "For founders. Mindset and money, and learning to identify and leverage the unfair advantages you already hold.",
  path: "/the-next-level/level-2",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Next Level", path: "/the-next-level" }, { name: "Level 2", path: "/the-next-level/level-2" }])]} />
      <LevelTwo />
    </>
  );
}
