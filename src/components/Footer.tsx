import React from 'react';
import { CategoryId } from '../types';
import { NetworkAdBanner } from './NetworkAdBanner';

interface FooterProps {
  onSelectCategory: (cat: CategoryId) => void;
  onScrollToTools: () => void;
  onOpenAiAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToTools,
  onOpenAiAssistant,
}) => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-12 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Ad Placement */}
        <NetworkAdBanner placement="footer" className="mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#10b981] text-black font-black flex items-center justify-center text-sm tracking-wider">
                ST
              </div>
              <span className="editorial-font text-xl font-black text-white tracking-tight">
                SANTECH <span className="text-[#10b981]">TZ</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Jukwaa nambari moja la habari za kiteknolojia, mafunzo ya Forex Academy (Candlestick Bible & SMC), Akili Bandia, Kazi za Mtandaoni na Utalii wa Tanzania.
            </p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              © 2026 SANTECH TZ Media. Haki zote zimehifadhiwa.
            </p>
          </div>

          {/* Col 2: Sehemu Kuu */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-3">Nguzo za Maudhui</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('forex')}
                  className="text-[#10b981] font-bold hover:underline transition-colors cursor-pointer text-left"
                >
                  📈 Forex Academy (Moduli 7)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('candlestick')}
                  className="hover:text-[#10b981] transition-colors cursor-pointer text-left"
                >
                  🕯️ Candlestick Trading Bible
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('smc')}
                  className="hover:text-[#10b981] transition-colors cursor-pointer text-left"
                >
                  🏦 Smart Money Concepts (SMC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ai')}
                  className="hover:text-[#10b981] transition-colors cursor-pointer text-left"
                >
                  🤖 Akili Bandia & Gemini 3.7
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('dev')}
                  className="hover:text-blue-400 transition-colors cursor-pointer text-left"
                >
                  💻 Dev Hub & Misimbo (Coding)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('utalii')}
                  className="hover:text-yellow-400 transition-colors cursor-pointer text-left"
                >
                  🌍 Utalii wa Tanzania & Zanzibar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('kazi')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  💼 Kazi za Mtandaoni ($1,000+/Mo)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Zana & Huduma */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-3">Zana & Majukwaa</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://airalo.tpk.ro/MR9pD32b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1 text-left"
                >
                  🌍 Airalo Global eSIM (Nchi 200+)
                </a>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tools')}
                  className="text-[#10b981] hover:underline cursor-pointer font-semibold text-left"
                >
                  ⚡ Zana za Kidijitali (Toolkit)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cybersecurity')}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  🛡️ Usalama wa Mtandao & SIM Lock
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('blockchain')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  🪙 FinTech, Web3 & USDT
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cloud')}
                  className="hover:text-sky-400 transition-colors cursor-pointer text-left"
                >
                  ☁️ Cloud & Starlink Satelaiti
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('quiz')}
                  className="hover:text-[#10b981] transition-colors cursor-pointer text-left"
                >
                  🎯 Jaribio la Tech Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('audio')}
                  className="hover:text-purple-400 transition-colors cursor-pointer text-left"
                >
                  🎧 Makala za Sauti (Audio)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('forum')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  💬 Jukwaa la Jamii (Forum)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('kuhusu')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  ℹ️ Kuhusu SANTECH TZ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Mawasiliano & Mitandao */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-3">Mitandao & Mawasiliano</h4>
            <p className="text-xs text-zinc-400 mb-3">
              Ungana nasi kwa taarifa za haraka na fursa mpya:
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/SantechTZ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs hover:text-[#10b981] hover:border-[#10b981]/40 transition-colors"
                title="X / Twitter"
              >
                𝕏
              </a>
              <a
                href="https://t.me/santechtz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs hover:text-[#10b981] hover:border-[#10b981]/40 transition-colors"
                title="Telegram Channel"
              >
                ✈️
              </a>
              <a
                href="https://wa.me/255691302979"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors"
                title="WhatsApp Direct (+255691302979)"
              >
                💬
              </a>
              <a
                href="mailto:info@santech.tz"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xs hover:text-[#10b981] hover:border-[#10b981]/40 transition-colors"
                title="Barua Pepe"
              >
                ✉️
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-white/10 text-center text-[11px] text-zinc-500 font-medium tracking-wider">
          SANTECH TZ Media • Jukwaa Kuu la Habari za Teknolojia, Forex, AI & Utalii Tanzania
        </div>
      </div>
    </footer>
  );
};
