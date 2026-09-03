
// import AdvisesOnSection from "./AdvisesOnSection";
import FinalCta from "../Home/FinalCta";
import AdvisesSection from "./AdvisesSection";
import AdvisoryHero from "./AdvisoryHero";
import HowAshWorks from "./HowAshWorks";
// import UnlockNewsletterSection from "./UnlockNewsLetterSection";
// import StartConversation from "./StartConversation";
import WhyAshSection from "./WhyAshSection";

const Advisory = () => {
    return (
        <div>
            <AdvisoryHero/>
            <AdvisesSection/>
            {/* <AdvisesOnSection/> */}
            <WhyAshSection/>
            <HowAshWorks/>
            {/* <StartConversation/> */}
           <FinalCta
        heading="Planning a keynote, leadership offsite or executive workshop?"
        body="Share the audience, date and outcome you want to create. We'll recommend the most suitable format and confirm availability."
        ctaLabel="Enquire now"
      />
        </div>
    );
};

export default Advisory;