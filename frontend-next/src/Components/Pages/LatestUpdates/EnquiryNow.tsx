"use client";

import { motion, easeOut } from "framer-motion";
import Link from "next/link";
const GRAD = "linear-gradient(90deg, #FF781D, #008080)";

const EnquiryNow = () => {
    return (
        <div className="mb-10">
             {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
          className="border-t border-white/10 pt-10 text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
            Inspire your Audience
          </h3>
          <div className="mt-6 flex justify-center">
            <div style={{ background: GRAD, padding: "1.5px", display: "inline-block" }}>
              <Link
                href="/contact"
                className="block bg-black px-8 py-2.5 text-xs font-bold text-white hover:bg-transparent transition duration-300 tracking-widest"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </motion.div>
        </div>
    );
};

export default EnquiryNow;