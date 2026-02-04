import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Bolka Logo
const BolkaLogo: React.FC<{ size: number; glow: number }> = ({ size, glow }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <defs>
      <linearGradient id="bolkaGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <filter id="bolkaGlowHero">
        <feGaussianBlur stdDeviation={glow * 8} result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#bolkaGradHero)" filter="url(#bolkaGlowHero)" />
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

// Voice Link Demo
const VoiceLinkDemo: React.FC<{
  frame: number;
  fps: number;
  delay: number;
}> = ({ frame, fps, delay }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const localFrame = frame - delay;

  // Click animation at frame 60
  const clickFrame = 60;
  const isClicked = localFrame > clickFrame;
  const clickScale = isClicked
    ? interpolate(localFrame - clickFrame, [0, 5, 15], [1, 0.95, 1], { extrapolateRight: "clamp" })
    : 1;

  // Mic opens after click
  const micOpenSpring = spring({
    frame: localFrame - 80,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // Voice waves
  const waveActive = localFrame > 100;
  const micGlow = Math.sin(localFrame * 0.12) * 0.4 + 0.6;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      {/* Label */}
      <div
        style={{
          backgroundColor: "#8B5CF620",
          border: "1px solid #8B5CF6",
          borderRadius: 20,
          padding: "8px 20px",
        }}
      >
        <span style={{ fontFamily: "system-ui", fontSize: 16, fontWeight: 600, color: "#8B5CF6" }}>
          Bolka Share
        </span>
      </div>

      {/* Link card */}
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 20,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          transform: `scale(${clickScale})`,
          boxShadow: isClicked
            ? "0 0 40px rgba(139, 92, 246, 0.4)"
            : "0 10px 40px rgba(0,0,0,0.3)",
          border: `2px solid ${isClicked ? "#8B5CF6" : "#334155"}`,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: 22, color: "#8B5CF6" }}>
          bolka.ai/share/demo
        </span>
      </div>

      {/* Cursor animation */}
      {localFrame > 20 && localFrame < 80 && (
        <div
          style={{
            position: "absolute",
            top: interpolate(localFrame, [20, 50], [0, 80], { extrapolateRight: "clamp" }),
            left: interpolate(localFrame, [20, 50], [200, 120], { extrapolateRight: "clamp" }),
            opacity: interpolate(localFrame, [20, 30, 70, 80], [0, 1, 1, 0]),
            transform: localFrame > 55 && localFrame < 65 ? "scale(0.85)" : "scale(1)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path d="M4 4l16 8-8 2-2 8z" fill="white" stroke="#000" strokeWidth="1"/>
          </svg>
        </div>
      )}

      {/* Mic widget opens */}
      {micOpenSpring > 0 && (
        <div
          style={{
            opacity: interpolate(micOpenSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(micOpenSpring, [0, 1], [0.8, 1])})`,
          }}
        >
          <div
            style={{
              width: 280,
              backgroundColor: "#1E293B",
              borderRadius: 24,
              padding: 24,
              boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 ${40 * micGlow}px rgba(139, 92, 246, 0.3)`,
              border: "2px solid rgba(139, 92, 246, 0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            {/* Mic icon */}
            <div
              style={{
                width: 70,
                height: 70,
                background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: `0 0 ${25 * micGlow}px rgba(139, 92, 246, 0.5)`,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
                <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Voice waveform */}
            <div style={{ display: "flex", gap: 3, alignItems: "center", height: 35 }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const height = waveActive
                  ? 8 + Math.abs(Math.sin(frame * 0.2 + i * 0.4)) * 22
                  : 6;
                return (
                  <div
                    key={i}
                    style={{
                      width: 4,
                      height,
                      backgroundColor: "#8B5CF6",
                      borderRadius: 2,
                    }}
                  />
                );
              })}
            </div>

            <span style={{ fontFamily: "system-ui", fontSize: 16, color: "#94A3B8" }}>
              Listening...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Website Widget Demo
const WebsiteWidgetDemo: React.FC<{
  frame: number;
  fps: number;
  delay: number;
}> = ({ frame, fps, delay }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const localFrame = frame - delay;
  const micGlow = Math.sin(localFrame * 0.1) * 0.5 + 0.5;
  const pulse = Math.sin(localFrame * 0.08) * 0.08 + 1;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      {/* Label */}
      <div
        style={{
          backgroundColor: "#06B6D420",
          border: "1px solid #06B6D4",
          borderRadius: 20,
          padding: "8px 20px",
        }}
      >
        <span style={{ fontFamily: "system-ui", fontSize: 16, fontWeight: 600, color: "#06B6D4" }}>
          Bolka Embed
        </span>
      </div>

      {/* Website mockup */}
      <div
        style={{
          width: 320,
          height: 260,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          border: "1px solid #334155",
          position: "relative",
        }}
      >
        {/* Browser bar */}
        <div
          style={{
            padding: "10px 14px",
            backgroundColor: "#0F172A",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#22C55E" }} />
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#1E293B",
              borderRadius: 4,
              padding: "4px 10px",
              fontFamily: "monospace",
              fontSize: 11,
              color: "#64748B",
            }}
          >
            yourwebsite.com
          </div>
        </div>

        {/* Website content */}
        <div style={{ padding: 16 }}>
          <div style={{ height: 12, width: "70%", backgroundColor: "#334155", borderRadius: 4, marginBottom: 10 }} />
          <div style={{ height: 8, width: "90%", backgroundColor: "#1E293B", borderRadius: 3, marginBottom: 6, border: "1px solid #334155" }} />
          <div style={{ height: 8, width: "80%", backgroundColor: "#1E293B", borderRadius: 3, marginBottom: 6, border: "1px solid #334155" }} />
          <div style={{ height: 8, width: "60%", backgroundColor: "#1E293B", borderRadius: 3, border: "1px solid #334155" }} />
        </div>

        {/* Glowing mic widget */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 0 ${30 * micGlow}px rgba(6, 182, 212, 0.6), 0 10px 30px rgba(0,0,0,0.3)`,
            transform: `scale(${pulse})`,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
            <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Pulse rings */}
        {[0, 1, 2].map((i) => {
          const ringProgress = ((localFrame + i * 30) % 90) / 90;
          const ringSize = 60 + ringProgress * 50;
          const ringOpacity = interpolate(ringProgress, [0, 0.3, 1], [0, 0.4, 0]);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: 20 + 30 - ringSize / 2,
                right: 20 + 30 - ringSize / 2,
                width: ringSize,
                height: ringSize,
                borderRadius: "50%",
                border: "2px solid #06B6D4",
                opacity: ringOpacity,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Scene5EnterBolka: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 10, stiffness: 60 },
  });

  const logoGlow = Math.sin(frame * 0.08) * 0.4 + 0.6;
  const logoPulse = Math.sin(frame * 0.05) * 0.03 + 1;

  // Text animations
  const text1Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14 },
  });

  const text2Spring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14 },
  });

  // Products fade in
  const productsOpacity = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top section: Logo and text */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: interpolate(logoSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(logoSpring, [0, 1], [0.5, 1]) * logoPulse})`,
          }}
        >
          <BolkaLogo size={120} glow={logoGlow} />
        </div>

        {/* "Bolka Voice AI" */}
        <div
          style={{
            opacity: interpolate(text1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text1Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bolka Voice AI
            </span>
          </span>
        </div>

        {/* "Links + Website Voice" */}
        <div
          style={{
            opacity: interpolate(text2Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text2Spring, [0, 1], [20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 36,
              fontWeight: 500,
              color: "#94A3B8",
            }}
          >
            Links + Website Voice
          </span>
        </div>
      </div>

      {/* Product demos side by side */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 100,
          opacity: productsOpacity,
        }}
      >
        {/* Voice Link Demo */}
        <VoiceLinkDemo frame={frame} fps={fps} delay={100} />

        {/* Divider */}
        <div
          style={{
            width: 2,
            height: 350,
            background: "linear-gradient(180deg, transparent, #334155, transparent)",
            alignSelf: "center",
          }}
        />

        {/* Website Widget Demo */}
        <WebsiteWidgetDemo frame={frame} fps={fps} delay={120} />
      </div>
    </AbsoluteFill>
  );
};
