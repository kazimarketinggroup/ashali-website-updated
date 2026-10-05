"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, Check, Loader2, X } from "lucide-react";

interface ImageUploaderFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  presets?: Array<{ label: string; url: string }>;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
  placeholderText?: string;
}

export const ImageUploaderField: React.FC<ImageUploaderFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  presets = [],
  aspectRatio = "landscape",
  placeholderText = "Paste image URL or upload a file",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState(value || "");

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square w-28 sm:w-32"
      : aspectRatio === "portrait"
      ? "w-28 sm:w-32 h-36 sm:h-40"
      : aspectRatio === "wide"
      ? "w-44 sm:w-56 h-28"
      : "w-36 sm:w-44 h-24";

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        onChange(data.url);
        setCustomUrl(data.url);
      } else {
        // Fallback: If local API upload has issue, create a data URL for client preview/persistence
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            onChange(reader.result);
            setCustomUrl(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch {
      // Graceful fallback to client data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result);
          setCustomUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleApplyUrl = () => {
    if (customUrl.trim()) {
      onChange(customUrl.trim());
    }
  };

  const handleClear = () => {
    onChange("");
    setCustomUrl("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-1 font-medium transition-colors"
          >
            <X size={12} />
            <span>Remove</span>
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-4 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
        {/* Preview Box */}
        <div
          className={`${aspectClass} relative rounded-lg border border-slate-200 bg-[#0d0d0d] overflow-hidden flex items-center justify-center shrink-0 shadow-inner group`}
        >
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] text-white font-medium bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                  Current
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
              <ImageIcon size={22} className="mb-1 text-slate-400" />
              <span className="text-[10px] text-slate-400 font-medium">Default/None</span>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white backdrop-blur-xs">
              <Loader2 size={18} className="animate-spin text-orange-400 mb-1" />
              <span className="text-[10px] font-medium">Uploading...</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 w-full space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <UploadCloud size={14} className="text-orange-400" />
              <span>{value ? "Upload Different Image" : "Upload File"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LinkIcon size={12} className="text-slate-500" />
              <span>{showUrlInput ? "Hide URL Input" : "Image URL"}</span>
            </button>
          </div>

          {/* URL Input Bar */}
          {showUrlInput && (
            <div className="flex items-center gap-2 pt-1 animate-fadeIn">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder={placeholderText}
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-all flex items-center gap-1 shrink-0"
              >
                <Check size={12} />
                <span>Apply</span>
              </button>
            </div>
          )}

          {/* Quick Presets */}
          {presets.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Presets:
              </span>
              {presets.map((preset) => {
                const isActive = value === preset.url;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      onChange(preset.url);
                      setCustomUrl(preset.url);
                    }}
                    className={`px-2 py-0.5 text-[11px] rounded font-medium transition-all ${
                      isActive
                        ? "bg-orange-500 text-white font-semibold shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          )}

          {uploadError && (
            <p className="text-[11px] text-red-500 font-medium">{uploadError}</p>
          )}

          {helperText && (
            <p className="text-[11px] text-slate-400 leading-tight">{helperText}</p>
          )}
        </div>
      </div>
    </div>
  );
};
