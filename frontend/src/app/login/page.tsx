'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Download, Mail, User, Chrome, CheckCircle2, ArrowRight, Globe, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Updated slides with specific feature assets
const SLIDES = [
  {
    id: 1,
    image: "/feature_dashboard_dark.png",
    title: "Intelligent Organization",
    desc: "Visualize your entire workforce structure with dynamic charts and real-time reporting."
  },
  {
    id: 2,
    image: "/feature_performance.png",
    title: "Growth & Performance",
    desc: "Empower your team with 360° feedback loops and AI-driven growth trajectories."
  },
  {
    id: 3,
    image: "/feature_payroll_analytics.png",
    title: "Seamless Payroll",
    desc: "Experience error-free automated payroll processing with global compliance built-in."
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-advance slides with a slightly longer duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@zentra.com' && password === 'password123') {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    }, 1500);
  };
 
  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans overflow-hidden relative">

      {/* ULTRA STYLISH HOME NAVIGATION - The Nebula Navigator */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-50 group"
      >
        <div className="relative flex items-center">

          {/* Kinetic Rings (Orbiting when idle, aligned when hovered) */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Ring 1 - Fast Spinner */}
            <div className="absolute inset-0 rounded-full border border-b-transparent border-l-transparent border-indigo-400/50 group-hover:border-indigo-500 transition-colors duration-500 animate-[spin_3s_linear_infinite] group-hover:animate-none group-hover:rotate-0"></div>

            {/* Ring 2 - Slow Counter-Spinner */}
            <div className="absolute inset-1 rounded-full border border-t-transparent border-r-transparent border-violet-400/30 group-hover:border-violet-500 transition-colors duration-500 animate-[spin_5s_linear_infinite_reverse] group-hover:animate-none group-hover:rotate-0"></div>

            {/* Ring 3 - Pulse Ring */}
            <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-75"></div>

            {/* Core Orb */}
            <div className="relative z-10 w-8 h-8 rounded-full bg-slate-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all duration-500 text-white">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
            </div>

            {/* Connecting Beam (Expands on Hover) */}
            <div className="absolute left-[50%] top-1/2 -translate-y-1/2 h-[1px] w-0 bg-gradient-to-r from-indigo-500 to-transparent group-hover:w-16 transition-all duration-500 ease-out z-0"></div>
          </div>

          {/* Text Reveal */}
          <div className="overflow-hidden w-0 group-hover:w-32 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
            <div className="pl-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-indigo-400">Navigate</span>
              <span className="text-sm font-bold text-slate-600 lg:text-slate-300">Back Home</span>
            </div>
          </div>

        </div>
      </Link>


      {/* LEFT SIDE: SLIDER - MIDNIGHT NAVY THEME */}
      <div className="hidden lg:flex w-[55%] relative flex-col items-center justify-center p-12 bg-[#020617] text-white overflow-hidden">

        {/* Background Gradient & Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-[#020617] to-blue-950/50 z-0"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] z-0"></div>

        {/* Animated Blue/Cyan Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-xl text-center">

          {/* Image Carousel */}
          <div className="relative w-full h-[400px] mb-12 perspective-1000">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] transform ${index === currentSlide
                  ? 'opacity-100 translate-x-0 scale-100 blur-0'
                  : 'opacity-0 translate-x-16 scale-90 blur-md'
                  }`}
              >
                <div className="relative w-full h-[320px] mb-8 group">
                  {/* Golden Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm p-4">

                    {/* Subtle Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50"></div>

                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">{slide.title}</h2>
                <p className="text-blue-200/70 text-lg leading-relaxed max-w-md mx-auto font-light tracking-wide">{slide.desc}</p>
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-4">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-700 ease-out ${idx === currentSlide ? 'w-12 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* UNIQUE STYLISH CUT DIVIDER */}
        <div className="absolute top-0 right-0 bottom-0 w-[100px] z-20 pointer-events-none overflow-hidden">
          {/* Diagonal Slice */}
          <div className="absolute top-0 right-[-50px] bottom-0 w-[150px] bg-slate-50 transform -skew-x-[15deg] shadow-[0_0_40px_rgba(0,0,0,0.2)]"></div>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-6 md:p-12 relative z-30">

        <div className="w-full max-w-[420px] space-y-8 animate-in slide-in-from-right-4 fade-in duration-700">

          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6 transform hover:scale-105 transition-transform duration-300 cursor-default">
              <div className="relative w-11 h-11 bg-white rounded-xl p-1 shadow-lg border border-slate-100">
                <Image src="/zentra_logo.png" alt="Zentra Logo" fill className="object-contain" />
              </div>
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Zentra<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">HR</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h1>
            <p className="text-slate-500">Access your dashboard securely</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100">

            {/* Custom Input Fields */}
            <div className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100 flex items-center gap-2 animate-in slide-in-from-top-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {error}
                </div>
              )}
              <div className="group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-blue-600 transition-colors">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    placeholder="name@company.com"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={18} />
                  </div>
                </div>
              </div>

              {loginMethod === 'password' && (
                <div className="group animate-in slide-in-from-top-2 fade-in">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 group-focus-within:text-blue-600 transition-colors">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      placeholder="••••••••"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={18} />
                    </div>
                  </div>
                  <div className="text-right mt-2">
                    <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot Password?</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <button type="button" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
                <Globe size={14} />
                Login with Domain
              </button>
            </div>

            {/* Main Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {loginMethod === 'otp' ? 'Send Access Code' : 'Sign In'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold tracking-wider">Or login with</span></div>
            </div>

            {/* Secondary Options - Clean Grid */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setLoginMethod(loginMethod === 'otp' ? 'password' : 'otp')}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 border rounded-xl font-bold transition-all hover:shadow-md ${loginMethod === 'otp' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-600 hover:bg-slate-50'}`}
              >
                <Lock size={20} className={loginMethod === 'otp' ? 'text-blue-600' : 'text-slate-400'} />
                <span className="text-[10px] uppercase tracking-wide">OTP</span>
              </button>

              <button type="button" className="flex flex-col items-center justify-center gap-1.5 py-3 border border-slate-100 bg-white rounded-xl text-slate-600 font-bold hover:bg-slate-50 hover:shadow-md transition-all">
                <svg className="w-5 h-5" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                <span className="text-[10px] uppercase tracking-wide">Microsoft</span>
              </button>

              <button type="button" className="flex flex-col items-center justify-center gap-1.5 py-3 border border-slate-100 bg-white rounded-xl text-slate-600 font-bold hover:bg-slate-50 hover:shadow-md transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-[10px] uppercase tracking-wide">Google</span>
              </button>
            </div>

          </form>

          {/* Signup Footer - Styled as Button */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Don't have an account?</span>
            <Link href="/free-trial" className="px-6 py-2.5 rounded-full border border-slate-200 text-sm font-bold text-slate-700 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
              Start your 14-day free trial
            </Link>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-12 flex gap-6 text-xs text-slate-400 font-medium">
          <Link href="#" className="hover:text-slate-600">Privacy Policy</Link>
          <Link href="#" className="hover:text-slate-600">Terms of Service</Link>
        </div>
      </div>

    </div>
  );
}
