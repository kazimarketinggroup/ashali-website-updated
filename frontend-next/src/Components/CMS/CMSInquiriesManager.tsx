"use client";

import React, { useState } from "react";
import {
  Search,
  Mail,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { InquiryItem } from "../../types/cms";
import { CMSModal } from "./CMSModal";

export const CMSInquiriesManager: React.FC = () => {
  const { cmsData, updateInquiryStatus, deleteInquiry } = useCMS();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [internalNotes, setInternalNotes] = useState("");

  const filteredInquiries = cmsData.inquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenDetail = (inquiry: InquiryItem) => {
    setSelectedInquiry(inquiry);
    setInternalNotes(inquiry.notes || "");
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = async (
    status: "New" | "In Review" | "Replied" | "Archived"
  ) => {
    if (!selectedInquiry) return;
    await updateInquiryStatus(selectedInquiry.id, status, internalNotes);
    setSelectedInquiry((prev) => (prev ? { ...prev, status, notes: internalNotes } : null));
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      await deleteInquiry(id);
      setIsDetailOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Contact Inquiries & Leads Inbox
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Incoming booking requests, advisory inquiries, and keynotes sent from website forms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
            Total Leads: {cmsData.inquiries.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search inquiries by name, email or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-[#FF781D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["All", "New", "In Review", "Replied", "Archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 pl-6">Date</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Message Snippet</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredInquiries.map((inq) => (
                <tr
                  key={inq.id}
                  onClick={() => handleOpenDetail(inq)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-4 pl-6 text-slate-400 font-medium whitespace-nowrap">
                    {inq.date}
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    <div>{inq.name}</div>
                    <span className="text-[11px] font-normal text-slate-400">{inq.email}</span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-[#FF781D] border border-orange-200 uppercase">
                      {inq.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <p className="line-clamp-1 text-slate-600">{inq.message || "No message body"}</p>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inq.status === "New"
                          ? "bg-amber-100 text-amber-800 animate-pulse"
                          : inq.status === "Replied"
                          ? "bg-emerald-100 text-emerald-800"
                          : inq.status === "In Review"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-4 pr-6 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(inq);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 group-hover:text-[#FF781D] transition-colors"
                    >
                      <span>Review</span>
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInquiries.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-xs">
            No inquiries found matching your filters.
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      <CMSModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={selectedInquiry ? `Inquiry from ${selectedInquiry.name}` : "Inquiry Detail"}
        subtitle={selectedInquiry?.date}
        maxWidth="max-w-xl"
      >
        {selectedInquiry && (
          <div className="space-y-5 text-xs">
            {/* Contact Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Sender Contact
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedInquiry.name}</p>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-xs text-[#FF781D] hover:underline font-medium"
                >
                  {selectedInquiry.email}
                </a>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Type
                </span>
                <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-[#FF781D]">
                  {selectedInquiry.type}
                </span>
              </div>
            </div>

            {/* Structured details if any */}
            {selectedInquiry.details && Object.keys(selectedInquiry.details).length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Event / Organisation Details
                </span>
                {Object.entries(selectedInquiry.details).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-slate-200/40 pb-1">
                    <span className="font-semibold text-slate-600">{key}:</span>
                    <span className="text-slate-900">{String(val)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Message Body */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Message Content
              </span>
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-wrap font-normal">
                {selectedInquiry.message || "No message provided."}
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Internal Private Notes
              </span>
              <textarea
                rows={2}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add private note (e.g. Call scheduled for next Tuesday)..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
              />
            </div>

            {/* Status changer buttons */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Update Status
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus("New")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    selectedInquiry.status === "New"
                      ? "bg-amber-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Mark as New
                </button>
                <button
                  onClick={() => handleUpdateStatus("In Review")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    selectedInquiry.status === "In Review"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Mark In Review
                </button>
                <button
                  onClick={() => handleUpdateStatus("Replied")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    selectedInquiry.status === "Replied"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Mark Replied
                </button>
                <button
                  onClick={() => handleUpdateStatus("Archived")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    selectedInquiry.status === "Archived"
                      ? "bg-slate-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Archive
                </button>
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedInquiry.id, selectedInquiry.name)}
                className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold"
              >
                <Trash2 size={13} />
                <span>Delete Lead</span>
              </button>

              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: Inquiry from Ash Ali Website`}
                className="px-4 py-2 bg-gradient-to-r from-[#FF781D] to-[#E33C3C] text-white font-semibold rounded-xl flex items-center gap-1.5 hover:opacity-95 shadow-md"
              >
                <Mail size={14} />
                <span>Reply via Email</span>
              </a>
            </div>
          </div>
        )}
      </CMSModal>
    </div>
  );
};
