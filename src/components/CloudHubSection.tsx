import React from 'react';
import { Article } from '../types';
import { Server, Cloud, Activity, ArrowRight, BookOpen, Database, Radio, CheckCircle, Share2, CheckCircle2, Wifi, Zap, HardDrive, Cpu } from 'lucide-react';

interface CloudHubSectionProps {
  onSelectArticle: (article: Article) => void;
  articles: Article[];
}

export const CloudHubSection: React.FC<CloudHubSectionProps> = ({
  onSelectArticle,
  articles,
}) => {
  const [selectedRegion, setSelectedRegion] = React.useState<string>('africa-south1');
  const [copiedUrl, setCopiedUrl] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'starlink' | 'datacenters' | 'latency'>('overview');

  const cloudArticles = articles.filter(
    (a) => a.category === 'cloud' || a.tags.some((t) => t.toLowerCase().includes('cloud') || t.toLowerCase().includes('starlink') || t.toLowerCase().includes('server'))
  );

  const regionPings: Record<string, { city: string; ping: string; provider: string; description: string }> = {
    'africa-south1': { city: 'Johannesburg (Afrika Kusini)', ping: '38 ms', provider: 'Google Cloud / AWS', description: 'Kituo cha karibu zaidi chenye kasi kubwa kwa watumiaji wa Afrika Mashariki.' },
    'europe-west1': { city: 'Frankfurt / London (Ulaya)', ping: '115 ms', provider: 'Google Cloud / Hetzner', description: 'Gharama nafuu zaidi kwa seva za kuhifadhi kumbukumbu (Backups).' },
    'me-central1': { city: 'Doha / Dubai (Mashariki ya Kati)', ping: '72 ms', provider: 'AWS / GCP / Azure', description: 'Njia mbadala ya haraka kwa njia ya nyaya za baharini za SEACOM.' },
    'us-east1': { city: 'N. Virginia (Marekani)', ping: '165 ms', provider: 'AWS / GCP / Cloudflare', description: 'Kituo kikuu cha huduma zote za API za Kimataifa (OpenAI, Gemini).' },
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Direct URL Route Indicator & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">URL Rasmi ya Subpage:</span>
          <code className="text-sky-400 bg-black/50 px-2 py-0.5 rounded font-mono font-bold">
            https://santech.tz/#cloud
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#cloud');
            setCopiedUrl(true);
            setTimeout(() => setCopiedUrl(false), 2000);
          }}
          className="flex items-center gap-1 text-[11px] font-bold text-zinc-300 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          {copiedUrl ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          {copiedUrl ? 'Kiungo Kimekopiliwa!' : 'Nakili Kiungo cha Moja kwa Moja'}
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-sky-950/40 to-zinc-950 border border-sky-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-400 text-xs font-black uppercase tracking-wider">
            <Server className="w-4 h-4" />
            Cloud & Miundombinu ya Seva 2026
          </div>

          <h1 className="editorial-font text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Seva za Wingu, <span className="text-sky-400">Starlink Satelaiti</span> & Vituo vya Data Tanzania
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Uchambuzi wa kina wa vituo vya data nchini (Dar es Salaam na Dodoma), intaneti ya kasi ya Starlink vijijini, usanifu wa Docker & Kubernetes kwa startups, na mbinu za kupunguza gharama za seva kwa 60%.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('starlink')}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-black font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-sky-500/20 cursor-pointer"
            >
              <Radio className="w-4 h-4" />
              Starlink vs Fiber Tanzania
            </button>
            <button
              onClick={() => setActiveTab('latency')}
              className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              <Activity className="w-4 h-4 text-sky-400" />
              Pima Kasi ya Seva (Latency)
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </div>

      {/* Subpage Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'overview', label: '1. Muhtasari & Wingu 2026', icon: Cloud },
          { id: 'starlink', label: '2. Starlink & Intaneti Vijijini', icon: Radio },
          { id: 'datacenters', label: '3. Data Centers & Docker', icon: Database },
          { id: 'latency', label: '4. Majaribio ya Kasi (Latency)', icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-sky-500 text-black shadow-lg shadow-sky-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-zinc-900/80 border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-wider">Miundombinu ya Kizazi Kipya</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Kuhama Kutoka Seva za Ndani (On-Premise) Kwenda Multi-Cloud
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Makampuni mengi nchini Tanzania yameanza kuachana na seva za ofisini zinazotumia umeme mwingi na jenereta wakati wa kukatika kwa umeme. Kwa kutumia mifumo ya <strong>Cloud Computing (AWS, Google Cloud, Azure & Cloudflare)</strong>, mifumo inakuwa hewani 99.99% bila kukatika, na data zinahifadhiwa kwenye vituo vitatu tofauti vya kijiografia.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>Serverless Architecture:</strong> Hukulipii seva ya saa 24; unalipa tu wakati mteja anapotembelea tovuti au kufanya muamala.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>Uzingatiaji wa Sheria za Data (Data Residency):</strong> Kuhifadhi taarifa za kiserikali na kibenki kwenye Tier-3 Data Centers nchini Tanzania.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>Upanuzi wa Kiotomatiki (Auto-Scaling):</strong> Tovuti inapokea wateja 1,000 au 1,000,000 bila kukwama au kuanguka.</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-sky-500/20 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80"
                alt="Cloud Server Room and Data Center"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-wider">Tier-3 Data Center</span>
                <p className="text-sm font-bold text-white">Miundombinu ya Umeme wa Hifadhi na Fiber za Baharini za Kasi Kubwa</p>
              </div>
            </div>
          </div>

          {/* 3 Cloud Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-sky-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Starlink Satellites Tanzania</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Intaneti ya kasi ya zaidi ya 200Mbps inayounganisha machimbo ya madini Geita, mbuga za Serengeti na shule za vijijini bila nyaya za fiber.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#10b981] flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Data Centers za Ndani</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Uwekezaji wa vituo vya data vya kisasa nchini Dar es Salaam na Dodoma kuhakikisha huduma za kiserikali na kibenki hazitegemei nje pekee.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Kubernetes & Serverless</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Uendeshaji wa microservices zinazoongezeka (auto-scaling) wakati wa mzigo mkubwa wa watumiaji bila kuzima mfumo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STARLINK VS FIBER */}
      {activeTab === 'starlink' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-wider">Ulinganisho wa Teknolojia</span>
              <h2 className="text-2xl font-black text-white">Starlink Low-Earth Orbit (LEO) vs Fiber Optics Tanzania</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Kuelewa tofauti ya intaneti ya angani ya Elon Musk na nyaya za kawaida za chini ya ardhi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950 p-6 rounded-2xl border border-sky-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-5 h-5 text-sky-400" />
                    <h3 className="text-base font-bold text-white">Starlink Satellite</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-black">Bora kwa Vijijini</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sky-400" />
                    <strong>Ufikiaji:</strong> 100% popote Tanzania (Mbugani, Baharini, Vijijini).
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sky-400" />
                    <strong>Spidi ya Kupakua (Download):</strong> 150 Mbps – 250 Mbps.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sky-400" />
                    <strong>Latency (Ping):</strong> 30ms – 50ms (Nzuri kwa mikutano ya Zoom na Video).
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-sky-400" />
                    <strong>Ufungaji:</strong> Dakika 15 pekee kwa Dish na Router ya Wi-Fi.
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-950 p-6 rounded-2xl border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Fiber Optics (TTCL / Zantel / Vodacom)</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-black">Bora Mijini (Mwanza, DSM)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <strong>Ufikiaji:</strong> Maeneo ya mijini pekee yenye miundombinu ya barabara.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <strong>Spidi ya Kupakua (Download):</strong> Hadi 1 Gbps (Bila kikomo).
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <strong>Latency (Ping):</strong> 5ms – 15ms (Kiwango cha juu sana kwa Gaming na Seva).
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <strong>Uthabiti:</strong> Haiathiriwi na mawingu au mvua kubwa.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DATA CENTERS & DOCKER */}
      {activeTab === 'datacenters' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-wider">Mwongozo wa Kiuhandisi</span>
              <h2 className="text-2xl font-black text-white">Ufungaji wa Docker & Docker Compose kwa Mifumo ya Kisasa</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Kufunga programu yako ndani ya kontena (Containerization) ili iweze kuendeshwa kwenye seva yoyote ya Linux bila hitilafu za dependencies.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white">Mfano wa `docker-compose.yml` (Node.js + PostgreSQL + Nginx)</h4>
                <pre className="text-[11px] font-mono bg-black/90 p-4 rounded-xl text-sky-400 overflow-x-auto leading-relaxed border border-white/5">
{`version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/santech_db
    depends_on:
      - db
    restart: always

  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=santech_db

volumes:
  pgdata:`}
                </pre>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
                  alt="Server Blades Rack"
                  className="w-full h-full object-cover min-h-[240px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-sm font-bold text-white">Usimamizi wa Seva kwa DevOps</h4>
                  <p className="text-xs text-zinc-300 mt-1">Kuweka mifumo ya ufuatiliaji wa joto, RAM, na bandwidth ya mtandao kwa kutumia Prometheus na Grafana.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE LATENCY TEST */}
      <section className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] font-black text-sky-400 uppercase tracking-wider">Majaribio ya Kasi</span>
          <h2 className="editorial-font text-2xl font-black text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-sky-400" />
            Kadirio la Spidi ya Mawasiliano ya Seva (Tanzania to Cloud Regions)
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Ulinganisho wa ucheleweshaji wa mawasiliano (Network Latency) kutoka Dar es Salaam kwenda vituo vikuu vya kimataifa vya wingu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(regionPings).map(([regionKey, data]) => {
            const isSelected = selectedRegion === regionKey;
            return (
              <div
                key={regionKey}
                onClick={() => setSelectedRegion(regionKey)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-sky-500/10 border-sky-400 shadow-lg shadow-sky-500/10'
                    : 'bg-zinc-950 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">{regionKey}</span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-sky-400" />}
                </div>
                <h4 className="text-sm font-bold text-white">{data.city}</h4>
                <p className="text-[11px] text-zinc-400">{data.description}</p>
                <div className="pt-2 flex items-baseline justify-between border-t border-white/5">
                  <span className="text-[10px] text-zinc-500">{data.provider}</span>
                  <span className="text-sm font-mono font-black text-sky-400">{data.ping}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cloud Articles Grid */}
      <section className="space-y-6">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <h2 className="editorial-font text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            Makala za Wingu & Miundombinu
          </h2>
          <span className="text-xs font-bold text-zinc-400">{cloudArticles.length} Makala za Kina</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cloudArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-sky-400 border border-white/10">
                    {article.categoryName || 'Cloud'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-sky-400 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.readTime}</span>
                <span className="text-sky-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Soma Makala <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
