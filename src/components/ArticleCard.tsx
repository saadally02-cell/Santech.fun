import React from 'react';
import { Clock, Eye, ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
}) => {
  return (
    <article
      onClick={() => onSelectArticle(article)}
      className="glass-card border border-white/10 rounded-2xl overflow-hidden hover:border-[#10b981]/50 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col justify-between group cursor-pointer"
    >
      {/* Thumbnail Image */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 backdrop-blur-md">
            {article.categoryName}
          </span>
        </div>

        {/* Bookmark Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(article.id);
          }}
          className={`absolute top-3 right-3 p-1.5 rounded backdrop-blur-md transition-all cursor-pointer ${
            isBookmarked
              ? 'bg-[#10b981] text-black font-bold'
              : 'bg-black/60 text-white border border-white/10 hover:bg-black/80'
          }`}
          title={isBookmarked ? 'Ondoa kwenye bookmarks' : 'Hifadhi makala'}
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-zinc-900/40">
        <div>
          <h3 className="text-base font-bold text-zinc-100 group-hover:text-[#10b981] transition-colors line-clamp-2 leading-snug mb-2 font-sans">
            {article.title}
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#10b981]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-zinc-500" />
              {article.views.toLocaleString()}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#10b981] group-hover:translate-x-1 transition-transform">
            Soma <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
