"use client";

import React, { useState } from 'react';
import {
    Folder,
    FileText,
    Image as ImageIcon,
    MoreVertical,
    Download,
    Share2,
    Trash2,
    UploadCloud,
    Search,
    Grid,
    List,
    File,
    HardDrive,
    Shield
} from 'lucide-react';

export default function MyDocumentsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const categories = [
        { id: 'personal', name: 'Personal ID', count: 4, color: 'text-blue-500', bg: 'bg-blue-100' },
        { id: 'education', name: 'Education', count: 8, color: 'text-purple-500', bg: 'bg-purple-100' },
        { id: 'employment', name: 'Employment', count: 12, color: 'text-emerald-500', bg: 'bg-emerald-100' },
        { id: 'tax', name: 'Tax & Legal', count: 3, color: 'text-orange-500', bg: 'bg-orange-100' },
    ];

    const files = [
        { id: 1, name: 'Aadhar Card_Front.pdf', type: 'pdf', size: '2.4 MB', date: 'Oct 24, 2026', category: 'personal' },
        { id: 2, name: 'Offer_Letter_Zentra.pdf', type: 'pdf', size: '1.2 MB', date: 'Jan 15, 2026', category: 'employment' },
        { id: 3, name: 'Profile_Photo_HighRes.jpg', type: 'image', size: '4.8 MB', date: 'Sep 10, 2026', category: 'personal' },
        { id: 4, name: 'Degree_Certificate.pdf', type: 'pdf', size: '3.1 MB', date: 'Aug 05, 2025', category: 'education' },
        { id: 5, name: 'Form_16_FY2526.pdf', type: 'pdf', size: '1.8 MB', date: 'May 20, 2026', category: 'tax' },
        { id: 6, name: 'Relieving_Letter_PrevCo.pdf', type: 'pdf', size: '0.9 MB', date: 'Dec 12, 2025', category: 'employment' },
    ];

    const getFileIcon = (type: string) => {
        if (type === 'image') return <ImageIcon size={24} className="text-purple-500" />;
        return <FileText size={24} className="text-red-500" />;
    };

    return (
        <div className="min-h-screen space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">

            {/* 1. Hero & Storage Stats */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">My Vault</h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">Securely manage your personal and professional documents.</p>
                </div>

                {/* Storage Card */}
                <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl md:w-96 relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                <HardDrive size={14} /> Cloud Storage
                            </div>
                            <span className="bg-white/10 px-2 py-0.5 rounded-md text-xs font-bold text-white">Pro Plan</span>
                        </div>
                        <div className="flex items-end gap-1">
                            <h3 className="text-3xl font-black">12.5 <span className="text-lg text-slate-400">GB</span></h3>
                            <span className="text-slate-400 font-medium mb-1.5">used of 50 GB</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700/50 rounded-full mt-4 overflow-hidden flex">
                            <div className="h-full bg-blue-500 w-[40%]"></div>
                            <div className="h-full bg-purple-500 w-[20%]"></div>
                            <div className="h-full bg-emerald-500 w-[10%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Actions & Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">

                {/* Search */}
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search your files..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-700 font-bold focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    {/* View Toggle */}
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List size={18} />
                        </button>
                    </div>

                    {/* Upload Button */}
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105">
                        <UploadCloud size={18} /> Upload
                    </button>
                </div>
            </div>

            {/* 3. Categories Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                        <div className={`w-12 h-12 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.color} mb-4 group-hover:scale-110 transition-transform`}>
                            <Folder size={24} fill="currentColor" className="opacity-80" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{cat.name}</h3>
                        <p className="text-sm font-medium text-slate-400">{cat.count} Files</p>
                    </div>
                ))}
            </div>

            {/* 4. Files Grid */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800 ml-2">Recent Files</h2>

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {files.map((file) => (
                            <div key={file.id} className="group bg-white rounded-[2rem] p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 relative overflow-hidden">
                                {/* Hover Actions Overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3 z-10">
                                    <button className="p-2 bg-slate-900 text-white rounded-full hover:scale-110 transition-transform shadow-lg"><Download size={16} /></button>
                                    <button className="p-2 bg-white border border-slate-200 text-slate-600 rounded-full hover:scale-110 transition-transform shadow-lg"><Share2 size={16} /></button>
                                    <button className="p-2 bg-red-50 text-red-500 rounded-full hover:scale-110 transition-transform shadow-lg"><Trash2 size={16} /></button>
                                </div>

                                <div className="aspect-[4/3] bg-slate-50 rounded-[1.5rem] flex items-center justify-center mb-4 relative overflow-hidden group-hover:bg-slate-100 transition-colors border border-slate-50">
                                    {/* Preview Placeholder */}
                                    <div className="transform group-hover:scale-110 transition-transform duration-500">
                                        {getFileIcon(file.type)}
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <button className="text-slate-300 hover:text-slate-600"><MoreVertical size={16} /></button>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <h4 className="font-bold text-slate-800 truncate" title={file.name}>{file.name}</h4>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs font-medium text-slate-400">{file.date}</p>
                                        <p className="text-xs font-bold bg-slate-100 px-2 py-1 rounded-md text-slate-500">{file.size}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="p-4 pl-6 text-xs font-bold text-slate-400 uppercase">Name</th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Category</th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Date</th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase">Size</th>
                                    <th className="p-4 text-xs font-bold text-slate-400 uppercase text-right pr-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file) => (
                                    <tr key={file.id} className="border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                {getFileIcon(file.type)}
                                                <span className="font-bold text-slate-700">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2 py-1 rounded-md uppercase">{file.category}</span>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-slate-500">{file.date}</td>
                                        <td className="p-4 text-sm font-bold text-slate-800">{file.size}</td>
                                        <td className="p-4 text-right pr-6">
                                            <button className="text-slate-400 hover:text-indigo-600 transition-colors"><MoreVertical size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* 5. Secure Banner */}
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium py-4">
                <Shield size={12} className="text-emerald-500" />
                <span>End-to-end encrypted storage provided by Zentra Secure</span>
            </div>
        </div>
    );
}
