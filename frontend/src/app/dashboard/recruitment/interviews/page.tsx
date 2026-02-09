'use client';

import React, { useState } from 'react';
import {
    Calendar,
    Clock,
    Video,
    Users,
    MessageSquare,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Search,
    Filter,
    Star
} from 'lucide-react';

export default function InterviewSchedulerPage() {
    // Mock Data (Defined before state)
    const upcomingInterviews = [
        {
            id: 1,
            candidate: 'Sarah Jenkins',
            role: 'Senior Product Designer',
            type: 'Technical Round',
            time: '10:00 AM - 11:00 AM',
            date: 'Today, Oct 24',
            panel: ['You', 'Mike Ross'],
            status: 'Upcoming',
            platform: 'Google Meet'
        },
        {
            id: 2,
            candidate: 'David Chen',
            role: 'Frontend Engineer',
            type: 'System Design',
            time: '2:30 PM - 3:30 PM',
            date: 'Today, Oct 24',
            panel: ['You', 'Alex B.'],
            status: 'Upcoming',
            platform: 'Zoom'
        },
        {
            id: 3,
            candidate: 'Emily White',
            role: 'Marketing Lead',
            type: 'Culture Fit',
            time: '11:00 AM - 11:30 AM',
            date: 'Tomorrow, Oct 25',
            panel: ['Sarah J.', 'HR'],
            status: 'Scheduled',
            platform: 'Teams'
        }
    ];

    const feedbackPending = [
        { id: 101, candidate: 'Michael Scott', role: 'Regional Manager', date: 'Yesterday', rating: 'Pending' },
        { id: 102, candidate: 'Jim Halpert', role: 'Sales Executive', date: '2 days ago', rating: 'Pending' },
    ];

    // State
    const [filterDate, setFilterDate] = useState('Today');
    const [showScorecardModal, setShowScorecardModal] = useState(false);
    const [selectedFeedbackItem, setSelectedFeedbackItem] = useState<any>(null);
    const [pendingList, setPendingList] = useState(feedbackPending);

    // Actions
    const handleJoinMeeting = (link: string) => {
        // mock opening
        let url = link.includes('Zoom') ? 'https://zoom.us' : 'https://meet.google.com';
        window.open(url, '_blank');
    };

    const handleSync = () => {
        alert("Calendar Synced Successfully!");
    };

    const handleOpenScorecard = (item: any) => {
        setSelectedFeedbackItem(item);
        setShowScorecardModal(true);
    };

    const handleSubmitScorecard = (e: React.FormEvent) => {
        e.preventDefault();
        setPendingList(pendingList.filter(i => i.id !== selectedFeedbackItem.id));
        setShowScorecardModal(false);
        alert(`Scorecard submitted for ${selectedFeedbackItem.candidate}`);
    };

    // Filter Logic (Mock logic for demo)
    const filteredInterviews = upcomingInterviews.filter(i => {
        if (filterDate === 'All') return true;
        // Simple string matching for demo purposes
        if (filterDate === 'Today' && i.date.includes('Today')) return true;
        if (filterDate === 'Tomorrow' && i.date.includes('Tomorrow')) return true;
        if (filterDate === 'Next Week' && !i.date.includes('Today') && !i.date.includes('Tomorrow')) return true;
        return false;
    });

    return (
        <div className="min-h-screen pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">


            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Scheduler</span></h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Manage upcoming interviews and submit scorecards.</p>
                </div>
                <button onClick={handleSync} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center gap-2">
                    <Calendar size={18} /> Sync Calendar
                </button>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Schedule List */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Date Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {['Today', 'Tomorrow', 'Next Week', 'All'].map((d, i) => (
                            <button
                                key={d}
                                onClick={() => setFilterDate(d)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filterDate === d ? 'bg-orange-100 text-orange-700' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Clock size={20} className="text-orange-500" /> Upcoming Interviews
                        </h3>

                        <div className="space-y-4">
                            {filteredInterviews.length > 0 ? filteredInterviews.map((interview) => (
                                <div key={interview.id} className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg hover:border-orange-100 transition-all duration-300">
                                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

                                        {/* Time Badge */}
                                        <div className="flex flex-col items-center justify-center w-full md:w-20 bg-white rounded-2xl p-3 border border-slate-100 shadow-sm">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Oct</span>
                                            <span className="text-xl font-black text-slate-900">{interview.date.split(', ')[1].split(' ')[1]}</span>
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-lg font-bold text-slate-900">{interview.candidate}</h4>
                                                <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-bold uppercase">{interview.type}</span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-500">{interview.role}</p>

                                            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-bold text-slate-400">
                                                <span className="flex items-center gap-1"><Clock size={12} /> {interview.time}</span>
                                                <span className="flex items-center gap-1"><Video size={12} /> {interview.platform}</span>
                                                <div className="flex items-center gap-1">
                                                    <Users size={12} />
                                                    {interview.panel.join(', ')}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <button
                                            onClick={() => handleJoinMeeting(interview.platform)}
                                            className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            Join <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-12 text-center text-slate-400 font-medium bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                    No interviews found for this period.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* Feedback Pending */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <AlertCircle size={20} className="text-red-500" /> Pending Feedback
                            </h3>
                            <div className="space-y-3">
                                {pendingList.length > 0 ? pendingList.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleOpenScorecard(item)}
                                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-colors group cursor-pointer"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h5 className="font-bold text-slate-800">{item.candidate}</h5>
                                            <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium mb-3">{item.role}</p>
                                        <button className="w-full py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-1">
                                            <MessageSquare size={12} /> Submit Scorecard
                                        </button>
                                    </div>
                                )) : (
                                    <div className="text-center text-slate-400 text-sm font-medium py-8">All caught up! 🎉</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Interview Guide */}
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 p-4 opacity-10">
                            <CheckCircle2 size={100} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Interview Guide</h3>
                        <p className="text-indigo-200 text-sm font-medium mb-4">
                            Remember to focus on behavioral questions for the Cultural Fit round.
                        </p>
                        <button className="text-xs font-bold bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors">Download PDF</button>
                    </div>

                </div>
            </div>


            {/* Scorecard Modal */}
            {
                showScorecardModal && selectedFeedbackItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowScorecardModal(false)}></div>
                        <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in-95 duration-300">
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Submit Feedback</h2>
                            <p className="text-slate-500 font-medium mb-6">for {selectedFeedbackItem.candidate} • {selectedFeedbackItem.role}</p>

                            <form onSubmit={handleSubmitScorecard} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Overall Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} type="button" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-500 flex items-center justify-center transition-all focus:bg-yellow-100 focus:text-yellow-600 focus:border-yellow-300">
                                                <Star size={20} className="fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Detailed Comments</label>
                                    <textarea
                                        className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:ring-2 focus:ring-orange-400 outline-none resize-none"
                                        placeholder="Assess technical skills, culture fit, and communication..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <button type="button" onClick={() => setShowScorecardModal(false)} className="py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Cancel</button>
                                    <button type="submit" className="py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg">Submit Scorecard</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
