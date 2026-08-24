import React from 'react';

interface ForexCandleDiagramProps {
  type: 'pinbar' | 'engulfing' | 'structure' | 'breakretest' | 'doji';
}

export const ForexCandleDiagram: React.FC<ForexCandleDiagramProps> = ({ type }) => {
  if (type === 'pinbar') {
    return (
      <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-5 my-6 text-zinc-100">
        <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-3 flex items-center justify-between">
          <span>Mchoro: Bullish & Bearish Pin Bar (Rejection Wicks)</span>
          <span className="text-[10px] text-zinc-400 font-mono">SANTECH CHART LAB</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Bullish Pin Bar (Hammer) */}
          <div className="bg-zinc-900/80 border border-emerald-500/30 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs font-extrabold text-emerald-400 mb-2">Bullish Pin Bar (Support)</span>
            <svg width="140" height="180" viewBox="0 0 140 180" className="overflow-visible">
              {/* Upper Tiny Wick */}
              <line x1="70" y1="25" x2="70" y2="40" stroke="#10b981" strokeWidth="2.5" />
              {/* Real Body */}
              <rect x="52" y="40" width="36" height="30" fill="#10b981" rx="3" />
              {/* Long Lower Rejection Wick */}
              <line x1="70" y1="70" x2="70" y2="160" stroke="#10b981" strokeWidth="3" />

              {/* Annotation labels */}
              <text x="96" y="58" fill="#a1a1aa" fontSize="10" fontFamily="sans-serif">Mwili Mdogo</text>
              <text x="80" y="125" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Mkia Mrefu (2x-3x)</text>
              <line x1="15" y1="165" x2="125" y2="165" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" />
              <text x="20" y="177" fill="#ef4444" fontSize="9" fontFamily="sans-serif">Eneo Kuu la Support</text>
            </svg>
            <p className="text-[11px] text-zinc-300 text-center mt-2 leading-tight">
              Wanunuzi walikataa bei ya chini na kusukuma soko juu kwa nguvu.
            </p>
          </div>

          {/* Bearish Pin Bar (Shooting Star) */}
          <div className="bg-zinc-900/80 border border-rose-500/30 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs font-extrabold text-rose-400 mb-2">Bearish Pin Bar (Resistance)</span>
            <svg width="140" height="180" viewBox="0 0 140 180" className="overflow-visible">
              <line x1="15" y1="20" x2="125" y2="20" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" />
              <text x="20" y="15" fill="#ef4444" fontSize="9" fontFamily="sans-serif">Eneo Kuu la Resistance</text>
              
              {/* Long Upper Rejection Wick */}
              <line x1="70" y1="22" x2="70" y2="110" stroke="#ef4444" strokeWidth="3" />
              {/* Real Body */}
              <rect x="52" y="110" width="36" height="30" fill="#ef4444" rx="3" />
              {/* Tiny Lower Wick */}
              <line x1="70" y1="140" x2="70" y2="155" stroke="#ef4444" strokeWidth="2.5" />

              {/* Annotation labels */}
              <text x="80" y="65" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Mkia Mrefu (Rejection)</text>
              <text x="96" y="128" fill="#a1a1aa" fontSize="10" fontFamily="sans-serif">Mwili Mdogo</text>
            </svg>
            <p className="text-[11px] text-zinc-300 text-center mt-2 leading-tight">
              Wauzaji walikataa bei ya juu na kusukuma soko chini kwa kasi.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'engulfing') {
    return (
      <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-5 my-6 text-zinc-100">
        <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-3 flex items-center justify-between">
          <span>Mchoro: Bullish & Bearish Engulfing Patterns</span>
          <span className="text-[10px] text-zinc-400 font-mono">PRICE ACTION</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Bullish Engulfing */}
          <div className="bg-zinc-900/80 border border-emerald-500/30 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs font-extrabold text-emerald-400 mb-2">Bullish Engulfing (Kumeza Juu)</span>
            <svg width="160" height="150" viewBox="0 0 160 150">
              {/* Candle 1 (Small Bearish) */}
              <line x1="45" y1="40" x2="45" y2="110" stroke="#ef4444" strokeWidth="2" />
              <rect x="35" y="55" width="20" height="40" fill="#ef4444" rx="2" />

              {/* Candle 2 (Large Bullish Engulfing) */}
              <line x1="105" y1="20" x2="105" y2="135" stroke="#10b981" strokeWidth="2.5" />
              <rect x="88" y="35" width="34" height="85" fill="#10b981" rx="3" />

              <path d="M 58 75 L 82 75" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="3" />
            </svg>
            <p className="text-[11px] text-zinc-300 text-center mt-2 leading-tight">
              Mshumaa wa kijani unaofunika mwili mzima wa mshumaa uliopita wa wauzaji.
            </p>
          </div>

          {/* Bearish Engulfing */}
          <div className="bg-zinc-900/80 border border-rose-500/30 rounded-xl p-4 flex flex-col items-center">
            <span className="text-xs font-extrabold text-rose-400 mb-2">Bearish Engulfing (Kumeza Chini)</span>
            <svg width="160" height="150" viewBox="0 0 160 150">
              {/* Candle 1 (Small Bullish) */}
              <line x1="45" y1="40" x2="45" y2="110" stroke="#10b981" strokeWidth="2" />
              <rect x="35" y="55" width="20" height="40" fill="#10b981" rx="2" />

              {/* Candle 2 (Large Bearish Engulfing) */}
              <line x1="105" y1="20" x2="105" y2="135" stroke="#ef4444" strokeWidth="2.5" />
              <rect x="88" y="35" width="34" height="85" fill="#ef4444" rx="3" />

              <path d="M 58 75 L 82 75" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="3" />
            </svg>
            <p className="text-[11px] text-zinc-300 text-center mt-2 leading-tight">
              Mshumaa mwekundu mkubwa unaofunika mwili mzima wa mshumaa wa wanunuzi.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'structure') {
    return (
      <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-5 my-6 text-zinc-100">
        <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-3 flex items-center justify-between">
          <span>Mchoro: Muundo wa Soko (Higher Highs & Higher Lows)</span>
          <span className="text-[10px] text-zinc-400 font-mono">MARKET STRUCTURE</span>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 overflow-x-auto">
          <svg width="100%" height="160" viewBox="0 0 450 160" className="min-w-[400px]">
            {/* Uptrend Wave Line */}
            <polyline
              points="30,130 90,80 140,105 210,45 260,75 340,20"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dots on Key Swings */}
            <circle cx="30" cy="130" r="5" fill="#3b82f6" />
            <circle cx="90" cy="80" r="5" fill="#10b981" />
            <circle cx="140" cy="105" r="5" fill="#f59e0b" />
            <circle cx="210" cy="45" r="5" fill="#10b981" />
            <circle cx="260" cy="75" r="5" fill="#f59e0b" />
            <circle cx="340" cy="20" r="5" fill="#10b981" />

            {/* Labels */}
            <text x="80" y="70" fill="#10b981" fontSize="11" fontWeight="bold">HH 1</text>
            <text x="130" y="125" fill="#f59e0b" fontSize="11" fontWeight="bold">HL 1</text>
            <text x="200" y="35" fill="#10b981" fontSize="11" fontWeight="bold">HH 2 (BOS)</text>
            <text x="250" y="95" fill="#f59e0b" fontSize="11" fontWeight="bold">HL 2</text>
            <text x="330" y="15" fill="#10b981" fontSize="11" fontWeight="bold">HH 3</text>

            {/* Break of Structure Line */}
            <line x1="90" y1="80" x2="210" y2="80" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="3" />
            <text x="110" y="74" fill="#a1a1aa" fontSize="9">BOS (Break of Structure)</text>
          </svg>
        </div>
        <p className="text-xs text-zinc-300 mt-2">
          Kwenye Uptrend safi, kila kilele kipya kinavuka cha awali (Higher High), na kila bonde linasimama juu ya bonde lililopita (Higher Low).
        </p>
      </div>
    );
  }

  if (type === 'breakretest') {
    return (
      <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-5 my-6 text-zinc-100">
        <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-3 flex items-center justify-between">
          <span>Mchoro: Mkakati Kamili wa Break & Retest</span>
          <span className="text-[10px] text-zinc-400 font-mono">ROLE REVERSAL</span>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 overflow-x-auto">
          <svg width="100%" height="170" viewBox="0 0 450 170" className="min-w-[400px]">
            {/* Key Level Line (Resistance -> Support) */}
            <line x1="20" y1="85" x2="430" y2="85" stroke="#ef4444" strokeWidth="2.5" />
            <text x="25" y="78" fill="#ef4444" fontSize="10" fontWeight="bold">Resistance ya Awali</text>
            <text x="330" y="102" fill="#10b981" fontSize="10" fontWeight="bold">Support Mpya</text>

            {/* Price Movement */}
            <path
              d="M 40 140 Q 80 85 110 85 T 160 130 T 220 40 T 290 85 T 380 20"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Step markers */}
            <circle cx="110" cy="85" r="4" fill="#ef4444" />
            <text x="100" y="105" fill="#a1a1aa" fontSize="9">1. Reject</text>

            <circle cx="220" cy="60" r="5" fill="#10b981" />
            <text x="210" y="32" fill="#10b981" fontSize="10" fontWeight="bold">2. Breakout</text>

            <circle cx="290" cy="85" r="6" fill="#f59e0b" />
            <text x="270" y="125" fill="#f59e0b" fontSize="10" fontWeight="bold">3. Retest + Entry</text>

            <circle cx="380" cy="20" r="5" fill="#10b981" />
            <text x="360" y="12" fill="#10b981" fontSize="10" fontWeight="bold">4. Take Profit</text>
          </svg>
        </div>
        <p className="text-xs text-zinc-300 mt-2">
          Kuingia kwenye hatua ya 3 (Retest) kunakupa usalama mkubwa zaidi wa mtaji na Stop Loss ndogo sana ikilinganishwa na kuingia wakati wa Breakout ya kwanza.
        </p>
      </div>
    );
  }

  // Doji
  return (
    <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-5 my-6 text-zinc-100">
      <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-3">
        Mchoro: Aina Kuu za Mishumaa ya Doji (Indecision)
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900 p-3 rounded-xl flex flex-col items-center">
          <span className="text-xs font-bold text-zinc-300 mb-2">Standard Doji</span>
          <svg width="60" height="90" viewBox="0 0 60 90">
            <line x1="30" y1="10" x2="30" y2="80" stroke="#fafafa" strokeWidth="2" />
            <line x1="15" y1="45" x2="45" y2="45" stroke="#fafafa" strokeWidth="3" />
          </svg>
          <span className="text-[10px] text-zinc-400 text-center mt-1">Wanunuzi & Wauzaji wamelingana</span>
        </div>

        <div className="bg-zinc-900 p-3 rounded-xl flex flex-col items-center">
          <span className="text-xs font-bold text-emerald-400 mb-2">Dragonfly Doji</span>
          <svg width="60" height="90" viewBox="0 0 60 90">
            <line x1="30" y1="15" x2="30" y2="85" stroke="#10b981" strokeWidth="2.5" />
            <line x1="12" y1="18" x2="48" y2="18" stroke="#10b981" strokeWidth="4" />
          </svg>
          <span className="text-[10px] text-emerald-300 text-center mt-1">Nguvu ya Wanunuzi (Bullish)</span>
        </div>

        <div className="bg-zinc-900 p-3 rounded-xl flex flex-col items-center">
          <span className="text-xs font-bold text-rose-400 mb-2">Gravestone Doji</span>
          <svg width="60" height="90" viewBox="0 0 60 90">
            <line x1="30" y1="10" x2="30" y2="80" stroke="#ef4444" strokeWidth="2.5" />
            <line x1="12" y1="78" x2="48" y2="78" stroke="#ef4444" strokeWidth="4" />
          </svg>
          <span className="text-[10px] text-rose-300 text-center mt-1">Nguvu ya Wauzaji (Bearish)</span>
        </div>
      </div>
    </div>
  );
};
