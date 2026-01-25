import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { AnalogyScene } from "./scenes/AnalogyScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { UseCaseScene } from "./scenes/UseCaseScene";
import { CTAScene } from "./scenes/CTAScene";
import { EndCardScene } from "./scenes/EndCardScene";

export interface VoiceLinksVideoProps {
  useCase: {
    title: string;
    industry: string;
    scenario: string;
    benefit: string;
  };
  musicUrl?: string;
}

export const VoiceLinksVideo: React.FC<VoiceLinksVideoProps> = ({
  useCase,
  musicUrl,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 50%, #EEF2F7 100%)",
      }}
    >
      {/* Background Music */}
      {musicUrl && <Audio src={musicUrl} volume={0.4} />}

      {/* Hook - Grab attention (5s) */}
      <Sequence from={0} durationInFrames={150}>
        <HookScene />
      </Sequence>

      {/* Problem - Current state is broken (6s) */}
      <Sequence from={150} durationInFrames={180}>
        <ProblemScene />
      </Sequence>

      {/* Solution - Introducing Voice Links (6s) */}
      <Sequence from={330} durationInFrames={180}>
        <SolutionScene />
      </Sequence>

      {/* Analogy - Like Payment Links (7s) */}
      <Sequence from={510} durationInFrames={210}>
        <AnalogyScene />
      </Sequence>

      {/* How It Works - 3 Simple Steps (8s) */}
      <Sequence from={720} durationInFrames={240}>
        <HowItWorksScene />
      </Sequence>

      {/* Use Case - Specific Example (8s) */}
      <Sequence from={960} durationInFrames={240}>
        <UseCaseScene useCase={useCase} />
      </Sequence>

      {/* CTA - Get Started (5s) */}
      <Sequence from={1200} durationInFrames={150}>
        <CTAScene />
      </Sequence>

      {/* End Card - Branding with music (4s) */}
      <Sequence from={1350} durationInFrames={120}>
        <EndCardScene />
      </Sequence>
    </AbsoluteFill>
  );
};
