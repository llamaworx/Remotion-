import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { BolkaLogo } from "../../../components/Icons";

export const EndCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in animation
  const fadeIn = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Logo pulse
  const logoPulse = Math.sin(frame * 0.06) * 0.03 + 1;

  // Floating animation
  const float = Math.sin(frame * 0.04) * 10;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FC 100%)",
        opacity: fadeIn,
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: 300,
          right: 100,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.12) 0%, rgba(255, 140, 66, 0.06) 100%)",
          transform: `translateY(${float}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 400,
          left: 80,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)",
          transform: `translateY(${-float}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 150,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)",
          transform: `translateY(${float * 0.8}px)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* Bolka Logo */}
        <div
          style={{
            transform: `scale(${logoPulse})`,
            filter: "drop-shadow(0 30px 60px rgba(255, 107, 53, 0.35))",
          }}
        >
          <BolkaLogo size={280} />
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 120,
            fontWeight: 800,
            margin: 0,
            letterSpacing: 8,
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BOLKA
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 48,
            fontWeight: 500,
            color: "#666",
            margin: 0,
          }}
        >
          Voice AI, Deployed Your Way
        </p>

        {/* Website */}
        <div
          style={{
            marginTop: 40,
            padding: "24px 60px",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
            borderRadius: 60,
            boxShadow: "0 20px 60px rgba(255, 107, 53, 0.35)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 44,
              fontWeight: 700,
              color: "white",
            }}
          >
            bolka.ai
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
