'use client';

import React, { useState } from 'react';
import {
    ClipboardCheck,
    Calendar,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    FileText,
    Download,
    UserCircle,
    X,
    FileCheck
} from 'lucide-react';

export default function AppraisalsPage() {

    // Mock Data for Current Cycle
    const currentCycle = {
        name: 'Q3 2026 Performance Review',
        status: 'In Progress',
        dueDate: 'Oct 31, 2026',
        progress: 35,
        steps: [
            { id: 1, name: 'Self Review', status: 'Completed', date: 'Oct 15, 2026' },
            { id: 2, name: 'Manager Review', status: 'In Progress', date: 'Due Oct 25, 2026' },
            { id: 3, name: 'Calibration', status: 'Pending', date: 'Nov 05, 2026' },
            { id: 4, name: 'Sign Off', status: 'Pending', date: 'Nov 10, 2026' }
        ]
    };

    const history = [
        { id: 1, name: 'Mid-Year Review 2026', rating: 'Exceeds Expectations', date: 'June 2026', verified: true },
        { id: 2, name: 'Annual Review 2025', rating: 'Meets Expectations', date: 'Dec 2025', verified: true },
        { id: 3, name: 'Probation Review', rating: 'Outstanding', date: 'June 2025', verified: true },
    ];

    const [showSubmissionModal, setShowSubmissionModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);

    const handleDownload = (id: number) => {
        alert(`Downloading report #${id}...`);
    };

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- MODALS --- */}

            {/* View Submission Modal */}
            {showSubmissionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSubmissionModal(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">My Submission</h2>
                                <p className="text-slate-500 font-medium">Q3 2026 Self Review</p>
                            </div>
                            <button onClick={() => setShowSubmissionModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2">1. What were your key achievements this quarter?</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    I successfully led the migration of our legacy authentication system to a new OAuth2 provider, reducing login latency by 40%. Additionally, I mentored two junior developers through their onboarding process.
                                </p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2">2. What areas do you want to improve?</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    I want to focus more on system architecture design patterns. While my coding is strong, I sometimes struggle with high-level scalability decisions early in the project lifecycle.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Schedule 1:1 Modal */}
            {showScheduleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowScheduleModal(false)}></div>
                    <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-900">Schedule 1:1</h2>
                            <button onClick={() => setShowScheduleModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <p className="text-slate-500 text-sm font-medium">Select a time for your performance review discussion.</p>
                            <div className="grid grid-cols-2 gap-3">
                                {['Oct 26, 10:00 AM', 'Oct 26, 2:00 PM', 'Oct 27, 11:30 AM', 'Oct 28, 4:00 PM'].map((time, i) => (
                                    <button key={i} className="p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 transition-all">
                                        {time}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setShowScheduleModal(false)} className="w-full py-3 mt-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Archive Modal */}
            {showArchiveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowArchiveModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-900">Review Archive</h2>
                            <button onClick={() => setShowArchiveModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {[2024, 2023, 2022].map(year => (
                                <div key={year} className="p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 cursor-pointer flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                            <FileCheck size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{year} Annual Reviews</h4>
                                            <p className="text-xs text-slate-400 font-bold">2 Cycles Completed</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Appraisals</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Manage your review cycles and growth plans.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-bold text-sm border border-blue-100">
                    <Clock size={16} /> Next Cycle: Q4 Starts Dec 01
                </div>
            </div>

            {/* Active Cycle Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                            <AlertCircle size={14} /> Action Required
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">{currentCycle.name}</h2>
                        <p className="text-slate-400 font-medium text-lg mb-8 max-w-md">Your manager is currently reviewing your submission. Please prepare for your 1:1 discussion scheduled for next week.</p>

                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => setShowSubmissionModal(true)} className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10 active:scale-95 flex items-center gap-2">
                                <FileText size={20} /> View Submission
                            </button>
                            <button onClick={() => setShowScheduleModal(true)} className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-colors flex items-center gap-2 backdrop-blur-sm">
                                <Calendar size={20} /> Schedule 1:1
                            </button>
                        </div>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <ClipboardCheck className="text-emerald-400" /> Review Timeline
                        </h3>
                        <div className="space-y-0">
                            {currentCycle.steps.map((step, idx) => (
                                <div key={step.id} className="relative pl-8 pb-8 last:pb-0">
                                    {/* Vertical Line */}
                                    {idx !== currentCycle.steps.length - 1 && (
                                        <div className={`absolute left-[11px] top-3 w-[2px] h-full ${step.status === 'Completed' ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                                    )}

                                    {/* Dot */}
                                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 flex items-center justify-center z-10 ${step.status === 'Completed' ? 'bg-emerald-500 border-emerald-900' :
                                        step.status === 'In Progress' ? 'bg-blue-500 border-blue-900 animate-pulse' :
                                            'bg-slate-800 border-slate-700'
                                        }`}>
                                        {step.status === 'Completed' && <CheckCircle2 size={12} className="text-slate-900" />}
                                    </div>

                                    <div>
                                        <p className={`text-lg font-bold ${step.status === 'Pending' ? 'text-slate-500' : 'text-white'}`}>{step.name}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className={`text-sm font-medium ${step.status === 'In Progress' ? 'text-blue-400' : 'text-slate-500'}`}>{step.status}</p>
                                            <p className="text-xs font-bold text-slate-600">{step.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* History Section */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-slate-800">Review History</h3>
                    <button onClick={() => setShowArchiveModal(true)} className="text-slate-400 hover:text-slate-600 font-bold text-sm flex items-center gap-1">
                        View Archive <ChevronRight size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    {history.map((rev) => (
                        <div key={rev.id} className="group flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all gap-4">
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white border border-slate-100 items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                                    <UserCircle size={32} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{rev.name}</h4>
                                    <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
                                        <Calendar size={14} /> Completed {rev.date}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Final Rating</p>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                                        <CheckCircle2 size={12} /> {rev.rating}
                                    </span>
                                </div>
                                <button onClick={() => handleDownload(rev.id)} className="p-3 bg-white text-slate-400 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
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
