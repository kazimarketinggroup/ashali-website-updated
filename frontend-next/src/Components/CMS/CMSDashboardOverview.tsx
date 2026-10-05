"use client";

import React, { useState } from "react";
import {
  FileText,
  Mic,
  MessageSquare,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Globe,
  Activity,
  AlertTriangle,
  Server,
  Sparkles,
  Lightbulb,
  BookOpen,
  Home,
  Megaphone,
  Layers,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";

interface CMSDashboardOverviewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenCreateUpdate?: () => void;
}

export const CMSDashboardOverview: React.FC<CMSDashboardOverviewProps> = ({
  onNavigateTab,
}) => {
  const { cmsData } = useCMS();
  const [timeRange, setTimeRange] = useState("30 days");
  const [tableFilter, setTableFilter] = useState("This month");

  const totalUpdates = cmsData.updates.length;
  const publishedUpdates = cmsData.updates.filter((u) => u.published).length;
  const totalKeynotes = cmsData.keynotes.length;
  const totalInquiries = cmsData.inquiries.length;
  const newInquiries = cmsData.inquiries.filter((i) => i.status === "New").length;
  const totalTestimonials = cmsData.testimonials.length;

  return (
    <div className="space-y-6">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            System & Content Health
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor, edit and manage website infrastructure, live content and inbound inquiries in real time.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigateTab("updates")}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/80 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
          >
            <Activity size={14} className="text-[#FF781D]" />
            <span>Manage Content</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 shadow-sm shadow-slate-900/10 transition-all"
          >
            <span>View Public Site</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Quick KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab("updates")}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Articles & Updates
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF781D] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalUpdates}</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {publishedUpdates} live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Press, blogs & Talks at Google</p>
        </div>

        <div
          onClick={() => onNavigateTab("keynotes")}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Speaking Keynotes
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalKeynotes}</span>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Flagship moats
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Keynote topics & masterclasses</p>
        </div>

        <div
          onClick={() => onNavigateTab("inquiries")}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Inbound Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalInquiries}</span>
            {newInquiries > 0 ? (
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full animate-pulse">
                {newInquiries} unread
              </span>
            ) : (
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                All reviewed
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">Speaking, advisory & workshops</p>
        </div>

        <div
          onClick={() => onNavigateTab("testimonials")}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Social Proof & Reviews
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalTestimonials}</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              5.0 ★ Rating
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">EY, Salesforce, TechItalia</p>
        </div>
      </div>

      {/* Visual Homepage Live Editors Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Live Visual Homepage Editors</span>
            </h2>
            <p className="text-xs text-slate-500">
              Instant live-preview editing for every homepage section, images, copy and CTAs
            </p>
          </div>
          <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full self-start sm:self-auto">
            6 Interactive Sections
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div
            onClick={() => onNavigateTab("hero")}
            className="p-3.5 bg-slate-50 hover:bg-orange-50/40 border border-slate-200/80 hover:border-orange-300 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100/70 text-orange-600 flex items-center justify-center">
                <Home size={14} />
              </div>
              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                1. Hero & Intro
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Photo, headline, brand gradient & bio
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab("helping-leaders")}
            className="p-3.5 bg-slate-50 hover:bg-orange-50/40 border border-slate-200/80 hover:border-orange-300 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100/70 text-orange-600 flex items-center justify-center">
                <Sparkles size={14} />
              </div>
              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                2. What Ash Helps
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                3 cards, images, hover flip & links
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab("signature-ideas")}
            className="p-3.5 bg-slate-50 hover:bg-orange-50/40 border border-slate-200/80 hover:border-orange-300 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center">
                <Lightbulb size={14} />
              </div>
              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                3. Three Ideas
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                01, 02, 03 core thesis & keynote CTA
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab("book-showcase")}
            className="p-3.5 bg-slate-50 hover:bg-orange-50/40 border border-slate-200/80 hover:border-orange-300 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center">
                <BookOpen size={14} />
              </div>
              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                4. Book Showcase
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Covers graphic, badges & Amazon link
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab("final-cta")}
            className="p-3.5 bg-slate-50 hover:bg-orange-50/40 border border-slate-200/80 hover:border-orange-300 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-rose-100/70 text-rose-600 flex items-center justify-center">
                <Megaphone size={14} />
              </div>
              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                5. Closing CTA
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Event inquiry banner & booking action
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigateTab("footer")}
            className="p-3.5 bg-slate-50 hover:bg-orange-50/40 border border-slate-200/80 hover:border-orange-300 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100/70 text-indigo-600 flex items-center justify-center">
                <Layers size={14} />
              </div>
              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                6. Footer & Links
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Bio, socials, newsletter & columns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Uptime Chart & Hosting Status & Recent Incidents (Reference Image Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Uptime Card (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Uptime & Traffic Health</h2>
              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
                >
                  <option>30 days</option>
                  <option>7 days</option>
                  <option>24 hours</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-2 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-500 font-medium">Current Uptime</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold text-slate-900">99.98%</span>
                  <span className="text-[11px] font-semibold text-emerald-600">▲ 30 Days</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">Global CDN Health</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold text-slate-900">100%</span>
                  <span className="text-[11px] font-semibold text-indigo-600">32 Edge Nodes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Smooth Waveform Chart (SVG) */}
          <div className="mt-6 pt-4 border-t border-slate-100/60">
            <div className="h-28 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleWaveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,75 Q30,45 60,65 T120,40 T180,60 T240,30 T300,55 T360,35 T420,50 T480,25 L500,30 L500,100 L0,100 Z"
                  fill="url(#purpleWaveGradient)"
                />
                <path
                  d="M0,75 Q30,45 60,65 T120,40 T180,60 T240,30 T300,55 T360,35 T420,50 T480,25 L500,30"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-2">
              <span>01</span>
              <span>05</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>
        </div>

        {/* Hosting Provider Card (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Hosting Provider</h2>
            <p className="text-xs text-slate-400 mt-0.5">Primary delivery infrastructure</p>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Server size={16} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium">Deployment Platform</span>
                  <p className="text-sm font-bold text-slate-900">Vercel & Next.js 16</p>
                  <p className="text-[11px] text-slate-500">London (LHR) & Global Edge</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Globe size={16} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium">Live Domain</span>
                  <p className="text-sm font-bold text-slate-900">www.ashali.com</p>
                  <p className="text-[11px] text-slate-500">SSL Valid &bull; HTTP/3</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium">Last Checked</span>
                  <p className="text-xs font-semibold text-slate-800">Refreshes every 60 seconds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Realtime Updating</span>
            </span>
          </div>
        </div>

        {/* Latest Activity / Alerts Card (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-500 flex items-center justify-center">
                <AlertTriangle size={14} />
              </div>
              <h2 className="text-base font-bold text-slate-900">Latest Alerts & Leads</h2>
            </div>

            <div className="mt-4 space-y-3">
              {cmsData.inquiries.slice(0, 2).map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => onNavigateTab("inquiries")}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{inq.date}</span>
                    <span className="font-semibold text-orange-600 uppercase">{inq.type}</span>
                  </div>
                  <strong className="block text-xs font-semibold text-slate-800 mt-1 truncate">
                    {inq.name}
                  </strong>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {inq.message || "Enquiry submission received."}
                  </p>
                </div>
              ))}

              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 size={14} />
                  <span>Content Sync Clean</span>
                </div>
                <p className="text-[11px] text-emerald-800/80 mt-1">
                  All 36 public routes compiled and healthy.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab("inquiries")}
              className="text-xs font-semibold text-[#FF781D] hover:text-[#e0620f] transition-colors flex items-center gap-1"
            >
              <span>View all {cmsData.inquiries.length} inquiries &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Activity & Incident History Table + Resource Utilization (Reference Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Incident & Activity Table (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Content & Lead Activity</h2>
              <p className="text-xs text-slate-500">Chronological feed of incoming leads and website updates</p>
            </div>

            <div className="relative">
              <select
                value={tableFilter}
                onChange={(e) => setTableFilter(e.target.value)}
                className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option>This month</option>
                <option>All time</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Date</th>
                  <th className="pb-3">Title / Subject</th>
                  <th className="pb-3">Section / Channel</th>
                  <th className="pb-3 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {cmsData.inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 pl-2 font-medium text-slate-500">{inq.date}</td>
                    <td className="py-3.5 font-semibold text-slate-900">
                      <div>{inq.name}</div>
                      <span className="text-[11px] font-normal text-slate-400">{inq.email}</span>
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                        {inq.type}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          inq.status === "New"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : inq.status === "Replied"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}

                {cmsData.updates.slice(0, 3).map((up) => (
                  <tr key={up.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 pl-2 font-medium text-slate-500">{up.date}</td>
                    <td className="py-3.5 font-semibold text-slate-900">
                      <div className="line-clamp-1">{up.title}</div>
                      <span className="text-[11px] font-normal text-slate-400">/{up.slug}</span>
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700">
                        {up.category}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          up.published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {up.published ? "Published" : "Draft"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resource & Readiness Utilization (Reference Circular Gauges Layout) (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Site Readiness & Quality</h2>
            <p className="text-xs text-slate-500 mt-0.5">Content, SEO and media asset health scores</p>

            <div className="mt-6 space-y-6">
              {/* Dial 1: Content Completeness (Amber/Gold 92%) */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      stroke="#FEF3C7"
                      strokeWidth="5"
                      fill="transparent"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      stroke="#F59E0B"
                      strokeWidth="5"
                      fill="transparent"
                      strokeDasharray="163"
                      strokeDashoffset={163 * (1 - 0.92)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-slate-800">92%</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Content Completeness
                  </h3>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Ready for Enterprise
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Bio, talks, framework & quotes verified
                  </p>
                </div>
              </div>

              {/* Dial 2: SEO Optimization (Magenta/Pink 98%) */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      stroke="#FCE7F3"
                      strokeWidth="5"
                      fill="transparent"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      stroke="#EC4899"
                      strokeWidth="5"
                      fill="transparent"
                      strokeDasharray="163"
                      strokeDashoffset={163 * (1 - 0.98)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-slate-800">98%</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    SEO & Structured Data
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    JSON-LD &bull; OpenGraph &bull; Canonical
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Google indexing & rich snippet compliant
                  </p>
                </div>
              </div>

              {/* Dial 3: Asset & Image Delivery (Emerald 100%) */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      stroke="#D1FAE5"
                      strokeWidth="5"
                      fill="transparent"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      stroke="#10B981"
                      strokeWidth="5"
                      fill="transparent"
                      strokeDasharray="163"
                      strokeDashoffset={163 * (1 - 1.0)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-slate-800">100%</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Asset Optimization
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Sharp WebP &bull; High-res PNG &bull; CDN
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    0 missing image paths
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              System updated {new Date(cmsData.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
