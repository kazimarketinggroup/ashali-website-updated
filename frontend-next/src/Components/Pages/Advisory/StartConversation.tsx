"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, X } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

// Exact linear gradient color tokens matching the project branding
export const BRAND_GRADIENT_LR =
  "linear-gradient(90deg, #FF781D 0%, #008080 100%)";

const socials = [
  { icon: Linkedin, link: "#" },
  { icon: X, link: "#" },
  { icon: FaTiktok, link: "#" },
  { icon: Instagram, link: "#" },
];

export const StartConversation: React.FC = () => {
  return (
    <section className="w-full bg-black py-16 md:py-20 px-4 sm:px-8 select-none">
      <div className="max-w-fluid mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ───────── LEFT COLUMN: INFO & SOCIALS ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0c0c0c] border border-white/[0.02] p-8 md:p-10 flex flex-col justify-between rounded-[4px] lg:col-span-5 min-h-[420px]"
        >
          <div>
            {/* Component Header */}
            <h2 className="text-white text-fluid-28 font-normal tracking-tight mb-5">
              Start a conversation
            </h2>
            
            {/* Descriptive Body Copy */}
            <p className="text-[#a1a1aa] font-light text-[13px] sm:text-[14px] leading-[1.65] tracking-wide max-w-sm antialiased">
              Tell Ash a little about where you are and what you're working through, and he'll come back on whether he's the right fit.
            </p>
          </div>

          {/* Precise Circular Linear Gradient Brand Social Block */}
          <div className="flex gap-3.5 mt-10">
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
          </div>
        </motion.div>

        {/* ───────── RIGHT COLUMN: INTERACTIVE FORM FIELDS ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bg-[#0c0c0c] border border-white/[0.02] p-8 md:p-10 rounded-[4px] lg:col-span-7 flex flex-col justify-center"
        >
          <form className="space-y-4 w-full" onSubmit={(e) => e.preventDefault()}>
            
            {/* Form Inputs Grid matching image_d2cb9b.png */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Organisation" />
              <Input placeholder="Role" />
              <Input placeholder="The challenge you're facing" />
              <Input placeholder="Type of support" />
              <Input placeholder="Preferred timeline" />
              <Input placeholder="Budget / engagement type" />
            </div>

            {/* In-person / Virtual Checkboxes Subrow */}
            <div className="flex items-center gap-6 py-2 text-gray-400 text-[13px] font-light">
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input 
                  type="checkbox" 
                  className="accent-[#FF781D] rounded border-gray-600 bg-transparent text-black focus:ring-0 w-4 h-4" 
                />
                <span className="group-hover:text-white transition-colors">In-person</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                <input 
                  type="checkbox" 
                  className="accent-[#FF781D] rounded border-gray-600 bg-transparent text-black focus:ring-0 w-4 h-4" 
                />
                <span className="group-hover:text-white transition-colors">Virtual</span>
              </label>
            </div>

            {/* Standard Textarea Block */}
            <div className="w-full pt-1">
              <textarea
                placeholder="Write Something"
                className="w-full h-[125px] rounded-[4px] bg-[#323232] text-white px-4 py-3 text-[13px] font-light placeholder-gray-500 outline-none border border-transparent focus:border-white/20 transition-all duration-200 resize-none"
              />
            </div>

            {/* Minimalist Action Submission Button */}
            <div className="pt-2 flex justify-start">
              <button
                type="submit"
                className="px-8 py-2.5 text-[13px] font-semibold border border-white bg-transparent text-white uppercase tracking-wider rounded-[2px] hover:bg-white hover:text-black transition-all duration-300 transform active:scale-98 shadow-md"
              >
                Submit
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default StartConversation;

// 🔹 Reusable Downscaled Input Component For Uniform Matte Fields
const Input: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-[4px] bg-[#323232] text-white px-4 py-3 text-[13px] font-light placeholder-gray-500 outline-none border border-transparent focus:border-white/20 transition-all duration-200"
    />
  );
};