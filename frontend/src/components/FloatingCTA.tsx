"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Calendar, ArrowRight } from 'lucide-react';

export default function FloatingCTA() {
    const pathname = usePathname();

    // Hide on login, register, or dashboard pages
    if (pathname?.startsWith('/login') || pathname?.startsWith('/dashboard')) {
        return null;
    }

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 pointer-events-none">

            {/* Wrapper to enable pointer events only on the buttons */}
            <div className="pointer-events-auto flex flex-col items-end gap-0">

                {/* Free Trial Button */}
                <Link
                    href="/free-trial"
                    className="group flex items-center bg-red-600 text-white shadow-lg hover:shadow-red-600/30 transition-all duration-300 ease-out transform translate-x-[calc(100%-50px)] hover:translate-x-0 rounded-l-xl py-3 pl-4 pr-6 overflow-hidden w-[220px]"
                >
                    <div className="flex-shrink-0 w-8 flex justify-center">
                        <Zap size={22} fill="currentColor" strokeWidth={0} />
                    </div>
                    <div className="flex flex-col ml-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 leading-none mb-0.5">Start Now</span>
                        <span className="font-bold whitespace-nowrap text-sm">Free Trial</span>
                    </div>
                    <ArrowRight className="ml-auto w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>

                {/* Book Demo Button */}
                <Link
                    href="/book-demo"
                    className="group flex items-center bg-[#005bb5] text-white shadow-lg hover:shadow-blue-600/30 transition-all duration-300 ease-out transform translate-x-[calc(100%-50px)] hover:translate-x-0 rounded-l-xl py-3 pl-4 pr-6 overflow-hidden w-[220px] mt-2"
                >
                    <div className="flex-shrink-0 w-8 flex justify-center">
                        <Calendar size={22} />
                    </div>
                    <div className="flex flex-col ml-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 leading-none mb-0.5">Explore</span>
                        <span className="font-bold whitespace-nowrap text-sm">Book Demo</span>
                    </div>
                    <ArrowRight className="ml-auto w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
            </div>

        </div>
    );
}
