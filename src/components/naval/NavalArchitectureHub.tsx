import React, { useState } from 'react';
import {
  Waves,
  Compass,
  Layers,
  BookOpen,
  Anchor,
  Ship,
  Sliders,
  CheckCircle2,
  FileCode2,
  Cpu
} from 'lucide-react';
import { ShipHydrodynamicsModule } from './ShipHydrodynamicsModule';
import { ShipStabilityModule } from './ShipStabilityModule';
import { ShipDesignMethodologyModule } from './ShipDesignMethodologyModule';

interface NavalArchitectureHubProps {
  initialTab?: 'hydrodynamics' | 'stability' | 'design' | 'formulas';
  onNavigateSubpage?: (category: string, slug: string) => void;
}

export const NavalArchitectureHub: React.FC<NavalArchitectureHubProps> = ({
  initialTab = 'hydrodynamics',
  onNavigateSubpage,
}) => {
  const [activeTab, setActiveTab] = useState<'hydrodynamics' | 'stability' | 'design' | 'formulas'>(initialTab);

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Navigation Sub-Tabs Bar (Clean Segmented Anti-Slop Buttons) */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('hydrodynamics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'hydrodynamics'
                ? 'bg-[#FFC107] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>Ship Hydrodynamics (Resistance & Powering)</span>
          </button>

          <button
            onClick={() => setActiveTab('stability')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'stability'
                ? 'bg-[#FFC107] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Ship Stability (GZ Curve & IMO 2008)</span>
          </button>

          <button
            onClick={() => setActiveTab('design')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'design'
                ? 'bg-[#FFC107] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Ship Design Methodology (Design Spiral)</span>
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'formulas'
                ? 'bg-[#FFC107] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Fomula & Mwongozo wa Kinadharia</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 text-[11px] font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Naval Architecture Suite</span>
        </div>
      </div>

      {/* Render Active Module */}
      {activeTab === 'hydrodynamics' && <ShipHydrodynamicsModule />}
      {activeTab === 'stability' && <ShipStabilityModule />}
      {activeTab === 'design' && <ShipDesignMethodologyModule />}

      {activeTab === 'formulas' && (
        <section className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-4">
            <h2 className="text-2xl font-black text-white editorial-font flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-[#FFC107]" />
              Fomula Kuu za Naval Architecture & Hydrodynamics (Handbook)
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Mkusanyiko wa fomula za msingi za kihandisi zinazotumika na mainjinia wa usanifu wa meli
              na wakaguzi wa bodi za kimataifa (DNV, Lloyd's Register, American Bureau of Shipping, Bureau Veritas, TASAC).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hydrodynamics Section */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-base font-black text-[#FFC107] uppercase tracking-wider flex items-center gap-2">
                <Waves className="w-5 h-5" /> 1. Hydrodynamics & Resistance
              </h3>
              <div className="space-y-3 text-xs text-zinc-300 font-mono">
                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">ITTC 1957 Model-Ship Correlation Line:</span>
                  <div className="text-[#FFC107] text-sm font-bold">C_F = 0.075 / (log10(Rn) - 2)²</div>
                  <span className="text-[11px] text-zinc-500">Inatoa mgawo wa msuguano wa maji kwenye ukuta wa meli.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Froude Number (Fn):</span>
                  <div className="text-white text-sm font-bold">Fn = V / √(g · L_BP)</div>
                  <span className="text-[11px] text-zinc-500">Kipimo kikuu cha tabia ya mawimbi na wave-making resistance.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Mlinganyo Kamili wa Hughes & ITTC:</span>
                  <div className="text-white text-sm font-bold">R_T = (1 + k) · R_F + R_W + R_APP + R_AA</div>
                  <span className="text-[11px] text-zinc-500">(1+k) ni form factor inayowakilisha viscous pressure drag.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Quasi-Propulsive Coefficient (η_D):</span>
                  <div className="text-emerald-400 text-sm font-bold">η_D = η_H · η_O · η_R</div>
                  <span className="text-[11px] text-zinc-500">P_E = R_T · V, P_D = P_E / η_D, P_B = P_D / η_shaft.</span>
                </div>
              </div>
            </div>

            {/* Ship Stability Section */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-base font-black text-[#FFC107] uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-5 h-5" /> 2. Ship Hydrostatics & Stability
              </h3>
              <div className="space-y-3 text-xs text-zinc-300 font-mono">
                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Transverse Metacentric Height (GM):</span>
                  <div className="text-[#FFC107] text-sm font-bold">GM = KB + BM - KG</div>
                  <span className="text-[11px] text-zinc-500">BM = I_T / ∇ ambapo I_T ni transverse moment of inertia ya waterplane.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Free Surface Effect (FSE):</span>
                  <div className="text-rose-400 text-sm font-bold">ΔKG_FSE = Σ (i · ρ_liquid) / Δ</div>
                  <span className="text-[11px] text-zinc-500">i = (l · b³) / 12 kwa kila tanki lililo nusu (slack tank).</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Righting Lever Wall-Sided Formula:</span>
                  <div className="text-white text-sm font-bold">GZ = GM · sin(θ) + ½ BM · tan²(θ) · sin(θ)</div>
                  <span className="text-[11px] text-zinc-500">Inatumika kwa pembe za kuinama (heel) chini ya deck immersion.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Moment to Change Trim 1 cm (MCTc):</span>
                  <div className="text-emerald-400 text-sm font-bold">MCTc = (Δ · GM_L) / (100 · L_BP)</div>
                  <span className="text-[11px] text-zinc-500">Trim t = Trimming Moment / (MCTc · 100).</span>
                </div>
              </div>
            </div>

            {/* Design Methodology Section */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-base font-black text-[#FFC107] uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-5 h-5" /> 3. Design Spiral & Sizing Proportions
              </h3>
              <div className="space-y-3 text-xs text-zinc-300 font-mono">
                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Kadirio la Urefu la Posdunine:</span>
                  <div className="text-[#FFC107] text-sm font-bold">L = c · (V / (V + 2))² · ∇^(1/3)</div>
                  <span className="text-[11px] text-zinc-500">c inategemea aina ya meli (c = 7.0 hadi 8.5).</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Prismatic Coefficient (Cp):</span>
                  <div className="text-white text-sm font-bold">C_P = C_B / C_M</div>
                  <span className="text-[11px] text-zinc-500">Inaeleza mtawanyiko wa ujazo kutoka katikati kuelekea ncha za meli.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Watson & Gilfillan Steel Weight Estimation:</span>
                  <div className="text-white text-sm font-bold">W_steel = K · L^1.65 · B · D^0.65</div>
                  <span className="text-[11px] text-zinc-500">Inatofautiana kulingana na bulkheads na idadi ya sitaha (decks).</span>
                </div>
              </div>
            </div>

            {/* Structural Rules Section */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-base font-black text-[#FFC107] uppercase tracking-wider flex items-center gap-2">
                <FileCode2 className="w-5 h-5" /> 4. IACS CSR & Structural Scantlings
              </h3>
              <div className="space-y-3 text-xs text-zinc-300 font-mono">
                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Minimum Midship Section Modulus:</span>
                  <div className="text-[#FFC107] text-sm font-bold">Z_min = C1 · L² · B · (C_B + 0.7) [cm³]</div>
                  <span className="text-[11px] text-zinc-500">C1 = 10.75 - ((300 - L)/100)^1.5 kwa 90m ≤ L ≤ 300m.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Bottom Shell Plating Minimum Thickness:</span>
                  <div className="text-white text-sm font-bold">t = 1.9 · s · √(T) + t_k [mm]</div>
                  <span className="text-[11px] text-zinc-500">s = frame spacing (m), t_k = corrosion addition (kawaida 2.5mm).</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Hull Girder Bending Stress:</span>
                  <div className="text-emerald-400 text-sm font-bold">σ = (M_SW + M_WV) / Z ≤ σ_perm</div>
                  <span className="text-[11px] text-zinc-500">M_SW = Still Water Moment, M_WV = Wave Bending Moment (Hogging / Sagging).</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
