import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { HeroGrid } from './components/HeroGrid';
import { GeminiHourlyAnnouncementsSection } from './components/GeminiHourlyAnnouncementsSection';
import { ArticleCard } from './components/ArticleCard';
import { TechShowcaseSection } from './components/TechShowcaseSection';
import { AudioArticlesSection } from './components/AudioArticlesSection';
import { CommunityForumSection } from './components/CommunityForumSection';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { NetworkAdBanner } from './components/NetworkAdBanner';
import { AiraloEsimBanner } from './components/AiraloEsimBanner';
import { Footer } from './components/Footer';

// Marine Engineering Core Components
import { MarineEngineeringCalculator } from './components/MarineEngineeringCalculator';
import { MarineEngineRoomChecklist } from './components/MarineEngineRoomChecklist';
import { MarineExamPrepQuiz } from './components/MarineExamPrepQuiz';
import { NavalArchitectureHub } from './components/naval/NavalArchitectureHub';
import { ACADEMIC_DOCUMENTS, CourseDocument } from './components/academic/AcademicLibrarySection';

// Subpages System Components & Data
import {
  SubpageArticle,
  ALL_SUBPAGES,
  getSubpageBySlug,
  normalizeCategory
} from './data/subpagesData';
import { SubpageArticleView } from './components/SubpageArticleView';
import { CategorySubpagesView } from './components/CategorySubpagesView';
import { TechSidebar } from './components/TechSidebar';
import { WhatsAppChannelCTA } from './components/WhatsAppChannelCTA';

import { ARTICLES_DATA, CATEGORIES } from './data/newsData';
import { Article, CategoryId } from './types';
import {
  SearchX,
  Sparkles,
  Ship,
  Wrench,
  Zap,
  ShieldCheck,
  Calculator,
  Compass,
  FileCheck2,
  GraduationCap,
  ExternalLink,
  Download,
  Eye,
  BookOpen,
  Award
} from 'lucide-react';

const SUBPAGE_CATEGORY_KEYS = [
  'injini-kuu',
  'mitambo-msaidizi',
  'umeme-na-otomesheni',
  'sheria-na-usalama',
  'vipimo-na-miongozo',
  // Legacy aliases
  'simu',
  'apps',
  'internet',
  'jinsi-ya',
  'bei'
];

function MainApp() {
  // Theme state
  const [theme, setTheme] = React.useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('santech_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Active Subpage State (for dynamic /[category]/[slug])
  const [currentSubpage, setCurrentSubpage] = React.useState<SubpageArticle | null>(() => {
    if (typeof window === 'undefined') return null;
    const path = window.location.pathname.replace(/^\//, '').split('/');
    if (path.length >= 2 && SUBPAGE_CATEGORY_KEYS.includes(path[0].toLowerCase())) {
      const found = getSubpageBySlug(path[0], path[1]);
      if (found) return found;
    }
    const hash = window.location.hash.replace(/^#\/?/, '').split('/');
    if (hash.length >= 2 && SUBPAGE_CATEGORY_KEYS.includes(hash[0].toLowerCase())) {
      const found = getSubpageBySlug(hash[0], hash[1]);
      if (found) return found;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const paramCat = urlParams.get('category');
    const paramSlug = urlParams.get('slug');
    if (paramCat && paramSlug) {
      const found = getSubpageBySlug(paramCat, paramSlug);
      if (found) return found;
    }
    return null;
  });

  // Helper to map location to CategoryId
  const getCategoryFromLocation = (): CategoryId => {
    if (typeof window === 'undefined') return 'zote';

    const path = window.location.pathname.replace(/^\//, '').split('/')[0].toLowerCase().trim();
    if (SUBPAGE_CATEGORY_KEYS.includes(path)) {
      return normalizeCategory(path) as CategoryId;
    }
    if (['calculator', 'checklist', 'quiz', 'naval-architecture', 'hydrodynamics', 'ship-stability', 'ship-design', 'maneuvering', 'drydocking', 'library', 'forum', 'audio', 'showcase'].includes(path)) {
      return path as CategoryId;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const paramCategory = urlParams.get('category') || urlParams.get('page') || urlParams.get('tab') || urlParams.get('subpage');
    const rawTarget = paramCategory ? paramCategory : window.location.hash.replace(/^#\/?/, '').split('/')[0];
    const clean = rawTarget.toLowerCase().trim();

    if (!clean) return 'zote';

    if (SUBPAGE_CATEGORY_KEYS.includes(clean)) {
      return normalizeCategory(clean) as CategoryId;
    }
    if (['naval-architecture', 'naval', 'architecture', 'usanifu-wa-meli'].includes(clean)) {
      return 'naval-architecture';
    }
    if (['hydrodynamics', 'hydro', 'resistance', 'powering', 'upinzani'].includes(clean)) {
      return 'hydrodynamics';
    }
    if (['ship-stability', 'stability', 'utulivu', 'gz-curve', 'gm'].includes(clean)) {
      return 'ship-stability';
    }
    if (['ship-design', 'design-methodology', 'design-spiral', 'usanifu'].includes(clean)) {
      return 'ship-design';
    }
    if (['maneuvering', 'steering', 'usukani'].includes(clean)) {
      return 'maneuvering';
    }
    if (['drydocking', 'drydock', 'maintenance', 'gatini'].includes(clean)) {
      return 'drydocking';
    }
    if (['library', 'courseware', 'nit-notes', 'vitabu', 'notes'].includes(clean)) {
      return 'library';
    }
    if (['calc', 'calculator', 'hesabu', 'sfoc', 'slip'].includes(clean)) {
      return 'calculator';
    }
    if (['checklist', 'rounds', 'engine-room-checklist', 'ukaguzi'].includes(clean)) {
      return 'checklist';
    }
    if (['quiz', 'maswali', 'meo-quiz', 'orals', 'viva'].includes(clean)) {
      return 'quiz';
    }
    if (['audio', 'sauti', 'podcast'].includes(clean)) {
      return 'audio';
    }
    if (['forum', 'jamii', 'community'].includes(clean)) {
      return 'forum';
    }
    if (['showcase', 'mitambo-mipya'].includes(clean)) {
      return 'showcase';
    }
    return 'zote';
  };

  const [activeCategory, setActiveCategory] = React.useState<CategoryId>(() => {
    return getCategoryFromLocation();
  });

  // Modal Article state (for legacy news items)
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(() => {
    if (typeof window === 'undefined') return null;
    const urlParams = new URLSearchParams(window.location.search);
    const articleIdParam = urlParams.get('article');
    if (articleIdParam) {
      return ARTICLES_DATA.find((a) => a.id === articleIdParam) || null;
    }
    return null;
  });

  // URL listener for browser history (Back / Forward navigation)
  React.useEffect(() => {
    const handleLocationChange = () => {
      // 1. Check if path is a subpage /[category]/[slug]
      const pathParts = window.location.pathname.replace(/^\//, '').split('/');
      if (pathParts.length >= 2 && SUBPAGE_CATEGORY_KEYS.includes(pathParts[0].toLowerCase())) {
        const found = getSubpageBySlug(pathParts[0], pathParts[1]);
        if (found) {
          setCurrentSubpage(found);
          setActiveCategory(normalizeCategory(pathParts[0]) as CategoryId);
          return;
        }
      }

      // Check hash fallback #/category/slug
      const hashParts = window.location.hash.replace(/^#\/?/, '').split('/');
      if (hashParts.length >= 2 && SUBPAGE_CATEGORY_KEYS.includes(hashParts[0].toLowerCase())) {
        const found = getSubpageBySlug(hashParts[0], hashParts[1]);
        if (found) {
          setCurrentSubpage(found);
          setActiveCategory(normalizeCategory(hashParts[0]) as CategoryId);
          return;
        }
      }

      // If we are at root or a category list
      setCurrentSubpage(null);
      setActiveCategory(getCategoryFromLocation());

      const urlParams = new URLSearchParams(window.location.search);
      const articleIdParam = urlParams.get('article');
      if (articleIdParam) {
        const found = ARTICLES_DATA.find((a) => a.id === articleIdParam);
        if (found) setSelectedArticle(found);
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Navigation Handlers with REAL Working Links (No '#')
  const handleNavigateToSubpage = (category: string, slug: string) => {
    const article = getSubpageBySlug(category, slug);
    if (article) {
      setCurrentSubpage(article);
      setActiveCategory(normalizeCategory(article.category) as CategoryId);
      window.history.pushState(null, '', `/${article.category}/${article.slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToCategory = (cat: CategoryId | string) => {
    setCurrentSubpage(null);
    const normalized = normalizeCategory(cat) as CategoryId;
    setActiveCategory(normalized);
    if (normalized === 'zote') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `/${normalized}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentSubpage(null);
    setActiveCategory('zote');
    setSearchQuery('');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Drawer state
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
    setCurrentSubpage(null);
    setActiveCategory('calculator');
    window.history.pushState(null, '', '/calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter Articles
  const filteredArticles = ARTICLES_DATA.filter((article) => {
    const matchesCategory =
      activeCategory === 'zote' ||
      article.category === activeCategory ||
      normalizeCategory(article.category) === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      article.title.toLowerCase().includes(q) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(q)) ||
      (article.categoryName && article.categoryName.toLowerCase().includes(q)) ||
      article.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // 8 latest news cards for home grid as requested
  const latestNews8 = filteredArticles.slice(0, 8);

  const headlineArticle = ARTICLES_DATA.find((a) => a.isHeadline) || ARTICLES_DATA[0];
  const trendingArticles = ARTICLES_DATA.filter((a) => a.isTrending).sort(
    (a, b) => (a.rankNumber || 99) - (b.rankNumber || 99)
  );

  const bookmarkedArticles = ARTICLES_DATA.filter((a) => bookmarkedIds.includes(a.id));

  const relatedArticles = selectedArticle
    ? ARTICLES_DATA.filter((a) => a.id !== selectedArticle.id)
    : [];

  const isSubpageCategoryActive = [
    'injini-kuu',
    'mitambo-msaidizi',
    'umeme-na-otomesheni',
    'sheria-na-usalama',
    'vipimo-na-miongozo',
    'simu',
    'apps',
    'internet',
    'jinsi-ya',
    'bei'
  ].includes(activeCategory);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-[#FFC107] selection:text-black overflow-x-hidden w-full max-w-full">
      {/* Sticky Navbar Header with SAN25 Marine Engineering Logo & Categories */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={handleNavigateToCategory}
        bookmarksCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onScrollToTools={handleScrollToTools}
      />

      {/* Breaking Maritime Alerts & Regulation Ticker */}
      <NewsTicker onSelectTopic={(topic) => setSearchQuery(topic)} />

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 overflow-x-hidden w-full">
        {/* CASE 1: DYNAMIC SUBPAGE VIEW (/[category]/[slug]) */}
        {currentSubpage ? (
          <SubpageArticleView
            article={currentSubpage}
            onNavigateToSubpage={handleNavigateToSubpage}
            onNavigateToCategory={handleNavigateToCategory}
            onBackToHome={handleBackToHome}
          />
        ) : isSubpageCategoryActive ? (
          /* CASE 2: CATEGORY SUBPAGES INDEX VIEW (e.g. /injini-kuu, /mitambo-msaidizi, etc.) */
          <CategorySubpagesView
            category={activeCategory}
            onNavigateToSubpage={handleNavigateToSubpage}
            onBackToHome={handleBackToHome}
          />
        ) : ['naval-architecture', 'hydrodynamics', 'ship-stability', 'ship-design', 'maneuvering', 'drydocking', 'library'].includes(activeCategory) ? (
          /* CASE 3: NAVAL ARCHITECTURE, HYDRODYNAMICS, STABILITY & ACADEMIC LIBRARY SUITE */
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-zinc-900 border border-white/10 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider">
                  Naval Architecture & Marine Engineering Suite
                </span>
                <h2 className="text-xl font-black text-white">
                  Ship Hydrodynamics, Stability, Design & Academic Courseware
                </h2>
              </div>
              <button
                onClick={handleBackToHome}
                className="text-xs text-black font-bold bg-[#FFC107] px-3.5 py-1.5 rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
            <NavalArchitectureHub
              initialTab={
                activeCategory === 'hydrodynamics'
                  ? 'hydrodynamics'
                  : activeCategory === 'ship-stability'
                  ? 'stability'
                  : activeCategory === 'ship-design'
                  ? 'design'
                  : activeCategory === 'maneuvering'
                  ? 'maneuvering'
                  : activeCategory === 'drydocking'
                  ? 'drydocking'
                  : activeCategory === 'library'
                  ? 'library'
                  : 'hydrodynamics'
              }
              onNavigateSubpage={handleNavigateToSubpage}
            />
          </div>
        ) : activeCategory === 'calculator' ? (
          /* CASE 4: MARINE ENGINEERING CALCULATOR */
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-zinc-900 border border-white/10 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider">
                  Marine Engineering Tools
                </span>
                <h2 className="text-xl font-black text-white">
                  Marine Engineering Technical Calculator Suite
                </h2>
              </div>
              <button
                onClick={handleBackToHome}
                className="text-xs text-black font-bold bg-[#FFC107] px-3.5 py-1.5 rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
            <MarineEngineeringCalculator />
          </div>
        ) : activeCategory === 'checklist' ? (
          /* CASE 5: ENGINE ROOM CHECKLISTS */
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-zinc-900 border border-white/10 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider">
                  Machinery Space Operations
                </span>
                <h2 className="text-xl font-black text-white">
                  Engine Room Watchkeeping & Emergency Checklists
                </h2>
              </div>
              <button
                onClick={handleBackToHome}
                className="text-xs text-black font-bold bg-[#FFC107] px-3.5 py-1.5 rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
            <MarineEngineRoomChecklist />
          </div>
        ) : activeCategory === 'quiz' ? (
          /* CASE 6: MEO CLASS 1/2/4 EXAM PREP QUIZ */
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-zinc-900 border border-white/10 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider">
                  MEO Examination Prep
                </span>
                <h2 className="text-xl font-black text-white">
                  MEO Class 1, 2 & 4 Oral and Written Examination Simulator
                </h2>
              </div>
              <button
                onClick={handleBackToHome}
                className="text-xs text-black font-bold bg-[#FFC107] px-3.5 py-1.5 rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
            <MarineExamPrepQuiz />
          </div>
        ) : activeCategory === 'audio' ? (
          <AudioArticlesSection onSelectArticle={(art) => setSelectedArticle(art)} />
        ) : activeCategory === 'forum' ? (
          <CommunityForumSection />
        ) : activeCategory === 'showcase' ? (
          <TechShowcaseSection />
        ) : (
          /* CASE 7: MODERN HOMEPAGE (Marine Engineering & Maritime Operations Hub) */
          <>
            {/* 1. HERO SECTION: 1 Main Trending Propulsion Feature + 4 Side Technical Cards */}
            {!searchQuery && (
              <HeroGrid
                headlineArticle={headlineArticle}
                trendingArticles={trendingArticles}
                onSelectArticle={(art) => setSelectedArticle(art)}
                onToggleBookmark={toggleBookmark}
                bookmarkedIds={bookmarkedIds}
              />
            )}

            {/* Quick Interactive Marine Engine & Naval Architecture Tools Bar (5 Cards) */}
            {!searchQuery && (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div
                  onClick={() => handleNavigateToCategory('library')}
                  className="bg-zinc-900/90 hover:bg-zinc-850 border border-[#FFC107]/40 hover:border-[#FFC107] rounded-2xl p-5 cursor-pointer transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/40 flex items-center justify-center font-black">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-[#FFC107] transition-colors">
                        NIT PDF Library
                      </h4>
                      <p className="text-[11px] text-zinc-400">13 Lecture Notes & Books</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => handleNavigateToCategory('naval-architecture')}
                  className="bg-zinc-900/90 hover:bg-zinc-850 border border-blue-500/30 hover:border-blue-400 rounded-2xl p-5 cursor-pointer transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-black">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">
                        Naval Architecture
                      </h4>
                      <p className="text-[11px] text-zinc-400">Hydrodynamics, GZ & Design</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => handleNavigateToCategory('calculator')}
                  className="bg-zinc-900/90 hover:bg-zinc-850 border border-white/10 hover:border-[#FFC107]/60 rounded-2xl p-5 cursor-pointer transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-black flex items-center justify-center font-black">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-[#FFC107] transition-colors">
                        Marine Calculator
                      </h4>
                      <p className="text-[11px] text-zinc-400">SFOC, Slip, ASTM & OWS</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => handleNavigateToCategory('checklist')}
                  className="bg-zinc-900/90 hover:bg-zinc-850 border border-white/10 hover:border-[#FFC107]/60 rounded-2xl p-5 cursor-pointer transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#FFC107] border border-[#FFC107]/40 flex items-center justify-center font-black">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-[#FFC107] transition-colors">
                        Engine Checklists
                      </h4>
                      <p className="text-[11px] text-zinc-400">Watchkeeping & Rounds</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => handleNavigateToCategory('quiz')}
                  className="bg-zinc-900/90 hover:bg-zinc-850 border border-white/10 hover:border-[#FFC107]/60 rounded-2xl p-5 cursor-pointer transition-all group shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white group-hover:text-[#FFC107] transition-colors">
                        MEO Exam Prep
                      </h4>
                      <p className="text-[11px] text-zinc-400">Oral Viva & Class 1/2/4</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FOUNDER SPOTLIGHT & DIRECT NIT COURSEWARE PDF DOWNLOADS */}
            {!searchQuery && (
              <section className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black rounded-3xl border-2 border-[#FFC107]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC107]/5 rounded-full blur-3xl pointer-events-none" />

                {/* Founder Info Header */}
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Founder & NIT Dual Badges */}
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-16 rounded-2xl bg-[#FFC107] text-black font-black flex items-center justify-center text-xl shadow-xl border-2 border-amber-300 shrink-0 flex-col leading-none">
                        <span className="text-sm font-black">SAN</span>
                        <span className="text-xs font-black">25</span>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-xl border-2 border-[#FFC107] shrink-0 flex items-center justify-center" title="National Institute of Transport (NIT)">
                        <img
                          src="/assets/aistudio/IMG-20261104-WA0113_1__cc428c64.jpg"
                          alt="NIT Crest"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-[#FFC107] text-black">
                          Muanzilishi / Founder
                        </span>
                        <span className="text-xs font-bold text-zinc-400">
                          SAN25 Marine Engineering Hub (santech.fun)
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight editorial-font">
                        Saad Ally Nassor
                      </h2>
                      <p className="text-xs text-[#FFC107] font-semibold mt-0.5">
                        Chief Marine Engineering Technologist & Academic Repository Curator • NIT Syllabus Aligned
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleNavigateToCategory('library')}
                      className="px-5 py-2.5 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-102 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Open Full Library (13 Files)</span>
                    </button>
                    <a
                      href="mailto:saadally02@gmail.com"
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs border border-white/15 transition-colors"
                    >
                      Contact Founder
                    </a>
                  </div>
                </div>

                {/* Mission statement */}
                <div className="relative z-10">
                  <p className="text-sm text-zinc-300 leading-relaxed max-w-4xl">
                    Karibu kwenye <strong className="text-white">SAN25 Marine Engineering Hub</strong>. Tovuti hii imeanzishwa na <strong className="text-[#FFC107]">Saad Ally Nassor</strong> kwa ajili ya kuwapatia mainjinia wa meli, wanafunzi wa Chuo cha Taifa cha Usafirishaji (NIT), DMI, na mabaharia wa Tanzania na kimataifa upatikanaji wa bure wa mafaili yote ya kitaaluma (PDF 13), mahesabu ya usanifu wa meli (Naval Architecture), na maandalizi ya mitihani ya leseni za MEO Class 1, 2 na 4.
                  </p>
                </div>

                {/* Instant 13 PDF Downloads Grid */}
                <div className="relative z-10 pt-4 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#FFC107]" />
                      <h3 className="text-base font-black text-white uppercase tracking-wider">
                        Pakua Mafaili ya PDF (NIT & Barrass Official Marine Courseware)
                      </h3>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                      13 Files • Direct 1-Click PDF Download
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                    {ACADEMIC_DOCUMENTS.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3.5 bg-zinc-900/90 hover:bg-zinc-850 rounded-2xl border border-white/10 hover:border-[#FFC107]/50 transition-all flex flex-col justify-between space-y-3 group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FFC107]/15 text-[#FFC107]">
                              {doc.code}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">{doc.fileSize}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white group-hover:text-[#FFC107] transition-colors line-clamp-2 leading-snug">
                            {doc.title}
                          </h4>
                          <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">
                            {doc.subtitle}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                          <button
                            onClick={() => {
                              handleNavigateToCategory('library');
                            }}
                            className="flex-1 py-1.5 px-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          >
                            <Eye className="w-3 h-3 text-[#FFC107]" />
                            <span>Read</span>
                          </button>
                          <a
                            href={doc.filePath}
                            download={doc.filename}
                            className="py-1.5 px-2.5 rounded-lg bg-[#FFC107] hover:bg-amber-400 text-black text-[10px] font-black flex items-center justify-center gap-1 shadow transition-colors"
                            title={`Download ${doc.filename}`}
                          >
                            <Download className="w-3 h-3" />
                            <span>Download PDF</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 2. MAIN CONTENT + SIDEBAR TWO-COLUMN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 8 Latest News Cards + Categories Quick View */}
              <div className="lg:col-span-8 space-y-10">
                {/* LATEST MARINE ENGINEERING & MARITIME NEWS GRID (8 CARDS) */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" />
                      <h2 className="editorial-font text-2xl font-black text-white tracking-tight">
                        {searchQuery
                          ? `Technical Search Results: "${searchQuery}" (${filteredArticles.length})`
                          : 'Latest Marine Engineering & Naval Architecture Articles'}
                      </h2>
                    </div>
                    <span className="text-xs text-[#FFC107] font-black uppercase tracking-wider hidden sm:inline">
                      SAN25 • MEO Class 1/2 Standards
                    </span>
                  </div>

                  {filteredArticles.length === 0 ? (
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 text-center space-y-3">
                      <SearchX className="w-12 h-12 text-zinc-600 mx-auto" />
                      <h3 className="text-lg font-bold text-white">No technical articles found</h3>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                        Try searching for "MAN B&W", "Boiler", "Scavenge Fire", "15 PPM OWS", "MARPOL", "Drydocking" or "SFOC".
                      </p>
                      <button
                        onClick={handleBackToHome}
                        className="bg-[#FFC107] text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Show All Articles
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {latestNews8.map((article) => (
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

                {/* FEATURED MARINE SUBPAGES SHOWCASE ON HOMEPAGE */}
                {!searchQuery && (
                  <section className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#FFC107]" />
                        <h3 className="text-lg font-black text-white">
                          Main Propulsion & Auxiliary Systems (SAN25 Technical Briefs)
                        </h3>
                      </div>
                      <button
                        onClick={() => handleNavigateToCategory('injini-kuu')}
                        className="text-xs font-bold text-[#FFC107] hover:underline"
                      >
                        All 50+ Guides &rarr;
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {ALL_SUBPAGES.slice(0, 3).map((sub) => (
                        <div
                          key={sub.id}
                          onClick={() => handleNavigateToSubpage(sub.category, sub.slug)}
                          className="bg-black/60 hover:bg-black rounded-xl p-3 border border-white/5 hover:border-[#FFC107]/40 transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div className="h-28 rounded-lg overflow-hidden mb-2">
                            <img
                              src={sub.imageUrl}
                              alt={sub.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase text-[#FFC107]">
                              {sub.categoryLabel}
                            </span>
                            <h4 className="text-xs font-bold text-white group-hover:text-[#FFC107] transition-colors line-clamp-2 mt-1">
                              {sub.title}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* WHATSAPP CHANNEL CTA SECTION FOR SEAFARERS & ENGINEERS */}
                {!searchQuery && <WhatsAppChannelCTA />}

                {/* Hourly AI Technical Maritime Broadcast */}
                {!searchQuery && (
                  <GeminiHourlyAnnouncementsSection
                    onSelectArticle={(art) => setSelectedArticle(art)}
                  />
                )}
              </div>

              {/* Right Column: SIDEBAR LISTING SUBPAGES BY CATEGORY */}
              <div className="lg:col-span-4">
                <TechSidebar
                  onNavigateToSubpage={handleNavigateToSubpage}
                  onNavigateToCategory={handleNavigateToCategory}
                />
              </div>
            </div>

            {/* Seafarer Port Roaming eSIM Banner */}
            <div className="my-8">
              <AiraloEsimBanner />
            </div>

            {/* In-Feed Monetization / Ad Container */}
            <NetworkAdBanner placement="in-feed" />

            {/* Marine Engineering Showcase Spotlight */}
            {!searchQuery && <TechShowcaseSection />}
          </>
        )}
      </main>

      {/* Article Detail Modal (for legacy news items) */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onToggleBookmark={toggleBookmark}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
        relatedArticles={relatedArticles}
        onSelectRelated={(rel) => setSelectedArticle(rel)}
      />

      {/* Chief Engineer AI Assistant Drawer */}
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

      {/* Footer with SAN25 Logo & All Marine Categories & Subpage Links */}
      <Footer
        onSelectCategory={handleNavigateToCategory}
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
