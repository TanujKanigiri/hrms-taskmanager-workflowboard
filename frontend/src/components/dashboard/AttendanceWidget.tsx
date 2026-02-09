'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Power,
    Zap,
    Coffee,
    LogOut,
    MapPin,
    Wifi,
    Activity,
    BrainCircuit,
    CheckCircle2,
    Timer,
    AlertTriangle
} from 'lucide-react';

type AttendanceStatus = 'idle' | 'active' | 'break' | 'summary';

export default function AttendanceWidget() {
    const [status, setStatus] = useState<AttendanceStatus>('idle');
    const [holdProgress, setHoldProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);

    // Timer States
    const [workTime, setWorkTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [efficiency, setEfficiency] = useState(100);
    const [currentTime, setCurrentTime] = useState(new Date());

    // MANDATORY DATE & TIME
    const [checkInTime, setCheckInTime] = useState<Date | null>(null);
    const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
    const [checkoutReason, setCheckoutReason] = useState<'manual' | 'auto'>('manual');

    // Auto-Checkout State
    const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    const WARNING_BUFFER = 60 * 1000; // 1 minute warning before checkout
    const lastActivityRef = useRef<number>(Date.now());
    const [showIdleWarning, setShowIdleWarning] = useState(false);
    const [idleCountdown, setIdleCountdown] = useState(60);

    const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // --- PERSISTENCE LOADER ---
    useEffect(() => {
        const savedSession = localStorage.getItem('zentra_attendance_session');
        if (savedSession) {
            try {
                const session = JSON.parse(savedSession);
                // Restore session
                if (session.status !== 'summary' && session.status !== 'idle') {
                    setStatus(session.status);
                    setCheckInTime(new Date(session.checkInTime));

                    // Recalculate Work Time based on real elapsed time
                    const now = Date.now();
                    const startRaw = new Date(session.checkInTime).getTime();
                    const totalBreaks = session.totalBreakDuration || 0;

                    if (session.status === 'active') {
                        setWorkTime(Math.floor((now - startRaw - totalBreaks) / 1000));
                        setBreakTime(Math.floor(totalBreaks / 1000));
                    } else if (session.status === 'break') {
                        // If we were in a break, work time is frozen at break start
                        const breakStart = session.breakStartTime || now;
                        setWorkTime(Math.floor((breakStart - startRaw - totalBreaks) / 1000));
                        setBreakTime(Math.floor((totalBreaks + (now - breakStart)) / 1000));
                    }
                }
            } catch (e) {
                console.error("Failed to restore attendance session", e);
            }
        }
    }, []);

    // --- PERSISTENCE SAVER ---
    useEffect(() => {
        if (status === 'idle' || status === 'summary') {
            // Clear session only if we are truly done (handled in endShift/reset)
            if (status === 'summary') localStorage.removeItem('zentra_attendance_session');
            return;
        };

        const sessionData = {
            status,
            checkInTime: checkInTime?.toISOString(),
            // We need to store break details to resume correctly
            breakStartTime: status === 'break' ? Date.now() - (breakTime * 1000) : null, // Approx for resume
            totalBreakDuration: breakTime * 1000,
            lastActive: Date.now()
        };
        localStorage.setItem('zentra_attendance_session', JSON.stringify(sessionData));
    }, [status, checkInTime, breakTime, workTime]);

    // Clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Idle Detection Logic
    useEffect(() => {
        const handleActivity = () => {
            lastActivityRef.current = Date.now();
            if (showIdleWarning) {
                setShowIdleWarning(false);
            }
        };

        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => window.addEventListener(event, handleActivity));

        return () => {
            events.forEach(event => window.removeEventListener(event, handleActivity));
        };
    }, [showIdleWarning]);

    // Idle Timer Check
    useEffect(() => {
        if (status !== 'active' && status !== 'break') return;

        const interval = setInterval(() => {
            const now = Date.now();
            const timeSinceLastActivity = now - lastActivityRef.current;

            if (timeSinceLastActivity >= IDLE_TIMEOUT) {
                // Perform Auto Checkout
                setCheckoutReason('auto');
                endShift(true);
            } else if (timeSinceLastActivity >= IDLE_TIMEOUT - WARNING_BUFFER) {
                // Show Warning
                if (!showIdleWarning) setShowIdleWarning(true);
                setIdleCountdown(Math.ceil((IDLE_TIMEOUT - timeSinceLastActivity) / 1000));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [status, showIdleWarning]);

    // Timers Logic (Productivity & Break)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === 'active') {
            interval = setInterval(() => {
                setWorkTime(t => t + 1);
                // Slight random efficiency flux
                if (Math.random() > 0.9) setEfficiency(prev => Math.max(90, Math.min(100, prev + (Math.random() > 0.5 ? 1 : -1))));
            }, 1000);
        } else if (status === 'break') {
            interval = setInterval(() => setBreakTime(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    // Hold-to-Start Logic
    useEffect(() => {
        if (isHolding && status === 'idle') {
            holdIntervalRef.current = setInterval(() => {
                setHoldProgress(prev => {
                    if (prev >= 100) {
                        setStatus('active');
                        // START SESSION
                        const now = new Date();
                        setCheckInTime(now);

                        // Initialize Session in Storage
                        localStorage.setItem('zentra_attendance_session', JSON.stringify({
                            status: 'active',
                            checkInTime: now.toISOString(),
                            totalBreakDuration: 0,
                            lastActive: Date.now()
                        }));

                        lastActivityRef.current = Date.now(); // Reset idle timer on start
                        setIsHolding(false);
                        return 100;
                    }
                    return prev + 2; // Speed of fill
                });
            }, 20);
        } else {
            // Drain logic if released
            if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
            if (status === 'idle' && holdProgress > 0) {
                const drain = setInterval(() => {
                    setHoldProgress(prev => {
                        if (prev <= 0) {
                            clearInterval(drain);
                            return 0;
                        }
                        return prev - 5;
                    });
                }, 10);
            }
        }
        return () => {
            if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        };
    }, [isHolding, status]);

    const handleHoldStart = () => setIsHolding(true);
    const handleHoldEnd = () => setIsHolding(false);

    const toggleBreak = () => setStatus(prev => prev === 'active' ? 'break' : 'active');

    // CAPTURE MANDATORY END TIME & DB SAVE
    const endShift = (isAuto: boolean = false) => {
        const outTime = new Date();
        setCheckOutTime(outTime);
        setStatus('summary');
        if (!isAuto) setCheckoutReason('manual');

        // --- SIMULATE DATABASE SAVE ---
        const record = {
            id: Date.now(),
            date: checkInTime?.toLocaleDateString(),
            checkIn: checkInTime?.toISOString(),
            checkOut: outTime.toISOString(),
            totalDurationSeconds: workTime,
            breaksDurationSeconds: breakTime,
            status: 'Completed',
            efficiency: efficiency
        };

        // 1. Clear Active Session
        localStorage.removeItem('zentra_attendance_session');

        // 2. Save to "Database" (Persistent Storage)
        const existingDB = JSON.parse(localStorage.getItem('zentra_attendance_db') || '[]');
        localStorage.setItem('zentra_attendance_db', JSON.stringify([...existingDB, record]));

        console.log("Attendance Record Saved to DB:", record);
        alert(`Shift Ended.\nData stored in database at ${outTime.toLocaleTimeString()}`);
    };

    const resetWidget = () => {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setHoldProgress(0);
        setWorkTime(0);
        setBreakTime(0);
        setEfficiency(100);
        setCheckInTime(null);
        setCheckOutTime(null);
        setIsHolding(false);
        setStatus('idle');
        setCheckoutReason('manual');
        setShowIdleWarning(false);
        // Ensure session is cleared
        localStorage.removeItem('zentra_attendance_session');
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const formatClockTime = (date: Date | null) => {
        if (!date) return '--:--';
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="relative overflow-hidden bg-[#0f172a] rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl group transition-all duration-500 hover:border-cyan-500/30">

            {/* Dynamic Backgrounds */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${status === 'active' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-[#0f172a] to-blue-900/20"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
            </div>
            <div className={`absolute inset-0 transition-opacity duration-1000 ${status === 'break' ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-[#0f172a] to-orange-900/20"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start mb-8">
                <div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                        <Wifi size={12} className={status === 'active' ? 'text-cyan-400' : 'text-slate-600'} />
                        ZEN_CORE_V1
                    </div>
                    <div className="text-3xl font-black text-white tracking-tighter tabular-nums text-shadow-glow">
                        {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </div>
                    <div className="text-xs text-slate-500 font-bold mt-1">
                        {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                </div>

                {/* Status Dot */}
                <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-colors duration-500 ${status === 'active' ? 'bg-cyan-400 text-cyan-400 animate-pulse' :
                    status === 'break' ? 'bg-amber-400 text-amber-400 animate-pulse' :
                        'bg-slate-600 text-slate-600'
                    }`}></div>
            </div>

            {/* Main Interaction Zone */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[200px]">

                {status === 'idle' ? (
                    /* HOLD TO START INTERFACE */
                    <div className="relative group/core cursor-pointer"
                        onMouseDown={handleHoldStart}
                        onMouseUp={handleHoldEnd}
                        onMouseLeave={handleHoldEnd}
                        onTouchStart={handleHoldStart}
                        onTouchEnd={handleHoldEnd}
                    >
                        {/* Rotating Rings */}
                        <div className={`absolute inset-[-20px] rounded-full border-2 border-dashed border-slate-700 transition-all duration-1000 ${isHolding ? 'animate-[spin_2s_linear_infinite] border-cyan-500/50 scale-110' : 'scale-100'}`}></div>
                        <div className={`absolute inset-[-10px] rounded-full border border-slate-600 transition-all duration-1000 ${isHolding ? 'animate-[spin_3s_linear_infinite_reverse] border-cyan-400/30 scale-105' : 'scale-100'}`}></div>

                        {/* Progress Fill (Conic Gradient) */}
                        <div className="absolute inset-[-4px] rounded-full opacity-0 transition-opacity duration-200" style={{ opacity: isHolding ? 1 : 0 }}>
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="48" fill="none" stroke="#22d3ee" strokeWidth="4"
                                    strokeDasharray="301.59"
                                    strokeDashoffset={301.59 - (301.59 * holdProgress) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Core Button */}
                        <div className={`
                            relative w-28 h-28 rounded-full bg-[#0f172a] border-4 flex items-center justify-center shadow-2xl transition-all duration-200
                            ${isHolding ? 'border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.4)] scale-95' : 'border-slate-700 hover:border-slate-500'}
                        `}>
                            <Power size={32} className={`transition-all duration-300 ${isHolding ? 'text-white scale-110' : 'text-slate-500'}`} />
                        </div>

                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isHolding ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`}>
                                {isHolding ? 'Initializing...' : 'Hold to Ignite'}
                            </span>
                        </div>
                    </div>

                ) : status === 'summary' ? (

                    /* SUMMARY CARD WITH MANDATORY FIELDS */
                    <div className="w-full animate-in zoom-in-95 duration-500">
                        <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700 text-center relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute inset-0 bg-cyan-500/5"></div>
                            <CheckCircle2 size={40} className="text-cyan-400 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-white mb-1">Daily Report</h3>
                            {checkoutReason === 'auto' && (
                                <div className="text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-4 animate-pulse">
                                    Auto-Checkout Executed
                                </div>
                            )}
                            <div className={`space-y-3 ${checkoutReason === 'auto' ? 'mb-6 mt-2' : 'mb-6 mt-4'} text-sm`}>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-slate-500">Date</span>
                                    <span className="text-white font-medium">{checkInTime?.toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-slate-500">Check In</span>
                                    <span className="text-cyan-400 font-bold">{formatClockTime(checkInTime)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-slate-500">Check Out</span>
                                    <span className="text-amber-400 font-bold">{formatClockTime(checkOutTime)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-slate-500">Breaks</span>
                                    <span className="text-slate-300 font-mono">{formatTime(breakTime)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-slate-500 font-bold uppercase">Total Work</span>
                                    <span className="text-white font-mono font-bold text-lg">{formatTime(workTime)}</span>
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    resetWidget();
                                }}
                                className="relative z-50 w-full py-3 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
                            >
                                Reset System
                            </button>
                        </div>
                    </div>

                ) : (

                    /* ACTIVE DASHBOARD */
                    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">

                        {/* IDLE WARNING OVERLAY */}
                        {showIdleWarning && (
                            <div className="absolute inset-[-1rem] z-50 bg-slate-900/90 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in-95 duration-300 border-2 border-amber-500/50">
                                <AlertTriangle size={48} className="text-amber-500 mb-4 animate-bounce" />
                                <h3 className="text-xl font-bold text-white mb-2">Idle Detected</h3>
                                <p className="text-slate-400 text-sm mb-6 max-w-[200px]">
                                    You will be automatically checked out in
                                </p>
                                <div className="text-4xl font-black text-amber-500 tabular-nums">
                                    {idleCountdown}s
                                </div>
                                <button
                                    onClick={() => {
                                        lastActivityRef.current = Date.now();
                                        setShowIdleWarning(false);
                                    }}
                                    className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-colors"
                                >
                                    I'm Still Here
                                </button>
                            </div>
                        )}

                        {/* Main Timer */}
                        <div className="text-center relative py-4">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-xl"></div>
                            <div className={`text-6xl font-black tracking-tighter tabular-nums mb-1 relative z-10 ${status === 'break' ? 'text-amber-500' : 'text-white'}`}>
                                {formatTime(status === 'active' ? workTime : breakTime)}
                            </div>

                            <div className="flex items-center justify-center gap-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-white/5 backdrop-blur-sm text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <Zap size={10} className={`${status === 'active' ? 'text-cyan-400' : 'text-slate-600'}`} />
                                    {status === 'active' ? 'High Performance' : 'System Paused'}
                                </div>
                                {/* Mandatory Check In Time Display */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-white/5 backdrop-blur-sm text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    In: {formatClockTime(checkInTime)}
                                </div>
                            </div>
                        </div>

                        {/* Metric Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 hover:bg-slate-800/60 transition-colors group/card">
                                <div className="flex items-center gap-2 mb-2">
                                    <BrainCircuit size={14} className="text-cyan-400" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Focus Score</span>
                                </div>
                                <div className="text-2xl font-bold text-white flex items-end gap-1">
                                    {efficiency}<span className="text-sm text-slate-500 mb-1">%</span>
                                </div>
                            </div>

                            <div className="bg-slate-800/40 p-4 rounded-2xl border border-white/5 hover:bg-slate-800/60 transition-colors group/card">
                                <div className="flex items-center gap-2 mb-2">
                                    <Timer size={14} className="text-amber-400" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Break Used</span>
                                </div>
                                <div className="text-xl font-bold text-white font-mono">
                                    {formatTime(breakTime).slice(0, 5)}
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-3">
                            <button
                                onClick={toggleBreak}
                                className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${status === 'active'
                                    ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/30'
                                    : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/30'
                                    }`}
                            >
                                <Coffee size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">{status === 'active' ? 'Pause' : 'Resume'}</span>
                            </button>

                            <button
                                onClick={() => endShift(false)}
                                className="w-16 flex items-center justify-center rounded-2xl bg-slate-800 text-slate-400 hover:bg-rose-500/20 hover:text-rose-500 hover:border-rose-500/30 border border-transparent transition-all"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
