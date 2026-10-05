"use client";

import React, { useState, useRef } from "react";
import {
  X,
  RefreshCw,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  ChevronDown,
} from "lucide-react";

interface CMSGlobalLivePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoute?: string;
}

const PRESET_ROUTES = [
  { label: "Homepage (/)", path: "/" },
  { label: "Articles & Updates (/updates)", path: "/updates" },
  { label: "Speaking & Keynotes (/speaking)", path: "/speaking" },
  { label: "Workshops (/workshops)", path: "/workshops" },
  { label: "Book Showcase (/unfair-advantage)", path: "/unfair-advantage" },
  { label: "Advisory (/advisory)", path: "/advisory" },
  { label: "Impact & About (/about)", path: "/about" },
];

export const CMSGlobalLivePreview: React.FC<CMSGlobalLivePreviewProps> = ({
  isOpen,
  onClose,
  initialRoute = "/",
}) => {
  const [currentPath, setCurrentPath] = useState(initialRoute);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setIsLoading(true);
    setKey((prev) => prev + 1);
  };

  const getDeviceWidth = () => {
    switch (device) {
      case "mobile":
        return "max-w-[400px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Controller Bar */}
      <div className="h-14 bg-black border-b border-neutral-800 px-4 flex items-center justify-between gap-4 text-white z-20">
        {/* Left: Brand & Page Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-xs uppercase tracking-wider text-neutral-300 hidden md:inline">
              Live Interactive Website
            </span>
          </div>

          <div className="h-4 w-px bg-neutral-800 hidden md:block" />

          {/* Route selector */}
          <div className="relative">
            <select
              value={currentPath}
              onChange={(e) => {
                setCurrentPath(e.target.value);
                setIsLoading(true);
              }}
              className="bg-neutral-900 border border-neutral-700 text-xs font-semibold text-white rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:border-[#FF781D] cursor-pointer"
            >
              {PRESET_ROUTES.map((route) => (
                <option key={route.path} value={route.path} className="bg-neutral-900 text-white">
                  {route.label}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Center: Device Viewport Switches */}
        <div className="hidden sm:flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              device === "desktop"
                ? "bg-white text-black shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Monitor size={13} />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              device === "tablet"
                ? "bg-white text-black shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Tablet size={13} />
            <span>Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              device === "mobile"
                ? "bg-white text-black shadow-xs"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Smartphone size={13} />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Actions (Refresh, Open Tab, Close) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            title="Reload live preview"
            className="p-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-800 transition-colors cursor-pointer"
          >
            <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
          </button>

          <a
            href={currentPath}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new browser tab"
            className="p-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-800 transition-colors hidden sm:inline-flex cursor-pointer"
          >
            <ExternalLink size={15} />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 bg-neutral-900 hover:bg-rose-950 hover:text-rose-400 text-neutral-300 rounded-lg border border-neutral-800 transition-colors ml-2 cursor-pointer"
            title="Close live preview"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 overflow-auto bg-neutral-950 p-2 sm:p-6 flex items-center justify-center">
        <div
          className={`${getDeviceWidth()} h-full transition-all duration-300 flex flex-col bg-black rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative`}
        >
          {/* Iframe Loading Bar */}
          {isLoading && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF781D] to-[#E33C3C] animate-pulse z-30" />
          )}

          {/* Embedded Live Web Application */}
          <iframe
            key={key}
            ref={iframeRef}
            src={currentPath}
            title="Live Site Preview"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full border-none bg-black flex-1"
          />
        </div>
      </div>
    </div>
  );
};
