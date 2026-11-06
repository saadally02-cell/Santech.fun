import React from 'react';
import { Ship, Flame, Anchor } from 'lucide-react';

interface NewsTickerProps {
  onSelectTopic?: (topic: string) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ onSelectTopic }) => {
  const tickerItems = [
    '⚓ IMO 2026: Kanuni kali za Carbon Intensity Indicator (CII) zatekelezwa kwenye meli zote za mizigo',
    '🚢 MAN Energy Solutions yazindua injini ya kwanza ya 2-stroke inayochoma 100% Green Ammonia',
    '🔍 Port State Control (Paris MoU & Tokyo MoU) yaanzisha ukaguzi maalum wa Quick Closing Valves na Fire Dampers',
    '⚡ Mahitaji ya High Voltage (HV 6.6kV) Safety yawa sharti la lazima kwa Wahandisi wote wa meli za makontena',
    '🎓 Dar es Salaam Maritime Institute (DMI) yatoa kundi jipya la Maafisa Wahandisi (MEO Class 4) walioidhinishwa na TASAC',
    '🌊 OWS 15 PPM: Ushauri wa kisheria kuhusu utunzaji wa kumbukumbu za Oil Record Book Part I kuzuia detention',
    '🔥 Tahadhari ya Scavenge Fire: Wahandisi watahadharishwa kusafisha scavenge air boxes kila baada ya masaa 500',
  ];

  return (
    <div className="h-10 bg-[#FFC107] flex items-center overflow-hidden relative border-y border-white/10 z-30">
      {/* Ticker Badge */}
      <div className="absolute left-0 top-0 h-full bg-black px-4 flex items-center z-10 text-[10px] font-black uppercase tracking-[0.2em] italic text-white border-r border-white/10 gap-1.5 shrink-0">
        <Anchor className="w-3.5 h-3.5 text-[#FFC107] animate-pulse" />
        <span>MARINE FLASH</span>
      </div>

      {/* Marquee Content */}
      <div className="flex whitespace-nowrap w-full pl-40 overflow-hidden">
        <div className="animate-marquee flex items-center gap-10 text-black font-extrabold uppercase text-xs tracking-wider">
          {tickerItems.concat(tickerItems).map((item, index) => (
            <span
              key={index}
              onClick={() => onSelectTopic && onSelectTopic('MAN B&W')}
              className="hover:underline cursor-pointer flex items-center gap-2"
            >
              <Flame className="w-3.5 h-3.5 text-black/80 inline" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
