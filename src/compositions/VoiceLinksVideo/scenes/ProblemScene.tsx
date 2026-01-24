import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problems = [
    { icon: "😤", text: "Long hold times" },
    { icon: "🌍", text: "Language barriers" },
    { icon: "📞", text: "Limited support hours" },
    { icon: "💸", text: "High support costs" },
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
          top: 100,
          opacity: interpolate(frame, [0, 15], [0, 1]),
          transform: `translateY(${interpolate(frame, [0, 15], [20, 0])}px)`,
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 48,
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.6)",
            margin: 0,
          }}
        >
          Customer support today is...
        </h2>
      </div>

      {/* Problem cards */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 60,
        }}
      >
        {problems.map((problem, i) => {
          const delay = i * 12;
          const cardSpring = spring({
            frame: frame - delay - 20,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const shake = frame > delay + 40 ? Math.sin((frame - delay) * 0.5) * 3 : 0;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                padding: "40px 50px",
                background: "rgba(255, 50, 50, 0.1)",
                borderRadius: 24,
                border: "2px solid rgba(255, 50, 50, 0.3)",
                transform: `scale(${cardSpring}) rotate(${shake}deg)`,
                opacity: cardSpring,
              }}
            >
              <span style={{ fontSize: 64 }}>{problem.icon}</span>
              <span
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 24,
                  fontWeight: 600,
                  color: "white",
                  textAlign: "center",
                }}
              >
                {problem.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Red X overlay at the end */}
      <div
        style={{
          position: "absolute",
          fontSize: 200,
          opacity: interpolate(frame, [70, 85], [0, 0.8], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(frame, [70, 85], [2, 1], { extrapolateRight: "clamp" })})`,
          color: "#FF4444",
        }}
      >
        ✕
      </div>
    </AbsoluteFill>
  );
};
