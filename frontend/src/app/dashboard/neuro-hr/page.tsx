'use client';

import React, { useState, useEffect } from 'react';
import {
    Brain,
    Activity,
    Zap,
    Network,
    Fingerprint,
    Search,
    Cpu,
    Sparkles,
    AlertTriangle,
    TrendingUp,
    Users,
    MessageSquare,
    Lock
} from 'lucide-react';

export default function NeuroHRPage() {
    const [isScanning, setIsScanning] = useState(true);
    const [selectedNode, setSelectedNode] = useState<any>(null);

    // Mock scanning effect
    useEffect(() => {
        const timer = setTimeout(() => setIsScanning(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    const departments = [
        { name: 'Engineering', morale: 88, stress: 35, burnoutRisk: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
        { name: 'Product', morale: 72, stress: 65, burnoutRisk: 'Medium', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
        { name: 'Sales', morale: 45, stress: 92, burnoutRisk: 'Critical', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
        { name: 'Marketing', morale: 91, stress: 20, burnoutRisk: 'Low', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' },
    ];

    const alerts = [
        { id: 1, type: 'Burnout Warning', dept: 'Sales Team A', prob: '94%', msg: 'Consecutive overtime detected for 3 weeks.', icon: AlertTriangle, color: 'text-rose-500' },
        { id: 2, type: 'Sentiment Drop', dept: 'Product Design', prob: '68%', msg: 'Negative keyword spike in collaboration channels.', icon: TrendingUp, color: 'text-amber-500' },
        { id: 3, type: 'Flight Risk', dept: 'Senior Devs', prob: '45%', msg: 'Engagement with external job boards detected.', icon: Users, color: 'text-purple-500' },
    ];

    return (
        <div className="min-h-screen bg-[#0B1121] text-white p-8 overflow-hidden relative">

            {/* Background Neural Network Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-96 h-96 bg-violet-600/30 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/30 rounded-full blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-800/50 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-800/50 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-800/50 rounded-full"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-end border-b border-slate-800 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                                <Brain size={24} className="text-white" />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest">
                                Version 2.0 Alpha
                            </span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
                            NeuroHR <span className="font-light text-slate-500">Intelligence Core</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm font-medium text-slate-400">
                            <Activity size={16} className="text-emerald-500 animate-pulse" />
                            <span>System Active</span>
                        </div>
                        <button className="px-6 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Generate Report
                        </button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* 1. The Central Brain (Main Visualization) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Card */}
                        <div className="p-8 rounded-[2rem] bg-slate-900/50 border border-slate-800 backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                            <div className="flex justify-between items-start mb-8">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Network className="text-cyan-400" /> Organizational Synapse
                                </h3>
                                <div className="flex gap-2">
                                    {['Day', 'Week', 'Month'].map(t => (
                                        <button key={t} className="px-3 py-1 rounded-md text-xs font-bold bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* "Scanning" UI or Main Viz */}
                            <div className="relative h-64 w-full rounded-2xl bg-[#0F1629] border border-slate-800 flex items-center justify-center overflow-hidden">
                                {isScanning ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="relative w-24 h-24">
                                            <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full"></div>
                                            <div className="absolute inset-0 border-t-4 border-violet-500 rounded-full animate-spin"></div>
                                            <Brain className="absolute inset-0 m-auto text-violet-500 animate-pulse" size={40} />
                                        </div>
                                        <p className="text-violet-400 font-mono text-sm tracking-widest animate-pulse">ANALYZING WORKFORCE DATA...</p>
                                    </div>
                                ) : (
                                    <div className="w-full h-full p-6 grid grid-cols-2 gap-4">
                                        {/* Mock Graph Bars */}
                                        <div className="col-span-2 flex items-end justify-between gap-2 h-full pb-4 border-b border-slate-800">
                                            {[40, 65, 30, 85, 55, 90, 45, 70, 25, 60, 85, 95].map((h, i) => (
                                                <div key={i} className="w-full bg-slate-800 rounded-t-sm relative group/bar hover:bg-violet-500/20 transition-colors cursor-pointer">
                                                    <div
                                                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-violet-600 to-cyan-400 transition-all duration-1000 rounded-t-sm shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                                                        style={{ height: `${h}%` }}
                                                    ></div>
                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded text-[10px] font-bold border border-slate-700 whitespace-nowrap z-10">
                                                        Index: {h}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-4">
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Total Sentiment</p>
                                    <p className="text-2xl font-black text-white">84.2 <span className="text-emerald-400 text-sm font-bold">+2.4%</span></p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Burnout Risk</p>
                                    <p className="text-2xl font-black text-rose-500">12% <span className="text-rose-400 text-sm font-bold">High</span></p>
                                </div>
                                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                    <p className="text-slate-400 text-xs font-bold uppercase mb-1">Productivity</p>
                                    <p className="text-2xl font-black text-white">96% <span className="text-slate-500 text-sm font-bold">Stable</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Departmental Pulse */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {departments.map((dept, i) => (
                                <div key={i} className={`p-6 rounded-2xl border backdrop-blur-sm transition-all hover:scale-[1.02] cursor-pointer ${dept.bg} ${dept.border}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className={`font-black text-lg ${dept.color}`}>{dept.name}</h4>
                                        <Activity size={18} className={dept.color} />
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                                                <span>Morale</span>
                                                <span className="text-white">{dept.morale}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${dept.morale > 75 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${dept.morale}%` }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                                                <span>Stress Load</span>
                                                <span className="text-white">{dept.stress}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${dept.stress > 75 ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ width: `${dept.stress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Side Panel (Alerts & AI Insights) */}
                    <div className="space-y-6">
                        {/* AI Precognition */}
                        <div className="bg-gradient-to-b from-slate-900 to-[#0F1629] border border-slate-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/20 blur-[50px] pointer-events-none"></div>

                            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                                <Sparkles className="text-fuchsia-500" size={18} /> Future-Sight AI
                            </h3>

                            <div className="space-y-4">
                                {alerts.map((alert) => (
                                    <div key={alert.id} className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl relative group hover:bg-slate-800 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <alert.icon size={14} className={alert.color} />
                                                <span className={`text-xs font-black uppercase tracking-wider ${alert.color}`}>{alert.type}</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-500">{alert.prob} Prob.</span>
                                        </div>
                                        <h4 className="font-bold text-slate-200 text-sm mb-1">{alert.dept}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{alert.msg}</p>

                                        {/* Action Button (Hidden until hover) */}
                                        <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-3 transition-all duration-300">
                                            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-colors">
                                                View Mitigation Plan
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-fuchsia-900/40 flex items-center justify-center gap-2">
                                <Cpu size={18} /> Deep Scan Network
                            </button>
                        </div>

                        {/* Talent DNA Snippet */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 backdrop-blur-sm">
                            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                                <Fingerprint className="text-emerald-500" size={18} /> Talent DNA
                            </h3>
                            <div className="relative h-40 flex items-center justify-center border border-dashed border-slate-800 rounded-xl bg-slate-950/50">
                                <div className="text-center">
                                    <Lock className="mx-auto text-slate-600 mb-2" size={24} />
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Access Restricted</p>
                                    <p className="text-[10px] text-slate-600 mt-1">Upgrade to Enterprise Tier to view <br />Genetic Skill Mapping.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
