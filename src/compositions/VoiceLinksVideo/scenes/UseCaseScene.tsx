import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Professional SVG Icons
const CheckCircleIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const TargetIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

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
  const industrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });

  // Title animation
  const titleSpring = spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 80 } });

  // Scenario card animation
  const scenarioSpring = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 80 } });

  // Benefit animation
  const benefitSpring = spring({ frame: frame - 120, fps, config: { damping: 14, stiffness: 80 } });

  // Floating animation for the card
  const float = Math.sin(frame * 0.05) * 6;

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
          width: 1200,
          height: 700,
          borderRadius: 50,
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(255, 140, 66, 0.03) 100%)",
          transform: `translateY(${float}px)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
          zIndex: 1,
        }}
      >
        {/* "Use Case" label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: interpolate(frame, [0, 20], [0, 1]),
          }}
        >
          <TargetIcon size={28} color="rgba(255, 255, 255, 0.5)" />
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 26,
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
            padding: "16px 40px",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
            borderRadius: 40,
            transform: `scale(${industrySpring})`,
            boxShadow: "0 10px 40px rgba(255, 107, 53, 0.3)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "white",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {useCase.industry}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            margin: 0,
            textAlign: "center",
            maxWidth: 1100,
            opacity: titleSpring,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          {useCase.title}
        </h2>

        {/* Scenario card */}
        <div
          style={{
            padding: "50px 80px",
            background: "rgba(255, 255, 255, 0.04)",
            borderRadius: 30,
            border: "2px solid rgba(255, 255, 255, 0.1)",
            maxWidth: 1000,
            transform: `scale(${scenarioSpring}) translateY(${float}px)`,
            opacity: scenarioSpring,
          }}
        >
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 30,
              color: "rgba(255, 255, 255, 0.85)",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.7,
              fontStyle: "italic",
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
            gap: 20,
            marginTop: 30,
            opacity: benefitSpring,
            transform: `translateY(${interpolate(benefitSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(76, 175, 80, 0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon size={32} color="#4CAF50" />
          </div>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 36,
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
