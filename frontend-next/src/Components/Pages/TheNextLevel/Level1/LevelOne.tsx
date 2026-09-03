import LevelOneExploreLevels from "./LevelOneExploreLevels";
import LevelOneFeatureStripPrimary from "./LevelOneFeatureStripPrimary";

import LevelOneHero from "./LevelOneHero";
import LevelOneJourneyForm from "./LevelOneJourneyForm";
import LevelOneSkillsGrid from "./LevelOneSkillsGrid";
import LevelOneUnlockSkills from "./LevelOneUnlockSkills";

const LevelOne = () => {
  return (
    <div className="bg-black font-sans text-white antialiased">
      <LevelOneHero />
      <LevelOneFeatureStripPrimary />
      <LevelOneUnlockSkills />
      <LevelOneSkillsGrid />
      <LevelOneJourneyForm />
      <LevelOneExploreLevels />
    </div>
  );
};

export default LevelOne;
