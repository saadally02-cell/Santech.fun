import React from 'react';

interface ForexCandleDiagramProps {
  type: 'pinbar' | 'engulfing' | 'structure' | 'breakretest' | 'doji' | 'fvg' | 'orderblock' | 'liquidity' | 'doublebottom';
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

  if (type === 'fvg') {
    return (
      <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-5 my-6 text-zinc-100">
        <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-3 flex items-center justify-between">
          <span>Mchoro: Fair Value Gap (FVG) / Imbalance</span>
          <span className="text-[10px] text-zinc-400 font-mono">SMART MONEY CONCEPTS</span>
        </div>
        <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 flex flex-col items-center">
          <svg width="280" height="180" viewBox="0 0 280 180">
            {/* Candle 1 */}
            <line x1="50" y1="90" x2="50" y2="150" stroke="#10b981" strokeWidth="2" />
            <rect x="40" y="100" width="20" height="40" fill="#10b981" rx="2" />
            
            {/* Candle 2 (Giant Impulse Candle) */}
            <line x1="120" y1="20" x2="120" y2="160" stroke="#10b981" strokeWidth="2" />
            <rect x="105" y="30" width="30" height="120" fill="#10b981" rx="2" />

            {/* Candle 3 */}
            <line x1="190" y1="10" x2="190" y2="70" stroke="#10b981" strokeWidth="2" />
            <rect x="180" y="20" width="20" height="40" fill="#10b981" rx="2" />

            {/* Gap Area Box between Candle 1 High and Candle 3 Low */}
            <rect x="35" y="70" width="180" height="20" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3" rx="3" />
            <text x="80" y="84" fill="#f59e0b" fontSize="10" fontWeight="bold">Fair Value Gap (FVG / Imbalance)</text>
          </svg>
          <p className="text-[11px] text-zinc-300 text-center mt-2 leading-tight">
            Eneo lenye uwazi kati ya kilele cha Mshumaa 1 na bonde la Mshumaa 3. Soko linaelekea kurudi kujaza ukwasi huu.
          </p>
        </div>
      </div>
    );
  }

  if (type === 'orderblock') {
    return (
      <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-5 my-6 text-zinc-100">
        <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-3 flex items-center justify-between">
          <span>Mchoro: Institutional Bullish Order Block (OB)</span>
          <span className="text-[10px] text-zinc-400 font-mono">SMC INSTITUTIONAL</span>
        </div>
        <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 flex flex-col items-center">
          <svg width="320" height="170" viewBox="0 0 320 170">
            {/* Bearish Order Block Candle */}
            <line x1="60" y1="80" x2="60" y2="150" stroke="#ef4444" strokeWidth="2" />
            <rect x="48" y="95" width="24" height="45" fill="#ef4444" rx="2" />
            <text x="25" y="160" fill="#ef4444" fontSize="10" fontWeight="bold">Bullish OB</text>

            {/* Impulsive Expansion Candles */}
            <line x1="100" y1="50" x2="100" y2="135" stroke="#10b981" strokeWidth="2" />
            <rect x="90" y="60" width="20" height="65" fill="#10b981" rx="2" />

            <line x1="135" y1="20" x2="135" y2="100" stroke="#10b981" strokeWidth="2" />
            <rect x="125" y="25" width="20" height="65" fill="#10b981" rx="2" />

            {/* Break of Structure Line */}
            <line x1="50" y1="25" x2="210" y2="25" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3" />
            <text x="160" y="20" fill="#3b82f6" fontSize="9" fontWeight="bold">BOS (Break of Structure)</text>

            {/* Retest to Order block */}
            <path d="M 145 35 Q 200 40 240 100" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
            <rect x="48" y="95" width="220" height="45" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1" strokeDasharray="3" rx="2" />
            <text x="220" y="120" fill="#10b981" fontSize="10" fontWeight="bold">Mitigation & Entry 🎯</text>
          </svg>
          <p className="text-[11px] text-zinc-300 text-center mt-2 leading-tight">
            Mshumaa wa mwisho wa wauzaji kabla ya mwendo wa taasisi kuvunja kilele (BOS). Unatoa nafasi bora zaidi ya ununuzi.
          </p>
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
            <text x="20" y="150" fill="#3b82f6" fontSize="10" fontWeight="bold">Low (Mwanzo)</text>
            <text x="80" y="70" fill="#10b981" fontSize="10" fontWeight="bold">HH 1</text>
            <text x="130" y="125" fill="#f59e0b" fontSize="10" fontWeight="bold">HL 1 (Buy)</text>
            <text x="200" y="35" fill="#10b981" fontSize="10" fontWeight="bold">HH 2</text>
            <text x="250" y="95" fill="#f59e0b" fontSize="10" fontWeight="bold">HL 2 (Buy)</text>
            <text x="330" y="12" fill="#10b981" fontSize="10" fontWeight="bold">HH 3</text>
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'breakretest') {
    return (
      <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-5 my-6 text-zinc-100">
        <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-3 flex items-center justify-between">
          <span>Mchoro: Mkakati wa Break and Retest (Role Reversal)</span>
          <span className="text-[10px] text-zinc-400 font-mono">BREAK & RETEST</span>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 overflow-x-auto">
          <svg width="100%" height="170" viewBox="0 0 450 170" className="min-w-[400px]">
            {/* Key Level Line */}
            <line x1="20" y1="85" x2="430" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="5" />
            <text x="25" y="78" fill="#ef4444" fontSize="10" fontWeight="bold">RESISTANCE LEVEL</text>
            <text x="310" y="102" fill="#10b981" fontSize="10" fontWeight="bold">NEW SUPPORT LEVEL</text>

            {/* Wave */}
            <polyline
              points="40,140 100,90 140,120 200,80 260,35 310,80 370,25"
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="260" cy="35" r="5" fill="#3b82f6" />
            <text x="245" y="25" fill="#3b82f6" fontSize="10" fontWeight="bold">Breakout</text>

            <circle cx="310" cy="80" r="6" fill="#f59e0b" />
            <text x="290" y="65" fill="#f59e0b" fontSize="11" fontWeight="bold">Retest (Entry) 🎯</text>
          </svg>
        </div>
      </div>
    );
  }

  // Default: Doji
  return (
    <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-5 my-6 text-zinc-100">
      <div className="text-xs font-black uppercase text-emerald-400 tracking-wider mb-3 flex items-center justify-between">
        <span>Mchoro: Doji Candlestick (Kutokuwa na Uamuzi)</span>
        <span className="text-[10px] text-zinc-400 font-mono">DOJI ANATOMY</span>
      </div>
      <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 flex flex-col items-center">
        <svg width="120" height="150" viewBox="0 0 120 150">
          <line x1="60" y1="20" x2="60" y2="130" stroke="#f59e0b" strokeWidth="3" />
          <line x1="35" y1="75" x2="85" y2="75" stroke="#f59e0b" strokeWidth="4" />
          <text x="10" y="80" fill="#a1a1aa" fontSize="9">Open = Close</text>
        </svg>
        <p className="text-[11px] text-zinc-300 text-center mt-2">
          Mwili ni mstari mwembamba unaoonyesha wanunuzi na wauzaji wamefika sare.
        </p>
      </div>
    </div>
  );
};
