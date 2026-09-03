import LevelOneFeatureStripSecondary from "../Level1/LevelOneFeatureStripSecondary";
import LevelTwoExploreLevels from "./LevelTwoExploreLevels";
import LevelTwoHero from "./LevelTwoHero";
import LevelTwoJourneyForm from "./LevelTwoJourneyForm";
import LevelTwoSkillsGrid from "./LevelTwoSkillsGrid";
import LevelTwoUnlockSkills from "./LevelTwoUnlockSkills";

const LevelTwo = () => {
  return (
    <div className="bg-black font-sans text-white antialiased">
      <LevelTwoHero />
      <LevelOneFeatureStripSecondary />
      <LevelTwoUnlockSkills />
      <LevelTwoSkillsGrid />
      <LevelTwoJourneyForm />
      <LevelTwoExploreLevels />
    </div>
  );
};

export default LevelTwo;
