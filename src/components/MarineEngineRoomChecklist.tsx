import React, { useState } from 'react';
import { ClipboardCheck, CheckSquare, Square, AlertOctagon, Ship, ShieldCheck, Flame, RotateCcw } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  hint: string;
}

export const MarineEngineRoomChecklist: React.FC = () => {
  const [activeChecklist, setActiveChecklist] = useState<'departure' | 'watch' | 'bunker' | 'enclosed' | 'blackout'>('departure');
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const checklists: Record<string, { title: string; subtitle: string; icon: any; items: ChecklistItem[] }> = {
    departure: {
      title: 'Pre-Departure Engine Room Checklist (SBE Preparations)',
      subtitle: '2-hour inspection routine before Stand-By for Engine under SOLAS Chapter II-1',
      icon: Ship,
      items: [
        { id: 'dep-1', text: 'Test Steering Gear: Primary & secondary hydraulic pumps, 35°P to 30°S in under 28s', hint: 'Verify rudder angle repeater and bridge sound-powered telephone' },
        { id: 'dep-2', text: 'Check Main Engine Lube Oil Sump level and start crosshead & crankcase priming pumps', hint: 'Maintain delivery pressure between 3.5 and 4.5 bar' },
        { id: 'dep-3', text: 'Perform Main Engine Air Blow-Through with indicator cocks open on turning gear', hint: 'Verify no fuel oil or coolant accumulation in cylinder combustion chambers' },
        { id: 'dep-4', text: 'Disengage Turning Gear and confirm electrical interlocking switch engages', hint: 'Confirm turning gear engaged warning lamp extinguishes on bridge console' },
        { id: 'dep-5', text: 'Conduct Engine Telegraph and Bridge/ECR control transfer tests', hint: 'Ensure emergency bridge telegraph responds to all bell orders' },
        { id: 'dep-6', text: 'Check Starting Air Receivers (pressure at least 25 to 30 bar)', hint: 'Open receiver bottom drain valves to purge moisture and oil carryover' },
        { id: 'dep-7', text: 'Start Main Engine Auxiliary Blowers and verify Auto-Start sequencing', hint: 'Blowers must cut in automatically when scavenge pressure drops below 0.4 bar' },
        { id: 'dep-8', text: 'Synchronize two Diesel Generators in parallel for bow thruster capacity reserve', hint: 'Eliminates blackout vulnerability during harbor maneuvering maneuvers' },
      ],
    },
    watch: {
      title: '4-Hour Sea Watchkeeping Round (Engine Room Patrol)',
      subtitle: 'Inspection standards complying with STCW Regulation III/1 and UMS unattended machinery checklists',
      icon: ClipboardCheck,
      items: [
        { id: 'wt-1', text: 'Log individual cylinder exhaust temperatures and verify Pmax cylinder balancing', hint: 'Exhaust temperature variation across cylinders must not exceed ±25°C' },
        { id: 'wt-2', text: 'Check lube oil levels in ME Sump, Turbochargers, and Stern Tube Gravity Tank', hint: 'Watch for sudden level increases signaling internal coolant water contamination' },
        { id: 'wt-3', text: 'Inspect Scavenge Air Receiver drains for heavy carbon accumulation and oil mist', hint: 'Feel scavenge manifold surfaces to detect early localized hot spots' },
        { id: 'wt-4', text: 'Sound engine room bilge wells (Forward, Aft, and Shaft Tunnel)', hint: 'Investigate sudden bilge rise to identify leaking pipe flanges or pump glands' },
        { id: 'wt-5', text: 'Inspect Centrifugal Purifiers: Verify HFO separation temp (98°C) and backpressure', hint: 'Confirm zero seal water loss or heavy fuel overflow into sludge holding tank' },
        { id: 'wt-6', text: 'Inspect Auxiliary Boiler: Steam working pressure (7-9 bar), water glass, burner flame', hint: 'Test water level gauge glass by performing operational blowdown sequence' },
        { id: 'wt-7', text: 'Inspect Steering Flat: Hydraulic ram gland packing dry, motor operating temperatures normal', hint: 'Verify hunting lever return mechanism settles exactly on midships zero' },
      ],
    },
    bunker: {
      title: 'Bunkering Operations & SOPEP Environmental Safety Checklist',
      subtitle: 'ISGOTT and MARPOL Annex VI statutory safety controls prior to and during oil transfer',
      icon: Flame,
      items: [
        { id: 'bk-1', text: 'Hold Pre-Transfer Safety Meeting and sign Ship-Shore Bunkering Checklist with Barge Master', hint: 'Agree on maximum pumping rates, line pressures, and emergency shutdown hand signals' },
        { id: 'bk-2', text: 'Seal all Main Deck Scuppers with mechanical expanding plugs and deploy sawdust/absorbents', hint: 'Mandatory oil spill containment measure preventing deck runoff into harbor' },
        { id: 'bk-3', text: 'Hoist International Code Flag "BRAVO" by day; display 360° all-round red light by night', hint: 'Universal maritime signal designating dangerous flammable liquid transfer' },
        { id: 'bk-4', text: 'Test Emergency Shutdown (ESD) trips and verify intrinsically safe Ex-proof UHF radios', hint: 'Radios must meet ATEX/IECEx intrinsically safe gas zone classification' },
        { id: 'bk-5', text: 'Mount official MARPOL continuous drip manifold sampler with clean sealed bottles', hint: 'Four samples required: 1 for vessel, 1 for supplier, 1 for lab, 1 for statutory MARPOL custody' },
        { id: 'bk-6', text: 'Commence bunkering at slow initial flow rate and verify fuel entry into intended tank', hint: 'Take manual soundings within the first 5 minutes to detect manifold line misalignment' },
        { id: 'bk-7', text: 'Observe maximum 85%-90% filling limit when topping off fuel storage tanks', hint: 'Provides thermal volumetric expansion margin and prevents catastrophic air vent overflows' },
      ],
    },
    enclosed: {
      title: 'Enclosed Space Entry Permit Checklist (Tank Safety)',
      subtitle: 'ISM Code & IMO Resolution A.1050(27) statutory procedures preventing asphyxiation fatalities',
      icon: ShieldCheck,
      items: [
        { id: 'enc-1', text: 'Maintain mechanical forced ventilation for a minimum continuous duration of 24 hours', hint: 'Ventilation trunking must extend to lowest bottom corners of deep tanks' },
        { id: 'enc-2', text: 'Atmospheric Gas Testing with calibrated multi-gas detector: Oxygen strictly 20.9%', hint: 'Test at multiple vertical depths: top, mid-level, and tank bottom sole' },
        { id: 'enc-3', text: 'Verify Flammable Hydrocarbon Gas Level: Must register less than 1% of LEL', hint: 'Confirm catalytic bead sensor zeroed in clean ambient atmospheric air' },
        { id: 'enc-4', text: 'Verify Toxic Gases: Carbon Monoxide (CO) < 25 ppm, Hydrogen Sulfide (H2S) < 5 ppm', hint: 'Crucial for sewage double bottoms, ballast tanks, and heavy fuel tanks' },
        { id: 'enc-5', text: 'Station dedicated Standby Person at manhole entrance with emergency UHF radio and entry log', hint: 'Sentry must NEVER enter compartment under any circumstances until rescue team arrives' },
        { id: 'enc-6', text: 'Position emergency resuscitation kit, SCBA apparatus, Neil Robertson stretcher at hatch coaming', hint: 'Rig 24V explosion-proof inspection handlamps inside compartment' },
      ],
    },
    blackout: {
      title: 'Vessel Blackout & Dead Ship Emergency Recovery Drill',
      subtitle: 'Critical sequential actions for emergency electrical power restoration in machinery spaces',
      icon: AlertOctagon,
      items: [
        { id: 'bl-1', text: 'Verify Emergency Diesel Generator (EDG) starts automatically and powers ESB within 45s', hint: 'Confirm steering gear emergency power and bridge navigation aids are energized' },
        { id: 'bl-2', text: 'Enter machinery spaces safely using certified explosion-proof personal torches', hint: 'Do not randomly throw circuit breakers without evaluating root cause faults' },
        { id: 'bl-3', text: 'Isolate tripped generator unit and verify non-essential heavy load tripping', hint: 'Shed large electrical loads (thrusters, air conditioning, galley ovens)' },
        { id: 'bl-4', text: 'Start Emergency Air Compressor (hand crank or independent diesel) to charge starting air', hint: 'Pressurize emergency air bottle to at least 25 bar for main auxiliary diesel start' },
        { id: 'bl-5', text: 'Start Auxiliary Diesel Generator No. 1 and close breaker onto Main Switchboard busbar', hint: 'Verify voltage settles at 440V and system frequency stabilizes at 60 Hz' },
        { id: 'bl-6', text: 'Sequentially restart vital auxiliary service pumps: Sea Water, Fresh Water, Lube Oil, Boilers', hint: 'Never start all large electrical motors simultaneously to prevent second blackout trip' },
      ],
    },
  };

  const current = checklists[activeChecklist];

  const toggleItem = (id: string) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetCurrentChecklist = () => {
    const updated = { ...completedItems };
    current.items.forEach((item) => {
      delete updated[item.id];
    });
    setCompletedItems(updated);
  };

  const completedCount = current.items.filter((item) => completedItems[item.id]).length;
  const isAllDone = completedCount === current.items.length;

  return (
    <section id="marine-checklists" className="my-8 rounded-3xl bg-zinc-950 p-6 sm:p-8 border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFC107] text-black flex items-center justify-center font-black shadow-lg">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#FFC107] uppercase tracking-wider">
                ISM & STCW Operations
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Audit Verified
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white editorial-font">
              Marine Engine Room Operational Checklists
            </h2>
          </div>
        </div>
        <p className="text-xs text-zinc-400 max-w-sm">
          Interactive watchkeeping and emergency response checklists meeting Class 1 Chief Engineer and Port State Control inspection standards.
        </p>
      </div>

      {/* Checklist Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        <button
          onClick={() => setActiveChecklist('departure')}
          className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeChecklist === 'departure'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/5'
          }`}
        >
          <Ship className="w-3.5 h-3.5" />
          <span>Pre-Departure</span>
        </button>

        <button
          onClick={() => setActiveChecklist('watch')}
          className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeChecklist === 'watch'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/5'
          }`}
        >
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>4-Hour Rounds</span>
        </button>

        <button
          onClick={() => setActiveChecklist('bunker')}
          className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeChecklist === 'bunker'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/5'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Bunkering SOPEP</span>
        </button>

        <button
          onClick={() => setActiveChecklist('enclosed')}
          className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeChecklist === 'enclosed'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/5'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Enclosed Space</span>
        </button>

        <button
          onClick={() => setActiveChecklist('blackout')}
          className={`p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeChecklist === 'blackout'
              ? 'bg-[#FFC107] text-black font-black shadow-lg scale-102'
              : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-white/5'
          }`}
        >
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Blackout Recovery</span>
        </button>
      </div>

      {/* Progress & Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-zinc-900/80 rounded-2xl border border-white/10 mb-4">
        <div>
          <h3 className="text-base font-black text-white">{current.title}</h3>
          <p className="text-xs text-zinc-400 mt-0.5">{current.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs font-bold">
            <span className={isAllDone ? 'text-emerald-400 font-black' : 'text-[#FFC107]'}>
              {completedCount} / {current.items.length} Completed
            </span>
          </div>

          <button
            onClick={resetCurrentChecklist}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Reset Checklist"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {current.items.map((item) => {
          const isDone = !!completedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-zinc-300'
                  : 'bg-black/50 border-white/5 hover:border-white/20 text-white'
              }`}
            >
              <button className="mt-0.5 shrink-0 text-[#FFC107]">
                {isDone ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-zinc-500" />}
              </button>

              <div className="flex-1 min-w-0">
                <span className={`text-xs font-bold block ${isDone ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                  {item.text}
                </span>
                <span className="text-[11px] text-zinc-400 mt-0.5 block italic">
                  {item.hint}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
