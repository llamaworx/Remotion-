import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Bolka Logo with glow
const BolkaLogo: React.FC<{ size: number; glow: number }> = ({ size, glow }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="logoGradFinal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      <filter id="logoGlowFinal">
        <feGaussianBlur stdDeviation={glow * 10} result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#logoGradFinal)" filter="url(#logoGlowFinal)" />
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

// Voice waveform that pulses
const VoiceWaveform: React.FC<{ frame: number; opacity: number }> = ({ frame, opacity }) => {
  const barCount = 60;

  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        alignItems: "center",
        height: 120,
        opacity,
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const centerDistance = Math.abs(i - barCount / 2) / (barCount / 2);
        const baseHeight = interpolate(centerDistance, [0, 1], [100, 20]);
        const animatedHeight = baseHeight + Math.sin(frame * 0.12 + i * 0.25) * 30;

        return (
          <div
            key={i}
            style={{
              width: 6,
              height: Math.max(10, animatedHeight),
              background: `linear-gradient(180deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%)`,
              borderRadius: 3,
              opacity: interpolate(centerDistance, [0, 1], [1, 0.4]),
              boxShadow: centerDistance < 0.3 ? `0 0 ${10 - centerDistance * 30}px rgba(139, 92, 246, 0.5)` : "none",
            }}
          />
        );
      })}
    </div>
  );
};

// Animated ring pulses
const PulseRing: React.FC<{ delay: number; frame: number; maxSize: number }> = ({ delay, frame, maxSize }) => {
  const localFrame = (frame - delay) % 90;
  if (localFrame < 0) return null;

  const progress = localFrame / 90;
  const size = interpolate(progress, [0, 1], [200, maxSize]);
  const opacity = interpolate(progress, [0, 0.2, 1], [0, 0.6, 0]);

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "3px solid rgba(139, 92, 246, 0.5)",
        opacity,
      }}
    />
  );
};

export const Scene11MicDrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 10, stiffness: 60 },
  });

  // Waveform entrance
  const waveformOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text 1 entrance: "Voice AI Anywhere"
  const text1Spring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 12 },
  });

  // Text 2 entrance: "Bolka.ai"
  const text2Spring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12 },
  });

  // Logo glow pulse
  const logoGlow = Math.sin(frame * 0.08) * 0.4 + 0.6;

  // Logo scale pulse
  const logoPulse = Math.sin(frame * 0.06) * 0.03 + 1;

  // Background energy pulse
  const bgPulse = Math.sin(frame * 0.05) * 0.15 + 0.2;

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
            radial-gradient(circle at 50% 40%, rgba(139, 92, 246, ${bgPulse}) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(99, 102, 241, ${bgPulse * 0.5}) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(59, 130, 246, ${bgPulse * 0.5}) 0%, transparent 40%)
          `,
        }}
      />

      {/* Pulse rings */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PulseRing delay={0} frame={frame} maxSize={600} />
        <PulseRing delay={30} frame={frame} maxSize={600} />
        <PulseRing delay={60} frame={frame} maxSize={600} />
      </div>

      {/* Main content container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* Bolka Logo */}
        <div
          style={{
            opacity: interpolate(logoSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.5, 1]) * logoPulse})`,
          }}
        >
          <BolkaLogo size={200} glow={logoGlow} />
        </div>

        {/* Voice Waveform */}
        <VoiceWaveform frame={frame} opacity={waveformOpacity} />

        {/* "Voice AI Anywhere" */}
        <div
          style={{
            opacity: interpolate(text1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text1Spring, [0, 1], [40, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 130,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Voice AI
            </span>{" "}
            <span style={{ color: "#F8FAFC" }}>Anywhere</span>
          </span>
        </div>

        {/* "Bolka.ai" */}
        <div
          style={{
            opacity: interpolate(text2Spring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(text2Spring, [0, 1], [0.8, 1])})`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
              padding: "24px 80px",
              borderRadius: 60,
              boxShadow: `0 15px 60px rgba(139, 92, 246, 0.5), 0 0 ${50 * logoGlow}px rgba(139, 92, 246, 0.3)`,
            }}
          >
            <span
              style={{
                fontFamily: "system-ui",
                fontSize: 72,
                fontWeight: 700,
                color: "white",
                letterSpacing: "0.02em",
              }}
            >
              Bolka.ai
            </span>
          </div>
        </div>
      </div>

      {/* Subtle tagline at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [180, 210], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 40,
            color: "#64748B",
            letterSpacing: "0.1em",
          }}
        >
          JUST SHARE. JUST TALK.
        </span>
      </div>
    </AbsoluteFill>
  );
};
