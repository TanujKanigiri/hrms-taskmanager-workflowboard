"use client";

import React, { useState, useMemo } from 'react';
import {
    Calculator,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    FileText,
    Info,
    PieChart,
    Plus,
    Save,
    Shield,
    TrendingUp,
    UploadCloud,
    AlertTriangle,
    Banknote,
    Lock
} from 'lucide-react';

export default function TaxDeclarationPage() {
    const [activeRegime, setActiveRegime] = useState<'old' | 'new'>('old');
    const [expandedSection, setExpandedSection] = useState<string | null>('80c');

    // Form State
    const [declarations, setDeclarations] = useState({
        section80C: {
            ppf: 0,
            elss: 0,
            lic: 0,
            tuition: 0,
        },
        section80D: {
            self: 0,
            parents: 0,
        },
        hra: {
            rentPaid: 0,
            cityType: 'metro' as 'metro' | 'non-metro',
        },
        lta: 0
    });

    // Mock Salary Data
    const BASIC_SALARY_ANNUAL = 600000; // 50k pm
    const GROSS_SALARY = 1500000; // 12.5L

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    // --- Calculations ---

    const total80C = useMemo(() => {
        const sum = Object.values(declarations.section80C).reduce((a, b) => a + Number(b), 0);
        return Math.min(sum, 150000); // Max cap
    }, [declarations.section80C]);

    const total80D = useMemo(() => {
        // Caps: Self 25k, Parents 50k (assuming senior)
        const self = Math.min(Number(declarations.section80D.self), 25000);
        const parents = Math.min(Number(declarations.section80D.parents), 50000);
        return self + parents;
    }, [declarations.section80D]);

    const hraExemption = useMemo(() => {
        if (activeRegime === 'new') return 0;
        const rentPaid = Number(declarations.hra.rentPaid);
        const basic = BASIC_SALARY_ANNUAL;

        // HRA Rules: Min of (Actual HRA Received(assume 40% of basic), Rent - 10% Basic, 50%/40% Basic)
        const actualHRA = basic * 0.4;
        const rentMinusBasic = Math.max(0, rentPaid - (basic * 0.1));
        const cityCap = basic * (declarations.hra.cityType === 'metro' ? 0.5 : 0.4);

        return Math.min(actualHRA, rentMinusBasic, cityCap);
    }, [declarations.hra, activeRegime]);

    const calculateTaxLiability = (regime: 'old' | 'new') => {
        let taxable = GROSS_SALARY - 50000; // Std Deduction

        if (regime === 'old') {
            taxable -= (total80C + total80D + hraExemption);
        }

        // Simple Slabs for Projection
        let tax = 0;
        if (regime === 'new') {
            if (taxable > 300000) tax += Math.min(300000, taxable - 300000) * 0.05;
            if (taxable > 600000) tax += Math.min(300000, taxable - 600000) * 0.10;
            if (taxable > 900000) tax += Math.min(300000, taxable - 900000) * 0.15;
            if (taxable > 1200000) tax += Math.min(300000, taxable - 1200000) * 0.20;
            if (taxable > 1500000) tax += (taxable - 1500000) * 0.30;
        } else {
            // Old Regime Slabs (simplified)
            if (taxable > 250000) tax += Math.min(250000, taxable - 250000) * 0.05;
            if (taxable > 500000) tax += Math.min(500000, taxable - 500000) * 0.20;
            if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
        }
        return Math.floor(tax);
    };

    const handleInputChange = (section: string, field: string, value: string) => {
        setDeclarations(prev => ({
            ...prev,
            [section]: {
                // @ts-ignore
                ...prev[section],
                [field]: Number(value)
            }
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12">

            {/* 1. Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tax Declarations</h1>
                    <p className="text-slate-500 font-medium mt-1">FY 2025-26 • Plan your investments and save tax.</p>
                </div>

                {/* Visual Regime Switcher */}
                <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex items-center">
                    <button
                        onClick={() => setActiveRegime('new')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all relative overflow-hidden ${activeRegime === 'new' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        {activeRegime === 'new' && <div className="absolute inset-0 bg-blue-600 z-0"></div>}
                        <span className="relative z-10 flex items-center gap-2">
                            New Regime <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white">Default</span>
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveRegime('old')}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all relative overflow-hidden ${activeRegime === 'old' ? 'text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        {activeRegime === 'old' && <div className="absolute inset-0 bg-blue-600 z-0"></div>}
                        <span className="relative z-10 flex items-center gap-2">
                            Old Regime
                        </span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* 2. Main Form Area (Left) */}
                <div className="xl:col-span-8 flex flex-col gap-6">

                    {activeRegime === 'new' && (
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4 animate-in fade-in slide-in-from-top-4">
                            <Info className="text-blue-600 shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-slate-800">You have selected the New Tax Regime</h3>
                                <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                                    Under this regime, most exemptions (HRA, 80C, 80D) are <b>not applicable</b>.
                                    However, you benefit from lower tax rates. You can still declare investments for your own records or switching back later.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Section 80C Accordion */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
                        <button
                            onClick={() => setExpandedSection(expandedSection === '80c' ? null : '80c')}
                            className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${total80C >= 150000 ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                    <Shield size={20} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-slate-800 text-lg">Section 80C Deductions</h3>
                                    <p className="text-slate-500 text-sm">PF, LIC, ELSS, PPF etc.</p>
                                </div>
                            </div>
                            <div className="text-right flex items-center gap-6">
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 uppercase">Declared</span>
                                    <span className={`text-lg font-black ${total80C >= 150000 ? 'text-emerald-500' : 'text-slate-900'}`}>
                                        {total80C.toLocaleString()}<span className="text-slate-400 font-medium text-sm">/1.5L</span>
                                    </span>
                                </div>
                                {expandedSection === '80c' ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                            </div>
                        </button>

                        {expandedSection === '80c' && (
                            <div className="p-6 pt-0 border-t border-slate-100 animate-in slide-in-from-top-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Public Provident Fund (PPF)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    value={declarations.section80C.ppf}
                                                    onChange={e => handleInputChange('section80C', 'ppf', e.target.value)}
                                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-bold text-slate-800"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Life Insurance Premium (LIC)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    value={declarations.section80C.lic}
                                                    onChange={e => handleInputChange('section80C', 'lic', e.target.value)}
                                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-bold text-slate-800"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">ELSS Mutual Funds</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    value={declarations.section80C.elss}
                                                    onChange={e => handleInputChange('section80C', 'elss', e.target.value)}
                                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-bold text-slate-800"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Tuition Fees (Children)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                                <input
                                                    type="number"
                                                    value={declarations.section80C.tuition}
                                                    onChange={e => handleInputChange('section80C', 'tuition', e.target.value)}
                                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-bold text-slate-800"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between group cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg text-slate-400 group-hover:text-blue-500 shadow-sm border border-slate-100">
                                            <UploadCloud size={20} />
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-700 text-sm block">Upload Proofs</span>
                                            <span className="text-xs text-slate-400">PDF, JPG up to 5MB</span>
                                        </div>
                                    </div>
                                    <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg group-hover:text-blue-600 transition-colors">Select Files</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* HRA Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
                        <button
                            onClick={() => setExpandedSection(expandedSection === 'hra' ? null : 'hra')}
                            className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-purple-100 text-purple-600`}>
                                    <Building2 size={20} />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-slate-800 text-lg">House Rent Allowance (HRA)</h3>
                                    <p className="text-slate-500 text-sm">Rent declarations & Landlord PAN.</p>
                                </div>
                            </div>
                            <div className="text-right flex items-center gap-6">
                                <div>
                                    <span className="block text-xs font-bold text-slate-400 uppercase">Exempt</span>
                                    <span className="text-lg font-black text-slate-900">
                                        {hraExemption.toLocaleString()}<span className="text-slate-400 font-medium text-sm">/yr</span>
                                    </span>
                                </div>
                                {expandedSection === 'hra' ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                            </div>
                        </button>

                        {expandedSection === 'hra' && (
                            <div className="p-6 pt-0 border-t border-slate-100 animate-in slide-in-from-top-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Annual Rent Paid</label>
                                        <input
                                            type="number"
                                            value={declarations.hra.rentPaid}
                                            onChange={e => handleInputChange('hra', 'rentPaid', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all font-bold text-slate-800"
                                            placeholder="Enter annual rent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">City Type</label>
                                        <div className="flex bg-slate-100 p-1 rounded-xl">
                                            <button
                                                onClick={() => setDeclarations(p => ({ ...p, hra: { ...p.hra, cityType: 'metro' } }))}
                                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${declarations.hra.cityType === 'metro' ? 'bg-white shadow-sm text-purple-700' : 'text-slate-500'}`}
                                            >
                                                Metro (50%)
                                            </button>
                                            <button
                                                onClick={() => setDeclarations(p => ({ ...p, hra: { ...p.hra, cityType: 'non-metro' } }))}
                                                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${declarations.hra.cityType === 'non-metro' ? 'bg-white shadow-sm text-purple-700' : 'text-slate-500'}`}
                                            >
                                                Non-Metro (40%)
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Area */}
                    <div className="flex justify-end pt-4">
                        <button className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:scale-[1.02]">
                            <Save size={18} />
                            Save Declarations
                        </button>
                    </div>

                </div>

                {/* 3. Tax Analytics Side Panel (Right) */}
                <div className="xl:col-span-4 space-y-6">

                    {/* Summary Card */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                            <Calculator size={120} />
                        </div>

                        <h4 className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-2">Projected Tax Liability</h4>
                        <div className="flex items-baseline gap-2 mb-6">
                            <h2 className="text-4xl font-black text-slate-900">
                                {formatCurrency(calculateTaxLiability(activeRegime))}
                            </h2>
                            <span className="text-slate-400 font-bold text-sm">/ year</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600">Old Regime Tax</span>
                                <span className="font-bold text-slate-800">{formatCurrency(calculateTaxLiability('old'))}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600">New Regime Tax</span>
                                <span className="font-bold text-green-600">{formatCurrency(calculateTaxLiability('new'))}</span>
                            </div>

                            {/* Comparison Bar */}
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                                <div
                                    className="h-full bg-slate-800"
                                    style={{ width: `${(calculateTaxLiability('old') / (calculateTaxLiability('old') + calculateTaxLiability('new'))) * 100}%` }}
                                ></div>
                                <div className="h-full bg-green-500 flex-1"></div>
                            </div>

                            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3 items-start">
                                <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                                    <span className="font-bold">Suggestion:</span> Investing ₹20,000 more in 80C can save you approx ₹6,000 in taxes under the Old Regime.
                                </p>
                            </div>
                        </div>

                        <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                            Download Simulation
                        </button>
                    </div>

                    {/* Tax Lock Status */}
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Lock size={20} className="text-indigo-200" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Declaration Window</h4>
                                <p className="text-indigo-200 text-xs">Closes on Jan 31, 2026</p>
                            </div>
                        </div>
                        <p className="text-sm text-indigo-100 leading-relaxed mb-4">
                            Please submit your final proofs before the window closes to avoid defaulting to the New Regime.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold bg-white/10 p-2 rounded-lg w-fit">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            Open for Submission
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Icon helper workaround since 'House' isn't imported but used Building2
import { Building2 } from 'lucide-react';
