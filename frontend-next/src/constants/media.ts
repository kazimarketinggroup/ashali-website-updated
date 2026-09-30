/*
  Recovered video assets (Phase 3 §1 / §3).

  These YouTube IDs were recovered from the pre-rebuild codebase at commit
  255ebbb — they are the real embeds the previous live site used, not new
  sourcing. Kept in one place so every reel slot points at the same video.

  Provenance:
  - SHOWREEL_ID: was commented out in Speaking/SpeakerMediaSection.tsx, titled
    "Ash Ali speaker showreel".
  - TEDX_ID: used in Speaking/SpeakingFeatureRow (TEDx Royal Holloway,
    "Unpacking Your Unfair Advantage") and About/SpeakerPackSection.
  - PODCAST_IDS: the podcast/panel grid in SpeakerMediaSection.

  Note: the showreel entry is Ash's existing speaker video, not the new
  purpose-cut 60–90s reel described in the brief. That reel is still to be
  produced; when it lands, replace SHOWREEL_ID and add captions/transcript.
*/

/** Speaker showreel recovered from the previous build. */
export const SHOWREEL_ID = "OzrKO5IhJiE";

/** TEDx Royal Holloway: "Unpacking Your Unfair Advantage". */
export const TEDX_ID = "rMB2lFUMXpY";

/** Longer podcast / panel appearances, for below-the-fold placement. */
export const PODCAST_VIDEOS = [
  { id: "Nqsqj0LaP78", title: "Ash Ali in conversation: podcast appearance" },
  { id: "Ap8YiydvQ1g", title: "Ash Ali on advantage and entrepreneurship" },
  { id: TEDX_ID, title: "TEDx Royal Holloway: Unpacking Your Unfair Advantage" },
];

/** Builds a privacy-friendly embed URL (no cookies until playback). */
export function youTubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}
