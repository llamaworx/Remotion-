import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// Platform icons
const WhatsAppIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const EmailIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#EA4335">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const SMSIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#34B7F1">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
    <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
  </svg>
);

const DiscordIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#5865F2">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const SlackIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/>
    <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
    <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"/>
    <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

const TelegramIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0088CC">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const AdBannerIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#F59E0B">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
    <path d="M7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z"/>
  </svg>
);

const QRCodeIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#64748B">
    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM17 17h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2z"/>
  </svg>
);

// Platform card component
const PlatformCard: React.FC<{
  icon: React.ReactNode;
  name: string;
  delay: number;
  frame: number;
  fps: number;
  x: number;
  y: number;
}> = ({ icon, name, delay, frame, fps, x, y }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const scale = interpolate(entrySpring, [0, 1], [0, 1]);
  const opacity = interpolate(entrySpring, [0, 1], [0, 1]);

  // Link indicator pulse
  const linkPulse = Math.sin((frame - delay) * 0.15) * 0.1 + 1;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          width: 160,
          height: 100,
          backgroundColor: "#1E293B",
          borderRadius: 16,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          border: "1px solid #334155",
        }}
      >
        {icon}
        <span style={{ fontFamily: "system-ui", fontSize: 18, color: "#94A3B8", fontWeight: 500 }}>
          {name}
        </span>
      </div>
      {/* Link indicator */}
      <div
        style={{
          position: "absolute",
          bottom: -8,
          left: "50%",
          transform: `translateX(-50%) scale(${linkPulse})`,
          width: 24,
          height: 24,
          backgroundColor: "#8B5CF6",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};

// Click and talk animation
const ClickToTalk: React.FC<{ frame: number; fps: number; startFrame: number }> = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  // Cursor appears and moves to button
  const cursorAppear = spring({
    frame: localFrame,
    fps,
    config: { damping: 12 },
  });

  // Click animation
  const clickFrame = 30;
  const isClicked = localFrame > clickFrame;
  const clickScale = isClicked
    ? interpolate(localFrame - clickFrame, [0, 5, 10], [1, 0.9, 1], { extrapolateRight: "clamp" })
    : 1;

  // Mic opens
  const micOpenSpring = spring({
    frame: localFrame - 45,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // Voice wave animation
  const waveActive = localFrame > 60;
  const waveOpacity = interpolate(localFrame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const micGlow = Math.sin(localFrame * 0.15) * 0.4 + 0.6;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
      }}
    >
      {/* Link button */}
      <div
        style={{
          backgroundColor: "#1E293B",
          borderRadius: 20,
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          transform: `scale(${clickScale})`,
          boxShadow: isClicked ? "0 0 30px rgba(139, 92, 246, 0.4)" : "0 10px 40px rgba(0,0,0,0.3)",
          border: `2px solid ${isClicked ? "#8B5CF6" : "#334155"}`,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: 30, color: "#8B5CF6" }}>
          bolka.ai/share/demo
        </span>
      </div>

      {/* Cursor */}
      <div
        style={{
          position: "absolute",
          top: cursorAppear > 0 ? interpolate(cursorAppear, [0, 1], [200, 45]) : 200,
          left: cursorAppear > 0 ? interpolate(cursorAppear, [0, 1], [300, 180]) : 300,
          opacity: interpolate(cursorAppear, [0, 1], [0, 1]),
          transform: isClicked ? "scale(0.8)" : "scale(1)",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
          <path d="M4 4l16 8-8 2-2 8z" fill="white" stroke="#000" strokeWidth="1"/>
        </svg>
      </div>

      {/* Mic widget opening */}
      {micOpenSpring > 0 && (
        <div
          style={{
            marginTop: 20,
            opacity: interpolate(micOpenSpring, [0, 1], [0, 1]),
            transform: `scale(${interpolate(micOpenSpring, [0, 1], [0.5, 1])})`,
          }}
        >
          <div
            style={{
              width: 350,
              backgroundColor: "#1E293B",
              borderRadius: 24,
              padding: 30,
              boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 ${50 * micGlow}px rgba(139, 92, 246, 0.3)`,
              border: "2px solid rgba(139, 92, 246, 0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* Mic icon */}
            <div
              style={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: `0 0 ${30 * micGlow}px rgba(139, 92, 246, 0.5)`,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
                <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Voice waveform */}
            <div
              style={{
                display: "flex",
                gap: 4,
                alignItems: "center",
                height: 40,
                opacity: waveOpacity,
              }}
            >
              {Array.from({ length: 20 }).map((_, i) => {
                const height = waveActive
                  ? 10 + Math.abs(Math.sin(frame * 0.2 + i * 0.4)) * 25
                  : 6;
                return (
                  <div
                    key={i}
                    style={{
                      width: 4,
                      height,
                      backgroundColor: "#8B5CF6",
                      borderRadius: 2,
                    }}
                  />
                );
              })}
            </div>

            <span style={{ fontFamily: "system-ui", fontSize: 24, color: "#94A3B8" }}>
              Listening...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const Scene4VoiceAILinks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Platform cards appear (0-150 frames)
  // Phase 2: Cards fade, click-to-talk demo (150-450 frames)
  const phase2Start = 150;

  // Platform cards fade out
  const cardsFadeOut = interpolate(frame, [phase2Start - 30, phase2Start], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text animations
  const text1Spring = spring({
    frame: frame - phase2Start - 80,
    fps,
    config: { damping: 14 },
  });

  const text2Spring = spring({
    frame: frame - phase2Start - 120,
    fps,
    config: { damping: 14 },
  });

  // Platform positions
  const platforms = [
    { icon: <WhatsAppIcon size={36} />, name: "WhatsApp", x: 100, y: 150, delay: 5 },
    { icon: <EmailIcon size={36} />, name: "Email", x: 320, y: 100, delay: 12 },
    { icon: <SMSIcon size={36} />, name: "SMS", x: 540, y: 180, delay: 8 },
    { icon: <DiscordIcon size={36} />, name: "Discord", x: 760, y: 120, delay: 18 },
    { icon: <SlackIcon size={36} />, name: "Slack", x: 150, y: 350, delay: 15 },
    { icon: <TelegramIcon size={36} />, name: "Telegram", x: 400, y: 400, delay: 22 },
    { icon: <AdBannerIcon size={36} />, name: "Ad Banner", x: 650, y: 380, delay: 10 },
    { icon: <QRCodeIcon size={36} />, name: "QR Code", x: 900, y: 300, delay: 25 },
  ];

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
          background: `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Phase 1: Platform cards */}
      <div style={{ opacity: cardsFadeOut }}>
        {platforms.map((platform, i) => (
          <PlatformCard
            key={i}
            icon={platform.icon}
            name={platform.name}
            delay={platform.delay}
            frame={frame}
            fps={fps}
            x={platform.x}
            y={platform.y}
          />
        ))}

        {/* Center link */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              width: 300,
              height: 120,
              background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)",
              opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              transform: `scale(${interpolate(frame, [30, 50], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "system-ui", fontSize: 20, fontWeight: 600, color: "white" }}>
              Voice AI Link
            </span>
          </div>
        </div>
      </div>

      {/* Phase 2: Click to talk demo */}
      {frame >= phase2Start && (
        <ClickToTalk frame={frame} fps={fps} startFrame={phase2Start} />
      )}

      {/* Text overlays */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {/* "Click. Talk. That's it." */}
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
              fontSize: 96,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
            }}
          >
            Click. Talk.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              That's it.
            </span>
          </span>
        </div>

        {/* "No app. No call. Just voice." */}
        <div
          style={{
            opacity: interpolate(text2Spring, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(text2Spring, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 48,
              fontWeight: 500,
              color: "#94A3B8",
            }}
          >
            No app. No call. Just voice.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
