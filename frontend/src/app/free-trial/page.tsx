"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, EyeOff, Check } from "lucide-react";

export default function FreeTrialPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [subscriptionType, setSubscriptionType] = useState('hrms-recruitment');

    return (
        <main className="min-h-screen bg-white text-slate-900 flex flex-col">
            {/* Navbar handled globally */}

            {/* Hero Section */}
            <div className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Image
                        src="/hero_modern_hrms.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200 leading-tight mb-6 drop-shadow-md max-w-4xl pb-1">
                        Simplifying HR Operations for You
                    </h1>
                </div>

                {/* STYLISH ORGANIC LAYERED DIVIDER */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white opacity-25"></path>
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-white opacity-50"></path>
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
                    </svg>
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Graphic */}
                    <div className="hidden lg:flex flex-col items-center justify-center px-8">
                        <div className="relative w-full max-w-[400px] aspect-square mb-6">
                            <Image
                                src="/feature_dashboard_dark.png"
                                alt="ZentraHR Dark Mode Dashboard"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="relative w-12 h-12 bg-white rounded-full p-1 shadow-sm border border-slate-100">
                                <Image
                                    src="/zentra_logo.png"
                                    alt="ZentraHR Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight font-sans leading-none flex items-center gap-0.5">
                                <span className="text-blue-900">Zentra</span>
                                <span className="text-red-600">HR</span>
                            </h2>
                        </div>
                        <ul className="space-y-4 w-full max-w-md">
                            {[
                                "Unified HR Platform for the Modern Workforce",
                                "Enterprise-Grade Security with Scalable Architecture",
                                "Automated Payroll, Taxation & Statutory Compliance",
                                "Data-Driven Reports with Actionable Insights",
                                "End-to-End Employee Lifecycle Management"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <span className="text-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-lg font-bold text-[#005bb5] text-center">
                            Simplify HR Operations. Amplify Productivity.
                        </p>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full max-w-lg mx-auto lg:mx-0 bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 relative overflow-hidden">
                        {/* Decorative top shimmer */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-blue-600 to-red-500"></div>

                        <div className="mb-8">
                            <h2 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600 uppercase tracking-[0.2em] mb-3">
                                Start Your Free Trial
                            </h2>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Create your account</h1>
                            <p className="text-slate-500 text-sm">Join thousands of companies managing their workforce smarter.</p>
                        </div>

                        <form className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Organization Name</label>
                                <input
                                    type="text"
                                    placeholder="Acme Corp"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 font-medium"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Work Email</label>
                                <input
                                    type="email"
                                    placeholder="john@company.com"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 font-medium"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Phone Number</label>
                                <div className="flex gap-2">
                                    <select className="px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none text-slate-700 font-medium min-w-[80px]">
                                        <option value="+1">🇺🇸 +1</option>
                                        <option value="+91">🇮🇳 +91</option>
                                        <option value="+44">🇬🇧 +44</option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="(555) 000-0000"
                                        className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">I want to use ZentraHR for</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {[
                                        { id: 'hrms-recruitment', label: 'HRMS + Recruit' },
                                        { id: 'hrms', label: 'HRMS Only' },
                                        { id: 'recruitment', label: 'Recruitment' }
                                    ].map((opt) => (
                                        <label key={opt.id} className={`cursor-pointer relative p-3 rounded-xl border-2 transition-all text-center flex items-center justify-center ${subscriptionType === opt.id
                                            ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                                            : 'border-slate-100 hover:border-blue-200 text-slate-600 hover:bg-slate-50'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="subscription"
                                                value={opt.id}
                                                checked={subscriptionType === opt.id}
                                                onChange={() => setSubscriptionType(opt.id)}
                                                className="hidden"
                                            />
                                            <span className="text-xs font-bold">{opt.label}</span>
                                            {subscriptionType === opt.id && (
                                                <div className="absolute top-1 right-1 text-blue-600">
                                                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                                                </div>
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Min. 8 characters"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-400 font-medium pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 mt-2 text-sm tracking-widest uppercase">
                                Create Account
                            </button>

                            <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed px-4">
                                By signing up you agree to our <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>, <a href="#" className="text-blue-600 hover:underline">Refund Policy</a> & <a href="#" className="text-blue-600 hover:underline">Terms</a>.
                            </p>

                            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                                <p className="text-sm text-slate-600 font-medium">
                                    Already have an account? <Link href="/login" className="text-blue-700 font-bold hover:underline">Log In</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer variant="black-transparent" />
        </main>
    );
}
