"use client";

import React, { useState } from "react";
import {
  HeartPulse,
  Home,
  FileText,
  Mic,
  Briefcase,
  Users,
  Award,
  Globe,
  Video,
  MessageSquare,
  Mail,
  Settings,
  Search,
  ExternalLink,
  LogOut,
  Bell,
  Sun,
  Menu,
  X,
  Sparkles,
  Lightbulb,
  BookOpen,
  Megaphone,
  Layers,
  Eye,
  Play,
  BarChart3,
  Target,
  Map,
  RefreshCw,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { useCMS } from "../../context/CMSContext";
import { CMSGlobalLivePreview } from "./CMSGlobalLivePreview";

interface CMSLayoutProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const CMSLayout: React.FC<CMSLayoutProps> = ({
  activeTab,
  onSelectTab,
  onLogout,
  children,
}) => {
  const { cmsData, refreshCMS } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [liveSitePreviewOpen, setLiveSitePreviewOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncLive = async () => {
    setIsSyncing(true);
    try {
      await refreshCMS();
      toast.success("Live CMS content fetched and synchronized!");
    } catch {
      toast.error("Could not sync live CMS data.");
    } finally {
      setIsSyncing(false);
    }
  };

  const newInquiriesCount = cmsData.inquiries.filter((i) => i.status === "New").length;

  const navGroups: NavGroup[] = [
    {
      group: "DASHBOARD",
      items: [
        { id: "overview", label: "System Health & Overview", icon: HeartPulse },
      ],
    },
    {
      group: "HOMEPAGE SECTIONS",
      items: [
        { id: "hero", label: "Hero & Introduction", icon: Home },
        { id: "watch-ash-speak", label: "Watch Ash Speak", icon: Play },
        { id: "helping-leaders", label: "What Ash Helps With", icon: Sparkles },
        { id: "signature-ideas", label: "Three Signature Ideas", icon: Lightbulb },
        { id: "book-showcase", label: "Book Showcase", icon: BookOpen },
        { id: "capability-index", label: "Capability Index / Uhubs", icon: BarChart3 },
        { id: "sales-kickoff", label: "Sales Kickoff", icon: Target },
        { id: "building-bridges", label: "Malaysia & SEA", icon: Map },
        { id: "final-cta", label: "Closing CTA Banner", icon: Megaphone },
        { id: "footer", label: "Footer & Global Links", icon: Layers },
      ],
    },
    {
      group: "CONTENT COLLECTIONS",
      items: [
        {
          id: "updates",
          label: "Articles & Updates",
          icon: FileText,
          badge: cmsData.updates.length,
          badgeColor: "bg-slate-100 text-slate-700",
        },
        {
          id: "keynotes",
          label: "Speaking & Keynotes",
          icon: Mic,
          badge: cmsData.keynotes.length,
          badgeColor: "bg-indigo-50 text-indigo-700",
        },
        { id: "workshops", label: "Workshops & FAQs", icon: Briefcase },
        { id: "testimonials", label: "Testimonials & Reviews", icon: Users },
        { id: "metrics", label: "Highlights & Metrics", icon: Award },
        { id: "portfolio", label: "Portfolio & Previous Projects", icon: Globe },
        { id: "media", label: "Media & Press", icon: Video },
      ],
    },
    {
      group: "COMMUNICATIONS",
      items: [
        {
          id: "inquiries",
          label: "Inbound Inquiries",
          icon: MessageSquare,
          badge: newInquiriesCount > 0 ? `${newInquiriesCount} new` : undefined,
          badgeColor: "bg-amber-100 text-amber-800 font-bold",
        },
        {
          id: "subscribers",
          label: "Subscribers",
          icon: Mail,
          badge: cmsData.subscribers.length,
          badgeColor: "bg-slate-100 text-slate-600",
        },
      ],
    },
    {
      group: "SETTINGS",
      items: [
        { id: "settings", label: "Site, SEO & Backups", icon: Settings },
        { id: "legal-pages", label: "Privacy & Terms", icon: Shield },
      ],
    },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans select-none antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Brand Identity on Topbar (Desktop & Mobile) */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF781D] to-[#E33C3C] flex items-center justify-center text-white shadow-sm font-black text-sm">
              AA
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Ash Ali</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF781D] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200/60">
                  CMS Studio
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Global Search Bar (Matching Reference Image) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search content, articles, settings... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Right Topbar Icons & Profile Pill (Matching Reference Image) */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleSyncLive}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs transition-all cursor-pointer disabled:opacity-60"
            title="Fetch fresh data from live website and MongoDB Atlas"
          >
            <RefreshCw size={12} className={`text-emerald-600 ${isSyncing ? "animate-spin" : ""}`} />
            <span className="hidden md:inline">{isSyncing ? "Syncing..." : "Sync Live Site"}</span>
          </button>

          <button
            type="button"
            onClick={() => setLiveSitePreviewOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 shadow-sm shadow-orange-500/20 transition-all cursor-pointer"
            title="Open Interactive Full Website Preview with Desktop/Tablet/Mobile viewports"
          >
            <Eye size={13} />
            <span className="hidden sm:inline">Live Site Preview</span>
            <span className="sm:hidden">Preview</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-all"
          >
            <span>New Tab</span>
            <ExternalLink size={12} />
          </a>

          {/* Notification Bell */}
          <button
            onClick={() => onSelectTab("inquiries")}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
            title="Notifications"
          >
            <Bell size={18} />
            {newInquiriesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF781D] ring-2 ring-white" />
            )}
          </button>

          {/* Theme Indicator (Sun icon like reference) */}
          <div className="p-2 text-amber-500 bg-amber-50/60 rounded-xl border border-amber-200/60">
            <Sun size={17} />
          </div>

          {/* Admin User Pill (Matching Reference Profile) */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200/80">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow-xs">
                A
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">Ash Ali Admin</p>
              <p className="text-[10px] text-slate-400 leading-tight">Super Admin</p>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (Desktop) */}
        <aside
          className={`fixed inset-y-16 left-0 z-20 w-64 bg-white border-r border-slate-200/80 p-4 overflow-y-auto flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-6">
            {navGroups.map((group) => (
              <div key={group.group}>
                <span className="block px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  {group.group}
                </span>

                <nav className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-slate-100 text-slate-900 shadow-xs border border-slate-200/50"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            size={16}
                            className={isActive ? "text-[#FF781D]" : "text-slate-400"}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.badge !== undefined && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full ${
                              item.badgeColor || "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 mt-6 border-t border-slate-100 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  CMS Status
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online & Synced</span>
                </span>
              </div>
              <button
                onClick={onLogout}
                className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors"
                title="Log out"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-10 bg-slate-900/40 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Content Container (Offset by sidebar width on lg) */}
        <main className="flex-1 lg:pl-64 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Global Interactive Live Website Preview Modal */}
      <CMSGlobalLivePreview
        isOpen={liveSitePreviewOpen}
        onClose={() => setLiveSitePreviewOpen(false)}
        initialRoute={
          activeTab === "updates"
            ? "/updates"
            : activeTab === "keynotes"
            ? "/speaking"
            : activeTab === "workshops"
            ? "/workshops"
            : activeTab === "book-showcase"
            ? "/unfair-advantage"
            : "/"
        }
      />
    </div>
  );
};
