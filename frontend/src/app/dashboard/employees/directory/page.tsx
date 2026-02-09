"use client";

import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Linkedin,
    MessageSquare,
    Star,
    Grid,
    List,
    UserPlus,
    Download,
    CheckCircle2,
    CalendarClock,
    User
} from 'lucide-react';

const INITIAL_EMPLOYEES = [
    {
        id: 'EMP001',
        name: 'Alexandra Morgan',
        role: 'Senior Product Designer',
        dept: 'Design',
        location: 'New York, USA',
        status: 'Active',
        availability: 'In Meeting',
        email: 'alex.m@zentra.com',
        phone: '+1 (555) 012-3456',
        joinDate: 'Jan 2024',
        skills: ['Figma', 'React', 'UX Research', 'Prototyping'],
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        color: 'purple'
    },
    {
        id: 'EMP002',
        name: 'Michael Chen',
        role: 'Lead Developer',
        dept: 'Engineering',
        location: 'San Francisco, USA',
        status: 'Active',
        availability: 'Online',
        email: 'michael.c@zentra.com',
        phone: '+1 (555) 098-7654',
        joinDate: 'Mar 2023',
        skills: ['TypeScript', 'Node.js', 'AWS', 'System Design'],
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        color: 'blue'
    },
    {
        id: 'EMP003',
        name: 'Sarah Jones',
        role: 'Marketing Manager',
        dept: 'Marketing',
        location: 'London, UK',
        status: 'On Leave',
        availability: 'Until Monday',
        email: 'sarah.j@zentra.com',
        phone: '+44 20 7123 4567',
        joinDate: 'Jun 2023',
        skills: ['SEO', 'Content Strategy', 'Analytics', 'Social Media'],
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        color: 'pink'
    },
    {
        id: 'EMP004',
        name: 'David Kim',
        role: 'DevOps Engineer',
        dept: 'Engineering',
        location: 'Remote',
        status: 'Active',
        availability: 'Focus Time',
        email: 'david.k@zentra.com',
        phone: '+1 (555) 111-2222',
        joinDate: 'Nov 2024',
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'Python'],
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        color: 'emerald'
    },
    {
        id: 'EMP005',
        name: 'Emily Davis',
        role: 'HR Specialist',
        dept: 'People',
        location: 'New York, USA',
        status: 'Active',
        availability: 'Online',
        email: 'emily.d@zentra.com',
        phone: '+1 (555) 333-4444',
        joinDate: 'Feb 2024',
        skills: ['Recruiting', 'Employee Relations', 'Compliance'],
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        color: 'orange'
    },
    {
        id: 'EMP006',
        name: 'James Wilson',
        role: 'Product Manager',
        dept: 'Product',
        location: 'London, UK',
        status: 'Remote',
        availability: 'Offline',
        email: 'james.w@zentra.com',
        phone: '+44 20 9988 7766',
        joinDate: 'Aug 2023',
        skills: ['Agile', 'Roadmapping', 'User Stories', 'Jira'],
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        color: 'indigo'
    }
];

export default function EmployeeDirectoryPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');
    const [activeProfile, setActiveProfile] = useState<any | null>(null);
    const [chatSession, setChatSession] = useState<any | null>(null);
    const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

    React.useEffect(() => {
        const stored = localStorage.getItem('directory_employees');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                // Simple merge to avoid duplicates if checking by ID, but for prototype simple spread is fine if we assume fresh start
                // or just appending new ones.
                setEmployees([...INITIAL_EMPLOYEES, ...parsed]);
            } catch (e) {
                console.error("Failed to load employees", e);
            }
        }
    }, []);

    const handleExport = () => {
        const headers = ["ID", "Name", "Role", "Department", "Email", "Phone", "Location", "Join Date"];
        const rows = employees.map(e => [e.id, e.name, e.role, e.dept, e.email, e.phone, e.location, e.joinDate]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "employees_directory.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const StatusBadge = ({ status, text }: { status: string, text: string }) => {
        const styles: Record<string, string> = {
            'Online': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'In Meeting': 'bg-amber-100 text-amber-700 border-amber-200',
            'Focus Time': 'bg-purple-100 text-purple-700 border-purple-200',
            'Offline': 'bg-slate-100 text-slate-500 border-slate-200',
            'On Leave': 'bg-red-100 text-red-700 border-red-200',
            'Until Monday': 'bg-red-50 text-red-600 border-red-100',
        };
        const style = styles[text] || styles['Offline'];
        return (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style} flex items-center gap-1 w-fit`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-current ${text === 'Online' ? 'animate-pulse' : ''}`}></span>
                {text}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Employee Directory</h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Manage your workforce, view profiles, and connect across teams.
                        <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                            {employees.length} Total
                        </span>
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Download size={18} /> Export
                    </button>
                    <button
                        onClick={() => window.location.href = '/dashboard/employees/onboard'}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:scale-[1.02]"
                    >
                        <UserPlus size={18} /> Add Employee
                    </button>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="flex items-center gap-4 w-full md:w-auto flex-1">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, role, or skill..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        {['All', 'Design', 'Engineering', 'Product', 'Marketing', 'People'].map(dept => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDept(dept)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedDept === dept ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                        <Grid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {employees.map((emp) => (
                        <div key={emp.id} className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            {/* Header Gradient */}
                            <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-${emp.color}-500/10 to-${emp.color}-500/5`}></div>

                            {/* New Badge */}
                            {emp.joinDate === 'Just Joined' && (
                                <div className="absolute top-4 left-4 z-10">
                                    <div className="bg-blue-600/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-blue-400/50 flex items-center gap-1 animate-in fade-in zoom-in duration-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> NEW
                                    </div>
                                </div>
                            )}

                            <div className="absolute top-4 right-4 z-10">
                                <button className="p-2 bg-white/50 backdrop-blur-md hover:bg-white rounded-full text-slate-400 hover:text-slate-700 transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            {/* Profile Info */}
                            <div className="relative z-10 flex flex-col items-center text-center mt-4">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 rounded-full p-1 bg-white shadow-lg overflow-hidden">
                                        <img src={emp.image} alt={emp.name} className="w-full h-full rounded-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                                        <StatusBadge status="active" text={emp.availability} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900">{emp.name}</h3>
                                <p className="text-sm text-slate-500 font-medium mb-1">{emp.role}</p>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">
                                    <span>{emp.dept}</span> • <span>{emp.location}</span>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap justify-center gap-2 mb-6 h-12 overflow-hidden">
                                    {emp.skills.map((skill, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3 w-full border-t border-slate-100 pt-6">
                                    <button
                                        onClick={() => window.location.href = `mailto:${emp.email}`}
                                        className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors flex items-center justify-center gap-2 group/btn"
                                    >
                                        <Mail size={16} className="group-hover/btn:scale-110 transition-transform" /> Email
                                    </button>
                                    <button
                                        onClick={() => setChatSession(emp)}
                                        className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 font-bold text-sm transition-colors flex items-center justify-center gap-2 group/btn"
                                    >
                                        <MessageSquare size={16} className="group-hover/btn:scale-110 transition-transform" /> Chat
                                    </button>
                                    <button
                                        onClick={() => setActiveProfile(emp)}
                                        className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                                    >
                                        <User size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role & Dept</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Location</th>
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {employees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={emp.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">{emp.name}</h4>
                                                <p className="text-xs text-slate-500">{emp.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="font-bold text-slate-700 text-sm">{emp.role}</p>
                                        <p className="text-xs text-slate-500">{emp.dept}</p>
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status="active" text={emp.availability} />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-slate-600 flex items-center gap-1"><Mail size={10} /> {emp.email}</span>
                                            <span className="text-xs font-medium text-slate-400 flex items-center gap-1"><Phone size={10} /> {emp.phone}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm font-bold text-slate-600 flex items-center gap-1">
                                            <MapPin size={14} className="text-slate-400" /> {emp.location}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- FULL PROFILE MODAL --- */}
            {activeProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className={`h-32 bg-gradient-to-r from-${activeProfile.color}-500 to-${activeProfile.color}-600 relative shrink-0`}>
                            <button
                                onClick={() => setActiveProfile(null)}
                                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <MoreHorizontal size={20} className="rotate-45" /> {/* Close Icon */}
                            </button>
                        </div>

                        {/* Profile Body */}
                        <div className="flex-1 overflow-y-auto w-full">
                            <div className="px-8 pb-8 relative -mt-16 bg-white rounded-t-[40px]">
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full p-2 bg-white shadow-xl mb-4">
                                        <img src={activeProfile.image} alt={activeProfile.name} className="w-full h-full rounded-full object-cover" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 text-center">{activeProfile.name}</h2>
                                    <p className="text-lg font-medium text-slate-500 mb-6 text-center">{activeProfile.role}</p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
                                        <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Department</p>
                                            <p className="font-bold text-slate-900">{activeProfile.dept}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Location</p>
                                            <p className="font-bold text-slate-900">{activeProfile.location}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                                            <p className="font-bold text-slate-900">{activeProfile.phone}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl text-center">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Joined</p>
                                            <p className="font-bold text-slate-900">{activeProfile.joinDate}</p>
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                            <Star size={18} className="text-amber-500" /> Skills & Expertise
                                        </h4>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {activeProfile.skills.map((s: string, i: number) => (
                                                <span key={i} className="px-4 py-2 bg-slate-50 rounded-xl font-bold text-slate-600 text-sm border border-slate-100">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full mt-8 pt-8 border-t border-slate-100 flex gap-4 pb-4">
                                        <button
                                            className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                                            onClick={() => {
                                                setChatSession(activeProfile);
                                                setActiveProfile(null);
                                            }}
                                        >
                                            <MessageSquare size={20} /> Send Message
                                        </button>
                                        <button className="flex-1 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                                            <UserPlus size={20} /> View Reporting Line
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- CHAT WIDGET --- */}
            {chatSession && (
                <div className="fixed bottom-0 right-8 w-80 bg-white rounded-t-2xl shadow-2xl border border-slate-200 z-50 animate-in slide-in-from-bottom-10 duration-300">
                    {/* Chat Header */}
                    <div className="p-4 bg-slate-900 text-white rounded-t-2xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img src={chatSession.image} className="w-8 h-8 rounded-full border border-white/20" alt="" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-900"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{chatSession.name}</h4>
                                <p className="text-xs text-slate-400">Active now</p>
                            </div>
                        </div>
                        <button onClick={() => setChatSession(null)} className="text-slate-400 hover:text-white">
                            <MoreHorizontal className="rotate-45" />
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="h-64 p-4 bg-slate-50 overflow-y-auto flex flex-col gap-3">
                        <div className="self-center text-xs text-slate-400 font-bold uppercase my-2">Today</div>
                        <div className="self-start max-w-[80%] bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm text-slate-700">
                            Hi {chatSession.name.split(' ')[0]}, do you have a minute to chat about the Q3 design specs?
                        </div>
                        <div className="self-end max-w-[80%] bg-blue-600 p-3 rounded-2xl rounded-br-sm shadow-md text-sm text-white">
                            Hey! Sure, I'm free right now. What's up?
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <button className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                            <MessageSquare size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
