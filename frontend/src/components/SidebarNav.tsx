"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Home,
    Zap,
    BookOpen,
    LifeBuoy,
    Settings,
    MessageSquare,
    Phone,
    LogIn,
    ChevronRight,
    Menu,

} from 'lucide-react';

export default function SidebarNav() {
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);

    const menuItems = [
        { name: 'Home', href: '/', icon: Home },

        { name: 'Features', href: '/#smart-hr-features', icon: Zap },
        { name: 'Resources', href: '/resources', icon: BookOpen },
        { name: 'Support', href: '/support', icon: LifeBuoy },
        { name: 'Services', href: '/implementation', icon: Settings },
        { name: 'Blog', href: '/blog', icon: MessageSquare },
        { name: 'Contact', href: '/#contact', icon: Phone },
    ];

    return (
        <>
            {/* Nav Container - Fixed, transparent, width fits content (starts small) */}
            <nav className="fixed left-0 top-0 h-screen z-50 flex flex-col items-start bg-transparent pointer-events-none w-min">

                {/* 1. Brand Section */}
                <div
                    className={`
                        pointer-events-auto
                        h-40 flex items-center relative cursor-pointer overflow-hidden transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
                        bg-[#0B1120] border-r border-slate-800 border-b
                        ${hoveredSection === 'brand' ? 'w-[280px] shadow-[20px_0_60px_rgba(6,182,212,0.15)] z-50' : 'w-[90px] z-40'}
                    `}
                    onMouseEnter={() => setHoveredSection('brand')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
                    {/* Top Decorative Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>

                    {/* Ambient Glow */}
                    <div className="absolute top-0 inset-x-0 h-24 bg-cyan-500/10 blur-xl rounded-full opacity-40 pointer-events-none"></div>

                    <div className={`transition-all duration-500 absolute left-4 ${hoveredSection === 'brand' ? 'scale-100' : 'scale-90'}`}>
                        {/* Logo Container */}
                        <div className="relative w-20 h-20 flex items-center justify-center transition-all">
                            <Image
                                src="/zentra_logo.png"
                                alt="Zentra Logo"
                                width={72}
                                height={72}
                                className="object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                            />
                        </div>
                    </div>

                    <div className={`flex flex-col ml-28 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-left ${hoveredSection === 'brand' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <span className="text-3xl font-black tracking-tighter text-white leading-none font-sans drop-shadow-lg">
                            Zentra<span className="text-cyan-400">HR</span>
                        </span>
                    </div>
                </div>

                {/* 2. Menu Section */}
                <div
                    className={`
                        pointer-events-auto
                        flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto custom-scrollbar relative
                        bg-[#0B1120] border-r border-slate-800
                        transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
                        ${hoveredSection === 'menu' ? 'w-[280px] shadow-[20px_0_60px_rgba(6,182,212,0.15)] z-50' : 'w-[90px] z-40'}
                    `}
                    onMouseEnter={() => setHoveredSection('menu')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="relative flex items-center h-12 rounded-lg group/item cursor-pointer transition-all duration-200 hover:bg-cyan-500/10 overflow-hidden shrink-0"
                            >
                                {/* Active/Hover Sidebar Marker */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-cyan-400 rounded-r-full transition-all duration-300 group-hover/item:h-8 group-hover/item:opacity-100 opacity-0 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>

                                {/* Icon Container */}
                                <div className="absolute left-0 w-[66px] h-12 flex items-center justify-center z-10 shrink-0">
                                    <Icon
                                        size={20}
                                        className={`transition-all duration-300 text-slate-400 group-hover/item:text-cyan-400 group-hover/item:scale-110`}
                                        strokeWidth={1.5}
                                    />
                                </div>

                                {/* Label */}
                                <span className={`ml-[66px] text-[13px] font-medium text-slate-300 whitespace-nowrap transition-all duration-300 ${hoveredSection === 'menu' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        )
                    })}
                </div>

                {/* 3. Bottom Login Section */}
                <div
                    className={`
                        pointer-events-auto
                        p-4 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md
                        transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) border-r
                        ${hoveredSection === 'login' ? 'w-[280px] shadow-[20px_0_60px_rgba(139,92,246,0.15)] z-50' : 'w-[90px] bg-[#0B1120] z-40'}
                    `}
                    onMouseEnter={() => setHoveredSection('login')}
                    onMouseLeave={() => setHoveredSection(null)}
                >
                    <Link
                        href="/login"
                        className={`
                            relative flex items-center justify-center overflow-hidden
                            transition-all duration-500 ease-out
                            ${hoveredSection === 'login'
                                ? 'w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-[1.02] border border-white/10'
                                : 'w-12 h-12 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 hover:border-violet-500 hover:text-violet-400 mx-auto'}
                        `}
                    >
                        {/* Icon - Always Visible */}
                        <div className={`transition-all duration-500 absolute flex items-center justify-center ${hoveredSection === 'login' ? 'left-4 translate-x-0' : 'left-1/2 -translate-x-1/2'}`}>
                            <LogIn size={20} />
                        </div>

                        {/* Text - Only Visible when expanded */}
                        <span className={`text-sm font-bold tracking-wide transition-all duration-300 pl-6 ${hoveredSection === 'login' ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 translate-x-10 w-0 overflow-hidden'}`}>
                            Sign In
                        </span>
                    </Link>
                </div>
            </nav>
        </>
    );
}
