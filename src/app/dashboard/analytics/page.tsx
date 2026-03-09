'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ── Animated Counter ──
function AnimatedCounter({ value }: { value: number }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const steps = 30, inc = value / steps;
        let cur = 0;
        const t = setInterval(() => {
            cur += inc;
            if (cur >= value) { setCount(value); clearInterval(t); } else setCount(Math.floor(cur));
        }, 1200 / steps);
        return () => clearInterval(t);
    }, [value]);
    return <span>{count}</span>;
}

// ── Progress Ring ──
function ProgressRing({ progress, size = 72, strokeWidth = 6 }: { progress: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;
    return (
        <svg className="transform -rotate-90" width={size} height={size}>
            <circle strokeWidth={strokeWidth} stroke="#1e293b" fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
            <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeWidth={strokeWidth} strokeLinecap="round" stroke="url(#pg)" fill="transparent"
                r={radius} cx={size / 2} cy={size / 2}
                style={{ strokeDasharray: circumference }}
            />
            <defs>
                <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// ── Stacked Bar Chart ──
function StackedBarChart({ data }: { data: { day: string; ai: number; manual: number }[] }) {
    const max = Math.max(...data.map(d => d.ai + d.manual), 0.1);
    const yTicks = [4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5, 0];
    const chartH = 110;

    return (
        <div className="flex gap-2 w-full">
            {/* Y axis ticks */}
            <div className="flex flex-col justify-between items-end" style={{ height: chartH }}>
                {yTicks.map(t => (
                    <span key={t} className="text-[7px] text-slate-600 font-mono leading-none">{t}</span>
                ))}
            </div>

            {/* Bars */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-end justify-between gap-1" style={{ height: chartH }}>
                    {data.map((d, i) => {
                        const total = d.ai + d.manual;
                        const totalH = Math.max((total / max) * (chartH - 16), total > 0 ? 6 : 0);
                        const aiRatio = total > 0 ? d.ai / total : 0;
                        const manualRatio = total > 0 ? d.manual / total : 0;
                        const aiH = aiRatio * totalH;
                        const manualH = manualRatio * totalH;
                        return (
                            <div key={d.day} className="flex-1 flex flex-col items-center justify-end relative group" style={{ height: chartH }}>
                                {total > 0 && (
                                    <span className="text-[7px] text-slate-400 font-mono mb-0.5">{total.toFixed(1)}</span>
                                )}
                                <div className="w-4/5 flex flex-col-reverse overflow-hidden rounded-t-[2px]">
                                    {/* manual - bottom (tan) */}
                                    {manualH > 0 && (
                                        <motion.div
                                            initial={{ height: 0 }} animate={{ height: manualH }}
                                            transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                                            className="w-full bg-gradient-to-t from-amber-200/50 to-amber-300/65 flex-shrink-0 flex items-end justify-center"
                                            style={{ minHeight: 3 }}
                                        >
                                            {manualH > 10 && <span className="text-[6px] text-amber-900/80 font-bold pb-0.5">{d.manual.toFixed(1)}</span>}
                                        </motion.div>
                                    )}
                                    {/* ai - top (orange-red) */}
                                    {aiH > 0 && (
                                        <motion.div
                                            initial={{ height: 0 }} animate={{ height: aiH }}
                                            transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                                            className="w-full bg-gradient-to-t from-orange-500 to-rose-400 flex-shrink-0 flex items-center justify-center"
                                            style={{ minHeight: 3 }}
                                        >
                                            {aiH > 10 && <span className="text-[6px] text-white font-bold">{d.ai.toFixed(1)}</span>}
                                        </motion.div>
                                    )}
                                </div>
                                {total === 0 && (
                                    <div className="w-4/5 h-1 bg-slate-800/40 rounded-t-[2px]" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* X labels */}
                <div className="flex justify-between gap-1 mt-1 border-t border-slate-700/40 pt-1">
                    {data.map(d => (
                        <span key={d.day} className="flex-1 text-center text-[7px] text-slate-500 truncate">{d.day}</span>
                    ))}
                </div>
                <p className="text-center text-[7px] text-slate-600 mt-0.5 tracking-widest uppercase">Days of Week</p>
            </div>
        </div>
    );
}

// ── GitHub-style Activity Calendar ──
function ActivityCalendar() {
    const today = useMemo(() => new Date(), []);

    const weeks = useMemo(() => {
        const data: { date: Date; count: number }[][] = [];
        const start = new Date(today);
        start.setDate(start.getDate() - 363);
        start.setDate(start.getDate() - start.getDay());
        for (let w = 0; w < 53; w++) {
            const week: { date: Date; count: number }[] = [];
            for (let d = 0; d < 7; d++) {
                const date = new Date(start);
                date.setDate(start.getDate() + w * 7 + d);
                const daysAgo = Math.floor((today.getTime() - date.getTime()) / 86400000);
                let count = 0;
                if (daysAgo >= 0 && daysAgo <= 363) {
                    const r = Math.random();
                    if (daysAgo < 120) count = r < 0.25 ? 0 : r < 0.45 ? 1 : r < 0.65 ? 2 : r < 0.82 ? 3 : 4;
                    else if (daysAgo < 240) count = r < 0.52 ? 0 : r < 0.72 ? 1 : r < 0.88 ? 2 : 3;
                    else count = r < 0.78 ? 0 : r < 0.91 ? 1 : 2;
                }
                week.push({ date, count });
            }
            data.push(week);
        }
        return data;
    }, [today]);

    const months = useMemo(() => {
        const labels: { label: string; col: number }[] = [];
        let lastMonth = -1;
        weeks.forEach((week, wi) => {
            const m = week[0].date.getMonth();
            if (m !== lastMonth) { labels.push({ label: week[0].date.toLocaleString('default', { month: 'short' }), col: wi }); lastMonth = m; }
        });
        return labels;
    }, [weeks]);

    const totalApps = useMemo(() => weeks.flat().reduce((s, c) => s + c.count, 0), [weeks]);

    const cellColor = (n: number) => {
        if (n === 0) return 'bg-slate-700/50';
        if (n === 1) return 'bg-cyan-900';
        if (n === 2) return 'bg-cyan-700';
        if (n === 3) return 'bg-cyan-500';
        return 'bg-cyan-300';
    };

    const C = 12, G = 2;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-white">Activity Calendar (Jobs Applied)</span>
                <span className="text-[10px] text-slate-400 font-mono">{totalApps} applications · 2024</span>
            </div>

            <div className="relative overflow-x-auto">
                {/* Month labels */}
                <div className="flex mb-0.5" style={{ paddingLeft: 22 }}>
                    {weeks.map((week, wi) => {
                        const lbl = months.find(m => m.col === wi);
                        return (
                            <div key={wi} className="text-[8px] text-slate-500 flex-shrink-0"
                                style={{ width: C + G }}>
                                {lbl ? lbl.label : ''}
                            </div>
                        );
                    })}
                </div>

                <div className="relative flex" style={{ paddingLeft: 22 }}>
                    {/* Day labels */}
                    <div className="absolute left-0 flex flex-col" style={{ gap: G, top: 0 }}>
                        {['', 'M', '', 'W', '', 'F', ''].map((d, i) => (
                            <div key={i} className="text-[7px] text-slate-600 flex items-center justify-end pr-0.5"
                                style={{ height: C, width: 20 }}>{d}</div>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="flex" style={{ gap: G }}>
                        {weeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col" style={{ gap: G }}>
                                {week.map((day, di) => (
                                    <motion.div key={di}
                                        initial={{ opacity: 0, scale: 0.4 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.12, delay: (wi * 7 + di) * 0.0006 }}
                                        title={`${day.date.toDateString()}: ${day.count} app${day.count !== 1 ? 's' : ''}`}
                                        className={`rounded-[2px] cursor-pointer hover:ring-1 hover:ring-cyan-400/60 transition-all flex-shrink-0 ${cellColor(day.count)}`}
                                        style={{ width: C, height: C }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-1.5 justify-end">
                <span className="text-[8px] text-slate-500">Less</span>
                {['bg-slate-700/50', 'bg-cyan-900', 'bg-cyan-700', 'bg-cyan-500', 'bg-cyan-300'].map((c, i) => (
                    <div key={i} className={`rounded-[2px] flex-shrink-0 ${c}`} style={{ width: C, height: C }} />
                ))}
                <span className="text-[8px] text-slate-500">More</span>
            </div>
        </div>
    );
}

// ── Main Page ──
export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState<'weekly' | 'activities'>('weekly');

    const barData = [
        { day: 'Dec 26', ai: 0, manual: 0 },
        { day: 'Dec 27', ai: 2.6, manual: 1.7 },
        { day: 'Dec 28', ai: 0, manual: 0 },
        { day: 'Dec 29', ai: 0, manual: 0 },
        { day: 'Dec 30', ai: 0, manual: 2.9 },
        { day: 'Dec 31', ai: 0, manual: 2.2 },
        { day: 'Jan 1', ai: 0.1, manual: 1.7 },
    ];

    const card = "bg-slate-800/60 border border-slate-700/40 rounded-xl";

    return (
        <div className="max-w-6xl mx-auto flex flex-col gap-2 h-full">

            {/* ══ ROW 1: Jobs Applied info + 4 stat cards + Profile Strength ══ */}
            <div className="grid grid-cols-[200px_1fr_140px] gap-2">

                {/* Jobs Applied */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={`${card} p-3 flex flex-col justify-between`}>
                    <div>
                        <h2 className="text-sm font-bold text-white">Jobs Applied</h2>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">Create new jobs to apply and track.</p>
                    </div>
                    <button className="mt-2 flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-600 hover:border-slate-400 rounded-lg text-slate-300 text-[11px] font-medium transition-all w-fit">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Job
                    </button>
                </motion.div>

                {/* 4 stat cards */}
                <div className="grid grid-cols-4 gap-2">
                    {/* Last 7 days */}
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}
                        className={`${card} p-3 flex flex-col justify-between`}>
                        <p className="text-[10px] text-slate-400">Last 7 days</p>
                        <p className="text-2xl font-bold text-white leading-none mt-0.5">
                            <AnimatedCounter value={3} />
                        </p>
                        <div className="mt-1.5">
                            <span className="text-[9px] text-slate-500">0% ↘</span>
                            <div className="mt-0.5 h-0.5 w-full bg-slate-700/60 rounded-full" />
                        </div>
                    </motion.div>

                    {/* Last 30 days */}
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
                        className={`${card} p-3 flex flex-col justify-between`}>
                        <p className="text-[10px] text-slate-400">Last 30 days</p>
                        <p className="text-2xl font-bold text-white leading-none mt-0.5">
                            <AnimatedCounter value={32} />
                        </p>
                        <div className="mt-1.5">
                            <span className="text-[9px] text-cyan-400">700% ↗</span>
                            <div className="mt-0.5 h-0.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '78%' }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Jobs Streak */}
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.10 }}
                        className={`${card} p-3 flex flex-col justify-between`}>
                        <p className="text-[10px] text-slate-400">Jobs Streak</p>
                        <p className="text-2xl font-bold text-white leading-none mt-0.5">
                            <AnimatedCounter value={22} />
                        </p>
                        <div className="mt-1.5">
                            <span className="text-[9px] text-orange-400">Active ↗</span>
                            <div className="mt-0.5 h-0.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '55%' }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Interviews */}
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13 }}
                        className={`${card} p-3 flex flex-col justify-between`}>
                        <p className="text-[10px] text-slate-400">Interviews</p>
                        <p className="text-2xl font-bold text-white leading-none mt-0.5">
                            <AnimatedCounter value={8} />
                        </p>
                        <div className="mt-1.5">
                            <span className="text-[9px] text-violet-400">+45% ↗</span>
                            <div className="mt-0.5 h-0.5 w-full bg-slate-700/60 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '40%' }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Profile Strength */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
                    className={`${card} p-3 flex flex-col items-center justify-center gap-1`}>
                    <p className="text-[10px] text-slate-400 self-start">Profile Strength</p>
                    <div className="relative">
                        <ProgressRing progress={78} size={72} strokeWidth={6} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-base font-bold text-white">78%</span>
                        </div>
                    </div>
                    <p className="text-[9px] text-slate-500 text-center leading-tight">Top 15%</p>
                    <Link href="/dashboard/profile"
                        className="text-[9px] text-blue-400 hover:text-blue-300 transition-colors">
                        Improve →
                    </Link>
                </motion.div>
            </div>

            {/* ══ ROW 2: Selected card + Bar Chart ══ */}
            <div className="grid grid-cols-[200px_1fr] gap-2">

                {/* Selected card */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                    className={`${card} p-3 flex flex-col justify-between`}>
                    <p className="text-[10px] text-slate-400">Selected</p>
                    <p className="text-2xl font-bold text-white leading-none mt-0.5">
                        <AnimatedCounter value={0} />
                    </p>
                    <div className="mt-1.5">
                        <span className="text-[9px] text-slate-500">Keep going ✦</span>
                        <div className="mt-0.5 h-0.5 w-full bg-slate-700/60 rounded-full" />
                    </div>
                </motion.div>

                {/* Bar chart panel */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className={`${card} p-3`}>
                    {/* Tabs + legend */}
                    <div className="flex items-center gap-1 mb-2">
                        {(['weekly', 'activities'] as const).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`px-2.5 py-0.5 rounded text-[10px] font-medium transition-all ${activeTab === tab
                                    ? 'bg-slate-700 text-white'
                                    : 'text-slate-500 hover:text-slate-300'}`}>
                                {tab === 'weekly' ? 'Weekly Jobs' : 'Activities'}
                            </button>
                        ))}
                        <div className="ml-auto flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[9px] text-slate-500">
                                <span className="w-2 h-2 rounded-sm bg-gradient-to-t from-orange-500 to-rose-400 inline-block" /> AI Applied
                            </span>
                            <span className="flex items-center gap-1 text-[9px] text-slate-500">
                                <span className="w-2 h-2 rounded-sm bg-amber-300/65 inline-block" /> Manual
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {/* Y axis label */}
                        <div className="flex items-center flex-shrink-0">
                            <p className="text-[7px] text-slate-600 tracking-widest uppercase"
                                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                Time Spent (Hours)
                            </p>
                        </div>
                        <div className="flex-1">
                            <StackedBarChart data={barData} />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ══ ROW 3: Full-width Activity Calendar (fills remaining space) ══ */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className={`${card} p-3 flex-1 flex flex-col justify-between`}>
                <ActivityCalendar />
            </motion.div>

        </div>
    );
}