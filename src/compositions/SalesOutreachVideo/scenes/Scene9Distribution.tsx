import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Channel card with voice link
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
        transform: `scale(${interpolate(entrySpring, [0, 1], [0.8, 1])}) translateY(${interpolate(entrySpring, [0, 1], [40, 0])}px)`,
        width: isQR ? 280 : 320,
        backgroundColor: "#0F172A",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: `0 25px 60px rgba(0,0,0,0.4), 0 0 40px ${accentColor}20`,
        border: `2px solid ${accentColor}40`,
      }}
    >
      {/* Channel header */}
      <div
        style={{
          height: 60,
          backgroundColor: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: "0 20px",
        }}
      >
        {icon}
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 22,
            fontWeight: 700,
            color: "white",
          }}
        >
          {name}
        </span>
      </div>

      {/* Content area */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {isQR ? (
          /* QR Code */
          <div
            style={{
              width: 140,
              height: 140,
              backgroundColor: "white",
              borderRadius: 12,
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 100 100">
              {/* Simplified QR pattern */}
              <rect x="0" y="0" width="30" height="30" fill="#0A0A0F" />
              <rect x="5" y="5" width="20" height="20" fill="white" />
              <rect x="10" y="10" width="10" height="10" fill="#0A0A0F" />

              <rect x="70" y="0" width="30" height="30" fill="#0A0A0F" />
              <rect x="75" y="5" width="20" height="20" fill="white" />
              <rect x="80" y="10" width="10" height="10" fill="#0A0A0F" />

              <rect x="0" y="70" width="30" height="30" fill="#0A0A0F" />
              <rect x="5" y="75" width="20" height="20" fill="white" />
              <rect x="10" y="80" width="10" height="10" fill="#0A0A0F" />

              {/* Data pattern */}
              <rect x="40" y="10" width="8" height="8" fill="#0A0A0F" />
              <rect x="50" y="0" width="8" height="8" fill="#0A0A0F" />
              <rect x="40" y="25" width="8" height="8" fill="#0A0A0F" />
              <rect x="55" y="20" width="8" height="8" fill="#0A0A0F" />

              <rect x="10" y="40" width="8" height="8" fill="#0A0A0F" />
              <rect x="25" y="45" width="8" height="8" fill="#0A0A0F" />
              <rect x="0" y="55" width="8" height="8" fill="#0A0A0F" />

              <rect x="40" y="40" width="20" height="20" fill="#8B5CF6" rx="4" />

              <rect x="70" y="40" width="8" height="8" fill="#0A0A0F" />
              <rect x="85" y="45" width="8" height="8" fill="#0A0A0F" />
              <rect x="75" y="55" width="8" height="8" fill="#0A0A0F" />

              <rect x="40" y="75" width="8" height="8" fill="#0A0A0F" />
              <rect x="55" y="70" width="8" height="8" fill="#0A0A0F" />
              <rect x="45" y="85" width="8" height="8" fill="#0A0A0F" />

              <rect x="70" y="75" width="8" height="8" fill="#0A0A0F" />
              <rect x="85" y="80" width="8" height="8" fill="#0A0A0F" />
              <rect x="90" y="90" width="10" height="10" fill="#0A0A0F" />
            </svg>
          </div>
        ) : (
          /* Ad preview mockup */
          <div
            style={{
              width: "100%",
              height: 120,
              backgroundColor: "#1E293B",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              padding: 14,
              gap: 8,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: accentColor }} />
              <div>
                <div style={{ width: 100, height: 10, backgroundColor: "#334155", borderRadius: 4 }} />
                <div style={{ width: 60, height: 8, backgroundColor: "#334155", borderRadius: 4, marginTop: 6 }} />
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", gap: 8 }}>
              <div style={{ flex: 1, backgroundColor: "#334155", borderRadius: 8 }} />
              <div style={{ width: 60, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ height: 8, backgroundColor: "#334155", borderRadius: 4 }} />
                <div style={{ height: 8, backgroundColor: "#334155", borderRadius: 4, width: "70%" }} />
              </div>
            </div>
          </div>
        )}

        {/* Voice Link button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#8B5CF620",
            border: "2px solid #8B5CF6",
            borderRadius: 30,
            padding: "12px 24px",
            boxShadow: `0 0 ${20 + voiceLinkGlow * 20}px rgba(139, 92, 246, ${0.3 + voiceLinkGlow * 0.4})`,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#8B5CF6",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" />
              <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 16,
              fontWeight: 700,
              color: "#8B5CF6",
            }}
          >
            Voice Link
          </span>
        </div>
      </div>
    </div>
  );
};

// Social icons
const FacebookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="18" cy="6" r="1.5" fill="white" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const QRIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
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
    frame: frame - 150,
    fps,
    config: { damping: 14 },
  });

  // Channels data
  const channels = [
    { name: "Facebook", icon: <FacebookIcon />, bgColor: "#1877F2", accentColor: "#1877F2", delay: 20 },
    { name: "Instagram", icon: <InstagramIcon />, bgColor: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)", accentColor: "#DD2A7B", delay: 40 },
    { name: "TikTok", icon: <TikTokIcon />, bgColor: "#000000", accentColor: "#00F2EA", delay: 60 },
    { name: "LinkedIn", icon: <LinkedInIcon />, bgColor: "#0A66C2", accentColor: "#0A66C2", delay: 80 },
    { name: "QR Poster", icon: <QRIcon />, bgColor: "#8B5CF6", accentColor: "#8B5CF6", delay: 100, isQR: true },
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
            radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 30%)
          `,
        }}
      />

      {/* Animated connection lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Lines connecting to center */}
        {[0, 1, 2, 3, 4].map((i) => {
          const lineProgress = spring({
            frame: frame - 120 - i * 10,
            fps,
            config: { damping: 20 },
          });
          const positions = [
            { x1: 270, y1: 400 },
            { x1: 560, y1: 400 },
            { x1: 960, y1: 400 },
            { x1: 1360, y1: 400 },
            { x1: 1650, y1: 400 },
          ];
          return (
            <line
              key={i}
              x1={positions[i].x1}
              y1={positions[i].y1}
              x2={960}
              y2={800}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              opacity={lineProgress * 0.5}
            />
          );
        })}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(titleSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-30, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 48,
            fontWeight: 700,
            color: "#94A3B8",
          }}
        >
          Voice Link Inside
        </span>
      </div>

      {/* Channel cards grid */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 30,
          padding: "0 60px",
        }}
      >
        {channels.map((channel, i) => (
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

      {/* Central hub */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(
            spring({ frame: frame - 130, fps, config: { damping: 12 } }),
            [0, 1],
            [0, 1]
          ),
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 0 ${40 + Math.sin(frame * 0.1) * 15}px rgba(139, 92, 246, 0.5)`,
          }}
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="white">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2" fill="none" />
            <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Main text */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.02em",
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
          </span>{" "}
          <span style={{ color: "#F8FAFC" }}>becomes a sales desk.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
