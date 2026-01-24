import { Composition, staticFile } from "remotion";
import { BolkaProductVideo } from "./compositions/BolkaProductVideo";
import { VoiceLinksVideo } from "./compositions/VoiceLinksVideo";

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
          // Add your music file to public/music.mp3 and uncomment below:
          // musicUrl: staticFile("music.mp3"),
        }}
      />

      {/* Voice Links Viral Video - Change useCase for daily videos */}
      <Composition
        id="VoiceLinksVideo"
        component={VoiceLinksVideo}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          useCase: {
            title: "Post-Purchase Product Support",
            industry: "E-Commerce",
            scenario: "Customer scans QR code on product packaging and instantly connects with AI support - no waiting, no forms, just talk.",
            benefit: "80% faster resolution, 24/7 availability",
          },
          // Add your music file to public/music.mp3 and uncomment below:
          // musicUrl: staticFile("music.mp3"),
        }}
      />
    </>
  );
};
