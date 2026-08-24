import React from 'react';
import { CategoryId } from '../types';

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
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#10b981] text-black font-black flex items-center justify-center text-xs tracking-wider">
                ST
              </div>
              <h3 className="display-serif text-2xl font-black text-white tracking-tight">SANTECH TECH</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Kituo namba moja cha habari za kitaalamu za Teknolojia, Akili Bandia, Coding, Usalama wa Mtandao na Ajira za Mbali Tanzania.
            </p>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              © 2026 SANTECH Media Group. Haki zote zimehifadhiwa.
            </p>
          </div>

          {/* Col 2: Nguzo Kuu */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-4">Nguzo Kuu</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onSelectCategory('forex')} className="text-[#10b981] font-bold hover:underline transition-colors cursor-pointer flex items-center gap-1">
                  <span>📈 Forex Academy (Bible Edition)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('ai')} className="hover:text-[#10b981] transition-colors cursor-pointer">
                  Akili Bandia (AI & Agents)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('dev')} className="hover:text-[#10b981] transition-colors cursor-pointer">
                  Dev & Software Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cybersecurity')} className="hover:text-[#10b981] transition-colors cursor-pointer">
                  Usalama wa Mtandao (Cybersecurity)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('kazi')} className="hover:text-[#10b981] transition-colors cursor-pointer">
                  Kazi za Mbali ($1,000+/Mo)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Zana na Huduma */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-4">Zana & Huduma</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onScrollToTools} className="text-[#10b981] hover:underline cursor-pointer font-semibold">
                  Remote Tech Salary Estimator
                </button>
              </li>
              <li>
                <button onClick={onOpenAiAssistant} className="text-[#10b981] hover:underline cursor-pointer font-semibold">
                  SANTECH Swahili AI Assistant
                </button>
              </li>
              <li><a href="#tech-showcase" className="hover:text-[#10b981] transition-colors">Tech Spotlight Gallery</a></li>
              <li><a href="#privacy" className="hover:text-[#10b981] transition-colors">Sera ya Faragha</a></li>
            </ul>
          </div>

          {/* Col 4: Mitandao ya Kijamii */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-4">Tufuate Mtandaoni</h4>
            <p className="text-xs text-zinc-400 mb-4">
              Pata taarifa za haraka za teknolojia na fursa za kazi kupitia mitandao yetu:
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded bg-zinc-900 border border-white/10 flex items-center justify-center hover:text-[#10b981] hover:border-[#10b981]/40 transition-colors text-sm" title="Website">
                🌐
              </a>
              <a href="#" className="w-9 h-9 rounded bg-zinc-900 border border-white/10 flex items-center justify-center hover:text-[#10b981] hover:border-[#10b981]/40 transition-colors text-sm" title="Telegram">
                📱
              </a>
              <a href="#" className="w-9 h-9 rounded bg-zinc-900 border border-white/10 flex items-center justify-center hover:text-[#10b981] hover:border-[#10b981]/40 transition-colors text-sm" title="LinkedIn">
                💼
              </a>
              <a href="#" className="w-9 h-9 rounded bg-zinc-900 border border-white/10 flex items-center justify-center hover:text-[#10b981] hover:border-[#10b981]/40 transition-colors text-sm" title="GitHub">
                ⚡
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
          Imeundwa na SANTECH Media Group • Imewezeshwa na React & Gemini AI Studio
        </div>
      </div>
    </footer>
  );
};
