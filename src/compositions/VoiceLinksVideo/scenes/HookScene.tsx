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

  // Text reveal animation
  const line1Spring = spring({ frame, fps, config: { damping: 12 } });
  const line2Spring = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const line3Spring = spring({ frame: frame - 30, fps, config: { damping: 12 } });

  const line1Y = interpolate(line1Spring, [0, 1], [60, 0]);
  const line2Y = interpolate(line2Spring, [0, 1], [60, 0]);
  const line3Y = interpolate(line3Spring, [0, 1], [60, 0]);

  // Emoji bounce
  const emojiBounce = Math.sin(frame * 0.2) * 10;

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
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Hook question */}
        <div style={{ overflow: "hidden" }}>
          <h1
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: 72,
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
              fontSize: 72,
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
              fontSize: 72,
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

        {/* Thinking emoji */}
        <div
          style={{
            fontSize: 80,
            marginTop: 40,
            transform: `translateY(${emojiBounce}px)`,
            opacity: interpolate(frame, [45, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          🤔
        </div>
      </div>
    </AbsoluteFill>
  );
};
