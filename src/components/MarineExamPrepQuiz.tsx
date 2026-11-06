import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle, BookOpen } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Injini Kuu & Propulsion',
    question: 'Wakati wa kupima indicator diagram ya injini kuu ya 2-stroke, ikiwa Pcomp iko chini na Pmax iko chini kwenye silinda moja pekee, tatizo lina uwezekano mkubwa wa kuwa nini?',
    options: [
      'Timing ya mafuta (fuel injection) imechelewa sana',
      'Piston rings zimevunjika au exhaust valve inavuja (Blow-by)',
      'Scavenge air cooler imeziba kwa upande wa hewa',
      'Joto la mafuta ya fuel oil liko juu mno',
    ],
    correctAnswer: 1,
    explanation: 'Pcomp (compression pressure) inapokuwa chini, inaonyesha hewa inatoroka wakati wa compression stroke kabla hata mwako haujaanza. Sababu kuu ni piston rings zilizovunjika/kuchoka (blow-by) au exhaust valve kutoziba vizuri.',
  },
  {
    id: 2,
    category: 'Mitambo Msaidizi (Auxiliary)',
    question: 'Chini ya MARPOL Annex I, ni kiwango gani cha juu kabisa cha mafuta kinachoruhusiwa kisheria kwenye maji ya bilges yanayotupwa baharini kupitia OWS?',
    options: [
      '50 PPM (Parts Per Million)',
      '100 PPM (Parts Per Million)',
      '15 PPM (Parts Per Million)',
      '5 PPM (Parts Per Million)',
    ],
    correctAnswer: 2,
    explanation: 'Chini ya Kanuni ya 14 ya MARPOL Annex I, kiwango cha juu kinachoruhusiwa kumwagika baharini wakati meli ikiwa en route ni chini ya 15 PPM kupitia kifaa cha Oil Filtering Equipment kilichoidhinishwa chini ya MEPC.107(49).',
  },
  {
    id: '3' as any,
    category: 'Umeme & Otomesheni',
    question: 'Kwenye mfumo wa 440V Insulated Neutral (IT System) wa meli, kwanini neutral haijaunganishwa moja kwa moja kwenye fremu ya chuma ya meli?',
    options: [
      'Ili kuokoa gharama za nyaya za shaba',
      'Ili hitilafu ya kwanza ya waya kugusa chuma (single earth fault) isikate umeme wa mitambo muhimu kama usukani',
      'Ili kuongeza frequency ya umeme kufikia 60Hz',
      'Kuzuia mota za umeme zisipate joto',
    ],
    correctAnswer: 1,
    explanation: 'Kwenye meli, kupoteza umeme wa ghafla wa steering gear kunaweza kusababisha kugongana kwa meli. Insulated neutral inaruhusu umeme kuendelea hata waya mmoja ukishika chuma, huku kengele ikilia kutoa nafasi ya kurekebisha kabla ya double earth fault.',
  },
  {
    id: 4,
    category: 'Sheria & Usalama (IMO)',
    question: 'Kulingana na SOLAS Sura ya II-1, mtambo wa umeme wa dharura (Emergency Diesel Generator) lazima uweze kuwaka na kulisha Emergency Switchboard ndani ya muda gani baada ya blackout?',
    options: [
      'Ndani ya dakika 2',
      'Ndani ya dakika 5',
      'Ndani ya sekunde 45',
      'Ndani ya sekunde 15',
    ],
    correctAnswer: 2,
    explanation: 'SOLAS Regulation inalazimu kwamba Emergency Generator lazima ianze kiotomatiki na kufunga breaker yake kwenye Emergency Switchboard (ESB) ndani ya sekunde 45 pekee baada ya Main Switchboard kupoteza umeme.',
  },
  {
    id: 5,
    category: 'Injini Kuu & Propulsion',
    question: 'Kengele ya Oil Mist Detector (OMD) ikilia kwenye injini kuu ya meli, ni hatua gani ya kwanza ya lazima kabla ya kufanya jambo lingine?',
    options: [
      'Kufungua milango ya crankcase mara moja kuangalia joto',
      'Kupunguza mwendo wa injini mara moja (Slow Down), kutoa taarifa darajani na kamwe kutofungua milango ya crankcase kabla injini haijapoa',
      'Kuongeza shinikizo la pampu ya lube oil kufikia bar 10',
      'Kuwasha auxiliary blowers zote kwa kasi kamili',
    ],
    correctAnswer: 1,
    explanation: 'Kufungua milango ya crankcase wakati kukiwa na hot spot kutaleta oksijeni safi ndani ya ukungu wa mafuta na kusababisha Secondary Crankcase Explosion yenye nguvu kubwa inayoweza kuua watu na kuharibu engine room. Lazima injini ipoe kwa angalau dakika 30-60.',
  },
  {
    id: 6,
    category: 'Mitambo Msaidizi (Auxiliary)',
    question: 'Wakati wa kupima maji ya boiler feed water, kiwango cha Chloride kikipanda ghafla kutoka 15 ppm hadi 180 ppm, hii inaashiria nini?',
    options: [
      'Boiler inahitaji kupashwa moto zaidi',
      'Maji ya bahari yanavuja ndani kupitia dump condenser au fresh water generator',
      'Hydrazine iliyowekwa imezidi kiwango',
      'Phosphate imeyeyuka kwenye kuta',
    ],
    correctAnswer: 1,
    explanation: 'Maji safi ya distilled water hayana chloride nyingi. Kupanda ghafla kwa chloride kunaonyesha kuwa kuna tundu kwenye mabomba ya kupoza ya condenser ambapo maji ya bahari ya chumvi yanaingia kwenye mfumo wa boiler feed water.',
  },
  {
    id: 7,
    category: 'Vipimo & Hesabu',
    question: 'Ikiwa meli inatumia tani 48 za mafuta kwa masaa 24 na inazalisha nguvu thabiti ya 12,000 kW, Specific Fuel Oil Consumption (SFOC) ni ngapi?',
    options: [
      '145.2 g/kWh',
      '166.7 g/kWh',
      '195.4 g/kWh',
      '210.0 g/kWh',
    ],
    correctAnswer: 1,
    explanation: 'Matumizi kwa saa = 48,000 kg / 24 = 2,000 kg/h. SFOC = (2,000 × 1000) / 12,000 kW = 166.67 g/kWh.',
  },
  {
    id: 8,
    category: 'Sheria & Usalama (IMO)',
    question: 'Chini ya Mkataba wa MLC 2006, ni kiwango gani cha chini cha masaa ya kupumzika (Hours of Rest) anachopaswa kupata mwanamaji ndani ya kipindi cha siku 7?',
    options: [
      'Angalau masaa 48',
      'Angalau masaa 60',
      'Angalau masaa 77',
      'Angalau masaa 84',
    ],
    correctAnswer: 2,
    explanation: 'MLC 2006 Regulation 2.3 inatamka wazi kuwa kila mwanamaji lazima apate angalau masaa 10 ya kupumzika ndani ya masaa 24, na jumla ya angalau masaa 77 ya kupumzika ndani ya siku yoyote 7.',
  },
];

export const MarineExamPrepQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="marine-quiz" className="my-8 rounded-3xl bg-zinc-950 p-6 sm:p-8 border border-white/10 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#FFC107] uppercase tracking-wider">
              MEO Class 1, 2 & 4 Exam Prep
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-[#FFC107] border border-amber-500/30">
              TASAC & STCW Standards
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white editorial-font">
            Jaribio la Uhandisi wa Majini (Marine Engineering Oral & Written Quiz)
          </h2>
        </div>

        {!quizFinished && (
          <div className="text-right">
            <span className="text-xs text-zinc-400">Swali la:</span>
            <div className="text-sm font-black text-[#FFC107]">
              {currentIndex + 1} / {QUESTIONS.length}
            </div>
          </div>
        )}
      </div>

      {quizFinished ? (
        <div className="p-8 text-center bg-zinc-900/90 rounded-2xl border border-white/10 space-y-4 max-w-xl mx-auto">
          <Award className="w-16 h-16 text-[#FFC107] mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-white">Umekamilisha Jaribio!</h3>
          <p className="text-sm text-zinc-300">
            Alama zako: <span className="text-[#FFC107] font-black text-lg">{score}</span> kati ya <span className="font-bold">{QUESTIONS.length}</span> ({Math.round((score / QUESTIONS.length) * 100)}%)
          </p>
          <p className="text-xs text-zinc-400">
            {score >= 6
              ? 'Hongera sana! Una uelewa mzuri wa sheria za STCW, utendaji wa injini za 2-stroke na mifumo ya dharura ya meli.'
              : 'Endelea kujisomea masomo yetu ya Injini Kuu, Mitambo Msaidizi na Kanuni za MARPOL ili kuboresha alama zako.'}
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jaribu Tena</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Question Card */}
          <div className="bg-zinc-900/80 rounded-2xl p-6 border border-white/10 space-y-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/5 text-[#FFC107] border border-white/10">
              {currentQ.category}
            </span>

            <h3 className="text-base sm:text-lg font-black text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswer;
                let btnStyle = 'bg-black/50 border-white/10 hover:border-[#FFC107]/50 text-zinc-200';

                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 font-bold';
                  } else {
                    btnStyle = 'bg-black/30 border-white/5 text-zinc-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {selectedOption !== null && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showExplanation && (
              <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-zinc-300 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-black">
                  <HelpCircle className="w-4 h-4" />
                  <span>Ufafanuzi wa Kiufundi (Chief Engineer Explanation):</span>
                </div>
                <p className="leading-relaxed pt-1">{currentQ.explanation}</p>

                <div className="pt-3 text-right">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Swali Linalofuata</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
