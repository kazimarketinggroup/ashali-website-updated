"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, ShieldCheck, Mail } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { brandGradientTextStyle } from "../../constants/brandGradient";

interface LegalPageProps {
  type: "privacy" | "terms";
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { cmsData } = useCMS();

  const isPrivacy = type === "privacy";
  const data = isPrivacy ? cmsData.privacyPolicy : cmsData.termsConditions;

  const defaultTitle = isPrivacy ? "Privacy Policy" : "Terms & Conditions";
  const title = data?.title || defaultTitle;
  const lastUpdated = data?.lastUpdated || "April 2026";
  const intro = data?.intro || "";
  const rawContent = data?.content || "";

  // Simple, robust Markdown-like line-by-line parser for headings, bullet points, paragraphs
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p
            key={key}
            className="text-[15px] sm:text-[16px] font-normal leading-[1.8] text-white/80 mb-6"
          >
            {currentParagraph.join(" ")}
          </p>
        );
        currentParagraph = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        flushParagraph(`p-before-h2-${index}`);
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-10 mb-4 flex items-center gap-2"
          >
            <span style={brandGradientTextStyle}>{trimmed.replace("## ", "")}</span>
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph(`p-before-h3-${index}`);
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-lg font-semibold tracking-tight text-white mt-6 mb-3"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("- ")) {
        flushParagraph(`p-before-li-${index}`);
        elements.push(
          <li
            key={`li-${index}`}
            className="text-[14px] sm:text-[15px] font-normal leading-relaxed text-white/80 ml-6 list-disc mb-2"
          >
            {trimmed.replace(/^- /, "")}
          </li>
        );
      } else if (trimmed === "") {
        flushParagraph(`p-empty-${index}`);
      } else {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph("p-final");

    return elements;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 sm:pt-32 sm:pb-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium text-white/70 mb-4">
            <ShieldCheck size={14} className="text-[#FF781D]" />
            <span>Legal & Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-white/40" />
              <span>Last Updated: {lastUpdated}</span>
            </span>
            <span>•</span>
            <span>Applicable to ashali.com</span>
          </div>

          {intro && (
            <div className="mt-6 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-[15px] font-medium leading-relaxed text-white/90">
              {intro}
            </div>
          )}
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none">
          {renderFormattedContent(rawContent)}
        </div>

        {/* Footer Contact Callout */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-white/[0.06]">
          <div>
            <h3 className="text-base font-semibold text-white">Have questions about our terms or privacy policy?</h3>
            <p className="text-xs text-white/60 mt-1">Our advisory and legal team is happy to clarify any questions.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF781D] to-[#E33C3C] text-xs font-semibold text-white shadow-md hover:opacity-95 transition-opacity whitespace-nowrap"
          >
            <Mail size={14} />
            <span>Contact Ash Ali</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
