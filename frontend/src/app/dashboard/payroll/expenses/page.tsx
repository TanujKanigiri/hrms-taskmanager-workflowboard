"use client";

import React, { useState, useRef } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    FileText,
    DollarSign,
    Clock,
    CheckCircle2,
    XCircle,
    Receipt,
    Calendar,
    Plane,
    Coffee,
    Car,
    Briefcase,
    UploadCloud,
    Loader2,
    PieChart
} from 'lucide-react';

const CATEGORIES = [
    { id: 'travel', name: 'Travel', icon: Plane, color: 'blue' },
    { id: 'food', name: 'Food & Meals', icon: Coffee, color: 'amber' },
    { id: 'transport', name: 'Local Transport', icon: Car, color: 'emerald' },
    { id: 'office', name: 'Office Supplies', icon: Briefcase, color: 'purple' },
];

const INITIAL_CLAIMS = [
    { id: 'EXP-2026-001', category: 'travel', title: 'Flight to NYC Conference', date: '2026-01-15', amount: 45000.00, status: 'Approved', merchant: 'Delta Airlines' },
    { id: 'EXP-2026-002', category: 'food', title: 'Team Lunch', date: '2026-01-18', amount: 3500.00, status: 'Pending', merchant: 'Olive Garden' },
    { id: 'EXP-2026-003', category: 'transport', title: 'Uber to Airport', date: '2026-01-15', amount: 850.00, status: 'Approved', merchant: 'Uber' },
    { id: 'EXP-2026-004', category: 'office', title: 'Monitor Stand', date: '2026-01-10', amount: 1200.00, status: 'Rejected', merchant: 'Amazon', reason: 'Non-compliant category' },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);
};

export default function ExpensesPage() {
    const [claims, setClaims] = useState(INITIAL_CLAIMS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // New Claim Form
    const [newClaim, setNewClaim] = useState({
        category: 'travel',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        merchant: ''
    });

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: Record<string, string> = {
            Approved: "bg-emerald-50 text-emerald-600 border-emerald-100",
            Pending: "bg-amber-50 text-amber-600 border-amber-100",
            Rejected: "bg-red-50 text-red-600 border-red-100",
        };
        const icons: Record<string, any> = {
            Approved: CheckCircle2,
            Pending: Clock,
            Rejected: XCircle,
        };
        const Icon = icons[status] || Clock;

        return (
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 w-fit ${styles[status]}`}>
                <Icon size={14} />
                {status}
            </span>
        );
    };

    const handleCreateClaim = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const claim = {
                id: `EXP-2026-${Math.floor(Math.random() * 1000)}`,
                category: newClaim.category,
                title: newClaim.description || 'New Expense',
                date: newClaim.date,
                amount: parseFloat(newClaim.amount),
                status: 'Pending',
                merchant: newClaim.merchant || 'Unknown'
            };
            setClaims([claim, ...claims]);
            setIsProcessing(false);
            setIsCreateModalOpen(false);
            setNewClaim({ category: 'travel', amount: '', date: '', description: '', merchant: '' });
        }, 1500);
    };

    const handleSmartScanClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsScanning(true);
            // Simulate AI Scanning
            setTimeout(() => {
                setIsScanning(false);
                setNewClaim({
                    category: 'food',
                    amount: '450.00',
                    date: new Date().toISOString().split('T')[0],
                    description: 'Client Meeting Refreshments',
                    merchant: 'Starbucks'
                });
                setIsCreateModalOpen(true);
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12 relative">

            {/* Create Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
                    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-black text-xl text-slate-900">New Expense Claim</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                                <XCircle size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Category Grid */}
                            <div className="grid grid-cols-4 gap-2 mb-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setNewClaim({ ...newClaim, category: cat.id })}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${newClaim.category === cat.id ? `bg-${cat.color}-50 border-${cat.color}-200 text-${cat.color}-700 ring-2 ring-${cat.color}-100` : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <cat.icon size={20} />
                                        <span className="text-[10px] font-bold">{cat.name}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Amount (₹)</label>
                                    <input
                                        type="number"
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        placeholder="0.00"
                                        value={newClaim.amount}
                                        onChange={e => setNewClaim({ ...newClaim, amount: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Date</label>
                                    <input
                                        type="date"
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        value={newClaim.date}
                                        onChange={e => setNewClaim({ ...newClaim, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Merchant / Vendor</label>
                                <input
                                    type="text"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    placeholder="e.g. Uber, Starbucks"
                                    value={newClaim.merchant}
                                    onChange={e => setNewClaim({ ...newClaim, merchant: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Description</label>
                                <textarea
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-20 resize-none"
                                    placeholder="Details about the expense..."
                                    value={newClaim.description}
                                    onChange={e => setNewClaim({ ...newClaim, description: e.target.value })}
                                />
                            </div>

                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer group">
                                <UploadCloud className="text-slate-400 group-hover:text-blue-500 mb-2 transition-colors" />
                                <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">Attach Receipt</span>
                            </div>

                            <button
                                onClick={handleCreateClaim}
                                disabled={!newClaim.amount || isProcessing}
                                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 hover:scale-[1.02] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                                {isProcessing ? 'Submitting...' : 'Submit Claim'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Expenses & Claims</h1>
                    <p className="text-slate-500 font-medium mt-1">Track reimbursements, upload receipts, and manage approvals.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02]"
                >
                    <Plus size={20} />
                    New Claim
                </button>
            </div>

            {/* 2. Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group cursor-pointer hover:border-amber-200 hover:shadow-md transition-all">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Pending Approval</p>
                        <h3 className="text-3xl font-black text-slate-900">₹3,500.00</h3>
                        <p className="text-amber-600 text-xs font-bold mt-2 bg-amber-50 inline-block px-2 py-0.5 rounded">1 Claim Pending</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                        <Clock size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group cursor-pointer hover:border-emerald-200 hover:shadow-md transition-all">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Reimbursed (Jan)</p>
                        <h3 className="text-3xl font-black text-slate-900">₹45,850.00</h3>
                        <p className="text-emerald-600 text-xs font-bold mt-2 bg-emerald-50 inline-block px-2 py-0.5 rounded">Paid on Jan 20</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        <DollarSign size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-200 hover:shadow-md transition-all">
                    <div>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Claims</p>
                        <h3 className="text-3xl font-black text-slate-900">4</h3>
                        <p className="text-blue-600 text-xs font-bold mt-2 bg-blue-50 inline-block px-2 py-0.5 rounded">Lifetime</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <FileText size={24} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* 3. Claims List (Left) */}
                <div className="xl:col-span-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search claims..."
                                className="pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 text-sm font-bold transition-colors">
                            <Filter size={16} /> Filter
                        </button>
                    </div>

                    <div className="space-y-4">
                        {claims.map((claim) => {
                            const CategoryIcon = CATEGORIES.find(c => c.id === claim.category)?.icon || Receipt;
                            return (
                                <div key={claim.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-all group">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${claim.category === 'travel' ? 'bg-blue-100 text-blue-600' :
                                        claim.category === 'food' ? 'bg-amber-100 text-amber-600' :
                                            claim.category === 'transport' ? 'bg-emerald-100 text-emerald-600' :
                                                'bg-purple-100 text-purple-600'
                                        }`}>
                                        <CategoryIcon size={24} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-900 truncate pr-4">{claim.title}</h4>
                                            <span className="font-black text-slate-900 flex shrink-0">
                                                {formatCurrency(claim.amount)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {claim.date}</span>
                                            <span className="flex items-center gap-1"><Briefcase size={12} /> {claim.merchant}</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="uppercase tracking-wider">{claim.id}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 pl-4 border-l border-slate-100">
                                        <StatusBadge status={claim.status} />
                                        <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 4. Smart Scan & Analytics (Right) */}
                <div className="xl:col-span-4 space-y-6">

                    {/* Smart Scan Widget */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white text-center shadow-xl">
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-slate-700 shadow-inner group cursor-pointer hover:border-blue-500 transition-colors">
                            <Receipt size={32} className={`text-blue-500 ${isScanning ? 'animate-pulse' : ''}`} />
                        </div>

                        <h3 className="font-bold text-xl mb-2 text-white/90">
                            {isScanning ? 'Analyzing Receipt...' : 'Smart Scan AI'}
                        </h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            {isScanning ? 'Extracting merchant, date, and amount details.' : 'Drag & drop receipts here to auto-fill details.'}
                        </p>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={handleFileSelected}
                        />

                        <div
                            onClick={handleSmartScanClick}
                            className={`border-2 border-dashed border-slate-700 rounded-2xl py-6 hover:bg-slate-800/50 hover:border-blue-500/50 transition-all cursor-pointer group ${isScanning ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <span className="font-bold text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                                {isScanning ? 'Scanning...' : 'Browse Files'}
                            </span>
                        </div>
                    </div>

                    {/* Spend Distribution */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <PieChart size={18} className="text-slate-400" /> Spend Distribution
                        </h4>

                        <div className="space-y-4">
                            {[
                                { label: 'Travel & Stay', percent: 65, color: 'bg-blue-500' },
                                { label: 'Food & Meals', percent: 20, color: 'bg-amber-500' },
                                { label: 'Office Supplies', percent: 15, color: 'bg-purple-500' },
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                                        <span>{item.label}</span>
                                        <span>{item.percent}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

