import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { Scene1TextChatSlow } from "./scenes/Scene1TextChatSlow";
import { Scene2EnterBolka } from "./scenes/Scene2EnterBolka";
import { Scene3TwoProducts } from "./scenes/Scene3TwoProducts";
import { Scene4VoiceAILinks } from "./scenes/Scene4VoiceAILinks";

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

      {/* Scene 2: Enter Bolka (5-11s = 180 frames) */}
      {/* VO: "Meet Bolka — Voice AI that works anywhere… without phones, apps, or heavy infrastructure." */}
      <Sequence from={150} durationInFrames={180}>
        <Scene2EnterBolka />
      </Sequence>

      {/* Scene 3: Two Products (11-19s = 240 frames) */}
      {/* VO: "Two products. One revolution." */}
      <Sequence from={330} durationInFrames={240}>
        <Scene3TwoProducts />
      </Sequence>

      {/* Scene 4: Voice AI Links (19-34s = 450 frames) */}
      {/* VO: "Bolka Share gives you a Voice AI link. Just click and start talking — on any device, any browser." */}
      <Sequence from={570} durationInFrames={450}>
        <Scene4VoiceAILinks />
      </Sequence>

      {/* More scenes will be added here */}
    </AbsoluteFill>
  );
};
