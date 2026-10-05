"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Calendar,
  Clock,
  Radio,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { UpdateItem } from "../../types/cms";
import { CMSModal } from "./CMSModal";
import { toast } from "sonner";

export const CMSUpdatesManager: React.FC = () => {
  const { cmsData, saveItem, deleteItem, toggleItem } = useCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UpdateItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<UpdateItem>>({
    title: "",
    slug: "",
    category: "Articles",
    date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    excerpt: "",
    content: "",
    cover: "/press/talks-google.jpg",
    podcastUi: false,
    published: true,
    featured: false,
    readTime: "5 min read",
    author: "Ash Ali",
  });

  const categories = ["All Topics", "Featured Podcast", "Press Release", "Articles", "Case Study"];

  const filteredUpdates = cmsData.updates.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Topics" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      slug: "",
      category: "Articles",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      excerpt: "",
      content: "",
      cover: "/press/talks-google.jpg",
      podcastUi: false,
      published: true,
      featured: false,
      readTime: "5 min read",
      author: "Ash Ali",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: UpdateItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: editingItem ? prev.slug : slug,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.slug?.trim()) {
      toast.error("Title and slug are required");
      return;
    }

    const itemToSave = {
      ...formData,
      id: editingItem?.id || `up-${Date.now()}`,
    };

    const success = await saveItem("updates", itemToSave);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      await deleteItem("updates", id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Latest Updates & Articles
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage press releases, podcast features, talks and articles published on /updates.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search updates by title or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Updates */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredUpdates.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
          >
            <div>
              {/* Cover Image */}
              <div className="h-44 w-full bg-slate-900 relative overflow-hidden flex items-center justify-center">
                {item.cover ? (
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                ) : (
                  <div className="text-slate-400 flex flex-col items-center">
                    <ImageIcon size={28} />
                    <span className="text-[11px] mt-1">No cover image</span>
                  </div>
                )}

                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm uppercase tracking-wider">
                    {item.category}
                  </span>
                  {item.podcastUi && (
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-sm flex items-center gap-1">
                      <Radio size={10} />
                      <span>Podcast UI</span>
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleItem("updates", item.id, "published")}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md shadow-sm flex items-center gap-1 transition-all ${
                      item.published
                        ? "bg-emerald-500/90 text-white"
                        : "bg-slate-700/90 text-slate-200"
                    }`}
                  >
                    {item.published ? <Eye size={11} /> : <EyeOff size={11} />}
                    <span>{item.published ? "Published" : "Draft"}</span>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                  <span>&bull;</span>
                  <Clock size={12} />
                  <span>{item.readTime || "5 min read"}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#FF781D] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-3">
                  {item.excerpt}
                </p>

                <div className="text-[11px] text-slate-400 font-mono truncate">
                  Slug: /{item.slug}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`/updates/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
              >
                <span>Live View</span>
                <ExternalLink size={12} />
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
                  title="Edit post"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete post"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUpdates.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
          <p className="text-sm font-semibold text-slate-600">No updates found matching your filter</p>
          <button
            onClick={handleOpenAdd}
            className="mt-3 text-xs font-bold text-[#FF781D] hover:underline"
          >
            Create a new article now &rarr;
          </button>
        </div>
      )}

      {/* Add / Edit Modal */}
      <CMSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Article / Update" : "Create New Article"}
        subtitle="Fill in the details to publish or draft this item on the live website"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. HOW YOU ALREADY HAVE WHAT IT TAKES TO SUCCEED"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                URL Slug
              </label>
              <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <span className="px-3 py-2 text-xs font-mono text-slate-400 border-r border-slate-200">
                  /updates/
                </span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 bg-transparent text-xs font-mono text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF781D]"
              >
                <option value="Articles">Articles</option>
                <option value="Featured Podcast">Featured Podcast</option>
                <option value="Press Release">Press Release</option>
                <option value="Case Study">Case Study</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Display Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                placeholder="4 Apr 2023"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                placeholder="5 min read"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                placeholder="Ash Ali"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Cover Image URL or Path
            </label>
            <input
              type="text"
              value={formData.cover}
              onChange={(e) => setFormData((prev) => ({ ...prev, cover: e.target.value }))}
              placeholder="/press/talks-google.jpg or https://..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Excerpt (Summary for cards & SEO)
            </label>
            <textarea
              rows={2}
              required
              value={formData.excerpt}
              onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Short punchy summary..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Article Body Content
            </label>
            <textarea
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Full article markdown or paragraphs..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400"
              />
              <span className="text-xs font-semibold text-slate-700">Published live</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.podcastUi}
                onChange={(e) => setFormData((prev) => ({ ...prev, podcastUi: e.target.checked }))}
                className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400"
              />
              <span className="text-xs font-semibold text-slate-700">Display Podcast badge</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md transition-all"
            >
              {editingItem ? "Update Article" : "Publish Article"}
            </button>
          </div>
        </form>
      </CMSModal>
    </div>
  );
};
