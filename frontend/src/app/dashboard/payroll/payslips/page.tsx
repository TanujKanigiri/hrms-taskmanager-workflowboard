"use client";

import React, { useState } from 'react';
import {
    Banknote,
    Calculator,
    Download,
    Eye,
    EyeOff,
    FileText,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    Send,
    TrendingUp,
    Users,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    X,
    Loader2,
    FileSpreadsheet,
    Building2,
    Wallet,
    Calendar,
    PenLine,
    Shield
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// --- Mock Data ---
const EMPLOYEES = [
    { id: 'EMP001', name: 'Alex Morgan', role: 'Senior Developer', salary: 1440000, status: 'Generated', image: 'AM', department: 'Engineering', account: '9876543210', ifsc: 'HDFC0001234' },
    { id: 'EMP002', name: 'Sarah Jones', role: 'UI/UX Designer', salary: 1140000, status: 'Pending', image: 'SJ', department: 'Design', account: '8765432109', ifsc: 'ICIC0005678' },
    { id: 'EMP003', name: 'Mike Chen', role: 'Product Manager', salary: 1320000, status: 'Generated', image: 'MC', department: 'Product', account: '7654321098', ifsc: 'SBIN0009988' },
    { id: 'EMP004', name: 'Emily Davis', role: 'HR Manager', salary: 1020000, status: 'Review', image: 'ED', department: 'HR', account: '6543210987', ifsc: 'HDFC0001234' },
    { id: 'EMP005', name: 'James Wilson', role: 'DevOps Engineer', salary: 1260000, status: 'Pending', image: 'JW', department: 'Engineering', account: '5432109876', ifsc: 'ICIC0005678' },
];

const STANDARD_DEDUCTION = 50000;
const PF_MONTHLY = 3600;
const PROF_TAX = 200;

// Tax Utils (FY 2025 Logic)
const calculateTax = (annualIncome: number, regime: 'new' | 'old') => {
    let tax = 0;
    const taxableIncome = Math.max(0, annualIncome - STANDARD_DEDUCTION);

    if (regime === 'new') {
        if (taxableIncome <= 300000) return 0;
        if (taxableIncome <= 600000) return (taxableIncome - 300000) * 0.05;
        if (taxableIncome <= 900000) return 15000 + (taxableIncome - 600000) * 0.10;
        if (taxableIncome <= 1200000) return 45000 + (taxableIncome - 900000) * 0.15;
        if (taxableIncome <= 1500000) return 90000 + (taxableIncome - 1200000) * 0.20;
        return 150000 + (taxableIncome - 1500000) * 0.30;
    } else {
        const effectiveTaxable = Math.max(0, taxableIncome - 150000);
        if (effectiveTaxable <= 250000) return 0;
        if (effectiveTaxable <= 500000) return (effectiveTaxable - 250000) * 0.05;
        if (effectiveTaxable <= 1000000) return 12500 + (effectiveTaxable - 500000) * 0.20;
        return 112500 + (effectiveTaxable - 1000000) * 0.30;
    }
    return tax;
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        Generated: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        Review: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
    const currentStyle = styles[status] || styles.Pending;

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentStyle} inline-flex items-center gap-1`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            {status}
        </span>
    );
};

export default function PayslipsPage() {
    // State
    const [selectedEmployee, setSelectedEmployee] = useState(EMPLOYEES[0]);
    const [showAmounts, setShowAmounts] = useState(true);
    const [taxRegime, setTaxRegime] = useState<'new' | 'old'>('new');
    const [activeTab, setActiveTab] = useState<'breakdown' | 'tax-engine'>('breakdown');

    // --- Correction Mode State ---
    const [isCorrectionMode, setIsCorrectionMode] = useState(false);
    const [correctionData, setCorrectionData] = useState({
        payableDays: 31,
        lopDays: 0,
        bonusOverride: 0,
    });

    // Modals & Action State
    const [isRunPayrollOpen, setIsRunPayrollOpen] = useState(false);
    const [payrollStep, setPayrollStep] = useState(1);
    const [isPayrollProcessing, setIsPayrollProcessing] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [exportProcessing, setExportProcessing] = useState<string | null>(null);

    // Individual Action States
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [emailSentSuccess, setEmailSentSuccess] = useState(false);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

    // Derived Calculations for current view
    const currentMonthlySalary = (selectedEmployee.salary / 12) * (correctionData.payableDays / 31);
    const currentBonusPerMonth = (selectedEmployee.salary * 0.1 / 12) + correctionData.bonusOverride;

    const handleDownloadPayslipPDF = () => {
        setIsDownloadingPdf(true);
        setTimeout(() => {
            const doc = new jsPDF();
            const emp = selectedEmployee;

            // Recalculate based on current state (LOP adjusted)
            const adjustedMonthlySalary = currentMonthlySalary;
            const monthlyTax = calculateTax(emp.salary, 'new') / 12;
            const basic = adjustedMonthlySalary * 0.4;
            const hra = adjustedMonthlySalary * 0.2;
            const special = adjustedMonthlySalary * 0.3;
            const bonus = currentBonusPerMonth; // Includes override

            const totalEarnings = basic + hra + special + bonus;
            const totalDeductions = PF_MONTHLY + PROF_TAX + monthlyTax;
            const netPay = totalEarnings - totalDeductions;

            // Brand Header
            doc.setFillColor(15, 23, 42);
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(24);
            doc.setFont("helvetica", "bold");
            doc.text("ZentraHR", 14, 20);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text("Private & Confidential", 170, 20);

            // Employee Details Box
            doc.setTextColor(15, 23, 42);
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text(`Payslip for January 2026`, 14, 55);

            doc.setDrawColor(200, 200, 200);
            doc.line(14, 60, 196, 60);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");

            // Left Column
            doc.text(`Employee Name: ${emp.name}`, 14, 70);
            doc.text(`Employee ID: ${emp.id}`, 14, 78);
            doc.text(`Department: ${emp.department}`, 14, 86);
            doc.text(`Payable Days: ${correctionData.payableDays}`, 14, 94);

            // Right Column
            doc.text(`Bank Account: ${emp.account}`, 120, 70);
            doc.text(`IFSC Code: ${emp.ifsc}`, 120, 78);
            doc.text(`Pan Number: XXXXX1234F`, 120, 86);
            doc.text(`LOP Days: ${correctionData.lopDays}`, 120, 94);

            // Earnings Table with YTD
            autoTable(doc, {
                startY: 110,
                head: [['Earnings', 'Amount', 'YTD (Approx)']],
                body: [
                    ['Basic Salary', formatCurrency(basic), formatCurrency(basic * 10)],
                    ['House Rent Allowance', formatCurrency(hra), formatCurrency(hra * 10)],
                    ['Special Allowance', formatCurrency(special), formatCurrency(special * 10)],
                    ['Performance Bonus', formatCurrency(bonus), formatCurrency(bonus * 10)],
                    [{ content: 'Total Earnings', styles: { fontStyle: 'bold' } }, { content: formatCurrency(totalEarnings), styles: { fontStyle: 'bold' } }, formatCurrency(totalEarnings * 10)]
                ],
                theme: 'striped',
                headStyles: { fillColor: [16, 185, 129] }, // emerald-500
                styles: { fontSize: 9 }
            });

            // Deductions Table
            // @ts-ignore
            const finalY = doc.lastAutoTable.finalY || 150;

            autoTable(doc, {
                startY: finalY + 15,
                head: [['Deductions', 'Amount', 'YTD (Approx)']],
                body: [
                    ['Provident Fund', formatCurrency(PF_MONTHLY), formatCurrency(PF_MONTHLY * 10)],
                    ['Professional Tax', formatCurrency(PROF_TAX), formatCurrency(PROF_TAX * 10)],
                    ['Income Tax (TDS)', formatCurrency(monthlyTax), formatCurrency(monthlyTax * 10)],
                    [{ content: 'Total Deductions', styles: { fontStyle: 'bold' } }, { content: formatCurrency(totalDeductions), styles: { fontStyle: 'bold', textColor: [239, 68, 68] } }, formatCurrency(totalDeductions * 10)] // red-500
                ],
                theme: 'striped',
                headStyles: { fillColor: [239, 68, 68] }, // red-500
                styles: { fontSize: 9 }
            });

            // Net Pay Badge
            // @ts-ignore
            const netY = doc.lastAutoTable.finalY + 20;

            doc.setFillColor(241, 245, 249); // slate-100
            doc.roundedRect(140, netY, 56, 25, 3, 3, 'F');
            doc.setFontSize(10);
            doc.setTextColor(100, 116, 139);
            doc.text("Net Pay", 145, netY + 8);
            doc.setFontSize(16);
            doc.setTextColor(15, 23, 42);
            doc.setFont("helvetica", "bold");
            doc.text(formatCurrency(netPay), 145, netY + 18);

            // Footer
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text("This is a computer-generated document and does not require a signature.", 105, 280, { align: 'center' });

            doc.save(`Payslip_${emp.name.replace(' ', '_')}_Jan2026.pdf`);
            setIsDownloadingPdf(false);
        }, 800);
    };

    const handleEmailPayslip = () => {
        setIsSendingEmail(true);
        setTimeout(() => {
            setIsSendingEmail(false);
            setEmailSentSuccess(true);
            setTimeout(() => {
                setEmailSentSuccess(false);
            }, 3000);
        }, 1500);
    };

    const handleExportPDF = () => {
        setExportProcessing('pdf');
        setTimeout(() => {
            const doc = new jsPDF();
            doc.setFontSize(22);
            doc.setTextColor(15, 23, 42);
            doc.text("ZentraHR", 14, 20);

            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text("Payroll Register - January 2026", 14, 28);
            doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 34);

            const tableData = EMPLOYEES.map(emp => {
                const monthlySalary = emp.salary / 12;
                const monthlyTax = calculateTax(emp.salary, 'new') / 12;
                const totalDeductions = PF_MONTHLY + PROF_TAX + monthlyTax;
                const netPay = monthlySalary - totalDeductions;

                return [
                    emp.id,
                    emp.name,
                    emp.department,
                    formatCurrency(monthlySalary),
                    formatCurrency(monthlyTax),
                    formatCurrency(totalDeductions),
                    formatCurrency(netPay)
                ];
            });

            autoTable(doc, {
                head: [['ID', 'Employee Name', 'Dept', 'Gross Pay', 'TDS', 'Tot. Ded.', 'Net Pay']],
                body: tableData,
                startY: 40,
                theme: 'grid',
                styles: { fontSize: 8, cellPadding: 3 },
                headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold' },
                alternateRowStyles: { fillColor: [248, 250, 252] }
            });

            const pageCount = doc.getNumberOfPages();
            doc.setFontSize(10);
            doc.text(`Page 1 of ${pageCount}`, 14, doc.internal.pageSize.height - 10);

            doc.save('ZentraHR_Payroll_Register_Jan2026.pdf');
            setExportProcessing(null);
            setIsExportOpen(false);
        }, 800);
    };

    const handleExportBankCSV = () => {
        setExportProcessing('bank');
        setTimeout(() => {
            const headers = ["Beneficiary Name", "Account Number", "IFSC Code", "Amount", "Payment Date", "Email", "Status"];
            const rows = EMPLOYEES.map(emp => {
                const monthlySalary = emp.salary / 12;
                const monthlyTax = calculateTax(emp.salary, 'new') / 12;
                const netPay = monthlySalary - (PF_MONTHLY + PROF_TAX + monthlyTax);

                return [
                    emp.name,
                    emp.account,
                    emp.ifsc,
                    netPay.toFixed(2),
                    "31-01-2026",
                    `${emp.name.toLowerCase().replace(' ', '.')}@zentra.com`,
                    "Ready"
                ];
            });

            const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "Bank_Advice_Jan2026.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setExportProcessing(null);
            setIsExportOpen(false);
        }, 800);
    };

    const handleExportTaxExcel = () => {
        setExportProcessing('tax');
        setTimeout(() => {
            const headers = ["Employee ID", "Name", "Regime", "Annual Gross", "Std Deduction", "Taxable Income", "Annual Tax Liab", "Monthly TDS"];
            const rows = EMPLOYEES.map(emp => {
                const annualTax = calculateTax(emp.salary, 'new');
                const monthlyTax = annualTax / 12;

                return [
                    emp.id,
                    emp.name,
                    "New Regime",
                    emp.salary,
                    STANDARD_DEDUCTION,
                    emp.salary - STANDARD_DEDUCTION,
                    annualTax.toFixed(2),
                    monthlyTax.toFixed(2)
                ];
            });

            const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "Tax_Summary_FY2025.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setExportProcessing(null);
            setIsExportOpen(false);
        }, 800);
    };



    const handleRunPayroll = () => {
        setIsRunPayrollOpen(true);
        setPayrollStep(1);
        setIsPayrollProcessing(false);
    };

    const confirmPayroll = () => {
        setIsPayrollProcessing(true);
        setTimeout(() => {
            setIsPayrollProcessing(false);
            setPayrollStep(3);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-10 relative">

            {/* --- PAYROLL MODAL (WIZARD) --- */}
            {isRunPayrollOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 relative">
                        {!isPayrollProcessing && payrollStep !== 3 && (
                            <button onClick={() => setIsRunPayrollOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        )}

                        {payrollStep === 1 && (
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Wallet size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">Run Payroll</h2>
                                        <p className="text-slate-500">Period: <span className="font-bold text-slate-800">January 2026</span></p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Payroll Health Check</h3>
                                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="text-emerald-500" size={20} />
                                            <span className="font-bold text-slate-700">Attendance Data</span>
                                        </div>
                                        <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">100% Synced</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="text-emerald-500" size={20} />
                                            <span className="font-bold text-slate-700">Tax Declarations</span>
                                        </div>
                                        <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">All Verified</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="text-amber-500" size={20} />
                                            <span className="font-bold text-slate-700">Pending Reimbursements</span>
                                        </div>
                                        <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">3 Approvals Needed</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <span className="text-slate-500 text-sm">Estimated Total Cost: <span className="text-slate-900 font-bold text-lg ml-1">₹4,28,500</span></span>
                                    <button
                                        onClick={() => setPayrollStep(2)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25"
                                    >
                                        Proceed to Review <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {payrollStep === 2 && (
                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-black text-slate-900 mb-2">Confirm Disbursement</h2>
                                    <p className="text-slate-500 max-w-sm mx-auto">
                                        You are about to finalize payroll for <b>142 employees</b>. This action will generate payslips and initiate bank transfers.
                                    </p>
                                </div>
                                {isPayrollProcessing ? (
                                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                        <Loader2 size={48} className="text-blue-600 animate-spin" />
                                        <p className="font-bold text-slate-600 animate-pulse">Calculating Taxes & Generating Slips...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase">Total Net Pay</p>
                                                    <p className="text-3xl font-black text-slate-900">₹3,84,150</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase">TDS Deducted</p>
                                                    <p className="text-3xl font-black text-slate-900">₹44,350</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 justify-center">
                                            <button
                                                onClick={() => setPayrollStep(1)}
                                                className="px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={confirmPayroll}
                                                className="px-8 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2"
                                            >
                                                <CheckCircle2 size={18} /> Confirm & Run
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {payrollStep === 3 && (
                            <div className="p-12 text-center bg-gradient-to-br from-emerald-50 to-white">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-emerald-200 shadow-xl">
                                    <CheckCircle2 size={40} className="text-emerald-600" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Payroll Complete!</h2>
                                <p className="text-slate-600 mb-8">
                                    Payslips have been emailed to all 142 employees. Bank advice file is ready for download.
                                </p>
                                <button
                                    onClick={() => setIsRunPayrollOpen(false)}
                                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold border border-transparent shadow-lg hover:scale-105 transition-all"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- EXPORT MODAL --- */}
            {isExportOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4"
                    onClick={() => setIsExportOpen(false)}
                >
                    <div
                        className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Export Reports</h3>
                            <button onClick={() => setIsExportOpen(false)} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full"><X size={16} /></button>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={handleExportPDF}
                                disabled={!!exportProcessing}
                                className={`flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left ${exportProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {exportProcessing === 'pdf' ? <Loader2 className="animate-spin" /> : <FileText size={24} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-blue-700">Payroll Register (PDF)</h4>
                                    <p className="text-xs text-slate-500">Complete breakdown of earnings and deductions.</p>
                                </div>
                            </button>
                            <button
                                onClick={handleExportBankCSV}
                                disabled={!!exportProcessing}
                                className={`flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-left ${exportProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {exportProcessing === 'bank' ? <Loader2 className="animate-spin" /> : <FileSpreadsheet size={24} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700">Bank Advice (CSV)</h4>
                                    <p className="text-xs text-slate-500">Formatted specifically for bulk bank transfer.</p>
                                </div>
                            </button>
                            <button
                                onClick={handleExportTaxExcel}
                                disabled={!!exportProcessing}
                                className={`flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all group text-left ${exportProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {exportProcessing === 'tax' ? <Loader2 className="animate-spin" /> : <Building2 size={24} />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-purple-700">Tax Summary (CSV)</h4>
                                    <p className="text-xs text-slate-500">TDS deductions and projections for accounting.</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payroll & Payslips</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage salaries, tax declarations, and disbursement.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsExportOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Download size={18} />
                        Export Report
                    </button>
                    <button
                        onClick={handleRunPayroll}
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02]"
                    >
                        <Plus size={18} />
                        Run Payroll
                    </button>
                </div>
            </div>

            {/* 2. Stats Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { title: "Total Payroll Cost", value: "₹4,28,500", trend: "+12%", color: "blue", icon: Banknote },
                    { title: "Taxes Deducted", value: "₹84,200", trend: "+5%", color: "emerald", icon: Calculator },
                    { title: "Pending Disbursements", value: "₹12,400", trend: "3 Employees", color: "amber", icon: AlertCircle },
                ].map((stat, idx) => (
                    <div key={idx} className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity bg-${stat.color}-500 rounded-bl-3xl`}>
                            <stat.icon size={32} className={`text-${stat.color}-600`} />
                        </div>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.title}</p>
                        <div className="flex items-end gap-3 mt-2">
                            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded text-${stat.color}-600 bg-${stat.color}-50`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full bg-${stat.color}-500 w-[70%]`}></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* 3. Employee Payroll List (Left Column) */}
                <div className="xl:col-span-4 flex flex-col gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between sticky top-0 z-10">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Users size={18} className="text-blue-500" />
                                Employees
                            </h3>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-white rounded-lg text-slate-500 transition-colors">
                                    <Filter size={18} />
                                </button>
                                <button className="p-2 hover:bg-white rounded-lg text-slate-500 transition-colors">
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                            {EMPLOYEES.map((emp) => (
                                <div
                                    key={emp.id}
                                    onClick={() => setSelectedEmployee(emp)}
                                    className={`
                                        p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden group
                                        ${selectedEmployee.id === emp.id
                                            ? 'bg-blue-50 border-blue-200 shadow-sm'
                                            : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'}
                                    `}
                                >
                                    {selectedEmployee.id === emp.id && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                    )}

                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm flex-shrink-0">
                                        {emp.image}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className={`text-sm font-bold truncate ${selectedEmployee.id === emp.id ? 'text-blue-700' : 'text-slate-700'}`}>
                                                {emp.name}
                                            </h4>
                                            <span className="text-[10px] font-medium text-slate-400">{emp.id}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 truncate">{emp.role}</p>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        <StatusBadge status={emp.status} />
                                        <span className="text-xs font-bold text-slate-700">
                                            {formatCurrency(emp.salary / 12)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Detailed Payslip View & Tax Engine (Right Column) */}
                <div className="xl:col-span-8 flex flex-col gap-6">

                    {/* Control Bar */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-lg">
                                    {selectedEmployee.image}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 leading-tight">{selectedEmployee.name}</h2>
                                    <p className="text-xs text-slate-500">{selectedEmployee.role} • {selectedEmployee.department}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveTab('breakdown')}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'breakdown' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Slip View
                            </button>
                            <button
                                onClick={() => setActiveTab('tax-engine')}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'tax-engine' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <TrendingUp size={14} /> Smart Tax AI
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowAmounts(!showAmounts)}
                                className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                {showAmounts ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                            <button
                                onClick={() => setIsCorrectionMode(!isCorrectionMode)}
                                className={`p-2 rounded-lg transition-colors ${isCorrectionMode ? 'bg-amber-100 text-amber-600' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
                                title="Correction Mode"
                            >
                                <PenLine size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Correction Mode Panel */}
                    {isCorrectionMode && activeTab === 'breakdown' && (
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 animate-in slide-in-from-top-2">
                            <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
                                <PenLine size={16} /> Correction & Adjustment Mode
                                <span className="text-xs font-normal text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Only for Current Month</span>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-amber-700 uppercase mb-1 block">Payable Days</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={correctionData.payableDays}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value);
                                                setCorrectionData(prev => ({ ...prev, payableDays: val, lopDays: 31 - val }));
                                            }}
                                            max={31} min={0}
                                            className="w-full rounded-lg border-amber-200 outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2 font-bold text-slate-800"
                                        />
                                        <span className="text-amber-600 text-sm font-medium">/ 31</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-amber-700 uppercase mb-1 block">LOP Days</label>
                                    <div className="h-10 flex items-center px-3 bg-amber-100/50 rounded-lg border border-amber-200 text-amber-800 font-bold">
                                        {correctionData.lopDays}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-amber-700 uppercase mb-1 block">Bonus Adjustment</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold">₹</span>
                                        <input
                                            type="number"
                                            value={correctionData.bonusOverride}
                                            onChange={(e) => setCorrectionData(prev => ({ ...prev, bonusOverride: Number(e.target.value) }))}
                                            className="w-full rounded-lg border-amber-200 outline-none focus:ring-2 focus:ring-amber-500 pl-7 pr-3 py-2 font-bold text-slate-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Area */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px] flex flex-col relative">
                        {/* Decorative Top */}
                        <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                        {activeTab === 'breakdown' ? (
                            <div className="p-8 animate-in fade-in duration-300">
                                {/* Payslip Header */}
                                <div className="flex justify-between items-start mb-8 pb-6 border-b border-slate-100">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-800">Payslip</h3>
                                        <p className="text-slate-500 font-medium">January 2026</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Pay</p>
                                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                                            {showAmounts ? formatCurrency(
                                                (currentMonthlySalary * 0.4) + (currentMonthlySalary * 0.2) + (currentMonthlySalary * 0.3) + currentBonusPerMonth - (PF_MONTHLY + PROF_TAX + (calculateTax(selectedEmployee.salary, 'new') / 12))
                                            ) : '****'}
                                        </h2>
                                        <p className="text-xs text-emerald-600 font-bold mt-1 flex justify-end items-center gap-1">
                                            <CheckCircle2 size={12} /> Paid on Jan 31
                                        </p>
                                    </div>
                                </div>

                                {/* Earnings & Deductions Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {/* Earnings */}
                                    <div>
                                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Earnings
                                        </h4>
                                        <div className="space-y-3">
                                            {[
                                                { label: "Basic Salary", amount: currentMonthlySalary * 0.4 },
                                                { label: "HRA", amount: currentMonthlySalary * 0.2 },
                                                { label: "Special Allowance", amount: currentMonthlySalary * 0.3 },
                                                { label: "Performance Bonus", amount: currentBonusPerMonth, highlight: correctionData.bonusOverride > 0 },
                                            ].map((item, i) => (
                                                <div key={i} className={`flex justify-between text-sm py-1 border-b border-slate-50 last:border-0 hover:bg-slate-50 px-1 rounded transition-colors ${item.highlight ? 'bg-amber-50' : ''}`}>
                                                    <span className="text-slate-600 font-medium">{item.label}</span>
                                                    <span className={`font-bold ${item.highlight ? 'text-amber-600' : 'text-slate-900'}`}>
                                                        {showAmounts ? formatCurrency(item.amount) : '****'}
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between text-base pt-3 border-t border-slate-200 mt-2">
                                                <span className="text-slate-900 font-black">Gross Earnings</span>
                                                <span className="text-emerald-600 font-black">
                                                    {showAmounts ? formatCurrency(
                                                        (currentMonthlySalary * 0.4) + (currentMonthlySalary * 0.2) + (currentMonthlySalary * 0.3) + currentBonusPerMonth
                                                    ) : '****'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Deductions */}
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-red-50/30 rounded-xl -z-10"></div>
                                        <div className="p-4 rounded-xl">
                                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500"></div> Deductions
                                            </h4>
                                            <div className="space-y-3">
                                                {[
                                                    { label: "Provident Fund", amount: PF_MONTHLY },
                                                    { label: "Professional Tax", amount: PROF_TAX },
                                                    { label: "Income Tax (TDS)", amount: calculateTax(selectedEmployee.salary, 'new') / 12 },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex justify-between text-sm py-1 border-b border-slate-100 last:border-0 hover:bg-white px-1 rounded transition-colors">
                                                        <span className="text-slate-600 font-medium">{item.label}</span>
                                                        <span className="text-red-500 font-bold">
                                                            {showAmounts ? `-${formatCurrency(item.amount)}` : '****'}
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="flex justify-between text-base pt-3 border-t border-slate-200 mt-2">
                                                    <span className="text-slate-900 font-black">Total Deductions</span>
                                                    <span className="text-red-500 font-black">
                                                        {showAmounts ? `-${formatCurrency(PF_MONTHLY + PROF_TAX + (calculateTax(selectedEmployee.salary, 'new') / 12))}` : '****'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                                        <Shield size={12} className="text-slate-300" />
                                        <span>Securely signed by Zentra Payroll Systems.</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleEmailPayslip}
                                            disabled={isSendingEmail || emailSentSuccess}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${emailSentSuccess ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                                        >
                                            {isSendingEmail ? <Loader2 size={16} className="animate-spin" /> : (emailSentSuccess ? <CheckCircle2 size={16} /> : <Send size={16} />)}
                                            {emailSentSuccess ? 'Sent via Email' : 'Email'}
                                        </button>
                                        <button
                                            onClick={handleDownloadPayslipPDF}
                                            disabled={isDownloadingPdf}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white font-bold hover:bg-blue-600 transition-colors shadow-lg disabled:opacity-70"
                                        >
                                            {isDownloadingPdf ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                            {isDownloadingPdf ? 'Generating...' : 'PDF'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Smart Tax AI View
                            <div className="p-8 animate-in fade-in zoom-in-95 duration-300">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                                            <TrendingUp className="text-indigo-500" />
                                            Smart Tax AI Engine
                                        </h3>
                                        <p className="text-slate-500">Real-time FY 2025-26 projection & comparison.</p>
                                    </div>
                                    <div className="flex bg-slate-100 p-1 rounded-lg">
                                        <button
                                            onClick={() => setTaxRegime('new')}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${taxRegime === 'new' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                                        >
                                            NEW REGIME (Default)
                                        </button>
                                        <button
                                            onClick={() => setTaxRegime('old')}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${taxRegime === 'old' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                                        >
                                            OLD REGIME (Custom)
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <Calculator size={100} />
                                        </div>
                                        <h4 className="text-indigo-100 font-bold uppercase tracking-wider text-xs mb-2">Projected Annual Tax</h4>
                                        <div className="flex items-baseline gap-2 mb-6">
                                            <span className="text-4xl font-black">
                                                {formatCurrency(Math.floor(calculateTax(selectedEmployee.salary, taxRegime)))}
                                            </span>
                                            <span className="text-indigo-200 text-sm font-medium">/ year</span>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-indigo-100">Taxable Income</span>
                                                    <span className="font-bold">{formatCurrency(selectedEmployee.salary)}</span>
                                                </div>
                                                <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-400 h-full w-[80%]"></div>
                                                </div>
                                            </div>

                                            <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-start gap-3">
                                                <CheckCircle2 size={18} className="text-emerald-300 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-bold text-white">Analysis</p>
                                                    <p className="text-xs text-emerald-100 leading-relaxed">
                                                        {taxRegime === 'new'
                                                            ? "New Regime (u/s 115BAC) is generally beneficial for incomes > 15L without heavy exemptions."
                                                            : "Old Regime allows HRA, 80C, 80D deductions. Ensure you have proof of investments."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-2 md:col-span-1 flex flex-col justify-center">
                                        <h5 className="font-bold text-slate-800 mb-4">Calculation Breakdown</h5>
                                        <div className="space-y-3">
                                            {[
                                                { label: "Gross Salary", val: selectedEmployee.salary },
                                                { label: "Standard Deduction", val: -50000, highlight: true },
                                                { label: "Chapter VI-A (80C, 80D)", val: taxRegime === 'old' ? -150000 : 0, sub: taxRegime === 'new' ? "(Not applicable in New Regime)" : "" },
                                                { label: "HRA Exemption", val: taxRegime === 'old' ? -24000 : 0, sub: taxRegime === 'new' ? "(Not applicable in New Regime)" : "" },
                                            ].map((r, idx) => (
                                                <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                                                    <div>
                                                        <span className="text-slate-500 text-sm font-medium">{r.label}</span>
                                                        {r.sub && <p className="text-xs text-slate-400">{r.sub}</p>}
                                                    </div>
                                                    <span className={`font-bold ${r.highlight ? 'text-emerald-600' : 'text-slate-800'}`}>
                                                        {r.val < 0 ? '-' : ''}{formatCurrency(Math.abs(r.val))}
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="flex justify-between items-center pt-3 mt-1 border-t border-slate-200">
                                                <span className="text-slate-900 font-bold">Net Taxable Income</span>
                                                <span className="text-indigo-600 font-black text-lg">
                                                    {formatCurrency(selectedEmployee.salary - 50000 - (taxRegime === 'old' ? 174000 : 0))}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <Banknote className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-slate-800">Forecast Next Month</h5>
                                            <p className="text-xs text-slate-500">Based on current specific deductions.</p>
                                        </div>
                                    </div>
                                    <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                        View Details <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
