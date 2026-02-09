'use client';

import React from 'react';
import Link from 'next/link';
import {
    Briefcase,
    Users,
    CalendarCheck,
    TrendingUp,
    Plus,
    ArrowRight,
    Clock,
    Search,
    Target,
    UserPlus,
    CheckCircle2
} from 'lucide-react';

export default function RecruitmentDashboard() {

    const stats = [
        { label: 'Active Jobs', value: '12', trend: '+2 this week', icon: Briefcase, color: 'text-violet-600 bg-violet-50' },
        { label: 'Total Candidates', value: '148', trend: '+24 new', icon: Users, color: 'text-fuchsia-600 bg-fuchsia-50' },
        { label: 'Interviews Scheduled', value: '28', trend: 'Next 7 days', icon: CalendarCheck, color: 'text-orange-600 bg-orange-50' },
        { label: 'Time to Hire', value: '18 Days', trend: '-2 days avg', icon: Clock, color: 'text-emerald-600 bg-emerald-50' },
    ];

    const recentPostings = [
        { id: 1, title: 'Senior Frontend Engineer', dept: 'Engineering', applicants: 42, status: 'Active', days: '2d ago' },
        { id: 2, title: 'Product Designer', dept: 'Design', applicants: 18, status: 'Active', days: '5d ago' },
        { id: 3, title: 'Marketing Manager', dept: 'Marketing', applicants: 64, status: 'Closing Soon', days: '1w ago' },
    ];

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Hero Section */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/30 text-fuchsia-200 text-xs font-bold uppercase tracking-widest mb-4">
                            <Target size={14} className="animate-pulse" /> Hiring Blitz Q4
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Talent <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">Acquisition</span></h1>
                        <p className="text-slate-400 text-lg font-medium max-w-xl">Manage your hiring pipeline, schedule interviews, and onboard top talent efficiently.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/dashboard/recruitment/jobs" className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl font-bold hover:bg-white/20 transition-all">
                            <Briefcase size={20} /> View All Jobs
                        </Link>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-violet-50 transition-all shadow-lg shadow-white/10">
                            <Plus size={20} /> Post New Job
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                        <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. Quick Actions & Modules */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Modules Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/dashboard/recruitment/candidates" className="group bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-xl hover:scale-[1.01] transition-transform relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Users size={120} />
                            </div>
                            <div className="relative z-10">
                                <Users size={32} className="mb-6 opacity-90" />
                                <h3 className="text-2xl font-bold mb-2">Candidate Pipeline</h3>
                                <p className="text-violet-200 font-medium mb-6">Track applications through the screening process.</p>
                                <div className="flex -space-x-3 mb-6">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-violet-500 bg-violet-400"></div>)}
                                    <div className="w-10 h-10 rounded-full border-2 border-violet-500 bg-white flex items-center justify-center text-xs font-bold text-violet-600">+144</div>
                                </div>
                                <span className="inline-flex items-center gap-2 font-bold group-hover:gap-4 transition-all">Go to Kanban <ArrowRight size={18} /></span>
                            </div>
                        </Link>

                        <Link href="/dashboard/recruitment/interviews" className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-transform">
                            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6">
                                <CalendarCheck size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Interview Scheduler</h3>
                            <p className="text-slate-500 font-medium mb-6">Syncs with Calendar. 4 interviews pending today.</p>
                            <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:gap-4 transition-all">
                                View Schedule <ArrowRight size={18} />
                            </div>
                        </Link>
                    </div>

                    {/* Recent Job Postings List */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-800">Recent Job Postings</h3>
                            <Link href="/dashboard/recruitment/jobs" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentPostings.map((job) => (
                                <div key={job.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold text-lg">
                                            {job.title.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{job.title}</h4>
                                            <p className="text-xs font-bold text-slate-500">{job.dept} • {job.days}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-center hidden md:block">
                                            <span className="block font-black text-slate-800">{job.applicants}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Applicants</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Side Activity Feed */}
                <div className="space-y-6">
                    {/* Onboarding Widget */}
                    <Link href="/dashboard/recruitment/onboarding" className="block bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <UserPlus size={32} className="text-emerald-400 mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Onboarding</h3>
                            <p className="text-slate-400 font-medium mb-6">3 candidates ready to join next week.</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs">JD</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">John Doe</p>
                                        <p className="text-xs text-emerald-300">Offer Accepted</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-xs">AS</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Alice Smith</p>
                                        <p className="text-xs text-indigo-300">Doc Verification</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* AI Insight */}
                    <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 p-8 rounded-[2.5rem] border border-fuchsia-100">
                        <div className="flex items-center gap-2 mb-4">
                            <Target size={20} className="text-fuchsia-600" />
                            <span className="text-xs font-black text-fuchsia-600 uppercase tracking-widest">Hiring Insight</span>
                        </div>
                        <p className="text-slate-700 font-bold text-lg leading-snug mb-4">
                            "Engineering" roles are seeing a 15% drop in applications compared to last month.
                        </p>
                        <button className="text-fuchsia-600 font-bold text-sm hover:underline">View Analytics</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
