"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  FileText,
  Save,
  ExternalLink,
  Eye,
  Edit3,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { LegalPageContent } from "../../types/cms";
import { defaultCmsData } from "../../data/defaultCmsData";
import { brandGradientTextStyle } from "../../constants/brandGradient";
import { toast } from "sonner";

export const CMSLegalPagesEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("edit");
  const [isSaving, setIsSaving] = useState(false);

  // Local state for Privacy Policy
  const [privacyForm, setPrivacyForm] = useState<LegalPageContent>({
    title: cmsData.privacyPolicy?.title || defaultCmsData.privacyPolicy.title,
    lastUpdated: cmsData.privacyPolicy?.lastUpdated || defaultCmsData.privacyPolicy.lastUpdated,
    intro: cmsData.privacyPolicy?.intro || defaultCmsData.privacyPolicy.intro,
    content: cmsData.privacyPolicy?.content || defaultCmsData.privacyPolicy.content,
  });

  // Local state for Terms & Conditions
  const [termsForm, setTermsForm] = useState<LegalPageContent>({
    title: cmsData.termsConditions?.title || defaultCmsData.termsConditions.title,
    lastUpdated: cmsData.termsConditions?.lastUpdated || defaultCmsData.termsConditions.lastUpdated,
    intro: cmsData.termsConditions?.intro || defaultCmsData.termsConditions.intro,
    content: cmsData.termsConditions?.content || defaultCmsData.termsConditions.content,
  });

  useEffect(() => {
    if (cmsData.privacyPolicy) {
      setPrivacyForm({
        title: cmsData.privacyPolicy.title || defaultCmsData.privacyPolicy.title,
        lastUpdated: cmsData.privacyPolicy.lastUpdated || defaultCmsData.privacyPolicy.lastUpdated,
        intro: cmsData.privacyPolicy.intro ?? defaultCmsData.privacyPolicy.intro,
        content: cmsData.privacyPolicy.content || defaultCmsData.privacyPolicy.content,
      });
    }
  }, [cmsData.privacyPolicy]);

  useEffect(() => {
    if (cmsData.termsConditions) {
      setTermsForm({
        title: cmsData.termsConditions.title || defaultCmsData.termsConditions.title,
        lastUpdated: cmsData.termsConditions.lastUpdated || defaultCmsData.termsConditions.lastUpdated,
        intro: cmsData.termsConditions.intro ?? defaultCmsData.termsConditions.intro,
        content: cmsData.termsConditions.content || defaultCmsData.termsConditions.content,
      });
    }
  }, [cmsData.termsConditions]);

  const currentForm = activeTab === "privacy" ? privacyForm : termsForm;
  const setCurrentForm = activeTab === "privacy" ? setPrivacyForm : setTermsForm;

  const handleFieldChange = (field: keyof LegalPageContent, value: string) => {
    setCurrentForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      const sectionKey = activeTab === "privacy" ? "privacyPolicy" : "termsConditions";
      const payload = activeTab === "privacy" ? privacyForm : termsForm;
      const success = await updateSection(sectionKey, payload);
      if (success) {
        toast.success(
          `${activeTab === "privacy" ? "Privacy Policy" : "Terms & Conditions"} saved and live!`
        );
      }
    } catch {
      toast.error("Failed to save legal page changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = () => {
    const defaultData =
      activeTab === "privacy"
        ? defaultCmsData.privacyPolicy
        : defaultCmsData.termsConditions;
    if (
      window.confirm(
        `Reset ${activeTab === "privacy" ? "Privacy Policy" : "Terms & Conditions"} to original default legal content?`
      )
    ) {
      setCurrentForm({ ...defaultData });
      toast.info("Reset to default. Remember to click Save to publish live.");
    }
  };

  const renderSimpleMarkdown = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        return (
          <h3
            key={idx}
            className="text-base sm:text-lg font-bold text-white mt-6 mb-2 border-b border-white/10 pb-1"
          >
            <span style={brandGradientTextStyle}>{trimmed.replace("## ", "")}</span>
          </h3>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-sm font-semibold text-white/90 mt-4 mb-2">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="text-xs text-white/80 ml-5 list-disc mb-1 leading-relaxed">
            {trimmed.replace(/^- /, "")}
          </li>
        );
      }
      if (trimmed === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-xs text-white/80 leading-relaxed mb-3">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-orange-100 text-[#FF781D] rounded-lg">
              <Shield size={18} />
            </span>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Privacy Policy & Terms Management
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Edit and publish live Privacy Policy and Terms & Conditions directly to the public website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={activeTab === "privacy" ? "/privacy" : "/terms"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
          >
            <ExternalLink size={13} />
            <span>View Live Page</span>
          </a>

          <button
            onClick={() => handleSave()}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save size={14} />
            <span>{isSaving ? "Saving..." : "Publish Live Changes"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "privacy"
                ? "bg-[#FF781D] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Shield size={14} />
            <span>Privacy Policy (/privacy)</span>
          </button>

          <button
            onClick={() => setActiveTab("terms")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "terms"
                ? "bg-[#FF781D] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <FileText size={14} />
            <span>Terms & Conditions (/terms)</span>
          </button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode("edit")}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === "edit" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Edit3 size={12} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setViewMode("split")}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              viewMode === "split" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <CheckCircle2 size={12} />
            <span>Side-by-Side</span>
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewMode === "preview" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Eye size={12} />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Panels */}
      <div className={`grid gap-6 ${viewMode === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
        {/* Editor Form */}
        {(viewMode === "edit" || viewMode === "split") && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Document Details
              </span>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset to Default Content</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Page Heading / Title
                </label>
                <input
                  type="text"
                  value={currentForm.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Last Updated Date
                </label>
                <input
                  type="text"
                  value={currentForm.lastUpdated}
                  onChange={(e) => handleFieldChange("lastUpdated", e.target.value)}
                  placeholder="e.g. April 2026"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Introductory Summary Callout
              </label>
              <textarea
                rows={2}
                value={currentForm.intro || ""}
                onChange={(e) => handleFieldChange("intro", e.target.value)}
                placeholder="Brief summary appearing at the top of the policy page..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Full Policy Content (Markdown & Headings)
                </label>
                <span className="text-[11px] text-slate-400">
                  Tip: Use ## for section headings and - for bullet points
                </span>
              </div>
              <textarea
                rows={18}
                value={currentForm.content}
                onChange={(e) => handleFieldChange("content", e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono leading-relaxed text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleSave()}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Save size={14} />
                <span>{isSaving ? "Publishing..." : `Publish ${activeTab === "privacy" ? "Privacy Policy" : "Terms"} Live`}</span>
              </button>
            </div>
          </div>
        )}

        {/* Live Preview Panel */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div className="bg-black text-white p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl overflow-y-auto max-h-[800px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Live Public Preview: {activeTab === "privacy" ? "/privacy" : "/terms"}
                </span>
              </div>
              <span className="text-[11px] text-neutral-500">Dark Theme</span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.08] text-[10px] font-medium text-white/70 mb-3">
                <Shield size={11} className="text-[#FF781D]" />
                <span>Legal & Governance</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                {currentForm.title}
              </h1>

              <div className="text-[11px] text-white/50 mb-6">
                Last Updated: {currentForm.lastUpdated} • ashali.com
              </div>

              {currentForm.intro && (
                <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white/90 leading-relaxed mb-6">
                  {currentForm.intro}
                </div>
              )}

              <div className="space-y-1">
                {renderSimpleMarkdown(currentForm.content)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMSLegalPagesEditor;
