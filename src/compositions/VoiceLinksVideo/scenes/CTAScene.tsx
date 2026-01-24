import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

// Professional SVG Icons
const MicIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const ArrowRightIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Content animation
  const contentSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  // Button pulse
  const pulse = Math.sin(frame * 0.12) * 0.03 + 1;

  // Glow animation
  const glowIntensity = Math.sin(frame * 0.1) * 0.3 + 0.7;

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
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.2) 0%, transparent 60%)",
          filter: "blur(100px)",
          opacity: glowIntensity,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 45,
          transform: `scale(${interpolate(contentSpring, [0, 1], [0.9, 1])})`,
          opacity: contentSpring,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 0 80px rgba(255, 107, 53, ${glowIntensity})`,
          }}
        >
          <MicIcon size={70} color="white" />
        </div>

        {/* Main CTA text */}
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 80,
            fontWeight: 800,
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          Start Your{" "}
          <span style={{ color: "#FF6B35" }}>Voice Link</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 34,
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
            marginTop: 30,
          }}
        >
          <div
            style={{
              padding: "28px 70px",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              borderRadius: 60,
              display: "flex",
              alignItems: "center",
              gap: 20,
              boxShadow: "0 0 60px rgba(255, 107, 53, 0.5)",
            }}
          >
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 36,
                fontWeight: 700,
                color: "white",
              }}
            >
              bolka.ai/share
            </span>
            <ArrowRightIcon size={32} color="white" />
          </div>
        </div>

        {/* Social handles */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 40,
            opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 24,
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
