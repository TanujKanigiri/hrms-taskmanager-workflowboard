"use client";

import React, { useRef, useState } from 'react';
import {
    Download,
    Printer,
    Link as LinkIcon,
    Building2,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PayslipViewPage({ params }: { params: { id: string } }) {
    const [isDownloading, setIsDownloading] = useState(false);

    // Dynamic Data Selection based on ID
    const getMonthFromId = (id: string) => {
        const parts = id.split('-');
        const lastPart = parseInt(parts[parts.length - 1]);
        if (!isNaN(lastPart) && lastPart >= 1 && lastPart <= 12) {
            const monthNames = ['September', 'August', 'July', 'June', 'May', 'April'];
            return monthNames[lastPart - 1] || 'September';
        }
        return 'September';
    };

    const currentMonth = getMonthFromId(params.id);
    const date = new Date(); // Current date for footer

    // Mock Data
    const payslipData = {
        id: params.id,
        month: `${currentMonth} 2026`,
        company: {
            name: "ZentraHR Tech Systems Ltd.",
            address: "Level 12, Tech Park, Silicon Valley, CA 94000",
            taxId: "TAX-8829-22"
        },
        employee: {
            name: "Alex Morgan",
            id: "EMP-001",
            designation: "Senior Software Engineer",
            department: "Engineering",
            doj: "12 Jan, 2024",
            bank: "HDFC Bank",
            account: "************1234",
            pan: "ABCDE1234F",
            uan: "10099223388"
        },
        earnings: [
            { label: "Basic Salary", amount: 72500 },
            { label: "House Rent Allowance", amount: 29000 },
            { label: "Special Allowance", amount: 25000 },
            { label: "Performance Bonus", amount: 15000 },
            { label: "Medical Allowance", amount: 2500 },
            { label: "Shift Allowance", amount: 1000 },
        ],
        deductions: [
            { label: "Provident Fund", amount: 8700 },
            { label: "Professional Tax", amount: 200 },
            { label: "Income Tax (TDS)", amount: 6100 },
        ],
        stats: {
            gross: 145000,
            totalDeductions: 15000,
            netPay: 130000,
            payableDays: 30,
            lopDays: 0
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            window.print();
            setIsDownloading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in zoom-in-95 duration-500 bg-slate-50/50">
            {/* Action Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden px-4 md:px-0 max-w-5xl mx-auto pt-8">
                <div>
                    <Link href="/dashboard/my-portal/payslips" className="group flex items-center gap-2 mb-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-semibold">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to History
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800">Payslip for {payslipData.month}</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 rounded-lg font-semibold text-sm transition-all shadow-sm"
                    >
                        <Printer size={16} /> Print
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    >
                        {isDownloading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download size={16} />
                        )}
                        Download PDF
                    </button>
                </div>
            </div>

            {/* A4 PAPER CONTAINER */}
            <div className="max-w-[210mm] mx-auto bg-white shadow-xl min-h-[297mm] print:shadow-none print:w-full print:max-w-none print:min-h-0 overflow-hidden relative">

                {/* Top Blue Bar Accent */}
                <div className="h-2 w-full bg-blue-600"></div>

                <div className="p-10 md:p-12 space-y-8">

                    {/* 1. Header Section */}
                    <div className="flex justify-between items-start border-b border-slate-200 pb-8">
                        <div className="flex items-center gap-4">
                            {/* Logo Placeholder */}
                            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <Building2 size={32} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{payslipData.company.name}</h1>
                                <p className="text-slate-500 text-sm max-w-[250px] leading-relaxed mt-1">
                                    {payslipData.company.address}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-black text-blue-900 uppercase tracking-wider">Payslip</h2>
                            <p className="text-blue-600 font-bold text-lg mt-1">{payslipData.month}</p>
                            <p className="text-slate-400 text-xs font-medium tracking-widest uppercase mt-2">ID: {payslipData.id}</p>
                        </div>
                    </div>

                    {/* 2. Employee Details Grid */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Employee Name</label>
                                <p className="font-bold text-slate-800">{payslipData.employee.name}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Employee ID</label>
                                <p className="font-semibold text-slate-700">{payslipData.employee.id}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Designation</label>
                                <p className="font-semibold text-slate-700">{payslipData.employee.designation}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Department</label>
                                <p className="font-semibold text-slate-700">{payslipData.employee.department}</p>
                            </div>

                            {/* Row 2 */}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date of Joining</label>
                                <p className="font-semibold text-slate-700">{payslipData.employee.doj}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">PAN Number</label>
                                <p className="font-semibold text-slate-700">{payslipData.employee.pan}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Bank Account</label>
                                <p className="font-semibold text-slate-700">{payslipData.employee.account}</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Worked Days</label>
                                <p className="font-bold text-slate-800">{payslipData.stats.payableDays}</p>
                            </div>
                        </div>
                    </div>

                    {/* 3. Financial Table (Side by Side) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 border border-slate-200 rounded-xl overflow-hidden">

                        {/* Earnings Column */}
                        <div className="border-b md:border-b-0 md:border-r border-slate-200">
                            <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex justify-between items-center">
                                <h3 className="font-bold text-blue-800 uppercase text-sm tracking-wide">Earnings</h3>
                                <span className="text-[10px] font-bold text-blue-400 uppercase">Amount (INR)</span>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {payslipData.earnings.map((item, i) => (
                                    <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                                        <span className="text-sm font-medium text-slate-600">{item.label}</span>
                                        <span className="text-sm font-bold text-slate-800">₹ {item.amount.toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                                {/* Empty fillers to match height if needed, usually css grid handles this but for classic table look */}
                                <div className="h-24"></div>
                            </div>
                            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
                                <span className="font-bold text-slate-700 text-sm">Total Earnings</span>
                                <span className="font-bold text-slate-900 text-lg">₹ {payslipData.stats.gross.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        {/* Deductions Column */}
                        <div>
                            <div className="bg-slate-50/50 p-4 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="font-bold text-red-800/80 uppercase text-sm tracking-wide">Deductions</h3>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Amount (INR)</span>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {payslipData.deductions.map((item, i) => (
                                    <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors">
                                        <span className="text-sm font-medium text-slate-600">{item.label}</span>
                                        <span className="text-sm font-bold text-slate-800">₹ {item.amount.toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="h-[9.5rem]"></div> {/* Spacer to align bottoms roughly if needed */}
                            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
                                <span className="font-bold text-slate-700 text-sm">Total Deductions</span>
                                <span className="font-bold text-slate-900 text-lg">₹ {payslipData.stats.totalDeductions.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                    </div>

                    {/* 4. Net Pay Highlight */}
                    <div className="flex justify-end">
                        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg shadow-blue-600/20 min-w-[300px]">
                            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Net Payable Amount</p>
                            <div className="flex items-baseline justify-between mb-2">
                                <span className="text-3xl font-black">₹ {payslipData.stats.netPay.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="text-[10px] text-blue-200 font-medium pt-3 border-t border-blue-500/30">
                                Words: One Lakh Thirty Thousand Only
                            </div>
                        </div>
                    </div>

                    {/* 5. Footer / Signature */}
                    <div className="mt-12 pt-12 border-t border-dashed border-slate-300 grid grid-cols-2">
                        <div>
                            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                                <strong>System Generated:</strong> This document is automatically generated by ZentraHR and does not verify signature.
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-slate-800 text-sm">For ZentraHR Tech Systems Ltd.</p>
                            <div className="h-12"></div> {/* Space for stamp */}
                            <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Authorized Signatory</p>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-100"></div>
            </div>

            <style jsx global>{`
                @media print {
                    @page { 
                        size: A4; 
                        margin: 0; 
                    }
                    body { 
                        background: white; 
                        -webkit-print-color-adjust: exact !important; 
                        print-color-adjust: exact !important;
                    }
                    .print\\:hidden { display: none !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:w-full { width: 100% !important; max-width: none !important; }
                    .animate-in { animation: none !important; }
                }
            `}</style>
        </div>
    );
}
