import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Lazy initialization for Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!aiClient && apiKey) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
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
  const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.API_KEY);
  res.json({ status: "ok", app: "SANTECH TZ Server", geminiConfigured: hasKey });
});

// 2. SANTECH Swahili AI Assistant Endpoint
app.post(["/api/ai-chat", "/api/chat"], async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Ujumbe unahitajika." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: `[SANTECH AI]: Habari! Mfumo wa AI unafanya kazi kwa usahihi. Kuhusu swali lako: "${message}", unaweza kujifunza zaidi kwenye sehemu zetu za Forex Academy, Akili Bandia na Coding, au kusanidi GEMINI_API_KEY kupata uchambuzi wa papo hapo kutoka Gemini 3.7 Flash!`,
      });
    }

    const systemInstruction = `Wewe ni SANTECH AI Assistant, msaidizi rasmi wa kidijitali wa jukwaa la SANTECH TZ (Teknolojia, Akili Bandia, Forex Academy & Candlestick Bible, Kazi Mtandaoni, Fedha za Kidijitali na Utalii wa Tanzania).
Jibu maswali ya watumiaji kwa Kiswahili fasaha, kizuri, chenye heshima, mifano bayana na motisha. 
Uwe na uelewa wa kina kuhusu:
1. Akili Bandia (Gemini 3.7 Flash, Machine Learning, Automation, Prompt Engineering).
2. Forex Trading & Candlestick Bible (Pips, Lot Sizes, Pin Bar, Engulfing, Support/Resistance, Break & Retest, Smart Money Concepts - SMC, Risk Management).
3. Uandishi wa Msimbo & Web/App Development (Python, TypeScript, React, APIs, Cloud, Cybersecurity).
4. Kazi za mtandaoni Tanzania (Freelancing, Upwork, Fiverr, Remote Tech Jobs, Malipo ya M-Pesa/Bank).
5. Utalii wa Tanzania (Serengeti, Zanzibar, Ngorongoro, Kilimanjaro, Mafia Island, Pemba, Tarangire).
6. Zana za kidijitali (SANTECH Video Downloader, Software, Mobile Apps).

Weka muundo wa majibu yako uwe nadhifu, ukitumia nukta/orodha na msisitizo pale panapofaa. Wakati wote kuwa mwenye msaada mkubwa kwa jamii ya Kitanzania na Afrika Mashariki.`;

    const promptText = `
Mtumiaji anauliza: ${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Samahani, sikupokea jibu sahihi kutoka kwa mfumo wa AI.";
    return res.json({ reply });
  } catch (err: any) {
    console.error("AI Assistant Error:", err);
    return res.status(500).json({
      error: "Imefeli kuwasiliana na msaidizi wa AI.",
      reply: "Kutokana na changamoto ya kiufundi, jaribu tena baadaye au vinjari makala zetu za Forex, Utalii na Teknolojia.",
    });
  }
});

// 3. Automated Hourly Swahili AI Tech & Forex Announcement Generator
let latestAnnouncement = {
  id: "ann-init-1",
  timestamp: new Date().toISOString(),
  headline: "Ripoti Maalum: Ukuaji wa AI na Elimu ya Masoko ya Fedha Tanzania",
  summary:
    "SANTECH TZ yazindua mwongozo kamili wa Akili Bandia, Forex Academy (Candlestick Bible) na fursa za ajira za kidijitali kwa vijana wa Kitanzania.",
  fullArticle:
    "Maendeleo ya Akili Bandia (AI) na zana za kidijitali yanafungua milango mikubwa kwa watengenezaji programu, wafanyabiashara wa soko la fedha za kigeni (Forex Traders) na wafanyakazi huru (Freelancers) nchini Tanzania. SANTECH TZ inawaletea uchambuzi wa kipekee kwa Kiswahili fasaha ili kuwajengea uwezo vijana kushiriki kikamilifu katika uchumi wa kidijitali wa 2026.",
  audioSummary:
    "Habari za saa hivi kutoka SANTECH TZ! Teknolojia ya Akili Bandia na elimu ya masoko ya fedha kupitia Candlestick Bible inaendelea kubadilisha maisha ya vijana nchini Tanzania. Jifunze bure leo!",
  category: "Akili Bandia (AI)",
};

async function generateHourlyAnnouncement() {
  const ai = getGeminiClient();
  if (!ai) return;

  try {
    const prompt = `Wewe ni mhariri mkuu wa teknolojia na uchumi wa kidijitali wa SANTECH TZ. Tengeneza taarifa fupi ya habari na uchambuzi wa kisasa kwa Kiswahili kuhusu mojawapo ya mada hizi (Akili Bandia, Forex & Masoko ya Fedha, Coding, Ajira za Mtandaoni Tanzania, au Utalii wa Kidijitali).
Tuma majibu katika JSON pekee kwa muundo huu:
{
  "headline": "Kichwa cha habari kifupi na cha kuvutia",
  "summary": "Muhtasari wa aya moja wa maneno 25-35",
  "fullArticle": "Makala fupi ya aya 2 zenye maarifa ya kina",
  "audioSummary": "Maelezo fasaha yatakayosomwa kwa sauti (Audio/TTS) ya sekunde 20 kwa Kiswahili safi",
  "category": "Akili Bandia (AI) au Forex Academy au Coding & Dev au Kazi Mtandaoni"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        responseMimeType: "application/json",
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      latestAnnouncement = {
        id: `ann-${Date.now()}`,
        timestamp: new Date().toISOString(),
        headline: data.headline || latestAnnouncement.headline,
        summary: data.summary || latestAnnouncement.summary,
        fullArticle: data.fullArticle || latestAnnouncement.fullArticle,
        audioSummary: data.audioSummary || latestAnnouncement.audioSummary,
        category: data.category || "Akili Bandia (AI)",
      };
      console.log("SANTECH Hourly Announcement Updated successfully via Gemini AI");
    }
  } catch (err) {
    console.error("Hourly announcement generation error:", err);
  }
}

// Generate upon startup & schedule hourly update
setTimeout(() => generateHourlyAnnouncement(), 3000);
setInterval(generateHourlyAnnouncement, 60 * 60 * 1000);

app.get("/api/hourly-announcement", (_req, res) => {
  res.json(latestAnnouncement);
});

// 4. Video Downloader Info Endpoint (Mock/Scraper for YouTube, TikTok, IG, FB)
app.post("/api/video-info", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Tafadhali weka kiungo (URL) sahihi cha video." });
  }

  let platform = "Video ya Mtandaoni";
  if (url.includes("youtube.com") || url.includes("youtu.be")) platform = "YouTube (HD / 4K)";
  else if (url.includes("tiktok.com")) platform = "TikTok (Bila Watermark)";
  else if (url.includes("instagram.com")) platform = "Instagram Reels / Post";
  else if (url.includes("facebook.com") || url.includes("fb.watch")) platform = "Facebook Watch HD";
  else if (url.includes("twitter.com") || url.includes("x.com")) platform = "X / Twitter Video";

  const cleanUrl = url.startsWith("http") ? url : `https://${url}`;

  return res.json({
    platform,
    title: `SANTECH Video Parser: Video kutoka ${platform}`,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    duration: "3:45",
    formats: [
      { quality: "1080p Full HD (Bila Watermark)", size: "48.2 MB", ext: "MP4", downloadUrl: cleanUrl },
      { quality: "720p HD Standard", size: "22.5 MB", ext: "MP4", downloadUrl: cleanUrl },
      { quality: "Sauti Pekee (High Quality Audio)", size: "4.8 MB", ext: "MP3", downloadUrl: cleanUrl }
    ],
    author: "@creator_tz",
  });
});

// 5. Setup Vite Dev or Production Static Serve
const PORT = 3000;
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SANTECH TZ Fullstack App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
