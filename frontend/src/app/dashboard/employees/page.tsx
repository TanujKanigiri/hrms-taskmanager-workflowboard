"use client";

import React from 'react';
import Link from 'next/link';
import {
    Users,
    UserPlus,
    BarChart3,
    Layers,
    Search,
    ArrowRight,
    Briefcase,
    MapPin,
    Globe,
    TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmployeesLandingPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12">

            {/* Hero Section */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">People Analytics</h1>
                        <p className="text-slate-400 text-lg max-w-xl">
                            Gain insights into your workforce distribution, growth trends, and organizational structure.
                        </p>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => router.push('/dashboard/employees/directory')}
                                className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2"
                            >
                                <Users size={18} /> View Directory
                            </button>
                            <button className="px-6 py-3 bg-white/10 text-white border border-white/10 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
                                <UserPlus size={18} /> Onboard Talent
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Headcount</p>
                            <h3 className="text-3xl font-black">142</h3>
                            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 mt-1">
                                <TrendingUp size={12} /> +12% this month
                            </span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors cursor-pointer">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Open Roles</p>
                            <h3 className="text-3xl font-black">8</h3>
                            <span className="text-blue-400 text-xs font-bold mt-1 block">Engineering & Design</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors cursor-pointercol-span-2">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Departments</p>
                            <h3 className="text-3xl font-black">6</h3>
                            <div className="flex gap-1 mt-2">
                                <div className="h-1.5 flex-1 bg-blue-500 rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-purple-500 rounded-full"></div>
                                <div className="h-1.5 flex-1 bg-emerald-500 rounded-full"></div>
                                <div className="h-1.5 w-1/4 bg-amber-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    {
                        title: 'Employee Directory',
                        desc: 'Searchable list of all staff members with detailed profiles.',
                        icon: Users,
                        color: 'blue',
                        link: '/dashboard/employees/directory'
                    },
                    {
                        title: 'Organization Chart',
                        desc: 'Interactive visual hierarchy of departments and reporting lines.',
                        icon: Layers,
                        color: 'purple',
                        link: '/dashboard/employees/org-chart'
                    },
                    {
                        title: 'My Team',
                        desc: 'Team-level dashboards, availability, and kudos wall.',
                        icon: Briefcase,
                        color: 'emerald',
                        link: '/dashboard/employees/teams'
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        onClick={() => router.push(item.link)}
                        className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 p-16 bg-${item.color}-50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>

                        <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform`}>
                            <item.icon size={28} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">{item.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 relative z-10 pr-4">{item.desc}</p>

                        <div className={`inline-flex items-center gap-2 text-sm font-bold text-${item.color}-600 relative z-10 group-hover:gap-3 transition-all`}>
                            Enter Module <ArrowRight size={16} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Global Presence Map (Visual Only) */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <Globe className="text-slate-400" /> Global Presence
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Employee distribution across office locations.</p>
                    </div>
                    <button className="text-blue-600 font-bold text-sm hover:underline">View All Locations</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { city: 'San Francisco', count: 85, country: 'USA' },
                        { city: 'London', count: 32, country: 'UK' },
                        { city: 'Bangalore', count: 18, country: 'India' },
                        { city: 'Remote', count: 7, country: 'Global' },
                    ].map((loc, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{loc.city}</h4>
                                <p className="text-xs text-slate-500 font-bold">{loc.count} Employees</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
