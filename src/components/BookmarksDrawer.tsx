import React from 'react';
import { Bookmark, X, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-zinc-900 border-l border-white/10 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-zinc-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
            <Bookmark className="w-4 h-4 text-[#10b981] fill-current" />
            <span>Vipengele Vilivyohifadhiwa ({bookmarkedArticles.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-950/60">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 space-y-3">
              <Bookmark className="w-12 h-12 mx-auto text-zinc-700 stroke-1" />
              <p className="text-sm font-medium">Haujahifadhi makala yoyote bado.</p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Bofya icon ya bookmark kwenye makala yoyote ili kuweka hapa na kusoma baadaye!
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3 bg-zinc-900 border border-white/10 rounded-xl flex items-center gap-3 hover:border-[#10b981]/40 transition-colors group"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-16 h-16 rounded object-cover shrink-0 opacity-90"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">
                    {article.categoryName}
                  </span>
                  <h4
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="text-xs font-bold text-white group-hover:text-[#10b981] transition-colors line-clamp-2 cursor-pointer leading-snug"
                  >
                    {article.title}
                  </h4>
                </div>

                <button
                  onClick={() => onRemoveBookmark(article.id)}
                  className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors cursor-pointer shrink-0"
                  title="Ondoa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
