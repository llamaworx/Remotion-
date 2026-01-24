import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

interface CTASceneProps {
  brandName: string;
}

export const CTAScene: React.FC<CTASceneProps> = ({ brandName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main content animation
  const contentSpring = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 100,
    },
  });

  const scale = interpolate(contentSpring, [0, 1], [0.9, 1]);
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Button pulse animation
  const pulse = Math.sin(frame * 0.15) * 0.03 + 1;

  // Glow animation
  const glowIntensity = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.3, 0.6]
  );

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
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
          opacity: glowIntensity,
          filter: "blur(60px)",
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        {/* Headline */}
        <h2
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            margin: 0,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          Ready to Transform Your
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Voice Experience
          </span>
          ?
        </h2>

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
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: 60,
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 0 40px rgba(99, 102, 241, 0.5)",
            }}
          >
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 28,
                fontWeight: 600,
                color: "white",
              }}
            >
              Get Started with {brandName}
            </span>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        {/* Website */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.6)",
            margin: 0,
            marginTop: 20,
          }}
        >
          bolka.ai
        </p>
      </div>
    </AbsoluteFill>
  );
};
