import React from 'react';
import { TECH_SHOWCASE_DATA } from '../data/newsData';
import { TechShowcaseItem } from '../types';
import { Cpu, Eye, Sparkles, Zap, Shield, ChevronRight, X, Layers } from 'lucide-react';

export const TechShowcaseSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState<TechShowcaseItem | null>(null);
  const [activeTab, setActiveTab] = React.useState<string>('zote');

  const filteredItems = activeTab === 'zote'
    ? TECH_SHOWCASE_DATA
    : TECH_SHOWCASE_DATA.filter((item) => item.category.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section id="tech-showcase" className="my-12 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
              SANTECH TECH SPOTLIGHT 2026
            </span>
          </div>
          <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#10b981]" />
            Nyumba ya Ubunifu wa Teknolojia & Vifaa vya Kisasa
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Gundua picha za ubora wa juu, vipimo vya kiufundi na athari za teknolojia mpya za Akili Bandia, Quantum & Robotics.
          </p>
        </div>

        {/* Categories / Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {['zote', 'AI', 'Robotics', 'Quantum', 'Hardware'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#10b981] text-black shadow-lg shadow-[#10b981]/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {tab === 'zote' ? 'Vyote' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Photo Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group glass border border-white/10 rounded-2xl overflow-hidden hover:border-[#10b981]/50 transition-all duration-300 flex flex-col cursor-pointer shadow-xl hover:-translate-y-1"
          >
            {/* Image Box */}
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider bg-black/80 backdrop-blur text-[#10b981] border border-[#10b981]/30">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-2 rounded bg-[#10b981] text-black font-bold text-xs flex items-center gap-1 shadow-lg">
                  <Eye className="w-3.5 h-3.5" /> Tazama
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">
                  YEAR {item.year} • HARDWARE SPEC
                </span>
                <h3 className="text-base font-extrabold text-white group-hover:text-[#10b981] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Specs Pills */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {item.specs.slice(0, 2).map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded border border-white/10"
                    >
                      ⚡ {spec}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-[#10b981] font-semibold pt-1">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" /> {item.impact}
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal for Selected Tech Item */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-900 border border-white/10 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-4 bg-zinc-950 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                  {selectedItem.category}
                </span>
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">SANTECH HARDWARE SPOTLIGHT</span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="rounded-xl overflow-hidden border border-white/10 max-h-80 bg-zinc-950 relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {selectedItem.title}
                </h2>
                <p className="text-xs text-[#10b981] font-bold uppercase tracking-wider mb-4">
                  {selectedItem.subtitle}
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Specs Box */}
              <div className="bg-zinc-950/80 p-4 rounded-xl border border-white/10 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#10b981]" /> Vipimo vya Kiufundi (Technical Specifications)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedItem.specs.map((spec, idx) => (
                    <div key={idx} className="p-2.5 bg-zinc-900 rounded border border-white/10 text-xs font-mono text-zinc-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Card */}
              <div className="p-4 bg-[#10b981]/10 rounded-xl border border-[#10b981]/30 flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#10b981] shrink-0" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Athari Katika Sekta:</h5>
                  <p className="text-xs text-[#10b981] font-semibold">{selectedItem.impact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
