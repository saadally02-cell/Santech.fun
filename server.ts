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

// In-Memory Curated Marine Engineering Announcements Store
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
    title: "Mifumo ya MAN B&W ME-C na Urekebishaji wa Electronic Fuel Injection (ELFI)",
    excerpt: "Uchambuzi wa kina jinsi hydraulic cylinder units (HCU) na electronic control units (ECU) zinavyopunguza matumizi ya mafuta (SFOC) na kuzuia mshtuko wa pampu.",
    content: [
      "Katika kizazi cha sasa cha injini kuu za meli za MAN B&W ME-C, mfumo wa kiufundi wa camshaft umependekezwa kuondolewa na badala yake kutumia mtawanyiko wa kielektroniki wa Hydraulic Cylinder Unit (HCU) na ELFI valves.",
      "Mainjinia wa meli (Marine Engineers) wanatakiwa kufanya ukaguzi wa mara kwa mara wa 200 bar hydraulic servo oil rail, accumulator nitrogen pre-charge pressure (110 bar), na uwiano wa usafi wa mafuta ya kulainisha kulingana na daraja la ISO 4406 16/14/11.",
      "Kupitia mfumo wa SAN25 Marine Engineering Hub, tunatoa miongozo na michoro ya kidijitali kusaidia watia nia wa mitihani ya daraja la kwanza na la pili (MEO Class 1 & 2) kuelewa mantiki nzima ya mtambo huo."
    ],
    category: "injini-kuu",
    categoryName: "Injini Kuu & Propulsion",
    author: "Chief Engineer SAN25",
    authorRole: "Marine Technical Director",
    date: "Saa Hizi • 2026",
    readTime: "Dakika 4",
    views: 18450,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    tags: ["MAN B&W", "ME-C", "ELFI", "Hydraulics", "Propulsion"],
    isFeatured: true,
  },
  {
    id: "ann-2",
    title: "15 PPM Bilge Alarm & OWS: Utiifu wa MARPOL Annex I Kuzuia Ukaguzi wa PSC Detention",
    excerpt: "Mwongozo wa kiutendaji wa kusafisha optical measuring cell ya Bilge Alarm (OMD) na jaribio la moja kwa moja la 3-way automatic stopping switch.",
    content: [
      "Kifaa cha kutenganisha mafuta na maji ya mtaroni (15 PPM Oily Water Separator) ndicho chombo kinachoangaziwa zaidi na wakaguzi wa Port State Control (PSC) duniani kote chini ya Mkataba wa MARPOL Annex I.",
      "Mainjinia wanatakiwa kuhakikisha kuwa rekodi zote katika Kitabu cha Mafuta (Oil Record Book Part I) zinalingana sentimeta kwa sentimeta na kiwango halisi cha Oily Bilge Holding Tank kabla ya kufanya utupaji wowote wa maji safi baharini yasiyozidi 15 PPM.",
      "Ukaguzi wa kila wiki wa kitambuzi cha turbidity na vali ya dharura ya njia tatu (3-Way Recirculation Valve) ni sharti la lazima kwa meli yoyote inayotembelea bandari za Afrika Mashariki na kimataifa."
    ],
    category: "mitambo-msaidizi",
    categoryName: "Mitambo Msaidizi",
    author: "Chief Surveyor SAN25",
    authorRole: "Senior Marine Inspector",
    date: "Saa 1 Iliyopita",
    readTime: "Dakika 5",
    views: 14200,
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    tags: ["MARPOL", "15 PPM OWS", "Bilge Alarm", "PSC", "Oil Record Book"],
  },
  {
    id: "ann-3",
    title: "Mifumo ya Umeme wa Msukumo wa Juu 6.6kV (High Voltage Safety & Vacuum Circuit Breakers)",
    excerpt: "Kanuni na miongozo ya kuweka earthing truck, Permit To Work (PTW) na kuzuia Arc Flash kwenye switchboards za meli za kisasa za kontena.",
    content: [
      "Kutokana na ukubwa wa mizigo ya bow thrusters na reefer containers kwenye meli za kisasa, matumizi ya umeme wa msukumo wa juu (High Voltage - HV 6.6kV au 11kV) yamekuwa ya kawaida.",
      "Usalama wa injinia unategemea taratibu zilizothibitishwa za kutenga (Isolation), kujaribu uwepo wa volti kwa HV detector iliyothibitishwa, na kufunga waya wa ardhini (Earthing Switch) kabla ya kugusa sehemu yoyote ya breaker.",
      "SAN25 inakupa mwongozo stahiki wa kujiandaa na mafunzo ya High Voltage Safety Course kulingana na viwango vya STCW 2010 Section A-III/1 na A-III/2."
    ],
    category: "umeme-na-otomesheni",
    categoryName: "Umeme & Otomesheni",
    author: "Electro-Technical Officer (ETO)",
    authorRole: "Marine Electrical Specialist",
    date: "Saa 2 Zilizopita",
    readTime: "Dakika 4",
    views: 11800,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    tags: ["High Voltage", "6.6kV", "Switchboard", "ETO", "STCW"],
  }
];

// 1. Health check API
app.get("/api/health", (_req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.API_KEY);
  res.json({
    status: "ok",
    service: "SAN25 Marine Engineering Portal API",
    geminiConfigured: hasKey,
    timestamp: new Date().toISOString(),
  });
});

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://santech.fun/sitemap.xml\nSitemap: https://santech.fun/sitemap.json`);
});

app.get("/sitemap.xml", (_req, res) => {
  res.type("application/xml");
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://santech.fun/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://santech.fun/injini-kuu</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.fun/mitambo-msaidizi</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.fun/umeme-na-otomesheni</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.fun/sheria-na-usalama</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.fun/vipimo-na-miongozo</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.fun/naval-architecture</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.98</priority>
  </url>
  <url>
    <loc>https://santech.fun/hydrodynamics</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.fun/ship-stability</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.fun/ship-design</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://santech.fun/calculator</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://santech.fun/checklist</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>https://santech.fun/quiz</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
</urlset>`;
  res.send(sitemapContent);
});

// 2. SAN25 Chief Marine Engineer & Naval Architect AI Assistant Endpoint
app.post(["/api/ai-chat", "/api/chat"], async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: "Ujumbe unahitajika." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: `[SAN25 Chief Engineer & Naval Architect AI]: Habari afisa! Nipo tayari kwa masuala ya Uhandisi wa Meli na Usanifu (Naval Architecture & Marine Engineering). Kuhusu swali lako: "${message}", tunaweza kuchambua:
1) Ship Hydrodynamics (Total Resistance RT, ITTC 1957 Line, Holtrop-Mennen, Froude Number Fn, na Makadirio ya Nguvu ya Injini PB);
2) Ship Stability (Metacentric Height GM, Free Surface Effect FSE, GZ Curve na vigezo 6 vya IMO Code on Intact Stability 2008, pamoja na Trim & Drafts);
3) Ship Design Methodology (Evans' Design Spiral, Lines Plan, Lightweight vs Deadweight balance, na IACS CSR Scantlings);
4) Injini Kuu (MAN B&W ME-C, Wärtsilä RT-flex), Mitambo Msaidizi, Umeme wa 6.6kV na Kanuni za SOLAS/MARPOL.`,
      });
    }

    const systemInstruction = `Wewe ni SAN25 Chief Marine Engineer & Senior Naval Architect AI (Mhandisi Mkuu wa Meli na Msanifu Mwandamizi wa Miundo ya Meli mwenye Leseni ya STCW Class 1 Motor/Steam Unlimited, Shahada ya Uzamili ya Naval Architecture & Marine Engineering, na Mkaguzi wa Bodi za Kimataifa za Meli - Senior Marine Surveyor).
Unatoa ushauri wa kitaalamu wa hali ya juu kwa Kiswahili fasaha na maneno sanifu ya Kiingereza cha baharini na usanifu (Maritime English & Naval Architecture terminology).

Uwe na utaalamu wa kina wa:
1. Ship Hydrodynamics & Powering: Total Towing Resistance (R_T), Frictional Resistance (R_F kwa ITTC 1957 Line: C_F = 0.075/(log10(Rn)-2)^2), Viscous Form Factor (1+k), Wave-Making Resistance (R_W kwa Holtrop & Mennen method), Froude Number (Fn), Reynolds Number (Rn), Effective Towing Power (P_E = R_T * V), Hull Efficiency (eta_H = (1-t)/(1-w)), Open Water Efficiency (eta_O), Relative Rotative Efficiency (eta_R), Quasi-Propulsive Coefficient (eta_D), Delivered Power (P_D), Shaft Losses, Sea Margin, na Brake Horsepower (P_B / BHP). Seakeeping & wave interaction (encounter frequency omega_e, natural roll period Tr, parametric roll risk).
2. Ship Stability & Hydrostatics: Transverse Metacentric Height (GM = KB + BM - KG), KM, Transverse Metacentric Radius (BM = I_T / nabla), Free Surface Effect (FSE: deltaKG_FSE = sum(i * rho_liq) / Delta ambapo i = (l * b^3)/12), Fluid GM (GM_fluid = GM_solid - deltaKG_FSE), GZ Righting Lever curve across 0° to 60° (wall-sided formula GZ = GM*sin(theta) + 0.5*BM*tan^2(theta)*sin(theta) na cross curves KN - KG*sin(theta)), Tathmini ya Vigezo 6 vya IMO Code on Intact Stability (2008, Res. MSC.267(85)): Area 0°-30° >= 0.055 m*rad, Area 0°-40° >= 0.090 m*rad, Area 30°-40° >= 0.030 m*rad, Max GZ >= 0.20m at theta >= 25°, Initial GM >= 0.15m, Severe Wind & Weather Criterion. Longitudinal Stability & Trim: LCG, LCB, LCF, Trimming Moment TM = Delta * (LCG - LCB), MCT 1 cm (MCTc = (Delta * GM_L)/(100 * Lbp)), Total Trim t = TM / (MCTc * 100), Change of Draft Fwd and Aft, Hogging vs Sagging.
3. Ship Design Methodology (Evans' Design Spiral): Hatua 6 za mchakato wa usanifu: 1) Mission Requirements & Feasibility; 2) Principal Dimensions & Form Coefficients (Lbp, B, D, T, Cb, Cp, Cm, Cwp kwa kanuni za Posdunine na Schneekluth); 3) Hull Form & Lines Plan (Body plan, Sheer, Half-breadth, Bulbous bow destructive interference); 4) Subdivision & General Arrangement (SOLAS II-1 collision bulkhead at 0.05L to 0.08L, double bottom height >= B/20); 5) Weight Synthesis (Watson & Gilfillan steel weight Wsteel, Wmachinery, Woutfit, Lightweight LWT, Deadweight DWT, Displacement Delta balance); 6) Structural Scantlings (IACS CSR midship section modulus Zmin = C1 * L^2 * B * (Cb + 0.7), bottom shell plate thickness t = 1.9*s*sqrt(T) + tk).
4. Injini Kuu & Propulsion: MAN B&W ME-C (HPS servo oil, ELFI, ELVA, MPC), Wärtsilä RT-flex Common Rail, Indicator diagrams (Pmax, Pcomp, IHP, BHP, Planimeter), Turbochargers & surging, Scavenge fire emergency action, Crankcase explosion & OMD.
5. Mitambo Msaidizi: Boilers & feed water treatment, Alfa Laval purifiers & cat fines, 15 PPM OWS (MARPOL Annex I), Fresh Water Generator (FWG), 4-Ram Steering Gear (SOLAS 35° P to 30° S in 28s), 30 bar starting air compressors.
6. Umeme wa Meli: High Voltage 6.6kV/11kV safety & vacuum circuit breakers, Alternator synchronization & reverse power, ESB 45s blackout recovery, 440V Insulated Neutral (IT) earth fault hunting.
7. Sheria za IMO: SOLAS, MARPOL Annex I-VI, STCW 2010 MEO Class 1, 2, 4 CoC, Port State Control (PSC) Zero-Detention.

Muundo wa majibu:
- Toa maelekezo ya kiufundi yenye mpangilio na mifano halisi (bar, °C, RPM, ppm, mm, knots, kW, t, m).
- Eleza kanuni na fomula za kihandisi kwa usahihi wa hisabati.
- Toa tahadhari za kiusalama na utiifu wa sheria za IMO/IACS.
- Jibu kwa Kiswahili fasaha chenye heshima huku ukiweka maneno sanifu ya Kiingereza cha baharini katika mabano.`;

    const promptText = `Swali la Mhandisi wa Meli: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const reply = response.text || "Samahani, sikupokea jibu sahihi kutoka kwa mfumo wa AI ya Mhandisi Mkuu.";
    return res.json({ reply });
  } catch (err: any) {
    console.error("Chief Engineer AI Error:", err);
    return res.json({
      reply: "Habari Afisa! Tuko hewani. Kwa maelezo zaidi kuhusu uendeshaji wa injini za meli, boilers, umeme wa 6.6kV na sheria za MARPOL/SOLAS, tafadhali vinjari moduli zetu au uwasiliane na kundi letu la WhatsApp la Mainjinia.",
    });
  }
});

// 3. Automated Hourly Marine Engineering Technical Broadcast Generator
async function generateFreshAnnouncement(): Promise<AiAnnouncementArticle> {
  const ai = getGeminiClient();
  const defaultAnn: AiAnnouncementArticle = {
    id: `ann-${Date.now()}`,
    title: "Miongozo ya Upimaji wa Crankshaft Deflection na Alignment ya Injini za MAN B&W",
    excerpt: "Jinsi ya kusoma na kurekodi vipimo vya dial gauge kwenye kila silinda na kutafsiri tofauti kati ya Top Dead Centre (TDC) na Bottom Dead Centre (BDC).",
    content: [
      "Upimaji wa Crankshaft Web Deflection ni moja ya taratibu muhimu zaidi za kuzuia kuvunjika kwa crankshaft kutokana na bending stresses zinazosababishwa na kuisha kwa main bearings au kuharibika kwa foundation chocks.",
      "Kipimo kinachukuliwa kuanzia nafasi ya karibu na BDC (kuvuka connecting rod), kisha kupitia Bottom, Starboard, Top na Port. Tofauti kati ya T na B haitakiwi kuzidi mipaka ya mtengenezaji (kwa kawaida chini ya 0.10 mm kwa injini kubwa).",
      "Kila afisa anapaswa kuhakikisha kuwa hali ya joto ya injini (Engine Cold au Warm) na mkao wa meli (Ship's Draft and Trim) unarekodiwa sambamba na vipimo hivyo."
    ],
    category: "injini-kuu",
    categoryName: "Injini Kuu & Propulsion",
    author: "Chief Engineer SAN25",
    authorRole: "Technical Superintendent",
    date: "Sasa Hivi • 2026",
    readTime: "Dakika 4",
    views: Math.floor(Math.random() * 5000) + 10000,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    tags: ["Crankshaft Deflection", "Main Engine", "Bearings", "Maintenance", "Marine Engineering"],
  };

  if (!ai) {
    return defaultAnn;
  }

  try {
    const prompt = `Wewe ni Mhandisi Mkuu wa Meli na mhariri wa SAN25 Marine Engineering Portal. Tengeneza makala mpya fupi ya kiufundi ya baharini kwa Kiswahili na istilahi sanifu za Kiingereza kuhusu moja ya mada hizi (MAN B&W au Wärtsilä injection, Boiler water chemical dosing, Alfa Laval purifier desludging, 15 PPM OWS calibration, 6.6kV high voltage arc flash, SOLAS CO2 total flooding, au SFOC engine trial calculation).
Tuma majibu katika JSON pekee kwa muundo huu:
{
  "title": "Kichwa cha habari cha kihandisi kisichozidi maneno 12",
  "excerpt": "Muhtasari wa aya moja wa maneno 25-35",
  "contentParagraphs": [
    "Aya ya kwanza ya maelekezo ya kiutendaji na vigezo",
    "Aya ya pili ya tahadhari za kiusalama na taratibu za uhakiki"
  ],
  "category": "injini-kuu" au "mitambo-msaidizi" au "umeme-na-otomesheni" au "sheria-na-usalama" au "vipimo-na-miongozo",
  "categoryName": "Injini Kuu & Propulsion" au "Mitambo Msaidizi" au "Umeme & Otomesheni" au "Sheria & Usalama (IMO)" au "Vipimo & MEO Exams",
  "tags": ["Tag1", "Tag2", "Tag3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      const category = data.category || "injini-kuu";
      let img = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80";
      if (category === "mitambo-msaidizi") img = "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80";
      else if (category === "umeme-na-otomesheni") img = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80";
      else if (category === "sheria-na-usalama") img = "https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=800&q=80";
      else if (category === "vipimo-na-miongozo") img = "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80";

      return {
        id: `ann-${Date.now()}`,
        title: data.title || defaultAnn.title,
        excerpt: data.excerpt || defaultAnn.excerpt,
        content: Array.isArray(data.contentParagraphs) && data.contentParagraphs.length > 0 ? data.contentParagraphs : defaultAnn.content,
        category: category,
        categoryName: data.categoryName || "SAN25 Marine Technical Hub",
        author: "Chief Engineer SAN25",
        authorRole: "Technical Superintendent",
        date: "Sasa Hivi • 2026",
        readTime: "Dakika 3",
        views: Math.floor(Math.random() * 5000) + 12000,
        image: img,
        imageUrl: img,
        tags: Array.isArray(data.tags) ? data.tags : ["Marine Engineering", "Ship Propulsion", "Safety At Sea"],
      };
    }
  } catch (err) {
    console.error("Gemini Marine Announcement Error:", err);
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
      error: "Imeshindikana kuzalisha tangazo jipya la kihandisi kwa sasa.",
      announcements: announcementsStore,
    });
  }
});

// Periodic background generation
setInterval(async () => {
  try {
    const newAnn = await generateFreshAnnouncement();
    announcementsStore = [newAnn, ...announcementsStore.slice(0, 19)];
    console.log("SAN25 Marine Technical Broadcast auto-refreshed successfully");
  } catch (e) {
    console.warn("Background marine announcement cycle error:", e);
  }
}, 60 * 60 * 1000);

// Sitemap route for Google Search Console
app.get("/sitemap.json", (_req, res) => {
  const sitemapPath = path.resolve(rootDir, "public", "sitemap.json");
  if (fs.existsSync(sitemapPath)) {
    res.setHeader("Content-Type", "application/json");
    return res.sendFile(sitemapPath);
  }
  const rootSitemap = path.resolve(rootDir, "sitemap.json");
  if (fs.existsSync(rootSitemap)) {
    res.setHeader("Content-Type", "application/json");
    return res.sendFile(rootSitemap);
  }
  return res.status(404).json({ error: "Sitemap not found" });
});

// Catch-all API 404 handler
app.all("/api/*", (_req, res) => {
  res.status(404).json({ error: "API Route Not Found" });
});

// 4. Setup Vite Dev or Production Static Serve
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
    console.log(`SAN25 Marine Engineering Fullstack App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
