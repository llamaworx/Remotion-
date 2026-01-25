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

  // Text animations with slides
  const textSpring = spring({ frame: frame - 40, fps, config: { damping: 15, stiffness: 80 } });
  const taglineSpring = spring({ frame: frame - 70, fps, config: { damping: 15, stiffness: 80 } });
  const subtitleSpring = spring({ frame: frame - 100, fps, config: { damping: 15, stiffness: 80 } });

  // Floating circles animation
  const float1 = Math.sin(frame * 0.04) * 15;
  const float2 = Math.cos(frame * 0.05) * 12;
  const float3 = Math.sin(frame * 0.03) * 18;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Decorative floating circles */}
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 100,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.12) 0%, rgba(255, 140, 66, 0.06) 100%)",
          transform: `translateY(${float1}px)`,
          opacity: interpolate(frame, [0, 30], [0, 1]),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 350,
          left: 80,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)",
          transform: `translateY(${float2}px)`,
          opacity: interpolate(frame, [10, 40], [0, 1]),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 600,
          right: 60,
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)",
          transform: `translateY(${float3}px)`,
          opacity: interpolate(frame, [20, 50], [0, 1]),
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Introducing text - sliding from left */}
        <div
          style={{
            opacity: interpolate(frame, [0, 30], [0, 1]),
            transform: `translateX(${interpolate(frame, [0, 30], [-100, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 36,
              fontWeight: 500,
              color: "#666",
              textTransform: "uppercase",
              letterSpacing: 12,
            }}
          >
            Introducing
          </span>
        </div>

        {/* Bolka Logo */}
        <div
          style={{
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
            filter: "drop-shadow(0 30px 60px rgba(255, 107, 53, 0.4))",
          }}
        >
          <BolkaLogo size={220} />
        </div>

        {/* Brand name - sliding from right */}
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 120,
            fontWeight: 800,
            margin: 0,
            opacity: textSpring,
            transform: `translateX(${interpolate(textSpring, [0, 1], [100, 0])}px)`,
            letterSpacing: 8,
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BOLKA
        </h1>

        {/* Voice Links badge - scaling up */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: taglineSpring,
            transform: `scale(${taglineSpring})`,
          }}
        >
          <div
            style={{
              padding: "24px 60px",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              borderRadius: 60,
              boxShadow: "0 20px 60px rgba(255, 107, 53, 0.35)",
            }}
          >
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 48,
                fontWeight: 700,
                color: "white",
              }}
            >
              Voice Links
            </span>
          </div>
        </div>

        {/* Tagline - sliding from bottom */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 38,
            color: "#555",
            margin: 0,
            marginTop: 30,
            opacity: subtitleSpring,
            transform: `translateY(${interpolate(subtitleSpring, [0, 1], [50, 0])}px)`,
          }}
        >
          Voice AI Anywhere
        </p>
      </div>
    </AbsoluteFill>
  );
};
