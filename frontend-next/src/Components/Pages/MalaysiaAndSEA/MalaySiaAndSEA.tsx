
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
        heading="Planning an event, workshop or advisory conversation in Southeast Asia?"
        body="Share your location, date and what you want to achieve. We'll recommend the right format and confirm Ash's availability across the region."
        ctaLabel="Enquire now"
      />
        </div>
    );
};

export default MalaySiaAndSEA;