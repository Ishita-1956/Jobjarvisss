'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    getOwnerStats, getRecruiters, getAllCandidates,
    type OwnerStats, type Recruiter, type Candidate
} from '@/lib/enterprise-api';

export default function OwnerAnalyticsPage() {
    const [stats, setStats] = useState<OwnerStats | null>(null);
    const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const [s, r, c] = await Promise.all([
                getOwnerStats(),
                getRecruiters(),
                getAllCandidates(),
            ]);
            setStats(s);
            setRecruiters(r);
            setCandidates(c);
            setIsLoading(false);
        }
        load();
    }, []);

    // Compute candidate status breakdown
    const statusGroups = ['New', 'Reviewing', 'Interviewing', 'Offer Sent', 'Hired', 'Rejected'] as const;
    const statusCounts = statusGroups.map(s => ({
        status: s,
        count: candidates.filter(c => c.status === s).length,
    }));

    const statusColors: Record<string, string> = {
        'New': 'bg-slate-500',
        'Reviewing': 'bg-amber-500',
        'Interviewing': 'bg-blue-500',
        'Offer Sent': 'bg-violet-500',
        'Hired': 'bg-emerald-500',
        'Rejected': 'bg-red-500',
    };

    const statusBadgeColors: Record<string, string> = {
        'New': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        'Reviewing': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        'Interviewing': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'Offer Sent': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
        'Hired': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    const summaryCards = [
        { label: 'Total Recruiters', value: stats?.totalRecruiters ?? recruiters.length, icon: '👥', change: stats?.recruitersChange, color: 'from-blue-500/20 to-blue-600/10 border-blue-500/20' },
        { label: 'Total Candidates', value: stats?.totalCandidates ?? candidates.length, icon: '👤', change: stats?.candidatesChange, color: 'from-violet-500/20 to-violet-600/10 border-violet-500/20' },
        { label: 'Active Jobs', value: stats?.activeJobs ?? 0, icon: '💼', change: stats?.jobsChange, color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/20' },
        { label: 'Hiring Efficiency', value: stats?.hiringEfficiency ? `${stats.hiringEfficiency}%` : `${candidates.length > 0 ? Math.round((candidates.filter(c => c.status === 'Hired').length / candidates.length) * 100) : 0}%`, icon: '📈', change: stats?.efficiencyChange, color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-white">
                    Company Analytics
                </motion.h1>
                <p className="text-slate-400 mt-1">Overview of your recruiters and candidates across the platform.</p>
            </div>

            {/* ─── Summary Cards ─── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border backdrop-blur-sm hover:scale-[1.02] transition-transform`}
                    >
                        <span className="text-2xl block mb-2">{card.icon}</span>
                        <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                        <div className="text-xs text-slate-400">{card.label}</div>
                        {card.change && <div className="text-[10px] text-emerald-400 mt-1">{card.change}</div>}
                    </motion.div>
                ))}
            </div>

            {/* ─── Candidate Pipeline Breakdown ─── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60">
                <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-blue-500 rounded-full" />
                    Candidate Pipeline
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {statusCounts.map((item) => (
                        <div key={item.status} className="text-center">
                            <div className={`h-2 ${statusColors[item.status]} rounded-full mb-3 opacity-70`} />
                            <div className="text-2xl font-bold text-white">{item.count}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{item.status}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ─── Recruiters Overview ─── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60">
                <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-violet-500 rounded-full" />
                    Recruiters Overview
                    <span className="ml-auto text-xs text-slate-500 font-normal">{recruiters.length} total</span>
                </h3>

                {recruiters.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-800/80">
                                    <th className="pb-3 pr-4">Recruiter</th>
                                    <th className="pb-3 pr-4">Role</th>
                                    <th className="pb-3 pr-4 text-center">Hired</th>
                                    <th className="pb-3 pr-4 text-center">Active</th>
                                    <th className="pb-3 text-center">Interviewing</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                                {recruiters.map((r, i) => (
                                    <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.04 }}
                                        className="group hover:bg-slate-800/20 transition-colors">
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                                    {r.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white text-sm group-hover:text-blue-400 transition-colors">{r.name}</div>
                                                    <div className="text-[11px] text-slate-500">{r.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 pr-4 text-sm text-slate-400">{r.role}</td>
                                        <td className="py-3 pr-4 text-center">
                                            <span className="text-sm font-bold text-emerald-400">{r.stats.hired}</span>
                                        </td>
                                        <td className="py-3 pr-4 text-center">
                                            <span className="text-sm font-bold text-blue-400">{r.stats.active}</span>
                                        </td>
                                        <td className="py-3 text-center">
                                            <span className="text-sm font-bold text-amber-400">{r.stats.interviewing}</span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-slate-800/60 flex items-center justify-center mb-3">
                            <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="text-slate-500 text-sm">No recruiter data yet</p>
                        <p className="text-slate-600 text-xs mt-1">Metrics will appear once recruiters are active</p>
                    </div>
                )}
            </motion.div>

            {/* ─── Candidates Overview ─── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60">
                <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-cyan-500 rounded-full" />
                    Candidates Overview
                    <span className="ml-auto text-xs text-slate-500 font-normal">{candidates.length} total</span>
                </h3>

                {candidates.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-800/80">
                                    <th className="pb-3 pr-4">Candidate</th>
                                    <th className="pb-3 pr-4">Title</th>
                                    <th className="pb-3 pr-4">Recruiter</th>
                                    <th className="pb-3 pr-4 text-center">Match</th>
                                    <th className="pb-3 pr-4 text-center">Status</th>
                                    <th className="pb-3">Applied</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                                {candidates.slice(0, 10).map((c, i) => (
                                    <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.03 }}
                                        className="group hover:bg-slate-800/20 transition-colors">
                                        <td className="py-3 pr-4">
                                            <div className="font-medium text-white text-sm group-hover:text-cyan-400 transition-colors">{c.name}</div>
                                            <div className="text-[11px] text-slate-500">{c.email}</div>
                                        </td>
                                        <td className="py-3 pr-4 text-sm text-slate-400">{c.title}</td>
                                        <td className="py-3 pr-4">
                                            {c.recruiterName ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-[10px] flex items-center justify-center font-bold">
                                                        {c.recruiterName.charAt(0)}
                                                    </div>
                                                    <span className="text-xs text-slate-400">{c.recruiterName}</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-600">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="py-3 pr-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <div className="w-10 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${c.matchScore > 90 ? 'bg-emerald-500' : c.matchScore > 70 ? 'bg-blue-500' : 'bg-amber-500'}`}
                                                        style={{ width: `${c.matchScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-[11px] font-bold text-white">{c.matchScore}%</span>
                                            </div>
                                        </td>
                                        <td className="py-3 pr-4 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusBadgeColors[c.status] || 'bg-slate-700/50 text-slate-300 border-slate-600/50'}`}>
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-xs text-slate-500">{c.appliedDate}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                        {candidates.length > 10 && (
                            <div className="text-center py-3 border-t border-slate-800/40">
                                <span className="text-xs text-slate-500">Showing 10 of {candidates.length} candidates</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-slate-800/60 flex items-center justify-center mb-3">
                            <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <p className="text-slate-500 text-sm">No candidates in pipeline yet</p>
                        <p className="text-slate-600 text-xs mt-1">Candidates will appear once applications start coming in</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
