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
        padding: 40,
      }}
    >
      {/* Decorative floating circles */}
      <div
        style={{
          position: "absolute",
          top: 200,
          right: 80,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 140, 66, 0.08) 100%)",
          transform: `translateY(${float}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 350,
          left: 60,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(168, 85, 247, 0.06) 100%)",
          transform: `translateY(${float2}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 550,
          left: 100,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(52, 211, 153, 0.06) 100%)",
          transform: `translateY(${-float}px)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
          transform: `scale(${interpolate(contentSpring, [0, 1], [0.9, 1])})`,
          opacity: contentSpring,
        }}
      >
        {/* Bolka Logo - BIGGER */}
        <div
          style={{
            filter: "drop-shadow(0 30px 60px rgba(255, 107, 53, 0.4))",
            transform: `translateY(${interpolate(contentSpring, [0, 1], [-50, 0])}px)`,
          }}
        >
          <BolkaLogo size={220} />
        </div>

        {/* Main CTA text - BIGGER */}
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
              fontSize: 92,
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
              fontSize: 92,
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

        {/* Subtitle - BIGGER */}
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 42,
            color: "#666",
            margin: 0,
            opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [40, 70], [80, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Free to try. No credit card.
        </p>

        {/* CTA Button - BIGGER */}
        <div
          style={{
            transform: `scale(${pulse})`,
            marginTop: 25,
            opacity: interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "32px 70px",
              background: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
              borderRadius: 70,
              display: "flex",
              alignItems: "center",
              gap: 20,
              boxShadow: "0 25px 70px rgba(255, 107, 53, 0.45)",
            }}
          >
            <span
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 50,
                fontWeight: 700,
                color: "white",
              }}
            >
              bolka.ai/share
            </span>
            <ArrowRightIcon size={40} color="white" />
          </div>
        </div>

        {/* QR Code - BIGGER */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            marginTop: 35,
            opacity: interpolate(frame, [70, 100], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [70, 100], [60, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <div
            style={{
              padding: 18,
              background: "white",
              borderRadius: 24,
              boxShadow: "0 18px 60px rgba(0, 0, 0, 0.12)",
              border: "3px solid rgba(255, 107, 53, 0.25)",
            }}
          >
            <QRCode size={200} />
          </div>
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 30,
              color: "#888",
              fontWeight: 500,
            }}
          >
            Scan to visit
          </span>
        </div>

        {/* Social handles - BIGGER */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 25,
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <span
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 34,
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
