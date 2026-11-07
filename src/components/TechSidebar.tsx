import React from 'react';
import { ALL_SUBPAGES, SUBPAGE_CATEGORIES, SubpageArticle } from '../data/subpagesData';
import {
  Ship,
  Wrench,
  Zap,
  ShieldAlert,
  Calculator,
  ChevronRight,
  Globe,
  ExternalLink,
  Flame,
  FileText,
  Anchor,
  Compass,
  GraduationCap
} from 'lucide-react';

interface TechSidebarProps {
  onNavigateToSubpage: (category: string, slug: string) => void;
  onNavigateToCategory: (category: string) => void;
  onOpenSitemapModal?: () => void;
}

export const TechSidebar: React.FC<TechSidebarProps> = ({
  onNavigateToSubpage,
  onNavigateToCategory,
  onOpenSitemapModal,
}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>('injini-kuu');

  const currentCategoryArticles = ALL_SUBPAGES.filter((a) => a.category === selectedTab).slice(0, 6);
  const trendingArticles = [...ALL_SUBPAGES].sort((a, b) => b.views - a.views).slice(0, 5);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'injini-kuu':
      case 'simu':
        return <Ship className="w-3.5 h-3.5" />;
      case 'mitambo-msaidizi':
      case 'apps':
        return <Wrench className="w-3.5 h-3.5" />;
      case 'umeme-na-otomesheni':
      case 'internet':
        return <Zap className="w-3.5 h-3.5" />;
      case 'sheria-na-usalama':
      case 'jinsi-ya':
        return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'vipimo-na-miongozo':
      case 'bei':
        return <Calculator className="w-3.5 h-3.5" />;
      default:
        return <Anchor className="w-3.5 h-3.5" />;
    }
  };

  return (
    <aside className="w-full space-y-6">
      {/* Founder Card: Saad Ally Nassor */}
      <div className="bg-gradient-to-br from-amber-950/30 via-zinc-900 to-black rounded-2xl p-4 border border-[#FFC107]/40 shadow-lg space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FFC107] text-black font-black flex items-center justify-center text-xs shadow shrink-0">
            SAN
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FFC107] block">
              Muanzilishi / Founder
            </span>
            <h4 className="text-sm font-black text-white">Saad Ally Nassor</h4>
          </div>
        </div>
        <p className="text-[11px] text-zinc-300 leading-relaxed">
          Founder & Chief Marine Engineering Technologist of SAN25 Marine Hub. Dedicated to delivering university-grade naval architecture calculations and NIT academic courseware.
        </p>
        <div className="text-[10px] text-zinc-400 font-mono">
          Email: <a href="mailto:saadally02@gmail.com" className="text-[#FFC107] hover:underline">saadally02@gmail.com</a>
        </div>
      </div>

      {/* Category Subpages Explorer Widget */}
      <div className="bg-zinc-900/80 rounded-2xl p-5 border border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFC107] animate-pulse" />
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Marine Engineering Subpages
            </h3>
          </div>
          <span className="text-[10px] font-bold text-black bg-[#FFC107] px-2 py-0.5 rounded-full">
            50+ Articles
          </span>
        </div>

        {/* Category Pills Tab */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {SUBPAGE_CATEGORIES.map((cat) => {
            const isActive = selectedTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedTab(cat.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFC107] text-black shadow-md font-black scale-102'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span className="truncate max-w-[120px]">{cat.label.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* List of Latest Subpages in Active Category */}
        <div className="space-y-2.5">
          {currentCategoryArticles.map((article, idx) => (
            <button
              key={article.id}
              onClick={() => onNavigateToSubpage(article.category, article.slug)}
              className="w-full text-left p-2.5 rounded-xl bg-black/40 hover:bg-black/80 border border-white/5 hover:border-[#FFC107]/40 transition-all group flex items-start gap-2.5 cursor-pointer"
            >
              <span className="w-5 h-5 rounded-md bg-white/5 group-hover:bg-[#FFC107] text-zinc-400 group-hover:text-black font-black text-[10px] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-zinc-200 group-hover:text-[#FFC107] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-1">
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>C/Eng SAN25</span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#FFC107] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigateToCategory(selectedTab)}
          className="w-full mt-4 py-2 text-center text-xs font-bold text-[#FFC107] hover:underline cursor-pointer border-t border-white/5 pt-3 block"
        >
          View all technical guides in /{selectedTab}/ &rarr;
        </button>
      </div>

      {/* NIT Academic Courseware & PDF Library Widget */}
      <div className="bg-gradient-to-br from-amber-950/40 via-zinc-900 to-black rounded-2xl p-5 border border-[#FFC107]/30 shadow-lg space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white p-1 border border-amber-300 shadow shrink-0 flex items-center justify-center">
            <img
              src="/assets/aistudio/IMG-20261104-WA0113_1__cc428c64.jpg"
              alt="NIT Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FFC107] block">
              NIT Dar es Salaam Repository
            </span>
            <h4 className="text-sm font-black text-white">Course Notes & Textbooks</h4>
          </div>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          Access all 10 lecture notes: Drydocking (SRT 04105), Maneuvering (Ch. 6), Ship Design (SRT 06107), Lines Plan (SRT 04104), and Dr. C.B. Barrass Stability.
        </p>
        <button
          onClick={() => {
            onNavigateToCategory('naval-architecture');
            setTimeout(() => {
              const el = document.getElementById('academic-library');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="w-full py-2 px-3 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Open Academic Library</span>
        </button>
      </div>

      {/* Naval Architecture & Hydrodynamics Lab Widget */}
      <div className="bg-gradient-to-br from-blue-950/40 via-zinc-900 to-black rounded-2xl p-5 border border-blue-500/30 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 block">
              Naval Architecture Suite
            </span>
            <h4 className="text-sm font-black text-white">Hydrodynamics & Stability</h4>
          </div>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed">
          Compute total ship resistance ($R_T$), IMO 2008 intact GZ curves, drydocking upthrust ($P$), and 6-stage Design Spiral sizing.
        </p>
        <button
          onClick={() => onNavigateToCategory('naval-architecture')}
          className="w-full py-2 px-3 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Open Naval Architecture Lab</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Seafarers Worldwide eSIM Roaming Widget */}
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black rounded-2xl p-5 border-2 border-[#FFC107]/30 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFC107]/10 rounded-bl-full pointer-events-none group-hover:bg-[#FFC107]/20 transition-colors" />
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-[#FFC107] text-black flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FFC107] block">
              Seafarers & Port Roaming
            </span>
            <h4 className="text-sm font-black text-white">Airalo Global Seafarer eSIM</h4>
          </div>
        </div>
        <p className="text-xs text-zinc-300 leading-relaxed mb-4">
          Stay connected instantly the moment your vessel arrives in port (Singapore, Rotterdam, Dubai, Mombasa, Dar es Salaam) without swapping local plastic SIMs.
        </p>
        <a
          href="https://airalo.tpk.ro/MR9pD32b"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-102 transition-all block text-center"
        >
          <span>Connect Airalo eSIM in Port</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Trending Popular Articles in Marine Engineering */}
      <div className="bg-zinc-900/80 rounded-2xl p-5 border border-white/10 shadow-lg">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <Flame className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-black uppercase tracking-wider text-white">
            Most Read Maritime Topics
          </h3>
        </div>
        <div className="space-y-3">
          {trendingArticles.map((art, idx) => (
            <button
              key={art.id}
              onClick={() => onNavigateToSubpage(art.category, art.slug)}
              className="w-full text-left flex items-start gap-3 group cursor-pointer"
            >
              <span className="text-xl font-black text-zinc-600 group-hover:text-[#FFC107] transition-colors leading-none w-5 text-right shrink-0">
                0{idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider block">
                  {art.categoryLabel}
                </span>
                <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                  {art.title}
                </h4>
                <span className="text-[10px] text-zinc-500 mt-0.5 block">
                  {art.views.toLocaleString()} readers
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Google Search Console Sitemap Quick Link */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-[#FFC107]" />
          <div>
            <h5 className="text-xs font-bold text-white">Google Sitemap</h5>
            <span className="text-[10px] text-zinc-400">sitemap.json (55+ URLs)</span>
          </div>
        </div>
        <a
          href="/sitemap.json"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-black text-[#FFC107] hover:underline flex items-center gap-1"
        >
          <span>Open</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
