import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const AnalogyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const comparisons = [
    {
      icon: "💳",
      label: "Payment Links",
      desc: "Share & Get Paid",
      color: "#4CAF50"
    },
    {
      icon: "📅",
      label: "Meeting Links",
      desc: "Share & Get Booked",
      color: "#2196F3"
    },
    {
      icon: "🎙️",
      label: "Voice Links",
      desc: "Share & Get Conversations",
      color: "#FF6B35",
      highlight: true
    },
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
          opacity: interpolate(frame, [0, 20], [0, 1]),
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 52,
            fontWeight: 700,
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          You know how these work...
        </h2>
      </div>

      {/* Comparison cards */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          marginTop: 40,
        }}
      >
        {comparisons.map((item, i) => {
          const delay = i * 20 + 20;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12 },
          });

          const isVoiceLink = item.highlight;
          const glowPulse = isVoiceLink ? Math.sin(frame * 0.15) * 0.5 + 0.5 : 0;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 24,
                  padding: isVoiceLink ? "50px 60px" : "40px 50px",
                  background: isVoiceLink
                    ? "linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(255, 140, 66, 0.1) 100%)"
                    : "rgba(255, 255, 255, 0.05)",
                  borderRadius: 32,
                  border: `3px solid ${isVoiceLink ? item.color : "rgba(255, 255, 255, 0.1)"}`,
                  transform: `scale(${cardSpring}) ${isVoiceLink ? "scale(1.1)" : ""}`,
                  opacity: cardSpring,
                  boxShadow: isVoiceLink
                    ? `0 0 ${40 + glowPulse * 30}px rgba(255, 107, 53, ${0.3 + glowPulse * 0.3})`
                    : "none",
                }}
              >
                <span style={{ fontSize: isVoiceLink ? 80 : 64 }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isVoiceLink ? 32 : 28,
                    fontWeight: 700,
                    color: item.color,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 20,
                    color: "rgba(255, 255, 255, 0.6)",
                    textAlign: "center",
                  }}
                >
                  {item.desc}
                </span>
              </div>

              {/* Arrow between cards */}
              {i < comparisons.length - 1 && (
                <div
                  style={{
                    fontSize: 48,
                    color: "rgba(255, 255, 255, 0.3)",
                    opacity: interpolate(frame, [delay + 15, delay + 25], [0, 1]),
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 36,
            fontWeight: 600,
            color: "#FF6B35",
            margin: 0,
          }}
        >
          A first of its kind. Anywhere in the world. 🌍
        </p>
      </div>
    </AbsoluteFill>
  );
};
