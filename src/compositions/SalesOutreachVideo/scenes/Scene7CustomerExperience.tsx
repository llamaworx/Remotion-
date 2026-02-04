import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Large conversation bubble for mobile
const ChatBubble: React.FC<{
  text: string;
  isCustomer: boolean;
  delay: number;
  frame: number;
  fps: number;
}> = ({ text, isCustomer, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (entrySpring <= 0) return null;

  const color = isCustomer ? "#8B5CF6" : "#06B6D4";

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(entrySpring, [0, 1], [20, 0])}px)`,
        display: "flex",
        justifyContent: isCustomer ? "flex-start" : "flex-end",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          backgroundColor: color,
          borderRadius: 20,
          borderBottomLeftRadius: isCustomer ? 6 : 20,
          borderBottomRightRadius: isCustomer ? 20 : 6,
          padding: "18px 24px",
          boxShadow: `0 8px 30px ${color}40`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 22,
            color: "white",
            lineHeight: 1.5,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

// Voice indicator
const VoiceIndicator: React.FC<{
  frame: number;
  isActive: boolean;
  color: string;
}> = ({ frame, isActive, color }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 3,
        alignItems: "center",
        height: 30,
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => {
        const height = isActive
          ? 6 + Math.abs(Math.sin(frame * 0.25 + i * 0.5)) * 18
          : 6;
        return (
          <div
            key={i}
            style={{
              width: 4,
              height,
              backgroundColor: color,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
};

export const Scene7CustomerExperience: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14 },
  });

  const textSpring = spring({
    frame: frame - 260,
    fps,
    config: { damping: 14 },
  });

  // Simplified conversation flow
  const conversations = [
    { text: "Is this available in my city?", isCustomer: true, delay: 30 },
    { text: "Yes! We serve 50+ cities worldwide including New York, London, and Singapore.", isCustomer: false, delay: 70 },
    { text: "What's the pricing?", isCustomer: true, delay: 120 },
    { text: "Plans start at $299/month. Want me to explain what's included?", isCustomer: false, delay: 160 },
    { text: "When can you call me?", isCustomer: true, delay: 210 },
    { text: "I can schedule right now! What time works for you today?", isCustomer: false, delay: 250 },
  ];

  const activeIndex = conversations.findIndex(
    (c, i) => frame >= c.delay && (i === conversations.length - 1 || frame < conversations[i + 1].delay)
  );

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
            radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 40%)
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
          padding: "60px 50px",
          gap: 20,
        }}
      >
        {/* Header with AI badge */}
        <div
          style={{
            opacity: interpolate(titleSpring, [0, 1], [0, 1]),
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              backgroundColor: "#06B6D420",
              border: "2px solid #06B6D4",
              borderRadius: 16,
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke="#06B6D4" strokeWidth="2" />
            </svg>
            <span style={{ fontFamily: "system-ui", fontSize: 20, fontWeight: 600, color: "#06B6D4" }}>
              Trained AI — Not a Recording
            </span>
          </div>
        </div>

        {/* Avatars row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          {/* Customer */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#8B5CF6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 10px 40px rgba(139, 92, 246, 0.4)",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </div>
            <span style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 600, color: "#8B5CF6" }}>
              Customer
            </span>
            <VoiceIndicator frame={frame} isActive={activeIndex >= 0 && conversations[activeIndex]?.isCustomer} color="#8B5CF6" />
          </div>

          {/* AI */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 10px 40px rgba(6, 182, 212, 0.4)",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.5 7.8 8.4 8.3 9.1C6.4 9.6 5 11.3 5 13.5C5 15.4 6 17 7.5 17.7V19C7.5 20.7 8.8 22 10.5 22H13.5C15.2 22 16.5 20.7 16.5 19V17.7C18 17 19 15.4 19 13.5C19 11.3 17.6 9.6 15.7 9.1C16.2 8.4 16.5 7.5 16.5 6.5C16.5 4 14.5 2 12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="10" cy="8" r="1.5" fill="white" />
                <circle cx="14" cy="8" r="1.5" fill="white" />
                <circle cx="12" cy="13" r="1.5" fill="white" />
              </svg>
            </div>
            <span style={{ fontFamily: "system-ui", fontSize: 18, fontWeight: 600, color: "#06B6D4" }}>
              Bolka AI
            </span>
            <VoiceIndicator frame={frame} isActive={activeIndex >= 0 && !conversations[activeIndex]?.isCustomer} color="#06B6D4" />
          </div>
        </div>

        {/* Conversation bubbles */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            overflow: "hidden",
          }}
        >
          {conversations.map((convo, i) => (
            <ChatBubble
              key={i}
              text={convo.text}
              isCustomer={convo.isCustomer}
              delay={convo.delay}
              frame={frame}
              fps={fps}
            />
          ))}
        </div>

        {/* Main text */}
        <div
          style={{
            textAlign: "center",
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 48,
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
              Natural.
            </span>{" "}
            <span style={{ color: "#F8FAFC" }}>Non-linear.</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
