import React, { useState } from 'react';
import {
  Calculator,
  Ship,
  Flame,
  Fuel,
  Droplet,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Anchor,
  Compass,
  Wrench,
  Layers
} from 'lucide-react';

export const MarineEngineeringCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slip' | 'sfoc' | 'bunker' | 'ows' | 'drydock' | 'squat'>('slip');

  // Tab 1: Propeller Slip States
  const [pitch, setPitch] = useState<number>(5.2); // meters
  const [rpm, setRpm] = useState<number>(95);
  const [hours, setHours] = useState<number>(24);
  const [observedDist, setObservedDist] = useState<number>(360); // Nautical Miles

  // Tab 2: SFOC States
  const [fuelKgDay, setFuelKgDay] = useState<number>(58000); // kg/day
  const [engineKw, setEngineKw] = useState<number>(14500); // kW

  // Tab 3: Fuel Oil Bunkering ASTM 54B States
  const [soundingVolume, setSoundingVolume] = useState<number>(450); // m3
  const [density15, setDensity15] = useState<number>(0.950); // kg/l @ 15°C
  const [fuelTemp, setFuelTemp] = useState<number>(55); // °C

  // Tab 4: 15 PPM OWS Check
  const [bilgeVolume, setBilgeVolume] = useState<number>(10); // m3
  const [oilPpm, setOilPpm] = useState<number>(12); // PPM

  // Tab 5: Drydocking Upthrust & GM Loss (NIT SRT 04105 & Barrass)
  const [dockDisplacement, setDockDisplacement] = useState<number>(14500); // tonnes
  const [dockKM, setDockKM] = useState<number>(8.40); // m
  const [dockKG, setDockKG] = useState<number>(7.65); // m
  const [dockTrimM, setDockTrimM] = useState<number>(0.85); // m
  const [dockMCT1cm, setDockMCT1cm] = useState<number>(195); // t-m/cm
  const [dockDistAftToLCF, setDockDistAftToLCF] = useState<number>(68.5); // m

  // Tab 6: Ship Squat in Shallow Water (Dr. C.B. Barrass)
  const [squatCb, setSquatCb] = useState<number>(0.82);
  const [squatSpeedKnots, setSquatSpeedKnots] = useState<number>(12.0); // knots

  // Calculations
  // 1. Slip
  const totalRevs = rpm * 60 * hours;
  const engineDistance = (totalRevs * pitch) / 1852;
  const apparentSlip = engineDistance > 0 ? ((engineDistance - observedDist) / engineDistance) * 100 : 0;
  const shipSpeed = hours > 0 ? observedDist / hours : 0;
  const engineSpeed = hours > 0 ? engineDistance / hours : 0;

  // 2. SFOC
  const fuelKgHour = hours > 0 ? fuelKgDay / hours : 0;
  const sfoc = engineKw > 0 ? (fuelKgHour * 1000) / engineKw : 0;
  const brakeHorsePower = engineKw * 1.34102;

  // 3. Bunker Metric Tonnes (ASTM Table 54B: VCF = 1 - (temp - 15) * 0.00065)
  const vcf = Math.max(0.85, Math.min(1.05, 1 - (fuelTemp - 15) * 0.00065));
  const correctedVolume = soundingVolume * vcf;
  const weightInAirDensity = density15 - 0.0011; // Air buoyancy correction factor
  const metricTonnes = correctedVolume * weightInAirDensity;

  // 4. OWS Check
  const isPpmCompliant = oilPpm < 15;

  // 5. Drydocking Upthrust (NIT SRT 04105)
  const dockTrimCm = dockTrimM * 100;
  const dockUpthrustP = dockDistAftToLCF > 0 ? (dockTrimCm * dockMCT1cm) / dockDistAftToLCF : 0;
  const initialGM = dockKM - dockKG;
  const lossOfGM = dockDisplacement > 0 ? (dockUpthrustP * dockKM) / dockDisplacement : 0;
  const effectiveGM = initialGM - lossOfGM;

  // 6. Barrass Squat
  const squatOpenWaterM = (squatCb * Math.pow(squatSpeedKnots, 2)) / 100;
  const squatConfinedChannelM = (squatCb * Math.pow(squatSpeedKnots, 2)) / 50;

  return (
    <section id="marine-calculator" className="my-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6 sm:p-8 border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#FFC107] border border-[#FFC107]/40 flex items-center justify-center font-black shadow-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#FFC107] uppercase tracking-wider">
                SAN25 Technical Suite
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                STCW & NIT Aligned
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white editorial-font">
              Marine Engineering Technical Calculator Suite
            </h2>
          </div>
        </div>
        <p className="text-xs text-zinc-400 max-w-sm">
          Precision naval architecture & watchkeeping formulas: Propeller Slip, SFOC, Bunkering Tonnes (ASTM 54B), Drydocking Upthrust P (NIT SRT 04105), and Shallow Water Squat (Dr. Barrass).
        </p>
      </div>

      {/* Segmented Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        <button
          onClick={() => setActiveTab('slip')}
          className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'slip'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Ship className="w-3.5 h-3.5" />
          <span>Propeller Slip</span>
        </button>

        <button
          onClick={() => setActiveTab('sfoc')}
          className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'sfoc'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>SFOC & Power</span>
        </button>

        <button
          onClick={() => setActiveTab('bunker')}
          className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'bunker'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Fuel className="w-3.5 h-3.5" />
          <span>ASTM 54B Bunker</span>
        </button>

        <button
          onClick={() => setActiveTab('ows')}
          className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'ows'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Droplet className="w-3.5 h-3.5" />
          <span>15 PPM OWS</span>
        </button>

        <button
          onClick={() => setActiveTab('drydock')}
          className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'drydock'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Drydock Upthrust</span>
        </button>

        <button
          onClick={() => setActiveTab('squat')}
          className={`p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'squat'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Barrass Squat</span>
        </button>
      </div>

      {/* Tab 1: Propeller Slip */}
      {activeTab === 'slip' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Propeller Pitch ($P$ in meters):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Average Shaft Speed ($N$ in RPM):
                </label>
                <input
                  type="number"
                  step="1"
                  value={rpm}
                  onChange={(e) => setRpm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Noon-to-Noon Steaming Time (hours):
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Observed Distance by GPS (Nautical Miles):
                </label>
                <input
                  type="number"
                  step="1"
                  value={observedDist}
                  onChange={(e) => setObservedDist(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-zinc-400">
              <span className="text-[#FFC107] font-bold">Standard Formula: </span>
              Apparent Slip (%) = [(Engine Distance - Observed Distance) / Engine Distance] × 100
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/80 border border-white/10 space-y-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Hydrodynamic Propeller Results:
            </span>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Theoretical Engine Dist:</span>
                <span className="font-mono text-sm font-bold text-white">{engineDistance.toFixed(2)} NM</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Actual Ship Speed over Ground:</span>
                <span className="font-mono text-sm font-bold text-white">{shipSpeed.toFixed(2)} knots</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Theoretical Engine Speed:</span>
                <span className="font-mono text-sm font-bold text-white">{engineSpeed.toFixed(2)} knots</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-bold text-white">Apparent Propeller Slip:</span>
                <span className={`font-mono text-lg font-black ${apparentSlip < 15 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {apparentSlip.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: SFOC */}
      {activeTab === 'sfoc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  24-Hour Fuel Consumption (kg/day):
                </label>
                <input
                  type="number"
                  step="500"
                  value={fuelKgDay}
                  onChange={(e) => setFuelKgDay(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Engine Shaft Power Output ($P$ in kW):
                </label>
                <input
                  type="number"
                  step="100"
                  value={engineKw}
                  onChange={(e) => setEngineKw(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-zinc-400">
              <span className="text-[#FFC107] font-bold">Standard Formula: </span>
              SFOC (g/kWh) = [Fuel per hour (kg/h) × 1000] / Engine Power (kW)
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/80 border border-white/10 space-y-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Specific Fuel & Power Results:
            </span>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Hourly Fuel Flow Rate:</span>
                <span className="font-mono text-sm font-bold text-white">{fuelKgHour.toFixed(1)} kg/h</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Equivalent Brake Horsepower:</span>
                <span className="font-mono text-sm font-bold text-white">{brakeHorsePower.toFixed(0)} BHP</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-bold text-white">Specific Fuel Consumption (SFOC):</span>
                <span className={`font-mono text-lg font-black ${sfoc < 175 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {sfoc.toFixed(1)} g/kWh
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: ASTM 54B */}
      {activeTab === 'bunker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Tank Sounding Volume ($m^3$):
                </label>
                <input
                  type="number"
                  step="10"
                  value={soundingVolume}
                  onChange={(e) => setSoundingVolume(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Density @ 15°C (kg/L):
                </label>
                <input
                  type="number"
                  step="0.005"
                  value={density15}
                  onChange={(e) => setDensity15(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Observed Fuel Temp (°C):
                </label>
                <input
                  type="number"
                  step="1"
                  value={fuelTemp}
                  onChange={(e) => setFuelTemp(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-zinc-400">
              <span className="text-[#FFC107] font-bold">ASTM Table 54B: </span>
              Volume Correction Factor (VCF) adjusts for thermal expansion; weight in air includes 0.0011 buoyancy correction.
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/80 border border-white/10 space-y-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              ASTM Bunkering Weight Results:
            </span>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Volume Correction Factor (VCF):</span>
                <span className="font-mono text-sm font-bold text-white">{vcf.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Corrected Volume @ 15°C:</span>
                <span className="font-mono text-sm font-bold text-white">{correctedVolume.toFixed(2)} m³</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-bold text-white">Net Weight in Air:</span>
                <span className="font-mono text-lg font-black text-[#FFC107]">
                  {metricTonnes.toFixed(2)} Metric Tonnes
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: OWS 15 PPM */}
      {activeTab === 'ows' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Bilge Water Volume to Discharge ($m^3$):
                </label>
                <input
                  type="number"
                  step="1"
                  value={bilgeVolume}
                  onChange={(e) => setBilgeVolume(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Oil Content Monitor (OCM) Reading (PPM):
                </label>
                <input
                  type="number"
                  step="1"
                  value={oilPpm}
                  onChange={(e) => setOilPpm(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-zinc-400">
              <span className="text-[#FFC107] font-bold">MARPOL Annex I Regulation 14: </span>
              Overboard discharge prohibited if oil content equals or exceeds 15 PPM. 3-way valve must trip automatically.
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/80 border border-white/10 space-y-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              MARPOL Compliance Verdict:
            </span>
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${isPpmCompliant ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-red-950/50 border-red-500/50 text-red-300'}`}>
              {isPpmCompliant ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <AlertTriangle className="w-6 h-6 shrink-0" />}
              <div className="text-xs">
                <span className="font-bold block text-sm">
                  {isPpmCompliant ? 'LEGAL TO DISCHARGE OVERBOARD' : 'ILLEGAL TO DISCHARGE - 15 PPM EXCEEDED!'}
                </span>
                <span>{oilPpm} PPM recorded. 3-way valve {isPpmCompliant ? 'remains open to sea' : 'must recirculate to bilge tank'}.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Drydocking Upthrust P (NIT SRT 04105 & Barrass) */}
      {activeTab === 'drydock' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 font-bold block mb-1">Displacement ($W$):</label>
                <div className="relative">
                  <input
                    type="number"
                    value={dockDisplacement}
                    onChange={(e) => setDockDisplacement(parseFloat(e.target.value) || 0)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono"
                  />
                  <span className="absolute right-2 top-1.5 text-zinc-500 text-[10px]">t</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Height $KM$:</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.01}
                    value={dockKM}
                    onChange={(e) => setDockKM(parseFloat(e.target.value) || 0)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono"
                  />
                  <span className="absolute right-2 top-1.5 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Center $KG$:</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.01}
                    value={dockKG}
                    onChange={(e) => setDockKG(parseFloat(e.target.value) || 0)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono"
                  />
                  <span className="absolute right-2 top-1.5 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Stern Trim:</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.05}
                    value={dockTrimM}
                    onChange={(e) => setDockTrimM(parseFloat(e.target.value) || 0)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono"
                  />
                  <span className="absolute right-2 top-1.5 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">$MCT_{'{1cm}'}$:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={dockMCT1cm}
                    onChange={(e) => setDockMCT1cm(parseFloat(e.target.value) || 0)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono"
                  />
                  <span className="absolute right-2 top-1.5 text-zinc-500 text-[10px]">t-m</span>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold block mb-1">Dist Aft to LCF ($a$):</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.5}
                    value={dockDistAftToLCF}
                    onChange={(e) => setDockDistAftToLCF(parseFloat(e.target.value) || 0)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-white font-mono"
                  />
                  <span className="absolute right-2 top-1.5 text-zinc-500 text-[10px]">m</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-zinc-400">
              <span className="text-[#FFC107] font-bold">NIT SRT 04105: </span>
              Upthrust P = (Trim(cm) × MCT1cm) / a, Virtual Loss of GM = (P × KM) / W.
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/80 border border-white/10 space-y-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Critical Docking Stability:
            </span>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Upthrust $P$ at Stern Blocks:</span>
                <span className="font-mono text-sm font-bold text-[#FFC107]">{dockUpthrustP.toFixed(1)} tonnes</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Initial Solid $GM$:</span>
                <span className="font-mono text-sm font-bold text-white">{initialGM.toFixed(2)} m</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Virtual Loss of $GM$:</span>
                <span className="font-mono text-sm font-bold text-red-400">-{lossOfGM.toFixed(3)} m</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-bold text-white">Effective $GM$ at Critical Phase:</span>
                <span className={`font-mono text-lg font-black ${effectiveGM > 0.15 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {effectiveGM.toFixed(3)} m
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Ship Squat in Shallow Water (Dr. C.B. Barrass) */}
      {activeTab === 'squat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Block Coefficient ($C_B$):
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.5"
                  max="0.9"
                  value={squatCb}
                  onChange={(e) => setSquatCb(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Vessel Speed ($V$ in knots):
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="2"
                  max="25"
                  value={squatSpeedKnots}
                  onChange={(e) => setSquatSpeedKnots(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-xs text-zinc-400">
              <span className="text-[#FFC107] font-bold">Dr. C.B. Barrass Formulas: </span>
              Open Water Squat = $(C_B \times V^2) / 100$ meters; Confined Channel / Canal Squat = $(C_B \times V^2) / 50$ meters.
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/80 border border-white/10 space-y-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Predicted Bodily Sinkage (Squat):
            </span>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Open Shallow Water Squat:</span>
                <span className="font-mono text-sm font-bold text-white">{squatOpenWaterM.toFixed(2)} m</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-xs text-zinc-400">Confined Channel (Canal) Squat:</span>
                <span className="font-mono text-lg font-black text-[#FFC107]">{squatConfinedChannelM.toFixed(2)} m</span>
              </div>
              <div className="text-[11px] text-zinc-500 pt-1">
                Notice: Doubling speed quadruples squat sinkage ($V^2$ relationship).
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
