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

  const float1 = Math.sin(frame * 0.04) * 12;
  const float2 = Math.cos(frame * 0.05) * 15;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 60,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(76, 175, 80, 0.12)",
          transform: `translateY(${float1}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 180,
          right: 80,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "rgba(33, 150, 243, 0.12)",
          transform: `translateY(${float2}px)`,
        }}
      />

      {/* Title - BIGGER */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: interpolate(frame, [0, 30], [0, 1]),
          transform: `translateY(${interpolate(frame, [0, 30], [-40, 0])}px)`,
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 68,
            fontWeight: 700,
            color: "#1a1a2e",
            margin: 0,
            textAlign: "center",
          }}
        >
          You already know
        </h2>
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 68,
            fontWeight: 700,
            color: "#1a1a2e",
            margin: 0,
            textAlign: "center",
          }}
        >
          how these work...
        </h2>
      </div>

      {/* Comparison cards - BIGGER */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          marginTop: 180,
        }}
      >
        {comparisons.map((item, i) => {
          const delay = i * 25 + 35;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 80 },
          });

          const isVoiceLink = item.highlight;
          const glowPulse = isVoiceLink ? Math.sin(frame * 0.1) * 0.3 + 0.7 : 0;

          const slideX = i === 0 ? -120 : i === 1 ? 120 : 0;
          const slideY = i === 2 ? 50 : 0;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: isVoiceLink ? "38px 50px" : "32px 45px",
                background: isVoiceLink
                  ? "linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 140, 66, 0.05) 100%)"
                  : "white",
                borderRadius: 32,
                border: `3px solid ${isVoiceLink ? "rgba(255, 107, 53, 0.5)" : "rgba(0, 0, 0, 0.06)"}`,
                transform: `translateX(${interpolate(cardSpring, [0, 1], [slideX, 0])}px) translateY(${interpolate(cardSpring, [0, 1], [slideY, 0])}px) scale(${isVoiceLink ? cardSpring * 1.05 : cardSpring})`,
                opacity: cardSpring,
                boxShadow: isVoiceLink
                  ? `0 20px 60px rgba(255, 107, 53, ${0.18 + glowPulse * 0.15})`
                  : "0 10px 40px rgba(0, 0, 0, 0.06)",
                minWidth: 460,
              }}
            >
              {/* Icon container - BIGGER */}
              {item.useBolkaLogo ? (
                <div
                  style={{
                    filter: `drop-shadow(0 10px 25px rgba(255, 107, 53, 0.35))`,
                    flexShrink: 0,
                  }}
                >
                  <BolkaLogo size={100} />
                </div>
              ) : (
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 24,
                    background: item.gradient,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: `0 10px 30px ${item.color}40`,
                    flexShrink: 0,
                  }}
                >
                  <item.Icon size={48} color="white" />
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isVoiceLink ? 48 : 44,
                    fontWeight: 700,
                    background: isVoiceLink ? item.gradient : "none",
                    WebkitBackgroundClip: isVoiceLink ? "text" : "none",
                    WebkitTextFillColor: isVoiceLink ? "transparent" : undefined,
                    color: isVoiceLink ? undefined : "#1a1a2e",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 30,
                    color: "#666",
                  }}
                >
                  {item.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom text - BIGGER */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [160, 190], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [160, 190], [30, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 50,
            fontWeight: 600,
            background: "linear-gradient(90deg, #FF6B35 0%, #FF8C42 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
            textAlign: "center",
          }}
        >
          A first of its kind.
        </p>
      </div>
    </AbsoluteFill>
  );
};
