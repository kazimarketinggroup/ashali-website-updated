"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink, Video, FileText, Headphones } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { MediaItem } from "../../types/cms";
import { CMSModal } from "./CMSModal";
import { toast } from "sonner";

export const CMSMediaManager: React.FC = () => {
  const { cmsData, saveItem, deleteItem } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);

  const [formData, setFormData] = useState<Partial<MediaItem>>({
    title: "",
    publication: "Google",
    type: "Video",
    url: "",
    date: "2024",
    published: true,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      publication: "BBC",
      type: "Video",
      url: "https://",
      date: new Date().getFullYear().toString(),
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: MediaItem) => {
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
      id: editingItem?.id || `med-${Date.now()}`,
    };
    const success = await saveItem("media", itemToSave);
    if (success) setIsModalOpen(false);
  };

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video size={14} className="text-rose-500" />;
      case "Podcast":
        return <Headphones size={14} className="text-purple-500" />;
      default:
        return <FileText size={14} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Media & Press Appearances
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage Talks at Google, TEDx, podcasts, TV & radio appearances, and press features.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Media Feature</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cmsData.media.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start justify-between gap-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                {renderTypeIcon(item.type)}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF781D]">
                    {item.publication}
                  </span>
                  <span className="text-[10px] text-slate-400">&bull; {item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mt-1 font-medium"
                  >
                    <span>Visit source</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${item.title}"?`)) deleteItem("media", item.id);
                }}
                className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CMSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Media Appearance" : "Add Media Appearance"}
        subtitle="Manage public interview, feature, or podcast"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Title / Talk Name
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Talks at Google: How to Find Your Unfair Advantage"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Publication / Host
              </label>
              <input
                type="text"
                required
                value={formData.publication}
                onChange={(e) => setFormData((prev) => ({ ...prev, publication: e.target.value }))}
                placeholder="Google / BBC / Forbes"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Format
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              >
                <option value="Video">Video</option>
                <option value="Podcast">Podcast</option>
                <option value="Article">Article</option>
                <option value="Interview">Interview</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Year / Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                placeholder="2024"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              External Link URL
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
              placeholder="https://youtube.com/..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
            />
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
              Save Media
            </button>
          </div>
        </form>
      </CMSModal>
    </div>
  );
};
