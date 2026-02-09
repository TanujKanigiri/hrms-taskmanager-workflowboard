"use client";

import React, { useState, useEffect, useRef } from 'react';
import AttendanceWidget from '@/components/dashboard/AttendanceWidget';
import {
    Calendar,
    Clock,
    MapPin,
    MoreHorizontal,
    ArrowRight,
    ChevronDown,
    Filter,
    Download,
    Edit3,
    AlertCircle,
    FileText,
    Coffee,
    X,
    CheckCircle2,
    Save
} from 'lucide-react';

export default function AttendancePage() {
    const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
    const [activeMenuId, setActiveMenuId] = useState<number | string | null>(null);
    const [modalConfig, setModalConfig] = useState<{ type: 'regularize' | 'breaks' | null, record: any | null }>({ type: null, record: null });
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenuId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Mock Data - Daily
    const dailyData = [
        { id: 1, date: 'Today, Oct 24', checkIn: '09:00 AM', checkOut: '--:--', total: '4h 30m', status: 'Active', location: 'Office', breaks: [{ start: '01:00 PM', end: '01:30 PM', duration: '30m' }] },
        { id: 2, date: 'Yesterday, Oct 23', checkIn: '08:55 AM', checkOut: '06:10 PM', total: '9h 15m', status: 'Completed', location: 'Office', breaks: [{ start: '01:00 PM', end: '01:45 PM', duration: '45m' }, { start: '04:00 PM', end: '04:15 PM', duration: '15m' }] },
        { id: 3, date: 'Oct 22, 2026', checkIn: '09:10 AM', checkOut: '06:00 PM', total: '8h 50m', status: 'Late', location: 'Remote', breaks: [] },
        { id: 4, date: 'Oct 21, 2026', checkIn: '09:00 AM', checkOut: '05:30 PM', total: '8h 30m', status: 'Completed', location: 'Office', breaks: [{ start: '01:30 PM', end: '02:00 PM', duration: '30m' }] },
        { id: 5, date: 'Oct 20, 2026', checkIn: '08:45 AM', checkOut: '06:15 PM', total: '9h 30m', status: 'Overtime', location: 'Office', breaks: [{ start: '01:00 PM', end: '01:30 PM', duration: '30m' }] },
    ];

    // Mock Data - Weekly
    const weeklyData = [
        { id: 'w1', range: 'Oct 18 - Oct 24', totalHours: '42h 15m', avgDaily: '8h 25m', status: 'On Track', daysWorked: 5 },
        { id: 'w2', range: 'Oct 11 - Oct 17', totalHours: '38h 00m', avgDaily: '7h 36m', status: 'Shortage', daysWorked: 5 },
        { id: 'w3', range: 'Oct 04 - Oct 10', totalHours: '45h 30m', avgDaily: '9h 06m', status: 'Overtime', daysWorked: 5 },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Active':
            case 'On Track': return 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20';
            case 'Completed': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
            case 'Late':
            case 'Shortage': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            case 'Overtime': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
            default: return 'bg-slate-800 text-slate-400 border-slate-700';
        }
    };

    const handleAction = (type: 'regularize' | 'breaks', record: any) => {
        setModalConfig({ type, record });
        setActiveMenuId(null);
    };

    // EXPORT FUNCTIONALITY
    const handleExport = () => {
        const dataToExport = viewMode === 'day' ? dailyData : weeklyData;
        const headers = viewMode === 'day'
            ? ['ID', 'Date', 'Check In', 'Check Out', 'Total', 'Status', 'Location']
            : ['ID', 'Range', 'Total Hours', 'Avg Daily', 'Status', 'Days Worked'];

        const csvContent = [
            headers.join(','),
            ...dataToExport.map(row => Object.values(row).filter(x => typeof x !== 'object').join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `attendance_report_${viewMode}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">

            {/* MODALS */}
            {modalConfig.type && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setModalConfig({ type: null, record: null })}>
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                    {modalConfig.type === 'regularize' ? <Edit3 className="text-violet-500" size={24} /> : <Coffee className="text-amber-500" size={24} />}
                                    {modalConfig.type === 'regularize' ? 'Regularize Attendance' : 'Break Logs'}
                                </h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                                    {modalConfig.record?.date || modalConfig.record?.range || 'Selected Range'}
                                </p>
                            </div>
                            <button onClick={() => setModalConfig({ type: null, record: null })} className="p-2 bg-white rounded-full shadow-sm border border-slate-100 hover:bg-slate-100 transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            {modalConfig.type === 'regularize' ? (
                                <div className="space-y-6">
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-700 flex gap-3">
                                        <AlertCircle size={20} className="shrink-0" />
                                        <p>You are requesting to modify the punch timings. This request will be sent to your manager for approval.</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Check In</label>
                                            <input type="time" defaultValue={modalConfig.record?.checkIn.includes('AM') ? '09:00' : '09:00'} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-slate-800" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Check Out</label>
                                            <input type="time" defaultValue="18:00" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-slate-800" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Reason</label>
                                        <textarea placeholder="e.g. Forgot ID card, biometric issue..." rows={3} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-medium text-slate-800 resize-none"></textarea>
                                    </div>
                                    <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                        <Save size={18} /> Submit Request
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {modalConfig.record?.breaks && modalConfig.record.breaks.length > 0 ? (
                                        <>
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="font-bold text-slate-700">Recorded Breaks</h3>
                                                <span className="text-xs font-bold bg-amber-100 text-amber-600 px-2 py-1 rounded-md">
                                                    Total: {modalConfig.record?.breaks.reduce((acc: any, curr: any) => acc + parseInt(curr.duration), 0)}m
                                                </span>
                                            </div>
                                            <div className="relative border-l-2 border-slate-100 ml-2 space-y-6">
                                                {modalConfig.record.breaks.map((brk: any, idx: number) => (
                                                    <div key={idx} className="relative pl-6">
                                                        <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-white"></div>
                                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                                                            <div>
                                                                <p className="text-xs font-bold text-slate-400 uppercase">Break Time</p>
                                                                <p className="text-sm font-bold text-slate-800">{brk.start} - {brk.end}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xs font-bold text-slate-400 uppercase">Duration</p>
                                                                <p className="text-sm font-black text-amber-600">{brk.duration}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8 text-slate-400">
                                            <Coffee size={32} className="mx-auto mb-2 opacity-50" />
                                            <p className="text-sm font-medium">No breaks recorded for this day.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Attendance</span></h1>
                    <p className="text-slate-500 font-medium text-lg">Track your work hours, shifts, and productivity.</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm active:scale-95"
                    >
                        <Download size={18} /> Export Report
                    </button>
                    <div className="bg-slate-100 p-1 rounded-xl flex">
                        <button
                            onClick={() => setViewMode('day')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'day' ? 'bg-white text-slate-900 border border-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Daily
                        </button>
                        <button
                            onClick={() => setViewMode('week')}
                            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${viewMode === 'week' ? 'bg-white text-slate-900 border border-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Weekly
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Attendance Widget (Punch In/Out) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <AttendanceWidget />

                        {/* Mini Stats below widget */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Avg. Hours</p>
                                <p className="text-xl font-black text-slate-800">8h 45m</p>
                                <p className="text-xs font-bold text-emerald-500 mt-1 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> +5% vs last week
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">On-Time</p>
                                <p className="text-xl font-black text-slate-800">95%</p>
                                <p className="text-xs font-bold text-slate-400 mt-1">Arrival Rate</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col: Timesheet / Logs */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Shift Info Card */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Clock size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest mb-4">
                                <Calendar size={14} /> Current Shift
                            </div>
                            <h2 className="text-3xl font-bold mb-1">General Morning Shift</h2>
                            <p className="text-slate-400 font-medium mb-6">09:00 AM - 06:00 PM • Mon-Fri</p>

                            <div className="flex gap-8">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Reporting Manager</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold">JD</div>
                                        <span className="font-bold">John Doe</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-cyan-400" />
                                        <span className="font-bold">Headquarters, NY</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Log / Timesheet */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-800">
                                {viewMode === 'day' ? 'Daily Activity Log' : 'Weekly Summary'}
                            </h3>
                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                <Filter size={20} />
                            </button>
                        </div>

                        <div className="overflow-x-auto pb-20">
                            <table className="w-full">
                                <thead className="bg-slate-50/50">
                                    <tr className="text-left">
                                        {viewMode === 'day' ? (
                                            <>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Check In</th>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Check Out</th>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Hours</th>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Week Range</th>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Days Worked</th>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Daily</th>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Hours</th>
                                                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                            </>
                                        )}
                                        <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {(viewMode === 'day' ? dailyData : weeklyData).map((item) => (
                                        <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors relative">
                                            {viewMode === 'day' ? (
                                                <>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                                                                {(item as any).date.split(',')[0].slice(0, 3)}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-800 text-sm">{(item as any).date}</p>
                                                                <p className="text-xs text-slate-400 font-medium">{(item as any).location}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 font-bold text-slate-700 text-sm">{(item as any).checkIn}</td>
                                                    <td className="py-4 px-6 font-bold text-slate-700 text-sm">{(item as any).checkOut}</td>
                                                    <td className="py-4 px-6 font-mono text-sm font-medium text-slate-600">{(item as any).total}</td>
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle((item as any).status)}`}>
                                                            {(item as any).status}
                                                        </span>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="py-4 px-6 font-bold text-slate-800 text-sm">{(item as any).range}</td>
                                                    <td className="py-4 px-6 font-medium text-slate-600">{(item as any).daysWorked} Days</td>
                                                    <td className="py-4 px-6 font-medium text-slate-600">{(item as any).avgDaily}</td>
                                                    <td className="py-4 px-6 font-black text-slate-800">{(item as any).totalHours}</td>
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle((item as any).status)}`}>
                                                            {(item as any).status}
                                                        </span>
                                                    </td>
                                                </>
                                            )}

                                            <td className="py-4 px-6 text-right relative">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveMenuId(activeMenuId === item.id ? null : item.id);
                                                    }}
                                                    className={`p-2 transition-all rounded-lg ${activeMenuId === item.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'}`}
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>

                                                {/* POPUP MENU */}
                                                {activeMenuId === item.id && (
                                                    <div
                                                        ref={menuRef}
                                                        className="absolute right-8 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 animate-in zoom-in-95 duration-200 overflow-hidden"
                                                    >
                                                        {viewMode === 'day' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => handleAction('regularize', item)}
                                                                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2 border-b border-slate-50"
                                                                >
                                                                    <Edit3 size={14} className="text-blue-500" /> Regularize
                                                                </button>
                                                                <button
                                                                    onClick={() => handleAction('breaks', item)}
                                                                    className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2 border-b border-slate-50"
                                                                >
                                                                    <Coffee size={14} className="text-amber-500" /> View Breaks
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2 border-b border-slate-50"
                                                            >
                                                                <FileText size={14} className="text-slate-400" /> View Details
                                                            </button>
                                                        )}
                                                        <button
                                                            className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                                        >
                                                            <AlertCircle size={14} className="text-red-500" /> Report Issue
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
