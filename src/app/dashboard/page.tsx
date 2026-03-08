'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getCurrentUser, User } from '@/lib/auth';

// ──────────────────────── ANIMATED COUNTER ────────────────────────
function AnimatedCounter({ value }: { value: number }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const dur = 1500, steps = 30, inc = value / steps;
        let cur = 0;
        const t = setInterval(() => {
            cur += inc;
            if (cur >= value) { setCount(value); clearInterval(t); } else setCount(Math.floor(cur));
        }, dur / steps);
        return () => clearInterval(t);
    }, [value]);
    return <span>{count}</span>;
}

// ──────────────────────── TECH WAVE RINGS ────────────────────────
function TechWaveRings({ active }: { active: boolean }) {
    if (!active) return null;
    return (
        <>
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: [1, 1.6 + i * 0.4], opacity: [0.5, 0] }}
                    transition={{
                        duration: 2,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </>
    );
}

// ──────────────────────── FLOATING PARTICLES ────────────────────────
function FloatingParticles() {
    const particles = useMemo(() =>
        Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 3,
            dur: 8 + Math.random() * 12,
            delay: Math.random() * 5,
        })),
        []);
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-cyan-400/20"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                    animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
        </div>
    );
}

// ──────────────────────── MAIN DASHBOARD ────────────────────────
export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isActive, setIsActive] = useState(true);
    const [showActivateFlash, setShowActivateFlash] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const userData = await getCurrentUser();
            setUser(userData);
        }
        fetchUser();
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const hookLines = [
        'Ready to land your dream role',
        'Let\u2019s crush your job hunt',
        'Your next opportunity awaits',
        'Time to make moves',
        'Let\u2019s get you hired',
    ];
    const hookLine = useMemo(() => hookLines[Math.floor(Math.random() * hookLines.length)], []);

    const toggleActive = () => {
        setIsActive((p) => !p);
        setShowActivateFlash(true);
        setTimeout(() => setShowActivateFlash(false), 1200);
    };

    const metrics = [
        { title: 'Applications Sent', value: 47, subtitle: 'THIS MONTH', gradient: 'from-blue-500 to-blue-600', icon: '🚀', bg: 'bg-blue-500/10', ring: 'ring-blue-500/20' },
        { title: 'Interview Invites', value: 8, subtitle: 'THIS WEEK', gradient: 'from-violet-500 to-purple-500', icon: '📅', bg: 'bg-violet-500/10', ring: 'ring-violet-500/20' },
        { title: 'Saved Jobs', value: 156, subtitle: 'IN YOUR LIST', gradient: 'from-amber-500 to-orange-500', icon: '🔖', bg: 'bg-amber-500/10', ring: 'ring-amber-500/20' },
    ];

    return (
        <div className="relative min-h-full">
            <FloatingParticles />

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-4 sm:space-y-6">

                {/* ═══════════════════ GREETING HEADER ═══════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-slate-950/80 backdrop-blur-xl border border-slate-700/40 p-5 sm:p-8 lg:p-10"
                >
                    <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-violet-500/8 to-purple-500/8 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                        <div>
                            <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                className="text-slate-500 text-xs sm:text-sm mb-1"
                            >
                                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
                            >
                                {hookLine}, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{user?.first_name || 'there'}</span>!
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                                className="text-slate-400 mt-1 text-sm sm:text-base"
                            >
                                Your AI assistant is on standby. Let&apos;s make today count.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                            className="flex items-center gap-3 flex-wrap"
                        >
                            <span className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border ${isActive
                                ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-slate-600/30 bg-slate-700/20 text-slate-400'}`}>
                                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
                                {isActive ? 'AI Active' : 'AI Paused'}
                            </span>
                            <Link href="/dashboard/jobs"
                                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all text-xs sm:text-sm">
                                Find Jobs
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ═══════════════════ STAT CARDS ═══════════════════ */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={m.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 * i }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                            className="relative group"
                        >
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${m.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500`} />
                            <div className={`relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-slate-700/40 ring-1 ${m.ring}`}>
                                <div className="flex items-center justify-between mb-2 sm:mb-3">
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${m.bg} flex items-center justify-center text-lg sm:text-xl`}>
                                        {m.icon}
                                    </div>
                                    <span className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{m.subtitle}</span>
                                </div>
                                <p className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${m.gradient} bg-clip-text text-transparent`}>
                                    <AnimatedCounter value={m.value} />
                                </p>
                                <p className="text-slate-400 text-[10px] sm:text-xs mt-1">{m.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ═══════════════════ ACTIVATE / PAUSE – WITH TOGGLE ═══════════════════ */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-slate-950/60 backdrop-blur-xl border border-slate-700/40 p-6 sm:p-8 lg:p-12"
                >
                    {/* Animated background grid */}
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                    {/* Radial glow behind button */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <div className="w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 rounded-full blur-3xl" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Flash */}
                    <AnimatePresence>
                        {showActivateFlash && (
                            <motion.div
                                initial={{ opacity: 0.8, scale: 0.5 }}
                                animate={{ opacity: 0, scale: 3 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <div className="w-40 h-40 rounded-full bg-cyan-400/30 blur-2xl" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-slate-500 text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-6 font-medium"
                        >
                            Autonomous Application Engine
                        </motion.p>

                        {/* THE BIG BUTTON */}
                        <div className="relative mb-6 sm:mb-8">
                            <TechWaveRings active={isActive} />
                            <motion.button
                                onClick={toggleActive}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative z-10"
                            >
                                <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center transition-all duration-700 ${isActive
                                    ? 'bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-600 shadow-[0_0_60px_rgba(6,182,212,0.4)]'
                                    : 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-[0_0_30px_rgba(100,116,139,0.2)]'
                                    }`}>
                                    <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-700 ${isActive
                                        ? 'bg-gradient-to-br from-cyan-400/30 to-blue-600/30 backdrop-blur-sm'
                                        : 'bg-slate-700/50 backdrop-blur-sm'
                                        }`}>
                                        <div className="flex flex-col items-center">
                                            <motion.div
                                                animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                                className="text-2xl sm:text-3xl mb-1"
                                            >
                                                {isActive ? '⚡' : '⏸️'}
                                            </motion.div>
                                            <span className="text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                                                {isActive ? 'Active' : 'Paused'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        </div>

                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2"
                        >
                            {isActive ? (
                                <>Job Jarvis is <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Active</span></>
                            ) : (
                                <>Job Jarvis is <span className="text-slate-400">Paused</span></>
                            )}
                        </motion.h2>
                        <p className="text-slate-500 text-xs sm:text-sm max-w-md mb-4 sm:mb-6 px-4">
                            {isActive
                                ? 'Scanning job boards, tailoring applications, and submitting on your behalf — all on autopilot.'
                                : 'Your AI agent is paused. Flip the toggle to resume autonomous job applications.'}
                        </p>

                        {/* ──── TOGGLE SWITCH ──── */}
                        <div className="flex items-center gap-4">
                            <span className={`text-sm font-medium transition-colors ${!isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                                Paused
                            </span>
                            <motion.button
                                onClick={toggleActive}
                                className={`relative w-16 h-8 rounded-full transition-all duration-500 ${isActive
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30'
                                    : 'bg-slate-700 shadow-inner'
                                    }`}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
                                    animate={{ left: isActive ? '2.25rem' : '0.25rem' }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            </motion.button>
                            <span className={`text-sm font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                                Active
                            </span>
                        </div>

                        {/* Live stats bar */}
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-slate-500"
                            >
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Scanning 12 job boards
                                </span>
                                <span className="hidden sm:inline">•</span>
                                <span>3 applications queued</span>
                                <span className="hidden sm:inline">•</span>
                                <span>74/100 daily quota</span>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
