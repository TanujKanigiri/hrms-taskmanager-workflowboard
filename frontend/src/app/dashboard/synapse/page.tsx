'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Network,
    Share2,
    Search,
    Zap,
    Users,
    Info,
    Layers,
    Activity,
    GitCommit,
    Globe
} from 'lucide-react';

export default function SynapsePage() {
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'communication' | 'trust' | 'influence'>('communication');
    const containerRef = useRef<HTMLDivElement>(null);

    // Mock Data for the Graph
    const nodes = [
        { id: 1, name: "CEO", role: "Executive", value: 20, group: 1, x: 50, y: 50 },
        { id: 2, name: "CTO", role: "Tech Lead", value: 15, group: 2, x: 30, y: 40 },
        { id: 3, name: "CPO", role: "Product", value: 15, group: 3, x: 70, y: 40 },
        { id: 4, name: "Eng Lead", role: "Engineering", value: 10, group: 2, x: 20, y: 60 },
        { id: 5, name: "Sarah J.", role: "Senior Dev", value: 8, group: 2, x: 35, y: 65 },
        { id: 6, name: "Mike R.", role: "Product Mgr", value: 8, group: 3, x: 65, y: 60 },
        { id: 7, name: "Design Lead", role: "Design", value: 10, group: 3, x: 80, y: 55 },
        { id: 8, name: "HR Dir", role: "HR", value: 12, group: 4, x: 50, y: 20 },
        { id: 9, name: "Sales VP", role: "Sales", value: 15, group: 5, x: 90, y: 50 },
        { id: 10, name: "DevOps", role: "Infra", value: 7, group: 2, x: 15, y: 70 },
        { id: 11, name: "QA Lead", role: "Quality", value: 7, group: 2, x: 25, y: 75 },
    ];

    const links = [
        { source: 1, target: 2, strength: 0.9 },
        { source: 1, target: 3, strength: 0.9 },
        { source: 1, target: 8, strength: 0.5 },
        { source: 1, target: 9, strength: 0.7 },
        { source: 2, target: 4, strength: 0.8 },
        { source: 4, target: 5, strength: 0.9 },
        { source: 4, target: 10, strength: 0.6 },
        { source: 4, target: 11, strength: 0.6 },
        { source: 3, target: 6, strength: 0.8 },
        { source: 3, target: 7, strength: 0.7 },
        { source: 5, target: 6, strength: 0.4 }, // Cross-department
        { source: 6, target: 9, strength: 0.5 },
        { source: 2, target: 10, strength: 0.7 },
    ];

    // Simple auto-layout simulation would go here, 
    // for now we use static percentage coordinates for the 'visual' demo.

    return (
        <div className="min-h-screen bg-[#050b14] text-slate-200 p-6 font-sans overflow-hidden relative selection:bg-cyan-500/30">

            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,#0f172a_0%,#020617_100%)] pointer-events-none"></div>
            <div className="fixed inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

            {/* Header */}
            <div className="relative z-20 flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                        <Network className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight leading-none">
                            Synapse<span className="text-cyan-400">.ONA</span>
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">Organizational Network Analysis & Hidden Hierarchy</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {['communication', 'trust', 'influence'].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setViewMode(mode as any)}
                            className={`
                                px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all
                                ${viewMode === mode
                                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                                    : 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-600'}
                            `}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="relative z-10 grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">

                {/* 1. VISUALIZER CANVAS (The "Wow" Factor) */}
                <div className="col-span-9 bg-slate-900/40 border border-slate-800 rounded-3xl relative overflow-hidden group shadow-2xl" ref={containerRef}>

                    {/* Interactive Legend */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 pointer-events-none">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span> Tech
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span> Product
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span> exec
                        </div>
                    </div>

                    {/* Simulation Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full transform scale-90 group-hover:scale-100 transition-transform duration-700 ease-out">

                            {/* Render Lines (Edges) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                {links.map((link, i) => {
                                    const source = nodes.find(n => n.id === link.source)!;
                                    const target = nodes.find(n => n.id === link.target)!;
                                    return (
                                        <line
                                            key={i}
                                            x1={`${source.x}%`}
                                            y1={`${source.y}%`}
                                            x2={`${target.x}%`}
                                            y2={`${target.y}%`}
                                            stroke="url(#gradient)"
                                            strokeWidth={viewMode === 'communication' ? link.strength * 2 : 1}
                                            strokeOpacity="0.2"
                                            className="transition-all duration-1000"
                                        />
                                    );
                                })}
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#22d3ee" />
                                        <stop offset="100%" stopColor="#6366f1" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Render Nodes */}
                            {nodes.map((node) => (
                                <div
                                    key={node.id}
                                    onClick={() => setSelectedNode(node)}
                                    className={`
                                        absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500
                                        flex flex-col items-center justify-center
                                        ${selectedNode?.id === node.id ? 'z-50 scale-125' : 'z-20 hover:scale-110 hover:z-40'}
                                    `}
                                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                >
                                    {/* The Node Dot */}
                                    <div className={`
                                        rounded-full border-2 border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]
                                        flex items-center justify-center backdrop-blur-md transition-colors duration-500
                                        ${node.group === 1 ? 'bg-emerald-600/80 shadow-emerald-500/30' :
                                            node.group === 2 ? 'bg-blue-600/80 shadow-blue-500/30' :
                                                node.group === 3 ? 'bg-purple-600/80 shadow-purple-500/30' : 'bg-slate-600/80'}
                                    `}
                                        style={{
                                            width: `${node.value * 4}px`,
                                            height: `${node.value * 4}px`
                                        }}
                                    >
                                        <span className="text-[10px] font-bold text-white opacity-0 hover:opacity-100 transition-opacity">
                                            {node.value}%
                                        </span>
                                    </div>

                                    {/* Label */}
                                    <div className={`
                                        mt-2 px-2 py-0.5 rounded-full bg-black/50 border border-white/10 text-[10px] text-slate-300 font-mono whitespace-nowrap backdrop-blur-sm
                                        ${selectedNode?.id === node.id ? 'bg-cyan-900/80 border-cyan-500 text-cyan-200' : ''}
                                    `}>
                                        {node.name}
                                    </div>

                                    {/* Ripple Effect for selected */}
                                    {selectedNode?.id === node.id && (
                                        <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping-slow pointer-events-none"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-6 right-6 text-right">
                        <h3 className="text-4xl font-black text-white/5">NETWORK</h3>
                        <div className="text-xs text-slate-500 font-mono">LIVE DATA FEED • 120ms LATENCY</div>
                    </div>
                </div>

                {/* 2. SIDEBAR DETAILS */}
                <div className="col-span-3 space-y-6">

                    {/* A. Selected Node Inspector */}
                    <div className={`
                        bg-slate-900/60 border border-slate-700 rounded-3xl p-6 transition-all duration-500
                        ${selectedNode ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-50 blur-sm pointer-events-none'}
                    `}>
                        {selectedNode ? (
                            <>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xl font-bold text-slate-400">
                                        {selectedNode.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white leading-tight">{selectedNode.name}</h2>
                                        <p className="text-sm text-cyan-400 font-medium">{selectedNode.role}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                                            <span>Centrality Score</span>
                                            <span className="text-white font-mono">98/100</span>
                                        </div>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[98%] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                                            <span>Brokerage Potential</span>
                                            <span className="text-white font-mono">Top 5%</span>
                                        </div>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[85%] bg-gradient-to-r from-purple-500 to-pink-500"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-700/50">
                                    <h3 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">AI Insight</h3>
                                    <p className="text-sm text-slate-300 leading-relaxed indent-2">
                                        "<span className="text-white font-bold">{selectedNode.name}</span> is a key <span className="text-cyan-400">information broker</span> connecting Product and Engineering. Loss of this node would increase communication latency by <span className="text-red-400">40%</span>."
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="h-[300px] flex flex-col items-center justify-center text-center text-slate-500">
                                <Search size={32} className="mb-4 opacity-50" />
                                <p className="text-sm">Select a node to analyze network impact.</p>
                            </div>
                        )}
                    </div>

                    {/* B. General Stats */}
                    <div className="bg-slate-900/60 border border-slate-700 rounded-3xl p-6">
                        <h3 className="font-bold text-white flex items-center gap-2 mb-4">
                            <Activity size={18} className="text-cyan-400" /> Network Health
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                <div className="text-xs text-slate-500 mb-1">Density</div>
                                <div className="text-xl font-bold text-white">0.42</div>
                            </div>
                            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                                <div className="text-xs text-slate-500 mb-1">Silos</div>
                                <div className="text-xl font-bold text-red-400">2</div>
                            </div>
                        </div>
                        <button className="w-full mt-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2">
                            <Globe size={16} /> Export ONA Report
                        </button>
                    </div>

                </div>

            </div>

            <style jsx>{`
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
