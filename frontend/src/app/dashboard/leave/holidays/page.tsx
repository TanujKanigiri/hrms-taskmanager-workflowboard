"use client";

import React, { useState } from 'react';
import {
    Calendar,
    Search,
    Filter,
    MapPin,
    Sun,
    CloudRain,
    Snowflake,
    PartyPopper,
    ArrowRight,
    ArrowLeft,
    Star
} from 'lucide-react';
import Link from 'next/link';

export default function HolidayListPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const holidays = [
        { id: 1, name: 'New Year\'s Day', date: 'Jan 01, 2026', day: 'Thursday', type: 'Public Holiday', season: 'Winter', category: 'Public' },
        { id: 2, name: 'Republic Day', date: 'Jan 26, 2026', day: 'Monday', type: 'National Holiday', season: 'Winter', category: 'National' },
        { id: 3, name: 'Holi', date: 'Mar 06, 2026', day: 'Friday', type: 'Festival', season: 'Spring', category: 'Optional' },
        { id: 4, name: 'Good Friday', date: 'Apr 03, 2026', day: 'Friday', type: 'Public Holiday', season: 'Spring', category: 'Public' },
        { id: 5, name: 'Eid-ul-Fitr', date: 'May 19, 2026', day: 'Tuesday', type: 'Festival', season: 'Summer', category: 'Optional' },
        { id: 6, name: 'Independence Day', date: 'Aug 15, 2026', day: 'Saturday', type: 'National Holiday', season: 'Monsoon', category: 'National' },
        { id: 7, name: 'Diwali', date: 'Nov 12, 2026', day: 'Thursday', type: 'Festival', season: 'Winter', category: 'Public' },
        { id: 8, name: 'Christmas', date: 'Dec 25, 2026', day: 'Friday', type: 'Public Holiday', season: 'Winter', category: 'Public' },
    ];

    const upcomingHoliday = holidays.find(h => new Date(h.date).getTime() > new Date().getTime()) || holidays[0];

    const getSeasonIcon = (season: string) => {
        switch (season) {
            case 'Winter': return <Snowflake className="text-cyan-300" size={18} />;
            case 'Summer': return <Sun className="text-amber-400" size={18} />;
            case 'Monsoon': return <CloudRain className="text-blue-400" size={18} />;
            default: return <Sun className="text-amber-400" size={18} />;
        }
    };

    const categories = ['All', 'National', 'Public', 'Optional'];

    const filteredHolidays = holidays.filter(h =>
        (selectedCategory === 'All' || h.category === selectedCategory) &&
        (h.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header with Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <Link href="/dashboard/my-portal/leaves" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-800 transition-colors mb-2">
                        <ArrowLeft size={16} /> Back to My Leaves
                    </Link>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Holiday Calendar <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">2026</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Plan your long weekends and celebrations.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Pill */}
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search holidays..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-64 transition-all group-hover:shadow-md"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-purple-500 transition-colors" size={20} />
                    </div>

                    {/* Category Filter */}
                    <div className="flex bg-white border border-slate-200 rounded-full p-1 shadow-sm">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured "Next Holiday" Card - Hero Section */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0f172a] text-white shadow-2xl group cursor-default">
                {/* Dynamic Backgrounds */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512389142860-9c447e85c151?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-[2s]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>

                <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                            <PartyPopper size={14} /> Upcoming Celebration
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                            {upcomingHoliday.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-6 text-slate-300">
                            <span className="flex items-center gap-2 text-lg font-medium"><Calendar size={20} className="text-purple-400" /> {upcomingHoliday.day}, {upcomingHoliday.date.split(',')[0]}</span>
                            <span className="hidden w-1.5 h-1.5 rounded-full bg-slate-600 md:block"></span>
                            <span className="flex items-center gap-2 text-lg font-medium"><MapPin size={20} className="text-pink-400" /> All Locations</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 shrink-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[120px]">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Days Left</span>
                        <span className="text-5xl font-black text-white">
                            {Math.ceil((new Date(upcomingHoliday.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                        </span>
                    </div>
                </div>
            </div>

            {/* Holiday Grid - Masonry-ish feel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredHolidays.map((holiday, idx) => (
                    <div
                        key={holiday.id}
                        className="group bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Decorative Gradient Blob */}
                        <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${holiday.season === 'Winter' ? 'bg-cyan-500' :
                            holiday.season === 'Summer' ? 'bg-amber-500' :
                                holiday.season === 'Spring' ? 'bg-pink-500' : 'bg-blue-500'
                            }`}></div>

                        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                            <div className="flex justify-between items-start">
                                {/* Date Badge */}
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{holiday.date.split(' ')[0]}</span>
                                    <span className="text-xl font-black">{holiday.date.split(' ')[1].replace(',', '')}</span>
                                </div>

                                {/* Season Icon */}
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 group-hover:bg-white group-hover:shadow-md transition-all">
                                    {getSeasonIcon(holiday.season)}
                                </div>
                            </div>

                            <div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${holiday.category === 'National' ? 'text-purple-600' :
                                    holiday.category === 'Public' ? 'text-blue-600' : 'text-emerald-600'
                                    }`}>
                                    {holiday.category} Holiday
                                </span>
                                <h3 className="text-xl font-bold text-slate-800 leading-tight mb-1">{holiday.name}</h3>
                                <p className="text-sm font-medium text-slate-400 group-hover:text-slate-500">{holiday.day}</p>
                            </div>

                            <Link href="/dashboard/leave/apply" className="flex items-center justify-between w-full pt-4 border-t border-slate-50 text-xs font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                                Plan Leave <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredHolidays.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <Calendar size={64} className="text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-500">No holidays found</h3>
                    <p className="text-sm text-slate-400">Try adjusting your filters.</p>
                </div>
            )}
        </div>
    );
}
