'use client';

import React, { useState } from 'react';
import {
    Target,
    TrendingUp,
    CheckCircle2,
    Clock,
    Plus,
    MoreHorizontal,
    ChevronRight,
    BarChart3,
    Calendar,
    ArrowUpRight,
    Building2,
    Stethoscope,
    ShoppingBag,
    Briefcase,
    Code2,
    Globe
} from 'lucide-react';

type Industry = 'Tech' | 'Retail' | 'Healthcare' | 'Finance' | 'Manufacturing';

export default function GoalsPage() {
    const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
    const [selectedIndustry, setSelectedIndustry] = useState<Industry>('Tech');

    // Industry-Specific Data Templates
    const goalsByIndustry: Record<Industry, any[]> = {
        Tech: [
            {
                id: 1,
                title: 'Improve Deployment Efficiency',
                description: 'Reduce the average deployment time by 50% using new CI/CD pipelines.',
                category: 'Engineering',
                icon: Code2,
                progress: 75,
                dueDate: 'Oct 30, 2026',
                status: 'On Track',
                priority: 'High',
                keyResults: [
                    { id: 101, title: 'Migrate to GitHub Actions', done: true },
                    { id: 102, title: 'Implement Docker caching', done: true },
                    { id: 103, title: 'Reduce build time to <5m', done: false }
                ]
            },
            {
                id: 2,
                title: '99.99% Platform Uptime',
                description: 'Stabilize core services to ensure high availability for enterprise clients.',
                category: 'Infrastructure',
                icon: Globe,
                progress: 92,
                dueDate: 'Dec 31, 2026',
                status: 'On Track',
                priority: 'Critical',
                keyResults: [
                    { id: 201, title: 'Implement Multi-region failover', done: true },
                    { id: 202, title: 'Conduct Chaos Engineering drills', done: true }
                ]
            }
        ],
        Retail: [
            {
                id: 3,
                title: 'Increase Store Footfall',
                description: 'Drive a 20% increase in walk-ins through local marketing campaigns and window displays.',
                category: 'Marketing',
                icon: ShoppingBag,
                progress: 45,
                dueDate: 'Nov 15, 2026',
                status: 'At Risk',
                priority: 'High',
                keyResults: [
                    { id: 301, title: 'Launch "Summer Sale" campaign', done: true },
                    { id: 302, title: 'Partner with local influencers', done: false },
                    { id: 303, title: 'Update storefront visual merchandising', done: false }
                ]
            },
            {
                id: 4,
                title: 'Reduce Inventory Shrinkage',
                description: 'Lower inventory loss due to theft or error by 15% across all flagship stores.',
                category: 'Operations',
                icon: BarChart3,
                progress: 60,
                dueDate: 'Dec 31, 2026',
                status: 'On Track',
                priority: 'Medium',
                keyResults: [
                    { id: 401, title: 'Install new RFID tags', done: true },
                    { id: 402, title: 'Staff training on loss prevention', done: true }
                ]
            }
        ],
        Healthcare: [
            {
                id: 5,
                title: 'Patient Satisfaction Score > 9/10',
                description: 'Improve post-visit survey results by enhancing front-desk responsiveness and wait times.',
                category: 'Patient Care',
                icon: Stethoscope,
                progress: 82,
                dueDate: 'Oct 30, 2026',
                status: 'On Track',
                priority: 'Critical',
                keyResults: [
                    { id: 501, title: 'Reduce avg wait time to <10m', done: true },
                    { id: 502, title: 'Implement digital check-in', done: true },
                    { id: 503, title: 'Staff empathy training', done: false }
                ]
            },
            {
                id: 6,
                title: 'Telemedicine Expansion',
                description: 'Launch remote consultation modules for general practice to serve 500+ patients.',
                category: 'Innovation',
                icon: TrendingUp,
                progress: 30,
                dueDate: 'Dec 15, 2026',
                status: 'Delayed',
                priority: 'High',
                keyResults: [
                    { id: 601, title: 'Select video conferencing vendor', done: true },
                    { id: 602, title: 'Train doctors on new platform', done: false }
                ]
            }
        ],
        Finance: [
            {
                id: 7,
                title: 'Q4 Revenue Targets',
                description: 'Achieve $5M in loan disbursements by expanding the SME portfolio.',
                category: 'Sales',
                icon: Briefcase,
                progress: 40,
                dueDate: 'Dec 31, 2026',
                status: 'At Risk',
                priority: 'Critical',
                keyResults: [
                    { id: 701, title: 'Close 50 SME Deals', done: false },
                    { id: 702, title: 'Launch "Growth Capital" product', done: true }
                ]
            },
            {
                id: 8,
                title: 'Regulatory Compliance Audit',
                description: 'Ensure 100% adherence to new fintech lending regulations.',
                category: 'Compliance',
                icon: CheckCircle2,
                progress: 95,
                dueDate: 'Nov 01, 2026',
                status: 'On Track',
                priority: 'High',
                keyResults: [
                    { id: 801, title: 'Internal Audit completion', done: true },
                    { id: 802, title: 'Submit reports to regulator', done: true }
                ]
            }
        ],
        Manufacturing: [
            {
                id: 9,
                title: 'Reduce Production Waste',
                description: 'Cut material waste by 12% in the assembly line via Six Sigma methodologies.',
                category: 'Production',
                icon: Building2,
                progress: 65,
                dueDate: 'Dec 01, 2026',
                status: 'On Track',
                priority: 'High',
                keyResults: [
                    { id: 901, title: 'Calibrate cutting machines', done: true },
                    { id: 902, title: 'Staff workshop on waste mgmt', done: true }
                ]
            }
        ]
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Track': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'At Risk': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'Delayed': return 'text-red-500 bg-red-500/10 border-red-500/20';
            default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
        }
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 75) return 'bg-gradient-to-r from-emerald-400 to-cyan-500';
        if (progress >= 40) return 'bg-gradient-to-r from-blue-400 to-indigo-500';
        return 'bg-gradient-to-r from-amber-400 to-orange-500';
    };

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Templates</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Demonstrating generic OKR adaptability across sectors.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/20 active:scale-95">
                    <Plus size={20} /> Use Template
                </button>
            </div>

            {/* Industry Selector */}
            <div className="flex flex-wrap gap-2">
                {(['Tech', 'Retail', 'Healthcare', 'Finance', 'Manufacturing'] as Industry[]).map((industry) => (
                    <button
                        key={industry}
                        onClick={() => setSelectedIndustry(industry)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${selectedIndustry === industry
                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
                            : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'}`}
                    >
                        {industry === 'Tech' && <Code2 size={16} />}
                        {industry === 'Retail' && <ShoppingBag size={16} />}
                        {industry === 'Healthcare' && <Stethoscope size={16} />}
                        {industry === 'Finance' && <Briefcase size={16} />}
                        {industry === 'Manufacturing' && <Building2 size={16} />}
                        {industry}
                    </button>
                ))}
            </div>

            {/* Stats Overview (Dynamic based on Industry) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <Target size={100} />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Goals</p>
                    <p className="text-4xl font-black text-slate-800">{goalsByIndustry[selectedIndustry].length}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full w-fit">
                        <ArrowUpRight size={16} /> Updated today
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <TrendingUp size={100} />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sector Efficiency</p>
                    <p className="text-4xl font-black text-slate-800">
                        {Math.round(goalsByIndustry[selectedIndustry].reduce((acc, curr) => acc + curr.progress, 0) / goalsByIndustry[selectedIndustry].length)}%
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
                        <ChevronRight size={16} /> Weighted Avg
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <CheckCircle2 size={100} />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Completion Rate</p>
                    <p className="text-4xl font-black text-slate-800">High</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full w-fit">
                        <Clock size={16} /> Historic Data
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100/50 p-1.5 rounded-2xl w-fit border border-slate-200/50">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Active Goals
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'completed' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    Completed
                </button>
            </div>

            {/* Goals List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goalsByIndustry[selectedIndustry].map((goal) => {
                    const Icon = goal.icon;
                    return (
                        <div key={goal.id} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                            {/* Status Badge */}
                            <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(goal.status)}`}>
                                {goal.status}
                            </div>

                            {/* Category */}
                            <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                                {goal.category}
                            </p>

                            <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-violet-600 transition-colors flex items-center gap-2">
                                {Icon && <Icon size={24} className="text-violet-500" />}
                                {goal.title}
                            </h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-6">{goal.description}</p>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-bold text-slate-700">Progress</span>
                                    <span className="text-2xl font-black text-slate-900">{goal.progress}%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${getProgressColor(goal.progress)} transition-all duration-1000 ease-out`} style={{ width: `${goal.progress}%` }}></div>
                                </div>
                            </div>

                            {/* Key Results */}
                            <div className="space-y-3 mb-8">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Results</p>
                                {goal.keyResults.map((kr: any) => (
                                    <div key={kr.id} className="flex items-center gap-3 group/item cursor-pointer">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${kr.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover/item:border-violet-400'}`}>
                                            {kr.done && <CheckCircle2 size={12} className="text-white" />}
                                        </div>
                                        <span className={`text-sm font-bold ${kr.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{kr.title}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                                    <Calendar size={14} /> Due {goal.dueDate}
                                </div>
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">JD</div>
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">MK</div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Add New Quick Card (Adaptive Text) */}
                <button className="min-h-[400px] rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-violet-500 hover:border-violet-200 hover:bg-violet-50/50 transition-all group">
                    <div className="w-16 h-16 rounded-full bg-slate-50 group-hover:bg-white group-hover:shadow-md flex items-center justify-center transition-all">
                        <Plus size={32} />
                    </div>
                    <span className="font-bold text-lg">Create {selectedIndustry} Goal</span>
                </button>
            </div>
        </div>
    );
}
