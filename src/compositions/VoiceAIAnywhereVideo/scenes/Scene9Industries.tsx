import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Industry card component
const IndustryCard: React.FC<{
  icon: React.ReactNode;
  name: string;
  color: string;
  delay: number;
  frame: number;
  fps: number;
  gridIndex: number;
}> = ({ icon, name, color, delay, frame, fps, gridIndex }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  // Staggered highlight effect
  const highlightCycle = ((frame - 60) / 15) % 8;
  const isHighlighted = Math.floor(highlightCycle) === gridIndex && frame > 60;

  const pulse = isHighlighted ? Math.sin(frame * 0.2) * 0.1 + 1.1 : 1;
  const glow = isHighlighted ? 0.8 : 0;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${interpolate(entrySpring, [0, 1], [0.5, 1]) * pulse})`,
      }}
    >
      <div
        style={{
          width: 280,
          height: 160,
          backgroundColor: isHighlighted ? `${color}20` : "#1E293B",
          borderRadius: 20,
          border: `3px solid ${isHighlighted ? color : "#334155"}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          boxShadow: isHighlighted
            ? `0 0 ${50 * glow}px ${color}60, 0 15px 40px rgba(0,0,0,0.3)`
            : "0 15px 40px rgba(0,0,0,0.3)",
          transition: "all 0.2s ease",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            backgroundColor: isHighlighted ? color : `${color}40`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.2s ease",
          }}
        >
          {icon}
        </div>
        {/* Name */}
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 28,
            fontWeight: 600,
            color: isHighlighted ? "#F8FAFC" : "#94A3B8",
            transition: "all 0.2s ease",
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

// Industry icons
const RealEstateIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InsuranceIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EdTechIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HealthcareIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8v4M10 10h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const SaaSIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BankingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TravelIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <path d="M22 16.92v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 8l4-4M17 8V3M17 8h5M7 8L3 4M7 8V3M7 8H2M12 22V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
  </svg>
);

const EcommerceIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="21" r="1" fill="white"/>
    <circle cx="20" cy="21" r="1" fill="white"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Link icon that appears
const LinkIcon: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 200,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const pulse = Math.sin(frame * 0.1) * 0.1 + 1;
  const glow = Math.sin(frame * 0.08) * 0.3 + 0.7;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${entrySpring * pulse})`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: 180,
          height: 180,
          background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 0 ${80 * glow}px rgba(139, 92, 246, 0.6), 0 20px 60px rgba(0,0,0,0.4)`,
        }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const Scene9Industries: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Industries data
  const industries = [
    { icon: <RealEstateIcon />, name: "Real Estate", color: "#F59E0B", delay: 5 },
    { icon: <InsuranceIcon />, name: "Insurance", color: "#3B82F6", delay: 10 },
    { icon: <EdTechIcon />, name: "EdTech", color: "#8B5CF6", delay: 15 },
    { icon: <HealthcareIcon />, name: "Healthcare", color: "#EF4444", delay: 20 },
    { icon: <SaaSIcon />, name: "SaaS", color: "#06B6D4", delay: 25 },
    { icon: <BankingIcon />, name: "Banking", color: "#22C55E", delay: 30 },
    { icon: <TravelIcon />, name: "Travel", color: "#EC4899", delay: 35 },
    { icon: <EcommerceIcon />, name: "E-commerce", color: "#F97316", delay: 40 },
  ];

  // Text animation
  const textSpring = spring({
    frame: frame - 250,
    fps,
    config: { damping: 14 },
  });

  // Grid fade when link appears
  const gridFade = interpolate(frame, [200, 230], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Animated background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)
          `,
        }}
      />

      {/* Industry grid */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 30,
          opacity: gridFade,
        }}
      >
        {industries.map((industry, i) => (
          <IndustryCard
            key={i}
            icon={industry.icon}
            name={industry.name}
            color={industry.color}
            delay={industry.delay}
            frame={frame}
            fps={fps}
            gridIndex={i}
          />
        ))}
      </div>

      {/* Center link icon */}
      <LinkIcon frame={frame} fps={fps} />

      {/* Main text */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textSpring, [0, 1], [50, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 110,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
          }}
        >
          One link.{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #6366F1, #3B82F6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Every industry.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
