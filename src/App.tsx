import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { HeroGrid } from './components/HeroGrid';
import { GeminiHourlyAnnouncementsSection } from './components/GeminiHourlyAnnouncementsSection';
import { ArticleCard } from './components/ArticleCard';
import { TechShowcaseSection } from './components/TechShowcaseSection';
import { TechToolsSection } from './components/TechToolsSection';
import { AudioArticlesSection } from './components/AudioArticlesSection';
import { TechQuizSection } from './components/TechQuizSection';
import { CommunityForumSection } from './components/CommunityForumSection';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { CurrencyConverter } from './components/CurrencyConverter';
import { ForexAcademySection } from './components/ForexAcademySection';
import { TourismTanzaniaSection } from './components/TourismTanzaniaSection';
import { FreelanceWorkHubSection } from './components/FreelanceWorkHubSection';
import { DevHubSection } from './components/DevHubSection';
import { AboutUsSection } from './components/AboutUsSection';
import { LegalPagesSection } from './components/LegalPagesSection';
import { NetworkAdBanner } from './components/NetworkAdBanner';
import { Footer } from './components/Footer';

import { ARTICLES_DATA, CATEGORIES } from './data/newsData';
import { Article, CategoryId } from './types';
import { Flame, SearchX, Sparkles, Compass, Briefcase, TrendingUp } from 'lucide-react';

function MainApp() {
  // Theme state
  const [theme, setTheme] = React.useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('santech_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeCategory, setActiveCategory] = React.useState<CategoryId>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['forex', 'utalii', 'kazi', 'dev', 'ai', 'cybersecurity', 'blockchain', 'cloud', 'tools', 'kuhusu', 'privacy', 'terms'].includes(hash)) {
        return hash as CategoryId;
      }
    }
    return 'zote';
  });

  // URL hash sync
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash && ['forex', 'utalii', 'kazi', 'dev', 'ai', 'cybersecurity', 'blockchain', 'cloud', 'tools', 'kuhusu', 'privacy', 'terms'].includes(hash)) {
        setActiveCategory(hash as CategoryId);
      } else if (!hash) {
        setActiveCategory('zote');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectCategoryWithHash = (cat: CategoryId) => {
    setActiveCategory(cat);
    if (cat === 'zote') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
      window.location.hash = cat;
    }
  };

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
    setActiveCategory('tools');
    setTimeout(() => {
      const el = document.getElementById('tech-tools');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Filter Articles
  const filteredArticles = ARTICLES_DATA.filter((article) => {
    const matchesCategory = activeCategory === 'zote' || article.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      article.title.toLowerCase().includes(q) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(q)) ||
      (article.categoryName && article.categoryName.toLowerCase().includes(q)) ||
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-[#10b981] selection:text-black overflow-x-hidden w-full max-w-full">
      {/* Navbar Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategoryWithHash}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onScrollToTools={handleScrollToTools}
      />

      {/* Breaking News Ticker */}
      <NewsTicker onSelectTopic={(topic) => setSearchQuery(topic)} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 overflow-x-hidden w-full">
        {/* Category Badge Header if active category !== zote */}
        {activeCategory !== 'zote' && (
          <div className="flex items-center justify-between bg-zinc-900 border border-white/10 p-4 rounded-2xl">
            <div>
              <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-wider">
                Kipengele Kichaguliwa
              </span>
              <h2 className="text-xl font-black text-white">
                {CATEGORIES.find((c) => c.id === activeCategory)?.label ||
                  (activeCategory === 'tools'
                    ? 'Zana za Kidijitali'
                    : activeCategory === 'kuhusu'
                    ? 'Kuhusu SANTECH TZ'
                    : activeCategory === 'privacy'
                    ? 'Sera ya Faragha'
                    : activeCategory === 'terms'
                    ? 'Masharti ya Huduma'
                    : activeCategory)}
              </h2>
            </div>

            <button
              onClick={() => handleSelectCategoryWithHash('zote')}
              className="text-xs text-zinc-300 hover:text-white bg-zinc-800 px-3 py-1.5 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              Rudi Nyumbani (Zote)
            </button>
          </div>
        )}

        {/* 1. Dedicated Forex Academy Subpage */}
        {activeCategory === 'forex' && (
          <ForexAcademySection
            onBackToHome={() => handleSelectCategoryWithHash('zote')}
            articles={ARTICLES_DATA}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        )}

        {/* 2. Dedicated Utalii wa Tanzania Subpage */}
        {activeCategory === 'utalii' && (
          <TourismTanzaniaSection
            onSelectArticle={(art) => setSelectedArticle(art)}
            articles={ARTICLES_DATA}
          />
        )}

        {/* 3. Dedicated Kazi za Mtandaoni Subpage */}
        {activeCategory === 'kazi' && (
          <FreelanceWorkHubSection
            onSelectArticle={(art) => setSelectedArticle(art)}
            articles={ARTICLES_DATA}
          />
        )}

        {/* 4. Dedicated Dev Hub Subpage */}
        {activeCategory === 'dev' && (
          <DevHubSection
            onSelectArticle={(art) => setSelectedArticle(art)}
            articles={ARTICLES_DATA}
          />
        )}

        {/* 5. Dedicated About Us Subpage */}
        {activeCategory === 'kuhusu' && (
          <AboutUsSection onOpenAiAssistant={() => setIsAiAssistantOpen(true)} />
        )}

        {/* 6. Dedicated Legal / Privacy / Terms Subpage */}
        {(activeCategory === 'privacy' || activeCategory === 'terms') && (
          <LegalPagesSection initialTab={activeCategory === 'terms' ? 'terms' : 'privacy'} />
        )}

        {/* 7. Dedicated Tools Hub Subpage */}
        {activeCategory === 'tools' && (
          <div className="space-y-8">
            <CurrencyConverter />
            <TechToolsSection />
          </div>
        )}

        {/* Home & General Category Articles View */}
        {activeCategory !== 'forex' &&
          activeCategory !== 'utalii' &&
          activeCategory !== 'kazi' &&
          activeCategory !== 'dev' &&
          activeCategory !== 'kuhusu' &&
          activeCategory !== 'privacy' &&
          activeCategory !== 'terms' &&
          activeCategory !== 'tools' && (
            <>
              {/* Hero Grid (Home only, no search) */}
              {activeCategory === 'zote' && !searchQuery && (
                <HeroGrid
                  headlineArticle={headlineArticle}
                  trendingArticles={trendingArticles}
                  onSelectArticle={(art) => setSelectedArticle(art)}
                  onToggleBookmark={toggleBookmark}
                  bookmarkedIds={bookmarkedIds}
                />
              )}

              {/* Gemini AI Hourly Auto-Announcements */}
              {!searchQuery && (
                <GeminiHourlyAnnouncementsSection
                  onSelectArticle={(art) => setSelectedArticle(art)}
                />
              )}

              {/* Quick Currency Converter */}
              {!searchQuery && <CurrencyConverter />}

              {/* In-Feed Monetization / Ad Container */}
              <NetworkAdBanner placement="in-feed" />

              {/* Filterable Articles Grid */}
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="editorial-font text-2xl font-extrabold text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#10b981]" />
                    {searchQuery
                      ? `Matokeo ya "${searchQuery}" (${filteredArticles.length})`
                      : 'Habari Zote za Teknolojia, AI, Coding & Utalii'}
                  </h2>
                  <span className="text-xs text-zinc-300 font-bold uppercase tracking-wider hidden sm:inline">
                    SANTECH TZ • 2026
                  </span>
                </div>

                {filteredArticles.length === 0 ? (
                  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 text-center space-y-3">
                    <SearchX className="w-12 h-12 text-zinc-600 mx-auto" />
                    <h3 className="text-lg font-bold text-white">Hakuna makala zilizopatikana</h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      Jaribu kutafuta kwa maneno mengine kama "Forex", "AI", "Utalii", "Coding" au "Kazi".
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('zote');
                      }}
                      className="bg-[#10b981] hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition-colors cursor-pointer"
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

              {/* Subpages Quick Access Cards on Home */}
              {activeCategory === 'zote' && !searchQuery && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Forex Card */}
                  <div
                    onClick={() => setActiveCategory('forex')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer group shadow-xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-[#10b981]" />
                      <span className="text-xs font-black uppercase text-[#10b981]">Forex Academy</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#10b981] transition-colors">
                      Candlestick Bible & Smart Money Concepts
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Moduli 7 kamili, michoro ya mishumaa na majaribio ya kupima ujuzi wa soko la fedha.
                    </p>
                  </div>

                  {/* Utalii Card */}
                  <div
                    onClick={() => setActiveCategory('utalii')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-amber-950/40 border border-yellow-500/30 hover:border-yellow-400 transition-all cursor-pointer group shadow-xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Compass className="w-5 h-5 text-yellow-400" />
                      <span className="text-xs font-black uppercase text-yellow-400">Utalii wa Tanzania</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                      Serengeti, Zanzibar & Kilimanjaro
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Mwongozo kamili wa safari, makadirio ya bajeti na fursa za Digital Nomads visiwani.
                    </p>
                  </div>

                  {/* Kazi Mtandaoni Card */}
                  <div
                    onClick={() => setActiveCategory('kazi')}
                    className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-amber-950/40 border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer group shadow-xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-amber-400" />
                      <span className="text-xs font-black uppercase text-amber-400">Kazi za Mbali</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      Upwork, Fiverr & Remote Tech Jobs
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Miongozo ya kupata wateja wa kimataifa na kulipwa kwa Dola ukiwa nyumbani Tanzania.
                    </p>
                  </div>
                </div>
              )}

              {/* Swahili Audio Articles & Podcasts */}
              {!searchQuery && <AudioArticlesSection onSelectArticle={(art) => setSelectedArticle(art)} />}

              {/* Tech Showcase Spotlight */}
              {activeCategory === 'zote' && !searchQuery && <TechShowcaseSection />}

              {/* Dev Toolkit & Salary Calculator */}
              {!searchQuery && <TechToolsSection />}

              {/* Tech Assessment Quiz */}
              {!searchQuery && <TechQuizSection />}

              {/* Community Forum & Feedback */}
              {!searchQuery && <CommunityForumSection />}
            </>
          )}
      </main>

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
        onSelectCategory={handleSelectCategoryWithHash}
        onScrollToTools={handleScrollToTools}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
