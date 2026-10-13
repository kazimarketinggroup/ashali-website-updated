
// import AdvisesOnSection from "./AdvisesOnSection";
import FinalCta from "../Home/FinalCta";
import AdvisoryDataSection from "./AdvisoryDataSection";
import AdvisesSection from "./AdvisesSection";
import AdvisoryHero from "./AdvisoryHero";
import HowAshWorks from "./HowAshWorks";
import WhyAshSection from "./WhyAshSection";

const Advisory = () => {
    return (
        <div>
            <AdvisoryHero/>
            <AdvisoryDataSection/>
            <AdvisesSection/>
            <WhyAshSection/>
            <HowAshWorks/>
            <FinalCta
                heading="Have a consequential growth or capability decision to make?"
                body="Share the decision, the context and your timeframe. We'll confirm whether Ash's experience is a good fit."
                ctaLabel="Discuss advisory"
                ctaTo="/contact?type=advisory"
            />
        </div>
    );
};

export default Advisory;