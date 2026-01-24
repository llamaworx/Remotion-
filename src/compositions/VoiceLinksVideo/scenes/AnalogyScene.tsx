import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { CreditCardIcon, CalendarIcon, MicIcon, BolkaLogo } from "../../../components/Icons";

export const AnalogyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const comparisons = [
    {
      Icon: CreditCardIcon,
      label: "Payment Links",
      desc: "Share & Get Paid",
      color: "#4CAF50",
      gradient: "linear-gradient(135deg, #4CAF50 0%, #81C784 100%)",
    },
    {
      Icon: CalendarIcon,
      label: "Meeting Links",
      desc: "Share & Get Booked",
      color: "#2196F3",
      gradient: "linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)",
    },
    {
      Icon: MicIcon,
      label: "Voice Links",
      desc: "Share & Get Conversations",
      color: "#FF6B35",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
      highlight: true,
      useBolkaLogo: true,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.05) 0%, transparent 60%)",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          opacity: interpolate(frame, [0, 30], [0, 1]),
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 58,
            fontWeight: 700,
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          You already know how these work...
        </h2>
      </div>

      {/* Comparison cards */}
      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "center",
          marginTop: 60,
        }}
      >
        {comparisons.map((item, i) => {
          const delay = i * 30 + 35;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 80 },
          });

          const isVoiceLink = item.highlight;
          const glowPulse = isVoiceLink ? Math.sin(frame * 0.1) * 0.4 + 0.6 : 0;

          return (
            <React.Fragment key={i}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 30,
                  padding: isVoiceLink ? "60px 70px" : "50px 60px",
                  background: isVoiceLink
                    ? "linear-gradient(135deg, rgba(255, 107, 53, 0.12) 0%, rgba(255, 140, 66, 0.06) 100%)"
                    : "rgba(255, 255, 255, 0.03)",
                  borderRadius: 36,
                  border: `3px solid ${isVoiceLink ? "rgba(255, 107, 53, 0.5)" : "rgba(255, 255, 255, 0.08)"}`,
                  transform: `scale(${cardSpring}) ${isVoiceLink ? "scale(1.08)" : ""}`,
                  opacity: cardSpring,
                  boxShadow: isVoiceLink
                    ? `0 0 ${50 + glowPulse * 40}px rgba(255, 107, 53, ${0.2 + glowPulse * 0.2})`
                    : "none",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Icon container */}
                {item.useBolkaLogo ? (
                  <div
                    style={{
                      filter: `drop-shadow(0 10px 30px rgba(255, 107, 53, 0.4))`,
                    }}
                  >
                    <BolkaLogo size={100} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: "50%",
                      background: item.gradient,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: `0 10px 30px ${item.color}40`,
                    }}
                  >
                    <item.Icon size={42} color="white" />
                  </div>
                )}

                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isVoiceLink ? 34 : 30,
                    fontWeight: 700,
                    background: isVoiceLink ? item.gradient : "none",
                    WebkitBackgroundClip: isVoiceLink ? "text" : "none",
                    WebkitTextFillColor: isVoiceLink ? "transparent" : item.color,
                    color: item.color,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 22,
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
                    opacity: interpolate(frame, [delay + 20, delay + 35], [0, 1]),
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
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
          bottom: 140,
          opacity: interpolate(frame, [160, 190], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 40,
            fontWeight: 600,
            background: "linear-gradient(90deg, #FF6B35 0%, #FF8C42 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}
        >
          A first of its kind. Anywhere in the world.
        </p>
      </div>
    </AbsoluteFill>
  );
};
