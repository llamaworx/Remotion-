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

  // Text reveal animation with slide
  const line1Spring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const line2Spring = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 80 } });
  const line3Spring = spring({ frame: frame - 40, fps, config: { damping: 12, stiffness: 80 } });

  const line1X = interpolate(line1Spring, [0, 1], [-100, 0]);
  const line2X = interpolate(line2Spring, [0, 1], [100, 0]);
  const line3X = interpolate(line3Spring, [0, 1], [-100, 0]);

  // Logo animation
  const logoSpring = spring({ frame: frame - 70, fps, config: { damping: 14, stiffness: 80 } });
  const logoPulse = Math.sin(frame * 0.08) * 0.05 + 1;

  // Floating animations
  const floatOffset1 = Math.sin(frame * 0.05) * 15;
  const floatOffset2 = Math.cos(frame * 0.04) * 20;
  const floatOffset3 = Math.sin(frame * 0.06) * 12;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
      }}
    >
      {/* Decorative floating circles */}
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 60,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.18) 0%, rgba(255, 140, 66, 0.1) 100%)",
          transform: `translateY(${floatOffset1}px)`,
          opacity: interpolate(frame, [0, 30], [0, 1]),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 500,
          left: 40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(168, 85, 247, 0.08) 100%)",
          transform: `translateY(${floatOffset2}px)`,
          opacity: interpolate(frame, [10, 40], [0, 1]),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 250,
          right: 80,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.08) 100%)",
          transform: `translateY(${floatOffset3}px)`,
          opacity: interpolate(frame, [20, 50], [0, 1]),
        }}
      />

      {/* Gradient accent blob */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
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
          gap: 20,
        }}
      >
        {/* Hook question - BIGGER FONTS */}
        <div style={{ overflow: "hidden" }}>
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 92,
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
              fontSize: 86,
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
              fontSize: 92,
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

        {/* Bolka Logo - BIGGER */}
        <div
          style={{
            marginTop: 80,
            opacity: logoSpring,
            transform: `scale(${logoSpring * logoPulse})`,
            filter: "drop-shadow(0 25px 50px rgba(255, 107, 53, 0.4))",
          }}
        >
          <BolkaLogo size={240} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
