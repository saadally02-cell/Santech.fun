import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, Globe } from 'lucide-react';
import { NetworkAdBanner } from './NetworkAdBanner';

interface LegalPagesSectionProps {
  initialTab?: 'privacy' | 'terms';
}

export const LegalPagesSection: React.FC<LegalPagesSectionProps> = ({
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <section className="py-6 sm:py-10 space-y-8">
      {/* Tab Switcher */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'privacy'
              ? 'bg-[#10b981] text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" /> Sera ya Faragha (Privacy Policy)
        </button>
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'terms'
              ? 'bg-[#10b981] text-black shadow-lg'
              : 'bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" /> Masharti ya Huduma (Terms of Use)
        </button>
      </div>

      <NetworkAdBanner placement="in-feed" />

      {/* Content Container */}
      <div className="bg-zinc-900/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-sm text-zinc-300 leading-relaxed">
        {activeTab === 'privacy' ? (
          <>
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Sera ya Faragha ya SANTECH TZ</h2>
              <p className="text-xs text-zinc-400 mt-1">Ilisasishwa Mara ya Mwisho: Agosti 2026</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">1. Taarifa Tunazokusanya</h3>
              <p>
                SANTECH TZ inaheshimu usiri na faragha ya watumiaji wetu. Tunakusanya taarifa za kimsingi tu kama vile barua pepe (unapojiandikisha kwenye jarida au kufungua akaunti ya bure) na data za matumizi kupitia cookies ili kuboresha utoaji wa maudhui na usahihi wa matangazo.
              </p>

              <h3 className="text-base font-bold text-white">2. Matumizi ya Vidakuzi (Cookies) na Mitandao ya Matangazo</h3>
              <p>
                Tovuti yetu inashirikiana na mitandao ya matangazo ya kimataifa inayoweza kuweka au kusoma vidakuzi kwenye kivinjari chako ili kutoa matangazo yanayoendana na maslahi yako. Unaweza kuzima vidakuzi kwenye mipangilio ya kivinjari chako wakati wowote.
              </p>

              <h3 className="text-base font-bold text-white">3. Usalama wa Taarifa za Watumiaji</h3>
              <p>
                Mifumo yetu inalindwa kwa usimbaji fiche wa SSL/TLS (HTTPS) na hatuuzi wala kugawa taarifa zako binafsi kwa mashirika ya nje bila idhini yako ya wazi.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Masharti ya Matumizi (Terms & Conditions)</h2>
              <p className="text-xs text-zinc-400 mt-1">Ilisasishwa Mara ya Mwisho: Agosti 2026</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">1. Kanusho la Kifedha la Forex Academy (Financial Disclaimer)</h3>
              <p>
                Maudhui yote ya SANTECH Forex Academy, viashiria, michoro ya Candlestick na mbinu za Smart Money Concepts (SMC) yanalenga kutoa elimu tu na hayapaswi kuchukuliwa kama ushauri rasmi wa kifedha au ahadi ya mapato ya uhakika. Biashara ya Forex ina hatari ya kupoteza mtaji; daima fanya biashara kwa kiasi unachoweza kumudu kupoteza na tumia mbinu sahihi za usimamizi wa hatari (Risk Management).
              </p>

              <h3 className="text-base font-bold text-white">2. Hakimiliki na Maudhui</h3>
              <p>
                Makala, michoro, na misimbo yote kwenye SANTECH TZ inalindwa na sheria za hakimiliki. Unaruhusiwa kunukuu sehemu ya maudhui kwa kuweka kiungo cha moja kwa moja (Backlink / Canonical credit) kuelekea chanzo asilia kwenye santech.tz.
              </p>

              <h3 className="text-base font-bold text-white">3. Mabadiliko ya Masharti</h3>
              <p>
                SANTECH TZ inahifadhi haki ya kubadilisha au kusasisha masharti haya wakati wowote ili kuendana na mabadiliko ya kisheria na kiteknolojia.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
