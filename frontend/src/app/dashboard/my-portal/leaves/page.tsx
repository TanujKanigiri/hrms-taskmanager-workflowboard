"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Plus,
    MoreHorizontal,
    ChevronRight,
    Plane,
    Coffee,
    Briefcase,
    Sun,
    Umbrella,
    TrendingUp,
    Sparkles,
    CreditCard
} from 'lucide-react';

export default function MyLeavesPage() {
    const [filter, setFilter] = useState('All');
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Mock Data
    const leaveBalances = [
        { type: 'Casual Leave', code: 'CL', balance: 8, total: 12, color: 'text-emerald-500', bg: 'bg-emerald-500', icon: Coffee },
        { type: 'Sick Leave', code: 'SL', balance: 5, total: 10, color: 'text-amber-500', bg: 'bg-amber-500', icon: Umbrella },
        { type: 'Privilege Leave', code: 'PL', balance: 15, total: 20, color: 'text-blue-500', bg: 'bg-blue-500', icon: Plane },
        { type: 'Comp Off', code: 'CO', balance: 2, total: 0, color: 'text-purple-500', bg: 'bg-purple-500', icon: Briefcase },
    ];

    const leaveRequestHistory = [
        { id: 1, type: 'Privilege Leave', dates: 'Dec 24 - Dec 28', days: 5, status: 'Approved', requestedOn: 'Dec 10, 2025' },
        { id: 2, type: 'Sick Leave', dates: 'Jan 12', days: 1, status: 'Rejected', requestedOn: 'Jan 12, 2026' },
        { id: 3, type: 'Casual Leave', dates: 'Jan 05', days: 1, status: 'Pending', requestedOn: 'Jan 01, 2026' },
        { id: 4, type: 'Sick Leave', dates: 'Nov 20 - Nov 21', days: 2, status: 'Approved', requestedOn: 'Nov 20, 2025' },
    ];

    const upcomingHolidays = [
        { name: 'Republic Day', date: 'Jan 26', day: 'Monday', type: 'Public Holiday' },
        { name: 'Holi', date: 'Mar 04', day: 'Wednesday', type: 'Floating Holiday' },
        { name: 'Good Friday', date: 'Apr 03', day: 'Friday', type: 'Public Holiday' },
    ];

    return (
        <div className="min-h-screen space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">

            {/* 1. Header & Hero Action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Time Off & Balances</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage your wellness and personal time.</p>
                </div>

                <div className="flex gap-4">
                    <Link href="/dashboard/leave/holidays" className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 shadow-sm rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
                        <Calendar size={18} />
                        <span>Holiday List</span>
                    </Link>
                    <Link href="/dashboard/leave/apply" className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white shadow-lg shadow-slate-900/20 rounded-xl font-bold hover:bg-slate-800 hover:scale-105 transition-all">
                        <Plus size={18} />
                        <span>Apply Leave</span>
                    </Link>
                </div>
            </div>

            {/* 2. Top Section: Smart Insights & Balances */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* A. Leave Wallet (Main Balance) */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* The "Wallet" Card */}
                    <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-[#0B1120] to-[#1e293b] rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                        {/* decorative bg */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-all duration-1000"></div>

                        <div className="relative z-10 flex flex-col h-full bg-cover">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs mb-2">
                                        <Sparkles size={14} /> Total Available Balance
                                    </div>
                                    <div className="text-6xl font-black tracking-tighter">
                                        25.5 <span className="text-2xl font-bold text-slate-400">Days</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                                    <CreditCard className="text-cyan-400" />
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
                                {leaveBalances.slice(0, 3).map((item) => (
                                    <div key={item.type} className="flex flex-col">
                                        <span className="text-xs text-slate-400 font-medium uppercase">{item.code}</span>
                                        <span className="text-xl font-bold mt-1">{item.balance}/{item.total}</span>
                                        <div className="w-full h-1.5 bg-slate-700/50 rounded-full mt-2 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${item.bg}`}
                                                style={{ width: `${(item.balance / item.total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Clean & Meaningful Pending Card */}
                    <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
                        {/* Soft Orange Gradient Background */}
                        <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-slate-50 to-white opacity-40 blur-2xl group-hover:opacity-60 transition-opacity"></div>

                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-orange-500 shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform duration-500">
                                    <AlertCircle size={24} />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-orange-50 text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                                    Action
                                </span>
                            </div>

                            <div className="mb-2">
                                <h3 className="text-4xl font-black text-slate-800 tracking-tight">
                                    2 <span className="text-lg font-bold text-slate-400">Reqs</span>
                                </h3>
                                <p className="text-sm font-bold text-orange-500 mt-1 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                                    Awaiting Approval
                                </p>
                            </div>

                            {/* Meaningful Visual: Status Workflow */}
                            <div className="mt-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Current Stage</p>
                                <div className="flex items-center gap-2">
                                    {/* Applied (Done) */}
                                    <div className="h-2 w-8 rounded-full bg-emerald-400"></div>
                                    {/* Manager (Current) */}
                                    <div className="h-2 w-12 rounded-full bg-orange-400 animate-pulse"></div>
                                    {/* HR (Future) */}
                                    <div className="h-2 w-8 rounded-full bg-slate-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mesh Gradient Trend Card */}
                    <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-500">
                        {/* Animated Mesh Gradient Background */}
                        <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-white opacity-40 blur-2xl group-hover:opacity-60 transition-opacity"></div>

                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform duration-500">
                                    <TrendingUp size={24} />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-4xl font-black text-slate-800 tracking-tight">
                                    12 <span className="text-lg font-bold text-slate-400">Days</span>
                                </h3>
                                <p className="text-sm font-bold text-indigo-600 mt-1 flex items-center gap-1">
                                    <span className="bg-indigo-100 px-1.5 py-0.5 rounded text-[10px]">YEARLY</span>
                                    vs 10 last year
                                </p>
                            </div>

                            {/* Mini Chart Visualization */}
                            <div className="flex items-end gap-1 h-8 mt-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="flex-1 bg-indigo-200 rounded-t-sm h-[30%]"></div>
                                <div className="flex-1 bg-indigo-300 rounded-t-sm h-[50%]"></div>
                                <div className="flex-1 bg-indigo-400 rounded-t-sm h-[40%]"></div>
                                <div className="flex-1 bg-indigo-500 rounded-t-sm h-[80%]"></div>
                                <div className="flex-1 bg-indigo-600 rounded-t-sm h-[60%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* B. Smart Planner AND Clock/Calendar Widget */}
                <div className="lg:col-span-1 space-y-6">

                    {/* NEW: Stylish Time & Calendar Widget */}
                    <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-100/50 relative overflow-hidden group">
                        {/* Interactive Background Element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/10 transition-all duration-1000"></div>

                        <div className="relative z-10">
                            {/* Time Header with modern type */}
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <h3 className="text-5xl font-black text-slate-800 tracking-tighter tabular-nums leading-none">
                                        {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </h3>
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2 ml-1">
                                        {currentDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>

                                {/* Animated Pulse Indicator */}
                                <div className="relative flex items-center justify-center w-12 h-12">
                                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping"></div>
                                    <div className="relative w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100">
                                        <Clock size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Stylish Calendar Grid */}
                            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
                                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black uppercase text-slate-300 mb-2">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} className="py-1">{d}</span>)}
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                                    {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() }).map((_, i) => (
                                        <div key={`empty-${i}`} />
                                    ))}
                                    {Array.from({ length: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() }).map((_, i) => {
                                        const day = i + 1;
                                        const isToday = day === currentDate.getDate();
                                        return (
                                            <div key={day} className={`aspect-square flex items-center justify-center rounded-full transition-all duration-300 relative group/day cursor-default
                                                ${isToday
                                                    ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/30 scale-110 z-10'
                                                    : 'text-slate-600 hover:bg-white hover:shadow-md hover:scale-110 hover:z-10 hover:text-indigo-600'
                                                }`}>
                                                {day}
                                                {isToday && <div className="absolute inset-0 bg-white/20 rounded-full blur-sm -z-10"></div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Smart Planner */}
                    <div className="bg-gradient-to-b from-indigo-500 to-purple-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 font-bold text-indigo-100 uppercase tracking-wider text-xs mb-4">
                                <Sparkles size={14} /> Smart Planner
                            </div>

                            <h3 className="text-2xl font-bold mb-6">Maximize your holidays 🏖️</h3>

                            <div className="space-y-4">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-white">Republic Day Weekend</span>
                                        <span className="px-2 py-0.5 bg-green-400/20 text-green-300 text-[10px] font-bold rounded-full uppercase">High Value</span>
                                    </div>
                                    <p className="text-indigo-100 text-sm leading-relaxed">
                                        Take <strong>Friday, Jan 23</strong> off to combine with Republic Day (Mon) for a <span className="text-white font-bold decoration-wavy underline decoration-white/30">4-day streak</span>!
                                    </p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-white">Good Friday Break</span>
                                    </div>
                                    <p className="text-indigo-100 text-sm leading-relaxed">
                                        Good Friday falls on Apr 3. Automatic 3-day weekend unlocked! 🎉
                                    </p>
                                </div>
                            </div>

                            <Link href="/dashboard/leave/apply" className="mt-6 w-full py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg border border-white hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                                Plan Vacation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Recent Activity & Holidays Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Leaves Table */}
                <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[2rem] shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
                            <p className="text-slate-500 text-sm">Track your recent leave applications</p>
                        </div>
                        <Link href="/dashboard/leave/history" className="text-sm font-bold text-slate-800 border-2 border-slate-900 px-5 py-2 rounded-xl hover:bg-slate-900 hover:text-white transition-colors">
                            View All History
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left border-b border-slate-100">
                                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider pl-4">Type</th>
                                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Days</th>
                                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider pr-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="space-y-4">
                                {leaveRequestHistory.map((req) => (
                                    <tr key={req.id} className="group hover:bg-slate-50 transition-colors rounded-xl">
                                        <td className="py-4 pl-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${req.type.includes('Sick') ? 'bg-amber-100 text-amber-600' :
                                                    req.type.includes('Casual') ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    {req.type.includes('Sick') ? <Umbrella size={18} /> :
                                                        req.type.includes('Casual') ? <Coffee size={18} /> : <Plane size={18} />}
                                                </div>
                                                <span className="font-bold text-slate-700">{req.type}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 font-medium text-slate-600">{req.dates}</td>
                                        <td className="py-4">
                                            <span className="font-bold text-slate-800">{req.days} Day{req.days > 1 ? 's' : ''}</span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                req.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="py-4 pr-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Upcoming Holidays Widget */}
                <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Holidays</h2>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">2026</span>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

                        <div className="space-y-6">
                            {upcomingHolidays.map((holiday, idx) => (
                                <div key={idx} className="relative flex items-center gap-4 group">
                                    <div className="relative z-10 w-10 h-10 bg-white border-4 border-slate-50 rounded-full shadow-sm flex items-center justify-center text-xs font-black text-slate-400 group-hover:border-cyan-100 group-hover:text-cyan-500 transition-all">
                                        {holiday.date.split(' ')[1]}
                                    </div>
                                    <div className="flex-1 bg-slate-50 p-4 rounded-2xl hover:bg-cyan-50/50 transition-colors border border-transparent hover:border-cyan-100">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-slate-800">{holiday.name}</span>
                                            <span className="text-xs font-bold text-slate-400">{holiday.day}</span>
                                        </div>
                                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{holiday.date} • {holiday.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link href="/dashboard/leave/holidays" className="block w-full text-center mt-6 py-3 border-2 border-slate-900 rounded-xl text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all text-sm">
                            View Full Calendar
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}
