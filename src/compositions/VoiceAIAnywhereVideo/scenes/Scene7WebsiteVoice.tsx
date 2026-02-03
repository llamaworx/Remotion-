import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Website mockup with mic icon
const WebsiteMockup: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ x, y, width, height, name, color, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Mic icon appears after website
  const micSpring = spring({
    frame: frame - delay - 25,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // Voice aura pulse
  const auraPulse = Math.sin((frame - delay) * 0.1) * 0.3 + 0.7;
  const micGlow = Math.sin((frame - delay) * 0.12) * 0.4 + 0.6;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${interpolate(entrySpring, [0, 1], [0.8, 1])})`,
      }}
    >
      {/* Voice aura rings */}
      {micSpring > 0 && (
        <>
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              style={{
                position: "absolute",
                right: -20 + ring * 15,
                bottom: -20 + ring * 15,
                width: 60 + ring * 30,
                height: 60 + ring * 30,
                borderRadius: "50%",
                border: `2px solid rgba(139, 92, 246, ${(0.4 - ring * 0.1) * auraPulse * micSpring})`,
                transform: `scale(${1 + auraPulse * 0.1})`,
              }}
            />
          ))}
        </>
      )}

      {/* Browser window */}
      <div
        style={{
          width,
          height,
          backgroundColor: "#1E293B",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: micSpring > 0.5
            ? `0 15px 50px rgba(0,0,0,0.4), 0 0 ${40 * micGlow}px rgba(139, 92, 246, 0.3)`
            : "0 15px 50px rgba(0,0,0,0.4)",
          border: micSpring > 0.5 ? "2px solid rgba(139, 92, 246, 0.4)" : "1px solid #334155",
        }}
      >
        {/* Browser header */}
        <div
          style={{
            height: 32,
            backgroundColor: "#334155",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 6,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#22C55E" }} />
          <div
            style={{
              flex: 1,
              marginLeft: 12,
              height: 20,
              backgroundColor: "#1E293B",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <span style={{ fontFamily: "system-ui", fontSize: 10, color: "#64748B" }}>
              {name}
            </span>
          </div>
        </div>

        {/* Website content */}
        <div style={{ padding: 16, position: "relative", height: height - 32 }}>
          {/* Header bar */}
          <div
            style={{
              height: 8,
              width: "40%",
              backgroundColor: color,
              borderRadius: 4,
              marginBottom: 12,
              opacity: 0.8,
            }}
          />
          {/* Navigation */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 6,
                  backgroundColor: "#475569",
                  borderRadius: 3,
                }}
              />
            ))}
          </div>
          {/* Content blocks */}
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                width: "40%",
                height: 50,
                backgroundColor: "#334155",
                borderRadius: 6,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ width: "80%", height: 6, backgroundColor: "#475569", borderRadius: 3, marginBottom: 8 }} />
              <div style={{ width: "60%", height: 6, backgroundColor: "#3F4F63", borderRadius: 3 }} />
            </div>
          </div>

          {/* Mic button */}
          {micSpring > 0 && (
            <div
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                width: 44,
                height: 44,
                background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: interpolate(micSpring, [0, 1], [0, 1]),
                transform: `scale(${interpolate(micSpring, [0, 1], [0.3, 1])})`,
                boxShadow: `0 4px 20px rgba(139, 92, 246, 0.5), 0 0 ${25 * micGlow}px rgba(139, 92, 246, 0.4)`,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
                <path
                  d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Website label */}
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          opacity: 0.8,
        }}
      >
        <span style={{ fontFamily: "system-ui", fontSize: 18, color: "#94A3B8" }}>
          {name}
        </span>
      </div>
    </div>
  );
};

// Extinct badge for text chatbots
const ExtinctBadge: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  if (entrySpring <= 0) return null;

  const shake = Math.sin(frame * 0.5) * 2;

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        right: 150,
        transform: `rotate(-12deg) scale(${interpolate(entrySpring, [0, 1], [0.5, 1])}) translateX(${shake}px)`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          border: "6px solid #EF4444",
          borderRadius: 12,
          padding: "16px 32px",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 64,
            fontWeight: 900,
            color: "#EF4444",
            letterSpacing: "0.1em",
          }}
        >
          EXTINCT
        </span>
      </div>
    </div>
  );
};

export const Scene7WebsiteVoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Website configurations
  const websites = [
    { x: 100, y: 120, width: 340, height: 240, name: "techstore.com", color: "#3B82F6", delay: 5 },
    { x: 500, y: 80, width: 380, height: 280, name: "fashionbrand.co", color: "#EC4899", delay: 15 },
    { x: 950, y: 140, width: 320, height: 220, name: "healthplus.io", color: "#22C55E", delay: 10 },
    { x: 1350, y: 100, width: 360, height: 260, name: "financeapp.com", color: "#F59E0B", delay: 20 },
    { x: 200, y: 450, width: 300, height: 200, name: "fooddelivery.app", color: "#EF4444", delay: 25 },
    { x: 580, y: 480, width: 350, height: 240, name: "travelsite.com", color: "#06B6D4", delay: 30 },
    { x: 1000, y: 420, width: 330, height: 230, name: "eduplatform.edu", color: "#8B5CF6", delay: 35 },
    { x: 1400, y: 460, width: 300, height: 210, name: "realestate.co", color: "#14B8A6", delay: 40 },
  ];

  // Text animation
  const textSpring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14 },
  });

  // "Voice" word highlight
  const voiceHighlight = Math.sin(frame * 0.08) * 0.2 + 0.8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)`,
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Websites */}
      {websites.map((site, i) => (
        <WebsiteMockup
          key={i}
          x={site.x}
          y={site.y}
          width={site.width}
          height={site.height}
          name={site.name}
          color={site.color}
          delay={site.delay}
          frame={frame}
          fps={fps}
        />
      ))}

      {/* Extinct badge */}
      <ExtinctBadge frame={frame} fps={fps} />

      {/* Main text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(textSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(textSpring, [0, 1], [50, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 110,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
          }}
        >
          Every website gets its own{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 ${20 * voiceHighlight}px rgba(139, 92, 246, 0.5))`,
            }}
          >
            voice.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
