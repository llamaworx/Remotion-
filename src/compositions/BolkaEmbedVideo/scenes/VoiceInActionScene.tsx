import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Mic icon
const MicIcon: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="9" y="2" width="6" height="11" rx="3" fill={color} />
    <path
      d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M12 18V22M8 22H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Dynamic waveform for voice conversation
const ConversationWaveform: React.FC<{
  frame: number;
  isUser: boolean;
  intensity: number;
}> = ({ frame, isUser, intensity }) => {
  const bars = 20;
  const color = isUser ? "#3B82F6" : "#8B5CF6";

  return (
    <div
      style={{
        display: "flex",
        gap: 3,
        alignItems: "center",
        justifyContent: "center",
        height: 60,
      }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const phase = isUser ? i * 0.4 : i * 0.3 + Math.PI;
        const baseHeight = 6;
        const waveHeight =
          baseHeight +
          Math.abs(Math.sin(frame * 0.25 + phase)) * 45 * intensity +
          Math.abs(Math.cos(frame * 0.15 + phase * 0.5)) * 20 * intensity;

        return (
          <div
            key={i}
            style={{
              width: 5,
              height: waveHeight,
              backgroundColor: color,
              borderRadius: 3,
              opacity: 0.7 + intensity * 0.3,
              boxShadow: intensity > 0.3 ? `0 0 10px ${color}` : "none",
            }}
          />
        );
      })}
    </div>
  );
};

// Circular audio visualizer
const CircularVisualizer: React.FC<{ frame: number; active: boolean; isAI: boolean }> = ({
  frame,
  active,
  isAI,
}) => {
  const rings = 3;
  const baseColor = isAI ? "#8B5CF6" : "#3B82F6";

  return (
    <div style={{ position: "relative", width: 120, height: 120 }}>
      {Array.from({ length: rings }).map((_, i) => {
        const scale = active
          ? 1 + Math.sin(frame * 0.2 + i * 1.5) * 0.15 * (i + 1) * 0.3
          : 1;
        const opacity = active ? 0.3 - i * 0.08 : 0.1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 80 + i * 30,
              height: 80 + i * 30,
              borderRadius: "50%",
              border: `2px solid ${baseColor}`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 70,
          height: 70,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${baseColor} 0%, ${isAI ? "#6366F1" : "#1D4ED8"} 100%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: active ? `0 0 30px ${baseColor}` : "none",
        }}
      >
        <MicIcon size={28} />
      </div>
    </div>
  );
};

export const VoiceInActionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Conversation timing
  // 0-40: User speaking
  // 40-50: Transition
  // 50-100: AI responding
  // 100-120: Text reveal

  const userSpeaking = frame < 40;
  const aiSpeaking = frame >= 50 && frame < 100;

  const userIntensity = userSpeaking
    ? interpolate(frame, [0, 5, 35, 40], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  const aiIntensity = aiSpeaking
    ? interpolate(frame, [50, 55, 95, 100], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  // Widget scale animation
  const widgetSpring = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  // Text overlay
  const textOpacity = interpolate(frame, [85, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textSlide = interpolate(frame, [85, 105], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${
            userSpeaking ? "rgba(59, 130, 246, 0.15)" : "rgba(139, 92, 246, 0.15)"
          } 0%, transparent 70%)`,
          transition: "background 0.5s ease",
        }}
      />

      {/* Main conversation widget */}
      <div
        style={{
          width: 700,
          background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
          borderRadius: 32,
          padding: 40,
          boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 100px rgba(139, 92, 246, 0.1)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          transform: `scale(${widgetSpring})`,
        }}
      >
        {/* Conversation area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
            marginBottom: 30,
          }}
        >
          {/* User message */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 15,
              alignItems: "center",
              opacity: userSpeaking ? 1 : 0.5,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                backgroundColor: "#3B82F6",
                borderRadius: "20px 20px 4px 20px",
                padding: "15px 20px",
                maxWidth: 350,
              }}
            >
              {userSpeaking ? (
                <ConversationWaveform frame={frame} isUser={true} intensity={userIntensity} />
              ) : (
                <span style={{ fontFamily: "system-ui", fontSize: 16, color: "white" }}>
                  "How do I return my order?"
                </span>
              )}
            </div>
            <div
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                backgroundColor: "#3B82F6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 20 }}>👤</span>
            </div>
          </div>

          {/* AI Response */}
          {frame >= 45 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 15,
                alignItems: "center",
                opacity: interpolate(frame, [45, 50], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <CircularVisualizer frame={frame} active={aiSpeaking} isAI={true} />
              <div
                style={{
                  backgroundColor: "#334155",
                  borderRadius: "20px 20px 20px 4px",
                  padding: "15px 20px",
                  maxWidth: 400,
                }}
              >
                {aiSpeaking ? (
                  <ConversationWaveform frame={frame} isUser={false} intensity={aiIntensity} />
                ) : (
                  <span style={{ fontFamily: "system-ui", fontSize: 16, color: "#E2E8F0" }}>
                    "I can help you with that! Let me walk you through the process..."
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: userSpeaking ? "#3B82F6" : aiSpeaking ? "#8B5CF6" : "#10B981",
              boxShadow: `0 0 10px ${userSpeaking ? "#3B82F6" : aiSpeaking ? "#8B5CF6" : "#10B981"}`,
            }}
          />
          <span style={{ fontFamily: "system-ui", fontSize: 14, color: "#94A3B8" }}>
            {userSpeaking ? "Listening..." : aiSpeaking ? "Speaking..." : "Ready"}
          </span>
        </div>
      </div>

      {/* "Your website. Now it talks back." */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: textOpacity,
          transform: `translateY(${textSlide}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 48,
            fontWeight: 700,
            color: "#F8FAFC",
            letterSpacing: "-0.02em",
          }}
        >
          Your website.{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Now it talks back.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
