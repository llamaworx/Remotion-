import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { BolkaLogo, ArrowRightIcon } from "../../../components/Icons";

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
        background: "radial-gradient(ellipse at center, rgba(255, 107, 53, 0.1) 0%, transparent 60%)",
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
        {/* Bolka Logo */}
        <div
          style={{
            filter: `drop-shadow(0 0 60px rgba(255, 107, 53, ${glowIntensity}))`,
          }}
        >
          <BolkaLogo size={160} />
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
          <span
            style={{
              background: "linear-gradient(90deg, #FF6B35 0%, #FF8C42 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Voice Link
          </span>
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
