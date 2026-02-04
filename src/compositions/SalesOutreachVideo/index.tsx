import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";

// Scene imports
import { Scene1OldWorldPain } from "./scenes/Scene1OldWorldPain";
import { Scene2Compliance } from "./scenes/Scene2Compliance";

interface SalesOutreachVideoProps {
  musicUrl?: string;
  voiceOverUrl?: string;
}

export const SalesOutreachVideo: React.FC<SalesOutreachVideoProps> = ({
  musicUrl,
  voiceOverUrl,
}) => {
  // Total duration: ~90 seconds = 2700 frames at 30fps
  // 10 scenes = ~270 frames each (~9 seconds per scene)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
      }}
    >
      {/* Background music */}
      {musicUrl && (
        <Audio src={musicUrl} volume={0.3} />
      )}

      {/* Voice over */}
      {voiceOverUrl && (
        <Audio src={voiceOverUrl} volume={1} />
      )}

      {/* Scene timing (frames at 30fps):
        Scene 1:  0-240     (0-8s)   - Old World Pain
        Scene 2:  240-480   (8-16s)
        Scene 3:  480-720   (16-24s)
        Scene 4:  720-960   (24-32s)
        Scene 5:  960-1200  (32-40s)
        Scene 6:  1200-1500 (40-50s)
        Scene 7:  1500-1800 (50-60s)
        Scene 8:  1800-2100 (60-70s)
        Scene 9:  2100-2400 (70-80s)
        Scene 10: 2400-2700 (80-90s) - CTA Finale
      */}

      {/* Scene 1: Old World Pain (0-8s) */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1OldWorldPain />
      </Sequence>

      {/* Scene 2: Compliance + Reality (8-14s) */}
      <Sequence from={240} durationInFrames={180}>
        <Scene2Compliance />
      </Sequence>
    </AbsoluteFill>
  );
};
