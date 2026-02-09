"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Users, UserPlus, FileClock, Banknote, UserSearch, Calendar, TrendingUp, Plane, CheckSquare, HelpCircle, ChevronDown, FileText, UserCog, Globe, ClipboardCheck, RefreshCw, Sparkles, BarChart3, MessageSquare, Headphones, Smartphone, Clock, MapPin, Briefcase, Building2, Check, Fish, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import ChatWidget from '@/components/ChatWidget';
import ZentraPulse from '@/components/ZentraPulse';
import SidebarNav from '@/components/SidebarNav';
// import Navbar from '@/components/Navbar';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);



    const slides = [
        "The Most Advanced HR Management Software",
        "Simplifying HR Operations for You",
        "Complete Workforce Management Solution",
        "Empower Your Team with ZentraHR"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center relative overflow-hidden bg-background text-foreground">

            {/* Ultra-Stylish Sidebar Navigation */}


            {/* Shared Navigation Bar - HIDDEN/REMOVED in favor of Sidebar */}
            {/* <Navbar /> */}

            {/* Hero Section - Deep Blue Overlay */}
            <div className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Image
                        src="/hero_office_people.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-10">


                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200 leading-tight mb-6 drop-shadow-md max-w-4xl pb-1">
                        {slides[currentSlide]}
                    </h1>


                </div>

                {/* STYLISH CONVEX DIVIDER */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-slate-50"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-slate-50"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-slate-50"></path>
                    </svg>
                </div>
            </div>

            <div className="py-16 bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-xl md:text-2xl font-medium text-slate-600 mb-8">
                        Trusted by <span className="text-slate-900 font-bold">2,000+</span> companies to manage their workforce
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {/* Buttons */}
                        <Link href="/free-trial" className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#da2a1c] text-white font-bold text-base shadow-lg hover:bg-[#b92015] hover:shadow-xl transition-all hover:-translate-y-0.5 group">
                            Start Free Trial
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/book-demo" className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#005bb5] text-white font-bold text-base shadow-lg hover:bg-[#004a94] hover:shadow-xl transition-all hover:-translate-y-0.5">
                            Book a Demo
                        </Link>
                    </div>

                    {/* Logos */}
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Just using text for logos as placeholders is cleanest without external SVGs */}
                        <span className="text-2xl font-bold font-serif text-slate-400 flex items-center gap-2"><Globe className="w-6 h-6" /> ACME</span>
                        <span className="text-xl font-extrabold font-sans text-slate-400 tracking-tighter flex items-center gap-2"><Briefcase className="w-6 h-6" /> Globex</span>
                        <span className="text-xl font-bold font-mono text-slate-400 flex items-center gap-2"><Building2 className="w-6 h-6" /> SOYLENT</span>
                        <span className="text-2xl font-black font-sans text-slate-400 italic flex items-center gap-2"><Zap className="w-6 h-6" /> Initech</span>
                        <span className="text-xl font-bold font-serif text-slate-400 tracking-widest flex items-center gap-2"><ShieldCheck className="w-6 h-6" /> UMBRELLA</span>
                    </div>

                    <p className="mt-10 text-sm text-slate-400">
                        Fully GDPR Compliant • ISO 27001 Certified • 99.9% Uptime
                    </p>
                </div>
            </div>

            {/* 1. Dashboard / KPI Section */}
            <div className="py-24 bg-[#0a0a0a] relative overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <Image
                                src="/hrms_analytics_pro.png"
                                alt="Holographic Analytics Interface"
                                width={800}
                                height={500}
                                className="relative w-full h-auto rounded-xl shadow-2xl border border-white/10"
                            />
                        </div>
                        <div className="flex-1 space-y-8 text-left">
                            <div className="inline-block px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                                Next-Gen Intelligence
                            </div>

                            <h2 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-indigo-400 tracking-tighter leading-[1.1] drop-shadow-sm">
                                Holographic <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">Data Command</span>
                            </h2>

                            <p className="text-xl text-slate-400 font-light leading-relaxed max-w-lg">
                                Transform your organization into a living, breathing neural network. Our predictive analytics engine visualizes workforce pulses in real-time, turning raw data into <span className="text-purple-400 font-medium">strategic clairvoyance</span>.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="text-3xl font-bold text-white mb-1">98%</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider">Prediction Accuracy</div>
                                </div>
                                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="text-3xl font-bold text-white mb-1">&lt;1s</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider">Data Latency</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* 2. HR Features Grid */}
            <div id="smart-hr-features" className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
                            Smart HR Features
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Recruitment", icon: <UserSearch className="text-purple-500" />, desc: "An efficient applicant tracking system and dynamic recruiting software." },
                            { title: "Employee Database", icon: <Users className="text-blue-500" />, desc: "Centralised database to manage everything on your fingertip." },
                            { title: "HR Administration", icon: <UserCog className="text-slate-600" />, desc: "Spend time on your goals, not on routine administration." },
                            { title: "Payroll", icon: <Banknote className="text-emerald-500" />, desc: "Painless payroll processing with automated calculations." },
                            { title: "Appraisal", icon: <TrendingUp className="text-amber-500" />, desc: "Transparent appraisal strategies with increased employee engagement." },
                            { title: "Attendance & Leaves", icon: <Calendar className="text-red-500" />, desc: "An intuitive attendance management system." },
                            { title: "HR Reports", icon: <BarChart3 className="text-indigo-500" />, desc: "Reports that can help you to stay on the top." },
                            { title: "More Features", icon: <HelpCircle className="text-cyan-500" />, desc: "Timesheet, Branch transfer, Statutory contributions, etc." },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer">
                                <div className="mb-4 p-3 bg-slate-50 rounded-lg w-fit group-hover:bg-slate-100 transition-colors">
                                    {React.cloneElement(item.icon, { size: 28 })}
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* UNIQUE FEATURE: ZentraPulse Burnout Shield */}
            <ZentraPulse />

            {/* 3. Implementation Process Section */}
            {/* 3. Implementation Process Section */}
            <div className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Roadmap to Success</h2>
                        <h3 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl">
                            HRMS Implementation Process
                        </h3>
                        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                            Our structured 9-phase approach ensures a seamless transition to your new automated HR platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { phase: "Phase 1", title: "Analysis & Planning", desc: "Gap analysis, stakeholder workshops, and infrastructure planning to align with your needs." },
                            { phase: "Phase 2", title: "System Design", desc: "Finalizing architecture, security protocols, database schema, and UI/UX alignment." },
                            { phase: "Phase 3", title: "Configuration", desc: "Setting up workflows, payroll rules, leave policies, and custom dashboards." },
                            { phase: "Phase 4", title: "Integration", desc: "Connecting biometric devices, ERPs, and third-party APIs for verified data flow." },
                            { phase: "Phase 5", title: "Data Migration", desc: "Secure cleansing, validation, and transfer of your legacy HR data." },
                            { phase: "Phase 6", title: "Testing & QA", desc: "Rigorous system testing, UAT, and security audits to ensure bug-free operations." },
                            { phase: "Phase 7", title: "Deployment", desc: "Production setup, final validation, and execution of the go-live strategy." },
                            { phase: "Phase 8", title: "Training", desc: "Comprehensive sessions for admins and employees, plus user manuals and guides." },
                            { phase: "Phase 9", title: "Support", desc: "Continuous SLAs support, issue resolution, and regular system enhancements." },
                        ].map((item, i) => (
                            <div key={i} className="relative p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black text-slate-300 select-none group-hover:opacity-20 transition-opacity">
                                    {i + 1}
                                </div>
                                <div className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">{item.phase}</div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            {/* 5. HR Management Simplified (3D Tech Version) */}
            <div className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 relative w-full flex justify-center group">
                        <div className="relative w-full max-w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            {/* Animated Background Blob removed for clean photo look */}

                            <Image
                                src="/hr_team_meeting.png"
                                alt="Strategic HR Team Meeting"
                                fill
                                className="object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                            Strategic Workforce <span className="text-blue-600">Management</span>
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            Drive organizational success with data-driven insights. Our platform empowers your HR team to collaborate effectively, visualize key metrics, and make strategic decisions that propel your business forward.
                        </p>
                        <ul className="space-y-5">
                            {[
                                "Smart Process Automation",
                                "Scalable Cloud Infrastructure",
                                "Real-time Analytics & Reporting",
                                "Seamless Global Compliance"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 group/item">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-300">
                                        <Check size={16} strokeWidth={3} />
                                    </div>
                                    <span className="text-slate-700 font-bold text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* 6. Comprehensive Modules Showcase */}
            <div className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32">

                    {/* Module 1: Time & Attendance */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <div className="flex-1 w-full relative">
                            <div className="absolute inset-0 bg-blue-100 rounded-3xl transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white p-2">
                                <Image src="/feature_time_attendance_infographic.png" alt="Time & Attendance" width={600} height={400} className="w-full h-auto object-cover rounded-2xl" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6">

                            <h3 className="text-3xl font-bold text-slate-900">Time and Attendance</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Eliminate time theft and manual errors. Our smart biometric integration and geo-fenced mobile clock-ins ensure every second is accounted for. Real-time syncing with payroll means your month-end processing takes minutes, not days.
                            </p>
                            <ul className="space-y-3">
                                {["Biometric & Face ID Integration", "Geo-Fencing for Remote Teams", "Real-time Overtime Alerts"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Module 2: Payroll Management */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16 group">
                        <div className="flex-1 w-full relative">
                            <div className="absolute inset-0 bg-indigo-100 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white p-2">
                                <Image src="/feature_payroll_hologram.png" alt="Payroll Analytics Dashboard" width={600} height={400} className="w-full h-auto object-cover rounded-2xl" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6">

                            <h3 className="text-3xl font-bold text-slate-900">Error-Free Payroll Automation</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Experience the peace of mind that comes with accurate, compliant payroll. From automated tax deductions to one-click salary disbursement, ZentraHR handles the complex calculations so you can focus on your people.
                            </p>
                            <ul className="space-y-3">
                                {["Automated Tax Compliance", "One-Click Disbursement", "Customizable Salary Structures"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Module 3: HR Helpdesk */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <div className="flex-1 w-full relative">
                            <div className="absolute inset-0 bg-cyan-100 rounded-3xl transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white p-2">
                                <Image src="/feature_helpdesk_247_v2.png" alt="HR Support Team" width={600} height={400} className="w-full h-auto object-cover rounded-2xl" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6">

                            <h3 className="text-3xl font-bold text-slate-900">24/7 Employee Support</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Empower your workforce with a self-service helpdesk. Manage grievances, answer policy queries, and track issue resolution automatically. A happy workforce is a heard workforce.
                            </p>
                            <ul className="space-y-3">
                                {["Ticket Management System", "Automated FAQ Bot", "SLA Tracking & Reporting"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Module 4: Performance Management */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16 group">
                        <div className="flex-1 w-full relative">
                            <div className="absolute inset-0 bg-emerald-100 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white p-2">
                                <Image src="/feature_performance_potential.png" alt="Performance Management" width={600} height={400} className="w-full h-auto object-cover rounded-2xl" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6">

                            <h3 className="text-3xl font-bold text-slate-900">Unlock Employee Potential</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Move beyond annual reviews. ZentraHR fosters a culture of continuous feedback with flexible goal setting, real-time praise, and data-driven performance analytics.
                            </p>
                            <ul className="space-y-3">
                                {["360-Degree Feedback", "OKR & KPI Tracking", "Continuous Growth Plans"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Module 5: Recruitment Management */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <div className="flex-1 w-full relative">
                            <div className="absolute inset-0 bg-violet-100 rounded-3xl transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white p-2">
                                <Image src="/feature_onboarding_dial.png" alt="Recruitment Selection" width={600} height={400} className="w-full h-auto object-cover rounded-2xl" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6">

                            <h3 className="text-3xl font-bold text-slate-900">Acquire Top Talent</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Streamline your hiring pipeline from application to offer letter. Collaborate on candidate profiles, schedule interviews effortlessly, and ensure a seamless onboarding experience for new hires.
                            </p>
                            <ul className="space-y-3">
                                {["Applicant Tracking System (ATS)", "Collaborative Hiring Portals", "Digital Onboarding"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* 8. Contact Section */}
            <div id="contact" className="py-24 bg-[#0f172a] text-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                        {/* Left Side: Heading */}
                        <div className="flex-1 flex flex-col pt-10">
                            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8">
                                CONTACT <br /> US
                            </h2>
                            <p className="text-slate-300 text-lg max-w-md leading-relaxed mb-12">
                                Ready to optimize your workforce? Our team is here to help you get started with the world's most advanced HR platform.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-sky-400 font-bold uppercase tracking-wider mb-1">Sales Board</p>
                                        <p className="text-xl font-medium">sales@zentrahr.com</p>
                                        <p className="text-sm text-slate-400 mt-1">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                                        <Headphones size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-sky-400 font-bold uppercase tracking-wider mb-1">24/7 Support</p>
                                        <p className="text-xl font-medium">support@zentrahr.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="flex-1 w-full bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                            <form className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-sky-400 uppercase tracking-widest ml-1">Your Email</label>
                                    <input type="email" placeholder="john@company.com" className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-white focus:outline-none transition-colors placeholder:text-white/20 text-white" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2 md:col-span-1 space-y-2">
                                        <label className="text-xs font-bold text-sky-400 uppercase tracking-widest ml-1">Phone</label>
                                        <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-white focus:outline-none transition-colors placeholder:text-white/20 text-white" />
                                    </div>
                                    <div className="col-span-2 md:col-span-1 space-y-2">
                                        <label className="text-xs font-bold text-sky-400 uppercase tracking-widest ml-1">Country</label>
                                        <div className="relative">
                                            <select className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer text-white">
                                                <option className="bg-[#0f172a]">Afghanistan</option>
                                                <option className="bg-[#0f172a]">India</option>
                                                <option className="bg-[#0f172a]">United States</option>
                                                <option className="bg-[#0f172a]">United Kingdom</option>
                                                <option className="bg-[#0f172a]">Other</option>
                                            </select>
                                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-sky-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-sky-400 uppercase tracking-widest ml-1">Use</label>
                                    <div className="relative">
                                        <select className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer text-white">
                                            <option className="bg-[#0f172a]">Use it in my company</option>
                                            <option className="bg-[#0f172a]">Consulting Project</option>
                                            <option className="bg-[#0f172a]">Personal Study</option>
                                        </select>
                                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-sky-400 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-sky-400 uppercase tracking-widest ml-1">Number of employees</label>
                                    <div className="relative">
                                        <select className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer text-white">
                                            <option className="bg-[#0f172a]">Less than 5 employees</option>
                                            <option className="bg-[#0f172a]">5 - 50 employees</option>
                                            <option className="bg-[#0f172a]">50 - 200 employees</option>
                                            <option className="bg-[#0f172a]">200+ employees</option>
                                        </select>
                                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-sky-400 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-sky-400 uppercase tracking-widest ml-1">Message</label>
                                    <textarea rows={2} placeholder="Type your message here..." className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:border-white focus:outline-none transition-colors placeholder:text-white/20 resize-none text-white"></textarea>
                                </div>

                                {/* reCAPTCHA Mock */}
                                <div className="bg-slate-50 rounded-md border border-slate-300 p-3 flex items-center justify-between w-[300px] shadow-inner select-none">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 border-2 border-slate-300 rounded-[2px] bg-white cursor-pointer hover:border-slate-400 transition-colors"></div>
                                        <span className="text-sm font-medium text-slate-700">I'm not a robot</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <RefreshCw size={24} className="text-blue-600 mb-0.5 animate-spin-slow" style={{ animationDuration: '3s' }} />
                                        <span className="text-[10px] text-slate-500 leading-none">reCAPTCHA</span>
                                        <span className="text-[8px] text-slate-400 leading-none mt-0.5">Privacy - Terms</span>
                                    </div>
                                </div>

                                <button type="button" className="w-full bg-white hover:bg-blue-50 text-[#0f172a] font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-6">
                                    Send Message <ArrowRight size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. Footer */}
            <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="relative w-14 h-14">
                                    <Image src="/zentra_logo.png" alt="Logo" fill className="object-contain" />
                                </div>
                                <span className="font-bold text-2xl tracking-tight"><span className="text-blue-700">Zentra</span><span className="text-red-600">HR</span></span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Building a happier workforce. The most advanced HR Management software for enterprises of all sizes.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Home</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Features</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Apps</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Support</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Implementation</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Resources</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                                <li><Link href="#contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-6">Contact</h4>
                            <address className="not-italic text-sm text-slate-600 space-y-3">
                                <p className="leading-relaxed">
                                    Capital Park, Plot No. 1, 28 & 29,<br />
                                    Image Gardens Rd, VIP Hills,<br />
                                    Jaihind Enclave, Madhapur,<br />
                                    Hyderabad, Telangana 500081
                                </p>
                                <p>Email: support@zentrahr.com</p>
                            </address>
                        </div>
                    </div>
                    <div className="border-t border-slate-200 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
                        <p className="text-xs text-slate-500 order-3 lg:order-1">
                            © 2026 ZentraHR. All Rights Reserved.
                        </p>

                        <div className="flex items-center gap-4 order-2">
                            <a href="#" className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                                <Linkedin size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                                <Twitter size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                                <Facebook size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                                <Instagram size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center bg-slate-200 rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                                <Youtube size={14} />
                            </a>
                        </div>

                        <div className="flex items-center gap-3 order-1 lg:order-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">A Product of</span>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center p-1">
                                    <Fish className="text-white w-full h-full" />
                                </div>
                                <span className="font-black text-sm tracking-tight uppercase flex gap-1 leading-none">
                                    <span className="text-slate-900">WhiteWhale</span>
                                    <span className="text-pink-600">Solutions</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Advanced Chatbot Widget */}
            <ChatWidget />
        </main >
    );
}
