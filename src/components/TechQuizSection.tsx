import React from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Share2, Award, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Lugha gani ya uandishi wa programu inayotumiwa zaidi kuendeleza mifano ya Akili Bandia (AI Models) na Machine Learning 2026?',
    options: ['PHP', 'Python', 'HTML', 'C++'],
    correctIndex: 1,
    explanation: 'Python ina maktaba tajiri sana kama PyTorch, TensorFlow, na Google GenAI SDK zinazoifanya kuwa namba moja kwenye AI.',
  },
  {
    id: 2,
    question: 'Dhana ya "Zero-Trust Architecture" kwenye Usalama wa Mtandao (Cybersecurity) inamaanisha nini?',
    options: [
      'Kutokumuamini mtumiaji yeyote au kifaa chochote bila kuhakiki (Never Trust, Always Verify)',
      'Kutoweka passwadi kwenye kompyuta za kampuni',
      'Kutumia antivirus ya bure pekee',
      'Kuzuia intaneti isitumike kabisa',
    ],
    correctIndex: 0,
    explanation: 'Zero-Trust inadai kuwa kila ombi la kuingia kwenye mfumo lazima litambuliwe, liidhinishwe na kufanyiwa usimbaji fiche (encryption).',
  },
  {
    id: 3,
    question: 'Je, kiwango cha wastani cha mshahara kwa Mhandisi wa AI au Full-Stack Developer anayefanya kazi za mbali (Remote) kwa mwezi ni kiasi gani?',
    options: ['$50 - $100', '$1,000 - $4,500+', '$10,000 kwa siku', 'Bure kabisa'],
    correctIndex: 1,
    explanation: 'Kazi za mbali za Kimataifa zinalipa wastani wa $1,500 hadi $5,000+ kwa mwezi kulingana na kiwango cha ujuzi.',
  },
  {
    id: 4,
    question: 'Gemini 3.6 Pro kutoka Google inatumia mfumo gani wa kipekee kwa kazi ngumu za uandishi wa kodi na uchambuzi?',
    options: ['Text Only', 'Multimodal Thinking & Long-Context Reasoning', 'Excel Sheets', 'Basic Chatbot'],
    correctIndex: 1,
    explanation: 'Gemini 3.6 Pro inasaidia multimodal reasoning (picha, sauti, kodi na video) kwa ubora wa juu sana.',
  },
];

export const TechQuizSection: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [score, setScore] = React.useState<number>(0);
  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = React.useState<boolean[]>([]);

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing after answer
    setSelectedOption(index);

    const isCorrect = index === QUIZ_QUESTIONS[currentQuestion].correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnsweredQuestions((prev) => [...prev, isCorrect]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  const q = QUIZ_QUESTIONS[currentQuestion];
  const totalQuestions = QUIZ_QUESTIONS.length;

  return (
    <section id="tech-quiz" className="my-12">
      <div className="glass border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                SANTECH TECH ASSESSMENT 2026
              </span>
            </div>
            <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#10b981]" />
              Pima Ujuzi Wako wa Teknolojia, AI & Coding
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Jibu maswali machache upate alama zako papo hapo na ushirikishe na marafiki kupitia WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/255691302979?text=${encodeURIComponent(
                'Habari SANTECH, ninataka kushiriki au kutoa maoni kuhusu Tech Quiz 2026!'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 border border-[#25D366]/40 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              💬 WhatsApp Support
            </a>
          </div>
        </div>

        {!showResult ? (
          <div className="mt-6 space-y-6">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs font-bold text-zinc-400 mb-2">
              <span>Swali la {currentQuestion + 1} kati ya {totalQuestions}</span>
              <span className="text-[#10b981]">Alama: {score}</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#10b981] transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="p-5 bg-zinc-950 rounded-xl border border-white/10">
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {q.question}
              </h3>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt, idx) => {
                let btnStyle = 'bg-zinc-900 border-white/10 text-zinc-200 hover:border-[#10b981]/50';
                if (selectedOption !== null) {
                  if (idx === q.correctIndex) {
                    btnStyle = 'bg-emerald-950/80 border-[#10b981] text-emerald-300 font-bold';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                  } else {
                    btnStyle = 'bg-zinc-950 border-white/5 text-zinc-600 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOption !== null}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && idx === q.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />
                    )}
                    {selectedOption !== null && idx === selectedOption && idx !== q.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next */}
            {selectedOption !== null && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-[#10b981]/10 border border-[#10b981]/30 rounded-xl text-xs text-zinc-300">
                  <strong className="text-[#10b981] block mb-1">💡 Maelezo ya Ziada:</strong>
                  {q.explanation}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="bg-[#10b981] hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-transform hover:scale-105 cursor-pointer shadow-lg"
                  >
                    {currentQuestion + 1 < totalQuestions ? 'Swali Linalofuata ➔' : 'Tazama Matokeo Matokeo ➔'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results Card */
          <div className="mt-8 text-center space-y-6 animate-fadeIn py-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center text-[#10b981]">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h3 className="display-serif text-3xl font-extrabold text-white">
                Hongera! Umekamilisha Jaribio!
              </h3>
              <p className="text-sm text-zinc-400 mt-2">
                Umesahihi <strong className="text-[#10b981] font-mono text-xl">{score}</strong> kati ya{' '}
                <strong className="text-white font-mono text-xl">{totalQuestions}</strong> maswali.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-zinc-950 rounded-xl border border-white/10 text-xs text-zinc-300 space-y-2">
              <p className="font-bold text-white flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-[#10b981]" /> SANTECH TECH SCORE REPORT:
              </p>
              <p>
                {score === totalQuestions
                  ? '🏆 Hongera Sana! Wewe ni Mtaalamu wa Tech & AI 2026!'
                  : score >= 2
                  ? '👍 Safi Sana! Unajua Misingi Mizuri ya Teknolojia. Endelea Kusoma SANTECH TECH!'
                  : '📚 Jaribu Tena & Soma Makala zetu za Akili Bandia uongeze ujuzi.'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
              <button
                onClick={handleRestart}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl border border-white/10 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Jaribu Tena
              </button>

              <a
                href={`https://wa.me/255691302979?text=${encodeURIComponent(
                  `Habari SANTECH,\n\nNimefanya jaribio la Tech Quiz 2026 na kupata Alama ${score}/${totalQuestions}!\n\nMakala zenu ni nzuri sana!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-xl"
              >
                <Share2 className="w-4 h-4" /> Tuma Matokeo WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
