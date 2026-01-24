import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Professional SVG Icons
const ClockIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const GlobeIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const PhoneOffIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const DollarIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problems = [
    { Icon: ClockIcon, text: "Long Hold Times", subtext: "Average 13 min wait" },
    { Icon: GlobeIcon, text: "Language Barriers", subtext: "Limited support" },
    { Icon: PhoneOffIcon, text: "Limited Hours", subtext: "9-5 only" },
    { Icon: DollarIcon, text: "High Costs", subtext: "$15+ per call" },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
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
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
          }}
        >
          Customer support today is{" "}
          <span style={{ color: "#FF4444" }}>broken</span>
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
                background: "rgba(255, 50, 50, 0.08)",
                borderRadius: 28,
                border: "2px solid rgba(255, 50, 50, 0.25)",
                transform: `scale(${cardSpring})`,
                opacity: cardSpring,
                minWidth: 220,
              }}
            >
              {/* Icon container */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(255, 68, 68, 0.15)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <problem.Icon size={40} color="#FF6666" />
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
