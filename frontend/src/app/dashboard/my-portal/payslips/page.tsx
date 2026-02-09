"use client";

import React, { useState } from 'react';
import {
    Download,
    Eye,
    TrendingUp,
    Calendar,
    PieChart,
    ArrowDownRight,
    Briefcase,
    CreditCard,
    Wallet,
    FileText,
    Search,
    Filter
} from 'lucide-react';
import Link from 'next/link';

export default function MyPayslipsPage() {
    const [selectedYear, setSelectedYear] = useState('2026');

    // Mock Data
    const salaryStats = {
        netPay: "₹ 1,45,000",
        grossPay: "₹ 1,60,000",
        deductions: "₹ 15,000",
        nextPayDate: "Oct 31, 2026",
        ytdEarnings: "₹ 14,50,000"
    };

    const payslips = [
        { month: 'September', year: '2026', date: 'Sep 30, 2026', net: '₹ 1,45,000', status: 'Paid', downloadUrl: '#' },
        { month: 'August', year: '2026', date: 'Aug 31, 2026', net: '₹ 1,45,000', status: 'Paid', downloadUrl: '#' },
        { month: 'July', year: '2026', date: 'Jul 31, 2026', net: '₹ 1,45,000', status: 'Paid', downloadUrl: '#' },
        { month: 'June', year: '2026', date: 'Jun 30, 2026', net: '₹ 1,65,000', status: 'Paid', bonus: true, downloadUrl: '#' },
        { month: 'May', year: '2026', date: 'May 31, 2026', net: '₹ 1,45,000', status: 'Paid', downloadUrl: '#' },
    ];

    return (
        <div className="min-h-screen space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">

            {/* 1. Hero / Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Financial Hub</h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Your earnings, deductions, and financial wellness.</p>
                </div>

                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    {['2026', '2025'].map(year => (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${selectedYear === year
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. Corporate KPI Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Net Pay Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Net Pay</p>
                            <p className="text-xs text-slate-400 mt-1">September 2026</p>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Wallet size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-slate-800">{salaryStats.netPay}</h2>
                    </div>
                </div>

                {/* YTD Earnings Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">YTD Earnings</p>
                            <p className="text-xs text-slate-400 mt-1">Apr '26 - Present</p>
                        </div>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-slate-800">{salaryStats.ytdEarnings}</h2>
                    </div>
                </div>

                {/* Deductions Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Deductions</p>
                            <p className="text-xs text-slate-400 mt-1">This Month</p>
                        </div>
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <ArrowDownRight size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-bold text-slate-800">{salaryStats.deductions}</h2>
                    </div>
                </div>

            </div>

            {/* 3. Payslip History Table (Blue & White Tabular Look) */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <h3 className="text-2xl font-bold text-slate-800">Payslip History</h3>
                    <div className="flex gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-48 transition-all"
                            />
                        </div>
                        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-5 font-bold text-sm uppercase tracking-wide rounded-tl-lg">Month & Year</th>
                                <th className="p-5 font-bold text-sm uppercase tracking-wide">Credit Date</th>
                                <th className="p-5 font-bold text-sm uppercase tracking-wide">Net Pay</th>
                                <th className="p-5 font-bold text-sm uppercase tracking-wide">Status</th>
                                <th className="p-5 font-bold text-sm uppercase tracking-wide text-right rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {payslips.map((slip, index) => (
                                <tr
                                    key={index}
                                    className="group hover:bg-blue-50/50 transition-colors cursor-pointer"

                                >
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                                {slip.month.substring(0, 3)}
                                            </div>
                                            <div>
                                                <Link href={`/dashboard/my-portal/payslips/PAY-2026-${index + 1}`} className="font-bold text-slate-800 hover:text-blue-600 transition-colors block">
                                                    {slip.month} {slip.year}
                                                </Link>
                                                {slip.bonus && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Bonus</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm font-medium text-slate-600">
                                        {slip.date}
                                    </td>
                                    <td className="p-5">
                                        <span className="font-bold text-slate-800">{slip.net}</span>
                                    </td>
                                    <td className="p-5">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase tracking-wide">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                            {slip.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <Link
                                                href={`/dashboard/my-portal/payslips/PAY-2026-${index + 1}`}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all"
                                                title="View"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all" title="Download">
                                                <Download size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
