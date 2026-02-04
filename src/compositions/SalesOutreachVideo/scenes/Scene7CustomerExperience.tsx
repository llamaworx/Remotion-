import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Conversation bubble - mobile optimized
const ConversationBubble: React.FC<{
  text: string;
  isUser: boolean;
  delay: number;
  frame: number;
  fps: number;
}> = ({ text, isUser, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  if (entrySpring <= 0) return null;

  // Customer messages on LEFT (flex-start), AI messages on RIGHT (flex-end)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-start" : "flex-end",
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(entrySpring, [0, 1], [15, 0])}px)`,
      }}
    >
      <div
        style={{
          maxWidth: "85%",
          backgroundColor: isUser ? "#8B5CF6" : "#0E7490",
          borderRadius: 16,
          borderBottomLeftRadius: isUser ? 4 : 16,
          borderBottomRightRadius: isUser ? 16 : 4,
          padding: "10px 14px",
          boxShadow: isUser
            ? "0 6px 20px rgba(139, 92, 246, 0.3)"
            : "0 6px 20px rgba(6, 182, 212, 0.3)",
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 15,
            color: "white",
            lineHeight: 1.4,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

// Voice waveform indicator - mobile optimized
const VoiceIndicator: React.FC<{
  frame: number;
  isActive: boolean;
  isUser: boolean;
}> = ({ frame, isActive, isUser }) => {
  if (!isActive) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        height: 20,
        padding: "0 8px",
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => {
        const height = isActive
          ? 3 + Math.abs(Math.sin(frame * 0.25 + i * 0.5)) * 12
          : 3;
        return (
          <div
            key={i}
            style={{
              width: 3,
              height,
              backgroundColor: isUser ? "#8B5CF6" : "#06B6D4",
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
};

// AI Brain visualization - mobile optimized
const AIBrain: React.FC<{
  frame: number;
  isProcessing: boolean;
}> = ({ frame, isProcessing }) => {
  const pulse = isProcessing ? Math.sin(frame * 0.15) * 0.1 + 1 : 1;
  const glow = isProcessing ? Math.sin(frame * 0.12) * 0.5 + 0.5 : 0.3;

  return (
    <div
      style={{
        width: 70,
        height: 70,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${pulse})`,
        boxShadow: `0 0 ${30 * glow}px rgba(6, 182, 212, 0.5), 0 10px 30px rgba(0,0,0,0.3)`,
      }}
    >
      <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
        {/* Brain icon */}
        <path
          d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.5 7.8 8.4 8.3 9.1C6.4 9.6 5 11.3 5 13.5C5 15.4 6 17 7.5 17.7V19C7.5 20.7 8.8 22 10.5 22H13.5C15.2 22 16.5 20.7 16.5 19V17.7C18 17 19 15.4 19 13.5C19 11.3 17.6 9.6 15.7 9.1C16.2 8.4 16.5 7.5 16.5 6.5C16.5 4 14.5 2 12 2Z"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        {/* Neural connections */}
        <circle cx="10" cy="8" r="1.5" fill="white" />
        <circle cx="14" cy="8" r="1.5" fill="white" />
        <circle cx="12" cy="13" r="1.5" fill="white" />
        <line x1="10" y1="8" x2="12" y2="13" stroke="white" strokeWidth="1" />
        <line x1="14" y1="8" x2="12" y2="13" stroke="white" strokeWidth="1" />
      </svg>
    </div>
  );
};

// Response time indicator - mobile optimized
const ResponseTime: React.FC<{
  delay: number;
  frame: number;
  fps: number;
}> = ({ delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
        display: "flex",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#22C55E20",
        border: "1px solid #22C55E",
        borderRadius: 16,
        padding: "4px 10px",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span style={{ fontFamily: "system-ui", fontSize: 11, fontWeight: 600, color: "#22C55E" }}>
        Instant Response
      </span>
    </div>
  );
};

export const Scene7CustomerExperience: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Conversation flow
  const conversations = [
    { text: "Is this available in my city?", isUser: true, delay: 20 },
    { text: "Yes! We're available in New York, London, Sydney, Singapore, and 50+ cities worldwide.", isUser: false, delay: 55 },
    { text: "What's the price?", isUser: true, delay: 100 },
    { text: "Our plans start at $299/month. Would you like me to explain what's included?", isUser: false, delay: 135 },
    { text: "When can you call me?", isUser: true, delay: 180 },
    { text: "I can schedule a call right now! What time works best for you today?", isUser: false, delay: 215 },
  ];

  // Determine which conversation is active
  const activeConvoIndex = conversations.findIndex(
    (c, i) => frame >= c.delay && (i === conversations.length - 1 || frame < conversations[i + 1].delay)
  );

  const isAIProcessing = activeConvoIndex >= 0 && !conversations[activeConvoIndex].isUser;

  // Text animations
  const textSpring = spring({
    frame: frame - 250,
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
            radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 40%)
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
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "50px 30px",
        }}
      >
        {/* "Not a recording" badge */}
        <div
          style={{
            alignSelf: "center",
            opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            marginBottom: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#0F172A",
              border: "2px solid #06B6D4",
              borderRadius: 10,
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" stroke="#06B6D4" strokeWidth="2" />
            </svg>
            <span style={{ fontFamily: "system-ui", fontSize: 13, fontWeight: 600, color: "#06B6D4" }}>
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
            marginBottom: 16,
          }}
        >
          {/* Customer avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#8B5CF6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 8px 25px rgba(139, 92, 246, 0.3)",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </div>
            <span style={{ fontFamily: "system-ui", fontSize: 12, fontWeight: 600, color: "#8B5CF6" }}>
              Customer
            </span>
            <VoiceIndicator
              frame={frame}
              isActive={activeConvoIndex >= 0 && conversations[activeConvoIndex]?.isUser}
              isUser={true}
            />
          </div>

          {/* AI avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <AIBrain frame={frame} isProcessing={isAIProcessing} />
            <span style={{ fontFamily: "system-ui", fontSize: 12, fontWeight: 600, color: "#06B6D4" }}>
              Bolka AI
            </span>
            <VoiceIndicator
              frame={frame}
              isActive={activeConvoIndex >= 0 && !conversations[activeConvoIndex]?.isUser}
              isUser={false}
            />
            <ResponseTime delay={60} frame={frame} fps={fps} />
          </div>
        </div>

        {/* Conversation area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            overflow: "visible",
          }}
        >
          {conversations.map((convo, i) => (
            <ConversationBubble
              key={i}
              text={convo.text}
              isUser={convo.isUser}
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
            marginTop: "auto",
            paddingTop: 20,
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 44,
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
