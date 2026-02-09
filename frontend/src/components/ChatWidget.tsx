"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, MoreVertical, Paperclip, Smile, Mic, CreditCard, Minus } from 'lucide-react';

export default function ChatWidget() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot', text: string, type: 'text' | 'pricing', timestamp: string }[]>([
        { role: 'bot', text: "Hello! 👋 Welcome to ZentraHR. How can I help you streamline your workforce today?", type: 'text', timestamp: "Just now" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [chatSuggestions] = useState(["Pricing Plans", "Book a Demo", "Features overview", "Contact Support", "Integration details"]);
    const [unreadCount, setUnreadCount] = useState(0);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, isTyping, isChatOpen]);

    // Clear unread on open
    useEffect(() => {
        if (isChatOpen) {
            setUnreadCount(0);
        }
    }, [isChatOpen]);

    // Handle incoming "openChat" events from other components (e.g. "Get Started" buttons)
    useEffect(() => {
        const handleOpenChat = () => setIsChatOpen(true);
        window.addEventListener('openChat', handleOpenChat);
        return () => window.removeEventListener('openChat', handleOpenChat);
    }, []);

    const handleSendMessage = (e: React.FormEvent | null, text: string | null = null) => {
        if (e) e.preventDefault();
        const msgToSend = text || chatInput;

        if (!msgToSend.trim()) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newUserMsg = { role: 'user' as const, text: msgToSend, type: 'text' as const, timestamp };

        setChatMessages(prev => [...prev, newUserMsg]);
        setChatInput("");
        setIsTyping(true);

        // Smart Response Logic
        setTimeout(() => {
            const lowerMsg = msgToSend.toLowerCase();
            let botResponse: { role: 'bot', text: string, type: 'text' | 'pricing', timestamp: string } = { role: 'bot', text: "", type: 'text', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

            if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("plan")) {
                botResponse.text = "Here is a quick overview of our flexible pricing plans:";
                botResponse.type = 'pricing';
            } else if (lowerMsg.includes("contact") || lowerMsg.includes("support")) {
                botResponse.text = "You can reach our support team at support@zentrahr.com or call +1-800-ZENTRA. Or just ask me!";
            } else if (lowerMsg.includes("demo")) {
                botResponse.text = "We'd love to show you around! You can book a demo directly from the homepage or leave your email here.";
            } else {
                const responses = [
                    "That's a great question! Our Leave Management module handles that automatically.",
                    "You can book a demo to see that feature in action.",
                    "ZentraHR is designed to be fully compliant with local labor laws.",
                    "I'd be happy to connect you with a sales representative for more details.",
                    "Check out our 'Apps' section for more integrations!",
                    "We typically reply immediately to specific queries!"
                ];
                botResponse.text = responses[Math.floor(Math.random() * responses.length)];
            }

            setChatMessages(prev => [...prev, botResponse]);
            setIsTyping(false);

            if (!isChatOpen) {
                setUnreadCount(prev => prev + 1);
            }

        }, 1200);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end space-y-4 font-sans">
            {/* Chat Window */}
            <div className={`bg-white rounded-2xl shadow-2xl w-[350px] overflow-hidden transition-all duration-300 origin-bottom-right transform ${isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none absolute bottom-0 right-0'}`}>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Bot className="text-white w-6 h-6" />
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-purple-600 rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">Zentra Live Support</h3>
                            <p className="text-blue-100 text-[10px] flex items-center gap-1 font-medium bg-white/10 px-2 py-0.5 rounded-full w-fit">
                                Online | Responds Instantly
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition">
                            <Minus size={18} />
                        </button>
                        <button className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition">
                            <MoreVertical size={18} />
                        </button>
                        <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition ml-1">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Chat Body */}
                <div className="h-[320px] bg-slate-50 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    <div className="text-center text-xs text-slate-400 my-2 font-medium bg-slate-100 w-fit mx-auto px-3 py-1 rounded-full">Today</div>
                    {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed relative group ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'}`}>
                                {msg.text}
                                {/* Rich Content: Pricing Card */}
                                {msg.type === 'pricing' && (
                                    <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200 text-slate-800">
                                        <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-2">
                                            <CreditCard size={14} className="text-purple-600" />
                                            <span className="font-bold text-xs text-slate-700">Recommended Plans</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-xs bg-white p-2 rounded border border-slate-100">
                                                <span className="font-semibold text-slate-600">Starter</span>
                                                <span className="font-bold text-blue-600">$49<span className="text-[10px] text-slate-400 font-normal">/mo</span></span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs bg-purple-50 p-2 rounded border border-purple-100">
                                                <span className="font-semibold text-purple-700">Pro</span>
                                                <span className="font-bold text-purple-700">$99<span className="text-[10px] text-purple-400 font-normal">/mo</span></span>
                                            </div>
                                        </div>
                                        <button className="w-full mt-2 text-[10px] bg-slate-800 text-white py-1.5 rounded hover:bg-slate-700 transition">View Full Pricing</button>
                                    </div>
                                )}
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start animate-in fade-in duration-300">
                            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-4 shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="bg-white border-t border-slate-100 p-2 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-2 w-[350px]">
                    {chatSuggestions.map((suggestion, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSendMessage(null, suggestion)}
                            className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600 border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors flex-shrink-0"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <form onSubmit={(e) => handleSendMessage(e)} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                    <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-slate-50">
                        <Paperclip size={18} />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Type message..."
                            className="w-full bg-slate-100 border-0 focus:ring-1 focus:ring-blue-500 rounded-full pl-4 pr-10 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 transition-colors"
                        />
                        <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1">
                            <Smile size={18} />
                        </button>
                    </div>
                    {chatInput.trim() ? (
                        <button type="submit" className="p-2.5 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95">
                            <Send size={16} className="ml-0.5" />
                        </button>
                    ) : (
                        <button type="button" className="p-2.5 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors">
                            <Mic size={18} />
                        </button>
                    )}
                </form>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`w-14 h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 relative ${isChatOpen ? 'bg-slate-800 rotate-90 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}`}
            >
                {isChatOpen ? <X size={28} /> : <Bot size={28} />}

                {/* Unread Badge */}
                {!isChatOpen && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                        {unreadCount}
                    </span>
                )}
            </button>
        </div>
    );
}
