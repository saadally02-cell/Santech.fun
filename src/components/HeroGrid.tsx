import React from 'react';
import { Clock, User, Eye, ArrowRight, Bookmark, Flame, Sparkles } from 'lucide-react';
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
  const sideArticles = trendingArticles.slice(0, 4);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-6">
      {/* 1 Main Trending Article Card (8 cols) */}
      <div className="lg:col-span-8 bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-[#FFC107]/50 transition-all group flex flex-col justify-between relative">
        {/* Headline Image */}
        <div className="relative h-72 sm:h-[400px] w-full overflow-hidden bg-black">
          <img
            src={headlineArticle.image}
            alt={headlineArticle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Category Badge & Bookmark */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFC107] text-black text-[11px] font-black uppercase tracking-wider rounded-lg shadow-md">
              <Flame className="w-3.5 h-3.5 fill-black" />
              FEATURED DISCIPLINE • {headlineArticle.categoryName}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(headlineArticle.id);
              }}
              className={`p-2 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-[#FFC107] text-black font-bold border-[#FFC107]'
                  : 'bg-black/70 text-white border-white/15 hover:bg-black'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark technical article'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-zinc-900/80">
          <div>
            <h2
              onClick={() => onSelectArticle(headlineArticle)}
              className="text-2xl sm:text-4xl lg:text-5xl leading-tight font-black tracking-tight text-white hover:text-[#FFC107] transition-colors cursor-pointer mb-3 editorial-font"
            >
              {headlineArticle.title}
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 font-normal">
              {headlineArticle.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 text-xs text-zinc-400 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FFC107]" />
                {headlineArticle.date}
              </span>
              <span className="flex items-center gap-1.5 font-bold text-zinc-300">
                <User className="w-3.5 h-3.5 text-[#FFC107]" />
                {headlineArticle.author || 'Saad Ally Nassor'}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#FFC107]" />
                {headlineArticle.views.toLocaleString()} readers
              </span>
            </div>

            <button
              onClick={() => onSelectArticle(headlineArticle)}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black bg-[#FFC107] hover:bg-amber-400 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md group-hover:scale-102"
            >
              Read Full Analysis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Side Articles */}
      <div className="lg:col-span-4 bg-zinc-950 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107] animate-pulse"></span>
              Trending Maritime Briefs
            </h3>
            <span className="text-[10px] font-black text-black bg-[#FFC107] px-2.5 py-0.5 rounded-md">
              TOP 4
            </span>
          </div>

          <div className="space-y-4">
            {sideArticles.map((article, idx) => {
              const rank = (idx + 1).toString().padStart(2, '0');
              return (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="flex gap-3 group cursor-pointer border-b border-white/5 pb-3.5 last:border-0 last:pb-0"
                >
                  <span className="text-2xl font-black text-[#FFC107] opacity-60 group-hover:opacity-100 transition-opacity shrink-0 w-8">
                    {rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold leading-snug text-zinc-200 group-hover:text-[#FFC107] transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 mt-1">
                      <span className="text-[#FFC107] font-bold uppercase tracking-wider">
                        {article.categoryName}
                      </span>
                      <span>•</span>
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

        <div className="pt-4 mt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Verified STCW Standards</span>
            <span className="text-[#FFC107] font-bold">Class 1, 2, 4 CoC</span>
          </div>
        </div>
      </div>
    </section>
  );
};
