'use client';

import React from 'react';
import Link from 'next/link';
import {
    FileBarChart,
    PieChart,
    TrendingUp,
    Users,
    Download,
    ArrowUpRight,
    Calendar,
    Activity,
    ShieldAlert,
    FileText,
    Zap,
    ArrowRight
} from 'lucide-react';

export default function ReportsLandingPage() {

    const quickStats = [
        { label: 'Total Headcount', value: '482', change: '+12%', trend: 'up', icon: Users, color: 'text-blue-600 bg-blue-50' },
        { label: 'Monthly Payroll', value: '$1.2M', change: '+2.4%', trend: 'up', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
        { label: 'Leave Utilization', value: '8.5%', change: '-1.2%', trend: 'down', icon: Calendar, color: 'text-amber-600 bg-amber-50' },
    ];

    const generatedReports = [
        { name: 'October 2026 Payroll Summary', date: 'Oct 31, 2026', type: 'Financial', size: '2.4 MB' },
        { name: 'Q3 Talent Acquisition Report', date: 'Oct 15, 2026', type: 'Recruitment', size: '1.8 MB' },
        { name: 'Annual Performance Bell Curve', date: 'Sep 30, 2026', type: 'Performance', size: '4.2 MB' },
    ];

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Hero Section */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4">
                            <Activity size={14} className="animate-pulse" /> Live Intelligence
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Insights</span></h1>
                        <p className="text-slate-400 text-lg font-medium max-w-xl">Real-time data visualization and automated compliance reporting for the modern enterprise.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl font-bold hover:bg-white/20 transition-all">
                            <Download size={20} /> Export All
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg shadow-white/10">
                            <Zap size={20} /> Generate Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickStats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-4xl font-black text-slate-900 mb-1">{stat.value}</h3>
                        <p className="text-slate-500 font-bold text-sm tracking-wide uppercase">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Navigation Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Advanced Analytics Link */}
                <Link href="/dashboard/reports/analytics" className="group relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-10 text-white overflow-hidden shadow-xl hover:scale-[1.01] transition-transform duration-300">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                        <PieChart size={180} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                                <TrendingUp size={32} className="text-white" />
                            </div>
                            <h2 className="text-3xl font-black mb-2">Deep Analytics</h2>
                            <p className="text-indigo-100 font-medium text-lg max-w-sm leading-relaxed">
                                Visualize trends in recruitment, attrition, performance, and financial outflows with interactive charts.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-8 font-bold text-white group-hover:gap-4 transition-all">
                            Explore Data <ArrowRight size={20} />
                        </div>
                    </div>
                </Link>

                {/* Audit Logs Link */}
                <Link href="/dashboard/reports/audit" className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 text-slate-50 opacity-50 group-hover:text-amber-50 group-hover:opacity-100 transition-colors">
                        <ShieldAlert size={180} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 text-3xl font-black">
                                <ShieldAlert size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Audit & Compliance</h2>
                            <p className="text-slate-500 font-medium text-lg max-w-sm leading-relaxed">
                                Monitor system activities, track data access logs, and ensure regulatory compliance with forensic trails.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 mt-8 font-bold text-slate-900 group-hover:gap-4 transition-all">
                            View Logs <ArrowRight size={20} />
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Reports Table */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">Recently Generated</h3>
                    <button className="text-slate-400 hover:text-slate-600 font-bold text-sm flex items-center gap-1">
                        View Archive <ArrowUpRight size={16} />
                    </button>
                </div>
                <div className="space-y-4">
                    {generatedReports.map((report, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 hover:shadow-md transition-all group cursor-pointer border border-transparent hover:border-indigo-100">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-colors">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{report.name}</h4>
                                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">{report.type} • {report.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                                <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-lg border border-slate-100">{report.size}</span>
                                <button className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg hover:shadow-sm border border-slate-200 hover:border-indigo-200 transition-all">
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
