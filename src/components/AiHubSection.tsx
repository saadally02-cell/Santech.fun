import React from 'react';
import { Article } from '../types';
import { Bot, Sparkles, Cpu, Zap, ArrowRight, BookOpen, Layers, Terminal, CheckCircle2, MessageSquare, BrainCircuit, Workflow, Eye, Lightbulb, Copy, Share2, PlayCircle, ExternalLink } from 'lucide-react';

interface AiHubSectionProps {
  onSelectArticle: (article: Article) => void;
  articles: Article[];
  onOpenAiAssistant: () => void;
}

export const AiHubSection: React.FC<AiHubSectionProps> = ({
  onSelectArticle,
  articles,
  onOpenAiAssistant,
}) => {
  const [selectedPromptCategory, setSelectedPromptCategory] = React.useState<string>('business');
  const [copiedPrompt, setCopiedPrompt] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'agents' | 'vision' | 'prompts'>('overview');

  const aiArticles = articles.filter(
    (a) => a.category === 'ai' || a.tags.some((t) => t.toLowerCase().includes('ai') || t.toLowerCase().includes('gemini'))
  );

  const swahiliPrompts = {
    business: [
      {
        title: 'Mkakati wa Mauzo ya WhatsApp Business',
        desc: 'Ujumbe 3 za kiotomatiki za kufunga mauzo kwa wateja wapya wa Tanzania.',
        prompt:
          'Nisaidie kuandika mpangilio wa jumbe 3 za kiotomatiki za WhatsApp kwa ajili ya biashara yangu ya vifaa vya kielektroniki Dar es Salaam: (1) Salamu ya heshima ya Kiswahili na orodha ya bidhaa 3 zinazopendwa zaidi, (2) Ufafanuzi wa punguzo maalum la 15% na uthibitisho wa malipo ya Lipa Namba (M-Pesa/Tigo Pesa), (3) Ufuatiliaji wa kirafiki (Follow-up) baada ya saa 24 na kiungo cha maoni.',
      },
      {
        title: 'Uchambuzi wa Washindani & Soko (SWOT)',
        desc: 'Uchambuzi wa kina wa kuingiza huduma ya kidijitali sokoni.',
        prompt:
          'Fanya uchambuzi wa kina wa SWOT (Nguvu, Udhaifu, Fursa, na Vitisho) kwa kampuni inayoanzisha huduma ya intaneti ya kasi ya Starlink na nishati ya jua kwa shule na biashara za vijijini Tanzania. Angazia bei za washindani, changamoto za usajili wa TCRA, na njia bora za usambazaji.',
      },
      {
        title: 'Mpango Kazi wa Kuanzisha Startup ya Fintech',
        desc: 'Mwongozo wa miezi 6 wa kutengeneza mfumo wa malipo ya kidijitali.',
        prompt:
          'Andika muhtasari wa mpango mkakati wa biashara (Executive Summary & 6-Month Roadmap) kwa ajili ya startup ya malipo ya kidijitali inayounganisha wauzaji wa mazao ya kilimo (Mbeya/Morogoro) na pochi za kielektroniki za M-Pesa na benki.',
      },
    ],
    coding: [
      {
        title: 'FastAPI + M-Pesa Daraja C2B Integration',
        desc: 'Msimbo kamili wa Python wa kupokea na kuhakiki miamala ya M-Pesa.',
        prompt:
          'Andika msimbo safi wa Python ukitumia FastAPI unaopokea taarifa za muamala wa Vodacom M-Pesa C2B Callback. Hakikisha kuna uthibitisho wa saini ya kiusalama (Signature Validation), mfumo wa kuzuia miamala iliyorudiwa (Idempotency Key), na kuhifadhi kwenye hifadhidata ya PostgreSQL ukitumia SQLAlchemy.',
      },
      {
        title: 'React Custom Hook ya AI Streaming (Gemini)',
        desc: 'Hook ya TypeScript inayosimamia majibu ya moja kwa moja ya maandishi.',
        prompt:
          'Unda Custom React Hook ya TypeScript inayoitwa useGeminiStream inayotuma ombi kwenye endpoint ya backend na kupokea majibu ya AI kwa njia ya Server-Sent Events (SSE) au chunk streaming, ikionyesha uhuishaji wa kuandika (typing effect) na kushughulikia hitilafu kwa Kiswahili.',
      },
      {
        title: 'SQL Query ya Uchambuzi wa Wateja Wanaoondoka (Churn)',
        desc: 'Msimbo wa PostgreSQL wa kutambua wateja waliopunguza ununuzi.',
        prompt:
          'Andika SQL query ya kina ya PostgreSQL inayotathmini tabia za wateja kwenye mfumo wa e-commerce, ikionyesha wateja ambao hawajafanya manunuzi ndani ya siku 60 zilizopita lakini walikuwa wakinunua zaidi ya TZS 100,000 kila mwezi, ili kuwatumia punguzo maalum.',
      },
    ],
    marketing: [
      {
        title: 'Kalenda ya Maudhui ya Siku 14 ya TikTok & Instagram',
        desc: 'Vichwa vya habari vya kuvutia (Hooks) na maelezo ya video.',
        prompt:
          'Tengeneza ratiba ya maudhui ya siku 14 (Content Calendar) ya mtandao wa TikTok na Instagram Reels kwa wakala wa utalii wa Zanzibar na Serengeti. Jumuisha: (1) Kichwa cha habari cha kuvutia sekunde 3 za kwanza (Hook), (2) Maelezo ya sauti/muziki unaotamba, (3) Wito wa kitendo (Call to Action) wa kujiunga na safari, na (4) Hashtag 8 maarufu za Kiswahili na Kiingereza.',
      },
      {
        title: 'Barua Pepe ya Kuvutia Wawekezaji (Cold Pitch)',
        desc: 'Barua ya kikazi inayoeleza ukuaji wa huduma kwa wawekezaji wa Afrika.',
        prompt:
          'Andika barua pepe fupi lakini yenye ushawishi mkubwa (Cold Outreach Email chini ya maneno 150) kwa mwekezaji wa mitaji (Venture Capital) inayoeleza ukuaji wa wateja wetu 5,000 ndani ya miezi 3 nchini Tanzania na fursa ya kuwekeza $50,000 Seed Round.',
      },
    ],
  };

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(title);
    setTimeout(() => setCopiedPrompt(null), 2500);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Direct URL Route Indicator & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">URL Rasmi ya Subpage:</span>
          <code className="text-[#10b981] bg-black/50 px-2 py-0.5 rounded font-mono font-bold">
            https://santech.tz/#ai
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#ai');
            setCopiedPrompt('url');
            setTimeout(() => setCopiedPrompt(null), 2000);
          }}
          className="flex items-center gap-1 text-[11px] font-bold text-zinc-300 hover:text-white bg-zinc-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
        >
          {copiedPrompt === 'url' ? <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> : <Share2 className="w-3.5 h-3.5" />}
          {copiedPrompt === 'url' ? 'Kiungo Kimekopiliwa!' : 'Nakili Kiungo cha Moja kwa Moja'}
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-emerald-950/40 to-zinc-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981] text-xs font-black uppercase tracking-wider">
            <Cpu className="w-4 h-4 animate-pulse" />
            Kituo Kikuu cha Akili Bandia • Gemini 3.7 & LLMs 2026
          </div>

          <h1 className="editorial-font text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Mapinduzi ya <span className="text-[#10b981]">Akili Bandia (AI)</span>, Mawakala Huru & LLMs Afrika
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Mwongozo mkubwa zaidi wa Kiswahili unaokupa ujuzi kamili wa kujenga mifumo ya kisasa ya Gemini 3.7, Autonomous AI Agents, Kompyuta yenye uwezo wa kuona (Computer Vision), na Prompt Engineering ya kitaalamu inayobadilisha sekta za Kilimo, Afya, Biashara na Elimu.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-2 bg-[#10b981] hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              Zungumza na SANTECH AI (Kiswahili)
            </button>
            <a
              href="#prompt-studio"
              className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Swahili Prompt Studio
            </a>
          </div>
        </div>

        {/* Decorative Grid BG */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </div>

      {/* Subpage Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'overview', label: '1. Muhtasari & Gemini 3.7', icon: BrainCircuit },
          { id: 'agents', label: '2. Mawakala Huru (AI Agents)', icon: Workflow },
          { id: 'vision', label: '3. AI Katika Kilimo & Picha', icon: Eye },
          { id: 'prompts', label: '4. Prompt Studio ya Kiswahili', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#10b981] text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & GEMINI 3.7 DEEP DIVE */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-zinc-900/80 border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-[#10b981] uppercase tracking-wider">Uchambuzi wa Teknolojia</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Mifumo ya Lugha Kubwa (LLMs) & Gemini 3.7 Flash & Pro
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Mwaka 2026, mifano ya akili bandia kama <strong>Gemini 3.7</strong> imeleta mapinduzi ya uelewa wa muktadha (Context Window ya maneno zaidi ya 2,000,000). Hii inamaanisha mfumo unaweza kusoma kitabu kizima cha sheria za kodi za Tanzania au msimbo wa programu nzima ya kompyuta na kutoa majibu sahihi ndani ya sekunde 3 tu.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span><strong>Multimodal Native:</strong> Uwezo wa kuchambua sauti za Kiswahili, video za mashambani, na picha za x-ray kwa wakati mmoja bila kubadilisha mfumo.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span><strong>Uwezo wa Kufikiri (Thinking Mode):</strong> AI inafanya majaribio ya kimantiki (Chain-of-thought) kabla ya kujibu ili kuepuka udanganyifu wa taarifa (hallucination).</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span><strong>Function Calling & Zana za Nje:</strong> AI inaruhusiwa kufanya miamala halisi kwenye hifadhidata za SQL au kutuma SMS za mteja kupitia API.</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80"
                alt="AI Neural Network & Gemini"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-black text-[#10b981] uppercase tracking-wider">Mfano wa Miundombinu</span>
                <p className="text-sm font-bold text-white">Usindikaji wa Mabilioni ya Data za Kiswahili na Lugha za Afrika Mashariki</p>
              </div>
            </div>
          </div>

          {/* 3 Core Pillars Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#10b981] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Autonomous AI Agents</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Mawakala wanaojiendesha wenyewe kufanya tafiti, kuandika ripoti, na kutekeleza maagizo ya msimbo bila usimamizi wa kila sekunde.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Gemini 3.7 API & SDK</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Mifano yenye muktadha wa maneno milioni mbili (2M Context Tokens) inayoweza kuchambua vitabu vizima, video na hifadhidata za sauti kwa sekunde chache.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">AI katika Biashara & Kilimo</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Mifumo ya kutambua magonjwa ya mimea kupitia picha za simu na uchambuzi wa utabiri wa mavuno nchini Tanzania.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUTONOMOUS AI AGENTS & WORKFLOWS */}
      {activeTab === 'agents' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-[#10b981] uppercase tracking-wider">Mzunguko wa Kazi (Agent Loop)</span>
              <h2 className="text-2xl font-black text-white">Jinsi Mawakala wa AI (Autonomous Agents) Wanavyofanya Kazi</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Tofauti na Chatbot ya kawaida inayojibu maswali tu, Wakala wa AI anauwezo wa kupanga hatua, kutumia zana (Tools), na kukamilisha kazi nzima kwa kujitegemea.
              </p>
            </div>

            {/* Visual Workflow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: 'Hatua 01',
                  title: 'Utambuzi (Perception)',
                  desc: 'Wakala anapokea ombi la mtumiaji (User Goal), faili au taarifa za mfumo na kuzichambua kwa undani.',
                  color: 'border-emerald-500/40 bg-emerald-950/20 text-[#10b981]',
                },
                {
                  step: 'Hatua 02',
                  title: 'Kupanga Mikakati (Planning)',
                  desc: 'AI inagawanya kazi kubwa katika hatua ndogo ndogo (Sub-tasks) na kuchagua zana zinazohitajika.',
                  color: 'border-blue-500/40 bg-blue-950/20 text-blue-400',
                },
                {
                  step: 'Hatua 03',
                  title: 'Utendaji (Tool Execution)',
                  desc: 'Wakala anaita API, anatafuta kwenye Google, au anaandika na kutekeleza msimbo kwenye seva.',
                  color: 'border-purple-500/40 bg-purple-950/20 text-purple-400',
                },
                {
                  step: 'Hatua 04',
                  title: 'Kujikosoa (Self-Correction)',
                  desc: 'Ikitokea hitilafu, wakala anasoma kosa (Error message), anajirekebisha mwenyewe na kutoa matokeo bora.',
                  color: 'border-amber-500/40 bg-amber-950/20 text-amber-400',
                },
              ].map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border ${item.color} space-y-2`}>
                  <div className="flex items-center justify-between text-[11px] font-black uppercase">
                    <span>{item.step}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
              <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#10b981]" />
                  Mfano wa Msimbo: Mfumo wa Wakala kwa Python
                </h4>
                <pre className="text-[11px] font-mono bg-black/80 p-4 rounded-xl text-emerald-400 overflow-x-auto leading-relaxed border border-white/5">
{`from google import genai
from google.genai import types

client = genai.Client()

# Kufafanua zana ya wakala kuangalia bei za mazao sokoni
def pata_bei_ya_soko(zao: str, eneo: str) -> str:
    # Inaunganishwa na API halisi ya soko la Kariakoo
    return f"Bei ya {zao} hapa {eneo} ni TZS 2,400 kwa kilo."

response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents='Nipe bei ya mahindi Kariakoo kisha nishauri kama niuze leo.',
    config=types.GenerateContentConfig(
        tools=[pata_bei_ya_soko],
        temperature=0.2
    )
)
print(response.text)`}
                </pre>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                  alt="AI Workflow Diagram"
                  className="w-full h-full object-cover min-h-[220px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-sm font-bold text-white">Mawakala wa AI Kwenye Uendeshaji wa Biashara</h4>
                  <p className="text-xs text-zinc-300 mt-1">Usimamizi wa wateja 24/7, uhasibu wa kiotomatiki na utumaji wa ankara bila mfanyakazi kuchelewa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPUTER VISION & AGRICULTURE */}
      {activeTab === 'vision' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">Ufumbuzi wa Kitanzania</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Kompyuta Yenye Uwezo wa Kuona (Computer Vision) Katika Kilimo
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Wakulima nchini Tanzania wanakabiliwa na upotevu wa hadi 40% ya mazao kutokana na wadudu na magonjwa ya majani. Kwa kutumia mifano ya <strong>Convolutional Neural Networks (CNNs)</strong> na Vision Transformers, mkulima anapiga picha ya jani la muhogo, kahawa au mahindi kwa simu yake ya kawaida na kupata:
              </p>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  Jina la ugonjwa (k.m. Cassava Mosaic Disease au Fall Armyworm).
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  Kiwango cha usahihi wa utambuzi (Usahihi wa 96.8%).
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  Mwongozo wa dawa sahihi na kiwango cha kuchanganya kwa Kiswahili.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=500&q=80"
                  alt="Kilimo cha Kisasa na AI"
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-3 bg-zinc-950 text-[11px] font-bold text-zinc-300">
                  Uchambuzi wa Afya ya Udongo na Mimea
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=500&q=80"
                  alt="Droni za Kilimo"
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-3 bg-zinc-950 text-[11px] font-bold text-zinc-300">
                  Droni Zinazotambua Eneo Lenye Upungufu wa Maji
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE SWAHILI PROMPT STUDIO */}
      <section id="prompt-studio" className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-black text-[#10b981] uppercase tracking-wider">Zana ya Vitendo</span>
            <h2 className="editorial-font text-2xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#10b981]" />
              Swahili AI Prompt Studio
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Nakili maelekezo (prompts) yaliyoboreshwa kwa Kiswahili tayari kuweka kwenye ChatGPT, Claude, au Gemini.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-xl border border-white/10">
            {(['business', 'coding', 'marketing'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedPromptCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedPromptCategory === cat
                    ? 'bg-[#10b981] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat === 'business' ? 'Biashara & Startup' : cat === 'coding' ? 'Uprogramu (Code)' : 'Masoko & Maudhui'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {swahiliPrompts[selectedPromptCategory as keyof typeof swahiliPrompts].map((item, idx) => (
            <div key={idx} className="bg-zinc-950 border border-white/10 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#10b981]" />
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</p>
                <div className="mt-3 p-3 rounded-xl bg-zinc-900/90 border border-white/5 font-mono text-[11px] text-zinc-300 leading-relaxed max-h-36 overflow-y-auto">
                  "{item.prompt}"
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(item.prompt, item.title)}
                className="mt-3 w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded-xl text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedPrompt === item.title ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                    <span className="text-[#10b981]">Imenakiliwa kwenye Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Nakili Maelekezo Haya</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* AI Articles Grid */}
      <section className="space-y-6">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <h2 className="editorial-font text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#10b981]" />
            Makala Zote za Akili Bandia (AI)
          </h2>
          <span className="text-xs font-bold text-zinc-400">{aiArticles.length} Makala za Kina</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-[#10b981]/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#10b981] border border-white/10">
                    {article.categoryName || 'Akili Bandia'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-[#10b981] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.readTime}</span>
                <span className="text-[#10b981] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
