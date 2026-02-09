"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from "next/image";
import Link from "next/link";
import { FileText, PlayCircle, Download, BookOpen, ChevronRight, Search } from "lucide-react";

export default function ResourcesPage() {
    const [activeTab, setActiveTab] = useState<'docs' | 'videos'>('docs');

    const documents = [
        {
            category: "Core Modules",
            items: [
                { title: "Employee Database Management", type: "PDF", size: "2.4 MB" },
                { title: "Time & Attendance Configuration", type: "PDF", size: "1.8 MB" },
                { title: "Payroll Processing Guide", type: "PDF", size: "4.2 MB" },
                { title: "Leave Policy Setup", type: "PDF", size: "1.5 MB" }
            ]
        },
        {
            category: "Advanced Features",
            items: [
                { title: "Performance Appraisal System", type: "PDF", size: "3.1 MB" },
                { title: "Recruitment & Onboarding", type: "PDF", size: "2.9 MB" },
                { title: "API Integration Docs", type: "HTML", size: "Online" },
                { title: "Custom Reporting Engine", type: "PDF", size: "5.5 MB" }
            ]
        }
    ];

    const videos = [
        {
            title: "Getting Started with ZentraHR",
            duration: "10:24",
            thumbnail: "/hr_workflow_3d.png", // Reusing asset
            views: "1.2k"
        },
        {
            title: "Running Your First Payroll",
            duration: "15:30",
            thumbnail: "/feature_payroll.png", // Reusing asset
            views: "850"
        },
        {
            title: "Configuring Biometric Devices",
            duration: "08:15",
            thumbnail: "/feature_attendance_geo.png", // Reusing asset
            views: "2.1k"
        },
        {
            title: "Manager Self-Service Portal Tour",
            duration: "12:45",
            thumbnail: "/promo_man_phone.png", // Reusing asset
            views: "3.4k"
        }
    ];

    return (
        <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans">
            {/* Navbar handled globally */}

            {/* Hero Section */}
            <div className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Image
                        src="/feature_how_to_use.png"
                        alt="Resources Hero"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-slate-900/80"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                        <BookOpen size={14} /> Knowledge Base
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
                        Resource Library
                    </h1>
                    <p className="text-lg text-slate-200 mb-8 max-w-2xl font-light leading-relaxed">
                        Comprehensive guides, documentation, and video tutorials to help you master every aspect of ZentraHR.
                    </p>
                </div>

                {/* STYLISH ZIGZAG DIVIDER */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48V0h1200v120z" className="fill-slate-50" opacity=".25"></path>
                        <path d="M1200 120L0 120 0 60 1200 120z" className="fill-slate-50 opacity-50"></path>
                        <path d="M1200 120L0 120 0 90 1200 120z" className="fill-slate-50"></path>
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-16 px-6 max-w-7xl mx-auto w-full">

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-full shadow-md border border-slate-200 inline-flex">
                        <button
                            onClick={() => setActiveTab('docs')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'docs' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            <FileText size={18} /> Documentation
                        </button>
                        <button
                            onClick={() => setActiveTab('videos')}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'videos' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            <PlayCircle size={18} /> Video Tutorials
                        </button>
                    </div>
                </div>

                {/* Documentation Content */}
                {activeTab === 'docs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {documents.map((section, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-800 text-lg">{section.category}</h3>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{section.items.length} Files</span>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {section.items.map((doc, dIdx) => (
                                        <div key={dIdx} className="p-4 hover:bg-blue-50 transition-colors group flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{doc.title}</h4>
                                                    <p className="text-xs text-slate-500">{doc.type} • {doc.size}</p>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                                                <Download size={16} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Videos Content */}
                {activeTab === 'videos' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {videos.map((video, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                                <div className="relative h-64 w-full bg-slate-900">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                            <PlayCircle size={32} fill="currentColor" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{video.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><Search size={14} /> {video.views} views</span>
                                        <span>•</span>
                                        <span>Updated 2 days ago</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>

            <Footer variant="black-transparent" />
        </main>
    );
}
