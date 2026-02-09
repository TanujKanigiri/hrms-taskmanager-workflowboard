"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Calendar,
    Plus,
    Clock,
    CheckCircle2,
    XCircle,
    ChevronRight,
    ArrowUpRight,
    Plane,
    Baby,
    Coffee,
    Umbrella,
    History,
    Check,
    MoreHorizontal,
    Briefcase
} from 'lucide-react';

export default function MyLeavesPage() {
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

    // Mock Data - Balances
    const leaveBalances = [
        { id: 'privilege', name: 'Privilege Leave', balance: 14, total: 18, color: 'text-blue-500', bg: 'bg-blue-500', icon: Plane },
        { id: 'casual', name: 'Casual Leave', balance: 5, total: 12, color: 'text-emerald-500', bg: 'bg-emerald-500', icon: Coffee },
        { id: 'sick', name: 'Sick Leave', balance: 3, total: 10, color: 'text-amber-500', bg: 'bg-amber-500', icon: Umbrella },
        { id: 'maternity', name: 'Maternity', balance: 90, total: 90, color: 'text-pink-500', bg: 'bg-pink-500', icon: Baby },
    ];

    // Mock Data - Recent Requests (Synced with History Page Data structure for consistency)
    const recentRequests = [
        {
            id: 1,
            type: 'Sick Leave',
            dates: 'Oct 24 - Oct 25',
            days: 2,
            status: 'Pending',
            applied: '2 days ago',
            reason: 'Fever',
            pendingWith: 'Sarah Connor (Manager)',
            workflow: [
                { step: 'Request Submitted', by: 'Alex Johnson', role: 'Employee', time: 'Oct 22, 08:00 AM', status: 'completed', comment: 'Feeling unwell' },
                { step: 'Manager Review', by: 'Sarah Connor', role: 'Reporting Manager', time: '-', status: 'pending', comment: 'Awaiting action' }
            ]
        },
        {
            id: 2,
            type: 'Privilege Leave',
            dates: 'Sep 10 - Sep 15',
            days: 5,
            status: 'Approved',
            applied: '1 month ago',
            reason: 'Family Trip',
            pendingWith: null,
            approvedBy: 'Alex Morgan',
            workflow: [
                { step: 'Request Submitted', by: 'Alex Johnson', role: 'Employee', time: 'Sep 01, 10:00 AM', status: 'completed', comment: 'Applied for leave' },
                { step: 'Manager Review', by: 'Sarah Connor', role: 'Reporting Manager', time: 'Sep 02, 09:30 AM', status: 'completed', comment: 'Approved.' },
                { step: 'Final Approval', by: 'Alex Morgan', role: 'Head of Dept', time: 'Sep 03, 02:00 PM', status: 'completed', comment: 'Approved' }
            ]
        },
        {
            id: 3,
            type: 'Casual Leave',
            dates: 'Aug 05',
            days: 1,
            status: 'Rejected',
            applied: '2 months ago',
            reason: 'Personal work',
            pendingWith: null,
            approvedBy: 'Sarah Connor',
            workflow: [
                { step: 'Request Submitted', by: 'Alex Johnson', role: 'Employee', time: 'Aug 05, 08:00 AM', status: 'completed', comment: 'Personal work' },
                { step: 'Manager Review', by: 'Sarah Connor', role: 'Reporting Manager', time: 'Aug 05, 09:15 AM', status: 'rejected', comment: 'Short notice.' }
            ]
        },
    ];

    const upcomingLeaves = [
        { id: 1, date: 'Oct 24, 2026', type: 'Sick Leave', day: 'Saturday', duration: '2 Days' },
        { id: 2, date: 'Nov 12, 2026', type: 'Diwali', day: 'Thursday', duration: '1 Day (Holiday)' },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-100 text-emerald-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getTypeIcon = (type: string) => {
        if (type.includes('Sick')) return <Umbrella size={24} />;
        if (type.includes('Casual')) return <Coffee size={24} />;
        if (type.includes('Privilege')) return <Plane size={24} />;
        return <Briefcase size={24} />;
    };

    const getTypeColor = (type: string) => {
        if (type.includes('Sick')) return 'bg-amber-100 text-amber-600';
        if (type.includes('Casual')) return 'bg-emerald-100 text-emerald-600';
        if (type.includes('Privilege')) return 'bg-blue-100 text-blue-600';
        return 'bg-slate-100 text-slate-600';
    };

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">

            {/* RICH MODAL OVERLAY (Synced with History Page) */}
            {selectedRequest && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedRequest(null)}>
                    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/80 backdrop-blur-md sticky top-0 z-10">
                            <div>
                                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                    <History className="text-violet-500" size={24} />
                                    Request Timeline
                                </h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Ref ID: #LVE-{selectedRequest.id}00{selectedRequest.id}9X</p>
                            </div>
                            <button onClick={() => setSelectedRequest(null)} className="p-2 bg-white rounded-full shadow-sm border border-slate-100 hover:bg-slate-100 transition-colors">
                                <XCircle size={24} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Body: Workflow History */}
                        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">

                            {/* Summary Card */}
                            <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getTypeColor(selectedRequest.type)}`}>
                                            {getTypeIcon(selectedRequest.type)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-800">{selectedRequest.type}</h3>
                                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mt-1">
                                                <Calendar size={14} />
                                                {selectedRequest.dates}
                                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                {selectedRequest.days} Days
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusStyle(selectedRequest.status)}`}>
                                        {selectedRequest.status}
                                    </span>
                                </div>

                                {selectedRequest.pendingWith && (
                                    <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3 animate-pulse">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs border border-amber-200">
                                            <Clock size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Currently Pending With</p>
                                            <p className="text-sm font-bold text-slate-800">{selectedRequest.pendingWith}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Timeline Flow */}
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">Detailed Audit Log</h3>

                            <div className="relative border-l-2 border-slate-100 ml-4 space-y-10 pb-4">
                                {selectedRequest.workflow.map((node: any, idx: number) => (
                                    <div key={idx} className="relative pl-8 group">
                                        {/* Node Dot */}
                                        <div className={`
                                            absolute -left-[11px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-all
                                            ${node.status === 'completed' ? 'bg-emerald-500' : node.status === 'rejected' ? 'bg-red-500' : 'bg-slate-300'}
                                        `}>
                                            {node.status === 'completed' && <Check size={12} className="text-white" />}
                                            {node.status === 'rejected' && <XCircle size={12} className="text-white" />}
                                        </div>

                                        {/* Card */}
                                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                                    {node.step}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold border border-slate-200">
                                                        {node.by.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-600">{node.by}</p>
                                                        <p className="text-[10px] text-slate-400 font-medium uppercase">{node.role}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className={`text-xs font-bold ${node.time === '-' ? 'text-slate-300' : 'text-slate-500'}`}>
                                                    {node.time}
                                                </p>
                                                {node.comment && (
                                                    <div className="mt-2 p-2 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 italic border border-slate-100 max-w-[200px] ml-auto">
                                                        "{node.comment}"
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
                            <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-200 transition-colors" onClick={() => setSelectedRequest(null)}>
                                Close
                            </button>
                            <Link href="/dashboard/leave/history" className="px-5 py-2.5 rounded-xl bg-indigo-50 text-indigo-600 text-sm font-bold hover:bg-indigo-100 transition-colors">
                                View Full History
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Leaves</span></h1>
                    <p className="text-slate-500 font-medium text-lg">Manage your time off and view balances.</p>
                </div>

                <Link
                    href="/dashboard/leave/apply"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 rounded-2xl text-white font-bold text-sm hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 transition-all"
                >
                    <Plus size={18} /> Apply New Leave
                </Link>
            </div>

            {/* Balances Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {leaveBalances.map((item) => {
                    const Icon = item.icon;
                    const percent = (item.balance / item.total) * 100;

                    return (
                        <div key={item.id} className="group bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all relative overflow-hidden">
                            {/* Background Progress Circle (Decorative) */}
                            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity">
                                <Icon size={128} className={item.color} />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-2xl ${item.bg} bg-opacity-10 flex items-center justify-center ${item.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-black text-slate-800 block leading-none">{item.balance}</span>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Available</span>
                                    </div>
                                </div>

                                <h3 className="font-bold text-slate-700 mb-3">{item.name}</h3>

                                {/* Progress Bar */}
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${item.bg} transition-all duration-1000 ease-out`}
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs font-medium text-slate-400">
                                    <span>Used: {item.total - item.balance}</span>
                                    <span>Total: {item.total}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Upcoming Leaves & Plan */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                        {/* Deco */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px]"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                                <Calendar className="text-violet-400" /> Upcoming
                            </h2>

                            {upcomingLeaves.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingLeaves.map((leave, idx) => (
                                        <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-sm flex gap-4 items-center">
                                            <div className="flex flex-col items-center justify-center w-12 h-12 bg-white/10 rounded-xl text-center">
                                                <span className="text-[10px] font-bold uppercase opacity-60">{leave.date.split(' ')[0]}</span>
                                                <span className="text-lg font-black">{leave.date.split(' ')[1].replace(',', '')}</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-sm">{leave.type}</p>
                                                <p className="text-xs font-medium text-slate-400">{leave.day} • {leave.duration}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 opacity-50">
                                    <p className="text-sm">No upcoming leaves scheduled.</p>
                                </div>
                            )}

                            <Link href="/dashboard/leave/holidays" className="mt-8 flex items-center justify-betweenw-full py-4 px-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors text-sm font-bold text-slate-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                                        <ArrowUpRight size={16} />
                                    </div>
                                    <span>Plan your next holiday</span>
                                </div>
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent History Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Recent Requests</h3>
                                <p className="text-sm text-slate-400">Click on any request to view details.</p>
                            </div>
                            <Link href="/dashboard/leave/history" className="text-sm font-bold text-violet-600 hover:text-violet-800 flex items-center gap-1 transition-colors">
                                View All History <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50/50">
                                    <tr className="text-left">
                                        <th className="py-5 px-8 text-xs font-bold text-slate-400 uppercase tracking-wider">Leave Type</th>
                                        <th className="py-5 px-8 text-xs font-bold text-slate-400 uppercase tracking-wider">Dates</th>
                                        <th className="py-5 px-8 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="py-5 px-8 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {recentRequests.map((item) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => setSelectedRequest(item)}
                                            className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                                        >
                                            <td className="py-5 px-8">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-bold text-slate-700">{item.type}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-8">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-700">{item.dates}</span>
                                                    <span className="text-xs text-slate-400 font-medium">{item.days} Day{item.days > 1 ? 's' : ''}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-8">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(item.status)}`}>
                                                    {item.status === 'Approved' && <CheckCircle2 size={12} />}
                                                    {item.status === 'Rejected' && <XCircle size={12} />}
                                                    {item.status === 'Pending' && <Clock size={12} />}
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-5 px-8 text-right">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedRequest(item);
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all border border-transparent hover:border-indigo-100 hover:shadow-sm relative z-10"
                                                >
                                                    <MoreHorizontal size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Graphic */}
                        <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 opacity-20"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
