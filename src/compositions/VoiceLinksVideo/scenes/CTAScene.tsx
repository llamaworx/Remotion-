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
// This is a visual representation - for production, replace with actual QR code image
const QRCode: React.FC<{ size: number }> = ({ size }) => {
  // QR code pattern for https://bolka.ai/share (simplified visual representation)
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

        {/* CTA Button and QR Code */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 60,
            marginTop: 30,
          }}
        >
          {/* CTA Button */}
          <div
            style={{
              transform: `scale(${pulse})`,
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

          {/* QR Code */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
              transform: `scale(${interpolate(frame, [40, 70], [0.8, 1], { extrapolateRight: "clamp" })})`,
            }}
          >
            <div
              style={{
                padding: 12,
                background: "white",
                borderRadius: 16,
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
              }}
            >
              <QRCode size={140} />
            </div>
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 18,
                color: "rgba(255, 255, 255, 0.6)",
                fontWeight: 500,
              }}
            >
              Scan to visit
            </span>
          </div>
        </div>

        {/* Social handles */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 50,
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
