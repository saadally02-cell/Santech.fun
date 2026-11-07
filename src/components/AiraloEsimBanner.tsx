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
              <span>Official Maritime & Travel Partner: Airalo eSIM</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight editorial-font">
              Stay Connected in Port, at Sea & Worldwide Without Swapping SIMs
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Traveling for vessel crew changes, maritime drydock contracts, or global voyages? Get high-speed <strong className="text-emerald-400">4G/5G eSIM internet from Airalo</strong> in over 200 countries. No queues for airport plastic SIMs and zero roaming bill shock.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-semibold bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                200+ Countries Covered
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-semibold bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                Instant Digital Setup
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 font-semibold bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No Hidden Roaming Fees
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end justify-center gap-3">
            <div className="p-3 bg-zinc-900/90 rounded-2xl border border-white/10 text-left w-full max-w-xs">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span>Crew & Port Plan:</span>
                <span className="text-emerald-400 font-bold">From $4.50</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Compatible with all modern iPhones, Samsung Galaxy, Google Pixel & eSIM smartphones.
              </p>
            </div>

            <a
              href={AIRALO_AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] cursor-pointer"
            >
              <span>Get Your Airalo eSIM Now</span>
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
            <span className="text-[10px] text-zinc-400 font-bold">200+ Countries</span>
          </div>

          <h4 className="text-sm font-bold text-white leading-snug">
            Global eSIM Mobile Connectivity for Maritime Crew & Engineers
          </h4>
          
          <p className="text-xs text-zinc-400 leading-relaxed">
            Eliminate high roaming costs when docking in international ports. Activate 4G/5G data instantly on your phone.
          </p>
        </div>

        <a
          href={AIRALO_AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
        >
          <span>Purchase Airalo eSIM</span>
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
              Airalo eSIM: High-Speed Internet in Ports Worldwide
            </p>
            <p className="text-[11px] text-zinc-400">
              No physical SIM swaps needed. Activates digitally within seconds.
            </p>
          </div>
        </div>

        <a
          href={AIRALO_AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
        >
          <span>Get Offer Here</span>
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
          Maritime Connectivity / Official Partner
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
                Stay Online in 200+ Countries & Major Ports
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-black text-white">
              Data Connectivity for Marine Engineers, Seafarers & Transit Crews
            </h4>

            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              Order your eSIM online before arriving in Dar es Salaam, Mombasa, Dubai, Singapore, Rotterdam, or Houston. Fast local carrier speeds with no roaming bill surprises.
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
            <span>Activate Airalo eSIM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
