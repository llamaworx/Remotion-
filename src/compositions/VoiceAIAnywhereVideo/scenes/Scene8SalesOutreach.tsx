import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Funnel step component
const FunnelStep: React.FC<{
  icon: React.ReactNode;
  label: string;
  x: number;
  delay: number;
  frame: number;
  fps: number;
  isActive: boolean;
  color: string;
}> = ({ icon, label, x, delay, frame, fps, isActive, color }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const pulse = isActive ? Math.sin(frame * 0.12) * 0.08 + 1 : 1;
  const glow = isActive ? Math.sin(frame * 0.1) * 0.4 + 0.6 : 0;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: "50%",
        transform: `translate(-50%, -50%) scale(${entrySpring * pulse})`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: isActive
              ? `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`
              : "#1E293B",
            border: `3px solid ${isActive ? color : "#334155"}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: isActive
              ? `0 0 ${40 * glow}px ${color}80, 0 10px 40px rgba(0,0,0,0.3)`
              : "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          {icon}
        </div>
        {/* Label */}
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 32,
            fontWeight: 600,
            color: isActive ? "#F8FAFC" : "#94A3B8",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

// Arrow between steps
const FunnelArrow: React.FC<{
  x: number;
  delay: number;
  frame: number;
  isActive: boolean;
}> = ({ x, delay, frame, isActive }) => {
  const progress = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (progress <= 0) return null;

  const flowAnimation = (frame * 0.1) % 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: 100,
        height: 40,
        opacity: progress,
      }}
    >
      <svg width="100" height="40" viewBox="0 0 100 40">
        <defs>
          <linearGradient id={`arrowGrad-${x}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isActive ? "#8B5CF6" : "#475569"} stopOpacity="0.3" />
            <stop offset={`${flowAnimation * 100}%`} stopColor={isActive ? "#8B5CF6" : "#475569"} stopOpacity="1" />
            <stop offset="100%" stopColor={isActive ? "#8B5CF6" : "#475569"} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M 10 20 L 70 20"
          stroke={`url(#arrowGrad-${x})`}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 65 10 L 85 20 L 65 30"
          stroke={isActive ? "#8B5CF6" : "#475569"}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// Lead particle flowing through funnel
const LeadParticle: React.FC<{
  delay: number;
  frame: number;
  startX: number;
  endX: number;
}> = ({ delay, frame, startX, endX }) => {
  const localFrame = frame - delay;
  if (localFrame < 0 || localFrame > 120) return null;

  const progress = interpolate(localFrame, [0, 120], [0, 1], {
    extrapolateRight: "clamp",
  });

  const x = interpolate(progress, [0, 1], [startX, endX]);
  const y = 540 + Math.sin(progress * Math.PI * 4) * 15;
  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = interpolate(progress, [0, 0.5, 1], [0.5, 1.2, 0.8]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          backgroundColor: "#8B5CF6",
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
        }}
      />
    </div>
  );
};

// Stats counter
const StatsCounter: React.FC<{
  value: number;
  label: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ value, label, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const countProgress = interpolate(frame - delay, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const displayValue = Math.floor(value * countProgress);

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        textAlign: "center",
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(entrySpring, [0, 1], [30, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: "system-ui",
          fontSize: 72,
          fontWeight: 800,
          background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {displayValue.toLocaleString()}+
      </div>
      <div
        style={{
          fontFamily: "system-ui",
          fontSize: 24,
          color: "#94A3B8",
          marginTop: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Icons
const AdIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="17" cy="7" r="2" fill="#22C55E" />
  </svg>
);

const TalkIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
    <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
    <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LeadIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 11l2 2 4-4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="4" fill="white" />
    <path d="M10 12l1.5 1.5 3-3" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Scene8SalesOutreach: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine active step based on frame
  const activeStep = Math.floor(frame / 80) % 5;

  // Funnel steps
  const steps = [
    { icon: <AdIcon />, label: "Ad", x: 250, delay: 10, color: "#F59E0B" },
    { icon: <TalkIcon />, label: "Talk", x: 560, delay: 30, color: "#8B5CF6" },
    { icon: <LeadIcon />, label: "Lead", x: 870, delay: 50, color: "#22C55E" },
    { icon: <CloseIcon />, label: "Close", x: 1180, delay: 70, color: "#3B82F6" },
  ];

  // Generate flowing particles
  const particles = Array.from({ length: 8 }).map((_, i) => ({
    delay: 100 + i * 40,
    startX: 250,
    endX: 1180,
  }));

  // Text animation
  const textSpring = spring({
    frame: frame - 150,
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
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)`,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 64,
            fontWeight: 700,
            color: "#F8FAFC",
          }}
        >
          Sales Outreach{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Reimagined
          </span>
        </span>
      </div>

      {/* Funnel visualization */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* Arrows */}
        <FunnelArrow x={405} delay={20} frame={frame} isActive={activeStep >= 1} />
        <FunnelArrow x={715} delay={40} frame={frame} isActive={activeStep >= 2} />
        <FunnelArrow x={1025} delay={60} frame={frame} isActive={activeStep >= 3} />

        {/* Steps */}
        {steps.map((step, i) => (
          <FunnelStep
            key={i}
            icon={step.icon}
            label={step.label}
            x={step.x}
            delay={step.delay}
            frame={frame}
            fps={fps}
            isActive={i <= activeStep}
            color={step.color}
          />
        ))}

        {/* Flowing particles */}
        {particles.map((particle, i) => (
          <LeadParticle
            key={i}
            delay={particle.delay}
            frame={frame}
            startX={particle.startX}
            endX={particle.endX}
          />
        ))}
      </div>

      {/* Stats row */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 150,
        }}
      >
        <StatsCounter value={10000} label="Conversations/day" delay={200} frame={frame} fps={fps} />
        <StatsCounter value={85} label="% Qualified" delay={220} frame={frame} fps={fps} />
        <StatsCounter value={24} label="Hours/day" delay={240} frame={frame} fps={fps} />
      </div>

      {/* Main text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textSpring, [0, 1], [40, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 96,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#F59E0B" }}>Ad</span>
          {" → "}
          <span style={{ color: "#8B5CF6" }}>Talk</span>
          {" → "}
          <span style={{ color: "#22C55E" }}>Lead</span>
          {" → "}
          <span style={{ color: "#3B82F6" }}>Close</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
