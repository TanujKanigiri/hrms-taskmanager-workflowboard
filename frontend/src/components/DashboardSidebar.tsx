'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Banknote,
    CalendarDays,
    TrendingUp,
    LifeBuoy,
    FileBarChart,
    ChevronDown,
    LogOut,
    Menu,
    X,
    Search,
    Bell,
    UserCircle,
    CheckCircle2,
    Bot
} from 'lucide-react';

export default function DashboardSidebar() {
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
            submenu: []
        },
        {
            name: 'Zentra EQ',
            href: '/dashboard/simulate',
            icon: Bot,
            submenu: []
        },
        {
            name: 'Task Manager',
            icon: CheckCircle2,
            href: '/dashboard/tasks',
            submenu: [
                { name: 'Workflow Board', href: '/dashboard/tasks/board' },
                { name: 'My Tasks', href: '/dashboard/tasks/my-tasks' },
                { name: 'Assigned By Me', href: '/dashboard/tasks/assigned' },
            ]
        },
        {
            name: 'My Portal',
            icon: UserCircle,
            href: '/dashboard/my-portal',
            submenu: [
                { name: 'Personal Information', href: '/dashboard/my-portal/profile' },
                { name: 'My Leaves', href: '/dashboard/my-portal/leaves' },
                { name: 'My Payslips', href: '/dashboard/my-portal/payslips' },
                { name: 'My Documents', href: '/dashboard/my-portal/documents' },
                { name: 'Settings', href: '/dashboard/my-portal/settings' },
            ]
        },
        {
            name: 'Recruitment',
            icon: Briefcase,
            href: '/dashboard/recruitment',
            submenu: [
                { name: 'Job Postings', href: '/dashboard/recruitment/jobs' },
                { name: 'Candidates', href: '/dashboard/recruitment/candidates' },
                { name: 'Interviews', href: '/dashboard/recruitment/interviews' },
                { name: 'Onboarding', href: '/dashboard/recruitment/onboarding' },
            ]
        },
        {
            name: 'Employees',
            icon: Users,
            href: '/dashboard/employees',
            submenu: [
                { name: 'Directory', href: '/dashboard/employees/directory' },
                { name: 'Org Chart', href: '/dashboard/employees/org-chart' },
                { name: 'My Team', href: '/dashboard/employees/teams' },
            ]
        },
        {
            name: 'Payroll',
            icon: Banknote,
            href: '/dashboard/payroll',
            submenu: [
                { name: 'Payslips', href: '/dashboard/payroll/payslips' },
                { name: 'Tax Declaration', href: '/dashboard/payroll/tax' },
                { name: 'Expenses', href: '/dashboard/payroll/expenses' },
                { name: 'Settings', href: '/dashboard/payroll/settings' },
            ]
        },
        {
            name: 'Time & Leave',
            icon: CalendarDays,
            href: '/dashboard/leave',
            submenu: [
                { name: 'My Leaves', href: '/dashboard/leave/my-leaves' },
                { name: 'Apply Leave', href: '/dashboard/leave/apply' },
                { name: 'Attendance', href: '/dashboard/leave/attendance' },
                { name: 'Holidays', href: '/dashboard/leave/holidays' },
            ]
        },
        {
            name: 'Performance',
            icon: TrendingUp,
            href: '/dashboard/performance',
            submenu: [
                { name: 'Growth Hub', href: '/dashboard/performance' },
                { name: 'My Goals', href: '/dashboard/performance/goals' },
                { name: 'Appraisals', href: '/dashboard/performance/appraisals' },
                { name: 'Feedback', href: '/dashboard/performance/feedback' },
            ]
        },
        {
            name: 'Helpdesk',
            icon: LifeBuoy,
            href: '/dashboard/helpdesk',
            submenu: [
                { name: 'Help Center', href: '/dashboard/helpdesk' },
                { name: 'My Tickets', href: '/dashboard/helpdesk/tickets' },
                { name: 'Knowledge Base', href: '/dashboard/helpdesk/kb' },
                { name: 'Policies', href: '/dashboard/helpdesk/policies' },
            ]
        },
        {
            name: 'Reports',
            icon: FileBarChart,
            href: '/dashboard/reports',
            submenu: [
                { name: 'Analytics', href: '/dashboard/reports/analytics' },
                { name: 'Audit Logs', href: '/dashboard/reports/audit' },
            ]
        }
    ];

    const handleMenuClick = (item: any) => {
        if (item.submenu.length > 0) {
            if (expandedMenu === item.name) {
                setExpandedMenu(null);
            } else {
                setExpandedMenu(item.name);
                setHoveredSection('nav');
            }
        } else {
            setExpandedMenu(null);
            router.push(item.href);
        }
    };

    return (
        <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-50 p-4 gap-4 pointer-events-none w-min">

            {/* 1. Top Segment: Logo (Independent) */}
            <div
                onMouseEnter={() => setHoveredSection('logo')}
                onMouseLeave={() => setHoveredSection(null)}
                className={`
                    pointer-events-auto h-16 bg-[#0f172a] rounded-2xl flex items-center shadow-xl border border-white/5 relative group hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden
                    ${hoveredSection === 'logo' ? 'w-[240px] px-4 gap-3 z-50' : 'w-16 justify-center z-40'}
                `}
                onClick={() => { setExpandedMenu(null); router.push('/dashboard'); }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Logo Image */}
                <div className="relative z-10 flex-shrink-0">
                    <Image src="/zentra_logo.png" alt="Logo" width={32} height={32} className="object-contain" />
                </div>

                {/* Brand Name Reveal */}
                <div className={`flex flex-col flex-1 overflow-hidden whitespace-nowrap transition-all duration-500 ${hoveredSection === 'logo' ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-4'}`}>
                    <span className="text-lg font-black text-white tracking-tight leading-none">Zentra<span className="text-blue-500">HR</span></span>
                </div>
            </div>

            {/* 2. Middle Segment: Navigation (Independent) */}
            <nav
                onMouseEnter={() => setHoveredSection('nav')}
                onMouseLeave={() => { setHoveredSection(null); setExpandedMenu(null); }}
                className={`
                    pointer-events-auto flex-1 bg-[#0f172a] rounded-[2rem] shadow-2xl border border-white/5 
                    transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    flex flex-col overflow-hidden relative
                    ${hoveredSection === 'nav' ? 'w-[240px] translate-x-0 z-50' : 'w-16 translate-x-0 z-40'}
                `}
            >
                {/* Scrollable Nav Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-2 custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || (item.submenu.length > 0 && pathname.startsWith(item.href));
                        const isExpanded = expandedMenu === item.name;
                        const Icon = item.icon;

                        return (
                            <div key={item.name} className="flex flex-col">
                                <div
                                    onClick={() => handleMenuClick(item)}
                                    className={`
                                        relative flex items-center h-10 px-2.5 rounded-xl cursor-pointer transition-all duration-300 group
                                        ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white hover:bg-white/10'}
                                    `}
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>

                                    {/* Label (Reveal) */}
                                    <div className={`flex items-center justify-between flex-1 ml-4 overflow-hidden whitespace-nowrap transition-all duration-300 ${hoveredSection === 'nav' ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                        <span className="text-sm font-bold">{item.name}</span>
                                        {item.submenu.length > 0 && (
                                            <ChevronDown size={14} className={`opacity-60 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        )}
                                    </div>

                                    {/* Tooltip (Collapsed) */}
                                    {hoveredSection !== 'nav' && (
                                        <div className="absolute left-full ml-6 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-50 pointer-events-none whitespace-nowrap border border-white/10 shadow-xl">
                                            {item.name}
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 transform rotate-45 border-l border-b border-white/10"></div>
                                        </div>
                                    )}
                                </div>

                                {/* Submenu */}
                                {item.submenu.length > 0 && (
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded && hoveredSection === 'nav' ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                        <div className="flex flex-col space-y-1 ml-9 border-l border-white/10 pl-3">
                                            {item.submenu.map((sub, idx) => (
                                                <Link key={idx} href={sub.href} className="text-xs font-medium text-slate-500 hover:text-blue-400 py-1 block transition-colors">
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </nav>

            {/* 3. Bottom Segment: Minimal Profile (Independent) */}
            <div
                onMouseEnter={() => setHoveredSection('profile')}
                onMouseLeave={() => setHoveredSection(null)}
                className={`
                    pointer-events-auto h-16 bg-[#0f172a] rounded-2xl shadow-xl border border-white/5 
                    flex items-center relative transition-all duration-500 overflow-hidden
                    ${hoveredSection === 'profile' ? 'w-[240px] px-4 gap-3 z-50' : 'w-16 justify-center z-40'}
                `}
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[2px] flex-shrink-0">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                        <Users size={18} className="text-white" />
                    </div>
                </div>

                <div className={`flex flex-col flex-1 overflow-hidden whitespace-nowrap transition-all duration-300 ${hoveredSection === 'profile' ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                    <span className="text-xs font-bold text-white">Admin User</span>
                    <button
                        onClick={() => {
                            // Stop Attendance Session
                            localStorage.removeItem('zentra_attendance_session');
                            router.push('/login');
                        }}
                        className="text-[10px] text-left text-slate-400 hover:text-red-400 flex items-center gap-1 mt-0.5"
                    >
                        <LogOut size={10} /> Sign Out
                    </button>
                </div>
            </div>

        </aside>
    );
}
