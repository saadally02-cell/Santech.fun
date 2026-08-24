import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdBannerProps {
  label?: string;
  variant?: 'horizontal' | 'card' | 'compact';
}

export const AdBanner: React.FC<AdBannerProps> = ({
  label = 'Tangazo la Mfadhili',
  variant = 'horizontal',
}) => {
  return (
    <aside
      aria-label="Matangazo na Ufadhili"
      className={`relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-zinc-950 via-zinc-900 to-emerald-950/40 p-4 sm:p-5 shadow-lg ${
        variant === 'horizontal' ? 'w-full my-6' : 'w-full'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/10 text-[#10b981] border border-emerald-500/30 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {label}
            </span>
            <span className="text-zinc-400 text-xs font-semibold">SANTECH PARTNERS 2026</span>
          </div>
          <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
            Pata Hosting ya Kasi, VPS & Domain ya .TZ au .COM kwa Punguzo la 50%
          </h4>
          <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed font-sans">
            Weka tovuti yako hewani kwa sekunde chache ukitumia seva zenye kasi ya juu (NVMe SSD) zilizounganishwa na ulinzi wa Cloudflare DDoS na cheti cha bure cha SSL.
          </p>
        </div>

        <a
          href="https://wa.me/255700000000?text=Habari%20SANTECH,%20nahitaji%20huduma%20ya%20Hosting%20na%20Domain"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 bg-[#10b981] hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md hover:scale-105"
        >
          <span>Pata Ofa Sasa</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
};
