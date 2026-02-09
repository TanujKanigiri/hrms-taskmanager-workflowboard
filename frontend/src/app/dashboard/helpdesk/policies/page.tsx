'use client';

import React from 'react';
import {
    FileText,
    Download,
    Eye,
    ShieldCheck,
    Users,
    Briefcase,
    Calendar,
    ChevronDown
} from 'lucide-react';

export default function PoliciesPage() {

    const policyGroups = [
        {
            title: 'Employment & Conduct',
            icon: ShieldCheck,
            color: 'text-indigo-500 bg-indigo-50',
            docs: [
                { name: 'Employee Code of Conduct', size: '2.4 MB', updated: 'Jan 2026' },
                { name: 'Anti-Harassment Policy', size: '1.1 MB', updated: 'Dec 2025' },
                { name: 'Data Privacy & Security', size: '3.5 MB', updated: 'Jan 2026' },
            ]
        },
        {
            title: 'Benefits & Compensation',
            icon: Briefcase,
            color: 'text-emerald-500 bg-emerald-50',
            docs: [
                { name: 'Health Insurance Guide 2026', size: '5.2 MB', updated: 'Jan 2026' },
                { name: 'Reimbursement Guidelines', size: '1.8 MB', updated: 'Nov 2025' },
                { name: 'Stock Options (ESOP) Plan', size: '4.0 MB', updated: 'Oct 2025' },
            ]
        },
        {
            title: 'Leave & Attendance',
            icon: Calendar,
            color: 'text-amber-500 bg-amber-50',
            docs: [
                { name: 'Global Leave Policy', size: '2.1 MB', updated: 'Jan 2026' },
                { name: 'Remote Work Guidelines', size: '1.5 MB', updated: 'Dec 2025' },
            ]
        }
    ];

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Company <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">Policies</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Official guidelines and compliance documents.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all">
                    Latest Updates <ChevronDown size={16} />
                </button>
            </div>

            {/* Policy Groups */}
            <div className="space-y-8">
                {policyGroups.map((group, idx) => (
                    <div key={idx} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${group.color}`}>
                                <group.icon size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">{group.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.docs.map((doc, docIdx) => (
                                <div key={docIdx} className="group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                        <button className="p-2 bg-white rounded-lg text-slate-600 hover:text-indigo-600 shadow-sm">
                                            <Eye size={16} />
                                        </button>
                                        <button className="p-2 bg-white rounded-lg text-slate-600 hover:text-indigo-600 shadow-sm">
                                            <Download size={16} />
                                        </button>
                                    </div>

                                    <div className="w-10 h-10 mb-4 text-slate-400 group-hover:text-indigo-500 transition-colors">
                                        <FileText size={40} strokeWidth={1.5} />
                                    </div>

                                    <h3 className="font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-700 transition-colors pr-8">{doc.name}</h3>

                                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 mt-4 pt-4 border-t border-slate-200 group-hover:border-indigo-100">
                                        <span>PDF • {doc.size}</span>
                                        <span className="bg-white px-2 py-1 rounded-md border border-slate-100">Updated {doc.updated}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
