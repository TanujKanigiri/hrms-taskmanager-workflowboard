"use client";

import React, { useState } from 'react';
import {
    Save,
    Settings,
    Calendar,
    Briefcase,
    Building2,
    Shield,
    CreditCard,
    ToggleLeft,
    ToggleRight,
    HelpCircle,
    Sliders,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

export default function PayrollSettingsPage() {
    const [activeTab, setActiveTab] = useState<'general' | 'components' | 'statutory'>('general');

    // Mock State for Settings
    const [config, setConfig] = useState({
        payDay: 31,
        cutoffDay: 25,
        isAutoRelease: false,
        basicPercent: 40,
        hraPercent: 20,
        specialPercent: 30,
        pfEnabled: true,
        pfFixedAmount: 3600,
        ptEnabled: true,
        companyBank: 'HDFC Bank',
        accountNo: 'XXXX-XXXX-9988'
    });

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payroll Configuration</h1>
                    <p className="text-slate-500 font-medium mt-1">Define salary structures, payout schedules, and compliance rules.</p>
                </div>
                <button
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg hover:scale-[1.02]"
                >
                    <Save size={18} />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* Sidebar Navigation */}
                <div className="xl:col-span-3">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sticky top-6">
                        <nav className="space-y-1">
                            {[
                                { id: 'general', label: 'General & Schedule', icon: Calendar },
                                { id: 'components', label: 'Salary Components', icon: Sliders },
                                { id: 'statutory', label: 'Statutory & Compliance', icon: Shield },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${activeTab === item.id ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <HelpCircle size={16} /> Need Help?
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Changing these settings will affect future payroll runs. Historical data remains unchanged.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="xl:col-span-9 space-y-6">

                    {/* --- GENERAL SETTINGS --- */}
                    {activeTab === 'general' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">

                            {/* Schedule Card */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Calendar size={24} /></div>
                                    Payout Schedule
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-500 uppercase mb-3">Payroll Cut-off Date</label>
                                        <div className="relative">
                                            <select
                                                value={config.cutoffDay}
                                                onChange={(e) => setConfig({ ...config, cutoffDay: Number(e.target.value) })}
                                                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {[20, 21, 22, 23, 24, 25, 26, 27, 28].map(d => <option key={d} value={d}>Day {d} of the month</option>)}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">▼</div>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">Attendance and claims are locked after this date.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-500 uppercase mb-3">Salary Payout Date</label>
                                        <div className="relative">
                                            <select
                                                value={config.payDay}
                                                onChange={(e) => setConfig({ ...config, payDay: Number(e.target.value) })}
                                                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value={30}>30th of the month</option>
                                                <option value={31}>Last day of the month</option>
                                                <option value={1}>1st of next month</option>
                                                <option value={5}>5th of next month</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">▼</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-slate-900">Auto-Release Payslips</h4>
                                        <p className="text-sm text-slate-500">Automatically email payslips on payout date.</p>
                                    </div>
                                    <button
                                        onClick={() => setConfig({ ...config, isAutoRelease: !config.isAutoRelease })}
                                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${config.isAutoRelease ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${config.isAutoRelease ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>
                            </div>

                            {/* Bank Config */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Building2 size={24} /></div>
                                    Company Bank Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Bank Name</label>
                                        <input type="text" value={config.companyBank} onChange={(e) => setConfig({ ...config, companyBank: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-500 uppercase mb-2">Debit Account Number</label>
                                        <input type="text" value={config.accountNo} onChange={(e) => setConfig({ ...config, accountNo: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500" />
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-sm text-blue-700">
                                    <AlertCircle size={18} className="shrink-0" />
                                    This account will be listed as the 'Debit Account' in the Bank Advice CSV file.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- COMPONENTS SETTINGS --- */}
                    {activeTab === 'components' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-3">
                                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Sliders size={24} /></div>
                                            Salary Structure
                                        </h3>
                                        <p className="text-slate-500">Define how the CTC is split into components.</p>
                                    </div>
                                    {/* Visual Pie */}
                                    <div className="flex gap-1 h-3 w-48 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${config.basicPercent}%` }} title="Basic"></div>
                                        <div className="h-full bg-purple-500" style={{ width: `${config.hraPercent}%` }} title="HRA"></div>
                                        <div className="h-full bg-amber-500 flex-1" title="Special"></div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {/* Basic */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="font-bold text-slate-700">Basic Salary (%)</label>
                                            <span className="font-black text-blue-600">{config.basicPercent}%</span>
                                        </div>
                                        <input
                                            type="range" min="30" max="60"
                                            value={config.basicPercent}
                                            onChange={(e) => setConfig({ ...config, basicPercent: Number(e.target.value) })}
                                            className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                        <p className="text-xs text-slate-400 mt-2">Recommended: 40-50% of CTC. Affects PF and Gratuity.</p>
                                    </div>

                                    {/* HRA */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="font-bold text-slate-700">House Rent Allowance - HRA (%)</label>
                                            <span className="font-black text-purple-600">{config.hraPercent}%</span>
                                        </div>
                                        <input
                                            type="range" min="10" max="50"
                                            value={config.hraPercent}
                                            onChange={(e) => setConfig({ ...config, hraPercent: Number(e.target.value) })}
                                            className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                        />
                                        <p className="text-xs text-slate-400 mt-2">Usually 50% (Metro) or 40% (Non-Metro) of Basic. Here defined as % of Gross for simplicity.</p>
                                    </div>

                                    {/* Special */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="font-bold text-slate-700">Special / Balancing Allowance</label>
                                            <span className="font-black text-amber-600">Dynamic</span>
                                        </div>
                                        <div className="w-full p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 font-medium text-sm">
                                            Calculated automatically as: <span className="font-bold">100% - (Basic + HRA) = {100 - config.basicPercent - config.hraPercent}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- STATUTORY SETTINGS --- */}
                    {activeTab === 'statutory' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Shield size={24} /></div>
                                    Compliance & Deductions
                                </h3>

                                <div className="space-y-6">
                                    {/* PF */}
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                                <Briefcase size={20} className="text-slate-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Provident Fund (PF)</h4>
                                                <p className="text-xs text-slate-500">Employee Contribution (12% of Basic or Flat)</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                                                <span className="text-xs font-bold text-slate-400">FLAT RATE (₹)</span>
                                                <input
                                                    type="number"
                                                    value={config.pfFixedAmount}
                                                    onChange={(e) => setConfig({ ...config, pfFixedAmount: Number(e.target.value) })}
                                                    className="w-16 outline-none font-bold text-slate-900 text-right"
                                                />
                                            </div>
                                            <button
                                                onClick={() => setConfig({ ...config, pfEnabled: !config.pfEnabled })}
                                                className={`text-2xl ${config.pfEnabled ? 'text-blue-600' : 'text-slate-300'}`}
                                            >
                                                {config.pfEnabled ? <ToggleRight /> : <ToggleLeft />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* PT */}
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                                <CreditCard size={20} className="text-slate-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Professional Tax (PT)</h4>
                                                <p className="text-xs text-slate-500">State-wise deduction rules</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="px-3 py-1.5 bg-slate-200 text-slate-500 rounded-lg text-xs font-bold">
                                                AUTO (STATE)
                                            </div>
                                            <button
                                                onClick={() => setConfig({ ...config, ptEnabled: !config.ptEnabled })}
                                                className={`text-2xl ${config.ptEnabled ? 'text-blue-600' : 'text-slate-300'}`}
                                            >
                                                {config.ptEnabled ? <ToggleRight /> : <ToggleLeft />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* TDS */}
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 opacity-70">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
                                                <Building2 size={20} className="text-slate-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Income Tax (TDS)</h4>
                                                <p className="text-xs text-slate-500">Managed by Smart Tax AI Engine</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                                            <CheckCircle2 size={16} /> ACTIVE
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
