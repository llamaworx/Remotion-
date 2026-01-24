import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { AnalogyScene } from "./scenes/AnalogyScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { UseCaseScene } from "./scenes/UseCaseScene";
import { CTAScene } from "./scenes/CTAScene";

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
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
      }}
    >
      {/* Background Music */}
      {musicUrl && <Audio src={musicUrl} volume={0.4} />}

      {/* Hook - Grab attention */}
      <Sequence from={0} durationInFrames={90}>
        <HookScene />
      </Sequence>

      {/* Problem - Current state is broken */}
      <Sequence from={90} durationInFrames={90}>
        <ProblemScene />
      </Sequence>

      {/* Solution - Introducing Voice Links */}
      <Sequence from={180} durationInFrames={120}>
        <SolutionScene />
      </Sequence>

      {/* Analogy - Like Payment Links */}
      <Sequence from={300} durationInFrames={120}>
        <AnalogyScene />
      </Sequence>

      {/* How It Works - 3 Simple Steps */}
      <Sequence from={420} durationInFrames={150}>
        <HowItWorksScene />
      </Sequence>

      {/* Use Case - Specific Example */}
      <Sequence from={570} durationInFrames={150}>
        <UseCaseScene useCase={useCase} />
      </Sequence>

      {/* CTA - Get Started */}
      <Sequence from={720} durationInFrames={90}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
