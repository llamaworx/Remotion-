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
      desc: "Build your Voice AI in minutes",
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
    { name: "QR Code", Icon: QRCodeIcon, bg: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)" },
    { name: "Print", Icon: PrintIcon, bg: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" },
  ];

  // Floating animation
  const float = Math.sin(frame * 0.04) * 10;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 120,
        padding: 50,
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 80,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(255, 107, 53, 0.08)",
          transform: `translateY(${float}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 400,
          left: 60,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.08)",
          transform: `translateY(${-float}px)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: interpolate(frame, [0, 30], [0, 1]),
          transform: `translateY(${interpolate(frame, [0, 30], [-40, 0])}px)`,
          marginBottom: 50,
        }}
      >
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 58,
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

      {/* Steps - vertical layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 35,
          width: "100%",
          maxWidth: 500,
        }}
      >
        {steps.map((step, i) => {
          const delay = i * 30 + 40;
          const stepSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 80 },
          });

          // Slide from alternating sides
          const slideX = i % 2 === 0 ? -150 : 150;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 25,
                padding: "30px 35px",
                background: "white",
                borderRadius: 28,
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.06)",
                border: "2px solid rgba(0, 0, 0, 0.04)",
                transform: `translateX(${interpolate(stepSpring, [0, 1], [slideX, 0])}px)`,
                opacity: stepSpring,
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  background: step.gradient,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 10px 30px rgba(255, 107, 53, 0.25)",
                  flexShrink: 0,
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

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h3
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 36,
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
                    fontSize: 22,
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

      {/* Channel icons - flowing in from bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: interpolate(frame, [160, 190], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 26,
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
            gap: 15,
            maxWidth: 500,
          }}
        >
          {channels.map((channel, i) => {
            const badgeDelay = i * 4 + 160;
            const badgeSpring = spring({
              frame: frame - badgeDelay,
              fps,
              config: { damping: 12, stiffness: 150 },
            });

            // Slide from bottom
            const slideY = 50;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 20px",
                  background: "white",
                  borderRadius: 50,
                  border: "2px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                  transform: `translateY(${interpolate(badgeSpring, [0, 1], [slideY, 0])}px)`,
                  opacity: badgeSpring,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: channel.bg,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <channel.Icon size={18} />
                </div>
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: 18,
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
