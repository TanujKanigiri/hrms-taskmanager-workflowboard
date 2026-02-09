'use client';

import React, { useState, useEffect } from 'react';
import {
    ShieldAlert,
    Search,
    TrendingUp,
    Users,
    AlertTriangle,
    Brain,
    Target,
    Activity,
    Lock,
    Unlock,
    DollarSign,
    Briefcase,
    Zap,
    X,
    CheckCircle2
} from 'lucide-react';

export default function PulseGuardPage() {
    const [isScanning, setIsScanning] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [interventionMode, setInterventionMode] = useState(false);
    const [salarySim, setSalarySim] = useState(0);

    // Mock At-Risk Employees
    const atRiskEmployees = [
        { id: 1, name: "Sarah Jenkins", role: "Senior DeviOps", risk: 89, reason: "Compensation Gap", impact: "High", salary: 120000 },
        { id: 2, name: "Mike Chen", role: "Product Lead", risk: 72, reason: "Stagnation", impact: "Critical", salary: 145000 },
        { id: 3, name: "Emma Wilson", role: "UX Designer", risk: 65, reason: "Workload Burnout", impact: "Medium", salary: 95000 },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-8 font-sans overflow-hidden relative selection:bg-rose-500/30">

            {/* Grid Background */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(30,41,59,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            {/* Ambient Red Glow for urgency */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

            {/* Header */}
            <div className="relative z-10 flex cursor-default select-none items-end justify-between mb-12 border-b border-white/5 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-rose-500 to-orange-600 rounded-lg shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                            <ShieldAlert className="text-white animate-pulse" size={24} />
                        </div>
                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-slate-400 tracking-tight">
                            PulseGUARD<span className="text-rose-500">.ai</span>
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg font-light max-w-2xl">
                        Predictive Attrition Intelligence. Detect flight risks before they resign.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-slate-300">LIVE MONITORING</span>
                        </div>
                        <div className="h-4 w-px bg-slate-700"></div>
                        <div className="text-xs font-mono text-slate-500">
                            SCANNING 248 EMPLOYEES
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-12 gap-8">

                {/* LEFT: The Radar & List */}
                <div className="col-span-12 lg:col-span-7 space-y-6">

                    {/* 1. The Main Radar Scanner */}
                    <div className="relative h-[400px] bg-slate-900/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center group">

                        {/* Radar Grid */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                            <div className="w-[100px] h-[100px] border border-emerald-500/50 rounded-full"></div>
                            <div className="w-[300px] h-[300px] border border-emerald-500/30 rounded-full absolute"></div>
                            <div className="w-[500px] h-[500px] border border-emerald-500/20 rounded-full absolute"></div>
                            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.1)_360deg)] animate-spin-slow rounded-full opacity-50"></div>

                            {/* Crosshairs */}
                            <div className="absolute w-full h-px bg-emerald-500/20"></div>
                            <div className="absolute h-full w-px bg-emerald-500/20"></div>
                        </div>

                        {/* Employee Nodes */}
                        <div className="absolute w-full h-full">
                            {/* Safe Nodes */}
                            {[...Array(15)].map((_, i) => (
                                <div
                                    key={`safe-${i}`}
                                    className="absolute w-2 h-2 bg-emerald-500/50 rounded-full transition-all duration-1000"
                                    style={{
                                        top: `${Math.random() * 80 + 10}%`,
                                        left: `${Math.random() * 80 + 10}%`,
                                        animation: `pulse-node ${Math.random() * 2 + 1}s infinite`
                                    }}
                                ></div>
                            ))}

                            {/* Risk Nodes (Clickable) */}
                            {atRiskEmployees.map((emp, i) => (
                                <button
                                    key={emp.id}
                                    onClick={() => setSelectedEmployee(emp)}
                                    className={`
                                        absolute w-4 h-4 rounded-full border-2 
                                        flex items-center justify-center transition-all duration-300 z-20
                                        hover:scale-150 hover:shadow-[0_0_20px_rgba(244,63,94,0.8)]
                                        ${selectedEmployee?.id === emp.id ? 'bg-rose-500 border-white scale-125 shadow-[0_0_30px_rgba(244,63,94,1)]' : 'bg-rose-500 border-rose-900 animate-ping-slow'}
                                    `}
                                    style={{
                                        top: `${40 + i * 15}%`,
                                        left: `${30 + i * 20}%`
                                    }}
                                >
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-900/90 text-white text-[10px] px-2 py-0.5 rounded border border-rose-500/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        {emp.name}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="absolute bottom-4 left-6 text-xs text-emerald-500 font-mono">
                            SYSTEM STATUS: <span className="animate-blink">ACTIVE</span>
                        </div>
                    </div>

                    {/* 2. Detected Risks List */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {atRiskEmployees.map((emp) => (
                            <div
                                key={emp.id}
                                onClick={() => setSelectedEmployee(emp)}
                                className={`
                                    cursor-pointer p-4 rounded-xl border transition-all duration-300 relative overflow-hidden
                                    ${selectedEmployee?.id === emp.id
                                        ? 'bg-rose-500/10 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/50'
                                        : 'bg-slate-900/50 border-white/5 hover:border-white/10 hover:bg-white/5'}
                                `}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${emp.risk > 80 ? 'bg-rose-500' : 'bg-orange-500'}`}></div>
                                        <span className="text-sm font-bold text-white">{emp.name}</span>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500">{emp.impact} Impact</span>
                                </div>
                                <div className="text-xs text-slate-400 mb-3">{emp.role}</div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Flight Risk</span>
                                    <span className={`text-lg font-black ${emp.risk > 80 ? 'text-rose-500' : 'text-orange-400'}`}>
                                        {emp.risk}%
                                    </span>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                                    <div className={`h-full ${emp.risk > 80 ? 'bg-rose-500' : 'bg-orange-500'}`} style={{ width: `${emp.risk}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* RIGHT: Analysis & Intervention */}
                <div className="col-span-12 lg:col-span-5 relative">
                    {selectedEmployee ? (
                        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 h-full flex flex-col animate-slide-in-right relative overflow-hidden">

                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.1),transparent_50%)]"></div>

                            {/* Header */}
                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">{selectedEmployee.name}</h2>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                        <Briefcase size={14} /> {selectedEmployee.role}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedEmployee(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>

                            {/* AI Analysis */}
                            <div className="space-y-6 flex-1 relative z-10">
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                                    <h3 className="text-xs font-bold text-blue-400 mb-3 flex items-center gap-2">
                                        <Brain size={14} /> PULSE_AI DIAGNOSIS
                                    </h3>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        Semantic analysis of communication channels indicates a <span className="text-white font-bold">92% correlation</span> with resignation patterns. Key trigger identified as <span className="text-rose-400 font-bold">"{selectedEmployee.reason}"</span>.
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">Recent Sentiment: -45%</span>
                                        <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">Market Value: +15% vs Current</span>
                                    </div>
                                </div>

                                {/* Intervention Simulator */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-white flex items-center gap-2">
                                            <Target size={18} className="text-emerald-400" /> Retention Simulator
                                        </h3>
                                        <span className="text-xs text-slate-500">ADJUST TO SEE IMPACT</span>
                                    </div>

                                    <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700 space-y-6">

                                        {/* Salary Slider */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">Salary Adjustment</span>
                                                <span className="text-emerald-400 font-mono font-bold">+{salarySim}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="30"
                                                value={salarySim}
                                                onChange={(e) => setSalarySim(parseInt(e.target.value))}
                                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                            />
                                            <div className="flex justify-between text-[10px] text-slate-500">
                                                <span>Current: ${selectedEmployee.salary.toLocaleString()}</span>
                                                <span>Proj: ${Math.round(selectedEmployee.salary * (1 + salarySim / 100)).toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {/* Result */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                            <div className="text-sm text-slate-400">Projected Risk Drop</div>
                                            <div className="text-xl font-black text-emerald-400 flex items-center gap-1">
                                                <TrendingUp size={20} className="rotate-180" />
                                                {salarySim * 2.5}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-8 relative z-10">
                                <button className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl font-bold text-white shadow-lg shadow-emerald-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    <Zap size={18} fill="currentColor" /> Generate Retention Offer
                                </button>
                            </div>

                        </div>
                    ) : (
                        // Empty State
                        <div className="h-full border border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 p-8 text-center bg-slate-900/20">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <Search size={32} className="opacity-50" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-500 mb-2">Select a Risk Profile</h3>
                            <p className="max-w-xs text-sm">
                                Click on a detected anomaly in the radar or list to view PulseAI diagnosis and simulation tools.
                            </p>
                        </div>
                    )}
                </div>

            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                 @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 1s step-end infinite;
                }
                @keyframes slide-in-right {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                 @keyframes ping-slow {
                     75%, 100% { transform: scale(2); opacity: 0; }
                 }
                 .animate-ping-slow {
                     animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                 }
            `}</style>
        </div>
    );
}
