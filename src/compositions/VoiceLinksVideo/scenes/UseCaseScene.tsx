import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

interface UseCaseSceneProps {
  useCase: {
    title: string;
    industry: string;
    scenario: string;
    benefit: string;
  };
}

export const UseCaseScene: React.FC<UseCaseSceneProps> = ({ useCase }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Industry badge animation
  const industrySpring = spring({ frame, fps, config: { damping: 12 } });

  // Title animation
  const titleSpring = spring({ frame: frame - 15, fps, config: { damping: 12 } });

  // Scenario card animation
  const scenarioSpring = spring({ frame: frame - 35, fps, config: { damping: 12 } });

  // Benefit animation
  const benefitSpring = spring({ frame: frame - 70, fps, config: { damping: 12 } });

  // Floating animation for the card
  const float = Math.sin(frame * 0.08) * 8;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 600,
          borderRadius: 40,
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 140, 66, 0.05) 100%)",
          transform: `translateY(${float}px)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          zIndex: 1,
        }}
      >
        {/* "Use Case" label */}
        <div
          style={{
            opacity: interpolate(frame, [0, 15], [0, 1]),
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 24,
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              letterSpacing: 6,
            }}
          >
            Use Case Spotlight
          </span>
        </div>

        {/* Industry badge */}
        <div
          style={{
            padding: "12px 32px",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
            borderRadius: 30,
            transform: `scale(${industrySpring})`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "white",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {useCase.industry}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            margin: 0,
            textAlign: "center",
            maxWidth: 1000,
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          {useCase.title}
        </h2>

        {/* Scenario card */}
        <div
          style={{
            padding: "40px 60px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: 24,
            border: "2px solid rgba(255, 255, 255, 0.1)",
            maxWidth: 900,
            transform: `scale(${scenarioSpring}) translateY(${float}px)`,
            opacity: scenarioSpring,
          }}
        >
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 28,
              color: "rgba(255, 255, 255, 0.8)",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            "{useCase.scenario}"
          </p>
        </div>

        {/* Benefit */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 20,
            opacity: benefitSpring,
            transform: `translateY(${interpolate(benefitSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <span style={{ fontSize: 40 }}>✅</span>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 32,
              fontWeight: 600,
              color: "#4CAF50",
            }}
          >
            {useCase.benefit}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
