import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { OldWayScene } from "./scenes/OldWayScene";
import { EnterBolkaScene } from "./scenes/EnterBolkaScene";
import { WidgetOpensScene } from "./scenes/WidgetOpensScene";
import { VoiceInActionScene } from "./scenes/VoiceInActionScene";
import { FutureIsNowScene } from "./scenes/FutureIsNowScene";

export interface BolkaEmbedVideoProps {
  musicUrl?: string;
}

export const BolkaEmbedVideo: React.FC<BolkaEmbedVideoProps> = ({
  musicUrl,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
      }}
    >
      {/* Background Music */}
      {musicUrl && <Audio src={musicUrl} volume={0.5} />}

      {/* Scene 1: The Old Way (0-3s) */}
      <Sequence from={0} durationInFrames={90}>
        <OldWayScene />
      </Sequence>

      {/* Scene 2: Enter Bolka (3-6s) */}
      <Sequence from={90} durationInFrames={90}>
        <EnterBolkaScene />
      </Sequence>

      {/* Scene 3: The Widget Opens (6-12s) */}
      <Sequence from={180} durationInFrames={180}>
        <WidgetOpensScene />
      </Sequence>

      {/* Scene 4: Voice AI in Action (12-16s) */}
      <Sequence from={360} durationInFrames={120}>
        <VoiceInActionScene />
      </Sequence>

      {/* Scene 5: The Future is Now (16-20s) */}
      <Sequence from={480} durationInFrames={120}>
        <FutureIsNowScene />
      </Sequence>
    </AbsoluteFill>
  );
};
