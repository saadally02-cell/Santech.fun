import React from 'react';
import { Calculator, ArrowLeftRight, Coins, DollarSign } from 'lucide-react';

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = React.useState<number>(100);
  const [currency, setCurrency] = React.useState<'USD' | 'TZS' | 'BTC'>('USD');

  // Rates approximation
  const TZS_PER_USD = 2720;
  const USD_PER_BTC = 120000;

  const calculateConversion = () => {
    let usd = 0;
    if (currency === 'USD') usd = amount;
    else if (currency === 'TZS') usd = amount / TZS_PER_USD;
    else if (currency === 'BTC') usd = amount * USD_PER_BTC;

    const tzs = usd * TZS_PER_USD;
    const btc = usd / USD_PER_BTC;

    return { usd, tzs, btc };
  };

  const { usd, tzs, btc } = calculateConversion();

  return (
    <div className="glass border border-white/10 rounded-2xl p-6 my-6 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-[#10b981]" />
          Kikokotoo cha Fedha (USD / TZS / BTC)
        </h3>
        <span className="text-[10px] font-extrabold text-[#10b981] bg-[#10b981]/15 px-2 py-0.5 rounded border border-[#10b981]/30">
          RATE 2026
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Input */}
        <div className="sm:col-span-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">Weka Kiasi:</label>
          <div className="flex rounded overflow-hidden border border-white/10 bg-zinc-950">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full bg-transparent text-white text-xs px-3 py-2.5 focus:outline-none font-sans"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-zinc-800 text-[#10b981] text-xs font-bold px-3 focus:outline-none uppercase tracking-wider border-l border-white/10"
            >
              <option value="USD">USD ($)</option>
              <option value="TZS">TZS (TSh)</option>
              <option value="BTC">BTC (₿)</option>
            </select>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="sm:col-span-2 grid grid-cols-3 gap-2 text-center bg-zinc-950/80 p-3 rounded-xl border border-white/10">
          <div className="p-1">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Dola (USD)</span>
            <span className="text-xs sm:text-sm font-extrabold text-[#10b981] font-mono">
              ${usd.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="p-1 border-x border-white/10">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Shilingi (TZS)</span>
            <span className="text-xs sm:text-sm font-extrabold text-amber-400 font-mono">
              TSh {Math.round(tzs).toLocaleString('en-US')}
            </span>
          </div>

          <div className="p-1">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Bitcoin (BTC)</span>
            <span className="text-xs sm:text-sm font-extrabold text-blue-400 font-mono">
              ₿ {btc.toFixed(6)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
