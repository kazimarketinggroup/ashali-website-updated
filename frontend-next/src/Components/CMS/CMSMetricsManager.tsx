"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  BookOpen,
  Trophy,
  Briefcase,
  MapPin,
  Users,
  Mic,
  Sparkles,
  Award,
  Globe,
  TrendingUp,
  Eye,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { MetricItem } from "../../types/cms";
import { CMSModal } from "./CMSModal";
import { toast } from "sonner";

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Trophy,
  Briefcase,
  MapPin,
  Users,
  Mic,
  Sparkles,
  Award,
  Globe,
  TrendingUp,
};

export const CMSMetricsManager: React.FC = () => {
  const { cmsData, saveItem, deleteItem, toggleItem } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MetricItem | null>(null);

  const [formData, setFormData] = useState<Partial<MetricItem>>({
    icon: "BookOpen",
    label: "",
    title: "",
    sub: "",
    row: 1,
    published: true,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      icon: "Award",
      label: "Highlight",
      title: "New Achievement",
      sub: "Details",
      row: 1,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MetricItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      toast.error("Title is required");
      return;
    }

    const itemToSave = {
      ...formData,
      id: editingItem?.id || `m-${Date.now()}`,
    };

    const success = await saveItem("metrics", itemToSave);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete metric "${title}"?`)) {
      await deleteItem("metrics", id);
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName] || Sparkles;
    return <IconComponent size={18} />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Featured Highlight Metrics & Badges
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage the prominent credential cards rendered beneath &quot;Featured In&quot; on the homepage.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Metric Card</span>
        </button>
      </div>

      {/* Row 1 Metrics */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Row 1 Metrics (Prominent 3-column row)
          </h2>
          <span className="text-xs text-slate-400 font-medium">3 cards recommended</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cmsData.metrics
            .filter((m) => m.row === 1)
            .map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-slate-100/70 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-[#FF781D] flex items-center justify-center shrink-0">
                    {renderIcon(item.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    {item.label && (
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {item.label}
                      </span>
                    )}
                    <strong className="text-xs font-bold text-slate-900 block truncate">
                      {item.title}
                    </strong>
                    {item.sub && (
                      <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                        {item.sub}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => toggleItem("metrics", item.id, "published")}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {item.published ? "Visible" : "Hidden"}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 text-slate-500 hover:text-slate-900 rounded"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1 text-rose-500 hover:text-rose-700 rounded"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Row 2 Metrics */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Row 2 Metrics (Wide 4-column row)
          </h2>
          <span className="text-xs text-slate-400 font-medium">4 cards recommended</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cmsData.metrics
            .filter((m) => m.row === 2)
            .map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:bg-slate-100/70 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-[#FF781D] flex items-center justify-center shrink-0">
                    {renderIcon(item.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    {item.label && (
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {item.label}
                      </span>
                    )}
                    <strong className="text-xs font-bold text-slate-900 block truncate">
                      {item.title}
                    </strong>
                    {item.sub && (
                      <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                        {item.sub}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => toggleItem("metrics", item.id, "published")}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.published ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {item.published ? "Visible" : "Hidden"}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 text-slate-500 hover:text-slate-900 rounded"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1 text-rose-500 hover:text-rose-700 rounded"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal with Real-time Live Preview */}
      <CMSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Highlight Card" : "Add Highlight Card"}
        subtitle="Changes in the form reflect immediately in the live metric card preview on the right"
        maxWidth="max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Controls */}
          <form onSubmit={handleSave} className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                >
                  {Object.keys(ICON_MAP).map((iconKey) => (
                    <option key={iconKey} value={iconKey}>
                      {iconKey}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Display Row
                </label>
                <select
                  value={formData.row}
                  onChange={(e) => setFormData((prev) => ({ ...prev, row: Number(e.target.value) as 1 | 2 }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                >
                  <option value={1}>Row 1 (3 items across)</option>
                  <option value={2}>Row 2 (4 items across)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Top Small Label (Optional)
              </label>
              <input
                type="text"
                value={formData.label || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value }))}
                placeholder="e.g. Co-author of or Winner"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Main Bold Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. The Unfair Advantage or Just Eat"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subtitle (Optional)
              </label>
              <input
                type="text"
                value={formData.sub || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, sub: e.target.value }))}
                placeholder="e.g. Scaled from seed stage to IPO"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="metric-pub"
                checked={formData.published}
                onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                className="w-4 h-4 rounded text-orange-500"
              />
              <label htmlFor="metric-pub" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Visible on Homepage
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md cursor-pointer hover:opacity-95"
              >
                Save Metric Card
              </button>
            </div>
          </form>

          {/* Right Column: Live Real-Time Metric Card Preview */}
          <div className="lg:col-span-5 bg-[#0e0e0e] rounded-2xl border border-neutral-800 p-5 text-white shadow-xl space-y-4 sticky top-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <Eye size={13} className="text-[#FF781D]" />
                <span>Live Card Preview</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">Row {formData.row}</span>
            </div>

            {/* Metric Card Replica */}
            {(() => {
              const IconComp = ICON_MAP[formData.icon || "Award"] || Award;
              return (
                <div className="bg-[#141414] rounded-xl border border-neutral-800 p-5 space-y-3 shadow-2xl relative group">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#FF781D] flex items-center justify-center">
                    <IconComp size={20} />
                  </div>

                  {formData.label && (
                    <p className="text-[10px] uppercase font-bold text-orange-400/90 tracking-wider">
                      {formData.label}
                    </p>
                  )}

                  <h4 className="text-lg font-bold text-white leading-tight">
                    {formData.title || "Your Achievement"}
                  </h4>

                  {formData.sub && (
                    <p className="text-xs text-neutral-400 leading-snug font-light">
                      {formData.sub}
                    </p>
                  )}
                </div>
              );
            })()}

            <p className="text-[10px] text-gray-500 text-center pt-1">
              Reflects live styling in Homepage Metrics section
            </p>
          </div>
        </div>
      </CMSModal>
    </div>
  );
};
