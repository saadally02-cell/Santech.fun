import React from 'react';
import { CategoryId } from '../types';
import { NetworkAdBanner } from './NetworkAdBanner';
import { Ship, Wrench, Zap, ShieldAlert, Calculator, ExternalLink, Globe, FileText, Anchor, Compass } from 'lucide-react';

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
    <footer className="bg-black text-zinc-400 pt-12 pb-10 border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Ad Placement */}
        <NetworkAdBanner placement="footer" className="mb-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info with SAN25 Marine Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-black font-black flex items-center justify-center text-sm tracking-tight shadow-lg border-2 border-amber-300">
                SAN25
              </div>
              <div className="flex flex-col">
                <span className="editorial-font text-2xl font-black text-white tracking-tight uppercase">
                  SAN<span className="text-[#FFC107]">Marine</span>
                </span>
                <span className="text-[10px] font-bold text-zinc-400 tracking-wider">
                  Marine Engineering Hub
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Jukwaa rasmi nambari 1 la Uhandisi wa Meli, Mitambo ya Majini, STCW, MARPOL, na Mitihani ya Maafisa Wahandisi (MEO Class 1, 2, 4) Tanzania na Afrika Mashariki.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#FFC107] font-bold">
                ⚓ TASAC & IMO Aligned Training
              </span>
            </div>
          </div>

          {/* Col 2: Vitengo Vikuu vya Uhandisi wa Meli */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FFC107] mb-4">
              Vitengo vya Meli (Pillars)
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('naval-architecture')}
                  className="text-zinc-200 hover:text-[#FFC107] font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Naval Architecture (Hydrodynamics & Stability)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('injini-kuu')}
                  className="text-zinc-200 hover:text-[#FFC107] font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <Ship className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Injini Kuu & Propulsion (MAN, WinGD)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('mitambo-msaidizi')}
                  className="text-zinc-200 hover:text-[#FFC107] font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <Wrench className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Mitambo Msaidizi (Boilers, OWS, Purifiers)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('umeme-na-otomesheni')}
                  className="text-zinc-200 hover:text-[#FFC107] font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Umeme & Otomesheni (HV 6.6kV, PMS, ESB)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('sheria-na-usalama')}
                  className="text-zinc-200 hover:text-[#FFC107] font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Sheria za IMO (SOLAS, MARPOL, STCW, PSC)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('vipimo-na-miongozo')}
                  className="text-zinc-200 hover:text-[#FFC107] font-semibold transition-colors cursor-pointer text-left flex items-center gap-2"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Vipimo & Hesabu (SFOC, Slip, ASTM 54B)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Zana & Ushirika wa Mabaharia */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FFC107] mb-4">
              Zana za Meli & Viwango
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://airalo.tpk.ro/MR9pD32b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFC107] font-bold hover:underline inline-flex items-center gap-1.5 text-left"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Airalo Seafarer eSIM (Bandari 200+)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('marine-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-zinc-300 hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Marine Technical Calculator (Live)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('marine-checklists');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-zinc-300 hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Anchor className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Engine Room Checklists & Drills</span>
                </button>
              </li>
              <li>
                <a
                  href="/sitemap.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-semibold transition-colors inline-flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>sitemap.json (Google Console)</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAiAssistant}
                  className="hover:text-[#FFC107] transition-colors cursor-pointer text-left"
                >
                  🤖 Msaidizi wa AI (Chief Engineer AI)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Seafarers WhatsApp Channel & Classification Societies */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FFC107] mb-4">
              Seafarers Network
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              Jiunge na mtandao wa Maafisa Wahandisi wa Meli (Chief Engineers, 2nd Engineers, ETOs & Cadets) kupata miongozo na nafasi za ajira:
            </p>
            <a
              href="https://whatsapp.com/channel/0029VaSANTechTZ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-102 block text-center"
            >
              <span>Jiunge Seafarers Channel</span>
            </a>

            <div className="pt-4 text-[10px] text-zinc-500 space-y-1">
              <div>Viwango vya Uthibitisho: DNV • Lloyd's Register • BV • ABS • TASAC</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line with SAN25 signature */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-[#FFC107] text-black font-black flex items-center justify-center text-[10px]">
              SAN25
            </span>
            <span>© 2026 SAN25 Marine Engineering Hub (santech.fun) - Haki zote zimehifadhiwa.</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>IMO & STCW 2010 Aligned</span>
            <span>•</span>
            <span className="text-[#FFC107]">Dar es Salaam Maritime Institute (DMI) Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
