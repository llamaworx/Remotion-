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

  const industrySpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleSpring = spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 80 } });
  const scenarioSpring = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 80 } });
  const benefitSpring = spring({ frame: frame - 120, fps, config: { damping: 14, stiffness: 80 } });

  const float = Math.sin(frame * 0.04) * 8;
  const float2 = Math.cos(frame * 0.05) * 10;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
      }}
    >
      {/* Decorative floating circles */}
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 80,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.12) 0%, rgba(255, 140, 66, 0.06) 100%)",
          transform: `translateY(${float}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 280,
          left: 60,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(76, 175, 80, 0.12) 0%, rgba(129, 199, 132, 0.06) 100%)",
          transform: `translateY(${float2}px)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
          zIndex: 1,
          maxWidth: 580,
        }}
      >
        {/* "Use Case" label - BIGGER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: interpolate(frame, [0, 20], [0, 1]),
            transform: `translateX(${interpolate(frame, [0, 20], [-80, 0])}px)`,
          }}
        >
          <TargetIcon size={36} color="#888" />
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 36,
              fontWeight: 600,
              color: "#888",
              textTransform: "uppercase",
              letterSpacing: 8,
            }}
          >
            Use Case
          </span>
        </div>

        {/* Industry badge - BIGGER */}
        <div
          style={{
            padding: "22px 55px",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
            borderRadius: 60,
            transform: `scale(${industrySpring})`,
            boxShadow: "0 18px 50px rgba(255, 107, 53, 0.35)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              textTransform: "uppercase",
              letterSpacing: 5,
            }}
          >
            {useCase.industry}
          </span>
        </div>

        {/* Title - BIGGER */}
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: "#1a1a2e",
            margin: 0,
            textAlign: "center",
            opacity: titleSpring,
            transform: `translateX(${interpolate(titleSpring, [0, 1], [100, 0])}px)`,
            lineHeight: 1.15,
          }}
        >
          {useCase.title}
        </h2>

        {/* Scenario card - BIGGER */}
        <div
          style={{
            padding: "45px 40px",
            background: "white",
            borderRadius: 32,
            border: "2px solid rgba(0, 0, 0, 0.06)",
            boxShadow: "0 18px 60px rgba(0, 0, 0, 0.07)",
            transform: `translateY(${interpolate(scenarioSpring, [0, 1], [80, float])}px)`,
            opacity: scenarioSpring,
          }}
        >
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 36,
              color: "#444",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            "{useCase.scenario}"
          </p>
        </div>

        {/* Benefit - BIGGER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 25,
            opacity: benefitSpring,
            transform: `translateX(${interpolate(benefitSpring, [0, 1], [-100, 0])}px)`,
            padding: "24px 40px",
            background: "rgba(76, 175, 80, 0.1)",
            borderRadius: 70,
            border: "3px solid rgba(76, 175, 80, 0.25)",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 10px 30px rgba(76, 175, 80, 0.35)",
            }}
          >
            <CheckCircleIcon size={34} color="white" />
          </div>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 42,
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
