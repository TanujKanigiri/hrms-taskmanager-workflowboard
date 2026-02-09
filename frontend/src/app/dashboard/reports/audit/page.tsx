'use client';

import React, { useState } from 'react';
import {
    Search,
    Shield,
    Filter,
    Download,
    Clock,
    User,
    Globe,
    AlertTriangle,
    CheckCircle2,
    FileKey,
    Lock,
    X,
    Save,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Eye
} from 'lucide-react';

export default function AuditLogsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [riskFilter, setRiskFilter] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAlert, setShowAlert] = useState(true);

    const logs = [
        { id: 'LOG-8821', actor: 'Admin User', action: 'Modified Payroll Settings', target: 'Tax Configuration', ip: '192.168.1.42', location: 'New York, US', time: '10 mins ago', status: 'Success', risk: 'Medium' },
        { id: 'LOG-8820', actor: 'System', action: 'Scheduled Backup', target: 'Database', ip: 'Localhost', location: 'Server US-East', time: '1 hour ago', status: 'Success', risk: 'Low' },
        { id: 'LOG-8819', actor: 'Sarah Wilson', action: 'Failed Login Attempt', target: 'Auth Portal', ip: '45.22.19.112', location: 'London, UK', time: '2 hours ago', status: 'Failed', risk: 'High' },
        { id: 'LOG-8818', actor: 'Admin User', action: 'Exported Employee Data', target: 'CSV Report', ip: '192.168.1.42', location: 'New York, US', time: '5 hours ago', status: 'Success', risk: 'Medium' },
        { id: 'LOG-8817', actor: 'Mike Chen', action: 'Approved Leave Request', target: 'L-2023-001', ip: '10.0.0.5', location: 'Remote VPN', time: 'Yesterday', status: 'Success', risk: 'Low' },
        { id: 'LOG-8816', actor: 'System', action: 'Firewall Rule Updated', target: 'Network Sec', ip: '192.168.1.1', location: 'Server US-West', time: 'Yesterday', status: 'Success', risk: 'High' },
    ];

    const filteredLogs = logs.filter(log => {
        const matchesSearch =
            log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.ip.includes(searchQuery);
        const matchesRisk = riskFilter === 'All' || log.risk === riskFilter;
        return matchesSearch && matchesRisk;
    });

    const handleExport = () => {
        alert("Generating Audit Report (CSV)... Download will start shortly.");
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'High': return 'text-red-600 bg-red-100 border-red-200';
            case 'Medium': return 'text-amber-600 bg-amber-100 border-amber-200';
            default: return 'text-emerald-600 bg-emerald-100 border-emerald-200';
        }
    };

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Audit <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">Logs</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Tracks system activity for security and compliance.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setShowSettingsModal(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all text-sm shadow-lg shadow-slate-900/20">
                        <Shield size={16} /> Security Settings
                    </button>
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm">
                        <Download size={16} /> Export Logs
                    </button>
                </div>
            </div>

            {/* --- SETTINGS MODAL --- */}
            {showSettingsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSettingsModal(false)}></div>
                    <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-900">Security Configuration</h2>
                            <button onClick={() => setShowSettingsModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-900">Log Retention Policy</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-slate-900 outline-none">
                                    <option>30 Days</option>
                                    <option>90 Days (Compliance)</option>
                                    <option>1 Year</option>
                                    <option>Indefinite</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-900">Alert Thresholds</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                                        <input type="checkbox" defaultChecked className="w-5 h-5 text-slate-900 rounded focus:ring-0" />
                                        <span className="text-sm font-medium text-slate-600">Failed Login Attempts (3+)</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                                        <input type="checkbox" defaultChecked className="w-5 h-5 text-slate-900 rounded focus:ring-0" />
                                        <span className="text-sm font-medium text-slate-600">High Risk Actions (Deletion/Export)</span>
                                    </label>
                                </div>
                            </div>
                            <button onClick={() => { alert("Settings Saved"); setShowSettingsModal(false); }} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                <Save size={18} /> Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Security Alert Banner */}
            {showAlert && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                        <AlertTriangle size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-red-900">Security Alert: Unusual Login Detected</h3>
                            <button onClick={() => setShowAlert(false)} className="text-red-400 hover:text-red-700 font-bold text-xs bg-white/50 px-2 py-1 rounded">Dismiss</button>
                        </div>
                        <p className="text-sm font-medium text-red-700 mt-1">Multiple failed login attempts from IP 45.22.19.112 (London, UK) were blocked 2 hours ago. Please review.</p>
                        <button className="mt-3 text-xs font-bold bg-white text-red-600 px-3 py-1.5 rounded-lg border border-red-200 shadow-sm hover:bg-red-50">Review Incident</button>
                    </div>
                </div>
            )}

            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Actor, Action, or IP..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-slate-200 font-mono"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all">
                        <CalendarIcon size={16} /> Date Range
                    </button>
                    <div className="relative">
                        <select
                            value={riskFilter}
                            onChange={(e) => setRiskFilter(e.target.value)}
                            className="appearance-none pl-10 pr-8 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all focus:outline-none cursor-pointer"
                        >
                            <option value="All">All Risks</option>
                            <option value="High">High Risk</option>
                            <option value="Medium">Medium Risk</option>
                            <option value="Low">Low Risk</option>
                        </select>
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Log ID</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Actor</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">Risk Score</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-mono text-xs font-bold text-slate-400">#{log.id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                                {log.actor.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-700 text-sm">{log.actor}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {log.status === 'Success' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <AlertTriangle size={16} className="text-red-500" />}
                                            <span className="font-bold text-slate-900 text-sm">{log.action}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-600 flex items-center gap-1"><FileKey size={12} /> {log.target}</span>
                                            <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-0.5"><Globe size={10} /> {log.ip} • {log.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold border ${getRiskColor(log.risk)}`}>
                                            <Shield size={12} className="mr-1" /> {log.risk}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-1 text-slate-500 text-xs font-bold">
                                            <Clock size={12} /> {log.time}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredLogs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-slate-400 font-medium">No logs matches your search criteria.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Showing {filteredLogs.length} results</span>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="flex items-center px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={14} /> Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="flex items-center px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Next <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
