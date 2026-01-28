import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Bolka Logo - MUCH LARGER
const BolkaLogo: React.FC<{ size?: number }> = ({ size = 85 }) => (
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

// Mini Bolka widget indicator - MUCH LARGER
const MiniWidget: React.FC<{ pulse: number }> = ({ pulse }) => (
  <div
    style={{
      width: 32,
      height: 32,
      background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
      borderRadius: "50%",
      boxShadow: `0 0 ${14 + pulse * 10}px rgba(139, 92, 246, ${0.65 + pulse * 0.35})`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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

  // MUCH LARGER dimensions for visibility
  const dimensions = {
    laptop: { width: 400, height: 260, screenWidth: 360, screenHeight: 220 },
    tablet: { width: 200, height: 275, screenWidth: 175, screenHeight: 230 },
    phone: { width: 120, height: 230, screenWidth: 100, screenHeight: 190 },
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

      {/* Multi-device display - MUCH LARGER */}
      <div
        style={{
          display: "flex",
          gap: 55,
          alignItems: "flex-end",
          marginBottom: 30,
        }}
      >
        <DeviceMockup type="phone" delay={8} frame={frame} fps={fps} />
        <DeviceMockup type="laptop" delay={0} frame={frame} fps={fps} />
        <DeviceMockup type="tablet" delay={15} frame={frame} fps={fps} />
      </div>

      {/* Bold text: "The world moved to 2030." - MUCH BIGGER */}
      <div
        style={{
          position: "absolute",
          top: 60,
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
            fontSize: 80,
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
              filter: `drop-shadow(0 0 ${45 * yearGlow}px rgba(139, 92, 246, 0.7))`,
            }}
          >
            2030
          </span>
          .
        </span>
      </div>

      {/* "In 2026." - MUCH BIGGER with ZOOM */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(text2Spring, [0, 1], [0, 1]),
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 105,
            fontWeight: 900,
            background: "linear-gradient(90deg, #8B5CF6, #6366F1, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            display: "inline-block",
            transform: `scale(${year2026Scale})`,
            filter: `drop-shadow(0 0 ${50 * yearGlow}px rgba(139, 92, 246, 0.6))`,
          }}
        >
          In 2026.
        </span>
      </div>

      {/* Logo + "Bolka Embed" branding - MUCH BIGGER */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          opacity: interpolate(logoSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(logoSpring, [0, 1], [25, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <BolkaLogo size={85} />
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 68,
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
            fontSize: 38,
            fontWeight: 600,
            background: "linear-gradient(90deg, #94A3B8, #E2E8F0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.04em",
          }}
        >
          Voice AI, Deployed Your Way
        </span>
      </div>

      {/* CTA Button - MUCH BIGGER with pulse */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
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
            padding: "26px 70px",
            borderRadius: 60,
            boxShadow: "0 15px 55px rgba(139, 92, 246, 0.55)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 38,
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
