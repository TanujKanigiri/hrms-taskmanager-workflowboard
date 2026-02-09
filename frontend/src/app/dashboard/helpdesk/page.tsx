'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    LifeBuoy,
    Book,
    FileText,
    MessageSquare,
    CheckCircle2,
    AlertTriangle,
    Server,
    Activity,
    ArrowRight,
    Zap
} from 'lucide-react';

export default function HelpCenterPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const systemStatus = [
        { name: 'Payroll System', status: 'Operational', color: 'text-emerald-500' },
        { name: 'Leave Portal', status: 'Operational', color: 'text-emerald-500' },
        { name: 'Document Vault', status: 'Maintenance', color: 'text-amber-500' },
        { name: 'SAML SSO', status: 'Operational', color: 'text-emerald-500' },
    ];

    const popularArticles = [
        { title: 'How to claim LTA tax benefits?', views: '1.2k', category: 'Finance' },
        { title: 'Updating emergency contact details', views: '850', category: 'Profile' },
        { title: 'VPN configuration for remote access', views: '2.4k', category: 'IT' },
    ];

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Hero Search Section */}
            <div className="relative bg-[#0f172a] rounded-[2.5rem] p-10 md:p-16 text-center text-white overflow-hidden shadow-2xl">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest text-indigo-200">
                        <LifeBuoy size={14} /> Zentra Support 2.0
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">How can we help you?</h1>
                    <p className="text-slate-400 text-lg font-medium">Search knowledge base, raise tickets, or chat with AI.</p>

                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden focus-within:bg-white/20 transition-all">
                            <div className="pl-6 text-slate-400">
                                <Search size={24} />
                            </div>
                            <input
                                type="text"
                                placeholder="Describe your issue (e.g., 'Laptop slow', 'Salary missing')..."
                                className="w-full bg-transparent border-none py-5 px-4 text-white placeholder-slate-400 font-medium focus:ring-0 text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="mr-2 px-6 py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Quick Suggestions */}
                    <div className="flex flex-wrap justify-center gap-2 text-sm font-medium text-slate-400">
                        <span>Popular:</span>
                        {['Reset Password', 'Payslip Error', 'Leave Policy', 'Insurance'].map(tag => (
                            <button key={tag} className="hover:text-white underline decoration-slate-600 hover:decoration-white transition-all underline-offset-4">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* 1. Knowledge Base */}
                <Link href="/dashboard/helpdesk/kb" className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Book size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Knowledge Base</h3>
                    <p className="text-slate-500 font-medium mb-6">Browse articles, tutorials, and FAQs to find answers instantly.</p>
                    <div className="space-y-3">
                        {popularArticles.map((article, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900/5 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                                <FileText size={16} className="text-slate-400 group-hover:text-indigo-400" />
                                <span className="text-sm font-bold text-slate-700 truncate">{article.title}</span>
                            </div>
                        ))}
                    </div>
                </Link>

                {/* 2. My Tickets */}
                <Link href="/dashboard/helpdesk/tickets" className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <MessageSquare size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">My Tickets</h3>
                    <p className="text-slate-500 font-medium mb-6">Track the status of your support requests.</p>

                    <div className="flex-1 flex flex-col justify-end space-y-4">
                        <div className="flex justify-between items-center p-4 bg-amber-50 rounded-2xl border border-amber-100">
                            <div>
                                <span className="text-4xl font-black text-amber-600">3</span>
                                <p className="text-xs font-bold text-amber-700 uppercase">Active</p>
                            </div>
                            <div className="text-right">
                                <span className="text-4xl font-black text-emerald-600">12</span>
                                <p className="text-xs font-bold text-emerald-700 uppercase">Solved</p>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                            <Zap size={18} /> Raise New Ticket
                        </button>
                    </div>
                </Link>

                {/* 3. System Status */}
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <Activity className="text-emerald-400 animate-pulse" /> System Status
                            </h3>
                            <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-lg text-slate-300">Live</span>
                        </div>

                        <div className="space-y-4">
                            {systemStatus.map((sys, i) => (
                                <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Server size={18} className="text-slate-400" />
                                        <span className="font-bold">{sys.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                        {sys.status === 'Operational' && <CheckCircle2 size={14} className={sys.color} />}
                                        {sys.status === 'Maintenance' && <AlertTriangle size={14} className={sys.color} />}
                                        <span className={sys.color}>{sys.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-sm font-medium text-slate-400">Scheduled Maintenance: <span className="text-white">Oct 28, 02:00 AM UTC</span></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
