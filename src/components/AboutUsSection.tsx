import React, { useState } from 'react';
import {
  Info,
  Shield,
  Target,
  Award,
  Users,
  Mail,
  MapPin,
  Sparkles,
  Heart,
  Globe,
  MessageCircle,
  PhoneCall,
  Bot,
  Send,
  Loader2,
  CheckCircle2,
  Copy,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { NetworkAdBanner } from './NetworkAdBanner';

interface AboutUsSectionProps {
  onOpenAiAssistant?: () => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ onOpenAiAssistant }) => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const whatsappNumber = '255691302979';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Habari SANTECH TZ (+255691302979)! Ningependa kuuliza kuhusu mafunzo na huduma zenu...'
  )}`;

  const quickPrompts = [
    'Nieleze misingi ya Candlestick Trading Bible',
    'Jinsi ya kuanza kupata kazi za Upwork ukiwa Tanzania',
    'Vivutio bora vya kitalii vya Serengeti na Zanzibar',
    'Misingi ya Risk Management kwenye Forex (1-2% Rule)',
  ];

  const handleAskAi = async (questionToAsk?: string) => {
    const q = (questionToAsk || aiQuery).trim();
    if (!q || aiLoading) return;

    setAiLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiResponse(data.reply || 'Samahani, sikupokea jibu sahihi kutoka kwa AI.');
      } else {
        setAiResponse(
          'Habari! Mfumo wa AI unafanya kazi. Unaweza pia kuwasiliana nasi moja kwa moja kupitia WhatsApp (+255691302979).'
        );
      }
    } catch (err) {
      console.error('AI chat error:', err);
      setAiResponse(
        'Habari! Tuko hewani. Kwa maelezo zaidi kuhusu Forex, Utalii na Teknolojia, tafadhali vinjari moduli zetu au uwasiliane nasi kupitia WhatsApp.'
      );
    } finally {
      setAiLoading(false);
    }
  };

  const copyAiResponse = () => {
    if (!aiResponse) return;
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-6 sm:py-10 space-y-10">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-[#10b981]/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/30 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981] text-xs font-black uppercase tracking-wider">
            <Info className="w-3.5 h-3.5" />
            Kuhusu SANTECH TZ Media & Academy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight editorial-font">
            Dhamira Yetu: Kuelimisha & <span className="text-[#10b981]">Kukuza Vipaji vya Afrika</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            SANTECH TZ ni jukwaa huru la teknolojia na mafunzo ya kifedha lililoanzishwa Dar es Salaam, Tanzania likiwa na lengo la kutoa elimu ya kisasa ya Forex, Akili Bandia, Kazi za Kidijitali na Utalii kwa lugha ya Kiswahili na Kiingereza.
          </p>
        </div>
      </div>

      <NetworkAdBanner placement="in-feed" />

      {/* Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Elimu ya Vitendo (Practical Focus)</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Hatufundishi nadharia pekee. Moduli zetu za Forex, Coding na Kazi za Mtandaoni zinajengwa kwa mifano hai inayoweza kutumiwa mara moja kuleta matokeo.
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Ukweli & Uwazi wa Taarifa</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Taarifa zetu za uchambuzi wa masoko na teknolojia zinazingatia maadili ya juu ya uhariri bila ahadi za uongo wala mkato wa utajiri wa haraka usio na uhalisia.
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Kukuza Utalii & Fahari ya Taifa</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Tunajivunia vivutio vya kitalii vya Tanzania na kutoa miongozo ya kuwezesha wataalamu wa kimataifa kuishi na kufanya kazi nchini (Digital Nomad friendly).
          </p>
        </div>
      </div>

      {/* Editorial Team & Office Location */}
      <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-[#10b981]" />
          Wasiliana na Idara ya Uhariri ya SANTECH TZ
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-zinc-300">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#10b981]" />
              <span className="font-bold text-white">Makao Makuu:</span>
            </div>
            <p className="pl-6 text-zinc-400 leading-relaxed">
              SANTECH Innovation Hub, Posta Mpya & Mikocheni, Dar es Salaam, Tanzania.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#10b981]" />
              <span className="font-bold text-white">Barua Pepe Rasmi:</span>
            </div>
            <p className="pl-6 text-zinc-400 leading-relaxed font-mono">
              info@santech.tz / editorial@santech.tz
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: 1. SANTECH WhatsApp Chat & 2. SANTECH AI Swahili */}
      <div className="pt-6 border-t border-white/10 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-[#10b981]">
            Mawasiliano & Huduma za Msaada
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Chat na SANTECH WhatsApp & Msaidizi wa AI
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Tumia njia zetu rasmi kupata msaada wa haraka, ushauri wa masomo ya Forex au majibu ya maswali ya teknolojia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Official WhatsApp Support & Direct Chat */}
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 border border-[#25D366]/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-xs font-bold font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  +255 691 302 979
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">
                  Chat Moja kwa Moja kwenye WhatsApp
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Je, una swali kuhusu moduli za Forex, unahitaji ushauri wa kiufundi, au unataka kutangaza biashara yako kwenye SANTECH TZ? Idara yetu ya huduma kwa wateja iko tayari kukusaidia.
                </p>
              </div>

              <div className="bg-black/50 border border-white/5 rounded-2xl p-4 space-y-2 text-xs text-zinc-300">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Nambari Rasmi:</span>
                  <span className="font-mono font-bold text-white">+255 691 302 979</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-400">Muda wa Majibu:</span>
                  <span className="font-bold text-[#25D366]">Ndani ya Dakika 15</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-400">Masaa ya Kazi:</span>
                  <span className="font-bold text-zinc-200">Jumatatu - Jumapili (24/7)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-emerald-500 text-black font-black text-sm uppercase tracking-wider py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xl hover:scale-102 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Fungua WhatsApp Chat (+255691302979)</span>
              </a>
            </div>
          </div>

          {/* Card 2: SANTECH AI Swahili Interactive Terminal */}
          <div className="bg-zinc-900/95 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#10b981]">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-[#10b981]/20 text-[#10b981] border border-emerald-500/30 font-mono">
                    GEMINI 3.7 FLASH
                  </span>
                  {onOpenAiAssistant && (
                    <button
                      onClick={onOpenAiAssistant}
                      className="text-xs text-zinc-400 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-lg border border-white/10 transition-colors cursor-pointer"
                      title="Fungua kisanduku kamili cha AI"
                    >
                      Fungua Dirisha
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>SANTECH AI Swahili Assistant</span>
                  <Sparkles className="w-4 h-4 text-[#10b981]" />
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Uliza swali lolote papo hapo kuhusu Forex, uandishi wa kodi (Coding), fursa za Upwork au vivutio vya utalii kwa Kiswahili:
                </p>
              </div>

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAiQuery(prompt);
                      handleAskAi(prompt);
                    }}
                    className="text-[11px] bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 hover:text-[#10b981] border border-white/10 px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-left"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>

              {/* Query Input Box */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-zinc-950 border border-white/15 rounded-xl p-1.5 focus-within:border-emerald-500 transition-colors">
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAskAi();
                    }}
                    placeholder="Andika swali lako hapa kwa Kiswahili..."
                    className="w-full bg-transparent text-xs text-white placeholder-zinc-500 px-2 py-1.5 focus:outline-none"
                  />
                  <button
                    onClick={() => handleAskAi()}
                    disabled={aiLoading || !aiQuery.trim()}
                    className="bg-[#10b981] hover:bg-emerald-400 disabled:opacity-40 text-black font-bold p-2 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    {aiLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Live AI Response Display */}
              {aiResponse && (
                <div className="bg-zinc-950/90 border border-emerald-500/30 rounded-xl p-4 space-y-2 animate-fadeIn text-xs text-zinc-200 leading-relaxed max-h-56 overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] font-black uppercase text-[#10b981] flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Jibu la SANTECH AI:
                    </span>
                    <button
                      onClick={copyAiResponse}
                      className="text-zinc-400 hover:text-white flex items-center gap-1 text-[10px] cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Imenakiliwa!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Nakili</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="whitespace-pre-line text-zinc-300 font-sans">
                    {aiResponse}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-zinc-500">
                Inaendeshwa na modeli ya kisasa ya Google Gemini 3.7 Flash kwa lugha ya Kiswahili.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
