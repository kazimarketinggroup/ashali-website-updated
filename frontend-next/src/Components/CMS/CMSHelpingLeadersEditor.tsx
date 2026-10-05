"use client";

import React, { useState } from "react";
import { Save, Sparkles, RefreshCw, Eye, ExternalLink } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { HelpingLeadersContent, ServiceCardItem } from "../../types/cms";
import { BRAND_GRADIENT_LR } from "../../constants/brandGradient";
import { ImageUploaderField } from "./ImageUploaderField";

export const CMSHelpingLeadersEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  const [formData, setFormData] = useState<HelpingLeadersContent>({
    ...cmsData.helpingLeaders,
  });
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleFieldChange = (field: keyof HelpingLeadersContent, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (index: number, field: keyof ServiceCardItem, value: string) => {
    setFormData((prev) => {
      const cards = [...prev.cards];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, cards };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("helpingLeaders", formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...cmsData.helpingLeaders });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            What Ash Helps With (Services Section)
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage the headline, descriptive copy, service cards, images and links shown in the 3-column offerings section.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              ✓ Saved & live on website!
            </span>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-1.5"
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
            <span>{isSaving ? "Saving..." : "Save Section"}</span>
          </button>
        </div>
      </div>

      {/* Live Preview Card (Matches Image 2 exactly) */}
      <div className="bg-black p-6 sm:p-10 rounded-2xl border border-neutral-800 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 z-20">
          <Eye size={12} className="text-[#FF781D]" />
          <span>Real-time Live Preview</span>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4 pt-2">
          {/* Eyebrow */}
          <div className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase">
            {formData.eyebrow}
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-3xl font-semibold leading-tight tracking-tight text-white">
            <span className="text-[#d97736]">{formData.highlightWord}</span> {formData.titlePart2}
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed max-w-2xl font-light antialiased">
            {formData.description}
          </p>

          {/* 3 Square Cards (User Image 2 Replica) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6">
            {formData.cards.map((card, idx) => {
              const bgImg = card.bgImage || (
                idx === 0
                  ? "/assets/home/speaking.webp"
                  : idx === 1
                  ? "/assets/home/advisory.webp"
                  : "/assets/home/media.webp"
              );

              return (
                <div
                  key={card.id || idx}
                  onClick={() => setActiveCardIndex(idx)}
                  className={`group relative rounded-lg p-[1px] transition-all duration-300 hover:scale-[1.02] w-full aspect-square flex flex-col overflow-hidden cursor-pointer ${
                    activeCardIndex === idx ? "ring-2 ring-orange-500 shadow-lg shadow-orange-500/20" : ""
                  }`}
                  style={{ background: BRAND_GRADIENT_LR }}
                >
                  <div className="w-full h-full bg-[#080808] rounded-[7px] overflow-hidden relative flex flex-col items-center p-4 flex-grow">
                    {/* Background image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bgImg}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:opacity-20 transition-all duration-500"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px] group-hover:bg-black/75 transition-colors duration-300" />

                    {/* Content inside card */}
                    <div className="relative z-10 flex flex-col items-center justify-between h-full w-full text-center">
                      <h3 className="text-white text-[13px] sm:text-[15px] font-bold tracking-tight mt-auto mb-auto group-hover:mt-2 group-hover:mb-0 transition-all duration-300 uppercase">
                        {card.title}
                      </h3>

                      {/* Sliding reveal info */}
                      <div className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 pb-2">
                        <p className="text-gray-300 text-[10px] sm:text-[11px] leading-tight line-clamp-3 font-light px-2">
                          {card.description}
                        </p>
                        <span className="w-full max-w-[130px] py-1.5 bg-white text-black font-semibold text-[10px] rounded-xs uppercase tracking-wide">
                          {card.buttonLabel}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/60 rounded text-[9px] text-gray-400">
                      Card #{idx + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        {/* Section Heading & Copy Controls */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            1. Section Header & Copy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Eyebrow Text
              </label>
              <input
                type="text"
                value={formData.eyebrow}
                onChange={(e) => handleFieldChange("eyebrow", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">e.g. &quot;What Ash Helps With&quot;</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#FF781D] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles size={12} />
                <span>Highlight Words (Orange)</span>
              </label>
              <input
                type="text"
                value={formData.highlightWord}
                onChange={(e) => handleFieldChange("highlightWord", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-orange-50/50 border border-orange-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-[#FF781D]"
              />
              <span className="text-[11px] text-orange-600 mt-1 block">e.g. &quot;Helping leaders&quot;</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Title Remainder (White)
              </label>
              <input
                type="text"
                value={formData.titlePart2}
                onChange={(e) => handleFieldChange("titlePart2", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">e.g. &quot;build for the AI era&quot;</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Section Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>
        </div>

        {/* 3 Offerings Cards Manager */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              2. Individual Service Cards (Images, Texts & Links)
            </h2>
            <div className="flex items-center gap-1.5">
              {formData.cards.map((card, idx) => (
                <button
                  key={card.id || idx}
                  type="button"
                  onClick={() => setActiveCardIndex(idx)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeCardIndex === idx
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Card {idx + 1}: {card.title || "Untitled"}
                </button>
              ))}
            </div>
          </div>

          {/* Active Card Edit Form */}
          {formData.cards[activeCardIndex] && (
            <div className="p-5 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  Editing Card {activeCardIndex + 1} of 3
                </span>
                <span className="text-xs text-slate-500">
                  Tip: Changes update in the black preview above in real time
                </span>
              </div>

              {/* Card Background Image with Uploader & Presets */}
              <ImageUploaderField
                label={`Card ${activeCardIndex + 1} Background Image`}
                value={formData.cards[activeCardIndex].bgImage}
                onChange={(url) => handleCardChange(activeCardIndex, "bgImage", url)}
                aspectRatio="square"
                helperText="Upload any high-res photo or pick from preset photos. It is styled with dark matte blur."
                presets={[
                  { label: "Speaking / Keynote", url: "/assets/home/speaking.webp" },
                  { label: "Workshop Table", url: "/assets/home/advisory.webp" },
                  { label: "Advisory / Media", url: "/assets/home/media.webp" },
                  { label: "Dubai Stage", url: "/assets/home/dubai.png" },
                  { label: "Dinner Discussion", url: "/assets/home/dinner.png" },
                ]}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={formData.cards[activeCardIndex].title}
                    onChange={(e) => handleCardChange(activeCardIndex, "title", e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={formData.cards[activeCardIndex].buttonLabel}
                      onChange={(e) =>
                        handleCardChange(activeCardIndex, "buttonLabel", e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <span>Destination</span>
                      <ExternalLink size={11} className="text-slate-400" />
                    </label>
                    <input
                      type="text"
                      value={formData.cards[activeCardIndex].to}
                      onChange={(e) => handleCardChange(activeCardIndex, "to", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Card Description (Appears on hover)
                </label>
                <textarea
                  rows={2}
                  value={formData.cards[activeCardIndex].description}
                  onChange={(e) => handleCardChange(activeCardIndex, "description", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer save */}
        <div className="pt-3 flex items-center justify-between border-t border-slate-100">
          <p className="text-xs text-slate-400">
            Press &quot;Save Changes&quot; to push updates to the live homepage immediately.
          </p>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-gradient-to-r from-[#FF781D] to-[#E33C3C] text-white font-semibold text-sm rounded-xl shadow-md shadow-orange-500/20 hover:opacity-95 transition-all cursor-pointer"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
