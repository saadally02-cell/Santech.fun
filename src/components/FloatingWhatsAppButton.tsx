import React from 'react';
import { PhoneCall, MessageCircle, X } from 'lucide-react';

export const FloatingWhatsAppButton: React.FC = () => {
  const [openTooltip, setOpenTooltip] = React.useState(true);

  const whatsappNumber = '255691302979';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Habari SANTECH TECH (+255691302979)! Nina maoni/swali kuhusu habari zenu za Akili Bandia na Teknolojia...'
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      {/* Tooltip Box */}
      {openTooltip && (
        <div className="bg-zinc-900 border border-[#25D366]/40 p-3 rounded-2xl shadow-2xl max-w-xs text-xs text-zinc-200 animate-fadeIn relative">
          <button
            onClick={() => setOpenTooltip(false)}
            className="absolute top-1.5 right-1.5 text-zinc-500 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span className="font-extrabold text-white uppercase text-[10px] tracking-wider">
              SANTECH WHATSAPP SUPPORT
            </span>
          </div>
          <p className="text-[11px] text-zinc-300">
            Tuma maoni au swali lako moja kwa moja kupitia WhatsApp yetu.
          </p>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-[#25D366] hover:bg-emerald-500 text-black font-extrabold text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 border border-[#25D366]"
        title="Tuma Ujumbe au Maoni WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-black fill-current" />
        <span className="hidden sm:inline font-black uppercase tracking-wider">
          WhatsApp Direct
        </span>
      </a>
    </div>
  );
};
