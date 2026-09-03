// import AboutNewsletter from "../About/AboutNewsletter";
import InspireCTA from "../Book/SouthEastAsia/InspireCta";
import HeroSection from "./HeroSection";
import ImpactGrid from "./ImpactGrid";
import JustEatAbout from "./JustEatAbout";


const JustEat = () => {
    return (
        <div>
            <HeroSection/>
            <JustEatAbout/>
            <ImpactGrid/>
            <InspireCTA/>
              {/* <AboutNewsletter/> */}
        </div>
    );
};

export default JustEat;