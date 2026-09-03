
import FinalCta from "../Home/FinalCta";
import MalaysiaHero from "./MalaysiaHero";
import MalaysiaRegionSection from "./MalaysiaRegionSection";
import OnTheGround from "./OnTheGround";
import RegionalFocusSection from "./RegionalFocusSection";



const MalaySiaAndSEA = () => {
    return (
        <div>
            <MalaysiaHero/>
            <MalaysiaRegionSection/>
            <RegionalFocusSection/>
            <OnTheGround/>
           <FinalCta
        heading="Planning a keynote, leadership offsite or executive workshop?"
        body="Share the audience, date and outcome you want to create. We'll recommend the most suitable format and confirm availability."
        ctaLabel="Enquire now"
      />
        </div>
    );
};

export default MalaySiaAndSEA;