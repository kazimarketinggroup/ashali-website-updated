import type { Metadata } from "next";
import LegalPage from "@/src/Components/Pages/LegalPage";
import { pageMetadata } from "@/src/constants/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions | Ash Ali",
  description:
    "Terms and Conditions for ashali.com. Review our engagement, intellectual property, and website usage terms.",
  path: "/terms",
});

export default function Page() {
  return <LegalPage type="terms" />;
}
