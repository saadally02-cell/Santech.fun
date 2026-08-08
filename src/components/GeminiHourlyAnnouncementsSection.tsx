import React from 'react';
import { Sparkles, Radio, RefreshCw, Clock, Bot, ArrowRight, Zap, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Article } from '../types';

interface GeminiHourlyAnnouncementsSectionProps {
  onSelectArticle: (article: Article) => void;
}

export const GeminiHourlyAnnouncementsSection: React.FC<GeminiHourlyAnnouncementsSectionProps> = ({
  onSelectArticle,
}) => {
  const { aiAnnouncements, triggerNewAiAnnouncement, isGeneratingAiAnnouncement } = useAuth();

  return (
    <section id="gemini-hourly-broadcaster" className="my-10 animate-fadeIn">
      <div className="glass border border-[#10b981]/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-gradient-to-br from-zinc-950 via-emerald-950/20 to-zinc-950 space-y-6">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#10b981]/10 blur-3xl pointer-events-none rounded-full" />

        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-[#10b981] text-black shadow-lg flex items-center gap-1">
                <Radio className="w-3 h-3 animate-ping" /> GEMINI AI HOURLY AUTO-BROADCAST 2026
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900 text-zinc-300 border border-white/10 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#10b981]" /> Kila Saa 1 (Inajiendesha Wenyewe)
              </span>
            </div>
            <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Bot className="w-7 h-7 text-[#10b981]" />
              Matangazo & Habari za Hivi Punde za Gemini AI
            </h2>
            <p className="text-xs text-zinc-300 mt-1 max-w-2xl">
              Mfumo wa Akili Bandia wa Gemini 3.6 Pro unachambua na kurusha matangazo na habari mpya kabisa za teknolojia, kazi za mtandaoni na utalii kila saa moja moja.
            </p>
          </div>

          <button
            onClick={triggerNewAiAnnouncement}
            disabled={isGeneratingAiAnnouncement}
            className="w-full sm:w-auto bg-[#10b981] hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer disabled:opacity-50 shrink-0 border border-[#10b981]"
          >
            <RefreshCw className={`w-4 h-4 ${isGeneratingAiAnnouncement ? 'animate-spin' : ''}`} />
            {isGeneratingAiAnnouncement ? 'Gemini Inazalisha Tangazo...' : '🔄 Zalisha Tangazo Jipya Sasa'}
          </button>
        </div>

        {/* Announcements List / Cards */}
        {aiAnnouncements.length === 0 ? (
          <div className="text-center py-10 bg-zinc-950/60 rounded-2xl border border-white/10 space-y-3">
            <Bot className="w-12 h-12 text-[#10b981] mx-auto animate-bounce" />
            <h3 className="text-sm font-bold text-white">Gemini AI Inarusha Tangazo la Kwanza...</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Tafadhali subiri sekunde chache au bonyeza kitufe cha "Zalisha Tangazo Jipya" hapo juu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {aiAnnouncements.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => onSelectArticle(item)}
                className="group bg-zinc-950/80 hover:bg-zinc-900/90 border border-white/10 hover:border-[#10b981]/60 p-5 rounded-2xl transition-all shadow-xl flex flex-col justify-between cursor-pointer space-y-4 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                      {item.categoryName || 'SANTECH AI'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400 fill-current" /> {item.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-[#10b981] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-300">
                    <Bot className="w-3.5 h-3.5 text-[#10b981]" /> {item.author || 'Gemini Bot'}
                  </span>

                  <span className="text-[#10b981] font-extrabold text-[11px] group-hover:underline flex items-center gap-1">
                    Soma Zote <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
