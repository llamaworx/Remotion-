import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Animated counter component
const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  delay: number;
  frame: number;
  fps: number;
  color?: string;
}> = ({ value, suffix = "", prefix = "", delay, frame, fps, color = "#F8FAFC" }) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const displayValue = Math.round(value * Math.max(0, progress));

  return (
    <span style={{ color, fontVariantNumeric: "tabular-nums" }}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

// Dashboard metric card
const MetricCard: React.FC<{
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
  delay: number;
  frame: number;
  fps: number;
  accentColor: string;
}> = ({ title, value, suffix, prefix, icon, delay, frame, fps, accentColor }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(entrySpring, [0, 1], [30, 0])}px) scale(${interpolate(entrySpring, [0, 1], [0.9, 1])})`,
        backgroundColor: "#0F172A",
        borderRadius: 20,
        padding: 28,
        border: `2px solid ${accentColor}30`,
        boxShadow: `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${accentColor}15`,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minWidth: 280,
      }}
    >
      {/* Icon and title */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            backgroundColor: `${accentColor}20`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 22,
            fontWeight: 500,
            color: "#94A3B8",
          }}
        >
          {title}
        </span>
      </div>

      {/* Value */}
      <div
        style={{
          fontFamily: "system-ui",
          fontSize: 52,
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        <AnimatedCounter
          value={value}
          suffix={suffix}
          prefix={prefix}
          delay={delay + 10}
          frame={frame}
          fps={fps}
          color={accentColor}
        />
      </div>
    </div>
  );
};

// Lead quality bar
const QualityBar: React.FC<{
  label: string;
  percentage: number;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ label, percentage, color, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const barProgress = spring({
    frame: frame - delay - 15,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "system-ui", fontSize: 20, fontWeight: 500, color: "#F8FAFC" }}>
          {label}
        </span>
        <span style={{ fontFamily: "system-ui", fontSize: 20, fontWeight: 700, color }}>
          {Math.round(percentage * Math.max(0, barProgress))}%
        </span>
      </div>
      <div
        style={{
          height: 14,
          backgroundColor: "#1E293B",
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentage * Math.max(0, barProgress)}%`,
            backgroundColor: color,
            borderRadius: 7,
            boxShadow: `0 0 15px ${color}50`,
          }}
        />
      </div>
    </div>
  );
};

// Callback request item
const CallbackItem: React.FC<{
  name: string;
  time: string;
  priority: "high" | "medium" | "low";
  delay: number;
  frame: number;
  fps: number;
}> = ({ name, time, priority, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (entrySpring <= 0) return null;

  const priorityColors = {
    high: "#EF4444",
    medium: "#F59E0B",
    low: "#22C55E",
  };

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(entrySpring, [0, 1], [20, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        backgroundColor: "#1E293B",
        borderRadius: 12,
        borderLeft: `4px solid ${priorityColors[priority]}`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          backgroundColor: "#334155",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#F8FAFC">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 600, color: "#F8FAFC" }}>
          {name}
        </div>
        <div style={{ fontFamily: "system-ui", fontSize: 14, color: "#94A3B8" }}>
          {time}
        </div>
      </div>
      <div
        style={{
          padding: "6px 12px",
          backgroundColor: `${priorityColors[priority]}20`,
          borderRadius: 8,
          fontFamily: "system-ui",
          fontSize: 14,
          fontWeight: 600,
          color: priorityColors[priority],
          textTransform: "uppercase",
        }}
      >
        {priority}
      </div>
    </div>
  );
};

export const Scene8SalesDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dashboard entry animation
  const dashboardEntry = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Text animation at end
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
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 40%)
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

      {/* Dashboard header */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 80,
          opacity: interpolate(dashboardEntry, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(dashboardEntry, [0, 1], [-20, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "system-ui", fontSize: 32, fontWeight: 700, color: "#F8FAFC" }}>
            Bolka Sales Dashboard
          </div>
          <div style={{ fontFamily: "system-ui", fontSize: 18, color: "#94A3B8" }}>
            Real-time conversation analytics
          </div>
        </div>
      </div>

      {/* Main dashboard grid */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 80,
          right: 80,
          display: "flex",
          gap: 30,
        }}
      >
        {/* Left column - Metric cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Top row - 2 cards */}
          <div style={{ display: "flex", gap: 24 }}>
            <MetricCard
              title="Total Conversations"
              value={1247}
              icon={
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#8B5CF6">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              }
              delay={20}
              frame={frame}
              fps={fps}
              accentColor="#8B5CF6"
            />
            <MetricCard
              title="Callback Requests"
              value={342}
              icon={
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#06B6D4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
              delay={40}
              frame={frame}
              fps={fps}
              accentColor="#06B6D4"
            />
          </div>

          {/* Lead Quality Section */}
          <div
            style={{
              backgroundColor: "#0F172A",
              borderRadius: 20,
              padding: 28,
              border: "2px solid #22C55E30",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              opacity: interpolate(
                spring({ frame: frame - 60, fps, config: { damping: 12 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  backgroundColor: "#22C55E20",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#22C55E">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span style={{ fontFamily: "system-ui", fontSize: 24, fontWeight: 600, color: "#F8FAFC" }}>
                Lead Quality
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <QualityBar label="Hot Leads" percentage={78} color="#EF4444" delay={80} frame={frame} fps={fps} />
              <QualityBar label="Warm Leads" percentage={62} color="#F59E0B" delay={100} frame={frame} fps={fps} />
              <QualityBar label="Cold Leads" percentage={24} color="#3B82F6" delay={120} frame={frame} fps={fps} />
            </div>
          </div>
        </div>

        {/* Right column - Interest & Callbacks */}
        <div style={{ width: 500, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Interest Level */}
          <div
            style={{
              backgroundColor: "#0F172A",
              borderRadius: 20,
              padding: 28,
              border: "2px solid #F59E0B30",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              opacity: interpolate(
                spring({ frame: frame - 50, fps, config: { damping: 12 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  backgroundColor: "#F59E0B20",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#F59E0B">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span style={{ fontFamily: "system-ui", fontSize: 24, fontWeight: 600, color: "#F8FAFC" }}>
                Interest Level
              </span>
            </div>
            {/* Interest gauge */}
            <div style={{ position: "relative", height: 100, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div
                style={{
                  width: 180,
                  height: 90,
                  borderRadius: "90px 90px 0 0",
                  border: "12px solid #1E293B",
                  borderBottom: "none",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    width: 8,
                    height: 70,
                    backgroundColor: "#F59E0B",
                    transformOrigin: "bottom center",
                    transform: `translateX(-50%) rotate(${interpolate(
                      spring({ frame: frame - 70, fps, config: { damping: 15 } }),
                      [0, 1],
                      [-90, 35]
                    )}deg)`,
                    borderRadius: 4,
                    boxShadow: "0 0 15px #F59E0B80",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  fontFamily: "system-ui",
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#F59E0B",
                }}
              >
                <AnimatedCounter value={87} suffix="%" delay={80} frame={frame} fps={fps} color="#F59E0B" />
              </div>
            </div>
          </div>

          {/* Callback Requests List */}
          <div
            style={{
              backgroundColor: "#0F172A",
              borderRadius: 20,
              padding: 24,
              border: "2px solid #06B6D430",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              flex: 1,
              opacity: interpolate(
                spring({ frame: frame - 90, fps, config: { damping: 12 } }),
                [0, 1],
                [0, 1]
              ),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ fontFamily: "system-ui", fontSize: 22, fontWeight: 600, color: "#F8FAFC" }}>
                Recent Callback Requests
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <CallbackItem name="James Wilson" time="New York, USA • 2 min ago" priority="high" delay={110} frame={frame} fps={fps} />
              <CallbackItem name="Emma Schmidt" time="Berlin, Germany • 5 min ago" priority="high" delay={130} frame={frame} fps={fps} />
              <CallbackItem name="Sophie Martin" time="Paris, France • 12 min ago" priority="medium" delay={150} frame={frame} fps={fps} />
            </div>
          </div>
        </div>
      </div>

      {/* Main text - Every conversation tracked */}
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
            Every conversation
          </span>{" "}
          <span style={{ color: "#F8FAFC" }}>tracked.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
