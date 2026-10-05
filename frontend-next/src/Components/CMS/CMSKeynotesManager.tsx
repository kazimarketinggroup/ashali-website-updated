"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Clock, Users, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { KeynoteItem } from "../../types/cms";
import { CMSModal } from "./CMSModal";
import { toast } from "sonner";

export const CMSKeynotesManager: React.FC = () => {
  const { cmsData, saveItem, deleteItem, toggleItem } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KeynoteItem | null>(null);

  const [formData, setFormData] = useState<Partial<KeynoteItem>>({
    title: "",
    subtitle: "",
    badge: "Keynote",
    duration: "45–60 mins",
    targetAudience: "Leaders, C-Suite, Conferences",
    description: "",
    takeaways: ["Key takeaway insight 1", "Key takeaway insight 2"],
    published: true,
    order: 1,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      subtitle: "",
      badge: "Flagship Keynote",
      duration: "45–60 mins",
      targetAudience: "Enterprise Leaders, C-Suite, Global Summits",
      description: "",
      takeaways: [""],
      published: true,
      order: cmsData.keynotes.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: KeynoteItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleTakeawayChange = (index: number, val: string) => {
    const list = [...(formData.takeaways || [])];
    list[index] = val;
    setFormData((prev) => ({ ...prev, takeaways: list }));
  };

  const handleAddTakeaway = () => {
    setFormData((prev) => ({
      ...prev,
      takeaways: [...(prev.takeaways || []), ""],
    }));
  };

  const handleRemoveTakeaway = (index: number) => {
    const list = (formData.takeaways || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, takeaways: list }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      toast.error("Title is required");
      return;
    }

    const itemToSave = {
      ...formData,
      id: editingItem?.id || `kn-${Date.now()}`,
      takeaways: (formData.takeaways || []).filter((t) => t.trim().length > 0),
    };

    const success = await saveItem("keynotes", itemToSave);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteItem("keynotes", id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Keynotes & Speaking Topics
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage international speaking programs, durations, target audiences and takeaways.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Keynote Topic</span>
        </button>
      </div>

      {/* List of Keynotes */}
      <div className="space-y-4">
        {cmsData.keynotes.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-start justify-between gap-6 group"
          >
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-[#FF781D] border border-orange-200 uppercase tracking-wider">
                  {item.badge || "Keynote"}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  <Clock size={12} />
                  <span>{item.duration}</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  <Users size={12} />
                  <span>{item.targetAudience}</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF781D] transition-colors">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{item.subtitle}</p>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                {item.description}
              </p>

              {item.takeaways && item.takeaways.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Core Audience Takeaways
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {item.takeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex lg:flex-col items-center gap-2 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <button
                onClick={() => toggleItem("keynotes", item.id, "published")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  item.published
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {item.published ? <Eye size={12} /> : <EyeOff size={12} />}
                <span>{item.published ? "Active" : "Hidden"}</span>
              </button>

              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Edit Keynote"
              >
                <Edit2 size={16} />
              </button>

              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete Keynote"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <CMSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Keynote Speech" : "Add Keynote Speech"}
        subtitle="Manage talk messaging, duration, and participant takeaways"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Keynote Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. The Unfair Advantage: Winning in an AI-Disrupted Economy"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subtitle / Angle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Tactical playbook for executives"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Badge Tag
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))}
                placeholder="Flagship Keynote / New for 2026"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                placeholder="45–60 mins"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="Enterprise Leaders, C-Suite, Founders"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="What this keynote delivers to the audience..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Audience Key Takeaways
              </label>
              <button
                type="button"
                onClick={handleAddTakeaway}
                className="text-[11px] font-bold text-[#FF781D] hover:underline flex items-center gap-1"
              >
                <Plus size={12} />
                <span>Add Bullet Point</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.takeaways?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleTakeawayChange(idx, e.target.value)}
                    placeholder={`Takeaway point #${idx + 1}`}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTakeaway(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
                    title="Remove point"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="kn-published"
              checked={formData.published}
              onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
              className="w-4 h-4 rounded text-orange-500"
            />
            <label htmlFor="kn-published" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Visible on /speaking page
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md"
            >
              Save Keynote
            </button>
          </div>
        </form>
      </CMSModal>
    </div>
  );
};
