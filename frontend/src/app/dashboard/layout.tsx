'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  UserCircle,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';
import { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Apply Leave', href: '/dashboard/apply', icon: PlusCircle },
    { name: 'My Leaves', href: '/dashboard/my-leaves', icon: CalendarDays },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-100/40 rounded-full blur-[120px]" />
      </div>

      <DashboardSidebar />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-lg text-slate-900">Zentra<span className="text-blue-600">HR</span></span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 transition-all duration-500 ml-0 md:ml-[100px] w-full h-screen overflow-hidden flex flex-col">

        {/* Top Header / Action Bar */}
        {/* Top Header / Action Bar - Hover Trigger Zone */}


        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 lg:p-12 pb-24">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-3/4 h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-left duration-300" onClick={e => e.stopPropagation()}>
            <div className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Z</span>
              Menu
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {/* Simplified Mobile Menu - Ideally should map the same structure */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-600 font-medium"
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
