import React from "react";
import { Composition, staticFile } from "remotion";
import { BolkaProductVideo } from "./compositions/BolkaProductVideo";
import { VoiceLinksVideo } from "./compositions/VoiceLinksVideo";
import { BolkaEmbedVideo } from "./compositions/BolkaEmbedVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BolkaProductVideo"
        component={BolkaProductVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          brandName: "Bolka",
          tagline: "Voice AI, Deployed Your Way",
          features: [
            "Natural Voice Conversations",
            "Flexible Deployment Options",
            "Enterprise-Grade Security",
            "Seamless Integration",
          ],
          // Add your music file to public/music.mp3
          musicUrl: staticFile("music.mp3"),
        }}
      />

      {/* Voice Links Viral Video - Mobile Friendly */}
      <Composition
        id="VoiceLinksVideo"
        component={VoiceLinksVideo}
        durationInFrames={1470}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          useCase: {
            title: "Post-Purchase Product Support",
            industry: "E-Commerce",
            scenario: "Customer scans QR code on product packaging and instantly connects with AI support - no waiting, no forms, just talk.",
            benefit: "80% faster resolution, 24/7 availability",
          },
          // Add your music file to public/music.mp3
          musicUrl: staticFile("music.mp3"),
        }}
      />

      {/* Bolka Embed - Social Media Promo (25s) */}
      <Composition
        id="BolkaEmbedVideo"
        component={BolkaEmbedVideo}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          // Add your music file to public/music.mp3
          musicUrl: staticFile("music.mp3"),
          // Voice Over: Add audio files to public/voiceover/ folder
          // Generate using ElevenLabs, Play.ht, or record yourself
          voiceOver: {
            scene1: staticFile("voiceover/scene1.mp3"), // "Text chatbots. So 2020. Extinct."
            scene2: staticFile("voiceover/scene2.mp3"), // "Meet Bolka Embed."
            scene3: staticFile("voiceover/scene3.mp3"), // "Text plus voice. Your choice."
            scene4: staticFile("voiceover/scene4.mp3"), // "World's first Voice AI Widget. Talk or type. One widget."
            scene5: staticFile("voiceover/scene5.mp3"), // "Your website. Now it talks back."
            scene6: staticFile("voiceover/scene6.mp3"), // "The world moved to 2030. In 2026. Voice AI, Deployed Your Way. Bolka dot AI."
          },
        }}
      />
    </>
  );
};
