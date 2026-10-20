"use client";

import React, { useState } from "react";
import { Save, RefreshCw, ExternalLink, BarChart3 } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

interface CapabilityIndexData {
  eyebrow: string;
  headline: string;
  highlightText: string;
  description: string;
  ctaStat: string;
  reportYear: string;
  visitButtonLabel: string;
  visitButtonUrl: string;
  downloadButtonLabel: string;
}

const defaultData: CapabilityIndexData = {
  eyebrow: "Operating now",
  headline: "Building the data layer behind sales",
  highlightText: "performance in an AI era.",
  description:
    "Co-founder of Uhubs.ai, where capability data helps revenue leaders understand the people side of sales transformation: where teams are strong, where performance is constrained and which human and AI capabilities matter next. This current operating work keeps Ash's talks grounded in what companies are facing now.",
  ctaStat: "The Global Sales Capability Index 2026 is out.",
  reportYear: "2026",
  visitButtonLabel: "Visit Uhubs",
  visitButtonUrl: "https://www.uhubs.ai",
  downloadButtonLabel: "Download the full report →",
};

export const CMSCapabilityIndexEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stored = (cmsData as any).capabilityIndex as CapabilityIndexData | undefined;
  const [formData, setFormData] = useState<CapabilityIndexData>({
    ...defaultData,
    ...stored,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof CapabilityIndexData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("capabilityIndex" as keyof typeof cmsData, formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...defaultData, ...stored });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Capability Index / Uhubs Section
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Edit the Uhubs.ai capability index report download section on the
            homepage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
          >
            <RefreshCw size={13} />
            Discard Changes
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white rounded-xl shadow-sm transition-all cursor-pointer ${
              saveSuccess
                ? "bg-emerald-600 shadow-emerald-500/20"
                : "bg-gradient-to-r from-[#FF781D] to-[#E33C3C] shadow-orange-500/20 hover:opacity-95"
            }`}
          >
            <Save size={13} />
            {isSaving
              ? "Saving..."
              : saveSuccess
              ? "Saved ✓"
              : "Save Index Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-800">
              Section Copy
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Eyebrow Label
              </label>
              <input
                type="text"
                value={formData.eyebrow}
                onChange={(e) => handleChange("eyebrow", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Headline (before gradient)
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => handleChange("headline", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Gradient Highlight Text
              </label>
              <input
                type="text"
                value={formData.highlightText}
                onChange={(e) => handleChange("highlightText", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Call-to-Action Stat Line
              </label>
              <input
                type="text"
                value={formData.ctaStat}
                onChange={(e) => handleChange("ctaStat", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-800">
              Buttons & Links
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Visit Button Label
                </label>
                <input
                  type="text"
                  value={formData.visitButtonLabel}
                  onChange={(e) =>
                    handleChange("visitButtonLabel", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Visit Button URL
                </label>
                <input
                  type="url"
                  value={formData.visitButtonUrl}
                  onChange={(e) =>
                    handleChange("visitButtonUrl", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Download Button Label
              </label>
              <input
                type="text"
                value={formData.downloadButtonLabel}
                onChange={(e) =>
                  handleChange("downloadButtonLabel", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            {formData.visitButtonUrl && (
              <a
                href={formData.visitButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF781D] hover:underline"
              >
                <ExternalLink size={12} /> Preview Uhubs website
              </a>
            )}
          </div>
        </form>

        {/* Live Preview */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-bold text-slate-800">
              Real-Time Live Preview
            </h2>
          </div>
          <div className="rounded-xl overflow-hidden bg-black border border-white/10 p-6">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium mb-2">
              {formData.eyebrow}
            </div>
            <h2 className="text-base font-medium text-white/95 leading-snug mb-4">
              <span className="bg-gradient-to-r from-[#FF781D] to-[#E33C3C] bg-clip-text text-transparent">
                {formData.headline}{" "}
              </span>
              {formData.highlightText}
            </h2>
            <p className="text-xs text-white/75 leading-relaxed font-light mb-4 line-clamp-4">
              {formData.description}
            </p>
            <p className="text-xs text-white/85 font-medium mb-4">
              {formData.ctaStat}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-white text-black text-[10px] font-semibold rounded-sm">
                {formData.visitButtonLabel}
              </span>
              <span className="px-3 py-1.5 border border-white/40 text-white text-[10px] font-semibold rounded-sm">
                {formData.downloadButtonLabel}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-white/50 text-[10px]">
              <BarChart3 size={14} />
              <span>Report cover image displayed on the right →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
