import React from 'react';
import { SubpageArticle, SUBPAGE_CATEGORIES, getSubpagesByCategory, normalizeCategory } from '../data/subpagesData';
import {
  Ship,
  Wrench,
  Zap,
  ShieldAlert,
  Calculator,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Compass,
  Anchor,
  BookOpen
} from 'lucide-react';

interface CategorySubpagesViewProps {
  category: string;
  onNavigateToSubpage: (category: string, slug: string) => void;
  onBackToHome: () => void;
}

export const CategorySubpagesView: React.FC<CategorySubpagesViewProps> = ({
  category,
  onNavigateToSubpage,
  onBackToHome,
}) => {
  const [filterQuery, setFilterQuery] = React.useState('');
  const normalizedCat = normalizeCategory(category);
  const currentCategoryInfo = SUBPAGE_CATEGORIES.find((c) => c.id === normalizedCat) || {
    id: normalizedCat,
    label: normalizedCat,
    description: 'Comprehensive marine engineering operational guidelines and standards.',
    iconName: 'Ship',
  };

  const articles = getSubpagesByCategory(normalizedCat);

  const filtered = articles.filter((a) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const getCategoryIcon = (cat: string) => {
    const clean = normalizeCategory(cat);
    switch (clean) {
      case 'injini-kuu':
        return <Ship className="w-6 h-6 text-black" />;
      case 'mitambo-msaidizi':
        return <Wrench className="w-6 h-6 text-black" />;
      case 'umeme-na-otomesheni':
        return <Zap className="w-6 h-6 text-black" />;
      case 'sheria-na-usalama':
        return <ShieldAlert className="w-6 h-6 text-black" />;
      case 'vipimo-na-miongozo':
        return <Calculator className="w-6 h-6 text-black" />;
      default:
        return <Anchor className="w-6 h-6 text-black" />;
    }
  };

  return (
    <section className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Category Banner Header */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-2 border-[#FFC107]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFC107]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-[#FFC107] transition-colors mb-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Portal</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFC107] flex items-center justify-center font-black shadow-lg">
                {getCategoryIcon(normalizedCat)}
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#FFC107] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Marine Engineering Discipline
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight editorial-font">
                  {currentCategoryInfo.label}
                </h1>
              </div>
            </div>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              {currentCategoryInfo.description}
            </p>
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={`Search within ${currentCategoryInfo.label}...`}
              className="w-full bg-black/70 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFC107] transition-all shadow-inner"
            />
            <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400 px-1">
              <span>{filtered.length} technical articles</span>
              <span className="text-[#FFC107] font-bold">STCW Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Subpages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <div
            key={article.id}
            onClick={() => onNavigateToSubpage(article.category, article.slug)}
            className="group bg-zinc-900/90 hover:bg-zinc-900 border border-white/10 hover:border-[#FFC107]/60 rounded-2xl overflow-hidden shadow-lg transition-all cursor-pointer flex flex-col justify-between hover:shadow-2xl hover:shadow-[#FFC107]/5"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-black">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-black/85 text-[#FFC107] border border-[#FFC107]/40 shadow">
                  {article.categoryLabel}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/75 text-zinc-300 backdrop-blur-sm">
                  {article.readTime}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h2 className="text-base font-black text-white group-hover:text-[#FFC107] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h2>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {article.keySpecs && article.keySpecs.length > 0 && (
                  <div className="pt-2 grid grid-cols-2 gap-1.5 text-[10px]">
                    {article.keySpecs.slice(0, 2).map((spec, i) => (
                      <div key={i} className="bg-black/50 px-2 py-1 rounded border border-white/5 truncate">
                        <span className="text-zinc-500">{spec.label}: </span>
                        <span className="text-[#FFC107] font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 bg-zinc-950/40">
              <span className="font-bold text-zinc-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#FFC107]" />
                {article.author}
              </span>
              <span className="flex items-center gap-1 text-[#FFC107] font-bold group-hover:translate-x-1 transition-transform">
                Read Guide <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
