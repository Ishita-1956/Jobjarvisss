'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getRecruiterStats, getRecruiterActivityFeed, type RecruiterStats, type ActivityItem } from '@/lib/enterprise-api';

export default function RecruiterDashboard() {
    const [stats, setStats] = useState<RecruiterStats | null>(null);
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const [s, a] = await Promise.all([getRecruiterStats(), getRecruiterActivityFeed()]);
            setStats(s);
            setActivity(a);
            setIsLoading(false);
        }
        load();
    }, []);

    const statCards = [
        { label: 'My Candidates', value: stats?.myCandidates ?? 0, change: stats?.candidatesChange, icon: '👤', color: 'violet' },
        { label: 'Active Jobs', value: stats?.activeJobs ?? 0, change: stats?.jobsChange, icon: '💼', color: 'blue' },
        { label: 'Interviews Today', value: stats?.interviewsToday ?? 0, change: stats?.interviewsChange, icon: '🎯', color: 'amber' },
        { label: 'Offer Acceptance', value: stats?.offerAcceptanceRate ? `${stats.offerAcceptanceRate}%` : '—', change: stats?.offerChange, icon: '✅', color: 'emerald' },
    ];

    const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
        violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'group-hover:shadow-violet-500/10' },
        blue: { border: 'border-blue-500/20', bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'group-hover:shadow-blue-500/10' },
        amber: { border: 'border-amber-500/20', bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'group-hover:shadow-amber-500/10' },
        emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'group-hover:shadow-emerald-500/10' },
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative">
                    <div className="w-14 h-14 rounded-full border-4 border-slate-800">
                        <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-violet-500 animate-spin" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
                >
                    Recruiter Dashboard
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 mt-1"
                >
                    Track your candidates, jobs, and personal performance.
                </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => {
                    const c = colorMap[stat.color];
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group p-6 rounded-2xl bg-slate-900/50 border ${c.border} hover:border-opacity-60 transition-all hover:shadow-lg ${c.glow}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
                                <span className="text-xl">{stat.icon}</span>
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-bold text-white">
                                    {stat.value || '—'}
                                </span>
                                {stat.change && (
                                    <span className={`text-xs px-2 py-1 rounded-full ${c.bg} ${c.text} border ${c.border}`}>
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Candidate Pipeline Summary */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-white">Candidate Pipeline</h2>
                        <a href="/dashboard/enterprise/recruiter/candidates" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                            View All →
                        </a>
                    </div>

                    {/* Pipeline Stages */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                        {[
                            { stage: 'New', count: 0, color: 'bg-slate-600' },
                            { stage: 'Reviewing', count: 0, color: 'bg-amber-500' },
                            { stage: 'Interviewing', count: 0, color: 'bg-blue-500' },
                            { stage: 'Offer Sent', count: 0, color: 'bg-emerald-500' },
                            { stage: 'Hired', count: 0, color: 'bg-green-500' },
                        ].map((stage) => (
                            <div key={stage.stage} className="text-center p-3 bg-slate-800/30 rounded-xl">
                                <div className={`w-3 h-3 rounded-full ${stage.color} mx-auto mb-2`} />
                                <div className="text-xl font-bold text-white">{stage.count}</div>
                                <div className="text-[10px] text-slate-500 uppercase">{stage.stage}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="w-14 h-14 rounded-xl bg-slate-800/60 flex items-center justify-center mb-3">
                            <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <p className="text-slate-500 text-sm">No candidates in your pipeline yet</p>
                        <p className="text-slate-600 text-xs mt-1">Assigned candidates will appear here</p>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60"
                >
                    <h2 className="text-lg font-semibold text-white mb-6">Recent Activity</h2>

                    {activity.length > 0 ? (
                        <div className="space-y-5">
                            {activity.map((item) => (
                                <div key={item.id} className="relative pl-6 pb-2 border-l border-slate-800 last:border-0">
                                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-slate-950 bg-violet-500" />
                                    <div className="text-sm">
                                        <span className="text-slate-400">{item.action} </span>
                                        <span className="font-medium text-white">{item.target}</span>
                                    </div>
                                    <div className="text-[10px] text-slate-600 mt-1">{item.timestamp}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center mb-3">
                                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-slate-500 text-sm">No activity yet</p>
                            <p className="text-slate-600 text-xs mt-1">Your actions will appear here</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
                {[
                    { label: 'My Candidates', icon: '👥', desc: 'View and manage your candidates', href: '/dashboard/enterprise/recruiter/candidates' },
                    { label: 'My Analytics', icon: '📈', desc: 'View your performance metrics', href: '/dashboard/enterprise/recruiter/analytics' },
                ].map((action) => (
                    <motion.a
                        key={action.label}
                        href={action.href}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-5 rounded-xl bg-slate-900/30 border border-slate-800/40 hover:border-violet-500/20 transition-all group cursor-pointer"
                    >
                        <span className="text-2xl mb-3 block">{action.icon}</span>
                        <h3 className="text-white font-medium text-sm group-hover:text-violet-400 transition-colors">{action.label}</h3>
                        <p className="text-slate-500 text-xs mt-1">{action.desc}</p>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
}
