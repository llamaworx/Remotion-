import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Bolka Logo - LARGER
const BolkaLogo: React.FC<{ size?: number }> = ({ size = 65 }) => (
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

// Mini Bolka widget indicator - LARGER
const MiniWidget: React.FC<{ pulse: number }> = ({ pulse }) => (
  <div
    style={{
      width: 24,
      height: 24,
      background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
      borderRadius: "50%",
      boxShadow: `0 0 ${10 + pulse * 8}px rgba(139, 92, 246, ${0.6 + pulse * 0.3})`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
      <path d="M5 10V11C5 14.866 8.13401 18 12 18" stroke="white" strokeWidth="2" />
    </svg>
  </div>
);

// Device mockup component - LARGER
const DeviceMockup: React.FC<{
  type: "laptop" | "tablet" | "phone";
  delay: number;
  frame: number;
  fps: number;
}> = ({ type, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const scale = interpolate(entrySpring, [0, 1], [0.4, 1]);
  const opacity = interpolate(entrySpring, [0, 1], [0, 1]);
  const pulse = Math.sin(frame * 0.1 + delay) * 0.5 + 0.5;

  // LARGER dimensions
  const dimensions = {
    laptop: { width: 320, height: 210, screenWidth: 285, screenHeight: 175 },
    tablet: { width: 160, height: 220, screenWidth: 140, screenHeight: 185 },
    phone: { width: 95, height: 185, screenWidth: 82, screenHeight: 155 },
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
          borderRadius: type === "laptop" ? "14px 14px 0 0" : 18,
          padding: type === "laptop" ? "12px 18px 6px" : 12,
          boxShadow: "0 15px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: d.screenWidth,
            height: d.screenHeight,
            backgroundColor: "#0F172A",
            borderRadius: 10,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Fake website content */}
          <div style={{ padding: 10 }}>
            <div style={{ width: "60%", height: 8, backgroundColor: "#334155", borderRadius: 4, marginBottom: 8 }} />
            <div style={{ width: "40%", height: 6, backgroundColor: "#2D3748", borderRadius: 3, marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: "30%", height: 36, backgroundColor: "#334155", borderRadius: 6 }} />
              <div style={{ width: "30%", height: 36, backgroundColor: "#334155", borderRadius: 6 }} />
            </div>
          </div>

          {/* Bolka widget */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
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
            width: d.width + 50,
            height: 14,
            backgroundColor: "#334155",
            borderRadius: "0 0 10px 10px",
            marginLeft: -25,
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

  // Text animations - SLOWER for readability
  const text1Spring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14 },
  });

  const text2Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12 },
  });

  const logoSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const ctaSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 12 },
  });

  // Year ZOOM effects
  const year2030Zoom = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  const year2030Scale = interpolate(year2030Zoom, [0, 1], [0.7, 1.1]);

  const year2026Zoom = spring({
    frame: frame - 40,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  const year2026Scale = interpolate(year2026Zoom, [0, 1], [0.6, 1.15]);

  // Year highlight glow pulse
  const yearGlow = Math.sin(frame * 0.12) * 0.4 + 0.6;

  // CTA zoom pulse
  const ctaPulse = Math.sin(frame * 0.08) * 0.03 + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated gradient background - more intense */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${50 + Math.sin(frame * 0.02) * 15}% ${50 + Math.cos(frame * 0.02) * 15}%, rgba(139, 92, 246, 0.2) 0%, transparent 55%)`,
        }}
      />

      {/* Multi-device display - LARGER */}
      <div
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-end",
          marginBottom: 50,
        }}
      >
        <DeviceMockup type="phone" delay={8} frame={frame} fps={fps} />
        <DeviceMockup type="laptop" delay={0} frame={frame} fps={fps} />
        <DeviceMockup type="tablet" delay={15} frame={frame} fps={fps} />
      </div>

      {/* Bold text: "The world moved to 2030." - BIGGER */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(text1Spring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(text1Spring, [0, 1], [40, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 64,
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
              display: "inline-block",
              transform: `scale(${year2030Scale})`,
              filter: `drop-shadow(0 0 ${35 * yearGlow}px rgba(139, 92, 246, 0.6))`,
            }}
          >
            2030
          </span>
          .
        </span>
      </div>

      {/* "In 2026." - BIGGER with ZOOM */}
      <div
        style={{
          position: "absolute",
          top: 165,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(text2Spring, [0, 1], [0, 1]),
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 88,
            fontWeight: 900,
            background: "linear-gradient(90deg, #8B5CF6, #6366F1, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            display: "inline-block",
            transform: `scale(${year2026Scale})`,
            filter: `drop-shadow(0 0 ${40 * yearGlow}px rgba(139, 92, 246, 0.5))`,
          }}
        >
          In 2026.
        </span>
      </div>

      {/* Logo + "Bolka Embed" branding - BIGGER */}
      <div
        style={{
          position: "absolute",
          bottom: 155,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          opacity: interpolate(logoSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(logoSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <BolkaLogo size={70} />
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 52,
              fontWeight: 700,
              background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bolka Embed
          </span>
        </div>
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 28,
            color: "#94A3B8",
            letterSpacing: "0.04em",
          }}
        >
          Let your website speak
        </span>
      </div>

      {/* CTA Button - BIGGER with pulse */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(ctaSpring, [0, 1], [0, 1]),
          transform: `scale(${interpolate(ctaSpring, [0, 1], [0.85, 1]) * ctaPulse})`,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
            padding: "20px 55px",
            borderRadius: 60,
            boxShadow: "0 12px 45px rgba(139, 92, 246, 0.5)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 28,
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
