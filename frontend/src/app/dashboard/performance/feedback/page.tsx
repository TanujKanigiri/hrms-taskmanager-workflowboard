'use client';

import React, { useState } from 'react';
import {
    MessageSquare,
    Send,
    ThumbsUp,
    UserPlus,
    Search,
    Quote,
    MoreHorizontal,
    X,
    Filter,
    Check,
    ChevronDown,
    Plus
} from 'lucide-react';

export default function FeedbackPage() {
    const [activeTab, setActiveTab] = useState<'received' | 'given'>('received');
    const [searchQuery, setSearchQuery] = useState('');
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showGiveModal, setShowGiveModal] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState<any>(null); // For details modal

    // Expanded Mock Data to support both tabs
    const allFeedback = [
        {
            id: 1,
            author: 'Jane Cooper',
            recipient: 'Me',
            role: 'Product Designer',
            type: 'Peer',
            date: '2 days ago',
            content: "You were absolutely crucial during the specific design sprint. I really appreciated how you simplified the navigation logic for the mobile team. Your ability to translate complex reqs into simple code is amazing.",
            tags: ['Leadership', 'Collaboration'],
            sentiment: 'positive',
            tab: 'received'
        },
        {
            id: 2,
            author: 'Wade Warren',
            recipient: 'Me',
            role: 'Engineering Manager',
            type: 'Manager',
            date: '1 week ago',
            content: "Great job on the deployment pipeline optimization. It has saved the team countless hours. One area of improvement would be to document the process more thoroughly for new hires.",
            tags: ['Technical', 'Documentation'],
            sentiment: 'neutral',
            tab: 'received'
        },
        {
            id: 3,
            author: 'Me',
            recipient: 'Esther Howard',
            role: 'Frontend Dev',
            type: 'Peer',
            date: '3 weeks ago',
            content: "Thanks for helping me debug that CORS issue on Friday evening. You really went above and beyond!",
            tags: ['Helpfulness'],
            sentiment: 'positive',
            tab: 'given'
        },
        {
            id: 4,
            author: 'Cameron Williamson',
            recipient: 'Me',
            role: 'Product Manager',
            type: 'Stakeholder',
            date: '1 month ago',
            content: "The beta release was smooth. I love the new features. Let's focus on performance in the next sprint as users are reporting some lag.",
            tags: ['Productivity', 'Performance'],
            sentiment: 'constructive',
            tab: 'received'
        },
        {
            id: 5,
            author: 'Me',
            recipient: 'Robert Fox',
            role: 'DevOps Engineer',
            type: 'Peer',
            date: '2 months ago',
            content: "Your documentation on the new API endpoints is top-notch. Very easy to follow.",
            tags: ['Documentation'],
            sentiment: 'positive',
            tab: 'given'
        }
    ];

    const filteredFeedback = allFeedback.filter(item =>
        item.tab === activeTab &&
        (item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    const getGradient = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return 'from-emerald-500/10 to-teal-500/10 border-emerald-100';
            case 'constructive': return 'from-amber-500/10 to-orange-500/10 border-amber-100';
            default: return 'from-blue-500/10 to-indigo-500/10 border-blue-100';
        }
    };

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">

            {/* --- MODALS --- */}

            {/* Request Feedback Modal */}
            {showRequestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowRequestModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-900">Request Feedback</h2>
                            <button onClick={() => setShowRequestModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Who to ask?</label>
                                <div className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl hover:border-blue-400 transition-colors cursor-pointer group">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Plus size={16} />
                                    </div>
                                    <span className="text-slate-400 font-medium text-sm group-hover:text-slate-600">Select colleagues...</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message (Optional)</label>
                                <textarea
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 text-sm font-medium text-slate-700"
                                    placeholder="Hey! I'd love some feedback on my recent project performance..."
                                ></textarea>
                            </div>
                            <button onClick={() => setShowRequestModal(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Give Feedback Modal */}
            {showGiveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowGiveModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-900">Give Feedback</h2>
                            <button onClick={() => setShowGiveModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Recipient</label>
                                <input
                                    type="text"
                                    placeholder="Search for a colleague..."
                                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Feedback Type</label>
                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-bold hover:bg-emerald-100 transition-colors">Positive</button>
                                    <button className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm font-bold hover:bg-slate-50 transition-colors">Constructive</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Your Feedback</label>
                                <textarea
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none h-32 text-sm font-medium text-slate-700"
                                    placeholder="Share your thoughts..."
                                ></textarea>
                            </div>
                            <button onClick={() => setShowGiveModal(false)} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                                Send Feedback
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {selectedFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedFeedback(null)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700">
                                    {selectedFeedback.author.split(' ').map((n: any) => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{selectedFeedback.author}</h3>
                                    <p className="text-slate-500 text-sm font-medium">{selectedFeedback.role}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedFeedback(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>

                        <div className="mb-8 relative">
                            <Quote className="absolute -top-4 -left-2 text-slate-100 transform -scale-x-100" size={48} />
                            <p className="relative z-10 text-slate-700 font-medium text-lg leading-relaxed italic">
                                "{selectedFeedback.content}"
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {selectedFeedback.tags.map((tag: any) => (
                                <span key={tag} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                            <span className="text-slate-400 text-sm font-bold">{selectedFeedback.date}</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors">Reply</button>
                                <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors">Thank</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Feedback</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Give and receive feedback to grow together.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setShowRequestModal(true)} className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
                        <UserPlus size={18} /> Request Feedback
                    </button>
                    <button onClick={() => setShowGiveModal(true)} className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                        <Send size={18} /> Give Feedback
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex p-1 bg-slate-100 rounded-xl">
                    <button
                        onClick={() => setActiveTab('received')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'received' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Received
                    </button>
                    <button
                        onClick={() => setActiveTab('given')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'given' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Given
                    </button>
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search feedback..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-slate-200"
                    />
                </div>
            </div>

            {/* Masonry Grid Feedback */}
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
                {filteredFeedback.map((item) => (
                    <div key={item.id} className={`break-inside-avoid relative p-8 rounded-[2rem] bg-gradient-to-br ${getGradient(item.sentiment)} border hover:scale-[1.02] transition-transform duration-300 group`}>

                        <Quote className="absolute top-8 right-8 text-slate-900/5 group-hover:text-slate-900/10 transition-colors" size={64} />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-lg font-bold text-slate-700 shadow-sm">
                                    {item.author.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{item.author}</h3>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{item.role} • {item.type}</p>
                                </div>
                            </div>

                            <p className="text-slate-700 font-medium leading-relaxed mb-6">" {item.content} "</p>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-white/60 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-600 border border-black/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-slate-400">{item.date}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setSelectedFeedback(item)} className="p-2 hover:bg-black/5 rounded-lg text-slate-500">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State / CTA Card */}
                <div className="break-inside-avoid flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-slate-200 text-center hover:bg-slate-50 transition-colors min-h-[300px]">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                        <MessageSquare size={24} />
                    </div>
                    <h3 className="font-bold text-slate-700 mb-2">Ask for more feedback</h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">Getting continuous feedback is the best way to improve. Reach out to your peers today.</p>
                    <button onClick={() => setShowRequestModal(true)} className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:border-slate-300 transition-colors shadow-sm">
                        Request Now
                    </button>
                </div>
            </div>

        </div>
    );
}
