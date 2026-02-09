"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatWidget from '../../components/ChatWidget';
import Image from "next/image";
import { Check, X } from 'lucide-react';

export default function ImplementationPage() {

    // Function to handle opening the chat
    const handleGetStarted = () => {
        window.dispatchEvent(new Event('openChat'));
    };

    return (
        <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans">
            {/* Navbar handled globally */}

            {/* Hero Section - Consistent with Support Page */}
            <div className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Image
                        src="/implementation_flow_glass.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200 leading-tight mb-6 drop-shadow-md max-w-4xl pb-1">
                        ZentraHR Deployment Plans
                    </h1>
                </div>

                {/* STYLISH GEOMETRIC TILT DIVIDER */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
                    <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <polygon points="1200 120 1200 0 0 120 0 120" className="fill-slate-50 opacity-10"></polygon>
                        <polygon points="1200 120 0 120 0 40 1200 120" className="fill-slate-50 opacity-40"></polygon>
                        <polygon points="1200 120 0 120 0 80 1200 120" className="fill-slate-50"></polygon>
                    </svg>
                </div>
            </div>

            <div className="py-10 px-4 md:px-6 max-w-[90rem] mx-auto w-full">

                {/* Header/Title Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Deployment Services</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Expert deployment to get your team up and running smoothly.
                    </p>
                </div>

                {/* Pricing Table Container */}
                <div className="relative overflow-x-auto pb-4 pt-14">

                    {/* Table Grid */}
                    <div className="bg-white rounded-xl shadow-xl overflow-visible border border-slate-200 min-w-[800px]">

                        {/* 1. Header Row: Packages & Prices */}
                        <div className="grid grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                            {/* Empty corner cell */}
                            <div className="hidden md:block bg-slate-50 p-4"></div>

                            {/* Package 1 */}
                            <div className="p-4 text-center bg-white flex flex-col items-center">
                                <h3 className="text-lg font-bold text-slate-700 mb-1">Package 1</h3>
                                <div className="text-3xl font-black text-slate-900 mb-1">
                                    <span className="text-xl align-top mr-1">$</span>999
                                </div>
                                <button onClick={handleGetStarted} className="mt-2 bg-[#005bb5] hover:bg-[#004a94] text-white font-bold py-2 px-4 rounded shadow-sm transition-colors w-full whitespace-nowrap text-sm">
                                    Get Started
                                </button>
                            </div>

                            {/* Package 2 */}
                            <div className="p-4 text-center bg-white flex flex-col items-center">
                                <h3 className="text-lg font-bold text-slate-700 mb-1">Package 2</h3>
                                <div className="text-3xl font-black text-slate-900 mb-1">
                                    <span className="text-xl align-top mr-1">$</span>1999
                                </div>
                                <button onClick={handleGetStarted} className="mt-2 bg-[#005bb5] hover:bg-[#004a94] text-white font-bold py-2 px-4 rounded shadow-sm transition-colors w-full whitespace-nowrap text-sm">
                                    Get Started
                                </button>
                            </div>

                            {/* Package 3 (Most Popular) */}
                            <div className="p-4 text-center bg-white flex flex-col items-center relative z-10 border-l border-r border-orange-200 bg-orange-50/10">
                                {/* Badge Attached to Column */}
                                <div className="absolute top-0 inset-x-[-1px] -translate-y-full z-20">
                                    <div className="bg-orange-500 text-white font-bold py-3 rounded-t-lg shadow-sm uppercase text-sm tracking-wide w-full text-center">
                                        Most Popular
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-1">Package 3</h3>
                                <div className="text-3xl font-black text-slate-900 mb-1">
                                    <span className="text-xl align-top mr-1">$</span>2999
                                </div>
                                <button onClick={handleGetStarted} className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow-sm transition-colors w-full whitespace-nowrap text-sm">
                                    Get Started
                                </button>
                            </div>

                            {/* Package 4 */}
                            <div className="p-4 text-center bg-white flex flex-col items-center">
                                <h3 className="text-lg font-bold text-slate-700 mb-1">Package 4</h3>
                                <div className="text-3xl font-black text-slate-900 mb-1">
                                    <span className="text-xl align-top mr-1">$</span>3999
                                </div>
                                <button onClick={handleGetStarted} className="mt-2 bg-[#005bb5] hover:bg-[#004a94] text-white font-bold py-2 px-4 rounded shadow-sm transition-colors w-full whitespace-nowrap text-sm">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* Feature Rows */}
                        {[
                            { label: "Installation", val1: true, val2: true, val3: true, val4: true },
                            { label: "Configuration", val1: true, val2: true, val3: true, val4: true },
                            { label: "Training", val1: "4 Hours", val2: "8 Hours", val3: "8 Hours", val4: "8 Hours" },
                            { label: "Consultation", val1: false, val2: "4 Hours", val3: "4 Hours", val4: "4 Hours" },
                            { label: "DB Backup to the Same Server", val1: true, val2: true, val3: true, val4: true },
                            { label: "Company limit", val1: "Single Company", val2: "Single Company", val3: "Single Company", val4: "Single Company" },
                            { label: "Duration", val1: "1 Day", val2: "2 Days", val3: "1 Week", val4: "2 Weeks" },
                            { label: "Assistance in Master Data Import", val1: false, val2: false, val3: true, val4: true },
                            { label: "Custom Module Installation (Module must be compatible with each other)", val1: false, val2: false, val3: false, val4: true },
                        ].map((row, idx) => (
                            <div key={idx} className={`grid grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                                <div className="px-3 py-2 font-medium text-slate-600 flex items-center md:col-span-1 text-sm">
                                    {row.label}
                                </div>
                                <div className="px-3 py-2 text-center text-slate-700 flex items-center justify-center font-medium text-sm">
                                    {renderValue(row.val1)}
                                </div>
                                <div className="px-3 py-2 text-center text-slate-700 flex items-center justify-center font-medium text-sm">
                                    {renderValue(row.val2)}
                                </div>
                                <div className="px-3 py-2 text-center text-slate-700 flex items-center justify-center font-medium text-sm">
                                    {renderValue(row.val3)}
                                </div>
                                <div className="px-3 py-2 text-center text-slate-700 flex items-center justify-center font-medium text-sm">
                                    {renderValue(row.val4)}
                                </div>
                            </div>
                        ))}

                        {/* Optional Features */}
                        {[
                            { label: "Optional SSL & Domain Configuration", val: "$499 Extra*" },
                            { label: "Optional Mail Server Configuration", val: "$499 Extra*" }
                        ].map((row, idx) => (
                            <div key={`opt-${idx}`} className="grid grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-[#f0f8ff]">
                                <div className="px-3 py-2 font-medium text-slate-600 flex flex-col justify-center text-sm">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Optional</span>
                                    {row.label.replace("Optional ", "")}
                                </div>
                                <div className="px-3 py-2 text-center text-slate-700 flex items-center justify-center font-medium text-sm">{row.val}</div>
                                <div className="px-3 py-2 text-center text-slate-700 flex items-center justify-center font-medium text-sm">{row.val}</div>
                                <div className="px-3 py-2 text-center text-slate-700 flex items-center justify-center font-medium text-sm">{row.val}</div>
                                <div className="px-3 py-2 text-center text-slate-700 flex items-center justify-center font-medium text-sm">{row.val}</div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>

            {/* Transformation Split Section */}
            <div className="w-full bg-white border-t border-slate-200">
                <div className="flex flex-col lg:flex-row min-h-[650px]">
                    {/* Image Side (Order 2 on mobile, 1 on desktop if we wanted alternates, but standard is text-left usually. Let's do Text Left, Image Right for reading flow) */}

                    {/* Text Side */}
                    <div className="flex-1 p-10 md:p-16 lg:p-24 flex flex-col justify-center bg-slate-50 lg:bg-white order-2 lg:order-1">
                        <div className="max-w-xl">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                                Streamlined Deployment.<br />
                                <span className="text-[#005bb5]">Tangible Results.</span>
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                We believe deployment is more than just "going live". It's about orchestrating a shift in how your organization performs. Our specialists handle the complexity so you can focus on leading your team through the change.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Feature 1 */}
                                <div className="flex flex-col">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <h4 className="text-slate-900 font-bold mb-1">Risk-Free Migration</h4>
                                    <p className="text-sm text-slate-500">Zero data loss guarantee with our dual-verification protocols.</p>
                                </div>
                                {/* Feature 2 */}
                                <div className="flex flex-col">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                                    </div>
                                    <h4 className="text-slate-900 font-bold mb-1">Tailored Workflows</h4>
                                    <p className="text-sm text-slate-500">We configure the system to map perfectly to your unique policies.</p>
                                </div>
                                {/* Feature 3 */}
                                <div className="flex flex-col">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                                        <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
                                    </div>
                                    <h4 className="text-slate-900 font-bold mb-1">Rapid Adoption</h4>
                                    <p className="text-sm text-slate-500">Role-based training sessions ensuring 90%+ user proficiency day one.</p>
                                </div>
                                {/* Feature 4 */}
                                <div className="flex flex-col">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                                        <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                                    </div>
                                    <h4 className="text-slate-900 font-bold mb-1">24/7 Hypercare</h4>
                                    <p className="text-sm text-slate-500">Dedicated support squad for the first 30 days of your launch.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Side - Full Height Panel */}
                    <div className="flex-1 relative min-h-[400px] lg:min-h-auto order-1 lg:order-2">
                        <Image
                            src="/deployment_team_collab.png"
                            alt="ZentraHR Team Collaboration"
                            fill
                            className="object-cover"
                        />
                        {/* Overlay Gradient for visual depth */}
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5 lg:via-transparent lg:to-transparent"></div>
                    </div>
                </div>
            </div>

            <ChatWidget />
            <Footer variant="black-transparent" />
        </main>
    );
}

function renderValue(val: string | boolean) {
    if (val === true) return <Check className="text-green-500 w-5 h-5" strokeWidth={3} />;
    if (val === false) return <X className="text-red-500 w-5 h-5" strokeWidth={3} />;
    return val;
}
