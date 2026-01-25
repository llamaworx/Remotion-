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

  // Animations
  const industrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleSpring = spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 80 } });
  const scenarioSpring = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 80 } });
  const benefitSpring = spring({ frame: frame - 120, fps, config: { damping: 14, stiffness: 80 } });

  // Floating animation
  const float = Math.sin(frame * 0.04) * 8;
  const float2 = Math.cos(frame * 0.05) * 10;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
      }}
    >
      {/* Decorative floating circles */}
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 100,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 140, 66, 0.05) 100%)",
          transform: `translateY(${float}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 300,
          left: 80,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.05) 100%)",
          transform: `translateY(${float2}px)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          zIndex: 1,
          maxWidth: 500,
        }}
      >
        {/* "Use Case" label - slides from left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: interpolate(frame, [0, 20], [0, 1]),
            transform: `translateX(${interpolate(frame, [0, 20], [-80, 0])}px)`,
          }}
        >
          <TargetIcon size={28} color="#888" />
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 28,
              fontWeight: 600,
              color: "#888",
              textTransform: "uppercase",
              letterSpacing: 6,
            }}
          >
            Use Case
          </span>
        </div>

        {/* Industry badge - scales in */}
        <div
          style={{
            padding: "18px 45px",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
            borderRadius: 50,
            transform: `scale(${industrySpring})`,
            boxShadow: "0 15px 40px rgba(255, 107, 53, 0.3)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              textTransform: "uppercase",
              letterSpacing: 4,
            }}
          >
            {useCase.industry}
          </span>
        </div>

        {/* Title - slides from right */}
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 56,
            fontWeight: 800,
            color: "#1a1a2e",
            margin: 0,
            textAlign: "center",
            opacity: titleSpring,
            transform: `translateX(${interpolate(titleSpring, [0, 1], [100, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          {useCase.title}
        </h2>

        {/* Scenario card - slides from bottom */}
        <div
          style={{
            padding: "40px 35px",
            background: "white",
            borderRadius: 28,
            border: "2px solid rgba(0, 0, 0, 0.06)",
            boxShadow: "0 15px 50px rgba(0, 0, 0, 0.06)",
            transform: `translateY(${interpolate(scenarioSpring, [0, 1], [80, float])}px)`,
            opacity: scenarioSpring,
          }}
        >
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 28,
              color: "#444",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            "{useCase.scenario}"
          </p>
        </div>

        {/* Benefit - slides from left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 20,
            opacity: benefitSpring,
            transform: `translateX(${interpolate(benefitSpring, [0, 1], [-100, 0])}px)`,
            padding: "20px 35px",
            background: "rgba(76, 175, 80, 0.08)",
            borderRadius: 60,
            border: "2px solid rgba(76, 175, 80, 0.2)",
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)",
            }}
          >
            <CheckCircleIcon size={28} color="white" />
          </div>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 32,
              fontWeight: 700,
              color: "#2E7D32",
            }}
          >
            {useCase.benefit}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
