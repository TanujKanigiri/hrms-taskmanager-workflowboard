'use client';
import React, { useState, useEffect } from 'react';
import {
    Users,
    Briefcase,
    Clock,
    TrendingUp,
    Calendar,
    CheckCircle2,
    ArrowUpRight,
    FileText,
    Bell,
    MoreHorizontal,
    Plus,
    Plane
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AttendanceWidget from '@/components/dashboard/AttendanceWidget';

export default function DashboardPage() {
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        setCurrentDate(now.toLocaleDateString('en-US', options));
    }, []);

    const stats = [
        { title: 'Total Employees', value: '1,248', trend: '+12%', icon: Users, color: 'blue' },
        { title: 'Open Jobs', value: '34', trend: '+4', icon: Briefcase, color: 'purple' },
        { title: 'On Leave Today', value: '12', trend: '-2', icon: Plane, color: 'orange' },
        { title: 'Avg. Attendance', value: '96%', trend: '+1.2%', icon: Clock, color: 'emerald' },
    ];

    const quickActions = [
        { title: 'Post a Job', icon: Briefcase, color: 'from-violet-500 to-fuchsia-600', href: '/dashboard/recruitment/jobs' },
        { title: 'Add Employee', icon: Plus, color: 'from-blue-500 to-cyan-500', href: '/dashboard/employees/onboard' },
        { title: 'Run Payroll', icon: ArrowUpRight, color: 'from-emerald-400 to-teal-500', href: '/dashboard/payroll' },
        { title: 'Announcement', icon: Bell, color: 'from-orange-400 to-rose-500', href: '/dashboard/helpdesk/kb' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* 1. Ultra-Premium Hero Section */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0B1121] via-[#161e32] to-[#0f172a] text-white shadow-2xl p-8 md:p-12">
                {/* Abstract animated background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-overlay animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] mix-blend-overlay"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-cyan-300 text-xs font-bold uppercase tracking-widest shadow-lg">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            Live System Status
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                            Hello, Admin.
                        </h1>
                        <p className="text-slate-400 text-lg font-medium max-w-lg leading-relaxed">
                            Your workforce intelligence is optimized. Efficiency is up <span className="text-emerald-400 font-bold">+12%</span> this week.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                            <button className="relative flex items-center gap-3 px-6 py-4 bg-slate-900 rounded-2xl leading-none text-white font-bold hover:bg-slate-800 transition-all">
                                <Calendar size={20} className="text-cyan-400" />
                                <span className="tracking-wide">{currentDate}</span>
                            </button>
                        </div>
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                            <Link
                                href="#command-center"
                                className="relative flex items-center gap-3 px-6 py-4 bg-slate-900 rounded-2xl leading-none text-white font-bold hover:bg-slate-800 transition-all"
                            >
                                <Plus size={20} className="text-emerald-400" />
                                <span>Action Center</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Glassmorphic Metric Strip at bottom of Hero */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/5">
                    {stats.map((stat, i) => (
                        <div key={i} className="group relative p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer overflow-hidden">
                            <div className={`absolute top-0 right-0 p-3 opacity-20 transform translate-x-2 -translate-y-2 group-hover:scale-125 transition-transform duration-500`}>
                                <stat.icon size={48} className={`text-${stat.color}-400`} />
                            </div>
                            <div className="relative z-10">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-black text-white tracking-tight">{stat.value}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.trend.includes('+') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                                        }`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:w-full transition-all duration-700 opacity-50"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COL: Action Center & Feed (8/12) */}
                <div className="lg:col-span-8 space-y-8">

                    {/* ... existing code ... */}

                    {/* Quick Command Dock */}
                    <div id="command-center" className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                {/* ... existing code ... */}
                                <Briefcase className="text-indigo-500" /> Command Center
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {quickActions.map((action, i) => (
                                    <Link
                                        key={i}
                                        href={action.href}
                                        className="group flex flex-col items-center justify-center p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-100 transition-all duration-300 relative overflow-hidden text-center"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br ${action.color}`}>
                                            <action.icon size={28} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{action.title}</span>
                                        <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Activity Feed */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Bell className="text-rose-500" /> Live Activity Feed
                            </h3>
                            <div className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time</span>
                            </div>
                        </div>

                        <div className="p-0">
                            {[
                                { title: 'New Employee Onboarded', desc: 'Sarah Jenkins joined the Design Team', time: '2m', category: 'HR', color: 'border-l-blue-500' },
                                { title: 'Leave Request Approved', desc: 'Marketing team vacation request approved', time: '1h', category: 'Leave', color: 'border-l-emerald-500' },
                                { title: 'Payroll Run Completed', desc: 'Monthly payroll for Dec 2025 processed', time: '4h', category: 'Finance', color: 'border-l-purple-500' },
                                { title: 'New Job Application', desc: 'Senior React Developer position', time: '1d', category: 'Recruit', color: 'border-l-orange-500' },
                            ].map((item, i) => (
                                <div key={i} className={`p-6 border-b border-slate-50 hover:bg-slate-50/80 transition-all flex items-start gap-4 group ${item.color} border-l-4`}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 uppercase">{item.category}</span>
                                            <span className="text-xs font-bold text-slate-300">•</span>
                                            <span className="text-sm font-bold text-slate-900">{item.title}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 pl-[4.5rem] -mt-1">{item.desc}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-indigo-500">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="p-6 bg-slate-50/50 text-center border-t border-slate-100">
                                <Link href="/dashboard/tasks/my-tasks" className="inline-block px-8 py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest text-xs shadow-sm">
                                    View Full Log
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COL: Widgets (4/12) */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Attendance Widget Wrapper - Adding a glassy feel */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        <AttendanceWidget />
                    </div>

                    {/* "Workforce Mood" Simulated Widget */}
                    <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/50 rounded-full blur-[50px]"></div>

                        <div className="relative z-10 text-center">
                            <div className="mb-6 inline-block p-4 rounded-full bg-slate-800/50 backdrop-blur-md border border-white/10 shadow-inner">
                                <Users size={32} className="text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-black mb-1">94%</h3>
                            <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest mb-6">Engagement Score</p>

                            <div className="flex justify-between items-end gap-1 h-12 mb-2 px-4">
                                {[40, 60, 45, 90, 80, 50, 70].map((h, idx) => (
                                    <div key={idx} className="w-2 bg-gradient-to-t from-indigo-900 to-indigo-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Last 7 Days Trend</p>
                        </div>
                    </div>

                    {/* Holidays Minimal List */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
                            <span>Holiday Radar</span>
                            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-500">2026</span>
                        </h3>
                        <div className="space-y-3">
                            {[
                                { name: 'Republic Day', date: 'Jan 26', type: 'Public', days: '4d' },
                                { name: 'Holi', date: 'Mar 04', type: 'Floating', days: '42d' },
                                { name: 'Good Friday', date: 'Apr 03', type: 'Public', days: '72d' },
                            ].map((h, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-default">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex flex-col items-center justify-center font-bold text-[10px] border border-orange-100 leading-none">
                                            <span>{h.date.split(' ')[0]}</span>
                                            <span className="text-xs">{h.date.split(' ')[1]}</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-800 group-hover:text-orange-500 transition-colors">{h.name}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase">{h.type}</div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-black text-slate-300 group-hover:text-slate-500 transition-colors">
                                        in {h.days}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
