import React from 'react';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { HeroGrid } from './components/HeroGrid';
import { ArticleCard } from './components/ArticleCard';
import { TechShowcaseSection } from './components/TechShowcaseSection';
import { TechToolsSection } from './components/TechToolsSection';
import { TechQuizSection } from './components/TechQuizSection';
import { CommunityForumSection } from './components/CommunityForumSection';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { CurrencyConverter } from './components/CurrencyConverter';
import { Footer } from './components/Footer';

import { ARTICLES_DATA, CATEGORIES } from './data/newsData';
import { Article, CategoryId } from './types';
import { Flame, SearchX, Sparkles } from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = React.useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('santech_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeCategory, setActiveCategory] = React.useState<CategoryId>('zote');

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('santech_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal / Drawer state
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = React.useState<boolean>(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = React.useState<boolean>(false);

  // Apply Theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('santech_theme', theme);
  }, [theme]);

  // Persist Bookmarks
  React.useEffect(() => {
    localStorage.setItem('santech_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleScrollToTools = () => {
    const el = document.getElementById('tech-tools');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter Articles
  const filteredArticles = ARTICLES_DATA.filter((article) => {
    const matchesCategory = activeCategory === 'zote' || article.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.categoryName.toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const headlineArticle = ARTICLES_DATA.find((a) => a.isHeadline) || ARTICLES_DATA[0];
  const trendingArticles = ARTICLES_DATA.filter((a) => a.isTrending).sort(
    (a, b) => (a.rankNumber || 99) - (b.rankNumber || 99)
  );

  const bookmarkedArticles = ARTICLES_DATA.filter((a) => bookmarkedIds.includes(a.id));

  const relatedArticles = selectedArticle
    ? ARTICLES_DATA.filter(
        (a) => a.id !== selectedArticle.id && (a.category === selectedArticle.category || a.category === 'ai')
      )
    : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-[#10b981] selection:text-black">
      {/* Navbar Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onScrollToTools={handleScrollToTools}
      />

      {/* Breaking News Ticker */}
      <NewsTicker onSelectTopic={(topic) => setSearchQuery(topic)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        {/* Category Badge Header if active category !== zote */}
        {activeCategory !== 'zote' && (
          <div className="flex items-center justify-between bg-zinc-900 border border-white/10 p-4 rounded-2xl">
            <div>
              <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-wider">
                Kipengele Kichaguliwa
              </span>
              <h2 className="text-xl font-black text-white">
                {CATEGORIES.find((c) => c.id === activeCategory)?.label || activeCategory}
              </h2>
            </div>

            <button
              onClick={() => setActiveCategory('zote')}
              className="text-xs text-zinc-400 hover:text-white bg-zinc-800 px-3 py-1.5 rounded border border-white/10 transition-colors"
            >
              Rudi Zote
            </button>
          </div>
        )}

        {/* Hero Grid (Only show on 'zote' view when no search filter) */}
        {activeCategory === 'zote' && !searchQuery && (
          <HeroGrid
            headlineArticle={headlineArticle}
            trendingArticles={trendingArticles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onToggleBookmark={toggleBookmark}
            bookmarkedIds={bookmarkedIds}
          />
        )}

        {/* Currency & Crypto Converter Quick Utility */}
        {!searchQuery && <CurrencyConverter />}

        {/* Articles Section Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="display-serif text-2xl font-extrabold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#10b981]" />
              {searchQuery
                ? `Matokeo ya "${searchQuery}" (${filteredArticles.length})`
                : 'Habari Zote za Teknolojia, AI & Coding'}
            </h2>
            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
              SANTECH TECH MEDIA • 2026
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 text-center space-y-3">
              <SearchX className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">Hakuna makala zilizopatikana</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Jaribu kutafuta kwa maneno mengine kama "AI", "Coding", "Cloud" au "Cybersecurity".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('zote');
                }}
                className="bg-[#10b981] hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded transition-colors cursor-pointer"
              >
                Onyesha Makala Zote
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelectArticle={(art) => setSelectedArticle(art)}
                  onToggleBookmark={toggleBookmark}
                  isBookmarked={bookmarkedIds.includes(article.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Tech Spotlight & Photo Showcase Section */}
        {activeCategory === 'zote' && !searchQuery && <TechShowcaseSection />}

        {/* Dev Toolkit & Salary Calculator Section */}
        {!searchQuery && <TechToolsSection />}

        {/* Tech Assessment Quiz */}
        {!searchQuery && <TechQuizSection />}

        {/* Community Forum & WhatsApp Direct Feedback Hub (+255691302979) */}
        {!searchQuery && <CommunityForumSection />}
      </main>

      {/* Floating WhatsApp Contact Widget (+255691302979) */}
      <FloatingWhatsAppButton />

      {/* Floating SANTECH AI Assistant Trigger Widget */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsAiAssistantOpen(true)}
          className="flex items-center gap-2 bg-[#10b981] text-black font-black text-xs px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all cursor-pointer border border-[#10b981]"
        >
          <Sparkles className="w-4 h-4 animate-spin text-black" />
          <span>SANTECH AI Assistant</span>
        </button>
      </div>

      {/* Article Detail Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onToggleBookmark={toggleBookmark}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        relatedArticles={relatedArticles}
        onSelectRelated={(rel) => setSelectedArticle(rel)}
      />

      {/* AI Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onRemoveBookmark={toggleBookmark}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onScrollToTools={handleScrollToTools}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />
    </div>
  );
}
