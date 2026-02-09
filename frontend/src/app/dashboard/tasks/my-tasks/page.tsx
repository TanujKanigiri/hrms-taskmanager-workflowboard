"use client";

import React, { useState, useEffect } from 'react';
import {
    CheckCircle2,
    Calendar,
    ArrowRight,
    ArrowLeft,
    Search,
    Check,
    ListTodo,
    Archive,
    X,
    Paperclip,
    ArrowUp,
    ArrowDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    Flag,
    AlertCircle,
    Tag,
    Briefcase,
    User,
    CalendarDays,
    Timer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Mock Data
// Mock Data
interface Task {
    id: number;
    title: string;
    dept: string;
    assignedBy: string;
    dueDate: string;
    status: 'In Progress' | 'Completed' | 'To Do';
    completed: boolean;
    description: string;
    timeline: { date: string; event: string }[];
    priority: 'High' | 'Medium' | 'Low';
    tags: string[];
    estimatedTime: string;
}

const initialTasks: Task[] = [
    {
        id: 1,
        title: 'Prepare Monthly Sales Report',
        dept: 'Sales Dept',
        assignedBy: 'Sarah Connor',
        dueDate: 'Today',
        status: 'In Progress',
        completed: false,
        description: 'Compile data from Q3 and draft the executive summary regarding regional performance.',
        timeline: [
            { date: 'Today, 9:00 AM', event: 'Assigned by Sarah Connor' },
            { date: 'Today, 10:00 AM', event: 'Task Started' }
        ],
        priority: 'High',
        tags: ['Reporting', 'Q3', 'Analysis'],
        estimatedTime: '4h'
    },
    {
        id: 2,
        title: 'Update Client Database',
        dept: 'Operations',
        assignedBy: 'John Smith',
        dueDate: 'Tomorrow',
        status: 'To Do',
        completed: false,
        description: 'Verify phone numbers and email addresses for top 50 revenue-generating clients.',
        timeline: [
            { date: 'Yesterday, 4:00 PM', event: 'Task Created' }
        ],
        priority: 'Medium',
        tags: ['Database', 'Maintenance'],
        estimatedTime: '2h'
    },
    {
        id: 3,
        title: 'Review Q1 Objectives',
        dept: 'HR',
        assignedBy: 'Mike Ross',
        dueDate: 'Jan 25',
        status: 'Completed',
        completed: true,
        description: 'Align team goals with company OKRs for the upcoming quarter review.',
        timeline: [
            { date: 'Jan 20, 9:00 AM', event: 'Assigned by Mike Ross' },
            { date: 'Jan 21, 2:00 PM', event: 'Marked as Completed' }
        ],
        priority: 'High',
        tags: ['Strategy', 'OKR'],
        estimatedTime: '3h'
    },
    {
        id: 4,
        title: 'Fix Navigation Bug',
        dept: 'Engineering',
        assignedBy: 'Jane Doe',
        dueDate: 'Yesterday',
        status: 'In Progress',
        completed: false,
        description: 'Navbar collapses unexpectedly on mobile devices when rotating orientation.',
        timeline: [
            { date: 'Jan 19, 11:00 AM', event: 'Bug Reported' },
            { date: 'Jan 19, 11:30 AM', event: 'Investigation Started' }
        ],
        priority: 'High',
        tags: ['Bug', 'Mobile', 'UI'],
        estimatedTime: '1h'
    },
    {
        id: 5,
        title: 'Draft Newsletter',
        dept: 'Marketing',
        assignedBy: 'Emily Blunt',
        dueDate: 'Jan 28',
        status: 'To Do',
        completed: false,
        description: 'Write copy for the February product update focusing on new AI features.',
        timeline: [
            { date: 'Jan 22, 10:00 AM', event: 'Task Created' }
        ],
        priority: 'Low',
        tags: ['Content', 'Newsletter'],
        estimatedTime: '2.5h'
    },
    {
        id: 6,
        title: 'Security Audit',
        dept: 'Engineering',
        assignedBy: 'Alex Chen',
        dueDate: 'Next Week',
        status: 'To Do',
        completed: false,
        description: 'Perform a comprehensive security audit of the new authentication module.',
        timeline: [{ date: 'Jan 23, 9:00 AM', event: 'Task Created' }],
        priority: 'High',
        tags: ['Security', 'Auth', 'Audit'],
        estimatedTime: '8h'
    },
    {
        id: 7,
        title: 'Onboard New Interns',
        dept: 'HR',
        assignedBy: 'Jessica Pearson',
        dueDate: 'Feb 1',
        status: 'In Progress',
        completed: false,
        description: 'Prepare welcome kits and setup workstations for the summer intern batch.',
        timeline: [{ date: 'Jan 21, 2:00 PM', event: 'Process Started' }],
        priority: 'Medium',
        tags: ['Onboarding', 'Interns'],
        estimatedTime: '5h'
    },
    {
        id: 8,
        title: 'Update Website Assets',
        dept: 'Marketing',
        assignedBy: 'David Rose',
        dueDate: 'Feb 3',
        status: 'To Do',
        completed: false,
        description: 'Refresh the homepage hero images with the new branding guidelines.',
        timeline: [{ date: 'Jan 23, 11:00 AM', event: 'Request Received' }],
        priority: 'Low',
        tags: ['Design', 'Branding'],
        estimatedTime: '3h'
    },
    {
        id: 9,
        title: 'Quarterly budget Review',
        dept: 'Finance',
        assignedBy: 'Robert Zane',
        dueDate: 'Jan 30',
        status: 'Completed',
        completed: true,
        description: 'Analyze Q4 expenditures and flag any budget overruns.',
        timeline: [{ date: 'Jan 15, 9:00 AM', event: 'Review Completed' }],
        priority: 'High',
        tags: ['Finance', 'Budget'],
        estimatedTime: '6h'
    },
    {
        id: 10,
        title: 'Optimize Database Queries',
        dept: 'Engineering',
        assignedBy: 'Gilfoyle',
        dueDate: 'Today',
        status: 'In Progress',
        completed: false,
        description: 'Reduce latency on the main dashboard analytics api by indexing heavy columns.',
        timeline: [{ date: 'Today, 8:00 AM', event: 'Optimization Started' }],
        priority: 'Medium',
        tags: ['Performance', 'Database'],
        estimatedTime: '4h'
    },
    {
        id: 11,
        title: 'Plan Team Retreat',
        dept: 'HR',
        assignedBy: 'Donna Paulsen',
        dueDate: 'Feb 15',
        status: 'To Do',
        completed: false,
        description: 'Research venues and activities for the annual company retreat.',
        timeline: [{ date: 'Jan 20, 10:00 AM', event: 'Planning Initiated' }],
        priority: 'Low',
        tags: ['Events', 'Culture'],
        estimatedTime: '10h'
    },
    {
        id: 12,
        title: 'Client Demo Rehearsal',
        dept: 'Sales Dept',
        assignedBy: 'Harvey Specter',
        dueDate: 'Tomorrow',
        status: 'In Progress',
        completed: false,
        description: 'Practice the pitch deck and software demo flow for the upcoming prospect meeting.',
        timeline: [{ date: 'Yesterday, 3:00 PM', event: 'Rehearsal Scheduled' }],
        priority: 'High',
        tags: ['Sales', 'Demo'],
        estimatedTime: '1.5h'
    }
];

export default function MyTasksPage() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Toggle Completion Logic
    const toggleCompletion = (id: number) => {
        setTasks(prevTasks => prevTasks.map(t => {
            if (t.id === id) {
                const newCompleted = !t.completed;
                return {
                    ...t,
                    completed: newCompleted,
                    status: newCompleted ? 'Completed' : 'In Progress'
                };
            }
            return t;
        }));
    };

    // Sorting Logic
    const toggleSort = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    // Filter & Sort
    const filteredTasks = tasks.filter(t => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = t.title.toLowerCase().includes(searchLower) ||
            t.assignedBy.toLowerCase().includes(searchLower) ||
            t.description.toLowerCase().includes(searchLower) ||
            t.dept.toLowerCase().includes(searchLower) ||
            t.tags.some(tag => tag.toLowerCase().includes(searchLower));
        const matchesTab = activeTab === 'active' ? !t.completed : t.completed;
        return matchesSearch && matchesTab;
    }).sort((a, b) => {
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

    // Reset to page 1 on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeTab]);

    // Ensure we are on a valid page if items disappear (e.g. completion)
    useEffect(() => {
        if (currentPage !== safePage) {
            setCurrentPage(safePage);
        }
    }, [safePage, currentPage]);

    const paginatedTasks = filteredTasks.slice(
        (safePage - 1) * itemsPerPage,
        safePage * itemsPerPage
    );

    const handlePageChange = (direction: 'next' | 'prev') => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(curr => curr + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(curr => curr - 1);
        }
    };

    // Derived Calculations
    const activeCount = tasks.filter(t => !t.completed).length;
    const completedCount = tasks.filter(t => t.completed).length;

    // Navigation in Modal
    const handleNavigateTask = (direction: 'next' | 'prev') => {
        if (!selectedTask) return;
        const currentIndex = filteredTasks.findIndex(t => t.id === selectedTask.id);
        if (currentIndex === -1) return;

        let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

        // Loop functionality
        if (newIndex >= filteredTasks.length) newIndex = 0;
        if (newIndex < 0) newIndex = filteredTasks.length - 1;

        setSelectedTask(filteredTasks[newIndex]);
    };

    return (
        <div className="p-8 text-white min-h-screen relative">
            <Link href="/dashboard/tasks" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors font-medium">
                <ArrowLeft size={20} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-black mb-8">My <span className="text-emerald-400">Assignments</span></h1>

            {/* --- TASK DETAILS MODAL --- */}
            <AnimatePresence>
                {selectedTask && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                            onClick={() => setSelectedTask(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 40 }}
                            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/50 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-slate-800 bg-slate-900/95 sticky top-0 z-10 flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase border ${selectedTask.status === 'Completed'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : selectedTask.status === 'In Progress'
                                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                            }`}>
                                            {selectedTask.status}
                                        </span>
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 ${selectedTask.priority === 'High'
                                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                            : selectedTask.priority === 'Medium'
                                                ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            }`}>
                                            <Flag size={12} fill="currentColor" /> {selectedTask.priority} Priority
                                        </span>
                                        <span className="text-slate-500 text-xs font-mono ml-auto md:ml-0 bg-slate-800/50 px-2 py-1 rounded">ID: #{selectedTask.id}</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-2 tracking-tight">{selectedTask.title}</h2>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    {/* Navigation */}
                                    <div className="flex items-center bg-slate-800/80 rounded-xl p-1.5 border border-slate-700">
                                        <button
                                            onClick={() => handleNavigateTask('prev')}
                                            className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                                            title="Previous Task"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <div className="w-px h-5 bg-slate-700 mx-1"></div>
                                        <button
                                            onClick={() => handleNavigateTask('next')}
                                            className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                                            title="Next Task"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setSelectedTask(null)}
                                        className="p-3 bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white border border-slate-700"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <div className="flex flex-col lg:flex-row h-full">
                                    {/* LEFT COLUMN: Main Content */}
                                    <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-10">

                                        {/* Description Section */}
                                        <section>
                                            <div className="flex items-center gap-2 mb-4 text-slate-400">
                                                <ListTodo size={20} className="text-emerald-400" />
                                                <h3 className="text-sm font-bold uppercase tracking-wider">Mission Statement</h3>
                                            </div>
                                            <div className="bg-slate-800/20 p-6 rounded-2xl border border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                                <p className="text-lg text-slate-300 leading-relaxed font-light">
                                                    {selectedTask.description}
                                                </p>
                                            </div>
                                        </section>

                                        {/* Timeline Section */}
                                        <section>
                                            <div className="flex items-center gap-2 mb-6 text-slate-400">
                                                <Clock size={20} className="text-cyan-400" />
                                                <h3 className="text-sm font-bold uppercase tracking-wider">Execution Timeline</h3>
                                            </div>
                                            <div className="relative pl-4 ml-3 space-y-8">
                                                {/* Connecting Line */}
                                                <div className="absolute top-2 bottom-6 left-3 w-0.5 bg-gradient-to-b from-slate-700 to-transparent"></div>

                                                {selectedTask.timeline.map((event, idx) => (
                                                    <div key={idx} className="relative pl-8 group">
                                                        {/* Node */}
                                                        <div className="absolute left-[3px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500 z-10 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>

                                                        {/* Card */}
                                                        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/50 hover:border-slate-700/80 transition-all hover:bg-slate-800/60">
                                                            <p className="font-bold text-slate-200 mb-1">{event.event}</p>
                                                            <p className="text-xs text-slate-500 font-mono">{event.date}</p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* New Entry Input */}
                                                <div className="relative pl-8 pt-2">
                                                    <div className="absolute left-[5px] top-6 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600 z-10"></div>
                                                    <div className="bg-slate-900/50 p-2 rounded-xl border border-slate-800 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/50 transition-all flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Log a new activity..."
                                                            className="flex-1 bg-transparent border-none px-3 py-2 text-sm text-white focus:outline-none placeholder:text-slate-600"
                                                        />
                                                        <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-emerald-400 transition-colors">
                                                            <ArrowUp size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    {/* RIGHT COLUMN: Metadata */}
                                    <div className="w-full lg:w-80 bg-slate-950/30 p-8 space-y-8">

                                        {/* Meta Grid */}
                                        <div className="space-y-6">
                                            <div className="group">
                                                <div className="flex items-center gap-2 text-slate-500 mb-1.5 text-xs font-bold uppercase tracking-wider">
                                                    <Briefcase size={14} /> Department
                                                </div>
                                                <div className="text-white font-medium pl-6 relative">
                                                    <span className={`absolute left-0 top-2 w-2 h-2 rounded-full ${selectedTask.dept === 'Engineering' ? 'bg-violet-500' : selectedTask.dept === 'Sales Dept' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                                                    <span className="ml-2">{selectedTask.dept}</span>
                                                </div>
                                            </div>

                                            <div className="group">
                                                <div className="flex items-center gap-2 text-slate-500 mb-1.5 text-xs font-bold uppercase tracking-wider">
                                                    <User size={14} /> Assigned By
                                                </div>
                                                <div className="flex items-center gap-3 pl-1">
                                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">
                                                        {selectedTask.assignedBy.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="text-white font-medium">{selectedTask.assignedBy}</span>
                                                </div>
                                            </div>

                                            <div className="group">
                                                <div className="flex items-center gap-2 text-slate-500 mb-1.5 text-xs font-bold uppercase tracking-wider">
                                                    <CalendarDays size={14} /> Due Date
                                                </div>
                                                <div className={`text-white font-medium pl-6 text-lg ${selectedTask.dueDate === 'Today' || selectedTask.dueDate === 'Tomorrow' ? 'text-rose-400' : ''}`}>
                                                    {selectedTask.dueDate}
                                                </div>
                                            </div>

                                            <div className="group">
                                                <div className="flex items-center gap-2 text-slate-500 mb-1.5 text-xs font-bold uppercase tracking-wider">
                                                    <Timer size={14} /> Est. Time
                                                </div>
                                                <div className="text-white font-medium pl-6 text-lg font-mono">
                                                    {selectedTask.estimatedTime}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full h-px bg-slate-800"></div>

                                        {/* Tags Section */}
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-500 mb-4 text-xs font-bold uppercase tracking-wider">
                                                <Tag size={14} /> Related Tags
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedTask.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-700 cursor-default">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                <button className="px-2 py-1 rounded-md border border-dashed border-slate-700 text-slate-500 hover:text-emerald-400 hover:border-emerald-500/50 text-xs transition-colors">
                                                    + Add
                                                </button>
                                            </div>
                                        </div>

                                        {/* Attachments Placeholder */}
                                        <div>
                                            <div className="flex items-center gap-2 text-slate-500 mb-3 text-xs font-bold uppercase tracking-wider">
                                                <Paperclip size={14} /> Attachments
                                            </div>
                                            <div className="space-y-2">
                                                <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center justify-between group hover:border-slate-700 cursor-pointer transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold text-blue-400">DOC</div>
                                                        <div>
                                                            <p className="text-xs font-medium text-slate-300 group-hover:text-white">Spec_Sheet.pdf</p>
                                                            <p className="text-[10px] text-slate-600">2.4 MB</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur flex justify-between items-center z-10">
                                <button className="text-slate-500 hover:text-rose-400 text-sm font-medium flex items-center gap-2 transition-colors">
                                    <AlertCircle size={16} /> Report Issue
                                </button>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => toggleCompletion(selectedTask.id)}
                                        className={`px-6 py-2.5 rounded-xl border font-bold transition-all flex items-center gap-2 ${selectedTask.completed
                                            ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                                            : 'border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white'
                                            }`}
                                    >
                                        {selectedTask.completed ? (
                                            <> <CheckCircle2 size={18} /> Completed </>
                                        ) : (
                                            <> <div className="w-4 h-4 rounded-full border-2 border-current"></div> Mark Complete </>
                                        )}
                                    </button>
                                    <button className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-lg hover:shadow-violet-500/25 flex items-center gap-2">
                                        Edit Task
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md flex flex-col min-h-[600px] mb-8">

                {/* Header & Tabs */}
                <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Tabs */}
                    <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'active' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <ListTodo size={16} /> Active <span className="bg-slate-700 text-white px-1.5 py-0.5 rounded text-[10px]">{activeCount}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Archive size={16} /> Completed <span className="bg-slate-700 text-white px-1.5 py-0.5 rounded text-[10px]">{completedCount}</span>
                        </button>
                    </div>

                    {/* Search & Sort */}
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-64 bg-slate-950 border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:border-emerald-500 focus:outline-none transition-colors text-slate-300"
                                placeholder="Search tasks..."
                            />
                        </div>
                        {/* Sort Button with Arrows */}
                        <button
                            onClick={toggleSort}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 hover:bg-slate-800 hover:text-white text-slate-400 transition-colors flex items-center justify-center gap-1 min-w-[44px]"
                            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                        >
                            {sortOrder === 'asc' ? <ArrowDown size={18} /> : <ArrowUp size={18} />}
                        </button>
                    </div>
                </div>

                {/* Task List */}
                <div className="divide-y divide-slate-800/50 flex-1 overflow-y-auto">
                    <AnimatePresence mode="popLayout">
                        {paginatedTasks.length > 0 ? (
                            paginatedTasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onClick={() => setSelectedTask(task)}
                                    className={`p-5 hover:bg-slate-800/40 transition-colors flex flex-col md:flex-row md:items-center justify-between group gap-4 cursor-pointer ${task.completed ? 'bg-slate-900/30' : ''}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleCompletion(task.id); }}
                                            className={`mt-1 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center shrink-0 ${task.completed
                                                ? 'bg-emerald-500 border-emerald-500 text-white scale-110'
                                                : 'border-slate-600 hover:border-emerald-500 hover:bg-emerald-500/20 text-transparent hover:text-emerald-500'
                                                }`}
                                        >
                                            <Check size={14} strokeWidth={3} />
                                        </button>
                                        <div>
                                            <h3 className={`font-bold text-lg transition-all ${task.completed ? 'text-slate-600 line-through' : 'text-slate-200 group-hover:text-white'}`}>
                                                {task.title}
                                            </h3>
                                            <p className={`text-sm mt-1 mb-2 ${task.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                                                {task.description}
                                            </p>
                                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${task.dept === 'Engineering' ? 'bg-violet-500' : task.dept === 'Sales Dept' ? 'bg-blue-500' : 'bg-amber-500'}`}></span> {task.dept}
                                                <span className="text-slate-700">•</span>
                                                <span className="text-slate-400">Assigned by: {task.assignedBy}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 md:gap-8 pl-10 md:pl-0">
                                        <div className="text-left md:text-right">
                                            <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider">Due Date</span>
                                            <div className={`flex items-center gap-1.5 text-sm font-medium ${!task.completed && (task.dueDate.includes('Today') || task.dueDate.includes('Yesterday')) ? 'text-rose-400' : 'text-slate-400'}`}>
                                                <Calendar size={14} /> {task.dueDate}
                                            </div>
                                        </div>

                                        <div className="text-center min-w-[100px]">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${task.completed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                task.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                                }`}>
                                                {task.status}
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedTask(task); }}
                                            className="p-2 hover:bg-slate-700 rounded-lg text-slate-500 hover:text-white transition-colors"
                                        >
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-12 text-center flex flex-col items-center justify-center text-slate-500 h-full">
                                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-600">
                                    {activeTab === 'active' ? <CheckCircle2 size={32} /> : <Archive size={32} />}

                                </div>
                                <h3 className="text-lg font-bold text-slate-400">No {activeTab} tasks found</h3>
                                <p className="text-sm text-slate-600 mt-2">
                                    {activeTab === 'active' ? "You're all caught up! Great job." : "No archives yet."}
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination Footer */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center text-sm font-medium text-slate-400">
                        <span>Showing <span className="text-cyan-400">{(safePage - 1) * itemsPerPage + 1}</span> to <span className="text-cyan-400">{Math.min(safePage * itemsPerPage, filteredTasks.length)}</span> of <span className="text-cyan-400">{filteredTasks.length}</span></span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange('prev')}
                                disabled={safePage === 1}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="text-white">Page {safePage} of {totalPages}</span>
                            <button
                                onClick={() => handlePageChange('next')}
                                disabled={safePage === totalPages}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
