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
  Mountain,
  Train,
  CheckCircle2,
  Share2,
  Info
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
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const destinations = [
    {
      id: 'serengeti',
      name: 'Hifadhi ya Taifa ya Serengeti',
      tagline: 'Uhamaji Mkuu wa Nyumbu & Wanyama Milioni 2 (Great Migration)',
      badge: 'Maajabu 7 ya Dunia',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Julai - Oktoba (Mto Mara), Desemba - Machi (Ndutu Calving)',
      highlights: ['Uvukaji wa Nyumbu Mto Mara', 'Simba, Chui, Duma & Fisi', 'Hot Air Balloon Safari Asubuhi'],
      budgetDailyUSD: 250,
      description: 'Hifadhi maarufu zaidi duniani yenye zaidi ya nyumbu milioni 1.5 wanaohama kila mwaka kutafuta malisho mabichi. Eneo hili linatoa mwonekano wa wanyamapori wa kipekee na mandhari ya savanna isiyo na mwisho.',
      tips: 'Weka nafasi ya kambi ya hema miezi 4 kabla ikiwa unasafiri wakati wa msimu wa kilele wa uvukaji wa mto Mara.',
    },
    {
      id: 'zanzibar',
      name: 'Visiwa vya Zanzibar (Unguja & Pemba)',
      tagline: 'Paje, Nungwi, Kendwa & Stone Town Digital Nomad Hub',
      badge: 'Fukwe Bora za Zumaridi',
      icon: Waves,
      image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Mwaka mzima (Hasa Juni - Oktoba na Desemba - Februari)',
      highlights: ['Kitesurfing Fukwe za Paje', 'Mji Mkongwe (Stone Town Heritage)', 'Safari Blue, Mnemba Snorkeling & Sunset Dhow'],
      budgetDailyUSD: 120,
      description: 'Mchanga mweupe unaong\'aa, maji safi ya rangi ya zumaridi ya Bahari ya Hindi, mji wa kihistoria wa Stone Town uliolindwa na UNESCO, na intaneti ya kasi ya nyuzi za macho (Fiber) kwa wafanyakazi wa mbali.',
      tips: 'Tumia boti ya Azam Marine kutoka Dar es Salaam kwa saa 1 na dakika 40 tu kwa nauli nafuu ya TZS 30,000 au safari ya ndege ya dakika 20.',
    },
    {
      id: 'kilimanjaro',
      name: 'Mlima Kilimanjaro',
      tagline: 'Paa la Afrika (Mita 5,895 Uhuru Peak - Barafu ya Ikweta)',
      badge: 'Kilele Kirefu Zaidi Afrika',
      icon: Mountain,
      image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Januari - Machi na Juni - Oktoba',
      highlights: ['Njia za Machame, Marangu, Lemosho', 'Kanda 5 Tofauti za Hali ya Hewa', 'Kupanda Kilele cha Uhuru Peak'],
      budgetDailyUSD: 300,
      description: 'Mlima mrefu zaidi unaojitegemea duniani usio na safu ya milima (Free-standing mountain). Kupanda Kilimanjaro ni safari ya kiroho na ya kimwili inayopitia misitu minene ya mvua hadi kwenye kilele chenye theluji na barafu.',
      tips: 'Chagua njia ya siku 7 au 8 (Lemosho au Machame) ili kuruhusu mwili wako kuzoea mabadiliko ya hewa ya mlimani (Acclimatization).',
    },
    {
      id: 'ngorongoro',
      name: 'Kreta ya Ngorongoro',
      tagline: 'Bustani ya Edeni: Shimo Kubwa la Volkano Lililozungukwa na Wanyama',
      badge: 'Urithi wa Dunia (UNESCO)',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Mwaka Mzima (Urahisi mkubwa wa kuona Big 5 ndani ya siku moja)',
      highlights: ['Faru Weusi walio Hatarini Kutoweka', 'Wanyama zaidi ya 25,000 Ndani ya Bonde', 'Ziwa Magadi na Ndege Flamingo'],
      budgetDailyUSD: 280,
      description: 'Kaldera ya volkano iliyozama isiyo na maji kubwa zaidi duniani. Ndani ya bonde hili lenye kina cha mita 600 kuna mazingira kamili ya ikolojia yenye simba, tembo, faru, kiboko na pundamilia wanaoishi pamoja.',
      tips: 'Anza safari yako mapema saa 12:00 asubuhi wakati milango ya bonde inapofunguliwa ili kushuhudia wanyama wakiwinda.',
    },
    {
      id: 'saadani',
      name: 'Hifadhi ya Taifa ya Saadani',
      tagline: 'Pale Mbuga ya Wanyama Inapokutana na Fukwe za Bahari ya Hindi',
      badge: 'Safari & Beach Moja kwa Moja',
      icon: Waves,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Januari - Februari na Juni - Agosti',
      highlights: ['Tembo Wanaotembea Fukweni', 'Safari ya Mashua Mto Wami', 'Mazingira ya Utulivu Bila Misongamano'],
      budgetDailyUSD: 160,
      description: 'Hifadhi pekee Afrika Mashariki ambapo unaweza kufanya Game Drive asubuhi na mchana ukaogelea baharini kwenye fukwe safi za mchanga.',
      tips: 'Inafikika kwa urahisi kwa gari kutoka Dar es Salaam au Bagamoyo kwa chini ya saa 4.',
    },
    {
      id: 'sgr-train',
      name: 'Reli ya Kisasa (SGR Electric Train)',
      tagline: 'Safari ya Kifahari ya Umeme: Dar es Salaam kwenda Morogoro & Dodoma',
      badge: 'Usafiri wa Kisasa wa Teknolojia',
      icon: Train,
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80',
      bestTime: 'Kila siku (Ratiba za Asubuhi na Jioni)',
      highlights: ['Kasi ya 160 km/h', 'Wi-Fi & Chaja za Vifaa', 'Mandhari ya Milima ya Uluguru'],
      budgetDailyUSD: 30,
      description: 'Trenina ya kwanza ya umeme ya kasi Afrika Mashariki inayopunguza safari ya Dar - Dodoma kutoka saa 8 za basi hadi saa 3 na nusu pekee.',
      tips: 'Nunua tiketi mtandaoni kupitia mfumo wa TRC siku 2 kabla ya safari ili kupata viti vya Royal au Business Class.',
    }
  ];

  const currentDest = destinations.find((d) => d.id === selectedDestination) || destinations[0];

  const tierMultiplier = safariTier === 'budget' ? 0.7 : safariTier === 'mid' ? 1.0 : 2.2;
  const estimatedTotalUSD = Math.round(
    currentDest.budgetDailyUSD * safariDays * travelersCount * tierMultiplier
  );
  const estimatedTZS = (estimatedTotalUSD * 2650).toLocaleString('sw-TZ');

  const tourismArticles = articles.filter((a) => a.category === 'utalii');

  return (
    <section className="space-y-12 pb-16">
      {/* Direct URL Route Indicator & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">URL Rasmi ya Subpage:</span>
          <code className="text-yellow-400 bg-black/50 px-2 py-0.5 rounded font-mono font-bold">
            https://santech.tz/#utalii
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#utalii');
            setCopiedUrl(true);
            setTimeout(() => setCopiedUrl(false), 2000);
          }}
          className="flex items-center gap-1 text-[11px] font-bold text-zinc-300 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          {copiedUrl ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          {copiedUrl ? 'Kiungo Kimekopiliwa!' : 'Nakili Kiungo cha Moja kwa Moja'}
        </button>
      </div>

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/30 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Utalii wa Ndani & Kimataifa Tanzania 2026
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight editorial-font">
            Gundua <span className="text-yellow-400">Vivutio Vikuu vya Tanzania</span> & Zanzibar
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Mwongozo kamili wa kusafiri Serengeti, Kilimanjaro, Ngorongoro, Zanzibar, na safari za reli ya kisasa ya SGR. Panga bajeti yako ya safari kwa Shilingi za Tanzania na Dola ($).
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Destination Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-yellow-400" />
            Chagua Sehemu ya Kutembelea
          </h2>
          <span className="text-xs text-zinc-400">Gonga kitufe kubadili maelezo</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {destinations.map((dest) => {
            const isSelected = selectedDestination === dest.id;
            const Icon = dest.icon;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedDestination(dest.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/20'
                    : 'bg-zinc-900/90 text-zinc-300 border-white/10 hover:border-white/20'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-yellow-400'}`} />
                <div>
                  <div className="text-xs font-bold leading-tight">{dest.name}</div>
                  <div className={`text-[10px] truncate ${isSelected ? 'text-black/80' : 'text-zinc-400'}`}>
                    {dest.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Destination Deep-Dive Showcase */}
      <div className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Image & Badges */}
          <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[340px] overflow-hidden group">
            <img
              src={currentDest.image}
              alt={currentDest.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-between p-6">
              <span className="self-start px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-yellow-400/40 text-yellow-400 font-black text-xs">
                {currentDest.badge}
              </span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{currentDest.name}</h3>
                <p className="text-xs sm:text-sm text-yellow-300 font-medium mt-1">{currentDest.tagline}</p>
              </div>
            </div>
          </div>

          {/* Details & Tips */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-zinc-950">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase text-yellow-400 tracking-wider mb-1">Kuhusu Eneo Hili</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{currentDest.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-zinc-400 tracking-wider">Mambo Makuu ya Kushuhudia:</h4>
                <div className="space-y-1.5">
                  {currentDest.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-400">
                  <Sun className="w-4 h-4" />
                  Muda Bora wa Kutembelea:
                </div>
                <div className="text-xs text-zinc-300">{currentDest.bestTime}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-zinc-300">
                <strong className="text-amber-300">Ushauri wa Mtaalamu:</strong> {currentDest.tips}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safari Budget Calculator */}
      <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              Kikokotoo cha Makadirio ya Bajeti ya Safari
            </h3>
            <p className="text-xs text-zinc-400">Hesabu gharama za malazi, usafiri na viingilio vya hifadhi kwa {currentDest.name}</p>
          </div>
          <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            1 USD = 2,650 TZS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300">Idadi ya Siku za Safari:</label>
            <input
              type="range"
              min="1"
              max="14"
              value={safariDays}
              onChange={(e) => setSafariDays(Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer"
            />
            <div className="text-xs font-bold text-yellow-400">{safariDays} Siku</div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300">Idadi ya Wasafiri:</label>
            <input
              type="range"
              min="1"
              max="10"
              value={travelersCount}
              onChange={(e) => setTravelersCount(Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer"
            />
            <div className="text-xs font-bold text-yellow-400">{travelersCount} Wasafiri</div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300">Kiwango cha Malazi (Tier):</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['budget', 'mid', 'luxury'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSafariTier(tier)}
                  className={`py-2 text-[11px] font-bold rounded-xl capitalize transition-colors cursor-pointer ${
                    safariTier === tier
                      ? 'bg-yellow-500 text-black'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {tier === 'budget' ? 'Nafuu' : tier === 'mid' ? 'Wastani' : 'Kifahari'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 p-5 rounded-2xl border border-yellow-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-black text-zinc-400">Jumla ya Makadirio:</span>
            <div className="text-2xl sm:text-3xl font-black text-yellow-400">
              ${estimatedTotalUSD.toLocaleString()} USD
            </div>
            <div className="text-xs text-zinc-400">Sawa na takriban TZS {estimatedTZS}</div>
          </div>
          <div className="text-xs text-zinc-400 text-right max-w-sm">
            Inajumuisha ada za mageti ya hifadhi, gari la Land Cruiser 4x4 lenye pop-up roof, dereva mwongoza watalii na malazi ya hoteli/hema.
          </div>
        </div>
      </div>

      {/* Tourism Articles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-yellow-400" />
            Makala za Safari & Utalii wa Tanzania
          </h3>
          <span className="text-xs text-zinc-400">{tourismArticles.length} Makala</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourismArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-yellow-400 border border-white/10">
                    {article.categoryName || 'Utalii'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.readTime}</span>
                <span className="text-yellow-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Soma Mwongozo <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
