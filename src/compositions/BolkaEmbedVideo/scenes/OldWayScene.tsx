import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Chat bubble icon for old chatbot
const ChatBotIcon: React.FC<{ pulse: number }> = ({ pulse }) => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="4"
      width="20"
      height="14"
      rx="3"
      fill="#6B7280"
      opacity={0.8 + pulse * 0.2}
    />
    <circle cx="8" cy="11" r="1.5" fill="#9CA3AF" />
    <circle cx="12" cy="11" r="1.5" fill="#9CA3AF" />
    <circle cx="16" cy="11" r="1.5" fill="#9CA3AF" />
    <path d="M6 18L10 14H6V18Z" fill="#6B7280" />
  </svg>
);

// Typing dots animation
const TypingDots: React.FC<{ frame: number }> = ({ frame }) => {
  const dots = [0, 1, 2];
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {dots.map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#9CA3AF",
            opacity: interpolate(
              Math.sin((frame * 0.3 + i * 1.5)),
              [-1, 1],
              [0.3, 1]
            ),
            transform: `translateY(${interpolate(
              Math.sin((frame * 0.3 + i * 1.5)),
              [-1, 1],
              [0, -4]
            )}px)`,
          }}
        />
      ))}
    </div>
  );
};

export const OldWayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Website fade in
  const websiteOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Chat icon pulse
  const pulse = Math.sin(frame * 0.15);

  // Text typing animation - "How do I get started?"
  const typingText = "How do I get started?";
  const charsToShow = Math.floor(interpolate(frame, [15, 40], [0, typingText.length], {
    extrapolateRight: "clamp",
  }));

  // "So 2020" text fade
  const so2020Opacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  // EXTINCT stamp slam
  const stampProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  const stampScale = interpolate(stampProgress, [0, 1], [3, 1]);
  const stampRotation = interpolate(stampProgress, [0, 1], [-15, -12]);
  const stampOpacity = frame >= 60 ? 1 : 0;

  // Screen shake when stamp hits
  const shakeX = frame >= 60 && frame < 70
    ? Math.sin(frame * 2) * (70 - frame) * 0.5
    : 0;
  const shakeY = frame >= 60 && frame < 70
    ? Math.cos(frame * 2.5) * (70 - frame) * 0.5
    : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#111827",
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Fake Website Browser */}
      <div
        style={{
          width: 850,
          height: 550,
          backgroundColor: "#1F2937",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          opacity: websiteOpacity,
          position: "relative",
        }}
      >
        {/* Browser Chrome */}
        <div
          style={{
            height: 40,
            backgroundColor: "#374151",
            display: "flex",
            alignItems: "center",
            padding: "0 15px",
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <div
            style={{
              marginLeft: 20,
              flex: 1,
              height: 24,
              backgroundColor: "#1F2937",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              paddingLeft: 12,
              color: "#9CA3AF",
              fontSize: 12,
              fontFamily: "system-ui",
            }}
          >
            www.example-store.com
          </div>
        </div>

        {/* Website Content */}
        <div style={{ padding: 30, position: "relative", height: "calc(100% - 40px)" }}>
          {/* Fake website elements */}
          <div style={{ display: "flex", gap: 20, marginBottom: 25 }}>
            <div style={{ width: 80, height: 24, backgroundColor: "#374151", borderRadius: 4 }} />
            <div style={{ width: 60, height: 24, backgroundColor: "#374151", borderRadius: 4 }} />
            <div style={{ width: 70, height: 24, backgroundColor: "#374151", borderRadius: 4 }} />
          </div>

          <div style={{ width: "70%", height: 32, backgroundColor: "#374151", borderRadius: 6, marginBottom: 15 }} />
          <div style={{ width: "50%", height: 20, backgroundColor: "#2D3748", borderRadius: 4, marginBottom: 30 }} />

          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ width: 200, height: 150, backgroundColor: "#374151", borderRadius: 8 }} />
            <div style={{ width: 200, height: 150, backgroundColor: "#374151", borderRadius: 8 }} />
            <div style={{ width: 200, height: 150, backgroundColor: "#374151", borderRadius: 8 }} />
          </div>

          {/* Chat Widget - Bottom Right */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            {/* Chat bubble with user message */}
            {charsToShow > 0 && (
              <div
                style={{
                  backgroundColor: "#3B82F6",
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "18px 18px 4px 18px",
                  fontSize: 14,
                  fontFamily: "system-ui",
                  maxWidth: 200,
                }}
              >
                {typingText.slice(0, charsToShow)}
              </div>
            )}

            {/* Bot typing indicator */}
            {frame > 42 && (
              <div
                style={{
                  backgroundColor: "#374151",
                  padding: "12px 18px",
                  borderRadius: "18px 18px 18px 4px",
                  alignSelf: "flex-start",
                }}
              >
                <TypingDots frame={frame} />
              </div>
            )}

            {/* Chat icon */}
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#4B5563",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                transform: `scale(${1 + pulse * 0.05})`,
              }}
            >
              <ChatBotIcon pulse={pulse} />
            </div>
          </div>
        </div>
      </div>

      {/* "Text chatbots. So 2020." overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: so2020Opacity,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 42,
            fontWeight: 700,
            color: "#9CA3AF",
            letterSpacing: "-0.02em",
          }}
        >
          Text chatbots.{" "}
          <span style={{ color: "#EF4444" }}>So 2020.</span>
        </span>
      </div>

      {/* EXTINCT Stamp */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${stampScale}) rotate(${stampRotation}deg)`,
          opacity: stampOpacity,
        }}
      >
        <div
          style={{
            border: "8px solid #DC2626",
            borderRadius: 12,
            padding: "15px 40px",
            backgroundColor: "rgba(220, 38, 38, 0.15)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 72,
              fontWeight: 900,
              color: "#DC2626",
              letterSpacing: "0.1em",
              textShadow: "0 0 20px rgba(220, 38, 38, 0.5)",
            }}
          >
            EXTINCT
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
