import React, { useState } from 'react';
import { Calculator, Ship, Flame, Fuel, Droplet, ArrowRight, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const MarineEngineeringCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slip' | 'sfoc' | 'bunker' | 'ows'>('slip');

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

  // 3. Bunker Metric Tonnes (ASTM Table 54B Approximation: VCF = 1 - (temp - 15) * 0.00065)
  const vcf = Math.max(0.85, Math.min(1.05, 1 - (fuelTemp - 15) * 0.00065));
  const correctedVolume = soundingVolume * vcf;
  const weightInAirDensity = density15 - 0.0011; // Air buoyancy correction factor
  const metricTonnes = correctedVolume * weightInAirDensity;

  // 4. OWS Check
  const isPpmCompliant = oilPpm < 15;

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
                SAN25 Maritime Tools
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Live Formulas
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white editorial-font">
              Marine Engineering Technical Calculator
            </h2>
          </div>
        </div>
        <p className="text-xs text-zinc-400 max-w-sm">
          Hesabu za kitaalamu za Propeller Slip, SFOC, Bunkering Tonnes (ASTM 54B) na uthibitishaji wa 15 PPM OWS kwa ajili ya Daily Noon Report.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setActiveTab('slip')}
          className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'slip'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Ship className="w-4 h-4" />
          <span>Propeller Slip</span>
        </button>

        <button
          onClick={() => setActiveTab('sfoc')}
          className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'sfoc'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>SFOC & Brake Power</span>
        </button>

        <button
          onClick={() => setActiveTab('bunker')}
          className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'bunker'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Fuel className="w-4 h-4" />
          <span>ASTM 54B Bunkering</span>
        </button>

        <button
          onClick={() => setActiveTab('ows')}
          className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'ows'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          <Droplet className="w-4 h-4" />
          <span>15 PPM OWS Check</span>
        </button>
      </div>

      {/* Tab 1: Propeller Slip */}
      {activeTab === 'slip' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Propeller Pitch (mita):
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
                  Average Engine RPM:
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
                  Observed Ship Distance (Nautical Miles):
                </label>
                <input
                  type="number"
                  step="1"
                  value={observedDist}
                  onChange={(e) => setObservedDist(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Steaming Hours (Saa):
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={hours}
                  onChange={(e) => setHours(parseFloat(e.target.value) || 24)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-zinc-400">
              <span className="text-[#FFC107] font-bold">Fomula ya Kazi:</span> Engine Distance = (Pitch × Revolutions) / 1,852 • Apparent Slip = ((Engine Dist - Observed Dist) / Engine Dist) × 100
            </div>
          </div>

          <div className="lg:col-span-5 bg-black/80 rounded-2xl p-5 border border-[#FFC107]/30 space-y-3">
            <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider block">
              Matokeo ya Hesabu (Slip Analysis)
            </span>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-zinc-400">Engine Distance:</span>
              <span className="text-base font-black text-white font-mono">{engineDistance.toFixed(2)} Nm</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-zinc-400">Observed Distance:</span>
              <span className="text-base font-black text-white font-mono">{observedDist.toFixed(2)} Nm</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-zinc-400">Observed Ship Speed:</span>
              <span className="text-base font-black text-white font-mono">{shipSpeed.toFixed(2)} Knots</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300">Apparent Slip Ratio:</span>
                <p className="text-[10px] text-zinc-400">
                  {apparentSlip < 0 ? 'Negative Slip (Current assist)' : apparentSlip > 12 ? 'High Slip (Hull Fouling Alert)' : 'Normal Seagoing Slip'}
                </p>
              </div>
              <span className={`text-2xl font-black font-mono ${apparentSlip > 12 ? 'text-rose-400' : 'text-[#FFC107]'}`}>
                {apparentSlip.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: SFOC & Brake Power */}
      {activeTab === 'sfoc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Fuel Consumption kwa Siku (kg/day):
                </label>
                <input
                  type="number"
                  step="100"
                  value={fuelKgDay}
                  onChange={(e) => setFuelKgDay(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
                <span className="text-[10px] text-zinc-500 mt-0.5 block">
                  ≈ {(fuelKgDay / 1000).toFixed(2)} Metric Tonnes kwa masaa 24
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Engine Power Output (kW):
                </label>
                <input
                  type="number"
                  step="100"
                  value={engineKw}
                  onChange={(e) => setEngineKw(parseFloat(e.target.value) || 1)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
                <span className="text-[10px] text-zinc-500 mt-0.5 block">
                  Kipimo cha Torsion Meter au Indicator Cards
                </span>
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-zinc-400">
              <span className="text-[#FFC107] font-bold">SFOC Benchmark:</span> Injini za kisasa za 2-Stroke crosshead huwa na SFOC ya 160 hadi 175 g/kWh. Thamani zaidi ya 185 g/kWh inaashiria matatizo ya injector au scavenge air cooler.
            </div>
          </div>

          <div className="lg:col-span-5 bg-black/80 rounded-2xl p-5 border border-[#FFC107]/30 space-y-3">
            <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider block">
              Uchambuzi wa Nguvu na Ufanisi
            </span>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-zinc-400">Matumizi kwa Saa:</span>
              <span className="text-base font-black text-white font-mono">{fuelKgHour.toFixed(1)} kg/h</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-zinc-400">Brake Horsepower (BHP):</span>
              <span className="text-base font-black text-white font-mono">{brakeHorsePower.toLocaleString(undefined, { maximumFractionDigits: 0 })} BHP</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300">Specific Fuel Oil Consumption:</span>
                <p className="text-[10px] text-zinc-400">
                  {sfoc < 172 ? 'Ufanisi Bora Sana (Optimal)' : sfoc < 182 ? 'Kiwango cha Kawaida (Acceptable)' : 'Tahadhari ya Upotevu (High SFOC)'}
                </p>
              </div>
              <span className="text-2xl font-black text-[#FFC107] font-mono">
                {sfoc.toFixed(1)} <span className="text-xs font-bold text-zinc-400">g/kWh</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bunkering ASTM 54B */}
      {activeTab === 'bunker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Observed Volume (m³):
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
                  Density @ 15°C (kg/l):
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={density15}
                  onChange={(e) => setDensity15(parseFloat(e.target.value) || 0.95)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Tank Temperature (°C):
                </label>
                <input
                  type="number"
                  step="1"
                  value={fuelTemp}
                  onChange={(e) => setFuelTemp(parseFloat(e.target.value) || 15)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-zinc-400">
              <span className="text-[#FFC107] font-bold">ASTM 54B Standard:</span> Volume Correction Factor (VCF) inarekebisha kutanuka kwa joto kuelekea 15°C. Uzito unarekebishwa kwa -0.0011 kg/l kwa ajili ya athari ya hewa (Weight in Air).
            </div>
          </div>

          <div className="lg:col-span-5 bg-black/80 rounded-2xl p-5 border border-[#FFC107]/30 space-y-3">
            <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider block">
              Matokeo ya Bunkering (Metric Tonnes)
            </span>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-zinc-400">Volume Correction Factor (VCF):</span>
              <span className="text-base font-black text-white font-mono">{vcf.toFixed(5)}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-zinc-400">Volume at 15°C:</span>
              <span className="text-base font-black text-white font-mono">{correctedVolume.toFixed(2)} m³</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-zinc-400">Density in Air:</span>
              <span className="text-base font-black text-white font-mono">{weightInAirDensity.toFixed(4)} kg/l</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300">Tani Kamili (Metric Tonnes):</span>
                <p className="text-[10px] text-zinc-400">Kiasi cha kisheria cha kulipia kwenye BDN</p>
              </div>
              <span className="text-2xl font-black text-[#FFC107] font-mono">
                {metricTonnes.toFixed(2)} <span className="text-xs font-bold text-zinc-400">MT</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 15 PPM OWS Check */}
      {activeTab === 'ows' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Kiwango cha Mafuta kwenye OCM (PPM):
                </label>
                <input
                  type="number"
                  step="1"
                  value={oilPpm}
                  onChange={(e) => setOilPpm(parseFloat(e.target.value) || 0)}
                  className={`w-full bg-black/70 border rounded-xl px-3 py-2 text-sm font-mono focus:outline-none ${
                    oilPpm >= 15 ? 'border-rose-500 text-rose-400' : 'border-emerald-500 text-emerald-400'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 block mb-1">
                  Ujazo wa Maji ya Bilge (m³):
                </label>
                <input
                  type="number"
                  step="1"
                  value={bilgeVolume}
                  onChange={(e) => setBilgeVolume(parseFloat(e.target.value) || 0)}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                />
              </div>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[11px] text-zinc-400">
              <span className="text-[#FFC107] font-bold">Sheria ya MARPOL Annex I Reg 14:</span> Maji yote ya bilge yanayotupwa baharini lazima yawe chini ya 15 PPM na meli iwe inasafiri njiani (en route).
            </div>
          </div>

          <div className="lg:col-span-5 bg-black/80 rounded-2xl p-5 border border-[#FFC107]/30 space-y-3">
            <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider block">
              Hali ya Kisheria (3-Way Valve Status)
            </span>

            <div className={`p-4 rounded-xl border flex items-center gap-3 ${
              isPpmCompliant
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
            }`}>
              {isPpmCompliant ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0" />
              )}
              <div>
                <h4 className="text-sm font-black">
                  {isPpmCompliant ? 'OVERBOARD PERMITTED (Kuruhusiwa)' : 'ALARM & RECIRCULATION TRIPPED!'}
                </h4>
                <p className="text-xs mt-0.5 opacity-90">
                  {isPpmCompliant
                    ? `Kiwango cha ${oilPpm} PPM kiko chini ya kikomo cha 15 PPM. Vali ya overboard iko wazi.`
                    : `Kiwango cha ${oilPpm} PPM kimezidi 15 PPM! Vali ya njia 3 imefunga overboard na kugeuza maji kurudi bilge holding tank.`}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
              <span>Mahitaji ya Logbook:</span>
              <span className="font-bold text-white">ORB Code 15.2 (Retain records for 3 yrs)</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
