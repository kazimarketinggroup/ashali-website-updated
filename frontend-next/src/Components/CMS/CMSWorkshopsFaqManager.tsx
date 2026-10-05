"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, HelpCircle, Briefcase, Eye, Clock, Globe, ChevronDown } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { FaqItem, WorkshopItem } from "../../types/cms";
import { CMSModal } from "./CMSModal";
import { toast } from "sonner";

export const CMSWorkshopsFaqManager: React.FC = () => {
  const { cmsData, saveItem, deleteItem } = useCMS();
  const [activeTab, setActiveTab] = useState<"workshops" | "faqs">("workshops");

  // Workshop modal
  const [isWsModalOpen, setIsWsModalOpen] = useState(false);
  const [editingWs, setEditingWs] = useState<WorkshopItem | null>(null);
  const [wsForm, setWsForm] = useState<Partial<WorkshopItem>>({
    title: "",
    tagline: "",
    duration: "Half-Day or Full-Day",
    format: "In-Person or Interactive Virtual",
    description: "",
    keyOutcomes: [""],
    published: true,
  });

  // FAQ modal
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [faqForm, setFaqForm] = useState<Partial<FaqItem>>({
    question: "",
    answer: "",
    category: "Speaking",
    published: true,
  });

  // Handlers for Workshops
  const handleOpenAddWs = () => {
    setEditingWs(null);
    setWsForm({
      title: "",
      tagline: "",
      duration: "Half-Day or Full-Day",
      format: "In-Person or Interactive Virtual",
      description: "",
      keyOutcomes: [""],
      published: true,
    });
    setIsWsModalOpen(true);
  };

  const handleOpenEditWs = (item: WorkshopItem) => {
    setEditingWs(item);
    setWsForm({ ...item });
    setIsWsModalOpen(true);
  };

  const handleSaveWs = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wsForm.title?.trim()) {
      toast.error("Workshop title is required");
      return;
    }
    const itemToSave = {
      ...wsForm,
      id: editingWs?.id || `ws-${Date.now()}`,
      keyOutcomes: (wsForm.keyOutcomes || []).filter((o) => o.trim().length > 0),
    };
    const success = await saveItem("workshops", itemToSave);
    if (success) setIsWsModalOpen(false);
  };

  // Handlers for FAQs
  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setFaqForm({
      question: "",
      answer: "",
      category: "Speaking",
      published: true,
    });
    setIsFaqModalOpen(true);
  };

  const handleOpenEditFaq = (item: FaqItem) => {
    setEditingFaq(item);
    setFaqForm({ ...item });
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question?.trim() || !faqForm.answer?.trim()) {
      toast.error("Question and answer are required");
      return;
    }
    const itemToSave = {
      ...faqForm,
      id: editingFaq?.id || `faq-${Date.now()}`,
    };
    const success = await saveItem("faqs", itemToSave);
    if (success) setIsFaqModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header with Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Workshops & FAQs
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage executive strategy labs, masterclasses, and client frequently asked questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "workshops" ? (
            <button
              onClick={handleOpenAddWs}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Workshop</span>
            </button>
          ) : (
            <button
              onClick={handleOpenAddFaq}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] hover:opacity-95 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>Add FAQ Question</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-navigation pill tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("workshops")}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === "workshops"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <span className="flex items-center gap-2">
            <Briefcase size={14} />
            <span>Workshops ({cmsData.workshops.length})</span>
          </span>
        </button>
        <button
          onClick={() => setActiveTab("faqs")}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === "faqs"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <span className="flex items-center gap-2">
            <HelpCircle size={14} />
            <span>FAQs ({cmsData.faqs.length})</span>
          </span>
        </button>
      </div>

      {/* Tab 1: Workshops */}
      {activeTab === "workshops" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cmsData.workshops.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                    {item.format}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      item.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.published ? "Active" : "Draft"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
                {item.tagline && <p className="text-xs text-orange-600 font-medium mb-3">{item.tagline}</p>}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.description}</p>

                {item.keyOutcomes && item.keyOutcomes.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Key Outcomes
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1">
                      {item.keyOutcomes.map((oc, i) => (
                        <li key={i}>{oc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{item.duration}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditWs(item)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${item.title}"?`)) deleteItem("workshops", item.id);
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
      )}

      {/* Tab 2: FAQs */}
      {activeTab === "faqs" && (
        <div className="space-y-3">
          {cmsData.faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                    {faq.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      faq.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {faq.published ? "Live" : "Hidden"}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{faq.question}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                <button
                  onClick={() => handleOpenEditFaq(faq)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete question "${faq.question}"?`)) deleteItem("faqs", faq.id);
                  }}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workshop Modal with Real-time Live Preview */}
      <CMSModal
        isOpen={isWsModalOpen}
        onClose={() => setIsWsModalOpen(false)}
        title={editingWs ? "Edit Workshop" : "Add Workshop"}
        subtitle="Changes reflect immediately in the live workshop card preview on the right"
        maxWidth="max-w-5xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Controls */}
          <form onSubmit={handleSaveWs} className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Workshop Title
              </label>
              <input
                type="text"
                required
                value={wsForm.title}
                onChange={(e) => setWsForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Executive Masterclass: Unfair Advantage Strategy Lab"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={wsForm.tagline}
                onChange={(e) => setWsForm((prev) => ({ ...prev, tagline: e.target.value }))}
                placeholder="High-impact strategic sprint for leadership teams"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={wsForm.duration}
                  onChange={(e) => setWsForm((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="Half-Day or Full-Day"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Format
                </label>
                <input
                  type="text"
                  value={wsForm.format}
                  onChange={(e) => setWsForm((prev) => ({ ...prev, format: e.target.value }))}
                  placeholder="In-Person or Interactive Virtual"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
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
                value={wsForm.description}
                onChange={(e) => setWsForm((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsWsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md cursor-pointer hover:opacity-95"
              >
                Save Workshop
              </button>
            </div>
          </form>

          {/* Right Column: Live Real-time Workshop Card Preview */}
          <div className="lg:col-span-5 bg-[#0e0e0e] rounded-2xl border border-neutral-800 p-5 text-white shadow-xl space-y-4 sticky top-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <Eye size={13} className="text-[#FF781D]" />
                <span>Live Workshop Preview</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">/workshops</span>
            </div>

            {/* Workshop Card Replica */}
            <div className="bg-[#141414] rounded-xl border border-neutral-800 p-5 space-y-3 shadow-2xl relative">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1">
                  <Clock size={10} />
                  <span>{wsForm.duration || "Half-Day / Full-Day"}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-neutral-300 border border-white/10 flex items-center gap-1">
                  <Globe size={10} />
                  <span>{wsForm.format || "In-Person & Virtual"}</span>
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-snug">
                {wsForm.title || "Your Workshop Title"}
              </h4>

              {wsForm.tagline && (
                <p className="text-xs font-semibold text-orange-400/90">
                  {wsForm.tagline}
                </p>
              )}

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {wsForm.description || "Detailed workshop methodology and outcomes will appear here."}
              </p>

              <div className="pt-2">
                <div className="w-full py-2 bg-gradient-to-r from-[#FF781D] to-[#E33C3C] text-white text-xs font-semibold rounded-lg text-center shadow-md">
                  Inquire For Workshop &rarr;
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 text-center pt-1">
              Preview renders in real-time as you type
            </p>
          </div>
        </div>
      </CMSModal>

      {/* FAQ Modal with Real-time Live Preview */}
      <CMSModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
        title={editingFaq ? "Edit FAQ" : "Add FAQ Question"}
        subtitle="Manage frequently asked questions with instant accordion preview"
        maxWidth="max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Form */}
          <form onSubmit={handleSaveFaq} className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={faqForm.category}
                onChange={(e) => setFaqForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
              >
                <option value="Speaking">Speaking</option>
                <option value="Booking">Booking</option>
                <option value="Workshops">Workshops</option>
                <option value="Customisation">Customisation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Question
              </label>
              <input
                type="text"
                required
                value={faqForm.question}
                onChange={(e) => setFaqForm((prev) => ({ ...prev, question: e.target.value }))}
                placeholder="e.g. What formats does Ash offer for corporate keynotes?"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Answer
              </label>
              <textarea
                rows={4}
                required
                value={faqForm.answer}
                onChange={(e) => setFaqForm((prev) => ({ ...prev, answer: e.target.value }))}
                placeholder="Detailed answer text..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF781D]"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsFaqModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md cursor-pointer hover:opacity-95"
              >
                Save FAQ
              </button>
            </div>
          </form>

          {/* Right: Live Preview */}
          <div className="lg:col-span-5 bg-[#0e0e0e] rounded-2xl border border-neutral-800 p-5 text-white shadow-xl space-y-4 sticky top-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <Eye size={13} className="text-[#FF781D]" />
                <span>Live Accordion Preview</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">FAQ Accordion</span>
            </div>

            <div className="bg-[#141414] rounded-xl border border-neutral-800 p-4 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between gap-2 text-xs font-bold text-white pb-2 border-b border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded text-[9px] font-bold uppercase">
                    {faqForm.category || "General"}
                  </span>
                  <span className="text-xs">{faqForm.question || "Your FAQ Question Here?"}</span>
                </div>
                <ChevronDown size={14} className="text-orange-400 shrink-0 transform rotate-180" />
              </div>

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {faqForm.answer || "Your detailed answer will appear when the participant expands this FAQ question on the website."}
              </p>
            </div>

            <p className="text-[10px] text-gray-500 text-center pt-1">
              Preview updates live as you type
            </p>
          </div>
        </div>
      </CMSModal>
    </div>
  );
};
