import LevelThreeExploreLevels from "./LevelThreeExploreLevels";
import LevelThreeHero from "./LevelThreeHero";
import LevelThreeJourneyForm from "./LevelThreeJourney";
import LevelThreeSkillsGrid from "./LevelThreeSkillsGrid";
import LevelThreeFeatureStripPrimary from "./LevelThreeStripe";
import LevelThreeUnlockSkills from "./LevelThreeUnlockSkills";


const LevelThree = () => {
    return (
        <div>
            <LevelThreeHero />
            <LevelThreeFeatureStripPrimary />
            <LevelThreeUnlockSkills />
            <LevelThreeSkillsGrid/>
            <LevelThreeJourneyForm/>
            <LevelThreeExploreLevels/>
        </div>
    );
};

export default LevelThree;