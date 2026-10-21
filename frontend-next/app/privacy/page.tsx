import type { Metadata } from "next";
import LegalPage from "@/src/Components/Pages/LegalPage";
import { pageMetadata } from "@/src/constants/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Ash Ali",
  description:
    "Privacy Policy for ashali.com. Learn how Ash Ali collects, uses, and protects your personal information.",
  path: "/privacy",
});

export default function Page() {
  return <LegalPage type="privacy" />;
}
