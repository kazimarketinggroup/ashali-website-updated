// import AboutCareerTimeline from "./AboutCareerTimeline";
// import BookShowcase from "../Home/BookShowcase";
import CapabilityIndexSection from "../Home/CapabilityIndexSection";
import FinalCta from "../Home/FinalCta";
// import UnlockNewsletterSection from "../Home/UnlockNewsletterSection";
import AboutIntro from "./AboutHero";
// import AboutHero from "./AboutHero";

// import AboutNewsletter from "./AboutNewsletter";
import AboutStory from "./AboutStory";
import PreviousProjects from "./PreviousProjects";
import WhatAshIsDoing from "./WhatAshIsDoing";

const About = () => {
  return (
    <div className="relative bg-black">
     <AboutIntro/>
      {/* Scrolls above the fixed hero (same stacking context) */}
      <div className="relative z-[2] bg-black">
        <AboutStory />
        <PreviousProjects />
        <CapabilityIndexSection/>
        <WhatAshIsDoing/>
        {/* <SpeakerPackSection/> */}
        <FinalCta
        heading="Planning a keynote, leadership offsite or executive workshop?"
        body="Share the audience, date and outcome you want to create. We'll recommend the most suitable format and confirm availability."
        ctaLabel="Enquire now"
      />
      </div>
    </div>
  );
};

export default About;
