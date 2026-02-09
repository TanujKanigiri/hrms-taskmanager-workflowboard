'use client';

import React, { useState, useEffect } from 'react';
import {
    Zap,
    Brain,
    Clock,
    Coffee,
    Music,
    Moon,
    Sun,
    Activity,
    Shield,
    Smartphone,
    CloudRain,
    Play,
    Pause
} from 'lucide-react';

export default function FlowSyncPage() {
    const [isFlowActive, setIsFlowActive] = useState(false);
    const [flowTimer, setFlowTimer] = useState(0);
    const [energyLevel, setEnergyLevel] = useState(85);
    const [selectedAmbience, setSelectedAmbience] = useState<string | null>(null);

    // Mock "Live" Pulse effect
    useEffect(() => {
        const interval = setInterval(() => {
            setEnergyLevel(prev => {
                const change = Math.random() * 4 - 2;
                return Math.min(Math.max(prev + change, 60), 100);
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isFlowActive) {
            interval = setInterval(() => {
                setFlowTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isFlowActive]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8 font-sans overflow-hidden relative">

            {/* Background Ambience - Dynamic based on state */}
            <div className={`fixed inset-0 transition-opacity duration-1000 pointer-events-none ${isFlowActive ? 'opacity-30' : 'opacity-10'}`}>
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[100px] animate-blob"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-end justify-between mb-12 border-b border-slate-700/50 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg shadow-lg shadow-cyan-500/20">
                            <Activity className="text-white" size={24} />
                        </div>
                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">
                            FlowSync<span className="text-cyan-400">.ai</span>
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg font-light max-w-2xl">
                        Your neural performance optimizer. Align your work with your biological rhythm.
                    </p>
                </div>
                <div className="flex items-center gap-6 text-sm font-bold bg-slate-800/50 backdrop-blur border border-slate-700 rounded-full px-6 py-2">
                    <div className="flex items-center gap-2 text-emerald-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        Cognitive Load: Optimal
                    </div>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <div className="flex items-center gap-2 text-blue-400">
                        <Brain size={16} />
                        Focus Score: 92/100
                    </div>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-12 gap-8">

                {/* LEFT COL: Energy & Rhythm */}
                <div className="col-span-8 space-y-8">

                    {/* 1. Main Activation Hub */}
                    <div className="relative bg-slate-900/50 border border-slate-700/50 rounded-3xl p-8 overflow-hidden group hover:border-cyan-500/30 transition-all duration-500">
                        <div className="absolute inset-0 bg-grid-slate-800/[0.2] -z-10"></div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-white">Current State: <span className={isFlowActive ? "text-cyan-400 animate-pulse" : "text-slate-400"}>{isFlowActive ? "DEEP FOCUS LOCKED" : "DRIFTING"}</span></h2>
                                <p className="text-slate-400 max-w-md">
                                    {isFlowActive
                                        ? "Notifications blocked. Slack status updated. Ambient shielding active."
                                        : "Ready to synchronize? We detected a natural energy peak approaching in 15 minutes."}
                                </p>

                                <div className="flex items-center gap-4 mt-6">
                                    <button
                                        onClick={() => setIsFlowActive(!isFlowActive)}
                                        className={`
                                            relative px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all duration-300
                                            ${isFlowActive
                                                ? 'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                                                : 'bg-cyan-500 text-slate-900 hover:bg-cyan-400 hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.4)]'}
                                        `}
                                    >
                                        {isFlowActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                        {isFlowActive ? "Break Flow" : "Initiate Flow State"}
                                    </button>

                                    {isFlowActive && (
                                        <div className="text-4xl font-mono font-black text-cyan-400 tracking-widest animate-pulse">
                                            {formatTime(flowTimer)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dynamic "Orb" Visualizer */}
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                {/* Rings */}
                                <div className={`absolute inset-0 border-4 border-slate-700/30 rounded-full ${isFlowActive ? 'animate-spin-slow duration-[10s]' : ''}`}></div>
                                <div className={`absolute inset-4 border-2 border-slate-600/30 rounded-full ${isFlowActive ? 'animate-reverse-spin duration-[15s]' : ''}`}></div>
                                <div className={`absolute inset-12 border border-cyan-500/20 rounded-full ${isFlowActive ? 'animate-ping opacity-20' : ''}`}></div>

                                {/* Core */}
                                <div className={`
                                    w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_50px_rgba(6,182,212,0.5)] z-10
                                    transition-all duration-1000 flex items-center justify-center
                                    ${isFlowActive ? 'scale-110 shadow-[0_0_80px_rgba(6,182,212,0.8)]' : 'scale-100 animate-float'}
                                `}>
                                    <Zap className={`text-white transition-all duration-300 ${isFlowActive ? 'scale-125' : 'scale-100'}`} size={40} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Circadian Rhythm Chart */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-white flex items-center gap-2"><Clock size={18} className="text-purple-400" /> Circadian Energy Forecast</h3>
                                <span className="text-xs font-mono text-slate-500">REAL-TIME</span>
                            </div>

                            {/* CSS Only Chart */}
                            <div className="relative h-32 w-full flex items-end justify-between px-2 gap-1">
                                {[30, 45, 60, 75, 85, 95, 80, 65, 50, 40, 35, 45, 60, 70, 85, 90, 75, 60, 50, 40, 30, 25, 40, 55].map((h, i) => (
                                    <div key={i} className="relative w-full h-full flex items-end group">
                                        <div
                                            className={`
                                                w-full rounded-t-sm transition-all duration-500 group-hover:bg-cyan-400
                                                ${i === 14 || i === 15 ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-700/50'}
                                            `}
                                            style={{ height: `${h}%` }}
                                        ></div>
                                        {/* Hover Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap z-20 pointer-events-none">
                                            {i}:00 - {h}% Energy
                                        </div>
                                    </div>
                                ))}

                                {/* Current Time Marker (Mock at 15:00) */}
                                <div className="absolute left-[62%] top-0 bottom-0 w-px border-l-2 border-dashed border-white/30 pointer-events-none">
                                    <div className="absolute top-0 -translate-y-full -translate-x-1/2 text-[10px] text-white/50 mb-1">NOW</div>
                                </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                                <span>00:00</span>
                                <span>06:00</span>
                                <span>12:00</span>
                                <span>18:00</span>
                                <span>23:59</span>
                            </div>
                        </div>

                        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-white flex items-center gap-2"><Brain size={18} className="text-pink-400" /> Mental Resilience</h3>
                                <span className="text-xs font-mono text-emerald-400">HIGH</span>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1 text-slate-400">
                                        <span>Focus Stamina</span>
                                        <span>88%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full w-[88%] bg-gradient-to-r from-pink-500 to-purple-500"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1 text-slate-400">
                                        <span>Burnout Risk</span>
                                        <span className="text-emerald-400">Low (12%)</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full w-[12%] bg-gradient-to-r from-emerald-500 to-green-500"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1 text-slate-400">
                                        <span>Recovery Level</span>
                                        <span>95%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full w-[95%] bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COL: Controls */}
                <div className="col-span-4 space-y-6">

                    {/* Environment Tuner */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Music size={18} className="text-indigo-400" /> Sonic Shielding
                        </h3>
                        <div className="space-y-3">
                            {[
                                { id: 'rain', label: 'Rainy Cafe', icon: Coffee },
                                { id: 'white', label: 'White Noise', icon: CloudRain },
                                { id: 'night', label: 'Midnight Synths', icon: Moon },
                                { id: 'alpha', label: 'Alpha Waves', icon: Activity },
                            ].map((amb) => (
                                <button
                                    key={amb.id}
                                    onClick={() => setSelectedAmbience(selectedAmbience === amb.id ? null : amb.id)}
                                    className={`
                                        w-full p-3 rounded-lg flex items-center justify-between border transition-all
                                        ${selectedAmbience === amb.id
                                            ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                                            : 'bg-slate-900/50 border-slate-700/50 text-slate-400 hover:bg-slate-700/50'}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <amb.icon size={18} />
                                        <span className="text-sm font-medium">{amb.label}</span>
                                    </div>
                                    {selectedAmbience === amb.id && (
                                        <div className="flex gap-0.5 items-end h-4">
                                            <div className="w-1 bg-indigo-400 animate-music-bar-1 h-2"></div>
                                            <div className="w-1 bg-indigo-400 animate-music-bar-2 h-4"></div>
                                            <div className="w-1 bg-indigo-400 animate-music-bar-3 h-3"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hardcore Mode Switches */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Shield size={18} className="text-orange-400" /> Distraction Defense
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-2 bg-slate-900 rounded-lg"><Smartphone size={16} /></div>
                                    Digital Detox (Apps)
                                </div>
                                <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${isFlowActive ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isFlowActive ? 'translate-x-4' : ''}`}></div>
                                </div>
                            </div>
                            <div className="text-xs text-slate-500 pl-11">
                                Blocks social media and news sites during Flow.
                            </div>

                            <div className="h-px bg-slate-700/50"></div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="p-2 bg-slate-900 rounded-lg"><Moon size={16} /></div>
                                    Auto-Dark Mode
                                </div>
                                <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${isFlowActive ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${isFlowActive ? 'translate-x-4' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Vibe */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-20">
                            <Activity size={80} />
                        </div>
                        <h3 className="font-bold text-white mb-2">Team Pulse</h3>
                        <p className="text-xs text-slate-400 mb-4">Anonymized team energy levels</p>

                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-[10px] font-bold">
                                        U{i}
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs text-emerald-400 font-bold">+12 online</span>
                        </div>
                        <div className="text-sm text-slate-300">
                            Most of your team is in <span className="text-cyan-400 font-bold">Flow State</span>. Consider delaying non-urgent Slack messages.
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animate-pulse-slow {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-music-bar-1 { animation: musicBar 0.5s infinite alternate; }
                .animate-music-bar-2 { animation: musicBar 0.7s infinite alternate; }
                .animate-music-bar-3 { animation: musicBar 0.6s infinite alternate; }
                @keyframes musicBar {
                    0% { height: 4px; }
                    100% { height: 12px; }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow linear infinite;
                }
                @keyframes reverse-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-reverse-spin {
                    animation: reverse-spin linear infinite;
                }
            `}</style>
        </div>
    );
}
