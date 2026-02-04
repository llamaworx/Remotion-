import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Phone dialing animation - mobile optimized
const DialingPhone: React.FC<{
  delay: number;
  frame: number;
  fps: number;
  rejected: boolean;
}> = ({ delay, frame, fps, rejected }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const localFrame = frame - delay;
  const ringPulse = Math.sin(localFrame * 0.3) * 0.1 + 1;

  const rejectStart = 60;
  const isRejected = rejected && localFrame > rejectStart;
  const rejectShake = isRejected
    ? Math.sin(localFrame * 2) * 5 * Math.max(0, 1 - (localFrame - rejectStart) / 30)
    : 0;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        transform: `scale(${entrySpring}) translateX(${rejectShake}px)`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          width: 140,
          height: 100,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          padding: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          border: isRejected ? "2px solid #EF4444" : "1px solid #334155",
          boxShadow: isRejected
            ? "0 0 25px rgba(239, 68, 68, 0.3)"
            : "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ position: "relative" }}>
          {!isRejected && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) scale(${ringPulse})`,
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  border: "2px solid rgba(34, 197, 94, 0.3)",
                  opacity: interpolate(ringPulse, [0.9, 1.1], [0.5, 0]),
                }}
              />
            </>
          )}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
              stroke={isRejected ? "#EF4444" : "#22C55E"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {isRejected && (
              <path d="M4 4l16 16" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            )}
          </svg>
        </div>
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 13,
            color: isRejected ? "#EF4444" : "#94A3B8",
            fontWeight: 500,
          }}
        >
          {isRejected ? "Rejected" : "Dialing..."}
        </span>
      </div>
    </div>
  );
};

// SPAM flash overlay
const SpamFlash: React.FC<{ frame: number; startFrame: number }> = ({ frame, startFrame }) => {
  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > 45) return null;

  const flashOpacity = interpolate(localFrame, [0, 5, 15, 30, 45], [0, 1, 1, 0.8, 0], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(localFrame, [0, 10], [0.5, 1], { extrapolateRight: "clamp" });
  const shake = Math.sin(localFrame * 1.5) * 3;

  return (
    <div
      style={{
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale}) translateX(${shake}px)`,
        opacity: flashOpacity,
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: "#EF4444",
          padding: "16px 50px",
          borderRadius: 12,
          boxShadow: "0 0 50px rgba(239, 68, 68, 0.6)",
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 56,
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

// CRM Dashboard - mobile optimized
const CRMDashboard: React.FC<{ frame: number; fps: number; startFrame: number }> = ({
  frame,
  fps,
  startFrame,
}) => {
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
        transform: `scale(${entrySpring})`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 20,
          padding: 24,
          border: "1px solid #334155",
          boxShadow: "0 15px 50px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 20,
            color: "#64748B",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          CRM Dashboard
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: "system-ui", fontSize: 18, color: "#94A3B8" }}>
              Connect Rate
            </span>
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 28,
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
              height: 10,
              backgroundColor: "#0F172A",
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${connectRate}%`,
                height: "100%",
                backgroundColor: "#EF4444",
                borderRadius: 5,
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "system-ui", fontSize: 32, fontWeight: 700, color: "#F8FAFC" }}>
              {Math.floor(interpolate(localFrame, [0, 60], [0, 1247], { extrapolateRight: "clamp" }))}
            </div>
            <div style={{ fontFamily: "system-ui", fontSize: 14, color: "#64748B" }}>Calls Made</div>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "system-ui", fontSize: 32, fontWeight: 700, color: "#EF4444" }}>
              {Math.floor(interpolate(localFrame, [0, 60], [0, 40], { extrapolateRight: "clamp" }))}
            </div>
            <div style={{ fontFamily: "system-ui", fontSize: 14, color: "#64748B" }}>Connected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene1OldWorldPain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const text1Spring = spring({
    frame: frame - 140,
    fps,
    config: { damping: 14 },
  });

  const text2Spring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 14 },
  });

  // Phone delays for grid
  const phoneDelays = [5, 15, 25, 35, 45, 55];
  const phoneRejected = [true, true, false, true, true, true];

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
            radial-gradient(circle at 50% 30%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid pattern */}
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
          padding: "60px 40px",
        }}
      >
        {/* Phone grid - 2x3 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {phoneDelays.map((delay, i) => (
            <DialingPhone
              key={i}
              delay={delay}
              frame={frame}
              fps={fps}
              rejected={phoneRejected[i]}
            />
          ))}
        </div>

        {/* SPAM Flash */}
        <SpamFlash frame={frame} startFrame={80} />

        {/* CRM Dashboard */}
        <div style={{ width: "100%", maxWidth: 400, marginBottom: 50 }}>
          <CRMDashboard frame={frame} fps={fps} startFrame={50} />
        </div>

        {/* Main text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              opacity: interpolate(text1Spring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(text1Spring, [0, 1], [40, 0])}px)`,
            }}
          >
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 52,
                fontWeight: 800,
                color: "#F8FAFC",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Cold calls{" "}
              <span style={{ color: "#EF4444" }}>don't connect</span>
              <br />
              anymore.
            </span>
          </div>

          <div
            style={{
              opacity: interpolate(text2Spring, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(text2Spring, [0, 1], [30, 0])}px)`,
            }}
          >
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 32,
                fontWeight: 500,
                color: "#94A3B8",
              }}
            >
              Most get blocked.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
