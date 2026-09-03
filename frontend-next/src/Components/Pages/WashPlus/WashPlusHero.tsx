import React from "react";
import heroBg from "../../../assets/washplus/washplus-hero.png";

const WashPlusHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={heroBg.src}
        alt="WashPlus Hero"
        className="w-full h-auto block"
        style={{ imageRendering: "crisp-edges" }}
      />
    </section>
  );
};

export default WashPlusHero;