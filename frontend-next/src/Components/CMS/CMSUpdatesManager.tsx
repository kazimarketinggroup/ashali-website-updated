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
  Calendar,
  Clock,
  Radio,
  Sparkles,
  User,
  ArrowRight,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { UpdateItem } from "../../types/cms";
import { CMSModal } from "./CMSModal";
import { ImageUploaderField } from "./ImageUploaderField";
import { toast } from "sonner";

export const CMSUpdatesManager: React.FC = () => {
  const { cmsData, saveItem, deleteItem, toggleItem } = useCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UpdateItem | null>(null);
  const [previewTab, setPreviewTab] = useState<"card" | "article">("card");

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
    setPreviewTab("card");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: UpdateItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setPreviewTab("card");
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
            Articles, Podcasts & Updates
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Publish thought leadership, press releases, keynote transcripts and podcast episodes with instant live preview.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>New Article / Update</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, excerpt or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Updates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUpdates.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden flex flex-col justify-between ${
              item.published ? "border-slate-200/80" : "border-amber-200/60 bg-amber-50/20"
            }`}
          >
            <div>
              {/* Cover Image & Category Pill */}
              <div className="relative aspect-[16/9] w-full bg-[#111] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider rounded-md border border-white/10">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="px-2 py-0.5 bg-gradient-to-r from-[#FF781D] to-[#E33C3C] text-white text-[10px] font-bold rounded-md flex items-center gap-1 shadow-sm">
                      <Sparkles size={10} />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/80">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{item.readTime || "5 min"}</span>
                  </span>
                </div>
              </div>

              {/* Body Info */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[200px]">
                    /updates/{item.slug}
                  </span>

                  <button
                    onClick={() => toggleItem("updates", item.id, "published")}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      item.published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.published ? <Eye size={10} /> : <EyeOff size={10} />}
                    <span>{item.published ? "Published" : "Draft"}</span>
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 hover:text-[#FF781D] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 font-normal leading-relaxed mt-2 line-clamp-2">
                  {item.excerpt}
                </p>
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
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                  title="Edit post"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
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
            className="mt-3 text-xs font-bold text-[#FF781D] hover:underline cursor-pointer"
          >
            Create a new article now &rarr;
          </button>
        </div>
      )}

      {/* Add / Edit Modal with REAL-TIME DUAL SPLIT LIVE PREVIEW */}
      <CMSModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Article / Post" : "Create New Article"}
        subtitle="Changes in the form reflect immediately in the live preview on the right"
        maxWidth="max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Controls */}
          <form onSubmit={handleSave} className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Article Title
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

            {/* Cover Image Uploader */}
            <ImageUploaderField
              label="Article Cover Photo"
              value={formData.cover || ""}
              onChange={(url) => setFormData((prev) => ({ ...prev, cover: url }))}
              helperText="Upload or choose from existing photo presets. Shows in the article header and feed."
              presets={[
                { label: "Talks at Google", url: "/press/talks-google.jpg" },
                { label: "Ash Press 1", url: "/press/ash-press-1.jpg" },
                { label: "Ash Press 2", url: "/press/ash-press-2.jpg" },
                { label: "Fortune Feature", url: "/press/fortune-feature.jpg" },
              ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  Author Name
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
                Short Excerpt
              </label>
              <textarea
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="2-3 sentence teaser shown on feed cards and Google search results"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Article Content
              </label>
              <textarea
                rows={6}
                required
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Write full article body text here..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-5 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.podcastUi}
                  onChange={(e) => setFormData((prev) => ({ ...prev, podcastUi: e.target.checked }))}
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <span>Enable Podcast Player UI</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <span>Feature at Top of Blog</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <span>Published Live</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md cursor-pointer"
              >
                {editingItem ? "Update Post" : "Publish Article"}
              </button>
            </div>
          </form>

          {/* RIGHT COLUMN: Real-Time Live Preview */}
          <div className="lg:col-span-5 bg-[#0e0e0e] rounded-2xl border border-neutral-800 p-5 text-white shadow-xl flex flex-col justify-between sticky top-4">
            <div>
              {/* Preview Header & Segmented Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                  <Eye size={13} className="text-[#FF781D]" />
                  <span>Live Preview</span>
                </div>

                <div className="flex rounded-lg bg-black/60 p-0.5 border border-white/10 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setPreviewTab("card")}
                    className={`px-2.5 py-1 rounded font-semibold transition-all ${
                      previewTab === "card" ? "bg-white text-black shadow-xs" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Feed Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab("article")}
                    className={`px-2.5 py-1 rounded font-semibold transition-all ${
                      previewTab === "article" ? "bg-white text-black shadow-xs" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Article View
                  </button>
                </div>
              </div>

              {/* Preview Mode 1: Feed Card Replica */}
              {previewTab === "card" ? (
                <div className="bg-[#141414] rounded-xl border border-neutral-800 overflow-hidden shadow-2xl">
                  <div className="relative aspect-[16/9] w-full bg-neutral-900 overflow-hidden">
                    {formData.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={formData.cover}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        No cover selected
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md text-white text-[9px] font-bold uppercase rounded border border-white/10">
                        {formData.category || "Articles"}
                      </span>
                      {formData.podcastUi && (
                        <span className="px-2 py-0.5 bg-orange-500/80 backdrop-blur-md text-white text-[9px] font-bold rounded flex items-center gap-1">
                          <Radio size={9} />
                          <span>Podcast</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-[10px] text-gray-400">
                      {formData.date} &bull; {formData.readTime}
                    </p>

                    <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 uppercase">
                      {formData.title || "Your Article Title Goes Here"}
                    </h4>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-light">
                      {formData.excerpt || "Article excerpt will appear here as a short preview of the topic."}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-orange-400 font-semibold">
                      <span>Read full story</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              ) : (
                /* Preview Mode 2: Full Article Page View Replica */
                <div className="bg-[#141414] rounded-xl border border-neutral-800 p-5 space-y-4 max-h-[480px] overflow-y-auto">
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider">
                    <span>{formData.category}</span>
                    <span>&bull;</span>
                    <span>{formData.date}</span>
                    <span>&bull;</span>
                    <span>{formData.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-tight">
                    {formData.title || "Your Headline Will Display Here"}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <User size={12} className="text-orange-500" />
                    <span>By {formData.author || "Ash Ali"}</span>
                  </div>

                  {formData.cover && (
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-neutral-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.cover}
                        alt="Article Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-3 bg-white/5 border-l-2 border-orange-500 text-xs italic text-gray-300">
                    {formData.excerpt || "Summary takeaway goes here..."}
                  </div>

                  <div className="text-xs text-gray-300 leading-relaxed space-y-2 whitespace-pre-line font-light">
                    {formData.content || "Write your article content in the editor to see it formatted here in real time."}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-800 text-center">
              <span className="text-[10px] text-gray-500">
                Visual preview reflects live rendering on /updates and /blog
              </span>
            </div>
          </div>
        </div>
      </CMSModal>
    </div>
  );
};
