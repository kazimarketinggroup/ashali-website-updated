"use client";

import React, { useState } from "react";
import { Download, Trash2, Search, Mail, UserCheck } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { toast } from "sonner";

export const CMSSubscribersManager: React.FC = () => {
  const { cmsData, deleteSubscriber } = useCMS();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscribers = cmsData.subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportCSV = () => {
    if (cmsData.subscribers.length === 0) {
      toast.error("No subscribers to export");
      return;
    }

    const headers = ["ID", "Email", "Name", "Date", "Source", "Status"];
    const rows = cmsData.subscribers.map((s) => [
      s.id,
      `"${s.email}"`,
      `"${s.name || ""}"`,
      s.date,
      `"${s.source || "Website"}"`,
      s.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ashali_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Subscribers CSV exported successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Newsletter Subscribers
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View, search, and export subscribers collected via footer and newsletter forms.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all cursor-pointer"
        >
          <Download size={14} />
          <span>Export CSV ({cmsData.subscribers.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search subscribers by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-[#FF781D]"
          />
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing {filteredSubscribers.length} of {cmsData.subscribers.length}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 pl-6">Subscriber</th>
                <th className="py-3.5 px-4">Date Joined</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-6 font-semibold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF781D] flex items-center justify-center shrink-0">
                        <Mail size={14} />
                      </div>
                      <div>
                        <div>{sub.email}</div>
                        {sub.name && <span className="text-[11px] font-normal text-slate-400">{sub.name}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{sub.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {sub.source || "Website Footer"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <UserCheck size={11} />
                      <span>{sub.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 pr-6 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Remove subscriber "${sub.email}"?`)) deleteSubscriber(sub.id);
                      }}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove subscriber"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubscribers.length === 0 && (
          <div className="p-10 text-center text-slate-400 text-xs">
            No subscribers found.
          </div>
        )}
      </div>
    </div>
  );
};
