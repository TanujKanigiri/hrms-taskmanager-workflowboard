"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/#smart-hr-features' },
        { name: 'Resources', href: '/resources' },
        { name: 'Services', href: '/implementation' },
        { name: 'Support', href: '/support' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <>
            {/* Minimalist Floating Bar */}
            <nav className={`fixed top-0 left-0 right-0 z-[60] py-4 px-6 md:px-12 transition-all duration-500 flex justify-between items-center ${scrolled || isOpen ? 'bg-transparent' : 'bg-gradient-to-b from-black/50 to-transparent'
                }`}>

                {/* Logo Area */}
                <Link href="/" className="relative z-[70] group flex items-center gap-3">
                    <div className="relative w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]">
                        <Image
                            src="/zentra_logo.png"
                            alt="ZentraHR Logo"
                            width={32}
                            height={32}
                            priority
                            className="object-contain"
                        />
                    </div>
                    <span className={`text-xl font-bold tracking-tight text-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                        Zentra<span className="text-cyan-400">HR</span>
                    </span>
                </Link>

                {/* Toggle Button (The only visible "Menu" element) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative z-[70] group flex items-center gap-3 px-2 focus:outline-none"
                >
                    <span className={`text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hidden md:block ${isOpen ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
                        Menu
                    </span>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-white text-black rotate-90' : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-cyan-500 hover:border-cyan-400'}`}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </div>
                </button>
            </nav>

            {/* Fullscreen Overlay Menu */}
            <div className={`fixed inset-0 z-[55] bg-[#050a10] transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${isOpen ? 'opacity-100 pointer-events-auto clip-circle-full' : 'opacity-0 pointer-events-none clip-circle-0'}`}>

                {/* Background Flair */}
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[100px] mix-blend-screen"></div>

                <div className="relative h-full w-full flex flex-col items-center justify-center">
                    <ul className="flex flex-col gap-6 text-center">
                        {menuItems.map((item, index) => (
                            <li key={item.name} className="overflow-hidden">
                                <Link
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-300 tracking-tighter transition-all duration-500 hover:scale-110 hover:tracking-normal hover:from-cyan-400 hover:to-violet-400 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'}`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className={`mt-16 flex gap-6 transition-all duration-700 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Link href="/login" className="px-8 py-3 rounded-full bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 hover:scale-105 transition-all">
                            Client Login
                        </Link>
                        <Link href="/book-demo" className="px-8 py-3 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 hover:border-white transition-all">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Login Fab (visible when menu closed) */}
            <Link
                href="/login"
                className={`fixed bottom-8 right-8 z-[50] w-14 h-14 bg-cyan-500 text-white rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12 ${scrolled && !isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
            >
                <ArrowRight size={24} />
            </Link>

            <style jsx>{`
                .clip-circle-0 { clip-path: circle(0% at 100% 0); }
                .clip-circle-full { clip-path: circle(150% at 100% 0); }
            `}</style>
        </>
    );
}
