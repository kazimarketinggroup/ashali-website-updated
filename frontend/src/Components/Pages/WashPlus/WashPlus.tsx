// import AboutNewsletter from "../About/AboutNewsletter";
import InspireCTA from "../Book/SouthEastAsia/InspireCta";
import ImpactGrid from "./ImpactGrid";
import WashPlusFounder from "./WashPlusFounder";
import WashPlusHero from "./WashPlusHero";


const WashPlus = () => {
    return (
        <div>
            <WashPlusHero/>
            <WashPlusFounder/>
            <ImpactGrid/>
             <InspireCTA/>
              {/* <AboutNewsletter/> */}
        </div>
    );
};

export default WashPlus;