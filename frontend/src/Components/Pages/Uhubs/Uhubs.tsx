import InspireCTA from "../Book/SouthEastAsia/InspireCta";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import ImpactGrid from "./ImpactGrid";
import MissionVisionFocus from "./MissionVissionFocus";
import UhubsAbout from "./UhubsAbout";
import UhubsCaseStudies from "./UhubsCaseStudies";


const Uhubs = () => {
  return (
    <div className="bg-black text-white">
      <HeroSection />
      <UhubsAbout />
      <HowItWorks />
      <MissionVisionFocus />
      <UhubsCaseStudies />
      <ImpactGrid />
      <InspireCTA />
    </div>
  );
};

export default Uhubs;