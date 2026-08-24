import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  Share2,
  CheckCircle2,
  GitBranch,
  Database,
  ArrowRight
} from 'lucide-react';
import { Article } from '../types';
import { NetworkAdBanner } from './NetworkAdBanner';

interface DevHubSectionProps {
  onSelectArticle: (article: Article) => void;
  articles: Article[];
}

export const DevHubSection: React.FC<DevHubSectionProps> = ({
  onSelectArticle,
  articles,
}) => {
  const [activeSnippet, setActiveSnippet] = useState<'typescript' | 'python' | 'mpesa' | 'gemini'>('typescript');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const snippets = {
    typescript: {
      title: 'TypeScript + React 19 State Hook & API Client',
      language: 'typescript',
      code: `import { useState, useEffect } from 'react';

export interface LiveMarketData {
  pair: string;
  price: number;
  change24h: number;
}

export function useLiveRates(symbol: string = 'EURUSD') {
  const [rate, setRate] = useState<LiveMarketData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch(\`/api/market/quote?symbol=\${symbol}\`);
        const data = await res.json();
        setRate(data);
      } catch (err) {
        console.error('Failed to load live rate:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRate();
  }, [symbol]);

  return { rate, loading };
}`,
    },
    python: {
      title: 'Python FastAPI Microservice with Async Endpoints',
      language: 'python',
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx

app = FastAPI(title="SANTECH AI & Trading API 2026", version="2.0")

class AnalysisRequest(BaseModel):
    candlestick_type: str
    timeframe: str = "H4"
    risk_percent: float = 1.0

@app.post("/api/analyze-candle")
async def analyze_candle(req: AnalysisRequest):
    if req.candlestick_type.lower() == "pin_bar":
        return {
            "signal": "REVERSAL_CONFIRMED",
            "recommended_action": "Wait for Break & Retest of High/Low",
            "risk_reward": "1:2.5"
        }
    return {"status": "HOLD", "detail": "Neutral market sentiment"}`,
    },
    mpesa: {
      title: 'Vodacom M-Pesa C2B / B2C Push STK Integration',
      language: 'typescript',
      code: `// Vodacom M-Pesa Open API Payment Dispatch
export async function initiateMpesaPayment({
  phone,
  amount,
  reference
}: { phone: string; amount: number; reference: string }) {
  const payload = {
    input_Amount: amount.toString(),
    input_Country: "TZN",
    input_Currency: "TZS",
    input_CustomerMSISDN: phone.startsWith("255") ? phone : \`255\${phone}\`,
    input_ServiceProviderCode: process.env.MPESA_SHORTCODE,
    input_ThirdPartyConversationID: reference,
    input_TransactionReference: reference,
    input_PurchasedItemsDesc: "SANTECH Pro Subscription"
  };

  const response = await fetch("https://openapi.m-pesa.com/sandbox/ipg/v2/c2bPayment/singleStage/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": \`Bearer \${process.env.MPESA_SESSION_KEY}\`
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}`,
    },
    gemini: {
      title: 'Gemini 3.7 Flash TypeScript SDK with Tool Calling',
      language: 'typescript',
      code: `import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI();

export async function askSwahiliTechAssistant(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction: 'Wewe ni mhandisi mbobezi wa programu wa SANTECH TZ. Jibu kwa Kiswahili fasaha chenye misimbo safi ya kiufundi.',
      temperature: 0.3
    }
  });

  return response.text;
}`,
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeSnippet].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const devArticles = articles.filter((a) => a.category === 'dev');

  return (
    <section className="space-y-12 pb-16">
      {/* Direct URL Route Indicator & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">URL Rasmi ya Subpage:</span>
          <code className="text-blue-400 bg-black/50 px-2 py-0.5 rounded font-mono font-bold">
            https://santech.tz/#dev
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#dev');
            setCopiedUrl(true);
            setTimeout(() => setCopiedUrl(false), 2000);
          }}
          className="flex items-center gap-1 text-[11px] font-bold text-zinc-300 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          {copiedUrl ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          {copiedUrl ? 'Kiungo Kimekopiliwa!' : 'Nakili Kiungo cha Moja kwa Moja'}
        </button>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/30 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            Kituo cha Waandishi wa Misimbo & Uhandisi wa Programu 2026
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight editorial-font">
            Jenga Mifumo ya Kisasa: <span className="text-blue-400">React 19, Python, APIs & DevOps</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Mafunzo ya vitendo ya lugha za kisasa za uprogramu, kuunganisha mifumo ya malipo ya simu (M-Pesa, Tigo Pesa, Airtel Money), na mbinu za kupeleka mifumo hewani kwenye seva za Linux na Cloud.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2026 Full-Stack Roadmap Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Frontend (UI/UX)',
            desc: 'React 19, TypeScript, Next.js 15, Tailwind CSS, Vite & Responsive Design.',
            icon: Layers,
            badge: 'Kasi ya Juu',
          },
          {
            title: 'Backend (APIs)',
            desc: 'Python FastAPI, Node.js Express, Go Fiber & REST/GraphQL/WebSockets.',
            icon: Terminal,
            badge: 'Uthabiti',
          },
          {
            title: 'Hifadhidata (Databases)',
            desc: 'PostgreSQL, Drizzle ORM, Supabase, Redis & Firebase Firestore.',
            icon: Database,
            badge: 'Salama & Haraka',
          },
          {
            title: 'DevOps & Deployment',
            desc: 'Docker, GitHub Actions CI/CD, Nginx, Linux Ubuntu VPS & Cloudflare.',
            icon: GitBranch,
            badge: 'Uendeshaji 24/7',
          },
        ].map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="bg-zinc-900 border border-white/10 p-5 rounded-2xl space-y-2 hover:border-blue-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                  {pillar.badge}
                </span>
                <Icon className="w-4 h-4 text-zinc-400" />
              </div>
              <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Code Snippets Sandbox */}
      <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              Maktaba ya Misimbo ya Kisasa (Copy-Paste Ready)
            </h3>
            <p className="text-xs text-zinc-400">Misimbo iliyojaribiwa na kuthibitishwa kwa miradi ya Tanzania</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'typescript', label: 'React 19 Hook' },
              { id: 'python', label: 'Python FastAPI' },
              { id: 'mpesa', label: 'M-Pesa Daraja API' },
              { id: 'gemini', label: 'Gemini 3.7 SDK' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSnippet(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeSnippet === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="text-xs font-bold text-zinc-400 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            {snippets[activeSnippet].title}
          </div>
          <pre className="bg-zinc-950 p-5 rounded-2xl border border-white/5 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed max-h-96">
            {snippets[activeSnippet].code}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-8 right-4 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Imenakiliwa!' : 'Nakili Msimbo'}
          </button>
        </div>
      </div>

      {/* Dev Articles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-400" />
            Makala za Uhandisi wa Programu & Coding
          </h3>
          <span className="text-xs text-zinc-400">{devArticles.length} Makala</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {devArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-blue-400 border border-white/10">
                    {article.categoryName || 'Dev Hub'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.readTime}</span>
                <span className="text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Soma Mafunzo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
