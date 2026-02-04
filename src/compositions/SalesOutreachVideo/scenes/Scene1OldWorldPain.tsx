import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Large phone card for mobile - shows rejection clearly
const PhoneCard: React.FC<{
  delay: number;
  frame: number;
  fps: number;
  status: "dialing" | "rejected" | "blocked";
  label: string;
}> = ({ delay, frame, fps, status, label }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const localFrame = frame - delay;
  const ringPulse = Math.sin(localFrame * 0.3) * 0.08 + 1;

  const rejectStart = 50;
  const isRejected = status !== "dialing" && localFrame > rejectStart;
  const rejectShake = isRejected
    ? Math.sin(localFrame * 2) * 8 * Math.max(0, 1 - (localFrame - rejectStart) / 30)
    : 0;

  if (entrySpring <= 0) return null;

  const statusColors = {
    dialing: { border: "#22C55E", bg: "#22C55E20", icon: "#22C55E" },
    rejected: { border: "#EF4444", bg: "#EF444420", icon: "#EF4444" },
    blocked: { border: "#F59E0B", bg: "#F59E0B20", icon: "#F59E0B" },
  };

  const colors = isRejected ? statusColors[status] : statusColors.dialing;

  return (
    <div
      style={{
        transform: `scale(${entrySpring}) translateX(${rejectShake}px)`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 24,
          padding: 28,
          display: "flex",
          alignItems: "center",
          gap: 24,
          border: `3px solid ${colors.border}`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 30px ${colors.border}30`,
        }}
      >
        {/* Phone icon with pulse */}
        <div style={{ position: "relative" }}>
          {!isRejected && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${ringPulse})`,
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: `3px solid ${colors.border}50`,
                opacity: interpolate(ringPulse, [0.92, 1.08], [0.6, 0]),
              }}
            />
          )}
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              backgroundColor: colors.bg,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                stroke={colors.icon}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {isRejected && (
                <path d="M4 4l16 16" stroke={colors.icon} strokeWidth="3" strokeLinecap="round" />
              )}
            </svg>
          </div>
        </div>

        {/* Status text */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 28,
              fontWeight: 700,
              color: "#F8FAFC",
              marginBottom: 6,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 20,
              fontWeight: 600,
              color: colors.icon,
            }}
          >
            {isRejected ? (status === "blocked" ? "BLOCKED" : "REJECTED") : "Dialing..."}
          </div>
        </div>

        {/* Status badge */}
        {isRejected && (
          <div
            style={{
              backgroundColor: colors.bg,
              padding: "12px 20px",
              borderRadius: 12,
              border: `2px solid ${colors.border}`,
            }}
          >
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 16,
                fontWeight: 700,
                color: colors.icon,
              }}
            >
              {status === "blocked" ? "DND" : "SPAM"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Big stat card
const StatCard: React.FC<{
  value: string;
  label: string;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ value, label, color, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
        flex: 1,
        textAlign: "center",
        backgroundColor: "#1E293B",
        borderRadius: 20,
        padding: "28px 20px",
        border: `2px solid ${color}40`,
      }}
    >
      <div
        style={{
          fontFamily: "system-ui",
          fontSize: 56,
          fontWeight: 800,
          color,
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "system-ui",
          fontSize: 18,
          color: "#94A3B8",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene1OldWorldPain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14 },
  });

  const textSpring = spring({
    frame: frame - 180,
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
            radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
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
          padding: "80px 50px",
          gap: 28,
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 32,
              fontWeight: 600,
              color: "#94A3B8",
            }}
          >
            Cold Calling in 2024
          </span>
        </div>

        {/* Phone cards */}
        <PhoneCard delay={15} frame={frame} fps={fps} status="rejected" label="Lead #1" />
        <PhoneCard delay={35} frame={frame} fps={fps} status="blocked" label="Lead #2" />
        <PhoneCard delay={55} frame={frame} fps={fps} status="rejected" label="Lead #3" />

        {/* Stats */}
        <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
          <StatCard value="3.2%" label="Connect Rate" color="#EF4444" delay={90} frame={frame} fps={fps} />
          <StatCard value="97%" label="Rejected" color="#F59E0B" delay={110} frame={frame} fps={fps} />
        </div>

        {/* Main text */}
        <div
          style={{
            marginTop: "auto",
            textAlign: "center",
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textSpring, [0, 1], [40, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 56,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Cold calls{" "}
            <span style={{ color: "#EF4444" }}>don't work</span>
            <br />
            anymore.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
