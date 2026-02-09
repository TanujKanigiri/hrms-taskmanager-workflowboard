"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Banknote,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    CreditCard,
    DollarSign,
    FileBarChart,
    Globe,
    LayoutDashboard,
    PieChart,
    Settings,
    ShieldAlert,
    TrendingUp,
    Users
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PayrollDashboard() {
    const router = useRouter();

    // Mock Data for "Global Payroll" Map visualization
    const regions = [
        { name: 'USA', employees: 120, cost: '$420K', status: 'Ready' },
        { name: 'India', employees: 450, cost: '₹1.2Cr', status: 'Processing' },
        { name: 'UK', employees: 85, cost: '£180K', status: 'Completed' },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12">

            {/* 1. Header & Quick Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payroll Command Center</h1>
                    <p className="text-slate-500 font-medium mt-1">Overview of your global compensation & compliance status.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> System Healthy
                    </span>
                    <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            {/* 2. Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { title: "Total Payroll Cost", value: "₹1.24 Cr", sub: "+12% vs last month", icon: Banknote, color: "blue" },
                    { title: "Avg. Net Salary", value: "₹55,000", sub: "Per Employee", icon: Users, color: "indigo" },
                    { title: "Compliance Score", value: "98%", sub: "2 Issues Pending", icon: ShieldAlert, color: "emerald" },
                    { title: "Pending Claims", value: "₹4.5L", sub: "14 Claims to Review", icon: CreditCard, color: "amber" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 bg-${stat.color}-500 transition-all rounded-bl-3xl`}>
                            <stat.icon size={40} className={`text-${stat.color}-600`} />
                        </div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.title}</p>
                        <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                        <p className={`text-xs font-bold text-${stat.color}-600 bg-${stat.color}-50 inline-block px-2 py-0.5 rounded`}>
                            {stat.sub}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* 3. Main Actions & Geo Map (Left Column) */}
                <div className="xl:col-span-8 space-y-8">

                    {/* Module Nav Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Payslips Module */}
                        <div
                            onClick={() => router.push('/dashboard/payroll/payslips')}
                            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center cursor-pointer hover:scale-[1.02] transition-transform shadow-xl shadow-blue-500/20 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:bg-white/30 transition-colors">
                                <FileBarChart size={32} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Manage Payslips</h3>
                            <p className="text-blue-100 text-sm mb-4">Run payroll & generate slips</p>
                            <div className="inline-flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors">
                                Open Module <ChevronRight size={14} />
                            </div>
                        </div>

                        {/* Tax Module */}
                        <div
                            onClick={() => router.push('/dashboard/payroll/tax')}
                            className="bg-white rounded-2xl p-6 text-center cursor-pointer hover:border-purple-500/50 border border-slate-200 transition-all shadow-sm hover:shadow-lg group"
                        >
                            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition-colors">
                                <PieChart size={32} className="text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Tax Declarations</h3>
                            <p className="text-slate-500 text-sm mb-4">Investment proofs & TDS</p>
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg group-hover:bg-purple-100 transition-colors">
                                Review Taxes <ChevronRight size={14} />
                            </div>
                        </div>

                        {/* Expenses Module */}
                        <div
                            onClick={() => router.push('/dashboard/payroll/expenses')}
                            className="bg-white rounded-2xl p-6 text-center cursor-pointer hover:border-emerald-500/50 border border-slate-200 transition-all shadow-sm hover:shadow-lg group"
                        >
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-100 transition-colors">
                                <DollarSign size={32} className="text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Expense Claims</h3>
                            <p className="text-slate-500 text-sm mb-4">Reimbursements & Approvals</p>
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                View Claims <ChevronRight size={14} />
                            </div>
                        </div>
                    </div>

                    {/* Global Payroll Map Visualization (Mock) */}
                    <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden min-h-[300px] flex flex-col md:flex-row items-center gap-8">
                        {/* Decorative Background */}
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center opacity-5 bg-contain grayscale pointer-events-none"></div>

                        <div className="relative z-10 flex-1">
                            <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                                <Globe size={24} className="text-blue-500" /> Global Payroll Status
                            </h3>
                            <p className="text-slate-400 mb-6">Real-time status of multi-geo payroll processing.</p>

                            <div className="space-y-4">
                                {regions.map((region, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-3 h-3 rounded-full ${region.status === 'Ready' ? 'bg-amber-500' : region.status === 'Processing' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                                            <span className="font-bold text-white text-lg">{region.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-mono font-bold">{region.cost}</p>
                                            <p className="text-xs text-slate-500">{region.employees} Employees</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Element Placeholder */}
                        <div className="w-full md:w-1/3 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                            <h4 className="text-white font-bold mb-4">Processing Queue</h4>
                            <div className="space-y-6 relative">
                                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/10"></div>

                                {[
                                    { step: 'Data Sync', status: 'done' },
                                    { step: 'Tax Calculation', status: 'done' },
                                    { step: 'Bank Advice', status: 'current' },
                                    { step: 'Disbursement', status: 'pending' },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center gap-4 relative z-10">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${s.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : s.status === 'current' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-slate-800 border-slate-600'}`}>
                                            {s.status === 'done' && <CheckCircle2 size={12} />}
                                            {s.status === 'current' && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                                        </div>
                                        <span className={`text-sm font-medium ${s.status === 'pending' ? 'text-slate-500' : 'text-white'}`}>{s.step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* 4. Timeline & Activity (Right Column) */}
                <div className="xl:col-span-4 space-y-8">

                    {/* Important Dates */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Calendar size={18} className="text-slate-400" /> Critical Dates
                        </h4>

                        <div className="space-y-4">
                            {[
                                { day: '25', month: 'JAN', event: 'Payroll Cutoff', sub: 'Finalize Attendance', urgent: true },
                                { day: '31', month: 'JAN', event: 'Disbursement Day', sub: 'Salary Credits', urgent: false },
                                { day: '05', month: 'FEB', event: 'TDS Filing', sub: 'Govt. Compliance', urgent: false },
                            ].map((date, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                                    <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border-2 ${date.urgent ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-100 text-slate-600'} group-hover:scale-110 transition-transform`}>
                                        <span className="text-[10px] font-bold uppercase">{date.month}</span>
                                        <span className="text-xl font-black">{date.day}</span>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-slate-900 leading-tight">{date.event}</h5>
                                        <p className="text-xs text-slate-500 mt-1">{date.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-full max-h-[400px] overflow-y-auto custom-scrollbar">
                        <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Clock size={18} className="text-slate-400" /> Recent Activity
                        </h4>

                        <div className="space-y-6 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-100"></div>

                            {[
                                { user: 'System', action: 'Auto-synced attendance data', time: '2 hrs ago', icon: CheckCircle2, color: 'emerald' },
                                { user: 'Sarah Jones', action: 'Submitted tax proofs for 80C', time: '4 hrs ago', icon: FileBarChart, color: 'blue' },
                                { user: 'Mike Chen', action: 'Requested travel reimbursement', time: '5 hrs ago', icon: DollarSign, color: 'amber' },
                                { user: 'Admin', action: 'Updated tax regime for 5 empl...', time: 'Yesterday', icon: Settings, color: 'purple' },
                            ].map((act, idx) => (
                                <div key={idx} className="flex items-start gap-4 relative z-10">
                                    <div className={`w-10 h-10 rounded-full bg-white border-4 border-${act.color}-50 flex items-center justify-center shrink-0`}>
                                        <div className={`w-2.5 h-2.5 rounded-full bg-${act.color}-500`}></div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600 leading-snug">
                                            <span className="font-bold text-slate-900">{act.user}</span> {act.action}
                                        </p>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{act.time}</span>
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
