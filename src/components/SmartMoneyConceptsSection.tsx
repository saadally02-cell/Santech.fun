import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Crosshair,
  ShieldCheck,
  Award,
  Flame,
  Volume2,
  VolumeX,
  Share2,
  Clock,
  ExternalLink,
  Zap,
  Info,
  Maximize2,
  Layers,
  Target
} from 'lucide-react';
import { ForexCandleDiagram } from './ForexCandleDiagram';
import { Article } from '../types';

interface SmartMoneyConceptsSectionProps {
  onBackToHome?: () => void;
  onNavigateToCandlestick?: () => void;
  onNavigateToForex?: () => void;
  onSelectArticle?: (article: Article) => void;
}

export const SmartMoneyConceptsSection: React.FC<SmartMoneyConceptsSectionProps> = ({
  onBackToHome,
  onNavigateToCandlestick,
  onNavigateToForex,
  onSelectArticle
}) => {
  const [activeLessonId, setActiveLessonId] = useState<string>('smc-1');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speakingText, setSpeakingText] = useState<string>('');
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const smcImg = '/src/assets/images/smart_money_concept_chart_1787592467598.jpg';
  const pinbarImg = '/src/assets/images/pinbar_orderblock_trading_1787592481525.jpg';

  const smcLessons = [
    {
      id: 'smc-1',
      number: '1',
      title: 'Smart Money ni Nani na Mtego wa Retail Traders',
      subtitle: 'Siri ya Jinsi Mabenki Makubwa (Central Banks & Hedge Funds) Yanavyosonga Masoko',
      readTime: 'Dakika 7',
      diagramType: 'orderblock' as const,
      summary: 'Smart Money inajumuisha taasisi kubwa za kifedha (JP Morgan, Goldman Sachs, Deutsche Bank na Central Banks) zinazomiliki mabilioni ya dola. Biashara zao haziwezi kuingia sokoni kwa mara moja bila kutafuta ukwasi (Liquidity).',
      sections: [
        {
          heading: '1. Kwanini Wafanyabiashara Wadogo (Retail Traders) Hupoteza?',
          text: [
            'Wafanyabiashara wadogo hufundishwa mifumo ya kawaida ya vitabu kama "Nunua kwenye Double Bottom" au "Uza kwenye Trendline".',
            'Taasisi kubwa za kibenki zinajua fika kuwa mamilioni ya retail traders wameweka Stop Loss zao chini ya hizo Support au Trendlines.',
            'Mabenki husukuma bei kwa nguvu ili kugonga zile Stop Loss zote (Liquidity Sweep) kabla ya soko kugeuka na kwenda kule kule walikotarajia.'
          ]
        },
        {
          heading: '2. Lengo la Smart Money Concepts (SMC)',
          text: [
            'SMC haikufundishi kubahatisha. Inakufundisha kufuatilia nyayo za mabenki (Footprints of Institutional Traders).',
            'Unapoacha kufanya biashara kama Retail Trader na kuanza kuwaza kama Institutional Trader, asilimia yako ya kupata faida (Win Rate) hupanda kutoka 40% hadi zaidi ya 78%.'
          ]
        }
      ]
    },
    {
      id: 'smc-2',
      number: '2',
      title: 'Muundo wa Soko: Break of Structure (BOS) vs Change of Character (CHoCH)',
      subtitle: 'Kutambua Mwanzo na Mwisho Rasmi wa Mwenendo wa Taasisi',
      readTime: 'Dakika 8',
      diagramType: 'structure' as const,
      summary: 'Muundo wa soko ndiyo ramani kuu ya SMC. Hakuna oda inayopaswa kuwekwa kabla ya kubaini kama soko limevunja muundo (BOS) au limebadilisha tabia (CHoCH).',
      sections: [
        {
          heading: '1. Break of Structure (BOS - Trend Continuation)',
          text: [
            'BOS inatokea pale ambapo soko lililopo kwenye wimbi la kupanda (Uptrend) linapovunja kilele cha nyuma (Higher High) na kufunga mshumaa kamili (Body Close) juu yake.',
            'BOS inathibitisha kuwa mabenki bado yanaweka pesa nyingi za ununuzi na mwenendo unaendelea.'
          ]
        },
        {
          heading: '2. Change of Character (CHoCH - Trend Reversal)',
          text: [
            'CHoCH ndiyo ishara ya kwanza ya mabadiliko ya mwelekeo. Inatokea pale ambapo soko lililokuwa linapanda linapovunja bonde la mwisho la chini (Higher Low).',
            'CHoCH inakupa taarifa mapema kabla ya soko kuanza anguko kubwa kuelekea chini (Downtrend).'
          ]
        }
      ]
    },
    {
      id: 'smc-3',
      number: '3',
      title: 'Institutional Order Blocks (OB) & Mitigation',
      subtitle: 'Mishumaa ya Mwisho Ambapo Mabenki Yameweka Mabilioni ya Dola',
      readTime: 'Dakika 9',
      diagramType: 'orderblock' as const,
      summary: 'Order Block ni mshumaa wa mwisho wa upande tofauti kabla ya wimbi kubwa la mlipuko wa kibenki (Institutional Impulsive Move) linalosababisha BOS na Fair Value Gap.',
      sections: [
        {
          heading: '1. Bullish Order Block vs Bearish Order Block',
          text: [
            'Bullish Order Block: Ni mshumaa wa mwisho mwekundu (Sell Candle) kabla ya mlipuko mkubwa wa kijani uliovunja muundo juu.',
            'Bearish Order Block: Ni mshumaa wa mwisho wa kijani (Buy Candle) kabla ya anguko kubwa lililovunja muundo chini.',
            'Mean Threshold (50%): Kiwango cha nusu (50%) cha urefu wa Order Block ndicho kinachotoa sehemu salama zaidi ya kuweka oda ya kusubiri (Limit Order).'
          ]
        },
        {
          heading: '2. Dhana ya Mitigation (Mabenki Kufunga Hasara Zao)',
          text: [
            'Wakati benki zinasukuma soko juu, hufungua oda za Sell kwa muda ili kuwashawishi watu wauze. Bei inapopanda juu haraka, zile oda zao za Sell zinabaki na hasara (Drawdown).',
            'Hivyo basi, mabenki hurudisha bei chini hadi kwenye ile Order Block ili kufunga oda zao za Sell bila hasara (Breakeven/Mitigation) kabla ya kurusha bei angani.'
          ]
        }
      ]
    },
    {
      id: 'smc-4',
      number: '4',
      title: 'Liquidity Sweeps & Stop Loss Hunting',
      subtitle: 'Kuelewa Maeneo ya Mitego Ambapo Watu Wengi Wanachinjwa',
      readTime: 'Dakika 7',
      diagramType: 'breakretest' as const,
      summary: 'Ukwasi (Liquidity) ndiyo mafuta yanayoendesha soko la Forex. Bila Stop Losses za watu, mabenki hayawezi kupata wanunuzi wa kununua mabilioni yao ya mikataba.',
      sections: [
        {
          heading: '1. Aina za Ukwasi (Buy-Side vs Sell-Side Liquidity)',
          text: [
            'BSL (Buy-Side Liquidity): Ni maeneo yaliyo juu ya vilele vilivyo sawa (Equal Highs) ambapo Stop Loss za wauzaji zimekusanyika.',
            'SSL (Sell-Side Liquidity): Ni maeneo yaliyo chini ya mabonde yaliyo sawa (Equal Lows) ambapo Stop Loss za wanunuzi zimejipanga.',
            'Liquidity Sweep / Raid: Soko linapanda juu ya kilele kwa mshumaa mmoja wenye mkia mrefu, linakusanya Stop Loss zote, kisha linadondoka chini kwa kasi ya ajabu.'
          ]
        },
        {
          heading: '2. Jinsi ya Kufanya Biashara Baada ya Sweep',
          text: [
            'Kamwe usifungue biashara KABLA ya Liquidity Sweep kutokea.',
            'Subiri soko likusanye ukwasi kwenye Equal Highs, kisha litengeneze mshumaa wa uthibitisho (CHoCH au Engulfing) ndipo uingie kuelekea upande kinyume.'
          ]
        }
      ]
    },
    {
      id: 'smc-5',
      number: '5',
      title: 'Fair Value Gap (FVG) & Imbalance',
      subtitle: 'Mapengo ya Ukwasi na Mbinu ya Kuingilia Sokoni kwa Usahihi wa 80%',
      readTime: 'Dakika 8',
      diagramType: 'fvg' as const,
      summary: 'Fair Value Gap inatokea pale ambapo mshumaa wa pili katika mfuatano wa mishumaa mitatu unakuwa mkubwa sana kiasi cha kuacha uwazi kati ya mkia wa mshumaa wa kwanza na mkia wa mshumaa wa tatu.',
      sections: [
        {
          heading: '1. Kwanini FVG Inalazimika Kujazwa?',
          text: [
            'Algoriti za kibenki (Interbank Price Delivery Algorithm - IPDA) zimeundwa kutoa usawa wa bei kwa wanunuzi na wauzaji (Fair Value).',
            'Wakati kunapokuwa na mlipuko usio na uwiano (Imbalance), algoriti hulazimika kurudisha bei ili kujaza angalau 50% ya pengo hilo kabla ya kuendelea na safari.'
          ]
        },
        {
          heading: '2. Fomula ya Kuingia kwa FVG',
          text: [
            'Tazama FVG iliyo ndani ya eneo la Discount (chini ya 50% ya Fibonacci) kwa ununuzi (Buy).',
            'Tazama FVG iliyo ndani ya eneo la Premium (juu ya 50% ya Fibonacci) kwa uuzaji (Sell).',
            'Weka Stop Loss yako salama nyuma ya mwanzilishi wa wimbi la FVG.'
          ]
        }
      ]
    },
    {
      id: 'smc-6',
      number: '6',
      title: 'Mwongozo Kamili wa Multi-Timeframe Institutional Entry',
      subtitle: 'Mfumo wa Hatua kwa Hatua: Kuanzia Daily/H4 Hadi M15/M5 Execution',
      readTime: 'Dakika 8',
      diagramType: 'structure' as const,
      summary: 'Mfumo wa kitaalamu wa taasisi unahitaji kuunganisha chati kubwa (Higher Timeframe) ili kujua mwelekeo, na chati ndogo (Lower Timeframe) ili kupata Stop Loss ndogo ya pips 5 hadi 10 yenye uwiano wa 1:5 RRR.',
      sections: [
        {
          heading: 'Hatua ya 1: Higher Timeframe (H4 / Daily)',
          text: [
            'Bainisha mwenendo mkuu wa soko (Bullish au Bearish).',
            'Tia alama kwenye Key Order Blocks kuu na Liquidity Pools za BSL na SSL.'
          ]
        },
        {
          heading: 'Hatua ya 2: Intermediate Timeframe (H1)',
          text: [
            'Subiri bei iguse ile Order Block kuu au ifanye Liquidity Sweep.',
            'Tazama muundo wa BOS au CHoCH kwenye H1.'
          ]
        },
        {
          heading: 'Hatua ya 3: Lower Timeframe Execution (M15 / M5)',
          text: [
            'Mara baada ya CHoCH kutokea kwenye M15, tafuta Fair Value Gap au M15 Order Block.',
            'Ingia na Stop Loss ndogo sana ya pips 5-8 na lenga TP ya pips 40 hadi 80 (Risk to Reward ya 1:5+).'
          ]
        }
      ]
    }
  ];

  const currentLesson = smcLessons.find((l) => l.id === activeLessonId) || smcLessons[0];

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingAudio && speakingText === text) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setSpeakingText('');
      return;
    }

    window.speechSynthesis.cancel();
    const clean = text
      .replace(/\bSMC\b/gi, 'Smart Manei Konsepti')
      .replace(/\bBOS\b/gi, 'BOS Breki ofu Strakcha')
      .replace(/\bCHoCH\b/gi, 'Chenji ofu Karakita')
      .replace(/\bOrder Block\b/gi, 'Oda Bloku')
      .replace(/\bFVG\b/gi, 'Fea Valyu Gapu')
      .replace(/\bSL\b/gi, 'Stopu Losi')
      .replace(/\bTP\b/gi, 'Teiki Profiti');

    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'sw-TZ';
    u.rate = 0.95;
    u.onend = () => {
      setIsPlayingAudio(false);
      setSpeakingText('');
    };
    window.speechSynthesis.speak(u);
    setIsPlayingAudio(true);
    setSpeakingText(text);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Direct URL Route Indicator & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">URL Rasmi ya Subpage:</span>
          <code className="text-[#10b981] bg-black/50 px-2 py-0.5 rounded font-mono font-bold">
            https://santech.tz/#smc
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#smc');
            setCopiedUrl(true);
            setTimeout(() => setCopiedUrl(false), 2000);
          }}
          className="flex items-center gap-1 text-[11px] font-bold text-zinc-300 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          {copiedUrl ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          {copiedUrl ? 'Kiungo Kimekopiliwa!' : 'Nakili Kiungo cha Moja kwa Moja'}
        </button>
      </div>

      {/* Subpage Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-[#10b981] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Nyumbani</span>
              </button>
            )}
            <span className="text-zinc-600">•</span>
            {onNavigateToForex && (
              <button
                onClick={onNavigateToForex}
                className="text-xs font-bold text-zinc-400 hover:text-[#10b981] transition-colors cursor-pointer"
              >
                Forex Academy
              </button>
            )}
            <span className="text-zinc-600">•</span>
            {onNavigateToCandlestick && (
              <button
                onClick={onNavigateToCandlestick}
                className="text-xs font-bold text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Candlestick Bible ➔
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded tracking-widest">
              SMART MONEY CONCEPTS (SMC)
            </span>
            <span className="text-xs font-semibold text-zinc-400">
              Institutional Trading & Order Flow
            </span>
          </div>

          <h1 className="display-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Smart Money Concepts: Jinsi Mabenki Makubwa Yanavyofanya Biashara
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
            Acha kufanya biashara kama mfanyabiashara anayeliwa (Retail Trader). Jifunze kusoma nyayo za benki kupitia Order Blocks, Break of Structure (BOS), Fair Value Gap (FVG), na Liquidity Sweeps.
          </p>
        </div>

        {/* Action Quick Nav */}
        <div className="flex items-center gap-2 shrink-0">
          {onNavigateToCandlestick && (
            <button
              onClick={onNavigateToCandlestick}
              className="bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow"
            >
              <BookOpen className="w-4 h-4" />
              <span>Candlestick Bible Subpage</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Visual Banner with Real Chart Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Taasisi za Kibenki & Uwindaji wa Ukwasi (Order Flow)
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            Stop Loss Yako Ndiyo Faida ya Mabenki (Liquidity Engineering)
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Mabenki yanahitaji maelfu ya mikataba ili kufungua nafasi zao. Kupitia SMC, unajifunza kuingia pale ambapo wengine wamegongwa Stop Loss na kupata Risk-to-Reward Ratio ya hadi 1:6.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-black/50 border border-white/10 p-3 rounded-xl text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Win Rate ya SMC</span>
              <span className="text-base sm:text-lg font-black text-[#10b981] font-mono">78% - 86%</span>
            </div>
            <div className="bg-black/50 border border-white/10 p-3 rounded-xl text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Wastani wa RRR</span>
              <span className="text-base sm:text-lg font-black text-white font-mono">1:4 hadi 1:6</span>
            </div>
            <div className="bg-black/50 border border-white/10 p-3 rounded-xl text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Muda wa Kuingia</span>
              <span className="text-base sm:text-lg font-black text-amber-400 font-mono">M15 & M5 FVG</span>
            </div>
          </div>
        </div>

        {/* Real Chart Visual Showcase Card */}
        <div className="lg:col-span-5 relative group">
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl bg-zinc-950">
            <img
              src={smcImg}
              alt="Mchoro Halisi wa Smart Money Concepts Chart"
              referrerPolicy="no-referrer"
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => setSelectedImageModal(smcImg)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4 pointer-events-none">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#10b981]" />
                Mchoro Halisi wa SMC: BOS, Order Blocks & Liquidity Sweeps
              </span>
              <span className="text-[10px] text-zinc-400">Bofya kukuza picha (High Definition)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar Lesson List + In-depth Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Lessons */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-4 sticky top-24 space-y-3 shadow-xl">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black uppercase text-zinc-400 tracking-wider">
                Masomo ya SMC (Curriculum)
              </h3>
              <span className="text-[10px] font-mono text-[#10b981] font-bold">
                {smcLessons.length} Masomo
              </span>
            </div>

            <div className="space-y-1.5">
              {smcLessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setActiveLessonId(lesson.id);
                      if (isPlayingAudio) {
                        window.speechSynthesis.cancel();
                        setIsPlayingAudio(false);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500/15 border border-emerald-500/40 text-white shadow-md'
                        : 'hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-transparent'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                            isActive ? 'bg-[#10b981] text-black' : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          Somo {lesson.number}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">{lesson.readTime}</span>
                      </div>
                      <h4 className={`text-xs font-bold leading-snug ${isActive ? 'text-[#10b981]' : ''}`}>
                        {lesson.title}
                      </h4>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                        isActive ? 'text-[#10b981] translate-x-1' : 'text-zinc-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Quick Link Card to Orderblock Graphic */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div
                className="relative rounded-xl overflow-hidden border border-white/10 cursor-pointer group"
                onClick={() => setSelectedImageModal(pinbarImg)}
              >
                <img
                  src={pinbarImg}
                  alt="Order block trading sample"
                  referrerPolicy="no-referrer"
                  className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 text-center">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-[#10b981]" />
                    Tazama Mchoro wa Rejection & OB
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Column: Active Lesson Detailed Content */}
        <main className="lg:col-span-8 space-y-6">
          <article className="bg-zinc-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Lesson Header */}
            <div className="space-y-3 border-b border-white/10 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="bg-emerald-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded">
                  SOMO LA {currentLesson.number}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleSpeak(
                        currentLesson.summary +
                          ' ' +
                          currentLesson.sections
                            .map((s) => s.heading + '. ' + s.text.join(' '))
                            .join(' ')
                      )
                    }
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-rose-500 text-white'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Simamisha Sauti</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Sikiliza Somo Hili (Kiswahili)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Kiungo cha SMC kimenakiliwa!');
                    }}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white">
                {currentLesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
                {currentLesson.subtitle}
              </p>
            </div>

            {/* Lesson Summary Callout */}
            <div className="bg-zinc-950/80 border-l-4 border-emerald-500 p-4.5 rounded-r-2xl space-y-2">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">
                Muhtasari wa Somo la SMC
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {currentLesson.summary}
              </p>
            </div>

            {/* Detailed Text Sections */}
            <div className="space-y-8 pt-2">
              {currentLesson.sections.map((sec, idx) => (
                <section key={idx} className="space-y-3">
                  <h3 className="text-lg font-extrabold text-white border-b border-white/5 pb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{sec.heading}</span>
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {sec.text.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Interactive SVG Diagram */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-xs font-black uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
                Mchoro wa Muundo wa SMC (SVG Blueprint)
              </span>
              <ForexCandleDiagram type={currentLesson.diagramType} />
            </div>

            {/* Lesson Navigation Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              {parseInt(currentLesson.number, 10) > 1 ? (
                <button
                  onClick={() => {
                    const prevNum = (parseInt(currentLesson.number, 10) - 1).toString();
                    const prevL = smcLessons.find((l) => l.number === prevNum);
                    if (prevL) setActiveLessonId(prevL.id);
                  }}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Somo Lililopita</span>
                </button>
              ) : <div />}

              {parseInt(currentLesson.number, 10) < smcLessons.length ? (
                <button
                  onClick={() => {
                    const nextNum = (parseInt(currentLesson.number, 10) + 1).toString();
                    const nextL = smcLessons.find((l) => l.number === nextNum);
                    if (nextL) setActiveLessonId(nextL.id);
                  }}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-lg"
                >
                  <span>Nenda Somo la {parseInt(currentLesson.number, 10) + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                onNavigateToCandlestick && (
                  <button
                    onClick={onNavigateToCandlestick}
                    className="flex items-center gap-2 bg-[#10b981] hover:bg-emerald-400 text-black font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-lg"
                  >
                    <span>Pitia Candlestick Trading Bible</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )
              )}
            </div>
          </article>
        </main>
      </div>

      {/* Image Zoom Modal */}
      {selectedImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedImageModal(null)}
        >
          <div className="relative max-w-4xl w-full bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden p-2">
            <button
              onClick={() => setSelectedImageModal(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer"
            >
              ✕
            </button>
            <img
              src={selectedImageModal}
              alt="Zoomed SMC Chart"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <div className="p-4 text-center">
              <h4 className="text-sm font-bold text-white">Mchoro Halisi wa Smart Money Concepts (SMC)</h4>
              <p className="text-xs text-zinc-400 mt-1">Uchambuzi wa Order Blocks, FVG na Liquidity Sweeps</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
