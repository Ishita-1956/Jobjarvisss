'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getOwnerStats, getOwnerActivityFeed, type OwnerStats, type ActivityItem } from '@/lib/enterprise-api';

export default function OwnerDashboard() {
    const [stats, setStats] = useState<OwnerStats | null>(null);
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const [s, a] = await Promise.all([getOwnerStats(), getOwnerActivityFeed()]);
            setStats(s);
            setActivity(a);
            setIsLoading(false);
        }
        load();
    }, []);

    const statCards = [
        { label: 'Total Recruiters', value: stats?.totalRecruiters ?? 0, change: stats?.recruitersChange, icon: '👥', color: 'blue' },
        { label: 'Active Jobs', value: stats?.activeJobs ?? 0, change: stats?.jobsChange, icon: '💼', color: 'violet' },
        { label: 'Total Candidates', value: stats?.totalCandidates ?? 0, change: stats?.candidatesChange, icon: '👤', color: 'cyan' },
        { label: 'Hiring Efficiency', value: stats?.hiringEfficiency ? `${stats.hiringEfficiency}%` : '—', change: stats?.efficiencyChange, icon: '📊', color: 'emerald' },
    ];

    const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
        blue: { border: 'border-blue-500/20', bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'group-hover:shadow-blue-500/10' },
        violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'group-hover:shadow-violet-500/10' },
        cyan: { border: 'border-cyan-500/20', bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'group-hover:shadow-cyan-500/10' },
        emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', text: 'text-emerald-400', glow: 'group-hover:shadow-emerald-500/10' },
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="relative">
                    <div className="w-14 h-14 rounded-full border-4 border-slate-800">
                        <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" />
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
                    Owner Overview
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 mt-1"
                >
                    Monitor your recruitment team&apos;s performance and pipeline.
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
                                <span className={`text-3xl font-bold text-white group-hover:${c.text} transition-colors`}>
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
                {/* Performance Chart Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60 min-h-[400px]"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-white">Recruitment Performance</h2>
                        <select className="bg-slate-950 border border-slate-800 text-slate-400 text-sm rounded-lg px-3 py-1 outline-none focus:border-blue-500/50">
                            <option>Last 30 Days</option>
                            <option>Last Quarter</option>
                            <option>Year to Date</option>
                        </select>
                    </div>

                    {/* Empty State for Chart */}
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-slate-400 font-medium mb-1">No Performance Data Yet</h3>
                        <p className="text-slate-600 text-sm max-w-xs">
                            Recruitment analytics will appear here once your team starts processing candidates.
                        </p>
                    </div>
                </motion.div>

                {/* Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60"
                >
                    <h2 className="text-lg font-semibold text-white mb-6">Team Activity</h2>

                    {activity.length > 0 ? (
                        <div className="space-y-6">
                            {activity.map((item) => (
                                <div key={item.id} className="relative pl-6 pb-2 border-l border-slate-800 last:border-0">
                                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-slate-950 bg-blue-500" />
                                    <div className="text-sm">
                                        <span className="font-semibold text-white">{item.user}</span>
                                        <span className="text-slate-400"> {item.action} </span>
                                        <span className="font-medium text-white">{item.target}</span>
                                    </div>
                                    {item.role && (
                                        <div className="text-xs text-slate-500 mt-1">
                                            For role: <span className="text-blue-400">{item.role}</span>
                                        </div>
                                    )}
                                    <div className="text-[10px] text-slate-600 mt-2">{item.timestamp}</div>
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
                            <p className="text-slate-600 text-xs mt-1">Team actions will appear here</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {[
                    { label: 'Add Recruiter', icon: '➕', desc: 'Invite a new team member', href: '/dashboard/enterprise/owner/recruiters' },
                    { label: 'View Candidates', icon: '👥', desc: 'Browse candidate pipeline', href: '/dashboard/enterprise/owner/candidates' },
                    { label: 'View Analytics', icon: '📈', desc: 'Review hiring metrics', href: '/dashboard/enterprise/owner/analytics' },
                    { label: 'Company Profile', icon: '🏢', desc: 'Update company info', href: '/dashboard/enterprise/owner/profile' },
                ].map((action, i) => (
                    <motion.a
                        key={action.label}
                        href={action.href}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-5 rounded-xl bg-slate-900/30 border border-slate-800/40 hover:border-blue-500/20 transition-all group cursor-pointer"
                    >
                        <span className="text-2xl mb-3 block">{action.icon}</span>
                        <h3 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">{action.label}</h3>
                        <p className="text-slate-500 text-xs mt-1">{action.desc}</p>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
}
