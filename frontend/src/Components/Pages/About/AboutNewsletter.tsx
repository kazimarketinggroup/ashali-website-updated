import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * “Let’s Keep Connected” — orange gradient block at bottom of About (matches latest spec).
 */
const AboutNewsletter: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      className="relative px-4 py-16 md:py-20 text-white sm:px-6"
      style={{
        background: "linear-gradient(180deg, #FF7A1A 0%, #F56300 38%, #D9480F 72%, #B9380E 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center text-xl font-medium tracking-tight sm:mb-11 sm:text-2xl"
        >
          Let&apos;s Keep Connected
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:gap-5"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
            <label className="sr-only" htmlFor="about-newsletter-first">
              First name
            </label>
            <input
              id="about-newsletter-first"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-[7px] border-0 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-white/70"
            />
            <label className="sr-only" htmlFor="about-newsletter-last">
              Last name
            </label>
            <input
              id="about-newsletter-last"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-[7px] border-0 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-white/70"
            />
          </div>

          <label className="sr-only" htmlFor="about-newsletter-email">
            Email Address
          </label>
          <input
            id="about-newsletter-email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[7px] border-0 bg-white px-4 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-white/70"
          />

          <div className="flex justify-center pt-2 sm:pt-4">
            <button
              type="submit"
              className="rounded-[7px] border border-white bg-transparent px-14 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/15"
            >
              Subscribe
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default AboutNewsletter;
