import React, { useEffect, useRef } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface NetworkAdBannerProps {
  placement?: 'header' | 'in-feed' | 'sidebar' | 'footer' | 'modal';
  className?: string;
}

export const NetworkAdBanner: React.FC<NetworkAdBannerProps> = ({
  placement = 'in-feed',
  className = '',
}) => {
  return (
    <div className={`w-full overflow-hidden my-4 sm:my-6 ${className}`}>
      <div className="flex items-center justify-between px-2 mb-1.5">
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-300 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#10b981]" />
          Maritime Connectivity / Sponsored
        </span>
        <span className="text-[9px] text-zinc-300">SANMarine Partner Network</span>
      </div>

      <div className="relative min-h-[90px] w-full rounded-2xl bg-zinc-900/90 border border-white/10 p-4 flex flex-col items-center justify-center text-center shadow-inner overflow-hidden">
        {/* Informative maritime fallback & promotion */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 text-left">
          <div className="flex-1 min-w-[240px]">
            <p className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
              <span className="text-[#10b981]">🌍 Airalo Global eSIM:</span>
              <span>High-Speed Marine & Travel Data in 200+ Countries</span>
            </p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Instant activation for crew transfers, port stopovers, and international maritime voyages.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://airalo.tpk.ro/MR9pD32b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#10b981] hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider transition-colors whitespace-nowrap shadow"
            >
              <span>Get eSIM ($4.50+)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
