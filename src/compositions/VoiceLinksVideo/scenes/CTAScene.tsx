import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Content animation
  const contentSpring = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Button pulse
  const pulse = Math.sin(frame * 0.2) * 0.05 + 1;

  // Glow animation
  const glowIntensity = Math.sin(frame * 0.15) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.25) 0%, transparent 60%)",
          filter: "blur(80px)",
          opacity: glowIntensity,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          transform: `scale(${interpolate(contentSpring, [0, 1], [0.9, 1])})`,
          opacity: contentSpring,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 0 60px rgba(255, 107, 53, ${glowIntensity})`,
          }}
        >
          <svg width="70" height="70" viewBox="0 0 100 100">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <path
                key={i}
                d={`M50,50 Q${50 + Math.cos((i * Math.PI) / 4) * 25},${50 + Math.sin((i * Math.PI) / 4) * 25} ${50 + Math.cos((i * Math.PI) / 4 + 0.5) * 40},${50 + Math.sin((i * Math.PI) / 4 + 0.5) * 40}`}
                stroke="white"
                strokeWidth="4"
                fill="none"
                opacity={0.9}
              />
            ))}
          </svg>
        </div>

        {/* Main CTA text */}
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          Start Your <span style={{ color: "#FF6B35" }}>Voice Link</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
          }}
        >
          Free to try. No credit card required.
        </p>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${pulse})`,
            marginTop: 20,
          }}
        >
          <div
            style={{
              padding: "24px 64px",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              borderRadius: 60,
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 0 50px rgba(255, 107, 53, 0.5)",
            }}
          >
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 32,
                fontWeight: 700,
                color: "white",
              }}
            >
              bolka.ai/share
            </span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        {/* Social handles */}
        <div
          style={{
            display: "flex",
            gap: 30,
            marginTop: 30,
            opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 22,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            @bolka.ai
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
