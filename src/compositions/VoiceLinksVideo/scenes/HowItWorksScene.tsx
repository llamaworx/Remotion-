import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Professional SVG Icons
const SparklesIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L14.5 8.5L20 9L16 13.5L17 19L12 16L7 19L8 13.5L4 9L9.5 8.5L12 3Z" />
  </svg>
);

const LinkIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const ShareIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    {
      number: "1",
      Icon: SparklesIcon,
      title: "Create",
      desc: "Build your Voice AI assistant in minutes with our simple builder",
    },
    {
      number: "2",
      Icon: LinkIcon,
      title: "Get Link",
      desc: "Receive your unique Voice Link URL instantly",
    },
    {
      number: "3",
      Icon: ShareIcon,
      title: "Share Anywhere",
      desc: "Distribute via any channel your customers use",
    },
  ];

  const channels = [
    "SMS",
    "Email",
    "WhatsApp",
    "Facebook",
    "Instagram",
    "TikTok",
    "QR Code",
    "Print",
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
          opacity: interpolate(frame, [0, 30], [0, 1]),
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 62,
            fontWeight: 700,
            color: "white",
            margin: 0,
          }}
        >
          Dead Simple.{" "}
          <span style={{ color: "#FF6B35" }}>3 Steps.</span>
        </h2>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          gap: 100,
          marginTop: 40,
        }}
      >
        {steps.map((step, i) => {
          const delay = i * 35 + 40;
          const stepSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 80 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
                transform: `scale(${stepSpring})`,
                opacity: stepSpring,
                maxWidth: 320,
              }}
            >
              {/* Step number */}
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 15px 50px rgba(255, 107, 53, 0.4)",
                }}
              >
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 42,
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: "rgba(255, 107, 53, 0.1)",
                  border: "2px solid rgba(255, 107, 53, 0.3)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <step.Icon size={40} color="#FF6B35" />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 36,
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
                  lineHeight: 1.5,
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
          gap: 20,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 1400,
          opacity: interpolate(frame, [160, 200], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {channels.map((channel, i) => {
          const badgeDelay = i * 4 + 160;
          const badgeSpring = spring({
            frame: frame - badgeDelay,
            fps,
            config: { damping: 15, stiffness: 150 },
          });

          return (
            <div
              key={i}
              style={{
                padding: "14px 28px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: 30,
                border: "1px solid rgba(255, 255, 255, 0.15)",
                transform: `scale(${badgeSpring})`,
              }}
            >
              <span
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 20,
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
