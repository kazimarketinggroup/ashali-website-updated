"use client";

import React, { useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

interface BuildingBridgesData {
  regionLabel: string;
  headlinePart1: string;
  headlineHighlight: string;
  paragraphs: string[];
  primaryButtonLabel: string;
  primaryButtonLink: string;
  secondaryButtonLabel: string;
  secondaryButtonLink: string;
  imageAlt: string;
}

const defaultData: BuildingBridgesData = {
  regionLabel: "• Malaysia & Southeast Asia",
  headlinePart1: "A global founder's perspective, on the ground in",
  headlineHighlight: "Malaysia and SEA.",
  paragraphs: [
    "A region at an inflection point: young talent, fast AI adoption and rising regional ambition.",
    "Based between London and Kuala Lumpur, Ash brings a global founder/operator perspective to organisations and communities across the UK, Malaysia and Southeast Asia: speaking, advising and supporting the region's next generation of founders and leaders.",
  ],
  primaryButtonLabel: "Read More",
  primaryButtonLink: "/malaysia-sea",
  secondaryButtonLabel: "Work with Ash",
  secondaryButtonLink: "/contact",
  imageAlt: "Ash Ali speaking on stage in Southeast Asia",
};

export const CMSBuildingBridgesEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stored = (cmsData as any).buildingBridges as BuildingBridgesData | undefined;
  const [formData, setFormData] = useState<BuildingBridgesData>({
    ...defaultData,
    ...stored,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof BuildingBridgesData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleParagraphChange = (index: number, value: string) => {
    const updated = [...formData.paragraphs];
    updated[index] = value;
    handleChange("paragraphs", updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("buildingBridges" as keyof typeof cmsData, formData);
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
            Building Bridges — Malaysia & SEA
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Edit the Malaysia & Southeast Asia section that appears on the
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
              : "Save Section Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-800">
              Section Content
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Region Label
              </label>
              <input
                type="text"
                value={formData.regionLabel}
                onChange={(e) =>
                  handleChange("regionLabel", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Headline (before highlight)
              </label>
              <input
                type="text"
                value={formData.headlinePart1}
                onChange={(e) =>
                  handleChange("headlinePart1", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Highlight Text (teal coloured)
              </label>
              <input
                type="text"
                value={formData.headlineHighlight}
                onChange={(e) =>
                  handleChange("headlineHighlight", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            {formData.paragraphs.map((p, idx) => (
              <div key={idx}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Paragraph {idx + 1}
                </label>
                <textarea
                  value={p}
                  onChange={(e) =>
                    handleParagraphChange(idx, e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D] resize-none"
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-800">
              Buttons
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Primary Button Label
                </label>
                <input
                  type="text"
                  value={formData.primaryButtonLabel}
                  onChange={(e) =>
                    handleChange("primaryButtonLabel", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  value={formData.primaryButtonLink}
                  onChange={(e) =>
                    handleChange("primaryButtonLink", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Secondary Button Label
                </label>
                <input
                  type="text"
                  value={formData.secondaryButtonLabel}
                  onChange={(e) =>
                    handleChange("secondaryButtonLabel", e.target.value)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  value={formData.secondaryButtonLink}
                  onChange={(e) =>
                    handleChange("secondaryButtonLink", e.target.value)
                  }
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
          <div className="rounded-xl overflow-hidden bg-[#101010] border border-white/10 p-6">
            <div className="flex flex-col gap-4">
              {/* Image placeholder */}
              <div className="relative w-full max-w-[200px] mx-auto">
                <div className="pt-2 pr-2 relative">
                  <span className="absolute right-0 top-0 h-[calc(100%-10px)] w-[calc(100%-10px)] bg-[#ff7417]" />
                  <div className="relative z-10 aspect-[1.4/1] bg-neutral-800 border border-white/10 flex items-center justify-center text-[10px] text-gray-500">
                    Stage Photo
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="text-center">
                <p className="text-[10px] text-white/70 mb-2">
                  {formData.regionLabel}
                </p>
                <h2 className="text-sm font-medium text-white/95 leading-snug mb-3">
                  {formData.headlinePart1}{" "}
                  <span className="text-[#19b5a5]">
                    {formData.headlineHighlight}
                  </span>
                </h2>
                <div className="space-y-2">
                  {formData.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-[10px] text-white/80 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2 justify-center mt-4">
                  <span className="px-3 py-1.5 border border-white/30 text-white text-[9px] font-medium rounded-sm">
                    {formData.primaryButtonLabel}
                  </span>
                  <span className="px-3 py-1.5 border border-white/30 text-white text-[9px] font-medium rounded-sm">
                    {formData.secondaryButtonLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
