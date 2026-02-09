'use client';

import React from 'react';
import {
    CheckSquare,
    User,
    Mail,
    Laptop,
    CreditCard,
    FileText,
    CheckCircle2,
    Clock,
    ChevronRight,
    PlayCircle
} from 'lucide-react';

export default function OnboardingPage() {

    const [selectedHire, setSelectedHire] = React.useState<any>(null);

    // Mock functionality for buttons
    const handleResendEmail = (name: string) => {
        alert(`📩 Welcome email resent to ${name}!`);
    };

    const hires = [
        {
            id: 1,
            name: 'John Doe',
            role: 'Backend Engineer',
            start: 'Mon, Oct 30',
            progress: 65,
            avatar: 'JD',
            department: 'Engineering',
            email: 'john.doe@example.com',
            steps: [
                { id: 1, name: 'Offer Signed', status: 'Completed', date: 'Oct 12', tasks: ['Review Offer', 'Sign Digital Contract', 'NDA Acceptance'] },
                { id: 2, name: 'Background Check', status: 'Completed', date: 'Oct 15', tasks: ['Identity Verification', 'Criminal Record Check', 'Employment History'] },
                { id: 3, name: 'IT Provisioning', status: 'In Progress', date: 'Due Oct 25', tasks: ['Laptop Configuration', 'Email Creation', 'GitHub Access', 'Slack Invite'] },
                { id: 4, name: 'Document Upload', status: 'Pending', date: 'Due Oct 28', tasks: ['Passport Scan', 'Tax Documents', 'Bank Details'] },
            ]
        },
        {
            id: 2,
            name: 'Alice Smith',
            role: 'Product Designer',
            start: 'Nov 06',
            progress: 20,
            avatar: 'AS',
            department: 'Design',
            email: 'alice.smith@example.com',
            steps: [
                { id: 1, name: 'Offer Signed', status: 'Completed', date: 'Oct 20', tasks: ['Review Offer', 'Sign Digital Contract'] },
                { id: 2, name: 'Background Check', status: 'In Progress', date: 'Due Oct 27', tasks: ['Identity Verification', 'Reference Check'] },
                { id: 3, name: 'IT Provisioning', status: 'Pending', date: 'Due Nov 01', tasks: ['MacBook Pro Order', 'Figma License'] },
                { id: 4, name: 'Document Upload', status: 'Pending', date: 'Due Nov 05', tasks: [] },
            ]
        }
    ];

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Onboarding <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Tracker</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Monitor and manage the onboarding journey of new hires.</p>
                </div>
                <button
                    onClick={() => window.location.href = '/dashboard/employees/onboard'}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    <CheckSquare size={18} /> New Onboarding
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Pending Hires', val: '5', color: 'bg-emerald-50 text-emerald-600', icon: User },
                    { label: 'Laptops Shipped', val: '3', color: 'bg-indigo-50 text-indigo-600', icon: Laptop },
                    { label: 'Pending Docs', val: '12', color: 'bg-amber-50 text-amber-600', icon: FileText },
                    { label: 'Avg Onboard Time', val: '4 Days', color: 'bg-blue-50 text-blue-600', icon: Clock },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900">{stat.val}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} font-bold`}>
                            <stat.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Hires List */}
            <div className="space-y-6">
                {hires.map((hire) => (
                    <div key={hire.id} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">

                        {/* Card Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform">
                                    {hire.avatar}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">{hire.name}</h2>
                                    <p className="text-slate-500 font-bold text-sm flex items-center gap-2 mt-1">
                                        <BriefcaseIcon size={14} className="text-slate-400" />
                                        {hire.role}
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold border border-emerald-100">Starts {hire.start}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="w-full md:w-72 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                                    <span>Onboarding Progress</span>
                                    <span className="text-slate-900">{hire.progress}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-slate-900 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                                        style={{ width: `${hire.progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Pipeline */}
                        <div className="relative px-2">
                            {/* Connecting Line - Desktop Only */}
                            <div className="absolute top-[26px] left-0 w-full h-[3px] bg-slate-100 -z-10 hidden md:block rounded-full"></div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {hire.steps.map((step, idx) => {
                                    const isCompleted = step.status === 'Completed';
                                    const isInProgress = step.status === 'In Progress';

                                    return (
                                        <div key={idx} className="relative bg-white md:bg-transparent p-4 md:p-0 rounded-xl border border-slate-100 md:border-none md:text-center flex md:block items-center gap-4 md:gap-0">
                                            {/* Status Circle */}
                                            <div className={`
                                                    w-14 h-14 rounded-full border-[4px] flex items-center justify-center mb-3 font-bold transition-all duration-300 relative z-10 shrink-0
                                                    md:mx-auto
                                                    ${isCompleted ? 'bg-emerald-500 border-white md:border-slate-50 text-white shadow-emerald-200 shadow-lg' :
                                                    isInProgress ? 'bg-amber-400 border-white md:border-slate-50 text-white shadow-amber-200 shadow-lg scale-110' :
                                                        'bg-slate-100 border-white md:border-slate-50 text-slate-400'}
                                                `}>
                                                {isCompleted ? <CheckCircle2 size={24} /> : <span>{idx + 1}</span>}

                                                {/* Pulse Effect for Active */}
                                                {isInProgress && (
                                                    <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping"></span>
                                                )}
                                            </div>

                                            <div>
                                                <h4 className={`font-bold text-sm ${step.status === 'Pending' ? 'text-slate-400' : 'text-slate-900'}`}>{step.name}</h4>
                                                <p className={`text-[11px] font-bold mt-1 inline-block px-2 py-0.5 rounded ${isCompleted ? 'text-emerald-600 bg-emerald-50' :
                                                    isInProgress ? 'text-amber-600 bg-amber-50' :
                                                        'text-slate-400 bg-slate-50'
                                                    }`}>
                                                    {isCompleted ? `Done ${step.date}` : step.date}
                                                </p>
                                            </div>

                                            {/* Mobile Vertical Connector */}
                                            {idx !== hire.steps.length - 1 && (
                                                <div className="absolute left-[39px] top-[60px] w-[3px] h-[30px] bg-slate-100 md:hidden -z-10"></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Actions Footer */}
                        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={() => handleResendEmail(hire.name)}
                                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group/btn"
                            >
                                <Mail size={16} className="text-slate-400 group-hover/btn:text-slate-600 transition-colors" /> Resend Welcome Email
                            </button>
                            <button
                                onClick={() => setSelectedHire(hire)}
                                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2"
                            >
                                View Checklist <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checklist Modal */}
            {selectedHire && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedHire(null)}></div>
                    <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

                        {/* Modal Header */}
                        <div className="bg-slate-50/80 p-6 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
                                    {selectedHire.avatar}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">{selectedHire.name}</h3>
                                    <p className="text-sm font-bold text-slate-500">Onboarding Checklist</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedHire(null)} className="p-2 bg-white rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
                                <XIcon size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-8">
                            {selectedHire.steps.map((step: any, idx: number) => (
                                <div key={idx} className="relative pl-8 border-l-2 border-slate-100 pb-2 last:border-0 last:pb-0">
                                    <div className={`
                                            absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm
                                            ${step.status === 'Completed' ? 'bg-emerald-500' : step.status === 'In Progress' ? 'bg-amber-500' : 'bg-slate-300'}
                                        `}></div>

                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-bold text-slate-900 text-lg">{step.name}</h4>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${step.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                            step.status === 'In Progress' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {step.status}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        {step.tasks && step.tasks.length > 0 ? (
                                            step.tasks.map((task: string, tIdx: number) => (
                                                <div key={tIdx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                                                    <div className={`
                                                            w-5 h-5 rounded flex items-center justify-center border transition-colors
                                                            ${step.status === 'Completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white text-transparent'}
                                                        `}>
                                                        <CheckIcon size={12} strokeWidth={4} />
                                                    </div>
                                                    <span className={`text-sm font-medium ${step.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                        {task}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-400 italic">No specific tasks listed.</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                            <button onClick={() => setSelectedHire(null)} className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg active:scale-95 transition-all">
                                Close Checklist
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

function BriefcaseIcon({ size, className }: { size: number, className?: string }) { return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg> }
function XIcon({ size }: { size: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg> }
function CheckIcon({ size, strokeWidth }: { size: number, strokeWidth: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> }
