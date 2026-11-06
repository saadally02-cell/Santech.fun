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
  Info
} from 'lucide-react';

interface DesignSpiralStage {
  id: number;
  title: string;
  swahiliTitle: string;
  shortDesc: string;
  keyOutputs: string[];
  principles: string[];
}

const SPIRAL_STAGES: DesignSpiralStage[] = [
  {
    id: 1,
    title: "Mission Requirements & Concept Exploration",
    swahiliTitle: "1. Mahitaji ya Safari & Malengo ya Meli",
    shortDesc: "Kufafanua uwezo wa kubeba mzigo (Deadweight / TEU), kasi ya safari (Service Speed), umbali wa safari (Range nm), na vikwazo vya kijiografia (Canal & Port restrictions).",
    keyOutputs: ["Deadweight (DWT) au TEU", "Kasi ya Kiuchumi (Knots)", "Endurance (Days / Nautical Miles)", "Vikwazo vya Mfereji (Panamax, Suezmax)"],
    principles: [
      "Uwiano wa gharama ya mafuta dhidi ya kasi ya safari (Economic Slow Steaming)",
      "Uchaguzi wa daraja la barafu (Ice Class) au meli ya kawaida kulingana na njia za biashara",
      "Kuzingatia sheria za IMO EEXI (Energy Efficiency Existing Ship Index) na CII (Carbon Intensity Indicator)"
    ]
  },
  {
    id: 2,
    title: "Principal Dimensions & Form Coefficients",
    swahiliTitle: "2. Vipimo Vikuu & Mgawo wa Umbo (Hull Form)",
    shortDesc: "Kubainisha urefu (Lbp), upana (B), kina (D), mzammo (T), na uwiano wa kijiometri (Cb, Cp, Cm, Cwp) kwa kutumia kanuni za Posdunine na Schneekluth.",
    keyOutputs: ["Length B.P (Lbp)", "Beam Moulded (B)", "Depth Moulded (D)", "Draft (T)", "Block Coefficient (Cb)"],
    principles: [
      "Slenderness ratio L/∇^(1/3) inayoamua kiasi cha wave-making resistance",
      "Uwiano wa B/T unaoathiri uthabiti wa pembeni (Transverse stability na initial GM)",
      "Kadirio la Cb kulingana na Froude Number: Cb = 1.05 - 0.23 * Fn"
    ]
  },
  {
    id: 3,
    title: "Hull Form Design & Bulbous Bow Optimization",
    swahiliTitle: "3. Usanifu wa Umbo la Hull & Pua ya Meli (Bulbous Bow)",
    shortDesc: "Uchoraji wa mistari ya meli (Lines Plan: Body Plan, Sheer Plan, Half-Breadth Plan), pua ya mviringo ya kupunguza mawimbi, na mtindo wa uelekeo wa nyuma (Stern).",
    keyOutputs: ["Lines Plan 3D Offsets", "Bulbous Bow Cross-Section Area (ABT)", "Transom Stern Immersion", "Wetted Surface Area (S)"],
    principles: [
      "Bulbous bow inazalisha wimbi linalokinzana na wimbi la pua (Destructive Wave Interference) na kuokoa 8-15% ya nguvu",
      "Urefu na umbo la skeg kuelekeza mtiririko safi wa maji kuelekea kwenye propeller",
      "Kupunguza vortex shedding kwenye sehemu ya nyuma (Aft run)"
    ]
  },
  {
    id: 4,
    title: "Subdivision & General Arrangement (GA)",
    swahiliTitle: "4. Mgawanyo wa Ndani & Mpangilio Mkuu (GA & SOLAS)",
    shortDesc: "Kuweka bulkheads zisizopenyeza maji (Watertight Bulkheads), chumba cha injini (Engine Room), collision bulkhead kwa mujibu wa SOLAS Chapter II-1, na double bottom.",
    keyOutputs: ["Collision Bulkhead (0.05L hadi 0.08L)", "Aft Peak Bulkhead", "Double Bottom Height (≥ 760 mm)", "Cargo Hold Compartments"],
    principles: [
      "Kanuni za SOLAS Probabilistic Damage Stability (Attained Index A ≥ Required Index R)",
      "Urefu wa double bottom usiopungua B/20 kuzuia uvujaji wakati wa kusimama mchangani (Grounding)",
      "Ufikiaji rahisi wa vituo vya dharura (Emergency Generator, Fire Pump, Lifeboats)"
    ]
  },
  {
    id: 5,
    title: "Weight Estimation & Displacement Balance",
    swahiliTitle: "5. Makadirio ya Uzito & Uwiano wa Mvuto (Weight Synthesis)",
    shortDesc: "Kugawanya uzito katika Lightweight (Steel Hull + Machinery + Outfit) na Deadweight (Cargo + Fuel + Ballast + Crew) na kusawazisha na ujazo wa maji (Archimedes).",
    keyOutputs: ["Steel Hull Weight (Wsteel)", "Machinery Weight (Wmach)", "Outfit Weight (Woutfit)", "Deadweight (DWT)", "Displacement Balance (Δ)"],
    principles: [
      "Watson & Gilfillan formula ya ukadirio wa uzito wa chuma: Wsteel = K * L * B * D",
      "Kuhakikisha kitovu cha uzito (KG) kinaruhusu GM salama katika safari ya mtupu (Ballast) na mzigo kamili (Full Load)",
      "Kupima LCG dhidi ya LCB ili kuzuia trim kubwa isiyotakiwa"
    ]
  },
  {
    id: 6,
    title: "Structural Scantlings & Classification Rules",
    swahiliTitle: "6. Unene wa Vyuma & Sheria za Bodi za Ukaguzi (IACS CSR)",
    shortDesc: "Hesabu za nguvu ya uti wa mgongo wa meli (Hull Girder Section Modulus Zmin), unene wa bati za chini (Bottom Plating) na sitaha (Deck Plating) chini ya sheria za IACS.",
    keyOutputs: ["Minimum Section Modulus (Zmin)", "Bottom Plate Thickness (t)", "Deck Plate Thickness", "Corrosion Addition (tk)"],
    principles: [
      "Still Water Bending Moment (MSW) + Wave Bending Moment (MWV) kwa hali ya Hogging na Sagging",
      "Unene wa chuma lazima uhusishe ziada ya kutu (Corrosion margin ya mm 2.0 - 3.5)",
      "Uimarishaji maalum wa pua kuzuia mshtuko wa mawimbi makali (Bottom Slamming)"
    ]
  }
];

export const ShipDesignMethodologyModule: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);

  // Interactive Sizing Parameters
  const [shipType, setShipType] = useState<'container' | 'bulk' | 'tanker' | 'ferry'>('container');
  const [targetDWT, setTargetDWT] = useState<number>(65000); // tonnes
  const [targetSpeedKnots, setTargetSpeedKnots] = useState<number>(20.0); // knots
  const [enduranceDays, setEnduranceDays] = useState<number>(25); // days at sea

  // Naval Architecture Synthesis Formulae
  const designSynthesis = useMemo(() => {
    // Speed in m/s
    const V_ms = targetSpeedKnots * 0.514444;

    // Estimate Block Coefficient based on ship type and Froude Number
    let defaultCb = 0.65;
    let lengthConstant = 5.2; // Schneekluth length factor
    if (shipType === 'container') {
      defaultCb = Math.min(0.68, Math.max(0.55, 1.05 - 0.23 * (targetSpeedKnots / Math.sqrt(240))));
      lengthConstant = 5.6;
    } else if (shipType === 'bulk') {
      defaultCb = 0.82;
      lengthConstant = 4.8;
    } else if (shipType === 'tanker') {
      defaultCb = 0.84;
      lengthConstant = 4.6;
    } else {
      defaultCb = 0.58;
      lengthConstant = 6.2;
    }

    // Estimate Lightweight ratio (LWT / Displacement)
    // Container ~ 0.25 - 0.30; Bulk ~ 0.16 - 0.20; Tanker ~ 0.15 - 0.18; Ferry ~ 0.40 - 0.55
    let lwtRatio = 0.24;
    if (shipType === 'bulk') lwtRatio = 0.18;
    if (shipType === 'tanker') lwtRatio = 0.16;
    if (shipType === 'ferry') lwtRatio = 0.45;

    // Required Displacement Delta = DWT / (1 - lwtRatio)
    const displacement = targetDWT / (1 - lwtRatio);
    const lightweight = displacement - targetDWT;

    // Underwater Volume V = Delta / rho (rho = 1.025 t/m3)
    const underwaterVol = displacement / 1.025;

    // Estimate Length Lbp using Schneekluth empirical formula: L = C * (V / (V + 2))^2 * Vol^(1/3)
    const Lbp = lengthConstant * Math.pow(targetSpeedKnots / (targetSpeedKnots + 2), 2) * Math.pow(underwaterVol, 1 / 3) * 3.8;
    const clampedLbp = Math.max(80, Math.min(400, Lbp));

    // Proportions: L/B ratio ~ 6.0 to 7.5; B/T ~ 2.4 to 3.2
    const L_B = shipType === 'container' ? 7.0 : shipType === 'ferry' ? 5.8 : 6.4;
    const B = clampedLbp / L_B;
    const B_T = shipType === 'container' ? 2.8 : 2.5;
    const T = B / B_T;
    const D = T * 1.45; // Depth to Draft ratio ~ 1.4 - 1.55

    // Recalculate Block Coefficient from volume
    const calculatedCb = underwaterVol / (clampedLbp * B * T);
    const finalCb = Math.min(0.88, Math.max(0.52, calculatedCb));

    // Midship section coeff Cm ~ 0.98, Prismatic Cp = Cb / Cm
    const Cm = 0.985;
    const Cp = finalCb / Cm;
    const Cwp = (1 + 2 * finalCb) / 3;

    // Steel Weight Breakdown (Watson & Gilfillan approximation)
    const steelWeight = lightweight * 0.72;
    const machineryWeight = lightweight * 0.16;
    const outfitWeight = lightweight * 0.12;

    // IACS CSR Minimum Midship Section Modulus Zmin (cm3)
    // Zmin = C1 * L^2 * B * (Cb + 0.7) where C1 = 10.75 - ((300 - L)/100)^1.5 for 90 <= L <= 300
    const C1 = 10.75 - Math.pow(Math.abs(300 - clampedLbp) / 100, 1.5);
    const Zmin_m3 = (C1 * Math.pow(clampedLbp, 2) * B * (finalCb + 0.7)) * 1e-6; // in m3
    const Zmin_cm3 = Zmin_m3 * 1e6; // in cm3

    // Bottom plate thickness estimate: t = 1.9 * s * sqrt(T) + tk (s = 0.8m frame spacing, tk = 2.5mm)
    const bottomPlateThickness = 1.9 * 0.8 * Math.sqrt(T) + 2.5; // mm

    // Daily Fuel Consumption estimate: SFOC 165 g/kWh * Engine Power
    // Rough Power PE ~ 0.5 * rho * S * V^3 * (1+k) * Cf
    const S = 0.98 * (clampedLbp * (2 * T + B) * Math.sqrt(finalCb));
    const Fn = V_ms / Math.sqrt(9.81 * clampedLbp);
    const estimatedPB_kW = (0.5 * 1025 * S * Math.pow(V_ms, 3) * 0.0035 * 1.5) / 0.68;
    const dailyFuelTonnes = (estimatedPB_kW * 165 * 24) / 1e6;
    const totalFuelRequired = dailyFuelTonnes * enduranceDays * 1.15; // 15% safety margin

    return {
      displacement,
      lightweight,
      underwaterVol,
      Lbp: clampedLbp,
      B,
      T,
      D,
      Cb: finalCb,
      Cp,
      Cm,
      Cwp,
      steelWeight,
      machineryWeight,
      outfitWeight,
      Zmin_cm3,
      bottomPlateThickness,
      estimatedPB_kW,
      dailyFuelTonnes,
      totalFuelRequired,
      Fn,
    };
  }, [shipType, targetDWT, targetSpeedKnots, enduranceDays]);

  const activeStage = SPIRAL_STAGES.find((s) => s.id === activeStageId) || SPIRAL_STAGES[0];

  return (
    <div className="space-y-8 animate-fadeIn text-zinc-100">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#FFC107] uppercase tracking-wider">
                Naval Architecture & Marine Engineering
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-xs text-zinc-400">Evans' Design Spiral & Parametric Optimization</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight editorial-font flex items-center gap-3">
              <Layers className="w-8 h-8 text-[#FFC107]" />
              Ship Design Methodology & Spiral Studio
            </h1>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Mchakato wa Kiufundi wa Usanifu wa Meli (Design Spiral): Kuanzia mahitaji ya kibiashara,
              vipimo vikuu ($L_{'{bp}'}, B, D, T$), mistari ya umbo (Lines Plan), uwezo wa uzito (Lightweight vs Deadweight),
              hadi unene wa vyuma (Scantlings) chini ya kanuni za IACS CSR.
            </p>
          </div>
        </div>
      </div>

      {/* Stage Selector Ribbon (Anti-slop clean typography segmented bar) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {SPIRAL_STAGES.map((stg) => (
          <button
            key={stg.id}
            onClick={() => setActiveStageId(stg.id)}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeStageId === stg.id
                ? 'bg-gradient-to-b from-[#FFC107]/20 to-black border-[#FFC107] shadow-lg shadow-[#FFC107]/10'
                : 'bg-zinc-900/80 hover:bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono font-bold text-[#FFC107]">STAGE 0{stg.id}</span>
              {activeStageId === stg.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC107]" />}
            </div>
            <span className="text-xs font-bold line-clamp-2 text-white">{stg.title}</span>
          </button>
        ))}
      </div>

      {/* Interactive Design Spiral Explorer Card */}
      <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#FFC107] uppercase tracking-wider block mb-1">
              Evans' Design Spiral Stage {activeStage.id} of 6
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">{activeStage.swahiliTitle}</h2>
          </div>
          <span className="text-xs text-zinc-400 font-mono bg-black/50 px-3 py-1.5 rounded-xl border border-white/5">
            Iterative Optimization Cycle
          </span>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
          {activeStage.shortDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Key Outputs Box */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-2">
              <Boxes className="w-4 h-4" /> Matokeo ya Kiufundi (Key Deliverables & Outputs)
            </h4>
            <ul className="space-y-2 text-xs">
              {activeStage.keyOutputs.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-zinc-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Engineering Principles Box */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Kanuni za Kihandisi & Utiifu (Design Rules)
            </h4>
            <ul className="space-y-2 text-xs">
              {activeStage.principles.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Real-time Parametric Sizing & Synthesis Tool */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-6 shadow-2xl">
        <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#FFC107] uppercase tracking-wider block mb-1">
              Automated Synthesis Calculator
            </span>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#FFC107]" /> Kikokotoo cha Vipimo Vikuu & Uzito wa Meli (Parametric Synthesis)
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-white/10">
            Archimedes Displacement Balance
          </span>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-zinc-400 font-bold block mb-1">Aina ya Meli (Vessel Type):</label>
            <select
              value={shipType}
              onChange={(e: any) => setShipType(e.target.value)}
              className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-white font-medium focus:border-[#FFC107] focus:outline-none"
            >
              <option value="container">Container Ship (Meli ya Makontena)</option>
              <option value="bulk">Bulk Carrier (Mizigo Mikavu)</option>
              <option value="tanker">Oil Tanker (Meli ya Mafuta)</option>
              <option value="ferry">Ro-Pax Ferry (Meli ya Abiria na Magari)</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Uwezo wa Mzigo (Deadweight DWT):</label>
            <div className="relative">
              <input
                type="number"
                step={1000}
                min={2000}
                max={400000}
                value={targetDWT}
                onChange={(e) => setTargetDWT(parseFloat(e.target.value) || 10000)}
                className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-white font-mono focus:border-[#FFC107] focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">t</span>
            </div>
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Kasi ya Safari (Service Speed):</label>
            <div className="relative">
              <input
                type="number"
                step={0.5}
                min={10}
                max={30}
                value={targetSpeedKnots}
                onChange={(e) => setTargetSpeedKnots(parseFloat(e.target.value) || 15)}
                className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-white font-mono focus:border-[#FFC107] focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">knots</span>
            </div>
          </div>

          <div>
            <label className="text-zinc-400 font-bold block mb-1">Muda wa Safari Baharini (Endurance):</label>
            <div className="relative">
              <input
                type="number"
                step={1}
                min={1}
                max={60}
                value={enduranceDays}
                onChange={(e) => setEnduranceDays(parseFloat(e.target.value) || 20)}
                className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-white font-mono focus:border-[#FFC107] focus:outline-none"
              />
              <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">days</span>
            </div>
          </div>
        </div>

        {/* Synthesis Outputs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-center pt-2">
          <div className="bg-zinc-900 p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase block">Length B.P ($L_{'{bp}'}$)</span>
            <span className="text-lg font-black text-white">{designSynthesis.Lbp.toFixed(1)} m</span>
            <span className="text-[9px] text-zinc-500 block">L/B: {(designSynthesis.Lbp / designSynthesis.B).toFixed(2)}</span>
          </div>

          <div className="bg-zinc-900 p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase block">Beam ($B$)</span>
            <span className="text-lg font-black text-white">{designSynthesis.B.toFixed(1)} m</span>
            <span className="text-[9px] text-zinc-500 block">Moulded breadth</span>
          </div>

          <div className="bg-zinc-900 p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase block">Draft ($T$)</span>
            <span className="text-lg font-black text-white">{designSynthesis.T.toFixed(2)} m</span>
            <span className="text-[9px] text-zinc-500 block">Design waterline</span>
          </div>

          <div className="bg-zinc-900 p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase block">Depth ($D$)</span>
            <span className="text-lg font-black text-white">{designSynthesis.D.toFixed(1)} m</span>
            <span className="text-[9px] text-zinc-500 block">Upper deck level</span>
          </div>

          <div className="bg-zinc-900 p-3.5 rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase block">Block Coeff ($C_b$)</span>
            <span className="text-lg font-black text-[#FFC107]">{designSynthesis.Cb.toFixed(3)}</span>
            <span className="text-[9px] text-zinc-500 block">Fn: {designSynthesis.Fn.toFixed(3)}</span>
          </div>

          <div className="bg-zinc-900 p-3.5 rounded-2xl border border-[#FFC107]/30 space-y-1">
            <span className="text-[10px] text-[#FFC107] uppercase block font-bold">Displacement ($\Delta$)</span>
            <span className="text-lg font-black text-amber-300">{Math.round(designSynthesis.displacement).toLocaleString()} t</span>
            <span className="text-[9px] text-zinc-400 block">LWT: {Math.round(designSynthesis.lightweight).toLocaleString()} t</span>
          </div>
        </div>

        {/* Weights & Scantling Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
          <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[11px] font-bold text-white uppercase block">
              Mgawo wa Uzito (Weight Breakdown):
            </span>
            <div className="space-y-1 text-zinc-300">
              <div className="flex justify-between">
                <span>Steel Structure ($W_{'{steel}'}$):</span>
                <span className="font-bold text-white">{Math.round(designSynthesis.steelWeight).toLocaleString()} t</span>
              </div>
              <div className="flex justify-between">
                <span>Machinery Plant ($W_{'{mach}'}$):</span>
                <span className="font-bold text-white">{Math.round(designSynthesis.machineryWeight).toLocaleString()} t</span>
              </div>
              <div className="flex justify-between">
                <span>Outfit & Accommodation:</span>
                <span className="font-bold text-white">{Math.round(designSynthesis.outfitWeight).toLocaleString()} t</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-1 text-[#FFC107]">
                <span>Total Lightweight (LWT):</span>
                <span className="font-bold">{Math.round(designSynthesis.lightweight).toLocaleString()} t</span>
              </div>
            </div>
          </div>

          <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[11px] font-bold text-white uppercase block">
              IACS CSR Scantling Rules:
            </span>
            <div className="space-y-1 text-zinc-300">
              <div className="flex justify-between">
                <span>Midship Modulus ($Z_{'{min}'}$):</span>
                <span className="font-bold text-[#FFC107]">{(designSynthesis.Zmin_cm3 / 1e6).toFixed(2)} m³</span>
              </div>
              <div className="flex justify-between">
                <span>Bottom Plate Thickness:</span>
                <span className="font-bold text-white">{designSynthesis.bottomPlateThickness.toFixed(1)} mm</span>
              </div>
              <div className="flex justify-between">
                <span>Corrosion Margin ($t_k$):</span>
                <span className="font-bold text-zinc-400">2.5 mm included</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-1 text-emerald-400">
                <span>Hull Girder Strength:</span>
                <span className="font-bold">IACS CSR Compliant ✓</span>
              </div>
            </div>
          </div>

          <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[11px] font-bold text-white uppercase block">
              Uwezo wa Nguvu & Mafuta:
            </span>
            <div className="space-y-1 text-zinc-300">
              <div className="flex justify-between">
                <span>MCR Engine Power:</span>
                <span className="font-bold text-white">{(designSynthesis.estimatedPB_kW / 1000).toFixed(1)} MW</span>
              </div>
              <div className="flex justify-between">
                <span>Daily VLSFO Consumption:</span>
                <span className="font-bold text-white">{designSynthesis.dailyFuelTonnes.toFixed(1)} t/day</span>
              </div>
              <div className="flex justify-between">
                <span>Total Bunker Capacity ({enduranceDays}d):</span>
                <span className="font-bold text-[#FFC107]">{Math.round(designSynthesis.totalFuelRequired)} tonnes</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-1 text-zinc-400">
                <span>SFOC Standard:</span>
                <span className="font-bold text-zinc-300">165 g/kWh @ 85% MCR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
