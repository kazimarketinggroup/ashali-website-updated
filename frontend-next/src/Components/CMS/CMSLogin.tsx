"use client";

import React, { useState } from "react";
import { Lock, User, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface CMSLoginProps {
  onLoginSuccess: () => void;
}

export const CMSLogin: React.FC<CMSLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const trimUser = (username || "").trim();
    const trimPass = (password || "").trim();

    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimUser, password: trimPass }),
      });

      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.success) {
          toast.success("Welcome back, Ash Ali Admin!");
          localStorage.setItem("ashali_cms_auth", "true");
          onLoginSuccess();
          return;
        }
      }
    } catch {
      // Continue to client-side credential verification
    }

    // Direct fallback validation for admin / admin
    if (trimUser === "admin" && trimPass === "admin") {
      toast.success("Welcome back, Ash Ali Admin!");
      localStorage.setItem("ashali_cms_auth", "true");
      onLoginSuccess();
    } else {
      setError("Invalid username or password. Default is admin / admin.");
      toast.error("Authentication failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] text-slate-800 p-4 select-none relative overflow-hidden">
      {/* Background soft ambient blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-8 sm:p-10 relative z-10 transition-all">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF781D] to-[#E33C3C] flex items-center justify-center text-white shadow-lg shadow-orange-500/20 mb-4">
            <Sparkles size={28} className="animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-widest text-[#FF781D] uppercase mb-1">
            Control Center
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Ash Ali CMS Studio
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xs">
            Sign in to edit, add, or remove content across the entire website in real time.
          </p>
        </div>

        {/* Credentials Tip Callout */}
        <div className="mb-6 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-xs flex items-start gap-2.5">
          <ShieldCheck size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-950">Default Credentials Set:</span>
            <p className="text-amber-800/90 mt-0.5">
              Username: <code className="bg-amber-100/80 px-1.5 py-0.5 rounded font-mono text-amber-900 font-bold">admin</code> &bull; Password: <code className="bg-amber-100/80 px-1.5 py-0.5 rounded font-mono text-amber-900 font-bold">admin</code>
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF781D]/30 focus:border-[#FF781D] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF781D]/30 focus:border-[#FF781D] transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:from-[#f36f14] hover:to-[#d03131] text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Studio</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Ash Ali CMS &bull; Secure Access</span>
          <a
            href="/"
            className="text-slate-500 hover:text-slate-800 transition-colors font-medium"
          >
            &larr; Back to website
          </a>
        </div>
      </div>
    </div>
  );
};
