import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight
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
  const [activeSnippet, setActiveSnippet] = useState<'python' | 'typescript' | 'mpesa' | 'gemini'>('typescript');
  const [copied, setCopied] = useState<boolean>(false);

  const snippets = {
    typescript: {
      title: 'TypeScript + React 19 State Hook & API Client',
      language: 'typescript',
      code: `import { useState, useEffect } from 'react';

export interface ForexRate {
  pair: string;
  price: number;
  change24h: number;
}

export function useLiveRates(symbol: string = 'EURUSD') {
  const [rate, setRate] = useState<ForexRate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch(\`/api/forex/quote?symbol=\${symbol}\`);
        const data = await res.json();
        setRate(data);
      } catch (err) {
        console.error('Failed to load Forex quote:', err);
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

app = FastAPI(title="SANTECH AI & Trading API", version="2.0")

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
    input_PurchasedItemsDesc: "SANTECH Pro Forex Academy Access"
  };

  const response = await fetch("https://openapi.m-pesa.com/openapi/ipg/v2/vodacomTZN/c2bPayment/singleStage/", {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${process.env.MPESA_BEARER_TOKEN}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}`,
    },
    gemini: {
      title: 'Google Gemini 3.7 Flash SDK Backend Caller',
      language: 'typescript',
      code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
});

export async function askSantechAI(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: prompt,
    config: {
      systemInstruction: 'Wewe ni Msaidizi Mkuu wa Teknolojia wa SANTECH TZ. Jibu kwa Kiswahili fasaha.'
    }
  });

  return response.text;
}`,
    },
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(snippets[activeSnippet].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const devArticles = articles.filter((a) => a.category === 'dev' || a.category === 'ai');

  return (
    <section className="py-6 sm:py-10 space-y-10">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-blue-950/30 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            Developer Hub & Code Sandbox 2026
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight editorial-font">
            Jenga Mifumo ya Kisasa kwa <span className="text-blue-400">TypeScript & Python</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Misimbo tayari kutumika (Production-ready snippets), miongozo ya kuunganisha M-Pesa API, Gemini AI SDK, na mafunzo ya uhandisi wa programu kwa Kiswahili.
          </p>
        </div>
      </div>

      <NetworkAdBanner placement="in-feed" />

      {/* Code Snippets Showcase */}
      <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-400">
              Code Snippets & Architecture
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {snippets[activeSnippet].title}
            </h3>
          </div>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/40 text-xs font-bold transition-all cursor-pointer shadow"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> <span className="text-emerald-400">Imenakiliwa!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Nakili Msimbo
              </>
            )}
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {(['typescript', 'python', 'mpesa', 'gemini'] as const).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSnippet(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSnippet === key
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {key === 'typescript'
                ? 'React + TS Hook'
                : key === 'python'
                ? 'Python FastAPI'
                : key === 'mpesa'
                ? 'M-Pesa API STK'
                : 'Gemini 3.7 Flash'}
            </button>
          ))}
        </div>

        {/* Code View */}
        <div className="relative rounded-xl bg-black border border-white/10 p-4 sm:p-6 font-mono text-xs text-blue-300 overflow-x-auto leading-relaxed shadow-inner">
          <pre>
            <code>{snippets[activeSnippet].code}</code>
          </pre>
        </div>
      </div>

      {/* Dev Articles */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-white editorial-font flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-400" />
            Makala za Uhandisi wa Programu & AI
          </h3>
          <span className="text-xs text-zinc-400">{devArticles.length} Makala Zilizochapishwa</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {devArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-zinc-900/80 hover:bg-zinc-850 border border-white/10 hover:border-blue-400/40 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col group shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-blue-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow">
                  Dev & Coding
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-300">
                  <span>{art.readTime}</span>
                  <span className="text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Soma Zaidi <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
