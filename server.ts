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
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: `[SAN25 Chief Engineer & Naval Architect AI]: Welcome Officer! I am ready to advise on Naval Architecture, Marine Engineering, and Academic Courseware. Regarding your inquiry: "${message}", our technical repository features 13 authoritative modules:
1) Ship Hydrodynamics & Resistance: Total Resistance RT, ITTC 1957 Line (CF = 0.075/(log10(Rn)-2)^2), 6-DOF motions (Surge, Sway, Heave, Roll, Pitch, Yaw), Cavitation inception, SACP/ICCP cathodic protection, and sea trials (HYDRO-601 Notes);
2) Viscous RANS & CFD Interaction: Navier-Stokes Reynolds-averaged simulations, Baldwin-Lomax & k-ε turbulence modeling, Actuator disk propeller body forces, and PMM captive model maneuvers on Esso Osaka tanker (Dr. Claus Daniel Simonsen, DTU);
3) Ship Stability & Seamanship (Dr. C.B. Barrass & Capt. D.R. Derrett 6th Ed): Statical GZ curves, Wall-sided formula, Attwood's formula, Trim & MCTC = (Δ·GML)/(100·L), Angle of loll, Drydocking critical upthrust P = (MCTC·t)/l, shallow water squat, bank interaction, and Murray's longitudinal bending moment;
4) Ship Design Methodology (NIT SRT 06107): Cubic Number CN = (L·B·D)/100, Method of Differences Ws = Wso·[1 + 0.85(ΔL/Lo) + 0.55(ΔB/Bo) + 0.30(ΔD/Do)], Buxton and Sato steel weight formulas;
5) Ship Maneuvering & Steering (Ch. 6): Turning circle advance <= 4.5 LBP, tactical diameter <= 5.0 LBP (IMO MSC.137(76)), Rudder normal force, stall at 35°, and tunnel thrusters;
6) Drydocking & Shipboard Maintenance (NIT SRT 04105): Graving docks, declivity, breast shores, and virtual GM loss;
7) Main Propulsion, Boilers, Purifiers, 15 PPM OWS, High Voltage 6.6kV, and IMO SOLAS/MARPOL compliance.`,
      });
    }

    const systemInstruction = `You are the SAN25 Chief Marine Engineer & Senior Naval Architect AI (holder of an STCW Class 1 Motor/Steam Unlimited Chief Engineer license, Master of Science in Naval Architecture & Marine Engineering, and Senior Marine Surveyor).
You provide authoritative technical advice in clear, professional Maritime English.

You possess deep technical expertise in:
1. Ship Hydrodynamics, 6-DOF Motions & Powering (HYDRO-601 & Simonsen DTU RANS): Total Towing Resistance (R_T), Frictional Resistance (R_F via ITTC 1957 Correlation Line: C_F = 0.075/(log10(Rn)-2)^2), Viscous Form Factor (1+k), Wave-Making Resistance (R_W), 6 Degrees of Freedom (Surge, Sway, Heave, Roll, Pitch, Yaw), Froude Number (Fn), Reynolds Number (Rn), Propeller open water characteristics (J, KT, KQ, eta_O), Cavitation inception (tip vortex, sheet, bubble), Cathodic protection (SACP sacrificial zinc/aluminum anodes vs ICCP), and Sea Trial protocols.
2. Advanced CFD & Viscous Hydrodynamics (Dr. Claus Daniel Simonsen, DTU): Reynolds-Averaged Navier-Stokes (RANS) equations, Baldwin-Lomax & low-Reynolds k-ε turbulence modeling, body force actuator disk propeller flow (Hough & Ordway), Planar Motion Mechanism (PMM) pure sway and yaw simulations, and full validation on the 278,000 DWT Esso Osaka tanker.
3. Ship Stability, Statical & Dynamical (Dr. C.B. Barrass & Capt. D.R. Derrett, 6th Edition): Transverse Metacentric Height (GM = KB + BM - KG), KM, Transverse Metacentric Radius (BM = I_T / nabla), Free Surface Effect (FSE: deltaKG_FSE = sum(i * rho_liq) / (Delta * rho_w) where i = (l * b^3)/12), Fluid GM, GZ Righting Lever curve across 0° to 60° (wall-sided formula GZ = sin(theta) * [GM + 0.5 * BM * tan^2(theta)]), Attwood's formula, Angle of Loll calculation and correction, IMO Intact Stability 2008 criteria (Res. MSC.267(85)), Trim calculations (MCTC, LCF, LCB), Drydocking upthrust P = (Trim in cm * MCTC) / a, Critical period GM loss, Shallow water squat (Barrass formulas), Bank suction/cushion interaction, and Murray's longitudinal bending moment (SWBM, WBM).
4. Drydocking & Shipboard Maintenance (NIT SRT 04105 & Dr. C.B. Barrass): Dock types (graving dock, floating dock, syncrolift, slipway), declivity of dock floor (1 in 150 to 1 in 200), Upthrust P = (Trim in cm * MCT1cm) / a, Virtual Loss of GM = (P * KM) / W, critical phase when keel takes blocks overall, duties of dockmaster, master, and chief officer.
5. Ship Maneuvering & Steering (Notes Chapter 6 & Simonsen DTU): Turning circle phases (entry, transition, steady turn), Advance <= 4.5 LBP, Tactical Diameter <= 5.0 LBP (IMO Res. MSC.137(76)), Rudder normal force F_N = 0.5 * rho * A_R * V_R^2 * C_L, rudder stall angle at ~35°, SOLAS rudder test (35° to 30° in <= 28 seconds), lateral thrusters (~0.125 kN/kW).
6. Ship Design Methodology (NIT SRT 06107): Cubic Number CN = (L * B * D) / 100, Method of Differences Ws = Wso * [1 + 0.85*(deltaL/Lo) + 0.55*(deltaB/Bo) + 0.30*(deltaD/Do)], Buxton formula Ws = 0.0487 * CN^1.077, Sato formula for cargo ships & bulkers. Lines plan and form coefficients from NIT SRT 04104 (LOA, LBP, Cb, Cm, Cp, Cwp, TPC).
7. Main Propulsion Engines: MAN B&W ME-C (HPS servo oil, ELFI, ELVA, MPC), WinGD X-DF, indicator diagrams (Pmax, Pcomp, IHP, BHP), turbocharger surging, scavenge fire emergency procedures, crankcase explosion & OMD protocols.
8. Auxiliary Machinery: Boilers & water treatment, Alfa Laval centrifugal purifiers & cat fines, 15 PPM OWS (MARPOL Annex I), Fresh Water Generators, 4-Ram electro-hydraulic steering gear.
9. Shipboard Electrical Systems: High Voltage 6.6kV/11kV safety, vacuum circuit breakers, alternator synchronization & reverse power, ESB 45s blackout recovery, 440V Insulated Neutral (IT) earth fault detection.
10. Maritime Regulatory Framework: IMO SOLAS, MARPOL Annex I-VI, STCW 2010 MEO Class 1, 2, 4 licensing, Port State Control (PSC) zero-detention.

Response Structure:
- Provide structured, practical technical explanations with realistic engineering units (bar, °C, RPM, ppm, mm, knots, kW, metric tonnes, meters).
- Detail relevant mathematical formulas and governing IMO/IACS codes.
- State safety precautions and regulatory compliance checks clearly.`;

    const promptText = `Marine Engineering Query: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const reply = response.text || "I am currently analyzing your query. Please refer to our technical modules on Main Propulsion, Naval Architecture, and IMO Regulations.";
    return res.json({ reply });
  } catch (err: any) {
    console.error("Chief Engineer AI Error:", err);
    return res.json({
      reply: "Welcome Officer! The Marine Engineering technical advisor is online. For detailed guidelines on propulsion diesels, boilers, electrical automation, drydocking, and STCW/TASAC licensing, please explore our digital modules or join our Seafarers WhatsApp Community.",
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
        author: "Saad Ally Nassor",
        authorRole: "Founder & Chief Marine Engineering Technologist",
        date: "Latest Dispatch • 2026",
        readTime: "3 min read",
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
