"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { PortfolioItem } from "../../types/cms";
import { CMSModal } from "./CMSModal";
import { toast } from "sonner";

export const CMSPortfolioManager: React.FC = () => {
  const { cmsData, saveItem, deleteItem } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    name: "",
    role: "",
    metrics: "",
    description: "",
    url: "",
    status: "Active",
    published: true,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      role: "",
      metrics: "",
      description: "",
      url: "https://",
      status: "Active",
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      toast.error("Company / venture name is required");
      return;
    }
    const itemToSave = {
      ...formData,
      id: editingItem?.id || `p-${Date.now()}`,
    };
    const success = await saveItem("portfolio", itemToSave);
    if (success) setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Portfolio & Ventures
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage company scale stories, venture roles, advisory positions and links.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Venture / Portfolio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cmsData.portfolio.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === "Exited"
                      ? "bg-purple-50 text-purple-700"
                      : item.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {item.status}
                </span>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    item.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {item.published ? "Live" : "Draft"}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-0.5">{item.name}</h3>
              <p className="text-xs font-semibold text-[#FF781D] mb-1">{item.role}</p>
              {item.metrics && (
                <span className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded inline-block mb-3">
                  {item.metrics}
                </span>
              )}
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium"
                >
                  <span>Website</span>
                  <ExternalLink size={12} />
                </a>
              )}

              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${item.name}"?`)) deleteItem("portfolio", item.id);
                  }}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CMSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Venture" : "Add Venture"}
        subtitle="Manage venture portfolio company"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Company / Project Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Just Eat UK or Uhubs.ai"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ash Ali&apos;s Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                placeholder="First Marketing Director / Co-Founder"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Key Metric / Outcome
              </label>
              <input
                type="text"
                value={formData.metrics}
                onChange={(e) => setFormData((prev) => ({ ...prev, metrics: e.target.value }))}
                placeholder="Seed to £1.4B+ IPO"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Exited">Exited</option>
                <option value="Advising">Advising</option>
                <option value="Invested">Invested</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Website URL
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
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
              Save Venture
            </button>
          </div>
        </form>
      </CMSModal>
    </div>
  );
};
