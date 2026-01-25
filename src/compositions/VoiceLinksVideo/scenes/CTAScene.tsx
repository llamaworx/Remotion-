import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { BolkaLogo, ArrowRightIcon } from "../../../components/Icons";

// QR Code component for bolka.ai/share
const QRCode: React.FC<{ size: number }> = ({ size }) => {
  const modules = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,0,0,1,1,0,1],
    [0,1,0,0,1,0,0,0,1,1,0,0,1,0,1,1,0,1,0,1,0],
    [1,1,1,0,1,1,1,0,0,1,1,1,0,1,0,0,1,0,1,0,1],
    [0,1,0,1,0,0,0,0,1,0,0,1,1,0,1,0,1,1,0,1,0],
    [1,0,1,0,1,1,1,0,1,1,0,0,0,1,0,1,0,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,1,1,0,1,0,0,1,1,1,0],
    [1,0,1,1,1,0,1,0,1,1,0,0,0,1,0,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,0,1,0,1,1,0,1,0],
    [1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,1,1,1,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,0,0,1,0,1],
  ];

  const cellSize = size / 21;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" rx={8} />
      {modules.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#1a1a1a"
            />
          ) : null
        )
      )}
    </svg>
  );
};

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const contentSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const pulse = Math.sin(frame * 0.12) * 0.03 + 1;
  const float = Math.sin(frame * 0.04) * 8;
  const float2 = Math.cos(frame * 0.05) * 10;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
      }}
    >
      {/* Decorative floating circles */}
      <div
        style={{
          position: "absolute",
          top: 250,
          right: 100,
          width: 150,
          height: 150,
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
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)",
          transform: `translateY(${float2}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 600,
          left: 120,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.05) 100%)",
          transform: `translateY(${-float}px)`,
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
        {/* Bolka Logo - slides from top */}
        <div
          style={{
            filter: "drop-shadow(0 25px 50px rgba(255, 107, 53, 0.35))",
            transform: `translateY(${interpolate(contentSpring, [0, 1], [-50, 0])}px)`,
          }}
        >
          <BolkaLogo size={180} />
        </div>

        {/* Main CTA text - slides from left */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
            opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [20, 50], [-80, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 72,
              fontWeight: 800,
              color: "#1a1a2e",
              margin: 0,
              textAlign: "center",
            }}
          >
            Start Your
          </h1>
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 72,
              fontWeight: 800,
              margin: 0,
              textAlign: "center",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Voice Link
          </h1>
        </div>

        {/* Subtitle - slides from right */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 32,
            color: "#666",
            margin: 0,
            opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [40, 70], [80, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Free to try. No credit card.
        </p>

        {/* CTA Button - scales in with pulse */}
        <div
          style={{
            transform: `scale(${pulse})`,
            marginTop: 20,
            opacity: interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "28px 60px",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              borderRadius: 60,
              display: "flex",
              alignItems: "center",
              gap: 18,
              boxShadow: "0 20px 60px rgba(255, 107, 53, 0.4)",
            }}
          >
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 38,
                fontWeight: 700,
                color: "white",
              }}
            >
              bolka.ai/share
            </span>
            <ArrowRightIcon size={32} color="white" />
          </div>
        </div>

        {/* QR Code - slides from bottom */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
            marginTop: 30,
            opacity: interpolate(frame, [70, 100], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [70, 100], [60, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <div
            style={{
              padding: 15,
              background: "white",
              borderRadius: 20,
              boxShadow: "0 15px 50px rgba(0, 0, 0, 0.1)",
              border: "3px solid rgba(255, 107, 53, 0.2)",
            }}
          >
            <QRCode size={160} />
          </div>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 22,
              color: "#888",
              fontWeight: 500,
            }}
          >
            Scan to visit
          </span>
        </div>

        {/* Social handles */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 20,
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 26,
              color: "#aaa",
            }}
          >
            @bolka.ai
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
