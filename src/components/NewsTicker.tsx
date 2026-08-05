import React from 'react';
import { Zap, Flame } from 'lucide-react';

interface NewsTickerProps {
  onSelectTopic?: (topic: string) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ onSelectTopic }) => {
  const tickerItems = [
    '⚡ Google watangaza Gemini 3.6 Pro & Autonomous AI Agents',
    '💻 Rust na TypeScript zatawala uandishi wa programu 2026',
    '🚀 Silicon Fabs za 2nm zafanikiwa kutoa chips za AI kwenye simu',
    '🔒 Mbinu za Zero-Trust Architecture zazingatiwa na makampuni ya Cloud TZ',
    '🤖 Roboti za Humanoid zaingia katika viwanda vya utengenezaji vifaa',
    '🌐 Starlink Mesh Satellites zaongeza kasi ya Intaneti 200Mbps Tanzania',
    '💼 Remote Tech Jobs zawaingizia vijana wa Kitanzania $1,000+ kwa mwezi',
  ];

  return (
    <div className="h-10 bg-[#10b981] flex items-center overflow-hidden relative border-y border-white/10 z-30">
      {/* Ticker Badge */}
      <div className="absolute left-0 top-0 h-full bg-black px-4 flex items-center z-10 text-[10px] font-black uppercase tracking-[0.2em] italic text-white border-r border-white/10 gap-1.5 shrink-0">
        <Zap className="w-3.5 h-3.5 text-[#10b981] animate-pulse" />
        <span>TECH FLASH</span>
      </div>

      {/* Marquee Content */}
      <div className="flex whitespace-nowrap w-full pl-36 overflow-hidden">
        <div className="animate-marquee flex items-center gap-10 text-black font-extrabold uppercase text-xs tracking-wider">
          {tickerItems.concat(tickerItems).map((item, index) => (
            <span
              key={index}
              onClick={() => onSelectTopic && onSelectTopic('AI')}
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
