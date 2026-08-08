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

// 3. SANTECH Gemini AI Hourly Announcement Generator
let hourlyAnnouncements: any[] = [];

async function generateHourlyAnnouncement() {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      console.log("Gemini API key missing, skipping hourly auto-announcement generation.");
      return null;
    }

    const topics = [
      "Maendeleo ya hivi karibuni ya Akili Bandia (AI Models & Gemini 3.6 Pro) mwaka 2026",
      "Fursa mpya za Kazi za Mbali (Remote Tech Jobs) kwa Vijana wa Tanzania na Afrika Mashariki",
      "Usalama wa Mtandao (Cybersecurity & Zero-Trust) kwa biashara na programu za simu",
      "Ubunifu wa Teknolojia ya Utalii wa Tanzania (Smart Tourism & Virtual Guides katika Serengeti na Zanzibar)",
      "Zana za Uandishi wa Msimbo (AI Coding Assistants, Python & Full-Stack Development)"
    ];

    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    const prompt = `Zalisha habari rasmi au tangazo ghafi jipya kabisa la SANTECH TZ kuhusu: "${randomTopic}".
Iwe kwa Kiswahili fasaha cha kitaalamu na cha kuvutia.
Toa majibu yakiwa YAMEPANGWA KATIKA FORMAT YA JSON PEKEE kama ilivyo hapa chini bila maandishi mengine:
{
  "title": "Kichwa cha Habari cha Kuvutia (Maneno 8-12)",
  "excerpt": "Muhtasari wa Tangazo/Habari (Maneno 15-25)",
  "content": [
    "Aya ya kwanza: Maelezo mafupi ya tangazo jipya...",
    "Aya ya pili: Ufafanuzi wa kiufundi na faida zake...",
    "Aya ya tatu: Ushauri wa SANTECH na hatua za kuchukua..."
  ],
  "category": "akili-bandia",
  "categoryName": "Akili Bandia & AI 2026",
  "readTime": "Dakika 3",
  "author": "SANTECH Gemini AI Bot 🤖",
  "authorRole": "Mhariri Mkuu wa AI",
  "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
      },
    });

    let rawText = response.text || "";
    // Clean codeblock formatting if present
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(rawText);
    const newAnnouncement = {
      id: "ai-announcement-" + Date.now(),
      ...parsed,
      date: "Sasa hivi (Inayorushwa na Gemini AI)",
      featured: true,
      isAiGenerated: true,
      createdAt: new Date().toISOString(),
    };

    hourlyAnnouncements.unshift(newAnnouncement);
    if (hourlyAnnouncements.length > 20) {
      hourlyAnnouncements = hourlyAnnouncements.slice(0, 20);
    }

    console.log("Successfully generated Gemini AI hourly announcement:", newAnnouncement.title);
    return newAnnouncement;
  } catch (err) {
    console.error("Error generating hourly announcement with Gemini:", err);
    return null;
  }
}

// Endpoint to fetch hourly announcements
app.get("/api/announcements", (_req, res) => {
  res.json({ announcements: hourlyAnnouncements });
});

// Kiswahili Fasaha Tanzania Audio TTS Endpoint
app.get("/api/tts", async (req, res) => {
  try {
    const rawText = (req.query.text as string) || "";
    if (!rawText.trim()) {
      return res.status(400).json({ error: "No text provided for Swahili TTS" });
    }

    // Clean and normalize text into pure Tanzanian Swahili phonetics
    const cleanSwahiliText = rawText
      .replace(/\bAI\b/gi, "Akili Bandia")
      .replace(/\bTZ\b/gi, "Tanzania")
      .replace(/\bSANTECH\b/gi, "Santech")
      .replace(/\bSummary:\b/gi, "Muhtasari:")
      .replace(/\bApp\b/gi, "Programu")
      .replace(/\bOnline\b/gi, "Mtandaoni")
      .replace(/\bWebsite\b/gi, "Tovuti")
      .replace(/\bUSD\b/gi, "Dola za Marekani")
      .replace(/\bTZS\b/gi, "Shilingi za Tanzania")
      .replace(/\b2026\b/g, "mwaka elfu mbili ishirini na sita")
      .substring(0, 350)
      .trim();

    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      cleanSwahiliText
    )}&tl=sw&client=tw-ob`;

    const response = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Google Swahili TTS request failed with status ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(buffer);
  } catch (err) {
    console.error("Swahili TTS audio error:", err);
    res.status(500).json({ error: "Failed to generate Swahili audio" });
  }
});

// Endpoint to trigger fresh announcement on demand
app.post("/api/generate-announcement", async (_req, res) => {
  const result = await generateHourlyAnnouncement();
  if (result) {
    return res.json({ success: true, announcement: result });
  } else {
    return res.status(500).json({ error: "Imefeli kurusha tangazo jipya na Gemini AI." });
  }
});

// Start hourly background loop (Runs every 60 minutes = 3,600,000 ms)
setInterval(() => {
  console.log("Running scheduled Gemini AI hourly announcement job...");
  generateHourlyAnnouncement();
}, 3600000);

// Run first auto-generation after 5 seconds
setTimeout(() => {
  generateHourlyAnnouncement();
}, 5000);
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
