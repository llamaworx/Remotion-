import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text reveal animation - slower timing
  const line1Spring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const line2Spring = spring({ frame: frame - 25, fps, config: { damping: 15, stiffness: 80 } });
  const line3Spring = spring({ frame: frame - 50, fps, config: { damping: 15, stiffness: 80 } });

  const line1Y = interpolate(line1Spring, [0, 1], [80, 0]);
  const line2Y = interpolate(line2Spring, [0, 1], [80, 0]);
  const line3Y = interpolate(line3Spring, [0, 1], [80, 0]);

  // Question mark icon animation
  const iconSpring = spring({ frame: frame - 75, fps, config: { damping: 12, stiffness: 100 } });
  const iconPulse = Math.sin(frame * 0.08) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      {/* Gradient accent */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
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
        {/* Hook question */}
        <div style={{ overflow: "hidden" }}>
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 82,
              fontWeight: 800,
              color: "white",
              margin: 0,
              textAlign: "center",
              transform: `translateY(${line1Y}px)`,
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
              fontSize: 82,
              fontWeight: 800,
              color: "#FF6B35",
              margin: 0,
              textAlign: "center",
              transform: `translateY(${line2Y}px)`,
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
              fontSize: 82,
              fontWeight: 800,
              color: "white",
              margin: 0,
              textAlign: "center",
              transform: `translateY(${line3Y}px)`,
              opacity: line3Spring,
            }}
          >
            like payment links?
          </h1>
        </div>

        {/* Question mark icon - professional SVG */}
        <div
          style={{
            marginTop: 50,
            opacity: iconSpring,
            transform: `scale(${iconSpring * iconPulse})`,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(255, 140, 66, 0.1) 100%)",
              border: "3px solid rgba(255, 107, 53, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF6B35"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
