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
      title: 'Pre-Departure Engine Room Checklist (Kabla ya Kuondoka Bandarini)',
      subtitle: 'Ukaguzi wa masaa 2 kabla ya Stand-By for Engine (SBE) kulingana na SOLAS Ch. II-1',
      icon: Ship,
      items: [
        { id: 'dep-1', text: 'Kujaribu Steering Gear (Primary na Secondary pumps, 35°P hadi 30°S < 28s)', hint: 'Pima rudder angle indicator na simu ya darajani' },
        { id: 'dep-2', text: 'Kupima Main Engine Lube Oil Sump level na kuanzisha Crosshead/Crankcase priming pumps', hint: 'Shinikizo liwe bar 3.5 hadi 4.5' },
        { id: 'dep-3', text: 'Kupuliza hewa (Blow-through) ya injini kuu ikiwa na indicator cocks wazi kwa Turning Gear', hint: 'Kuhakikisha hakuna maji au mafuta ndani ya silinda' },
        { id: 'dep-4', text: 'Kuondoa Turning Gear na kufunga interlock switch', hint: 'Taa ya turning gear engaged lazima izime darajani' },
        { id: 'dep-5', text: 'Kujaribu Engine Telegraph na Bridge Control changeover', hint: 'Hakikisha Daraja na ECR zina amri sawa' },
        { id: 'dep-6', text: 'Kupima shinikizo la Starting Air Receiver (angalau Bar 25 hadi 30)', hint: 'Fungua air drains kutoa maji' },
        { id: 'dep-7', text: 'Kuanzisha Auxiliary Blowers za injini kuu na kuziweka kwenye Auto mode', hint: 'Blowers huanza kusaidia hewa ya scavenge chini ya 40% load' },
        { id: 'dep-8', text: 'Kuweka Majenereta mawili sambamba (Parallel) kwa ajili ya usalama wa bow thruster', hint: 'Kuzuia blackout wakati wa maneuvering' },
      ],
    },
    watch: {
      title: '4-Hour Sea Watchkeeping Round (Ukaguzi wa Zamu ya Masaa 4)',
      subtitle: 'Ukaguzi wa kiwango cha STCW Regulation III/1 na UMS Night Inspection',
      icon: ClipboardCheck,
      items: [
        { id: 'wt-1', text: 'Kukagua joto la moshi wa silinda zote (Exhaust Temperatures) na tofauti ya Pmax', hint: 'Tofauti isizidi ±25°C kati ya silinda' },
        { id: 'wt-2', text: 'Kupima viwango vya mafuta kwenye Main Engine Sump, Turbocharger na Stern Tube Gravity Tank', hint: 'Hakikisha hakuna ongezeko linaloashiria maji' },
        { id: 'wt-3', text: 'Kukagua Scavenge Air Receiver drains na kuangalia kama kuna masizi mazito au moto', hint: 'Gusa kuta za scavenge kuhakikisha hazina joto lisilo la kawaida' },
        { id: 'wt-4', text: 'Kupima maji ya bilges kwenye Well za Forward na Aft', hint: 'Hakikisha hakuna uvujaji mpya wa mabomba' },
        { id: 'wt-5', text: 'Kukagua Purifiers zote mbili: Joto la HFO (98°C) na shinikizo la backpressure', hint: 'Hakikisha hakuna overflow kuelekea sludge tank' },
        { id: 'wt-6', text: 'Kukagua Auxiliary Boiler: Shinikizo la mvuke (Bar 7-9), water level glass na burner flame', hint: 'Jaribu water gauge glass kwa kutoa blowdown' },
        { id: 'wt-7', text: 'Kukagua Steering Gear Room: Hakuna uvujaji wa mafuta kwenye rams, joto la mota kawaida', hint: 'Angalia kama hunting gear iko katikati' },
      ],
    },
    bunker: {
      title: 'Bunkering Operations & SOPEP Safety Checklist',
      subtitle: 'Taratibu za usalama za ISGOTT kabla, wakati na baada ya kupokea mafuta',
      icon: Flame,
      items: [
        { id: 'bk-1', text: 'Kufanya Mkutano wa Usalama (Safety Meeting) na kusaini Bunkering Checklist na Barge Master', hint: 'Kukubaliana kiwango cha kusukuma (pumping rate) na ishara ya Emergency Stop' },
        { id: 'bk-2', text: 'Kuziba Deck Scuppers zote kwa plugs za simenti au mpira na kuweka unga wa sawdust', hint: 'Kuzuia mafuta yasiingie baharini yakimwagika staha' },
        { id: 'bk-3', text: 'Kupandisha bendera nyekundu "BRAVO" mchana na taa nyekundu usiku', hint: 'Alama ya kimataifa ya kubeba/kupokea vitu vinavyowaka' },
        { id: 'bk-4', text: 'Kujaribu mfumo wa Emergency Shutdown (ESD) na mawasiliano ya walkie-talkie', hint: 'Hakikisha redio ni Intrinsically Safe (Ex-proof)' },
        { id: 'bk-5', text: 'Kuweka chupa 4 za sampuli za MARPOL chini ya drip continuous needle sampler', hint: 'Sampuli 1 ya meli, 1 ya barge, 1 ya maabara, 1 ya MARPOL kisheria' },
        { id: 'bk-6', text: 'Kuanza kusukuma kwa kasi ndogo (slow rate) na kukagua mzinga wa kwanza unaojazwa', hint: 'Pima sounding mara baada ya dakika 5 za mwanzo' },
        { id: 'bk-7', text: 'Kudumisha kiwango cha kujaza kisizidi 85% hadi 90% ya mzinga (Topping off)', hint: 'Kutoa nafasi ya kutanuka kwa joto na kuzuia overflow' },
      ],
    },
    enclosed: {
      title: 'Enclosed Space Entry Permit Checklist (Kuingia Ndani ya Mizinga)',
      subtitle: 'Utekelezaji wa ISM Code & IMO Resolution A.1050(27) kuzuia vifo vya kukosa hewa',
      icon: ShieldCheck,
      items: [
        { id: 'enc-1', text: 'Uingizaji hewa kwa feni (Mechanical Forced Ventilation) kwa angalau masaa 24', hint: 'Hakikisha feni inasukuma hewa hadi chini kabisa ya mzinga' },
        { id: 'enc-2', text: 'Kupima Oksijeni kwa Multi-Gas Detector iliyofanyiwa Calibration: Lazima iwe 20.9%', hint: 'Pima katika viwango 3: Juu, Katikati, na Chini' },
        { id: 'enc-3', text: 'Kupima Gesi Zinazowaka: Flammable gases chini ya 1% ya LEL', hint: 'Hakikisha hakuna mvuke wa hydrocarbon' },
        { id: 'enc-4', text: 'Kupima Gesi za Sumu: CO < 25 ppm, H2S < 5 ppm', hint: 'Hasa kwenye mizinga ya sewage au mafuta mazito' },
        { id: 'enc-5', text: 'Kuweka Mlinzi wa Nje (Standby Person) mwenye walkie-talkie na orodha ya majina ya walioingia', hint: 'Mlinzi hatakiwi kuingia ndani hata mtu akizimia hadi timu ya uokozi ifike' },
        { id: 'enc-6', text: 'Kuweka vifaa vya uokozi mlangoni: SCBA, Resuscitation kit, stretcher, na kamba ya usalama', hint: 'Weka taa za 24V explosion-proof ndani ya mzinga' },
      ],
    },
    blackout: {
      title: 'Blackout & Dead Ship Emergency Recovery Drill',
      subtitle: 'Hatua za dharura za kurejesha umeme wa meli baada ya giza totoro baharini',
      icon: AlertOctagon,
      items: [
        { id: 'bl-1', text: 'Kukagua kama Emergency Diesel Generator (EDG) imewaka na kulisha ESB ndani ya sekunde 45', hint: 'Hakikisha usukani na taa za navigation zimewaka' },
        { id: 'bl-2', text: 'Kuingia engine room kwa usalama ukiwa na tochi ya usalama (Ex-proof torch)', hint: 'Usiguse switchboards za ghafla kabla ya kutathmini' },
        { id: 'bl-3', text: 'Kutenga jenereta iliyosababisha hitilafu na kuweka main circuit breaker kwenye neutral', hint: 'Zima mizigo mikubwa (Heavy consumers tripping)' },
        { id: 'bl-4', text: 'Kuanzisha Emergency Air Compressor na kujaza chupa ya hewa ya dharura hadi bar 25', hint: 'Hewa inahitajika kuwasha jenereta ya kawaida' },
        { id: 'bl-5', text: 'Kuwasha Diesel Generator namba 1 na kufunga breaker kwenye Main Switchboard', hint: 'Angalia frequency 60Hz na voltage 440V' },
        { id: 'bl-6', text: 'Kuanzisha kwa mfululizo (sequential): Pampu za Sea Water, Fresh Water, Lube Oil na Boilers', hint: 'Kamwe usianze pampu zote kwa wakati mmoja kuzuia overload' },
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
  const progressPercent = Math.round((completedCount / current.items.length) * 100);

  return (
    <section id="marine-checklists" className="my-8 rounded-3xl bg-zinc-950 p-6 sm:p-8 border border-white/10 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#FFC107] uppercase tracking-wider">
              SAN25 Safety Management System
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              SOLAS & STCW Compliant
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white editorial-font">
            Orodha ya Ukaguzi wa Chumba cha Mitambo (Engine Room Checklists)
          </h2>
        </div>

        {/* Progress & Reset */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-bold text-zinc-400">Maendeleo:</span>
            <div className="text-sm font-black text-[#FFC107]">
              {completedCount} / {current.items.length} ({progressPercent}%)
            </div>
          </div>
          <button
            onClick={resetCurrentChecklist}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Weka Upya Orodha Hii"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(checklists).map(([key, data]) => {
          const Icon = data.icon;
          const isActive = activeChecklist === key;
          return (
            <button
              key={key}
              onClick={() => setActiveChecklist(key as any)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FFC107] text-black font-black shadow-md'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{data.title.split('(')[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Active Checklist Card */}
      <div className="bg-zinc-900/90 rounded-2xl p-5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white">{current.title}</h3>
            <p className="text-xs text-zinc-400">{current.subtitle}</p>
          </div>
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFC107] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-2.5 pt-2">
          {current.items.map((item, idx) => {
            const isDone = !!completedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                    : 'bg-black/50 border-white/5 hover:border-[#FFC107]/40 text-zinc-200'
                }`}
              >
                <button className="mt-0.5 text-[#FFC107] shrink-0">
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-zinc-500" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500">#{idx + 1}</span>
                    <span className={`text-xs font-bold leading-snug ${isDone ? 'line-through opacity-75' : 'text-white'}`}>
                      {item.text}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 pl-4 border-l-2 border-white/10">
                    💡 <span className="italic">{item.hint}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
