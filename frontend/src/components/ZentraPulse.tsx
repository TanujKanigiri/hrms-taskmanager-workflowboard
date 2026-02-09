"use client";
import React, { useState, useEffect } from 'react';
import { Activity, Heart, Shield, Zap, AlertTriangle, Coffee, TrendingDown, Bell, CheckCircle2 } from "lucide-react";
import Image from 'next/image';

const ZentraPulse = () => {
    const [riskLevel, setRiskLevel] = useState(35);
    const [activeAlert, setActiveAlert] = useState(0);

    // Simulate live data pulsing
    useEffect(() => {
        const interval = setInterval(() => {
            setRiskLevel(prev => {
                const change = Math.random() * 10 - 5;
                const newVal = prev + change;
                return Math.min(Math.max(newVal, 20), 80);
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Rotate alerts
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveAlert(prev => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const alerts = [
        {
            employee: "Sarah Jenkins",
            role: "Senior Dev",
            risk: "High",
            reason: "No leave in 180 days + Weekend logins",
            action: "Suggesting 'Recharge Friday'",
            color: "text-red-500",
            bg: "bg-red-500/10",
            border: "border-red-500/20"
        },
        {
            employee: "David Chen",
            role: "Product Owner",
            risk: "Moderate",
            reason: "Consecutive late meetings",
            action: "Schedule wellness check-in",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        },
        {
            employee: "Jessica Wu",
            role: "Designer",
            risk: "Low",
            reason: "Stable leave pattern",
            action: "Reward: Wellness Points",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        }
    ];

    return (
        <section id="zentra-pulse" className="py-24 bg-[#050505] relative overflow-hidden text-white">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-900/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* Left: Content */}
                    <div className="flex-1 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/30 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                            <Shield size={12} />
                            <span>Exclusive Feature</span>
                        </div>

                        <h2 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-rose-400 tracking-tighter leading-none">
                            Zentra<span className="text-rose-600">Pulse</span>
                        </h2>

                        <h3 className="text-2xl font-medium text-slate-300">
                            The World's First <span className="text-white font-bold border-b-2 border-rose-500">Burnout Shield</span>
                        </h3>

                        <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                            Traditional HRMS reports what happened <i>yesterday</i>. ZentraPulse predicts what will happen <i>tomorrow</i>.
                            <br /><br />
                            Our AI Sentinel monitors over 50+ subtle signals—from leave gaps to login patterns—to predict burnout risk and automatically intervene suggesting wellness breaks before you lose your top talent.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="p-3 rounded-lg bg-rose-500/20 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Predictive Sentiment Analysis</h4>
                                    <p className="text-sm text-slate-400">Detects stress before it becomes burnout.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                    <Coffee size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Automated "Recharge" Prescriptions</h4>
                                    <p className="text-sm text-slate-400">Suggests mandatory leave days based on fatigue algorithms.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: UI Visualization */}
                    <div className="flex-1 w-full relative">
                        {/* Main Card */}
                        <div className="relative z-10 bg-[#0f1014] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h4 className="text-lg font-bold text-white">Org Health Pulse</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Real-time AI Monitoring</p>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
                                    <Activity size={12} className="animate-pulse" />
                                    Active Scanning
                                </div>
                            </div>

                            {/* Circular Risk Meter (CSS only representation) */}
                            <div className="flex justify-center mb-8 relative">
                                <div className="w-48 h-48 rounded-full border-[12px] border-slate-800 flex items-center justify-center relative">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="86"
                                            stroke="currentColor"
                                            strokeWidth="12"
                                            fill="transparent"
                                            className="text-rose-600 transition-all duration-1000 ease-out"
                                            strokeDasharray={540}
                                            strokeDashoffset={540 - (540 * riskLevel) / 100}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="text-center">
                                        <div className="text-4xl font-black text-white">{Math.round(riskLevel)}%</div>
                                        <div className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-1">Burnout<br />Risk</div>
                                    </div>
                                </div>

                                {/* Floating Particles */}
                                <div className="absolute top-0 right-10 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                                <div className="absolute bottom-10 left-4 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-700"></div>
                            </div>

                            {/* Alerts Feed */}
                            <div className="space-y-4">
                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Live Interventions</h5>

                                <div className="relative h-[80px]">
                                    {alerts.map((alert, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-all duration-500 transform ${index === activeAlert
                                                ? 'opacity-100 translate-y-0 scale-100'
                                                : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                                                }`}
                                        >
                                            <div className={`p-4 rounded-xl border ${alert.border} ${alert.bg} flex items-center gap-4`}>
                                                <div className={`p-2 rounded-full bg-black/20 ${alert.color}`}>
                                                    <AlertTriangle size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h6 className="font-bold text-white text-sm">{alert.employee}</h6>
                                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-black/20 ${alert.color}`}>{alert.risk} Risk</span>
                                                    </div>
                                                    <p className="text-xs text-slate-300 mt-0.5">{alert.reason}</p>
                                                    <p className="text-xs font-bold text-white mt-1 flex items-center gap-1">
                                                        <Zap size={10} className={alert.color} /> AI Action: {alert.action}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setRiskLevel(Math.floor(Math.random() * 40) + 40);
                                    setActiveAlert((prev) => (prev + 1) % 3);
                                }}
                                className="w-full mt-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <Activity size={14} /> Run Live Diagnostics
                            </button>
                        </div>

                        {/* Decorative Back Layers */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-rose-600 to-indigo-600 rounded-[2.5rem] blur opacity-30 -z-10 animate-pulse-slow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ZentraPulse;
