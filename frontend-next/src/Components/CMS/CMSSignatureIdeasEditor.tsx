"use client";

import React, { useState } from "react";
import { Save, RefreshCw, Eye, ArrowUpRight } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { SignatureIdeasContent, IdeaItem } from "../../types/cms";

export const CMSSignatureIdeasEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  const [formData, setFormData] = useState<SignatureIdeasContent>({
    ...cmsData.signatureIdeas,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleFieldChange = (field: keyof SignatureIdeasContent, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIdeaChange = (index: number, field: keyof IdeaItem, value: string) => {
    setFormData((prev) => {
      const ideas = [...prev.ideas];
      ideas[index] = { ...ideas[index], [field]: value };
      return { ...prev, ideas };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("signatureIdeas", formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...cmsData.signatureIdeas });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Three Ideas Built For This Moment
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage the core thesis cards, numbering, headings, and speaking keynote button on the homepage.
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
            <span>{isSaving ? "Saving..." : "Save Ideas Section"}</span>
          </button>
        </div>
      </div>

      {/* Live Preview Card — Exactly matching User Image 3 */}
      <div className="bg-black p-6 sm:p-10 rounded-2xl border border-neutral-800 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 z-20">
          <Eye size={12} className="text-[#FF781D]" />
          <span>Real-time Live Preview</span>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-10 pt-2">
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
            {formData.heading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left">
            {formData.ideas.map((idea, idx) => (
              <div
                key={idea.number || idx}
                className="bg-[#0e0e0e] border border-[#222222] rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-md group"
              >
                <div>
                  <span className="text-[12px] font-bold tracking-[0.2em] text-[#d97736] block mb-4">
                    {idea.number}
                  </span>
                  <h3 className="text-white text-[15px] sm:text-[16px] font-semibold leading-snug tracking-wide mb-3">
                    {idea.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-[13px] leading-relaxed font-light">
                    {idea.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <span className="inline-flex items-center justify-center px-6 py-2.5 bg-black border border-neutral-700 text-white font-medium text-xs rounded-md shadow-sm hover:border-neutral-500 transition-all cursor-pointer">
              {formData.buttonText}
            </span>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Section Heading
            </label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => handleFieldChange("heading", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Bottom Button Label
            </label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) => handleFieldChange("buttonText", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <span>Button Destination URL</span>
              <ArrowUpRight size={12} className="text-slate-400" />
            </label>
            <input
              type="text"
              value={formData.buttonLink}
              onChange={(e) => handleFieldChange("buttonLink", e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>
        </div>

        {/* 3 Idea Cards Editor */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Signature Ideas (Cards 01, 02, 03)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {formData.ideas.map((idea, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                    Idea Card #{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={idea.number}
                    onChange={(e) => handleIdeaChange(idx, "number", e.target.value)}
                    className="w-14 px-2 py-1 text-center bg-white border border-slate-200 rounded-lg text-xs font-bold text-orange-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={idea.title}
                    onChange={(e) => handleIdeaChange(idx, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Card Description
                  </label>
                  <textarea
                    rows={3}
                    value={idea.description}
                    onChange={(e) => handleIdeaChange(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
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
