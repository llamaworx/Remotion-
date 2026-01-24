import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

interface TaglineSceneProps {
  tagline: string;
}

export const TaglineScene: React.FC<TaglineSceneProps> = ({ tagline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split tagline into words for staggered animation
  const words = tagline.split(" ");

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated gradient background accent */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: 4,
          top: "45%",
          background: "linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%)",
          opacity: interpolate(frame, [0, 20], [0, 0.6], {
            extrapolateRight: "clamp",
          }),
          transform: `scaleX(${interpolate(frame, [0, 30], [0, 1], {
            extrapolateRight: "clamp",
          })})`,
        }}
      />

      {/* Tagline text with word-by-word animation */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          maxWidth: 1400,
          padding: "0 100px",
        }}
      >
        {words.map((word, index) => {
          const delay = index * 8;
          const wordSpring = spring({
            frame: frame - delay,
            fps,
            config: {
              damping: 15,
              stiffness: 120,
            },
          });

          const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const translateY = interpolate(wordSpring, [0, 1], [40, 0]);

          return (
            <span
              key={index}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: 72,
                fontWeight: 600,
                color: word === "AI" ? "#8b5cf6" : "white",
                opacity,
                transform: `translateY(${translateY}px)`,
                textShadow: word === "AI"
                  ? "0 0 30px rgba(139, 92, 246, 0.6)"
                  : "none",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          display: "flex",
          gap: 8,
        }}
      >
        {[0, 1, 2].map((dot) => {
          const dotOpacity = interpolate(
            frame,
            [40 + dot * 10, 50 + dot * 10],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          return (
            <div
              key={dot}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#6366f1",
                opacity: dotOpacity,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
