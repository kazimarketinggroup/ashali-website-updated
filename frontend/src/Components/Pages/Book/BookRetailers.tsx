import React from "react";
import { motion, easeOut } from "framer-motion";

import amazonLogo from "../../../assets/book/amazonLogo.png";
import audibleLogo from "../../../assets/book/audibleLogo.png";
import waterstonesLogo from "../../../assets/book/waterStonesLogo.png";
import barnesLogo from "../../../assets/book/branesLogo.png";
import appleLogo from "../../../assets/book/appleLogo.png";

const retailers = [
  {
    src: amazonLogo,
    alt: "Amazon",
    href: "https://www.amazon.com/Unfair-Advantage-Already-Takes-Succeed/dp/1250280524",
  },
  {
    src: audibleLogo,
    alt: "Audible",
    href: "https://www.audible.com/pd/The-Unfair-Advantage-Audiobook/B09GD3Z8QB",
  },
  {
    src: waterstonesLogo,
    alt: "Waterstones",
    href: "https://www.waterstones.com/book/the-unfair-advantage/ash-ali/hasan-kubba/9781788167543",
  },
  {
    src: barnesLogo,
    alt: "Barnes & Noble",
    href: "https://www.barnesandnoble.com/w/the-unfair-advantage-ash-ali/1139985540",
  },
  {
    src: appleLogo,
    alt: "Apple Books",
    href: "https://books.apple.com/ca/book/the-unfair-advantage/id1584662439",
  },
];

const BookRetailers: React.FC = () => {
  return (
    <section className="bg-black px-4 py-16 md:py-20 text-white sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="text-center text-xl font-semibold tracking-tight sm:text-2xl"
      >
        Get Your Copy Of
        <br />
        ‘The Unfair Advantage’
      </motion.h2>

      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {retailers.map((r) => (
          <a
            key={r.alt}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buy The Unfair Advantage on ${r.alt}`}
            className="flex h-[64px] items-center justify-center rounded-md border border-white/10 bg-[#121212] px-4 transition-colors duration-200 hover:border-white/30 hover:bg-[#181818]"
          >
            <img src={r.src} alt={r.alt} className="max-h-8 w-auto max-w-[130px] object-contain opacity-95" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default BookRetailers;
