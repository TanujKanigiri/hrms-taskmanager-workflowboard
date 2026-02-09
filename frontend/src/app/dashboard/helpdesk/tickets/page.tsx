'use client';

import React, { useState } from 'react';
import {
    MessageSquare,
    Plus,
    Search,
    Filter,
    Clock,
    AlertCircle,
    CheckCircle2,
    MoreHorizontal,
    Paperclip,
    Send,
    X,
    ChevronDown,
    User,
    LifeBuoy
} from 'lucide-react';

export default function TicketsPage() {
    const [view, setView] = useState<'list' | 'kanban'>('list');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);

    // Mock Tickets
    const initialTickets = [
        { id: 'T-1024', subject: 'Laptop battery draining fast', category: 'IT Hardware', priority: 'Medium', status: 'In Progress', created: '2 days ago', sla: '4h 15m', lastReply: 'IT Support' },
        { id: 'T-1029', subject: 'Salary slip for Sept not visible', category: 'Payroll', priority: 'High', status: 'Open', created: '1 hour ago', sla: '1h 30m', lastReply: 'You' },
        { id: 'T-0092', subject: 'Access to Figma Project', category: 'Access Request', priority: 'Low', status: 'Resolved', created: '1 week ago', sla: '-', lastReply: 'Manager' },
        { id: 'T-1033', subject: 'VPN Connection Error 404', category: 'IT Network', priority: 'Critical', status: 'Open', created: '10 mins ago', sla: '30m', lastReply: 'You' },
    ];

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'Critical': return 'text-red-500 bg-red-50 border-red-100';
            case 'High': return 'text-orange-500 bg-orange-50 border-orange-100';
            case 'Medium': return 'text-blue-500 bg-blue-50 border-blue-100';
            default: return 'text-slate-500 bg-slate-50 border-slate-100';
        }
    };

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'Open': return 'bg-blue-500';
            case 'In Progress': return 'bg-amber-500';
            case 'Resolved': return 'bg-emerald-500';
            default: return 'bg-slate-500';
        }
    };

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Tickets</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Manage your support requests and track progress.</p>
                </div>
                <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95">
                    <Plus size={20} /> Raise New Ticket
                </button>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search ticket ID or subject..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-200"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all">
                        <Filter size={16} /> Filter
                    </button>
                </div>
            </div>

            {/* Ticket List */}
            <div className="grid grid-cols-1 gap-4">
                {initialTickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(ticket.status)}`}></div>

                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-mono text-xs font-bold text-slate-400">#{ticket.id}</span>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getPriorityColor(ticket.priority)}`}>
                                        {ticket.priority}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">
                                        {ticket.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{ticket.subject}</h3>
                            </div>

                            <div className="flex items-center gap-6 text-right">
                                <div className="hidden md:block">
                                    <p className="text-xs font-bold text-slate-400 mb-1">Status</p>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(ticket.status)}`}>
                                        {ticket.status === 'Resolved' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                        {ticket.status}
                                    </span>
                                </div>
                                <div className="min-w-[100px]">
                                    <p className="text-xs font-bold text-slate-400 mb-1">SLA Limit</p>
                                    <p className={`text-sm font-black ${ticket.sla === '-' ? 'text-slate-300' : 'text-slate-700'}`}>{ticket.sla}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                    <MoreHorizontal size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MODALS --- */}

            {/* Create Ticket Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300 overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-slate-900">Raise New Ticket</h2>
                            <button onClick={() => setShowCreateModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400">
                                            <option>IT Hardware</option>
                                            <option>Software / Access</option>
                                            <option>Payroll / Finance</option>
                                            <option>HR Policy</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Priority</label>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400">
                                            <option>Low (General Query)</option>
                                            <option>Medium (Work Impacted)</option>
                                            <option>High (Work Stopped)</option>
                                            <option>Critical (System Down)</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Subject</label>
                                <input type="text" placeholder="Brief summary of the issue..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
                                <textarea className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" placeholder="Please provide detailed steps to reproduce..."></textarea>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
                                    <Paperclip size={16} /> Attach Screenshot
                                </button>
                                <p className="text-xs font-medium text-slate-400">Max 5MB (JPG, PNG, PDF)</p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                                <button onClick={() => setShowCreateModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50">Cancel</button>
                                <button onClick={() => { alert("Ticket Created!"); setShowCreateModal(false); }} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg active:scale-95 transition-all">
                                    Submit Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ticket Details Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedTicket(null)}></div>
                    <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
                        {/* Header */}
                        <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-mono text-sm font-bold text-slate-400">#{selectedTicket.id}</span>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getPriorityColor(selectedTicket.priority)}`}>
                                        {selectedTicket.priority}
                                    </span>
                                </div>
                                <h2 className="text-xl font-black text-slate-900">{selectedTicket.subject}</h2>
                            </div>
                            <button onClick={() => setSelectedTicket(null)} className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat / Timeline Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar">
                            {/* Original Request */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                    <User size={20} />
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="font-bold text-slate-900">You</span>
                                        <span className="text-xs font-medium text-slate-400">{selectedTicket.created}</span>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none text-slate-700 text-sm leading-relaxed border border-slate-100">
                                        <p>Hi, I am facing issues with...</p>
                                    </div>
                                </div>
                            </div>

                            {/* Support Reply */}
                            <div className="flex gap-4 flex-row-reverse">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold shrink-0">
                                    <LifeBuoy size={20} />
                                </div>
                                <div className="text-right">
                                    <div className="flex items-baseline gap-2 mb-1 justify-end">
                                        <span className="text-xs font-medium text-slate-400">10 mins ago</span>
                                        <span className="font-bold text-slate-900">Zentra Support</span>
                                    </div>
                                    <div className="bg-amber-50 p-4 rounded-2xl rounded-tr-none text-slate-800 text-sm leading-relaxed border border-amber-100 text-left">
                                        <p>Thank you for reaching out. Could you please provide the specific error code you are seeing? We have assigned this to a technician.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Reply Box */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="relative">
                                <input type="text" placeholder="Type your reply..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-14 py-4 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400" />
                                <button className="absolute right-2 top-2 p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
