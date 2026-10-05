"use client";

import React, { useState } from "react";
import {
  Save,
  RefreshCw,
  Eye,
  Plus,
  Trash2,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { FooterContent, FooterLinkItem } from "../../types/cms";
import { BRAND_GRADIENT_LR } from "../../constants/brandGradient";

export const CMSFooterEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  const [formData, setFormData] = useState<FooterContent>({
    ...cmsData.footer,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const year = new Date().getFullYear();

  const handleFieldChange = (field: keyof FooterContent, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleColumnHeadingChange = (colIdx: number, heading: string) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      cols[colIdx] = { ...cols[colIdx], heading };
      return { ...prev, columns: cols };
    });
  };

  const handleLinkChange = (
    colIdx: number,
    linkIdx: number,
    field: keyof FooterLinkItem,
    value: unknown
  ) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      const links = [...cols[colIdx].links];
      links[linkIdx] = { ...links[linkIdx], [field]: value };
      cols[colIdx] = { ...cols[colIdx], links };
      return { ...prev, columns: cols };
    });
  };

  const handleAddLink = (colIdx: number) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      cols[colIdx] = {
        ...cols[colIdx],
        links: [...cols[colIdx].links, { label: "New Link", to: "/" }],
      };
      return { ...prev, columns: cols };
    });
  };

  const handleRemoveLink = (colIdx: number, linkIdx: number) => {
    setFormData((prev) => {
      const cols = [...prev.columns];
      cols[colIdx] = {
        ...cols[colIdx],
        links: cols[colIdx].links.filter((_, i) => i !== linkIdx),
      };
      return { ...prev, columns: cols };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("footer", formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...cmsData.footer });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Website Footer & Global Navigation
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Customize the global footer bio, location tracker, newsletter banner, social channels, and navigation columns.
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
            <span>{isSaving ? "Saving..." : "Save Footer Changes"}</span>
          </button>
        </div>
      </div>

      {/* Real-time Live Preview Card — Exact SiteFooter Replica */}
      <div className="bg-black p-6 sm:p-10 rounded-2xl border border-neutral-800 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 z-20">
          <Eye size={12} className="text-[#FF781D]" />
          <span>Real-time Live Preview</span>
        </div>

        <div className="max-w-6xl mx-auto pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Bio Column */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-2xl font-bold tracking-tight text-white">
                {formData.brandName}
              </p>

              <div className="flex items-center gap-2">
                {formData.linkedinUrl && (
                  <span className="w-7 h-7 rounded-full p-px flex items-center justify-center bg-gradient-to-r from-[#FF781D] to-[#E33C3C]">
                    <span className="w-full h-full bg-black rounded-full flex items-center justify-center text-white">
                      <Linkedin size={12} />
                    </span>
                  </span>
                )}
                {formData.twitterUrl && (
                  <span className="w-7 h-7 rounded-full p-px flex items-center justify-center bg-gradient-to-r from-[#FF781D] to-[#E33C3C]">
                    <span className="w-full h-full bg-black rounded-full flex items-center justify-center text-white text-[11px] font-bold">
                      𝕏
                    </span>
                  </span>
                )}
              </div>

              <p className="text-xs text-white/80 leading-relaxed font-light">
                {formData.bio}
              </p>

              <p className="text-[11px] text-white/50 tracking-wider">
                {formData.locations}
              </p>
            </div>

            {/* Right Newsletter & Links Columns */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-sm sm:text-base font-semibold text-white">
                  {formData.newsletterHeading}
                </p>
                <p className="text-xs text-white/70 mt-1">
                  {formData.newsletterSubtitle}
                </p>
                <div className="mt-3 flex gap-2 max-w-md">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1.5 text-xs text-white/50">
                    Email address...
                  </div>
                  <div className="px-4 py-1.5 bg-white text-black font-semibold text-xs rounded">
                    Subscribe
                  </div>
                </div>
              </div>

              {/* 3 Nav Columns in Preview */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                {formData.columns.map((col, cIdx) => (
                  <div key={cIdx}>
                    <p className="text-xs font-semibold text-white mb-2">
                      {col.heading}
                    </p>
                    <ul className="space-y-1.5">
                      {col.links.map((link, lIdx) => (
                        <li
                          key={lIdx}
                          className="text-[11px] text-white/60 hover:text-white"
                        >
                          {link.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="my-5 h-[2px] w-full"
            style={{ background: BRAND_GRADIENT_LR }}
          />

          <p className="text-[11px] text-white/60">
            © {year} {formData.copyright}
          </p>
        </div>
      </div>

      {/* Form Controls */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        {/* Basic Brand Info */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            1. Brand Identity & Bio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Brand Title
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleFieldChange("brandName", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location Tracker Line
              </label>
              <input
                type="text"
                value={formData.locations}
                onChange={(e) => handleFieldChange("locations", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Footer Bio Description
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => handleFieldChange("bio", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={formData.linkedinUrl}
                onChange={(e) => handleFieldChange("linkedinUrl", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                X / Twitter URL
              </label>
              <input
                type="text"
                value={formData.twitterUrl}
                onChange={(e) => handleFieldChange("twitterUrl", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Instagram URL
              </label>
              <input
                type="text"
                value={formData.instagramUrl || ""}
                onChange={(e) => handleFieldChange("instagramUrl", e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            2. Newsletter Callout
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Newsletter Heading
              </label>
              <input
                type="text"
                value={formData.newsletterHeading}
                onChange={(e) =>
                  handleFieldChange("newsletterHeading", e.target.value)
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Newsletter Subtitle
              </label>
              <input
                type="text"
                value={formData.newsletterSubtitle}
                onChange={(e) =>
                  handleFieldChange("newsletterSubtitle", e.target.value)
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>
          </div>
        </div>

        {/* 3 Nav Link Columns */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            3. Footer Navigation Columns
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formData.columns.map((col, colIdx) => (
              <div
                key={colIdx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
              >
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Column {colIdx + 1} Heading
                  </label>
                  <input
                    type="text"
                    value={col.heading}
                    onChange={(e) =>
                      handleColumnHeadingChange(colIdx, e.target.value)
                    }
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                      Links ({col.links.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddLink(colIdx)}
                      className="text-[11px] text-[#FF781D] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                    >
                      <Plus size={11} />
                      <span>Add</span>
                    </button>
                  </div>

                  {col.links.map((link, linkIdx) => (
                    <div
                      key={linkIdx}
                      className="flex items-center gap-1.5 p-1.5 bg-white rounded-lg border border-slate-200"
                    >
                      <input
                        type="text"
                        value={link.label}
                        placeholder="Label"
                        onChange={(e) =>
                          handleLinkChange(colIdx, linkIdx, "label", e.target.value)
                        }
                        className="w-1/2 px-2 py-1 text-[11px] font-medium text-slate-800 bg-transparent border-none focus:outline-none"
                      />
                      <div className="relative flex-1">
                        <ArrowUpRight
                          size={10}
                          className="absolute left-1.5 top-2 text-slate-400"
                        />
                        <input
                          type="text"
                          value={link.to}
                          placeholder="/route or https://"
                          onChange={(e) =>
                            handleLinkChange(colIdx, linkIdx, "to", e.target.value)
                          }
                          className="w-full pl-5 pr-1 py-1 text-[11px] text-slate-600 bg-transparent border-none focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(colIdx, linkIdx)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright notice */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Copyright Line Text
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              © {year}
            </span>
            <input
              type="text"
              value={formData.copyright}
              onChange={(e) => handleFieldChange("copyright", e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end border-t border-slate-100">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-gradient-to-r from-[#FF781D] to-[#E33C3C] text-white font-semibold text-sm rounded-xl shadow-md shadow-orange-500/20 hover:opacity-95 transition-all cursor-pointer"
          >
            {isSaving ? "Saving..." : "Save Footer Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
