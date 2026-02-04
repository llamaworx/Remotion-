import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";

// Scene imports will be added as we create them
// import { Scene1 } from "./scenes/Scene1";
// ... up to Scene10

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

      {/* Scenes will be added here as Sequences */}
      {/* Scene timing (frames at 30fps):
        Scene 1:  0-270     (0-9s)
        Scene 2:  270-540   (9-18s)
        Scene 3:  540-810   (18-27s)
        Scene 4:  810-1080  (27-36s)
        Scene 5:  1080-1350 (36-45s)
        Scene 6:  1350-1620 (45-54s)
        Scene 7:  1620-1890 (54-63s)
        Scene 8:  1890-2160 (63-72s)
        Scene 9:  2160-2430 (72-81s)
        Scene 10: 2430-2700 (81-90s)
      */}
    </AbsoluteFill>
  );
};
