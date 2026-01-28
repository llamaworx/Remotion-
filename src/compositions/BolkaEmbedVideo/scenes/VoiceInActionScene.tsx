import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Mic icon - MUCH LARGER
const MicIcon: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = "white" }) => (
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

// Dynamic waveform for voice conversation - MUCH LARGER
const ConversationWaveform: React.FC<{
  frame: number;
  isUser: boolean;
  intensity: number;
}> = ({ frame, isUser, intensity }) => {
  const bars = 18;
  const color = isUser ? "#3B82F6" : "#8B5CF6";

  return (
    <div
      style={{
        display: "flex",
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 85,
      }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const phase = isUser ? i * 0.4 : i * 0.3 + Math.PI;
        const baseHeight = 10;
        const waveHeight =
          baseHeight +
          Math.abs(Math.sin(frame * 0.25 + phase)) * 65 * intensity +
          Math.abs(Math.cos(frame * 0.15 + phase * 0.5)) * 30 * intensity;

        return (
          <div
            key={i}
            style={{
              width: 8,
              height: waveHeight,
              backgroundColor: color,
              borderRadius: 5,
              opacity: 0.7 + intensity * 0.3,
              boxShadow: intensity > 0.3 ? `0 0 15px ${color}` : "none",
            }}
          />
        );
      })}
    </div>
  );
};

// Circular audio visualizer - MUCH LARGER
const CircularVisualizer: React.FC<{ frame: number; active: boolean; isAI: boolean }> = ({
  frame,
  active,
  isAI,
}) => {
  const rings = 3;
  const baseColor = isAI ? "#8B5CF6" : "#3B82F6";

  return (
    <div style={{ position: "relative", width: 170, height: 170 }}>
      {Array.from({ length: rings }).map((_, i) => {
        const scale = active
          ? 1 + Math.sin(frame * 0.2 + i * 1.5) * 0.2 * (i + 1) * 0.3
          : 1;
        const opacity = active ? 0.4 - i * 0.1 : 0.1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 115 + i * 42,
              height: 115 + i * 42,
              borderRadius: "50%",
              border: `4px solid ${baseColor}`,
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
          width: 105,
          height: 105,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${baseColor} 0%, ${isAI ? "#6366F1" : "#1D4ED8"} 100%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: active ? `0 0 50px ${baseColor}` : "none",
        }}
      >
        <MicIcon size={48} />
      </div>
    </div>
  );
};

export const VoiceInActionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Conversation timing - SLOWER for better readability
  const userSpeaking = frame < 45;
  const aiSpeaking = frame >= 55 && frame < 100;

  const userIntensity = userSpeaking
    ? interpolate(frame, [0, 8, 38, 45], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  const aiIntensity = aiSpeaking
    ? interpolate(frame, [55, 62, 93, 100], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  // Widget scale animation
  const widgetSpring = spring({
    frame,
    fps,
    config: { damping: 18 },
  });

  // Text overlay - delayed more for reading
  const textOpacity = interpolate(frame, [95, 110], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textSlide = interpolate(frame, [95, 115], [50, 0], {
    extrapolateRight: "clamp",
  });

  // Zoom effect on tagline
  const taglineZoom = spring({
    frame: frame - 105,
    fps,
    config: { damping: 12 },
  });
  const taglineScale = interpolate(taglineZoom, [0, 1], [0.9, 1.02]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Ambient background glow - LARGER */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 850,
          height: 850,
          background: `radial-gradient(circle, ${
            userSpeaking ? "rgba(59, 130, 246, 0.2)" : "rgba(139, 92, 246, 0.2)"
          } 0%, transparent 70%)`,
          transition: "background 0.5s ease",
        }}
      />

      {/* Main conversation widget - MUCH LARGER */}
      <div
        style={{
          width: 920,
          background: "linear-gradient(180deg, #1E293B 0%, #0F172A 100%)",
          borderRadius: 42,
          padding: 60,
          boxShadow: "0 35px 120px rgba(0,0,0,0.55), 0 0 140px rgba(139, 92, 246, 0.15)",
          border: "3px solid rgba(139, 92, 246, 0.3)",
          transform: `scale(${widgetSpring})`,
        }}
      >
        {/* Conversation area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 42,
            marginBottom: 42,
          }}
        >
          {/* User message - LARGER */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 22,
              alignItems: "center",
              opacity: userSpeaking ? 1 : 0.5,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                backgroundColor: "#3B82F6",
                borderRadius: "30px 30px 8px 30px",
                padding: "24px 32px",
                maxWidth: 500,
              }}
            >
              {userSpeaking ? (
                <ConversationWaveform frame={frame} isUser={true} intensity={userIntensity} />
              ) : (
                <span style={{ fontFamily: "system-ui", fontSize: 28, color: "white" }}>
                  "How do I return my order?"
                </span>
              )}
            </div>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: "#3B82F6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 34 }}>👤</span>
            </div>
          </div>

          {/* AI Response - LARGER */}
          {frame >= 50 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 22,
                alignItems: "center",
                opacity: interpolate(frame, [50, 55], [0, 1], { extrapolateRight: "clamp" }),
              }}
            >
              <CircularVisualizer frame={frame} active={aiSpeaking} isAI={true} />
              <div
                style={{
                  backgroundColor: "#334155",
                  borderRadius: "30px 30px 30px 8px",
                  padding: "24px 32px",
                  maxWidth: 560,
                }}
              >
                {aiSpeaking ? (
                  <ConversationWaveform frame={frame} isUser={false} intensity={aiIntensity} />
                ) : (
                  <span style={{ fontFamily: "system-ui", fontSize: 28, color: "#E2E8F0" }}>
                    "I can help you with that! Let me walk you through the process..."
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status indicator - LARGER */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: userSpeaking ? "#3B82F6" : aiSpeaking ? "#8B5CF6" : "#10B981",
              boxShadow: `0 0 20px ${userSpeaking ? "#3B82F6" : aiSpeaking ? "#8B5CF6" : "#10B981"}`,
            }}
          />
          <span style={{ fontFamily: "system-ui", fontSize: 24, color: "#94A3B8" }}>
            {userSpeaking ? "Listening..." : aiSpeaking ? "Speaking..." : "Ready"}
          </span>
        </div>
      </div>

      {/* "Your website. Now it talks back." - MUCH BIGGER with ZOOM */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
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
            fontSize: 76,
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
              display: "inline-block",
              transform: `scale(${taglineScale})`,
            }}
          >
            Now it talks back.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};
