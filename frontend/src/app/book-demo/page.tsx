"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Calendar, Clock, Users, ArrowRight, CheckCircle2, User, Mail, Building, Phone } from 'lucide-react';

export default function BookDemoPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        employees: '',
        phone: '',
        date: '',
        time: '',
        requirements: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Simulate API call
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Navbar handled globally */}

            {/* Hero Section - Matching Home Page style */}
            <div className="relative w-full h-[400px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 bg-black">
                    <Image
                        src="/hr_manager_hologram.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200 leading-tight mb-6 drop-shadow-md max-w-4xl pb-1">
                        See ZentraHR in Action
                    </h1>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8 relative">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-50 -skew-y-3 transform origin-top-left z-0 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Value Prop */}
                    <div className="space-y-8 lg:sticky lg:top-24">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                                Transform Your Workforce Experience Today.
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Schedule a personalized demo with our solution architects. We'll show you exactly how ZentraHR can solve your specific challenges and drive growth.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    title: "Tailored Walkthrough",
                                    desc: "We customize the demo based on your company size and industry needs.",
                                    icon: <Users className="w-6 h-6 text-blue-600" />
                                },
                                {
                                    title: "Deep Dive into Features",
                                    desc: "See our advanced Payroll, Leave, and Performance modules in real-time.",
                                    icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />
                                },
                                {
                                    title: "Q&A Session",
                                    desc: "Get immediate answers to all your technical and operational questions.",
                                    icon: <ArrowRight className="w-6 h-6 text-blue-600" />
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-500 font-medium bg-slate-100 p-4 rounded-xl w-fit">
                            <Clock className="w-5 h-5 text-slate-400" />
                            <span>Typical demo duration: 30-45 minutes</span>
                        </div>
                    </div>

                    {/* Right Column: Stylish Booking Form */}
                    <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 p-8 md:p-10 relative overflow-hidden">
                        {/* Gradient Border Top */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Schedule Your Demo</h3>
                            <p className="text-slate-500">Fill out the form below and we'll confirm your slot instantly.</p>
                        </div>

                        {isSubmitted ? (
                            <div className="h-[400px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                                <p className="text-slate-500 max-w-xs">We've sent a confirmation email to {formData.email}. One of our experts will be in touch shortly.</p>
                                <button onClick={() => setIsSubmitted(false)} className="mt-8 text-blue-600 font-bold hover:underline">Book another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                                placeholder="John Smith"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Work Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                                placeholder="john@company.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                                placeholder="Acme Inc."
                                                value={formData.company}
                                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            />
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Headcount</label>
                                        <div className="relative">
                                            <select
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-600 appearance-none"
                                                value={formData.employees}
                                                onChange={e => setFormData({ ...formData, employees: e.target.value })}
                                            >
                                                <option value="">Select Size</option>
                                                <option value="1-10">1-10 Employees</option>
                                                <option value="11-50">11-50 Employees</option>
                                                <option value="51-200">51-200 Employees</option>
                                                <option value="200-500">200-500 Employees</option>
                                                <option value="500+">500+ Employees</option>
                                            </select>
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preferred Date & Time</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="date"
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-600"
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            />
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        </div>
                                        <div className="relative">
                                            <select
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-600 appearance-none"
                                                value={formData.time}
                                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                                            >
                                                <option value="">Select Time</option>
                                                <option value="9:00 AM">9:00 AM</option>
                                                <option value="10:00 AM">10:00 AM</option>
                                                <option value="11:00 AM">11:00 AM</option>
                                                <option value="1:00 PM">1:00 PM</option>
                                                <option value="2:00 PM">2:00 PM</option>
                                                <option value="3:00 PM">3:00 PM</option>
                                                <option value="4:00 PM">4:00 PM</option>
                                            </select>
                                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Specific Requirements (Optional)</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none resize-none"
                                        placeholder="Tell us about your current challenges..."
                                        value={formData.requirements}
                                        onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 mt-2 flex items-center justify-center gap-2">
                                    Confirm Booking <ArrowRight className="w-5 h-5" />
                                </button>

                                <p className="text-xs text-center text-slate-400 mt-4">
                                    By booking, you agree to our <a href="#" className="underline hover:text-slate-600">Terms of Service</a>. We respect your privacy.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <ChatWidget />
            <Footer variant="black-transparent" />
        </main>
    );
}
