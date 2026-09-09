import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Sparkles, X, MessageSquare, Loader2, User, RefreshCw } from 'lucide-react';
import { enviarMensaje } from '../services/chatService';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  '¿Qué servicios ofrece Agilweb?',
  '¿Cuánto tarda en entregarse una web?',
  '¿Cómo funciona la asesoría gratuita?',
  'Quiero cotizar mi sitio web'
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '¡Hola! 👋 Soy el asistente con IA de Agilweb (con backend seguro en Cloudflare Pages). ¿En qué puedo ayudarte hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Llamada segura a /api/chat (Cloudflare Pages Function)
      const systemContext = `Eres el asistente oficial de Agilweb, una agencia experta en diseño y desarrollo web de alta conversión para microempresas y emprendimientos. Responde de forma amable, clara, breve y enfocada a impulsar al usuario a agendar una asesoría gratuita o usar el cotizador. Pregunta del usuario: ${promptText}`;

      const aiResponseText = await enviarMensaje(systemContext);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `⚠️ Error al conectar con el servidor: ${err?.message || 'Error desconocido'}. Asegúrate de que la variable GEMINI_API_KEY esté configurada en Cloudflare Pages.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón Flotante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3.5 bg-[#0d0d12]/90 border border-primary/40 rounded-full shadow-2xl backdrop-blur-xl hover:border-primary transition-all duration-300 hover:scale-105"
            data-cursor="IA Chat"
          >
            <div className="relative flex items-center justify-center size-8 rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-[#070709] transition-colors">
              <Bot size={20} />
              <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-primary animate-pulse" />
            </div>
            <div className="text-left font-mono">
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Agilweb AI</span>
                <Sparkles size={12} className="text-primary" />
              </p>
              <p className="text-[10px] text-white/50">Cloudflare Backend</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana de Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[360px] sm:w-[420px] h-[540px] bg-[#0d0d14]/95 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-wide">Agilweb AI Assistant</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-[9px] font-mono text-primary font-bold">
                      SECURE API
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 font-mono flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    Powered by Cloudflare Functions & Gemini
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([
                    {
                      id: 'welcome',
                      sender: 'bot',
                      text: 'Chat reiniciado. ¿En qué más puedo ayudarte?',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ])}
                  className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  title="Reiniciar chat"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Mensajes List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="size-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 mt-1">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-primary text-[#070709] font-medium rounded-br-none shadow-glow-sm'
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none leading-relaxed'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`text-[9px] font-mono block mt-1 text-right ${
                        msg.sender === 'user' ? 'text-black/60' : 'text-white/40'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="size-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 mt-1">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-3 text-white/50 text-xs">
                  <div className="size-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-primary" />
                    <span>Consultando Cloudflare Pages & Gemini...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length < 3 && (
              <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(promptText)}
                    disabled={loading}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/10 hover:border-primary/40 text-white/70 transition-colors"
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-white/10 bg-white/5 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                disabled={loading}
                className="flex-1 bg-black/40 border border-white/10 focus:border-primary/70 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 bg-primary text-[#070709] rounded-xl font-bold hover:bg-white disabled:opacity-40 disabled:hover:bg-primary transition-all shadow-glow-sm"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
