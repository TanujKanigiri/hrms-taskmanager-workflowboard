'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, FileText, AlertCircle, Check } from 'lucide-react';
import Link from 'next/link';

export default function ApplyLeavePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-5 duration-500">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Apply for Leave</h1>
                    <p className="text-zinc-400">Fill out the form below to submit a new leave request.</p>
                </div>
                <Link
                    href="/dashboard"
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                    Cancel
                </Link>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Leave Type Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-zinc-300 ml-1">Select Leave Type</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {['Casual Leave', 'Sick Leave', 'Earned Leave'].map((type) => (
                                <label
                                    key={type}
                                    className={`
                    relative flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all
                    ${formData.leaveType === type
                                            ? 'bg-primary/20 border-primary text-white ring-1 ring-primary'
                                            : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:bg-white/5 hover:border-white/20'
                                        }
                  `}
                                >
                                    <input
                                        type="radio"
                                        name="leaveType"
                                        value={type}
                                        className="sr-only"
                                        onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                                    />
                                    <span className="font-semibold text-sm">{type}</span>
                                    {/* Mock Balances */}
                                    <span className="text-xs mt-1 opacity-60">
                                        {type === 'Casual Leave' ? '8' : type === 'Sick Leave' ? '5' : '15'} days left
                                    </span>

                                    {formData.leaveType === type && (
                                        <div className="absolute top-2 right-2 text-primary">
                                            <Check size={14} />
                                        </div>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-300 ml-1">Start Date</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors">
                                    <CalendarIcon size={18} />
                                </div>
                                <input
                                    type="date"
                                    required
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-zinc-300 ml-1">End Date</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors">
                                    <CalendarIcon size={18} />
                                </div>
                                <input
                                    type="date"
                                    required
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm [color-scheme:dark]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-300 ml-1">Reason for Leave</label>
                        <div className="relative group">
                            <div className="absolute left-3 top-4 text-zinc-500 group-focus-within:text-primary transition-colors">
                                <FileText size={18} />
                            </div>
                            <textarea
                                required
                                rows={4}
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-10 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm resize-none"
                                placeholder="Please describe the reason for your leave request..."
                            />
                        </div>
                    </div>

                    {/* Warning Banner */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
                        <AlertCircle size={20} className="shrink-0 text-amber-400" />
                        <p>
                            Please ensure your work is handed over before proceeding.
                            Applying for more than 3 days requires manager approval.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex items-center justify-end gap-4 border-t border-white/5">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white transition-all font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!formData.leaveType || !formData.startDate || isSubmitting}
                            className="px-8 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Application'
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
