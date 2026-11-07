import React from 'react';
import { Bot, X, Send, Anchor, User, RefreshCw, Ship } from 'lucide-react';
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
      text: 'Greetings Marine Engineering Officer! I am the SAN25 Chief Engineer & Naval Architect AI Assistant. I can assist with: MAN B&W & WinGD operations, Auxiliary Boilers & Purifiers, High Voltage 6.6kV & Blackout Recovery, Drydocking Upthrust P (NIT SRT 04105), Ship Maneuvering & Rudder Stall, SOLAS/MARPOL compliance, SFOC calculations, or preparation for TASAC / UK MCA MEO Class 1, 2, and 4 examinations. How may I assist your watchkeeping or technical study today?',
      timestamp: 'Just now',
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
    'Emergency procedures for Main Engine Scavenge Fire',
    'How to compute Propeller Slip and SFOC in noon reports',
    'Drydocking critical phase upthrust P and GM loss',
    'Rudder stall angle at 35° & turning circle criteria',
    'Alternator synchronization procedure with synchroscope',
    'Correct Oil Record Book Part I entries for Code C & D',
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

      if (!res.ok) {
        throw new Error('Hitilafu ya seva');
      }

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || 'Samahani, sikupokea jibu sahihi kutoka kwa mfumo wa Marine AI.',
        timestamp: new Date().toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      const errorReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: '[C/Eng Technical Advisor]: Mtandao wa dharura wa Marine AI unafanya kazi. Kwa maswali ya kiufundi kuhusu MAN B&W, Boilers, OWS 15ppm au STCW MEO Viva, rejea pia makala zetu za vitengo vya Injini Kuu, Mitambo Msaidizi na Vipimo.',
        timestamp: new Date().toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-zinc-950 border-l border-white/10 h-full flex flex-col shadow-2xl animate-slideIn">
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-black flex items-center justify-center font-black shadow-md border-2 border-amber-300">
              <Ship className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-white">SAN25 Chief Engineer AI</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-[10px] text-zinc-400 font-semibold">
                Marine Engineering & STCW Diagnostic Assistant
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-white/5 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts Container */}
        <div className="p-3 bg-black/60 border-b border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-[10px] bg-white/5 hover:bg-[#FFC107] hover:text-black text-zinc-300 border border-white/10 px-2.5 py-1 rounded-lg shrink-0 transition-colors font-semibold cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                  msg.sender === 'user' ? 'bg-[#FFC107] text-black font-bold' : 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Anchor className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#FFC107] text-black font-semibold rounded-tr-none shadow-md'
                    : 'bg-zinc-900 border border-white/10 text-zinc-200 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                {msg.text}
                <div
                  className={`text-[9px] mt-1.5 font-mono ${
                    msg.sender === 'user' ? 'text-black/60 text-right' : 'text-zinc-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center text-xs">
                <Anchor className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-zinc-900 border border-white/10 rounded-2xl rounded-tl-none p-3 text-xs text-zinc-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FFC107]" />
                <span>Chief Engineer anachambua mwongozo wa mtambo...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-zinc-900/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Uliza swali la MAN B&W, Boilers, OWS, HV, SOLAS..."
              className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFC107]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3.5 bg-[#FFC107] hover:bg-amber-400 text-black rounded-xl text-xs font-bold transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <p className="text-[10px] text-zinc-500 text-center mt-2">
            Inaendeshwa na Gemini 3.7 Pro Maritime Engine • SAN25 Marine Engineering
          </p>
        </div>
      </div>
    </div>
  );
};
