import React from 'react';
import { Article } from '../types';
import { Coins, TrendingUp, RefreshCw, ArrowRight, BookOpen, ShieldCheck, Wallet, Zap, Share2, CheckCircle2, DollarSign, Layers, CheckCircle, AlertTriangle } from 'lucide-react';

interface BlockchainHubSectionProps {
  onSelectArticle: (article: Article) => void;
  articles: Article[];
}

export const BlockchainHubSection: React.FC<BlockchainHubSectionProps> = ({
  onSelectArticle,
  articles,
}) => {
  const [usdtAmount, setUsdtAmount] = React.useState<number>(100);
  const [copiedUrl, setCopiedUrl] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'p2pguide' | 'smartcontracts' | 'calculator'>('overview');
  const tzsPerUsdt = 2650;

  const blockchainArticles = articles.filter(
    (a) => a.category === 'blockchain' || a.tags.some((t) => t.toLowerCase().includes('crypto') || t.toLowerCase().includes('fintech') || t.toLowerCase().includes('blockchain'))
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Direct URL Route Indicator & Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">URL Rasmi ya Subpage:</span>
          <code className="text-amber-400 bg-black/50 px-2 py-0.5 rounded font-mono font-bold">
            https://santech.tz/#blockchain
          </code>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/#blockchain');
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
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-amber-950/40 to-zinc-950 border border-amber-500/30 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Coins className="w-4 h-4" />
            FinTech, Stablecoins (USDT) & Web3 Afrika 2026
          </div>

          <h1 className="editorial-font text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Miamala ya Kimataifa, <span className="text-amber-400">Sarafu Tulivu za Kidijitali</span> & Mikataba Werevu
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Mwongozo mkubwa zaidi wa jinsi wafanyabiashara, wataalamu wa mifumo, na vijana wanavyotumia USDT, TRC20, TON Network na mifumo ya pochi za simu za mkononi (M-Pesa, Tigo Pesa) kupokea malipo ya kimataifa bila makato makubwa ya kibenki.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('p2pguide')}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              Mwongozo wa Kununua USDT kwa M-Pesa
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              Kikokotoo cha USDT / TZS
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </div>

      {/* Subpage Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: 'overview', label: '1. Muhtasari & Stablecoins', icon: DollarSign },
          { id: 'p2pguide', label: '2. P2P & M-Pesa Step-by-Step', icon: Wallet },
          { id: 'smartcontracts', label: '3. Mikataba Werevu (Web3)', icon: Layers },
          { id: 'calculator', label: '4. Kikokotoo cha Fedha', icon: RefreshCw },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
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
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Mapinduzi ya Malipo Afrika</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Kwanini Stablecoins (USDT & USDC) Zinatawala Biashara ya Mipaka?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Tofauti na Bitcoin au Ethereum zenye kubadilika bei kwa ghafla (volatility), <strong>USDT na USDC</strong> zimefungamanishwa na thamani ya Dola ya Marekani (1 USDT = $1.00 USD). Kwa mfanyabiashara anayeagiza mizigo China, Dubai au Uturuki, sarafu hizi huondoa gharama kubwa za SWIFT (zinazochukua siku 3 hadi 5) na badala yake uhamisho unakamilika kwa sekunde 10 kwa ada ya chini ya $1.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Gharama Nafuu:</strong> Makato ya kutuma pesa nje kupitia benki ya kawaida ni 5%–12%, wakati TRC20 au TON inagharimu chini ya 0.2%.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Kujikinga na Mfumuko wa Bei (Hedging):</strong> Kuhifadhi sehemu ya akiba kwa njia ya sarafu thabiti za kidijitali.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>Upatikanaji 24/7:</strong> Mtandao wa blockchain haufungi sikukuu wala wikendi; miamala inakwenda muda wote.</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1000&q=80"
                alt="Crypto & FinTech in Africa"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Teknolojia ya P2P</span>
                <p className="text-sm font-bold text-white">Kuunganisha Mifumo ya Simu za Mkononi na Masoko ya Kimataifa ya Fedha</p>
              </div>
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Stablecoins (USDT & USDC)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Sarafu za kidijitali zilizofungamanishwa na Dola ya Marekani (1:1 USD) zikizuia mfumuko wa bei na kupunguza makato ya kutuma pesa nje.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#10b981] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Uunganishaji wa Simu (P2P)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Kununua na kuuza dola mtandaoni moja kwa moja kupitia Vodacom M-Pesa, Tigo Pesa na benki za ndani kwa sekunde chache.
              </p>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-3 hover:border-purple-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Smart Contracts & DeFi</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Mikataba inayojitekeleza yenyewe bila waamuzi au wapatanishi, ikitoa usalama wa mikopo na miamala ya biashara.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: P2P GUIDE STEP-BY-STEP */}
      {activeTab === 'p2pguide' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Mwongozo wa Vitendo</span>
              <h2 className="text-2xl font-black text-white">Jinsi ya Kununua na Kuuza USDT kwa M-Pesa / Tigo Pesa Bila Kutapeliwa</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Kwenye soko la P2P (Peer-to-Peer), unanunua fedha kutoka kwa mfanyabiashara mwingine anayehakikiwa na mfumo wa Escrow.
              </p>
            </div>

            {/* 4 Golden Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-zinc-950 p-5 rounded-2xl border border-amber-500/30 space-y-2">
                <span className="text-xs font-black text-amber-400 uppercase">Hatua ya 1</span>
                <h4 className="text-sm font-bold text-white">Chagua Muuzaji Mwenye Sifa Bora</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Angalia muuzaji mwenye zaidi ya miamala 200 (Orders) na asilimia ya kukamilisha zaidi ya 98% (Completion Rate).
                </p>
              </div>

              <div className="bg-zinc-950 p-5 rounded-2xl border border-amber-500/30 space-y-2">
                <span className="text-xs font-black text-amber-400 uppercase">Hatua ya 2</span>
                <h4 className="text-sm font-bold text-white">Tengeneza Agizo (Place Order)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Weka kiasi unachotaka (k.m. TZS 265,000 kupata 100 USDT). Mfumo wa Escrow utafunga USDT za muuzaji mara moja.
                </p>
              </div>

              <div className="bg-zinc-950 p-5 rounded-2xl border border-amber-500/30 space-y-2">
                <span className="text-xs font-black text-amber-400 uppercase">Hatua ya 3</span>
                <h4 className="text-sm font-bold text-white">Tuma Pesa Kupitia M-Pesa</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Tuma kiasi kamili kwenye namba au Lipa Namba ya muuzaji. Kamwe usiandike neno "crypto" au "bitcoin" kwenye reference ya muamala.
                </p>
              </div>

              <div className="bg-zinc-950 p-5 rounded-2xl border border-amber-500/30 space-y-2">
                <span className="text-xs font-black text-amber-400 uppercase">Hatua ya 4</span>
                <h4 className="text-sm font-bold text-white">Bofya "Transferred, Notify Seller"</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Muuzaji atathibitisha kupokea fedha kwenye simu yake, na mfumo utakufungulia USDT zako ndani ya pochi yako salama.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-red-950/30 border border-red-500/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-zinc-300">
                <strong className="text-red-400">Tahadhari Muhimu ya Kiutapeli:</strong>
                <p>Kamwe usikubali kuhamisha mawasiliano kwenda WhatsApp au Telegram kabla ya kufungua agizo rasmi kwenye App ya P2P, na kamwe usibofye "Release Funds" kama wewe ni muuzaji kabla ya kuona salio kwenye simu yako mwenyewe.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SMART CONTRACTS */}
      {activeTab === 'smartcontracts' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Uhandisi wa Web3</span>
              <h2 className="text-2xl font-black text-white">Mikataba Werevu (Smart Contracts) kwa Solidity & Rust</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Msimbo unaojiendesha wenyewe na kutekeleza makubaliano bila mpatanishi au mwanasheria wa kati.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-zinc-950 p-5 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white">Mfano wa Mkataba wa Malipo ya Escrow (Solidity)</h4>
                <pre className="text-[11px] font-mono bg-black/90 p-4 rounded-xl text-amber-400 overflow-x-auto leading-relaxed border border-white/5">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgroEscrow {
    address payable public mkulima;
    address public mnunuzi;
    uint256 public kiasiKilizofungwa;
    bool public mazaoYamepokelewa;

    constructor(address payable _mkulima) payable {
        mnunuzi = msg.sender;
        mkulima = _mkulima;
        kiasikilizofungwa = msg.value;
    }

    function thibitishaMapokezi() external {
        require(msg.sender == mnunuzi, "Mnunuzi pekee anaweza kuthibitisha");
        mazaoYamepokelewa = true;
        mkulima.transfer(address(this).balance);
    }
}`}
                </pre>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80"
                  alt="Web3 & Blockchain Infrastructure"
                  className="w-full h-full object-cover min-h-[240px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-5">
                  <h4 className="text-sm font-bold text-white">Mikataba ya Kidijitali ya Kilimo cha Tanzania</h4>
                  <p className="text-xs text-zinc-300 mt-1">Wakulima wa korosho na pamba wanapokea fedha moja kwa moja mara mzigo unapopimwa ghala la taifa bila madalali.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CALCULATOR */}
      <section className="bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Zana ya Haraka</span>
          <h2 className="editorial-font text-2xl font-black text-white flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-amber-400" />
            Kikokotoo cha Thamani ya USDT / TZS (Tanzania Shillings)
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Kadirio la viwango vya kubadilisha USDT (Tether) kwa Shilingi ya Tanzania sokoni P2P.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1.5">Kiasi cha USDT (Dola):</label>
            <input
              type="number"
              value={usdtAmount}
              onChange={(e) => setUsdtAmount(Number(e.target.value) || 0)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="text-center sm:pt-6">
            <span className="text-xs text-zinc-500 font-bold">Kiwango cha Makadirio: 1 USDT = 2,650 TZS</span>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-amber-500/30 text-right">
            <span className="text-[10px] text-zinc-400 font-bold uppercase">Thamani kwa Shilingi:</span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              TZS {(usdtAmount * tzsPerUsdt).toLocaleString()}
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Articles Grid */}
      <section className="space-y-6">
        <div className="border-b border-white/10 pb-3 flex items-center justify-between">
          <h2 className="editorial-font text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            Makala za FinTech, Crypto & Web3
          </h2>
          <span className="text-xs font-bold text-zinc-400">{blockchainArticles.length} Makala za Kina</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockchainArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-400 border border-white/10">
                    {article.categoryName || 'FinTech'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span>{article.readTime}</span>
                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
