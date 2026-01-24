import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

interface IntroSceneProps {
  brandName: string;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ brandName }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale animation with spring
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Glow animation
  const glowOpacity = interpolate(frame, [0, 30, 60, 90], [0, 0.8, 1, 0.6], {
    extrapolateRight: "clamp",
  });

  // Sound wave animation
  const waveOffset = frame * 2;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background glow effect */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
          opacity: glowOpacity,
          filter: "blur(40px)",
        }}
      />

      {/* Sound wave circles */}
      {[1, 2, 3].map((ring) => {
        const ringScale = interpolate(
          (frame + ring * 15) % 60,
          [0, 60],
          [0.5, 2]
        );
        const ringOpacity = interpolate(
          (frame + ring * 15) % 60,
          [0, 60],
          [0.6, 0]
        );
        return (
          <div
            key={ring}
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "2px solid rgba(99, 102, 241, 0.6)",
              transform: `scale(${ringScale})`,
              opacity: ringOpacity,
            }}
          />
        );
      })}

      {/* Main logo container */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Voice AI Icon */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 60px rgba(99, 102, 241, 0.5)",
          }}
        >
          {/* Microphone/Voice icon */}
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 80,
            fontWeight: 700,
            color: "white",
            margin: 0,
            letterSpacing: "-2px",
            textShadow: "0 0 40px rgba(99, 102, 241, 0.5)",
          }}
        >
          {brandName}
        </h1>
      </div>
    </AbsoluteFill>
  );
};
