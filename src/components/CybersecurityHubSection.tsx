import React from 'react';
import { Article } from '../types';
import { ShieldCheck, Lock, AlertTriangle, KeyRound, ArrowRight, BookOpen, Smartphone, CheckCircle, ShieldAlert, Share2, CheckCircle2, Terminal, RefreshCw, EyeOff, FileText, Bug } from 'lucide-react';

interface CybersecurityHubSectionProps {
  onSelectArticle: (article: Article) => void;
  articles: Article[];
}

export const CybersecurityHubSection: React.FC<CybersecurityHubSectionProps> = ({
  onSelectArticle,
  articles,
}) => {
  const [testPassword, setTestPassword] = React.useState<string>('');
  const [copiedUrl, setCopiedUrl] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'simswap' | 'owasp' | 'tools'>('overview');

  const cyberArticles = articles.filter(
    (a) => a.category === 'cybersecurity' || a.tags.some((t) => t.toLowerCase().includes('cyber') || t.toLowerCase().includes('usalama'))
  );

  // Password strength calculator
  const calculateStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Weka nenosiri kupima', color: 'text-zinc-500', bg: 'bg-zinc-800' };
    let score = 0;
    if (pass.length >= 8) score += 20;
    if (pass.length >= 12) score += 25;
    if (pass.length >= 16) score += 15;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 10;
    if (/[^A-Za-z0-9]/.test(pass)) score += 15;

    if (score < 40) return { score, label: 'Dhaifu Sana (Inavunjwa kwa sekunde 2 na AI Cracker)', color: 'text-red-400', bg: 'bg-red-500' };
    if (score < 75) return { score, label: 'Wastani (Inahitaji alama maalum #$% na herufi kubwa)', color: 'text-yellow-400', bg: 'bg-yellow-500' };
    return { score, label: 'Imara Sana (Salama dhidi ya mashambulizi ya Brute Force)', color: 'text-emerald-400', bg: 'bg-emerald-500' };
  };

  const strength = calculateStrength(testPassword);

  return (
    <div className="space-y-12 pb-16">
      {/* Direct URL Route Indicator & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">URL Rasmi ya Subpage:</span>
          <code className="text-red-400 bg-black/50 px-2 py-0.5 rounded font-mono font-bold">
            https://santech.tz/#cybersecurity
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#cybersecurity');
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
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-red-950/40 to-zinc-950 border border-red-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Kituo Kikuu cha Usalama wa Kidijitali & Zero-Trust 2026
          </div>

          <h1 className="editorial-font text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Ulinzi wa <span className="text-red-400">Usalama wa Mtandao</span>, SIM Swap & Mifumo ya Fedha
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Miongozo ya kiufundi ya kulinda miundombinu ya wingu, seva za makampuni, kuzuia mashambulizi ya Ransomware na kuzuia wizi wa akaunti za simu (M-Pesa, Tigo Pesa, Airtel Money) na kadi za benki nchini Tanzania.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('simswap')}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-red-500/20 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              Mwongozo wa Kuzuia SIM Swap
            </button>
            <button
              onClick={() => setActiveTab('owasp')}
              className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              <Bug className="w-4 h-4 text-red-400" />
              OWASP Top 10 Web Security
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </div>

      {/* Subpage Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'overview', label: '1. Muhtasari & Kanuni za Ulinzi', icon: ShieldCheck },
          { id: 'simswap', label: '2. SIM Swap & M-Pesa Security', icon: Smartphone },
          { id: 'owasp', label: '3. OWASP Top 10 & Misimbo', icon: Bug },
          { id: 'tools', label: '4. Zana ya Kupima Nenosiri', icon: KeyRound },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
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
              <span className="text-[10px] font-black text-red-400 uppercase tracking-wider">Hali ya Usalama Afrika 2026</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Mashambulizi ya Kidijitali & Utekelezaji wa Zero Trust
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Katika ulimwengu wa leo, dhana ya kizamani ya "kulinda ukuta wa nje pekee" (Perimeter Defense) imepitwa na wakati. Kanuni ya <strong>Zero Trust</strong> inasisitiza: <em>"Kamwe Usiamini, Kila Wakati Hakiki" (Never Trust, Always Verify)</em>. Kila kifaa, seva na mfanyakazi anayefikia data lazima athibitishwe upya.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Uthibitishaji wa Hatua Mbili (MFA):</strong> Usitumie SMS OTP pekee; tumia vifaa halisi (FIDO2 Keys) au programu za TOTP kama Google Authenticator.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Usimbaji wa Data (AES-256):</strong> Hifadhi taarifa za kibenki na siri za wateja zikiwa zimesimbwa kikamilifu kwenye Database na wakati zinasafiri kwenye mtandao (TLS 1.3).</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Ukaguzi wa Kila Siku (Security Audit):</strong> Kufanya majaribio ya uvamizi (Penetration Testing) ili kugundua mianya kabla ya wadukuzi kuipata.</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-red-500/20 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
                alt="Cybersecurity Operations Center"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-black text-red-400 uppercase tracking-wider">Kituo cha Uendeshaji (SOC)</span>
                <p className="text-sm font-bold text-white">Ufuatiliaji wa Tishio la Kidijitali Saa 24/7 kwa Miundombinu Muhimu</p>
              </div>
            </div>
          </div>

          {/* 4 Golden Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 space-y-2 hover:border-red-500/40 transition-all">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Weka 2FA / Hardware Key</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zuia wadukuzi wanaopata nenosiri lako kufungua akaunti bila uthibitisho wa simu yako au alama ya kidole.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 space-y-2 hover:border-yellow-500/40 transition-all">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Weka SIM Lock PIN</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Weka nenosiri kwenye SIM kadi yako kwenye simu (Settings &gt; Security &gt; SIM Lock) kuzuia matumizi ikipotea.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 space-y-2 hover:border-blue-500/40 transition-all">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Tahadhari ya Phishing</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Kamwe usibofye viungo vinavyotumwa kwa SMS vinavyodai kadi yako ya benki au laini ya NIDA imefungwa.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition-all">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-[#10b981] flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white">Hifadhi Nakala (Backups)</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Hifadhi nakala za data (Off-site encrypted backups) kujiokoa dhidi ya mashambulizi ya Ransomware.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SIM SWAP DEEP DIVE */}
      {activeTab === 'simswap' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-red-400 uppercase tracking-wider">Tishio Kubwa Tanzania</span>
              <h2 className="text-2xl font-black text-white">Jinsi Mashambulizi ya SIM Swap Yanavyofanyika & Kinga Yake</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Wizi wa kubadilisha laini ya simu (SIM Swap Fraud) ni njia inayotumiwa na matapeli kuhamisha namba yako kwenye laini yao mpya ili kupokea OTP za benki na M-Pesa.
              </p>
            </div>

            {/* Visual Step-by-Step Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-950 p-6 rounded-2xl border border-red-500/30 space-y-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-black text-sm">
                  1
                </div>
                <h4 className="text-base font-bold text-white">Ukusanyaji wa Data (Social Engineering)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Tapeli anapata jina lako kamili, namba ya NIDA na tarehe ya kuzaliwa kupitia mitandao ya kijamii au uvujaji wa taarifa (Data Breach).
                </p>
              </div>

              <div className="bg-zinc-950 p-6 rounded-2xl border border-red-500/30 space-y-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-black text-sm">
                  2
                </div>
                <h4 className="text-base font-bold text-white">Kuhadaa Mtoa Huduma wa Mawasiliano</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Anaenda kwenye duka la wakala akijidai kuwa amepoteza laini, na kuomba kusajili laini mpya yenye namba yako kwa kutoa taarifa feki za uthibitisho.
                </p>
              </div>

              <div className="bg-zinc-950 p-6 rounded-2xl border border-red-500/30 space-y-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-black text-sm">
                  3
                </div>
                <h4 className="text-base font-bold text-white">Kuingilia Akaunti za Kibenki & M-Pesa</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Laini yako ya asili inapoteza mtandao (No Service). Tapeli anaanza kuweka upya nenosiri la WhatsApp, M-Pesa na barua pepe kwa kutumia OTP zinazotumwa kwenye laini yake mpya.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Nini cha Kufanya Mara Moja Laini Yako Ikipoteza Mtandao Ghafla?
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-zinc-300 leading-relaxed">
                <li><strong>Piga simu mtoa huduma mara moja</strong> (Vodacom 100, Tigo 100, Airtel 100, Halotel 100) ukitumia simu ya mtu mwingine kuagiza kusitisha laini mara moja.</li>
                <li><strong>Wasiliana na benki yako</strong> kufunga miamala yote ya simu (Mobile Banking Block).</li>
                <li><strong>Weka SIM PIN kwenye simu yako leo:</strong> Kwenye simu yako, fungua <em>Settings &gt; Security &gt; Set SIM PIN</em> na ubadilishe PIN ya awali (kama 0000 au 1234) iwe nambari ya siri unayoijua wewe tu.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OWASP TOP 10 & CODING VULNERABILITIES */}
      {activeTab === 'owasp' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-red-400 uppercase tracking-wider">Usalama wa Programu (AppSec)</span>
              <h2 className="text-2xl font-black text-white">Mianya ya Kiuhandisi ya OWASP Top 10 & Kinga za Msimbo</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Miongozo ya kuandika mifumo ya wavuti na simu inayozuia mashambulizi ya SQL Injection, Cross-Site Scripting (XSS) na Broken Access Control.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vulnerability 1 */}
              <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 uppercase">A01: SQL Injection (SQLi)</span>
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold">Kiwango cha Juu</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Wadukuzi wanaingiza amri za SQL kwenye fomu za utafutaji au fomu ya kuingia ili kusoma au kufuta database nzima bila ruhusa.
                </p>
                <div className="bg-black/90 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-500 block mb-1">Msimbo Salama (Parameterized Query):</span>
                  <code className="text-xs text-emerald-400 font-mono block">
                    {`// Tumia Parameterized Query badala ya string concatenation:\nconst user = await db.query('SELECT * FROM users WHERE email = $1', [inputEmail]);`}
                  </code>
                </div>
              </div>

              {/* Vulnerability 2 */}
              <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-yellow-400 uppercase">A03: Cross-Site Scripting (XSS)</span>
                  <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-[10px] font-bold">Hatari</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Mdukuzi anaweka msimbo wa hatari wa JavaScript unaoendeshwa kwenye kivinjari cha watumiaji wengine kuiba tokeni zao za JWT au Session Cookies.
                </p>
                <div className="bg-black/90 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-zinc-500 block mb-1">Kinga (Sanitize & HttpOnly Cookie):</span>
                  <code className="text-xs text-emerald-400 font-mono block">
                    {`// Hifadhi JWT kwenye HttpOnly Cookie, na tumia DOMPurify:\nres.cookie('token', jwtToken, { httpOnly: true, secure: true, sameSite: 'strict' });`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE PASSWORD STRENGTH AUDITOR */}
      <section className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] font-black text-red-400 uppercase tracking-wider">Zana ya Usalama (Bure & Salama)</span>
          <h2 className="editorial-font text-2xl font-black text-white flex items-center gap-2">
            <KeyRound className="w-6 h-6 text-red-400" />
            Kipima Uimara wa Nenosiri (Password Strength Auditor)
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Zana hii inafanya kazi ndani ya kivinjari chako tu (Offline Client-side) bila kutuma data zako popote mtandaoni.
          </p>
        </div>

        <div className="max-w-2xl space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">
              Weka Nenosiri la Mfano (Sample Password):
            </label>
            <input
              type="text"
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              placeholder="Mfano: TzTech#2026@Secure"
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-red-400 focus:outline-none"
            />
          </div>

          {testPassword && (
            <div className="space-y-3 bg-zinc-950 p-5 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-400">Tathmini ya AI:</span>
                <span className={strength.color}>{strength.label}</span>
              </div>
              <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${strength.bg}`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                <div className={`p-2 rounded-lg ${testPassword.length >= 12 ? 'bg-emerald-950/40 text-emerald-400' : 'bg-zinc-900 text-zinc-500'}`}>
                  {testPassword.length >= 12 ? '✓ Herufi ≥ 12' : '✗ Herufi < 12'}
                </div>
                <div className={`p-2 rounded-lg ${/[A-Z]/.test(testPassword) ? 'bg-emerald-950/40 text-emerald-400' : 'bg-zinc-900 text-zinc-500'}`}>
                  {/[A-Z]/.test(testPassword) ? '✓ Herufi Kubwa' : '✗ Haina Kubwa'}
                </div>
                <div className={`p-2 rounded-lg ${/[0-9]/.test(testPassword) ? 'bg-emerald-950/40 text-emerald-400' : 'bg-zinc-900 text-zinc-500'}`}>
                  {/[0-9]/.test(testPassword) ? '✓ Nambari' : '✗ Haina Nambari'}
                </div>
                <div className={`p-2 rounded-lg ${/[^A-Za-z0-9]/.test(testPassword) ? 'bg-emerald-950/40 text-emerald-400' : 'bg-zinc-900 text-zinc-500'}`}>
                  {/[^A-Za-z0-9]/.test(testPassword) ? '✓ Alama (#$%)' : '✗ Haina Alama'}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cybersecurity Articles Grid */}
      <section className="space-y-6">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <h2 className="editorial-font text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-400" />
            Makala za Usalama wa Mtandao
          </h2>
          <span className="text-xs font-bold text-zinc-400">{cyberArticles.length} Makala za Kina</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cyberArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-red-400 border border-white/10">
                    {article.categoryName || 'Usalama'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.readTime}</span>
                <span className="text-red-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
