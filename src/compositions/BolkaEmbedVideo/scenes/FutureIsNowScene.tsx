import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Bolka Logo
const BolkaLogo: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6366F1" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#logoGrad)" />
    <rect x="42" y="25" width="16" height="28" rx="8" fill="white" />
    <path
      d="M30 45V50C30 61.046 38.954 70 50 70C61.046 70 70 61.046 70 50V45"
      stroke="white"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path d="M50 70V80M40 80H60" stroke="white" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// Mini Bolka widget indicator
const MiniWidget: React.FC<{ pulse: number }> = ({ pulse }) => (
  <div
    style={{
      width: 18,
      height: 18,
      background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
      borderRadius: "50%",
      boxShadow: `0 0 ${8 + pulse * 6}px rgba(139, 92, 246, ${0.5 + pulse * 0.3})`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
      <path d="M5 10V11C5 14.866 8.13401 18 12 18" stroke="white" strokeWidth="2" />
    </svg>
  </div>
);

// Device mockup component
const DeviceMockup: React.FC<{
  type: "laptop" | "tablet" | "phone";
  delay: number;
  frame: number;
  fps: number;
}> = ({ type, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const scale = interpolate(entrySpring, [0, 1], [0.5, 1]);
  const opacity = interpolate(entrySpring, [0, 1], [0, 1]);
  const pulse = Math.sin(frame * 0.1 + delay) * 0.5 + 0.5;

  const dimensions = {
    laptop: { width: 280, height: 180, screenWidth: 250, screenHeight: 150 },
    tablet: { width: 140, height: 190, screenWidth: 120, screenHeight: 160 },
    phone: { width: 80, height: 160, screenWidth: 70, screenHeight: 130 },
  };

  const d = dimensions[type];

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        position: "relative",
      }}
    >
      {/* Device frame */}
      <div
        style={{
          width: d.width,
          height: d.height,
          backgroundColor: "#1E293B",
          borderRadius: type === "laptop" ? "12px 12px 0 0" : 16,
          padding: type === "laptop" ? "10px 15px 5px" : 10,
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: d.screenWidth,
            height: d.screenHeight,
            backgroundColor: "#0F172A",
            borderRadius: 8,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Fake website content */}
          <div style={{ padding: 8 }}>
            <div style={{ width: "60%", height: 6, backgroundColor: "#334155", borderRadius: 3, marginBottom: 6 }} />
            <div style={{ width: "40%", height: 4, backgroundColor: "#2D3748", borderRadius: 2, marginBottom: 10 }} />
            <div style={{ display: "flex", gap: 4 }}>
              <div style={{ width: "30%", height: 30, backgroundColor: "#334155", borderRadius: 4 }} />
              <div style={{ width: "30%", height: 30, backgroundColor: "#334155", borderRadius: 4 }} />
            </div>
          </div>

          {/* Bolka widget */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 8,
            }}
          >
            <MiniWidget pulse={pulse} />
          </div>
        </div>
      </div>

      {/* Laptop base */}
      {type === "laptop" && (
        <div
          style={{
            width: d.width + 40,
            height: 12,
            backgroundColor: "#334155",
            borderRadius: "0 0 8px 8px",
            marginLeft: -20,
            marginTop: -2,
          }}
        />
      )}
    </div>
  );
};

export const FutureIsNowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text animations
  const text1Spring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15 },
  });

  const text2Spring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 15 },
  });

  const logoSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const ctaSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 15 },
  });

  // Year highlight effect
  const yearGlow = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${50 + Math.sin(frame * 0.02) * 10}% ${50 + Math.cos(frame * 0.02) * 10}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Multi-device display */}
      <div
        style={{
          display: "flex",
          gap: 30,
          alignItems: "flex-end",
          marginBottom: 40,
        }}
      >
        <DeviceMockup type="phone" delay={5} frame={frame} fps={fps} />
        <DeviceMockup type="laptop" delay={0} frame={frame} fps={fps} />
        <DeviceMockup type="tablet" delay={10} frame={frame} fps={fps} />
      </div>

      {/* Bold text: "The world moved to 2030." */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(text1Spring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(text1Spring, [0, 1], [30, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 56,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-0.03em",
          }}
        >
          The world moved to{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 ${30 * yearGlow}px rgba(139, 92, 246, 0.5)`,
            }}
          >
            2030
          </span>
          .
        </span>
      </div>

      {/* "In 2026." */}
      <div
        style={{
          position: "absolute",
          top: 175,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(text2Spring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(text2Spring, [0, 1], [0.8, 1])})`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 72,
            fontWeight: 900,
            background: "linear-gradient(90deg, #8B5CF6, #6366F1, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          In 2026.
        </span>
      </div>

      {/* Logo + Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          opacity: interpolate(logoSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(logoSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <BolkaLogo size={55} />
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 42,
              fontWeight: 700,
              color: "#F8FAFC",
            }}
          >
            Bolka
          </span>
        </div>
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 24,
            color: "#94A3B8",
            letterSpacing: "0.05em",
          }}
        >
          Let your website speak
        </span>
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(ctaSpring, [0, 1], [0.9, 1])})`,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
            padding: "16px 40px",
            borderRadius: 50,
            boxShadow: "0 8px 30px rgba(139, 92, 246, 0.4)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 22,
              fontWeight: 600,
              color: "white",
              letterSpacing: "0.02em",
            }}
          >
            bolka.ai
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
