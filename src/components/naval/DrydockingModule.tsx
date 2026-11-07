import React, { useState, useMemo } from 'react';
import {
  Anchor,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Wrench,
  RotateCcw,
  ExternalLink,
  Layers,
  FileText
} from 'lucide-react';

export const DrydockingModule: React.FC = () => {
  // Vessel Particulars at Entry
  const [displacement, setDisplacement] = useState<number>(14500); // tonnes (W)
  const [KM, setKM] = useState<number>(8.40); // m
  const [KG, setKG] = useState<number>(7.65); // m
  const [trimBySternM, setTrimBySternM] = useState<number>(0.85); // m
  const [MCT1cm, setMCT1cm] = useState<number>(195); // tonne-m / cm
  const [distAftToLCF, setDistAftToLCF] = useState<number>(68.5); // m (a)

  // Drydock Selection
  const [dockType, setDockType] = useState<'graving' | 'floating' | 'syncrolift' | 'slipway'>('graving');
  const [declivityRatio, setDeclivityRatio] = useState<number>(180); // 1 in 180

  // Calculations based on NIT SRT 04105 & Dr. C.B. Barrass
  const drydockResults = useMemo(() => {
    // Trim in cm
    const trimCm = trimBySternM * 100;

    // Upthrust P at the moment stern touches until critical phase:
    // P = (Trim_cm * MCT1cm) / a
    const upthrustP = distAftToLCF > 0 ? (trimCm * MCT1cm) / distAftToLCF : 0;

    // Initial Solid GM
    const initialGM = KM - KG;

    // Method 1: Virtual Loss of GM = (P * KM) / W
    const lossOfGM_KM = displacement > 0 ? (upthrustP * KM) / displacement : 0;
    const effectiveGM_Method1 = initialGM - lossOfGM_KM;

    // Method 2: Virtual KG rise: KG_v = (W * KG) / (W - P)
    const effectiveDisplacement = Math.max(1, displacement - upthrustP);
    const virtualKG = (displacement * KG) / effectiveDisplacement;
    const virtualRiseKG = virtualKG - KG;
    const effectiveGM_Method2 = KM - virtualKG;

    // Is the vessel stable at critical phase?
    const isStableAtCritical = effectiveGM_Method1 > 0.15; // Minimum 0.15m reserve GM
    const isMarginal = effectiveGM_Method1 > 0 && effectiveGM_Method1 <= 0.15;
    const isUnstable = effectiveGM_Method1 <= 0;

    // Maximum safe trim by stern to avoid negative GM:
    // P_crit = (initialGM * W) / KM
    // Trim_crit_cm = (P_crit * a) / MCT1cm
    const maxSafeP = (initialGM * displacement) / KM;
    const maxSafeTrimCm = (maxSafeP * distAftToLCF) / MCT1cm;
    const maxSafeTrimM = maxSafeTrimCm / 100;

    return {
      trimCm,
      upthrustP,
      initialGM,
      lossOfGM_KM,
      effectiveGM_Method1,
      virtualKG,
      virtualRiseKG,
      effectiveDisplacement,
      isStableAtCritical,
      isMarginal,
      isUnstable,
      maxSafeP,
      maxSafeTrimM
    };
  }, [displacement, KM, KG, trimBySternM, MCT1cm, distAftToLCF]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FFC107] uppercase tracking-wider font-bold">
          <span>National Institute of Transport Course SRT 04105</span>
          <span>•</span>
          <span>Dr. C.B. Barrass Drydocking Mechanics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white editorial-font flex items-center gap-3">
          <Wrench className="w-7 h-7 text-[#FFC107]" />
          Drydocking Stability & Upthrust Analysis
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Interactive evaluation of upthrust $P$, critical phase loss of metacentric height ($GM$), virtual rise of center of gravity ($KG_v$), and maximum allowable docking trim before keel touches blocks overall.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-2">
              <Anchor className="w-4 h-4" /> 1. Ship Entry Hydrostatics
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Displacement ($W$):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={displacement}
                    onChange={(e) => setDisplacement(Math.max(100, parseFloat(e.target.value) || 100))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">t</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Trim by Stern:</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.05}
                    value={trimBySternM}
                    onChange={(e) => setTrimBySternM(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Height $KM$:</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.01}
                    value={KM}
                    onChange={(e) => setKM(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Center of Gravity $KG$:</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.01}
                    value={KG}
                    onChange={(e) => setKG(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">$MCT_{'{1cm}'}$:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={MCT1cm}
                    onChange={(e) => setMCT1cm(Math.max(10, parseFloat(e.target.value) || 10))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">t-m/cm</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Distance $a$ (Aft to LCF):</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.5}
                    value={distAftToLCF}
                    onChange={(e) => setDistAftToLCF(Math.max(5, parseFloat(e.target.value) || 5))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Drydock Facility Card */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-2">
              <Layers className="w-4 h-4" /> 2. Docking Facility Specifications
            </h3>

            <div>
              <label className="text-zinc-400 font-bold block mb-1 text-xs">Drydock Facility Type:</label>
              <select
                value={dockType}
                onChange={(e) => setDockType(e.target.value as any)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:border-[#FFC107] focus:outline-none"
              >
                <option value="graving">Graving Dock (Excavated masonry basin with caisson gate)</option>
                <option value="floating">Floating Dry Dock (Ballastable pontoon with wing walls)</option>
                <option value="syncrolift">Syncrolift / Mechanical Vertical Platform</option>
                <option value="slipway">Marine Patent Slipway with Carriage</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-zinc-300 font-bold">Dock Floor Declivity:</span>
                <span className="font-mono text-[#FFC107] font-bold">1 in {declivityRatio}</span>
              </div>
              <input
                type="range"
                min={100}
                max={300}
                step={10}
                value={declivityRatio}
                onChange={(e) => setDeclivityRatio(parseInt(e.target.value))}
                className="w-full accent-[#FFC107] cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block mt-1">
                Typical graving dock slope is 1 in 150 to 1 in 200 for natural drainage.
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Calculations & Stability Outcome (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Verdict Banner */}
          <div
            className={`p-6 rounded-3xl border flex items-start gap-4 ${
              drydockResults.isStableAtCritical
                ? 'bg-emerald-950/40 border-emerald-500/40'
                : drydockResults.isMarginal
                ? 'bg-amber-950/40 border-amber-500/40'
                : 'bg-red-950/50 border-red-500/50'
            }`}
          >
            {drydockResults.isStableAtCritical ? (
              <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0 mt-0.5" />
            ) : drydockResults.isMarginal ? (
              <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-8 h-8 text-red-400 shrink-0 mt-0.5" />
            )}

            <div className="space-y-1">
              <span
                className={`text-xs font-black uppercase tracking-wider block ${
                  drydockResults.isStableAtCritical
                    ? 'text-emerald-300'
                    : drydockResults.isMarginal
                    ? 'text-amber-300'
                    : 'text-red-300'
                }`}
              >
                {drydockResults.isStableAtCritical
                  ? 'CRITICAL PHASE DOCKING STABILITY: SAFE'
                  : drydockResults.isMarginal
                  ? 'CRITICAL PHASE DOCKING STABILITY: MARGINAL (LOW RESERVE)'
                  : 'CRITICAL PHASE DOCKING STABILITY: UNSTABLE (CAPSIZE RISK!)'}
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {drydockResults.isStableAtCritical
                  ? `Effective metacentric height remains positive at +${drydockResults.effectiveGM_Method1.toFixed(3)} m at the critical period when the keel touches the blocks throughout its length.`
                  : drydockResults.isMarginal
                  ? `Effective GM is +${drydockResults.effectiveGM_Method1.toFixed(3)} m, which is below the safe margin of 0.15 m. Recommend ballasting forward or reducing stern trim prior to entering dock.`
                  : `Vessel loses all positive GM (effective GM = ${drydockResults.effectiveGM_Method1.toFixed(3)} m) due to massive upthrust P = ${drydockResults.upthrustP.toFixed(1)} t. The ship will heel and slip off blocks before breast shores/side blocks are positioned!`}
              </p>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Upthrust Force ($P$)
              </span>
              <span className="text-xl font-black text-[#FFC107] font-mono mt-1 block">
                {drydockResults.upthrustP.toFixed(1)} <span className="text-xs font-normal text-zinc-400">tonnes</span>
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 block">At aft sole piece</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Virtual Loss of $GM$
              </span>
              <span className="text-xl font-black text-amber-300 font-mono mt-1 block">
                -{drydockResults.lossOfGM_KM.toFixed(3)} <span className="text-xs font-normal text-zinc-400">m</span>
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 block">$(P \times KM) / W$</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Effective $GM_{'{crit}'}$
              </span>
              <span
                className={`text-xl font-black font-mono mt-1 block ${
                  drydockResults.isStableAtCritical ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {drydockResults.effectiveGM_Method1.toFixed(3)} <span className="text-xs font-normal text-zinc-400">m</span>
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 block">Initial: {drydockResults.initialGM.toFixed(2)} m</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Max Safe Trim
              </span>
              <span className="text-xl font-black text-white font-mono mt-1 block">
                {drydockResults.maxSafeTrimM.toFixed(2)} <span className="text-xs font-normal text-zinc-400">m</span>
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 block">Threshold for GM ≥ 0</span>
            </div>
          </div>

          {/* Theoretical Foundations & Responsibilities from NIT SRT 04105 */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FFC107]" /> Operational Responsibilities (NIT SRT 04105 Syllabus)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[#FFC107] font-bold block text-sm">Duties of Chief Officer & Master:</span>
                <ul className="space-y-1.5 text-zinc-300">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Submit accurate Docking Plan showing echo sounders, log sensors, and bottom plugs.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Minimize free surface effects by ensuring tanks are either pressed full or pumped dry.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Confirm zero list and keep trim by stern within drydock master limits ({drydockResults.maxSafeTrimM.toFixed(2)}m max).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Isolate sanitary discharge valves and lock oily bilge overboard valves.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[#FFC107] font-bold block text-sm">Duties of Dock Master & Yard:</span>
                <ul className="space-y-1.5 text-zinc-300">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Set keel blocks and bilge blocks to withstand maximum concentrated loading ($P$).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Position side breast shores / mechanical bilge arms as soon as vessel lands.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Provide shore electrical power connection (440V / 60Hz or 380V / 50Hz) and cooling water.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Connect earthing bonding cables immediately to prevent galvanic electrolytic corrosion.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reference Notes Citation */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span>Grounding reference: NIT SRT 04105 & Dr. C.B. Barrass Ship Stability</span>
            <a
              href="/assets/aistudio/A_dry_dock_and_shipboard_maitenance_251217_192217_036f7c2b.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFC107] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Open NIT SRT 04105 PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
