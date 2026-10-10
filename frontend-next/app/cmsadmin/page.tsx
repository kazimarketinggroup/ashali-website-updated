"use client";

import { useState, useEffect } from "react";
import { CMSLayout } from "@/src/Components/CMS/CMSLayout";
import { CMSLogin } from "@/src/Components/CMS/CMSLogin";
import { CMSDashboardOverview } from "@/src/Components/CMS/CMSDashboardOverview";
import { CMSHeroEditor } from "@/src/Components/CMS/CMSHeroEditor";
import { CMSHelpingLeadersEditor } from "@/src/Components/CMS/CMSHelpingLeadersEditor";
import { CMSSignatureIdeasEditor } from "@/src/Components/CMS/CMSSignatureIdeasEditor";
import { CMSBookShowcaseEditor } from "@/src/Components/CMS/CMSBookShowcaseEditor";
import { CMSFinalCtaEditor } from "@/src/Components/CMS/CMSFinalCtaEditor";
import { CMSFooterEditor } from "@/src/Components/CMS/CMSFooterEditor";
import { CMSUpdatesManager } from "@/src/Components/CMS/CMSUpdatesManager";
import { CMSKeynotesManager } from "@/src/Components/CMS/CMSKeynotesManager";
import { CMSWorkshopsFaqManager } from "@/src/Components/CMS/CMSWorkshopsFaqManager";
import { CMSTestimonialsManager } from "@/src/Components/CMS/CMSTestimonialsManager";
import { CMSMetricsManager } from "@/src/Components/CMS/CMSMetricsManager";
import { CMSPortfolioManager } from "@/src/Components/CMS/CMSPortfolioManager";
import { CMSMediaManager } from "@/src/Components/CMS/CMSMediaManager";
import { CMSInquiriesManager } from "@/src/Components/CMS/CMSInquiriesManager";
import { CMSSubscribersManager } from "@/src/Components/CMS/CMSSubscribersManager";
import { CMSSettingsManager } from "@/src/Components/CMS/CMSSettingsManager";

export default function CMSAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Server-verified authentication on mount
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/cms/auth", {
          method: "GET",
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });

        if (res.ok) {
          const data = await res.json().catch(() => null);
          if (data && data.authenticated) {
            if (isMounted) setIsAuthenticated(true);
            return;
          }
        }
      } catch (err) {
        console.warn("Auth check failed:", err);
      }

      if (isMounted) {
        localStorage.removeItem("ashali_cms_auth");
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } catch {
      // Ignore
    }
    localStorage.removeItem("ashali_cms_auth");
    setIsAuthenticated(false);
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-3">
        <div className="w-9 h-9 border-3 border-orange-500/20 border-t-[#FF781D] rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500 tracking-wide">
          Verifying security session...
        </span>
      </div>
    );
  }

  // Login view
  if (!isAuthenticated) {
    return <CMSLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Dashboard view with tab switching
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <CMSDashboardOverview onNavigateTab={setActiveTab} />;
      case "hero":
        return <CMSHeroEditor />;
      case "helping-leaders":
        return <CMSHelpingLeadersEditor />;
      case "signature-ideas":
        return <CMSSignatureIdeasEditor />;
      case "book-showcase":
        return <CMSBookShowcaseEditor />;
      case "final-cta":
        return <CMSFinalCtaEditor />;
      case "footer":
        return <CMSFooterEditor />;
      case "updates":
        return <CMSUpdatesManager />;
      case "keynotes":
        return <CMSKeynotesManager />;
      case "workshops":
        return <CMSWorkshopsFaqManager />;
      case "testimonials":
        return <CMSTestimonialsManager />;
      case "metrics":
        return <CMSMetricsManager />;
      case "portfolio":
        return <CMSPortfolioManager />;
      case "media":
        return <CMSMediaManager />;
      case "inquiries":
        return <CMSInquiriesManager />;
      case "subscribers":
        return <CMSSubscribersManager />;
      case "settings":
        return <CMSSettingsManager />;
      default:
        return <CMSDashboardOverview onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <CMSLayout
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      onLogout={handleLogout}
    >
      {renderActiveTabContent()}
    </CMSLayout>
  );
}
