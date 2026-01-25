import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { ClockIcon, GlobeIcon, PhoneOffIcon, DollarIcon } from "../../../components/Icons";

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problems = [
    { Icon: ClockIcon, text: "Long Wait", subtext: "13+ min hold", gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)" },
    { Icon: GlobeIcon, text: "Language Limits", subtext: "No support", gradient: "linear-gradient(135deg, #FF8C42 0%, #FFB067 100%)" },
    { Icon: PhoneOffIcon, text: "Limited Hours", subtext: "9-5 only", gradient: "linear-gradient(135deg, #FF5757 0%, #FF7B7B 100%)" },
    { Icon: DollarIcon, text: "High Costs", subtext: "$15+ per call", gradient: "linear-gradient(135deg, #E53935 0%, #FF6659 100%)" },
  ];

  const floatOffset = Math.sin(frame * 0.04) * 8;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 60,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(255, 100, 100, 0.1)",
          transform: `translateY(${floatOffset}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 150,
          right: 40,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(255, 100, 100, 0.08)",
          transform: `translateY(${-floatOffset}px)`,
        }}
      />

      {/* Title - BIGGER */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: interpolate(frame, [0, 25], [0, 1]),
          transform: `translateX(${interpolate(frame, [0, 25], [-80, 0])}px)`,
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 76,
            fontWeight: 700,
            color: "#1a1a2e",
            margin: 0,
            textAlign: "center",
          }}
        >
          Customer support
        </h2>
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 76,
            fontWeight: 700,
            margin: 0,
            textAlign: "center",
          }}
        >
          today is{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #FF4444 0%, #FF6B6B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            broken
          </span>
        </h2>
      </div>

      {/* Problem cards - BIGGER */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          marginTop: 180,
        }}
      >
        {problems.map((problem, i) => {
          const delay = i * 15 + 30;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          const slideX = i % 2 === 0 ? -120 : 120;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "32px 45px",
                background: "white",
                borderRadius: 28,
                border: "2px solid rgba(255, 100, 100, 0.15)",
                boxShadow: "0 10px 40px rgba(255, 100, 100, 0.12)",
                transform: `translateX(${interpolate(cardSpring, [0, 1], [slideX, 0])}px) scale(${cardSpring})`,
                opacity: cardSpring,
                minWidth: 420,
              }}
            >
              {/* Icon container - BIGGER */}
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 24,
                  background: problem.gradient,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 10px 30px rgba(255, 68, 68, 0.3)",
                  flexShrink: 0,
                }}
              >
                <problem.Icon size={48} color="white" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 44,
                    fontWeight: 700,
                    color: "#1a1a2e",
                  }}
                >
                  {problem.text}
                </span>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 32,
                    color: "#666",
                  }}
                >
                  {problem.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Red X overlay */}
      <div
        style={{
          position: "absolute",
          opacity: interpolate(frame, [140, 165], [0, 0.9], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(frame, [140, 165], [2.5, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" fill="rgba(255, 68, 68, 0.1)" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
