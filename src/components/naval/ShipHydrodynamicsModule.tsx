import React, { useState, useMemo } from 'react';
import {
  Waves,
  Gauge,
  Zap,
  Activity,
  RotateCcw,
  Info,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Compass
} from 'lucide-react';

interface ShipPreset {
  name: string;
  type: string;
  Lbp: number; // m
  B: number; // m
  T: number; // m
  Cb: number;
  S: number; // wetted surface area m2
  k: number; // form factor
  serviceSpeedKnots: number;
  propellerDiam: number; // m
}

const SHIP_PRESETS: ShipPreset[] = [
  {
    name: '15,000 TEU Neo-Panamax Container Ship',
    type: 'Container',
    Lbp: 350.0,
    B: 51.2,
    T: 14.5,
    Cb: 0.62,
    S: 24500,
    k: 0.14,
    serviceSpeedKnots: 21.5,
    propellerDiam: 9.8,
  },
  {
    name: '300,000 DWT VLCC Crude Oil Tanker',
    type: 'Tanker',
    Lbp: 320.0,
    B: 60.0,
    T: 20.8,
    Cb: 0.83,
    S: 31200,
    k: 0.22,
    serviceSpeedKnots: 15.0,
    propellerDiam: 10.2,
  },
  {
    name: '82,000 DWT Kamsarmax Bulk Carrier',
    type: 'Bulk Carrier',
    Lbp: 224.0,
    B: 32.26,
    T: 14.45,
    Cb: 0.84,
    S: 14800,
    k: 0.20,
    serviceSpeedKnots: 14.2,
    propellerDiam: 7.2,
  },
  {
    name: '174,000 m³ LNG Carrier (Twin Skeg)',
    type: 'LNG Carrier',
    Lbp: 285.0,
    B: 45.8,
    T: 11.8,
    Cb: 0.72,
    S: 18600,
    k: 0.16,
    serviceSpeedKnots: 19.5,
    propellerDiam: 8.4,
  },
  {
    name: '120m Coastal Ro-Pax Passenger Ferry',
    type: 'Passenger / Ro-Pax',
    Lbp: 112.0,
    B: 20.4,
    T: 4.8,
    Cb: 0.58,
    S: 3100,
    k: 0.12,
    serviceSpeedKnots: 18.0,
    propellerDiam: 3.6,
  },
];

export const ShipHydrodynamicsModule: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const currentPreset = SHIP_PRESETS[selectedPresetIndex];

  // User Adjustable Dimensions & Speed
  const [Lbp, setLbp] = useState<number>(currentPreset.Lbp);
  const [B, setB] = useState<number>(currentPreset.B);
  const [T, setT] = useState<number>(currentPreset.T);
  const [Cb, setCb] = useState<number>(currentPreset.Cb);
  const [S, setS] = useState<number>(currentPreset.S);
  const [k, setK] = useState<number>(currentPreset.k);
  const [speedKnots, setSpeedKnots] = useState<number>(currentPreset.serviceSpeedKnots);
  const [seaMarginPct, setSeaMarginPct] = useState<number>(15); // standard 15%
  const [waveHeight, setWaveHeight] = useState<number>(2.5); // meters for seakeeping
  const [waveHeadingDeg, setWaveHeadingDeg] = useState<number>(180); // 180 = head seas

  // Water constants
  const rho = 1025; // kg/m^3 (sea water)
  const g = 9.80665; // m/s^2
  const nu = 1.188e-6; // kinematic viscosity at 15°C m^2/s

  // Apply preset handler
  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    const p = SHIP_PRESETS[idx];
    setLbp(p.Lbp);
    setB(p.B);
    setT(p.T);
    setCb(p.Cb);
    setS(p.S);
    setK(p.k);
    setSpeedKnots(p.serviceSpeedKnots);
  };

  // Hydrodynamic calculations
  const hydroData = useMemo(() => {
    const V_ms = speedKnots * 0.514444; // m/s
    const Fn = V_ms / Math.sqrt(g * Lbp); // Froude number
    const Rn = (V_ms * Lbp) / nu; // Reynolds number

    // ITTC 1957 Friction Line
    const logRn = Math.log10(Rn);
    const Cf = 0.075 / Math.pow(logRn - 2, 2);

    // Frictional Resistance (kN)
    const Rf = 0.5 * rho * S * Math.pow(V_ms, 2) * Cf * 1e-3;

    // Viscous Form Resistance (kN)
    const formFactor = 1 + k;
    const Rv = formFactor * Rf;

    // Wave-making resistance approximation based on Holtrop-Mennen Fn/Cb formulation
    // Characteristic hump at Fn ~ 0.28 - 0.32
    const FnExp = Math.pow(Fn, 4.5);
    const Cw = 0.0015 * Math.pow(Cb, 2) * Math.exp(12 * (Fn - 0.2)) * (1 + 0.1 * Math.sin(Fn * 30));
    const normalizedCw = Math.max(0.0001, Cw);
    const Rw = 0.5 * rho * S * Math.pow(V_ms, 2) * normalizedCw * 1e-3;

    // Appendage & Windage resistance
    const Rapp = 0.03 * (Rf + Rw);
    const Rair = 0.025 * (Rf + Rw);

    // Total Resistance
    const Rt = Rv + Rw + Rapp + Rair;

    // Effective Power (PE in kW)
    const PE = Rt * V_ms;

    // Propulsive Efficiencies (Empirical Holtrop correlation)
    const wakeFraction_w = 0.5 * Cb - 0.05;
    const thrustDeduction_t = 0.6 * wakeFraction_w;
    const eta_H = (1 - thrustDeduction_t) / (1 - wakeFraction_w); // Hull efficiency
    const eta_O = 0.62 - 0.05 * (Cb - 0.6); // Propeller open water efficiency
    const eta_R = 1.01; // Relative rotative efficiency
    const eta_D = eta_H * eta_O * eta_R; // Quasi-propulsive coefficient

    // Delivered Power (PD) & Brake Power (PB)
    const PD = PE / eta_D;
    const eta_Shaft = 0.985;
    const PB_clean = PD / eta_Shaft;
    const PB_service = PB_clean * (1 + seaMarginPct / 100);
    const BHP_service = PB_service * 1.34102; // Metric HP / BHP

    // Seakeeping metrics
    const waveLength = 1.56 * Math.pow(7, 2); // deep water ~ 76m typical
    const waveSpeed = Math.sqrt((g * waveLength) / (2 * Math.PI));
    const omega0 = Math.sqrt((2 * Math.PI * g) / waveLength);
    const headingRad = (waveHeadingDeg * Math.PI) / 180;
    // Encounter frequency omega_e = omega_0 - (omega_0^2 * V / g) * cos(mu)
    const omega_e = Math.abs(omega0 - ((Math.pow(omega0, 2) * V_ms) / g) * Math.cos(headingRad));
    const Te = (2 * Math.PI) / (omega_e || 1);

    // Natural roll period estimate: Tr = (2 * pi * kxx) / sqrt(g * GM)
    const kxx = 0.38 * B; // transverse radius of gyration
    const estimatedGM = Math.max(0.6, 0.06 * B);
    const Tr = (2 * Math.PI * kxx) / Math.sqrt(g * estimatedGM);

    // Parametric roll risk check (if Te ~ 0.5 Tr and wave height > 2m in head/following seas)
    const ratioRoll = Te / Tr;
    const isParametricRollRisk =
      (waveHeadingDeg >= 160 || waveHeadingDeg <= 20) &&
      waveHeight >= 3.0 &&
      Math.abs(ratioRoll - 0.5) < 0.15;

    // Generate resistance curve points across speeds (8 to 26 knots)
    const curvePoints: { speed: number; Rf: number; Rw: number; Rt: number; Pe: number }[] = [];
    for (let s = 8; s <= 26; s += 1.5) {
      const v = s * 0.514444;
      const fn_i = v / Math.sqrt(g * Lbp);
      const rn_i = (v * Lbp) / nu;
      const cf_i = 0.075 / Math.pow(Math.log10(rn_i) - 2, 2);
      const rf_i = 0.5 * rho * S * Math.pow(v, 2) * cf_i * 1e-3;
      const cw_i = Math.max(0.0001, 0.0015 * Math.pow(Cb, 2) * Math.exp(12 * (fn_i - 0.2)) * (1 + 0.1 * Math.sin(fn_i * 30)));
      const rw_i = 0.5 * rho * S * Math.pow(v, 2) * cw_i * 1e-3;
      const rt_i = formFactor * rf_i + rw_i + 0.055 * (rf_i + rw_i);
      const pe_i = rt_i * v;
      curvePoints.push({ speed: s, Rf: formFactor * rf_i, Rw: rw_i, Rt: rt_i, Pe: pe_i });
    }

    return {
      V_ms,
      Fn,
      Rn,
      Cf,
      Rf,
      Rv,
      Cw: normalizedCw,
      Rw,
      Rapp,
      Rair,
      Rt,
      PE,
      wakeFraction_w,
      thrustDeduction_t,
      eta_H,
      eta_O,
      eta_R,
      eta_D,
      PD,
      PB_clean,
      PB_service,
      BHP_service,
      omega_e,
      Te,
      Tr,
      isParametricRollRisk,
      curvePoints,
    };
  }, [Lbp, B, T, Cb, S, k, speedKnots, seaMarginPct, waveHeight, waveHeadingDeg]);

  // Max values for SVG scaling
  const maxRt = Math.max(...hydroData.curvePoints.map((p) => p.Rt), 1);
  const maxPe = Math.max(...hydroData.curvePoints.map((p) => p.Pe), 1);

  return (
    <div className="space-y-8 animate-fadeIn text-zinc-100">
      {/* Module Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#FFC107] uppercase tracking-wider">
                Naval Architecture & Ocean Engineering
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-xs text-zinc-400">ITTC 1957 & Holtrop-Mennen</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight editorial-font flex items-center gap-3">
              <Waves className="w-8 h-8 text-[#FFC107]" />
              Ship Hydrodynamics & Resistance Module
            </h1>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Hesabu za nguvu ya kusukuma meli (Total Resistance $R_T$), Wave-Making Resistance ($R_W$),
              Frictional Viscous Drag (ITTC 1957 Line), na Makadirio ya Nguvu ya Injini ($P_E$, $P_D$, $P_B$ na BHP).
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div className="w-full md:w-80 space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Chagua Muundo wa Meli (Vessel Preset):
            </label>
            <select
              value={selectedPresetIndex}
              onChange={(e) => handleSelectPreset(Number(e.target.value))}
              className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white font-medium focus:outline-none focus:border-[#FFC107] transition-all"
            >
              {SHIP_PRESETS.map((p, idx) => (
                <option key={idx} value={idx}>
                  {p.name}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-zinc-500 flex justify-between px-1">
              <span>{currentPreset.type}</span>
              <span className="text-[#FFC107] font-mono">{currentPreset.serviceSpeedKnots} kn @ MCR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls vs Visual Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Hull & Operating Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FFC107]" /> Vigezo vya Hull & Uendeshaji
              </h3>
              <button
                onClick={() => handleSelectPreset(selectedPresetIndex)}
                className="text-[11px] text-zinc-400 hover:text-[#FFC107] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Rejesha Preset
              </button>
            </div>

            {/* Speed Slider */}
            <div className="space-y-2 p-4 rounded-xl bg-black/60 border border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-[#FFC107]" /> Kasi ya Meli (Service Speed):
                </span>
                <span className="font-mono text-base font-black text-[#FFC107]">
                  {speedKnots.toFixed(1)} knots{' '}
                  <span className="text-xs text-zinc-400 font-normal">({hydroData.V_ms.toFixed(2)} m/s)</span>
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={26}
                step={0.2}
                value={speedKnots}
                onChange={(e) => setSpeedKnots(parseFloat(e.target.value))}
                className="w-full accent-[#FFC107] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>8.0 kn (Maneuvering)</span>
                <span>18.0 kn (Eco)</span>
                <span>26.0 kn (Max High Speed)</span>
              </div>
            </div>

            {/* Dimension Fields */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Length B.P ($L_{'{bp}'}$):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={Lbp}
                    onChange={(e) => setLbp(Math.max(10, parseFloat(e.target.value) || 10))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Beam Moulded ($B$):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={B}
                    onChange={(e) => setB(Math.max(2, parseFloat(e.target.value) || 2))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Design Draft ($T$):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={T}
                    onChange={(e) => setT(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Block Coeff ($C_b$):</label>
                <input
                  type="number"
                  step={0.01}
                  min={0.45}
                  max={0.9}
                  value={Cb}
                  onChange={(e) => setCb(parseFloat(e.target.value) || 0.65)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Wetted Surface ($S$):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={S}
                    onChange={(e) => setS(Math.max(100, parseFloat(e.target.value) || 100))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m²</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Form Factor ($1+k$):</label>
                <input
                  type="number"
                  step={0.01}
                  min={1.05}
                  max={1.4}
                  value={1 + k}
                  onChange={(e) => setK((parseFloat(e.target.value) || 1.15) - 1)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                />
              </div>
            </div>

            {/* Sea Margin & Environmental Inputs */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-300 font-bold">Sea Margin (Upepo & Mawimbi):</span>
                <span className="font-mono text-[#FFC107] font-bold">{seaMarginPct}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={25}
                step={1}
                value={seaMarginPct}
                onChange={(e) => setSeaMarginPct(parseInt(e.target.value))}
                className="w-full accent-[#FFC107] cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Significant Wave $H_s$:</label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.5}
                      min={0.5}
                      max={12}
                      value={waveHeight}
                      onChange={(e) => setWaveHeight(parseFloat(e.target.value) || 2.5)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 font-bold block mb-1">Wave Heading ($\mu$):</label>
                  <select
                    value={waveHeadingDeg}
                    onChange={(e) => setWaveHeadingDeg(Number(e.target.value))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  >
                    <option value={180}>180° Head Seas (Mbele)</option>
                    <option value={135}>135° Bow Quartering</option>
                    <option value={90}>90° Beam Seas (Ubavuni)</option>
                    <option value={45}>45° Stern Quartering</option>
                    <option value={0}>0° Following Seas (Nyuma)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Dimensionless Numbers Card */}
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">
              Vipimo Visivyo na Vipande (Dimensionless Numbers)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                <span className="text-zinc-400 block text-[10px]">Froude Number ($F_n$):</span>
                <span className="text-lg font-black text-[#FFC107]">{hydroData.Fn.toFixed(3)}</span>
                <span className="block text-[10px] text-zinc-500 mt-1">
                  {hydroData.Fn < 0.25 ? 'Displacement Regime' : hydroData.Fn < 0.4 ? 'Semi-Displacement' : 'Planing'}
                </span>
              </div>

              <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                <span className="text-zinc-400 block text-[10px]">Reynolds Number ($R_n$):</span>
                <span className="text-base font-black text-white">{hydroData.Rn.toExponential(3)}</span>
                <span className="block text-[10px] text-emerald-400 mt-1">Fully Turbulent Boundary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Results, Efficiencies, Power Breakdown & Curve */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Power KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-1 shadow">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                Total Resistance ($R_T$)
              </span>
              <div className="text-2xl font-mono font-black text-white">
                {hydroData.Rt.toFixed(1)}{' '}
                <span className="text-xs font-normal text-zinc-400">kN</span>
              </div>
              <span className="text-[10px] text-zinc-500">
                Friction: {hydroData.Rf.toFixed(0)} kN · Wave: {hydroData.Rw.toFixed(0)} kN
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-1 shadow">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                Effective Power ($P_E$)
              </span>
              <div className="text-2xl font-mono font-black text-[#FFC107]">
                {(hydroData.PE / 1000).toFixed(2)}{' '}
                <span className="text-xs font-normal text-zinc-400">MW</span>
              </div>
              <span className="text-[10px] text-zinc-500">Towing power requirement</span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-black border border-[#FFC107]/40 space-y-1 shadow-lg">
              <span className="text-[10px] font-black text-[#FFC107] uppercase tracking-widest block">
                Brake Engine Power ($P_B$)
              </span>
              <div className="text-2xl font-mono font-black text-amber-300">
                {(hydroData.PB_service / 1000).toFixed(2)}{' '}
                <span className="text-xs font-normal text-amber-200">MW</span>
              </div>
              <span className="text-[10px] text-amber-200/70 font-mono">
                {Math.round(hydroData.BHP_service).toLocaleString()} BHP @ Sea Margin
              </span>
            </div>
          </div>

          {/* Interactive Resistance Breakdown SVG Graph */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#FFC107]" /> Mchoro wa Resistance & Nguvu dhidi ya Kasi (Speed vs Resistance)
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Uhusiano wa $R_F$ (Frictional), $R_W$ (Wave Making) na $R_T$ (Total Drag).
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> Frictional ($R_F$)
                </span>
                <span className="flex items-center gap-1 text-blue-400">
                  <span className="w-2.5 h-0.5 bg-blue-400 inline-block" /> Wave ($R_W$)
                </span>
                <span className="flex items-center gap-1 text-[#FFC107]">
                  <span className="w-2.5 h-1 bg-[#FFC107] inline-block" /> Total ($R_T$)
                </span>
              </div>
            </div>

            {/* SVG Plot */}
            <div className="w-full h-64 bg-black/60 rounded-xl border border-white/5 p-3 relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                {/* Horizontal Gridlines */}
                {[0, 50, 100, 150].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="500"
                    y2={y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray="3 3"
                  />
                ))}

                {/* Frictional Line (Emerald) */}
                <path
                  d={hydroData.curvePoints
                    .map((pt, i) => {
                      const x = (i / (hydroData.curvePoints.length - 1)) * 500;
                      const y = 190 - (pt.Rf / maxRt) * 175;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                />

                {/* Wave Making Line (Blue) */}
                <path
                  d={hydroData.curvePoints
                    .map((pt, i) => {
                      const x = (i / (hydroData.curvePoints.length - 1)) * 500;
                      const y = 190 - (pt.Rw / maxRt) * 175;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                />

                {/* Total Resistance Line (Gold Thick) */}
                <path
                  d={hydroData.curvePoints
                    .map((pt, i) => {
                      const x = (i / (hydroData.curvePoints.length - 1)) * 500;
                      const y = 190 - (pt.Rt / maxRt) * 175;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#FFC107"
                  strokeWidth="3.5"
                />

                {/* Current Operating Point Marker */}
                {(() => {
                  const currentRatio = (speedKnots - 8) / (26 - 8);
                  const currentX = Math.min(500, Math.max(0, currentRatio * 500));
                  const currentY = 190 - (hydroData.Rt / maxRt) * 175;
                  return (
                    <g>
                      <line
                        x1={currentX}
                        y1="0"
                        x2={currentX}
                        y2="200"
                        stroke="#FFC107"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <circle cx={currentX} cy={currentY} r="6" fill="#FFC107" stroke="#000" strokeWidth="2" />
                      <text
                        x={currentX > 350 ? currentX - 110 : currentX + 10}
                        y={Math.max(20, currentY - 10)}
                        fill="#FFC107"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {speedKnots.toFixed(1)} kn: {hydroData.Rt.toFixed(0)} kN
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono px-2">
              <span>8.0 kn</span>
              <span>12.0 kn</span>
              <span>16.0 kn</span>
              <span>20.0 kn</span>
              <span>24.0 kn</span>
              <span>26.0 kn</span>
            </div>
          </div>

          {/* Propulsion Chain Efficiencies breakdown */}
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FFC107]" /> Mnyororo wa Ufanisi wa Usukumaji (Propulsion Efficiency Chain)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
              <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-400 block">Hull Eff ($\eta_H$)</span>
                <span className="text-sm font-bold text-white">{hydroData.eta_H.toFixed(3)}</span>
                <span className="text-[9px] text-zinc-500 block">w: {hydroData.wakeFraction_w.toFixed(2)}</span>
              </div>

              <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-400 block">Open Water ($\eta_O$)</span>
                <span className="text-sm font-bold text-white">{hydroData.eta_O.toFixed(3)}</span>
                <span className="text-[9px] text-zinc-500 block">Propeller in open</span>
              </div>

              <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-zinc-400 block">Rotative ($\eta_R$)</span>
                <span className="text-sm font-bold text-white">{hydroData.eta_R.toFixed(3)}</span>
                <span className="text-[9px] text-zinc-500 block">Behind hull flow</span>
              </div>

              <div className="bg-black/50 p-2.5 rounded-xl border border-[#FFC107]/20">
                <span className="text-[10px] text-[#FFC107] block font-bold">Quasi-Prop ($\eta_D$)</span>
                <span className="text-sm font-black text-[#FFC107]">{hydroData.eta_D.toFixed(3)}</span>
                <span className="text-[9px] text-zinc-400 block">Overall propulsive</span>
              </div>
            </div>
          </div>

          {/* Seakeeping & Wave Dynamics Alert */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              hydroData.isParametricRollRisk
                ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                : 'bg-zinc-900 border-white/10 text-zinc-300'
            }`}
          >
            <div className="flex items-start gap-3">
              {hydroData.isParametricRollRisk ? (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="text-xs font-black uppercase tracking-wider text-white">
                    Seakeeping & Parametric Rolling Assessment
                  </h5>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40">
                    Wave Encounter $T_e$: {hydroData.Te.toFixed(1)}s · Natural Roll $T_r$: {hydroData.Tr.toFixed(1)}s
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-zinc-400">
                  {hydroData.isParametricRollRisk
                    ? 'HATARI YA PARAMETRIC ROLLING: Kipindi cha mawimbi (Te) kinalingana na nusu ya kipindi asili cha roll (Te ≈ 0.5 Tr) kwenye mawimbi ya mbele yenye kimo zaidi ya mita 3. Shauri: Badilisha speed au badilisha kozi (heading) kwa digrii 15-20 mara moja.'
                    : 'Hali ya utulivu wa meli (Seakeeping) iko salama. Hakuna mshikamano hatari wa synchronous roll au parametric resonance chini ya hali hii ya mawimbi.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
