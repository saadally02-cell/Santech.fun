import React from 'react';
import { SubpageArticle, getRelatedSubpages } from '../data/subpagesData';
import {
  Share2,
  Calendar,
  Clock,
  Eye,
  ChevronRight,
  ExternalLink,
  Check,
  Bookmark,
  CheckCircle2,
  Globe,
  Sparkles,
  ArrowLeft,
  Ship,
  Wrench,
  Zap,
  ShieldAlert,
  Calculator,
  Anchor
} from 'lucide-react';

interface SubpageArticleViewProps {
  article: SubpageArticle;
  onNavigateToSubpage: (category: string, slug: string) => void;
  onNavigateToCategory: (category: string) => void;
  onBackToHome: () => void;
}

export const SubpageArticleView: React.FC<SubpageArticleViewProps> = ({
  article,
  onNavigateToSubpage,
  onNavigateToCategory,
  onBackToHome,
}) => {
  const [copied, setCopied] = React.useState(false);

  // Update dynamic meta tags and document title for SEO
  React.useEffect(() => {
    document.title = `${article.metaTitle} | SAN25 Marine Engineering`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', article.metaDescription);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', article.metaTitle);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', article.metaDescription);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article]);

  const relatedArticles = getRelatedSubpages(article, 4);

  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${article.category}/${article.slug}`
    : `https://santech.fun/${article.category}/${article.slug}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`${article.title}\n\nRead this Marine Engineering Technical Guide on SAN25 Marine:\n${fullUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} via @SANTechTZ #MarineEngineering #NavalArchitecture`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(fullUrl)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, '_blank');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'injini-kuu':
      case 'simu':
        return <Ship className="w-4 h-4 text-[#FFC107]" />;
      case 'mitambo-msaidizi':
      case 'apps':
        return <Wrench className="w-4 h-4 text-[#FFC107]" />;
      case 'umeme-na-otomesheni':
      case 'internet':
        return <Zap className="w-4 h-4 text-[#FFC107]" />;
      case 'sheria-na-usalama':
      case 'jinsi-ya':
        return <ShieldAlert className="w-4 h-4 text-[#FFC107]" />;
      case 'vipimo-na-miongozo':
      case 'bei':
        return <Calculator className="w-4 h-4 text-[#FFC107]" />;
      default:
        return <Anchor className="w-4 h-4 text-[#FFC107]" />;
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 text-zinc-100 animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <button
          onClick={onBackToHome}
          className="hover:text-[#FFC107] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <button
          onClick={() => onNavigateToCategory(article.category)}
          className="hover:text-[#FFC107] uppercase tracking-wider font-bold transition-colors cursor-pointer flex items-center gap-1"
        >
          {getCategoryIcon(article.category)}
          <span>{article.categoryLabel}</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="text-zinc-300 font-medium truncate max-w-[220px] sm:max-w-md">
          {article.title}
        </span>
      </nav>

      {/* Category Badge & Verification */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FFC107] text-black shadow-sm">
          {article.categoryLabel}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          Verified Chief Engineer & Class 1 Approved
        </span>
      </div>

      {/* Main H1 Title */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-4 editorial-font">
        {article.title}
      </h1>

      {/* Article Excerpt */}
      <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6 font-medium border-l-4 border-[#FFC107] pl-4 bg-white/5 py-3 rounded-r-xl">
        {article.excerpt}
      </p>

      {/* Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#FFC107] to-amber-200 text-black flex items-center justify-center font-black text-sm shadow-md">
            C/E
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-sm text-white">
              <span>{article.author}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]"></span>
              <span className="text-xs text-[#FFC107] font-semibold">{article.authorRole}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1 hidden sm:flex">
                <Eye className="w-3.5 h-3.5" />
                {article.views.toLocaleString()} readers
              </span>
            </div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWhatsApp}
            title="Share with Seafarers on WhatsApp"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={handleShareTwitter}
            title="Share on X"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button
            onClick={handleShareFacebook}
            title="Share on Facebook"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button
            onClick={handleCopyLink}
            title="Copy technical article link"
            className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-[260px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-4 right-4 text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 w-fit">
          Photo: SAN25 Marine Technical Archives / Machinery Spaces
        </div>
      </div>

      {/* Key Specifications / Highlights */}
      {article.keySpecs && article.keySpecs.length > 0 && (
        <div className="mb-8 p-5 rounded-2xl bg-[#FFC107]/10 border border-[#FFC107]/30 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Anchor className="w-5 h-5 text-[#FFC107]" />
            <h3 className="text-base font-black uppercase tracking-wider text-[#FFC107]">
              Key Marine Technical Specifications
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {article.keySpecs.map((spec, idx) => (
              <div key={idx} className="flex flex-col p-2.5 bg-black/40 rounded-xl border border-white/5">
                <span className="text-xs text-zinc-400 font-semibold">{spec.label}</span>
                <span className="text-sm font-bold text-white mt-0.5">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Content Paragraphs */}
      <div className="prose prose-invert max-w-none text-zinc-200 text-base sm:text-lg leading-relaxed space-y-6">
        {article.contentParagraphs.map((paragraph, index) => {
          // In between paragraphs, inject real Airalo Seafarers eSIM banner on 2nd paragraph
          if (index === 1) {
            return (
              <React.Fragment key={index}>
                <p className="font-normal text-zinc-200 leading-relaxed">{paragraph}</p>

                {/* Airalo Seafarers eSIM Sponsored Banner */}
                <div className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border-2 border-[#FFC107]/40 shadow-xl relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#FFC107]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#FFC107] text-black text-[10px] font-black rounded uppercase">
                          Seafarers Port Internet
                        </span>
                        <span className="text-xs font-bold text-zinc-400 flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-[#FFC107]" /> Airalo Global eSIM (200+ Ports)
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-white">
                        {article.affiliateCallout?.title || 'Stay Online in Port Without Local Plastic SIM Cards'}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
                        {article.affiliateCallout?.description || 'Activate high-speed 5G data instantly upon vessel berthing in Singapore, Rotterdam, Dubai, Mombasa, or Dar es Salaam with Airalo digital eSIM.'}
                      </p>
                    </div>
                    <a
                      href={article.affiliateCallout?.url || 'https://airalo.tpk.ro/MR9pD32b'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#FFC107] hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105 shrink-0"
                    >
                      <span>{article.affiliateCallout?.buttonText || 'Get Airalo eSIM'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </React.Fragment>
            );
          }

          return (
            <p key={index} className="font-normal text-zinc-200 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Internal Linking Section: 3 Other Marine Subpages */}
      <div className="my-10 p-6 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-5 bg-[#FFC107] rounded-full" />
          <h3 className="text-lg font-black text-white tracking-tight">
            Related Marine Engineering Technical Guides
          </h3>
        </div>
        <p className="text-xs text-zinc-400 mb-4">
          Explore deeper analysis across related machinery and statutory disciplines:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {article.internalLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => onNavigateToSubpage(link.category, link.slug)}
              className="text-left p-3.5 rounded-xl bg-black/60 hover:bg-black/90 border border-white/5 hover:border-[#FFC107]/50 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#FFC107] uppercase tracking-wider mb-1">
                <span>{link.category}</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-xs font-bold text-zinc-200 group-hover:text-white line-clamp-2">
                {link.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Author & Founder Box: Saad Ally Nassor (SAN25 Marine) */}
      <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-[#FFC107]/30 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-[#FFC107] text-black font-black text-xl flex items-center justify-center shrink-0 shadow-lg border-2 border-amber-300 flex-col leading-none">
          <span className="text-xs font-black">SAN25</span>
          <span className="text-[10px] font-black">FOUNDER</span>
        </div>
        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <h4 className="text-base font-black text-white">Author & Founder: Saad Ally Nassor</h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/40">
              Founder & Chief Marine Technologist
            </span>
          </div>
          <p className="text-xs text-[#FFC107] font-semibold">
            Muanzilishi wa SAN25 Marine Engineering Hub (santech.fun) • Aligned with NIT Dar es Salaam Syllabus
          </p>
          <p className="text-xs text-zinc-300 leading-relaxed pt-1">
            Founded by <strong>Saad Ally Nassor</strong> to provide free, comprehensive naval architecture calculations, NIT courseware lecture repositories, and STCW MEO Class 1, 2 & 4 exam preparation for maritime cadets, officers, and marine engineers in Tanzania and worldwide.
          </p>
        </div>
      </div>

      {/* Tags Section */}
      <div className="flex flex-wrap items-center gap-2 my-6">
        <span className="text-xs font-bold text-zinc-400">Technical Tags:</span>
        {article.tags.map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-1 rounded-lg text-xs bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Articles Grid at Bottom */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white editorial-font">
              More Guides in {article.categoryLabel}
            </h3>
            <p className="text-xs text-zinc-400">Select an article below to continue reading</p>
          </div>
          <button
            onClick={() => onNavigateToCategory(article.category)}
            className="text-xs font-bold text-[#FFC107] hover:underline cursor-pointer"
          >
            View All ({article.categoryLabel}) &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onNavigateToSubpage(rel.category, rel.slug)}
              className="group bg-zinc-900/60 hover:bg-zinc-900 rounded-xl overflow-hidden border border-white/10 hover:border-[#FFC107]/40 transition-all cursor-pointer flex flex-col shadow-md"
            >
              <div className="h-32 w-full overflow-hidden relative">
                <img
                  src={rel.imageUrl}
                  alt={rel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black bg-black/80 text-[#FFC107]">
                  {rel.categoryLabel}
                </span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h4 className="text-xs font-bold text-white group-hover:text-[#FFC107] transition-colors line-clamp-2 mb-2">
                  {rel.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-2 border-t border-white/5">
                  <span>C/Eng SAN25</span>
                  <span>{rel.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
