
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
        heading="Planning a keynote, leadership offsite or executive workshop?"
        body="Share the audience, date and outcome you want to create. We'll recommend the most suitable format and confirm availability."
        ctaLabel="Enquire now"
      />
        </div>
    );
};

export default Impact;