"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Save, Sparkles, RefreshCw, Eye, Plus, Trash2, ArrowUpRight } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { HeroContent } from "../../types/cms";
import { brandGradientTextStyle } from "../../constants/brandGradient";
import { ImageUploaderField } from "./ImageUploaderField";
import ashAliImg from "../../assets/home/updatedHeroImage.png";

export const CMSHeroEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  const [formData, setFormData] = useState<HeroContent>({ ...cmsData.hero });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof HeroContent, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
    setFormData({ ...cmsData.hero });
  };

  const handleAddButton = () => {
    setFormData((prev) => ({
      ...prev,
      secondaryButtons: [
        ...(prev.secondaryButtons || []),
        { label: "New Button", to: "/speaking" },
      ],
    }));
  };

  const handleRemoveButton = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      secondaryButtons: prev.secondaryButtons?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleButtonChange = (index: number, key: "label" | "to", value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.secondaryButtons || [])];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, secondaryButtons: updated };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Homepage Hero & Introduction
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Customize the primary headline, gradient punchline, bio, portrait photo and CTAs seen on the homepage.
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
            <span>{isSaving ? "Saving..." : "Save Hero Changes"}</span>
          </button>
        </div>
      </div>

      {/* Live Preview Card — Replicating exact website layout */}
      <div className="bg-[#101010] p-6 sm:p-8 rounded-2xl border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 z-20">
          <Eye size={12} className="text-[#FF781D]" />
          <span>Real-time Live Preview</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Hero Image in Preview */}
          <div className="lg:col-span-4 flex items-end justify-center">
            <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl flex items-end justify-center">
              {formData.heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.heroImage}
                  alt="Ash Ali"
                  className="w-full h-full object-contain object-bottom filter brightness-105"
                />
              ) : (
                <Image
                  src={ashAliImg}
                  alt="Ash Ali default"
                  className="w-full h-full object-contain object-bottom filter brightness-105"
                />
              )}
              <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] text-gray-300 backdrop-blur-xs">
                Hero Image
              </div>
            </div>
          </div>

          {/* Hero Copy in Preview */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase mb-3">
              {formData.eyebrow}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-white mb-4">
              {formData.headline}{" "}
              <span style={brandGradientTextStyle}>{formData.highlightWord}</span>
              <br />
              {formData.headlinePart2}
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6 max-w-xl">
              {formData.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-sm shadow-md">
                {formData.ctaText}
              </span>
              {formData.secondaryButtons?.map((btn) => (
                <span
                  key={btn.label}
                  className="px-4 py-2 bg-transparent border border-white/20 text-white text-xs font-medium rounded-sm"
                >
                  {btn.label}
                </span>
              ))}
            </div>

            <p className="text-[11px] text-gray-500 mt-4 italic">{formData.location}</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Eyebrow Category Header
              </label>
              <input
                type="text"
                value={formData.eyebrow}
                onChange={(e) => handleChange("eyebrow", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Shown above the main headline in small uppercase letters
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary CTA Text
                </label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => handleChange("ctaText", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CTA Destination
                </label>
                <input
                  type="text"
                  value={formData.ctaLink || "/contact"}
                  onChange={(e) => handleChange("ctaLink", e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Headline Start
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => handleChange("headline", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">e.g. &quot;Find Your&quot;</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#FF781D] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles size={12} />
                <span>Gradient Highlight Word</span>
              </label>
              <input
                type="text"
                value={formData.highlightWord}
                onChange={(e) => handleChange("highlightWord", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-orange-50/50 border border-orange-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-[#FF781D]"
              />
              <span className="text-[11px] text-orange-600 mt-1 block font-medium">
                Rendered with Ash Ali brand gradient
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Headline Line 2
              </label>
              <input
                type="text"
                value={formData.headlinePart2}
                onChange={(e) => handleChange("headlinePart2", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">e.g. &quot;In An AI Shaped World.&quot;</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Introduction Bio Paragraph
            </label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Core positioning paragraph describing Ash Ali&apos;s background and offering.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Location & Availability Bio
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>

          {/* Secondary Buttons List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Secondary Action Buttons
              </label>
              <button
                type="button"
                onClick={handleAddButton}
                className="text-xs text-[#FF781D] hover:text-orange-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} />
                <span>Add Button</span>
              </button>
            </div>
            <div className="space-y-2">
              {formData.secondaryButtons?.map((btn, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="text"
                    value={btn.label}
                    placeholder="Button Label"
                    onChange={(e) => handleButtonChange(index, "label", e.target.value)}
                    className="w-1/3 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                  />
                  <div className="relative flex-1">
                    <ArrowUpRight size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={btn.to}
                      placeholder="/route or https://"
                      onChange={(e) => handleButtonChange(index, "to", e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveButton(index)}
                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
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
