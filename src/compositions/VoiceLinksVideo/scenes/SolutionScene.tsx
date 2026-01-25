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
  const textSpring = spring({ frame: frame - 40, fps, config: { damping: 15, stiffness: 80 } });
  const taglineSpring = spring({ frame: frame - 70, fps, config: { damping: 15, stiffness: 80 } });
  const subtitleSpring = spring({ frame: frame - 100, fps, config: { damping: 15, stiffness: 80 } });

  // Floating circles
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
          top: 150,
          right: 80,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 140, 66, 0.08) 100%)",
          transform: `translateY(${float1}px)`,
          opacity: interpolate(frame, [0, 30], [0, 1]),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 300,
          left: 60,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(168, 85, 247, 0.06) 100%)",
          transform: `translateY(${float2}px)`,
          opacity: interpolate(frame, [10, 40], [0, 1]),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 550,
          right: 50,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(52, 211, 153, 0.06) 100%)",
          transform: `translateY(${float3}px)`,
          opacity: interpolate(frame, [20, 50], [0, 1]),
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
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
        {/* Introducing text - BIGGER */}
        <div
          style={{
            opacity: interpolate(frame, [0, 30], [0, 1]),
            transform: `translateX(${interpolate(frame, [0, 30], [-100, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 48,
              fontWeight: 500,
              color: "#666",
              textTransform: "uppercase",
              letterSpacing: 14,
            }}
          >
            Introducing
          </span>
        </div>

        {/* Bolka Logo - BIGGER */}
        <div
          style={{
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
            filter: "drop-shadow(0 35px 70px rgba(255, 107, 53, 0.45))",
          }}
        >
          <BolkaLogo size={280} />
        </div>

        {/* Brand name - BIGGER */}
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 140,
            fontWeight: 800,
            margin: 0,
            opacity: textSpring,
            transform: `translateX(${interpolate(textSpring, [0, 1], [100, 0])}px)`,
            letterSpacing: 10,
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BOLKA
        </h1>

        {/* Voice Links badge - BIGGER */}
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
              padding: "28px 70px",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              borderRadius: 70,
              boxShadow: "0 25px 70px rgba(255, 107, 53, 0.4)",
            }}
          >
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 60,
                fontWeight: 700,
                color: "white",
              }}
            >
              Voice Links
            </span>
          </div>
        </div>

        {/* Tagline - BIGGER */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 48,
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
