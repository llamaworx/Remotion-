import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Animated voice wave behind logo
const VoiceWave: React.FC<{ frame: number; opacity: number }> = ({ frame, opacity }) => {
  const waves = 5;
  const baseRadius = 180;

  return (
    <div
      style={{
        position: "absolute",
        width: 600,
        height: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Array.from({ length: waves }).map((_, i) => {
        const delay = i * 8;
        const animatedRadius = baseRadius + i * 60 + Math.sin((frame - delay) * 0.08) * 20;
        const waveOpacity = interpolate(
          i,
          [0, waves - 1],
          [0.4, 0.08]
        ) * opacity;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: animatedRadius * 2,
              height: animatedRadius * 2,
              borderRadius: "50%",
              border: `3px solid rgba(139, 92, 246, ${waveOpacity})`,
              boxShadow: `0 0 ${30 + i * 10}px rgba(139, 92, 246, ${waveOpacity * 0.5})`,
              transform: `scale(${1 + Math.sin((frame - delay) * 0.06) * 0.05})`,
            }}
          />
        );
      })}
    </div>
  );
};

// Bolka Logo
const BolkaLogo: React.FC<{ size: number; glow: number }> = ({ size, glow }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="logoGradScene2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
      <filter id="logoGlow">
        <feGaussianBlur stdDeviation={glow * 8} result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#logoGradScene2)" filter="url(#logoGlow)" />
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

// Animated waveform bars
const WaveformBars: React.FC<{ frame: number; opacity: number }> = ({ frame, opacity }) => {
  const barCount = 40;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 6,
        height: 80,
        opacity,
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const centerDistance = Math.abs(i - barCount / 2) / (barCount / 2);
        const baseHeight = interpolate(centerDistance, [0, 1], [60, 15]);
        const animatedHeight = baseHeight + Math.sin(frame * 0.15 + i * 0.3) * 20;

        return (
          <div
            key={i}
            style={{
              width: 6,
              height: Math.max(8, animatedHeight),
              background: `linear-gradient(180deg, #8B5CF6 0%, #6366F1 100%)`,
              borderRadius: 3,
              opacity: interpolate(centerDistance, [0, 1], [1, 0.4]),
            }}
          />
        );
      })}
    </div>
  );
};

export const Scene2EnterBolka: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance animation
  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.3, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Voice wave entrance (slightly delayed)
  const waveOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Text entrance
  const textSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 14 },
  });

  // Waveform bars entrance
  const barsOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Logo glow pulse
  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  // Background particle effect
  const bgPulse = Math.sin(frame * 0.04) * 0.15 + 0.2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, rgba(139, 92, 246, ${bgPulse}) 0%, transparent 50%)`,
        }}
      />

      {/* Voice wave rings behind logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
        }}
      >
        <VoiceWave frame={frame} opacity={waveOpacity} />
      </div>

      {/* Bolka Logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -60%) scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <BolkaLogo size={200} glow={glowPulse} />
      </div>

      {/* Main text: "Bolka Voice AI Anywhere" */}
      <div
        style={{
          position: "absolute",
          top: "62%",
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
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #A78BFA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bolka
          </span>{" "}
          <span style={{ color: "#F8FAFC" }}>Voice AI</span>{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Anywhere
          </span>
        </span>
      </div>

      {/* Animated waveform at bottom */}
      <WaveformBars frame={frame} opacity={barsOpacity} />
    </AbsoluteFill>
  );
};
