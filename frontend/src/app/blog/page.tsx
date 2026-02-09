"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Search } from "lucide-react";

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const blogs = [
        {
            id: 1,
            title: "The Future of Payroll Automation",
            excerpt: "Discover how AI and machine learning are revolutionizing payroll processing, reducing errors, and ensuring global compliance.",
            image: "/feature_payroll_hologram.png",
            author: "Sarah Johnson",
            date: "Jan 15, 2026",
            category: "Payroll",
            slug: "#"
        },
        {
            id: 2,
            title: "Mastering Tech-Driven Recruitment",
            excerpt: "From ATS to AI interviews: A comprehensive guide to modernizing your hiring pipeline and securing top talent.",
            image: "/feature_onboarding_dial.png",
            author: "Michael Chen",
            date: "Jan 12, 2026",
            category: "Recruitment",
            slug: "#"
        },
        {
            id: 3,
            title: "Employee Engagement in Remote Era",
            excerpt: "Strategies for keeping your distributed workforce connected, motivated, and productive using modern HR tools.",
            image: "/hero_office_people.png",
            author: "Emily Davis",
            date: "Jan 08, 2026",
            category: "Culture",
            slug: "#"
        },
        {
            id: 4,
            title: "Why Time Tracking Matters",
            excerpt: "Beyond punching the clock: How smart attendance systems prevent burnout and optimize workforce allocation.",
            image: "/feature_time_attendance_infographic.png",
            author: "David Wilson",
            date: "Jan 05, 2026",
            category: "Productivity",
            slug: "#"
        },
        {
            id: 5,
            title: "Performance Reviews Reinvented",
            excerpt: "Moving away from annual appraisals to continuous feedback loops. How to set up OKRs that actually work.",
            image: "/feature_performance_potential.png",
            author: "Jessica Lee",
            date: "Jan 02, 2026",
            category: "Management",
            slug: "#"
        },
        {
            id: 6,
            title: "Data-Driven HR Decisions",
            excerpt: "Leveraging analytics to predict turnover, identify skills gaps, and build a resilient organization.",
            image: "/hrms_glass_dashboard.png",
            author: "Robert Taylor",
            date: "Dec 28, 2025",
            category: "Analytics",
            slug: "#"
        }
    ];

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans">
            {/* Navbar handled globally */}

            {/* Hero Section - Unique Style for Blog */}
            <div className="relative w-full h-[450px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Image
                        src="/feature_onboarding_dial.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-900/90"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
                        Insights & Updates
                    </h1>
                    <p className="text-lg text-slate-300 mb-8 max-w-2xl font-light">
                        Explore the latest trends, strategies, and success stories in modern workforce management.
                    </p>

                    {/* Search Bar */}
                    <div className="w-full max-w-md relative group">
                        <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md group-hover:bg-blue-500/50 transition-all"></div>
                        <input
                            type="text"
                            placeholder="Search articles, topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="relative w-full py-4 pl-6 pr-12 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:bg-white/20 focus:border-blue-400 backdrop-blur-md shadow-2xl transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={20} />
                        </div>
                    </div>
                </div>

                {/* STYLISH VERTICAL SLICE DIVIDER - Unique to Blog */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="fill-slate-50"></path>
                    </svg>
                </div>
            </div>

            {/* Blog Grid Section */}
            <div className="py-20 px-6 max-w-7xl mx-auto w-full">

                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-slate-400 font-medium">No articles found matching "{searchQuery}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredBlogs.map((blog) => (
                            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col h-full">
                                {/* Image Container */}
                                <div className="relative h-56 w-full overflow-hidden">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-wide">
                                        {blog.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                                        <span className="flex items-center gap-1"><Calendar size={14} className="text-slate-400" /> {blog.date}</span>
                                        <span className="flex items-center gap-1"><User size={14} className="text-slate-400" /> {blog.author}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                        {blog.title}
                                    </h3>

                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                                        {blog.excerpt}
                                    </p>

                                    <Link href={blog.slug} className="inline-flex items-center text-blue-600 font-bold text-sm tracking-wide group-hover:gap-2 transition-all">
                                        Read Article <ArrowRight size={16} className="ml-1" />
                                    </Link>
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
