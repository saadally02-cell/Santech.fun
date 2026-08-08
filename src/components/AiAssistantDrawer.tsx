import React from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Habari! Mimi ni SANTECH AI Assistant. Ninaweza kukusaidia kuelewa Teknolojia, Akili Bandia, Kazi za Mtandaoni (Freelancing), au kupanga Safari za Utalii Tanzania. Una swali gani leo?',
      timestamp: 'Sasa hivi',
    },
  ]);

  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Jinsi ya kuanza Upwork & Fiverr TZ?',
    'Nieleze kuhusu Utalii wa Paje Beach Zanzibar',
    'Akili Bandia na Gemini 3.6 zinanisaidiaje?',
    'Jinsi ya kupakua video bila watermark',
  ];

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText.trim() }),
      });

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || 'Samahani, sijafanikiwa kupata jibu kwa sasa.',
        timestamp: new Date().toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Imetokea changamoto ndogo ya mtandao. Tafadhali jaribu kuuliza tena.',
          timestamp: 'Sasa hivi',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-zinc-900 border-l border-white/10 h-full flex flex-col shadow-2xl max-w-full overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-zinc-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center text-[#10b981]">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">SANTECH AI Assistant</h3>
              <p className="text-[10px] text-[#10b981] font-medium uppercase tracking-wider">Msaidizi wa Swahili AI • Gemini Powered</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-zinc-900/90 border-b border-white/10 flex gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-1 rounded border border-white/10 shrink-0 transition-colors cursor-pointer"
            >
              ✨ {prompt}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-950/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded flex items-center justify-center text-xs shrink-0 ${
                  msg.sender === 'user' ? 'bg-[#10b981] text-black font-bold' : 'bg-zinc-800 text-[#10b981] border border-white/10'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-3 rounded-xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#10b981] text-black font-medium rounded-tr-none'
                    : 'bg-zinc-900 border border-white/10 text-zinc-200 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`block text-[9px] mt-1 ${msg.sender === 'user' ? 'text-black/70 text-right' : 'text-zinc-500'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#10b981] p-2 bg-zinc-900 border border-white/10 rounded-xl w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>SANTECH AI inaandika jibu...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="p-3 bg-zinc-950 border-t border-white/10 flex gap-2"
        >
          <input
            type="text"
            placeholder="Uliza chochote kwa Kiswahili..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 bg-zinc-800 border border-white/10 text-white text-xs px-3 py-2.5 rounded focus:outline-none focus:border-[#10b981]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-[#10b981] hover:bg-emerald-400 disabled:opacity-50 text-black font-bold px-3.5 rounded transition-colors flex items-center justify-center cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
