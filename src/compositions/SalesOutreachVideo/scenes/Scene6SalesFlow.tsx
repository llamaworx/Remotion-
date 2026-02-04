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
  icon: React.ReactNode;
  name: string;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ icon, name, color, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const localFrame = frame - delay;
  const linkSent = localFrame > 50;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(entrySpring, [0, 1], [-40, 0])}px)`,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "24px 28px",
          backgroundColor: "#1E293B",
          borderRadius: 20,
          border: `3px solid ${linkSent ? color : "#334155"}`,
          boxShadow: linkSent ? `0 0 30px ${color}40` : "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Channel icon */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            backgroundColor: `${color}20`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        {/* Channel name */}
        <span style={{ fontFamily: "system-ui", fontSize: 26, fontWeight: 700, color: "#F8FAFC", flex: 1 }}>
          {name}
        </span>

        {/* Status badge */}
        <div
          style={{
            backgroundColor: linkSent ? `${color}20` : "#33415520",
            padding: "10px 18px",
            borderRadius: 12,
            border: `2px solid ${linkSent ? color : "#334155"}`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 14,
              fontWeight: 700,
              color: linkSent ? color : "#64748B",
            }}
          >
            {linkSent ? "SENT" : "READY"}
          </span>
        </div>
      </div>
    </div>
  );
};

// Central hub
const CentralHub: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 10, stiffness: 60 },
  });

  const pulse = Math.sin(frame * 0.08) * 0.05 + 1;
  const glow = Math.sin(frame * 0.1) * 0.4 + 0.6;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring * pulse})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 0 ${50 * glow}px rgba(139, 92, 246, 0.5), 0 20px 50px rgba(0,0,0,0.3)`,
        }}
      >
        <svg width="55" height="55" viewBox="0 0 24 24" fill="white">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      <div
        style={{
          fontFamily: "system-ui",
          fontSize: 24,
          fontWeight: 600,
          color: "#94A3B8",
        }}
      >
        Voice Link Hub
      </div>
    </div>
  );
};

export const Scene6SalesFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
            radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 40%)
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
          gap: 20,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: interpolate(spring({ frame, fps, config: { damping: 14 } }), [0, 1], [0, 1]),
            marginBottom: 16,
          }}
        >
          <span style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 600, color: "#94A3B8" }}>
            One link, every channel
          </span>
        </div>

        {/* Channel cards */}
        <ChannelCard
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          }
          name="WhatsApp"
          color="#25D366"
          delay={15}
          frame={frame}
          fps={fps}
        />
        <ChannelCard
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#EA4335">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          }
          name="Email"
          color="#EA4335"
          delay={35}
          frame={frame}
          fps={fps}
        />
        <ChannelCard
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#34B7F1">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
            </svg>
          }
          name="SMS"
          color="#34B7F1"
          delay={55}
          frame={frame}
          fps={fps}
        />

        {/* Central hub */}
        <CentralHub frame={frame} fps={fps} />

        {/* Click Talk Qualify */}
        <div
          style={{
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <span style={{ fontFamily: "system-ui", fontSize: 44, fontWeight: 800, color: "#8B5CF6" }}>
              Click.
            </span>
            <span style={{ fontFamily: "system-ui", fontSize: 44, fontWeight: 800, color: "#06B6D4" }}>
              Talk.
            </span>
            <span style={{ fontFamily: "system-ui", fontSize: 44, fontWeight: 800, color: "#22C55E" }}>
              Qualify.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
