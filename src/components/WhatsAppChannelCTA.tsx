import React from 'react';
import { MessageSquare, Bell, ArrowRight, ShieldCheck, Users, Anchor } from 'lucide-react';

export const WhatsAppChannelCTA: React.FC = () => {
  return (
    <section className="my-10 sm:my-14 rounded-3xl bg-gradient-to-r from-black via-zinc-900 to-black p-6 sm:p-10 border-2 border-[#FFC107]/40 shadow-2xl relative overflow-hidden">
      {/* Decorative Gold Accent Glows */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFC107]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="space-y-3 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC107]/20 border border-[#FFC107]/40 text-[#FFC107] text-xs font-black uppercase tracking-wider">
            <Anchor className="w-3.5 h-3.5 animate-bounce" />
            <span>Global & East African Marine Engineering Network</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight editorial-font leading-tight">
            Join the <span className="text-[#FFC107]">Marine Engineers</span> WhatsApp Community
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
            Get instant access to MAN B&W & WinGD service letters, TASAC & UK MCA MEO Oral examination questions, NIT & DMI cadet resources, and global sea berths (Maersk, MSC, CMA CGM, Product Tankers) delivered right to your device.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-zinc-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#FFC107]" />
              25,000+ Seafarers & Marine Engineers
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified STCW 2010 & MARPOL Documentation
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <a
            href="https://whatsapp.com/channel/0029VaSANTechTZ"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Join Seafarers Channel</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
