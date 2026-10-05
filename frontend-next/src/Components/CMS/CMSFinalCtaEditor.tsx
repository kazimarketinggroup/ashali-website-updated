"use client";

import React, { useState } from "react";
import { Save, RefreshCw, Eye, ArrowUpRight } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { FinalCtaContent } from "../../types/cms";

export const CMSFinalCtaEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  const [formData, setFormData] = useState<FinalCtaContent>({
    ...cmsData.finalCta,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof FinalCtaContent, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("finalCta", formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...cmsData.finalCta });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Homepage Closing CTA Banner
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Customize the bottom call to action banner that encourages event organizers and clients to get in touch.
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
            <span>{isSaving ? "Saving..." : "Save Banner"}</span>
          </button>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="bg-[#0c0c0c] p-8 sm:p-12 rounded-2xl border border-neutral-800 text-white shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 z-20">
          <Eye size={12} className="text-[#FF781D]" />
          <span>Real-time Live Preview</span>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col items-center gap-5 pt-2">
          <h2 className="text-xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
            {formData.heading}
          </h2>

          <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed max-w-xl font-light">
            {formData.body}
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black font-semibold text-xs rounded-sm shadow-md cursor-pointer hover:bg-neutral-100">
              {formData.ctaLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            CTA Banner Heading
          </label>
          <input
            type="text"
            value={formData.heading}
            onChange={(e) => handleChange("heading", e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Body Copy
          </label>
          <textarea
            rows={3}
            value={formData.body}
            onChange={(e) => handleChange("body", e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Button Label
            </label>
            <input
              type="text"
              value={formData.ctaLabel}
              onChange={(e) => handleChange("ctaLabel", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <span>Button Destination URL</span>
              <ArrowUpRight size={12} className="text-slate-400" />
            </label>
            <input
              type="text"
              value={formData.ctaTo}
              onChange={(e) => handleChange("ctaTo", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
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
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
