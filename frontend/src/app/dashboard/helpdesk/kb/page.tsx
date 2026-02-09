'use client';

import React from 'react';
import Link from 'next/link';
import {
    Search,
    Book,
    Monitor,
    CreditCard,
    Heart,
    Users,
    Shield,
    ChevronRight,
    FileText,
    ThumbsUp
} from 'lucide-react';

export default function KnowledgeBasePage() {
    const categories = [
        { name: 'IT & Hardware', icon: Monitor, count: 12, color: 'text-blue-500 bg-blue-50' },
        { name: 'Payroll & Finance', icon: CreditCard, count: 8, color: 'text-emerald-500 bg-emerald-50' },
        { name: 'Health & Benefits', icon: Heart, count: 15, color: 'text-rose-500 bg-rose-50' },
        { name: 'People & Culture', icon: Users, count: 24, color: 'text-amber-500 bg-amber-50' },
        { name: 'Security & Compliance', icon: Shield, count: 6, color: 'text-purple-500 bg-purple-50' },
    ];

    const articles = [
        { id: 1, title: 'How to configure VPN on macOS (2026 Updated)', time: '5 min read', category: 'IT & Hardware', likes: 142 },
        { id: 2, title: 'Understanding your tax declaration form 12BB', time: '8 min read', category: 'Payroll & Finance', likes: 89 },
        { id: 3, title: 'Emergency leave policy changes - Q3', time: '3 min read', category: 'People & Culture', likes: 312 },
        { id: 4, title: 'How to claim gym membership reimbursement', time: '4 min read', category: 'Health & Benefits', likes: 56 },
    ];

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="text-center py-12 px-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Knowledge Base</h1>
                <p className="text-slate-500 font-medium text-lg mb-8 max-w-2xl mx-auto">Find answers, troubleshooting guides, and policy documents.</p>

                <div className="max-w-xl mx-auto relative group">
                    <div className="absolute inset-0 bg-indigo-200 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all shadow-sm">
                        <div className="pl-5 text-slate-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Current search: 'VPN setup', 'Holidays'..."
                            className="w-full bg-transparent border-none py-4 px-4 text-slate-700 font-medium focus:ring-0"
                        />
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-6 px-4">Browse by Category</h2>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {categories.map((cat, i) => (
                        <div key={i} className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all cursor-pointer text-center">
                            <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color}`}>
                                <cat.icon size={24} />
                            </div>
                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">{cat.name}</h3>
                            <p className="text-xs font-bold text-slate-400">{cat.count} Articles</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popular Articles List */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Trending Articles</h2>
                    <button className="text-slate-400 hover:text-slate-600 font-bold text-sm flex items-center gap-1">
                        View All <ChevronRight size={16} />
                    </button>
                </div>
                <div className="space-y-2">
                    {articles.map((article) => (
                        <div key={article.id} className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 text-slate-300 group-hover:text-indigo-500 transition-colors">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{article.title}</h4>
                                    <div className="flex gap-3 text-xs font-medium text-slate-500 mt-1">
                                        <span className="font-bold text-slate-400 uppercase tracking-wide">{article.category}</span>
                                        <span>•</span>
                                        <span>{article.time}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold bg-slate-100 px-3 py-1 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                <ThumbsUp size={12} /> {article.likes}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Help */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
                    <p className="text-indigo-200 mb-8">Our support team is available 24/7 to assist you.</p>
                    <Link href="/dashboard/helpdesk/tickets" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                        Raise a Ticket <ChevronRight size={18} />
                    </Link>
                </div>
            </div>

        </div>
    );
}
