"use client";

import React, { useState } from 'react';
import {
    ArrowLeft,
    Search,
    Download,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    Clock,
    Plane,
    Umbrella,
    Coffee,
    Briefcase,
    Check,
    History,
    Calendar,
    User
} from 'lucide-react';
import Link from 'next/link';

export default function LeaveHistoryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

    // Enhanced Mock Data
    const historyData = [
        {
            id: 1,
            type: 'Privilege Leave',
            dates: 'Oct 24 - Oct 28, 2026',
            days: 5,
            status: 'Approved',
            requestedOn: 'Oct 10, 2026',
            approvedBy: 'Alex Morgan',
            reason: 'Family vacation to Bali',
            pendingWith: null,
            workflow: [
                { step: 'Request Submitted', by: 'Alex Johnson', role: 'Employee', time: 'Oct 10, 10:00 AM', status: 'completed', comment: 'Applied for leave' },
                { step: 'Manager Review', by: 'Sarah Connor', role: 'Reporting Manager', time: 'Oct 11, 09:30 AM', status: 'completed', comment: 'Approved. Enjoy your trip!' },
                { step: 'HR Validation', by: 'System', role: 'Automated', time: 'Oct 11, 09:31 AM', status: 'completed', comment: 'Balance deducted.' },
                { step: 'Final Approval', by: 'Alex Morgan', role: 'Head of Dept', time: 'Oct 12, 02:00 PM', status: 'completed', comment: 'Approved' }
            ]
        },
        {
            id: 2,
            type: 'Sick Leave',
            dates: 'Sep 12, 2026',
            days: 1,
            status: 'Rejected',
            requestedOn: 'Sep 12, 2026',
            approvedBy: 'Sarah Connor',
            reason: 'Viral Fever',
            pendingWith: null,
            workflow: [
                { step: 'Request Submitted', by: 'Alex Johnson', role: 'Employee', time: 'Sep 12, 08:00 AM', status: 'completed', comment: 'Feeling unwell' },
                { step: 'Manager Review', by: 'Sarah Connor', role: 'Reporting Manager', time: 'Sep 12, 09:15 AM', status: 'rejected', comment: 'Please inform before 9 AM next time. Rejected for late notice.' }
            ]
        },
        {
            id: 3,
            type: 'Casual Leave',
            dates: 'Aug 05, 2026',
            days: 1,
            status: 'Pending',
            requestedOn: 'Aug 01, 2026',
            approvedBy: '-',
            reason: 'Personal work at bank',
            pendingWith: 'Sarah Connor (Manager)',
            workflow: [
                { step: 'Request Submitted', by: 'Alex Johnson', role: 'Employee', time: 'Aug 01, 10:00 AM', status: 'completed', comment: '' },
                { step: 'Manager Review', by: 'Sarah Connor', role: 'Reporting Manager', time: '-', status: 'pending', comment: 'Awaiting action' }
            ]
        },
        {
            id: 4,
            type: 'Sick Leave',
            dates: 'Jul 20 - Jul 21, 2026',
            days: 2,
            status: 'Approved',
            requestedOn: 'Jul 20, 2026',
            approvedBy: 'Sarah Connor',
            reason: 'Migraine',
            pendingWith: null,
            workflow: [
                { step: 'Request Submitted', by: 'Alex Johnson', role: 'Employee', time: 'Jul 20, 09:00 AM', status: 'completed', comment: 'Migraine start' },
                { step: 'Manager Review', by: 'Sarah Connor', role: 'Reporting Manager', time: 'Jul 20, 09:30 AM', status: 'completed', comment: 'Get well soon.' }
            ]
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-emerald-100 text-emerald-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const getTypeIcon = (type: string) => {
        if (type.includes('Sick')) return <Umbrella size={18} />;
        if (type.includes('Casual')) return <Coffee size={18} />;
        if (type.includes('Comp')) return <Briefcase size={18} />;
        return <Plane size={18} />;
    };

    const getTypeColor = (type: string) => {
        if (type.includes('Sick')) return 'bg-amber-100 text-amber-600';
        if (type.includes('Casual')) return 'bg-emerald-100 text-emerald-600';
        if (type.includes('Comp')) return 'bg-purple-100 text-purple-600';
        return 'bg-blue-100 text-blue-600';
    };

    const filteredData = historyData.filter(item =>
        (statusFilter === 'All' || item.status === statusFilter) &&
        (item.type.toLowerCase().includes(searchTerm.toLowerCase()) || item.reason.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleRowClick = (item: any) => {
        setSelectedRequest(item);
    };

    return (
        <div className="min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">

            {/* Modal Overlay for Detailed History */}
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
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(selectedRequest.status)}`}>
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
                            {selectedRequest.status === 'Pending' && (
                                <button className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-colors">
                                    Withdraw Request
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <Link href="/dashboard/my-portal/leaves" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors mb-2">
                        <ArrowLeft size={16} /> Back to My Leaves
                    </Link>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Leave History</h1>
                    <p className="text-slate-500 font-medium">Click on any request or the actions menu to view full audit logs.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm">
                        <Download size={18} /> Export
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by type or reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['All', 'Approved', 'Pending', 'Rejected'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${statusFilter === status
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                                : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50/50">
                            <tr className="text-left">
                                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Leave Type</th>
                                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Applied On</th>
                                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Approver</th>
                                <th className="py-5 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredData.map((item) => (
                                <tr
                                    key={item.id}
                                    onClick={() => handleRowClick(item)}
                                    className="group hover:bg-slate-50/80 transition-colors cursor-pointer"
                                >
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(item.type)}`}>
                                                {getTypeIcon(item.type)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{item.type}</p>
                                                <p className="text-xs text-slate-500 font-medium">{item.reason}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-700 text-sm">{item.dates}</span>
                                            <span className="text-xs font-bold text-slate-400">{item.days} Day{item.days > 1 ? 's' : ''}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <span className="text-sm font-medium text-slate-600">{item.requestedOn}</span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(item.status)}`}>
                                            {item.status === 'Approved' && <CheckCircle size={12} />}
                                            {item.status === 'Rejected' && <XCircle size={12} />}
                                            {item.status === 'Pending' && <Clock size={12} />}
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 border border-indigo-200">
                                                {item.approvedBy.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-sm font-medium text-slate-600">{item.approvedBy}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering row click twice
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

                {filteredData.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="text-slate-300" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">No records found</h3>
                        <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
