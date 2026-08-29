import React from 'react';
import { Wifi, Globe, Smartphone, ExternalLink, Zap, ShieldCheck, Sparkles, Plane, ArrowRight } from 'lucide-react';

interface AiraloEsimBannerProps {
  variant?: 'full' | 'compact' | 'card' | 'travel';
  className?: string;
}

export const AIRALO_AFFILIATE_LINK = 'https://airalo.tpk.ro/MR9pD32b';

export const AiraloEsimBanner: React.FC<AiraloEsimBannerProps> = ({
  variant = 'full',
  className = '',
}) => {
  if (variant === 'travel') {
    return (
      <div className={`relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-zinc-950 via-emerald-950/40 to-zinc-900 p-6 sm:p-8 shadow-2xl ${className}`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black uppercase tracking-wider">
              <Plane className="w-3.5 h-3.5" />
              <span>Mshirika Rasmi wa Safari: Airalo eSIM</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight editorial-font">
              Kaa Hewani Tanzania & Duniani Bila Kubadili Laini ya Simu
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Unasafiri kwenda <strong className="text-white">Serengeti, Zanzibar, Kilimanjaro</strong> au nchi za nje? Nunua kifurushi cha intaneti ya <strong className="text-emerald-400">4G/5G eSIM ya Airalo</strong> kwa dakika 2 tu bila kupanga foleni ya laini za plastiki uwanja wa ndege au kulipa gharama ghali za roaming.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-semibold bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Nchi 200+ Duniani
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-semibold bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                Uwashaji wa Papo Hapo
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-semibold bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Hakuna Ada Zilizofichika
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end justify-center gap-3">
            <div className="p-3 bg-zinc-900/90 rounded-2xl border border-white/10 text-left w-full max-w-xs">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span>Kifurushi cha Safari:</span>
                <span className="text-emerald-400 font-bold">Kuanzia $4.50</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Inafaa kwa iPhone, Samsung Galaxy, Google Pixel na simu zote zinazotumia eSIM.
              </p>
            </div>

            <a
              href={AIRALO_AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] cursor-pointer"
            >
              <span>Pata Airalo eSIM Yako Sasa</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-5 rounded-2xl bg-zinc-900/95 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl ${className}`}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Airalo eSIM
            </span>
            <span className="text-[10px] text-zinc-400 font-bold">Nchi 200+</span>
          </div>

          <h4 className="text-sm font-bold text-white leading-snug">
            Intaneti ya Kimataifa ya eSIM kwa Wasafiri & Freelancers
          </h4>
          
          <p className="text-xs text-zinc-400 leading-relaxed">
            Epuka gharama kubwa za roaming unapokuwa safarini. Washa intaneti ya kasi ya 4G/5G moja kwa moja kwenye simu yako.
          </p>
        </div>

        <a
          href={AIRALO_AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
        >
          <span>Nunua Airalo eSIM</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 ${className}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Wifi className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              Airalo eSIM: Intaneti ya Kasi ya Nje ya Nchi na Tanzania
            </p>
            <p className="text-[11px] text-zinc-400">
              Hakuna kubadilisha laini za simu. Washa ndani ya sekunde chache.
            </p>
          </div>
        </div>

        <a
          href={AIRALO_AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
        >
          <span>Pata Ofa Hapa</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  // Full default banner
  return (
    <div className={`w-full overflow-hidden my-6 ${className}`}>
      <div className="flex items-center justify-between px-2 mb-1.5">
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
          Mshirika Rasmi / Partner Offer
        </span>
        <span className="text-[9px] text-zinc-400">Airalo Global eSIM</span>
      </div>

      <div className="relative rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-emerald-950/60 border border-emerald-500/30 p-5 sm:p-7 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 items-center justify-center shrink-0 text-emerald-400">
            <Smartphone className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-black">
                Airalo eSIM
              </span>
              <span className="text-xs text-zinc-300 font-bold">
                Kaa Hewani Nchi 200+ Duniani
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-black text-white">
              Data ya Intaneti kwa Wasafiri, Watalii na Wafanyakazi wa Mtandaoni
            </h4>

            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Nunua eSIM mtandaoni kabla au baada ya kutua Tanzania, Dubai, Marekani, Ulaya, Afrika Kusini au Asia. Washa papo hapo bila kubadilisha laini yako ya kawaida!
            </p>
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <a
            href={AIRALO_AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-500/25 cursor-pointer"
          >
            <span>Jiunge na Airalo Hapa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
