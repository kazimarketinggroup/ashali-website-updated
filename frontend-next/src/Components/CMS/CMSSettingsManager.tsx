"use client";

import React, { useState } from "react";
import {
  Save,
  Download,
  Upload,
  RefreshCw,
  Globe,
  Shield,
  Search,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { SiteSettings } from "../../types/cms";
import { toast } from "sonner";

export const CMSSettingsManager: React.FC = () => {
  const { cmsData, updateSection, resetDefaults, importBackup } = useCMS();
  const [settings, setSettings] = useState<SiteSettings>({ ...cmsData.siteSettings });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: keyof SiteSettings, value: unknown) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("siteSettings", settings);
    setIsSaving(false);
  };

  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cmsData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `ashali_cms_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("CMS backup downloaded successfully!");
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.hero && json.updates) {
          if (confirm("Are you sure you want to restore this backup? Current content will be overwritten.")) {
            await importBackup(json);
          }
        } else {
          toast.error("Invalid CMS backup JSON structure");
        }
      } catch (err) {
        toast.error("Failed to parse JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = async () => {
    if (confirm("Reset all website content back to factory default? Any custom edits will be replaced.")) {
      await resetDefaults();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Site Settings, SEO & Backups
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure contact emails, social channels, SEO meta tags, and download content snapshots.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          <Save size={14} />
          <span>{isSaving ? "Saving..." : "Save All Settings"}</span>
        </button>
      </div>

      {/* General & Social Settings */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe size={18} className="text-[#FF781D]" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Site Contacts & Social Channels
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              General Contact Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Speaking Booking Email
            </label>
            <input
              type="email"
              value={settings.bookingEmail}
              onChange={(e) => handleChange("bookingEmail", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="text"
              value={settings.linkedinUrl}
              onChange={(e) => handleChange("linkedinUrl", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              X / Twitter URL
            </label>
            <input
              type="text"
              value={settings.twitterUrl}
              onChange={(e) => handleChange("twitterUrl", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Instagram URL
            </label>
            <input
              type="text"
              value={settings.instagramUrl}
              onChange={(e) => handleChange("instagramUrl", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              YouTube Channel URL
            </label>
            <input
              type="text"
              value={settings.youtubeUrl}
              onChange={(e) => handleChange("youtubeUrl", e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SEO & Meta Tags */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Search size={18} className="text-[#FF781D]" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            SEO & Search Engine Snippet Preview
          </h2>
        </div>

        {/* Google SERP Simulator */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Google Search Preview
          </span>
          <div className="text-xs text-slate-500 font-mono">https://www.ashali.com</div>
          <div className="text-base font-semibold text-blue-800 hover:underline cursor-pointer mt-0.5">
            {settings.seoTitle}
          </div>
          <p className="text-xs text-slate-600 line-clamp-2 mt-1">
            {settings.seoDescription}
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Global Page Title Tag
          </label>
          <input
            type="text"
            value={settings.seoTitle}
            onChange={(e) => handleChange("seoTitle", e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Global Meta Description
          </label>
          <textarea
            rows={2}
            value={settings.seoDescription}
            onChange={(e) => handleChange("seoDescription", e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Meta Keywords
          </label>
          <input
            type="text"
            value={settings.seoKeywords}
            onChange={(e) => handleChange("seoKeywords", e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Backup, Restore & Reset */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
          <Shield size={18} className="text-[#FF781D]" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Backup, Import & Factory Reset
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Download Backup */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Export JSON Backup</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Save a complete, portable copy of all website content, articles, talks and settings.
              </p>
            </div>
            <button
              onClick={handleDownloadBackup}
              className="mt-4 w-full py-2 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Download size={14} />
              <span>Download Backup</span>
            </button>
          </div>

          {/* Import Backup */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Restore from Backup</h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Upload a previously exported backup file to restore website content.
              </p>
            </div>
            <label className="mt-4 w-full py-2 bg-white border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-100 flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer">
              <Upload size={14} />
              <span>Select Backup JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset Defaults */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-rose-900">Reset to Defaults</h3>
              <p className="text-[11px] text-rose-700/80 mt-1">
                Restore the initial curated website content for Ash Ali.
              </p>
            </div>
            <button
              onClick={handleResetDefaults}
              className="mt-4 w-full py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700 flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <RefreshCw size={14} />
              <span>Reset All Content</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
