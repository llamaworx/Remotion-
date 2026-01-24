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
      desc: "Build your Voice AI assistant in minutes with our simple builder",
      gradient: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
    },
    {
      number: "2",
      Icon: LinkIcon,
      title: "Get Link",
      desc: "Receive your unique Voice Link URL instantly",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
    },
    {
      number: "3",
      Icon: ShareIcon,
      title: "Share Anywhere",
      desc: "Distribute via any channel your customers use",
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    },
  ];

  const channels = [
    { name: "SMS", Icon: SMSIcon, bg: "linear-gradient(135deg, #34C759 0%, #30D158 100%)" },
    { name: "Email", Icon: EmailIcon, bg: "linear-gradient(135deg, #EA4335 0%, #FBBC05 100%)" },
    { name: "WhatsApp", Icon: WhatsAppIcon, bg: "#25D366" },
    { name: "Facebook", Icon: FacebookIcon, bg: "#1877F2" },
    { name: "Instagram", Icon: InstagramIcon, bg: "linear-gradient(135deg, #833AB4 0%, #F77737 50%, #FCAF45 100%)" },
    { name: "TikTok", Icon: TikTokIcon, bg: "linear-gradient(135deg, #000000 0%, #25F4EE 50%, #FE2C55 100%)" },
    { name: "QR Code", Icon: QRCodeIcon, bg: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)" },
    { name: "Print", Icon: PrintIcon, bg: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)" },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Background gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.05) 0%, transparent 70%)",
        }}
      />

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
                  background: step.gradient,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 15px 50px rgba(255, 107, 53, 0.3)",
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
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
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

      {/* Channel badges with real logos */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 1500,
          opacity: interpolate(frame, [160, 200], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {channels.map((channel, i) => {
          const badgeDelay = i * 5 + 160;
          const badgeSpring = spring({
            frame: frame - badgeDelay,
            fps,
            config: { damping: 15, stiffness: 150 },
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 24px",
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: 50,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                transform: `scale(${badgeSpring})`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: channel.bg,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <channel.Icon size={20} />
              </div>
              <span
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: 18,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {channel.name}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
