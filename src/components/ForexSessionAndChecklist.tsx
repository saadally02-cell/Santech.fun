import React, { useState } from 'react';
import {
  Clock,
  ShieldAlert,
  CheckSquare,
  Square,
  AlertTriangle,
  Flame,
  Activity,
  Globe,
  TrendingUp,
  Percent
} from 'lucide-react';

export const ForexSessionAndChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    trend: false,
    zone: false,
    trigger: false,
    risk: false,
    rrr: false,
  });

  const toggleCheck = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const checklistScore = Math.round((checkedCount / 5) * 100);

  // Time calculations (UTC + 3 for East Africa Time)
  const now = new Date();
  const utcHours = now.getUTCHours();
  const eatHours = (utcHours + 3) % 24;

  const sessions = [
    {
      name: 'London Session (Uingereza)',
      time: '10:00 Asubuhi - 06:00 Jioni EAT',
      isOpen: eatHours >= 10 && eatHours < 18,
      pairs: 'EUR/USD, GBP/USD, GBP/JPY',
      volatility: 'Juu Sana (High)',
      desc: 'Mzunguko mkubwa zaidi wa fedha duniani, mwendo thabiti wa pips 60-120.',
    },
    {
      name: 'New York Session (Marekani)',
      time: '03:00 Usiku - 11:00 Usiku EAT',
      isOpen: eatHours >= 15 && eatHours < 23,
      pairs: 'EUR/USD, USD/JPY, XAU/USD (Gold)',
      volatility: 'Juu Sana (High)',
      desc: 'Muda wa taarifa kubwa za Marekani (NFP, CPI, FOMC, Fed Rate).',
    },
    {
      name: 'Tokyo (Asian) Session (Japan)',
      time: '02:00 Usiku - 10:00 Asubuhi EAT',
      isOpen: eatHours >= 2 && eatHours < 10,
      pairs: 'USD/JPY, AUD/USD, NZD/USD',
      volatility: 'Wastani (Medium)',
      desc: 'Huweka viwango vya usiku vya Range (Asian High / Asian Low).',
    },
    {
      name: 'Sydney Session (Australia)',
      time: '12:00 Asubuhi - 08:00 Mchana EAT',
      isOpen: eatHours >= 0 && eatHours < 8,
      pairs: 'AUD/NZD, AUD/USD',
      volatility: 'Tulivu (Low)',
      desc: 'Mwanzo wa wiki ya kibiashara, nzuri kwa kuweka mipango ya wiki.',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left 6 Cols: Live Market Sessions Clock & Matrix */}
      <div className="lg:col-span-6 bg-zinc-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#10b981]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Vipindi vya Masoko ya Dunia (Trading Sessions)</h3>
              <p className="text-xs text-zinc-400">Saa za Afrika Mashariki (EAT - Dar es Salaam)</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-xs font-mono font-bold text-zinc-300">
            {String(eatHours).padStart(2, '0')}:{String(now.getMinutes()).padStart(2, '0')} EAT
          </span>
        </div>

        <div className="space-y-3">
          {sessions.map((sess, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                sess.isOpen
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-md'
                  : 'bg-zinc-950/50 border-white/5 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      sess.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
                    }`}
                  />
                  <h4 className="text-xs font-bold text-white">{sess.name}</h4>
                </div>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    sess.isOpen
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {sess.isOpen ? 'Liko Wazi Sasa (Active)' : 'Limefungwa'}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-mono mb-1">{sess.time}</p>
              <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/5 gap-2">
                <span>Jozi Kuu: <strong className="text-zinc-200">{sess.pairs}</strong></span>
                <span>Mwendo: <strong className="text-emerald-400">{sess.volatility}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right 6 Cols: Pre-Trade Safety Checklist */}
      <div className="lg:col-span-6 bg-zinc-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Orodha ya Ukaguzi Kabla ya Kuingia Sokoni</h3>
              <p className="text-xs text-zinc-400">Trading Plan Execution Safety Checklist (5/5)</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`text-sm font-black font-mono ${
              checklistScore === 100 ? 'text-emerald-400' : checklistScore >= 60 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {checklistScore}%
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          Kabla ya kubofya "Buy" au "Sell" kwenye MetaTrader yako, kagua na gonga tiki kwenye vigezo hivi 5 ili kuzuia mihemko ya FOMO na kupoteza mtaji:
        </p>

        <div className="space-y-2.5">
          <button
            onClick={() => toggleCheck('trend')}
            className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
              checklist.trend ? 'bg-emerald-500/10 border-emerald-500/40 text-white' : 'bg-zinc-950/60 border-white/10 text-zinc-400'
            }`}
          >
            {checklist.trend ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <strong className="text-zinc-200 block">1. Mwelekeo Mkuu wa Soko (Higher Timeframe Trend)</strong>
              <span>Nimetazama Daily & H4 na ninajua kama soko lipo kwenye Uptrend au Downtrend.</span>
            </div>
          </button>

          <button
            onClick={() => toggleCheck('zone')}
            className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
              checklist.zone ? 'bg-emerald-500/10 border-emerald-500/40 text-white' : 'bg-zinc-950/60 border-white/10 text-zinc-400'
            }`}
          >
            {checklist.zone ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <strong className="text-zinc-200 block">2. Eneo Kuu la Kufanyia Biashara (Key Zone / OB / Support)</strong>
              <span>Bei imefika kwenye eneo la thamani kuu, siyo katikati ya Range isiyoeleweka.</span>
            </div>
          </button>

          <button
            onClick={() => toggleCheck('trigger')}
            className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
              checklist.trigger ? 'bg-emerald-500/10 border-emerald-500/40 text-white' : 'bg-zinc-950/60 border-white/10 text-zinc-400'
            }`}
          >
            {checklist.trigger ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <strong className="text-zinc-200 block">3. Mshumaa wa Uthibitisho Umefunga (Confirmation Candle Closed)</strong>
              <span>Mshumaa wa Pin Bar au Engulfing umefungika rasmi kwenye H1 au M15 (Sijaingia kwa haraka).</span>
            </div>
          </button>

          <button
            onClick={() => toggleCheck('risk')}
            className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
              checklist.risk ? 'bg-emerald-500/10 border-emerald-500/40 text-white' : 'bg-zinc-950/60 border-white/10 text-zinc-400'
            }`}
          >
            {checklist.risk ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <strong className="text-zinc-200 block">4. Usimamizi wa Mtaji (Risk ≤ 2% ya Akaunti)</strong>
              <span>Nimepiga hesabu ya Lot Size na nikipoteza biashara hii sitapoteza zaidi ya 1% hadi 2%.</span>
            </div>
          </button>

          <button
            onClick={() => toggleCheck('rrr')}
            className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
              checklist.rrr ? 'bg-emerald-500/10 border-emerald-500/40 text-white' : 'bg-zinc-950/60 border-white/10 text-zinc-400'
            }`}
          >
            {checklist.rrr ? (
              <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <strong className="text-zinc-200 block">5. Uwiano wa Faida na Hasara (RRR ≥ 1:2)</strong>
              <span>Take Profit yangu ni angalau mara 2 ya Stop Loss yangu.</span>
            </div>
          </button>
        </div>

        {/* Verdict Badge */}
        <div className={`p-4 rounded-xl text-center text-xs font-bold ${
          checklistScore === 100
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            : checklistScore >= 60
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
        }`}>
          {checklistScore === 100
            ? '✅ Biashara hii ina Vigezo Vyote 5 (A+ High-Probability Setup)! Unaweza kuingia kwa utulivu.'
            : checklistScore >= 60
            ? '⚠️ Vigezo vimekamilika kiasi. Subiri uthibitisho zaidi kabla ya kuhatarisha mtaji.'
            : '🛑 USIINGIE SOKONI! Setup hii inavunja miiko ya kibiashara na inabeba hatari kubwa ya hasara.'}
        </div>
      </div>
    </div>
  );
};
