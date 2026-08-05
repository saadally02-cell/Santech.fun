import React from 'react';
import {
  X,
  Clock,
  User,
  Eye,
  Bookmark,
  Share2,
  Check,
  ThumbsUp,
  MessageSquare,
  Type,
  Send,
  ArrowRight
} from 'lucide-react';
import { Article, CommentItem } from '../types';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: boolean;
  relatedArticles: Article[];
  onSelectRelated: (article: Article) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onToggleBookmark,
  isBookmarked,
  relatedArticles,
  onSelectRelated,
}) => {
  const [fontSize, setFontSize] = React.useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copied, setCopied] = React.useState(false);
  const [likes, setLikes] = React.useState(124);
  const [hasLiked, setHasLiked] = React.useState(false);

  // Comments state
  const [comments, setComments] = React.useState<CommentItem[]>([
    {
      id: 'c1',
      author: 'Emanuel Joseph (Mwanza)',
      text: 'Makala hii imefungua sana akili yangu kuhusu fursa za Akili Bandia na Freelancing. Asante SANTECH TZ!',
      date: 'Jana saa 14:20',
      likes: 18,
    },
    {
      id: 'c2',
      author: 'Fatuma Bakari (Dar es Salaam)',
      text: 'Nimependa sana mwongozo huu wa Utalii na Paje Beach. Nitafanya safari mwezi ujao!',
      date: 'Leo saa 09:15',
      likes: 9,
    },
  ]);

  const [newCommentName, setNewCommentName] = React.useState('');
  const [newCommentText, setNewCommentText] = React.useState('');

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const item: CommentItem = {
      id: Date.now().toString(),
      author: newCommentName.trim(),
      text: newCommentText.trim(),
      date: 'Sasa hivi',
      likes: 0,
    };

    setComments([item, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const getTextClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-zinc-900 border border-white/10 w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl overflow-y-auto flex flex-col my-auto relative">
        {/* Sticky Modal Bar */}
        <div className="sticky top-0 z-20 bg-zinc-900/95 backdrop-blur border-b border-white/10 px-5 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
              {article.categoryName}
            </span>
            <span className="text-xs text-zinc-400 font-medium hidden sm:inline uppercase tracking-wider">
              Soma Makala
            </span>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2">
            {/* Font Adjuster */}
            <div className="flex items-center bg-zinc-800 rounded p-1 border border-white/10">
              <Type className="w-3.5 h-3.5 text-zinc-400 mx-1" />
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 text-xs font-bold rounded ${fontSize === 'normal' ? 'bg-[#10b981] text-black' : 'text-zinc-300'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 text-xs font-bold rounded ${fontSize === 'large' ? 'bg-[#10b981] text-black' : 'text-zinc-300'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-1.5 py-0.5 text-xs font-bold rounded ${fontSize === 'xlarge' ? 'bg-[#10b981] text-black' : 'text-zinc-300'}`}
              >
                A++
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-[#10b981] text-black border-[#10b981]'
                  : 'bg-zinc-800 text-zinc-300 border-white/10 hover:text-white'
              }`}
              title="Hifadhi Makala"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 sm:p-10 space-y-6">
          {/* Article Header */}
          <div>
            <h1 className="display-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Author Meta */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-white/10 text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#10b981]/20 text-[#10b981] font-bold flex items-center justify-center border border-[#10b981]/30">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{article.author}</p>
                  <p className="text-[11px] text-zinc-400">{article.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#10b981]" />
                  {article.date} ({article.readTime})
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#10b981]" />
                  {article.views.toLocaleString()} Wasomaji
                </span>
              </div>
            </div>
          </div>

          {/* Banner Image */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[420px] bg-zinc-950">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Body Paragraphs */}
          <div className={`space-y-4 text-zinc-200 ${getTextClass()}`}>
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Vipengele:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-zinc-800 text-[#10b981] text-xs rounded border border-white/10 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Share & Like Bar */}
          <div className="bg-zinc-950/90 border border-white/10 p-4 rounded-xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold border transition-colors cursor-pointer uppercase tracking-wider ${
                  hasLiked
                    ? 'bg-[#10b981] text-black border-[#10b981]'
                    : 'bg-zinc-800 text-zinc-300 border-white/10 hover:text-white'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Penda ({likes})</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 rounded text-xs font-bold bg-zinc-800 text-zinc-300 border border-white/10 hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
              >
                {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Imenakiliwa!' : 'Share Link'}</span>
              </button>
            </div>

            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              SANTECH TZ • Habari za Uhakika
            </div>
          </div>

          {/* Related Articles Slider */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300 mb-4 flex items-center justify-between">
                <span>Makala Zinazofanana</span>
                <span className="text-[#10b981]">Soma Zaidi</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 bg-zinc-950/80 border border-white/10 rounded-xl flex items-center gap-3 hover:border-[#10b981]/40 transition-colors cursor-pointer group"
                  >
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-16 h-16 rounded object-cover shrink-0 opacity-90"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold text-[#10b981] uppercase tracking-wider">
                        {rel.categoryName}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#10b981] line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Comments Section */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#10b981]" />
                Maoni ya Wasomaji ({comments.length})
              </h3>
              <a
                href={`https://wa.me/255691302979?text=${encodeURIComponent(
                  `Habari SANTECH Tech, nasoma makala: "${article.title}". Nina maoni/swali...`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#25D366] hover:underline flex items-center gap-1 bg-[#25D366]/10 px-2.5 py-1 rounded border border-[#25D366]/30"
              >
                💬 Tuma Maoni WhatsApp Direct
              </a>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="bg-zinc-950/80 p-4 rounded-xl border border-white/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Jina lako na Mji (mfano: Juma - Arusha)..."
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  required
                  className="bg-zinc-800 border border-white/10 text-white text-xs p-2.5 rounded focus:outline-none focus:border-[#10b981]"
                />
              </div>
              <textarea
                placeholder="Andika maoni yako hapa..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                rows={2}
                required
                className="w-full bg-zinc-800 border border-white/10 text-white text-xs p-2.5 rounded focus:outline-none focus:border-[#10b981]"
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="bg-[#10b981] hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Hifadhi Maoni Hapa
                </button>

                <a
                  href={`https://wa.me/255691302979?text=${encodeURIComponent(
                    `Habari SANTECH,\n\nMaoni kutoka kwa: ${newCommentName || 'Msimbo Wasomaji'}\nKuhusu Makala: "${article.title}"\n\nMaoni: ${newCommentText || 'Nimependa makala hii!'}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg"
                >
                  💬 Tuma Moja kwa Moja WhatsApp
                </a>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((item) => (
                <div key={item.id} className="p-3.5 bg-zinc-950/60 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#10b981]">{item.author}</span>
                    <span className="text-[11px] text-zinc-500">{item.date}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
