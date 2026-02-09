'use client';

import React, { useState } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    Globe,
    User,
    Shield,
    FileText,
    Users,
    Clock,
    Download,
    ChevronRight,
    Search,
    Paperclip,
    Award,
    Building2,
    Heart,
    Baby,
    GitGraph,
    ArrowDown,
    MoreHorizontal,
    Code,
    Sparkles,
    Layers,
    Zap
    // ... (imports remain)
} from 'lucide-react';
import Link from 'next/link';

type Tab = 'personal' | 'family' | 'experience' | 'documents' | 'letters' | 'hierarchy';

function OrgCard({ name, role, color = 'white', status = 'offline', isManager = false, isYou = false, compact = false, image, onClick }: any) {

    const statusColors: any = {
        online: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
        busy: 'bg-amber-400',
        offline: 'bg-slate-300'
    };

    const cardStyles: any = {
        slate: 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/40',
        blue: 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/30',
        white: 'bg-white text-slate-800 border-slate-200 shadow-lg shadow-slate-200/50 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1'
    };

    return (
        <div
            onClick={onClick}
            className={`
            relative flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 group cursor-pointer
            ${cardStyles[color] || cardStyles.white}
            ${compact ? 'min-w-[140px] pr-4' : 'min-w-[200px] pr-6'}
            ${isManager ? 'scale-110 z-20' : ''}
            ${isYou ? 'scale-105 z-20 ring-4 ring-blue-100' : ''}
        `}>
            {/* Avatar */}
            <div className={`
                relative shrink-0 rounded-xl flex items-center justify-center font-bold overflow-hidden
                ${compact ? 'w-10 h-10' : 'w-12 h-12'}
                ${color === 'white' ? 'bg-slate-100 text-slate-400' : 'bg-white/10 text-white'}
            `}>
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <User size={compact ? 18 : 20} />
                )}

                {/* Status Dot */}
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${statusColors[status]}`}></div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
                <span className={`font-bold leading-tight ${compact ? 'text-xs' : 'text-sm'}`}>{name}</span>
                <span className={`text-[10px] font-medium mt-0.5 ${color === 'white' ? 'text-slate-400' : 'text-blue-100'}`}>{role}</span>
            </div>

            {/* Manager Badge */}
            {isManager && (
                <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-900 text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">LEAD</div>
            )}
        </div>
    );
}

export default function PersonalInformationPage() {
    // ...
    const [activeTab, setActiveTab] = useState<Tab>('personal');
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
    const [isManagerDetailOpen, setIsManagerDetailOpen] = useState(false);

    const openMeetingModal = (employeeName: string) => {
        setSelectedEmployee(employeeName);
        setIsMeetingModalOpen(true);
    };

    const tabs = [
        { id: 'personal', label: 'Personal Information', icon: User },
        { id: 'experience', label: 'Work & Projects', icon: Layers },
        { id: 'hierarchy', label: 'Organization', icon: GitGraph },
        { id: 'family', label: 'Family Details', icon: Heart },
        { id: 'documents', label: 'Documents', icon: Paperclip },
        { id: 'letters', label: 'Letters', icon: FileText },
    ];

    return (
        <div className="min-h-full w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-2">

            {/* 1. HERO PROFILE */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group hover:shadow-blue-500/10 transition-shadow duration-500">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full opacity-60 -z-10 blur-3xl translate-x-1/3 -translate-y-1/4"></div>

                {/* Avatar */}
                <div className="relative shrink-0 group/avatar">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-white border-4 border-white shadow-2xl shadow-slate-200 overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 relative z-10 transition-transform duration-500 group-hover/avatar:scale-105 group-hover/avatar:-rotate-2">
                        {/* Placeholder for User Profile Image */}
                        <User size={64} className="text-slate-300" />

                        {/* Status Indicator */}
                        <div className="absolute bottom-4 right-4 w-5 h-5 rounded-full bg-emerald-400 border-4 border-white shadow-lg shadow-emerald-400/30 animate-pulse"></div>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-2">
                            <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">Shaik Abdulkhadarjilani</h1>
                            <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest shadow-lg shadow-blue-500/30">Active</span>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                            <Badge text="EMP-20240425-001" color="slate" icon={Shield} />
                            <Badge text="Admin Department" color="blue" icon={Building2} />
                            <Badge text="Executive" color="indigo" icon={Award} />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <ContactPill icon={Phone} text="+91 9014985626" />
                        <ContactPill icon={Mail} text="abdulkhadar@whitewhalesoft.in" />
                        <ContactPill icon={MapPin} text="Hyderabad, India" />
                    </div>
                </div>

                {/* Profile Completion / Stats */}
                <div className="hidden xl:flex flex-col gap-4 min-w-[200px]">
                    <div className="bg-slate-900 rounded-3xl p-5 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[50px] opacity-20"></div>
                        <div className="relative z-10">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">Total Experience</span>
                            <span className="text-3xl font-black">4.5 <span className="text-sm text-blue-400 font-bold">Years</span></span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Profile Status</span>
                        <span className="text-xs font-bold text-emerald-500">95%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[95%] bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* 2. STYLISH TABS */}
            <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide px-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`
                            group flex items-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 border relative overflow-hidden
                            ${activeTab === tab.id
                                ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/25 scale-100 ring-4 ring-slate-100'
                                : 'bg-white text-slate-500 border-transparent hover:bg-white hover:text-slate-800 hover:shadow-lg hover:shadow-slate-200/50'}
                        `}
                    >
                        <tab.icon size={18} className={`transition-colors ${activeTab === tab.id ? 'text-blue-400' : 'text-slate-400 group-hover:text-blue-500'}`} />
                        <span className="relative z-10">{tab.label}</span>
                        {activeTab === tab.id && <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>}
                    </button>
                ))}
            </div>

            {/* 3. CONTENT AREA */}
            <div className="min-h-[600px]">

                {/* --- TAB: PERSONAL --- */}
                {activeTab === 'personal' && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in slide-in-from-bottom-6 duration-700 fade-in">

                        {/* Card 1: Details (Span 7) */}
                        <div className="md:col-span-7 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full opacity-50 -z-10 blur-3xl group-hover:bg-purple-100 transition-colors duration-700"></div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
                                    <p className="text-xs text-slate-400 font-medium">Basic identity and profile details</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-y-1">
                                <DetailRow label="Personal Mobile" value="-" />
                                <DetailRow label="Personal Email" value="abdulkhadar@whitewhalesoft.in" highlight />
                                <DetailRow label="Date of Join" value="25/04/2022" />
                                <DetailRow label="Date of Birth" value="-" />
                                <DetailRow label="Gender" value="Male" />
                                <DetailRow label="Blood Group" value="-" />
                                <DetailRow label="Marital Status" value="Single" />
                            </div>
                        </div>

                        {/* Card 2: Address (Span 5) */}
                        <div className="md:col-span-5 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden group flex flex-col">
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full opacity-50 -z-10 blur-3xl group-hover:bg-blue-100 transition-colors duration-700"></div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">Address Details</h2>
                                    <p className="text-xs text-slate-400 font-medium">Permanent and current residence</p>
                                </div>
                            </div>

                            <div className="space-y-2 flex-1">
                                <DetailRow label="Address" value="-" />
                                <div className="grid grid-cols-2 gap-x-4">
                                    <DetailRow label="City" value="-" />
                                    <DetailRow label="State" value="-" />
                                </div>
                                <DetailRow label="Country" value="India" highlight />
                                <DetailRow label="Zipcode" value="-" />
                            </div>

                            {/* Reporting Manager Widget (Moved here for better space utilization or kept separate) */}
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Directly Reporting To</h3>
                                <div
                                    onClick={() => setIsManagerDetailOpen(true)}
                                    className="flex items-center gap-4 bg-slate-50/80 p-4 rounded-3xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer group/manager relative overflow-hidden"
                                >
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-800 font-bold border border-slate-100 relative z-10">SC</div>
                                    <div className="relative z-10">
                                        <div className="font-bold text-slate-800 text-sm">Sarah Conor</div>
                                        <div className="text-xs text-slate-500 font-medium group-hover/manager:text-blue-600">Senior Manager</div>
                                    </div>
                                    <div className="ml-auto w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-300 group-hover/manager:text-blue-500 transition-colors relative z-10">
                                        <ChevronRight size={16} />
                                    </div>

                                    {/* Hover Effect Background */}
                                    <div className="absolute inset-0 bg-blue-100/50 translate-x-[-100%] group-hover/manager:translate-x-0 transition-transform duration-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: EXPERIENCE & PROJECTS (New, Rich Design) --- */}
                {activeTab === 'experience' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-6 duration-700 fade-in">

                        {/* Left Column: Timeline */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100">
                                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <Briefcase size={20} className="text-slate-400" /> Work History
                                </h2>

                                <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
                                    {/* Current */}
                                    <div className="relative group">
                                        <div className="absolute -left-[31px] w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg ring-4 ring-blue-50"></div>
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-800">Executive</h3>
                                            <p className="text-xs text-blue-600 font-bold mb-1">White Whale Software</p>
                                            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">Apr 2022 - Present</p>
                                        </div>
                                    </div>

                                    {/* Past */}
                                    <div className="relative group opacity-60 hover:opacity-100 transition-opacity">
                                        <div className="absolute -left-[31px] w-4 h-4 bg-slate-200 rounded-full border-2 border-white"></div>
                                        <div>
                                            <h3 className="text-sm font-bold text-slate-700">Junior Associate</h3>
                                            <p className="text-xs text-slate-500 font-bold mb-1">Previous Corp Ltd.</p>
                                            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">2020 - 2022</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Skills / Tech Stack Widget */}
                            <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-30"></div>
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                                    <Zap size={18} className="text-yellow-400" /> Core Competencies
                                </h3>
                                <div className="flex flex-wrap gap-2 relative z-10">
                                    {['React', 'Next.js', 'Spring Boot', 'UI/UX', 'Project Mgmt', 'Team Leading', 'Agile'].map(skill => (
                                        <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-medium hover:bg-white/20 transition-colors cursor-default">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Detailed Current Project */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-10"></div>

                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                                <Layers size={24} />
                                            </div>
                                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">Current Project</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-800">Leave Management System</h2>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project ID</p>
                                        <p className="text-lg font-mono font-bold text-slate-800">PRJ-LMS-2024</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">My Role</h3>
                                            <div className="font-bold text-slate-800 text-lg">Frontend Lead & UI Designer</div>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tech Stack Used</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-bold text-slate-600">TypeScript</span>
                                                <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-bold text-slate-600">Tailwind CSS</span>
                                                <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-bold text-slate-600">PostgreSQL</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Project Manager</h3>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-500 text-xs">RM</div>
                                                <div>
                                                    <div className="font-bold text-slate-800">Richard Miles</div>
                                                    <div className="text-xs text-slate-500">Senior Project Manager</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Team Size</h3>
                                            <div className="flex items-center gap-2">
                                                <div className="flex -space-x-3">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                                                    ))}
                                                </div>
                                                <span className="text-xs font-bold text-slate-500">+8 others</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Project Description</h3>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                        Developing a comprehensive Leave Management System to streamline employee leave requests, approvals, and tracking.
                                        Implementing a modern, responsive UI with real-time notifications and detailed reporting dashboards for HR administrators.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: HIERARCHY (Organization Hub) --- */}
                {activeTab === 'hierarchy' && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-700 fade-in h-[700px]">

                        {/* Sidebar: Department Context */}
                        <div className="lg:col-span-1 space-y-4 h-full flex flex-col">
                            {/* Department Info */}
                            <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-xl shadow-slate-900/20">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-40"></div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border border-white/10 backdrop-blur-md">
                                        <Building2 size={24} className="text-blue-300" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-1">Admin Dept.</h3>
                                    <p className="text-slate-400 text-sm font-medium">Headquarters • Level 4</p>

                                    <div className="mt-8 space-y-4">
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total Strength</div>
                                            <div className="text-3xl font-bold">24 <span className="text-base text-slate-500 font-medium">Members</span></div>
                                        </div>
                                        <div className="h-px bg-white/10"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-slate-300">Open Roles</span>
                                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-xs font-bold border border-emerald-500/30">3 Hiring</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Team Legend */}
                            <div className="flex-1 bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Sparkles size={16} className="text-amber-500" /> Team Legend
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                                        <span className="text-sm font-medium text-slate-600">Online & Active</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <span className="text-sm font-medium text-slate-600">In Meeting</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                        <span className="text-sm font-medium text-slate-600">Offline</span>
                                    </div>
                                </div>

                                <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                    <p className="text-xs text-blue-600 font-medium leading-relaxed">
                                        <span className="font-bold">Did you know?</span> Click on any employee card to instantly schedule a 1-on-1 meeting.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Main Stage: The Chart */}
                        <div className="lg:col-span-3 bg-slate-50 border border-slate-200 rounded-[2.5rem] overflow-hidden relative shadow-inner">
                            {/* Background Grid */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent"></div>

                            {/* Chart Container */}
                            <div className="relative w-full h-full overflow-auto pt-12 pb-20 flex flex-col items-center">

                                {/* Level 1: CEO */}
                                <div className="relative z-10 animate-in zoom-in-50 duration-500">
                                    <OrgCard
                                        name="John Smith"
                                        role="Chief Executive Officer"
                                        color="slate"
                                        status="online"
                                        onClick={() => openMeetingModal("John Smith")}
                                    />
                                    {/* Line Down */}
                                    <div className="h-8 w-px bg-slate-300 mx-auto"></div>
                                </div>

                                {/* Level 2: Manager */}
                                <div className="relative z-10 animate-in zoom-in-50 slide-in-from-top-4 duration-700 delay-100">
                                    <OrgCard
                                        name="Sarah Conor"
                                        role="Senior Manager - Admin"
                                        color="white"
                                        status="busy"
                                        isManager
                                        onClick={() => openMeetingModal("Sarah Conor")}
                                    />
                                    {/* Line Down */}
                                    <div className="h-8 w-px bg-slate-300 mx-auto"></div>
                                </div>

                                {/* Connector Bar for Peers */}
                                <div className="relative w-[500px] h-8 animate-in fade-in duration-700 delay-200">
                                    {/* Left arm */}
                                    <div className="absolute top-0 left-0 right-1/2 h-full border-t-2 border-l-2 border-slate-300 rounded-tl-3xl"></div>
                                    {/* Right arm */}
                                    <div className="absolute top-0 right-0 left-1/2 h-full border-t-2 border-r-2 border-slate-300 rounded-tr-3xl"></div>
                                </div>

                                {/* Level 3: Peers Row */}
                                <div className="flex gap-8 items-start justify-center -mt-1 z-10">

                                    {/* Peer 1 */}
                                    <div className="flex flex-col items-center animate-in slide-in-from-bottom-2 duration-500 delay-300">
                                        <div className="h-8 w-px bg-slate-300 mb-2"></div>
                                        <OrgCard
                                            name="Emily Rose"
                                            role="Executive"
                                            color="white"
                                            status="online"
                                            compact
                                            onClick={() => openMeetingModal("Emily Rose")}
                                        />
                                    </div>

                                    {/* YOU */}
                                    <div className="flex flex-col items-center animate-in scale-105 duration-500 delay-400">
                                        {/* Specific connector for center item */}
                                        <div className="h-8 w-px bg-blue-500 mb-2 shadow-[0_0_10px_#3b82f6]"></div>
                                        <OrgCard
                                            name="Shaik Abdul..."
                                            role="Frontend Lead"
                                            color="blue"
                                            status="online"
                                            isYou
                                        />
                                        <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full">It's You</div>
                                    </div>

                                    {/* Peer 2 */}
                                    <div className="flex flex-col items-center animate-in slide-in-from-bottom-2 duration-500 delay-500">
                                        <div className="h-8 w-px bg-slate-300 mb-2"></div>
                                        <OrgCard
                                            name="Mike Ross"
                                            role="Executive"
                                            color="white"
                                            status="offline"
                                            compact
                                            onClick={() => openMeetingModal("Mike Ross")}
                                        />
                                    </div>

                                    {/* Peer 3 */}
                                    <div className="flex flex-col items-center animate-in slide-in-from-bottom-2 duration-500 delay-500">
                                        <div className="h-8 w-px bg-slate-300 mb-2"></div>
                                        <OrgCard
                                            name="Harvey S."
                                            role="Legal Advisor"
                                            color="white"
                                            status="busy"
                                            compact
                                            onClick={() => openMeetingModal("Harvey Specter")}
                                        />
                                    </div>
                                </div>

                            </div>

                            {/* Floating Action Button */}
                            <button className="absolute bottom-6 right-6 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-xl shadow-slate-900/30 hover:scale-110 transition-all group">
                                <Search size={24} />
                                <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Find Employee
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {/* --- MEETING MODAL --- */}
                {isMeetingModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl p-6 relative overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-10"></div>

                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-800">Schedule Meeting</h3>
                                <button onClick={() => setIsMeetingModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                                    &times;
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                                    <User size={24} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Meeting With</div>
                                    <div className="text-lg font-bold text-slate-800">{selectedEmployee}</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">Select Date & Time</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-slate-600 font-bold cursor-pointer hover:border-blue-300 transition-colors">
                                            <Calendar size={18} className="text-blue-500" />
                                            <span>Oct 26, 2026</span>
                                        </div>
                                        <div className="w-1/3 bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 text-slate-600 font-bold cursor-pointer hover:border-blue-300 transition-colors justify-center">
                                            <Clock size={18} className="text-blue-500" />
                                            <span>10:00 AM</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-2 ml-1">Topic (Optional)</label>
                                    <input type="text" placeholder="e.g. Project Update" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 transition-colors placeholder:font-normal" />
                                </div>

                                <button onClick={() => {
                                    // Here you would typically send the request
                                    setIsMeetingModalOpen(false);
                                    alert(`Meeting request sent to ${selectedEmployee}!`);
                                }} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 active:scale-95 transition-all mt-4">
                                    Confirm Request
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* --- TAB: DOCUMENTS (Re-styled) --- */}
                {(activeTab === 'documents' || activeTab === 'letters') && (
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 animate-in slide-in-from-bottom-4 duration-500 fade-in">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                                    {activeTab === 'documents' ? <Paperclip size={20} /> : <FileText size={20} />}
                                </div>
                                {activeTab === 'documents' ? 'My Documents' : 'Official Letters'}
                            </h2>
                            <div className="relative w-full md:w-64">
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-slate-600 placeholder:font-medium" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Aadhar Card', 'PAN Card', 'Offer Letter', 'Relieving Letter', 'Payslip - Oct', 'Payslip - Sep'].map((file, i) => (
                                <div key={i} className="group relative bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer flex flex-col items-center text-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <FileText size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-1">{file}</h3>
                                        <p className="text-[10px] text-slate-400 mt-1 font-bold">PDF • 2.4 MB</p>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-blue-50 rounded-xl text-blue-500">
                                        <Download size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- TAB: FAMILY (Placeholder) --- */}
                {activeTab === 'family' && (
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100 animate-in slide-in-from-bottom-4 duration-500 fade-in">
                        {/* Simply re-using the structure, can be expanded */}
                        <div className="flex flex-col items-center justify-center py-24 text-slate-400 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200">
                            <Users size={48} className="text-slate-300 mb-4" />
                            <p className="font-bold text-slate-500">Family Details Module</p>
                        </div>
                    </div>
                )}

            </div>

            {/* --- MANAGER DETAILS MODAL --- */}
            {isManagerDetailOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl relative overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                        {/* Header / Cover */}
                        <div className="h-32 bg-slate-900 relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[60px] opacity-40"></div>
                            <div className="absolute top-4 right-4 z-10">
                                <button onClick={() => setIsManagerDetailOpen(false)} className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors">
                                    &times;
                                </button>
                            </div>
                        </div>

                        <div className="px-8 pb-8 -mt-12 relative z-10">
                            <div className="flex justify-between items-end mb-6">
                                <div className="w-24 h-24 bg-white rounded-3xl p-1 shadow-xl">
                                    <div className="w-full h-full bg-slate-100 rounded-[1.2rem] flex items-center justify-center text-slate-400 font-bold text-2xl">
                                        SC
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-2">
                                    <a href="mailto:sarah.conor@zentra.com" className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
                                        <Mail size={18} />
                                    </a>
                                    <a href="tel:+15550009999" className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors">
                                        <Phone size={18} />
                                    </a>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-2xl font-black text-slate-800">Sarah Conor</h2>
                                <p className="text-sm font-bold text-blue-600">Senior Manager - Administration</p>
                                <div className="flex items-center gap-2 mt-2 text-slate-500 text-xs font-bold">
                                    <span className="flex items-center gap-1"><MapPin size={12} /> New York HQ</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Building2 size={12} /> Admin Dept</span>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                                <div className="flex justify-between items-center border-b border-slate-200/60 pb-3 last:border-0 last:pb-0">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Work Email</span>
                                    <span className="text-sm font-bold text-slate-800">sarah.conor@zentra.com</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-200/60 pb-3 last:border-0 last:pb-0">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Phone</span>
                                    <span className="text-sm font-bold text-slate-800">+1 (555) 000-9999</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-slate-200/60 pb-3 last:border-0 last:pb-0">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Joined</span>
                                    <span className="text-sm font-bold text-slate-800">12 Aug, 2019</span>
                                </div>
                            </div>

                            <Link href="/dashboard/employees/directory" className="block w-full text-center mt-6 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all">
                                View Full Profile
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// === HELPER COMPONENTS ===

function ContactPill({ icon: Icon, text }: { icon: any, text: string }) {
    return (
        <div className="flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all cursor-default shadow-sm hover:shadow-md">
            <Icon size={14} className="hover:scale-110 transition-transform" />
            {text}
        </div>
    );
}

function Badge({ text, color, icon: Icon }: { text: string, color: 'blue' | 'slate' | 'indigo', icon?: any }) {
    const styles = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        slate: 'bg-slate-100 text-slate-600 border-slate-200',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    };
    return (
        <span className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 ${styles[color]}`}>
            {Icon && <Icon size={12} />}
            {text}
        </span>
    );
}

function DetailRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center py-3.5 border-b border-dashed border-slate-100 last:border-0 hover:bg-slate-50 rounded-xl px-4 transition-colors group/row">
            <span className="sm:col-span-2 text-xs font-bold text-slate-400 uppercase tracking-wider group-hover/row:text-slate-500 transition-colors">{label}</span>
            <span className={`sm:col-span-3 text-sm font-bold truncate ${highlight ? 'text-blue-600' : 'text-slate-800'}`}>
                {value}
            </span>
        </div>
    );
}
