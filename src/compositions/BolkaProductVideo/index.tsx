import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { TaglineScene } from "./scenes/TaglineScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { CTAScene } from "./scenes/CTAScene";

export interface BolkaProductVideoProps {
  brandName: string;
  tagline: string;
  features: string[];
}

export const BolkaProductVideo: React.FC<BolkaProductVideoProps> = ({
  brandName,
  tagline,
  features,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      {/* Intro Scene - Logo Animation */}
      <Sequence from={0} durationInFrames={90}>
        <IntroScene brandName={brandName} />
      </Sequence>

      {/* Tagline Scene */}
      <Sequence from={90} durationInFrames={90}>
        <TaglineScene tagline={tagline} />
      </Sequence>

      {/* Features Scene */}
      <Sequence from={180} durationInFrames={180}>
        <FeaturesScene features={features} />
      </Sequence>

      {/* CTA Scene */}
      <Sequence from={360} durationInFrames={90}>
        <CTAScene brandName={brandName} />
      </Sequence>
    </AbsoluteFill>
  );
};
