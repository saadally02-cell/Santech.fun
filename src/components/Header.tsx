import React from 'react';
import {
  Search,
  Moon,
  Sun,
  Bookmark,
  Bot,
  LayoutGrid,
  Cpu,
  Coins,
  Briefcase,
  Code2,
  ShieldCheck,
  Server,
  Menu,
  X,
  Sparkles,
  UserCheck,
  LogIn,
  LogOut,
  TrendingUp,
  Compass,
  Info
} from 'lucide-react';
import { CategoryId } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenAiAssistant: () => void;
  onScrollToTools: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  bookmarksCount,
  onOpenBookmarks,
  onOpenAiAssistant,
  onScrollToTools,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { currentUser, loginWithGoogle, logoutUser } = useAuth();

  const todayFormatted = new Date().toLocaleDateString('sw-TZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const mainNavItems = [
    { id: 'zote' as CategoryId, label: 'Nyumbani' },
    { id: 'forex' as CategoryId, label: 'Forex Academy' },
    { id: 'utalii' as CategoryId, label: 'Utalii TZ' },
    { id: 'kazi' as CategoryId, label: 'Kazi Mtandaoni' },
    { id: 'ai' as CategoryId, label: 'Akili Bandia' },
    { id: 'dev' as CategoryId, label: 'Dev Hub' },
  ];

  const allCategoryItems = [
    { id: 'zote' as CategoryId, label: 'Nyumbani', icon: LayoutGrid },
    { id: 'forex' as CategoryId, label: 'Forex Academy', icon: TrendingUp },
    { id: 'utalii' as CategoryId, label: 'Utalii wa Tanzania', icon: Compass },
    { id: 'kazi' as CategoryId, label: 'Kazi Mtandaoni', icon: Briefcase },
    { id: 'ai' as CategoryId, label: 'Akili Bandia (AI)', icon: Cpu },
    { id: 'dev' as CategoryId, label: 'Dev & Coding', icon: Code2 },
    { id: 'cybersecurity' as CategoryId, label: 'Usalama Mtandao', icon: ShieldCheck },
    { id: 'blockchain' as CategoryId, label: 'FinTech & Web3', icon: Coins },
    { id: 'cloud' as CategoryId, label: 'Cloud & Servers', icon: Server },
    { id: 'tools' as CategoryId, label: 'Zana za Kidijitali', icon: Sparkles },
    { id: 'kuhusu' as CategoryId, label: 'Kuhusu Sisi', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/10 transition-colors w-full max-w-full overflow-hidden">
      {/* Top Bar - 3 Zone Contract */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 flex items-center justify-between gap-3 w-full">
        {/* Zone 1: Brand Title (Single text/wordmark element) */}
        <div className="shrink-0">
          <button
            onClick={() => onSelectCategory('zote')}
            className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-emerald-500"
          >
            <div className="w-8 h-8 rounded-lg bg-[#10b981] flex items-center justify-center font-black text-black text-sm shadow-md group-hover:scale-105 transition-transform">
              ST
            </div>
            <span className="text-lg font-black tracking-tight uppercase editorial-font text-white whitespace-nowrap">
              SANTECH <span className="text-[#10b981]">TZ</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Single-line controls) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
          {mainNavItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-white bg-[#10b981]/20 border border-[#10b981]/40 shadow-sm'
                    : 'hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* AI Assistant FAB / Quick Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10b981]/15 hover:bg-[#10b981]/25 text-[#10b981] border border-[#10b981]/40 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline whitespace-nowrap">AI Swahili</span>
          </button>

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="p-2 text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-pointer relative"
            title="Vipendwa vyako"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#10b981] text-black font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* User Auth Profile / Login */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-[#10b981]/40 px-2.5 py-1 rounded-full text-xs text-white">
              <img
                src={currentUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                alt={currentUser.displayName || 'User'}
                className="w-5 h-5 rounded-full object-cover border border-[#10b981]"
              />
              <span className="hidden xl:inline font-bold text-[11px] truncate max-w-[80px]">
                {currentUser.displayName?.split(' ')[0] || 'Akaunti'}
              </span>
              <button
                onClick={logoutUser}
                className="p-0.5 hover:text-rose-400 text-zinc-400 cursor-pointer"
                title="Ondoka (Logout)"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline whitespace-nowrap">Ingia</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-pointer"
            title="Badili Mandhari"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#10b981]" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded-xl lg:hidden cursor-pointer"
            aria-label="Menyu Kuu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar & Date Sub-header */}
      <div className="border-t border-white/5 bg-black/40 px-3 sm:px-8 py-2 flex items-center justify-between gap-3 w-full">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider hidden sm:inline-block">
          📅 {todayFormatted} • Jukwaa Kuu la Teknolojia, Forex, AI & Utalii Tanzania
        </span>

        {/* Search Input Box */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tafuta makala, Forex, AI, Utalii au misimbo..."
            className="w-full bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-xs rounded-xl px-3 py-1.5 pl-8 focus:outline-none focus:border-[#10b981] transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 p-4 bg-zinc-950/98 space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {allCategoryItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectCategory(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer ${
                    isActive
                      ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                      : 'text-zinc-300 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#10b981] shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 flex gap-2">
            <button
              onClick={() => {
                onSelectCategory('privacy');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-[11px] text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-white/5"
            >
              Sera ya Faragha
            </button>
            <button
              onClick={() => {
                onSelectCategory('terms');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-[11px] text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-white/5"
            >
              Masharti ya Huduma
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
