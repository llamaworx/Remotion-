import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { BolkaLogo } from "../../../components/Icons";

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoRotate = interpolate(logoSpring, [0, 1], [-180, 0]);

  // Text animations
  const textSpring = spring({ frame: frame - 45, fps, config: { damping: 15, stiffness: 80 } });
  const taglineSpring = spring({ frame: frame - 75, fps, config: { damping: 15, stiffness: 80 } });
  const subtitleSpring = spring({ frame: frame - 110, fps, config: { damping: 15, stiffness: 80 } });

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.08) 0%, transparent 50%)",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: glowPulse,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
        }}
      >
        {/* Introducing text */}
        <div
          style={{
            opacity: interpolate(frame, [0, 30], [0, 1]),
            transform: `translateY(${interpolate(frame, [0, 30], [-30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 34,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.6)",
              textTransform: "uppercase",
              letterSpacing: 10,
            }}
          >
            Introducing
          </span>
        </div>

        {/* Bolka Original Logo - Swirl */}
        <div
          style={{
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
            filter: `drop-shadow(0 0 60px rgba(255, 107, 53, ${glowPulse}))`,
          }}
        >
          <BolkaLogo size={200} />
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 110,
            fontWeight: 800,
            margin: 0,
            opacity: textSpring,
            transform: `translateY(${interpolate(textSpring, [0, 1], [40, 0])}px)`,
            letterSpacing: 6,
            background: "linear-gradient(90deg, #FFFFFF 0%, #E0E0E0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BOLKA
        </h1>

        {/* Voice Links badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: taglineSpring,
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              padding: "20px 50px",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              borderRadius: 50,
              boxShadow: "0 15px 50px rgba(255, 107, 53, 0.4)",
            }}
          >
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 42,
                fontWeight: 700,
                color: "white",
              }}
            >
              Voice Links
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
            marginTop: 25,
            opacity: subtitleSpring,
            transform: `translateY(${interpolate(subtitleSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          Voice AI Anywhere
        </p>
      </div>
    </AbsoluteFill>
  );
};
