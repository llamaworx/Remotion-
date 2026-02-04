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

const AdBannerIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#F59E0B">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
    <path d="M7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z"/>
  </svg>
);

// Channel Card - mobile optimized
const ChannelCard: React.FC<{
  icon: React.ReactNode;
  name: string;
  color: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ icon, name, color, delay, frame, fps }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const localFrame = frame - delay;

  // Link sending animation
  const linkSent = localFrame > 40;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {/* Channel icon */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          backgroundColor: "#1E293B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: `2px solid ${color}40`,
          boxShadow: linkSent ? `0 0 15px ${color}40` : "0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        {icon}
      </div>

      {/* Channel name */}
      <span style={{ fontFamily: "system-ui", fontSize: 12, fontWeight: 600, color: "#94A3B8" }}>
        {name}
      </span>
    </div>
  );
};

// Central Voice Link hub - mobile optimized
const VoiceLinkHub: React.FC<{
  frame: number;
  fps: number;
}> = ({ frame, fps }) => {
  const entrySpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 60 },
  });

  const pulse = Math.sin(frame * 0.08) * 0.05 + 1;
  const glow = Math.sin(frame * 0.1) * 0.4 + 0.6;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        transform: `scale(${entrySpring * pulse})`,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: `0 0 ${40 * glow}px rgba(139, 92, 246, 0.5), 0 15px 40px rgba(0,0,0,0.3)`,
        }}
      >
        <svg width="45" height="45" viewBox="0 0 24 24" fill="white">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};

// Down Arrow
const DownArrow: React.FC<{
  delay: number;
  frame: number;
}> = ({ delay, frame }) => {
  const progress = interpolate(frame - delay, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (progress <= 0) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0", opacity: progress }}>
      <svg width="30" height="40" viewBox="0 0 40 50">
        <defs>
          <linearGradient id="arrowGradV6" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path d="M 20 5 L 20 35" stroke="url(#arrowGradV6)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 12 28 L 20 40 L 28 28" stroke="#06B6D4" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// User interaction demo - mobile optimized
const UserInteraction: React.FC<{
  frame: number;
  fps: number;
  delay: number;
}> = ({ frame, fps, delay }) => {
  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const localFrame = frame - delay;

  // Click animation
  const clickFrame = 40;
  const isClicked = localFrame > clickFrame;

  // Mic opens
  const micOpenSpring = spring({
    frame: localFrame - 60,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const waveActive = localFrame > 80;
  const micGlow = Math.sin(localFrame * 0.15) * 0.4 + 0.6;

  if (entrySpring <= 0) return null;

  return (
    <div
      style={{
        opacity: interpolate(entrySpring, [0, 1], [0, 1]),
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* User avatar */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: "#22C55E",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #1E293B",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        </div>

        <span style={{ fontFamily: "system-ui", fontSize: 14, fontWeight: 600, color: "#22C55E" }}>
          Customer
        </span>

        {/* Click action */}
        {localFrame > 20 && !isClicked && (
          <div
            style={{
              backgroundColor: "#8B5CF620",
              border: "2px solid #8B5CF6",
              borderRadius: 10,
              padding: "8px 16px",
            }}
          >
            <span style={{ fontFamily: "system-ui", fontSize: 12, color: "#8B5CF6" }}>
              Clicks link...
            </span>
          </div>
        )}

        {/* Mic widget */}
        {micOpenSpring > 0 && (
          <div
            style={{
              opacity: interpolate(micOpenSpring, [0, 1], [0, 1]),
              transform: `scale(${interpolate(micOpenSpring, [0, 1], [0.8, 1])})`,
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: "#1E293B",
                borderRadius: 16,
                padding: 16,
                boxShadow: `0 15px 40px rgba(0,0,0,0.4), 0 0 ${25 * micGlow}px rgba(139, 92, 246, 0.3)`,
                border: "2px solid rgba(139, 92, 246, 0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Mic icon */}
              <div
                style={{
                  width: 50,
                  height: 50,
                  background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 0 ${15 * micGlow}px rgba(139, 92, 246, 0.5)`,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="2" width="6" height="11" rx="3" fill="white" />
                  <path d="M5 10V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11V10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Voice waveform */}
              <div style={{ display: "flex", gap: 2, alignItems: "center", height: 24 }}>
                {Array.from({ length: 12 }).map((_, i) => {
                  const height = waveActive
                    ? 5 + Math.abs(Math.sin(frame * 0.2 + i * 0.5)) * 14
                    : 4;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 3,
                        height,
                        backgroundColor: "#8B5CF6",
                        borderRadius: 2,
                      }}
                    />
                  );
                })}
              </div>

              <span style={{ fontFamily: "system-ui", fontSize: 12, color: "#22C55E" }}>
                Speaking...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Scene6SalesFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text animation
  const textSpring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 14 },
  });

  const channels = [
    { icon: <WhatsAppIcon size={28} />, name: "WhatsApp", color: "#25D366", delay: 10 },
    { icon: <EmailIcon size={28} />, name: "Email", color: "#EA4335", delay: 25 },
    { icon: <SMSIcon size={28} />, name: "SMS", color: "#34B7F1", delay: 40 },
    { icon: <AdBannerIcon size={28} />, name: "Ad Banner", color: "#F59E0B", delay: 55 },
  ];

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
            radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 70%, rgba(34, 197, 94, 0.08) 0%, transparent 40%)
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
          alignItems: "center",
          padding: "50px 40px",
          gap: 16,
        }}
      >
        {/* Channel cards - 2x2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          {channels.map((channel, i) => (
            <ChannelCard
              key={i}
              icon={channel.icon}
              name={channel.name}
              color={channel.color}
              delay={channel.delay}
              frame={frame}
              fps={fps}
            />
          ))}
        </div>

        {/* Down Arrow */}
        <DownArrow delay={70} frame={frame} />

        {/* Central Voice Link hub */}
        <VoiceLinkHub frame={frame} fps={fps} />

        {/* Click Talk Qualify text */}
        <div
          style={{
            opacity: interpolate(textSpring, [0, 1], [0, 1]),
            display: "flex",
            gap: 16,
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 32,
              fontWeight: 800,
              color: "#8B5CF6",
              letterSpacing: "-0.02em",
            }}
          >
            Click.
          </span>
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 32,
              fontWeight: 800,
              color: "#06B6D4",
              letterSpacing: "-0.02em",
            }}
          >
            Talk.
          </span>
          <span
            style={{
              fontFamily: "system-ui",
              fontSize: 32,
              fontWeight: 800,
              color: "#22C55E",
              letterSpacing: "-0.02em",
            }}
          >
            Qualify.
          </span>
        </div>

        {/* Down Arrow to Customer */}
        <DownArrow delay={100} frame={frame} />

        {/* User interaction */}
        <UserInteraction frame={frame} fps={fps} delay={130} />
      </div>
    </AbsoluteFill>
  );
};
