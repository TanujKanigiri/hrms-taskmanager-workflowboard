"use client";

import React, { useState } from 'react';
import {
    Smile,
    Frown,
    Meh,
    Calendar,
    Clock,
    Award,
    MessageCircle,
    Plus,
    MoreHorizontal,
    ThumbsUp,
    Heart,
    Zap,
    TrendingUp,
    UserMinus,
    Beer
} from 'lucide-react';

const INITIAL_TEAM = [
    { id: 1, name: 'Alex Morgan', role: 'Product Designer', status: 'Online', mood: 'happy', image: 'AM' },
    { id: 2, name: 'Sarah Jones', role: 'Marketing Lead', status: 'In Meeting', mood: 'neutral', image: 'SJ' },
    { id: 3, name: 'Mike Chen', role: 'Senior Dev', status: 'Focus Time', mood: 'energetic', image: 'MC' },
    { id: 4, name: 'Emily Davis', role: 'HR Specialist', status: 'On Leave', mood: 'happy', image: 'ED' },
];

const INITIAL_KUDOS = [
    { id: 1, to: 'Mike Chen', from: 'Alex', msg: 'Crushing that bug in record time! 🚀', type: 'Zap', time: '2h ago' },
    { id: 2, to: 'Sarah Jones', from: 'Emily', msg: 'Great presentation today!', type: 'Heart', time: '4h ago' },
];

export default function MyTeamPage() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [myTeam, setMyTeam] = useState(INITIAL_TEAM);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // New functionality states
    const [kudosList, setKudosList] = useState(INITIAL_KUDOS);
    const [isKudosModalOpen, setIsKudosModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newKudo, setNewKudo] = useState({ to: '', msg: '', type: 'Zap' });

    const AVAILABLE_POOL = [
        { id: 101, name: 'David Kim', role: 'DevOps Engineer', status: 'Active', mood: 'happy', image: 'DK' },
        { id: 102, name: 'Lisa Wong', role: 'UX Researcher', status: 'Online', mood: 'energetic', image: 'LW' },
        { id: 103, name: 'Robert Fox', role: 'Marketing Specialist', status: 'Offline', mood: 'neutral', image: 'RF' },
        { id: 104, name: 'Jennifer Lee', role: 'Product Manager', status: 'In Meeting', mood: 'happy', image: 'JL' },
    ];

    const handleAddMember = (member: any) => {
        if (myTeam.some(m => m.id === member.id)) {
            alert(`${member.name} is already in your team!`);
            return;
        }
        setMyTeam([...myTeam, member]);
        setIsAddModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12 relative">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Team Dashboard</h1>
                    <p className="text-slate-500 font-medium mt-1">Real-time pulse check and collaboration center.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 mr-4"
                    >
                        <Plus size={18} /> Add Member
                    </button>
                    <span className="text-sm font-bold text-slate-500 mr-2">How are you feeling today?</span>
                    <div className="flex bg-white rounded-full p-1 border border-slate-200 shadow-sm">
                        {[
                            { icon: Smile, color: 'text-emerald-500', bg: 'hover:bg-emerald-50' },
                            { icon: Meh, color: 'text-amber-500', bg: 'hover:bg-amber-50' },
                            { icon: Frown, color: 'text-red-500', bg: 'hover:bg-red-50' },
                            { icon: Zap, color: 'text-blue-500', bg: 'hover:bg-blue-50' }
                        ].map((m, i) => (
                            <button key={i} className={`p-2 rounded-full transition-colors ${m.color} ${m.bg}`}>
                                <m.icon size={20} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 1. Team Availability (Left Col) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Status Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Who's Out */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <UserMinus size={18} className="text-red-500" /> Who's Out Today
                            </h3>
                            <div className="flex items-center gap-4 p-3 bg-red-50/50 rounded-xl border border-red-50 mb-3">
                                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">ED</div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">Emily Davis</p>
                                    <p className="text-xs text-red-600 font-medium">Sick Leave • Back tomorrow</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-amber-50/50 rounded-xl border border-amber-50 opacity-60">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">JW</div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">James Wilson</p>
                                    <p className="text-xs text-amber-600 font-medium">Remote Work</p>
                                </div>
                            </div>
                        </div>

                        {/* Team Pulse/Goals */}
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={64} /></div>
                            <h3 className="font-bold text-indigo-100 mb-1">Sprint Goals</h3>
                            <div className="text-3xl font-black mb-4">82% <span className="text-base font-medium text-indigo-200">Completed</span></div>

                            <div className="space-y-3 relative z-10">
                                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="font-bold">Q1 Design Refresh</span>
                                        <span className="opacity-80">Almost there</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-400 w-[90%]"></div>
                                    </div>
                                </div>
                                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="font-bold">Backend Migration</span>
                                        <span className="opacity-80">Delayed</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-400 w-[40%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Member List */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Team Members</h3>
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className={`p-2 hover:bg-slate-100 rounded-lg transition-colors ${isMenuOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}
                                >
                                    <MoreHorizontal size={20} />
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                                        <button
                                            onClick={() => {
                                                const csv = "Name,Role,Status,Mood\n" + myTeam.map(m => `${m.name},${m.role},${m.status},${m.mood}`).join("\n");
                                                const blob = new Blob([csv], { type: 'text/csv' });
                                                const url = window.URL.createObjectURL(blob);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = 'my_team.csv';
                                                a.click();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                        >
                                            Export List (CSV)
                                        </button>
                                        <button
                                            onClick={() => { alert('Notification settings coming soon!'); setIsMenuOpen(false); }}
                                            className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                        >
                                            Notifications
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {myTeam.map(member => (
                                <div key={member.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center font-bold text-indigo-600 border-2 border-white shadow-sm">
                                            {member.image}
                                        </div>
                                        {member.status === 'Online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900">{member.name}</h4>
                                        <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${member.status === 'Online' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                            {member.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {/* Add Member Placeholder */}
                            <button className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-slate-300 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 transition-all">
                                <Plus size={20} /> <span className="font-bold">Add Member</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Kudos Wall (Right Col) */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500"></div>

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                                <Award className="text-orange-500" /> Wall of Fame
                            </h3>
                            <button onClick={() => setIsHistoryModalOpen(true)} className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                        </div>

                        <div className="space-y-4">
                            {kudosList.slice(0, 3).map(kudo => (
                                <div key={kudo.id} className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 relative group hover:scale-[1.02] transition-transform">
                                    <div className="absolute top-4 right-4 text-orange-200 group-hover:text-orange-300 transition-colors">
                                        {kudo.type === 'Zap' ? <Zap size={24} /> : <Heart size={24} />}
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-bold border border-orange-100 shadow-sm">
                                            {kudo.from[0]}
                                        </div>
                                        <span className="text-xs text-slate-400">praised</span>
                                        <span className="text-sm font-bold text-slate-900">{kudo.to}</span>
                                    </div>
                                    <p className="text-slate-700 font-medium italic mb-2">"{kudo.msg}"</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{kudo.time}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsKudosModalOpen(true)}
                            className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                        >
                            <Beer size={18} /> Give Kudos
                        </button>
                    </div>

                    {/* Team Events */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Calendar className="text-blue-500" size={18} /> Upcoming
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-xl font-bold border border-blue-100 shrink-0">
                                    <span className="text-[10px] uppercase">JAN</span>
                                    <span className="text-xl">24</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Team Lunch 🍕</h4>
                                    <p className="text-xs text-slate-500">12:30 PM • Main Cafeteria</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="flex flex-col items-center justify-center w-12 h-12 bg-purple-50 text-purple-600 rounded-xl font-bold border border-purple-100 shrink-0">
                                    <span className="text-[10px] uppercase">JAN</span>
                                    <span className="text-xl">28</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">Design Workshop</h4>
                                    <p className="text-xs text-slate-500">2:00 PM • Meeting Room A</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* --- ADD MEMBER MODAL --- */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Add to Team</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Select active employees</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                                <Plus size={20} className="rotate-45" />
                            </button>
                        </div>
                        <div className="p-4 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-2">
                                {AVAILABLE_POOL.map((employee) => {
                                    const isAlreadyIn = myTeam.some(m => m.id === employee.id);
                                    return (
                                        <button
                                            key={employee.id}
                                            disabled={isAlreadyIn}
                                            onClick={() => handleAddMember(employee)}
                                            className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs shadow-sm">
                                                {employee.image}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{employee.name}</h4>
                                                <p className="text-xs text-slate-500 font-medium">{employee.role}</p>
                                            </div>
                                            {isAlreadyIn ? (
                                                <span className="text-[10px] font-bold bg-slate-100 text-slate-400 px-2 py-1 rounded-full">ADDED</span>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                                    <Plus size={16} />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- GIVE KUDOS MODAL --- */}
            {isKudosModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Give Kudos</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Recognize a teammate</p>
                            </div>
                            <button onClick={() => setIsKudosModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                                <Plus size={20} className="rotate-45" />
                            </button>
                        </div>
                        <div className="p-6 grid gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Team Member</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={newKudo.to}
                                    onChange={(e) => setNewKudo({ ...newKudo, to: e.target.value })}
                                >
                                    <option value="">Select a member...</option>
                                    {myTeam.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                                    placeholder="What did they do great?"
                                    value={newKudo.msg}
                                    onChange={(e) => setNewKudo({ ...newKudo, msg: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kudos Type</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setNewKudo({ ...newKudo, type: 'Zap' })}
                                        className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${newKudo.type === 'Zap' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                                    >
                                        <Zap size={18} className={newKudo.type === 'Zap' ? 'fill-current' : ''} /> Supercharged
                                    </button>
                                    <button
                                        onClick={() => setNewKudo({ ...newKudo, type: 'Heart' })}
                                        className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${newKudo.type === 'Heart' ? 'border-red-500 bg-red-50 text-red-600' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                                    >
                                        <Heart size={18} className={newKudo.type === 'Heart' ? 'fill-current' : ''} /> Helpful
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (!newKudo.to || !newKudo.msg) return alert('Please select a member and write a message!');
                                    setKudosList([{
                                        id: Date.now(),
                                        to: newKudo.to,
                                        from: 'You',
                                        msg: newKudo.msg,
                                        type: newKudo.type,
                                        time: 'Just now'
                                    }, ...kudosList]);
                                    setIsKudosModalOpen(false);
                                    setNewKudo({ to: '', msg: '', type: 'Zap' });
                                }}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg mt-2"
                            >
                                Send Applause 👏
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- KUDOS HISTORY MODAL --- */}
            {isHistoryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-black text-slate-900">Wall of Fame History</h3>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">All Kudos ({kudosList.length})</p>
                            </div>
                            <button onClick={() => setIsHistoryModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                                <Plus size={20} className="rotate-45" />
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto space-y-3 flex-1">
                            {kudosList.map(kudo => (
                                <div key={kudo.id} className="p-4 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 transition-colors shadow-sm flex gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${kudo.type === 'Zap' ? 'bg-orange-100 text-orange-500' : 'bg-red-100 text-red-500'}`}>
                                        {kudo.type === 'Zap' ? <Zap size={20} className="fill-current" /> : <Heart size={20} className="fill-current" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-slate-900 text-sm">{kudo.to}</span>
                                            <span className="text-xs text-slate-400">from {kudo.from}</span>
                                            <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase">{kudo.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 italic">"{kudo.msg}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
