import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Simple ad preview card
const AdPreview: React.FC<{
  delay: number;
  frame: number;
  fps: number;
}> = ({ delay, frame, fps }) => {
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
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 15px 50px rgba(0,0,0,0.4)",
          border: "2px solid #334155",
        }}
      >
        {/* Ad header */}
        <div
          style={{
            padding: "16px 24px",
            backgroundColor: "#0F172A",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22C55E" }} />
          <span style={{ fontFamily: "system-ui", fontSize: 18, color: "#64748B" }}>
            Sponsored Ad
          </span>
        </div>

        {/* Ad content */}
        <div style={{ padding: 28 }}>
          <div
            style={{
              width: "100%",
              height: 160,
              background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
              borderRadius: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <span style={{ fontFamily: "system-ui", fontSize: 48, fontWeight: 800, color: "white" }}>
              50% OFF
            </span>
          </div>

          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 28,
              fontWeight: 700,
              color: "#F8FAFC",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Limited Time Offer!
          </div>

          <div
            style={{
              backgroundColor: "#3B82F6",
              padding: "20px 24px",
              borderRadius: 14,
              textAlign: "center",
              fontFamily: "system-ui",
              fontSize: 22,
              fontWeight: 700,
              color: "white",
            }}
          >
            Learn More →
          </div>
        </div>
      </div>
    </div>
  );
};

// Journey step
const JourneyStep: React.FC<{
  icon: React.ReactNode;
  label: string;
  status: "active" | "bounce";
  delay: number;
  frame: number;
  fps: number;
}> = ({ icon, label, status, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  if (entrySpring <= 0) return null;

  const color = status === "bounce" ? "#EF4444" : "#22C55E";

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(entrySpring, [0, 1], [30, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        width: "100%",
        backgroundColor: "#1E293B",
        borderRadius: 20,
        padding: "24px 28px",
        border: `2px solid ${color}40`,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          backgroundColor: `${color}20`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </div>
      <span style={{ fontFamily: "system-ui", fontSize: 24, fontWeight: 600, color: "#F8FAFC", flex: 1 }}>
        {label}
      </span>
      <div
        style={{
          backgroundColor: `${color}20`,
          padding: "10px 18px",
          borderRadius: 10,
          border: `2px solid ${color}`,
        }}
      >
        <span style={{ fontFamily: "system-ui", fontSize: 16, fontWeight: 700, color }}>
          {status === "bounce" ? "BOUNCE" : "OK"}
        </span>
      </div>
    </div>
  );
};

// Big bounce rate display
const BounceRateDisplay: React.FC<{
  delay: number;
  frame: number;
  fps: number;
}> = ({ delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const localFrame = frame - delay;
  const rate = interpolate(localFrame, [0, 60], [0, 87], { extrapolateRight: "clamp" });
  const pulse = Math.sin(localFrame * 0.15) * 0.02 + 1;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring * pulse})`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 28,
          padding: "40px 32px",
          border: "3px solid #EF4444",
          boxShadow: "0 10px 50px rgba(239, 68, 68, 0.3)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 24,
            color: "#94A3B8",
            marginBottom: 12,
          }}
        >
          Website Bounce Rate
        </div>
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 100,
            fontWeight: 900,
            color: "#EF4444",
            lineHeight: 1,
          }}
        >
          {Math.floor(rate)}%
        </div>
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 20,
            color: "#EF4444",
            marginTop: 16,
          }}
        >
          Users leave without engaging
        </div>
      </div>
    </div>
  );
};

export const Scene3DigitalNotTalking: React.FC = () => {
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
            radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 70%, rgba(239, 68, 68, 0.1) 0%, transparent 40%)
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
          padding: "60px 50px",
          gap: 24,
        }}
      >
        {/* Ad Preview */}
        <AdPreview delay={10} frame={frame} fps={fps} />

        {/* Journey steps */}
        <JourneyStep
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#22C55E">
              <path d="M15 3h6v6M14 10l6.1-6.1M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5" />
            </svg>
          }
          label="Click Ad"
          status="active"
          delay={50}
          frame={frame}
          fps={fps}
        />
        <JourneyStep
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          }
          label="Read Forms... Leave"
          status="bounce"
          delay={90}
          frame={frame}
          fps={fps}
        />

        {/* Bounce rate */}
        <BounceRateDisplay delay={130} frame={frame} fps={fps} />

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
              fontSize: 52,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Ads talk.{" "}
            <span style={{ color: "#EF4444" }}>
              Websites
              <br />
              don't.
            </span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
