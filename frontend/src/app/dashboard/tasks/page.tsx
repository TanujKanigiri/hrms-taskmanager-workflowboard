"use client";

import React, { useState } from 'react';
import {
    Layout,
    CheckCircle2,
    Clock,
    AlertCircle,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Calendar,
    ArrowUpRight,
    Users,
    ChevronDown,
    X,
    FilterX,
    BarChart3,
    Zap,
    RefreshCw,
    Check,
    MessageSquare,
    Paperclip
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data Types
type TaskStatus = 'In Progress' | 'Completed' | 'Pending' | 'Overdue';

interface Task {
    id: number;
    title: string;
    project: string;
    dueDate: string;
    assignees: string[];
    assigneeNames: string[]; // For detailed view
    status: TaskStatus;
    description: string;
    timeline: { date: string; event: string }[];
}

const initialTasks: Task[] = [
    {
        id: 1,
        title: 'Check Emails',
        project: 'Daily Ops',
        dueDate: 'Today',
        assignees: ['JD'],
        assigneeNames: ['John Doe'],
        status: 'Completed',
        description: 'Review and respond to all pending client emails from the weekend. Prioritize urgent tickets.',
        timeline: [
            { date: 'Today, 9:00 AM', event: 'Task Started by John Doe' },
            { date: 'Today, 10:30 AM', event: 'Marked as Completed' }
        ]
    },
    {
        id: 2,
        title: 'Implement Dark Mode Switch',
        project: 'Frontend Revamp',
        dueDate: 'Tomorrow',
        assignees: ['JD', 'AL'],
        assigneeNames: ['John Doe', 'Alice Lee'],
        status: 'In Progress',
        description: 'Create a global theme context and implement the toggle switch in the sidebar. Ensure persistence via local storage.',
        timeline: [
            { date: 'Yesterday, 2:00 PM', event: 'Task Created' },
            { date: 'Today, 11:00 AM', event: 'Assigned to Alice Lee' }
        ]
    },
    {
        id: 3,
        title: 'Update API Docs',
        project: 'Backend',
        dueDate: 'Next Week',
        assignees: ['MR'],
        assigneeNames: ['Mike Ross'],
        status: 'Pending',
        description: 'Document the new authentication endpoints including request/response examples.',
        timeline: [
            { date: 'Jan 15, 4:00 PM', event: 'Task Created' }
        ]
    },
    {
        id: 4,
        title: 'Fix Login Bug',
        project: 'Deepmind Auth',
        dueDate: 'Yesterday',
        assignees: ['JD'],
        assigneeNames: ['John Doe'],
        status: 'Overdue',
        description: 'Investigate the 500 error occurring on the login page for legacy users.',
        timeline: [
            { date: 'Jan 18, 9:00 AM', event: 'Issue Reported' },
            { date: 'Jan 19, 10:00 AM', event: 'Assigned to John Doe' }
        ]
    },
    {
        id: 5,
        title: 'Client Meeting Prep',
        project: 'Sales',
        dueDate: 'Today',
        assignees: ['AL'],
        assigneeNames: ['Alice Lee'],
        status: 'In Progress',
        description: 'Prepare the slide deck for the Q1 review meeting with Key Clients.',
        timeline: [
            { date: 'Today, 8:00 AM', event: 'Task Started' }
        ]
    },
];

// Initial Capacity Data (Same as before)
const initialDepartments = [
    { name: 'Product Design', load: 85, color: 'bg-rose-500', status: 'Heavy Load' },
    { name: 'Backend', load: 45, color: 'bg-emerald-500', status: 'Optimal' },
    { name: 'Frontend', load: 60, color: 'bg-cyan-500', status: 'Healthy' },
    { name: 'QA', load: 30, color: 'bg-blue-500', status: 'Underutilized' },
];

const initialUsers = [
    { name: 'John Doe', role: 'Senior Dev', tasks: 12, avatar: 'JD', status: 'Critical' },
    { name: 'Alice Lee', role: 'Designer', tasks: 5, avatar: 'AL', status: 'Good' },
    { name: 'Mike Ross', role: 'Backend Dev', tasks: 3, avatar: 'MR', status: 'Available' },
    { name: 'Sarah Smith', role: 'QA Lead', tasks: 8, avatar: 'SS', status: 'Busy' },
    { name: 'Tom Hardy', role: 'Manager', tasks: 15, avatar: 'TH', status: 'Overloaded' },
];

export default function TaskOverviewPage() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [filterStatus, setFilterStatus] = useState<string | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Resource Planning State
    const [showResourceModal, setShowResourceModal] = useState(false);
    const [departments, setDepartments] = useState(initialDepartments);
    const [users, setUsers] = useState(initialUsers);
    const [isRebalancing, setIsRebalancing] = useState(false);
    const [rebalanceComplete, setRebalanceComplete] = useState(false);

    // Selected Task State
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Calculate KPIs
    const totalTasks = tasks.length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const overdue = tasks.filter(t => t.status === 'Overdue').length;

    // Filter Logic
    const filteredTasks = tasks.filter(t => {
        const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.project.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Rebalance Logic (Same as before)
    const handleRebalance = () => {
        setIsRebalancing(true);
        setRebalanceComplete(false);
        setTimeout(() => {
            const balancedDepartments = [
                { name: 'Product Design', load: 70, color: 'bg-emerald-500', status: 'Healthy' },
                { name: 'Backend', load: 55, color: 'bg-cyan-500', status: 'Good' },
                { name: 'Frontend', load: 60, color: 'bg-cyan-500', status: 'Healthy' },
                { name: 'QA', load: 50, color: 'bg-emerald-500', status: 'Optimal' },
            ];
            const balancedUsers = [
                { name: 'John Doe', role: 'Senior Dev', tasks: 8, avatar: 'JD', status: 'Busy' },
                { name: 'Alice Lee', role: 'Designer', tasks: 7, avatar: 'AL', status: 'Busy' },
                { name: 'Mike Ross', role: 'Backend Dev', tasks: 6, avatar: 'MR', status: 'Good' },
                { name: 'Sarah Smith', role: 'QA Lead', tasks: 8, avatar: 'SS', status: 'Busy' },
                { name: 'Tom Hardy', role: 'Manager', tasks: 10, avatar: 'TH', status: 'Busy' },
            ];
            setDepartments(balancedDepartments);
            setUsers(balancedUsers);
            setIsRebalancing(false);
            setRebalanceComplete(true);
            setTimeout(() => setRebalanceComplete(false), 3000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8 space-y-8 relative">

            {/* --- TASK DETAILS MODAL --- */}
            <AnimatePresence>
                {selectedTask && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                            onClick={() => setSelectedTask(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                        >
                            {/* Header */}
                            <div className="p-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${selectedTask.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        selectedTask.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        }`}>
                                        {selectedTask.status}
                                    </span>
                                    <button
                                        onClick={() => setSelectedTask(null)}
                                        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <h2 className="text-2xl font-black text-white leading-tight mb-2">{selectedTask.title}</h2>
                                <div className="flex items-center gap-4 text-sm text-slate-400">
                                    <span>Project: <strong className="text-slate-300">{selectedTask.project}</strong></span>
                                    <span>•</span>
                                    <span className={selectedTask.dueDate === 'Today' || selectedTask.dueDate === 'Yesterday' ? 'text-rose-400 font-bold' : ''}>
                                        Due: {selectedTask.dueDate}
                                    </span>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Description</h3>
                                    <p className="text-slate-300 leading-relaxed bg-slate-800/30 p-4 rounded-xl border border-slate-800/50">
                                        {selectedTask.description}
                                    </p>
                                </div>

                                {/* Assignees */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Assigned To</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedTask.assigneeNames.map((name, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-2 pr-4 bg-slate-800 rounded-full border border-slate-700">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                                    {selectedTask.assignees[idx]}
                                                </div>
                                                <span className="text-sm font-bold text-slate-200">{name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Activity Timeline</h3>
                                    <div className="space-y-6 relative pl-4 border-l-2 border-slate-800 ml-2">
                                        {selectedTask.timeline.map((event, idx) => (
                                            <div key={idx} className="relative pl-6">
                                                <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-900 border-2 border-cyan-500"></div>
                                                <p className="text-sm font-bold text-white mb-1">{event.event}</p>
                                                <p className="text-xs text-slate-500 font-medium">{event.date}</p>
                                            </div>
                                        ))}
                                        {/* Add Comment Box Placeholder */}
                                        <div className="relative pl-6 pt-4">
                                            <div className="absolute -left-[21px] top-5 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600"></div>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Add a comment..."
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                                />
                                                <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-cyan-400 transition-colors">
                                                    <Paperclip size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3 sticky bottom-0">
                                <button className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold transition-all">
                                    Mark Complete
                                </button>
                                <button className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-lg hover:shadow-cyan-500/25">
                                    Edit Task
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- RESOURCE PLANNING MODAL (Copy from previous step) --- */}
            <AnimatePresence>
                {showResourceModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                            onClick={() => setShowResourceModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 relative overflow-hidden">
                                <Users className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10 scale-[5]" />
                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <h2 className="text-3xl font-black text-white mb-2">Resource Planning</h2>
                                        <p className="text-indigo-200 font-medium">Real-time team capacity and allocation visualization.</p>
                                    </div>
                                    <button
                                        onClick={() => setShowResourceModal(false)}
                                        className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all text-white"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left: Department Load */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <BarChart3 className="text-violet-400" /> Department Load
                                    </h3>
                                    <div className="space-y-6">
                                        {departments.map((dept, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-slate-300">{dept.name}</span>
                                                    <motion.span
                                                        layout
                                                        key={`status-${dept.name}`}
                                                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${dept.load > 80 ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}
                                                    >
                                                        {dept.status} ({dept.load}%)
                                                    </motion.span>
                                                </div>
                                                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{
                                                            width: `${dept.load}%`,
                                                            backgroundColor: dept.load > 80 ? '#F43F5E' : dept.load > 60 ? '#06B6D4' : '#10B981'
                                                        }}
                                                        transition={{ duration: 1, type: "spring" }}
                                                        className={`h-full rounded-full`}
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Individual Capacity */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                        <Zap className="text-amber-400" /> Individual Capacity
                                    </h3>
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                        <AnimatePresence mode="popLayout">
                                            {users.map((user, idx) => (
                                                <motion.div
                                                    layout
                                                    key={user.name}
                                                    className="flex items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-black text-slate-300 border border-slate-600 mr-3">
                                                        {user.avatar}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-slate-200 text-sm">{user.name}</h4>
                                                        <p className="text-xs text-slate-500">{user.role}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <motion.span
                                                            key={`tasks-${user.tasks}`}
                                                            initial={{ scale: 1.5, color: '#fff' }}
                                                            animate={{ scale: 1, color: '#fff' }}
                                                            className="block text-xl font-black"
                                                        >
                                                            {user.tasks}
                                                        </motion.span>
                                                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Tasks</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-medium">
                                    {isRebalancing ? "Analysing optimal distribution..." : "AI-powered workload distribution enabled."}
                                </span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowResourceModal(false)}
                                        className="px-6 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white font-bold transition-all"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={handleRebalance}
                                        disabled={isRebalancing || rebalanceComplete}
                                        className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${rebalanceComplete ? 'bg-emerald-500 text-white shadow-emerald-900/40' : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/40'} disabled:opacity-80 disabled:cursor-not-allowed`}
                                    >
                                        {isRebalancing ? (
                                            <>
                                                <RefreshCw className="animate-spin" size={18} /> Optimizing...
                                            </>
                                        ) : rebalanceComplete ? (
                                            <>
                                                <Check size={18} /> Workload Balanced
                                            </>
                                        ) : (
                                            'Rebalance Workload'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white mb-2">
                        Task <span className="text-cyan-400">Command Center</span>
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Manage assignments, track progress, and collaborate in real-time.
                    </p>
                </div>

                <div className="flex gap-3 relative items-center">
                    <div className="relative hidden md:block group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="Search tasks..."
                            className="bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all w-64"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className={`px-5 py-2.5 rounded-xl border font-medium transition-all flex items-center gap-2 ${filterStatus !== 'All' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'}`}
                    >
                        <Filter size={18} /> {filterStatus === 'All' ? 'Filter' : filterStatus}
                    </button>

                    {/* Filter Dropdown */}
                    <AnimatePresence>
                        {showFilterMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute top-14 right-48 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden"
                            >
                                <div className="p-1">
                                    {['All', 'In Progress', 'Completed', 'Pending', 'Overdue'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => { setFilterStatus(status); setShowFilterMenu(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors flex justify-between items-center ${filterStatus === status ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300'}`}
                                        >
                                            {status}
                                            {filterStatus === status && <CheckCircle2 size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Link href="/dashboard/tasks/create" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                        <Plus size={20} /> Create New Task
                    </Link>
                </div>
            </div>

            {/* 2. KPI Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Tasks', value: totalTasks.toString(), change: '+12%', color: 'blue', icon: Layout },
                    { label: 'In Progress', value: inProgress.toString(), change: '+5%', color: 'amber', icon: Clock },
                    { label: 'Completed', value: completed.toString(), change: '+18%', color: 'emerald', icon: CheckCircle2 },
                    { label: 'Overdue', value: overdue.toString(), change: '-2%', color: 'rose', icon: AlertCircle },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900/80 overflow-hidden"
                    >
                        {/* Ambient Glow */}
                        <div className={`absolute -right-10 -top-10 w-32 h-32 bg-${stat.color}-500/10 rounded-full blur-3xl group-hover:bg-${stat.color}-500/20 transition-all duration-500`}></div>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-bold ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'} bg-slate-950/50 px-2 py-1 rounded-lg border border-slate-800`}>
                                {stat.change} <ArrowUpRight size={14} className={stat.change.startsWith('-') ? 'rotate-90' : ''} />
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-4xl font-black text-white mb-1 tracking-tight">{stat.value}</h3>
                            <p className="text-slate-400 font-medium">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 3. Main Content: Recent Tasks & Team Workload */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Tasks List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <CheckCircle2 className="text-cyan-400" /> Recent Assignments
                        </h2>
                        {filterStatus !== 'All' && (
                            <button
                                onClick={() => setFilterStatus('All')}
                                className="text-xs font-bold text-rose-400 flex items-center gap-1 hover:underline"
                            >
                                <FilterX size={12} /> Clear Filter
                            </button>
                        )}
                    </div>

                    <div className="space-y-3 min-h-[300px]">
                        <AnimatePresence mode='popLayout'>
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        onClick={() => setSelectedTask(item)}
                                        className="group flex items-center p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800/80 transition-all cursor-pointer relative overflow-hidden"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors mr-4 shrink-0">
                                            <Layout size={20} />
                                        </div>
                                        <div className="flex-1 mr-4">
                                            <h4 className="font-bold text-white group-hover:text-cyan-200 transition-colors">{item.title}</h4>
                                            <p className="text-sm text-slate-400">Project: <span className="text-slate-300">{item.project}</span> • Due: {item.dueDate}</p>
                                        </div>

                                        {/* Assignees - Visible on Desktop */}
                                        <div className="hidden md:flex items-center gap-2 mr-4">
                                            <div className="flex -space-x-2">
                                                {item.assignees.map((u, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-slate-300" title={item.assigneeNames[i]}>
                                                        {u}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center shrink-0">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                item.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                    item.status === 'Pending' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' :
                                                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-slate-500">
                                    <p>No tasks found for filter "{filterStatus}".</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/dashboard/tasks/my-tasks" className="block w-full py-3 text-center text-sm font-medium text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-700">
                        View All Tasks
                    </Link>
                </div>

                {/* Team Workload / Quick Actions */}
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Users className="text-violet-400" /> Team Workload
                        </h3>

                        <div className="space-y-6">
                            {['Product Design', 'Backend Team', 'Frontend Team'].map((team, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm font-medium mb-2">
                                        <span className="text-slate-300">{team}</span>
                                        <span className={idx === 0 ? 'text-rose-400' : 'text-emerald-400'}>{idx === 0 ? 'Heavy Load' : 'Optimal'}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${idx === 0 ? 'bg-gradient-to-r from-rose-500 to-orange-500 w-[85%]' : 'bg-gradient-to-r from-emerald-500 to-cyan-500 w-[45%]'}`}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800/50">
                            <button
                                onClick={() => setShowResourceModal(true)}
                                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl"
                            >
                                View Resource Planning
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
