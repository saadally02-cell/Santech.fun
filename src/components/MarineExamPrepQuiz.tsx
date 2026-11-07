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
    category: 'Main Propulsion Engines',
    question: 'When taking indicator diagrams on a 2-stroke propulsion diesel, if compression pressure (Pcomp) and maximum firing pressure (Pmax) are both low on a single isolated cylinder, what is the most probable cause?',
    options: [
      'Fuel injection timing is excessively retarded',
      'Piston rings broken or exhaust valve seating leakage (Cylinder Blow-By)',
      'Scavenge air cooler fouled on the gas side',
      'Fuel oil supply temperature is too high',
    ],
    correctAnswer: 1,
    explanation: 'Low Pcomp proves charge air is escaping during the compression stroke before fuel injection initiates. The primary mechanical causes are worn or stuck piston rings (blow-by) or an exhaust valve that fails to seat hermetically due to hydraulic pushrod leakage or seat deformation.',
  },
  {
    id: 2,
    category: 'Auxiliary Machinery (MARPOL)',
    question: 'Under MARPOL Annex I Regulation 14, what is the statutory maximum permissible oil content in bilge water effluent discharged overboard through an approved oily water separator en route?',
    options: [
      '50 PPM (Parts Per Million)',
      '100 PPM (Parts Per Million)',
      '15 PPM (Parts Per Million)',
      '5 PPM (Parts Per Million)',
    ],
    correctAnswer: 2,
    explanation: 'Under MARPOL Annex I, discharge of oily bilge water is prohibited unless filtered through approved 15 PPM equipment (MEPC.107(49)) with an automatic 3-way fail-safe valve and continuous recording by the Oil Content Monitor (OCM).',
  },
  {
    id: 3,
    category: 'Electrical & Automation',
    question: 'On a marine 440V 3-phase Insulated Neutral (IT) electrical distribution system, why is the neutral point left completely isolated from the steel ship hull?',
    options: [
      'To save copper installation costs on shipboard cabling',
      'To ensure that a single earth fault does not trip essential machinery like the steering gear or lube oil pumps',
      'To raise generated power frequency to 60 Hz',
      'To prevent induction motors from overheating during startup',
    ],
    correctAnswer: 1,
    explanation: 'At sea, sudden power loss to steering gear or lubrication pumps could lead to collision or engine seizure. An insulated neutral system allows uninterrupted operation upon the occurrence of a single earth fault, while triggering an alarm for remedial action before a second fault creates a phase-to-phase short.',
  },
  {
    id: 4,
    category: 'IMO & SOLAS Safety',
    question: 'According to SOLAS Chapter II-1, within what maximum duration must the Emergency Diesel Generator (EDG) start and connect to the Emergency Switchboard (ESB) following a primary vessel blackout?',
    options: [
      'Within 2 minutes',
      'Within 5 minutes',
      'Within 45 seconds',
      'Within 15 seconds',
    ],
    correctAnswer: 2,
    explanation: 'SOLAS mandates that the Emergency Generator must start automatically and restore power to emergency switchboard busbars supplying steering, navigation lights, fire pumps, and radio equipment within exactly 45 seconds.',
  },
  {
    id: 5,
    category: 'Drydocking & Maintenance (NIT SRT 04105)',
    question: 'During drydocking, what is the "critical period" and why is it hazardous for vessel transverse stability?',
    options: [
      'When the dock gate is opened to flood the basin',
      'The time interval from when the stern touches the keel blocks until the vessel takes the blocks overall (full length)',
      'When hull high-pressure washing begins',
      'When bottom drain plugs are unscrewed by the shipyard',
    ],
    correctAnswer: 1,
    explanation: 'As taught in NIT SRT 04105 and Dr. Barrass: Upthrust P at the stern post creates a virtual rise of the center of gravity (Loss of GM = P × KM / W). If the vessel lacks adequate positive GM during this critical interval, it will list and capsize off the keel blocks before breast shores can be deployed.',
  },
  {
    id: 6,
    category: 'Ship Maneuvering (Notes Ch. 6)',
    question: 'According to hydrodynamic rudder principles in naval architecture, what occurs when a spade or semi-balanced horn rudder is deflected beyond 35 degrees?',
    options: [
      'Propeller cavitation stops completely',
      'The rudder experiences hydrodynamic flow separation and stall, causing lift force to drop sharply while drag rises rapidly',
      'The turning circle diameter decreases to zero',
      'Vessel speed increases due to wake fraction elimination',
    ],
    correctAnswer: 1,
    explanation: 'Boundary layer flow separates from the suction side of conventional rudders beyond ~32° to 35°. The lift coefficient CL drops precipitously, producing severe vibration and excessive steering gear torque without improving rate of turn.',
  },
  {
    id: 7,
    category: 'Technical Calculations',
    question: 'If a ship consumes 48 metric tonnes of heavy fuel over 24 hours while generating steady propulsion power of 12,000 kW, what is the Specific Fuel Oil Consumption (SFOC)?',
    options: [
      '145.2 g/kWh',
      '166.7 g/kWh',
      '195.4 g/kWh',
      '210.0 g/kWh',
    ],
    correctAnswer: 1,
    explanation: 'Hourly fuel rate = 48,000 kg / 24 h = 2,000 kg/h. SFOC = (2,000 kg/h × 1,000 g/kg) / 12,000 kW = 166.67 g/kWh.',
  },
  {
    id: 8,
    category: 'Ship Stability (Dr. C.B. Barrass)',
    question: 'How does an internal liquid surface in a slack double bottom fuel oil tank affect a vessel\'s transverse stability?',
    options: [
      'It increases metacentric height by lowering the center of buoyancy',
      'It produces a virtual rise in the vessel\'s center of gravity (loss of effective GM) equal to (i × ρ_t) / (W × ρ_w)',
      'It has no effect unless the tank is completely emptied',
      'It improves righting arm GZ at large heel angles',
    ],
    correctAnswer: 1,
    explanation: 'Free Surface Effect (FSE) causes liquid center of gravity to shift toward the low side when the ship heels, reducing the righting lever. The virtual loss of GM depends on the transverse moment of inertia i = (l × b³) / 12 and is independent of the depth of liquid in the tank.',
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
    if (selectedOption !== null) return;
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
              TASAC, UK MCA & STCW Standards
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white editorial-font">
            Marine Engineering & Naval Architecture Examination Quiz
          </h2>
        </div>

        {!quizFinished && (
          <div className="text-right">
            <span className="text-xs text-zinc-400">Question:</span>
            <div className="text-sm font-black text-[#FFC107]">
              {currentIndex + 1} / {QUESTIONS.length}
            </div>
          </div>
        )}
      </div>

      {quizFinished ? (
        <div className="p-8 text-center bg-zinc-900/90 rounded-2xl border border-white/10 space-y-4 max-w-xl mx-auto">
          <Award className="w-16 h-16 text-[#FFC107] mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-white">Examination Completed!</h3>
          <p className="text-sm text-zinc-300">
            Final Score: <span className="text-[#FFC107] font-black text-lg">{score}</span> of <span className="font-bold">{QUESTIONS.length}</span> ({Math.round((score / QUESTIONS.length) * 100)}%)
          </p>
          <p className="text-xs text-zinc-400">
            {score >= 6
              ? 'Outstanding performance! You have demonstrated strong competency in STCW watchkeeping, diesel thermodynamics, ship stability, and drydocking safety.'
              : 'Continue reviewing our modules on Main Propulsion, Naval Architecture, and MARPOL Regulations to sharpen your technical scores.'}
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Examination</span>
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
                  <span>Technical Examiner Note:</span>
                </div>
                <p className="leading-relaxed pt-1">{currentQ.explanation}</p>

                <div className="pt-3 text-right">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>Next Question</span>
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
