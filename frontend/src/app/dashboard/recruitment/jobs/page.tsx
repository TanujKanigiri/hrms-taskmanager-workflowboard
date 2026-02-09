'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    MapPin,
    DollarSign,
    Users,
    MoreHorizontal,
    Plus,
    Briefcase,
    X,
    Laptop,
    Clock,
    Check,
    Globe,
    Zap,
    LayoutGrid,
    List
} from 'lucide-react';

export default function JobPostingsPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Draft' | 'Closed'>('All');

    const jobs = [
        { id: 101, title: 'Senior Full Stack Engineer', dept: 'Engineering', location: 'Remote (US)', type: 'Full-time', salary: '$140k - $180k', applicants: 45, status: 'Active', posted: '2 days ago', skills: ['React', 'Node.js', 'AWS'], color: 'from-violet-500 to-fuchsia-500' },
        { id: 102, title: 'Product Marketing Manager', dept: 'Marketing', location: 'New York, NY', type: 'Full-time', salary: '$110k - $135k', applicants: 12, status: 'Draft', posted: 'Edited 1h ago', skills: ['Strategy', 'Copywriting'], color: 'from-pink-500 to-rose-500' },
        { id: 103, title: 'UX Researcher', dept: 'Design', location: 'London, UK', type: 'Contract', salary: '£60k - £75k', applicants: 89, status: 'Closed', posted: '1 month ago', skills: ['Figma', 'User Testing'], color: 'from-amber-500 to-orange-500' },
        { id: 104, title: 'DevOps Specialist', dept: 'Engineering', location: 'Remote (EU)', type: 'Full-time', salary: '€70k - €95k', applicants: 23, status: 'Active', posted: '5 days ago', skills: ['Kubernetes', 'Docker'], color: 'from-emerald-500 to-teal-500' },
        { id: 105, title: 'Sales Development Rep', dept: 'Sales', location: 'Austin, TX', type: 'Full-time', salary: '$50k - $70k', applicants: 105, status: 'Active', posted: '3 days ago', skills: ['CRM', 'Cold Calling'], color: 'from-blue-500 to-cyan-500' },
    ];

    // Wizard State
    const [currentStep, setCurrentStep] = useState(1);
    const [jobsList, setJobsList] = useState(jobs); // promoting to state
    const [newJobData, setNewJobData] = useState({
        title: '',
        dept: 'Engineering',
        location: '',
        type: 'Full-time',
        salary: '',
        description: '',
        skills: ''
    });

    // Application State
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [applicationData, setApplicationData] = useState({ name: '', email: '', experience: '', cv: null });

    const handleApplyClick = (job: any) => {
        setSelectedJob(job);
        setShowApplyModal(true);
    };

    const handleApplicationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        const updatedJobs = jobsList.map(job => {
            if (job.id === selectedJob.id) {
                return { ...job, applicants: job.applicants + 1 };
            }
            return job;
        });
        setJobsList(updatedJobs);
        setShowApplyModal(false);
        setApplicationData({ name: '', email: '', experience: '', cv: null });
        alert(`Application sent for ${selectedJob.title}! Good luck.`);
    };

    const handleJobSubmit = () => {
        const newJob = {
            id: jobsList.length + 100,
            title: newJobData.title || 'Untitled Role',
            dept: newJobData.dept,
            location: newJobData.location || 'Remote',
            type: newJobData.type,
            salary: newJobData.salary || '$TBD',
            applicants: 0,
            status: 'Active',
            posted: 'Just now',
            skills: newJobData.skills.split(',').map(s => s.trim()).filter(s => s) || ['General'],
            color: 'from-violet-500 to-fuchsia-500' // Default color
        };
        // In a real app, this would be an API call
        // @ts-ignore
        setJobsList([newJob, ...jobsList]); // simplified for demo
        setShowCreateModal(false);
        // Reset form
        setCurrentStep(1);
        setNewJobData({ title: '', dept: 'Engineering', location: '', type: 'Full-time', salary: '', description: '', skills: '' });
        alert("Job Posted Successfully!");
    };

    const filteredJobsList = filterStatus === 'All' ? jobsList : jobsList.filter(j => j.status === filterStatus);

    // ... (keep render logic same until modal) ... 

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* ... (Hero and Filters - keep same) ... */}

            {/* Hero Header with Glassmorphism */}
            <div className="relative bg-[#0f172a] rounded-[2.5rem] p-10 overflow-hidden shadow-2xl">
                {/* Decorative background blurs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-600/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-1">
                                <Globe size={12} /> Global Hiring
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                            Talent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Marketplace</span>
                        </h1>
                        <p className="text-slate-400 font-medium text-lg max-w-xl">
                            Attract the world's best talent. Manage your active listings and track applicant influx in real-time.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/20 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                                <LayoutGrid size={20} />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/20 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                                <List size={20} />
                            </button>
                        </div>
                        <button onClick={() => setShowCreateModal(true)} className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95">
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> Post New Job
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center sticky top-4 z-40">
                <div className="relative flex-1 w-full group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
                        <div className="pl-4 text-slate-400">
                            <Search size={22} />
                        </div>
                        <input
                            type="text"
                            placeholder="Find your next role title..."
                            className="w-full pl-3 pr-4 py-4 bg-transparent border-none text-slate-700 font-bold placeholder:font-medium placeholder:text-slate-400 focus:ring-0"
                        />
                    </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {['All', 'Active', 'Draft', 'Closed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as any)}
                            className={`px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border shadow-sm active:scale-95
                                ${filterStatus === status
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Jobs Grid (Cards) - UPDATED LIST SOURCE */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredJobsList.map((job) => (
                        <div key={job.id} className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-1">
                            {/* Colorful Header Strip */}
                            <div className={`h-24 bg-gradient-to-r ${job.color} p-6 relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 p-6 opacity-20 text-white transform rotate-12 scale-150">
                                    <Briefcase size={80} />
                                </div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-black/20 text-white backdrop-blur-md`}>
                                        {job.type}
                                    </span>
                                    <button className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-md transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Logo & Content */}
                            <div className="px-6 pb-6 pt-0 relative">
                                <div className="absolute -top-8 left-6 w-16 h-16 rounded-2xl bg-white p-1 shadow-lg flex items-center justify-center">
                                    <div className="w-full h-full rounded-xl bg-slate-50 flex items-center justify-center text-2xl font-black text-slate-800">
                                        {job.title.charAt(0)}
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                                        {job.dept} <span className="w-1 h-1 rounded-full bg-slate-300"></span> {job.location}
                                    </p>

                                    {/* Stats Strip */}
                                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 mb-6">
                                        <div className="flex-1 border-r border-slate-200">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Salary</p>
                                            <p className="text-sm font-bold text-slate-800">{job.salary}</p>
                                        </div>
                                        <div className="flex-1 pl-3">
                                            <p className="text-xs font-bold text-slate-400 uppercase">Applicants</p>
                                            <p className="text-sm font-bold text-slate-800 flex items-center gap-1">
                                                <Users size={14} className="text-indigo-500" /> {job.applicants}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between gap-3">
                                        <button
                                            onClick={() => handleApplyClick(job)}
                                            className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <Zap size={14} className="text-yellow-400" /> Easy Apply
                                        </button>
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" title="Recent Applicant"></div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                +{job.applicants > 3 ? job.applicants - 3 : 0}
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${job.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : job.status === 'Draft' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* List View - UPDATED LIST SOURCE */}
            {viewMode === 'list' && (
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    {filteredJobsList.map((job) => (
                        <div key={job.id} className="group flex flex-col md:flex-row items-center p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-none gap-6">
                            <div className="flex items-center gap-4 flex-1 w-full">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${job.color} text-white flex items-center justify-center text-xl font-bold`}>
                                    {job.title.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                                    <div className="flex items-center gap-3 text-sm text-slate-500 font-medium mt-1">
                                        <span className="flex items-center gap-1"><Briefcase size={14} /> {job.dept}</span>
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full md:w-auto gap-8">
                                <div className="min-w-[120px]">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Applications</p>
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-indigo-500" />
                                        <span className="font-bold text-slate-700">{job.applicants}</span>
                                    </div>
                                </div>
                                <div className="min-w-[140px]">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Salary Range</p>
                                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-sm">{job.salary}</span>
                                </div>
                                <div className="min-w-[100px] text-right">
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${job.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                        {job.status}
                                    </span>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                                <button
                                    onClick={() => handleApplyClick(job)}
                                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {/* Create Job Modal - WIZARD IMPLEMENTATION */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto flex flex-col">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Post a New Role</h2>
                                <p className="text-slate-500 text-sm font-bold">Step {currentStep} of 2</p>
                            </div>
                            <button onClick={() => setShowCreateModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-slate-100 rounded-full mb-8 overflow-hidden">
                            <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${(currentStep / 2) * 100}%` }}></div>
                        </div>

                        {/* STEP 1: Basic Info */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Job Title</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Senior Frontend Engineer"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-indigo-400 outline-none"
                                        value={newJobData.title}
                                        onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Department</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-indigo-400 outline-none"
                                            value={newJobData.dept}
                                            onChange={(e) => setNewJobData({ ...newJobData, dept: e.target.value })}
                                        >
                                            <option>Engineering</option>
                                            <option>Marketing</option>
                                            <option>Design</option>
                                            <option>Sales</option>
                                            <option>HR</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Location</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Remote, NY"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-indigo-400 outline-none"
                                            value={newJobData.location}
                                            onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Salary Range</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. $120k - $160k"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-indigo-400 outline-none"
                                        value={newJobData.salary}
                                        onChange={(e) => setNewJobData({ ...newJobData, salary: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Description & Skills */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Job Description</label>
                                    <textarea
                                        className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                                        placeholder="Describe the role responsibilities..."
                                        value={newJobData.description}
                                        onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Required Skills (Comma separated)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. React, Node.js, AWS"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-indigo-400 outline-none"
                                        value={newJobData.skills}
                                        onChange={(e) => setNewJobData({ ...newJobData, skills: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Footer Controls */}
                        <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100">
                            {currentStep > 1 && (
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                                >
                                    Back
                                </button>
                            )}
                            {currentStep < 2 ? (
                                <button
                                    onClick={() => setCurrentStep(2)}
                                    className="ml-auto px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    onClick={handleJobSubmit}
                                    className="ml-auto px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
                                >
                                    <Zap size={18} /> Publish Job
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Application Modal */}
            {
                showApplyModal && selectedJob && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowApplyModal(false)}></div>
                        <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Apply for Role</h2>
                                    <p className="text-slate-500 font-medium">{selectedJob.title} <span className="text-slate-300 mx-2">•</span> {selectedJob.location}</p>
                                </div>
                                <button onClick={() => setShowApplyModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>

                            <form onSubmit={handleApplicationSubmit} className="space-y-5">
                                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-3">
                                    <div className="p-2 bg-white rounded-xl text-indigo-600 shadow-sm">
                                        <Briefcase size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-indigo-900 text-sm">Great Choice!</h4>
                                        <p className="text-xs text-indigo-700 font-medium mt-1">This role matches 85% of candidates with your profile.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-indigo-400 outline-none"
                                            placeholder="John Doe"
                                            value={applicationData.name}
                                            onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-indigo-400 outline-none"
                                            placeholder="john@example.com"
                                            value={applicationData.email}
                                            onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Years of Experience</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-indigo-400 outline-none"
                                        value={applicationData.experience}
                                        onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
                                    >
                                        <option value="">Select Experience</option>
                                        <option value="0-2">0-2 Years</option>
                                        <option value="3-5">3-5 Years</option>
                                        <option value="5-10">5-10 Years</option>
                                        <option value="10+">10+ Years</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Resume / CV</label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Laptop size={20} className="text-slate-400" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-700">Click to upload or drag and drop</p>
                                        <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 10MB</p>
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                    Submit Application <Check size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
