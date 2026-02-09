'use client';

import React, { useState } from 'react';
import {
    Search,
    MoreHorizontal,
    Filter,
    MessageSquare,
    Phone,
    Mail,
    Linkedin,
    Trash2,
    Calendar,
    Star,
    CheckCircle2,
    X,
    UserCircle,
    BrainCircuit,
    Plus
} from 'lucide-react';

export default function CandidatesPage() {
    // Kanban Columns
    const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];

    // Mock Candidates Data
    const [candidates, setCandidates] = useState([
        { id: 1, name: 'Alice Walker', role: 'Frontend Engineer', stage: 'Applied', score: 85, avatar: 'AW', time: '2h ago' },
        { id: 2, name: 'David Chen', role: 'Product Manager', stage: 'Screening', score: 92, avatar: 'DC', time: '1d ago' },
        { id: 3, name: 'Sarah Jones', role: 'UX Designer', stage: 'Interview', score: 78, avatar: 'SJ', time: '3d ago' },
        { id: 4, name: 'Mike Ross', role: 'Legal Counsel', stage: 'Applied', score: 65, avatar: 'MR', time: '4h ago' },
        { id: 5, name: 'Jenny Kim', role: 'Frontend Engineer', stage: 'Offer', score: 98, avatar: 'JK', time: '1w ago' },
        { id: 6, name: 'Tom Hardy', role: 'DevOps Engineer', stage: 'Interview', score: 88, avatar: 'TH', time: '2d ago' },
    ]);

    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [roleFilter, setRoleFilter] = useState('All');
    const [stageFilter, setStageFilter] = useState('All');
    const [draggedCandidateId, setDraggedCandidateId] = useState<number | null>(null);

    // Filter Logic
    const availableRoles = ['All', ...Array.from(new Set(candidates.map(c => c.role)))];
    const availableStages = ['All', ...stages];

    const filteredCandidates = candidates.filter(c => {
        const roleMatch = roleFilter === 'All' || c.role === roleFilter;
        const stageMatch = stageFilter === 'All' || c.stage === stageFilter;
        return roleMatch && stageMatch;
    });

    // Add Candidate Logic
    const handleAddCandidate = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newCandidate = {
            id: candidates.length + 1,
            name: formData.get('name') as string || 'New Candidate',
            role: formData.get('role') as string || 'General Applicant',
            stage: 'Applied',
            score: 50, // Default scoring
            avatar: (formData.get('name') as string || 'NC').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
            time: 'Just now'
        };
        setCandidates([newCandidate, ...candidates]);
        setShowAddModal(false);
        alert("Candidate added successfully!");
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
        if (score >= 75) return 'text-violet-600 bg-violet-50 border-violet-200';
        return 'text-amber-600 bg-amber-50 border-amber-200';
    };

    // Actions

    // Drag and Drop Handlers
    const handleDragStart = (e: React.DragEvent, id: number) => {
        setDraggedCandidateId(id);
        e.dataTransfer.effectAllowed = 'move';
        // Optional: Set a custom drag image or styling here if needed
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetStage: string) => {
        e.preventDefault();
        if (draggedCandidateId !== null) {
            setCandidates(candidates.map(c =>
                c.id === draggedCandidateId ? { ...c, stage: targetStage } : c
            ));
            setDraggedCandidateId(null);
        }
    };

    const handleMoveToNext = () => {
        if (!selectedCandidate) return;
        const currentStageIdx = stages.indexOf(selectedCandidate.stage);
        if (currentStageIdx < stages.length - 1) {
            const nextStage = stages[currentStageIdx + 1];
            setCandidates(candidates.map(c =>
                c.id === selectedCandidate.id ? { ...c, stage: nextStage } : c
            ));
            setSelectedCandidate(null);
            alert(`${selectedCandidate.name} moved to ${nextStage}!`);
        }
    };

    const handleReject = () => {
        if (!selectedCandidate) return;
        if (window.confirm(`Are you sure you want to reject ${selectedCandidate.name}?`)) {
            setCandidates(candidates.filter(c => c.id !== selectedCandidate.id));
            setSelectedCandidate(null);
        }
    };

    const handleEmail = (email: string = 'candidate@example.com') => {
        window.location.href = `mailto:${email}`;
    };

    const handleCall = (phone: string = '+1234567890') => {
        window.location.href = `tel:${phone}`;
    };

    const handleSchedule = () => {
        window.open('https://calendar.google.com/calendar/u/0/r/eventedit', '_blank');
    };

    const handleProfile = () => {
        window.open('https://www.linkedin.com', '_blank');
    };

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Candidate <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600">Pipeline</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Drag and drop candidates to move them across stages.</p>
                </div>
                <div className="flex gap-3 relative">
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-xl font-bold transition-all text-sm ${showFilter ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Filter size={16} /> Filters
                    </button>

                    {/* Filter Dropdown */}
                    {showFilter && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-20 animate-in fade-in zoom-in-95 duration-200 text-left">
                            <p className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Role</p>
                            {availableRoles.map(role => (
                                <button
                                    key={role}
                                    onClick={() => { setRoleFilter(role); setShowFilter(false); }}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold flex justify-between items-center ${roleFilter === role ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {role}
                                    {roleFilter === role && <CheckCircle2 size={14} />}
                                </button>
                            ))}


                            <div className="border-t border-slate-100 my-2 mx-2"></div>

                            <p className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Filter by Stage</p>
                            {availableStages.map(stage => (
                                <button
                                    key={stage}
                                    onClick={() => { setStageFilter(stage); setShowFilter(false); }}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold flex justify-between items-center ${stageFilter === stage ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {stage}
                                    {stageFilter === stage && <CheckCircle2 size={14} />}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                    >
                        <Plus size={18} className="mr-1" /> Add Candidate
                    </button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-[1200px] h-full">
                    {stages.map((stage) => {
                        const stageCandidates = filteredCandidates.filter(c => c.stage === stage);
                        const count = stageCandidates.length;

                        return (
                            <div key={stage} className="flex-1 min-w-[280px] flex flex-col h-full">
                                {/* Column Header */}
                                <div className="flex justify-between items-center mb-4 px-2">
                                    <h3 className="font-bold text-slate-700">{stage}</h3>
                                    <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md text-xs font-bold">{count}</span>
                                </div>

                                {/* Drag Area */}
                                <div
                                    className={`flex-1 bg-slate-50/50 rounded-2xl p-3 border border-slate-100 space-y-3 transition-colors ${draggedCandidateId ? 'bg-slate-100/50 border-dashed border-slate-300' : ''}`}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, stage)}
                                >
                                    {stageCandidates.map((c) => (
                                        <div
                                            key={c.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, c.id)}
                                            onClick={() => setSelectedCandidate(c)}
                                            className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-violet-200 cursor-pointer transition-all group relative active:scale-95 active:rotate-1"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm border border-slate-200">
                                                    {c.avatar}
                                                </div>
                                                <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                                            </div>

                                            <h4 className="font-bold text-slate-900 mb-0.5">{c.name}</h4>
                                            <p className="text-xs font-bold text-slate-400 mb-3">{c.role}</p>

                                            <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                                                <span className="text-[10px] font-bold text-slate-400">{c.time}</span>
                                                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded ${getScoreColor(c.score)}`}>
                                                    <BrainCircuit size={10} /> {c.score}% Match
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {stageCandidates.length === 0 && (
                                        <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-bold">
                                            Drop Here
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Candidate Detail Modal */}
            {
                selectedCandidate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-end">
                        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setSelectedCandidate(null)}></div>
                        <div className="relative w-full max-w-md h-full bg-white shadow-2xl p-0 animate-in slide-in-from-right duration-300 flex flex-col">

                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xl font-bold text-slate-700">
                                        {selectedCandidate.avatar}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900">{selectedCandidate.name}</h2>
                                        <p className="text-slate-500 font-bold text-sm">{selectedCandidate.role}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="p-4 grid grid-cols-4 gap-2 border-b border-slate-100">
                                <button onClick={() => handleEmail()} className="flex flex-col items-center justify-center py-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-violet-600 transition-colors gap-1">
                                    <Mail size={18} />
                                    <span className="text-[10px] font-bold uppercase">Email</span>
                                </button>
                                <button onClick={() => handleCall()} className="flex flex-col items-center justify-center py-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-violet-600 transition-colors gap-1">
                                    <Phone size={18} />
                                    <span className="text-[10px] font-bold uppercase">Call</span>
                                </button>
                                <button onClick={handleSchedule} className="flex flex-col items-center justify-center py-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-violet-600 transition-colors gap-1">
                                    <Calendar size={18} />
                                    <span className="text-[10px] font-bold uppercase">Schedule</span>
                                </button>
                                <button onClick={handleProfile} className="flex flex-col items-center justify-center py-3 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-violet-600 transition-colors gap-1">
                                    <Linkedin size={18} />
                                    <span className="text-[10px] font-bold uppercase">Profile</span>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* AI Analysis */}
                                <div className="bg-fuchsia-50 rounded-2xl p-5 border border-fuchsia-100">
                                    <h3 className="flex items-center gap-2 text-sm font-black text-fuchsia-700 uppercase tracking-wide mb-3">
                                        <BrainCircuit size={16} /> AI Suitability Score
                                    </h3>
                                    <div className="flex items-end gap-2 mb-2">
                                        <span className="text-4xl font-black text-slate-900">{selectedCandidate.score}%</span>
                                        <span className="text-sm font-bold text-slate-400 mb-1">Match</span>
                                    </div>
                                    <div className="w-full bg-white h-2 rounded-full overflow-hidden mb-3">
                                        <div className="bg-fuchsia-500 h-full rounded-full" style={{ width: `${selectedCandidate.score}%` }}></div>
                                    </div>
                                    <p className="text-xs font-medium text-slate-600 leading-relaxed">
                                        Strong match for Frontend role. Skills in React and Node.js align perfectly. 2 years experience gap noted in 2022.
                                    </p>
                                </div>

                                {/* Info */}
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-3">Experience</h3>
                                    <div className="space-y-4 relative pl-4 border-l-2 border-slate-100">
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
                                            <h4 className="font-bold text-slate-800 text-sm">Senior Developer</h4>
                                            <p className="text-xs text-slate-500">TechCorp Inc • 2021 - Present</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
                                            <h4 className="font-bold text-slate-800 text-sm">Frontend Developer</h4>
                                            <p className="text-xs text-slate-500">StartUp Ltd • 2018 - 2021</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900 mb-3">Tags & Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'TypeScript', 'Node.js', 'Figma', 'Jest'].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
                                <button
                                    onClick={handleReject}
                                    className="flex-1 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={18} /> Reject
                                </button>
                                <button
                                    onClick={handleMoveToNext}
                                    className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 size={18} /> Move to Next
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Add Candidate Modal */}
            {
                showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                        <form onSubmit={handleAddCandidate} className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black text-slate-900">Add New Candidate</h2>
                                <button type="button" onClick={() => setShowAddModal(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Candidate Name</label>
                                    <input name="name" type="text" required placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-violet-400 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Applied Role</label>
                                    <select name="role" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-violet-400 outline-none">
                                        <option>Frontend Engineer</option>
                                        <option>Product Manager</option>
                                        <option>UX Designer</option>
                                        <option>DevOps Engineer</option>
                                        <option>Legal Counsel</option>
                                        <option>Marketing Lead</option>
                                    </select>
                                </div>
                                <div className="pt-4">
                                    <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                                        Add Candidate
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
        </div >
    );
}

// Helper icons
function PlusIcon({ className }: { className?: string }) { return <svg className={className} width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>; }
