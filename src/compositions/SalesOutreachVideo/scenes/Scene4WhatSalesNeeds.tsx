import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Customer avatar with questions
const CustomerWithQuestions: React.FC<{
  frame: number;
  fps: number;
}> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });

  const headTilt = Math.sin(frame * 0.06) * 4;

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
      {/* Large avatar */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          backgroundColor: "#1E293B",
          border: "4px solid #8B5CF6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
          transform: `rotate(${headTilt}deg)`,
        }}
      >
        <svg width="140" height="140" viewBox="0 0 120 120">
          {/* Head */}
          <circle cx="60" cy="60" r="50" fill="#F59E0B" />
          {/* Eyes */}
          <ellipse cx="42" cy="50" rx="10" ry="12" fill="white" />
          <ellipse cx="78" cy="50" rx="10" ry="12" fill="white" />
          <circle cx="44" cy="52" r="5" fill="#1E293B" />
          <circle cx="80" cy="52" r="5" fill="#1E293B" />
          {/* Eyebrows */}
          <path d="M28 36 Q42 28 52 36" stroke="#92400E" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M68 36 Q78 28 92 36" stroke="#92400E" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Confused mouth */}
          <path d="M42 82 Q60 76 78 82" stroke="#92400E" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Question marks */}
          <text x="95" y="20" fill="#8B5CF6" fontSize="28" fontWeight="bold">?</text>
          <text x="10" y="28" fill="#8B5CF6" fontSize="22" fontWeight="bold">?</text>
        </svg>
      </div>

      <div
        style={{
          fontFamily: "system-ui",
          fontSize: 26,
          fontWeight: 600,
          color: "#94A3B8",
        }}
      >
        Confused Visitor
      </div>
    </div>
  );
};

// Question bubble
const QuestionBubble: React.FC<{
  text: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ text, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(entrySpring, [0, 1], [20, 0])}px) scale(${entrySpring})`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 20,
          padding: "24px 28px",
          border: "2px solid #8B5CF6",
          boxShadow: "0 10px 30px rgba(139, 92, 246, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#8B5CF620",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 800, color: "#8B5CF6" }}>?</span>
        </div>
        <span style={{ fontFamily: "system-ui", fontSize: 24, color: "#F8FAFC", fontWeight: 500 }}>
          "{text}"
        </span>
      </div>
    </div>
  );
};

// Urgency timer
const UrgencyTimer: React.FC<{
  frame: number;
  fps: number;
}> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 140,
    fps,
    config: { damping: 12 },
  });

  const pulse = Math.sin(frame * 0.15) * 0.03 + 1;
  const seconds = Math.max(0, 30 - Math.floor((frame - 140) / 30));

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring * pulse})`,
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 24,
          padding: "32px",
          border: "3px solid #EF4444",
          boxShadow: "0 10px 50px rgba(239, 68, 68, 0.3)",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Clock */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: "#0F172A",
            border: "3px solid #EF4444",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <svg width="50" height="50" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="26" stroke="#334155" strokeWidth="2" fill="none" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
              <line
                key={angle}
                x1="30"
                y1="8"
                x2="30"
                y2="12"
                stroke="#64748B"
                strokeWidth="2"
                transform={`rotate(${angle} 30 30)`}
              />
            ))}
            <line
              x1="30"
              y1="30"
              x2="30"
              y2="12"
              stroke="#EF4444"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${(frame * 6) % 360} 30 30)`}
            />
            <circle cx="30" cy="30" r="4" fill="#EF4444" />
          </svg>
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 48,
              fontWeight: 800,
              color: "#EF4444",
            }}
          >
            {seconds}s
          </div>
          <div
            style={{
              fontFamily: "system-ui",
              fontSize: 20,
              color: "#94A3B8",
            }}
          >
            Average attention span
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene4WhatSalesNeeds: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({
    frame: frame - 200,
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
            radial-gradient(circle at 50% 25%, rgba(139, 92, 246, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 75%, rgba(245, 158, 11, 0.08) 0%, transparent 40%)
          `,
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 50px",
          gap: 28,
        }}
      >
        {/* Customer avatar */}
        <CustomerWithQuestions frame={frame} fps={fps} />

        {/* Question bubbles */}
        <QuestionBubble text="Where's the pricing?" delay={50} frame={frame} fps={fps} />
        <QuestionBubble text="How does this work?" delay={80} frame={frame} fps={fps} />
        <QuestionBubble text="Can I talk to someone?" delay={110} frame={frame} fps={fps} />

        {/* Urgency timer */}
        <UrgencyTimer frame={frame} fps={fps} />

        {/* Main text */}
        <div
          style={{
            marginTop: "auto",
            textAlign: "center",
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textSpring, [0, 1], [40, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 52,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
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
              answers
            </span>
            <br />
            <span style={{ color: "#EF4444" }}>right now.</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
