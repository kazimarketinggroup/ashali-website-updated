import type { Metadata } from "next";

import JsonLd from "@/src/Components/Shared/JsonLd";
import { pageMetadata } from "@/src/constants/metadata";
import { breadcrumbSchema } from "@/src/constants/structuredData";
import LevelThree from "@/src/Components/Pages/TheNextLevel/Level3/LevelThree";

export const metadata: Metadata = pageMetadata({
  title: "Level 3: Leadership Development | Ash Ali",
  description:
    "Leadership development for founders and senior teams ready to scale themselves as well as the business.",
  path: "/the-next-level/level-3",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "The Next Level", path: "/the-next-level" }, { name: "Level 3", path: "/the-next-level/level-3" }])]} />
      <LevelThree />
    </>
  );
}
