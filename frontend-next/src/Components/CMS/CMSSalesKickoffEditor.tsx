"use client";

import React, { useState } from "react";
import { Save, RefreshCw, ArrowUpRight } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

interface SalesKickoffData {
  eyebrow: string;
  headline: string;
  highlightText: string;
  afterHighlight: string;
  description: string;
  ctaPrimaryLabel: string;
  ctaPrimaryLink: string;
  ctaSecondaryLabel: string;
  statValue: string;
  statCaption: string;
  statSource: string;
  statEdition: string;
}

const defaultData: SalesKickoffData = {
  eyebrow: "SALES KICKOFF",
  headline: "Give your sales kickoff a",
  highlightText: "clear direction",
  afterHighlight: "for better execution.",
  description:
    "Ash Ali brings founder experience and findings from the Global Sales Capability Index to help your team examine its blindspots, understand where AI can support the work and agree what to improve next.",
  ctaPrimaryLabel: "Discuss your sales kickoff",
  ctaPrimaryLink: "/contact?type=sales-kickoff",
  ctaSecondaryLabel: "Get the Index",
  statValue: "76%",
  statCaption:
    "of sales professionals in the Index dataset rated their capability higher than their manager did.",
  statSource: "Uhubs Global Sales Capability Index 2026",
  statEdition: "first edition • April 2026",
};

export const CMSSalesKickoffEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stored = (cmsData as any).salesKickoff as SalesKickoffData | undefined;
  const [formData, setFormData] = useState<SalesKickoffData>({
    ...defaultData,
    ...stored,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof SalesKickoffData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("salesKickoff" as keyof typeof cmsData, formData);
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
            Sales Kickoff Section
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Edit the Sales Kickoff (SKO) section and the 76% stat card on the
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
              : "Save SKO Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-800">
              Left Column — Copy
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Eyebrow
              </label>
              <input
                type="text"
                value={formData.eyebrow}
                onChange={(e) => handleChange("eyebrow", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div className="grid grid-cols-1 gap-3">
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
                  Gradient Highlight Word(s)
                </label>
                <input
                  type="text"
                  value={formData.highlightText}
                  onChange={(e) =>
                    handleChange("highlightText", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  After Highlight
                </label>
                <input
                  type="text"
                  value={formData.afterHighlight}
                  onChange={(e) =>
                    handleChange("afterHighlight", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={formData.ctaPrimaryLabel}
                  onChange={(e) =>
                    handleChange("ctaPrimaryLabel", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Primary CTA Link
                </label>
                <input
                  type="text"
                  value={formData.ctaPrimaryLink}
                  onChange={(e) =>
                    handleChange("ctaPrimaryLink", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-800">
              Right Column — Stat Card
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Big Stat Value (e.g. &quot;76%&quot;)
              </label>
              <input
                type="text"
                value={formData.statValue}
                onChange={(e) => handleChange("statValue", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Stat Caption
              </label>
              <textarea
                value={formData.statCaption}
                onChange={(e) => handleChange("statCaption", e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Source Line
                </label>
                <input
                  type="text"
                  value={formData.statSource}
                  onChange={(e) => handleChange("statSource", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Edition Label
                </label>
                <input
                  type="text"
                  value={formData.statEdition}
                  onChange={(e) => handleChange("statEdition", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
            </div>
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
            <div className="grid grid-cols-1 gap-6">
              {/* Left preview */}
              <div>
                <div className="text-[9px] font-medium tracking-[0.2em] text-gray-400 uppercase mb-3">
                  {formData.eyebrow}
                </div>
                <h2 className="text-sm font-semibold text-white leading-snug mb-3">
                  {formData.headline}{" "}
                  <span className="bg-gradient-to-r from-[#FF781D] to-[#E33C3C] bg-clip-text text-transparent">
                    {formData.highlightText}
                  </span>{" "}
                  {formData.afterHighlight}
                </h2>
                <p className="text-[10px] text-gray-300 font-light leading-relaxed mb-4 line-clamp-3">
                  {formData.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-black text-[9px] font-semibold rounded-sm">
                    {formData.ctaPrimaryLabel}
                    <ArrowUpRight size={10} />
                  </span>
                  <span className="px-3 py-1.5 border border-white/20 text-white text-[9px] font-medium rounded-sm">
                    {formData.ctaSecondaryLabel}
                  </span>
                </div>
              </div>

              {/* Stat card preview */}
              <div className="rounded-lg bg-[#141414] border border-white/[0.08] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 bg-[#14b8a6]" />
                  <span className="text-[9px] font-medium text-gray-300 tracking-wide">
                    Global Sales Capability Index
                  </span>
                </div>
                <div
                  className="text-3xl font-bold tracking-tight mb-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF781D 0%, #E33C3C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {formData.statValue}
                </div>
                <p className="text-[10px] text-white leading-relaxed mb-2">
                  {formData.statCaption}
                </p>
                <div className="border-t border-white/[0.08] pt-2 mt-2">
                  <p className="text-[9px] text-gray-400">{formData.statSource}</p>
                  <p className="text-[9px] text-gray-500">
                    {formData.statEdition}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
