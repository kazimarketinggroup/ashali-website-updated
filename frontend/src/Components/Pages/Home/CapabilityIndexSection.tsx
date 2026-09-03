import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import reportCover from "../../../assets/home/indexreport.png";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

export const CapabilityIndexSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isModalOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsSubmitted(false), 300);
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
                <span>Currently 2026</span>
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
                The Global Sales Capability Index 2026 Is Out.
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
                <button
                  onClick={() => setIsModalOpen(true)}
                  type="button"
                  className="border border-white/40 px-6 py-3 text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-black shadow-md rounded-[2px]"
                >
                  Download the full report →
                </button>
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
                  src={reportCover}
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
      {createPortal(
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

            {/* Modal box — compact, no scroll */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-3xl z-10 rounded-xl overflow-hidden"
              style={{
                background: "#0F0F0F",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 8px 48px rgba(0,0,0,0.7), 0 0 80px rgba(255,255,255,0.03)",
              }}
            >
              {/* Close */}
              <button
                onClick={handleCloseModal}
                type="button"
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors p-1 z-10"
                aria-label="Close modal"
              >
                <X size={20} strokeWidth={1.5} />
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        <ModalInput label="Full name" required />
                        <ModalInput label="Email" required type="email" />
                        <ModalInput label="Company" required />
                        <ModalInput label="Job Title" required />
                      </div>

                      {/* Select */}
                      <div className="flex flex-col w-full relative">
                        <label className="text-white font-normal text-[12px] mb-1">
                          Revenue org size<span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative w-full border-b border-neutral-700 focus-within:border-white transition-colors duration-200">
                          <select
                            defaultValue=""
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
                          className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold text-[12px] rounded-[2px] transition-colors duration-200 hover:bg-neutral-200 shrink-0 text-center"
                        >
                          Get instant access →
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="p-8 sm:p-10 text-center flex flex-col items-center justify-center"
                  >
                    <h3 className="text-fluid-30 font-bold tracking-tight mb-5">
                      You're in.{" "}
                      <span className="text-[#14b8a6]">Check your</span>{" "}
                      <span className="text-[#d97736]">inbox.</span>
                    </h3>

                    <div className="space-y-4 text-neutral-300 font-light text-[13px] sm:text-[14px] leading-[1.75] max-w-lg antialiased">
                      <p>
                        The Global Sales Capability Index 2026 is on its way to your inbox. If it doesn't
                        arrive in the next few minutes, check your spam folder.
                      </p>
                      <p>
                        While you wait — 76% of the reps on your team right now believe they're executing
                        better than they are. The data on what to do about it is in the report.
                      </p>
                    </div>

                    <button
                      onClick={handleCloseModal}
                      type="button"
                      className="mt-8 text-neutral-400 hover:text-white transition-colors text-[12px] tracking-wide underline underline-offset-4"
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
}

const ModalInput: React.FC<ModalInputProps> = ({ label, required = false, type = "text" }) => (
  <div className="flex flex-col w-full relative group text-left">
    <label className="text-white font-normal text-[12px]">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      required={required}
      placeholder=""
      className="w-full bg-transparent border-b border-neutral-700 py-2 text-[12px] font-light text-white outline-none focus:border-white transition-colors duration-200"
    />
  </div>
);

export default CapabilityIndexSection;