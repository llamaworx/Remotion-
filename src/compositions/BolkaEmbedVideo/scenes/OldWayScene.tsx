import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Chat bubble icon for old chatbot - MUCH BIGGER
const ChatBotIcon: React.FC<{ pulse: number }> = ({ pulse }) => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
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

// Typing dots animation - BIGGER
const TypingDots: React.FC<{ frame: number }> = ({ frame }) => {
  const dots = [0, 1, 2];
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      {dots.map((i) => (
        <div
          key={i}
          style={{
            width: 18,
            height: 18,
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
              [0, -8]
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
    ? Math.sin(frame * 2) * (82 - frame) * 0.8
    : 0;
  const shakeY = frame >= 70 && frame < 82
    ? Math.cos(frame * 2.5) * (82 - frame) * 0.8
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
      {/* Fake Website Browser - MUCH BIGGER */}
      <div
        style={{
          width: 950,
          height: 620,
          backgroundColor: "#1F2937",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
          opacity: websiteOpacity,
          position: "relative",
        }}
      >
        {/* Browser Chrome */}
        <div
          style={{
            height: 55,
            backgroundColor: "#374151",
            display: "flex",
            alignItems: "center",
            padding: "0 22px",
            gap: 12,
          }}
        >
          <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#EF4444" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#10B981" }} />
          <div
            style={{
              marginLeft: 30,
              flex: 1,
              height: 34,
              backgroundColor: "#1F2937",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              paddingLeft: 18,
              color: "#9CA3AF",
              fontSize: 18,
              fontFamily: "system-ui",
            }}
          >
            www.example-store.com
          </div>
        </div>

        {/* Website Content */}
        <div style={{ padding: 40, position: "relative", height: "calc(100% - 55px)" }}>
          {/* Fake website elements */}
          <div style={{ display: "flex", gap: 30, marginBottom: 35 }}>
            <div style={{ width: 110, height: 34, backgroundColor: "#374151", borderRadius: 8 }} />
            <div style={{ width: 85, height: 34, backgroundColor: "#374151", borderRadius: 8 }} />
            <div style={{ width: 95, height: 34, backgroundColor: "#374151", borderRadius: 8 }} />
          </div>

          <div style={{ width: "70%", height: 45, backgroundColor: "#374151", borderRadius: 10, marginBottom: 22 }} />
          <div style={{ width: "50%", height: 30, backgroundColor: "#2D3748", borderRadius: 8, marginBottom: 40 }} />

          <div style={{ display: "flex", gap: 30 }}>
            <div style={{ width: 240, height: 180, backgroundColor: "#374151", borderRadius: 16 }} />
            <div style={{ width: 240, height: 180, backgroundColor: "#374151", borderRadius: 16 }} />
            <div style={{ width: 240, height: 180, backgroundColor: "#374151", borderRadius: 16 }} />
          </div>

          {/* Chat Widget - Bottom Right - MUCH LARGER */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              right: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 16,
            }}
          >
            {/* Chat bubble with user message - MUCH BIGGER */}
            {charsToShow > 0 && (
              <div
                style={{
                  backgroundColor: "#3B82F6",
                  color: "white",
                  padding: "20px 28px",
                  borderRadius: "28px 28px 8px 28px",
                  fontSize: 26,
                  fontFamily: "system-ui",
                  fontWeight: 500,
                  maxWidth: 320,
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
                  padding: "22px 30px",
                  borderRadius: "28px 28px 28px 8px",
                  alignSelf: "flex-start",
                }}
              >
                <TypingDots frame={frame} />
              </div>
            )}

            {/* Chat icon - MUCH LARGER */}
            <div
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#4B5563",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                transform: `scale(${1 + pulse * 0.05})`,
              }}
            >
              <ChatBotIcon pulse={pulse} />
            </div>
          </div>
        </div>
      </div>

      {/* "Text chatbots. So 2020." overlay - MUCH BIGGER FONTS */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: so2020Opacity,
        }}
      >
        <span
          style={{
            fontFamily: "system-ui",
            fontSize: 78,
            fontWeight: 700,
            color: "#9CA3AF",
            letterSpacing: "-0.02em",
          }}
        >
          Text chatbots.{" "}
          <span style={{ color: "#EF4444" }}>So 2020.</span>
        </span>
      </div>

      {/* EXTINCT Stamp - MUCH BIGGER */}
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
            border: "14px solid #DC2626",
            borderRadius: 20,
            padding: "28px 65px",
            backgroundColor: "rgba(220, 38, 38, 0.25)",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 140,
              fontWeight: 900,
              color: "#DC2626",
              letterSpacing: "0.12em",
              textShadow: "0 0 50px rgba(220, 38, 38, 0.7)",
            }}
          >
            EXTINCT
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
