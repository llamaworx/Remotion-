import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { OldWayScene } from "./scenes/OldWayScene";
import { EnterBolkaScene } from "./scenes/EnterBolkaScene";
import { WidgetOpensScene } from "./scenes/WidgetOpensScene";
import { DualModeFeatureScene } from "./scenes/DualModeFeatureScene";
import { VoiceInActionScene } from "./scenes/VoiceInActionScene";
import { FutureIsNowScene } from "./scenes/FutureIsNowScene";

export interface VoiceOverConfig {
  scene1?: string; // "Text chatbots. So 2020. Extinct."
  scene2?: string; // "Meet Bolka Embed."
  scene3?: string; // "Text plus voice. Your choice."
  scene4?: string; // "World's first Voice AI Widget. Talk or type. One widget."
  scene5?: string; // "Your website. Now it talks back."
  scene6?: string; // "The world moved to 2030. In 2026. Voice AI, Deployed Your Way. Bolka dot AI."
}

export interface BolkaEmbedVideoProps {
  musicUrl?: string;
  voiceOver?: VoiceOverConfig;
}

export const BolkaEmbedVideo: React.FC<BolkaEmbedVideoProps> = ({
  musicUrl,
  voiceOver,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
      }}
    >
      {/* Background Music - lower volume when voice over is present */}
      {musicUrl && <Audio src={musicUrl} volume={voiceOver ? 0.25 : 0.5} />}

      {/* Voice Over Audio Tracks */}
      {voiceOver?.scene1 && (
        <Sequence from={0} durationInFrames={90}>
          <Audio src={voiceOver.scene1} volume={1} />
        </Sequence>
      )}
      {voiceOver?.scene2 && (
        <Sequence from={90} durationInFrames={90}>
          <Audio src={voiceOver.scene2} volume={1} />
        </Sequence>
      )}
      {voiceOver?.scene3 && (
        <Sequence from={180} durationInFrames={180}>
          <Audio src={voiceOver.scene3} volume={1} />
        </Sequence>
      )}
      {voiceOver?.scene4 && (
        <Sequence from={360} durationInFrames={150}>
          <Audio src={voiceOver.scene4} volume={1} />
        </Sequence>
      )}
      {voiceOver?.scene5 && (
        <Sequence from={510} durationInFrames={120}>
          <Audio src={voiceOver.scene5} volume={1} />
        </Sequence>
      )}
      {voiceOver?.scene6 && (
        <Sequence from={630} durationInFrames={120}>
          <Audio src={voiceOver.scene6} volume={1} />
        </Sequence>
      )}

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

      {/* Scene 4: World's First Voice AI Widget - Dual Mode Feature (12-17s) */}
      <Sequence from={360} durationInFrames={150}>
        <DualModeFeatureScene />
      </Sequence>

      {/* Scene 5: Voice AI in Action (17-21s) */}
      <Sequence from={510} durationInFrames={120}>
        <VoiceInActionScene />
      </Sequence>

      {/* Scene 6: The Future is Now (21-25s) */}
      <Sequence from={630} durationInFrames={120}>
        <FutureIsNowScene />
      </Sequence>
    </AbsoluteFill>
  );
};
