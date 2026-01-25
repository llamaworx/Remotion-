import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import {
  SparklesIcon,
  LinkIcon,
  ShareIcon,
  SMSIcon,
  EmailIcon,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  QRCodeIcon,
  PrintIcon,
} from "../../../components/Icons";

export const HowItWorksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    {
      number: "1",
      Icon: SparklesIcon,
      title: "Create",
      desc: "Build your Voice AI",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
    },
    {
      number: "2",
      Icon: LinkIcon,
      title: "Get Link",
      desc: "Receive your unique URL",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
    },
    {
      number: "3",
      Icon: ShareIcon,
      title: "Share",
      desc: "Distribute anywhere",
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    },
  ];

  const channels = [
    { name: "SMS", Icon: SMSIcon, bg: "linear-gradient(135deg, #34C759 0%, #30D158 100%)" },
    { name: "Email", Icon: EmailIcon, bg: "linear-gradient(135deg, #EA4335 0%, #FBBC05 100%)" },
    { name: "WhatsApp", Icon: WhatsAppIcon, bg: "#25D366" },
    { name: "Facebook", Icon: FacebookIcon, bg: "#1877F2" },
    { name: "Instagram", Icon: InstagramIcon, bg: "linear-gradient(135deg, #833AB4 0%, #F77737 50%, #FCAF45 100%)" },
    { name: "TikTok", Icon: TikTokIcon, bg: "#000000" },
  ];

  const float = Math.sin(frame * 0.04) * 10;

  // Title animation - fade and scale
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = interpolate(frame, [0, 30], [0.9, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 100,
        padding: 40,
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 180,
          right: 60,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "rgba(255, 107, 53, 0.1)",
          transform: `translateY(${float}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 350,
          left: 50,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.1)",
          transform: `translateY(${-float}px)`,
        }}
      />

      {/* Title - fade and scale */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          marginBottom: 50,
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
          Dead Simple.{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #FF6B35 0%, #FF8C42 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            3 Steps.
          </span>
        </h2>
      </div>

      {/* Steps - fade in with staggered scale */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          width: "100%",
          maxWidth: 580,
        }}
      >
        {steps.map((step, i) => {
          const delay = i * 25 + 40;
          const stepSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          // Subtle highlight effect
          const highlight = Math.sin((frame - delay) * 0.06) * 0.1 + 0.9;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                padding: "34px 40px",
                background: "white",
                borderRadius: 32,
                boxShadow: `0 10px 40px rgba(0, 0, 0, ${0.05 + highlight * 0.03})`,
                border: "2px solid rgba(0, 0, 0, 0.04)",
                transform: `scale(${stepSpring})`,
                opacity: stepSpring,
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: step.gradient,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 12px 35px rgba(255, 107, 53, 0.3)",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 48,
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {step.number}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h3
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 48,
                    fontWeight: 700,
                    color: "#1a1a2e",
                    margin: 0,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 30,
                    color: "#666",
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Channel icons - fade in with scale */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
          opacity: interpolate(frame, [160, 190], [0, 1], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(frame, [160, 190], [0.9, 1], { extrapolateRight: "clamp" })})`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 34,
            color: "#666",
            fontWeight: 500,
          }}
        >
          Share via any channel
        </span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 18,
            maxWidth: 600,
          }}
        >
          {channels.map((channel, i) => {
            const badgeDelay = i * 6 + 165;
            const badgeSpring = spring({
              frame: frame - badgeDelay,
              fps,
              config: { damping: 14, stiffness: 120 },
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px 24px",
                  background: "white",
                  borderRadius: 60,
                  border: "2px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
                  transform: `scale(${badgeSpring})`,
                  opacity: badgeSpring,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: channel.bg,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <channel.Icon size={22} />
                </div>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 24,
                    color: "#1a1a2e",
                    fontWeight: 600,
                  }}
                >
                  {channel.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
