import React from 'react';
import { Ship, Flame, Anchor } from 'lucide-react';

interface NewsTickerProps {
  onSelectTopic?: (topic: string) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ onSelectTopic }) => {
  const tickerItems = [
    '⚓ IMO 2026: Stringent Carbon Intensity Indicator (CII) & EEXI compliance enforced on all ocean-going tonnage',
    '🚢 MAN Energy Solutions delivers first commercial 2-stroke dual-fuel engine operating on 100% Green Ammonia',
    '🔍 Port State Control (Paris & Tokyo MoU) launches Concentrated Inspection Campaign on Emergency Fire Pumps & Quick-Closing Valves',
    '⚡ STCW High Voltage (HV 6.6kV) certification mandatory for all Senior Marine Engineering Officers on modern tonnage',
    '🎓 National Institute of Transport (NIT) & DMI graduate certified Marine Engineering Officers (MEO Class 1, 2, 4)',
    '🌊 MARPOL Annex I OWS 15 PPM: Strict enforcement of Oil Record Book Part I calibration logs to prevent PSC detentions',
    '🔥 Main Engine Scavenge Fire Alert: Chief Engineers advised to inspect scavenge air receiver drains every 500 running hours',
    '📐 NIT SRT 06107: Steel weight estimation modules and Dr. C.B. Barrass stability notes now accessible in Digital Library'
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
