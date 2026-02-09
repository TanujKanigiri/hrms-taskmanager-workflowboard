'use client';

import React, { useState, useEffect } from 'react';
import {
    Globe,
    Sun,
    Moon,
    Clock,
    MapPin,
    DollarSign,
    Users,
    Zap,
    Maximize,
    Wifi
} from 'lucide-react';

export default function HorizonPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [sliderValue, setSliderValue] = useState(12);

    // Mock Regions
    const regions = [
        { id: 'na', name: 'North America', active: 145, asleep: 12, cost: 'High', awake: true, x: 25, y: 35 },
        { id: 'eu', name: 'Europe', active: 89, asleep: 45, cost: 'Med', awake: true, x: 52, y: 30 },
        { id: 'asia', name: 'Asia Pacific', active: 24, asleep: 150, cost: 'Low', awake: false, x: 75, y: 40 },
        { id: 'sa', name: 'South America', active: 30, asleep: 5, cost: 'Med', awake: true, x: 32, y: 65 },
    ];

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const getUtcOffsetTime = (offset: number) => {
        const d = new Date(currentTime.getTime() + (sliderValue - 12) * 3600 * 1000);
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-[#080c14] text-slate-200 p-8 font-sans overflow-hidden relative selection:bg-amber-500/30">

            {/* Starfield Background */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#080c14] to-black"></div>
            <div className="fixed inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

            {/* Header */}
            <div className="relative z-10 flex items-end justify-between mb-10 border-b border-white/10 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                            <Globe className="text-white animate-spin-slow" size={24} />
                        </div>
                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-400 to-orange-500 tracking-tight">
                            Horizon<span className="text-white">.KV</span>
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg font-light">
                        Global Workforce Orchestration. Real-time distributed team management.
                    </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <div className="text-3xl font-mono font-bold text-white">
                        {currentTime.toLocaleTimeString()} <span className="text-xs text-slate-500 align-top">LOCAL</span>
                    </div>
                    <div className="text-xs text-amber-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <Wifi size={12} className="animate-pulse" /> Systems Nominal
                    </div>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-12 gap-8 h-[calc(100vh-200px)]">

                {/* 1. THE MAP (Centerpiece) */}
                <div className="col-span-8 bg-slate-900/30 border border-white/5 rounded-3xl relative overflow-hidden group shadow-2xl backdrop-blur-sm">

                    {/* World Map SVG Representation (Abstract Dotted) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/World_map_blank_black.svg" alt="World Map" className="w-[90%] h-auto opacity-30 invert" />
                    </div>

                    {/* Day/Night Line (Simulated Overlay) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 mix-blend-multiply pointer-events-none transition-transform duration-1000" style={{ transform: `translateX(${(sliderValue - 12) * 5}%)` }}></div>

                    {/* Regional Pins */}
                    {regions.map((region) => (
                        <button
                            key={region.id}
                            onClick={() => setSelectedRegion(region.id)}
                            className={`
                                absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group/pin
                                ${selectedRegion === region.id ? 'z-50 scale-125' : 'z-20 hover:scale-110'}
                            `}
                            style={{ left: `${region.x}%`, top: `${region.y}%` }}
                        >
                            {/* Pin Head */}
                            <div className={`
                                w-4 h-4 rounded-full border-2 border-white shadow-[0_0_20px_currentColor]
                                flex items-center justify-center
                                ${region.awake ? 'bg-amber-500 text-amber-500' : 'bg-slate-700 text-slate-500'}
                            `}>
                                {/* Pulse Ring */}
                                {region.awake && <div className="absolute inset-0 rounded-full border border-amber-500 animate-ping-slow"></div>}
                            </div>

                            {/* Info Card (Hover/Select) */}
                            <div className={`
                                absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-slate-900/90 border border-white/20 p-3 rounded-lg backdrop-blur-md text-left transition-all duration-300
                                ${selectedRegion === region.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:translate-y-0'}
                            `}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-white text-xs">{region.name}</span>
                                    <span className={`text-[10px] px-1.5 rounded ${region.awake ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' : 'bg-slate-700 text-slate-400'}`}>
                                        {region.awake ? 'ACTIVE' : 'OFFLINE'}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] text-slate-400">
                                        <span>Local Time</span>
                                        <span className="text-white font-mono">{getUtcOffsetTime(region.id === 'na' ? -5 : region.id === 'eu' ? 1 : region.id === 'asia' ? 9 : -3)}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-400">
                                        <span>Workforce</span>
                                        <span className="text-white font-mono">{region.active + region.asleep}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}

                    {/* Time Slider Control */}
                    <div className="absolute bottom-6 left-8 right-8 bg-slate-950/80 p-4 rounded-2xl border border-white/10 backdrop-blur-lg flex items-center gap-6">
                        <div className="flex items-center gap-2 text-amber-400">
                            <Sun size={20} />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="24"
                            value={sliderValue}
                            onChange={(e) => setSliderValue(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                        <div className="flex items-center gap-2 text-slate-500">
                            <Moon size={20} />
                        </div>
                    </div>
                </div>

                {/* 2. STATS & UTILITIES */}
                <div className="col-span-4 space-y-6">

                    {/* A. Golden Window Calculator */}
                    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Clock size={16} className="text-amber-400" /> Golden Overlap
                            </h3>
                            <span className="text-xs text-slate-500">BEST MEETING TIME</span>
                        </div>

                        <div className="flex items-center justify-center py-6">
                            <div className="text-center">
                                <div className="text-4xl font-black text-white tracking-widest mb-1">
                                    {(14 + (sliderValue - 12)).toString().padStart(2, '0')}:00
                                </div>
                                <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 inline-block">
                                    Optimal • 85% Availability
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mt-2">
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>New York</span>
                                <span className="text-emerald-400">09:00 AM</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>London</span>
                                <span className="text-emerald-400">02:00 PM</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Mumbai</span>
                                <span className="text-orange-400">06:30 PM (End of Day)</span>
                            </div>
                        </div>
                    </div>

                    {/* B. Cost Heatmap */}
                    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <DollarSign size={16} className="text-emerald-400" /> Payroll Velocity
                            </h3>
                            <button className="p-1 hover:bg-white/5 rounded"><Maximize size={14} className="text-slate-500" /></button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-amber-500 border-r-amber-500 rotate-45 flex items-center justify-center bg-slate-900">
                                    <span className="text-[10px] font-bold text-white -rotate-45">$42k</span>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-300">Current Hourly Burn</div>
                                    <div className="text-xs text-slate-500">+12% vs avg due to OT</div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-800"></div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                                    <div className="text-[10px] text-slate-400 uppercase">Top cost center</div>
                                    <div className="font-bold text-white">Engineering</div>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                                    <div className="text-[10px] text-slate-400 uppercase">Most Active</div>
                                    <div className="font-bold text-white">Europe</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* C. Action */}
                    <button className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2">
                        <Zap size={18} fill="currentColor" /> Initiate Global Standup
                    </button>

                </div>

            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
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
