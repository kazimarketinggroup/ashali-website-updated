import React from "react";
import { Link } from "react-router-dom";
import { motion, easeOut } from "framer-motion";

import usa from "../../../../assets/book/usa.png";
import uae from "../../../../assets/book/uae.png";
import seAsia from "../../../../assets/book/southeastAsia.png";
import china from "../../../../assets/book/china.png";

const BookAwards: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] px-4 py-16 md:py-20 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-5xl xl:max-w-fluid space-y-6">

        {/* ── MAPS CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: easeOut, delay: 0.07 }}
          className="rounded-sm border border-white/10 bg-[#111] p-5 sm:p-7"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { src: usa, label: "USA", link: "/book/usa-book" },
              { src: uae, label: "UAE", link: "/book/uae-book" },
              { src: seAsia, label: "South East Asia", link: "/book/southeast-asia-book" },
              { src: china, label: "China", link: "/book/china-book" },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <Link to={c.link} className="flex flex-col items-center gap-2">
                  <img
                    src={c.src}
                    alt={c.label}
                    className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-80"
                  />
                  <p className="text-[10px] sm:text-xs text-white/60 text-center tracking-wide">
                    {c.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {["Public Speaking", "Workshops"].map((label) => (
              <Link
                key={label}
                to={`/${label.toLowerCase().replace(" ", "-")}`}
                className="border border-white/30 text-white text-xs px-5 py-1.5 tracking-wide hover:bg-white hover:text-black transition duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BookAwards;