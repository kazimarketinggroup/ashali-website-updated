"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import reportCover from "../../../assets/home/indexreport.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";
import { api } from "../../../utils/api";

const REPORT_PDF_URL = "/reports/Global-Sales-Capability-Index-2026-Uhubs.pdf";

export const CapabilityIndexSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    orgSize: "",
  });

  /*
    SSR guard for the portal below.

    "use client" does NOT mean "browser only" — client components are still
    rendered once on the server to produce the initial HTML, and `document`
    does not exist there. `createPortal(..., document.body)` is called during
    render (not inside an effect), so without this flag it throws
    "document is not defined" and the whole page 500s.

    `mounted` flips to true only after the first client-side effect, so the
    portal is skipped on the server and on the hydrating render, then created
    on the browser. No visual difference: the modal is closed on first paint
    either way.
  */
  const [mounted, setMounted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Effects never run on the server, so `document` is safe here without a guard.
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(true);

    try {
      if (formData.email) {
        await api.post("/contact/submit", {
          type: "advisory",
          name: formData.name || "Uhubs Report Requester",
          email: formData.email,
          message: "Downloaded Global Sales Capability Index 2026 Report",
          details: {
            Company: formData.company,
            "Job Title": formData.jobTitle,
            "Revenue Org Size": formData.orgSize,
            enquiry_source: "Uhubs Report Download",
          },
          website_hp: honeypot,
        });
      }
    } catch {
      // Non-blocking: user still downloads the report
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", jobTitle: "", orgSize: "" });
    }, 300);
  };

  return (
    <>
      <section className="bg-black text-white py-16 md:py-20 px-6 lg:px-20 select-text">
        <div className="max-w-fluid mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto_420px] gap-10 items-center">

            {/* LEFT CONTENT */}
            <div className="max-w-[620px]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center mb-3 text-[11px] uppercase tracking-[0.2em] text-white/70 font-medium"
              >
                <span>Operating now</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-fluid-30 font-medium leading-[1.25] max-w-[650px] tracking-tight text-white/95"
              >
                <span style={brandGradientTextStyle}>Building the data layer behind sales </span>
                performance in an AI era.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-10 text-[15px] leading-[1.9] text-white/75 max-w-[560px] font-light"
              >
                Co-founder of Uhubs.ai, where capability data helps revenue leaders understand the people side of sales transformation: where teams are strong, where performance is constrained and which human and AI capabilities matter next. This current operating work keeps Ash's talks grounded in what companies are facing now.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-[15px] text-white/85 font-medium"
              >
                The Global Sales Capability Index 2026 is out.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-14 flex flex-wrap items-center gap-3"
              >
                <a
                  href="https://www.uhubs.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-black px-6 py-3 text-sm font-semibold rounded-[2px] transition-colors duration-300 hover:bg-gray-100 shadow-md text-center"
                >
                  Visit Uhubs
                </a>
                <a
                  href="#download-report"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                  className="inline-block border border-white/40 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-black shadow-md rounded-[2px] cursor-pointer"
                >
                  Download the full report →
                </a>
              </motion.div>
            </div>

            {/* DIVIDER */}
            <div className="hidden lg:block h-[340px] w-px bg-white/20" />

            {/* REPORT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <div className="rounded-lg overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.06)]">
                <img
                  src={reportCover.src}
                  alt="Global Sales Capability Index"
                  className="w-[260px] md:w-[320px] h-auto object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── MODAL (portaled to body so `fixed` centers on the viewport,
             not on any transformed ancestor from framer-motion) ── */}
      {mounted && createPortal(
        <AnimatePresence mode="wait">
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/90 backdrop-blur-[3px]"
            />

            {/* Modal box */}
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className={`relative w-full z-10 overflow-hidden transition-all duration-300 ${
                isSubmitted
                  ? "max-w-2xl bg-[#F6F4EB] text-[#1A1A1A] rounded-[24px] sm:rounded-[32px] p-8 sm:p-14 shadow-2xl"
                  : "max-w-3xl bg-[#0F0F0F] rounded-xl shadow-2xl"
              }`}
              style={
                isSubmitted
                  ? { backgroundColor: "#F6F4EB", boxShadow: "0 25px 60px -15px rgba(0,0,0,0.5)" }
                  : {
                      background: "#0F0F0F",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 8px 48px rgba(0,0,0,0.7), 0 0 80px rgba(255,255,255,0.03)",
                    }
              }
            >
              {/* Close */}
              <button
                onClick={handleCloseModal}
                type="button"
                className={`absolute top-5 right-5 sm:top-6 sm:right-6 transition-colors p-1.5 z-10 ${
                  isSubmitted
                    ? "text-[#4B5056] hover:text-black"
                    : "text-neutral-500 hover:text-white"
                }`}
                aria-label="Close modal"
              >
                <X size={24} strokeWidth={1.5} />
              </button>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form-screen"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="p-8 sm:p-10"
                  >
                    {/* Header */}
                    <h3 className="text-fluid-28 font-normal tracking-tight text-white leading-tight mb-1">
                      Download free. Instant access.
                    </h3>
                    <h4 className="text-[15px] sm:text-[17px] font-normal tracking-normal leading-snug mb-4">
                      <span className="text-[#d97736]">The first global </span>
                      <span className="text-[#14b8a6]">benchmark of sales execution quality</span>
                    </h4>
                    <p className="text-neutral-500 text-[12px] font-light mb-7 tracking-wide">
                      Fill in your details and we'll unlock the full 40-page report immediately.
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <input
                        type="text"
                        name="website_hp"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        style={{ position: "absolute", opacity: 0, pointerEvents: "none", zIndex: -1, width: 0, height: 0 }}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        <ModalInput
                          label="Full name"
                          required
                          value={formData.name}
                          onChange={(name) => setFormData((prev) => ({ ...prev, name }))}
                        />
                        <ModalInput
                          label="Email"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(email) => setFormData((prev) => ({ ...prev, email }))}
                        />
                        <ModalInput
                          label="Company"
                          required
                          value={formData.company}
                          onChange={(company) => setFormData((prev) => ({ ...prev, company }))}
                        />
                        <ModalInput
                          label="Job Title"
                          required
                          value={formData.jobTitle}
                          onChange={(jobTitle) => setFormData((prev) => ({ ...prev, jobTitle }))}
                        />
                      </div>

                      {/* Select */}
                      <div className="flex flex-col w-full relative">
                        <label className="text-white font-normal text-[12px] mb-1">
                          Revenue org size<span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative w-full border-b border-neutral-700 focus-within:border-white transition-colors duration-200">
                          <select
                            value={formData.orgSize}
                            onChange={(e) => setFormData((prev) => ({ ...prev, orgSize: e.target.value }))}
                            required
                            className="w-full bg-transparent text-neutral-300 py-2.5 pr-8 text-[12px] outline-none appearance-none cursor-pointer font-light focus:text-white"
                          >
                            <option value="" disabled className="bg-[#0F0F0F]">Select One</option>
                            <option value="1-20" className="bg-[#0F0F0F]">1 - 20 employees</option>
                            <option value="21-99" className="bg-[#0F0F0F]">21 - 99 employees</option>
                            <option value="100-499" className="bg-[#0F0F0F]">100 - 499 employees</option>
                            <option value="500+" className="bg-[#0F0F0F]">500+ employees</option>
                          </select>
                          <ChevronDown size={13} className="absolute right-1 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
                        </div>
                      </div>

                      {/* Footer row */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-neutral-500 font-light text-[11px] leading-relaxed text-left max-w-xs">
                          No spam. No unsolicited calls. Used only to send you this report and future editions.
                        </p>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold text-[12px] rounded-[2px] transition-colors duration-200 hover:bg-neutral-200 shrink-0 text-center disabled:opacity-50"
                        >
                          {isSubmitting ? "Unlocking..." : "Get instant access →"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center text-center py-6 sm:py-10"
                  >
                    <h3 className="text-2xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight mb-8 sm:mb-10">
                      Global Sales Capability Index 2026
                    </h3>

                    <a
                      href={REPORT_PDF_URL}
                      download="Global-Sales-Capability-Index-2026-Uhubs.pdf"
                      className="px-8 py-3.5 bg-[#202326] hover:bg-black text-white font-medium text-[15px] rounded-full shadow-md transition-all duration-200 transform hover:scale-[1.02] inline-flex items-center justify-center mb-8 sm:mb-10 tracking-wide cursor-pointer"
                    >
                      Download Now
                    </a>

                    <button
                      onClick={handleCloseModal}
                      type="button"
                      className="text-[#1A1A1A] hover:text-neutral-600 transition-colors text-[15px] underline underline-offset-4 font-normal"
                    >
                      Back to the page
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

interface ModalInputProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const ModalInput: React.FC<ModalInputProps> = ({ label, required = false, type = "text", value, onChange }) => (
  <div className="flex flex-col w-full relative group text-left">
    <label className="text-white font-normal text-[12px]">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent border-b border-neutral-700 py-2 text-[12px] font-light text-white outline-none focus:border-white transition-colors duration-200"
    />
  </div>
);

export default CapabilityIndexSection;