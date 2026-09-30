
import FinalCta from "../Home/FinalCta";
import AvailabilityCriteria from "./AvailabilityCriteria";
import ImpactHero from "./ImpactHero";
import SelectiveAdvisory from "./SelectiveAdvisory";
import TalkThemes from "./TalkThemes";
// import UnlockNewsletterSection from "./UnlockNewsLetterSection";
import WhyThisMatters from "./WhyThisMatters";


const Impact = () => {
    return (
        <div>
            <ImpactHero/>
            <WhyThisMatters/>
            <SelectiveAdvisory/>
            <TalkThemes/>
            <AvailabilityCriteria/>
            <FinalCta
        heading="Propose an impact, school or community engagement"
        body="Ash dedicates a portion of his time each year to pro bono talks, youth initiatives and community programmes. Tell us about your initiative and audience."
        ctaLabel="Submit an enquiry"
      />
        </div>
    );
};

export default Impact;