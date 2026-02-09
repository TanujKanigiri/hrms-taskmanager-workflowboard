'use client';

import React, { useState } from 'react';
import {
    Users,
    DollarSign,
    Briefcase,
    TrendingUp,
    BarChart2,
    PieChart,
    Activity,
    ArrowUp,
    ArrowDown,
    Filter,
    Calendar,
    Download
} from 'lucide-react';

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState<'financial' | 'people' | 'recruitment'>('financial');

    // --- Mock Chart Components (Visual CSS Representations) ---

    // 1. Simple Bar Chart Component
    const BarChart = ({ data, color }: { data: number[], color: string }) => (
        <div className="flex items-end justify-between h-40 w-full gap-2">
            {data.map((h, i) => (
                <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group overflow-hidden">
                    <div
                        className={`absolute bottom-0 left-0 right-0 ${color} transition-all duration-1000 ease-out rounded-t-lg group-hover:brightness-110`}
                        style={{ height: `${h}%` }}
                    ></div>
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Deep <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Analytics</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Predictive intelligence and historical trends.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm">
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all text-sm shadow-lg shadow-slate-900/20">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex p-1 bg-white rounded-2xl border border-slate-200 w-fit shadow-sm">
                {[
                    { id: 'financial', label: 'Financial', icon: DollarSign },
                    { id: 'people', label: 'People & Culture', icon: Users },
                    { id: 'recruitment', label: 'Recruitment', icon: Briefcase },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all
                            ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}
                        `}
                    >
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Featured Chart */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                {activeTab === 'financial' ? 'Payroll Cost Analysis' :
                                    activeTab === 'people' ? 'Attrition & Retention' :
                                        'Time to Hire Trend'}
                            </h3>
                            <p className="text-sm font-medium text-slate-400">Comparing current year vs last year performance.</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg">
                            <ArrowUp size={16} /> +12.5% Growth
                        </div>
                    </div>

                    {/* Mock Chart Area */}
                    <div className="h-64 w-full flex items-end gap-4 px-4 pt-8">
                        <BarChart
                            data={[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 85, 95]}
                            color={activeTab === 'financial' ? 'bg-emerald-500' : activeTab === 'people' ? 'bg-indigo-500' : 'bg-amber-500'}
                        />
                    </div>

                    {/* X-Axis Labels */}
                    <div className="flex justify-between mt-4 px-2 text-xs font-bold text-slate-400 uppercase">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                            <span key={m}>{m}</span>
                        ))}
                    </div>
                </div>

                {/* KPI Sidebar */}
                <div className="space-y-6">
                    {/* Insight Card 1 */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-8 text-white shadow-lg relative overflow-hidden">
                        <Activity className="absolute bottom-[-20px] right-[-20px] text-white opacity-10" size={120} />
                        <h4 className="opacity-80 font-bold text-sm tracking-wider uppercase mb-1">Projected Forecast</h4>
                        <div className="text-4xl font-black mb-4">$142k</div>
                        <p className="font-medium text-indigo-100 text-sm leading-relaxed relative z-10">
                            Based on current hiring velocity, payroll costs are expected to increase by 8% in Q4 using our predictive models.
                        </p>
                    </div>

                    {/* Stat Breakdown */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-6">Key Metrics</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Avg Salary', val: '$92,000', change: '+2%', color: 'from-blue-500 to-cyan-500' },
                                { label: 'Bonus Payout', val: '$12,500', change: '-5%', color: 'from-amber-500 to-orange-500' },
                                { label: 'Overtime', val: '430 hrs', change: '+15%', color: 'from-rose-500 to-pink-500' },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-md`}>
                                            <TrendingUp size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p>
                                            <p className="text-lg font-black text-slate-900">{stat.val}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Secondary Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Department Distribution */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Cost by Department</h3>
                        <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900"><Filter size={16} /></button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Engineering', val: 45, color: 'bg-indigo-500' },
                            { name: 'Sales', val: 25, color: 'bg-emerald-500' },
                            { name: 'Marketing', val: 15, color: 'bg-amber-500' },
                            { name: 'HR & Admin', val: 15, color: 'bg-slate-400' },
                        ].map((dept, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm font-bold text-slate-700 mb-1">
                                    <span>{dept.name}</span>
                                    <span>{dept.val}%</span>
                                </div>
                                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${dept.color}`} style={{ width: `${dept.val}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Geography / Locations */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Headcount by Location</h3>
                        <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900"><Filter size={16} /></button>
                    </div>
                    <div className="flex items-center justify-center py-6">
                        {/* CSS Doughnut Chart representation */}
                        <div className="relative w-40 h-40 rounded-full border-[16px] border-slate-100 flex items-center justify-center">
                            <div className="absolute inset-0 border-[16px] border-indigo-500 rounded-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 50% 50%)' }}></div>
                            <div className="absolute inset-0 border-[16px] border-emerald-500 rounded-full rotate-180" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}></div>
                            <div className="text-center">
                                <span className="text-3xl font-black text-slate-800">482</span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Global</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><div className="w-3 h-3 rounded-full bg-indigo-500"></div> New York (45%)</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> London (25%)</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500"><div className="w-3 h-3 rounded-full bg-slate-200"></div> Others (30%)</div>
                    </div>
                </div>
            </div>

        </div>
    );
}
