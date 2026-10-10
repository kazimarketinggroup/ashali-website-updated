"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Save, RefreshCw, Eye, Award, Plus, Trash2 } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { BookShowcaseContent } from "../../types/cms";
import { ImageUploaderField } from "./ImageUploaderField";
import defaultBookImg from "../../assets/home/updatedImage.webp";

export const CMSBookShowcaseEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  const [formData, setFormData] = useState<BookShowcaseContent>({
    ...cmsData.bookShowcase,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleFieldChange = (field: keyof BookShowcaseContent, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, { label: "New Accolade or Feature" }],
    }));
  };

  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleTagChange = (index: number, label: string) => {
    setFormData((prev) => {
      const tags = [...prev.tags];
      tags[index] = { label };
      return { ...prev, tags };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("bookShowcase", formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...cmsData.bookShowcase });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            The Unfair Advantage Book Showcase
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage the bestselling book presentation, book covers graphic, MILES framework points and store links.
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
            <span>{isSaving ? "Saving..." : "Save Book Section"}</span>
          </button>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="bg-[#0b0b0b] p-6 sm:p-10 rounded-2xl border border-neutral-800 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 z-20">
          <Eye size={12} className="text-[#2dd4bf]" />
          <span>Real-time Live Preview</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-gray-400 uppercase">
              Bestselling Book by Ash Ali &amp; Hasan Kubba
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
              <span className="bg-gradient-to-r from-[#2dd4bf] to-[#0e9aa8] bg-clip-text text-transparent">
                {formData.headline}:
              </span>{" "}
              {formData.highlightWord}
            </h2>

            <p className="text-gray-300 text-xs sm:text-[13px] leading-relaxed font-light">
              {formData.description}
            </p>

            <div className="flex flex-col gap-2 pt-2">
              {formData.tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.06] border border-white/10 text-white/90 text-xs rounded-sm max-w-fit"
                >
                  <Award size={13} className="text-[#2dd4bf]" />
                  <span>{tag.label}</span>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-3">
              <span className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-sm">
                Explore the book
              </span>
              <span className="px-4 py-2 border border-white/20 text-white font-medium text-xs rounded-sm">
                The Unfair Academy
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl flex items-center justify-center">
              {formData.bookCoverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.bookCoverImage}
                  alt="The Unfair Advantage Book Editions"
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={defaultBookImg}
                  alt="Default Book Editions"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <p className="mt-3 text-center text-xs italic text-gray-400">
              Translated into 8 languages worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <ImageUploaderField
          label="Book Showcase Image Graphic"
          value={formData.bookCoverImage || ""}
          onChange={(url) => handleFieldChange("bookCoverImage", url)}
          aspectRatio="landscape"
          helperText="Upload custom 3D book mockups or cover graphic. Transparent PNG or WebP works best."
          presets={[
            { label: "Book Covers Collage", url: "/assets/home/updatedImage.webp" },
            { label: "Single Book Photo", url: "/assets/home/unfair-advantage-book-photo.png" },
            { label: "Combined Covers", url: "/assets/home/combined-book-covers.png" },
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Book Title (Teal Gradient)
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => handleFieldChange("headline", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Headline Sub-text
            </label>
            <input
              type="text"
              value={formData.highlightWord}
              onChange={(e) => handleFieldChange("highlightWord", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Book Description & Impact
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Amazon / Retailer Purchase Link
          </label>
          <input
            type="text"
            value={formData.amazonLink}
            onChange={(e) => handleFieldChange("amazonLink", e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
          />
        </div>

        {/* Accolade Tags List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Accolade Badges & Bullet Tags
            </label>
            <button
              type="button"
              onClick={handleAddTag}
              className="text-xs text-[#FF781D] hover:text-orange-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} />
              <span>Add Badge</span>
            </button>
          </div>
          <div className="space-y-2">
            {formData.tags.map((tag, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                <Award size={15} className="text-orange-500 ml-1 shrink-0" />
                <input
                  type="text"
                  value={tag.label}
                  onChange={(e) => handleTagChange(idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTag(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 flex justify-end border-t border-slate-100">
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
