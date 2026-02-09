'use client';

import React, { useState, useEffect } from 'react';
import {
    Activity,
    Users,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Heart,
    Zap,
    AlertTriangle,
    RefreshCcw,
    Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrgHealthSimulator() {
    // Simulation Parameters
    const [salaryHike, setSalaryHike] = useState(0);
    const [layoffPercent, setLayoffPercent] = useState(0);
    const [remoteDays, setRemoteDays] = useState(0);
    const [trainingBudget, setTrainingBudget] = useState(0);
    const [promotionRate, setPromotionRate] = useState(0);

    // Calculated Metrics
    const [stats, setStats] = useState({
        attrition: 12, // Baseline %
        productivity: 85, // Baseline score
        culture: 78, // Baseline score
        cost: 100 // Baseline index
    });

    const [isSimulating, setIsSimulating] = useState(false);
    const [headlines, setHeadlines] = useState<any[]>([]);

    // Simulation Logic (The "Engine")
    useEffect(() => {
        setIsSimulating(true);
        const timer = setTimeout(() => {
            let newAttrition = 12;
            let newProductivity = 85;
            let newCulture = 78;
            let newCost = 100;

            // 1. Salary Hike Impact
            newAttrition -= (salaryHike * 0.5);
            newCulture += (salaryHike * 0.3);
            newCost += salaryHike;

            // 2. Layoffs Impact
            if (layoffPercent > 0) {
                newCulture -= (layoffPercent * 1.5);
                newAttrition += (layoffPercent * 0.8);
                newProductivity -= (layoffPercent * 0.5); // Panic factor
                newCost -= (layoffPercent * 0.8); // Savings
            }

            // 3. Remote Work Impact
            newAttrition -= (remoteDays * 1.5);
            newCulture += (remoteDays * 0.5);
            if (remoteDays > 4) newProductivity -= 2; // Isolation penalty
            else newProductivity += (remoteDays * 1); // Focus bonus

            // 4. Training Budget
            const trainingFactor = trainingBudget / 1000;
            newProductivity += (trainingFactor * 2);
            newCulture += (trainingFactor * 1);
            newCost += (trainingFactor * 0.5);

            // 5. Promotion Rate
            newAttrition -= (promotionRate * 0.4);
            newCulture += (promotionRate * 0.4);
            newCost += (promotionRate * 0.6);

            // Clamping
            setStats({
                attrition: Math.max(0, Math.min(100, newAttrition)),
                productivity: Math.max(0, Math.min(100, newProductivity)),
                culture: Math.max(0, Math.min(100, newCulture)),
                cost: Math.max(0, newCost)
            });

            // Headlines Generation
            const news = [];
            if (layoffPercent > 10) news.push({ type: 'bad', text: "Internal survey reveals spiking anxiety levels." });
            if (layoffPercent > 30) news.push({ type: 'bad', text: "Key senior talent departing effectively immediately." });

            if (salaryHike > 15) news.push({ type: 'good', text: "Recruitment applications surge by 200%." });
            if (salaryHike > 5 && salaryHike <= 15) news.push({ type: 'good', text: "Employee satisfaction scores trending up." });
            if (salaryHike === 0 && stats.cost > 120) news.push({ type: 'neutral', text: "CFO flags rising operational overheads." });

            if (remoteDays >= 3) news.push({ type: 'good', text: "Carbon footprint reduced significantly. PR win!" });
            if (remoteDays === 5) news.push({ type: 'neutral', text: "Middle management reports 'visibility' concerns." });
            if (remoteDays === 0) news.push({ type: 'bad', text: "Gen-Z candidates rejecting offers due to rigidity." });

            if (trainingBudget > 2000) news.push({ type: 'good', text: "Innovation lab outputs 3 new patents this quarter." });

            if (promotionRate > 10) news.push({ type: 'good', text: "Glassdoor rating improves to 4.8 stars." });
            if (promotionRate < 2) news.push({ type: 'bad', text: "Stagnation complaints dominating town hall Q&A." });

            // Ensure we have at least simulated news
            if (news.length === 0) news.push({ type: 'neutral', text: "Market analysts watching next quarterly report closely." });

            setHeadlines(news.slice(0, 4));

            setIsSimulating(false);
        }, 600); // Debounce simulation feel

        return () => clearTimeout(timer);
    }, [salaryHike, layoffPercent, remoteDays, trainingBudget, promotionRate]);

    return (
        <div className="h-full flex flex-col gap-6 text-slate-200 p-2">

            {/* Top Stats Row */}
            <div className="grid grid-cols-4 gap-4">
                <MetricCard
                    label="Attrition Risk"
                    value={stats.attrition}
                    unit="%"
                    icon={Users}
                    color="rose"
                    inverse={true}
                    delta={stats.attrition - 12}
                />
                <MetricCard
                    label="Productivity"
                    value={stats.productivity}
                    unit="pts"
                    icon={Zap}
                    color="amber"
                    delta={stats.productivity - 85}
                />
                <MetricCard
                    label="Culture Score"
                    value={stats.culture}
                    unit="pts"
                    icon={Heart}
                    color="pink"
                    delta={stats.culture - 78}
                />
                <MetricCard
                    label="Proj. Cost Idx"
                    value={stats.cost}
                    unit=""
                    icon={DollarSign}
                    color="emerald"
                    inverse={true}
                    delta={stats.cost - 100}
                />
            </div>

            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">

                {/* Control Panel */}
                <div className="col-span-4 bg-slate-900/50 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-sm flex flex-col gap-8 overflow-y-auto">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                            <Layers size={18} className="text-indigo-400" /> Decisions
                        </h3>
                        <p className="text-xs text-slate-500 mb-6">Adjust parameters to simulate future states.</p>

                        <div className="space-y-8">
                            <SliderControl
                                label="Salary Hike"
                                value={salaryHike}
                                onChange={setSalaryHike}
                                min={0} max={50} unit="%"
                                color="emerald"
                            />
                            <SliderControl
                                label="Workforce Reduction (Layoffs)"
                                value={layoffPercent}
                                onChange={setLayoffPercent}
                                min={0} max={40} unit="%"
                                color="rose"
                                warning={layoffPercent > 10}
                            />
                            <SliderControl
                                label="Remote Work Days"
                                value={remoteDays}
                                onChange={setRemoteDays}
                                min={0} max={5} unit="Days"
                                color="blue"
                            />
                            <SliderControl
                                label="Training Budget / Yr"
                                value={trainingBudget}
                                onChange={setTrainingBudget}
                                min={0} max={5000} step={100} unit="$"
                                color="amber"
                            />
                            <SliderControl
                                label="Promotion Rate"
                                value={promotionRate}
                                onChange={setPromotionRate}
                                min={0} max={20} unit="%"
                                color="purple"
                            />
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-800">
                        <button
                            onClick={() => {
                                setSalaryHike(0);
                                setLayoffPercent(0);
                                setRemoteDays(0);
                                setTrainingBudget(0);
                                setPromotionRate(0);
                            }}
                            className="w-full py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                        >
                            <RefreshCcw size={16} /> Reset Simulation
                        </button>
                    </div>
                </div>

                {/* Visualization Area */}
                <div className="col-span-8 bg-slate-950 rounded-3xl p-8 relative overflow-y-auto custom-scrollbar border border-slate-800 flex flex-col">

                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    ></div>

                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-[450px]">

                        {/* Central "Org Heart" */}
                        <div className="relative mb-8">
                            {/* Pulse Rings */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className={`absolute inset-[-40px] rounded-full blur-2xl ${stats.culture < 60 ? 'bg-rose-500/30' :
                                    stats.culture > 85 ? 'bg-emerald-500/30' : 'bg-indigo-500/30'
                                    }`}
                            ></motion.div>

                            <div className={`
                                w-48 h-48 rounded-full border-4 flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-500
                                ${stats.culture < 60 ? 'border-rose-500/50 bg-rose-950/30' :
                                    stats.culture > 85 ? 'border-emerald-500/50 bg-emerald-950/30' : 'border-indigo-500/50 bg-indigo-950/30'}
                            `}>
                                <div className="text-center">
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Org Health</div>
                                    <div className="text-5xl font-black text-white">{Math.round((stats.productivity + stats.culture) / 2)}</div>
                                    <div className={`text-sm font-bold mt-2 ${(stats.productivity + stats.culture) / 2 < 60 ? 'text-rose-400' : 'text-emerald-400'
                                        }`}>
                                        {(stats.productivity + stats.culture) / 2 > 80 ? 'THRIVING' : 'STABLE'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Impact Summary */}
                        <div className="w-full grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50 backdrop-blur-md">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 text-center">Projected Turnover (12mo)</h4>
                                <div className="h-24 flex items-end justify-center gap-1">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                                        <motion.div
                                            key={m}
                                            initial={{ height: '20%' }}
                                            animate={{ height: `${Math.min(100, Math.max(10, stats.attrition * (1 + (m * 0.1))))}%` }}
                                            className="w-3 bg-indigo-500/40 rounded-t-sm"
                                        ></motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/50 backdrop-blur-md">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 text-center">Culture Composition</h4>
                                <div className="flex h-24 items-center justify-center gap-4">
                                    <div className="relative w-24 h-24">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                                            <circle cx="48" cy="48" r="40" stroke="#ec4899" strokeWidth="8" fill="transparent" strokeDasharray={251} strokeDashoffset={251 - (251 * stats.culture / 100)} className="transition-all duration-1000 ease-out" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-pink-500 text-lg">
                                            {Math.round(stats.culture)}%
                                        </div>
                                    </div>
                                    <div className="text-xs space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                            <span className="text-slate-300">Engagement</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                                            <span className="text-slate-500">Disengaged</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, unit, icon: Icon, color, inverse = false, delta }: any) {
    const isPositive = delta > 0;
    const isNeutral = delta === 0;

    let deltaColor = "text-slate-500";
    if (!isNeutral) {
        if (inverse) {
            deltaColor = isPositive ? "text-rose-400" : "text-emerald-400";
        } else {
            deltaColor = isPositive ? "text-emerald-400" : "text-rose-400";
        }
    }

    return (
        <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-4 relative overflow-hidden group hover:border-${color}-500/30 transition-all`}>
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-400`}>
                <Icon size={40} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <Icon size={16} className={`text-${color}-400`} />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-white tracking-tight">{value.toFixed(1)}{unit}</span>
                    <span className={`text-xs font-bold mb-1.5 flex items-center ${deltaColor}`}>
                        {isNeutral ? '-' : (
                            <>
                                {delta > 0 ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
                                {Math.abs(delta).toFixed(1)}%
                            </>
                        )}
                    </span>
                </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${color}-500/0 via-${color}-500/50 to-${color}-500/0 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
        </div>
    )
}

function SliderControl({ label, value, onChange, min, max, unit, step = 1, color = "indigo", warning = false }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    {label}
                    {warning && <AlertTriangle size={12} className="text-amber-500 animate-pulse" />}
                </label>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>
                    {value}{unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className={`
                    w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer
                    accent-${color}-500 hover:accent-${color}-400 transition-all
                `}
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                <span>{min}{unit}</span>
                <span>{max}{unit}</span>
            </div>
        </div>
    )
}
