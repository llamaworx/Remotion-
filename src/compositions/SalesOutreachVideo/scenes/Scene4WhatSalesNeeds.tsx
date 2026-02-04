import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Scrolling content mockup
const ScrollingContent: React.FC<{
  frame: number;
  fps: number;
}> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14 },
  });

  // Continuous scroll animation
  const scrollOffset = interpolate(frame, [0, 240], [0, -600], {
    extrapolateRight: "clamp",
  });

  if (entrySpring <= 0) return null;

  const contentBlocks = [
    { title: "Getting Started Guide", type: "article" },
    { title: "Pricing FAQ", type: "faq" },
    { title: "Feature Comparison", type: "table" },
    { title: "Integration Docs", type: "article" },
    { title: "Case Studies", type: "article" },
    { title: "API Reference", type: "code" },
    { title: "Contact Support", type: "form" },
    { title: "Video Tutorials", type: "video" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: "50%",
        transform: `translateY(-50%) scale(${entrySpring})`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      {/* Browser window */}
      <div
        style={{
          width: 500,
          height: 450,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          border: "1px solid #334155",
        }}
      >
        {/* Browser bar */}
        <div
          style={{
            padding: "12px 16px",
            backgroundColor: "#0F172A",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22C55E" }} />
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#1E293B",
              borderRadius: 6,
              padding: "6px 14px",
              fontFamily: "monospace",
              fontSize: 13,
              color: "#64748B",
            }}
          >
            help.example.com
          </div>
        </div>

        {/* Scrolling content area */}
        <div
          style={{
            height: 400,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              transform: `translateY(${scrollOffset}px)`,
              padding: 20,
            }}
          >
            {/* Search bar */}
            <div
              style={{
                backgroundColor: "#0F172A",
                border: "1px solid #334155",
                borderRadius: 8,
                padding: "14px 18px",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#64748B" strokeWidth="2" />
                <path d="M21 21l-4-4" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "system-ui", fontSize: 15, color: "#64748B" }}>
                Search for help...
              </span>
            </div>

            {/* Content blocks */}
            {contentBlocks.map((block, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#0F172A",
                  borderRadius: 10,
                  padding: 18,
                  marginBottom: 14,
                  border: "1px solid #334155",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor: "#334155",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {block.type === "article" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16v16H4V4z" stroke="#64748B" strokeWidth="2" />
                        <path d="M8 8h8M8 12h8M8 16h4" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                    {block.type === "faq" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#64748B" strokeWidth="2" />
                        <path d="M9 9a3 3 0 115 2.83V13M12 17h.01" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                    {block.type === "table" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16v16H4V4zM4 10h16M10 4v16" stroke="#64748B" strokeWidth="2" />
                      </svg>
                    )}
                    {block.type === "code" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {block.type === "form" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16v16H4V4z" stroke="#64748B" strokeWidth="2" />
                        <path d="M8 10h8M8 14h4" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                    {block.type === "video" && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#64748B" strokeWidth="2" />
                        <path d="M10 9l5 3-5 3V9z" fill="#64748B" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div style={{ fontFamily: "system-ui", fontSize: 15, fontWeight: 600, color: "#F8FAFC" }}>
                      {block.title}
                    </div>
                    <div style={{ fontFamily: "system-ui", fontSize: 12, color: "#64748B", marginTop: 4 }}>
                      Click to read more →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            style={{
              position: "absolute",
              right: 8,
              top: 8,
              bottom: 8,
              width: 6,
              backgroundColor: "#0F172A",
              borderRadius: 3,
            }}
          >
            <div
              style={{
                width: 6,
                height: 60,
                backgroundColor: "#475569",
                borderRadius: 3,
                transform: `translateY(${-scrollOffset * 0.3}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Confused customer avatar
const ConfusedCustomer: React.FC<{
  frame: number;
  fps: number;
}> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12 },
  });

  // Subtle head movement (looking around confused)
  const headTilt = Math.sin(frame * 0.08) * 5;
  const eyeMove = Math.sin(frame * 0.15) * 3;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        right: 200,
        top: "50%",
        transform: `translateY(-50%) scale(${entrySpring})`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "#1E293B",
            border: "3px solid #334155",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            transform: `rotate(${headTilt}deg)`,
          }}
        >
          {/* Face */}
          <svg width="120" height="120" viewBox="0 0 120 120">
            {/* Head */}
            <circle cx="60" cy="60" r="50" fill="#F59E0B" />

            {/* Eyes */}
            <g transform={`translate(${eyeMove}, 0)`}>
              <ellipse cx="42" cy="50" rx="8" ry="10" fill="white" />
              <ellipse cx="78" cy="50" rx="8" ry="10" fill="white" />
              <circle cx="44" cy="52" r="4" fill="#1E293B" />
              <circle cx="80" cy="52" r="4" fill="#1E293B" />
            </g>

            {/* Eyebrows (raised/confused) */}
            <path d="M30 38 Q42 32 50 38" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M70 38 Q78 32 90 38" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Confused mouth */}
            <path d="M45 80 Q60 75 75 80" stroke="#92400E" strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* Question marks */}
            <text x="95" y="25" fill="#8B5CF6" fontSize="20" fontWeight="bold">?</text>
            <text x="15" y="30" fill="#8B5CF6" fontSize="16" fontWeight="bold">?</text>
          </svg>
        </div>

        {/* Thought bubbles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
          }}
        >
          {["Where's the pricing?", "How does it work?", "Can I talk to someone?"].map((thought, i) => {
            const thoughtDelay = 60 + i * 40;
            const thoughtSpring = spring({
              frame: frame - thoughtDelay,
              fps,
              config: { damping: 10, stiffness: 100 },
            });

            if (thoughtSpring <= 0) return null;

            return (
              <div
                key={thought}
                style={{
                  backgroundColor: "#1E293B",
                  border: "1px solid #334155",
                  borderRadius: 12,
                  padding: "10px 18px",
                  opacity: interpolate(thoughtSpring, [0, 1], [0, 1]),
                  transform: `scale(${thoughtSpring}) translateY(${interpolate(thoughtSpring, [0, 1], [20, 0])}px)`,
                }}
              >
                <span style={{ fontFamily: "system-ui", fontSize: 16, color: "#94A3B8" }}>
                  "{thought}"
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Clock ticking urgency
const UrgencyClock: React.FC<{
  frame: number;
  fps: number;
}> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 12 },
  });

  const secondHand = (frame * 6) % 360;
  const pulse = Math.sin(frame * 0.2) * 0.05 + 1;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        right: 100,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring * pulse})`,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          backgroundColor: "#1E293B",
          border: "3px solid #EF4444",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="28" stroke="#334155" strokeWidth="2" fill="none" />
          {/* Hour marks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <line
              key={angle}
              x1="30"
              y1="6"
              x2="30"
              y2="10"
              stroke="#64748B"
              strokeWidth="2"
              transform={`rotate(${angle} 30 30)`}
            />
          ))}
          {/* Second hand */}
          <line
            x1="30"
            y1="30"
            x2="30"
            y2="10"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${secondHand} 30 30)`}
          />
          <circle cx="30" cy="30" r="3" fill="#EF4444" />
        </svg>
      </div>
    </div>
  );
};

export const Scene4WhatSalesNeeds: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text animations
  const text1Spring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14 },
  });

  const text2Spring = spring({
    frame: frame - 160,
    fps,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 70% 50%, rgba(245, 158, 11, 0.06) 0%, transparent 40%)
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

      {/* Scrolling content */}
      <ScrollingContent frame={frame} fps={fps} />

      {/* Confused customer */}
      <ConfusedCustomer frame={frame} fps={fps} />

      {/* Urgency clock */}
      <UrgencyClock frame={frame} fps={fps} />

      {/* Main text */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {/* "Customers want answers." */}
        <div
          style={{
            opacity: interpolate(text1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text1Spring, [0, 1], [40, 0])}px)`,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 72,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
            }}
          >
            Customers want{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              answers.
            </span>
          </span>
        </div>

        {/* "Right now." */}
        <div
          style={{
            opacity: interpolate(text2Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text2Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 56,
              fontWeight: 700,
              color: "#EF4444",
            }}
          >
            Right now.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
