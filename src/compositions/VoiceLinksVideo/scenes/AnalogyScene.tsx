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

  // Floating decorative elements
  const float1 = Math.sin(frame * 0.04) * 12;
  const float2 = Math.cos(frame * 0.05) * 15;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 80,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "rgba(76, 175, 80, 0.1)",
          transform: `translateY(${float1}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          right: 100,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "rgba(33, 150, 243, 0.1)",
          transform: `translateY(${float2}px)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 180,
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
            fontSize: 52,
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
            fontSize: 52,
            fontWeight: 700,
            color: "#1a1a2e",
            margin: 0,
            textAlign: "center",
          }}
        >
          how these work...
        </h2>
      </div>

      {/* Comparison cards - vertical layout for mobile */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 35,
          marginTop: 150,
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

          // Slide from alternating directions
          const slideX = i === 0 ? -120 : i === 1 ? 120 : 0;
          const slideY = i === 2 ? 50 : 0;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 25,
                padding: isVoiceLink ? "35px 45px" : "28px 40px",
                background: isVoiceLink
                  ? "linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(255, 140, 66, 0.04) 100%)"
                  : "white",
                borderRadius: 28,
                border: `3px solid ${isVoiceLink ? "rgba(255, 107, 53, 0.4)" : "rgba(0, 0, 0, 0.06)"}`,
                transform: `translateX(${interpolate(cardSpring, [0, 1], [slideX, 0])}px) translateY(${interpolate(cardSpring, [0, 1], [slideY, 0])}px) scale(${isVoiceLink ? cardSpring * 1.05 : cardSpring})`,
                opacity: cardSpring,
                boxShadow: isVoiceLink
                  ? `0 15px 50px rgba(255, 107, 53, ${0.15 + glowPulse * 0.15})`
                  : "0 8px 30px rgba(0, 0, 0, 0.06)",
                minWidth: 380,
              }}
            >
              {/* Icon container */}
              {item.useBolkaLogo ? (
                <div
                  style={{
                    filter: `drop-shadow(0 8px 20px rgba(255, 107, 53, 0.3))`,
                    flexShrink: 0,
                  }}
                >
                  <BolkaLogo size={80} />
                </div>
              ) : (
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 20,
                    background: item.gradient,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: `0 8px 25px ${item.color}30`,
                    flexShrink: 0,
                  }}
                >
                  <item.Icon size={36} color="white" />
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: isVoiceLink ? 36 : 32,
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
                    fontSize: 22,
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

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
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
            fontSize: 38,
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
