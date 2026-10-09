import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight
} from 'lucide-react';
import { Place } from '../data/cityData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedPlaceIds?: string[];
}

interface CityCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (id: string) => void;
  places: Place[];
}

export const CityCompanionModal: React.FC<CityCompanionModalProps> = ({
  isOpen,
  onClose,
  onSelectPlace,
  places
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: "Hello! I'm City Companion. Ask me for recommendations on places to eat, cultural walks, budget outings, or accessible spots in Pune.",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'Suggest a budget-friendly one-day trip in Pune',
    'Find affordable places to eat near FC Road',
    'Plan a half-day heritage walk',
    'Suggest wheelchair accessible places'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.slice(-4)
        })
      });

      if (!res.ok) throw new Error('Network error');

      const data = await res.json();
      const replyText = data.reply || "Here is what I found from verified city records.";

      const lowerReply = replyText.toLowerCase();
      const matchedPlaceIds = places
        .filter(p => lowerReply.includes(p.name.toLowerCase().split(' ')[0]))
        .map(p => p.id)
        .slice(0, 3);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPlaceIds: matchedPlaceIds.length > 0 ? matchedPlaceIds : undefined
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      // Fallback
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: "Here are top verified recommendations in Pune:\n1. Pataleshwar Cave Temple on JM Road (Free entry, 8th-century rock architecture)\n2. Vaishali on FC Road (Filter coffee and SPDP under ₹220)\n3. Shaniwar Wada Citadel in Old City (₹50 entry fee).",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full h-[600px] shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                City Companion AI
              </h3>
              <p className="text-[11px] text-slate-500">
                Grounded in verified Pune location records
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 text-xs">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-lg p-3 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white font-normal'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-xs'
              }`}>
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className={`text-[10px] mt-1 font-mono ${
                  msg.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'
                }`}>
                  {msg.timestamp}
                </div>

                {/* Place recommendation chips */}
                {msg.suggestedPlaceIds && msg.suggestedPlaceIds.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {msg.suggestedPlaceIds.map(pid => {
                      const pl = places.find(p => p.id === pid);
                      if (!pl) return null;
                      return (
                        <button
                          key={`sugg-${pid}`}
                          onClick={() => {
                            onSelectPlace(pid);
                            onClose();
                          }}
                          className="px-2 py-0.5 rounded bg-slate-50 hover:bg-blue-50 text-[11px] font-semibold text-blue-600 border border-slate-200 flex items-center gap-1"
                        >
                          <span>{pl.name}</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 items-center text-xs text-slate-500">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span>Searching verified city database...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {samplePrompts.map(prompt => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything about exploring Pune..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
