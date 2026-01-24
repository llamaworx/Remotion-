import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

interface FeaturesSceneProps {
  features: string[];
}

const FeatureCard: React.FC<{
  feature: string;
  index: number;
  frame: number;
  fps: number;
}> = ({ feature, index, frame, fps }) => {
  const delay = index * 30;
  const isActive = frame >= delay && frame < delay + 45;
  const entryFrame = frame - delay;

  const cardSpring = spring({
    frame: entryFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const scale = interpolate(cardSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(entryFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Icon based on feature
  const getIcon = (featureText: string) => {
    if (featureText.includes("Voice")) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      );
    }
    if (featureText.includes("Deployment")) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <path d="M12 12v9" />
          <path d="m8 17 4 4 4-4" />
        </svg>
      );
    }
    if (featureText.includes("Security")) {
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    }
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "28px 40px",
        background: isActive
          ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)"
          : "rgba(255, 255, 255, 0.05)",
        borderRadius: 16,
        border: isActive
          ? "2px solid rgba(99, 102, 241, 0.5)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        transform: `scale(${scale})`,
        opacity,
        transition: "background 0.3s, border 0.3s",
        boxShadow: isActive
          ? "0 0 40px rgba(99, 102, 241, 0.3)"
          : "none",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          flexShrink: 0,
        }}
      >
        {getIcon(feature)}
      </div>
      <span
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 32,
          fontWeight: 500,
          color: "white",
        }}
      >
        {feature}
      </span>
    </div>
  );
};

export const FeaturesScene: React.FC<FeaturesSceneProps> = ({ features }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Section title */}
      <h2
        style={{
          position: "absolute",
          top: 80,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: 48,
          fontWeight: 600,
          color: "white",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          margin: 0,
        }}
      >
        Why Choose <span style={{ color: "#8b5cf6" }}>Bolka</span>?
      </h2>

      {/* Features grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          maxWidth: 1200,
          marginTop: 40,
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            feature={feature}
            index={index}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
