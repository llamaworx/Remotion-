import React from "react";
import { AbsoluteFill, Audio, Sequence } from "remotion";
import { Scene1TextChatSlow } from "./scenes/Scene1TextChatSlow";
import { Scene2EnterBolka } from "./scenes/Scene2EnterBolka";
import { Scene3TwoProducts } from "./scenes/Scene3TwoProducts";
import { Scene4VoiceAILinks } from "./scenes/Scene4VoiceAILinks";
import { Scene5NotRecorded } from "./scenes/Scene5NotRecorded";
import { Scene6NonLinear } from "./scenes/Scene6NonLinear";
import { Scene7WebsiteVoice } from "./scenes/Scene7WebsiteVoice";
import { Scene8SalesOutreach } from "./scenes/Scene8SalesOutreach";
import { Scene9Industries } from "./scenes/Scene9Industries";
import { Scene10AdsQR } from "./scenes/Scene10AdsQR";

export interface VoiceAIAnywhereVideoProps {
  musicUrl?: string;
  voiceOverUrl?: string;
}

export const VoiceAIAnywhereVideo: React.FC<VoiceAIAnywhereVideoProps> = ({
  musicUrl,
  voiceOverUrl,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: "#0A0A0F",
      }}
    >
      {/* Background Music */}
      {musicUrl && <Audio src={musicUrl} volume={0.4} />}

      {/* Voice Over */}
      {voiceOverUrl && <Audio src={voiceOverUrl} volume={1} />}

      {/* Scene 1: Text chat is slow (0-5s = 150 frames) */}
      {/* VO: "We built the internet to talk… and then forced everyone to type." */}
      <Sequence from={0} durationInFrames={150}>
        <Scene1TextChatSlow />
      </Sequence>

      {/* Scene 2: Enter Bolka (5-11s = 180 frames) */}
      {/* VO: "Meet Bolka — Voice AI that works anywhere… without phones, apps, or heavy infrastructure." */}
      <Sequence from={150} durationInFrames={180}>
        <Scene2EnterBolka />
      </Sequence>

      {/* Scene 3: Two Products (11-19s = 240 frames) */}
      {/* VO: "Two products. One revolution." */}
      <Sequence from={330} durationInFrames={240}>
        <Scene3TwoProducts />
      </Sequence>

      {/* Scene 4: Voice AI Links (19-34s = 450 frames) */}
      {/* VO: "Bolka Share gives you a Voice AI link. Just click and start talking — on any device, any browser." */}
      <Sequence from={570} durationInFrames={450}>
        <Scene4VoiceAILinks />
      </Sequence>

      {/* Scene 5: Not Recorded - It's Trained (34-44s = 300 frames) */}
      {/* VO: "This isn't a recorded message. It's trained on your product, your website, your data. It thinks. It responds. It adapts." */}
      <Sequence from={1020} durationInFrames={300}>
        <Scene5NotRecorded />
      </Sequence>

      {/* Scene 6: Non-Linear Conversations (44-54s = 300 frames) */}
      {/* VO: "Customers don't follow scripts. Bolka doesn't either." */}
      <Sequence from={1320} durationInFrames={300}>
        <Scene6NonLinear />
      </Sequence>

      {/* Scene 7: Website Voice AI / Bolka Embed (54-64s = 300 frames) */}
      {/* VO: "With Bolka Embed, every website gets its own voice. Text chatbots? They're already extinct." */}
      <Sequence from={1620} durationInFrames={300}>
        <Scene7WebsiteVoice />
      </Sequence>

      {/* Scene 8: Sales Outreach Use Case (64-79s = 450 frames) */}
      {/* VO: "For sales outreach, one voice link can handle thousands of conversations — qualifying leads in real time." */}
      <Sequence from={1920} durationInFrames={450}>
        <Scene8SalesOutreach />
      </Sequence>

      {/* Scene 9: Industries (79-94s = 450 frames) */}
      {/* VO: "From real estate to insurance, SaaS to healthcare — just share a Voice AI link and let it sell." */}
      <Sequence from={2370} durationInFrames={450}>
        <Scene9Industries />
      </Sequence>

      {/* Scene 10: Ads + QR (94-104s = 300 frames) */}
      {/* VO: "Your ads don't need landing pages anymore. Just scan and talk to an expert… powered by Bolka." */}
      <Sequence from={2820} durationInFrames={300}>
        <Scene10AdsQR />
      </Sequence>

      {/* More scenes will be added here */}
    </AbsoluteFill>
  );
};
