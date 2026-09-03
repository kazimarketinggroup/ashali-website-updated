// import AboutNewsletter from "../About/AboutNewsletter";
import InspireCTA from "../Book/SouthEastAsia/InspireCta";
import FareExchangeAbout from "./FareExchangeAbout";
import HeroSection from "./HeroSection";
import ImpactGrid from "./ImpactGrid";


const FareExchange = () => {
    return (
        <div>
            <HeroSection/>
            <FareExchangeAbout/>
            <ImpactGrid/>
            <InspireCTA/>
              {/* <AboutNewsletter/> */}
        </div>
    );
};

export default FareExchange;