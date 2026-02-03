import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Conversation node component
const ConversationNode: React.FC<{
  x: number;
  y: number;
  text: string;
  isUser: boolean;
  delay: number;
  frame: number;
  fps: number;
  isActive?: boolean;
}> = ({ x, y, text, isUser, delay, frame, fps, isActive = false }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const pulse = isActive ? Math.sin(frame * 0.15) * 0.05 + 1 : 1;
  const glow = isActive ? Math.sin(frame * 0.12) * 0.3 + 0.7 : 0;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${entrySpring * pulse})`,
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
      }}
    >
      <div
        style={{
          backgroundColor: isUser ? "#1E3A5F" : "#2D1B4E",
          borderRadius: 16,
          padding: "12px 20px",
          maxWidth: 200,
          border: `2px solid ${isUser ? "#3B82F6" : "#8B5CF6"}`,
          boxShadow: isActive
            ? `0 0 ${30 * glow}px ${isUser ? "rgba(59, 130, 246, 0.5)" : "rgba(139, 92, 246, 0.5)"}`
            : "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: isUser ? "#3B82F6" : "#8B5CF6",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isUser ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <rect x="9" y="2" width="6" height="8" rx="3" />
                <path d="M5 10v1c0 3.87 3.13 7 7 7s7-3.13 7-7v-1" strokeWidth="2" stroke="white" fill="none" />
              </svg>
            )}
          </div>
          <span style={{ fontFamily: "system-ui", fontSize: 11, color: "#94A3B8" }}>
            {isUser ? "Customer" : "Bolka AI"}
          </span>
        </div>
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 18,
            color: "#E2E8F0",
            lineHeight: 1.4,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

// Branch line component
const BranchLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  frame: number;
  color: string;
}> = ({ x1, y1, x2, y2, delay, frame, color }) => {
  const progress = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (progress <= 0) return null;

  // Calculate control point for curved line
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const controlX = midX + (y2 - y1) * 0.2;
  const controlY = midY;

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>
        <linearGradient id={`lineGrad-${x1}-${y1}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d={`M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`}
        stroke={`url(#lineGrad-${x1}-${y1})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray={`${progress * 200} 200`}
        opacity={0.6}
      />
    </svg>
  );
};

// Random question bubble floating in
const FloatingQuestion: React.FC<{
  text: string;
  x: number;
  y: number;
  delay: number;
  frame: number;
  fps: number;
}> = ({ text, x, y, delay, frame, fps }) => {
  const localFrame = frame - delay;
  if (localFrame < 0 || localFrame > 80) return null;

  const progress = interpolate(localFrame, [0, 20, 60, 80], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const floatY = Math.sin(localFrame * 0.1) * 5;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + floatY,
        transform: "translate(-50%, -50%)",
        opacity: progress,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          border: "1px solid rgba(59, 130, 246, 0.4)",
          borderRadius: 20,
          padding: "8px 16px",
        }}
      >
        <span style={{ fontFamily: "system-ui", fontSize: 22, color: "#93C5FD" }}>
          "{text}"
        </span>
      </div>
    </div>
  );
};

export const Scene6NonLinear: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Conversation tree structure
  const conversations = [
    // Root
    { x: 960, y: 200, text: "Hi, I need help", isUser: true, delay: 5 },
    { x: 960, y: 300, text: "Of course! What can I help with?", isUser: false, delay: 20 },

    // Branch 1 - Pricing
    { x: 600, y: 420, text: "What's the pricing?", isUser: true, delay: 45 },
    { x: 600, y: 530, text: "Plans start at $29/mo with unlimited calls", isUser: false, delay: 65 },

    // Branch 2 - Features
    { x: 960, y: 420, text: "Can it handle returns?", isUser: true, delay: 55 },
    { x: 960, y: 530, text: "Yes! I can process returns, check status, and more", isUser: false, delay: 75 },

    // Branch 3 - Integration
    { x: 1320, y: 420, text: "Does it work with Shopify?", isUser: true, delay: 50 },
    { x: 1320, y: 530, text: "Fully integrated! Setup takes 5 minutes", isUser: false, delay: 70 },

    // Sub-branches
    { x: 500, y: 650, text: "Any discounts?", isUser: true, delay: 100 },
    { x: 1100, y: 650, text: "What about refunds?", isUser: true, delay: 110 },
    { x: 1400, y: 650, text: "WooCommerce too?", isUser: true, delay: 105 },
  ];

  // Branch lines
  const branches = [
    { x1: 960, y1: 320, x2: 600, y2: 400, delay: 35, color: "#3B82F6" },
    { x1: 960, y1: 320, x2: 960, y2: 400, delay: 40, color: "#3B82F6" },
    { x1: 960, y1: 320, x2: 1320, y2: 400, delay: 38, color: "#3B82F6" },
    { x1: 600, y1: 550, x2: 500, y2: 630, delay: 90, color: "#8B5CF6" },
    { x1: 960, y1: 550, x2: 1100, y2: 630, delay: 95, color: "#8B5CF6" },
    { x1: 1320, y1: 550, x2: 1400, y2: 630, delay: 92, color: "#8B5CF6" },
  ];

  // Floating random questions
  const randomQuestions = [
    { text: "What's your return policy?", x: 200, y: 300, delay: 130 },
    { text: "Do you ship to Canada?", x: 1700, y: 250, delay: 145 },
    { text: "Can I change my order?", x: 250, y: 550, delay: 160 },
    { text: "Is there a warranty?", x: 1650, y: 480, delay: 175 },
    { text: "How do I track my package?", x: 180, y: 700, delay: 190 },
  ];

  // Determine active conversation node
  const activeIndex = Math.floor((frame - 20) / 25) % conversations.length;

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
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Grid pattern background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Branch lines */}
      {branches.map((branch, i) => (
        <BranchLine
          key={i}
          x1={branch.x1}
          y1={branch.y1}
          x2={branch.x2}
          y2={branch.y2}
          delay={branch.delay}
          frame={frame}
          color={branch.color}
        />
      ))}

      {/* Conversation nodes */}
      {conversations.map((conv, i) => (
        <ConversationNode
          key={i}
          x={conv.x}
          y={conv.y}
          text={conv.text}
          isUser={conv.isUser}
          delay={conv.delay}
          frame={frame}
          fps={fps}
          isActive={i === activeIndex && frame > 50}
        />
      ))}

      {/* Floating random questions */}
      {randomQuestions.map((q, i) => (
        <FloatingQuestion
          key={i}
          text={q.text}
          x={q.x}
          y={q.y}
          delay={q.delay}
          frame={frame}
          fps={fps}
        />
      ))}

      {/* Text overlays */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {/* "Real conversations." */}
        <div
          style={{
            opacity: interpolate(text1Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text1Spring, [0, 1], [40, 0])}px)`,
            marginBottom: 20,
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
            Real{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              conversations.
            </span>
          </span>
        </div>

        {/* "Not scripts." */}
        <div
          style={{
            opacity: interpolate(text2Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text2Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 68,
              fontWeight: 600,
              color: "#94A3B8",
            }}
          >
            Not{" "}
            <span
              style={{
                textDecoration: "line-through",
                color: "#64748B",
              }}
            >
              scripts.
            </span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
