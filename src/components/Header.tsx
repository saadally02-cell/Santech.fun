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
  LogOut
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

  const navItems = [
    { id: 'zote' as CategoryId, label: 'Nyumbani', icon: LayoutGrid },
    { id: 'ai' as CategoryId, label: 'Akili Bandia', icon: Cpu },
    { id: 'dev' as CategoryId, label: 'Coding', icon: Code2 },
    { id: 'cybersecurity' as CategoryId, label: 'Usalama', icon: ShieldCheck },
    { id: 'gadgets' as CategoryId, label: 'Robotics', icon: Bot },
    { id: 'kazi' as CategoryId, label: 'Kazi Mtandaoni', icon: Briefcase },
    { id: 'blockchain' as CategoryId, label: 'FinTech', icon: Coins },
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/10 transition-colors w-full max-w-full overflow-hidden">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-3 flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectCategory('zote')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded bg-[#10b981] flex items-center justify-center font-black text-black text-base shadow-md group-hover:scale-105 transition-transform">
              ST
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tighter uppercase editorial-font flex items-center gap-1.5">
                SANTECH <span className="text-[#10b981]">TECH</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                  2026 EDITION
                </span>
              </h1>
            </div>
          </button>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-5 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
          {navItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className={`h-10 flex items-center transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-white border-[#10b981]'
                    : 'border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={onScrollToTools}
            className="h-10 flex items-center text-[#10b981] hover:underline border-b-2 border-transparent transition-colors cursor-pointer gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Dev Toolkit
          </button>
        </nav>

        {/* Date & Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* User Auth Profile Chip / Login Button */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-zinc-900 border border-[#10b981]/40 px-2.5 py-1 rounded-full text-xs text-white">
              <img
                src={currentUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                alt={currentUser.displayName || 'User'}
                className="w-5 h-5 rounded-full object-cover border border-[#10b981]"
              />
              <span className="hidden xl:inline font-bold text-[11px]">
                {currentUser.displayName?.split(' ')[0] || 'User'}
              </span>
              <button
                onClick={logoutUser}
                className="p-1 hover:text-rose-400 text-zinc-400 cursor-pointer"
                title="Ondoka (Logout)"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 text-xs font-bold uppercase px-3 py-1.5 rounded transition-all hover:scale-[1.02] cursor-pointer"
              title="Ingia na Google (Firebase Auth)"
            >
              <LogIn className="w-3.5 h-3.5 text-[#10b981]" />
              <span className="hidden sm:inline">Ingia (Google)</span>
            </button>
          )}

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] border border-[#10b981]/40 text-xs font-bold uppercase px-3 py-1.5 rounded transition-all hover:scale-[1.02] cursor-pointer"
            title="SANTECH AI Assistant"
          >
            <Bot className="w-4 h-4 text-[#10b981] animate-pulse" />
            <span className="hidden sm:inline">SANTECH AI</span>
          </button>

          {/* Bookmarks Counter */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors cursor-pointer"
            title="Vipengele Vilivyohifadhiwa"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#10b981] text-black font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-colors cursor-pointer"
            title="Badili Mandhari"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#10b981]" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar Row for Mobile & Sub-nav */}
      <div className="border-t border-white/5 bg-black/40 px-3 sm:px-8 py-2 flex items-center justify-between gap-2 sm:gap-4 w-full">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
          📅 {todayFormatted} • Kituo cha Habari za Teknolojia, AI & Coding Tanzania
        </span>

        {/* Search Input Box */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tafuta makala, AI, au misimbo..."
            className="w-full bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-xs rounded px-3 py-1.5 pl-8 focus:outline-none focus:border-[#10b981] transition-colors"
          />
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 p-4 bg-zinc-950/95 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectCategory(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded text-xs font-bold uppercase tracking-wider cursor-pointer ${
                    isActive ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#10b981]" />
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              onScrollToTools();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded text-xs font-bold text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-[#10b981]" />
            Kikokotoo cha Kazi & Salary 2026
          </button>
        </div>
      )}
    </header>
  );
};
