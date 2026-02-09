'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Bot,
    Mic,
    MessageSquare,
    Swords,
    Trophy,
    Zap,
    Repeat,
    Brain,
    Activity,
    User,
    Sparkles,
    Send,
    BarChart3,
    RefreshCw,
    XCircle,
    CheckCircle
} from 'lucide-react';

import OrgHealthSimulator from '@/components/dashboard/simulate/OrgHealthSimulator';

export default function SimulatePage() {
    // Navigation State
    const [activeTab, setActiveTab] = useState<'roleplay' | 'org-health'>('org-health');

    // Game State (Roleplay)
    const [activeScenario, setActiveScenario] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [userInput, setUserInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    // Metrics
    const [opponentMood, setOpponentMood] = useState(20); // 0 (Furious) - 100 (Happy)
    const [analysis, setAnalysis] = useState({ empathy: 50, clarity: 50, confidence: 50 });
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Mock Scenarios
    const scenarios = [
        {
            id: 1,
            title: "The Angry Client",
            difficulty: "Hard",
            role: "Customer Success",
            desc: "A client's project is delayed by 2 weeks. They are furious and threatening to cancel.",
            opponent: "Marcus (CEO of TechCorp)",
            avatarColor: "bg-red-500",
            initialMood: 15,
            personality: "aggressive", // aggressive, logical, emotional
            winCondition: "Mood > 80",
            lossCondition: "Mood < 5"
        },
        {
            id: 2,
            title: "Salary Negotiation",
            difficulty: "Extreme",
            role: "Employee",
            desc: "You have performed well but budgets are tight. Convince your manager to give you a 15% raise.",
            opponent: "Sarah (VP of Engineering)",
            avatarColor: "bg-amber-500",
            initialMood: 40,
            personality: "logical",
            winCondition: "Mood > 90",
            lossCondition: "Mood < 20"
        },
        {
            id: 3,
            title: "Performance Review",
            difficulty: "Medium",
            role: "Manager",
            desc: "Your report, arguably your friend, has missed 3 deadlines. You need to put them on a PIP.",
            opponent: "David (Junior Dev)",
            avatarColor: "bg-blue-500",
            initialMood: 50,
            personality: "emotional",
            winCondition: "Mood > 70 & Confidence > 80", // Needs firm hand but good relationship
            lossCondition: "Mood < 20" // They quit
        }
    ];

    // --- LOGIC ENGINE ---

    const startScenario = (scenario: any) => {
        setActiveScenario(scenario);
        setOpponentMood(scenario.initialMood);
        setGameStatus('playing');
        setMessages([
            {
                id: 1,
                sender: 'ai',
                text: getOpeningLine(scenario.id),
                moodSnapshot: scenario.initialMood
            }
        ]);
        setAnalysis({ empathy: 50, clarity: 50, confidence: 50 });
    };

    const getOpeningLine = (id: number) => {
        if (id === 1) return "This is unacceptable! We were promised delivery on the 1st. I have stakeholders breathing down my neck. Fix this or we walk!";
        if (id === 2) return "Listen, I've got back-to-back meetings. You wanted to talk about compensation? Make it quick, budgets are basically frozen.";
        if (id === 3) return "Hey boss, simulated? PIP? What do you mean? I thought I was doing okay... is this about last week?";
        return "Ready when you are.";
    };

    const handleSendMessage = () => {
        if (!userInput.trim() || gameStatus !== 'playing') return;

        // 1. Add User Message
        const newMsg = { id: Date.now(), sender: 'user', text: userInput };
        setMessages(prev => [...prev, newMsg]);
        const currentInput = userInput.toLowerCase();
        setUserInput("");
        setIsThinking(true);

        // 2. Analyze Input (Simple Rule-Based Keyphrase Detection)
        // In a real app, this would use a semantic analysis API
        let moodChange = 0;
        let empChange = 0;
        let clarChange = 0;
        let confChange = 0;

        // Empathy keywords
        if (currentInput.match(/understand|sorry|apologize|hear you|frustrating|feel/)) {
            moodChange += 15;
            empChange += 10;
        }

        // Confidence keywords
        if (currentInput.match(/propose|plan|solution|will|fix|definitely|data|results/)) {
            moodChange += 10;
            confChange += 10;
            clarChange += 10;
        }

        // Trigger words (Negative)
        if (currentInput.match(/calm down|relax|mistake|policy|blame|technically|fair/)) {
            moodChange -= 20;
            empChange -= 10;
        }

        // Short answers often seen as low effort
        if (userInput.length < 15) {
            clarChange -= 5;
            confChange -= 5;
            moodChange -= 5;
        }

        // 3. Update Metrics
        setTimeout(() => {
            const newMood = Math.min(100, Math.max(0, opponentMood + moodChange));
            setOpponentMood(newMood);
            setAnalysis(prev => ({
                empathy: Math.min(100, Math.max(0, prev.empathy + empChange)),
                clarity: Math.min(100, Math.max(0, prev.clarity + clarChange)),
                confidence: Math.min(100, Math.max(0, prev.confidence + confChange)),
            }));

            // 4. Determine AI Response based on new Mood
            const response = generateResponse(activeScenario, newMood, currentInput);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: response, moodSnapshot: newMood }]);
            setIsThinking(false);

            // 5. Check Game Over Conditions
            if (newMood >= 90) setGameStatus('won');
            else if (newMood <= 10) setGameStatus('lost');

        }, 1500 + Math.random() * 1000); // Random delay 1.5-2.5s
    };

    const generateResponse = (scenario: any, mood: number, input: string) => {
        // Angry Client (Marcus)
        if (scenario.id === 1) {
            if (mood < 20) return "I don't want apologies, I want results! Why should I trust you again?";
            if (mood < 50) return "Okay, but talk is cheap. What exactly are you going to do by 5 PM today?";
            if (mood < 80) return "That sounds... plausible. But I need this in writing immediately.";
            return "Alright, I appreciate you stepping up. Let's move forward with that plan. Don't let me down.";
        }

        // Salary Negotiation (Sarah)
        if (scenario.id === 2) {
            if (mood < 30) return "We really can't prioritize this right now. Is there anything else?";
            if (mood < 60) return "Look, you're valuable, but 15% is steep. Maybe we can discuss a performance bonus instead?";
            if (mood < 85) return "I can see your point. The market data you mentioned is compelling. What if we split it? 8% now, 7% later?";
            return "You make a solid case. I'll fight for the full 15% with the CFO. Good preparation.";
        }

        // Default
        if (mood < 30) return "I'm not sure I believe that.";
        if (mood > 70) return "I see where you're coming from.";
        return "Go on...";
    };

    const handleKeyRecord = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            setTimeout(() => {
                setUserInput("I understand your frustration, and I have a plan to fix it immediately."); // Mock Speech-to-Text
                setIsRecording(false);
            }, 2000);
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isThinking]);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans overflow-hidden relative selection:bg-indigo-500/30">

            {/* Hex Background */}
            <div className="fixed inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }}></div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20">
                            <Bot className="text-white" size={24} />
                        </div>
                        Zentra<span className="text-indigo-400">Lab</span>
                    </h1>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                    <button
                        onClick={() => setActiveTab('org-health')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'org-health'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        Org Health (What-If)
                    </button>
                    <button
                        onClick={() => setActiveTab('roleplay')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'roleplay'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        ZentraEQ (Roleplay)
                    </button>
                </div>

                {activeScenario && activeTab === 'roleplay' && (
                    <button
                        onClick={() => setActiveScenario(null)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold transition-all border border-slate-700 hover:border-slate-500"
                    >
                        Exit Scenario
                    </button>
                )}
            </div>

            <div className="relative z-10 h-[calc(100vh-140px)]">
                {activeTab === 'org-health' ? (
                    <OrgHealthSimulator />
                ) : (
                    <>
                        {!activeScenario ? (
                            // --- SCENARIO SELECTOR (Improved) ---
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full pb-8 overflow-y-auto">
                                {scenarios.map((scenario) => (
                                    <div
                                        key={scenario.id}
                                        onClick={() => startScenario(scenario)}
                                        className="group relative bg-slate-900/80 border border-slate-700 rounded-3xl p-8 cursor-pointer overflow-hidden transition-all hover:border-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] flex flex-col backdrop-blur-sm"
                                    >
                                        {/* Hover Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 via-transparent to-indigo-600/0 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-500"></div>

                                        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
                                            <Swords size={140} />
                                        </div>

                                        <div className="mb-6 relative z-10">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${scenario.difficulty === 'Extreme' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    scenario.difficulty === 'Hard' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    }`}>
                                                    {scenario.difficulty}
                                                </span>
                                                <Trophy size={16} className="text-slate-600 group-hover:text-yellow-500 transition-colors" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{scenario.title}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">{scenario.desc}</p>
                                        </div>

                                        <div className="mt-auto relative z-10">
                                            <div className="flex items-center gap-3 mb-6 p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                                                <div className={`w-10 h-10 rounded-full ${scenario.avatarColor} flex items-center justify-center text-white font-bold shadow-lg`}>
                                                    {scenario.opponent.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-slate-500 uppercase font-bold">Opponent</div>
                                                    <div className="text-sm font-bold text-slate-200">{scenario.opponent}</div>
                                                </div>
                                            </div>
                                            <button className="w-full py-3 bg-indigo-600 group-hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2">
                                                Enter Dojo <Zap size={16} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // --- THE DOJO (Improved Interface) ---
                            <div className="grid grid-cols-12 gap-6 h-full pb-4">

                                {/* LEFT: Live Conversation */}
                                <div className="col-span-8 bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden flex flex-col relative shadow-2xl">

                                    {/* HUD Header */}
                                    <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex justify-between items-center backdrop-blur text-sm z-20">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${activeScenario.difficulty === 'Extreme' ? 'bg-red-500' : 'bg-orange-500'} animate-pulse`}></div>
                                            <span className="font-bold text-slate-300 tracking-wider">LIVE SIMULATION</span>
                                            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">Turn {Math.floor(messages.length / 2) + 1}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-[10px] text-slate-500 uppercase font-bold">Opponent Mood</div>
                                                <div className={`text-xs font-bold ${opponentMood < 30 ? 'text-red-400' : opponentMood > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                    {opponentMood < 30 ? 'Hostile' : opponentMood > 70 ? 'Receptive' : 'Cautious'} ({opponentMood}%)
                                                </div>
                                            </div>
                                            {/* Mood Ring */}
                                            <div className="relative w-10 h-10">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle cx="20" cy="20" r="16" stroke="#1e293b" strokeWidth="4" fill="transparent" />
                                                    <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={100} strokeDashoffset={100 - opponentMood} className={`transition-all duration-1000 ${opponentMood < 30 ? 'text-red-500' : opponentMood > 70 ? 'text-emerald-500' : 'text-amber-500'}`} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Game Over Overlay */}
                                    {gameStatus !== 'playing' && (
                                        <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
                                            {gameStatus === 'won' ? (
                                                <CheckCircle size={80} className="text-emerald-500 mb-6 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                                            ) : (
                                                <XCircle size={80} className="text-red-500 mb-6 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
                                            )}
                                            <h2 className="text-4xl font-black text-white mb-2">
                                                {gameStatus === 'won' ? 'Scenario Conquered!' : 'Negotiation Failed'}
                                            </h2>
                                            <p className="text-slate-400 max-w-md mb-8">
                                                {gameStatus === 'won'
                                                    ? "You successfully de-escalated the situation and achieved a positive outcome. Your empathy score was the key differentiator."
                                                    : "The opponent became too hostile to continue. Review specific trigger words and try again with a softer approach."}
                                            </p>

                                            <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-8">
                                                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                                    <div className="text-xs text-slate-500">Final Empathy</div>
                                                    <div className="text-xl font-bold text-white">{Math.round(analysis.empathy)}%</div>
                                                </div>
                                                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                                    <div className="text-xs text-slate-500">Clarity</div>
                                                    <div className="text-xl font-bold text-white">{Math.round(analysis.clarity)}%</div>
                                                </div>
                                                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                                    <div className="text-xs text-slate-500">Confidence</div>
                                                    <div className="text-xl font-bold text-white">{Math.round(analysis.confidence)}%</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <button onClick={() => setActiveScenario(null)} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition">Return to Dojo</button>
                                                <button onClick={() => startScenario(activeScenario)} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/25 flex items-center gap-2"><RefreshCw size={18} /> Retry</button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Chat History */}
                                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
                                        <div className="text-center text-xs text-slate-600 font-mono mb-4">- SESSION START -</div>

                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`flex gap-4 group ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`
                                            w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold shadow-md relative
                                            ${msg.sender === 'ai' ? activeScenario.avatarColor : 'bg-slate-700'}
                                        `}>
                                                    {msg.sender === 'ai' ? activeScenario.opponent.charAt(0) : <User size={18} />}
                                                </div>

                                                <div className="flex flex-col gap-1 max-w-[70%]">
                                                    <div className={`
                                                p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative
                                                ${msg.sender === 'user'
                                                            ? 'bg-indigo-600 text-white rounded-br-none shadow-[0_4px_15px_rgba(79,70,229,0.2)]'
                                                            : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}
                                            `}>
                                                        {msg.text}
                                                    </div>
                                                    {/* Timestamp / Meta */}
                                                    {msg.sender === 'ai' && (
                                                        <span className="text-[10px] text-slate-600 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            Mood: {msg.moodSnapshot}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Typing Indicator */}
                                        {isThinking && (
                                            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                                <div className={`w-10 h-10 rounded-full ${activeScenario.avatarColor} flex items-center justify-center text-white font-bold opacity-80`}>
                                                    {activeScenario.opponent.charAt(0)}
                                                </div>
                                                <div className="bg-slate-800/50 p-4 rounded-2xl rounded-bl-none flex gap-1 items-center h-10 border border-slate-700/50">
                                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                                                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-5 bg-slate-950/80 border-t border-slate-800 backdrop-blur-sm">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={userInput}
                                                onChange={(e) => setUserInput(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                                placeholder={isRecording ? "Listening..." : "Type your response..."}
                                                disabled={gameStatus !== 'playing' || isThinking}
                                                className={`
                                            w-full bg-slate-900/80 border rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-slate-600 font-medium transition-all
                                            focus:outline-none focus:ring-1 focus:ring-indigo-500
                                            ${isRecording ? 'border-red-500/50 ring-1 ring-red-500/20' : 'border-slate-700 focus:border-indigo-500'}
                                        `}
                                                autoFocus
                                            />

                                            {/* Mic Button with Animation */}
                                            <div
                                                onClick={handleKeyRecord}
                                                className={`absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg cursor-pointer transition-all ${isRecording ? 'text-red-500 bg-red-500/10' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}
                                            >
                                                <Mic size={20} className={isRecording ? 'animate-pulse' : ''} />
                                            </div>

                                            <button
                                                onClick={handleSendMessage}
                                                disabled={!userInput.trim() || gameStatus !== 'playing'}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all active:scale-95"
                                            >
                                                <Send size={18} />
                                            </button>
                                        </div>
                                        <div className="text-[10px] text-slate-600 mt-2 text-center flex items-center justify-center gap-2">
                                            <Sparkles size={10} /> Pro Tip: Using "I" statements increases Empathy score.
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT: Real-time Analysis */}
                                <div className="col-span-4 space-y-6">

                                    {/* AI Coach HUD */}
                                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6  space-y-6 shadow-xl">
                                        <div className="flex items-center gap-3 mb-2 border-b border-slate-800 pb-4">
                                            <div className="p-1.5 bg-pink-500/10 rounded-lg">
                                                <Brain size={18} className="text-pink-500" />
                                            </div>
                                            <h3 className="font-bold text-white text-sm">Real-Time Psy-Analysis</h3>
                                        </div>

                                        <div className="space-y-5">
                                            {[
                                                { label: 'Empathy', val: analysis.empathy, color: 'from-pink-500 to-rose-500' },
                                                { label: 'Clarity', val: analysis.clarity, color: 'from-cyan-500 to-blue-500' },
                                                { label: 'Confidence', val: analysis.confidence, color: 'from-amber-500 to-orange-500' },
                                            ].map((metric) => (
                                                <div key={metric.label}>
                                                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                                                        <span className="font-medium">{metric.label}</span>
                                                        <span className="font-mono text-white">{Math.round(metric.val)}%</span>
                                                    </div>
                                                    <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                                                        <div
                                                            className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
                                                            style={{ width: `${metric.val}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl relative overflow-hidden group hover:bg-indigo-500/10 transition-colors cursor-help">
                                            <div className="absolute top-3 right-3">
                                                <Zap size={14} className="text-indigo-400 group-hover:text-yellow-400 transition-colors" />
                                            </div>
                                            <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-2">Live Coaching</div>
                                            <p className="text-sm text-indigo-100 leading-snug">
                                                {opponentMood < 40
                                                    ? "Opponent is hostile. Avoid defensive language. Acknowledge their anger directly without making excuses."
                                                    : "You have their attention. Now is the time to pivot to a solution-oriented proposal."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Session Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Turns</div>
                                            <div className="text-2xl font-black text-white">{messages.filter(m => m.sender === 'user').length}</div>
                                        </div>
                                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                            <div className="text-xs text-slate-500 uppercase font-bold mb-1">Avg Ref</div>
                                            <div className="text-2xl font-black text-emerald-400">1.2s</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
