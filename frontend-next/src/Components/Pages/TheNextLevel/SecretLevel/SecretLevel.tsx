import LevelThreeJourneyForm from "../Level3/LevelThreeJourney";
import SecretLevelExploreLevels from "./SecretLevelExploreLevels";
import SecretLevelHero from "./SecretLevelHero";
import SecretLevelSkillsGrid from "./SecretLevelSkillsGrid";
import SecretLevelFeatureStripPrimary from "./SecretLevelStripe";
import SecretLevelUnlockSkills from "./SecretLevelUnlockSkills";

const SecretLevel = () => {
    return (
        <div>
            <SecretLevelHero />
            <SecretLevelFeatureStripPrimary />
            <SecretLevelUnlockSkills/>
            <SecretLevelSkillsGrid/>
            <LevelThreeJourneyForm/>
            <SecretLevelExploreLevels/>
        </div>
    );
};

export default SecretLevel;