import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { BolkaLogo } from "../../../components/Icons";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text reveal animation with slide from left
  const line1Spring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const line2Spring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 80 } });
  const line3Spring = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 80 } });

  const line1X = interpolate(line1Spring, [0, 1], [-100, 0]);
  const line2X = interpolate(line2Spring, [0, 1], [100, 0]);
  const line3X = interpolate(line3Spring, [0, 1], [-100, 0]);

  // Logo animation
  const logoSpring = spring({ frame: frame - 70, fps, config: { damping: 14, stiffness: 80 } });
  const logoPulse = Math.sin(frame * 0.08) * 0.05 + 1;

  // Floating icons animation
  const floatOffset1 = Math.sin(frame * 0.05) * 15;
  const floatOffset2 = Math.cos(frame * 0.04) * 20;
  const floatOffset3 = Math.sin(frame * 0.06) * 12;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Decorative floating circles */}
      <div
        style={{
          position: "absolute",
          top: 150,
          right: 80,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 140, 66, 0.08) 100%)",
          transform: `translateY(${floatOffset1}px)`,
          opacity: interpolate(frame, [0, 30], [0, 1]),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 60,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(168, 85, 247, 0.06) 100%)",
          transform: `translateY(${floatOffset2}px)`,
          opacity: interpolate(frame, [10, 40], [0, 1]),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 300,
          right: 100,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(52, 211, 153, 0.06) 100%)",
          transform: `translateY(${floatOffset3}px)`,
          opacity: interpolate(frame, [20, 50], [0, 1]),
        }}
      />

      {/* Gradient accent blob */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
        }}
      >
        {/* Hook question */}
        <div style={{ overflow: "hidden" }}>
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 72,
              fontWeight: 800,
              color: "#1a1a2e",
              margin: 0,
              textAlign: "center",
              transform: `translateX(${line1X}px)`,
              opacity: line1Spring,
            }}
          >
            What if you could
          </h1>
        </div>

        <div style={{ overflow: "hidden" }}>
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 68,
              fontWeight: 800,
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
              textAlign: "center",
              transform: `translateX(${line2X}px)`,
              opacity: line2Spring,
            }}
          >
            share AI conversations
          </h1>
        </div>

        <div style={{ overflow: "hidden" }}>
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 72,
              fontWeight: 800,
              color: "#1a1a2e",
              margin: 0,
              textAlign: "center",
              transform: `translateX(${line3X}px)`,
              opacity: line3Spring,
            }}
          >
            like payment links?
          </h1>
        </div>

        {/* Bolka Logo */}
        <div
          style={{
            marginTop: 80,
            opacity: logoSpring,
            transform: `scale(${logoSpring * logoPulse})`,
            filter: "drop-shadow(0 20px 40px rgba(255, 107, 53, 0.3))",
          }}
        >
          <BolkaLogo size={180} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
