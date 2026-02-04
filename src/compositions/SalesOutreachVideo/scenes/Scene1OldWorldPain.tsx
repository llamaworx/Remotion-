import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Phone dialing animation
const DialingPhone: React.FC<{
  x: number;
  y: number;
  delay: number;
  frame: number;
  fps: number;
  rejected: boolean;
}> = ({ x, y, delay, frame, fps, rejected }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const localFrame = frame - delay;
  const ringPulse = Math.sin(localFrame * 0.3) * 0.1 + 1;

  // Rejection animation
  const rejectStart = 60;
  const isRejected = rejected && localFrame > rejectStart;
  const rejectShake = isRejected
    ? Math.sin(localFrame * 2) * 5 * Math.max(0, 1 - (localFrame - rejectStart) / 30)
    : 0;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${entrySpring}) translateX(${rejectShake}px)`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      {/* Phone card */}
      <div
        style={{
          width: 180,
          height: 120,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          border: isRejected ? "2px solid #EF4444" : "1px solid #334155",
          boxShadow: isRejected
            ? "0 0 30px rgba(239, 68, 68, 0.3)"
            : "0 10px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Phone icon with rings */}
        <div style={{ position: "relative" }}>
          {!isRejected && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) scale(${ringPulse})`,
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: "2px solid rgba(34, 197, 94, 0.3)",
                  opacity: interpolate(ringPulse, [0.9, 1.1], [0.5, 0]),
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) scale(${ringPulse * 1.3})`,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "2px solid rgba(34, 197, 94, 0.2)",
                  opacity: interpolate(ringPulse, [0.9, 1.1], [0.3, 0]),
                }}
              />
            </>
          )}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
              stroke={isRejected ? "#EF4444" : "#22C55E"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {isRejected && (
              <path
                d="M4 4l16 16"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 14,
            color: isRejected ? "#EF4444" : "#94A3B8",
            fontWeight: 500,
          }}
        >
          {isRejected ? "Call Rejected" : "Dialing..."}
        </span>
      </div>
    </div>
  );
};

// SPAM flash overlay
const SpamFlash: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > 45) return null;

  const flashOpacity = interpolate(
    localFrame,
    [0, 5, 15, 30, 45],
    [0, 1, 1, 0.8, 0],
    { extrapolateRight: "clamp" }
  );

  const scale = interpolate(localFrame, [0, 10], [0.5, 1], { extrapolateRight: "clamp" });
  const shake = Math.sin(localFrame * 1.5) * 3;

  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale}) translateX(${shake}px)`,
        opacity: flashOpacity,
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: "#EF4444",
          padding: "20px 60px",
          borderRadius: 12,
          boxShadow: "0 0 60px rgba(239, 68, 68, 0.6)",
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 72,
            fontWeight: 900,
            color: "white",
            letterSpacing: "0.1em",
          }}
        >
          SPAM
        </span>
      </div>
    </div>
  );
};

// CRM Dashboard with low connect rate
const CRMDashboard: React.FC<{ frame: number; fps: number; startFrame: number }> = ({ frame, fps, startFrame }) => {
  const entrySpring = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14 },
  });

  const localFrame = frame - startFrame;
  const connectRate = interpolate(localFrame, [0, 60], [0, 3.2], { extrapolateRight: "clamp" });

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        right: 80,
        top: "50%",
        transform: `translateY(-50%) scale(${entrySpring})`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          width: 320,
          backgroundColor: "#1E293B",
          borderRadius: 20,
          padding: 24,
          border: "1px solid #334155",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 18,
            color: "#64748B",
            marginBottom: 16,
          }}
        >
          CRM Dashboard
        </div>

        {/* Connect Rate */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span style={{ fontFamily: "system-ui", fontSize: 16, color: "#94A3B8" }}>
              Connect Rate
            </span>
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 24,
                fontWeight: 700,
                color: "#EF4444",
              }}
            >
              {connectRate.toFixed(1)}%
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: 8,
              backgroundColor: "#0F172A",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${connectRate}%`,
                height: "100%",
                backgroundColor: "#EF4444",
                borderRadius: 4,
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 700, color: "#F8FAFC" }}>
              {Math.floor(interpolate(localFrame, [0, 60], [0, 1247], { extrapolateRight: "clamp" }))}
            </div>
            <div style={{ fontFamily: "system-ui", fontSize: 12, color: "#64748B" }}>
              Calls Made
            </div>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 700, color: "#EF4444" }}>
              {Math.floor(interpolate(localFrame, [0, 60], [0, 40], { extrapolateRight: "clamp" }))}
            </div>
            <div style={{ fontFamily: "system-ui", fontSize: 12, color: "#64748B" }}>
              Connected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene1OldWorldPain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text animations
  const text1Spring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14 },
  });

  const text2Spring = spring({
    frame: frame - 160,
    fps,
    config: { damping: 14 },
  });

  // Phone positions - spread across left and center
  const phones = [
    { x: 120, y: 150, delay: 5, rejected: true },
    { x: 380, y: 280, delay: 15, rejected: true },
    { x: 180, y: 420, delay: 25, rejected: false },
    { x: 450, y: 120, delay: 35, rejected: true },
    { x: 550, y: 380, delay: 45, rejected: true },
    { x: 720, y: 220, delay: 55, rejected: true },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(239, 68, 68, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 40%)
          `,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Dialing phones */}
      {phones.map((phone, i) => (
        <DialingPhone
          key={i}
          x={phone.x}
          y={phone.y}
          delay={phone.delay}
          frame={frame}
          fps={fps}
          rejected={phone.rejected}
        />
      ))}

      {/* SPAM flash */}
      <SpamFlash frame={frame} startFrame={70} />

      {/* CRM Dashboard */}
      <CRMDashboard frame={frame} fps={fps} startFrame={40} />

      {/* Main text */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {/* "Cold calls don't connect anymore." */}
        <div
          style={{
            opacity: interpolate(text1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text1Spring, [0, 1], [40, 0])}px)`,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 72,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
            }}
          >
            Cold calls{" "}
            <span style={{ color: "#EF4444" }}>don't connect</span> anymore.
          </span>
        </div>

        {/* "Most get blocked." */}
        <div
          style={{
            opacity: interpolate(text2Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text2Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 42,
              fontWeight: 500,
              color: "#94A3B8",
            }}
          >
            Most get blocked.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
