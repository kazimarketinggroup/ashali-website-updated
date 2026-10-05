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

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const localAuth = localStorage.getItem("ashali_cms_auth");
        if (localAuth === "true") {
          setIsAuthenticated(true);
          return;
        }

        const res = await fetch("/api/cms/auth");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            return;
          }
        }
      } catch (err) {
        // Fallback
      }
      setIsAuthenticated(false);
    };

    checkAuth();
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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-orange-500/20 border-t-[#FF781D] rounded-full animate-spin" />
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
