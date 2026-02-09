'use client';

import { usePathname } from 'next/navigation';
import SidebarNav from "@/components/SidebarNav";
import FloatingCTA from "@/components/FloatingCTA";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Check if the current path is the dashboard or any of its sub-routes
    const isDashboard = pathname?.startsWith('/dashboard');
    const isLoginPage = pathname === '/login';

    // For dashboard and login page, we want a clean layout without the global website sidebar/padding
    if (isDashboard || isLoginPage) {
        return <>{children}</>;
    }

    return (
        <>
            <SidebarNav />
            <div className="md:pl-[90px] w-full min-h-screen bg-[#0B1120]">
                {children}
            </div>
            <FloatingCTA />
        </>
    );
}
