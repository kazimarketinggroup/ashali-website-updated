import React from "react";
import heroBg from "../../../assets/washplus/6789312d9ad3a0aa0bfdf794_HEro.png";

const WashPlusHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={heroBg}
        alt="WashPlus Hero"
        className="w-full h-auto block"
        style={{ imageRendering: "crisp-edges" }}
      />
    </section>
  );
};

export default WashPlusHero;