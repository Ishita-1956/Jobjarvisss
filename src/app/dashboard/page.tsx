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

// ──────────────────────── GLASS INFO CARDS ────────────────────────
// 3 cards on LEFT, 3 cards on RIGHT
const leftCards = [
    { text: 'Apply Jobs Faster', detail: 'Auto-applies to matching roles' },
    { text: '12 Applied Today', detail: 'Applications sent successfully' },
    { text: 'Optimize Job Search', detail: 'AI-powered resume tailoring' },
];

const rightCards = [
    { text: 'Jarvis is Working', detail: 'Scanning 200+ job boards now' },
    { text: "Someone's Hiring Right Now", detail: 'Jarvis already Applied for you.' },
    { text: '96% Match Rate', detail: 'Skills aligned to market demand' },
];

// ──────────────────────── STAT CARD ────────────────────────
function StatCard({ title, value, delay }: { title: string; value: number; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="relative rounded-xl overflow-hidden"
        >
            {/* Animated gradient border */}
            <motion.div
                className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
            />
            {/* Pulsing glow */}
            <motion.div
                className="absolute -inset-1 rounded-xl bg-blue-500/15 blur-md"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative bg-slate-900/90 backdrop-blur-md rounded-xl p-4 sm:p-5 m-[2px]">
                <p className="text-blue-400 text-[10px] sm:text-xs font-semibold mb-2 uppercase tracking-wider">{title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                    <AnimatedCounter value={value} />
                </p>
            </div>
        </motion.div>
    );
}

// ──────────────────────── GLASS CARD COMPONENT ────────────────────────
function GlassCard({ text, detail, delay }: { text: string; detail: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 rounded-xl blur-[2px]" />
                <div className="relative bg-gradient-to-br from-cyan-950/60 via-slate-900/80 to-blue-950/60 backdrop-blur-2xl border border-cyan-400/20 rounded-xl px-3.5 py-3 shadow-[0_4px_24px_rgba(34,211,238,0.06)]">
                    <p className="text-[11px] font-bold text-cyan-300 leading-tight mb-0.5">{text}</p>
                    <p className="text-[9px] text-slate-400 leading-snug">{detail}</p>
                </div>
            </div>
        </motion.div>
    );
}

// ──────────────────────── MAIN DASHBOARD ────────────────────────
export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [isActive, setIsActive] = useState(true);
    const [showActivateFlash, setShowActivateFlash] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const userData = await getCurrentUser();
            setUser(userData);
        }
        fetchUser();
    }, []);

    const toggleActive = () => {
        setIsActive((p) => !p);
        setShowActivateFlash(true);
        setTimeout(() => setShowActivateFlash(false), 1200);
    };

    return (
        <div className="relative min-h-full">
            <FloatingParticles />

            <div className="relative z-10 w-full max-w-6xl mx-auto space-y-3">

                {/* ═══════════════════ GREETING HEADER ═══════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl bg-slate-900/50 backdrop-blur-md border border-slate-800/50 p-4 sm:p-6"
                >
                    <div className="relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-xl sm:text-2xl font-bold text-white px-2"
                        >
                            Welcome, <span className="text-white">{user?.first_name || 'User'}</span>!
                        </motion.h1>
                    </div>
                </motion.div>

                {/* ═══════════════════ 3 STAT CARDS (all with blue outline) ═══════════════════ */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <StatCard title="Jobs Streak" value={22} delay={0.1} />
                    <StatCard title="Interviews Streak" value={44} delay={0.18} />
                    <StatCard title="Selected" value={0} delay={0.26} />
                </div>

                {/* ═══════════════════ JARVIS REACTOR + LEFT/RIGHT GLASS CARDS ═══════════════════ */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative py-4 sm:py-6"
                >
                    {/* Horizontal layout: LEFT cards | REACTOR | RIGHT cards */}
                    <div className="flex items-center justify-center gap-4 sm:gap-6">

                        {/* LEFT GLASS CARDS */}
                        <div className="hidden sm:flex flex-col gap-3 w-[170px] flex-shrink-0">
                            <AnimatePresence>
                                {isActive && leftCards.map((card, i) => (
                                    <GlassCard key={card.text} text={card.text} detail={card.detail} delay={i * 0.1} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* CENTER — REACTOR + TOGGLE */}
                        <div className="flex flex-col items-center flex-shrink-0">
                            <motion.button
                                onClick={toggleActive}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative z-10 block"
                            >
                                <div className="relative w-44 h-44 sm:w-52 sm:h-52">
                                    {/* Ring 1 — outermost, slow */}
                                    <motion.div
                                        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-0"
                                    >
                                        <svg viewBox="0 0 200 200" className="w-full h-full">
                                            <circle cx="100" cy="100" r="96" fill="none" stroke={isActive ? 'rgba(34,211,238,0.12)' : 'rgba(100,116,139,0.08)'} strokeWidth="2.5" />
                                            <circle cx="100" cy="100" r="96" fill="none" stroke={isActive ? 'rgba(34,211,238,0.45)' : 'rgba(100,116,139,0.15)'} strokeWidth="2.5" strokeDasharray="18 12 6 12" strokeLinecap="round" />
                                            <path d="M 100 4 A 96 96 0 0 1 185 50" fill="none" stroke={isActive ? 'rgba(34,211,238,0.7)' : 'rgba(100,116,139,0.25)'} strokeWidth="3.5" strokeLinecap="round" />
                                            <path d="M 15 150 A 96 96 0 0 1 4 100" fill="none" stroke={isActive ? 'rgba(34,211,238,0.5)' : 'rgba(100,116,139,0.15)'} strokeWidth="2" strokeLinecap="round" />
                                            {Array.from({ length: 24 }).map((_, i) => {
                                                const a = (i * 15 * Math.PI) / 180;
                                                return <circle key={i} cx={100 + 96 * Math.cos(a)} cy={100 + 96 * Math.sin(a)} r={i % 4 === 0 ? 2.5 : 1} fill={isActive ? 'rgba(34,211,238,0.4)' : 'rgba(100,116,139,0.15)'} />;
                                            })}
                                        </svg>
                                    </motion.div>

                                    {/* Ring 2 — reverse, medium */}
                                    <motion.div
                                        animate={isActive ? { rotate: -360 } : { rotate: 0 }}
                                        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-3 sm:inset-4"
                                    >
                                        <svg viewBox="0 0 200 200" className="w-full h-full">
                                            <circle cx="100" cy="100" r="92" fill="none" stroke={isActive ? 'rgba(34,211,238,0.1)' : 'rgba(100,116,139,0.06)'} strokeWidth="1.5" />
                                            <circle cx="100" cy="100" r="92" fill="none" stroke={isActive ? 'rgba(34,211,238,0.35)' : 'rgba(100,116,139,0.12)'} strokeWidth="2" strokeDasharray="25 18 4 18" strokeLinecap="round" />
                                            {Array.from({ length: 36 }).map((_, i) => {
                                                const a = (i * 10 * Math.PI) / 180;
                                                const r1 = 86, r2 = i % 3 === 0 ? 80 : 83;
                                                return <line key={i} x1={100 + r1 * Math.cos(a)} y1={100 + r1 * Math.sin(a)} x2={100 + r2 * Math.cos(a)} y2={100 + r2 * Math.sin(a)} stroke={isActive ? 'rgba(34,211,238,0.25)' : 'rgba(100,116,139,0.1)'} strokeWidth={i % 3 === 0 ? 1.5 : 0.8} />;
                                            })}
                                            <rect x="140" y="8" width="20" height="5" rx="1" fill={isActive ? 'rgba(34,211,238,0.3)' : 'rgba(100,116,139,0.1)'} />
                                            <rect x="40" y="187" width="20" height="5" rx="1" fill={isActive ? 'rgba(34,211,238,0.25)' : 'rgba(100,116,139,0.08)'} />
                                        </svg>
                                    </motion.div>

                                    {/* Ring 3 — fast spin */}
                                    <motion.div
                                        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-7 sm:inset-9"
                                    >
                                        <svg viewBox="0 0 200 200" className="w-full h-full">
                                            <circle cx="100" cy="100" r="90" fill="none" stroke={isActive ? 'rgba(34,211,238,0.08)' : 'rgba(100,116,139,0.04)'} strokeWidth="1" />
                                            <path d="M 100 10 A 90 90 0 0 1 175 45" fill="none" stroke={isActive ? 'rgba(6,182,212,0.6)' : 'rgba(100,116,139,0.18)'} strokeWidth="3" strokeLinecap="round" />
                                            <path d="M 25 155 A 90 90 0 0 1 10 100" fill="none" stroke={isActive ? 'rgba(6,182,212,0.4)' : 'rgba(100,116,139,0.12)'} strokeWidth="2" strokeLinecap="round" />
                                            <path d="M 190 100 A 90 90 0 0 1 175 155" fill="none" stroke={isActive ? 'rgba(34,211,238,0.5)' : 'rgba(100,116,139,0.12)'} strokeWidth="2.5" strokeLinecap="round" />
                                        </svg>
                                    </motion.div>

                                    {/* Inner glow ring */}
                                    <div className={`absolute inset-12 sm:inset-14 rounded-full border-2 transition-all duration-700 ${isActive ? 'border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.3)]' : 'border-slate-700/30'}`} />

                                    {/* Center core with JOB JARVIS text */}
                                    <div className={`absolute inset-14 sm:inset-[3.8rem] rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-gradient-to-br from-cyan-950/60 via-blue-950/60 to-slate-900/80 border border-cyan-400/30' : 'bg-slate-800/60 border border-slate-700/40'}`}>
                                        <div className="text-center">
                                            <p className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] transition-colors duration-700 ${isActive ? 'text-cyan-400/60' : 'text-slate-600'}`}>
                                                JOB
                                            </p>
                                            <p className={`text-[11px] sm:text-[13px] font-mono font-bold tracking-[0.25em] -mt-0.5 transition-colors duration-700 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                                                JARVIS
                                            </p>
                                        </div>
                                    </div>

                                    {/* Ambient glow */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute -inset-10 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none"
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.button>

                            {/* Status + Toggle directly under reactor */}
                            <div className="text-center mt-4">
                                <h2 className="text-base sm:text-lg font-bold text-white mb-2">
                                    {isActive ? (
                                        <>JOB JARVIS <span className="text-cyan-400">ACTIVATED</span></>
                                    ) : (
                                        <>JOB JARVIS <span className="text-slate-400">PAUSED</span></>
                                    )}
                                </h2>
                                <div className="flex items-center justify-center gap-3">
                                    <span className={`text-[10px] uppercase tracking-wider font-medium ${!isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                                        PAUSED
                                    </span>
                                    <button
                                        onClick={toggleActive}
                                        className={`relative w-12 h-6 rounded-full transition-all duration-500 ${isActive ? 'bg-cyan-500' : 'bg-slate-800'}`}
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
                        </div>

                        {/* RIGHT GLASS CARDS */}
                        <div className="hidden sm:flex flex-col gap-3 w-[170px] flex-shrink-0">
                            <AnimatePresence>
                                {isActive && rightCards.map((card, i) => (
                                    <GlassCard key={card.text} text={card.text} detail={card.detail} delay={0.3 + i * 0.1} />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile: show glass cards below reactor */}
                    <div className="sm:hidden mt-4 grid grid-cols-2 gap-2 px-2">
                        <AnimatePresence>
                            {isActive && [...leftCards, ...rightCards].map((card, i) => (
                                <GlassCard key={card.text} text={card.text} detail={card.detail} delay={i * 0.08} />
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* ═══════════════════ HANDWRITTEN MESSAGE ═══════════════════ */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center pt-2 pb-6"
                >
                    <p className="text-[26px] sm:text-[28px] italic font-serif tracking-wide text-slate-300">
                        Someone&apos;s hiring right now and
                        <span className={`ml-2 underline transition-colors duration-500 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                            Jarvis already Applied for you.
                        </span>
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
