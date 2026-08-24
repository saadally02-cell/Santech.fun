import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Crosshair,
  Zap,
  Info,
  Flame,
  Award
} from 'lucide-react';
import { ForexCandleDiagram } from './ForexCandleDiagram';

interface PatternItem {
  id: string;
  name: string;
  category: 'candlestick' | 'smc' | 'chart_pattern';
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  winRate: string;
  timeframe: string;
  riskReward: string;
  diagramType: 'pinbar' | 'engulfing' | 'structure' | 'breakretest' | 'doji' | 'fvg' | 'orderblock';
  summary: string;
  entryRule: string;
  stopLossRule: string;
  takeProfitRule: string;
  proTip: string;
}

export const ForexPatternCheatSheet: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'candlestick' | 'smc' | 'chart_pattern'>('all');
  const [activePatternId, setActivePatternId] = useState<string>('bullish_pinbar');

  const patterns: PatternItem[] = [
    {
      id: 'bullish_pinbar',
      name: 'Bullish Pin Bar (Hammer Rejection)',
      category: 'candlestick',
      bias: 'BULLISH',
      winRate: '74% - 82%',
      timeframe: 'H1, H4, Daily',
      riskReward: '1:2.5 au 1:3',
      diagramType: 'pinbar',
      summary: 'Mshumaa wenye mkia mrefu sana wa chini unaothibitisha wanunuzi wameikataa bei ya chini kwenye Support na kuipandisha juu kwa nguvu kubwa.',
      entryRule: 'Ingia Buy pips 2-3 mara tu mshumaa unapofungika (Close) juu ya eneo la Support.',
      stopLossRule: 'Weka Stop Loss pips 5 hadi 10 chini kabisa ya mkia (Low wick) wa Pin Bar.',
      takeProfitRule: 'Weka TP1 kwenye kilele cha karibu (Recent Swing High) na TP2 kwenye Resistance inayofuata.',
      proTip: 'Usifanye biashara ya Pin Bar iliyo katikati ya Range. Hakikisha inagusa Support kuu au 50 EMA.'
    },
    {
      id: 'bearish_engulfing',
      name: 'Bearish Engulfing Bar (Kumeza Chini)',
      category: 'candlestick',
      bias: 'BEARISH',
      winRate: '72% - 80%',
      timeframe: 'H4, Daily',
      riskReward: '1:2.5',
      diagramType: 'engulfing',
      summary: 'Mshumaa mkubwa mwekundu unaofunika mwili mzima wa mshumaa wa kijani uliotangulia kwenye eneo kuu la Resistance.',
      entryRule: 'Ingia Sell mara baada ya mshumaa wa pili kufunga chini ya mwili wa mshumaa wa kwanza.',
      stopLossRule: 'Weka Stop Loss pips 5 juu ya kilele (High) cha mshumaa wa Engulfing.',
      takeProfitRule: 'Lenga eneo la Support inayofuata chini au uwiano wa 1:2.5 wa mtaji wako.',
      proTip: 'Engulfing yenye ukubwa mara mbili ya mishumaa mitatu iliyopita inatoa msukumo mkubwa zaidi (Momentum).'
    },
    {
      id: 'order_block_mitigation',
      name: 'Institutional Order Block (OB Mitigation)',
      category: 'smc',
      bias: 'BULLISH',
      winRate: '78% - 86%',
      timeframe: 'M15, H1, H4',
      riskReward: '1:4 hadi 1:6',
      diagramType: 'orderblock',
      summary: 'Mshumaa wa mwisho wa wauzaji kabla ya benki kusukuma soko juu kwa kasi na kuvunja muundo wa soko (Break of Structure - BOS).',
      entryRule: 'Weka Limit Order ya Buy kwenye 50% ya mwili wa Order Block (Mean Threshold) soko likirudi kupumzika.',
      stopLossRule: 'Weka Stop Loss pips 5 chini ya Order Block yenyewe.',
      takeProfitRule: 'Lenga Liquidity Pool (Equal Highs) iliyopo juu kabisa ya soko.',
      proTip: 'Order Block iliyoambatana na Fair Value Gap (FVG) ndiyo yenye uwezekano wa juu zaidi kutotobolewa.'
    },
    {
      id: 'fair_value_gap',
      name: 'Fair Value Gap (FVG / Imbalance)',
      category: 'smc',
      bias: 'BULLISH',
      winRate: '75% - 83%',
      timeframe: 'M5, M15, H1, H4',
      riskReward: '1:3 hadi 1:5',
      diagramType: 'fvg',
      summary: 'Uwazi wa ukwasi uliotengenezwa na mshumaa mkubwa wa taasisi usio na wauzaji. Soko linaelekea kurudi kuujaza (Rebalance).',
      entryRule: 'Ingia pale bei inapogusa kuanzia 50% ya eneo la FVG.',
      stopLossRule: 'Weka Stop Loss nyuma ya mwanzo wa wimbi la FVG.',
      takeProfitRule: 'Lenga maeneo ya ununuzi yasiyofunikwa upande wa pili.',
      proTip: 'FVG iliyotokea wakati wa London Open (Saa 10:00 Asubuhi EAT) ina kasi kubwa ya kuleta matokeo.'
    },
    {
      id: 'break_and_retest',
      name: 'Break & Retest na Role Reversal',
      category: 'chart_pattern',
      bias: 'BULLISH',
      winRate: '70% - 78%',
      timeframe: 'H1, H4',
      riskReward: '1:2 hadi 1:3',
      diagramType: 'breakretest',
      summary: 'Eneo la dari (Resistance) linapovunjwa kwa nguvu, linapogeuka na kurudi chini hugeuka kuwa sakafu mpya (Support).',
      entryRule: 'Subiri mshumaa wa kijani au Pin Bar uthibitisho kwenye eneo la Retest kabla ya kubonyeza Buy.',
      stopLossRule: 'Weka Stop Loss pips 15 chini ya eneo la Support lililojaribiwa.',
      takeProfitRule: 'Pima urefu wa Range iliyovunjwa kisha uiongeze juu kama lengo la faida.',
      proTip: 'Kamwe usinunue Breakout ya kwanza bila kusubiri Retest, kwani 60% ya breakout za kwanza huwa ni Fakeouts.'
    },
    {
      id: 'market_structure_bos',
      name: 'Higher Highs & Higher Lows (Trend Structure)',
      category: 'chart_pattern',
      bias: 'BULLISH',
      winRate: '76% - 84%',
      timeframe: 'H4, Daily',
      riskReward: '1:3',
      diagramType: 'structure',
      summary: 'Kanuni ya kufuata mwelekeo wa soko (Trend is your friend). Unanunua tu kwenye mabonde ya juu (Higher Lows).',
      entryRule: 'Tumia Fibonacci 61.8% kupima bonde la Higher Low kisha uingie na mshumaa wa uthibitisho.',
      stopLossRule: 'Weka Stop Loss chini ya kilele cha nyuma cha Higher Low.',
      takeProfitRule: 'Lenga kuvunja Higher High iliyotangulia kuelekea kilele kipya.',
      proTip: 'Ikiwa soko linatengeneza Lower High (LH), tambua mwelekeo wa kupanda umekwisha na ubadilishe mkakati.'
    }
  ];

  const filteredPatterns = patterns.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const activePattern = patterns.find((p) => p.id === activePatternId) || patterns[0];

  return (
    <div className="bg-zinc-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Atlas ya Mifumo ya Candlestick & Smart Money (SMC)
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Mwongozo Shirikishi wa Kuwinda Fursa za Soko
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Bofya mfumo wowote hapa chini kuona mchoro wake, fomula ya kuingia (Entry), Stop Loss, na Win Rate halisi.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 bg-black/50 p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all' ? 'bg-[#10b981] text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Zote
          </button>
          <button
            onClick={() => setSelectedCategory('candlestick')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'candlestick' ? 'bg-[#10b981] text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Candlesticks
          </button>
          <button
            onClick={() => setSelectedCategory('smc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'smc' ? 'bg-[#10b981] text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            SMC & Taasisi
          </button>
          <button
            onClick={() => setSelectedCategory('chart_pattern')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'chart_pattern' ? 'bg-[#10b981] text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Muundo wa Soko
          </button>
        </div>
      </div>

      {/* Pattern Selector Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {filteredPatterns.map((pat) => {
          const isSelected = pat.id === activePatternId;
          return (
            <button
              key={pat.id}
              onClick={() => setActivePatternId(pat.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'bg-emerald-500/15 border-[#10b981] shadow-lg scale-102'
                  : 'bg-zinc-950/60 border-white/10 hover:border-white/20 hover:bg-zinc-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                    pat.bias === 'BULLISH'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : pat.bias === 'BEARISH'
                      ? 'bg-rose-500/20 text-rose-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {pat.bias}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">{pat.winRate}</span>
              </div>
              <h4 className={`text-xs font-bold line-clamp-2 ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                {pat.name}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Pattern Deep Dive Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-zinc-950/80 border border-white/10 rounded-2xl p-6 sm:p-8">
        {/* Left Col: Details & Rules */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#10b981]">
                Mfumo Uliochaguliwa
              </span>
              <h3 className="text-2xl font-black text-white">{activePattern.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                Win Rate: {activePattern.winRate}
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-mono font-bold">
                RRR: {activePattern.riskReward}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
            {activePattern.summary}
          </p>

          {/* Rules Breakdown */}
          <div className="space-y-3">
            <div className="bg-zinc-900 border border-emerald-500/30 p-3.5 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-[#10b981] text-xs font-bold">
                <Crosshair className="w-4 h-4" />
                <span>1. Sehemu ya Kuingia Sokoni (Entry Trigger):</span>
              </div>
              <p className="text-xs text-zinc-200 pl-6 leading-relaxed">{activePattern.entryRule}</p>
            </div>

            <div className="bg-zinc-900 border border-rose-500/30 p-3.5 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>2. Sehemu ya Kukinga Hasara (Stop Loss Rule):</span>
              </div>
              <p className="text-xs text-zinc-200 pl-6 leading-relaxed">{activePattern.stopLossRule}</p>
            </div>

            <div className="bg-zinc-900 border border-amber-500/30 p-3.5 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>3. Sehemu ya Kuchukua Faida (Take Profit Target):</span>
              </div>
              <p className="text-xs text-zinc-200 pl-6 leading-relaxed">{activePattern.takeProfitRule}</p>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-amber-400/10 border border-amber-400/30 p-4 rounded-xl flex items-start gap-3 text-xs text-amber-200">
            <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-black text-amber-300 uppercase tracking-wider block mb-0.5">
                Ushauri wa Mtaalamu wa SANTECH
              </strong>
              {activePattern.proTip}
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Visual Diagram */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
            Mchoro Halisi wa Chati (Visual Blueprint)
          </span>
          <ForexCandleDiagram type={activePattern.diagramType} />
          
          <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-2 text-xs text-zinc-300">
            <span className="font-bold text-white block">Muhtasari wa Haraka:</span>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Timeframe Bora:</span>
              <span className="font-bold text-emerald-400 font-mono">{activePattern.timeframe}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Muelekeo (Bias):</span>
              <span className="font-bold text-white uppercase">{activePattern.bias}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-400">Hatari kwa Biashara:</span>
              <span className="font-bold text-amber-400">Isizidi 1% - 2% ya Mtaji</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
