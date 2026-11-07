import React, { useState, useMemo } from 'react';
import {
  Compass,
  Layers,
  Wrench,
  Boxes,
  Shield,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Cpu,
  Info,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface DesignSpiralStage {
  id: number;
  title: string;
  shortDesc: string;
  keyOutputs: string[];
  principles: string[];
}

const SPIRAL_STAGES: DesignSpiralStage[] = [
  {
    id: 1,
    title: "1. Mission Requirements & Concept Exploration",
    shortDesc: "Define deadweight capacity (DWT / TEU), design service speed (Knots), endurance range (nautical miles), and geographical boundary limits (Panamax, Suezmax, draft constraints).",
    keyOutputs: ["Deadweight (DWT) or TEU Capacity", "Service Speed (Knots)", "Endurance Range (Nautical Miles)", "Canal & Port Draft Limits"],
    principles: [
      "Economic slow steaming trade-off between fuel expenditure and voyage charter rates",
      "Ice class notation versus open water optimization based on global trade corridors",
      "Compliance with IMO EEXI (Energy Efficiency Existing Ship Index) & CII (Carbon Intensity Indicator)"
    ]
  },
  {
    id: 2,
    title: "2. Principal Dimensions & Hull Form Coefficients",
    shortDesc: "Derive length between perpendiculars (Lbp), beam (B), depth (D), draft (T), and form coefficients (Cb, Cp, Cm, Cwp) using Schneekluth, Posdunine, and Alexander formulas.",
    keyOutputs: ["Length B.P. (Lbp)", "Molded Beam (B)", "Molded Depth (D)", "Design Draft (T)", "Block Coefficient (Cb)"],
    principles: [
      "Slenderness ratio L / ∇^(1/3) governing wave-making resistance",
      "Beam-to-draft ratio (B/T) dictating transverse metacentric height (initial GM)",
      "Alexander formula for block coefficient: Cb = 1.05 - 0.23 × Fn"
    ]
  },
  {
    id: 3,
    title: "3. Hull Lines, Forebody & Bulbous Bow Optimization",
    shortDesc: "Develop the 3D Lines Plan (Body Plan, Sheer Plan, Half-Breadth Plan), bulbous bow cross-sectional area, and stern skeg clearance for optimum flow into propeller.",
    keyOutputs: ["Lines Plan 3D Offsets", "Bulbous Bow Area (ABT)", "Transom Stern Immersion", "Wetted Surface Area (S)"],
    principles: [
      "Bulbous bow creates destructive wave interference, cancelling bow wave and saving 8% to 15% propulsive power",
      "Skeg alignment directs uniform wake into the propeller disc",
      "Minimizing bilge vortex shedding and stern eddy flow"
    ]
  },
  {
    id: 4,
    title: "4. Internal Subdivision & General Arrangement (GA)",
    shortDesc: "Position watertight bulkheads, machinery spaces, collision bulkhead per SOLAS Reg. II-1/11, and double bottom tanks.",
    keyOutputs: ["Collision Bulkhead (0.05L to 0.08L)", "Aft Peak Bulkhead", "Double Bottom Height (≥ 760 mm)", "Cargo Holds & Hatch Openings"],
    principles: [
      "SOLAS probabilistic damage stability: Attained Subdivision Index A ≥ Required Index R",
      "Double bottom height not less than B/20 to protect against grounding breaches",
      "Independent segregation of hazardous and heavy fuel oil storage"
    ]
  },
  {
    id: 5,
    title: "5. Steel Weight Estimation & Weight Synthesis",
    shortDesc: "Calculate lightweight components (Steel hull, Machinery, Outfit) using Cubic Number (CN), Method of Differences, Buxton, and Sato formulas.",
    keyOutputs: ["Steel Hull Weight (Wsteel)", "Machinery Weight (Wmach)", "Outfit Weight (Woutfit)", "Deadweight (DWT)", "Displacement Balance (Δ)"],
    principles: [
      "Method of Differences (NIT SRT 06107): 85% ΔL, 55% ΔB, 30% ΔD relative to parent ship",
      "Buxton formula: Ws = 0.0487 × CN^1.077 for merchant hull structures",
      "Longitudinal weight center (LCG) balance matching center of buoyancy (LCB) for zero unwanted trim"
    ]
  },
  {
    id: 6,
    title: "6. Structural Scantlings & Classification Rules (IACS)",
    shortDesc: "Compute hull girder section modulus (Zmin), bottom shell plating thickness, and deck plate requirements under IACS Common Structural Rules (CSR).",
    keyOutputs: ["Minimum Section Modulus (Zmin)", "Bottom Plate Thickness (t)", "Deck Plate Thickness", "Corrosion Addition (tk)"],
    principles: [
      "Still water bending moment (MSW) + wave bending moment (MWV) under hogging and sagging",
      "Net thickness approach with mandatory 2.0 mm to 3.5 mm corrosion additions",
      "Strengthened forward bottom structure against heavy slamming pressures"
    ]
  }
];

export const ShipDesignMethodologyModule: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);

  // Preliminary Sizing Interactive State
  const [shipType, setShipType] = useState<'container' | 'bulk' | 'tanker' | 'ferry'>('bulk');
  const [targetDWT, setTargetDWT] = useState<number>(82000); // tonnes
  const [targetSpeedKnots, setTargetSpeedKnots] = useState<number>(14.5); // knots
  const [enduranceDays, setEnduranceDays] = useState<number>(30); // days at sea

  // Steel Weight Estimation State (NIT SRT 06107 Method of Differences)
  const [useParentShipMethod, setUseParentShipMethod] = useState<boolean>(true);
  const [parentL, setParentL] = useState<number>(220.0); // m
  const [parentB, setParentB] = useState<number>(32.0); // m
  const [parentD, setParentD] = useState<number>(19.0); // m
  const [parentWsteel, setParentWsteel] = useState<number>(11200); // tonnes

  // Design Synthesis Calculations
  const designSynthesis = useMemo(() => {
    const V_ms = targetSpeedKnots * 0.514444;

    // Block Coefficient & Form Coefficients
    let defaultCb = 0.82;
    let lengthConstant = 4.8;
    if (shipType === 'container') {
      defaultCb = Math.min(0.68, Math.max(0.55, 1.05 - 0.23 * (targetSpeedKnots / Math.sqrt(240))));
      lengthConstant = 5.6;
    } else if (shipType === 'bulk') {
      defaultCb = 0.84;
      lengthConstant = 4.8;
    } else if (shipType === 'tanker') {
      defaultCb = 0.85;
      lengthConstant = 4.6;
    } else {
      defaultCb = 0.58;
      lengthConstant = 6.2;
    }

    // Lightweight Ratio (LWT / Δ)
    let lwtRatio = 0.18;
    if (shipType === 'container') lwtRatio = 0.26;
    if (shipType === 'tanker') lwtRatio = 0.16;
    if (shipType === 'ferry') lwtRatio = 0.45;

    // Required Displacement (tonnes)
    const displacementTonnes = targetDWT / (1 - lwtRatio);
    const volumeM3 = displacementTonnes / 1.025;

    // Length between perpendiculars (Lbp) via Posdunine formula
    const Lbp = lengthConstant * Math.pow(targetSpeedKnots / (targetSpeedKnots + 2), 2) * Math.pow(displacementTonnes, 1 / 3);

    // Beam (B) using typical L/B ratio (Container: 6.8, Bulker: 6.5, Tanker: 6.0)
    let lbRatio = 6.8;
    if (shipType === 'bulk') lbRatio = 6.9;
    if (shipType === 'tanker') lbRatio = 5.8;
    if (shipType === 'ferry') lbRatio = 5.5;

    const B = Lbp / lbRatio;

    // Draft (T) from Volume = Lbp * B * T * Cb
    const T = volumeM3 / (Lbp * B * defaultCb);

    // Molded Depth (D) via standard L/D ratio (typically 11.5 to 13.5)
    const D = Math.max(T * 1.35, Lbp / 12.2);

    // Froude Number
    const Fn = V_ms / Math.sqrt(9.81 * Lbp);

    // Midship section coefficient Cm (typically 0.98 for bulk/tanker, 0.96 for container)
    const Cm = shipType === 'container' ? 0.965 : 0.988;
    const Cp = defaultCb / Cm;
    const Cwp = (1 + 2 * defaultCb) / 3;

    // Tonnes Per Centimeter (TPC) = 1.025 * Awp / 100
    const Awp = Cwp * Lbp * B;
    const TPC = (1.025 * Awp) / 100;

    // Cubic Number (CN = L * B * D / 100) per NIT SRT 06107
    const cubicNumber = (Lbp * B * D) / 100;

    // Steel Weight via Method of Differences (NIT SRT 06107 Section 2)
    // Ws = Wso * [1 + 0.85*(ΔL/Lo) + 0.55*(ΔB/Bo) + 0.30*(ΔD/Do)]
    const deltaL = Lbp - parentL;
    const deltaB = B - parentB;
    const deltaD = D - parentD;
    const methodOfDiffFactor = 1 + 0.85 * (deltaL / parentL) + 0.55 * (deltaB / parentB) + 0.30 * (deltaD / parentD);
    const Wsteel_MethodOfDiff = parentWsteel * methodOfDiffFactor;

    // Buxton Formula: Ws = 0.0487 * CN^1.077
    const Wsteel_Buxton = 0.0487 * Math.pow(cubicNumber, 1.077);

    // Sato Formula for Dry Cargo / Bulk: Ws = Cs * L^1.6 * (B + D)^0.8
    // Cs typically ~ 0.032 for modern bulkers
    const Wsteel_Sato = 0.032 * Math.pow(Lbp, 1.6) * Math.pow(B + D, 0.8);

    // Machinery Weight (tonnes) based on estimated MCR power
    const estimatedPowerKW = 0.55 * Math.pow(displacementTonnes, 2 / 3) * Math.pow(targetSpeedKnots, 3) / 520;
    const Wmachinery = 0.08 * estimatedPowerKW + 120;

    // Outfit Weight (tonnes) based on L * B
    const Woutfit = 0.35 * Math.pow(Lbp * B, 0.9);

    // Total Lightweight (tonnes)
    const Wlightweight = Wsteel_MethodOfDiff + Wmachinery + Woutfit;

    return {
      Lbp,
      B,
      D,
      T,
      Cb: defaultCb,
      Cm,
      Cp,
      Cwp,
      TPC,
      Fn,
      displacementTonnes,
      volumeM3,
      cubicNumber,
      Wsteel_MethodOfDiff,
      Wsteel_Buxton,
      Wsteel_Sato,
      Wmachinery,
      Woutfit,
      Wlightweight,
      estimatedPowerKW,
      deltaL,
      deltaB,
      deltaD
    };
  }, [shipType, targetDWT, targetSpeedKnots, parentL, parentB, parentD, parentWsteel]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FFC107] uppercase tracking-wider font-bold">
          <span>National Institute of Transport Course SRT 06107</span>
          <span>•</span>
          <span>Naval Architecture Design Spiral</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white editorial-font flex items-center gap-3">
          <Layers className="w-7 h-7 text-[#FFC107]" />
          Ship Design Methodology & Steel Weight Estimation
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Comprehensive implementation of the Evans-Harvey Design Spiral and NIT SRT 06107 steel weight estimation modules, including the Cubic Number method, Method of Differences (85% L, 55% B, 30% D), Buxton, and Sato formulas.
        </p>
      </div>

      {/* Interactive Design Spiral Flow (Clickable Stage Pills) */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#FFC107]" /> Six Iterative Stages of Naval Architecture
          </h3>
          <span className="text-xs font-mono text-zinc-400">Click stage to inspect technical outputs</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SPIRAL_STAGES.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStageId(st.id)}
              className={`p-3 rounded-2xl text-left transition-all border cursor-pointer ${
                activeStageId === st.id
                  ? 'bg-[#FFC107] text-black border-amber-300 font-bold shadow-lg scale-102'
                  : 'bg-black/40 text-zinc-300 border-white/5 hover:border-white/20 hover:bg-black/60'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider opacity-75">
                Stage {st.id}
              </div>
              <div className="text-xs font-bold mt-1 line-clamp-2">
                {st.title.replace(/^\d+\.\s*/, '')}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Box */}
        {(() => {
          const stage = SPIRAL_STAGES.find((s) => s.id === activeStageId) || SPIRAL_STAGES[0];
          return (
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4 mt-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FFC107] text-black font-black text-xs flex items-center justify-center">
                    {stage.id}
                  </span>
                  <span>{stage.title}</span>
                </h4>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  {stage.shortDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900 border border-white/5">
                  <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider block">
                    Engineering Deliverables:
                  </span>
                  {stage.keyOutputs.map((out, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-zinc-900 border border-white/5">
                  <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider block">
                    Core Design Laws & Codes:
                  </span>
                  {stage.principles.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-zinc-300">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Live Sizing & Steel Weight Calculator (Grounded in NIT SRT 06107) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Target Mission Card */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-2">
              <Boxes className="w-4 h-4" /> 1. Mission Specifications
            </h3>

            <div>
              <label className="text-zinc-400 font-bold block mb-1 text-xs">Vessel Type:</label>
              <select
                value={shipType}
                onChange={(e) => setShipType(e.target.value as any)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:border-[#FFC107] focus:outline-none"
              >
                <option value="bulk">Bulk Carrier (Kamsarmax / Capesize)</option>
                <option value="container">Container Ship (Cellular)</option>
                <option value="tanker">Crude Oil / Product Tanker</option>
                <option value="ferry">Ro-Pax Passenger Ferry</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-400 font-bold block mb-1 text-xs">Target Deadweight (DWT):</label>
              <div className="relative">
                <input
                  type="number"
                  step={1000}
                  value={targetDWT}
                  onChange={(e) => setTargetDWT(Math.max(500, parseFloat(e.target.value) || 500))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">t</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Service Speed:</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.5}
                    value={targetSpeedKnots}
                    onChange={(e) => setTargetSpeedKnots(Math.max(8, parseFloat(e.target.value) || 8))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">knots</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Endurance:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={enduranceDays}
                    onChange={(e) => setEnduranceDays(Math.max(5, parseFloat(e.target.value) || 5))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Vessel for Method of Differences (NIT SRT 06107 Section 2) */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" /> 2. Parent Vessel Reference (NIT SRT 06107)
              </h3>
              <span className="text-[10px] font-mono text-zinc-400">Method of Differences</span>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed">
              NIT lecture notes prescribe steel weight scaling using known parent ship particulars:
              $W_s = W_{'{so}'} [1 + 0.85(\Delta L/L_o) + 0.55(\Delta B/B_o) + 0.30(\Delta D/D_o)]$.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Parent $L_o$:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={parentL}
                    onChange={(e) => setParentL(Math.max(10, parseFloat(e.target.value) || 10))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Parent $B_o$:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={parentB}
                    onChange={(e) => setParentB(Math.max(2, parseFloat(e.target.value) || 2))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Parent $D_o$:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={parentD}
                    onChange={(e) => setParentD(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Parent Steel $W_{'{so}'}$:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={parentWsteel}
                    onChange={(e) => setParentWsteel(Math.max(100, parseFloat(e.target.value) || 100))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">t</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Derived Dimensions & Multi-Formula Steel Weight (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Synthesized Principal Dimensions Grid */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#FFC107]" /> Synthesized Preliminary Dimensions
              </h3>
              <span className="text-xs font-mono text-emerald-400">Archimedes Equilibrium</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Length B.P. ($L_{'{bp}'}$)</span>
                <span className="text-lg font-black text-white font-mono">{designSynthesis.Lbp.toFixed(1)} m</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Beam Molded ($B$)</span>
                <span className="text-lg font-black text-white font-mono">{designSynthesis.B.toFixed(2)} m</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Design Draft ($T$)</span>
                <span className="text-lg font-black text-white font-mono">{designSynthesis.T.toFixed(2)} m</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Depth Molded ($D$)</span>
                <span className="text-lg font-black text-white font-mono">{designSynthesis.D.toFixed(2)} m</span>
              </div>
            </div>

            {/* Form Coefficients & Hydrostatics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono text-zinc-300">
              <div className="p-2.5 bg-black/20 rounded-lg border border-white/5">
                <span className="text-zinc-500 block text-[10px]">Block Coeff ($C_B$):</span>
                <span className="text-[#FFC107] font-bold">{designSynthesis.Cb.toFixed(3)}</span>
              </div>
              <div className="p-2.5 bg-black/20 rounded-lg border border-white/5">
                <span className="text-zinc-500 block text-[10px]">Prismatic Coeff ($C_P$):</span>
                <span className="text-white font-bold">{designSynthesis.Cp.toFixed(3)}</span>
              </div>
              <div className="p-2.5 bg-black/20 rounded-lg border border-white/5">
                <span className="text-zinc-500 block text-[10px]">Froude Number ($F_n$):</span>
                <span className="text-white font-bold">{designSynthesis.Fn.toFixed(3)}</span>
              </div>
              <div className="p-2.5 bg-black/20 rounded-lg border border-white/5">
                <span className="text-zinc-500 block text-[10px]">TPC (Saltwater):</span>
                <span className="text-emerald-400 font-bold">{designSynthesis.TPC.toFixed(1)} t/cm</span>
              </div>
            </div>
          </div>

          {/* Steel Weight Comparison Module (NIT SRT 06107 Focus) */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#FFC107]" /> Steel Weight Formula Synthesis (NIT SRT 06107)
              </h3>
              <span className="text-xs font-mono text-[#FFC107]">Cubic No: {designSynthesis.cubicNumber.toFixed(0)}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Method of Differences */}
              <div className="p-4 bg-black/50 rounded-2xl border border-[#FFC107]/30 space-y-2">
                <div className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider">
                  Method of Differences (NIT)
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {designSynthesis.Wsteel_MethodOfDiff.toFixed(0)} <span className="text-xs text-zinc-400 font-normal">t</span>
                </div>
                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  Scaled from parent ship: +85% ΔL, +55% ΔB, +30% ΔD. Primary recommendation.
                </p>
              </div>

              {/* Buxton Formula */}
              <div className="p-4 bg-black/50 rounded-2xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Buxton Formula
                </div>
                <div className="text-2xl font-black text-zinc-200 font-mono">
                  {designSynthesis.Wsteel_Buxton.toFixed(0)} <span className="text-xs text-zinc-400 font-normal">t</span>
                </div>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  $W_s = 0.0487 \times CN^{'{1.077}'}$. Empirical standard for European yards.
                </p>
              </div>

              {/* Sato Formula */}
              <div className="p-4 bg-black/50 rounded-2xl border border-white/5 space-y-2">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Sato Formula
                </div>
                <div className="text-2xl font-black text-zinc-200 font-mono">
                  {designSynthesis.Wsteel_Sato.toFixed(0)} <span className="text-xs text-zinc-400 font-normal">t</span>
                </div>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  $W_s = C_s \times L^{'{1.6}'} \times (B+D)^{'{0.8}'}$. Widely used in Asian shipyards.
                </p>
              </div>
            </div>

            {/* Total Weight Breakdown Summary */}
            <div className="p-4 bg-black/30 rounded-2xl border border-white/5 space-y-3">
              <span className="text-xs font-bold text-zinc-300 block">Total Displacement & Lightweight Breakdown:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 text-[10px] block">Steel Hull:</span>
                  <span className="text-white font-bold">{designSynthesis.Wsteel_MethodOfDiff.toFixed(0)} t</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Machinery:</span>
                  <span className="text-white font-bold">{designSynthesis.Wmachinery.toFixed(0)} t</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Outfit:</span>
                  <span className="text-white font-bold">{designSynthesis.Woutfit.toFixed(0)} t</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Total Lightship:</span>
                  <span className="text-amber-400 font-bold">{designSynthesis.Wlightweight.toFixed(0)} t</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Notes Citation */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span>Grounding reference: NIT SRT 06107 Ship Design Methodology</span>
            <a
              href="/assets/aistudio/Ship_Design_Methodology_3_31e235dc.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFC107] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Open NIT SRT 06107 PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
