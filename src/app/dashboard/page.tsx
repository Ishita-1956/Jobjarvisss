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
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-800/50 p-4 sm:p-6"
                >
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-xl sm:text-2xl font-bold text-white px-2"
                            >
                                Welcome, <span className="text-white">{user?.first_name || 'User'}</span>!
                            </motion.h1>
                        </div>
                    </div>
                </motion.div>

                {/* ═══════════════════ STAT CARDS (Dark Green Theme - Image 1) ═══════════════════ */}
                <div className="bg-[#1a2b1a] rounded-xl border border-green-900/30 p-2 sm:p-4 mb-4">
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        {[
                            { title: 'Jobs Streak', value: 22 },
                            { title: 'Interviews Streak', value: 44 },
                            { title: 'Selected', value: 0 },
                        ].map((m, i) => (
                            <div
                                key={m.title}
                                className="bg-[#243524] rounded-lg p-2 sm:p-3 text-center border border-green-800/20"
                            >
                                <p className="text-slate-300 text-[10px] sm:text-xs font-medium mb-1 uppercase tracking-wider">{m.title}</p>
                                <p className="text-white text-xl sm:text-2xl font-bold">
                                    <AnimatedCounter value={m.value} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═══════════════════ ARC REACTOR TOGGLE (Image 2 Inspired) ═══════════════════ */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative flex flex-col items-center py-6 sm:py-10"
                >
                    <div className="relative mb-6 sm:mb-8">
                        {/* Animated background glow */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 -m-20 pointer-events-none"
                                >
                                    <div className="w-full h-full bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ARC REACTOR CONTAINER */}
                        <motion.button
                            onClick={toggleActive}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative z-10"
                        >
                            {/* Outer ring */}
                            <div className={`w-32 h-32 sm:w-44 sm:h-44 rounded-full border-4 flex items-center justify-center transition-all duration-700 ${isActive
                                ? 'border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.4)]'
                                : 'border-slate-700 shadow-none'
                                }`}>
                                {/* Spinning technical ring */}
                                <motion.div
                                    animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                    className={`absolute inset-0 rounded-full border-2 border-dashed ${isActive ? 'border-cyan-400/30' : 'border-slate-800'}`}
                                />

                                {/* Inner core */}
                                <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${isActive
                                    ? 'bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-slate-900 border-cyan-400/50'
                                    : 'bg-slate-800 border-slate-700'
                                    }`}>
                                    {/* Triangle Core */}
                                    <div className={`w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[35px] transition-all duration-700 ${isActive
                                        ? 'border-t-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]'
                                        : 'border-t-slate-600'}`}
                                    />

                                    {/* Status Text Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mt-12 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                                            {isActive ? 'ONLINE' : 'OFFLINE'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.button>

                        {/* Technical lines around reactor (Image 2 style) */}
                        <div className={`absolute top-1/2 left-full w-24 h-[1px] ml-4 transition-colors ${isActive ? 'bg-cyan-500/40' : 'bg-slate-800'}`} />
                        <div className={`absolute top-1/2 right-full w-24 h-[1px] mr-4 transition-colors ${isActive ? 'bg-cyan-500/40' : 'bg-slate-800'}`} />
                    </div>

                    <div className="text-center">
                        <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                            {isActive ? (
                                <>JARVIS <span className="text-cyan-400">ACTIVATED</span></>
                            ) : (
                                <>JARVIS <span className="text-slate-400">PAUSED</span></>
                            )}
                        </h2>

                       {/* TOGGLE SWITCH */}
<div className="flex items-center justify-center gap-3">
    <span className={`text-[10px] uppercase tracking-wider font-medium ${!isActive ? 'text-slate-300' : 'text-slate-600'}`}>
        PAUSED
    </span>

    <button
        onClick={toggleActive}
        className={`relative w-12 h-6 rounded-full transition-all duration-500 ${
            isActive ? 'bg-cyan-500' : 'bg-slate-800'
        }`}
    >
        <motion.div
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
            animate={{ left: isActive ? '1.75rem' : '0.25rem' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
    </button>

    <span className={`text-[10px] uppercase tracking-wider font-medium ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
        ACTIVE
    </span>
</div>
</div>
</motion.div>


{/* HANDWRITTEN MESSAGE */}
<motion.div
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ delay:1 }}
    className="text-center pt-4 pb-6"
>

<p className="text-[28px] italic font-serif tracking-wide text-slate-300">

    Someone’s hiring right now and

    <span
        className={`ml-2 underline transition-colors duration-500 ${
            isActive ? 'text-cyan-400' : 'text-slate-500'
        }`}
    >
        Jarvis already Applied for you.
    </span>

</p>

</motion.div>

            </div>
        </div>
    );
}
