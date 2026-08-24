import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  DollarSign,
  Sun,
  ShieldCheck,
  Camera,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Plane,
  Waves,
  Mountain
} from 'lucide-react';
import { Article } from '../types';
import { NetworkAdBanner } from './NetworkAdBanner';

interface TourismTanzaniaSectionProps {
  onSelectArticle: (article: Article) => void;
  articles: Article[];
}

export const TourismTanzaniaSection: React.FC<TourismTanzaniaSectionProps> = ({
  onSelectArticle,
  articles,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('serengeti');
  const [safariDays, setSafariDays] = useState<number>(3);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [safariTier, setSafariTier] = useState<'budget' | 'mid' | 'luxury'>('mid');

  const destinations = [
    {
      id: 'serengeti',
      name: 'Hifadhi ya Serengeti',
      tagline: 'Uhamaji Mkuu wa Wanyama (Great Migration)',
      badge: 'Maajabu ya Dunia',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Julai - Oktoba (Mto Mara), Desemba - Machi (Ndutu Calving)',
      highlights: ['Uvukaji wa Nyumbu Mto Mara', 'Simba, Chui & Duma', 'Balloon Safari asubuhi'],
      budgetDailyUSD: 250,
      description: 'Hifadhi maarufu zaidi duniani yenye zaidi ya nyumbu milioni 1.5 wanaohama kila mwaka kutafuta malisho mabichi.',
    },
    {
      id: 'zanzibar',
      name: 'Visiwa vya Zanzibar',
      tagline: 'Paje, Nungwi & Stone Town Digital Nomad Hub',
      badge: 'Fukwe Bora za Zumaridi',
      icon: Waves,
      image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Mwaka mzima (Hasa Juni - Oktoba na Desemba - Februari)',
      highlights: ['Kitesurfing Paje', 'Mji Mkongwe (Stone Town)', 'Safari Blue & Sunset Dhow'],
      budgetDailyUSD: 120,
      description: 'Mchanga mweupe, maji safi ya bahari ya Hindi, na jamii yenye ukarimu na intaneti ya kasi kwa wataalamu wa kimataifa.',
    },
    {
      id: 'kilimanjaro',
      name: 'Mlima Kilimanjaro',
      tagline: 'Paa la Afrika (Mita 5,895 Uhuru Peak)',
      badge: 'Kilele Kirefu Afrika',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Januari - Machi na Juni - Oktoba',
      highlights: ['Njia za Machame, Marangu, Lemosho', 'Kanda 5 za Uoto wa Asili', 'Kupanda Uhuru Peak'],
      budgetDailyUSD: 300,
      description: 'Mlima mrefu zaidi unaojitegemea duniani. Uzoefu wa maisha unaowavutia maelfu ya wasafiri kutoka pembe zote za dunia.',
    },
    {
      id: 'ngorongoro',
      name: 'Kreta ya Ngorongoro',
      tagline: 'Shimo Kubwa la Volkano Lililozungukwa na Wanyama',
      badge: 'Hazina ya Urithi wa Dunia',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Mwaka Mzima (Urahisi mkubwa wa kuona Big 5)',
      highlights: ['Faru Weusi walio hatarini', 'Zaidi ya Wanyama 25,000', 'Bwawa la Viboko Magadi'],
      budgetDailyUSD: 280,
      description: 'Eneo lenye mkusanyiko mkubwa zaidi wa wanyamapori kwa kilomita ya mraba Afrika Mashariki.',
    },
  ];

  const currentDest = destinations.find((d) => d.id === selectedDestination) || destinations[0];

  // Calculate estimated budget
  const tierMultiplier = safariTier === 'budget' ? 0.7 : safariTier === 'mid' ? 1.0 : 2.2;
  const estimatedTotalUSD = Math.round(
    currentDest.budgetDailyUSD * safariDays * travelersCount * tierMultiplier
  );
  const estimatedTZS = (estimatedTotalUSD * 2650).toLocaleString('sw-TZ');

  const tourismArticles = articles.filter((a) => a.category === 'utalii');

  return (
    <section className="py-6 sm:py-10 space-y-10">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/30 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Utalii wa Tanzania & Safari Hub 2026
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight editorial-font">
            Chunguza Maajabu ya <span className="text-yellow-400">Tanzania</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Mwongozo kamili wa kutembelea Hifadhi za Taifa (Serengeti, Ngorongoro), kupanda Mlima Kilimanjaro, kufurahia fukwe za Zanzibar, na mbinu za utalii wa kidijitali (Digital Nomad Travel).
          </p>
        </div>
      </div>

      {/* Ad Placement */}
      <NetworkAdBanner placement="in-feed" />

      {/* Destination Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {destinations.map((dest) => {
          const isSelected = dest.id === selectedDestination;
          const Icon = dest.icon;
          return (
            <button
              key={dest.id}
              onClick={() => setSelectedDestination(dest.id)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'border-yellow-400 bg-yellow-400/10 shadow-lg scale-[1.02]'
                  : 'border-white/10 bg-zinc-900/60 hover:border-white/20 hover:bg-zinc-800/40'
              }`}
            >
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 relative">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-400/30">
                  {dest.badge}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-yellow-400' : 'text-zinc-400'}`} />
                <h3 className="text-base font-bold text-white tracking-tight">{dest.name}</h3>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2">{dest.tagline}</p>
            </button>
          );
        })}
      </div>

      {/* Active Destination Deep Dive & Interactive Budget Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Destination Details */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-yellow-400">
                Uchambuzi wa Eneo
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{currentDest.name}</h3>
            </div>
            <span className="px-3 py-1 bg-yellow-400/15 text-yellow-400 border border-yellow-400/30 text-xs font-bold rounded-lg">
              {currentDest.badge}
            </span>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            {currentDest.description}
          </p>

          {/* Highlights */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Vivutio Muhimu (Highlights)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentDest.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-black/40 border border-white/5 p-3 rounded-xl text-xs text-zinc-200 font-medium flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0"></span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Season */}
          <div className="bg-yellow-400/5 border border-yellow-400/20 p-4 rounded-xl flex items-start gap-3">
            <Calendar className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                Wakati Mzuri Zaidi wa Kutembelea
              </p>
              <p className="text-xs sm:text-sm text-zinc-200 mt-0.5">{currentDest.bestTime}</p>
            </div>
          </div>
        </div>

        {/* Right: Safari & Trip Budget Calculator */}
        <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-yellow-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <DollarSign className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Kikokotoo cha Bajeti ya Safari (TZS/USD)</h3>
          </div>

          <div className="space-y-4">
            {/* Days */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-300 mb-1.5">
                <span>Idadi ya Siku za Safari:</span>
                <span className="text-yellow-400 font-bold">{safariDays} Siku</span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                value={safariDays}
                onChange={(e) => setSafariDays(parseInt(e.target.value))}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Travelers */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-zinc-300 mb-1.5">
                <span>Idadi ya Wasafiri:</span>
                <span className="text-yellow-400 font-bold">{travelersCount} Watu</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={travelersCount}
                onChange={(e) => setTravelersCount(parseInt(e.target.value))}
                className="w-full accent-yellow-400 cursor-pointer"
              />
            </div>

            {/* Tier */}
            <div>
              <span className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Kiwango cha Malazi & Huduma:
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['budget', 'mid', 'luxury'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSafariTier(tier)}
                    className={`py-2 px-2 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                      safariTier === tier
                        ? 'bg-yellow-400 text-black shadow-md'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {tier === 'budget' ? 'Kawaida' : tier === 'mid' ? 'Wastani' : 'Kifahari'}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Total Card */}
            <div className="mt-4 p-4 rounded-xl bg-black/60 border border-yellow-400/30 text-center space-y-1">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                Makadirio ya Gharama Zote
              </span>
              <div className="text-2xl sm:text-3xl font-black text-yellow-400 tracking-tight">
                ${estimatedTotalUSD.toLocaleString()} USD
              </div>
              <p className="text-xs text-zinc-300 font-mono">≈ TZS {estimatedTZS}</p>
              <p className="text-[10px] text-zinc-300 mt-2">
                Inajumuisha ada ya geti, gari la safari 4x4, malazi, dereva mwongozaji na milo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tourism Articles List */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-white editorial-font flex items-center gap-2">
            <Camera className="w-5 h-5 text-yellow-400" />
            Makala & Miongozo ya Utalii Tanzania
          </h3>
          <span className="text-xs text-zinc-400">{tourismArticles.length} Makala Zilizochapishwa</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tourismArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-zinc-900/80 hover:bg-zinc-850 border border-white/10 hover:border-yellow-400/40 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col group shadow-lg"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-yellow-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow">
                  Utalii TZ
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-300">
                  <span>{art.readTime}</span>
                  <span className="text-yellow-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Soma Zaidi <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
