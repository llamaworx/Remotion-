import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Big metric card
const MetricCard: React.FC<{
  label: string;
  value: string;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ label, value, color, delay, frame, fps }) => {
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
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 20,
          padding: "28px 20px",
          textAlign: "center",
          border: `2px solid ${color}40`,
          boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 20px ${color}20`,
        }}
      >
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 48,
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
            fontSize: 16,
            color: "#94A3B8",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

// Lead card with quality indicator
const LeadCard: React.FC<{
  name: string;
  location: string;
  quality: number;
  interest: "High" | "Medium" | "Low";
  delay: number;
  frame: number;
  fps: number;
}> = ({ name, location, quality, interest, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  if (entrySpring <= 0) return null;

  const interestColors = {
    High: "#22C55E",
    Medium: "#F59E0B",
    Low: "#EF4444",
  };

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(entrySpring, [0, 1], [-30, 0])}px)`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 20,
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          border: "2px solid #334155",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </div>

        {/* Name and location */}
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "system-ui", fontSize: 22, fontWeight: 700, color: "#F8FAFC", marginBottom: 4 }}>
            {name}
          </div>
          <div style={{ fontFamily: "system-ui", fontSize: 16, color: "#94A3B8" }}>
            {location}
          </div>
        </div>

        {/* Quality + Interest */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 800, color: "#8B5CF6" }}>
            {quality}%
          </div>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 14,
              fontWeight: 600,
              color: interestColors[interest],
            }}
          >
            {interest} Intent
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene8SalesDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14 },
  });

  const textSpring = spring({
    frame: frame - 260,
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
            radial-gradient(circle at 50% 70%, rgba(34, 197, 94, 0.1) 0%, transparent 40%)
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
        {/* Title */}
        <div
          style={{
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 600, color: "#94A3B8" }}>
            Real-Time Lead Intelligence
          </span>
        </div>

        {/* Metric cards row */}
        <div style={{ display: "flex", gap: 16 }}>
          <MetricCard label="Calls Today" value="47" color="#8B5CF6" delay={15} frame={frame} fps={fps} />
          <MetricCard label="Qualified" value="32" color="#22C55E" delay={30} frame={frame} fps={fps} />
        </div>

        {/* Lead cards */}
        <LeadCard
          name="James Wilson"
          location="New York, USA"
          quality={94}
          interest="High"
          delay={50}
          frame={frame}
          fps={fps}
        />
        <LeadCard
          name="Emma Schmidt"
          location="Berlin, Germany"
          quality={87}
          interest="High"
          delay={80}
          frame={frame}
          fps={fps}
        />
        <LeadCard
          name="Sophie Martin"
          location="Paris, France"
          quality={76}
          interest="Medium"
          delay={110}
          frame={frame}
          fps={fps}
        />
        <LeadCard
          name="David Chen"
          location="Singapore"
          quality={91}
          interest="High"
          delay={140}
          frame={frame}
          fps={fps}
        />

        {/* Callback badge */}
        <div
          style={{
            opacity: interpolate(spring({ frame: frame - 180, fps, config: { damping: 12 } }), [0, 1], [0, 1]),
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#22C55E20",
              border: "2px solid #22C55E",
              borderRadius: 16,
              padding: "16px 32px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#22C55E">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span style={{ fontFamily: "system-ui", fontSize: 20, fontWeight: 700, color: "#22C55E" }}>
              12 Callbacks Scheduled
            </span>
          </div>
        </div>

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
              lineHeight: 1.2,
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Pre-qualified.
            </span>{" "}
            <span style={{ color: "#22C55E" }}>Ready to buy.</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
