import { motion } from "framer-motion";
import { brandGradientTextStyle } from "../../../constants/brandGradient";

const audiences = [
  "Corporates",
  "Universities & business schools",
  "Accelerators",
  "Founder communities",
  "Innovation programmes",
];

const WhoHeWorksWith = () => {
  return (
    <section className="bg-black py-16 md:py-20 px-4">
      <div className="mx-auto max-w-fluid text-center">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[12px] text-white/70"
        >
          • Who he works with
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-fluid-34 font-light"
        >
          <span style={brandGradientTextStyle}>
            Active Across Malaysia
          
            And SEA With
          </span>
        </motion.h2>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {audiences.map((item) => (
            <div
              key={item}
              className="
                bg-[#2f2f2f]
                px-6
                py-3
                text-[13px]
                text-white
                transition-all
                duration-300
                
              "
            >
              {item}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhoHeWorksWith;