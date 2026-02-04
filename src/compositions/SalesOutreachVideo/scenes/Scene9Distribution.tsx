import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Large channel card for mobile
const ChannelCard: React.FC<{
  name: string;
  icon: React.ReactNode;
  bgColor: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ name, icon, bgColor, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const pulse = Math.sin((frame - delay) * 0.08) * 0.03 + 1;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(entrySpring, [0, 1], [-40, 0])}px) scale(${pulse})`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 24,
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          border: "2px solid #334155",
          boxShadow: "0 15px 50px rgba(0,0,0,0.3)",
        }}
      >
        {/* Channel icon */}
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: 18,
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
            fontSize: 28,
            fontWeight: 700,
            color: "#F8FAFC",
            flex: 1,
          }}
        >
          {name}
        </span>

        {/* Voice Link badge */}
        <div
          style={{
            backgroundColor: "#8B5CF620",
            border: "2px solid #8B5CF6",
            borderRadius: 14,
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#8B5CF6">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#8B5CF6" strokeWidth="2" fill="none" />
          </svg>
          <span style={{ fontFamily: "system-ui", fontSize: 14, fontWeight: 700, color: "#8B5CF6" }}>
            Voice Link
          </span>
        </div>
      </div>
    </div>
  );
};

// Social icons
const FacebookIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="18" cy="6" r="1.5" fill="white" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const QRIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
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

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14 },
  });

  const textSpring = spring({
    frame: frame - 200,
    fps,
    config: { damping: 14 },
  });

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
            radial-gradient(circle at 50% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 75%, rgba(6, 182, 212, 0.12) 0%, transparent 40%)
          `,
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
          padding: "70px 50px",
          gap: 24,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 32,
              fontWeight: 700,
              color: "#94A3B8",
            }}
          >
            Voice Link Inside
          </span>
        </div>

        {/* Channel cards */}
        <ChannelCard
          name="Facebook Ads"
          icon={<FacebookIcon />}
          bgColor="#1877F2"
          delay={20}
          frame={frame}
          fps={fps}
        />
        <ChannelCard
          name="Instagram"
          icon={<InstagramIcon />}
          bgColor="linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)"
          delay={45}
          frame={frame}
          fps={fps}
        />
        <ChannelCard
          name="LinkedIn"
          icon={<LinkedInIcon />}
          bgColor="#0A66C2"
          delay={70}
          frame={frame}
          fps={fps}
        />
        <ChannelCard
          name="QR Posters"
          icon={<QRIcon />}
          bgColor="linear-gradient(135deg, #8B5CF6, #06B6D4)"
          delay={95}
          frame={frame}
          fps={fps}
        />

        {/* Main text */}
        <div
          style={{
            marginTop: "auto",
            textAlign: "center",
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 48,
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
