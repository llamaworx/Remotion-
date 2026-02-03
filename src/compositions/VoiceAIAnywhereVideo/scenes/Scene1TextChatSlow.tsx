import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// Chat bubble that appears and gets closed
const ChatBubble: React.FC<{
  x: number;
  y: number;
  delay: number;
  closeDelay: number;
  frame: number;
  fps: number;
  size?: "small" | "medium" | "large";
}> = ({ x, y, delay, closeDelay, frame, fps, size = "medium" }) => {
  const appearSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const closeProgress = interpolate(
    frame - closeDelay,
    [0, 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scale = interpolate(closeProgress, [0, 1], [1, 0]);
  const opacity = interpolate(closeProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const sizes = {
    small: { width: 140, height: 100 },
    medium: { width: 180, height: 130 },
    large: { width: 220, height: 160 },
  };

  const { width, height } = sizes[size];

  // Typing cursor blink
  const cursorBlink = Math.sin(frame * 0.4) > 0;

  if (appearSpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 14,
        transform: `scale(${appearSpring * scale})`,
        opacity: appearSpring * opacity,
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        border: "1px solid #334155",
      }}
    >
      {/* Header with close button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #64748B, #475569)" }} />
          <span style={{ fontSize: 12, color: "#94A3B8", fontFamily: "system-ui" }}>Support</span>
        </div>
        {/* Close X button - highlighted when closing */}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            backgroundColor: closeProgress > 0 ? "#EF4444" : "#334155",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transform: closeProgress > 0 ? "scale(1.2)" : "scale(1)",
          }}
        >
          <span style={{ color: "white", fontSize: 14, fontWeight: "bold", lineHeight: 1 }}>×</span>
        </div>
      </div>

      {/* Chat messages */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ backgroundColor: "#334155", borderRadius: 8, padding: "6px 10px", alignSelf: "flex-start", maxWidth: "80%" }}>
          <span style={{ fontSize: 10, color: "#CBD5E1", fontFamily: "system-ui" }}>How can I help?</span>
        </div>
      </div>

      {/* Input field with typing cursor */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          right: 12,
          height: 28,
          backgroundColor: "#0F172A",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <span style={{ fontSize: 11, color: "#64748B", fontFamily: "system-ui" }}>Type a message</span>
        <span
          style={{
            width: 2,
            height: 14,
            backgroundColor: cursorBlink ? "#8B5CF6" : "transparent",
            marginLeft: 4,
          }}
        />
      </div>
    </div>
  );
};

// Microphone icon that fades in
const MicrophoneIcon: React.FC<{ progress: number; size?: number }> = ({ progress, size = 120 }) => {
  const glow = Math.sin(progress * Math.PI * 2) * 0.3 + 0.7;

  return (
    <div
      style={{
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.5, 1])})`,
        filter: `drop-shadow(0 0 ${40 * glow}px rgba(139, 92, 246, 0.6))`,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <defs>
          <linearGradient id="micGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#micGrad)" />
        <rect x="42" y="22" width="16" height="30" rx="8" fill="white" />
        <path
          d="M30 45V50C30 61.046 38.954 70 50 70C61.046 70 70 61.046 70 50V45"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M50 70V82M38 82H62" stroke="white" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export const Scene1TextChatSlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Chat bubbles appear in waves
  const chatBubbles = [
    { x: 80, y: 150, delay: 5, closeDelay: 70, size: "medium" as const },
    { x: 350, y: 80, delay: 12, closeDelay: 75, size: "small" as const },
    { x: 600, y: 200, delay: 8, closeDelay: 68, size: "large" as const },
    { x: 200, y: 400, delay: 18, closeDelay: 80, size: "medium" as const },
    { x: 750, y: 450, delay: 15, closeDelay: 72, size: "small" as const },
    { x: 450, y: 550, delay: 22, closeDelay: 78, size: "medium" as const },
    { x: 100, y: 700, delay: 10, closeDelay: 74, size: "large" as const },
    { x: 550, y: 750, delay: 25, closeDelay: 82, size: "small" as const },
    { x: 800, y: 650, delay: 20, closeDelay: 76, size: "medium" as const },
  ];

  // Text 1: "Text chat is slow." (appears at frame 30)
  const text1Spring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14 },
  });

  // Text 2: "Customers want to talk." (appears at frame 55)
  const text2Spring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14 },
  });

  // Text fade out (starts at frame 90)
  const textFadeOut = interpolate(frame, [90, 110], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Microphone icon appears (frame 100+)
  const micProgress = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Chat bubbles fade out collectively
  const chatFadeOut = interpolate(frame, [85, 105], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Background pulse
  const bgPulse = Math.sin(frame * 0.05) * 0.1 + 0.15;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0F",
        overflow: "hidden",
      }}
    >
      {/* Animated dark gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${50 + Math.sin(frame * 0.02) * 20}% ${50 + Math.cos(frame * 0.02) * 20}%, rgba(139, 92, 246, ${bgPulse}) 0%, transparent 50%)`,
        }}
      />

      {/* Grid of chat bubbles */}
      <div style={{ opacity: chatFadeOut }}>
        {chatBubbles.map((bubble, i) => (
          <ChatBubble
            key={i}
            x={bubble.x}
            y={bubble.y}
            delay={bubble.delay}
            closeDelay={bubble.closeDelay}
            frame={frame}
            fps={fps}
            size={bubble.size}
          />
        ))}
      </div>

      {/* Center text container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          opacity: textFadeOut,
        }}
      >
        {/* "Text chat is slow." */}
        <div
          style={{
            opacity: interpolate(text1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text1Spring, [0, 1], [50, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 85,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.03em",
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            }}
          >
            Text chat is{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #EF4444, #DC2626)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              slow.
            </span>
          </span>
        </div>

        {/* "Customers want to talk." */}
        <div
          style={{
            opacity: interpolate(text2Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text2Spring, [0, 1], [50, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 75,
              fontWeight: 700,
              color: "#CBD5E1",
              letterSpacing: "-0.02em",
            }}
          >
            Customers want to{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              talk.
            </span>
          </span>
        </div>
      </div>

      {/* Microphone icon fading in */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MicrophoneIcon progress={micProgress} size={160} />
      </div>
    </AbsoluteFill>
  );
};
