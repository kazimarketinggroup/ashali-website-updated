import React from "react";
import { motion } from "framer-motion";

// Replace with your actual logo imports
import amazonLogo from "../../../../assets/bookusa/amazonlogo.png";
import bamLogo from "../../../../assets/bookusa/Books-A-Million_logo-white 1.png";
import macmillanLogo from "../../../../assets/bookusa/g8.png";
import barnesLogo from "../../../../assets/bookusa/barnes&nobel.png";

interface StoreLink {
  name: string;
  logo: string;
  url: string;
}

const stores: StoreLink[] = [
  { name: "Amazon", logo: amazonLogo, url: "https://amazon.com" },
  { name: "Books-A-Million", logo: bamLogo, url: "https://booksamillion.com" },
  { name: "Macmillan Publishers", logo: macmillanLogo, url: "https://macmillan.com" },
  { name: "Barnes & Noble", logo: barnesLogo, url: "https://barnesandnoble.com" },
];

const AvailableInUSA: React.FC = () => {
  return (
    <section className="w-full bg-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-white">
      <div className="mx-auto max-w-5xl xl:max-w-fluid">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-base sm:text-lg md:text-xl font-normal tracking-wide text-white/85 mb-8 sm:mb-10"
        >
          Available In The USA
        </motion.h2>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {stores.map((store, i) => (
            <motion.a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center bg-[#161616] border border-white/[0.07] hover:border-white/20 transition duration-300 px-5 py-5 sm:py-6"
            >
              <img
                src={store.logo}
                alt={store.name}
                className="h-6 sm:h-7 md:h-8 w-auto object-contain"
              />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AvailableInUSA;