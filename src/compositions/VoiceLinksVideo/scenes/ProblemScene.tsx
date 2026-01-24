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
    { Icon: ClockIcon, text: "Long Hold Times", subtext: "Average 13 min wait", gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)" },
    { Icon: GlobeIcon, text: "Language Barriers", subtext: "Limited support", gradient: "linear-gradient(135deg, #FF8C42 0%, #FFB067 100%)" },
    { Icon: PhoneOffIcon, text: "Limited Hours", subtext: "9-5 only", gradient: "linear-gradient(135deg, #FF5757 0%, #FF7B7B 100%)" },
    { Icon: DollarIcon, text: "High Costs", subtext: "$15+ per call", gradient: "linear-gradient(135deg, #E53935 0%, #FF6659 100%)" },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        background: "radial-gradient(ellipse at center, rgba(255, 68, 68, 0.05) 0%, transparent 60%)",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          opacity: interpolate(frame, [0, 25], [0, 1]),
          transform: `translateY(${interpolate(frame, [0, 25], [30, 0])}px)`,
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 56,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.8)",
            margin: 0,
          }}
        >
          Customer support today is{" "}
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

      {/* Problem cards */}
      <div
        style={{
          display: "flex",
          gap: 50,
          marginTop: 80,
        }}
      >
        {problems.map((problem, i) => {
          const delay = i * 20 + 30;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 90 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
                padding: "50px 45px",
                background: "rgba(255, 50, 50, 0.06)",
                borderRadius: 28,
                border: "2px solid rgba(255, 50, 50, 0.2)",
                transform: `scale(${cardSpring})`,
                opacity: cardSpring,
                minWidth: 220,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Icon container with gradient */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: problem.gradient,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 10px 30px rgba(255, 68, 68, 0.3)",
                }}
              >
                <problem.Icon size={40} color="white" />
              </div>

              <span
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: "white",
                  textAlign: "center",
                }}
              >
                {problem.text}
              </span>

              <span
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 18,
                  color: "rgba(255, 255, 255, 0.5)",
                  textAlign: "center",
                }}
              >
                {problem.subtext}
              </span>
            </div>
          );
        })}
      </div>

      {/* Red X overlay at the end */}
      <div
        style={{
          position: "absolute",
          opacity: interpolate(frame, [140, 165], [0, 0.9], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(frame, [140, 165], [2.5, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
