import React from 'react';
import { MessageSquare, Send, PhoneCall, Sparkles, UserCheck, MessageCircle, Heart, CheckCircle2, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CommunityForumSection: React.FC = () => {
  const { firestoreForumPosts, addForumPost, dbConnected } = useAuth();

  const [authorName, setAuthorName] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [messageText, setMessageText] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !messageText.trim()) return;

    await addForumPost({
      author: authorName.trim(),
      role: 'Msomaji wa SANTECH',
      topic: topic.trim() || 'Maoni / Swali la Tech',
      message: messageText.trim(),
    });

    setSubmitted(true);
    setAuthorName('');
    setTopic('');
    setMessageText('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const whatsappLink = `https://wa.me/255691302979?text=${encodeURIComponent(
    `Habari SANTECH (+255691302979),\n\nJina langu: ${authorName || 'Mwanachama'}\nMada: ${topic || 'Maoni na Maswali'}\n\nUjumbe: ${messageText || 'Habari za kazi, nina maoni kuhusu mtandao wenu wa SANTECH TECH!'}`
  )}`;

  return (
    <section id="community-forum" className="my-12">
      <div className="glass border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8 bg-zinc-950/90">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40">
                WHATSAPP DIRECT FEEDBACK HUB
              </span>
            </div>
            <h2 className="display-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
              Jukwaa la Maoni na Maswali ya Wasomaji
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Andika maoni au swali lako hapa, au tuma moja kwa moja kupitia icon ya WhatsApp.
            </p>
          </div>

          <a
            href="https://wa.me/255691302979"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-transform hover:scale-105 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Direct
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Post Form (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-900/80 p-5 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-[#25D366]" />
              Tuma Maoni au Swali Lako
            </h3>

            {submitted && (
              <div className="p-3 bg-emerald-950 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Maoni yako yamehifadhiwa! Unaweza pia kuyatuma WhatsApp hapa chini.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Jina Lako na Mji:
                </label>
                <input
                  type="text"
                  placeholder="Mfano: Juma Rashid (Arusha)..."
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-white/10 text-white text-xs p-2.5 rounded-xl focus:outline-none focus:border-[#25D366]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Mada (Topic):
                </label>
                <input
                  type="text"
                  placeholder="Mfano: Maoni kuhusu kozi ya Python / Swali la AI..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 text-white text-xs p-2.5 rounded-xl focus:outline-none focus:border-[#25D366]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Ujumbe / Maoni Yako:
                </label>
                <textarea
                  rows={3}
                  placeholder="Andika maoni au swali lako kwa kina..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-white/10 text-white text-xs p-2.5 rounded-xl focus:outline-none focus:border-[#25D366]"
                />
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-xl border border-white/10 transition-colors cursor-pointer"
                >
                  Hifadhi Kwenye Jukwaa
                </button>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-emerald-500 text-black font-black text-xs uppercase tracking-wider py-3 rounded-xl flex items-center justify-center gap-2 shadow-xl transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  💬 Tuma Maoni Haya WhatsApp
                </a>
              </div>
            </form>
          </div>

          {/* Posts Feed (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center justify-between">
              <span>Maoni na Maswali ya Hivi Punde</span>
              <span className="text-[#25D366] font-mono">LIVE FEED</span>
            </h3>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-none">
              {firestoreForumPosts.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-500 bg-zinc-950 p-4 rounded-xl border border-white/5">
                  Hakuna maoni kwenye database bado. Uwe wa kwanza kutuma maoni yako hapo pembeni!
                </div>
              ) : (
                firestoreForumPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-zinc-950/80 rounded-2xl border border-white/10 space-y-2 hover:border-[#25D366]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#25D366]/20 text-[#25D366] font-bold text-xs flex items-center justify-center border border-[#25D366]/30">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">{post.author}</span>
                        <span className="text-[10px] text-zinc-500">{post.role}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500">{post.time}</span>
                  </div>

                  <div className="bg-zinc-900/50 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] font-extrabold uppercase text-[#25D366] block mb-0.5">
                      📌 {post.topic}
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{post.message}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1 text-rose-400">
                      <Heart className="w-3.5 h-3.5 fill-current" /> {post.likes} Penda
                    </span>

                    <a
                      href={`https://wa.me/255691302979?text=${encodeURIComponent(
                        `Habari SANTECH (+255691302979), nataka kuchangia kuhusu hoja ya: "${post.topic}" - (${post.author})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline text-[10px] font-bold"
                    >
                      Jibu Kupitia WhatsApp ➔
                    </a>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
