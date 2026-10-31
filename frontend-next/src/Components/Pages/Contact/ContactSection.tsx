"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Linkedin, Instagram } from "lucide-react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { toast } from "sonner";
import { api, getApiErrorMessage } from "../../../utils/api";
import { useCMS } from "../../../context/CMSContext";
import { BRAND_GRADIENT_LR, BRAND_ORANGE } from "../../../constants/brandGradient";
import { track, ANALYTICS_EVENTS } from "../../../utils/analytics";
import "react-datepicker/dist/react-datepicker.css";
import Script from "next/script";

function IconX({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconTikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.05A6.34 6.34 0 0 0 3.1 15.69a6.34 6.34 0 0 0 10.82 4.48c1.68-1.68 2.22-3.8 2.22-6.5V8.14a8.27 8.27 0 0 0 4.85 1.56V6.25a4.85 4.85 0 0 1-1.4-.44z" />
    </svg>
  );
}

function GradientRingIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="me noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full p-px transition-transform duration-200 hover:scale-110 cursor-pointer"
      style={{ background: BRAND_GRADIENT_LR }}
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0a] text-white/90 hover:text-white transition-colors">
        {children}
      </span>
    </a>
  );
}

type EnquiryType =
  | "speaking"
  | "sales-kickoff"
  | "workshop"
  | "advisory"
  | "media"
  | "sea"
  | "giving-back"
  | "bulk-book";

type FieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isDate?: boolean;
};

const FIELD_CONFIG: Record<EnquiryType, FieldConfig[]> = {
  speaking: [
    { name: "Name", label: "Name" },
    { name: "Email", label: "Email", type: "email" },
    { name: "Organisation", label: "Organisation" },
    { name: "Event Name", label: "Event name" },
    { name: "Location", label: "Location" },
    { name: "Date", label: "Date", isDate: true },
    { name: "Topic", label: "Topic" },
    { name: "Audience Size", label: "Audience size" },
    { name: "Budget", label: "Indicative budget (optional)" },
  ],
  "sales-kickoff": [
    { name: "Name", label: "Name" },
    { name: "Email", label: "Email", type: "email" },
    { name: "Organisation", label: "Organisation" },
    { name: "Event Name", label: "Event name / Kickoff theme" },
    { name: "Location", label: "Location" },
    { name: "Date", label: "Date", isDate: true },
    { name: "Topic", label: "Focus / Key takeaway" },
    { name: "Audience Size", label: "Audience size (e.g. 150 sales reps)" },
    { name: "Budget", label: "Indicative budget (optional)" },
  ],
  workshop: [
    { name: "Name", label: "Name" },
    { name: "Email", label: "Email", type: "email" },
    { name: "Organisation", label: "Organisation" },
    { name: "Team Size", label: "Team size (e.g. 15 leaders)" },
    { name: "Location", label: "Location (e.g. London / Virtual)" },
    { name: "Date", label: "Preferred date", isDate: true },
    { name: "Focus Area", label: "Workshop focus (e.g. Unfair Advantage, Sales Sprint)" },
    { name: "Budget", label: "Indicative budget (optional)" },
  ],
  advisory: [
    { name: "Name", label: "Name" },
    { name: "Email", label: "Email", type: "email" },
    { name: "Company", label: "Company" },
    { name: "Stage", label: "Company stage (e.g. Seed, Growth, Enterprise)" },
    { name: "Role", label: "Role / Title (e.g. Founder, CEO, Board)" },
    { name: "Decision Being Faced", label: "The decision being faced / Key challenge" },
    { name: "Support Type", label: "Type of support (Advisory, Board, Sprint)" },
    { name: "Timeline", label: "Preferred timeline (e.g. Q1 2026)" },
    { name: "Budget", label: "Indicative budget (optional)" },
  ],
  media: [
    { name: "Name", label: "Name" },
    { name: "Email", label: "Email", type: "email" },
    { name: "Show / Publication", label: "Show / Publication" },
    { name: "Host", label: "Host name" },
    { name: "Topic", label: "Topic / Angle" },
    { name: "Format", label: "Format (Audio / Video / Written)" },
    { name: "Audience", label: "Audience reach / Listenership" },
    { name: "Date", label: "Recording date", isDate: true },
    { name: "Deadline", label: "Release deadline" },
  ],
  sea: [
    { name: "Name", label: "Name" },
    { name: "Email", label: "Email", type: "email" },
    { name: "Organisation", label: "Organisation" },
    { name: "Country / City", label: "Country / City (e.g. KL, Singapore)" },
    { name: "Opportunity Type", label: "Opportunity type (Speaking / Advisory / Partnership)" },
    { name: "Date", label: "Preferred date / Timeline", isDate: true },
    { name: "Budget", label: "Indicative budget (optional)" },
  ],
  "giving-back": [
    { name: "Name", label: "Name" },
    { name: "Email", label: "Email", type: "email" },
    { name: "Institution", label: "School / Institution / Charity" },
    { name: "Location", label: "Location (City / Town)" },
    { name: "Age Group", label: "Audience & age group (e.g. Sixth-form, Underrepresented founders)" },
    { name: "Audience Size", label: "Audience size (e.g. 100 students)" },
    { name: "Date", label: "Preferred date", isDate: true },
    { name: "Format", label: "Preferred format (Assembly, Workshop, Q&A)" },
    { name: "Why this audience?", label: "Why this audience? (Background & context)" },
  ],
  "bulk-book": [
    { name: "Name", label: "Name" },
    { name: "Email", label: "Email", type: "email" },
    { name: "Organisation", label: "Organisation" },
    { name: "Estimated Quantity", label: "Estimated copies (e.g. 50, 100, 500+)" },
    { name: "Delivery Destination", label: "Delivery destination (Country / City)" },
    { name: "Date", label: "Required by date", isDate: true },
    { name: "Event / Initiative", label: "Event / Initiative (e.g. Company kickoff, Leadership retreat)" },
  ],
};

const WIDE_FIELDS = new Set([
  "Budget",
  "Focus Area",
  "Why this audience?",
  "Event / Initiative",
  "Challenge",
  "Decision Being Faced",
  "Opportunity Type",
  "Deadline",
]);

function computeWideFields(fields: FieldConfig[]): Set<string> {
  const wide = new Set<string>();
  let col = 0;
  fields.forEach((field, i) => {
    const forcedWide = WIDE_FIELDS.has(field.name);
    const isLast = i === fields.length - 1;
    const nextForcedWide = !isLast && WIDE_FIELDS.has(fields[i + 1].name);

    if (forcedWide) {
      wide.add(field.name);
      col = 0;
      return;
    }
    if (col === 0) {
      if (isLast || nextForcedWide) {
        wide.add(field.name);
        col = 0;
      } else {
        col = 1;
      }
    } else {
      col = 0;
    }
  });
  return wide;
}

export const ContactSection: React.FC = () => {
  const { cmsData } = useCMS();
  const footer = cmsData?.footer;
  const linkedinUrl = footer?.linkedinUrl || "https://uk.linkedin.com/in/ashali";
  const twitterUrl = footer?.twitterUrl || "https://x.com/Ash_Ali";
  const instagramUrl = footer?.instagramUrl || "https://www.instagram.com/ashaliuk/";

  const [selectedType, setSelectedType] = useState<EnquiryType>("speaking");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [dateValues, setDateValues] = useState<Record<string, Date | null>>({});
  const [isInPerson, setIsInPerson] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const recaptchaContainerRef = React.useRef<HTMLDivElement>(null);
  const widgetIdRef = React.useRef<number | null>(null);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LcO8gkuAAAAABEhZc9cD_Z53tMIxcJfQuVFWdm1";

  const renderRecaptcha = React.useCallback(() => {
    if (
      typeof window !== "undefined" &&
      (window as any).grecaptcha?.render &&
      recaptchaContainerRef.current &&
      widgetIdRef.current === null
    ) {
      try {
        recaptchaContainerRef.current.innerHTML = "";
        widgetIdRef.current = (window as any).grecaptcha.render(
          recaptchaContainerRef.current,
          {
            sitekey: recaptchaSiteKey,
            theme: "dark",
            callback: (token: string) => setRecaptchaToken(token),
            "expired-callback": () => setRecaptchaToken(null),
          }
        );
      } catch (err) {
        // Ignored if already initialized
      }
    }
  }, [recaptchaSiteKey]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("type")?.toLowerCase().trim();
      if (t) {
        if (t === "keynote" || t === "speaking") setSelectedType("speaking");
        else if (t === "sales-kickoff" || t === "saleskickoff" || t === "sko") setSelectedType("sales-kickoff");
        else if (t === "workshop" || t === "executive-workshop") setSelectedType("workshop");
        else if (t === "advisory") setSelectedType("advisory");
        else if (t === "media" || t === "podcast") setSelectedType("media");
        else if (t === "sea" || t === "malaysia-sea" || t === "malaysia") setSelectedType("sea");
        else if (t === "giving-back" || t === "givingback" || t === "impact" || t === "pro-bono") setSelectedType("giving-back");
        else if (t === "bulk-book" || t === "bulkbook" || t === "book" || t === "books") setSelectedType("bulk-book");
      }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if ((window as any).grecaptcha?.render && widgetIdRef.current === null) {
        renderRecaptcha();
      } else {
        const interval = setInterval(() => {
          if ((window as any).grecaptcha?.render && widgetIdRef.current === null) {
            renderRecaptcha();
          }
          if (widgetIdRef.current !== null) {
            clearInterval(interval);
          }
        }, 250);
        return () => clearInterval(interval);
      }
    }
  }, [isMounted, renderRecaptcha]);

  const categories: { id: EnquiryType; label: string }[] = [
    { id: "speaking", label: "Speaking / Keynote" },
    { id: "sales-kickoff", label: "Sales Kickoff" },
    { id: "workshop", label: "Executive Workshop" },
    { id: "advisory", label: "Advisory" },
    { id: "media", label: "Media / Podcast" },
    { id: "sea", label: "Malaysia & SEA" },
    { id: "giving-back", label: "Giving Back" },
    { id: "bulk-book", label: "Bulk Book" },
  ];

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleDateChange = (fieldName: string, date: Date | null) => {
    setDateValues((prev) => ({ ...prev, [fieldName]: date }));
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: date ? format(date, "dd MMM yyyy") : "",
    }));
  };

  const resetForm = () => {
    setFormValues({});
    setDateValues({});
    setIsInPerson(false);
    setIsVirtual(false);
    setMessage("");
    setHoneypot("");
    if (widgetIdRef.current !== null && (window as any).grecaptcha?.reset) {
      try {
        (window as any).grecaptcha.reset(widgetIdRef.current);
      } catch (e) {}
    }
    setRecaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formValues["Name"]?.trim();
    const email = formValues["Email"]?.trim();

    if (!name || !email) {
      toast.error("Please fill in your Name and Email.");
      return;
    }

    if (recaptchaSiteKey && !recaptchaToken) {
      toast.error("Please verify that you are not a robot.");
      return;
    }

    const details = Object.fromEntries(
      Object.entries(formValues).filter(
        ([key, value]) => key !== "Name" && key !== "Email" && value?.trim(),
      ),
    );

    const deliveryFormat = [isInPerson && "In-person", isVirtual && "Virtual"].filter(Boolean).join(", ");
    if (deliveryFormat) {
      details["Format"] = deliveryFormat;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/contact/submit", {
        type: selectedType,
        name,
        email,
        message: message.trim() || undefined,
        details,
        website_hp: honeypot,
        b_blank_field: honeypot,
        recaptchaToken: recaptchaToken || undefined,
      });
      track(ANALYTICS_EVENTS.contactFormSubmitSuccess, { type: selectedType });
      toast.success(
        response.data?.message ||
          "Thank you! Your enquiry has been submitted. We will be in touch soon.",
      );
      resetForm();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Something went wrong. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const showDeliveryCheckboxes = [
    "speaking",
    "sales-kickoff",
    "workshop",
    "sea",
    "giving-back",
  ].includes(selectedType);

  return (
    <section className="w-full bg-black py-16 md:py-24 text-white">
      <div className="max-w-fluid mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ───────── LEFT COLUMN: HERO & BRAND INFORMATION ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-start pt-2 lg:pt-4"
        >
          {/* Eyebrow */}
          <div className="mb-4">
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
              Work with Ash
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white text-fluid-34 font-normal leading-[1.22] tracking-tight mb-6 font-sans">
            <span style={{ color: BRAND_ORANGE }}>Tell us </span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #2dd4bf 0%, #008080 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              what you have in mind,
            </span>{" "}
            <br className="hidden sm:inline" />
            <span className="text-white">we&apos;ll route it to the right conversation.</span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 font-light text-[14px] sm:text-[15px] leading-relaxed max-w-md mb-8">
            For speaking, advisory, media, Malaysia and Southeast Asia opportunities, or Giving Back initiatives.
          </p>

          {/* Circular Social Icons */}
          <div className="flex items-center gap-3.5 mb-6">
            <GradientRingIcon href={linkedinUrl} label="Ash Ali LinkedIn">
              <Linkedin size={15} />
            </GradientRingIcon>
            <GradientRingIcon href={twitterUrl} label="Ash Ali on X">
              <IconX className="h-3.5 w-3.5" />
            </GradientRingIcon>
            <GradientRingIcon href="https://www.tiktok.com/@ashaliuk" label="Ash Ali TikTok">
              <IconTikTok className="h-3.5 w-3.5" />
            </GradientRingIcon>
            <GradientRingIcon href={instagramUrl} label="Ash Ali Instagram">
              <Instagram size={15} />
            </GradientRingIcon>
          </div>

          {/* Press Headshots Asset Download */}
          <div className="pt-2">
            <a
              href="/press/ash-ali-press-headshots.zip"
              download="ash-ali-press-headshots.zip"
              className="text-[12px] text-gray-500 hover:text-gray-300 underline underline-offset-4 transition-colors"
            >
              Press Headshots (ZIP)
            </a>
          </div>
        </motion.div>

        {/* ───────── RIGHT COLUMN: INTERACTIVE FORM CARD ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#141414] border border-white/[0.05] p-6 sm:p-8 md:p-10 rounded-[6px] shadow-2xl lg:col-span-7 flex flex-col justify-start"
        >
          {/* Card Title */}
          <h2 className="text-white text-2xl sm:text-[26px] font-normal tracking-tight mb-1.5">
            Fill the form
          </h2>

          <p className="text-gray-400 text-xs sm:text-[13px] tracking-normal mb-5">
            Select enquiry type
          </p>

          {/* Interactive Pill Selection Matrix (8 Categories) */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-7">
            {categories.map((cat) => {
              const isSelected = selectedType === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedType(cat.id);
                    resetForm();
                  }}
                  type="button"
                  className={`px-3.5 py-2 rounded-[4px] text-[13px] font-normal tracking-wide transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#0d0d0d] text-white border border-white/60 shadow-sm"
                      : "bg-[#222222] text-gray-300 border border-transparent hover:bg-[#2a2a2a] hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedType}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5"
              >
                {(() => {
                  const fields = FIELD_CONFIG[selectedType];
                  const wideSet = computeWideFields(fields);
                  return fields.map((field) => (
                    <div
                      key={field.name}
                      className={`flex flex-col ${wideSet.has(field.name) ? "sm:col-span-2" : ""}`}
                    >
                      <label className="text-gray-300 text-[13px] font-normal mb-1.5 select-none">
                        {field.label}
                      </label>
                      {field.isDate ? (
                        <DateField
                          value={dateValues[field.name] ?? null}
                          onChange={(date) => handleDateChange(field.name, date)}
                        />
                      ) : (
                        <Input
                          type={field.type}
                          value={formValues[field.name] || ""}
                          onChange={(value) => handleFieldChange(field.name, value)}
                          required={field.name === "Name" || field.name === "Email"}
                        />
                      )}
                    </div>
                  ));
                })()}

                {showDeliveryCheckboxes && (
                  <div className="sm:col-span-2 flex items-center gap-6 pt-1 pb-1 text-gray-300 text-[13px] select-none">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isInPerson}
                        onChange={(e) => setIsInPerson(e.target.checked)}
                        className="w-4 h-4 rounded-[2px] bg-[#2a2a2a] border border-white/20 checked:bg-[#FF781D] accent-[#FF781D] cursor-pointer"
                      />
                      <span className="group-hover:text-white transition-colors">In-person</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isVirtual}
                        onChange={(e) => setIsVirtual(e.target.checked)}
                        className="w-4 h-4 rounded-[2px] bg-[#2a2a2a] border border-white/20 checked:bg-[#FF781D] accent-[#FF781D] cursor-pointer"
                      />
                      <span className="group-hover:text-white transition-colors">Virtual</span>
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Hidden honeypot field for anti-bot protection — hidden with display:none so browser autofill ignores it */}
            <div style={{ display: "none" }} aria-hidden="true">
              <input
                type="text"
                name="b_blank_field"
                tabIndex={-1}
                autoComplete="new-password"
                data-lpignore="true"
                data-1p-ignore="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Textarea */}
            <div className="w-full pt-1">
              <textarea
                placeholder="Write something"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-[110px] rounded-[4px] bg-[#2a2a2a] text-white px-3.5 py-3 text-[13px] font-normal placeholder-gray-400 outline-none border border-transparent hover:border-white/20 focus:border-white/50 focus:bg-[#323232] transition-all duration-200 resize-none"
              />
            </div>

            {/* Google reCAPTCHA Verification */}
            {recaptchaSiteKey && (
              <div className="pt-2">
                <Script
                  src="https://www.google.com/recaptcha/api.js?render=explicit"
                  strategy="afterInteractive"
                  onLoad={renderRecaptcha}
                />
                <div
                  ref={recaptchaContainerRef}
                  className="min-h-[78px] flex items-center overflow-x-auto"
                />
              </div>
            )}

            {/* Cloudflare Turnstile Verification if configured */}
            {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
              process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY !== "1x00000000000000000000AA" && (
                <div className="pt-1">
                  <div
                    className="cf-turnstile"
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    data-theme="dark"
                  />
                </div>
              )}

            {/* Actions Row: Submit Trigger & Privacy Policy Link */}
            <div className="pt-3 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 text-[13px] font-semibold border border-white bg-transparent text-white uppercase tracking-wider rounded-[2px] hover:bg-white hover:text-black transition-all duration-300 transform active:scale-98 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF781D] hover:underline text-[13px] font-medium transition-colors"
              >
                Privacy Policy
              </a>
            </div>

            {/* Response Time SLA Guarantee */}
            <p className="text-gray-400 text-[12px] pt-2">
              Typically responds within 24 to 48 hours
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

// 🔹 Input Component with styled filled background
const Input: React.FC<{
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}> = ({ type = "text", value, onChange, required }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full h-[40px] sm:h-[42px] rounded-[4px] bg-[#2a2a2a] text-white px-3.5 text-[13px] font-normal outline-none border border-transparent hover:border-white/20 focus:border-white/50 focus:bg-[#323232] transition-all duration-200"
    />
  );
};

// 🔹 DatePicker Component
const DateField: React.FC<{
  value: Date | null;
  onChange: (date: Date | null) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd MMM yyyy"
        minDate={new Date()}
        popperClassName="ash-datepicker-popper"
        wrapperClassName="w-full"
        className="w-full h-[40px] sm:h-[42px] rounded-[4px] bg-[#2a2a2a] text-white pl-3.5 pr-9 text-[13px] font-normal outline-none border border-transparent hover:border-white/20 focus:border-white/50 focus:bg-[#323232] transition-all duration-200"
      />
      <CalendarDays
        size={14}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};
