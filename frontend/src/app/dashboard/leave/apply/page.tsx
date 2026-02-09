"use client";

import React, { useState, useEffect } from 'react';
import {
    Calendar as CalendarIcon,
    ArrowLeft,
    ChevronRight,
    Plane,
    Umbrella,
    AlertCircle,
    Coffee,
    Baby,
    HeartPulse,
    Search,
    Check,
    Briefcase,
    BookOpen,
    Home,
    Monitor,
    Users,
    Clock,
    UserCheck,
    Building,
    FileCheck,
    CheckCircle2,
    Loader2,
    UploadCloud,
    X,
    Moon
} from 'lucide-react';
import Link from 'next/link';

// Mock User Profile Context
const USER_PROFILE = {
    name: "Alex Johnson",
    role: "Senior Developer",
    gender: "Female", // Change to 'Male' to test Paternity visibility
    manager: "Sarah Connor"
};

export default function ApplyLeavePage() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');
    const [isHalfDay, setIsHalfDay] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Validation Errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Calculated fields
    const [duration, setDuration] = useState(0);

    // Enhanced Leave Types
    const leaveTypes = [
        { id: 'sick', label: 'Sick Leave', icon: Umbrella, color: 'bg-amber-100 text-amber-600', balance: 5, category: 'Health' },
        { id: 'casual', label: 'Casual Leave', icon: Coffee, color: 'bg-emerald-100 text-emerald-600', balance: 8, category: 'Personal' },
        { id: 'privilege', label: 'Privilege Leave', icon: Plane, color: 'bg-blue-100 text-blue-600', balance: 14, category: 'Personal' },
        { id: 'maternity', label: 'Maternity', icon: Baby, color: 'bg-pink-100 text-pink-600', balance: 90, category: 'Family', gender: 'Female' },
        { id: 'paternity', label: 'Paternity', icon: Users, color: 'bg-indigo-100 text-indigo-600', balance: 14, category: 'Family', gender: 'Male' },
        { id: 'bereavement', label: 'Bereavement', icon: HeartPulse, color: 'bg-slate-100 text-slate-600', balance: 5, category: 'Family' },
        { id: 'study', label: 'Study Leave', icon: BookOpen, color: 'bg-cyan-100 text-cyan-600', balance: 7, category: 'Career' },
        { id: 'sabbatical', label: 'Sabbatical', icon: Briefcase, color: 'bg-purple-100 text-purple-600', balance: 0, category: 'Career' },
        { id: 'wfh', label: 'Work From Home', icon: Home, color: 'bg-orange-100 text-orange-600', balance: '∞', category: 'Remote' },
        { id: 'comp_off', label: 'Compensatory Off', icon: Monitor, color: 'bg-lime-100 text-lime-600', balance: 2, category: 'Work' },
    ];

    // Filter Logic based on Gender
    const authorizedLeaveTypes = leaveTypes.filter(type => !type.gender || type.gender === USER_PROFILE.gender);

    // Reset form when type changes
    const handleTypeSelect = (id: string) => {
        setSelectedType(id);
        setErrors({});
        setUploadedFile(null);
        // Reset form date/inputs
        setFromDate('');
        setToDate('');
        setReason('');
        setIsHalfDay(false);
    };

    // Calculate Duration
    useEffect(() => {
        if (fromDate && toDate) {
            const start = new Date(fromDate);
            const end = new Date(toDate);
            if (start <= end) {
                const diffTime = Math.abs(end.getTime() - start.getTime());
                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                if (isHalfDay) diffDays -= 0.5;
                setDuration(diffDays);
            } else {
                setDuration(0);
            }
        } else {
            setDuration(0);
        }
    }, [fromDate, toDate, isHalfDay]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!fromDate) newErrors.fromDate = "Start date is required";
        if (!toDate) newErrors.toDate = "End date is required";

        if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
            newErrors.toDate = "End date cannot be before start date";
        }

        if (!reason.trim()) newErrors.reason = "Reason is required";

        // Logic: Sick Leave > 3 days requires file
        if (selectedType === 'sick' && duration > 3 && !uploadedFile) {
            newErrors.file = "Medical certificate is required for leaves > 3 days";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitted(true);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Nav / Back */}
            <div className="mb-8 flex justify-between items-center">
                <Link href="/dashboard/my-portal/leaves" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors">
                    <ArrowLeft size={16} /> Back to My Leaves
                </Link>
                {/* Mock User Toggle (For Demo Purpose) */}
                <span className="text-xs font-bold text-slate-300 bg-slate-100 px-3 py-1 rounded-full">
                    Viewing as: {USER_PROFILE.gender} User
                </span>
            </div>

            {isSubmitted ? (
                /* SUCCESS / WORKFLOW VIEW */
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>

                        <div className="p-10 text-center border-b border-slate-50">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-800 mb-2">Request Submitted Successfully!</h2>
                            <p className="text-slate-500 text-lg">Your leave request has been initiated. You can track the status below.</p>
                        </div>

                        <div className="p-10 bg-slate-50/50">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8 text-center">Approval Workflow</h3>

                            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
                                {/* Connector Line */}
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
                                <div className="absolute top-1/2 left-0 w-1/3 h-1 bg-emerald-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-1000"></div>

                                {/* Step 1: Submitted */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-50">
                                        <Check size={20} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-slate-800">Submitted</p>
                                        <p className="text-[10px] font-bold text-slate-400">Just Now</p>
                                    </div>
                                </div>

                                {/* Step 2: Manager Review */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-md animate-pulse">
                                        <UserCheck size={20} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-emerald-600">Manager Review</p>
                                        <p className="text-[10px] font-bold text-slate-400">Pending</p>
                                    </div>
                                </div>

                                {/* Step 3: HR Validation (Conditional) */}
                                <div className="flex flex-col items-center gap-3 opacity-50">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-300 flex items-center justify-center">
                                        <Building size={20} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-slate-400">HR Validation</p>
                                        <p className="text-[10px] font-bold text-slate-300">Queue</p>
                                    </div>
                                </div>

                                {/* Step 4: Final Approval */}
                                <div className="flex flex-col items-center gap-3 opacity-50">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-300 flex items-center justify-center">
                                        <FileCheck size={20} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-slate-400">Approve</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 flex justify-center bg-white">
                            <Link href="/dashboard/my-portal/leaves" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-900/20">
                                Return to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>

            ) : (
                /* FORM VIEW */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    <div className="space-y-10">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Plan your time off.</h1>
                            <p className="text-lg text-slate-500 font-medium">Select a leave type to get started details.</p>
                        </div>

                        {/* Step 1: Type Selection */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">01. Select Type</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {authorizedLeaveTypes.map((type) => {
                                    const Icon = type.icon;
                                    const isSelected = selectedType === type.id;
                                    return (
                                        <button
                                            key={type.id}
                                            onClick={() => handleTypeSelect(type.id)}
                                            className={`
                                                relative flex flex-col items-center text-center p-4 rounded-[1.5rem] border transition-all duration-300 group
                                                ${isSelected
                                                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20 scale-[1.05] z-10'
                                                    : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md'}
                                            `}
                                        >
                                            <div className={`
                                                w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors
                                                ${isSelected ? 'bg-white/10 text-white' : type.color}
                                            `}>
                                                <Icon size={20} />
                                            </div>
                                            <span className={`text-sm font-bold mb-1 leading-tight ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                                {type.label}
                                            </span>
                                            <span className={`text-[10px] font-bold ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                                                {type.balance} Left
                                            </span>

                                            {isSelected && (
                                                <div className="absolute top-2 right-2 text-emerald-400">
                                                    <Check size={14} />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Duration & Reason */}
                        {selectedType && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 pl-1">02. Duration & Reason</label>

                                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">From {errors.fromDate && <span className="text-red-500 text-xs">*</span>}</label>
                                            <input
                                                type="date"
                                                className={`w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-medium text-slate-800 focus:ring-2 focus:ring-slate-900 transition-all font-sans ${errors.fromDate ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`}
                                                value={fromDate}
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                            {errors.fromDate && <p className="text-xs text-red-500 font-bold mt-1">{errors.fromDate}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">To {errors.toDate && <span className="text-red-500 text-xs">*</span>}</label>
                                            <input
                                                type="date"
                                                className={`w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-medium text-slate-800 focus:ring-2 focus:ring-slate-900 transition-all font-sans ${errors.toDate ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`}
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                            />
                                            {errors.toDate && <p className="text-xs text-red-500 font-bold mt-1">{errors.toDate}</p>}
                                        </div>
                                    </div>

                                    {/* Half Day & Custom Toggles */}
                                    <div className="flex items-center gap-4 py-2">
                                        <button
                                            onClick={() => setIsHalfDay(!isHalfDay)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${isHalfDay ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                        >
                                            {isHalfDay ? <Moon size={16} className="fill-current" /> : <Moon size={16} />}
                                            Half Day Request
                                        </button>
                                        {isHalfDay && <span className="text-xs font-bold text-emerald-500 animate-in fade-in">-0.5 Days</span>}
                                    </div>

                                    {/* Conditional Alert for Sick Leave */}
                                    {selectedType === 'sick' && (
                                        <div className="animate-in zoom-in-95 duration-300">
                                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 text-amber-800 text-sm font-medium mb-3">
                                                <AlertCircle className="shrink-0" size={20} />
                                                <p>Applying for more than 3 days of Sick Leave requires a medical certificate upload.</p>
                                            </div>

                                            {/* File Upload Logic */}
                                            {duration > 3 && (
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        id="file-upload"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                        accept=".pdf,.jpg,.png,.jpeg"
                                                    />
                                                    <label
                                                        htmlFor="file-upload"
                                                        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:bg-amber-50/50 ${errors.file ? 'border-red-300 bg-red-50/50' : 'border-amber-200 bg-amber-50/30'}`}
                                                    >
                                                        {uploadedFile ? (
                                                            <div className="flex flex-col items-center text-emerald-600">
                                                                <CheckCircle2 size={32} className="mb-2" />
                                                                <span className="text-sm font-bold">{uploadedFile.name}</span>
                                                                <span className="text-xs opacity-70">Click to change</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col items-center text-amber-600/70">
                                                                <UploadCloud size={32} className="mb-2" />
                                                                <span className="text-sm font-bold">Upload Medical Certificate</span>
                                                                <span className="text-xs opacity-70">PDF, JPG up to 5MB</span>
                                                            </div>
                                                        )}
                                                    </label>
                                                    {errors.file && <p className="text-xs text-red-500 font-bold mt-2 text-center">{errors.file}</p>}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Conditional Alert for WFH */}
                                    {selectedType === 'wfh' && (
                                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3 text-orange-800 text-sm font-medium animate-in zoom-in-95">
                                            <Home className="shrink-0" size={20} />
                                            <p>Ensure you have a stable internet connection and are reachable during work hours.</p>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Reason {errors.reason && <span className="text-red-500 text-xs">*</span>}</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Briefly explain why you are taking this leave..."
                                            className={`w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-medium text-slate-800 focus:ring-2 focus:ring-slate-900 resize-none transition-all ${errors.reason ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`}
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                        ></textarea>
                                        {errors.reason && <p className="text-xs text-red-500 font-bold mt-1">{errors.reason}</p>}
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white font-black text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            Submitting Request...
                                        </>
                                    ) : (
                                        <>
                                            Submit Request <ChevronRight size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Side: "The Ticket" / Summary Preview */}
                    <div className="hidden lg:block sticky top-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden transition-all duration-300">
                            {/* Ticket Perforation Effect */}
                            <div className="absolute -left-3 top-1/2 w-6 h-6 bg-slate-50 rounded-full"></div>
                            <div className="absolute -right-3 top-1/2 w-6 h-6 bg-slate-50 rounded-full"></div>
                            <div className="absolute left-8 right-8 top-1/2 h-0 border-t-2 border-dashed border-slate-100"></div>

                            <div className="pb-10 text-center">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Leave Preview</span>
                                <div className="mt-6 flex justify-center">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                        {selectedType ? (
                                            (() => {
                                                const T = leaveTypes.find(t => t.id === selectedType);
                                                const I = T?.icon || CalendarIcon;
                                                return <I size={32} className="text-slate-800 animate-in zoom-in duration-300" />;
                                            })()
                                        ) : (
                                            <CalendarIcon size={32} />
                                        )}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 mt-4 min-h-[2rem]">
                                    {selectedType ? leaveTypes.find(t => t.id === selectedType)?.label : 'Select Type...'}
                                </h2>
                                <p className="text-slate-500 font-medium">
                                    {fromDate && toDate ? (
                                        <span className="animate-in fade-in">{new Date(fromDate).toLocaleDateString()} - {new Date(toDate).toLocaleDateString()}</span>
                                    ) : (
                                        'Choose dates'
                                    )}
                                </p>
                            </div>

                            <div className="pt-10 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-400">Leave Balance</span>
                                    <span className="font-black text-slate-800">
                                        {selectedType ? leaveTypes.find(t => t.id === selectedType)?.balance : '-'} Days
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-400">Selected Duration</span>
                                    <span className={`font-black ${selectedType === 'wfh' ? 'text-orange-500' : 'text-red-500'}`}>
                                        {selectedType === 'wfh' ? 'N/A' : (
                                            duration > 0 ? (
                                                <span className="animate-in zoom-in">- {duration} Day{duration !== 1 ? 's' : ''}</span>
                                            ) : '-'
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-100">
                                    <span className="font-bold text-slate-400">Projected Balance</span>
                                    <span className="font-black text-emerald-600">
                                        {selectedType
                                            ? (typeof leaveTypes.find(t => t.id === selectedType)?.balance === 'number'
                                                ? (leaveTypes.find(t => t.id === selectedType)?.balance as number) - (selectedType === 'wfh' ? 0 : duration)
                                                : '∞')
                                            : '-'
                                        } Days
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                                    AJ
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">Approves By</p>
                                    <p className="text-sm font-bold text-slate-900">{USER_PROFILE.manager}</p>
                                </div>
                            </div>

                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px]"></div>
                        <div className="absolute -z-10 bottom-10 -left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"></div>
                    </div>
                </div>
            )}

        </div>
    );
}
