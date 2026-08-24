import React, { useState } from 'react';
import { Calculator, ShieldAlert, DollarSign, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';

export const ForexCalculatorTool: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState<number>(500);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [stopLossPips, setStopLossPips] = useState<number>(25);
  const [currencyPair, setCurrencyPair] = useState<string>('EURUSD');
  const [rewardRatio, setRewardRatio] = useState<number>(2.5);

  // Pip value approximation for standard lot ($10 for major pairs)
  const pipValuePerStandardLot = currencyPair.includes('JPY') ? 9.2 : 10.0;

  const riskAmount = (accountBalance * riskPercent) / 100;
  const rawLotSize = stopLossPips > 0 ? riskAmount / (stopLossPips * pipValuePerStandardLot) : 0;
  const lotSizeFormatted = Math.max(0.01, Math.floor(rawLotSize * 100) / 100);
  const targetProfit = riskAmount * rewardRatio;

  // Live session status calculations (East Africa Time - UTC+3)
  const now = new Date();
  const utcHours = now.getUTCHours();
  const eatHours = (utcHours + 3) % 24;

  const londonOpen = eatHours >= 10 && eatHours < 18;
  const newYorkOpen = eatHours >= 15 && eatHours < 23;
  const tokyoOpen = eatHours >= 2 && eatHours < 10;
  const sydneyOpen = eatHours >= 0 && eatHours < 8;
  const overlapOpen = londonOpen && newYorkOpen;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Lot Size & Risk Calculator */}
        <div className="lg:col-span-2 bg-zinc-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#10b981]/20 border border-emerald-500/40 flex items-center justify-center text-[#10b981]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Kikokotoo cha Lot Size & Usimamizi wa Hatari (Risk Calculator)
                </h3>
                <p className="text-xs text-zinc-400">
                  Kokotoa Lot Size sahihi ya kuingiza kwenye MT4/MT5 kulingana na akaunti yako
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
                Mtaji wa Akaunti ($ USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                <input
                  type="number"
                  min="10"
                  max="1000000"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Number(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-8 pr-3 py-2.5 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
                Kiwango cha Hatari (Risk %)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                <span className="text-xs font-bold text-zinc-400">%</span>
              </div>
              <div className="flex gap-1.5 mt-2">
                {[1.0, 1.5, 2.0].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setRiskPercent(preset)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${
                      riskPercent === preset
                        ? 'bg-[#10b981] text-black'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {preset}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
                Stop Loss (Pips)
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={stopLossPips}
                onChange={(e) => setStopLossPips(Number(e.target.value) || 1)}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
                Jozi ya Sarafu (Pair)
              </label>
              <select
                value={currencyPair}
                onChange={(e) => setCurrencyPair(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="EURUSD">EUR/USD (Euro / US Dollar)</option>
                <option value="GBPUSD">GBP/USD (Great Britain Pound / USD)</option>
                <option value="USDJPY">USD/JPY (US Dollar / Japanese Yen)</option>
                <option value="XAUUSD">XAU/USD (Gold / Dhahabu)</option>
                <option value="AUDUSD">AUD/USD (Australian Dollar / USD)</option>
              </select>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-xl p-4.5 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Pesa Unayorisk ($)</span>
              <span className="text-lg font-black text-rose-400 font-mono">
                ${riskAmount.toFixed(2)}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Lot Size Inayopendekezwa</span>
              <span className="text-xl font-black text-[#10b981] font-mono">
                {lotSizeFormatted.toFixed(2)} Lot
              </span>
            </div>

            <div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Lengo la Faida (1:{rewardRatio})</span>
              <span className="text-lg font-black text-emerald-300 font-mono">
                +${targetProfit.toFixed(2)}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase block">Stop Loss Thamani</span>
              <span className="text-xs font-semibold text-zinc-300 mt-1 block font-mono">
                {stopLossPips} Pips
              </span>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 flex items-start gap-2 bg-zinc-950/60 p-3 rounded-lg border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
            <span>
              <strong>Ushauri wa Mtaalamu:</strong> Ukifungua biashara na Lot Size ya <strong>{lotSizeFormatted.toFixed(2)}</strong>, hata kama soko litagusa Stop Loss yako ya pips {stopLossPips}, utapoteza <strong>${riskAmount.toFixed(2)}</strong> pekee (asilimia {riskPercent}% ya mtaji wako). Akaunti yako iko salama!
            </span>
          </div>
        </div>

        {/* Right Col: Live Sessions Monitor */}
        <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-sm mb-1">
              <Clock className="w-4 h-4 text-[#10b981]" />
              <span>Saa za Masoko Duniani (EAT)</span>
            </div>
            <p className="text-xs text-zinc-400">
              Saa za sasa Tanzania: <strong>{eatHours.toString().padStart(2, '0')}:{now.getMinutes().toString().padStart(2, '0')} EAT</strong>
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-white/5 text-xs">
              <span className="font-semibold text-white">London (Uingereza)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                londonOpen ? 'bg-emerald-500/20 text-[#10b981] border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {londonOpen ? 'Wazi Sasa' : 'Limefungwa'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-white/5 text-xs">
              <span className="font-semibold text-white">New York (Marekani)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                newYorkOpen ? 'bg-emerald-500/20 text-[#10b981] border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {newYorkOpen ? 'Wazi Sasa' : 'Limefungwa'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-white/5 text-xs">
              <span className="font-semibold text-white">Tokyo (Asia)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                tokyoOpen ? 'bg-emerald-500/20 text-[#10b981] border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {tokyoOpen ? 'Wazi Sasa' : 'Limefungwa'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-white/5 text-xs">
              <span className="font-semibold text-white">Sydney (Australia)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                sydneyOpen ? 'bg-emerald-500/20 text-[#10b981] border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {sydneyOpen ? 'Wazi Sasa' : 'Limefungwa'}
              </span>
            </div>
          </div>

          {overlapOpen ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-xl text-center">
              <span className="text-[11px] font-extrabold text-[#10b981] uppercase block">
                🔥 Kipindi cha Dhahabu (London + NY Overlap) Kiko Wazi!
              </span>
              <p className="text-[10px] text-zinc-300 mt-1">
                Kipindi chenye spidi na ukwasi mkubwa zaidi wa kufanya biashara.
              </p>
            </div>
          ) : (
            <div className="bg-zinc-950 p-3 rounded-xl text-center border border-white/5">
              <span className="text-[10px] text-zinc-400 block">
                London + NY Overlap hufunguka kila siku saa 03:00 - 06:00 Jioni (EAT).
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
