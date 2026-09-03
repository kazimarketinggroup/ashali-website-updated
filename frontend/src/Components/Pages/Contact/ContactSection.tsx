import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  CalendarDays } from "lucide-react";
// import { FaTiktok } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { toast } from "sonner";
import { api, getApiErrorMessage } from "../../../utils/api";
import "react-datepicker/dist/react-datepicker.css";

export const BRAND_GRADIENT_LR =
  "linear-gradient(90deg, #FF781D 0%, #008080 100%)";

// const socials = [
//   { icon: Linkedin, link: "#" },
//   { icon: X, link: "#" },
//   { icon: FaTiktok, link: "#" },
//   { icon: Instagram, link: "#" },
// ];

type EnquiryType = "speaking" | "advisory" | "impact" | "media" | "sea";

type FieldConfig = { name: string; placeholder: string; type?: string; isDate?: boolean };

const FIELD_CONFIG: Record<EnquiryType, FieldConfig[]> = {
  speaking: [
    { name: "Name", placeholder: "Name" },
    { name: "Email", placeholder: "Email", type: "email" },
    { name: "Organisation", placeholder: "Organisation" },
    { name: "Event Name", placeholder: "Event Name" },
    { name: "Date", placeholder: "Date", isDate: true },
    { name: "Location", placeholder: "Location" },
    { name: "Audience Size", placeholder: "Audience Size" },
    { name: "Topic", placeholder: "Topic" },
    { name: "Budget Range", placeholder: "Budget Range" },
  ],
  advisory: [
    { name: "Name", placeholder: "Name" },
    { name: "Email", placeholder: "Email", type: "email" },
    { name: "Organisation", placeholder: "Organisation" },
    { name: "Role", placeholder: "Role" },
    { name: "Challenge", placeholder: "Challenge" },
    { name: "Type of Support", placeholder: "Type of Support" },
    { name: "Preferred Timeline", placeholder: "Preferred Timeline" },
    { name: "Budget / Engagement Type", placeholder: "Budget / Engagement Type" },
  ],
  media: [
    { name: "Name", placeholder: "Name" },
    { name: "Email", placeholder: "Email", type: "email" },
    { name: "Show / Publication", placeholder: "Show / Publication" },
    { name: "Host", placeholder: "Host" },
    { name: "Topic", placeholder: "Topic" },
    { name: "Format", placeholder: "Format" },
    { name: "Audience", placeholder: "Audience" },
    { name: "Recording Date", placeholder: "Recording Date", isDate: true },
    { name: "Links to Previous Episodes", placeholder: "Links to Previous Episodes" },
  ],
  sea: [
    { name: "Name", placeholder: "Name" },
    { name: "Email", placeholder: "Email", type: "email" },
    { name: "Country / City", placeholder: "Country / City" },
    { name: "Organisation", placeholder: "Organisation" },
    { name: "Opportunity Type", placeholder: "Speaking / Advisory / Partnership / University / Other" },
    { name: "Timeline", placeholder: "Timeline" },
  ],
  impact: [
    { name: "Name", placeholder: "Name" },
    { name: "Email", placeholder: "Email", type: "email" },
    { name: "Institution", placeholder: "Institution" },
    { name: "Location", placeholder: "Location" },
    { name: "Age Group", placeholder: "Age Group" },
    { name: "Audience Size", placeholder: "Audience Size" },
    { name: "Preferred Date", placeholder: "Preferred Date", isDate: true },
    { name: "Why this audience?", placeholder: "Why this audience?" },
    { name: "Format", placeholder: "Format" },
  ],
};

const WIDE_FIELDS = new Set([
  "Budget / Engagement Type",
  "Opportunity Type",
  "Timeline",
  "Why this audience?",
  "Format",
]);

/**
 * Walks the field list tracking which grid column each field lands in, so we
 * never leave a half-empty row: any field that would otherwise sit alone at the
 * end of a row (an odd trailing field, or a normal field left dangling before a
 * wide one) is promoted to full width. Returns the set of field names to span 2.
 */
function computeWideFields(fields: FieldConfig[]): Set<string> {
  const wide = new Set<string>();
  let col = 0; // 0 = left column, 1 = right column
  fields.forEach((field, i) => {
    const forcedWide = WIDE_FIELDS.has(field.name);
    const isLast = i === fields.length - 1;
    const nextForcedWide = !isLast && WIDE_FIELDS.has(fields[i + 1].name);

    if (forcedWide) {
      wide.add(field.name);
      col = 0; // wide field occupies a whole row
      return;
    }
    if (col === 0) {
      // sitting in the left column — would it be left alone on the right?
      if (isLast || nextForcedWide) {
        wide.add(field.name); // dangling → make it full width
        col = 0;
      } else {
        col = 1; // a normal field will fill the right column next
      }
    } else {
      col = 0; // this fills the right column; row complete
    }
  });
  return wide;
}

export const ContactSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<EnquiryType>("speaking");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [dateValues, setDateValues] = useState<Record<string, Date | null>>({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: "speaking", label: "Speaking / Keynote" },
    { id: "advisory", label: "Advisory" },
    { id: "impact", label: "Impact" },
    { id: "media", label: "Media / Podcast" },
    { id: "sea", label: "Malaysia & SEA" },
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
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formValues["Name"]?.trim();
    const email = formValues["Email"]?.trim();

    if (!name || !email) {
      toast.error("Please fill in your Name and Email.");
      return;
    }

    const details = Object.fromEntries(
      Object.entries(formValues).filter(
        ([key, value]) => key !== "Name" && key !== "Email" && value?.trim(),
      ),
    );

    setIsSubmitting(true);
    try {
      const response = await api.post("/contact/submit", {
        type: selectedType,
        name,
        email,
        message: message.trim() || undefined,
        details,
      });
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

  return (
    <section className="w-full bg-black py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20 select-none">
      <div className="max-w-fluid mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* ───────── LEFT SIDE: CATEGORY FILTER SELECTION ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0c0c0c] border border-white/[0.02] p-8 md:p-10 flex flex-col justify-between rounded-[4px] lg:col-span-4 min-h-[400px]"
        >
          <div>
            <h2 className="text-white text-fluid-28 font-normal tracking-tight mb-6">
              Fill The form
            </h2>

            <p className="text-gray-400 text-xs tracking-wider uppercase mb-5 font-medium">
              Select Enquiry Type
            </p>

            {/* Dynamic Interactive Pill Selection Matrix */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => {
                const isSelected = selectedType === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedType(cat.id as EnquiryType);
                      resetForm();
                    }}
                    type="button"
                    className={`px-4 py-2.5 rounded-[4px] text-[13px] font-medium tracking-wide transition-all duration-200 ${
                      isSelected
                        ? "bg-[#222222] text-white border border-white/20 shadow-md"
                        : "bg-[#161616] text-gray-400 border border-transparent hover:bg-[#1c1c1c] hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Precise Circular Linear Gradient Brand Social Block */}
          {/* <div className="flex gap-3.5 mt-10">
            {socials.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.link}
                  className="group relative w-9 h-9 transition-transform duration-200 transform hover:scale-105"
                >
                  <div
                    className="absolute inset-0 rounded-full p-[1px] opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ background: BRAND_GRADIENT_LR }}
                  >
                    <div className="w-full h-full rounded-full bg-[#0c0c0c] flex items-center justify-center">
                      <Icon
                        size={14}
                        className="text-white opacity-85 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </a>
              );
            })}
          </div> */}
        </motion.div>

        {/* ───────── RIGHT SIDE: DYNAMIC CONDITIONAL INPUT GENERATOR ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bg-[#0c0c0c] border border-white/[0.02] p-8 md:p-10 rounded-[4px] lg:col-span-8 flex flex-col justify-center"
        >
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedType}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {(() => {
                  const fields = FIELD_CONFIG[selectedType];
                  const wideSet = computeWideFields(fields);
                  return fields.map((field) => (
                  <div
                    key={field.name}
                    className={wideSet.has(field.name) ? "sm:col-span-2" : undefined}
                  >
                    {field.isDate ? (
                      <DateField
                        placeholder={field.placeholder}
                        value={dateValues[field.name] ?? null}
                        onChange={(date) => handleDateChange(field.name, date)}
                      />
                    ) : (
                      <Input
                        placeholder={field.placeholder}
                        type={field.type}
                        value={formValues[field.name] || ""}
                        onChange={(value) => handleFieldChange(field.name, value)}
                        required={field.name === "Name" || field.name === "Email"}
                      />
                    )}
                  </div>
                  ));
                })()}

                {selectedType === "speaking" && (
                  <div className="sm:col-span-2 flex items-center gap-6 py-2 text-gray-300 text-[13px]">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="accent-[#FF781D] rounded bg-[#2a2a2a] border-transparent focus:ring-0 w-4 h-4" />
                      <span className="group-hover:text-white transition-colors">In-person</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="accent-[#FF781D] rounded bg-[#2a2a2a] border-transparent focus:ring-0 w-4 h-4" />
                      <span className="group-hover:text-white transition-colors">Virtual</span>
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Global Styled Textarea */}
            <div className="w-full pt-2">
              <textarea
                placeholder="Write Something"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-[120px] rounded-[4px] bg-[#2a2a2a] text-white px-4 py-3 text-[13px] font-light placeholder-gray-500 outline-none border border-transparent focus:border-white/20 transition-all duration-200 resize-none"
              />
            </div>

            {/* Action Frame Submission Trigger */}
            <div className="pt-2 flex justify-start">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 text-[13px] font-semibold border border-white bg-transparent text-white uppercase tracking-wider rounded-[2px] hover:bg-white hover:text-black transition-all duration-300 transform active:scale-98 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;

// 🔹 Downscaled Input Block Structure
const Input: React.FC<{
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}> = ({ placeholder, type = "text", value, onChange, required }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-[4px] bg-[#2a2a2a] text-white px-4 py-3 text-[13px] font-light placeholder-gray-500 outline-none border border-transparent focus:border-white/20 transition-all duration-200"
    />
  );
};

// 🔹 Calendar Date Picker Field
const DateField: React.FC<{
  placeholder: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
}> = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative">
      <DatePicker
        selected={value}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat="dd MMM yyyy"
        minDate={new Date()}
        popperClassName="ash-datepicker-popper"
        wrapperClassName="w-full"
        className="w-full rounded-[4px] bg-[#2a2a2a] text-white pl-4 pr-9 py-3 text-[13px] font-light placeholder-gray-500 outline-none border border-transparent focus:border-white/20 transition-all duration-200"
      />
      <CalendarDays
        size={14}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500"
      />
    </div>
  );
};
