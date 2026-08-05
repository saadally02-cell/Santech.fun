import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
app.use(express.json());
const PORT = 3000;

// Lazy initialization for Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check API
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "SANTECH TZ Server" });
});

// 2. SANTECH Swahili AI Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Ujumbe unahitajika" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is missing
      return res.json({
        reply: `[SANTECH AI]: Habari! Nina msaidizi wa SANTECH TZ. Kwa sasa mfumo unafanya kazi katika mfumo wa majaribio. Kuhusu swali lako: "${message}", tunapendekeza usome makala zetu za Akili Bandia na Kazi Mtandaoni au utembelee sehemu ya Video Downloader!`,
      });
    }

    const systemInstruction = `Wewe ni SANTECH AI Assistant, msaidizi rasmi wa kidijitali wa mtandao wa SANTECH TZ (Teknolojia, Akili Bandia, Kazi Mtandaoni, Fedha za Kidijitali na Utalii wa Tanzania).
Jibu maswali ya watumiaji kwa Kiswahili fasaha, kizuri, chenye heshima na motisha. 
Uwe na uelewa wa:
- Akili Bandia (Gemini, ChatGPT, Machine Learning, Automation).
- Kazi za mtandaoni Tanzania (Freelancing, Upwork, Fiverr, Remote Jobs).
- Fedha za kidijitali na Crypto (Bitcoin, Usalama wa fedha).
- Utalii wa Tanzania (Serengeti, Zanzibar, Ngorongoro, Kilimanjaro, Mafia Island, Pemba, Tarangire).
- Zana za kidijitali (SANTECH Video Downloader, Software, Coding).
Weka majibu yako tayari kwa usomaji mzuri ukitumia vipengele kama msisitizo au orodha. Wakati wote kuwa mwenye msaada kwa watumiaji wa Tanzania na Afrika Mashariki.`;

    const promptText = `
Mtumiaji anauliza: ${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Samahani, sijafanikiwa kupata jibu sahihi kwa sasa. Tafadhali jaribu tena.";
    return res.json({ reply });
  } catch (err: any) {
    console.error("AI Assistant Error:", err);
    return res.status(500).json({
      error: "Imefeli kuwasiliana na msaidizi wa AI.",
      reply: "Kutokana na changamoto ya kiufundi, jaribu tena baadaye au vinjari makala zetu za Utalii na Teknolojia.",
    });
  }
});

// 3. SANTECH Video Link Inspector API
app.post("/api/video-info", (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Weka URL halali ya video" });
  }

  let platform = "Video Link";
  let title = "Video ya Mtandaoni";
  let thumbnail = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80";

  const cleanUrl = url.trim().toLowerCase();
  if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
    platform = "YouTube";
    title = "YouTube Video Stream - HD 1080p";
    thumbnail = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80";
  } else if (cleanUrl.includes("tiktok.com")) {
    platform = "TikTok";
    title = "TikTok Trending Video (No Watermark)";
    thumbnail = "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80";
  } else if (cleanUrl.includes("instagram.com")) {
    platform = "Instagram";
    title = "Instagram Reel / Story HD";
    thumbnail = "https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=800&q=80";
  } else if (cleanUrl.includes("facebook.com") || cleanUrl.includes("fb.watch")) {
    platform = "Facebook";
    title = "Facebook Video High Quality";
    thumbnail = "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80";
  } else if (cleanUrl.includes("twitter.com") || cleanUrl.includes("x.com")) {
    platform = "X (Twitter)";
    title = "X (Twitter) Media Clip";
    thumbnail = "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=800&q=80";
  }

  const formats = [
    { label: "MP4 Video (1080p Full HD)", size: "~ 45.2 MB", quality: "1080p", type: "video" },
    { label: "MP4 Video (720p HD)", size: "~ 22.8 MB", quality: "720p", type: "video" },
    { label: "MP4 Video (480p SD)", size: "~ 12.1 MB", quality: "480p", type: "video" },
    { label: "MP3 Audio (320kbps High Quality)", size: "~ 5.4 MB", quality: "320k", type: "audio" },
    { label: "Thumbnail Cover (HD Image)", size: "~ 1.2 MB", quality: "HD", type: "image" },
  ];

  const cobaltRedirect = `https://cobalt.tools/?url=${encodeURIComponent(url)}`;

  return res.json({
    platform,
    title,
    thumbnail,
    url,
    cobaltRedirect,
    formats,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
