import React from "react";

import { PODCAST_VIDEOS } from "../../../constants/media";
import { Body, Reveal, Section, SectionHeading } from "../../Shared/SectionKit";
import YouTubeFacade from "../../Shared/YouTubeFacade";

/**
 * Longer podcast / panel / keynote videos (§3.4).
 *
 * These sit below the flagship offers by design — the short reel carries the
 * above-the-fold slots. Embeds are recovered from the pre-rebuild codebase.
 */
const SupportingVideos: React.FC<{ id?: string }> = ({ id }) => (
  <Section id={id} className="lg:px-14">
    <div className="flex flex-col items-center gap-10">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <SectionHeading>Podcasts, panels and longer talks.</SectionHeading>
        <Body className="max-w-2xl">
          Ash is a regular podcast and panel guest on advantage, AI and the human side of building
          things, bringing founder insight and practical stories.
        </Body>
      </Reveal>

      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
        {PODCAST_VIDEOS.map((video, i) => (
          <Reveal key={video.id} delay={i * 0.08}>
            {/* 16:9 box reserves height before load, so no layout shift. */}
            <div className="relative w-full overflow-hidden rounded-[4px] bg-black">
              <YouTubeFacade
                videoId={video.id}
                title={video.title}
                aspectRatio="16/9"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

export default SupportingVideos;
