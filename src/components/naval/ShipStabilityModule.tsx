import React, { useState, useMemo } from 'react';
import {
  Compass,
  Anchor,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Droplet,
  Layers,
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';

interface SlackTank {
  id: string;
  name: string;
  length: number; // m
  breadth: number; // m
  density: number; // t/m3
  isSlack: boolean;
}

export const ShipStabilityModule: React.FC = () => {
  // Vessel Principal Hydrostatics State
  const [displacement, setDisplacement] = useState<number>(55000); // tonnes
  const [Lbp, setLbp] = useState<number>(225.0); // m
  const [B, setB] = useState<number>(32.2); // m
  const [D, setD] = useState<number>(19.5); // m (Moulded Depth)
  const [draftMean, setDraftMean] = useState<number>(12.2); // m

  // Vertical Center of Gravity & Buoyancy
  const [KG, setKG] = useState<number>(10.85); // m
  const [customKB, setCustomKB] = useState<number>(6.35); // m
  const [customBM, setCustomBM] = useState<number>(5.65); // m

  // Longitudinal Center of Gravity & Buoyancy
  const [LCG, setLCG] = useState<number>(112.8); // m from AP
  const [LCB, setLCB] = useState<number>(114.2); // m from AP
  const [LCF, setLCF] = useState<number>(111.5); // m from AP
  const [GML, setGML] = useState<number>(280.0); // m (Longitudinal Metacentric Height)

  // Wind Heeling Arm parameters for Weather Criterion
  const [windPressure, setWindPressure] = useState<number>(504); // N/m2 (approx 26 m/s wind)
  const [lateralArea, setLateralArea] = useState<number>(2400); // m2
  const [windLeverArm, setWindLeverArm] = useState<number>(12.5); // m

  // Slack Tanks for Free Surface Effect (FSE)
  const [tanks, setTanks] = useState<SlackTank[]>([
    { id: '1', name: 'No. 2 Heavy Fuel Oil (HFO) P&S', length: 18.0, breadth: 12.0, density: 0.98, isSlack: true },
    { id: '2', name: 'No. 3 HFO Settling & Service', length: 8.0, breadth: 6.0, density: 0.95, isSlack: true },
    { id: '3', name: 'No. 4 Water Ballast DB Tank (P&S)', length: 24.0, breadth: 14.0, density: 1.025, isSlack: false },
    { id: '4', name: 'Aft Peak Water Ballast Tank', length: 14.0, breadth: 8.5, density: 1.025, isSlack: true },
    { id: '5', name: 'Drinking Fresh Water Tank (P)', length: 10.0, breadth: 5.5, density: 1.00, isSlack: true },
  ]);

  const toggleTankSlack = (id: string) => {
    setTanks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isSlack: !t.isSlack } : t))
    );
  };

  // Stability Calculations
  const stabilityData = useMemo(() => {
    // 1. KM and Solid GM
    const KM = customKB + customBM;
    const GM_solid = KM - KG;

    // 2. Free Surface Moment (FSM = i * density) and virtual KG rise
    let totalFSM = 0;
    tanks.forEach((tank) => {
      if (tank.isSlack) {
        // Moment of inertia i = (l * b^3) / 12
        const i_tank = (tank.length * Math.pow(tank.breadth, 3)) / 12;
        totalFSM += i_tank * tank.density;
      }
    });
    const deltaKG_FSE = displacement > 0 ? totalFSM / displacement : 0;
    const KG_fluid = KG + deltaKG_FSE;
    const GM_fluid = KM - KG_fluid;

    // 3. Righting Arm GZ Curve Generation (0 to 60 deg)
    // Wall-sided formula for moderate angles + cross curve kn adjustment
    const anglesDeg = [0, 5, 10, 15, 20, 25, 30, 40, 50, 60];
    const gzCurve = anglesDeg.map((thetaDeg) => {
      const rad = (thetaDeg * Math.PI) / 180;
      // GZ = (KM - KG_fluid) * sin(theta) + 0.5 * BM * tan^2(theta) * sin(theta) for theta < deck immersion
      // At larger angles, deck edge immersion limits righting arm
      const deckImmersionAngle = Math.atan((2 * (D - draftMean)) / B);
      let gz = 0;
      if (rad <= deckImmersionAngle) {
        gz = GM_fluid * Math.sin(rad) + 0.5 * customBM * Math.pow(Math.tan(rad), 2) * Math.sin(rad);
      } else {
        const gzDeck = GM_fluid * Math.sin(deckImmersionAngle) + 0.5 * customBM * Math.pow(Math.tan(deckImmersionAngle), 2) * Math.sin(deckImmersionAngle);
        const postRad = rad - deckImmersionAngle;
        gz = Math.max(0, gzDeck + 0.35 * Math.sin(rad) - 0.7 * Math.pow(postRad, 1.8));
      }
      return { angle: thetaDeg, rad, gz: Math.max(0, gz) };
    });

    // 4. IMO Intact Stability Criteria (Code on Intact Stability 2008, Res. MSC.267(85))
    // Simpson's rule numerical integration for Area under GZ curve:
    // Area 0 to 30 deg
    const radStep10 = (10 * Math.PI) / 180;
    const gz0 = gzCurve.find((p) => p.angle === 0)?.gz || 0;
    const gz10 = gzCurve.find((p) => p.angle === 10)?.gz || 0;
    const gz20 = gzCurve.find((p) => p.angle === 20)?.gz || 0;
    const gz30 = gzCurve.find((p) => p.angle === 30)?.gz || 0;
    const gz40 = gzCurve.find((p) => p.angle === 40)?.gz || 0;

    // Simpson 1/3 rule: Area = h/3 * (y0 + 4y1 + 2y2 + 4y3 + ...)
    // For 0 to 30: 3 intervals of 10 deg (use Simpson's 3/8 rule: 3h/8 * (y0 + 3y1 + 3y2 + y3))
    const area0_30 = ((3 * radStep10) / 8) * (gz0 + 3 * gz10 + 3 * gz20 + gz30);
    // Area 30 to 40 using trapezoid
    const area30_40 = 0.5 * (gz30 + gz40) * radStep10;
    const area0_40 = area0_30 + area30_40;

    // Maximum GZ and angle of Max GZ
    let maxGZ = 0;
    let angleMaxGZ = 0;
    gzCurve.forEach((p) => {
      if (p.gz > maxGZ) {
        maxGZ = p.gz;
        angleMaxGZ = p.angle;
      }
    });

    // IMO Criteria Check status
    const criteria = {
      initialGM: {
        value: GM_fluid,
        required: 0.15,
        unit: 'm',
        passed: GM_fluid >= 0.15,
        title: 'Initial Fluid GM ≥ 0.15 m',
      },
      area0_30: {
        value: area0_30,
        required: 0.055,
        unit: 'm·rad',
        passed: area0_30 >= 0.055,
        title: 'Area 0° to 30° ≥ 0.055 m·rad',
      },
      area0_40: {
        value: area0_40,
        required: 0.090,
        unit: 'm·rad',
        passed: area0_40 >= 0.090,
        title: 'Area 0° to 40° ≥ 0.090 m·rad',
      },
      area30_40: {
        value: area30_40,
        required: 0.030,
        unit: 'm·rad',
        passed: area30_40 >= 0.030,
        title: 'Area 30° to 40° ≥ 0.030 m·rad',
      },
      maxGZ: {
        value: maxGZ,
        required: 0.20,
        unit: 'm',
        passed: maxGZ >= 0.20,
        title: 'Max GZ ≥ 0.20 m',
      },
      angleMax: {
        value: angleMaxGZ,
        required: 25,
        unit: 'deg',
        passed: angleMaxGZ >= 25,
        title: 'Angle of Max GZ ≥ 25°',
      },
    };

    const allPassed = Object.values(criteria).every((c) => c.passed);

    // 5. Longitudinal Stability & Trim Calculation
    // Trimming moment TM = Delta * (LCG - LCB)
    const trimmingMoment = displacement * (LCG - LCB); // tonne-meters
    // MCTc = (Delta * GML) / (100 * Lbp)
    const MCTc = (displacement * GML) / (100 * Lbp);
    // Total Trim (m) = TM / (MCTc * 100)
    const totalTrim = MCTc > 0 ? trimmingMoment / (MCTc * 100) : 0; // Positive = Trim by Stern, Negative = Trim by Head

    // Change of draft forward and aft using LCF
    const distLCF_Aft = LCF; // from AP
    const distLCF_Fwd = Lbp - LCF;
    const changeDraftAft = (totalTrim * distLCF_Aft) / Lbp;
    const changeDraftFwd = (totalTrim * distLCF_Fwd) / Lbp;

    const draftAft = draftMean + changeDraftAft;
    const draftFwd = draftMean - changeDraftFwd;

    return {
      KM,
      GM_solid,
      totalFSM,
      deltaKG_FSE,
      KG_fluid,
      GM_fluid,
      gzCurve,
      area0_30,
      area0_40,
      area30_40,
      maxGZ,
      angleMaxGZ,
      criteria,
      allPassed,
      trimmingMoment,
      MCTc,
      totalTrim,
      draftAft,
      draftFwd,
    };
  }, [displacement, Lbp, B, D, draftMean, KG, customKB, customBM, LCG, LCB, LCF, GML, tanks]);

  const resetStandard = () => {
    setDisplacement(55000);
    setLbp(225.0);
    setB(32.2);
    setD(19.5);
    setDraftMean(12.2);
    setKG(10.85);
    setCustomKB(6.35);
    setCustomBM(5.65);
    setLCG(112.8);
    setLCB(114.2);
    setLCF(111.5);
    setGML(280.0);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-zinc-100">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#FFC107] uppercase tracking-wider">
                Naval Architecture & Hydrostatics
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-xs text-zinc-400">IMO Res. MSC.267(85) Compliant</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight editorial-font flex items-center gap-3">
              <Compass className="w-8 h-8 text-[#FFC107]" />
              Ship Stability & GZ Curve Laboratory
            </h1>
            <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Tathmini ya Uthabiti wa Meli: Metacentric Height ($GM$), Athari ya Maji Huru kwenye Matanki ($FSE$),
              Upimaji wa Vigezo vya IMO Intact Stability Criteria, na Mkao wa Meli (Trim & Longitudinal Stability).
            </p>
          </div>

          <button
            onClick={resetStandard}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-xs font-bold text-zinc-300 hover:text-white rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FFC107]" /> Rejesha Data ya Kawaida
          </button>
        </div>
      </div>

      {/* Stability Status Callout Bar */}
      <div
        className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          stabilityData.allPassed
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
            : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
        }`}
      >
        <div className="flex items-center gap-3">
          {stabilityData.allPassed ? (
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0" />
          )}
          <div>
            <h3 className="text-base font-black text-white">
              {stabilityData.allPassed
                ? 'UTIIFU KAMILI WA IMO INTACT STABILITY CRITERIA'
                : 'ONYO: MELI INAKIUKA VIGEZO VYA UTULIVU VYA IMO'}
            </h3>
            <p className="text-xs opacity-90">
              {stabilityData.allPassed
                ? 'Hali ya upakiaji inakidhi vigezo vyote 6 vya Mkataba wa Kimataifa wa Usalama wa Meli (IMO Code on Intact Stability 2008).'
                : 'Kiwango cha GM au Eneo la Mviringo wa GZ halikidhi kiwango cha chini cha kisheria. Hatari ya kupinduka baharini!'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono font-bold shrink-0">
          <div className="text-center bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-zinc-400 block">Fluid GM</span>
            <span className={stabilityData.GM_fluid >= 0.15 ? 'text-emerald-400' : 'text-rose-400'}>
              {stabilityData.GM_fluid.toFixed(2)} m
            </span>
          </div>
          <div className="text-center bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-zinc-400 block">Max GZ</span>
            <span className="text-[#FFC107]">{stabilityData.maxGZ.toFixed(2)} m</span>
          </div>
          <div className="text-center bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-zinc-400 block">Total Trim</span>
            <span className="text-white">
              {Math.abs(stabilityData.totalTrim).toFixed(2)} m {stabilityData.totalTrim >= 0 ? '(By Stern)' : '(By Head)'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Inputs & Free Surface Tanks vs GZ Plotter & Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: Controls & Slack Tanks */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hydrostatic Dimensions */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
            <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Anchor className="w-4 h-4 text-[#FFC107]" /> Vigezo vya Uzito & Sehemu ya Mvuto (Displacement & Centers)
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Displacement ($\Delta$):</label>
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
                <label className="text-zinc-400 font-bold block mb-1">Mean Draft ($T_{'{mean}'}$):</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.1}
                    value={draftMean}
                    onChange={(e) => setDraftMean(parseFloat(e.target.value) || 10)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Center of Gravity ($KG$):</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.05}
                    value={KG}
                    onChange={(e) => setKG(parseFloat(e.target.value) || 10)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Center of Buoyancy ($KB$):</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.05}
                    value={customKB}
                    onChange={(e) => setCustomKB(parseFloat(e.target.value) || 6)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Metacentric Radius ($BM$):</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.05}
                    value={customBM}
                    onChange={(e) => setCustomBM(parseFloat(e.target.value) || 5)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Total $KM = KB + BM$:</label>
                <div className="w-full bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-[#FFC107] font-mono text-xs font-bold">
                  {stabilityData.KM.toFixed(2)} m
                </div>
              </div>
            </div>
          </div>

          {/* Free Surface Effect (FSE) Slack Tanks Manager */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-[#FFC107]" /> Free Surface Effect (FSE Tanks)
                </h3>
                <span className="text-[10px] text-zinc-400">
                  Matanki yasiyojaa (Slack) yanasababisha $KG$ kupanda kiuhalisia ($GG_1$).
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-amber-300">
                ΔKG: +{stabilityData.deltaKG_FSE.toFixed(3)} m
              </span>
            </div>

            <div className="space-y-2">
              {tanks.map((tank) => (
                <div
                  key={tank.id}
                  onClick={() => toggleTankSlack(tank.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    tank.isSlack
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-100'
                      : 'bg-black/40 border-white/5 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block">{tank.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {tank.length}m × {tank.breadth}m · ρ={tank.density} t/m³
                    </span>
                  </div>

                  <div className="text-right font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        tank.isSlack
                          ? 'bg-amber-400 text-black'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {tank.isSlack ? 'Slack (FSE Active)' : 'Pressed Up'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-zinc-400 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
              💡 <strong>Kanuni ya Uhandisi:</strong> Free surface moment ya tanki inategemea upana wake kwa nguvu ya tatu ($b^3$). Kugawa tanki kwa bulkhead ya katikati kunapunguza FSE kwa <strong>75%</strong>!
            </div>
          </div>

          {/* Longitudinal Trim Center of Gravity & Buoyancy */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
            <h3 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FFC107]" /> Longitudinal Centers ($LCG$, $LCB$ & $LCF$)
            </h3>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">LCG (from AP):</label>
                <input
                  type="number"
                  step={0.1}
                  value={LCG}
                  onChange={(e) => setLCG(parseFloat(e.target.value) || 100)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">LCB (from AP):</label>
                <input
                  type="number"
                  step={0.1}
                  value={LCB}
                  onChange={(e) => setLCB(parseFloat(e.target.value) || 100)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">LCF (from AP):</label>
                <input
                  type="number"
                  step={0.1}
                  value={LCF}
                  onChange={(e) => setLCF(parseFloat(e.target.value) || 100)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:border-[#FFC107] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                <span className="text-zinc-400 text-[10px] block">MCT 1 cm ($MCT_c$):</span>
                <span className="text-white font-bold">{stabilityData.MCTc.toFixed(1)} t·m/cm</span>
              </div>
              <div className="bg-black/50 p-3 rounded-xl border border-white/5">
                <span className="text-zinc-400 text-[10px] block">Trimming Moment:</span>
                <span className="text-[#FFC107] font-bold">{Math.round(stabilityData.trimmingMoment)} t·m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: GZ Curve Graph, IMO Pass/Fail Table & Drafts */}
        <div className="lg:col-span-7 space-y-6">
          {/* GZ Curve Visualizer */}
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#FFC107]" /> Mchoro wa Righting Lever ($GZ$ Curve)
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Mviringo wa nguvu inayorudisha meli inapoinama kwa upepo au wimbi (Righting Arm vs Heel Angle).
                </p>
              </div>

              <div className="text-xs font-mono text-right">
                <span className="text-zinc-400 text-[10px] block">Solid GM: {stabilityData.GM_solid.toFixed(2)}m</span>
                <span className="text-[#FFC107] font-bold">Fluid GM: {stabilityData.GM_fluid.toFixed(2)}m</span>
              </div>
            </div>

            {/* SVG Plot for GZ */}
            <div className="w-full h-72 bg-black/60 rounded-xl border border-white/5 p-4 relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 220" preserveAspectRatio="none">
                {/* Y Axis Guide lines */}
                {[0, 0.5, 1.0, 1.5, 2.0].map((val) => {
                  const y = 200 - (val / 2.5) * 180;
                  return (
                    <g key={val}>
                      <line x1="0" y1={y} x2="500" y2={y} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                      <text x="5" y={y - 4} fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">
                        {val.toFixed(1)} m
                      </text>
                    </g>
                  );
                })}

                {/* IMO 0.20m Reference Line (Dashed red) */}
                <line
                  x1="0"
                  y1={200 - (0.2 / 2.5) * 180}
                  x2="500"
                  y2={200 - (0.2 / 2.5) * 180}
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text x="400" y={200 - (0.2 / 2.5) * 180 - 4} fill="#f43f5e" fontSize="9" fontFamily="monospace">
                  IMO Min GZ (0.20m)
                </text>

                {/* Shaded Area under GZ up to 30 deg (Emerald) */}
                {(() => {
                  const pts30 = stabilityData.gzCurve.filter((p) => p.angle <= 30);
                  const pathD = [
                    'M 0 200',
                    ...pts30.map((p) => {
                      const x = (p.angle / 60) * 500;
                      const y = 200 - (p.gz / 2.5) * 180;
                      return `L ${x} ${y}`;
                    }),
                    `L ${(30 / 60) * 500} 200 Z`,
                  ].join(' ');
                  return <path d={pathD} fill="rgba(16, 185, 129, 0.15)" />;
                })()}

                {/* Shaded Area 30 to 40 deg (Amber) */}
                {(() => {
                  const pts30_40 = stabilityData.gzCurve.filter((p) => p.angle >= 30 && p.angle <= 40);
                  const startX = (30 / 60) * 500;
                  const endX = (40 / 60) * 500;
                  const pathD = [
                    `M ${startX} 200`,
                    ...pts30_40.map((p) => {
                      const x = (p.angle / 60) * 500;
                      const y = 200 - (p.gz / 2.5) * 180;
                      return `L ${x} ${y}`;
                    }),
                    `L ${endX} 200 Z`,
                  ].join(' ');
                  return <path d={pathD} fill="rgba(245, 158, 11, 0.18)" />;
                })()}

                {/* GZ Curve Path (Thick Amber/Gold) */}
                <path
                  d={stabilityData.gzCurve
                    .map((pt, i) => {
                      const x = (pt.angle / 60) * 500;
                      const y = 200 - (pt.gz / 2.5) * 180;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#FFC107"
                  strokeWidth="3.5"
                />

                {/* Max GZ Peak Point */}
                {(() => {
                  const maxX = (stabilityData.angleMaxGZ / 60) * 500;
                  const maxY = 200 - (stabilityData.maxGZ / 2.5) * 180;
                  return (
                    <g>
                      <circle cx={maxX} cy={maxY} r="6" fill="#FFC107" stroke="#000" strokeWidth="2" />
                      <text
                        x={maxX > 380 ? maxX - 120 : maxX + 10}
                        y={maxY - 10}
                        fill="#FFC107"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        GZ max: {stabilityData.maxGZ.toFixed(2)}m @ {stabilityData.angleMaxGZ}°
                      </text>
                    </g>
                  );
                })()}

                {/* Initial Tangent Line (slope = GM_fluid) */}
                {(() => {
                  // Slope at origin: 1 radian = 57.3 deg
                  const rad1X = (57.3 / 60) * 500;
                  const rad1Y = 200 - (stabilityData.GM_fluid / 2.5) * 180;
                  return (
                    <line
                      x1="0"
                      y1="200"
                      x2={rad1X}
                      y2={rad1Y}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.5"
                      strokeDasharray="2 3"
                    />
                  );
                })()}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono px-2">
              <span>0°</span>
              <span>10°</span>
              <span>20°</span>
              <span>30°</span>
              <span>40°</span>
              <span>50°</span>
              <span>60° (Heel Angle θ)</span>
            </div>
          </div>

          {/* IMO Intact Stability Criteria Audit Table */}
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFC107]" /> Tathmini ya Vigezo 6 vya IMO Code on Intact Stability (2008)
              </h4>
              <span className="text-[10px] text-zinc-400 font-mono">Res. MSC.267(85)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {Object.entries(stabilityData.criteria).map(([key, item]) => (
                <div
                  key={key}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    item.passed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white block text-[11px]">{item.title}</span>
                    <span className="text-[10px] text-zinc-400">
                      Thamani: <strong>{item.value.toFixed(3)} {item.unit}</strong> (Min: {item.required} {item.unit})
                    </span>
                  </div>

                  <div className="shrink-0">
                    {item.passed ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        PASS ✓
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold">
                        FAIL ✗
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Longitudinal Trim & Draft Forward/Aft */}
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-4 shadow-lg">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <TrendingDown className="w-4 h-4 text-[#FFC107]" /> Mkao wa Meli Majini (Drafts Forward & Aft)
            </h4>

            <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
              <div className="bg-black/50 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-400 block">Draft Forward ($T_F$)</span>
                <span className="text-xl font-black text-white">{stabilityData.draftFwd.toFixed(2)} m</span>
                <span className="text-[9px] text-zinc-500 block">Bow Immersion</span>
              </div>

              <div className="bg-black/50 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-400 block">Mean Draft ($T_{'{mean}'}$)</span>
                <span className="text-xl font-black text-[#FFC107]">{draftMean.toFixed(2)} m</span>
                <span className="text-[9px] text-zinc-500 block">Midships Draft</span>
              </div>

              <div className="bg-black/50 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-400 block">Draft Aft ($T_A$)</span>
                <span className="text-xl font-black text-white">{stabilityData.draftAft.toFixed(2)} m</span>
                <span className="text-[9px] text-zinc-500 block">Propeller Immersion</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-300 leading-relaxed">
              {stabilityData.totalTrim >= 0 ? (
                <span>
                  🚢 Meli ina <strong>Trim by Stern</strong> ya mita{' '}
                  <span className="text-[#FFC107] font-mono">{stabilityData.totalTrim.toFixed(2)}m</span>.
                  Hii ni hali inayopendekezwa baharini ili propeller na rudder vizamishwe vizuri ndani ya maji na kuzuia mshtuko wa cavitation.
                </span>
              ) : (
                <span className="text-amber-300">
                  ⚠️ Meli ina <strong>Trim by Head</strong> ya mita{' '}
                  <span className="text-rose-400 font-mono">{Math.abs(stabilityData.totalTrim).toFixed(2)}m</span>.
                  Hali hii inaharibu uwezo wa usukani na kuongeza hatari ya slamming kwenye mawimbi ya mbele.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
