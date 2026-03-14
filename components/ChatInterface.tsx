import React, { useState, useRef, useEffect } from 'react';
import { Send, Command, RefreshCw, Mic } from 'lucide-react';
import { Message } from '../types';
import { streamMessageToGemini } from '../services/geminiService';
import { ScrollReveal } from './ScrollReveal';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split('\n');
  return (
    <div className="space-y-4 font-body text-[15px] leading-relaxed">
      {parts.map((part, i) => {
        if (part.trim().startsWith('- ') || part.trim().startsWith('* ')) {
          return (
            <div key={i} className="flex items-start space-x-3 pl-1">
              <div className="w-1.5 h-1.5 rounded-full bg-dawn mt-2 flex-shrink-0"></div>
              <span 
                className="flex-1 text-text-sec"
                dangerouslySetInnerHTML={{ 
                  __html: part.replace(/^[-*]\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-prim font-bold">$1</strong>') 
                }} 
              />
            </div>
          );
        }
        if (part.trim() === '') return null;
        return (
          <p 
            key={i}
            className="text-text-sec"
            dangerouslySetInnerHTML={{ 
              __html: part.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-prim font-bold">$1</strong>') 
            }} 
          />
        );
      })}
    </div>
  );
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Connection established.\n\nI am **Remiro**, your neural career architect. My cluster of **6 specialist agents** is online and ready to process your professional trajectory.\n\nWhat is your current objective?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isStreaming) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsStreaming(true);

    try {
      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMsgId, role: 'model', text: '', timestamp: new Date() }]);
      let fullResponse = '';
      const stream = streamMessageToGemini(messages, userMsg.text);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => msg.id === aiMsgId ? { ...msg, text: fullResponse } : msg));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => setInputValue(prev => prev + (prev ? ' ' : '') + event.results[0][0].transcript);
    recognition.start();
  };

  return (
    <section id="chat" className="py-24 relative z-10 flex justify-center px-4 min-h-screen items-center">
      <div className="w-full max-w-4xl">
        <ScrollReveal direction="up" className="w-full">
          
          {/* Glass Monolith */}
          <div className="glass-panel rounded-[2rem] overflow-hidden flex flex-col h-[85vh] min-h-[600px] relative transition-all duration-500 shadow-xl">
            
            {/* Header - Humanist */}
            <div className="px-8 py-6 border-b border-black/10 flex items-center justify-between bg-white/40 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full shadow-sm ${isStreaming ? 'bg-dawn animate-pulse' : 'bg-phoenix'}`}></div>
                <div className="flex flex-col">
                   <h3 className="font-heading font-bold text-text-prim text-lg leading-none">Remiro</h3>
                   <span className="text-[10px] font-body uppercase tracking-widest text-text-sec">Neural Grid Active</span>
                </div>
              </div>
              <button onClick={() => setMessages([messages[0]])} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 text-text-sec transition-all" title="Reset Session">
                <RefreshCw size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    
                    {/* Bubble - Refraction UI */}
                    <div className={`
                      inline-block px-8 py-6 rounded-3xl text-[15px] font-body shadow-sm relative overflow-hidden
                      ${msg.role === 'user' 
                        ? 'bg-phoenix/90 text-white backdrop-blur-md border border-white/20 animate-in fade-in slide-in-from-right-4 duration-500' 
                        : 'bg-white/60 backdrop-blur-md border border-black/10 text-text-prim animate-in fade-in slide-in-from-left-4 duration-500'
                      }
                    `}>
                       {/* Subtle Shine for User Bubble */}
                       {msg.role === 'user' && (
                         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                       )}

                       {/* Liquid ripple effect for new messages */}
                       {idx === messages.length - 1 && (
                         <div className="absolute inset-0 bg-white/5 animate-ping opacity-0 rounded-3xl" style={{ animationDuration: '2s', animationIterationCount: 1 }}></div>
                       )}

                       {msg.role === 'model' ? <FormattedText text={msg.text} /> : msg.text}
                       
                       {msg.role === 'model' && isStreaming && idx === messages.length - 1 && (
                         <span className="inline-block w-2 h-2 bg-phoenix rounded-full ml-2 animate-pulse align-middle"></span>
                       )}
                    </div>
                    
                    {/* Caption */}
                    <div className={`mt-2 text-[10px] font-bold uppercase tracking-widest opacity-60 px-2 ${msg.role === 'user' ? 'text-text-sec' : 'text-phoenix'}`}>
                      {msg.role === 'user' ? 'You' : 'System Agent'}
                    </div>

                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Frosted Key Deck */}
            <div className="p-6 md:p-8 bg-gradient-to-t from-base-bg via-base-bg/80 to-transparent">
              <div className="bg-white/60 backdrop-blur-md border border-black/10 rounded-full p-2 flex items-center gap-3 relative group focus-within:shadow-[0_4px_20px_rgba(214,90,90,0.15)] transition-all duration-300">
                
                <button 
                  onClick={handleVoiceInput}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-phoenix text-white animate-pulse' : 'hover:bg-black/5 text-text-sec hover:text-phoenix'}`}
                >
                  <Mic size={20} />
                </button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type into the glass..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-text-prim placeholder-text-sec/50 px-2 font-body text-lg"
                  disabled={isStreaming}
                />

                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isStreaming}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    inputValue.trim() && !isStreaming
                      ? 'bg-phoenix text-white shadow-md shadow-phoenix/30 scale-100' 
                      : 'bg-black/5 text-text-sec/30 scale-95'
                  }`}
                >
                  <Send size={20} fill={inputValue.trim() ? "currentColor" : "none"} />
                </button>

              </div>
            </div>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
};

export default ChatInterface;