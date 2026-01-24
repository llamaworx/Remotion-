import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoSpring = spring({ frame, fps, config: { damping: 12 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoRotate = interpolate(logoSpring, [0, 1], [-180, 0]);

  // Text animations
  const textSpring = spring({ frame: frame - 30, fps, config: { damping: 15 } });
  const taglineSpring = spring({ frame: frame - 50, fps, config: { damping: 15 } });

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

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
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: glowPulse,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Introducing text */}
        <div
          style={{
            opacity: interpolate(frame, [0, 20], [0, 1]),
            transform: `translateY(${interpolate(frame, [0, 20], [-20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 32,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.6)",
              textTransform: "uppercase",
              letterSpacing: 8,
            }}
          >
            Introducing
          </span>
        </div>

        {/* Bolka Logo - Orange swirl */}
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
            boxShadow: `0 0 60px rgba(255, 107, 53, ${glowPulse})`,
          }}
        >
          {/* Stylized swirl pattern */}
          <svg width="100" height="100" viewBox="0 0 100 100">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <path
                key={i}
                d={`M50,50 Q${50 + Math.cos((i * Math.PI) / 4) * 30},${50 + Math.sin((i * Math.PI) / 4) * 30} ${50 + Math.cos((i * Math.PI) / 4 + 0.5) * 45},${50 + Math.sin((i * Math.PI) / 4 + 0.5) * 45}`}
                stroke="white"
                strokeWidth="4"
                fill="none"
                opacity={0.8}
              />
            ))}
          </svg>
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 96,
            fontWeight: 800,
            color: "white",
            margin: 0,
            opacity: textSpring,
            transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
            letterSpacing: 4,
          }}
        >
          BOLKA
        </h1>

        {/* Voice Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: taglineSpring,
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              padding: "16px 40px",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              borderRadius: 50,
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
              Voice Links
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.7)",
            margin: 0,
            marginTop: 20,
            opacity: interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Voice AI Anywhere
        </p>
      </div>
    </AbsoluteFill>
  );
};
