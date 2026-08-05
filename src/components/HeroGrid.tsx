import React from 'react';
import { Clock, User, Eye, ArrowRight, Bookmark, TrendingUp } from 'lucide-react';
import { Article } from '../types';

interface HeroGridProps {
  headlineArticle: Article;
  trendingArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  bookmarkedIds: string[];
}

export const HeroGrid: React.FC<HeroGridProps> = ({
  headlineArticle,
  trendingArticles,
  onSelectArticle,
  onToggleBookmark,
  bookmarkedIds,
}) => {
  const isBookmarked = bookmarkedIds.includes(headlineArticle.id);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
      {/* Main Headline Article Card (Spans 8 columns on lg) */}
      <div className="lg:col-span-8 glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-[#10b981]/50 transition-all group flex flex-col justify-between">
        {/* Headline Image */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-zinc-950">
          <img
            src={headlineArticle.image}
            alt={headlineArticle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

          {/* Category Badge & Bookmark */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-block px-3 py-1 bg-[#10b981]/20 text-[#10b981] text-[10px] font-black uppercase tracking-widest border border-[#10b981]/30 backdrop-blur-md">
              KIFUNIKO CHA MAKALA • {headlineArticle.categoryName}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(headlineArticle.id);
              }}
              className={`p-2 rounded border backdrop-blur-md transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-[#10b981] text-black font-bold border-[#10b981]'
                  : 'bg-black/60 text-white border-white/10 hover:bg-black/80'
              }`}
              title={isBookmarked ? 'Ondoa kwenye bookmarks' : 'Hifadhi makala'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-zinc-900/60">
          <div>
            <h2
              onClick={() => onSelectArticle(headlineArticle)}
              className="display-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tighter text-white hover:text-[#10b981] transition-colors cursor-pointer mb-4"
            >
              {headlineArticle.title}
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-6 line-clamp-3">
              {headlineArticle.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#10b981]" />
                {headlineArticle.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#10b981]" />
                {headlineArticle.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#10b981]" />
                {headlineArticle.views.toLocaleString()} viewers
              </span>
            </div>

            <button
              onClick={() => onSelectArticle(headlineArticle)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10b981] hover:text-emerald-300 transition-colors cursor-pointer group-hover:translate-x-1"
            >
              Soma Makala Kamili <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Panel: Zinazotrend (Spans 4 columns on lg) */}
      <div className="lg:col-span-4 bg-zinc-900/50 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              Zinazotrend
            </h3>
            <span className="text-[10px] font-extrabold text-[#10b981] bg-[#10b981]/15 px-2 py-0.5 rounded border border-[#10b981]/30">
              TOP 4
            </span>
          </div>

          <div className="space-y-6">
            {trendingArticles.map((article, idx) => {
              const rank = (idx + 1).toString().padStart(2, '0');
              return (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="flex gap-4 group cursor-pointer border-b border-white/5 pb-4 last:border-0 last:pb-0"
                >
                  <span className="display-serif text-3xl font-bold text-[#10b981] opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                    {rank}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold leading-snug text-zinc-100 group-hover:text-[#10b981] transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 mt-1.5">
                      <span className="text-[#10b981] font-bold uppercase tracking-wider">{article.categoryName}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-zinc-500" />
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter Box */}
        <div className="mt-8 pt-4 border-t border-white/10 bg-black/40 p-4 rounded-xl border border-white/5">
          <p className="text-xs font-bold text-white mb-1 uppercase tracking-wider">📰 Upate Habari za Hivi Punde</p>
          <p className="text-[11px] text-zinc-400 mb-3">
            Jiunge na zaidi ya wasomaji 25,000 wanaopata barua pepe kila wiki za Teknolojia, Akili Bandia na Coding.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Asante kwa kujiunga na SANTECH TZ Newsletter!"); }} className="flex gap-2">
            <input
              type="email"
              placeholder="Barua pepe yako..."
              required
              className="w-full bg-zinc-800 border border-white/10 text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#10b981]"
            />
            <button
              type="submit"
              className="bg-[#10b981] hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded transition-colors cursor-pointer shrink-0"
            >
              Jiunge
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
