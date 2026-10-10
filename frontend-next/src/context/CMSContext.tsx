"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { CMSData } from "../types/cms";
import { defaultCmsData } from "../data/defaultCmsData";
import { toast } from "sonner";

interface CMSContextType {
  cmsData: CMSData;
  isLoading: boolean;
  refreshCMS: () => Promise<void>;
  updateSection: (section: keyof CMSData, data: unknown) => Promise<boolean>;
  saveItem: (collection: keyof CMSData, item: Record<string, unknown>) => Promise<boolean>;
  deleteItem: (collection: keyof CMSData, id: string) => Promise<boolean>;
  toggleItem: (collection: keyof CMSData, id: string, field?: string) => Promise<boolean>;
  updateInquiryStatus: (
    id: string,
    status: "New" | "In Review" | "Replied" | "Archived",
    notes?: string
  ) => Promise<boolean>;
  deleteInquiry: (id: string) => Promise<boolean>;
  clearDemoInquiries: () => Promise<boolean>;
  deleteSubscriber: (id: string) => Promise<boolean>;
  resetDefaults: () => Promise<boolean>;
  importBackup: (backup: CMSData) => Promise<boolean>;
}

const CMSContext = createContext<CMSContextType | null>(null);

const STORAGE_KEY = "ashali_cms_client_cache_v1";

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<CMSData>(defaultCmsData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load from local cache or API on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        setCmsData({
          ...defaultCmsData,
          ...parsed,
          hero: { ...defaultCmsData.hero, ...(parsed.hero || {}) },
          helpingLeaders: { ...defaultCmsData.helpingLeaders, ...(parsed.helpingLeaders || {}) },
          signatureIdeas: { ...defaultCmsData.signatureIdeas, ...(parsed.signatureIdeas || {}) },
          bookShowcase: { ...defaultCmsData.bookShowcase, ...(parsed.bookShowcase || {}) },
          finalCta: { ...defaultCmsData.finalCta, ...(parsed.finalCta || {}) },
          footer: { ...defaultCmsData.footer, ...(parsed.footer || {}) },
        });
      }
    } catch {
      // ignore
    }

    refreshCMS();
  }, []);

  const refreshCMS = useCallback(async () => {
    try {
      const res = await fetch("/api/cms");
      if (res.ok) {
        const json = await res.json().catch(() => null);
        if (json && json.success && json.data) {
          const serverData = json.data;
          const merged: CMSData = {
            ...defaultCmsData,
            ...serverData,
            hero: { ...defaultCmsData.hero, ...(serverData.hero || {}) },
            helpingLeaders: { ...defaultCmsData.helpingLeaders, ...(serverData.helpingLeaders || {}) },
            signatureIdeas: { ...defaultCmsData.signatureIdeas, ...(serverData.signatureIdeas || {}) },
            bookShowcase: { ...defaultCmsData.bookShowcase, ...(serverData.bookShowcase || {}) },
            finalCta: { ...defaultCmsData.finalCta, ...(serverData.finalCta || {}) },
            footer: { ...defaultCmsData.footer, ...(serverData.footer || {}) },
          };
          setCmsData(merged);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch {
            // ignore
          }
        }
      }
    } catch (err) {
      console.warn("Could not fetch CMS from server, using cached/default:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSection = async (section: keyof CMSData, data: unknown): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_section", payload: { section, data } }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success(`Updated ${String(section)} successfully!`);
          return true;
        }
      }
    } catch {
      // Fallback
    }

    // Local state fallback update
    setCmsData((prev) => {
      const updated = {
        ...prev,
        [section]: data,
        lastUpdated: new Date().toISOString(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    toast.success(`Updated ${String(section)} locally`);
    return true;
  };

  const saveItem = async (
    collection: keyof CMSData,
    item: Record<string, unknown>
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_item", payload: { collection, item } }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success("Item saved successfully!");
          return true;
        }
      }
    } catch {
      // Fallback
    }

    // Local state fallback
    setCmsData((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = ([...(((prev as any)[collection] || []) as any[])]) as Array<Record<string, unknown>>;
      const existingIdx = list.findIndex((i) => i.id === item.id);
      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...item };
      } else {
        if (!item.id) item.id = `${String(collection).slice(0, 3)}-${Date.now()}`;
        list.unshift(item);
      }
      const updated = {
        ...prev,
        [collection]: list,
        lastUpdated: new Date().toISOString(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    toast.success("Item saved locally");
    return true;
  };

  const deleteItem = async (collection: keyof CMSData, id: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_item", payload: { collection, id } }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success("Item deleted successfully!");
          return true;
        }
      }
    } catch {
      // Fallback
    }

    // Local state fallback
    setCmsData((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = (((prev as any)[collection] || []) as Array<{ id: string }>).filter(
        (i) => i.id !== id
      );
      const updated = {
        ...prev,
        [collection]: list,
        lastUpdated: new Date().toISOString(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    toast.success("Item deleted locally");
    return true;
  };

  const toggleItem = async (
    collection: keyof CMSData,
    id: string,
    field = "published"
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_item", payload: { collection, id, field } }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success("Status updated!");
          return true;
        }
      }
    } catch {
      // Fallback
    }

    setCmsData((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = ([...(((prev as any)[collection] || []) as any[])]) as Array<Record<string, unknown>>;
      const target = list.find((i) => i.id === id);
      if (target) {
        target[field] = !target[field];
      }
      const updated = {
        ...prev,
        [collection]: list,
        lastUpdated: new Date().toISOString(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    toast.success("Status updated!");
    return true;
  };

  const updateInquiryStatus = async (
    id: string,
    status: "New" | "In Review" | "Replied" | "Archived",
    notes?: string
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_inquiry_status", payload: { id, status, notes } }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success(`Inquiry marked as ${status}`);
          return true;
        }
      }
    } catch {
      // Fallback
    }

    setCmsData((prev) => {
      const inqs = [...prev.inquiries];
      const target = inqs.find((i) => i.id === id);
      if (target) {
        target.status = status;
        if (notes !== undefined) target.notes = notes;
      }
      const updated = { ...prev, inquiries: inqs, lastUpdated: new Date().toISOString() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    toast.success(`Inquiry marked as ${status}`);
    return true;
  };

  const deleteInquiry = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_inquiry", payload: { id } }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success("Inquiry removed");
          return true;
        }
      }
    } catch {
      // Fallback
    }

    setCmsData((prev) => {
      const inqs = prev.inquiries.filter((i) => i.id !== id);
      const updated = { ...prev, inquiries: inqs, lastUpdated: new Date().toISOString() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    toast.success("Inquiry removed");
    return true;
  };

  const clearDemoInquiries = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear_demo_inquiries" }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success("Demo sample inquiries removed!");
          return true;
        }
      }
    } catch {
      // Fallback
    }

    const demoIds = new Set(["inq-101", "inq-102", "inq-103"]);
    setCmsData((prev) => {
      const inqs = prev.inquiries.filter((i) => !demoIds.has(i.id));
      const updated = { ...prev, inquiries: inqs, lastUpdated: new Date().toISOString() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    toast.success("Demo sample inquiries removed!");
    return true;
  };

  const deleteSubscriber = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_subscriber", payload: { id } }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success("Subscriber removed");
          return true;
        }
      }
    } catch {
      // Fallback
    }

    setCmsData((prev) => {
      const subs = prev.subscribers.filter((s) => s.id !== id);
      const updated = { ...prev, subscribers: subs, lastUpdated: new Date().toISOString() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    toast.success("Subscriber removed");
    return true;
  };

  const resetDefaults = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_defaults" }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success("Reset all content to default website content!");
          return true;
        }
      }
    } catch {
      // Fallback
    }

    setCmsData(defaultCmsData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCmsData));
    } catch {
      // ignore
    }
    toast.success("Reset all content to default website content!");
    return true;
  };

  const importBackup = async (backup: CMSData): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "import_backup", payload: backup }),
      });

      if (res.status === 401) {
        toast.error("Admin session expired. Please sign in again.");
        return false;
      }

      if (res.ok) {
        const result = await res.json().catch(() => null);
        if (result && result.success && result.data) {
          setCmsData(result.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
          toast.success("Backup restored successfully!");
          return true;
        }
      }
    } catch {
      // Fallback
    }

    setCmsData(backup);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(backup));
    } catch {
      // ignore
    }
    toast.success("Backup restored successfully!");
    return true;
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        isLoading,
        refreshCMS,
        updateSection,
        saveItem,
        deleteItem,
        toggleItem,
        updateInquiryStatus,
        deleteInquiry,
        clearDemoInquiries,
        deleteSubscriber,
        resetDefaults,
        importBackup,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    return {
      cmsData: defaultCmsData,
      isLoading: false,
      refreshCMS: async () => {},
      updateSection: async () => false,
      saveItem: async () => false,
      deleteItem: async () => false,
      toggleItem: async () => false,
      updateInquiryStatus: async () => false,
      deleteInquiry: async () => false,
      clearDemoInquiries: async () => false,
      deleteSubscriber: async () => false,
      resetDefaults: async () => false,
      importBackup: async () => false,
    };
  }
  return context;
};
