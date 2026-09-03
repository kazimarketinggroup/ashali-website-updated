import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

// Replace with your actual video file
// import showReel from "../../../assets/about/showreel.mp4";

const VideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">

      {/* VIDEO */}
      {/* <video
        ref={videoRef}
        src={showReel}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      /> */}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Centre label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
      >
        <p className="text-gray-400 text-sm sm:text-base md:text-lg font-light tracking-wide leading-relaxed">
          Keynotes and leadership sessions on unfair advantage, <br /> AI, entrepreneurship and human potential.  
        </p>
      </motion.div>

      {/* Controls — bottom right */}
      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-3 sm:bottom-6 sm:right-6">
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full border border-white/30 bg-black/40 flex items-center justify-center text-white hover:bg-white/10 transition duration-300"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            // Pause icon
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
              <rect x="0" y="0" width="4" height="14" rx="1" />
              <rect x="8" y="0" width="4" height="14" rx="1" />
            </svg>
          ) : (
            // Play icon
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
              <polygon points="0,0 12,7 0,14" />
            </svg>
          )}
        </button>

        {/* Mute / Unmute */}
        <button
          onClick={toggleMute}
          className="w-9 h-9 rounded-full border border-white/30 bg-black/40 flex items-center justify-center text-white hover:bg-white/10 transition duration-300"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            // Muted icon
            <svg width="16" height="14" viewBox="0 0 16 14" fill="white">
              <polygon points="0,4 4,4 8,1 8,13 4,10 0,10" />
              <line x1="11" y1="4" x2="15" y2="10" stroke="white" strokeWidth="1.5" />
              <line x1="15" y1="4" x2="11" y2="10" stroke="white" strokeWidth="1.5" />
            </svg>
          ) : (
            // Unmuted icon
            <svg width="16" height="14" viewBox="0 0 16 14" fill="white">
              <polygon points="0,4 4,4 8,1 8,13 4,10 0,10" />
              <path d="M10,4 Q13,7 10,10" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M12,2 Q16,7 12,12" stroke="white" strokeWidth="1.5" fill="none" />
            </svg>
          )}
        </button>
      </div>

    </section>
  );
};

export default VideoHero;
