import React, { useState } from 'react';
import {
  Search,
  Sun,
  Moon,
  Bookmark,
  Menu,
  X,
  Ship,
  Wrench,
  Zap,
  ShieldAlert,
  Calculator,
  Anchor,
  Bot,
  HelpCircle,
  FileText,
  ClipboardCheck,
  CheckCircle2,
  Compass,
  Waves,
  GraduationCap
} from 'lucide-react';
import { CategoryId } from '../types';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { id: 'zote' as CategoryId, label: 'Home' },
    { id: 'library' as CategoryId, label: 'NIT PDF Library (10 Files)' },
    { id: 'naval-architecture' as CategoryId, label: 'Naval Architecture' },
    { id: 'injini-kuu' as CategoryId, label: 'Main Engines' },
    { id: 'mitambo-msaidizi' as CategoryId, label: 'Auxiliary Systems' },
    { id: 'umeme-na-otomesheni' as CategoryId, label: 'Electrical & Automation' },
    { id: 'sheria-na-usalama' as CategoryId, label: 'IMO & SOLAS' },
    { id: 'vipimo-na-miongozo' as CategoryId, label: 'Calculations & MEO' },
  ];

  const allCategoryItems = [
    { id: 'zote' as CategoryId, label: 'Home (Maritime Hub)', icon: Anchor },
    { id: 'library' as CategoryId, label: 'NIT Courseware & PDF Library (10 Files Download)', icon: GraduationCap },
    { id: 'naval-architecture' as CategoryId, label: 'Naval Architecture Suite (Hydrodynamics, Stability, Sizing)', icon: Compass },
    { id: 'injini-kuu' as CategoryId, label: 'Main Engines & Propulsion (MAN B&W, WinGD)', icon: Ship },
    { id: 'mitambo-msaidizi' as CategoryId, label: 'Auxiliary Machinery (Boilers, Purifiers, OWS)', icon: Wrench },
    { id: 'umeme-na-otomesheni' as CategoryId, label: 'Electrical & Automation (HV 6.6kV, PMS)', icon: Zap },
    { id: 'sheria-na-usalama' as CategoryId, label: 'Maritime Regulations (SOLAS, MARPOL, STCW)', icon: ShieldAlert },
    { id: 'vipimo-na-miongozo' as CategoryId, label: 'Calculators & Formulas (SFOC, Slip, ASTM)', icon: Calculator },
    { id: 'checklist' as CategoryId, label: 'Engine Room Watchkeeping Checklists', icon: ClipboardCheck },
    { id: 'quiz' as CategoryId, label: 'MEO Exam Prep Quiz (Oral & Written)', icon: HelpCircle },
    { id: 'kuhusu' as CategoryId, label: 'About SAN25 & NIT Maritime Partnership', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 transition-colors w-full max-w-full overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 flex items-center justify-between gap-3 w-full">
        {/* Brand Logo, NIT Crest & Founder Badge */}
        <div className="shrink-0 flex items-center gap-3">
          <button
            onClick={() => onSelectCategory('zote')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-[#FFC107]"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FFC107] text-black flex items-center justify-center font-black text-xs tracking-tight shadow-md border-2 border-amber-300 group-hover:scale-105 transition-transform flex-col leading-none">
              <span className="text-[10px] font-black">SAN</span>
              <span className="text-[10px] font-black text-blue-950">25</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight uppercase editorial-font text-white leading-none">
                  SAN<span className="text-[#FFC107]">Marine</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Marine Engineering
                </span>
              </div>
              <span className="text-[8px] font-bold text-zinc-400 tracking-widest uppercase">
                Naval Architecture & Engineering Hub
              </span>
            </div>
          </button>

          {/* National Institute of Transport (NIT) Institutional Crest */}
          <div
            onClick={() => onSelectCategory('library')}
            className="hidden md:flex items-center gap-2 pl-3 border-l border-white/10 cursor-pointer group"
            title="Aligned with National Institute of Transport (NIT) Marine Engineering Syllabus"
          >
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 shadow border border-amber-300/40 group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/assets/aistudio/IMG-20261104-WA0113_1__cc428c64.jpg"
                alt="National Institute of Transport Crest"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden lg:flex flex-col leading-none">
              <span className="text-[9px] font-black text-zinc-200 tracking-wider uppercase group-hover:text-[#FFC107] transition-colors">
                NIT Dar es Salaam
              </span>
              <span className="text-[8px] font-semibold text-zinc-400">
                Courseware Repository
              </span>
            </div>
          </div>

          {/* Founder Badge: Saad Ally Nassor */}
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#FFC107]/20 border border-[#FFC107]/40 flex items-center justify-center text-xs font-black text-[#FFC107] shadow-inner">
              SN
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-black text-white tracking-wide">
                Saad Ally Nassor
              </span>
              <span className="text-[8px] font-bold text-[#FFC107] uppercase tracking-wider">
                Founder & Lead Technologist
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
          {mainNavItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-black bg-[#FFC107] font-black shadow-md'
                    : 'hover:text-white hover:bg-white/10 text-zinc-300 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Marine Calculator Anchor */}
          <button
            onClick={() => {
              const el = document.getElementById('marine-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            title="Marine Technical Calculator"
          >
            <Calculator className="w-3.5 h-3.5 text-[#FFC107]" />
            <span>Calculators</span>
          </button>

          {/* C/Eng AI Assistant */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-[#FFC107] border border-[#FFC107]/40 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm"
            title="Chief Engineer AI Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-[#FFC107]" />
            <span className="hidden sm:inline">C/Eng AI</span>
          </button>

          {/* Seafarers WhatsApp Community */}
          <a
            href="https://whatsapp.com/channel/0029VaSANTechTZ"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-transform hover:scale-105"
            title="Join SAN25 Marine Engineers WhatsApp Community"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>Seafarers Channel</span>
          </a>

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-colors cursor-pointer"
            title="Bookmarked Technical Articles"
          >
            <Bookmark className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FFC107] text-black font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FFC107]" /> : <Moon className="w-4 h-4 text-zinc-200" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded-xl lg:hidden cursor-pointer"
            aria-label="Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FFC107]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Global Search Input */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 pb-2.5">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search MAN B&W ME-C, Boilers, Purifiers, OWS 15ppm, High Voltage, SOLAS, STCW, Drydocking, NIT Notes..."
            className="w-full bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-xs rounded-xl px-3 py-2 pl-8 focus:outline-none focus:border-[#FFC107] transition-colors font-medium"
          />
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 p-4 bg-black/98 space-y-3 max-h-[80vh] overflow-y-auto">
          <a
            href="https://whatsapp.com/channel/0029VaSANTechTZ"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#FFC107] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md block text-center"
          >
            <span>Join Seafarers WhatsApp Channel</span>
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
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
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#FFC107] text-black font-black'
                      : 'text-zinc-300 bg-zinc-900 hover:bg-zinc-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-[#FFC107]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
