import React from 'react';
import { Volume2, Play, Pause, Square, Headphones, Sparkles, Mic, Radio } from 'lucide-react';
import { ARTICLES_DATA } from '../data/newsData';
import { Article } from '../types';

interface AudioArticlesSectionProps {
  onSelectArticle: (article: Article) => void;
}

export const AudioArticlesSection: React.FC<AudioArticlesSectionProps> = ({ onSelectArticle }) => {
  const [activeAudioId, setActiveAudioId] = React.useState<string | null>(null);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = React.useState<number>(1.0);

  const audioArticles = ARTICLES_DATA.slice(0, 4);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Clean up audio on unmount
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const prepareSwahiliText = (title: string, excerpt: string) => {
    return `${title}. Muhtasari wa habari hii ya teknolojia: ${excerpt}. SANTECH Tanzania, kituo chako cha habari za teknolojia.`;
  };

  const handlePlay = (article: Article) => {
    if (activeAudioId === article.id && isPaused && audioRef.current) {
      audioRef.current.play();
      setIsPaused(false);
      return;
    }

    // Stop any existing audio
    handleStop();

    const swahiliText = prepareSwahiliText(article.title, article.excerpt);
    const audioUrl = `/api/tts?text=${encodeURIComponent(swahiliText)}`;

    const newAudio = new Audio(audioUrl);
    newAudio.playbackRate = playbackRate;
    audioRef.current = newAudio;

    newAudio.onplay = () => {
      setActiveAudioId(article.id);
      setIsPaused(false);
    };

    newAudio.onended = () => {
      setActiveAudioId(null);
      setIsPaused(false);
    };

    newAudio.onerror = () => {
      // Fallback to Web Speech Synthesis if audio stream fails
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(swahiliText);
        const voices = window.speechSynthesis.getVoices();
        const swVoice = voices.find((v) => v.lang.startsWith('sw') || v.lang.includes('sw'));
        if (swVoice) utterance.voice = swVoice;
        utterance.lang = 'sw-TZ';
        utterance.rate = playbackRate;

        utterance.onend = () => {
          setActiveAudioId(null);
          setIsPaused(false);
        };
        utterance.onerror = () => {
          setActiveAudioId(null);
          setIsPaused(false);
        };

        window.speechSynthesis.speak(utterance);
        setActiveAudioId(article.id);
        setIsPaused(false);
      } else {
        setActiveAudioId(null);
        setIsPaused(false);
      }
    };

    newAudio.play().catch(() => {
      // Fallback on play rejection
      newAudio.onerror?.(new Event('error'));
    });
  };

  const handlePause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPaused(true);
    } else if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveAudioId(null);
    setIsPaused(false);
  };

  return (
    <section id="audio-articles" className="my-12">
      <div className="glass border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse text-[#10b981]" /> SANTECH SWAHILI AUDIO PODCAST 2026
              </span>
            </div>
            <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Headphones className="w-6 h-6 text-[#10b981]" />
              Sikiliza Habari za Hivi Punde kwa Sauti (Swahili AI Podcast)
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Huna muda wa kusoma? Bonyeza play usikilize muhtasari wa kichekesho na sauti safi ya Swahili AI mahali popote.
            </p>
          </div>

          {/* Rate Selector */}
          <div className="flex items-center gap-2 bg-zinc-950 p-2 rounded-xl border border-white/10 shrink-0">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Kasi ya Sauti:</span>
            {[1.0, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => {
                  setPlaybackRate(rate);
                  if (activeAudioId) handleStop();
                }}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
                  playbackRate === rate ? 'bg-[#10b981] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Audio Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audioArticles.map((art) => {
            const isThisPlaying = activeAudioId === art.id && !isPaused;
            const isThisPaused = activeAudioId === art.id && isPaused;

            return (
              <div
                key={art.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  activeAudioId === art.id
                    ? 'bg-[#10b981]/10 border-[#10b981] shadow-xl'
                    : 'bg-zinc-950/80 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Thumbnail Image */}
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                  />

                  <div className="min-w-0">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#10b981] block mb-0.5">
                      {art.categoryName} • {art.readTime} Sauti
                    </span>
                    <h3
                      onClick={() => onSelectArticle(art)}
                      className="text-xs font-bold text-white hover:text-[#10b981] cursor-pointer line-clamp-1 transition-colors"
                    >
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{art.excerpt}</p>
                  </div>
                </div>

                {/* Control Button */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {isThisPlaying ? (
                    <>
                      <button
                        onClick={handlePause}
                        className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform"
                        title="Simamisha Sauti"
                      >
                        <Pause className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={handleStop}
                        className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer border border-white/10"
                        title="Acha"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handlePlay(art)}
                      className="w-10 h-10 rounded-full bg-[#10b981] text-black flex items-center justify-center font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform"
                      title={isThisPaused ? 'Endelea Kusikiliza' : 'Sikiliza Sauti'}
                    >
                      <Play className="w-4 h-4 fill-current pl-0.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
