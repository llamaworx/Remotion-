import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    {
      number: "1",
      icon: "✨",
      title: "Create",
      desc: "Build your Voice AI in minutes",
    },
    {
      number: "2",
      icon: "🔗",
      title: "Get Link",
      desc: "Get your unique Voice Link",
    },
    {
      number: "3",
      icon: "📤",
      title: "Share Anywhere",
      desc: "SMS, Email, WhatsApp, QR Code...",
    },
  ];

  const channels = ["SMS", "Email", "WhatsApp", "Facebook", "Instagram", "TikTok", "QR Code", "Brochures"];

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
          top: 80,
          opacity: interpolate(frame, [0, 20], [0, 1]),
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            margin: 0,
          }}
        >
          Dead Simple. <span style={{ color: "#FF6B35" }}>3 Steps.</span>
        </h2>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          gap: 80,
          marginTop: 20,
        }}
      >
        {steps.map((step, i) => {
          const delay = i * 25 + 25;
          const stepSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                transform: `scale(${stepSpring})`,
                opacity: stepSpring,
              }}
            >
              {/* Step number */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 10px 40px rgba(255, 107, 53, 0.4)",
                }}
              >
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 36,
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <span style={{ fontSize: 64 }}>{step.icon}</span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "white",
                  margin: 0,
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 20,
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: 0,
                  textAlign: "center",
                  maxWidth: 250,
                }}
              >
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Channel badges */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 1400,
          opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {channels.map((channel, i) => {
          const badgeDelay = i * 3 + 100;
          const badgeSpring = spring({
            frame: frame - badgeDelay,
            fps,
            config: { damping: 15, stiffness: 200 },
          });

          return (
            <div
              key={i}
              style={{
                padding: "12px 24px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 30,
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transform: `scale(${badgeSpring})`,
              }}
            >
              <span
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 18,
                  color: "white",
                  fontWeight: 500,
                }}
              >
                {channel}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
