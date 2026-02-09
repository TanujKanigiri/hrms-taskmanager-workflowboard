"use client";

import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Users,
    MapPin,
    Mail,
    Phone,
    ZoomIn,
    ZoomOut,
    Move,
    MoreVertical,
    Layers,
    Search
} from 'lucide-react';

// --- Mock Data: Tree Structure ---
const ORG_DATA = {
    id: 'CEO',
    name: 'Sarah Jenkins',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    color: 'slate',
    location: 'San Francisco, HQ',
    children: [
        {
            id: 'CTO',
            name: 'Michael Chen',
            role: 'Chief Technology Officer',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            color: 'blue',
            location: 'San Francisco, HQ',
            children: [
                {
                    id: 'VP-ENG',
                    name: 'David Kim',
                    role: 'VP of Engineering',
                    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    color: 'blue',
                    location: 'Remote',
                    children: [
                        { id: 'TL-1', name: 'Alex M.', role: 'Tech Lead', image: 'AM', color: 'blue', children: [] },
                        { id: 'TL-2', name: 'Sam R.', role: 'Senior Dev', image: 'SR', color: 'blue', children: [] }
                    ]
                },
                {
                    id: 'DIR-PROD',
                    name: 'James Wilson',
                    role: 'Director of Product',
                    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    color: '紫', // Typo intended to test fallback? No, let's fix: purple
                    location: 'London, UK',
                    children: []
                }
            ]
        },
        {
            id: 'CPO',
            name: 'Emily Davis',
            role: 'Chief People Officer',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            color: 'emerald',
            location: 'New York, USA',
            children: [
                {
                    id: 'HR-MGR',
                    name: 'Lisa Wong',
                    role: 'HR Manager',
                    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                    color: 'emerald',
                    location: 'New York, USA',
                    children: []
                }
            ]
        },
        {
            id: 'CMO',
            name: 'Robert Fox',
            role: 'Chief Marketing Officer',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            color: 'pink',
            location: 'London, UK',
            children: []
        }
    ]
};

// Recursive Node Component
const OrgNode = ({ node, level = 0, searchQuery = '' }: { node: any, level?: number, searchQuery?: string }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    const isMatch = searchQuery && (
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If searching, force expand everything to show deep matches
    const showChildren = (hasChildren && (isExpanded || !!searchQuery));

    return (
        <div className="flex flex-col items-center relative">

            {/* The Card */}
            <div className={`peer group relative z-10 w-64 transition-all duration-300 ${level === 0 ? 'scale-110 mb-8' : 'mb-8'}`}>
                <div className={`
                    bg-white rounded-2xl border-b-4 border-${node.color}-500 shadow-sm transition-all overflow-hidden
                    ${isMatch ? 'ring-4 ring-yellow-400 scale-105 shadow-2xl' : 'hover:shadow-xl hover:-translate-y-1'}
                `}>
                    <div className="p-4 flex flex-col items-center text-center">
                        <div className="relative mb-3">
                            {typeof node.image === 'string' && node.image.startsWith('http') ? (
                                <img src={node.image} alt={node.name} className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md" />
                            ) : (
                                <div className={`w-16 h-16 rounded-full bg-${node.color || 'blue'}-100 flex items-center justify-center font-bold text-${node.color || 'blue'}-600 border-4 border-white shadow-md`}>
                                    {node.image}
                                </div>
                            )}
                            {hasChildren && !searchQuery && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-100 hover:bg-slate-50 text-slate-500 z-20"
                                >
                                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                            )}
                        </div>

                        <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">
                            {isMatch ? <span className="bg-yellow-100 text-slate-900 px-1 rounded">{node.name}</span> : node.name}
                        </h4>
                        <p className={`text-xs font-bold uppercase tracking-wide text-${node.color || 'slate'}-600 mb-2`}>{node.role}</p>

                        {/* Hidden details on hover */}
                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 w-full pt-0 group-hover:pt-2 border-t border-transparent group-hover:border-slate-100 flex justify-center gap-3 text-slate-400">
                            <Mail size={14} className="hover:text-blue-500 cursor-pointer" />
                            <Phone size={14} className="hover:text-emerald-500 cursor-pointer" />
                            <MapPin size={14} className="hover:text-red-500 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Connecting Lines */}
            {showChildren && (
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-300">
                    {/* Vertical line from parent */}
                    <div className="w-0.5 h-8 bg-slate-300"></div>

                    {/* Horizontal connector line */}
                    <div className="flex items-start justify-center relative">
                        {/* The absolute horizontal bar crossing all children */}
                        {node.children.length > 1 && (
                            <div className="absolute top-0 h-0.5 bg-slate-300 w-[calc(100%-16rem)] left-1/2 -translate-x-1/2"></div>
                        )}

                        <div className="flex gap-8 pt-0">
                            {node.children.map((child: any, idx: number) => (
                                <div key={child.id} className="flex flex-col items-center relative">
                                    {/* Vertical line to child */}
                                    <div className="w-0.5 h-8 bg-slate-300 -mt-0.5 mb-2 relative">
                                        {/* Connector Dot */}
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-300"></div>
                                    </div>
                                    <OrgNode node={child} level={level + 1} searchQuery={searchQuery} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function OrgChartPage() {
    const [zoom, setZoom] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="h-[calc(100vh-2rem)] bg-slate-50/50 flex flex-col overflow-hidden relative">

            {/* Header / Toolbar overlay */}
            <div className="absolute top-6 left-6 z-50 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200/50 flex flex-col md:flex-row items-center justify-between w-[calc(100%-3rem)] md:w-auto gap-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Organization Chart</h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Interactive Hierarchy</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Find employee..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ZoomOut size={20} /></button>
                    <span className="font-mono font-bold text-slate-600 w-12 text-center">{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ZoomIn size={20} /></button>
                </div>
            </div>

            {/* Helper Floating Action */}
            <div className="absolute bottom-8 right-8 z-50 flex flex-col gap-3">
                <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors">
                    <Layers size={20} />
                </button>
                <button className="w-12 h-12 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                    <Move size={20} />
                </button>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 overflow-auto cursor-grab active:cursor-grabbing custom-scrollbar flex items-start justify-center pt-32 pb-20">
                <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} className="transition-transform duration-200 ease-out">
                    <OrgNode node={ORG_DATA} searchQuery={searchQuery} />
                </div>
            </div>

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none -z-10 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>
        </div>
    );
}
