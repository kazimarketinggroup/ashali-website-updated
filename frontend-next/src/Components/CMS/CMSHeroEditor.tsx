"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Save,
  Sparkles,
  RefreshCw,
  Eye,
  BookOpen,
  Trophy,
  TrendingUp,
  BarChart3,
  Award,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { HeroContent, HeroCredibilityCard, HeroStatCard } from "../../types/cms";
import { brandGradientTextStyle } from "../../constants/brandGradient";
import { ImageUploaderField } from "./ImageUploaderField";
import ashAliImg from "../../assets/home/updatedHeroImage.png";

const defaultHeroData: HeroContent = {
  eyebrow: "INTERNATIONAL KEYNOTE SPEAKER • FOUNDER • OPERATOR • AUTHOR",
  headlineLine1Prefix: "I co-wrote the book on ",
  headlineLine1Highlight: "unfair advantage.",
  headlineLine2Prefix: "Now I'm using ",
  headlineLine2Highlight1: "sales capability data",
  headlineLine2Middle: " to explore ",
  headlineLine2Highlight2: "what AI changes.",
  headline: "I co-wrote the book on",
  highlightWord: "unfair advantage.",
  headlinePart2: "Now I'm using sales capability data to explore what AI changes.",
  bio: "Ash Ali co-authored the award-winning The Unfair Advantage, was Just Eat UK's first Marketing Director and is co-founder of Uhubs.ai. He brings founder experience and sales capability research to keynotes, workshops and advisory on advantage in an AI-shaped world.",
  location:
    "Based between London and Kuala Lumpur. Available globally for keynotes, leadership offsites and executive workshops.",
  ctaText: "Work with Ash",
  ctaLink: "/contact",
  ctaSecondaryText: "Get the Index",
  heroImage: "",
  statCard: {
    stat: "76%",
    text: "of sales professionals in the Index dataset rated their capability higher than their manager did.",
    source: "Uhubs Global Sales Capability Index 2026 • first edition • April 2026",
  },
  credibilityCards: [
    {
      id: "cred-1",
      label: "Co-author of",
      title: "The Unfair Advantage",
      icon: "book",
    },
    {
      id: "cred-2",
      label: "Winner, 2021",
      title: "Business Book of the Year",
      icon: "trophy",
    },
    {
      id: "cred-3",
      label: "First Marketing Director at",
      title: "Just Eat",
      icon: "trending",
    },
  ],
  secondaryButtons: [{ label: "Get the Index", to: "#index" }],
};

// Helpers for auto-spacing and responsive headline rendering
const renderHeadlineLine1 = (prefix?: string, highlight?: string) => {
  const p = prefix?.trim();
  const h = highlight?.trim();

  if (!p && !h) return null;

  return (
    <span className="inline">
      {p && <span>{p}</span>}
      {p && h && " "}
      {h && <span style={brandGradientTextStyle}>{h}</span>}
    </span>
  );
};

const renderHeadlineLine2 = (
  prefix?: string,
  h1?: string,
  middle?: string,
  h2?: string
) => {
  const p = prefix?.trim();
  const highlight1 = h1?.trim();
  const m = middle?.trim();
  const highlight2 = h2?.trim();

  const segments: React.ReactNode[] = [];

  if (p) segments.push(<span key="p">{p}</span>);
  if (highlight1) {
    segments.push(
      <span key="h1" style={brandGradientTextStyle}>
        {highlight1}
      </span>
    );
  }
  if (m) segments.push(<span key="m">{m}</span>);
  if (highlight2) {
    segments.push(
      <span key="h2" style={brandGradientTextStyle}>
        {highlight2}
      </span>
    );
  }

  if (segments.length === 0) return null;

  return (
    <span className="inline">
      {segments.map((seg, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && " "}
          {seg}
        </React.Fragment>
      ))}
    </span>
  );
};

export const CMSHeroEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  const [formData, setFormData] = useState<HeroContent>(() => ({
    ...defaultHeroData,
    ...cmsData.hero,
    headlineLine1Prefix: cmsData.hero?.headlineLine1Prefix ?? defaultHeroData.headlineLine1Prefix ?? "",
    headlineLine1Highlight: cmsData.hero?.headlineLine1Highlight ?? defaultHeroData.headlineLine1Highlight ?? "",
    headlineLine2Prefix: cmsData.hero?.headlineLine2Prefix ?? defaultHeroData.headlineLine2Prefix ?? "",
    headlineLine2Highlight1: cmsData.hero?.headlineLine2Highlight1 ?? defaultHeroData.headlineLine2Highlight1 ?? "",
    headlineLine2Middle: cmsData.hero?.headlineLine2Middle ?? defaultHeroData.headlineLine2Middle ?? "",
    headlineLine2Highlight2: cmsData.hero?.headlineLine2Highlight2 ?? defaultHeroData.headlineLine2Highlight2 ?? "",
    statCard: {
      ...defaultHeroData.statCard!,
      ...(cmsData.hero?.statCard || {}),
    },
    credibilityCards:
      cmsData.hero?.credibilityCards && cmsData.hero.credibilityCards.length > 0
        ? cmsData.hero.credibilityCards
        : defaultHeroData.credibilityCards,
  }));

  React.useEffect(() => {
    if (cmsData.hero) {
      setFormData({
        ...defaultHeroData,
        ...cmsData.hero,
        headlineLine1Prefix: cmsData.hero.headlineLine1Prefix ?? defaultHeroData.headlineLine1Prefix ?? "",
        headlineLine1Highlight: cmsData.hero.headlineLine1Highlight ?? defaultHeroData.headlineLine1Highlight ?? "",
        headlineLine2Prefix: cmsData.hero.headlineLine2Prefix ?? defaultHeroData.headlineLine2Prefix ?? "",
        headlineLine2Highlight1: cmsData.hero.headlineLine2Highlight1 ?? defaultHeroData.headlineLine2Highlight1 ?? "",
        headlineLine2Middle: cmsData.hero.headlineLine2Middle ?? defaultHeroData.headlineLine2Middle ?? "",
        headlineLine2Highlight2: cmsData.hero.headlineLine2Highlight2 ?? defaultHeroData.headlineLine2Highlight2 ?? "",
        statCard: {
          ...defaultHeroData.statCard!,
          ...(cmsData.hero.statCard || {}),
        },
        credibilityCards:
          cmsData.hero.credibilityCards && cmsData.hero.credibilityCards.length > 0
            ? cmsData.hero.credibilityCards
            : defaultHeroData.credibilityCards,
      });
    }
  }, [cmsData.hero]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof HeroContent, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatCardChange = (field: keyof HeroStatCard, value: string) => {
    setFormData((prev) => ({
      ...prev,
      statCard: {
        ...(prev.statCard || defaultHeroData.statCard!),
        [field]: value,
      },
    }));
  };

  const handleCredibilityChange = (
    index: number,
    field: keyof HeroCredibilityCard,
    value: string
  ) => {
    setFormData((prev) => {
      const cards = [...(prev.credibilityCards || defaultHeroData.credibilityCards!)];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, credibilityCards: cards };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("hero", formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({
      ...defaultHeroData,
      ...cmsData.hero,
      statCard: {
        ...defaultHeroData.statCard!,
        ...(cmsData.hero?.statCard || {}),
      },
      credibilityCards:
        cmsData.hero?.credibilityCards && cmsData.hero.credibilityCards.length > 0
          ? cmsData.hero.credibilityCards
          : defaultHeroData.credibilityCards,
    });
  };

  // Safe fallback values matching live website — using nullish coalescing to prevent fallback traps
  const eyebrow = formData.eyebrow ?? "";
  const line1Prefix = formData.headlineLine1Prefix ?? "";
  const line1Highlight = formData.headlineLine1Highlight ?? "";
  const line2Prefix = formData.headlineLine2Prefix ?? "";
  const line2Highlight1 = formData.headlineLine2Highlight1 ?? "";
  const line2Middle = formData.headlineLine2Middle ?? "";
  const line2Highlight2 = formData.headlineLine2Highlight2 ?? "";
  const bio = formData.bio ?? "";
  const location = formData.location ?? "";
  const ctaText = formData.ctaText ?? "";
  const ctaSecondaryText = formData.ctaSecondaryText ?? "";
  const statCard = formData.statCard || defaultHeroData.statCard!;
  const credibilityCards = formData.credibilityCards || defaultHeroData.credibilityCards!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Homepage Hero & Introduction
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Customize the primary headline, gradient highlights, bio, 76% capability stat, credibility cards and CTAs shown on the live homepage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              ✓ Saved & live!
            </span>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={14} />
            <span>Discard Changes</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Save size={14} />
            <span>{isSaving ? "Saving..." : "Save Hero Changes"}</span>
          </button>
        </div>
      </div>

      {/* Real-time Live Preview Card — Replicating EXACT live website layout */}
      <div className="bg-[#101010] p-6 sm:p-8 rounded-2xl border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 z-20">
          <Eye size={12} className="text-[#FF781D]" />
          <span>Real-time Live Preview</span>
        </div>

        {/* Top: Image + Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-2">
          {/* IMAGE — left */}
          <div className="lg:col-span-5 flex items-end justify-center">
            <div className="relative h-64 sm:h-72 lg:h-80 w-full flex items-end justify-center overflow-hidden">
              {formData.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.heroImage}
                  alt="Ash Ali"
                  className="h-full w-auto object-contain object-bottom filter brightness-105"
                />
              ) : (
                <Image
                  src={ashAliImg}
                  alt="Ash Ali"
                  className="h-full w-auto object-contain object-bottom filter brightness-105"
                />
              )}
            </div>
          </div>

          {/* COPY — right */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
            {/* Eyebrow */}
            {eyebrow?.trim() ? (
              <div className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase mb-3">
                {eyebrow}
              </div>
            ) : null}

            {/* Headline with auto-spacing, responsive wrapping and clean gradient spans */}
            <h2 className="font-semibold leading-[1.25] tracking-tight text-white mb-4 text-xl sm:text-2xl lg:text-3xl break-words [overflow-wrap:anywhere]">
              {renderHeadlineLine1(line1Prefix, line1Highlight)}
              {(line2Prefix?.trim() || line2Highlight1?.trim() || line2Middle?.trim() || line2Highlight2?.trim()) ? (
                <>
                  <br />
                  {renderHeadlineLine2(line2Prefix, line2Highlight1, line2Middle, line2Highlight2)}
                </>
              ) : null}
            </h2>

            {/* Subline / Bio — Conditionally rendered so clearing it removes it live */}
            {bio?.trim() ? (
              <p className="text-gray-300 font-light leading-[1.7] tracking-wide text-xs sm:text-sm max-w-xl mb-5">
                {bio}
              </p>
            ) : null}

            {/* Buttons: Work with Ash & Get the Index */}
            {(ctaText?.trim() || ctaSecondaryText?.trim()) ? (
              <div className="flex flex-wrap items-center gap-3">
                {ctaText?.trim() ? (
                  <span className="px-5 py-2.5 bg-white text-black font-semibold text-xs rounded-xs shadow-md">
                    {ctaText}
                  </span>
                ) : null}
                {ctaSecondaryText?.trim() ? (
                  <span className="px-5 py-2.5 bg-transparent border border-white/20 text-white font-medium text-xs rounded-xs">
                    {ctaSecondaryText}
                  </span>
                ) : null}
              </div>
            ) : null}

            {/* Location Line — Conditionally rendered so clearing it removes it live */}
            {location?.trim() ? (
              <p className="text-[11px] text-gray-400 font-light mt-3">
                {location}
              </p>
            ) : null}
          </div>
        </div>

        {/* 76% Stat Card in Preview */}
        {(statCard?.stat?.trim() || statCard?.text?.trim() || statCard?.source?.trim()) ? (
          <div className="mt-6 w-full rounded-md border border-white/[0.08] bg-[#141414] p-4 sm:p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              {statCard.stat?.trim() ? (
                <div
                  className="text-4xl sm:text-5xl font-bold tracking-tight shrink-0 select-none"
                  style={brandGradientTextStyle}
                >
                  {statCard.stat}
                </div>
              ) : null}
              <div className="flex flex-col justify-center">
                {statCard.text?.trim() ? (
                  <p className="text-xs sm:text-sm text-white font-normal leading-snug">
                    {statCard.text}
                  </p>
                ) : null}
                {statCard.source?.trim() ? (
                  <p className="mt-1 text-[10px] text-gray-400 font-light tracking-wide">
                    {statCard.source}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {/* Credibility Strip: 3 Cards in Preview */}
        {credibilityCards && credibilityCards.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {credibilityCards.map((card, idx) => (
              <div
                key={card.id || idx}
                className="rounded-md border border-white/[0.08] bg-[#141414] p-3 sm:p-4 flex items-center gap-3"
              >
                <div className="h-8 w-8 shrink-0 rounded bg-[#22160d] border border-[#d97736]/30 flex items-center justify-center text-[#d97736]">
                  {idx === 0 ? (
                    <BookOpen size={16} strokeWidth={1.8} />
                  ) : idx === 1 ? (
                    <Trophy size={16} strokeWidth={1.8} />
                  ) : (
                    <TrendingUp size={16} strokeWidth={1.8} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-gray-400">{card.label}</p>
                  <p className="text-xs font-semibold text-white truncate">{card.title}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Form Fields — Redesigned into Spacious, Big Real-Editor Boxes */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-8">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Image Uploader Field */}
          <ImageUploaderField
            label="Hero Portrait Photo"
            value={formData.heroImage || ""}
            onChange={(url) => handleChange("heroImage", url)}
            helperText="Uploaded photo replaces Ash Ali's main hero cut-out. PNG or WebP with transparent background recommended."
            aspectRatio="portrait"
            presets={[
              { label: "Default Hero", url: "/assets/home/updatedHeroImage.png" },
              { label: "Cropped Stage", url: "/assets/home/ash-hero-cropped.png" },
              { label: "Keynote Speaking", url: "/assets/home/speaking.webp" },
            ]}
          />

          {/* Eyebrow Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Eyebrow Header
              </label>
              <span className="text-[11px] text-slate-400">
                Category badge shown above headline (leave empty to hide)
              </span>
            </div>
            <input
              type="text"
              value={formData.eyebrow ?? ""}
              placeholder="e.g. INTERNATIONAL KEYNOTE SPEAKER • FOUNDER • OPERATOR • AUTHOR"
              onChange={(e) => handleChange("eyebrow", e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>

          {/* Primary & Secondary CTA Buttons — Generous Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Primary CTA Button & Destination
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={formData.ctaText ?? ""}
                  placeholder="Button label (e.g. Work with Ash)"
                  onChange={(e) => handleChange("ctaText", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
                <input
                  type="text"
                  value={formData.ctaLink ?? ""}
                  placeholder="Destination (e.g. /contact)"
                  onChange={(e) => handleChange("ctaLink", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <span className="text-[11px] text-slate-400 mt-1.5 block">
                Main button leading to contact / booking
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Secondary CTA Button
              </label>
              <input
                type="text"
                value={formData.ctaSecondaryText ?? ""}
                placeholder="e.g. Get the Index"
                onChange={(e) => handleChange("ctaSecondaryText", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
              <span className="text-[11px] text-slate-400 mt-1.5 block">
                Opens the Global Sales Capability Index modal dialog
              </span>
            </div>
          </div>

          {/* Live Headline Structure — Spacious 2x2 Grid for Line 2 */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#FF781D]" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Live Website Headline (Two Lines with 3 Gradient Spans)
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Auto-spaced & responsive
              </span>
            </div>

            {/* Line 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Line 1 Prefix (Plain text)
                </label>
                <input
                  type="text"
                  value={formData.headlineLine1Prefix ?? ""}
                  placeholder="e.g. Find your"
                  onChange={(e) => handleChange("headlineLine1Prefix", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-orange-600 mb-1 flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>Line 1 Highlight (Brand Gradient)</span>
                </label>
                <input
                  type="text"
                  value={formData.headlineLine1Highlight ?? ""}
                  placeholder="e.g. unfair advantage"
                  onChange={(e) => handleChange("headlineLine1Highlight", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-orange-50/40 border border-orange-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
            </div>

            {/* Line 2 (Spacious 2-column layout — never tiny cramped boxes) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Line 2 Prefix (Plain text)
                </label>
                <input
                  type="text"
                  value={formData.headlineLine2Prefix ?? ""}
                  placeholder="e.g. in an"
                  onChange={(e) => handleChange("headlineLine2Prefix", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-orange-600 mb-1 flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>Highlight 1 (Brand Gradient)</span>
                </label>
                <input
                  type="text"
                  value={formData.headlineLine2Highlight1 ?? ""}
                  placeholder="e.g. AI-shaped world."
                  onChange={(e) => handleChange("headlineLine2Highlight1", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-orange-50/40 border border-orange-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Middle Text (Optional plain text)
                </label>
                <input
                  type="text"
                  value={formData.headlineLine2Middle ?? ""}
                  placeholder="Optional middle text"
                  onChange={(e) => handleChange("headlineLine2Middle", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-orange-600 mb-1 flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>Highlight 2 (Optional Brand Gradient)</span>
                </label>
                <input
                  type="text"
                  value={formData.headlineLine2Highlight2 ?? ""}
                  placeholder="Optional highlight 2"
                  onChange={(e) => handleChange("headlineLine2Highlight2", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-orange-50/40 border border-orange-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Spaces between words and highlights are automatically formatted — no need to type manual spaces at start or end.
            </p>
          </div>

          {/* Bio & Location — Big Comfortable Real-Editor Textareas */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Introduction Bio Paragraph (Real Editor Box)
                  </label>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Main paragraph displayed below the headline. If cleared / left empty, it will be completely hidden from the live website.
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 shrink-0">
                  {formData.bio?.trim() ? `${formData.bio.trim().split(/\s+/).length} words` : "Empty (Hidden)"}
                </span>
              </div>
              <textarea
                rows={6}
                value={formData.bio ?? ""}
                placeholder="Write introduction bio paragraph here (or leave empty to hide)..."
                onChange={(e) => handleChange("bio", e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm font-normal text-slate-900 leading-relaxed shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D] transition-all resize-y min-h-[140px]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Location & Global Availability Line
                  </label>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Shown beneath action buttons (leave empty to hide from live site)
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 shrink-0">
                  {formData.location?.trim() ? "Active" : "Empty (Hidden)"}
                </span>
              </div>
              <textarea
                rows={3}
                value={formData.location ?? ""}
                placeholder="e.g. Based between London and Kuala Lumpur. Available globally for keynotes, leadership offsites and executive workshops."
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs font-normal text-slate-900 leading-relaxed shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D] transition-all resize-y min-h-[75px]"
              />
            </div>
          </div>

          {/* Hero Stat Card (Global Sales Capability Index) — Big Spacious Real-Editor */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-[#FF781D]" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Hero Stat Card (Global Sales Capability Index)
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Research capability accolade card
              </span>
            </div>

            {/* Row 1: Stat Number & Source Line */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Stat Highlight
                </label>
                <input
                  type="text"
                  value={formData.statCard?.stat ?? ""}
                  placeholder="e.g. 76%"
                  onChange={(e) => handleStatCardChange("stat", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Large gradient statistic display
                </span>
              </div>

              <div className="md:col-span-8">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Source / Dataset Edition Line
                </label>
                <input
                  type="text"
                  value={formData.statCard?.source ?? ""}
                  placeholder="e.g. Uhubs Global Sales Capability Index 2026 • first edition • April 2026"
                  onChange={(e) => handleStatCardChange("source", e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Cites research report edition and release date
                </span>
              </div>
            </div>

            {/* Row 2: Description Text — FULL WIDTH REAL MULTI-LINE TEXTAREA */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Description Text (Full multi-line editor box)
                </label>
                <span className="text-[11px] text-slate-400">
                  Comfortable multi-line view — no tiny cramped inputs
                </span>
              </div>
              <textarea
                rows={4}
                value={formData.statCard?.text ?? ""}
                placeholder="e.g. of sales professionals in the Index dataset rated their capability higher than their manager did."
                onChange={(e) => handleStatCardChange("text", e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-900 shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D] resize-y min-h-[90px]"
              />
            </div>
          </div>

          {/* Credibility Strip Editor (3 Cards) */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <Award size={16} className="text-[#FF781D]" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Credibility Strip (3 Accolade Cards)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(formData.credibilityCards || defaultHeroData.credibilityCards!).map(
                (card, index) => (
                  <div
                    key={card.id || index}
                    className="p-4 bg-white rounded-xl border border-slate-200 space-y-3 shadow-xs"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Card {index + 1} Eyebrow
                      </label>
                      <input
                        type="text"
                        value={card.label ?? ""}
                        onChange={(e) =>
                          handleCredibilityChange(index, "label", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Card {index + 1} Main Title
                      </label>
                      <input
                        type="text"
                        value={card.title ?? ""}
                        onChange={(e) =>
                          handleCredibilityChange(index, "title", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-[#FF781D] to-[#E33C3C] text-white font-semibold text-sm rounded-xl shadow-md shadow-orange-500/20 hover:opacity-95 transition-all cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
