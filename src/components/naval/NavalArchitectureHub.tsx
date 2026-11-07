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
  Cpu,
  GraduationCap,
  Wrench,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { ShipHydrodynamicsModule } from './ShipHydrodynamicsModule';
import { ShipStabilityModule } from './ShipStabilityModule';
import { ShipDesignMethodologyModule } from './ShipDesignMethodologyModule';
import { ShipManeuveringModule } from './ShipManeuveringModule';
import { DrydockingModule } from './DrydockingModule';
import { AcademicLibrarySection } from '../academic/AcademicLibrarySection';

interface NavalArchitectureHubProps {
  initialTab?: 'hydrodynamics' | 'stability' | 'design' | 'maneuvering' | 'drydocking' | 'library' | 'formulas';
  onNavigateSubpage?: (category: string, slug: string) => void;
}

export const NavalArchitectureHub: React.FC<NavalArchitectureHubProps> = ({
  initialTab = 'hydrodynamics',
  onNavigateSubpage,
}) => {
  const [activeTab, setActiveTab] = useState<'hydrodynamics' | 'stability' | 'design' | 'maneuvering' | 'drydocking' | 'library' | 'formulas'>(initialTab);

  const navTabs = [
    { id: 'hydrodynamics' as const, label: 'Hydrodynamics & Resistance', icon: Waves },
    { id: 'stability' as const, label: 'Ship Stability & GZ Curves', icon: Compass },
    { id: 'design' as const, label: 'Ship Design & Sizing (NIT SRT 06107)', icon: Layers },
    { id: 'maneuvering' as const, label: 'Maneuvering & Steering (Ch. 6)', icon: Compass },
    { id: 'drydocking' as const, label: 'Drydocking & Maintenance (SRT 04105)', icon: Wrench },
    { id: 'library' as const, label: 'NIT Courseware & Library (10 PDFs)', icon: GraduationCap },
    { id: 'formulas' as const, label: 'Naval Architecture Handbook', icon: BookOpen },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Top Segmented Navigation Tabs */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex flex-wrap items-center gap-1.5">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#FFC107] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden xl:flex items-center gap-2 px-3 text-[11px] font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>NIT Maritime Aligned</span>
        </div>
      </div>

      {/* Render Active Tab Module */}
      {activeTab === 'hydrodynamics' && <ShipHydrodynamicsModule />}
      {activeTab === 'stability' && <ShipStabilityModule />}
      {activeTab === 'design' && <ShipDesignMethodologyModule />}
      {activeTab === 'maneuvering' && <ShipManeuveringModule />}
      {activeTab === 'drydocking' && <DrydockingModule />}
      {activeTab === 'library' && <AcademicLibrarySection />}

      {activeTab === 'formulas' && (
        <section className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-4">
            <h2 className="text-2xl font-black text-white editorial-font flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-[#FFC107]" />
              Naval Architecture & Marine Engineering Theoretical Handbook
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Comprehensive reference of fundamental equations and empirical relationships applied by naval architects, class surveyors (DNV, Lloyd's Register, ABS, Bureau Veritas, TASAC), and MEO candidates.
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
                  <span className="text-[11px] text-zinc-500">Computes boundary layer turbulent frictional skin resistance.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Froude Number (Fn):</span>
                  <div className="text-white text-sm font-bold">Fn = V / √(g · L_BP)</div>
                  <span className="text-[11px] text-zinc-500">Fundamental criterion governing Kelvin wave train patterns and wave-making drag.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Hughes Viscous Decomposition:</span>
                  <div className="text-white text-sm font-bold">R_T = (1 + k) · R_F + R_W + R_APP + R_AA</div>
                  <span className="text-[11px] text-zinc-500">(1+k) represents 3D hull form factor accounting for viscous pressure resistance.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Quasi-Propulsive Coefficient (η_D):</span>
                  <div className="text-emerald-400 text-sm font-bold">η_D = η_H · η_O · η_R</div>
                  <span className="text-[11px] text-zinc-500">Hull efficiency (η_H), Open water efficiency (η_O), Relative rotative efficiency (η_R).</span>
                </div>
              </div>
            </div>

            {/* Ship Stability Section */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-base font-black text-[#FFC107] uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-5 h-5" /> 2. Transverse & Longitudinal Stability
              </h3>
              <div className="space-y-3 text-xs text-zinc-300 font-mono">
                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Transverse Metacentric Height (GM):</span>
                  <div className="text-[#FFC107] text-sm font-bold">GM = KM - KG = (KB + BM) - KG</div>
                  <span className="text-[11px] text-zinc-500">Where BM = I_T / ∇ = (L · B³) / (12 · ∇) for box or actual waterplane.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Wall-Sided Righting Lever (GZ):</span>
                  <div className="text-white text-sm font-bold">GZ = sin(θ) · [GM + ½ · BM · tan²(θ)]</div>
                  <span className="text-[11px] text-zinc-500">Valid up to deck edge immersion angle. Righting Moment = Δ · GZ.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Free Surface Effect (Virtual KG Rise):</span>
                  <div className="text-red-400 text-sm font-bold">ΔKG_fse = (i_tank · ρ_fluid) / (Δ · ρ_water)</div>
                  <span className="text-[11px] text-zinc-500">Moment of inertia i = (l · b³) / 12. Longitudinal bulkheads divide effect by n².</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Drydocking Critical Upthrust (NIT SRT 04105):</span>
                  <div className="text-amber-300 text-sm font-bold">P = (Trim_cm · MCT1cm) / a,  Loss of GM = (P · KM) / W</div>
                  <span className="text-[11px] text-zinc-500">Governs stability reserve before breast shores take weight.</span>
                </div>
              </div>
            </div>

            {/* Design & Steel Weight Estimation (NIT SRT 06107) */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-base font-black text-[#FFC107] uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-5 h-5" /> 3. Design Methodology & Steel Sizing (SRT 06107)
              </h3>
              <div className="space-y-3 text-xs text-zinc-300 font-mono">
                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Method of Differences (NIT):</span>
                  <div className="text-[#FFC107] text-sm font-bold">Ws = Wso · [1 + 0.85(ΔL/Lo) + 0.55(ΔB/Bo) + 0.30(ΔD/Do)]</div>
                  <span className="text-[11px] text-zinc-500">Empirical coefficients from parent vessel dimensional shifts.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Buxton Cubic Number Formula:</span>
                  <div className="text-white text-sm font-bold">CN = (L_BP · B · D) / 100,  Ws = 0.0487 · CN^1.077</div>
                  <span className="text-[11px] text-zinc-500">Applies to merchant cargo vessels and bulk ships.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Form Coefficients (NIT SRT 04104):</span>
                  <div className="text-white text-sm font-bold">C_B = ∇ / (L·B·T),  C_M = A_M / (B·T),  C_P = C_B / C_M</div>
                  <span className="text-[11px] text-zinc-500">Defines volumetric fullness and prismatic distribution.</span>
                </div>
              </div>
            </div>

            {/* Ship Maneuvering & Squat (Notes Ch. 6 & Barrass) */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-base font-black text-[#FFC107] uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-5 h-5" /> 4. Maneuverability & Shallow Water Squat
              </h3>
              <div className="space-y-3 text-xs text-zinc-300 font-mono">
                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Barrass Shallow Water Squat:</span>
                  <div className="text-[#FFC107] text-sm font-bold">Squat_open = (C_B · V²) / 100,  Squat_confined = (C_B · V²) / 50</div>
                  <span className="text-[11px] text-zinc-500">Calculates bodily sinkage (m) in restricted channels and canals.</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">IMO Turning Circle Criteria (MSC.137(76)):</span>
                  <div className="text-white text-sm font-bold">Advance ≤ 4.5 · L_BP,  Tactical Diameter ≤ 5.0 · L_BP</div>
                  <span className="text-[11px] text-zinc-500">Mandatory trials standard measured at maximum rudder angle (35°).</span>
                </div>

                <div className="p-3 bg-black/50 rounded-xl border border-white/5 space-y-1">
                  <span className="text-zinc-400 font-bold block">Rudder Hydrodynamic Normal Force:</span>
                  <div className="text-emerald-400 text-sm font-bold">F_N = ½ · ρ · A_R · V_R² · C_L(α)</div>
                  <span className="text-[11px] text-zinc-500">Stall occurs at α ≈ 35° on conventional semi-balanced horn rudders.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
