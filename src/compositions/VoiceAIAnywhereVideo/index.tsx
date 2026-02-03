import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { Scene1TextChatSlow } from "./scenes/Scene1TextChatSlow";

export interface VoiceAIAnywhereVideoProps {
  musicUrl?: string;
  voiceOverUrl?: string;
}

export const VoiceAIAnywhereVideo: React.FC<VoiceAIAnywhereVideoProps> = ({
  musicUrl,
  voiceOverUrl,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: "#0A0A0F",
      }}
    >
      {/* Background Music */}
      {musicUrl && <Audio src={musicUrl} volume={0.4} />}

      {/* Voice Over */}
      {voiceOverUrl && <Audio src={voiceOverUrl} volume={1} />}

      {/* Scene 1: Text chat is slow (0-5s = 150 frames) */}
      {/* VO: "We built the internet to talk… and then forced everyone to type." */}
      <Sequence from={0} durationInFrames={150}>
        <Scene1TextChatSlow />
      </Sequence>

      {/* More scenes will be added here */}
    </AbsoluteFill>
  );
};
