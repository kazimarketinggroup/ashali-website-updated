"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Star, Home, Sparkles, Eye, Quote } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { TestimonialItem } from "../../types/cms";
import { CMSModal } from "./CMSModal";
import { toast } from "sonner";

export const CMSTestimonialsManager: React.FC = () => {
  const { cmsData, saveItem, deleteItem, toggleItem } = useCMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [quickPreviewItem, setQuickPreviewItem] = useState<TestimonialItem | null>(null);

  const [formData, setFormData] = useState<Partial<TestimonialItem>>({
    fullName: "",
    jobTitle: "",
    organisation: "",
    event: "",
    quote: "",
    rating: 5,
    avatarUrl: "",
    logoUrl: "",
    published: true,
    featuredOnHome: true,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      fullName: "",
      jobTitle: "",
      organisation: "",
      event: "",
      quote: "",
      rating: 5,
      avatarUrl: "",
      logoUrl: "",
      published: true,
      featuredOnHome: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName?.trim() || !formData.quote?.trim()) {
      toast.error("Name and quote are required");
      return;
    }

    const itemToSave = {
      ...formData,
      id: editingItem?.id || `t-${Date.now()}`,
    };

    const success = await saveItem("testimonials", itemToSave);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the testimonial from "${name}"?`)) {
      await deleteItem("testimonials", id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Testimonials & Social Proof
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage feedback, speaker praise, attendee quotes and client company endorsements.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cmsData.testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div>
              {/* Header with stars & featured pill */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  {item.featuredOnHome && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-[#FF781D] border border-orange-200 flex items-center gap-1">
                      <Home size={10} />
                      <span>Home</span>
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.published ? "Live" : "Draft"}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="relative pl-3 border-l-2 border-orange-500/60 mb-5">
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden text-xs">
                  {item.avatarUrl ? (
                    <img src={item.avatarUrl} alt={item.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{item.fullName.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.fullName}</h4>
                  <p className="text-[11px] text-slate-500">
                    {item.jobTitle ? `${item.jobTitle}, ` : ""}
                    <strong className="text-slate-700 font-semibold">{item.organisation}</strong>
                  </p>
                  {item.event && (
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Event: {item.event}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => toggleItem("testimonials", item.id, "featuredOnHome")}
                className={`text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                  item.featuredOnHome ? "text-[#FF781D]" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Sparkles size={12} />
                <span>{item.featuredOnHome ? "Featured on Home" : "Pin to Home"}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setQuickPreviewItem(item)}
                  className="p-1.5 text-[#FF781D] hover:text-[#E33C3C] hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                  title="Preview Testimonial"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Edit Testimonial"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.fullName)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Testimonial"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal with Real-Time Live Preview */}
      <CMSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Testimonial" : "Add New Testimonial"}
        subtitle="Changes in the form reflect immediately in the live card preview on the right"
        maxWidth="max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Controls */}
          <form onSubmit={handleSave} className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="e.g. Freddie Monk"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF781D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Job Title (Optional)
                </label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
                  placeholder="Senior Director"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Organisation / Company
                </label>
                <input
                  type="text"
                  required
                  value={formData.organisation}
                  onChange={(e) => setFormData((prev) => ({ ...prev, organisation: e.target.value }))}
                  placeholder="e.g. EY or Salesforce"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Event or Context
                </label>
                <input
                  type="text"
                  value={formData.event}
                  onChange={(e) => setFormData((prev) => ({ ...prev, event: e.target.value }))}
                  placeholder="Innova Summit"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Testimonial Quote Text
              </label>
              <textarea
                rows={4}
                required
                value={formData.quote}
                onChange={(e) => setFormData((prev) => ({ ...prev, quote: e.target.value }))}
                placeholder="Ash delivered an outstanding keynote..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Star Rating (1 - 5)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                >
                  <option value={5}>5 Stars (★★★★★)</option>
                  <option value={4}>4 Stars (★★★★☆)</option>
                  <option value={3}>3 Stars (★★★☆☆)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, avatarUrl: e.target.value }))}
                  placeholder="/avatars/freddie.png"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                  className="w-4 h-4 rounded text-orange-500"
                />
                <span className="text-xs font-semibold text-slate-700">Published</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featuredOnHome}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featuredOnHome: e.target.checked }))}
                  className="w-4 h-4 rounded text-orange-500"
                />
                <span className="text-xs font-semibold text-slate-700">Feature on Homepage</span>
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
                Save Testimonial
              </button>
            </div>
          </form>

          {/* Right Column: Real-Time Live Preview */}
          <div className="lg:col-span-5 bg-[#0e0e0e] rounded-2xl border border-neutral-800 p-5 text-white shadow-xl space-y-4 sticky top-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <Eye size={13} className="text-[#FF781D]" />
                <span>Live Card Preview</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">Endorsement Card</span>
            </div>

            {/* Testimonial Card Replica */}
            <div className="bg-[#141414] rounded-xl border border-neutral-800 p-5 space-y-4 shadow-2xl relative">
              {/* Stars */}
              <div className="flex items-center gap-1 text-[#FF781D]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < (formData.rating || 5) ? "fill-[#FF781D] text-[#FF781D]" : "text-neutral-700"}
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote size={20} className="text-[#FF781D]/30 absolute -top-1 -left-1" />
                <p className="text-xs text-neutral-200 italic leading-relaxed pt-2 pl-4">
                  &ldquo;{formData.quote || "Your testimonial quote will appear here in real time..."}&rdquo;
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-3">
                {formData.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={formData.avatarUrl}
                    alt={formData.fullName || "Avatar"}
                    className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF781D] to-[#E33C3C] text-white text-xs font-bold flex items-center justify-center">
                    {(formData.fullName || "A").charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {formData.fullName || "Client Name"}
                  </p>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {formData.jobTitle ? `${formData.jobTitle}, ` : ""}
                    <span className="text-orange-400 font-semibold">{formData.organisation || "Company"}</span>
                  </p>
                </div>
              </div>

              {formData.event && (
                <div className="text-[10px] text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 flex items-center justify-between">
                  <span>Context: {formData.event}</span>
                  {formData.featuredOnHome && (
                    <span className="text-orange-400 font-semibold">Featured ★</span>
                  )}
                </div>
              )}
            </div>

            <p className="text-[10px] text-gray-500 text-center pt-2">
              Preview updates live keystroke-by-keystroke
            </p>
          </div>
        </div>
      </CMSModal>

      {/* Standalone Quick Preview Modal for Any Testimonial */}
      {quickPreviewItem && (
        <CMSModal
          isOpen={!!quickPreviewItem}
          onClose={() => setQuickPreviewItem(null)}
          title={`Testimonial: ${quickPreviewItem.fullName}`}
          subtitle={`${quickPreviewItem.organisation || "Client Review"}`}
          maxWidth="max-w-xl"
        >
          <div className="bg-[#0e0e0e] rounded-2xl border border-neutral-800 p-6 text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#FF781D]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < (quickPreviewItem.rating ?? 5) ? "fill-[#FF781D] text-[#FF781D]" : "text-neutral-700"}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-400">
                {quickPreviewItem.organisation}
              </span>
            </div>

            <p className="text-sm text-neutral-200 italic leading-relaxed">
              &ldquo;{quickPreviewItem.quote}&rdquo;
            </p>

            <div className="pt-3 border-t border-neutral-800 flex items-center gap-3">
              {quickPreviewItem.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={quickPreviewItem.avatarUrl}
                  alt={quickPreviewItem.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF781D] to-[#E33C3C] text-white text-xs font-bold flex items-center justify-center">
                  {quickPreviewItem.fullName.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-white">{quickPreviewItem.fullName}</p>
                <p className="text-xs text-neutral-400">
                  {quickPreviewItem.jobTitle} &bull; {quickPreviewItem.organisation}
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-neutral-800">
              <button
                onClick={() => {
                  const itm = quickPreviewItem;
                  setQuickPreviewItem(null);
                  handleOpenEdit(itm);
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#FF781D] to-[#E33C3C] text-white text-xs font-semibold rounded-xl"
              >
                Edit Testimonial
              </button>
            </div>
          </div>
        </CMSModal>
      )}
    </div>
  );
};
