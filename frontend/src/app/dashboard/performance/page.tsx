'use client';

import React from 'react';
import Link from 'next/link';
import {
    Trophy,
    Target,
    Zap,
    TrendingUp,
    ArrowRight,
    Users,
    MessageSquare,
    Award,
    Sparkles,
    BrainCircuit,
    ChevronUp,
    X,
    BookOpen,
    Video,
    CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

export default function PerformanceDashboard() {
    const [showCoachModal, setShowCoachModal] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [showAchievementsModal, setShowAchievementsModal] = useState(false);

    // Mock Data for Modals
    const aiRecommendations = [
        { id: 1, type: 'Course', title: 'Advanced System Design Patterns', duration: '4h 30m', platform: 'Udemy Business', status: 'Not Started' },
        { id: 2, type: 'Action', title: 'Schedule Architecture Review with Staff Eng', duration: '1h', platform: 'Internal', status: 'Pending' },
        { id: 3, type: 'Book', title: 'Designing Data-Intensive Applications', duration: '12h', platform: 'O\'Reilly', status: 'In Progress' },
    ];

    const extendedSkills = [
        { name: 'Technical Architecture', level: 85, color: 'bg-indigo-500', trend: '+5%' },
        { name: 'Team Leadership', level: 60, color: 'bg-pink-500', trend: '+12%' },
        { name: 'Product Strategy', level: 75, color: 'bg-cyan-500', trend: 'Stable' },
        { name: 'Communication', level: 90, color: 'bg-emerald-500', trend: '+2%' },
        { name: 'Cloud Infrastructure', level: 70, color: 'bg-violet-500', trend: '+8%' },
        { name: 'Mentorship', level: 80, color: 'bg-orange-500', trend: '+10%' },
    ];

    const allAchievements = [
        { title: 'Project Titan Launch', desc: 'Successfully led the Q3 global rollout.', date: 'Oct 2026', type: 'Milestone', color: 'text-amber-500 bg-amber-50' },
        { title: 'Top Performer Badge', desc: 'Received for 3 consecutive months of 100% goal completion.', date: 'Sep 2026', type: 'Award', color: 'text-purple-500 bg-purple-50' },
        { title: 'Mentor of the Month', desc: 'Voted by junior developers team.', date: 'Aug 2026', type: 'Recognition', color: 'text-blue-500 bg-blue-50' },
        { title: 'Bug Squash Champion', desc: 'Fixed 20+ critical bugs in a single sprint.', date: 'July 2026', type: 'Award', color: 'text-red-500 bg-red-50' },
        { title: 'Certification Complete', desc: 'AWS Solutions Architect Associate.', date: 'June 2026', type: 'Milestone', color: 'text-emerald-500 bg-emerald-50' },
    ];

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">

            {/* --- MODALS --- */}

            {/* AI Coach Modal */}
            {showCoachModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCoachModal(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white relative overflow-hidden">
                            <BrainCircuit className="absolute top-0 right-0 opacity-10 -translate-y-1/2 translate-x-1/2" size={200} />
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-black mb-2">AI Coach Plan</h2>
                                    <p className="text-indigo-100 font-medium">Personalized growth roadmap for "System Design".</p>
                                </div>
                                <button onClick={() => setShowCoachModal(false)} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="p-8 space-y-6">
                            {aiRecommendations.map((rec) => (
                                <div key={rec.id} className="flex items-center gap-6 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                        {rec.type === 'Course' && <Video size={24} />}
                                        {rec.type === 'Book' && <BookOpen size={24} />}
                                        {rec.type === 'Action' && <CheckCircle2 size={24} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{rec.type} • {rec.platform}</span>
                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{rec.status}</span>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{rec.title}</h4>
                                        <p className="text-sm font-medium text-slate-400 mt-1">Estimated Time: {rec.duration}</p>
                                    </div>
                                    <ArrowRight size={20} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                </div>
                            ))}
                            <button className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">
                                Add to My Goals
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Skill Matrix Modal */}
            {showSkillModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSkillModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Full Skill Matrix</h2>
                                <p className="text-slate-500 font-medium">Competency breakdown.</p>
                            </div>
                            <button onClick={() => setShowSkillModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-6">
                            {extendedSkills.map((skill, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="font-bold text-slate-700">{skill.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{skill.trend}</span>
                                            <span className="font-black text-slate-900">{skill.level}%</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${skill.color} relative`} style={{ width: `${skill.level}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                alert("Assessment requested successfully! A manager will review your request shortly.");
                                setShowSkillModal(false);
                            }}
                            className="w-full mt-8 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Request Skill Assessment
                        </button>
                    </div>
                </div>
            )}

            {/* Achievements Modal */}
            {showAchievementsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAchievementsModal(false)}></div>
                    <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Hall of Fame</h2>
                                <p className="text-slate-500 font-medium">Your career milestones and awards.</p>
                            </div>
                            <button onClick={() => setShowAchievementsModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {allAchievements.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 hover:border-slate-100 transition-colors group">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform`}>
                                        <Award size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-800">{item.title}</h4>
                                            <span className="text-xs font-bold text-slate-400">{item.date}</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-500 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Hub</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Your centralized command center for career development.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold text-sm border border-indigo-100">
                    <Sparkles size={16} /> Level 4 Senior Engineer
                </div>
            </div>

            {/* Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. Main Score Card */}
                <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        {/* Circular Progress (CSS Simulated) */}
                        <div className="relative w-48 h-48 flex-shrink-0">
                            {/* Background Ring */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="88" className="stroke-slate-800" strokeWidth="12" fill="none" />
                                <circle cx="96" cy="96" r="88" className="stroke-indigo-500" strokeWidth="12" fill="none" strokeDasharray="552" strokeDashoffset="110" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black tracking-tighter">82</span>
                                <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest mt-1">Growth Score</span>
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-2">Excellent Progress</h2>
                            <p className="text-slate-400 font-medium mb-6 leading-relaxed">
                                You are performing in the top <span className="text-white font-bold">15%</span> of your peer group. Your goal completion rate is exceptional this quarter.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="px-4 py-2 bg-white/10 rounded-xl text-sm font-bold border border-white/5 flex items-center gap-2">
                                    <Target size={16} className="text-emerald-400" /> 12 Goals Active
                                </span>
                                <span className="px-4 py-2 bg-white/10 rounded-xl text-sm font-bold border border-white/5 flex items-center gap-2">
                                    <MessageSquare size={16} className="text-amber-400" /> 5 New Feedback
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. AI Coach Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-between">
                    <div className="absolute top-0 left-0 p-6 opacity-10">
                        <BrainCircuit size={120} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Sparkles size={16} className="text-yellow-300" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Zentra AI Coach</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 leading-snug">Focus on "System Design" this week.</h3>
                        <p className="text-indigo-100 text-sm font-medium mb-6">
                            Based on recent feedback, dedicating 2 hours to architectural patterns could boost your rating.
                        </p>
                    </div>

                    <button onClick={() => setShowCoachModal(true)} className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-black/10">
                        View Recommendations
                    </button>
                </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Goals Module */}
                <Link href="/dashboard/performance/goals" className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Target size={28} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">My Goals</h3>
                    <p className="text-slate-500 text-sm font-medium mb-4">Track OKRs and milestones. Stay aligned with company objectives.</p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 w-3/4 h-full rounded-full"></div>
                    </div>
                    <p className="text-xs font-bold text-emerald-600 mt-2 text-right">75% Completed</p>
                </Link>

                {/* Appraisals Module */}
                <Link href="/dashboard/performance/appraisals" className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Trophy size={28} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Appraisals</h3>
                    <p className="text-slate-500 text-sm font-medium mb-4">Manage self-reviews and check manager evaluations.</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                        <Zap size={12} fill="currentColor" /> Active Cycle
                    </div>
                </Link>

                {/* Feedback Module */}
                <Link href="/dashboard/performance/feedback" className="group bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MessageSquare size={28} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">360° Feedback</h3>
                    <p className="text-slate-500 text-sm font-medium mb-4">Give and receive constructive feedback from peers.</p>
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                        ))}
                        <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500">+5</div>
                    </div>
                </Link>

            </div>

            {/* Recent Activity / Skill Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Skill Matrix List */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-slate-800">Skill Matrix</h3>
                        <button onClick={() => setShowSkillModal(true)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Technical Architecture', level: 85, color: 'bg-indigo-500' },
                            { name: 'Team Leadership', level: 60, color: 'bg-pink-500' },
                            { name: 'Product Strategy', level: 75, color: 'bg-cyan-500' },
                            { name: 'Communication', level: 90, color: 'bg-emerald-500' },
                        ].map((skill, idx) => (
                            <div key={idx} className="group cursor-default">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-bold text-slate-700">{skill.name}</span>
                                    <span className="font-black text-slate-900">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${skill.color} group-hover:brightness-110 transition-all duration-500`} style={{ width: `${skill.level}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Achievements */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-slate-800">Recent Achievements</h3>
                        <button onClick={() => setShowAchievementsModal(true)} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: 'Project Titan Launch', desc: 'Successfully led the Q3 global rollout.', type: 'Milestone', color: 'text-amber-500 bg-amber-50' },
                            { title: 'Top Performer Badge', desc: 'Received for 3 consecutive months of 100% goal completion.', type: 'Award', color: 'text-purple-500 bg-purple-50' },
                            { title: 'Mentor of the Month', desc: 'Voted by junior developers team.', type: 'Recognition', color: 'text-blue-500 bg-blue-50' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 hover:border-slate-100 transition-colors">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                                    <p className="text-sm font-medium text-slate-500 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
