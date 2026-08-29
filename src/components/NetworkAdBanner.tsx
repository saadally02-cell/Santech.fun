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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the invoke script is already on page or load it
    const scriptId = 'cpm-ad-script-2333fa0649d82db60c328c346534b6a9';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl30562410.profitableratecpmnetwork.com/2333fa0649d82db60c328c346534b6a9/invoke.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden my-4 sm:my-6 ${className}`}>
      <div className="flex items-center justify-between px-2 mb-1.5">
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-300 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#10b981]" />
          Tangazo la Mfadhili / Sponsored
        </span>
        <span className="text-[9px] text-zinc-300">SANTECH Partner Network</span>
      </div>

      <div className="relative min-h-[100px] w-full rounded-2xl bg-zinc-900/90 border border-white/10 p-3 flex flex-col items-center justify-center text-center shadow-inner overflow-hidden">
        {/* Network Ad Container provided by user */}
        <div id="container-2333fa0649d82db60c328c346534b6a9" ref={containerRef} className="w-full flex justify-center items-center"></div>

        {/* Informative fallback & promotion */}
        <div className="w-full mt-2 pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-left">
          <div>
            <p className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
              <span className="text-[#10b981]">🌍 Airalo Global eSIM:</span>
              <span>Intaneti ya Kasi Nchi 200+ Bila Ada za Roaming</span>
            </p>
            <p className="text-[11px] text-zinc-400">
              Inafaa kwa wasafiri, wafanyakazi wa mbali na safari za kitalii Tanzania & Zanzibar.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://airalo.tpk.ro/MR9pD32b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981] hover:bg-emerald-400 text-black text-[11px] font-black uppercase tracking-wider transition-colors whitespace-nowrap shadow"
            >
              <span>Nunua eSIM ($4.50+)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
