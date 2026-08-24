import React, { useState } from 'react';
import {
  TrendingUp,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  Award,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Calculator,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { FOREX_MODULES, ForexModule } from '../data/forexCourseData';
import { ForexCandleDiagram } from './ForexCandleDiagram';
import { ForexCalculatorTool } from './ForexCalculatorTool';

interface ForexAcademySectionProps {
  onBackToHome?: () => void;
}

export const ForexAcademySection: React.FC<ForexAcademySectionProps> = ({ onBackToHome }) => {
  const [activeModuleId, setActiveModuleId] = useState<string>('module-1');
  const [completedModules, setCompletedModules] = useState<string[]>(['module-1']);
  const [userQuizAnswers, setUserQuizAnswers] = useState<{ [questionIdx: number]: number }>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speakingText, setSpeakingText] = useState<string>('');

  const currentModule: ForexModule =
    FOREX_MODULES.find((m) => m.id === activeModuleId) || FOREX_MODULES[0];

  const handleModuleSelect = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setUserQuizAnswers({});
    setShowQuizResults(false);
    stopSpeech();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkCompleted = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const handleAnswerSelect = (qIdx: number, optIdx: number) => {
    if (showQuizResults) return;
    setUserQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheckQuiz = () => {
    setShowQuizResults(true);
    handleMarkCompleted(activeModuleId);
  };

  const handleResetQuiz = () => {
    setUserQuizAnswers({});
    setShowQuizResults(false);
  };

  // Swahili TTS Speech synthesis
  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Kivinjari chako hakiauni huduma ya kusoma sauti.');
      return;
    }

    if (isPlayingAudio && speakingText === text) {
      window.speechSynthesis.pause();
      setIsPlayingAudio(false);
      return;
    }

    if (window.speechSynthesis.paused && speakingText === text) {
      window.speechSynthesis.resume();
      setIsPlayingAudio(true);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean technical acronyms for smooth Swahili pronunciation
    const cleanText = text
      .replace(/\bForex\b/gi, 'Foreksi')
      .replace(/\bCandlestick\b/gi, 'Mshumaa wa Kijapani')
      .replace(/\bPin Bar\b/gi, 'Pini Baa')
      .replace(/\bEngulfing\b/gi, 'Ingalfingi')
      .replace(/\bEUR\/USD\b/gi, 'Euro kwa Dola')
      .replace(/\bGBP\/USD\b/gi, 'Paundi kwa Dola')
      .replace(/\bTZS\b/gi, 'Shilingi za Kitanzania')
      .replace(/\bUSD\b/gi, 'Dola za Marekani')
      .replace(/\bSMC\b/gi, 'Smart Manei Konsepti')
      .replace(/\bSL\b/gi, 'Stopu Losi')
      .replace(/\bTP\b/gi, 'Teiki Profiti');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'sw-TZ';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setSpeakingText('');
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setSpeakingText(text);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setSpeakingText('');
    }
  };

  // Quiz score computation
  const correctCount = currentModule.quiz.reduce((acc, q, idx) => {
    return userQuizAnswers[idx] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  const totalQuestions = currentModule.quiz.length;
  const progressPercent = Math.round((completedModules.length / FOREX_MODULES.length) * 100);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-[#10b981] mb-2 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Rudi Ukurasa Mkuu (Nyumbani)</span>
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="bg-[#10b981] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest">
              SANTECH FOREX ACADEMY
            </span>
            <span className="text-zinc-400 text-xs font-semibold">Candlestick Bible & SMC Edition</span>
          </div>
          <h1 className="display-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Mafunzo ya Forex kwa Kiswahili: Kuanzia Misingi Hadi Utaalamu
          </h1>
        </div>

        {/* Course Progress Tracker */}
        <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-4 sm:w-64 shrink-0 shadow-lg">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-300 font-bold">Maendeleo ya Masomo</span>
            <span className="text-[#10b981] font-mono font-extrabold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-emerald-500 to-[#10b981] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400 mt-1.5 block">
            Moduli {completedModules.length} kati ya {FOREX_MODULES.length} zimemalizika
          </span>
        </div>
      </div>

      {/* Module Selector Pill Bar */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-2 min-w-max">
          {FOREX_MODULES.map((module) => {
            const isActive = module.id === activeModuleId;
            const isDone = completedModules.includes(module.id);
            return (
              <button
                key={module.id}
                onClick={() => handleModuleSelect(module.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#10b981] text-black shadow-lg shadow-emerald-500/20 scale-102'
                    : isDone
                    ? 'bg-zinc-900 border border-emerald-500/40 text-emerald-400 hover:bg-zinc-800'
                    : 'bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-zinc-800 text-[10px] flex items-center justify-center font-mono">
                    {module.moduleNumber}
                  </span>
                )}
                <span>Moduli {module.moduleNumber}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sidebar Module List (Desktop) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-3">
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-4 sticky top-24 space-y-3">
            <h3 className="text-xs font-black uppercase text-zinc-400 tracking-wider px-2">
              Mtaala Kamili (Curriculum)
            </h3>

            <div className="space-y-1.5">
              {FOREX_MODULES.map((module) => {
                const isActive = module.id === activeModuleId;
                const isDone = completedModules.includes(module.id);
                return (
                  <button
                    key={module.id}
                    onClick={() => handleModuleSelect(module.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500/10 border border-emerald-500/40 text-white'
                        : 'hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-transparent'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          Somo {module.moduleNumber}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-mono">{module.readTime}</span>
                      </div>
                      <h4 className={`text-xs font-bold leading-snug ${isActive ? 'text-[#10b981]' : ''}`}>
                        {module.title}
                      </h4>
                    </div>

                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-1" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Link to Calculator */}
            <div className="pt-3 border-t border-white/10">
              <a
                href="#calculator-section"
                className="flex items-center justify-center gap-2 w-full bg-zinc-950 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs py-2.5 rounded-xl transition-colors"
              >
                <Calculator className="w-4 h-4" />
                <span>Fungua Kikokotoo cha Lot Size</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Right Column: Active Module Content */}
        <main className="lg:col-span-8 space-y-8">
          {/* Active Module Hero Banner */}
          <article className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#10b981] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded">
                    MODULI YA {currentModule.moduleNumber}
                  </span>
                  <span className="text-xs text-zinc-400 font-bold">Muda wa Kusoma: {currentModule.readTime}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeakText(currentModule.overview + ' ' + currentModule.contentSections.map(s => s.heading + '. ' + s.paragraphs.join(' ')).join(' '))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Simamisha Sauti</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Sikiliza Somo (Kiswahili TTS)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Kiungo cha somo hili kimenakiliwa!');
                    }}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    title="Sambaza somo hili"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white">
                {currentModule.title}
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {currentModule.subtitle}
              </p>
            </div>

            {/* Overview Card */}
            <div className="bg-zinc-950/80 border-l-4 border-[#10b981] p-4.5 rounded-r-xl space-y-2">
              <span className="text-xs font-black uppercase text-[#10b981] tracking-wider block">
                Muhtasari wa Somo
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                {currentModule.overview}
              </p>
            </div>

            {/* Key Takeaways Box */}
            <div className="bg-gradient-to-br from-zinc-950 to-emerald-950/20 border border-emerald-500/20 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#10b981]" />
                Mambo Makuu Utakayojifunza (Key Takeaways)
              </h4>
              <ul className="space-y-2">
                {currentModule.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep Dive Content Sections */}
            <div className="space-y-8 pt-4 border-t border-white/10">
              {currentModule.contentSections.map((sec, sIdx) => (
                <section key={sIdx} className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white border-b border-white/5 pb-2">
                    {sec.heading}
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Bullet Points if any */}
                  {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                    <ul className="space-y-2 bg-zinc-950/60 p-4 rounded-xl border border-white/5">
                      {sec.bulletPoints.map((bp, bpIdx) => (
                        <li key={bpIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0 mt-1.5" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Interactive Candlestick / Structure SVG Diagram */}
                  {sec.diagramType && (
                    <ForexCandleDiagram type={sec.diagramType} />
                  )}

                  {/* Pro Tip Box */}
                  {sec.proTip && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-200 flex items-start gap-2.5">
                      <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-extrabold text-amber-300 uppercase tracking-wider block mb-0.5">
                          Ushauri wa Mtaalamu (Candlestick Bible Pro Tip)
                        </strong>
                        {sec.proTip}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* End of Module Interactive Quiz Section */}
            <div className="mt-10 pt-8 border-t border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#10b981]" />
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    Jaribio la Uelewa (Moduli {currentModule.moduleNumber} Quiz)
                  </h3>
                </div>
                <span className="text-xs text-zinc-400 font-mono">
                  {currentModule.quiz.length} Maswali
                </span>
              </div>

              <div className="space-y-6">
                {currentModule.quiz.map((q, qIdx) => {
                  const userAnswer = userQuizAnswers[qIdx];
                  const isAnswered = userAnswer !== undefined;
                  const isCorrect = isAnswered && userAnswer === q.correctAnswer;

                  return (
                    <div
                      key={qIdx}
                      className="bg-zinc-950 border border-white/10 rounded-xl p-5 space-y-4"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-100">
                        {qIdx + 1}. {q.question}
                      </h4>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          let btnClass = 'bg-zinc-900 border-white/10 text-zinc-300 hover:bg-zinc-800';

                          if (showQuizResults) {
                            if (optIdx === q.correctAnswer) {
                              btnClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                            } else if (isSelected && optIdx !== q.correctAnswer) {
                              btnClass = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                            }
                          } else if (isSelected) {
                            btnClass = 'bg-[#10b981] text-black font-extrabold border-transparent';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={showQuizResults}
                              onClick={() => handleAnswerSelect(qIdx, optIdx)}
                              className={`w-full text-left p-3 rounded-xl text-xs border transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                            >
                              <span>{opt}</span>
                              {showQuizResults && optIdx === q.correctAnswer && (
                                <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {showQuizResults && (
                        <div className={`p-3.5 rounded-lg text-xs leading-relaxed ${
                          isCorrect ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border border-rose-500/40 text-rose-300'
                        }`}>
                          <strong>{isCorrect ? 'Safi sana! Jibu Sahihi.' : 'Jibu Sio Sahihi.'}</strong>{' '}
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Control Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                {!showQuizResults ? (
                  <button
                    onClick={handleCheckQuiz}
                    disabled={Object.keys(userQuizAnswers).length < currentModule.quiz.length}
                    className="bg-[#10b981] hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-extrabold text-xs uppercase px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-lg"
                  >
                    Kagua Majibu Yangu & Maliza Somo
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="text-xs font-bold text-white">
                      Alama Zako:{' '}
                      <span className="text-[#10b981] font-mono text-base font-extrabold">
                        {correctCount} / {totalQuestions} ({Math.round((correctCount / totalQuestions) * 100)}%)
                      </span>
                    </div>
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Jaribu Tena</span>
                    </button>
                  </div>
                )}

                {/* Next Module Button */}
                {currentModule.moduleNumber < FOREX_MODULES.length && (
                  <button
                    onClick={() => {
                      const nextMod = FOREX_MODULES.find(
                        (m) => m.moduleNumber === currentModule.moduleNumber + 1
                      );
                      if (nextMod) handleModuleSelect(nextMod.id);
                    }}
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-xs uppercase px-5 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Nenda Moduli ya {currentModule.moduleNumber + 1}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </article>

          {/* Integrated Forex Calculator Section */}
          <div id="calculator-section" className="pt-4">
            <ForexCalculatorTool />
          </div>
        </main>
      </div>
    </div>
  );
};
