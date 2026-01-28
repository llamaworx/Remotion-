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
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
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
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {dots.map((i) => (
        <div
          key={i}
          style={{
            width: 12,
            height: 12,
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
              [0, -6]
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

  // Website fade in (slower)
  const websiteOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Chat icon pulse
  const pulse = Math.sin(frame * 0.15);

  // Text typing animation - "How do I get started?" (slower typing)
  const typingText = "How do I get started?";
  const charsToShow = Math.floor(interpolate(frame, [20, 45], [0, typingText.length], {
    extrapolateRight: "clamp",
  }));

  // "So 2020" text fade (delayed and slower)
  const so2020Opacity = interpolate(frame, [50, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  // EXTINCT stamp slam (delayed for reading time)
  const stampProgress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  const stampScale = interpolate(stampProgress, [0, 1], [4, 1]);
  const stampRotation = interpolate(stampProgress, [0, 1], [-15, -12]);
  const stampOpacity = frame >= 70 ? 1 : 0;

  // Screen shake when stamp hits
  const shakeX = frame >= 70 && frame < 82
    ? Math.sin(frame * 2) * (82 - frame) * 0.6
    : 0;
  const shakeY = frame >= 70 && frame < 82
    ? Math.cos(frame * 2.5) * (82 - frame) * 0.6
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
      {/* Fake Website Browser - LARGER */}
      <div
        style={{
          width: 920,
          height: 580,
          backgroundColor: "#1F2937",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          opacity: websiteOpacity,
          position: "relative",
        }}
      >
        {/* Browser Chrome */}
        <div
          style={{
            height: 48,
            backgroundColor: "#374151",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            gap: 10,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <div
            style={{
              marginLeft: 25,
              flex: 1,
              height: 28,
              backgroundColor: "#1F2937",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              paddingLeft: 15,
              color: "#9CA3AF",
              fontSize: 14,
              fontFamily: "system-ui",
            }}
          >
            www.example-store.com
          </div>
        </div>

        {/* Website Content */}
        <div style={{ padding: 35, position: "relative", height: "calc(100% - 48px)" }}>
          {/* Fake website elements */}
          <div style={{ display: "flex", gap: 25, marginBottom: 30 }}>
            <div style={{ width: 90, height: 28, backgroundColor: "#374151", borderRadius: 6 }} />
            <div style={{ width: 70, height: 28, backgroundColor: "#374151", borderRadius: 6 }} />
            <div style={{ width: 80, height: 28, backgroundColor: "#374151", borderRadius: 6 }} />
          </div>

          <div style={{ width: "70%", height: 38, backgroundColor: "#374151", borderRadius: 8, marginBottom: 18 }} />
          <div style={{ width: "50%", height: 24, backgroundColor: "#2D3748", borderRadius: 6, marginBottom: 35 }} />

          <div style={{ display: "flex", gap: 25 }}>
            <div style={{ width: 220, height: 160, backgroundColor: "#374151", borderRadius: 12 }} />
            <div style={{ width: 220, height: 160, backgroundColor: "#374151", borderRadius: 12 }} />
            <div style={{ width: 220, height: 160, backgroundColor: "#374151", borderRadius: 12 }} />
          </div>

          {/* Chat Widget - Bottom Right - LARGER */}
          <div
            style={{
              position: "absolute",
              bottom: 25,
              right: 25,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 12,
            }}
          >
            {/* Chat bubble with user message - BIGGER */}
            {charsToShow > 0 && (
              <div
                style={{
                  backgroundColor: "#3B82F6",
                  color: "white",
                  padding: "14px 20px",
                  borderRadius: "22px 22px 6px 22px",
                  fontSize: 18,
                  fontFamily: "system-ui",
                  fontWeight: 500,
                  maxWidth: 260,
                }}
              >
                {typingText.slice(0, charsToShow)}
              </div>
            )}

            {/* Bot typing indicator - BIGGER */}
            {frame > 47 && (
              <div
                style={{
                  backgroundColor: "#374151",
                  padding: "16px 22px",
                  borderRadius: "22px 22px 22px 6px",
                  alignSelf: "flex-start",
                }}
              >
                <TypingDots frame={frame} />
              </div>
            )}

            {/* Chat icon - LARGER */}
            <div
              style={{
                width: 75,
                height: 75,
                backgroundColor: "#4B5563",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                transform: `scale(${1 + pulse * 0.05})`,
              }}
            >
              <ChatBotIcon pulse={pulse} />
            </div>
          </div>
        </div>
      </div>

      {/* "Text chatbots. So 2020." overlay - BIGGER FONTS */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: so2020Opacity,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 56,
            fontWeight: 700,
            color: "#9CA3AF",
            letterSpacing: "-0.02em",
          }}
        >
          Text chatbots.{" "}
          <span style={{ color: "#EF4444" }}>So 2020.</span>
        </span>
      </div>

      {/* EXTINCT Stamp - BIGGER */}
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
            border: "10px solid #DC2626",
            borderRadius: 16,
            padding: "20px 50px",
            backgroundColor: "rgba(220, 38, 38, 0.2)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 96,
              fontWeight: 900,
              color: "#DC2626",
              letterSpacing: "0.12em",
              textShadow: "0 0 30px rgba(220, 38, 38, 0.6)",
            }}
          >
            EXTINCT
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
