import React from "react";
import { motion } from "framer-motion";

// Replace with your actual avatar images
import aliImg from "../../../../assets/bookusa/ali.png";
import derekImg from "../../../../assets/bookusa/derek.png";

// Replace with your actual crowd/event photo
import eventPhoto from "../../../../assets/southeastasia/Hasan-Kubba-Ash-Ali-BBA2022-Shortlist-1024x742.png";

const testimonials = [
  {
    quote: "A powerful way to think about success as an entrepreneur.",
    name: "Ali Abdaal",
    title: "Productivity YouTuber,\nPodcaster & Ex-Doctor",
    img: aliImg,
  },
  {
    quote: "Crucial business advice that you won't get anywhere else.",
    name: "Derek Sivers",
    title: "Entrepreneur & Author\nof 'Anything You Want'",
    img: derekImg,
  },
];

const EventHero: React.FC = () => {
  return (
    <section className="relative min-h-[80svh] w-full overflow-hidden md:min-h-[90svh]">
      {/* Background Image */}
      <img
        src={eventPhoto}
        alt="Event crowd"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-[1]" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-black/80 to-transparent z-[2]" />

      {/* Testimonial Cards */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-between gap-3 px-4 pb-5 sm:flex-row sm:items-end sm:px-[3%] sm:pb-[3.5%]">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="w-full max-w-[240px] flex-shrink-0 rounded-[10px] bg-[#f5c800] p-[14px_16px] sm:w-[42%]"
          >
            {/* Quote */}
            <p className="text-[12px] font-medium text-black leading-[1.55] mb-[10px]">
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-[10px]">
              <img
                src={t.img}
                alt={t.name}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0 border-2 border-black/10"
              />
              <div>
                <p className="text-[12px] font-bold text-black leading-tight">
                  {t.name}
                </p>
                <p className="text-[10px] text-[#333] leading-[1.35] mt-[1px] whitespace-pre-line">
                  {t.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EventHero;
