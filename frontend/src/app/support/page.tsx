"use client";

import React, { useState } from 'react';

import Footer from '../../components/Footer';
import ChatWidget from '../../components/ChatWidget';
import Image from "next/image";
import { Check, Plus, Minus } from 'lucide-react';

export default function SupportPage() {
    const [isTermsOpen, setIsTermsOpen] = useState(false);

    const handleGetStarted = () => {
        window.dispatchEvent(new Event('openChat'));
    };

    return (
        <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900 font-sans">
            {/* Navbar handled globally */}

            {/* Hero Section */}
            <div className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Image
                        src="/feature_helpdesk.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200 leading-tight mb-6 drop-shadow-md max-w-4xl pb-1">
                        ZentraHR Smart Support
                    </h1>
                </div>

                {/* STYLISH CURVED CUT DIVIDER */}
                <div className="absolute bottom-0 left-0 w-full z-20 overflow-hidden leading-none pointer-events-none">
                    <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50 opacity-20"></path>
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-slate-50"></path>
                    </svg>
                </div>
            </div>

            <div className="py-20 px-6 max-w-7xl mx-auto w-full">

                {/* Header/Title Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Support Plans</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Choose the right support package to potentialize your HR operations with ZentraHR.
                    </p>
                </div>

                {/* Pricing Table Container */}
                <div className="relative">


                    {/* Table Grid */}
                    <div className="bg-white rounded-xl shadow-xl overflow-visible border border-slate-200">

                        {/* 1. Header Row: Packages & Prices */}
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                            {/* Empty corner cell */}
                            <div className="hidden md:block bg-slate-50 p-4"></div>

                            {/* Package 1 */}
                            <div className="p-6 text-center bg-white flex flex-col items-center">
                                <h3 className="text-xl font-bold text-slate-700 mb-2">Package 1</h3>
                                <div className="text-4xl font-black text-slate-900 mb-1">
                                    <span className="text-2xl align-top mr-1">$</span>499
                                </div>
                                <span className="text-sm text-slate-500 mb-6">/ Month</span>
                                <button onClick={handleGetStarted} className="bg-[#005bb5] hover:bg-[#004a94] text-white font-bold py-2.5 px-6 rounded shadow-sm transition-colors w-min whitespace-nowrap">
                                    Get Started
                                </button>
                            </div>

                            {/* Package 2 (Most Popular) */}
                            <div className="p-6 text-center bg-white flex flex-col items-center relative z-10">
                                {/* Badge Attached to Column */}
                                <div className="absolute top-0 inset-x-[-1px] -translate-y-full z-20">
                                    <div className="bg-orange-500 text-white font-bold py-2 rounded-t-lg shadow-sm uppercase text-xs sm:text-sm tracking-wide w-full text-center">
                                        Most Popular
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">Package 2</h3>
                                <div className="text-4xl font-black text-slate-900 mb-1">
                                    <span className="text-2xl align-top mr-1">$</span>799
                                </div>
                                <span className="text-sm text-slate-500 mb-6">/ Month</span>
                                <button onClick={handleGetStarted} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded shadow-sm transition-colors w-min whitespace-nowrap">
                                    Get Started
                                </button>
                            </div>

                            {/* Package 3 */}
                            <div className="p-6 text-center bg-white flex flex-col items-center">
                                <h3 className="text-xl font-bold text-slate-700 mb-2">Package 3</h3>
                                <div className="text-4xl font-black text-slate-900 mb-1">
                                    <span className="text-2xl align-top mr-1">$</span>1099
                                </div>
                                <span className="text-sm text-slate-500 mb-6">/ Month</span>
                                <button onClick={handleGetStarted} className="bg-[#005bb5] hover:bg-[#004a94] text-white font-bold py-2.5 px-6 rounded shadow-sm transition-colors w-min whitespace-nowrap">
                                    Get Started
                                </button>
                            </div>
                        </div>

                        {/* Feature Rows */}
                        {[
                            { label: "Incidents", val1: "15 Incidents", val2: "30 Incidents", val3: "45 Incidents" },
                            { label: "24X7 Support", check: true },
                            { label: "Development Included", check: true },
                            { label: "Functional & Technical Support", check: true },
                            { label: "Maximum Incident Time", val1: "1 Hour", val2: "1 Hour", val3: "1 Hour" },
                            { label: "Medium", val1: "Zoom, Skype & Whatsapp", val2: "Zoom, Skype & Whatsapp", val3: "Zoom, Skype & Whatsapp" },
                        ].map((row, idx) => (
                            <div key={idx} className={`grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                                <div className="px-4 py-3 font-medium text-slate-600 flex items-center">
                                    {row.label}
                                </div>
                                <div className="px-4 py-3 text-center text-slate-700 flex items-center justify-center font-medium">
                                    {row.check ? <Check className="text-green-500 w-5 h-5" strokeWidth={3} /> : row.val1}
                                </div>
                                <div className="px-4 py-3 text-center text-slate-700 flex items-center justify-center font-medium">
                                    {row.check ? <Check className="text-green-500 w-5 h-5" strokeWidth={3} /> : row.val2}
                                </div>
                                <div className="px-4 py-3 text-center text-slate-700 flex items-center justify-center font-medium">
                                    {row.check ? <Check className="text-green-500 w-5 h-5" strokeWidth={3} /> : row.val3}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* Terms and Conditions Accordion */}
                <div className="mt-8 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <button
                        onClick={() => setIsTermsOpen(!isTermsOpen)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left font-bold text-slate-800 rounded-t-lg"
                    >
                        <span className="flex items-center gap-2">
                            {isTermsOpen ? <Minus size={18} /> : <Plus size={18} />}
                            Terms and Conditions
                        </span>
                    </button>

                    {isTermsOpen && (
                        <div className="p-6 text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                            <ol className="list-decimal pl-5 space-y-3 marker:font-bold marker:text-slate-700">
                                <li>
                                    The chances of consuming more than one incident in the case of supporting modules as we may require more time studying its functionality. Therefore, the chances of consuming more incidences will be high.
                                </li>
                                <li>
                                    The standardized time allocation for an incident is one hour and if it exceeds the time range each additional hour will be considered as an incident.
                                </li>
                                <li>
                                    WhiteWhale Software Solutions offer multiple support plans for businesses who need a robust, foolproof, and reliable ERP system for their business efficiency and productivity. WhiteWhale Software Solutions Support Plans offer highly responsive technical support, implementations, post-installation support, and more. Our flexible support plans are intelligently crafted that you pay only for the services you need and the time we spend addressing your ERP issues.
                                </li>
                                <li>
                                    WhiteWhale Software Solutions provide remote Odoo support via text, telephone or screen sharing within the agreed response times. The Support Mediums include:
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>Email</li>
                                        <li>Telephone</li>
                                        <li>Skype</li>
                                        <li>Team viewer</li>
                                        <li>Zoom</li>
                                        <li>Anydesk</li>
                                        <li>Hangout</li>
                                    </ul>
                                </li>
                                <li>
                                    WhiteWhale Software Solutions support period starts soon after the successful payment from the customer. The work commences from the date of amount received from the customer.
                                </li>
                                <li>
                                    WhiteWhale Software Solutions Odoo support services will be only applicable for the all versions of Odoo. Support area includes:
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>Odoo user functional training</li>
                                        <li>Odoo functional assistance</li>
                                        <li>Odoo technical guidance</li>
                                        <li>Bug fixing</li>
                                    </ul>
                                </li>
                                <li>
                                    To enable WhiteWhale Software Solutions to respond towards certain Odoo problems, WhiteWhale Software Solutions may require that customer furnish WhiteWhale Software Solutions with a test case and sufficient documentation to allow recreation of the Odoo problem.
                                </li>
                                <li>
                                    The customers are responsible for maintaining an appropriate connection to the Internet or your telecommunication medium in order to avail remote support service from WhiteWhale Software Solutions.
                                </li>
                            </ol>
                        </div>
                    )}
                </div>
            </div>

            <ChatWidget />
            <Footer variant="black-transparent" />
        </main>
    );
}
