import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Bolka Logo - larger for mobile
const BolkaLogo: React.FC<{ size: number; glow: number }> = ({ size, glow }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="bolkaGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <filter id="bolkaGlowHero">
        <feGaussianBlur stdDeviation={glow * 10} result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#bolkaGradHero)" filter="url(#bolkaGlowHero)" />
    <rect x="42" y="25" width="16" height="28" rx="8" fill="white" />
    <path
      d="M30 45V50C30 61.046 38.954 70 50 70C61.046 70 70 61.046 70 50V45"
      stroke="white"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M50 70V80M40 80H60" stroke="white" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// Product feature card
const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ title, description, icon, color, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const pulse = Math.sin((frame - delay) * 0.08) * 0.02 + 1;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(entrySpring, [0, 1], [30, 0])}px) scale(${pulse})`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 24,
          padding: 32,
          border: `3px solid ${color}`,
          boxShadow: `0 15px 50px rgba(0,0,0,0.4), 0 0 40px ${color}30`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: `0 0 30px ${color}50`,
            }}
          >
            {icon}
          </div>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 32,
              fontWeight: 800,
              color: "#F8FAFC",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 22,
            color: "#94A3B8",
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export const Scene5EnterBolka: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 10, stiffness: 60 },
  });

  const logoGlow = Math.sin(frame * 0.08) * 0.4 + 0.6;
  const logoPulse = Math.sin(frame * 0.05) * 0.03 + 1;

  const textSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 14 },
  });

  const taglineSpring = spring({
    frame: frame - 70,
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
      {/* Animated gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 25%, rgba(139, 92, 246, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 50% 75%, rgba(6, 182, 212, 0.15) 0%, transparent 40%)
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
          padding: "80px 50px",
          gap: 24,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: interpolate(logoSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.5, 1]) * logoPulse})`,
          }}
        >
          <BolkaLogo size={160} glow={logoGlow} />
        </div>

        {/* "Bolka Voice AI" */}
        <div
          style={{
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 56,
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
              Bolka Voice AI
            </span>
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(taglineSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [15, 0])}px)`,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 28,
              fontWeight: 500,
              color: "#94A3B8",
            }}
          >
            Turn clicks into conversations
          </span>
        </div>

        {/* Feature cards */}
        <FeatureCard
          title="Bolka Share"
          description="Send voice links via WhatsApp, Email, SMS, or any channel"
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          }
          color="#8B5CF6"
          delay={100}
          frame={frame}
          fps={fps}
        />

        <FeatureCard
          title="Bolka Embed"
          description="Add AI voice agent to your website with one line of code"
          icon={
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
              <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          }
          color="#06B6D4"
          delay={150}
          frame={frame}
          fps={fps}
        />

        {/* Bottom text */}
        <div
          style={{
            marginTop: "auto",
            textAlign: "center",
            opacity: interpolate(
              spring({ frame: frame - 200, fps, config: { damping: 14 } }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 44,
              fontWeight: 800,
              color: "#F8FAFC",
              lineHeight: 1.3,
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sales
            </span>{" "}
            that actually talk.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
