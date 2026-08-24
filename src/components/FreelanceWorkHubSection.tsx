import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  Send,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Globe,
  Award
} from 'lucide-react';
import { Article } from '../types';
import { NetworkAdBanner } from './NetworkAdBanner';

interface FreelanceWorkHubSectionProps {
  onSelectArticle: (article: Article) => void;
  articles: Article[];
}

export const FreelanceWorkHubSection: React.FC<FreelanceWorkHubSectionProps> = ({
  onSelectArticle,
  articles,
}) => {
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);
  const [selectedTemplate, setSelectedTemplate] = useState<'webdev' | 'writing' | 'video' | 'forex'>('webdev');
  const [copied, setCopied] = useState<boolean>(false);

  const monthlyUSD = hourlyRate * hoursPerWeek * 4;
  const monthlyTZS = (monthlyUSD * 2650).toLocaleString('sw-TZ');

  const proposalTemplates = {
    webdev: {
      title: 'Full-Stack / React / Python Web Developer Proposal',
      text: `Habari! Nimeona tangazo lako la mradi wa Web Application. 
Nikiwa na uzoefu wa miaka 3+ nikijenga mifumo ya kisasa kwa kutumia React, TypeScript, Python (FastAPI), na Tailwind CSS, ninaweza kukukabidhi kazi safi yenye kasi ya hali ya juu.

Mambo nitakayotekeleza mara moja:
1. Muundo maridadi unaoendana na simu na kompyuta (100% Responsive UI)
2. Usimbaji wa APIs na usalama wa data za wateja
3. Upimaji na uwasilishaji wa mradi ndani ya muda uliopangwa

Angalia mifano ya kazi zangu: https://santech.tz/dev
Tunaweza kufanya kikao cha dakika 10 kupitia Google Meet kuanza mara moja.`,
    },
    writing: {
      title: 'SEO Content Writer & Translator (Swahili & English)',
      text: `Hi there! I reviewed your project for high-ranking SEO content and article writing.
With experience writing for top tech, tourism, and financial publications in East Africa, I will deliver compelling, 100% human-crafted articles optimized for Google ranking.

Deliverables:
- Engaging headline & optimized meta descriptions
- In-depth keyword research and natural integration
- 0% Plagiarism & Grammarly verified content

Let's discuss how I can help your website rank on Google's first page!`,
    },
    video: {
      title: 'Video Editor (Shorts, Reels & YouTube Masterclass)',
      text: `Habari! Nimechambua hitaji lako la uhariri wa video za kuvutia kwa ajili ya YouTube na TikTok/Reels.
Ninatumia Adobe Premiere Pro na DaVinci Resolve kuweka captions zenye rangi, transitions za kisasa, sound effects na rangi (Color Grading) zinazoongeza retention ya watazamaji kwa zaidi ya 60%.

Nitakutumia rasimu ya kwanza ndani ya saa 24!`,
    },
    forex: {
      title: 'Financial Technical Analyst & Trading Strategy Consultant',
      text: `Greetings! I specialize in Price Action, Smart Money Concepts (SMC), and Candlestick Analysis across major currency pairs (EUR/USD, GBP/JPY, XAU/USD).
I can provide comprehensive daily market breakdowns, risk-management parameters, and custom trading alerts for your community.

Let's connect to review sample charts and strategies.`,
    },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const kaziArticles = articles.filter((a) => a.category === 'kazi');

  return (
    <section className="py-6 sm:py-10 space-y-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/30 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            Kazi Mtandaoni & Freelance Hub 2026
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight editorial-font">
            Pata Ajira za Mbali & <span className="text-amber-400">Lipwa kwa Dola ($)</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Miongozo ya hatua kwa hatua ya kujisajili Upwork, Fiverr, Toptal na LinkedIn ukiwa Tanzania. Jifunze kuandika Proposals zinazoshinda na kupokea malipo yako ya moja kwa moja.
          </p>
        </div>
      </div>

      {/* Ad Placement */}
      <NetworkAdBanner placement="in-feed" />

      {/* Interactive Rate & Monthly Dola Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 bg-zinc-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-bold text-white">Kikokotoo cha Mapato ya Kazi za Mbali</h3>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1.5">
                <span>Kiwango Chako kwa Saa (Hourly Rate):</span>
                <span className="text-amber-400 font-extrabold text-sm">${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>$5/hr (Mwanzilishi)</span>
                <span>$30/hr (Mwenye Uzoefu)</span>
                <span>$100/hr (Mtaalamu Mwandamizi)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-zinc-300 mb-1.5">
                <span>Masaa ya Kazi kwa Wiki:</span>
                <span className="text-amber-400 font-extrabold text-sm">{hoursPerWeek} Masaa/Wiki</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>Muda wa Ziada (Part-time: 10 hrs)</span>
                <span>Muda Kamili (Full-time: 40 hrs)</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-950 to-zinc-900 border border-amber-400/30 text-center space-y-1">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                Makadirio ya Mapato Yako kwa Mwezi
              </span>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                ${monthlyUSD.toLocaleString()} USD
              </div>
              <p className="text-sm font-mono text-zinc-300 font-bold">≈ TZS {monthlyTZS}</p>
              <p className="text-[10px] text-zinc-300 mt-2">
                Huu ni wastani unaopatikana kwa kazi 2 hadi 4 za mwezi kwenye Upwork au mikataba ya moja kwa moja.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Proposal Template Generator */}
        <div className="lg:col-span-6 bg-zinc-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Mifano ya Barua za Maombi (Proposals)</h3>
            </div>
            <button
              onClick={() => handleCopy(proposalTemplates[selectedTemplate].text)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 text-amber-400 border border-amber-400/30 text-xs font-bold transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Imenakiliwa!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Nakili
                </>
              )}
            </button>
          </div>

          {/* Template Selectors */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {(['webdev', 'writing', 'video', 'forex'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`py-2 px-2.5 rounded-xl font-bold uppercase transition-all text-center cursor-pointer ${
                  selectedTemplate === key
                    ? 'bg-amber-400 text-black shadow'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {key === 'webdev'
                  ? 'Coding & Dev'
                  : key === 'writing'
                  ? 'Uandishi & SEO'
                  : key === 'video'
                  ? 'Video Editing'
                  : 'Forex Analyst'}
              </button>
            ))}
          </div>

          <div className="p-4 bg-black/60 border border-white/10 rounded-xl font-mono text-xs text-zinc-300 whitespace-pre-line leading-relaxed max-h-64 overflow-y-auto">
            {proposalTemplates[selectedTemplate].text}
          </div>
        </div>
      </div>

      {/* Freelance Articles Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-white editorial-font flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            Miongozo ya Kazi za Mtandaoni Tanzania
          </h3>
          <span className="text-xs text-zinc-400">{kaziArticles.length} Makala Zilizochapishwa</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {kaziArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-zinc-900/80 hover:bg-zinc-850 border border-white/10 hover:border-amber-400/40 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col group shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow">
                  Kazi Mtandaoni
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-300">
                  <span>{art.readTime}</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
