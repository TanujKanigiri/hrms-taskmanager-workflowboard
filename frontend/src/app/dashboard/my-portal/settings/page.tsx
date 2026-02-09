"use client";

import React, { useState } from 'react';
import {
    User,
    Bell,
    Lock,
    Monitor,
    Globe,
    ChevronRight,
    Camera,
    Moon,
    Sun,
    Smartphone,
    Mail,
    ShieldCheck,
    LogOut,
    CheckCircle
} from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifs, setEmailNotifs] = useState(true);

    const tabs = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Login', icon: Lock },
        { id: 'appearance', label: 'Appearance', icon: Monitor }, // Changed from Palette to Monitor
    ];

    return (
        <div className="min-h-screen space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-20">

            <header>
                <h1 className="text-4xl font-black text-slate-800 tracking-tight">Settings</h1>
                <p className="text-slate-500 mt-2 font-medium text-lg">Manage your account preferences and personalized settings.</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 mt-8">

                {/* 1. Sidebar Structure Navigation */}
                <div className="lg:w-72 flex-shrink-0 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all duration-300 group ${activeTab === tab.id
                                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 ring-2 ring-indigo-600/20'
                                    : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-slate-100'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <tab.icon size={20} className={activeTab === tab.id ? 'text-indigo-200' : 'text-slate-400 group-hover:text-indigo-500 transition-colors'} />
                                <span>{tab.label}</span>
                            </div>
                            {activeTab === tab.id && <ChevronRight size={16} className="text-indigo-200" />}
                        </button>
                    ))}

                    <div className="h-px w-full bg-slate-200 my-4"></div>

                    <button className="w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>

                {/* 2. Content Area */}
                <div className="flex-1 bg-white border border-slate-100 rounded-[2.5rem] p-8 lg:p-12 shadow-sm min-h-[600px]">

                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-6">
                                <div className="relative group cursor-pointer">
                                    <div className="w-32 h-32 rounded-3xl bg-slate-100 overflow-hidden border-4 border-white shadow-xl">
                                        {/* Placeholder Avatar */}
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl text-white font-black">
                                            AS
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-sm">
                                        <Camera size={24} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">Alex Smith</h2>
                                    <p className="text-slate-500 font-medium">Senior Product Designer</p>
                                    <button className="mt-3 text-sm font-bold text-indigo-600 border border-indigo-200 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors">
                                        Change Avatar
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                                    <input type="text" defaultValue="Alex Smith" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input type="email" defaultValue="alex.smith@zentra.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Designation</label>
                                    <input type="text" defaultValue="Senior Product Designer" disabled className="w-full p-4 bg-slate-100 border border-transparent rounded-xl font-bold text-slate-500 cursor-not-allowed" />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex justify-end">
                                <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {/* NOTIFICATIONS TAB */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 mb-2">Notification Preferences</h2>
                                <p className="text-slate-500">Choose how and when you want to be notified.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">Email Notifications</h3>
                                            <p className="text-sm text-slate-500 font-medium">Receive updates via email</p>
                                        </div>
                                    </div>
                                    {/* Custom Toggle Switch */}
                                    <button
                                        onClick={() => setEmailNotifs(!emailNotifs)}
                                        className={`w-14 h-8 rounded-full transition-all duration-300 relative flex items-center px-1 shadow-inner ${emailNotifs ? 'bg-indigo-500' : 'bg-slate-300'}`}
                                    >
                                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${emailNotifs ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                            <Bell size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">Push Notifications</h3>
                                            <p className="text-sm text-slate-500 font-medium">Receive updates on your device</p>
                                        </div>
                                    </div>
                                    <button className="w-14 h-8 rounded-full bg-slate-300 relative flex items-center px-1 shadow-inner">
                                        <div className="w-6 h-6 bg-white rounded-full shadow-md transform translate-x-0"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECURITY TAB */}
                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 mb-2">Security & Login</h2>
                                <p className="text-slate-500">Manage your password and security settings.</p>
                            </div>

                            <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex items-start gap-4">
                                <ShieldCheck className="text-orange-500 flex-shrink-0" size={24} />
                                <div>
                                    <h3 className="font-bold text-orange-800">Two-Factor Authentication (2FA)</h3>
                                    <p className="text-sm text-orange-600 mt-1 leading-relaxed">Your account is currently protected with 2FA. We'll ask for a code when you log in from a new device.</p>
                                </div>
                                <button className="px-4 py-2 bg-white text-orange-600 font-bold text-sm rounded-lg shadow-sm border border-orange-100 hover:bg-orange-50 transition-colors">Manage</button>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Change Password</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <input type="password" placeholder="Current Password" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 transition-colors" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="password" placeholder="New Password" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 transition-colors" />
                                        <input type="password" placeholder="Confirm Password" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:border-indigo-500 transition-colors" />
                                    </div>
                                    <button className="mt-2 w-fit px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors">Update Password</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* APPEARANCE TAB */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 mb-2">Appearance</h2>
                                <p className="text-slate-500">Customize how Zentra looks on your device.</p>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                {/* Light Mode */}
                                <div
                                    onClick={() => setDarkMode(false)}
                                    className={`cursor-pointer group flex flex-col gap-3 ${!darkMode ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                                >
                                    <div className={`aspect-video rounded-2xl border-2 ${!darkMode ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-200'} bg-white p-4 flex flex-col gap-2 overflow-hidden shadow-lg transition-all`}>
                                        <div className="w-full h-8 bg-slate-100 rounded-lg"></div>
                                        <div className="flex gap-2">
                                            <div className="w-1/3 h-20 bg-slate-100 rounded-lg"></div>
                                            <div className="w-2/3 h-20 bg-slate-50 rounded-lg border border-slate-100"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center">
                                        <Sun size={18} className={!darkMode ? 'text-indigo-600' : 'text-slate-400'} />
                                        <span className={`font-bold ${!darkMode ? 'text-indigo-900' : 'text-slate-500'}`}>Light Mode</span>
                                        {!darkMode && <CheckCircle size={16} className="text-indigo-600" />}
                                    </div>
                                </div>

                                {/* Dark Mode (Visual rep) */}
                                <div
                                    onClick={() => setDarkMode(true)}
                                    className={`cursor-pointer group flex flex-col gap-3 ${darkMode ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                                >
                                    <div className={`aspect-video rounded-2xl border-2 ${darkMode ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-200'} bg-[#0f172a] p-4 flex flex-col gap-2 overflow-hidden shadow-lg transition-all`}>
                                        <div className="w-full h-8 bg-slate-800 rounded-lg"></div>
                                        <div className="flex gap-2">
                                            <div className="w-1/3 h-20 bg-slate-800 rounded-lg"></div>
                                            <div className="w-2/3 h-20 bg-slate-900 rounded-lg border border-slate-700"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center">
                                        <Moon size={18} className={darkMode ? 'text-indigo-600' : 'text-slate-400'} />
                                        <span className={`font-bold ${darkMode ? 'text-indigo-900' : 'text-slate-500'}`}>Dark Mode</span>
                                        {darkMode && <CheckCircle size={16} className="text-indigo-600" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
