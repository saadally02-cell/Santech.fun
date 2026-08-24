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
  Maximize2
} from 'lucide-react';
import { ForexCandleDiagram } from './ForexCandleDiagram';
import { Article } from '../types';

interface CandlestickBibleSectionProps {
  onBackToHome?: () => void;
  onNavigateToSMC?: () => void;
  onNavigateToForex?: () => void;
  onSelectArticle?: (article: Article) => void;
}

export const CandlestickBibleSection: React.FC<CandlestickBibleSectionProps> = ({
  onBackToHome,
  onNavigateToSMC,
  onNavigateToForex,
  onSelectArticle
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>('chap-1');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speakingText, setSpeakingText] = useState<string>('');
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const candlestickImg1 = '/src/assets/images/candlestick_bible_chart_1787592453641.jpg';
  const pinbarImg = '/src/assets/images/pinbar_orderblock_trading_1787592481525.jpg';

  const chapters = [
    {
      id: 'chap-1',
      number: '1',
      title: 'Anatomia ya Mshumaa & Saikolojia ya Bei',
      subtitle: 'Kuelewa Lugha ya Siri Inayozungumzwa na Kila Mshumaa wa Kijapani',
      readTime: 'Dakika 6',
      diagramType: 'pinbar' as const,
      summary: 'Mshumaa wa Kijapani siyo tu mchoro wa rangi nyekundu na kijani; ni kioo cha vita kali ya kisaikolojia kati ya Wanunuzi (Bulls) na Wauzaji (Bears) katika kipindi maalum cha muda.',
      sections: [
        {
          heading: '1. Sehemu Kuu za Mshumaa wa Kijapani',
          text: [
            'Kila mshumaa wa Kijapani unajengwa na sehemu kuu nne za bei: Open (Bei ya Kufungulia), High (Bei ya Juu Zaidi), Low (Bei ya Chini Zaidi), na Close (Bei ya Kufungia).',
            'Mwili Halisi (Real Body): Ni umbali kati ya Open na Close. Mwili mkubwa wa kijani unaonyesha wanunuzi walikuwa na nguvu kamili (Strong Bullish Momentum), huku mwili mkubwa mwekundu ukionyesha wauzaji walitawala soko kuanzia mwanzo hadi mwisho.',
            'Mikia au Vivuli (Upper & Lower Shadows / Wicks): Huu ndio ushahidi wa bei iliyokataliwa (Price Rejection). Mkia mrefu wa chini unathibitisha wauzaji walijaribu kushusha bei lakini wanunuzi walipambana na kuirudisha juu kabla ya mshumaa kufunga.'
          ]
        },
        {
          heading: '2. Saikolojia ya Vivuli (Wick Rejection)',
          text: [
            'Kanuni Kuu ya Candlestick Bible: Ukiona mkia mrefu unaotokea kwenye eneo la Support au Resistance, tambua kuwa kuna nguvu kubwa ya taasisi inayokataa bei hiyo.',
            'Mkia wa chini (Lower Shadow) = Nguvu ya Wanunuzi kusukuma juu.',
            'Mkia wa juu (Upper Shadow) = Nguvu ya Wauzaji kugandamiza bei chini.'
          ]
        }
      ]
    },
    {
      id: 'chap-2',
      number: '2',
      title: 'Mkakati wa Bullish & Bearish Pin Bar',
      subtitle: 'Mfalme wa Mifumo ya Rejection na Njia Salama ya Kuingia Sokoni',
      readTime: 'Dakika 8',
      diagramType: 'pinbar' as const,
      summary: 'Pin Bar (Pinocchio Bar) ni silaha yenye nguvu zaidi katika Price Action. Mkia wake mrefu unasema uongo kuhusu mwelekeo wa soko na kufichua mtego wa wauzaji au wanunuzi.',
      sections: [
        {
          heading: '1. Sifa za Pin Bar Halisi (High Probability Setup)',
          text: [
            'Mkia (Tail / Wick) lazima uwe angalau mara mbili hadi mara tatu ya urefu wa mwili mzima (Real Body).',
            'Mwili lazima uwe kwenye ncha moja ya mshumaa (Juu kabisa kwa Bullish Pin Bar, au Chini kabisa kwa Bearish Pin Bar).',
            'Pua (Nose): Ni mkia mdogo sana upande wa pili, au usiwe nao kabisa.',
            'Eneo (Location): Pin Bar lazima itokee kwenye eneo lenye uzito (Key Support, Resistance, au Fibonacci 61.8%). Pin Bar inayotokea katikati ya soko lisilo na mwelekeo (No-man\'s land) haina maana na inapaswa kupuuzwa.'
          ]
        },
        {
          heading: '2. Fomula Kamili ya Kufanya Biashara (Execution Rules)',
          text: [
            'Entry Trigger: Weka Buy Stop pips 2 juu ya kilele cha Bullish Pin Bar, au ingia mara tu mshumaa unapofunga (Market Execution) ikiwa unatazama chati ya H4/Daily.',
            'Stop Loss (SL): Weka SL pips 5 hadi 10 chini ya ncha ya chini kabisa ya mkia (Low of the Pin Bar). Hii inakulinda dhidi ya kelele za soko.',
            'Take Profit (TP): TP1 inakuwa kwenye kizuizi cha kwanza cha karibu (Recent Swing High). TP2 ni uwiano wa 1:2.5 au 1:3 ya kiasi cha mtaji ulichokiweka rehani.'
          ]
        }
      ]
    },
    {
      id: 'chap-3',
      number: '3',
      title: 'Mfumo wa The Engulfing Bar (Kumeza)',
      subtitle: 'Uthibitisho wa Mabadiliko ya Nguvu za Soko na Momentum Kubwa',
      readTime: 'Dakika 7',
      diagramType: 'engulfing' as const,
      summary: 'Engulfing Bar ni mshumaa unaofunika na kumeza kabisa mwili wa mshumaa uliotangulia, kuonyesha kuwa nguvu ya soko imebadilika kwa 180%.',
      sections: [
        {
          heading: '1. Bullish Engulfing vs Bearish Engulfing',
          text: [
            'Bullish Engulfing: Hutokea mwishoni mwa mwenendo wa kushuka (Downtrend). Mshumaa wa kijani unapaswa kufungukia chini au sawa na kufunga juu ya mwili mzima wa mshumaa mwekundu uliotangulia.',
            'Bearish Engulfing: Hutokea kileleni kwenye mwenendo wa kupanda (Uptrend). Mshumaa mwekundu unameza mshumaa wa kijani na kuashiria anguko kubwa la bei linalofuata.',
            'Ukubwa wa Momentum: Ikiwa Engulfing inameza mishumaa 2 au 3 iliyotangulia kwa mara moja, huo ni uthibitisho wa kiwango cha juu (Institutional Reversal).'
          ]
        },
        {
          heading: '2. Kanuni za Kuingia na Kutoka',
          text: [
            'Entry: Ingia Sell pips 2 chini ya mwili wa Bearish Engulfing, au Buy pips 2 juu ya Bullish Engulfing.',
            'Stop Loss: Weka SL pips 5 juu ya kilele cha mshumaa wa Engulfing.',
            'Take Profit: Weka lengo la faida mara 2 hadi mara 3 ya umbali wa Stop Loss yako (RRR 1:2.5).'
          ]
        }
      ]
    },
    {
      id: 'chap-4',
      number: '4',
      title: 'The Inside Bar & Breakout Strategy',
      subtitle: 'Mbanano wa Ukwasi na Mlipuko wa Bei (Volatility Contraction)',
      readTime: 'Dakika 6',
      diagramType: 'structure' as const,
      summary: 'Inside Bar inatokea pale ambapo mshumaa mdogo unabaki ndani kabisa ya urefu wa mshumaa mkubwa uliotangulia (Mother Bar). Hii inaashiria utulivu kabla ya dhoruba ya mlipuko wa bei.',
      sections: [
        {
          heading: '1. Jinsi Inside Bar Inavyofanya Kazi',
          text: [
            'Mother Bar: Mshumaa mkubwa unaotengeneza High na Low inayofunika mshumaa unaofuata.',
            'Inside Bar: Mshumaa mdogo unaonyesha wanunuzi na wauzaji wamebana maagizo yao wakisubiri mwelekeo mpya.',
            'Trend Continuation: Ndani ya soko lenye mwenendo mkali (Strong Uptrend), Inside Bar inayotokea juu ni ishara kuwa wanunuzi wanapumzika kabla ya kusukuma bei juu zaidi.'
          ]
        },
        {
          heading: '2. Mkakati wa Kutumia Pending Orders (Buy/Sell Stops)',
          text: [
            'Weka Buy Stop pips 3 juu ya Mother Bar na Sell Stop pips 3 chini ya Mother Bar.',
            'Upande wowote unaovunjwa kwanza, oda hiyo inafunguka na oda ya upande wa pili inafutwa.',
            'Mbinu hii inalinda hisia zako kwa kuwa haubahatishi bali unafuata mwelekeo wa mlipuko.'
          ]
        }
      ]
    },
    {
      id: 'chap-5',
      number: '5',
      title: 'Morning Star, Evening Star na Doji',
      subtitle: 'Mifumo ya Mishumaa Mitatu ya Kubadili Mwelekeo wa Masoko',
      readTime: 'Dakika 7',
      diagramType: 'doji' as const,
      summary: 'Morning Star na Evening Star ni mifumo ya kuaminika inayohusisha mishumaa 3 mfululizo inayoashiria mabadiliko rasmi ya wimbi la bei.',
      sections: [
        {
          heading: '1. Muundo wa Morning Star (Mabadiliko Chini Kwenda Juu)',
          text: [
            'Mshumaa 1: Mshumaa mkubwa mwekundu unaoendeleza anguko la bei.',
            'Mshumaa 2: Mshumaa mdogo sana (Doji au Spinning Top) unaoonyesha wauzaji wameishiwa nguvu.',
            'Mshumaa 3: Mshumaa mkubwa wa kijani unaofunga zaidi ya nusu (50%) ya mshumaa wa kwanza mwekundu.',
            'Huu ni uthibitisho tosha kuwa soko linapanda juu na wanunuzi wameshinda vita.'
          ]
        },
        {
          heading: '2. Muundo wa Evening Star (Mabadiliko Juu Kwenda Chini)',
          text: [
            'Hutokea juu kwenye Resistance: Mshumaa mkubwa wa kijani ➔ Mshumaa mdogo wa Doji kileleni ➔ Mshumaa mkubwa mwekundu unaofunga chini ya 50% ya mshumaa wa kwanza.',
            'Hii ni ishara thabiti ya kuingia biashara ya Sell kwa faida kubwa.'
          ]
        }
      ]
    },
    {
      id: 'chap-6',
      number: '6',
      title: 'Kanuni 5 za Dhahabu za Candlestick Bible',
      subtitle: 'Mambo Muhimu Yatakayokufanya Kuwa Mfanyabiashara Mshindi (Consistent Trader)',
      readTime: 'Dakika 5',
      diagramType: 'breakretest' as const,
      summary: 'Mafanikio katika Candlestick Bible hayategemei kukariri maumbo pekee bali kuelewa MAHALI (Context) ambapo mshumaa unatokea.',
      sections: [
        {
          heading: '1. Muktadha ni Mfalme (Location Over Pattern)',
          text: [
            'Pin Bar au Engulfing inayotokea katikati ya soko haina maana yoyote.',
            'Subiri mshumaa utokee kwenye eneo lenye uzito (Key Support/Resistance, Trendline, au Fibonacci Level).',
            'Kamwe usifanye biashara kinyume na mwenendo mkubwa wa Daily Timeframe (The Trend is Your Friend).'
          ]
        },
        {
          heading: '2. Subiri Mshumaa Ufunge (Never Jump In Early)',
          text: [
            'Kosa kubwa la wafanyabiashara wanaoanza ni kufungua biashara wakati mshumaa bado haujafunga.',
            'Mshumaa unaweza kuonekana kama Pin Bar dakika ya 50 lakini ukageuka kuwa mshumaa wa kawaida dakika ya mwisho.',
            'Subiri sekunde ya mwisho mshumaa ufunge ndipo uweke oda yako.'
          ]
        }
      ]
    }
  ];

  const currentChapter = chapters.find((c) => c.id === activeChapterId) || chapters[0];

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
      .replace(/\bPin Bar\b/gi, 'Pini Baa')
      .replace(/\bEngulfing\b/gi, 'Ingalfingi')
      .replace(/\bSL\b/gi, 'Stopu Losi')
      .replace(/\bTP\b/gi, 'Teiki Profiti')
      .replace(/\bForex\b/gi, 'Foreksi');

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
            https://santech.tz/#candlestick
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#candlestick');
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
            {onNavigateToSMC && (
              <button
                onClick={onNavigateToSMC}
                className="text-xs font-bold text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Smart Money Concepts (SMC) ➔
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#10b981] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded tracking-widest">
              CANDLESTICK TRADING BIBLE
            </span>
            <span className="text-xs font-semibold text-zinc-400">
              Mwongozo Rasmi wa Mishumaa ya Kijapani
            </span>
          </div>

          <h1 className="display-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Candlestick Trading Bible: Kitabu Kamili cha Price Action
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
            Mbinu halisi za kusoma lugha ya chati, kutambua mifumo ya Pin Bar, Engulfing, Inside Bar, na mbinu za mabenki kwa lugha ya Kiswahili fasaha na mifano halisi ya picha za chati.
          </p>
        </div>

        {/* Action Quick Nav */}
        <div className="flex items-center gap-2 shrink-0">
          {onNavigateToSMC && (
            <button
              onClick={onNavigateToSMC}
              className="bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow"
            >
              <Sparkles className="w-4 h-4" />
              <span>SMC & Order Blocks Subpage</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Visual Banner with Real Chart Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            Uchambuzi wa Kiwango cha Juu (Price Action Mastery)
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            Kwanini 90% ya Wafanyabiashara Hupoteza Pesa kwa Kutumia Viashiria (Indicators)?
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Viashiria kama RSI au MACD huwa vinachelewa (Lagging Indicators). Candlestick Bible inakufundisha kusoma bei ghafi (Raw Price Action) mara tu inapotokea kabla ya wengine hawajagundua.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-black/50 border border-white/10 p-3 rounded-xl text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Win Rate</span>
              <span className="text-base sm:text-lg font-black text-[#10b981] font-mono">75% - 84%</span>
            </div>
            <div className="bg-black/50 border border-white/10 p-3 rounded-xl text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Hatari (RRR)</span>
              <span className="text-base sm:text-lg font-black text-white font-mono">1:2.5 hadi 1:4</span>
            </div>
            <div className="bg-black/50 border border-white/10 p-3 rounded-xl text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Muda Bora</span>
              <span className="text-base sm:text-lg font-black text-amber-400 font-mono">H4 & Daily</span>
            </div>
          </div>
        </div>

        {/* Real Chart Visual Showcase Card */}
        <div className="lg:col-span-5 relative group">
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl bg-zinc-950">
            <img
              src={candlestickImg1}
              alt="Mchoro Halisi wa Candlestick Bible Chart"
              referrerPolicy="no-referrer"
              className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => setSelectedImageModal(candlestickImg1)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4 pointer-events-none">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
                Mchoro Halisi: Bullish Pin Bar & Engulfing kwenye Support
              </span>
              <span className="text-[10px] text-zinc-400">Bofya kukuza picha (High Definition)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar Chapter List + In-depth Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Chapters */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-4 sticky top-24 space-y-3 shadow-xl">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black uppercase text-zinc-400 tracking-wider">
                Sura za Kitabu (Curriculum)
              </h3>
              <span className="text-[10px] font-mono text-[#10b981] font-bold">
                {chapters.length} Sura Kamili
              </span>
            </div>

            <div className="space-y-1.5">
              {chapters.map((chap) => {
                const isActive = chap.id === activeChapterId;
                return (
                  <button
                    key={chap.id}
                    onClick={() => {
                      setActiveChapterId(chap.id);
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
                          Sura ya {chap.number}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">{chap.readTime}</span>
                      </div>
                      <h4 className={`text-xs font-bold leading-snug ${isActive ? 'text-[#10b981]' : ''}`}>
                        {chap.title}
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

            {/* Quick Link Card to Pin Bar Graphic */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div
                className="relative rounded-xl overflow-hidden border border-white/10 cursor-pointer group"
                onClick={() => setSelectedImageModal(pinbarImg)}
              >
                <img
                  src={pinbarImg}
                  alt="Pin bar trading sample"
                  referrerPolicy="no-referrer"
                  className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 text-center">
                  <span className="text-[11px] font-bold text-white flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-[#10b981]" />
                    Tazama Mchoro wa Pin Bar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Column: Active Chapter Detailed Content */}
        <main className="lg:col-span-8 space-y-6">
          <article className="bg-zinc-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Chapter Header */}
            <div className="space-y-3 border-b border-white/10 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="bg-[#10b981] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded">
                  SURA YA {currentChapter.number}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleSpeak(
                        currentChapter.summary +
                          ' ' +
                          currentChapter.sections
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
                        <span>Sikiliza Sura Hii (Kiswahili)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Kiungo kimenakiliwa!');
                    }}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white">
                {currentChapter.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
                {currentChapter.subtitle}
              </p>
            </div>

            {/* Chapter Summary Callout */}
            <div className="bg-zinc-950/80 border-l-4 border-[#10b981] p-4.5 rounded-r-2xl space-y-2">
              <span className="text-xs font-black uppercase text-[#10b981] tracking-wider block">
                Muhtasari wa Sura
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {currentChapter.summary}
              </p>
            </div>

            {/* Detailed Text Sections */}
            <div className="space-y-8 pt-2">
              {currentChapter.sections.map((sec, idx) => (
                <section key={idx} className="space-y-3">
                  <h3 className="text-lg font-extrabold text-white border-b border-white/5 pb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]" />
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

            {/* Interactive SVG Candle Diagram */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-xs font-black uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
                Mchoro Shirikishi wa Mfumo Huu (SVG Blueprint)
              </span>
              <ForexCandleDiagram type={currentChapter.diagramType} />
            </div>

            {/* Chapter Navigation Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              {parseInt(currentChapter.number, 10) > 1 ? (
                <button
                  onClick={() => {
                    const prevNum = (parseInt(currentChapter.number, 10) - 1).toString();
                    const prevChap = chapters.find((c) => c.number === prevNum);
                    if (prevChap) setActiveChapterId(prevChap.id);
                  }}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sura Iliyopita</span>
                </button>
              ) : <div />}

              {parseInt(currentChapter.number, 10) < chapters.length ? (
                <button
                  onClick={() => {
                    const nextNum = (parseInt(currentChapter.number, 10) + 1).toString();
                    const nextChap = chapters.find((c) => c.number === nextNum);
                    if (nextChap) setActiveChapterId(nextChap.id);
                  }}
                  className="flex items-center gap-2 bg-[#10b981] hover:bg-emerald-400 text-black font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-lg"
                >
                  <span>Nenda Sura ya {parseInt(currentChapter.number, 10) + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                onNavigateToSMC && (
                  <button
                    onClick={onNavigateToSMC}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-lg"
                  >
                    <span>Endelea na Smart Money Concepts (SMC)</span>
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
              alt="Zoomed Chart"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <div className="p-4 text-center">
              <h4 className="text-sm font-bold text-white">Mchoro Halisi wa Candlestick Bible</h4>
              <p className="text-xs text-zinc-400 mt-1">Uchambuzi wa Kiufundi wa Soko la Forex na Price Action</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
