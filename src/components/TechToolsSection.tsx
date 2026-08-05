import React from 'react';
import { Briefcase, Code, DollarSign, Terminal, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export const TechToolsSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = React.useState<string>('fullstack');
  const [experienceLevel, setExperienceLevel] = React.useState<string>('mid');
  const [weeklyHours, setWeeklyHours] = React.useState<number>(30);

  const rolesData: Record<string, { title: string; baseRate: number; stack: string[]; demand: string }> = {
    fullstack: {
      title: 'Full-Stack Developer (React & Node/TypeScript)',
      baseRate: 35,
      stack: ['React', 'TypeScript', 'Node.js', 'Tailwind', 'PostgreSQL'],
      demand: 'Juu Sana (High)',
    },
    ai: {
      title: 'AI Prompt Engineer & Agent Specialist',
      baseRate: 45,
      stack: ['Python', 'Gemini API', 'LangChain', 'LlamaIndex', 'Vector DBs'],
      demand: 'Kasi Kubwa Zaidi (Extreme)',
    },
    mobile: {
      title: 'Mobile App Developer (Flutter / React Native)',
      baseRate: 30,
      stack: ['React Native', 'Flutter', 'Firebase', 'GraphQL', 'iOS/Android'],
      demand: 'Juu (High)',
    },
    cyber: {
      title: 'Cloud Security & Zero-Trust Auditor',
      baseRate: 50,
      stack: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform'],
      demand: 'Muhimu Sana (Critical)',
    },
  };

  const getMultiplier = () => {
    if (experienceLevel === 'junior') return 0.7;
    if (experienceLevel === 'mid') return 1.0;
    return 1.6;
  };

  const currentRole = rolesData[selectedRole];
  const hourlyRate = Math.round(currentRole.baseRate * getMultiplier());
  const monthlyEarnings = Math.round(hourlyRate * weeklyHours * 4);

  return (
    <section id="tech-tools" className="my-12">
      <div className="glass border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                SANTECH DEV TOOLKIT 2026
              </span>
            </div>
            <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Terminal className="w-6 h-6 text-[#10b981]" />
              Kikokotoo cha Kipato cha Kazi za Mbali (Remote Tech Salary Estimator)
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Kadiria mapato yako kwa kazi za kimataifa (USD) na ugundue Tech Stack inayotafutwa zaidi 2026.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Form Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Role Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Chagua Taani ya Kazi (Tech Role):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(rolesData).map(([key, role]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedRole(key)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedRole === key
                        ? 'bg-[#10b981]/15 border-[#10b981] text-white shadow-lg'
                        : 'bg-zinc-950/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-bold">{role.title}</div>
                    <div className="text-[10px] text-[#10b981] mt-1 font-mono">
                      Demand: {role.demand}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                Kiwango cha Uzoefu (Experience Level):
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'junior', label: 'Junior (Mwaka 1-2)' },
                  { id: 'mid', label: 'Mid-Level (Miaka 3-5)' },
                  { id: 'senior', label: 'Senior (Miaka 5+)' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setExperienceLevel(lvl.id)}
                    className={`p-2.5 rounded text-xs font-bold text-center border transition-all cursor-pointer ${
                      experienceLevel === lvl.id
                        ? 'bg-[#10b981] text-black border-[#10b981]'
                        : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hours per week */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Masaa ya Kazi kwa Wiki:
                </label>
                <span className="text-xs font-mono font-bold text-[#10b981]">{weeklyHours} Masaa/Wiki</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-[#10b981] cursor-pointer"
              />
            </div>
          </div>

          {/* Result Output Card (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-950 p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                KADIRIO LA MAPATO (ESTIMATED EARNINGS)
              </span>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#10b981]">
                  ${monthlyEarnings.toLocaleString()} <span className="text-xs text-zinc-400 font-sans">/ mwezi</span>
                </div>
                <div className="text-xs font-mono text-amber-400">
                  ≈ TSh {(monthlyEarnings * 2650).toLocaleString()} (Kiwango cha TZS 2026)
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Kiwango cha Saa (Hourly Rate):</span>
                  <span className="font-mono font-bold text-white">${hourlyRate} / hr</span>
                </div>
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Masaa kwa Mwezi:</span>
                  <span className="font-mono font-bold text-white">{weeklyHours * 4} hrs</span>
                </div>
              </div>

              {/* Stack Recommendation */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Tech Stack Inayoshauriwa:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentRole.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded bg-zinc-900 border border-white/10 text-xs text-[#10b981] font-mono font-bold flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" /> {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-[#10b981]/10 rounded-xl border border-[#10b981]/20 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#10b981] shrink-0" />
              <p className="text-xs text-zinc-300">
                Unataka kujifunza ujuzi huu? Tumia <strong className="text-white">SANTECH AI Assistant</strong> iliyopo pembeni kupata kozi za bure!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
