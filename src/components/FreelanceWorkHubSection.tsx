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
  Award,
  Share2,
  CheckCircle2,
  Wallet,
  FileText,
  CreditCard,
  Layers,
  ArrowRight
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
  const [selectedTemplate, setSelectedTemplate] = useState<'webdev' | 'writing' | 'video' | 'forex' | 'ai'>('webdev');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const monthlyUSD = hourlyRate * hoursPerWeek * 4;
  const monthlyTZS = (monthlyUSD * 2650).toLocaleString('sw-TZ');

  const proposalTemplates = {
    webdev: {
      title: 'Full-Stack / React / Python Web Developer Proposal',
      text: `Habari! Nimeona tangazo lako la mradi wa Web Application. 
Nikiwa na uzoefu wa miaka 3+ nikijenga mifumo ya kisasa kwa kutumia React, TypeScript, Python (FastAPI), na Tailwind CSS, ninaweza kukukabidhi kazi safi yenye kasi ya hali ya juu.

Mambo nitakayotekeleza mara moja:
1. Muundo maridadi unaoendana na simu na kompyuta (100% Responsive UI)
2. Usimbaji wa APIs, uthibitisho wa watumiaji (Auth) na usalama wa data
3. Upimaji na uwasilishaji wa mradi ndani ya muda uliopangwa

Angalia mifano ya kazi zangu: https://santech.tz/#dev
Tunaweza kufanya kikao cha dakika 10 kupitia Google Meet kuanza mara moja.`,
    },
    writing: {
      title: 'SEO Content Writer & Translator (Swahili & English)',
      text: `Hi there! I reviewed your project for high-ranking SEO content and article writing.
With extensive experience writing for top tech, tourism, and financial publications in East Africa, I will deliver compelling, 100% human-crafted articles optimized for Google ranking.

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
    ai: {
      title: 'AI Automation & Custom Chatbot Developer Proposal',
      text: `Habari! Nimebobea katika ujenzi wa AI Agents na WhatsApp Automation kwa kutumia Gemini 3.7 na OpenAI APIs.
Ninaweza kuunganisha mfumo wako wa e-commerce au huduma kwa wateja ili uweze kujibu maswali ya Kiswahili na Kiingereza saa 24/7 na kufunga mauzo moja kwa moja.

Niko tayari kukuonyesha demo ya moja kwa moja ya mfumo unaofanya kazi!`,
    },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const kaziArticles = articles.filter((a) => a.category === 'kazi');

  return (
    <section className="space-y-12 pb-16">
      {/* Direct URL Route Indicator & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">URL Rasmi ya Subpage:</span>
          <code className="text-amber-400 bg-black/50 px-2 py-0.5 rounded font-mono font-bold">
            https://santech.tz/#kazi
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#kazi');
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
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/30 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            Kazi Mtandaoni & Freelance Hub 2026
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight editorial-font">
            Pata Ajira za Mbali & <span className="text-amber-400">Lipwa kwa Dola ($)</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Miongozo ya hatua kwa hatua ya kujisajili Upwork, Fiverr, Toptal na LinkedIn ukiwa Tanzania. Jifunze kuandika Proposals zinazoshinda kazi na kutoa pesa zako moja kwa moja kwenda benki au pochi ya M-Pesa.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Step-by-Step Freelancing Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            step: '01',
            title: 'Chagua Ujuzi wa Thamani Kubwa',
            desc: 'Web Development, UI/UX Design, Uhariri wa Video, AI Prompting au Uandishi wa SEO.',
            icon: Award,
          },
          {
            step: '02',
            title: 'Jenga Portfolio Yenye Mifano Halisi',
            desc: 'Weka kazi 3 hadi 5 zilizokamilika kwenye tovuti yako au GitHub ili mteja aone ubora wako.',
            icon: Globe,
          },
          {
            step: '03',
            title: 'Tuma Proposals Zenye Suluhisho',
            desc: 'Jibu shida maalum ya mteja ndani ya mistari miwili ya kwanza bila kutumia ujumbe wa template ya kijumla.',
            icon: Send,
          },
          {
            step: '04',
            title: 'Pokea Malipo kwa Dola ($) Salama',
            desc: 'Unganisha Payoneer, Geepay au Wise kwenda benki yako (CRDB, NMB) au M-Pesa.',
            icon: Wallet,
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-zinc-900 border border-white/10 p-5 rounded-2xl space-y-2 hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between text-xs font-black text-amber-400">
                <span>HATUA {item.step}</span>
                <Icon className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Earnings Calculator */}
      <div className="bg-zinc-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              Kikokotoo cha Makadirio ya Mapato ya Kazi Mtandaoni
            </h3>
            <p className="text-xs text-zinc-400">Kadiria kiasi unachoweza kupata kila mwezi kulingana na malipo ya saa</p>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            1 USD = 2,650 TZS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-300">Malipo kwa Saa (Hourly Rate):</span>
              <span className="text-amber-400">${hourlyRate}/Saa</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-300">Masaa ya Kazi kwa Wiki:</span>
              <span className="text-amber-400">{hoursPerWeek} Masaa/Wiki</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-zinc-950 p-5 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-black text-zinc-400">Kadirio la Mapato kwa Mwezi:</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              ${monthlyUSD.toLocaleString()} USD
            </div>
            <div className="text-xs text-zinc-400">Sawa na takriban TZS {monthlyTZS}</div>
          </div>
          <div className="text-xs text-zinc-400 text-right max-w-xs">
            Makadirio kulingana na wateja wa kimataifa kutoka Marekani, Uingereza, na Ulaya kwenye majukwaa ya Upwork na Fiverr.
          </div>
        </div>
      </div>

      {/* Winning Proposals Studio */}
      <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-400" />
              Sampuli za Proposals Zinazoshinda Kazi Upwork & Fiverr
            </h3>
            <p className="text-xs text-zinc-400">Nakili na ubadilishe kulingana na maelezo ya mradi wako</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(proposalTemplates) as Array<keyof typeof proposalTemplates>).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                  selectedTemplate === key
                    ? 'bg-amber-500 text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {key === 'webdev' ? 'Web Developer' : key === 'writing' ? 'SEO Writer' : key === 'video' ? 'Video Editor' : key === 'forex' ? 'Financial Analyst' : 'AI Automation'}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="bg-zinc-950 p-5 sm:p-6 rounded-2xl border border-white/5 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
            {proposalTemplates[selectedTemplate].text}
          </div>
          <button
            onClick={() => handleCopy(proposalTemplates[selectedTemplate].text)}
            className="absolute top-4 right-4 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Imenakiliwa!' : 'Nakili'}
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Miongozo ya Kazi za Mtandaoni
          </h3>
          <span className="text-xs text-zinc-400">{kaziArticles.length} Makala</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kaziArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-400 border border-white/10">
                    {article.categoryName || 'Kazi'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.readTime}</span>
                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Soma Mwongozo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
