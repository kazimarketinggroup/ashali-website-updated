import React from "react";
import { motion } from "framer-motion";

export const BRAND_GRADIENT_LR = "linear-gradient(90deg, #FF781D 0%, #008080 100%)";

const testimonials = [
  {
    quote:
      'Kejayaan bukan hanya tentang kerja keras atau bakat. Ash Ali dan Hasan Kubba mendedahkan bahawa memanfaatkan "Kelebihan Tidak Adil" anda adalah penting, kerana kehidupan tidak selalunya adil.',
    name: "Hakimi Zulkifili",
    title: "Pemasar Facebook",
    company: "HIT DIGITAL SDN BHD, Malaysia",
  },
  {
    quote:
      "Buku ini menawarkan rangka kerja yang jelas untuk kejayaan dan membantu pembaca memanfaatkan kekuatan mereka. Bacaan yang menyeronokkan dan ditulis dengan baik—sangat disyorkan untuk usahawan!",
    name: "Az Samad",
    title: "Pemuzik di Malaysia",
    company: "",
  },
];

const PemikiranSection: React.FC = () => {
  return (
    <section className="w-full bg-[#0d0d0d] px-4 sm:px-8 pt-11 pb-14">
      <div className="max-w-5xl mx-auto">

        {/* Heading with brand gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-fluid-22 font-bold mb-8"
          style={{ background: BRAND_GRADIENT_LR, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block" }}
        >
          Pemikiran
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-[#1a1a1a] rounded-[10px] px-5 sm:px-[26px] pt-7 pb-6"
            >
              {/* Quote mark — uses start of brand gradient (#FF781D) */}
              <span
                className="block text-fluid-36 font-black leading-none mb-3 font-serif"
                style={{ color: "#FF781D" }}
              >
                "
              </span>

              {/* Body */}
              <p className="text-[13px] text-white/70 leading-[1.72] mb-5">
                {t.quote}
              </p>

              {/* Author */}
              <div>
                <p className="text-[13px] font-bold text-white leading-snug">
                  {t.name}
                </p>
                <p className="text-[12px] text-white/45 leading-[1.5] mt-0.5">
                  {t.title}
                  {t.company && <><br />{t.company}</>}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PemikiranSection;