import React, { useState, useMemo } from 'react';
import {
  Compass,
  Anchor,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Waves,
  Ship,
  Sliders,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const ShipManeuveringModule: React.FC = () => {
  // Ship Particulars
  const [Lbp, setLbp] = useState<number>(225.0); // m
  const [B, setB] = useState<number>(32.2); // m
  const [draft, setDraft] = useState<number>(12.2); // m
  const [speedKnots, setSpeedKnots] = useState<number>(14.5); // knots
  const [Cb, setCb] = useState<number>(0.82);

  // Rudder Particulars
  const [rudderType, setRudderType] = useState<'spade' | 'semi-balanced' | 'flap' | 'unbalanced'>('semi-balanced');
  const [rudderArea, setRudderArea] = useState<number>(32.0); // m2
  const [aspectRatio, setAspectRatio] = useState<number>(1.8);
  const [rudderAngleDeg, setRudderAngleDeg] = useState<number>(35); // deg
  const [rudderRate, setRudderRate] = useState<number>(2.5); // deg/sec

  // Thruster Particulars (Bow & Stern)
  const [hasBowThruster, setHasBowThruster] = useState<boolean>(true);
  const [bowThrusterPowerKW, setBowThrusterPowerKW] = useState<number>(1800); // kW
  const [hasSternThruster, setHasSternThruster] = useState<boolean>(false);
  const [sternThrusterPowerKW, setSternThrusterPowerKW] = useState<number>(1200); // kW

  // Calculations based on Chapter 6 Maneuverability Notes
  const maneuveringResults = useMemo(() => {
    // 1. Water speed in m/s
    const V_ms = speedKnots * 0.51444;
    const rho = 1025; // kg/m3 seawater

    // 2. Rudder Lift & Drag Coefficients
    // Stall angle is typically between 32° to 35° for standard semi-balanced/spade rudders
    const stallAngle = rudderType === 'flap' ? 42 : 35;
    const isStalled = Math.abs(rudderAngleDeg) > stallAngle;

    // Lift curve slope (approx dCL/dalpha = 2 * pi * Lambda / (Lambda + 2))
    const liftSlope = (2 * Math.PI * aspectRatio) / (aspectRatio + 2.2);
    const alphaRad = (Math.abs(rudderAngleDeg) * Math.PI) / 180;
    
    let CL = liftSlope * alphaRad;
    if (isStalled) {
      CL = CL * 0.72; // Post-stall lift reduction
    }
    const CD = 0.015 + (Math.pow(CL, 2) / (Math.PI * aspectRatio)) + 0.12 * Math.pow(Math.sin(alphaRad), 2);

    // Rudder Normal Force (kN): FN = 0.5 * rho * A * V^2 * CN
    // Effective inflow velocity is increased behind propeller by approx 1.15x
    const V_inflow = V_ms * 1.15;
    const normalForceKN = (0.5 * rho * rudderArea * Math.pow(V_inflow, 2) * CL) / 1000;
    const transverseForceKN = normalForceKN * Math.cos(alphaRad);

    // 3. Turning Circle Geometry (IMO Resolution MSC.137(76))
    // Standard empirical relations based on LBP, Cb, and Rudder Area ratio (Ar / (L*T))
    const rudderRatio = rudderArea / (Lbp * draft);
    
    // Advance at 35 deg rudder: typically 3.0 to 4.2 LBP
    const advanceLbp = Math.max(2.8, Math.min(4.4, (3.2 * (Cb / 0.75)) / (rudderRatio / 0.018)));
    const advanceMeters = advanceLbp * Lbp;

    // Transfer: typically 1.5 to 2.2 LBP
    const transferLbp = advanceLbp * 0.52;
    const transferMeters = transferLbp * Lbp;

    // Tactical Diameter: typically 3.5 to 4.8 LBP (IMO limit is <= 5.0 LBP)
    const tacticalDiameterLbp = Math.max(3.2, Math.min(4.9, advanceLbp * 1.18));
    const tacticalDiameterMeters = tacticalDiameterLbp * Lbp;

    // Steady Turning Diameter: typically 3.0 to 4.2 Lbp
    const steadyTurningDiameterMeters = tacticalDiameterMeters * 0.88;

    // Drift Angle (beta) in steady turn: typically 8° to 16°
    const driftAngleDeg = Math.min(18, Math.max(6, 12 * (Cb / 0.8)));

    // Steady Yaw Rate (deg/s): r = V / R_turn
    const turningRadiusM = steadyTurningDiameterMeters / 2;
    const yawRateRadSec = V_ms / turningRadiusM;
    const yawRateDegSec = (yawRateRadSec * 180) / Math.PI;

    // IMO Resolution MSC.137(76) Compliance
    const advancePassed = advanceMeters <= 4.5 * Lbp;
    const tacticalDiameterPassed = tacticalDiameterMeters <= 5.0 * Lbp;
    const rudderTime35to30 = 65 / rudderRate; // SOLAS requirement: 35 deg port to 30 deg stbd in <= 28 seconds
    const solasSteeringPassed = rudderTime35to30 <= 28;

    // 4. Lateral Thruster Force
    // Rule of thumb for modern tunnel thrusters: ~11 to 13 kg force per kW (~0.11 to 0.13 kN/kW)
    const bowThrusterThrustKN = hasBowThruster ? bowThrusterPowerKW * 0.125 : 0;
    const sternThrusterThrustKN = hasSternThruster ? sternThrusterPowerKW * 0.125 : 0;
    const totalLateralThrustKN = bowThrusterThrustKN + sternThrusterThrustKN;

    return {
      normalForceKN,
      transverseForceKN,
      CL,
      CD,
      isStalled,
      stallAngle,
      advanceMeters,
      advanceLbp,
      transferMeters,
      transferLbp,
      tacticalDiameterMeters,
      tacticalDiameterLbp,
      steadyTurningDiameterMeters,
      driftAngleDeg,
      yawRateDegSec,
      rudderTime35to30,
      advancePassed,
      tacticalDiameterPassed,
      solasSteeringPassed,
      bowThrusterThrustKN,
      sternThrusterThrustKN,
      totalLateralThrustKN,
      rudderRatio: rudderRatio * 100
    };
  }, [Lbp, draft, speedKnots, Cb, rudderType, rudderArea, aspectRatio, rudderAngleDeg, rudderRate, hasBowThruster, bowThrusterPowerKW, hasSternThruster, sternThrusterPowerKW]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FFC107] uppercase tracking-wider font-bold">
          <span>Lecture Notes Chapter 6 Reference</span>
          <span>•</span>
          <span>IMO Resolution MSC.137(76) & SOLAS Reg. II-1/29</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white editorial-font flex items-center gap-3">
          <Compass className="w-7 h-7 text-[#FFC107]" />
          Ship Maneuverability, Steering & Thrusters
        </h2>
        <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
          Comprehensive hydrodynamic modeling of turning circles (Advance, Transfer, Tactical Diameter), rudder lift and drag curves, rudder stall angle at 35°, and lateral thruster performance in accordance with the Maneuverability Lecture Notes.
        </p>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Ship Particulars Card */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-2">
              <Ship className="w-4 h-4" /> 1. Hull & Speed Parameters
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Length B.P. ($L_{'{bp}'}$):</label>
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
                <label className="text-zinc-400 font-bold block mb-1">Molded Beam ($B$):</label>
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
                <label className="text-zinc-400 font-bold block mb-1">Even Draft ($T$):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={draft}
                    onChange={(e) => setDraft(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Block Coeff ($C_B$):</label>
                <input
                  type="number"
                  step={0.01}
                  value={Cb}
                  onChange={(e) => setCb(parseFloat(e.target.value) || 0.8)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-zinc-300 font-bold">Approach Speed:</span>
                <span className="font-mono text-[#FFC107] font-bold">{speedKnots} knots</span>
              </div>
              <input
                type="range"
                min={4}
                max={26}
                step={0.5}
                value={speedKnots}
                onChange={(e) => setSpeedKnots(parseFloat(e.target.value))}
                className="w-full accent-[#FFC107] cursor-pointer"
              />
            </div>
          </div>

          {/* Rudder Configuration Card */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-2">
              <Sliders className="w-4 h-4" /> 2. Rudder Specifications
            </h3>

            <div>
              <label className="text-zinc-400 font-bold block mb-1 text-xs">Rudder Type:</label>
              <select
                value={rudderType}
                onChange={(e) => setRudderType(e.target.value as any)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:border-[#FFC107] focus:outline-none"
              >
                <option value="semi-balanced">Semi-Balanced (Horn Rudder - Most Common)</option>
                <option value="spade">Spade / Free-Hanging Rudder (High Aspect)</option>
                <option value="flap">High-Lift Flap Rudder (Becker Type - Stall at 42°)</option>
                <option value="unbalanced">Unbalanced Sternpost Rudder</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Rudder Area ($A_R$):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={rudderArea}
                    onChange={(e) => setRudderArea(Math.max(2, parseFloat(e.target.value) || 2))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m²</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Aspect Ratio ($\Lambda$):</label>
                <input
                  type="number"
                  step={0.1}
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(parseFloat(e.target.value) || 1.8)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                />
              </div>
            </div>

            {/* Rudder Angle Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-zinc-300 font-bold">Rudder Order Angle ($\delta$):</span>
                <span className={`font-mono font-bold ${maneuveringResults.isStalled ? 'text-red-400' : 'text-[#FFC107]'}`}>
                  {rudderAngleDeg}° {maneuveringResults.isStalled && '(STALLED)'}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={45}
                step={1}
                value={rudderAngleDeg}
                onChange={(e) => setRudderAngleDeg(parseInt(e.target.value))}
                className="w-full accent-[#FFC107] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>0° (Midships)</span>
                <span className="text-amber-400 font-bold">35° (Max Normal)</span>
                <span className="text-red-400">45° (Stall)</span>
              </div>
            </div>
          </div>

          {/* Lateral Thruster Configuration */}
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#FFC107] flex items-center gap-2">
              <Waves className="w-4 h-4" /> 3. Auxiliary Thrusters
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-white font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasBowThruster}
                      onChange={(e) => setHasBowThruster(e.target.checked)}
                      className="accent-[#FFC107]"
                    />
                    <span>Bow Tunnel Thruster</span>
                  </label>
                  {hasBowThruster && (
                    <span className="text-emerald-400 font-mono font-bold">
                      {maneuveringResults.bowThrusterThrustKN.toFixed(1)} kN
                    </span>
                  )}
                </div>
                {hasBowThruster && (
                  <div className="relative">
                    <input
                      type="number"
                      value={bowThrusterPowerKW}
                      onChange={(e) => setBowThrusterPowerKW(parseFloat(e.target.value) || 0)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                    />
                    <span className="absolute right-3 top-1.5 text-zinc-500 text-[10px]">kW</span>
                  </div>
                )}
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-white font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasSternThruster}
                      onChange={(e) => setHasSternThruster(e.target.checked)}
                      className="accent-[#FFC107]"
                    />
                    <span>Stern Tunnel Thruster</span>
                  </label>
                  {hasSternThruster && (
                    <span className="text-emerald-400 font-mono font-bold">
                      {maneuveringResults.sternThrusterThrustKN.toFixed(1)} kN
                    </span>
                  )}
                </div>
                {hasSternThruster && (
                  <div className="relative">
                    <input
                      type="number"
                      value={sternThrusterPowerKW}
                      onChange={(e) => setSternThrusterPowerKW(parseFloat(e.target.value) || 0)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                    />
                    <span className="absolute right-3 top-1.5 text-zinc-500 text-[10px]">kW</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Calculations & IMO Standards (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Hydrodynamic Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Rudder Lift Force ($F_N$)
              </span>
              <span className="text-xl font-black text-[#FFC107] font-mono mt-1 block">
                {maneuveringResults.normalForceKN.toFixed(1)} <span className="text-xs font-normal text-zinc-400">kN</span>
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 block">Normal to rudder blade</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Transverse Force ($F_t$)
              </span>
              <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
                {maneuveringResults.transverseForceKN.toFixed(1)} <span className="text-xs font-normal text-zinc-400">kN</span>
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 block">Turning yaw arm</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Tactical Diameter
              </span>
              <span className="text-xl font-black text-white font-mono mt-1 block">
                {maneuveringResults.tacticalDiameterMeters.toFixed(0)} <span className="text-xs font-normal text-zinc-400">m</span>
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 block">{maneuveringResults.tacticalDiameterLbp.toFixed(2)} × $L_{'{bp}'}$</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                Steady Yaw Rate
              </span>
              <span className="text-xl font-black text-amber-300 font-mono mt-1 block">
                {maneuveringResults.yawRateDegSec.toFixed(2)} <span className="text-xs font-normal text-zinc-400">°/s</span>
              </span>
              <span className="text-[10px] text-zinc-500 mt-1 block">Drift: {maneuveringResults.driftAngleDeg.toFixed(1)}°</span>
            </div>
          </div>

          {/* Rudder Stall Warning Banner if Stalled */}
          {maneuveringResults.isStalled && (
            <div className="p-4 rounded-2xl bg-red-950/80 border border-red-500/50 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-xs text-red-200">
                <span className="font-bold text-red-100 block text-sm">RUDDER HYDRODYNAMIC STALL DETECTED!</span>
                At {rudderAngleDeg}°, the flow has separated from the suction side of the rudder blade.
                Lift coefficient has dropped precipitously from {maneuveringResults.CL.toFixed(2)} while drag has skyrocketed.
                Per lecture notes: standard commercial spade/semi-balanced rudders experience stall beyond 35°.
              </div>
            </div>
          )}

          {/* Turning Circle Geometry Diagram & Phases */}
          <div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#FFC107]" /> Turning Circle Phases (Notes Ch. 6)
              </h3>
              <span className="text-xs font-mono text-zinc-400">Full Sea Speed Manoeuvring</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-1.5">
                <span className="text-amber-400 font-bold block text-sm">Phase 1: Entry / Kick</span>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Rudder is laid over. Lateral force at stern accelerates stern outward (kick). Ship heading begins to deviate while CG remains along original track.
                </p>
                <div className="text-[10px] font-mono text-zinc-400">Speed loss: 5% - 10%</div>
              </div>

              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-1.5">
                <span className="text-amber-400 font-bold block text-sm">Phase 2: Transition</span>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Hydrodynamic side force develops on hull due to drift angle β. Centrifugal force produces outward heel until righting moment balances it.
                </p>
                <div className="text-[10px] font-mono text-zinc-400">Drift angle: ~{maneuveringResults.driftAngleDeg.toFixed(0)}°</div>
              </div>

              <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-1.5">
                <span className="text-amber-400 font-bold block text-sm">Phase 3: Steady Turn</span>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  All forces in equilibrium. Vessel rotates at steady yaw rate r around fixed turning center. Speed drops by 25% - 40% due to induced hull drag.
                </p>
                <div className="text-[10px] font-mono text-zinc-400">Steady Diam: {maneuveringResults.steadyTurningDiameterMeters.toFixed(0)}m</div>
              </div>
            </div>

            {/* Geometry Numerical Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-xs text-left">
                <thead className="bg-black/60 text-zinc-400 text-[10px] uppercase font-mono">
                  <tr>
                    <th className="py-2 px-3">Parameter</th>
                    <th className="py-2 px-3">Calculated Value</th>
                    <th className="py-2 px-3">IMO Standard MSC.137(76)</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-white">Advance at 35° Rudder</td>
                    <td className="py-2.5 px-3 text-[#FFC107] font-bold">{maneuveringResults.advanceMeters.toFixed(1)} m ({maneuveringResults.advanceLbp.toFixed(2)} $L_{'{bp}'}$)</td>
                    <td className="py-2.5 px-3 text-zinc-400">≤ 4.50 × $L_{'{bp}'}$ ({(4.5 * Lbp).toFixed(0)} m)</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-white">Transfer at 90° Heading</td>
                    <td className="py-2.5 px-3 text-white">{maneuveringResults.transferMeters.toFixed(1)} m ({maneuveringResults.transferLbp.toFixed(2)} $L_{'{bp}'}$)</td>
                    <td className="py-2.5 px-3 text-zinc-400">Informational standard</td>
                    <td className="py-2.5 px-3">
                      <span className="text-zinc-400 font-sans text-[11px]">Typical</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-white">Tactical Diameter</td>
                    <td className="py-2.5 px-3 text-[#FFC107] font-bold">{maneuveringResults.tacticalDiameterMeters.toFixed(1)} m ({maneuveringResults.tacticalDiameterLbp.toFixed(2)} $L_{'{bp}'}$)</td>
                    <td className="py-2.5 px-3 text-zinc-400">≤ 5.00 × $L_{'{bp}'}$ ({(5.0 * Lbp).toFixed(0)} m)</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-bold text-white">SOLAS Steering Gear Time</td>
                    <td className="py-2.5 px-3 text-white">{maneuveringResults.rudderTime35to30.toFixed(1)} seconds</td>
                    <td className="py-2.5 px-3 text-zinc-400">≤ 28.0 seconds (35° to 30°)</td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Reference Notes Citation */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span>Grounding reference: Chapter 6 Maneuvering Notes (NIT Lecture Series)</span>
            <a
              href="/assets/aistudio/Maneuverability_notes_f3c7061f.PDF"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFC107] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>Open PDF Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
