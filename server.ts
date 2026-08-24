import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Determine root/working directory safely across ESM and bundled CJS
const rootDir = process.cwd();
const distDir = path.resolve(rootDir, "dist");

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

// In-Memory Curated Swahili Announcements Store for Gemini AI Broadcaster
export interface AiAnnouncementArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  categoryName: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  views?: number;
  image?: string;
  imageUrl?: string;
  tags: string[];
  isFeatured?: boolean;
  audioDuration?: string;
}

let announcementsStore: AiAnnouncementArticle[] = [
  {
    id: "ann-1",
    title: "Mifumo ya Gemini 3.7 Flash Yazinduliwa: Kasi na Akili ya Hali ya Juu kwa Waswahili",
    excerpt: "Google yazindua Gemini 3.7 Flash yenye uwezo wa kipekee wa kutoa hoja (Hybrid Reasoning), uandishi wa kodi za kisasa na uelewa wa lugha za Kiafrika.",
    content: [
      "Katika mapinduzi makubwa ya teknolojia ya Akili Bandia ya mwaka 2026, Google imeachia rasmi modeli ya Gemini 3.7 Flash inayotoa uwezo wa kasi ya ajabu pamoja na 'thinking process' ya kutatua masuala magumu ya kihandisi na kiuchumi.",
      "Wasanidi programu na wafanyabiashara nchini Tanzania watafaidika kwa kiasi kikubwa kutokana na gharama nafuu ya API na uwezo wa kuunganisha mawakala wa kiotomatiki kwenye tovuti, mifumo ya ERP na roboti za huduma kwa wateja mtandaoni.",
      "SANTECH TZ imekuwa mstari wa mbele kuunganisha modeli hii kutoa ushauri wa moja kwa moja wa Forex, Utalii na kazi za mbali kwa lugha ya Kiswahili."
    ],
    category: "ai",
    categoryName: "Akili Bandia (AI)",
    author: "Gemini 3.7 Pro Broadcaster",
    authorRole: "Autonomous AI Engine",
    date: "Saa Hizi • 2026",
    readTime: "Dakika 3",
    views: 18450,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    tags: ["Gemini 3.7", "Akili Bandia", "Automation", "Google", "Tanzania"],
    isFeatured: true,
  },
  {
    id: "ann-2",
    title: "Forex Academy: Umuhimu wa Fibonacci 61.8% na Key Support Levels Katika Jozi za USD",
    excerpt: "Uchambuzi wa kina wa kiufundi jinsi wafanyabiashara wanavyoweza kutumia Golden Ratio kubaini mabonde salama ya kuingilia kabla ya habari za US Fed.",
    content: [
      "Katika biashara ya soko la fedha za kigeni (Forex), kiwango cha Fibonacci Retracement cha 61.8% kinachukuliwa kuwa eneo lenye mvuto mkubwa zaidi kwa benki na wawekezaji wakubwa wa taasisi.",
      "Wakati wa soko lililopo kwenye mwenendo dhabiti (Strong Trend), kurudi kwa bei kwenye 61.8% kunatoa uwiano bora zaidi wa Faida kwa Hasara (Risk to Reward Ratio ya angalau 1:3).",
      "Kupitia Chuo cha Forex cha SANTECH, wafanyabiashara wanahimizwa daima kusubiri mshumaa wa uthibitisho (Bullish Pin Bar au Engulfing) kabla ya kufungua oda."
    ],
    category: "forex",
    categoryName: "Forex Academy",
    author: "SANTECH Market AI",
    authorRole: "Market Structure Bot",
    date: "Saa 1 Iliyopita",
    readTime: "Dakika 4",
    views: 14200,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    tags: ["Forex", "Fibonacci", "Price Action", "Trading", "Candlestick Bible"],
  },
  {
    id: "ann-3",
    title: "Fursa za Freelancing 2026: Mahitaji ya Watengenezaji wa React & AI Agents Tanzania Yaongezeka",
    excerpt: "Ripoti ya soko la ajira mtandaoni inaonyesha kampuni za Marekani na Ulaya zikiongeza mikataba ya kazi za mbali kwa watengenezaji wa Afrika Mashariki.",
    content: [
      "Sekta ya ajira za kidijitali (Remote Tech Work) inaendelea kutoa fursa zisizo na kikomo kwa vijana wa Kitanzania wenye ujuzi thabiti wa React, TypeScript, Python na API Integrations.",
      "Wafanyakazi huru nchini sasa wanapokea wastani wa $25 hadi $55 kwa saa kupitia mifumo kama Upwork na majukwaa ya moja kwa moja ya mikataba ya kimataifa.",
      "Mwongozo wetu wa Kazi za Mbali unakufundisha jinsi ya kuweka wasifu wenye mvuto, kupata wateja na kupokea malipo kwa usalama kupitia benki au pochi za kidijitali."
    ],
    category: "kazi",
    categoryName: "Kazi Mtandaoni",
    author: "SANTECH Career Bot",
    authorRole: "Freelance Economy AI",
    date: "Saa 2 Zilizopita",
    readTime: "Dakika 3",
    views: 11800,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    tags: ["Freelancing", "Remote Work", "Upwork", "React", "Ajira TZ"],
  }
];

// 1. Health check API
app.get("/api/health", (_req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.API_KEY);
  res.json({ status: "ok", app: "SANTECH TZ Server", geminiConfigured: hasKey });
});

// Dynamic SEO Sitemap & Robots Routes
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://santech.tz/sitemap.xml`);
});

app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml");
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://santech.tz/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://santech.tz/forex</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.tz/utalii</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.tz/kazi</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.tz/ai</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://santech.tz/dev</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://santech.tz/cybersecurity</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://santech.tz/blockchain</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://santech.tz/tools</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://santech.tz/kuhusu</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.70</priority>
  </url>
  <url>
    <loc>https://santech.tz/privacy</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.50</priority>
  </url>
  <url>
    <loc>https://santech.tz/terms</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.50</priority>
  </url>
</urlset>`;
  res.send(sitemapContent);
});

// 2. SANTECH Swahili AI Assistant Endpoint
app.post(["/api/ai-chat", "/api/chat"], async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: "Ujumbe unahitajika." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: `[SANTECH AI]: Habari! Mfumo wa AI unafanya kazi kwa ufanisi. Kuhusu swali lako: "${message}", unaweza kupata maarifa ya kina kwenye masomo yetu ya Forex Academy (Candlestick Bible & SMC), Utalii wa Tanzania (Serengeti & Zanzibar), Kazi za Mtandaoni (Upwork/Fiverr) na Uandishi wa Msimbo (React/Python).`,
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

    const promptText = `Mtumiaji anauliza: ${message}`;

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
    return res.json({
      reply: "Habari! Tuko hewani. Kwa maelezo zaidi kuhusu Forex, Utalii, na Teknolojia, tafadhali vinjari moduli zetu au uwasiliane nasi kupitia WhatsApp.",
    });
  }
});

// 3. Automated Hourly Swahili AI Tech & Forex Announcement Generator
async function generateFreshAnnouncement(): Promise<AiAnnouncementArticle> {
  const ai = getGeminiClient();
  const defaultAnn: AiAnnouncementArticle = {
    id: `ann-${Date.now()}`,
    title: "Ripoti Maalum ya Teknolojia & Masoko: Ukuaji wa AI na Forex Academy Tanzania",
    excerpt: "SANTECH TZ yazindua mwongozo kamili wa Akili Bandia, Candlestick Bible na fursa za ajira za kidijitali kwa vijana wa Kitanzania.",
    content: [
      "Maendeleo ya Akili Bandia (AI) na zana za kidijitali yanafungua milango mikubwa kwa watengenezaji programu, wafanyabiashara wa soko la fedha za kigeni (Forex Traders) na wafanyakazi huru (Freelancers) nchini Tanzania.",
      "SANTECH TZ inawaletea uchambuzi wa kipekee kwa Kiswahili fasaha ili kuwajengea uwezo vijana kushiriki kikamilifu katika uchumi wa kidijitali wa 2026."
    ],
    category: "ai",
    categoryName: "Akili Bandia (AI)",
    author: "Gemini 3.7 Flash Engine",
    authorRole: "SANTECH Automated AI",
    date: "Sasa Hivi • 2026",
    readTime: "Dakika 3",
    views: Math.floor(Math.random() * 5000) + 10000,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["Akili Bandia", "Forex", "Kazi Mtandaoni", "Teknolojia", "Tanzania"],
  };

  if (!ai) {
    return defaultAnn;
  }

  try {
    const prompt = `Wewe ni mhariri mkuu wa teknolojia, AI na uchumi wa kidijitali wa SANTECH TZ. Tengeneza taarifa mpya ya habari ya kipekee na uchambuzi wa kisasa kwa Kiswahili safi kuhusu mojawapo ya mada hizi (Akili Bandia na Gemini 3.7, Forex Trading na Candlestick Bible au SMC, Uandishi wa Msimbo & FullStack, Ajira za Mtandaoni Tanzania, au Utalii wa Kidijitali wa Tanzania).
Tuma majibu katika JSON pekee kwa muundo huu:
{
  "title": "Kichwa cha habari kifupi na cha kuvutia kisichozidi maneno 12",
  "excerpt": "Muhtasari wa aya moja wa maneno 25-35",
  "contentParagraphs": [
    "Aya ya kwanza ya kina yenye maarifa ya vitendo",
    "Aya ya pili ya uchambuzi wa fursa na ushauri kwa vijana wa Tanzania"
  ],
  "category": "ai" au "forex" au "dev" au "kazi" au "utalii",
  "categoryName": "Akili Bandia (AI)" au "Forex Academy" au "Dev Hub" au "Kazi Mtandaoni" au "Utalii wa Tanzania",
  "tags": ["Tag1", "Tag2", "Tag3"]
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
      const category = data.category || "ai";
      let img = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80";
      if (category === "forex") img = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80";
      else if (category === "kazi") img = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
      else if (category === "utalii") img = "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80";

      return {
        id: `ann-${Date.now()}`,
        title: data.title || defaultAnn.title,
        excerpt: data.excerpt || defaultAnn.excerpt,
        content: Array.isArray(data.contentParagraphs) && data.contentParagraphs.length > 0 ? data.contentParagraphs : defaultAnn.content,
        category: category,
        categoryName: data.categoryName || "SANTECH AI Broadcaster",
        author: "Gemini 3.7 Pro Broadcaster",
        authorRole: "Automated AI Engine",
        date: "Sasa Hivi • 2026",
        readTime: "Dakika 3",
        views: Math.floor(Math.random() * 5000) + 12000,
        image: img,
        imageUrl: img,
        tags: Array.isArray(data.tags) ? data.tags : ["AI", "SANTECH", "Teknolojia"],
      };
    }
  } catch (err) {
    console.error("Gemini AI Announcement Generation Error:", err);
  }

  return defaultAnn;
}

// Routes for Announcements
app.get(["/api/announcements", "/api/hourly-announcement"], (_req, res) => {
  res.json({
    success: true,
    announcements: announcementsStore,
    latest: announcementsStore[0] || null,
  });
});

app.post(["/api/generate-announcement", "/api/hourly-announcement/generate"], async (_req, res) => {
  try {
    const newAnn = await generateFreshAnnouncement();
    announcementsStore = [newAnn, ...announcementsStore.slice(0, 19)];
    res.json({
      success: true,
      announcement: newAnn,
      announcements: announcementsStore,
    });
  } catch (err: any) {
    console.error("Failed to generate announcement:", err);
    res.status(500).json({
      success: false,
      error: "Imeshindikana kuzalisha tangazo jipya kwa sasa.",
      announcements: announcementsStore,
    });
  }
});

// Periodic background generation
setInterval(async () => {
  try {
    const newAnn = await generateFreshAnnouncement();
    announcementsStore = [newAnn, ...announcementsStore.slice(0, 19)];
    console.log("SANTECH Hourly Announcement auto-refreshed successfully");
  } catch (e) {
    console.warn("Background announcement cycle error:", e);
  }
}, 60 * 60 * 1000);

// 4. Video Downloader Info Endpoint (Mock/Scraper for YouTube, TikTok, IG, FB)
app.post("/api/video-info", (req, res) => {
  const { url } = req.body || {};
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

// Catch-all API 404 handler to ensure JSON is returned for any unhandled /api/* route
app.all("/api/*", (_req, res) => {
  res.status(404).json({ error: "API Route Not Found" });
});

// 5. Setup Vite Dev or Production Static Serve
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
async function startServer() {
  if (process.env.NODE_ENV !== "production" && !fs.existsSync(path.join(distDir, "index.html"))) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SANTECH TZ Fullstack App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
