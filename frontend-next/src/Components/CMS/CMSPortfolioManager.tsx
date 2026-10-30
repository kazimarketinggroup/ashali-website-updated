"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink, Eye, Globe, Sparkles } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { PortfolioItem, ProjectCard } from "../../types/cms";
import { defaultCmsData } from "../../data/defaultCmsData";
import { CMSModal } from "./CMSModal";
import { toast } from "sonner";

export const CMSPortfolioManager: React.FC = () => {
  const { cmsData, saveItem, deleteItem } = useCMS();

  // Tab switch: Previous Projects (About Page Cards) vs Portfolio Case Studies
  const [activeSubTab, setActiveSubTab] = useState<"previousProjects" | "caseStudies">("previousProjects");

  // State for Case Studies (PortfolioItem)
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<PortfolioItem | null>(null);
  const [caseStudyForm, setCaseStudyForm] = useState<Partial<PortfolioItem>>({
    name: "",
    role: "",
    metrics: "",
    description: "",
    url: "",
    status: "Active",
    published: true,
  });

  // State for Previous Projects Cards (ProjectCard)
  const [isProjectCardModalOpen, setIsProjectCardModalOpen] = useState(false);
  const [editingProjectCard, setEditingProjectCard] = useState<ProjectCard | null>(null);
  const [projectCardForm, setProjectCardForm] = useState<Partial<ProjectCard>>({
    name: "",
    years: "",
    description: "",
    outcome: "",
    url: "",
    published: true,
  });

  const previousProjects = cmsData?.previousProjects || defaultCmsData.previousProjects || [];
  const caseStudies = cmsData?.portfolio || [];

  // Handlers for Previous Projects (About Page)
  const handleOpenAddProjectCard = () => {
    setEditingProjectCard(null);
    setProjectCardForm({
      name: "",
      years: "2020 – 2024",
      description: "",
      outcome: "",
      url: "/portfolio/just-eat",
      published: true,
    });
    setIsProjectCardModalOpen(true);
  };

  const handleOpenEditProjectCard = (item: ProjectCard) => {
    setEditingProjectCard(item);
    setProjectCardForm({ ...item });
    setIsProjectCardModalOpen(true);
  };

  const handleSaveProjectCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectCardForm.name?.trim()) {
      toast.error("Project / venture name is required");
      return;
    }
    const itemToSave: ProjectCard = {
      id: editingProjectCard?.id || `proj-${Date.now()}`,
      name: projectCardForm.name.trim(),
      years: projectCardForm.years?.trim() || "",
      description: projectCardForm.description?.trim() || "",
      outcome: projectCardForm.outcome?.trim() || "",
      url: projectCardForm.url?.trim() || "",
      logoUrl: projectCardForm.logoUrl || editingProjectCard?.logoUrl || "",
      published: projectCardForm.published !== false,
    };

    const success = await saveItem("previousProjects", itemToSave as unknown as Record<string, unknown>);
    if (success) {
      setIsProjectCardModalOpen(false);
      toast.success(`Saved "${itemToSave.name}" for About page`);
    }
  };

  // Handlers for Case Studies
  const handleOpenAddCaseStudy = () => {
    setEditingCaseStudy(null);
    setCaseStudyForm({
      name: "",
      role: "",
      metrics: "",
      description: "",
      url: "https://",
      status: "Active",
      published: true,
    });
    setIsCaseStudyModalOpen(true);
  };

  const handleOpenEditCaseStudy = (item: PortfolioItem) => {
    setEditingCaseStudy(item);
    setCaseStudyForm({ ...item });
    setIsCaseStudyModalOpen(true);
  };

  const handleSaveCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseStudyForm.name?.trim()) {
      toast.error("Company / venture name is required");
      return;
    }
    const itemToSave = {
      ...caseStudyForm,
      id: editingCaseStudy?.id || `p-${Date.now()}`,
    };
    const success = await saveItem("portfolio", itemToSave);
    if (success) setIsCaseStudyModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Portfolio & Previous Projects
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage company scale stories, About page commercial project cards, and full case studies.
          </p>
        </div>

        {activeSubTab === "previousProjects" ? (
          <button
            onClick={handleOpenAddProjectCard}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md transition-all cursor-pointer hover:opacity-95"
          >
            <Plus size={16} />
            <span>Add Project Card (About)</span>
          </button>
        ) : (
          <button
            onClick={handleOpenAddCaseStudy}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md transition-all cursor-pointer hover:opacity-95"
          >
            <Plus size={16} />
            <span>Add Venture / Case Study</span>
          </button>
        )}
      </div>

      {/* Pill Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab("previousProjects")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === "previousProjects"
              ? "bg-[#0d0d0d] text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <Sparkles size={14} className={activeSubTab === "previousProjects" ? "text-[#FF781D]" : ""} />
          <span>About Page: Previous Projects Cards ({previousProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("caseStudies")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === "caseStudies"
              ? "bg-[#0d0d0d] text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <Globe size={14} />
          <span>Portfolio Case Studies ({caseStudies.length})</span>
        </button>
      </div>

      {/* ────────────────── VIEW 1: PREVIOUS PROJECTS (ABOUT PAGE CARDS) ────────────────── */}
      {activeSubTab === "previousProjects" && (
        <div className="space-y-4">
          <div className="p-4 bg-orange-50/60 border border-orange-200/80 rounded-2xl flex items-start justify-between gap-3 text-xs text-orange-900">
            <div>
              <strong>About Page Card Grid (Dev Task 9):</strong> These 3 cards display on the About page under <em>&ldquo;Previous ventures &amp; commercial projects&rdquo;</em> (Just Eat, Fare Exchange, WashPlus). Ash Ali can edit years, copy descriptions, outcomes, and links here.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {previousProjects.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {item.years || "Years"}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.published !== false ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.published !== false ? "Live" : "Draft"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[48px]">{item.description}</p>

                  <div className="border-t border-slate-100 pt-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF781D] block mb-1">
                      Outcome
                    </span>
                    <p className="text-xs font-semibold text-slate-800 leading-snug">
                      {item.outcome}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  {item.url ? (
                    <span className="text-[11px] text-slate-500 font-mono truncate max-w-[120px]">
                      {item.url}
                    </span>
                  ) : <span />}

                  <div className="flex items-center gap-1.5 ml-auto">
                    <button
                      onClick={() => handleOpenEditProjectCard(item)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                      title="Edit card"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${item.name}" from Previous Projects?`)) {
                          deleteItem("previousProjects", item.id);
                        }
                      }}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete card"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ────────────────── VIEW 2: PORTFOLIO CASE STUDIES ────────────────── */}
      {activeSubTab === "caseStudies" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {caseStudies.map((item) => (
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
                    onClick={() => handleOpenEditCaseStudy(item)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${item.name}"?`)) deleteItem("portfolio", item.id);
                    }}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ────────────────── MODAL: EDIT PREVIOUS PROJECT CARD (ABOUT) ────────────────── */}
      <CMSModal
        isOpen={isProjectCardModalOpen}
        onClose={() => setIsProjectCardModalOpen(false)}
        title={editingProjectCard ? "Edit Previous Project Card" : "Add Project Card"}
        subtitle="This card displays on the About page under Previous Projects with real-time preview"
        maxWidth="max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form onSubmit={handleSaveProjectCard} className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Venture / Company Name
                </label>
                <input
                  type="text"
                  required
                  value={projectCardForm.name || ""}
                  onChange={(e) => setProjectCardForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Just Eat, Fare Exchange"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF781D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Operating Years
                </label>
                <input
                  type="text"
                  value={projectCardForm.years || ""}
                  onChange={(e) => setProjectCardForm((prev) => ({ ...prev, years: e.target.value }))}
                  placeholder="e.g. 2008 – 2011"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                One-Line Narrative / Description
              </label>
              <textarea
                rows={3}
                required
                value={projectCardForm.description || ""}
                onChange={(e) => setProjectCardForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="First Marketing Director leading early digital acquisition..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Commercial Outcome Callout
              </label>
              <input
                type="text"
                required
                value={projectCardForm.outcome || ""}
                onChange={(e) => setProjectCardForm((prev) => ({ ...prev, outcome: e.target.value }))}
                placeholder="e.g. Scaled from startup to £1.5B IPO on the London Stock Exchange"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Case Study URL / Link
              </label>
              <input
                type="text"
                value={projectCardForm.url || ""}
                onChange={(e) => setProjectCardForm((prev) => ({ ...prev, url: e.target.value }))}
                placeholder="/portfolio/just-eat"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="proj_published"
                checked={projectCardForm.published !== false}
                onChange={(e) => setProjectCardForm((prev) => ({ ...prev, published: e.target.checked }))}
                className="rounded text-[#FF781D] focus:ring-[#FF781D] cursor-pointer"
              />
              <label htmlFor="proj_published" className="text-xs text-slate-700 font-medium cursor-pointer">
                Publish on About page (Live)
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsProjectCardModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md cursor-pointer hover:opacity-95"
              >
                Save Project Card
              </button>
            </div>
          </form>

          {/* Right Column: Live Card Preview matching About page dark theme */}
          <div className="lg:col-span-5 bg-[#0e0e0e] rounded-2xl border border-neutral-800 p-5 text-white shadow-xl space-y-4 sticky top-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <Eye size={13} className="text-[#FF781D]" />
                <span>About Page Live Preview</span>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">Previous Projects</span>
            </div>

            <div className="rounded-[8px] bg-[#141414] border border-white/[0.08] p-5 space-y-3 shadow-2xl relative">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white tracking-tight">
                  {projectCardForm.name || "Company Name"}
                </span>
                <span className="text-[11px] font-medium tracking-wider text-gray-400 bg-white/[0.04] border border-white/10 px-2 py-0.5 rounded-[2px]">
                  {projectCardForm.years || "2008 – 2011"}
                </span>
              </div>

              <p className="text-[13px] leading-relaxed text-gray-300 font-light">
                {projectCardForm.description || "One-line narrative describing Ash's role and company scale."}
              </p>

              <div className="border-t border-white/[0.08] pt-3 mt-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d97736] block mb-1">
                  Outcome
                </span>
                <p className="text-[12.5px] font-medium text-white/95 leading-snug">
                  {projectCardForm.outcome || "Key exit or commercial outcome."}
                </p>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 text-center pt-1">
              Reflects live on /about immediately upon saving
            </p>
          </div>
        </div>
      </CMSModal>

      {/* ────────────────── MODAL: EDIT CASE STUDY ────────────────── */}
      <CMSModal
        isOpen={isCaseStudyModalOpen}
        onClose={() => setIsCaseStudyModalOpen(false)}
        title={editingCaseStudy ? "Edit Venture / Case Study" : "Add Venture"}
        subtitle="Changes reflect in the full portfolio collection"
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleSaveCaseStudy} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Company / Project Name
              </label>
              <input
                type="text"
                required
                value={caseStudyForm.name || ""}
                onChange={(e) => setCaseStudyForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Just Eat UK or Uhubs.ai"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#FF781D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ash Ali&apos;s Role
              </label>
              <input
                type="text"
                value={caseStudyForm.role || ""}
                onChange={(e) => setCaseStudyForm((prev) => ({ ...prev, role: e.target.value }))}
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
                value={caseStudyForm.metrics || ""}
                onChange={(e) => setCaseStudyForm((prev) => ({ ...prev, metrics: e.target.value }))}
                placeholder="Seed to £1.5B IPO"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                value={caseStudyForm.status || "Active"}
                onChange={(e) => setCaseStudyForm((prev) => ({ ...prev, status: e.target.value as PortfolioItem["status"] }))}
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
              value={caseStudyForm.url || ""}
              onChange={(e) => setCaseStudyForm((prev) => ({ ...prev, url: e.target.value }))}
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
              value={caseStudyForm.description || ""}
              onChange={(e) => setCaseStudyForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief narrative of Ash Ali's contribution..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsCaseStudyModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#FF781D] to-[#E33C3C] rounded-xl shadow-md cursor-pointer hover:opacity-95"
            >
              Save Venture
            </button>
          </div>
        </form>
      </CMSModal>
    </div>
  );
};

export default CMSPortfolioManager;
