import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Fish } from "lucide-react";

interface FooterProps {
    variant?: 'default' | 'black-transparent';
}

export default function Footer({ variant = 'default' }: FooterProps) {
    const isDark = variant === 'black-transparent';

    // Text Colors
    const textColor = isDark ? "text-white/60" : "text-slate-500";
    const titleColor = isDark ? "text-white" : "text-slate-900";
    const linkHoverColor = isDark ? "hover:text-blue-400" : "hover:text-blue-600";

    // Backgrounds & Borders
    const footerBg = isDark ? "bg-[#0f172a] border-t border-slate-800" : "bg-slate-50 border-t border-slate-200";
    const borderColor = isDark ? "border-slate-800" : "border-slate-200";
    const socialBg = isDark ? "bg-slate-800 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md ring-1 ring-white/5" : "bg-slate-200 hover:bg-blue-600 hover:text-white";

    return (
        <footer className={`${footerBg} border-t ${borderColor} pt-16 pb-8 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative w-14 h-14">
                                <Image src="/zentra_logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight"><span className="text-blue-700">Zentra</span><span className="text-red-600">HR</span></span>
                        </div>
                        <p className={`${textColor} text-sm leading-relaxed`}>
                            Building a happier workforce. The most advanced HR Management software for enterprises of all sizes.
                        </p>
                    </div>
                    <div>
                        <h4 className={`font-bold ${titleColor} mb-6`}>Quick Links</h4>
                        <ul className={`space-y-3 text-sm ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                            <li><Link href="/" className={`${linkHoverColor} transition-colors`}>Home</Link></li>
                            <li><Link href="/#smart-hr-features" className={`${linkHoverColor} transition-colors`}>Features</Link></li>
                            <li><Link href="#" className={`${linkHoverColor} transition-colors`}>Apps</Link></li>
                            <li><Link href="/support" className={`${linkHoverColor} transition-colors`}>Support</Link></li>
                            <li><Link href="/implementation" className={`${linkHoverColor} transition-colors`}>Deployment Services</Link></li>
                            <li><Link href="#" className={`${linkHoverColor} transition-colors`}>Resources</Link></li>
                            <li><Link href="#" className={`${linkHoverColor} transition-colors`}>Blog</Link></li>
                            <li><Link href="/#contact" className={`${linkHoverColor} transition-colors`}>Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={`font-bold ${titleColor} mb-6`}>Legal</h4>
                        <ul className={`space-y-3 text-sm ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                            <li><Link href="#" className={`${linkHoverColor} transition-colors`}>Privacy Policy</Link></li>
                            <li><Link href="#" className={`${linkHoverColor} transition-colors`}>Terms of Service</Link></li>
                            <li><Link href="#" className={`${linkHoverColor} transition-colors`}>Cookie Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={`font-bold ${titleColor} mb-6`}>Contact</h4>
                        <address className={`not-italic text-sm ${isDark ? 'text-zinc-400' : 'text-slate-600'} space-y-3`}>
                            <p className="leading-relaxed">
                                Capital Park, Plot No. 1, 28 & 29,<br />
                                Image Gardens Rd, VIP Hills,<br />
                                Jaihind Enclave, Madhapur,<br />
                                Hyderabad, Telangana 500081
                            </p>
                            <p>Email: support@zentrahr.com</p>
                        </address>
                    </div>
                </div>
                <div className={`border-t ${borderColor} pt-8 flex flex-col lg:flex-row justify-between items-center gap-6`}>
                    <p className={`text-xs ${textColor} order-3 lg:order-1`}>
                        © 2026 ZentraHR. All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-4 order-2">
                        <a href="#" className={`w-8 h-8 flex items-center justify-center ${socialBg} rounded-full transition-colors cursor-pointer`}>
                            <Linkedin size={14} className={isDark ? "text-white" : ""} />
                        </a>
                        <a href="#" className={`w-8 h-8 flex items-center justify-center ${socialBg} rounded-full transition-colors cursor-pointer`}>
                            <Twitter size={14} className={isDark ? "text-white" : ""} />
                        </a>
                        <a href="#" className={`w-8 h-8 flex items-center justify-center ${socialBg} rounded-full transition-colors cursor-pointer`}>
                            <Facebook size={14} className={isDark ? "text-white" : ""} />
                        </a>
                        <a href="#" className={`w-8 h-8 flex items-center justify-center ${socialBg} rounded-full transition-colors cursor-pointer`}>
                            <Instagram size={14} className={isDark ? "text-white" : ""} />
                        </a>
                        <a href="#" className={`w-8 h-8 flex items-center justify-center ${socialBg} rounded-full transition-colors cursor-pointer`}>
                            <Youtube size={14} className={isDark ? "text-white" : ""} />
                        </a>
                    </div>

                    <div className={`flex items-center gap-3 order-1 lg:order-3 px-4 py-2 rounded-full border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"} shadow-sm`}>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">A Product of</span>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center p-1">
                                <Fish className="text-white w-full h-full" />
                            </div>
                            <span className="font-black text-sm tracking-tight uppercase flex gap-1 leading-none">
                                <span className={isDark ? "text-white" : "text-slate-900"}>WhiteWhale</span>
                                <span className="text-pink-600">Solutions</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
