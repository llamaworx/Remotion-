import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Channel card with voice link - mobile optimized (horizontal row style)
const ChannelCard: React.FC<{
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  accentColor: string;
  delay: number;
  frame: number;
  fps: number;
  isQR?: boolean;
}> = ({ name, icon, bgColor, accentColor, delay, frame, fps, isQR }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const pulsePhase = Math.sin((frame - delay) * 0.08) * 0.5 + 0.5;
  const voiceLinkGlow = frame > delay + 30 ? pulsePhase : 0;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(entrySpring, [0, 1], [-30, 0])}px)`,
        backgroundColor: "#0F172A",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: `0 10px 30px rgba(0,0,0,0.3), 0 0 15px ${accentColor}15`,
        border: `2px solid ${accentColor}40`,
        display: "flex",
        alignItems: "center",
        padding: "14px 20px",
        gap: 16,
        width: "100%",
      }}
    >
      {/* Channel icon container */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          background: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Channel name */}
      <span
        style={{
          fontFamily: "system-ui",
          fontSize: 20,
          fontWeight: 700,
          color: "#F8FAFC",
          flex: 1,
        }}
      >
        {name}
      </span>

      {/* Voice Link button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          backgroundColor: "#8B5CF620",
          border: "1px solid #8B5CF6",
          borderRadius: 20,
          padding: "8px 14px",
          boxShadow: `0 0 ${10 + voiceLinkGlow * 10}px rgba(139, 92, 246, ${0.3 + voiceLinkGlow * 0.3})`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#8B5CF6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 11,
            fontWeight: 700,
            color: "#8B5CF6",
          }}
        >
          Voice Link
        </span>
      </div>
    </div>
  );
};

// Social icons
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="18" cy="6" r="1.5" fill="white" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const QRIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="3" height="3" />
    <rect x="18" y="14" width="3" height="3" />
    <rect x="14" y="18" width="3" height="3" />
    <rect x="18" y="18" width="3" height="3" />
  </svg>
);

export const Scene9Distribution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14 },
  });

  // Bottom text animation
  const textSpring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 14 },
  });

  // Hub animation
  const hubSpring = spring({
    frame: frame - 140,
    fps,
    config: { damping: 12 },
  });

  // Channels data
  const channels = [
    { name: "Facebook", icon: <FacebookIcon />, bgColor: "#1877F2", accentColor: "#1877F2", delay: 20 },
    { name: "Instagram", icon: <InstagramIcon />, bgColor: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)", accentColor: "#DD2A7B", delay: 35 },
    { name: "TikTok", icon: <TikTokIcon />, bgColor: "#000000", accentColor: "#00F2EA", delay: 50 },
    { name: "LinkedIn", icon: <LinkedInIcon />, bgColor: "#0A66C2", accentColor: "#0A66C2", delay: 65 },
    { name: "QR Poster", icon: <QRIcon />, bgColor: "#8B5CF6", accentColor: "#8B5CF6", delay: 80, isQR: true },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 30%)
          `,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 40px",
          gap: 14,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 26,
              fontWeight: 700,
              color: "#94A3B8",
            }}
          >
            Voice Link Inside
          </span>
        </div>

        {/* Channel cards - vertical list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
            flex: 1,
          }}
        >
          {channels.map((channel) => (
            <ChannelCard
              key={channel.name}
              name={channel.name}
              icon={channel.icon}
              bgColor={channel.bgColor}
              accentColor={channel.accentColor}
              delay={channel.delay}
              frame={frame}
              fps={fps}
              isQR={channel.isQR}
            />
          ))}
        </div>

        {/* Main text */}
        <div
          style={{
            marginTop: "auto",
            textAlign: "center",
            paddingTop: 20,
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textSpring, [0, 1], [25, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every channel
            </span>
            <br />
            <span style={{ color: "#F8FAFC" }}>becomes a sales desk.</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
