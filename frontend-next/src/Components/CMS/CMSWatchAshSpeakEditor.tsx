"use client";

import React, { useState } from "react";
import { Save, RefreshCw, ExternalLink, Play } from "lucide-react";
import { useCMS } from "../../context/CMSContext";

interface WatchAshSpeakData {
  title: string;
  youtubeUrl: string;
  videoTitle: string;
}

const defaultData: WatchAshSpeakData = {
  title: "Watch Ash speak",
  youtubeUrl: "https://www.youtube.com/watch?v=rMB2lFUMXpY",
  videoTitle:
    "What is your unfair advantage? | Ash Ali | TEDxRoyalHolloway",
};

export const CMSWatchAshSpeakEditor: React.FC = () => {
  const { cmsData, updateSection } = useCMS();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stored = (cmsData as any).watchAshSpeak as WatchAshSpeakData | undefined;
  const [formData, setFormData] = useState<WatchAshSpeakData>({
    ...defaultData,
    ...stored,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (field: keyof WatchAshSpeakData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection("watchAshSpeak" as keyof typeof cmsData, formData);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...defaultData, ...stored });
  };

  /* Extract video ID for thumbnail */
  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };
  const videoId = extractVideoId(formData.youtubeUrl);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Watch Ash Speak — Video Section
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Edit the featured speaking video that appears after the hero on the
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
              : "Save Video Changes"}
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
                Section Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                YouTube Video URL
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => handleChange("youtubeUrl", e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Video Accessibility Title
              </label>
              <input
                type="text"
                value={formData.videoTitle}
                onChange={(e) => handleChange("videoTitle", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
              />
            </div>

            {formData.youtubeUrl && (
              <a
                href={formData.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF781D] hover:underline"
              >
                <ExternalLink size={12} /> Open video on YouTube
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
          <div className="rounded-xl overflow-hidden bg-black border border-white/10">
            <div className="py-8 px-4 text-center">
              <h2 className="text-white text-lg font-semibold tracking-tight mb-6">
                {formData.title}
              </h2>
              <div className="max-w-md mx-auto rounded-lg overflow-hidden border border-white/10 relative">
                {videoId ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt={formData.videoTitle}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play
                          size={24}
                          className="text-black ml-1"
                          fill="black"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-neutral-900 flex items-center justify-center text-neutral-500 text-xs">
                    Enter a valid YouTube URL to see the preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
