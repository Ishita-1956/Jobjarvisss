'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Animated Number Counter
function AnimatedCounter({ value, duration = 1500 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const steps = 30;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}</span>;
}

// Progress Ring Component
function ProgressRing({ progress, size = 120, strokeWidth = 8 }: { progress: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg className="transform -rotate-90" width={size} height={size}>
            <circle
                className="text-slate-700"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-blue-500"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                stroke="url(#gradient)"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{ strokeDasharray: circumference }}
            />
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// Stat Card
function StatCard({
    title,
    value,
    change,
    icon,
    gradient,
    delay
}: {
    title: string;
    value: number;
    change: { value: number; isPositive: boolean };
    icon: string;
    gradient: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="relative group"
        >
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity`} />
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{icon}</span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${change.isPositive ? 'text-green-400' : 'text-red-400'
                        }`}>
                        <svg className={`w-4 h-4 ${change.isPositive ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        {change.value}%
                    </span>
                </div>
                <p className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-1`}>
                    <AnimatedCounter value={value} />
                </p>
                <p className="text-slate-400 text-sm">{title}</p>
            </div>
        </motion.div>
    );
}

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('month');

    const stats = [
        { title: 'Applications Sent', value: 127, change: { value: 23, isPositive: true }, icon: '🚀', gradient: 'from-blue-500 to-cyan-500' },
        { title: 'Profile Views', value: 842, change: { value: 12, isPositive: true }, icon: '👀', gradient: 'from-violet-500 to-purple-500' },
        { title: 'Interview Invites', value: 18, change: { value: 45, isPositive: true }, icon: '🎯', gradient: 'from-amber-500 to-orange-500' },
        { title: 'Response Rate', value: 34, change: { value: 8, isPositive: true }, icon: '📊', gradient: 'from-green-500 to-emerald-500' },
    ];

    const weeklyData = [
        { day: 'Mon', applications: 8, views: 45 },
        { day: 'Tue', applications: 12, views: 62 },
        { day: 'Wed', applications: 6, views: 38 },
        { day: 'Thu', applications: 15, views: 78 },
        { day: 'Fri', applications: 9, views: 55 },
        { day: 'Sat', applications: 4, views: 22 },
        { day: 'Sun', applications: 2, views: 15 },
    ];

    const maxApplications = Math.max(...weeklyData.map(d => d.applications));

    const topSkills = [
        { skill: 'React', demand: 94, color: 'from-blue-500 to-cyan-500' },
        { skill: 'TypeScript', demand: 89, color: 'from-blue-600 to-blue-400' },
        { skill: 'Node.js', demand: 76, color: 'from-green-500 to-emerald-500' },
        { skill: 'Python', demand: 71, color: 'from-amber-500 to-yellow-500' },
        { skill: 'GraphQL', demand: 65, color: 'from-pink-500 to-rose-500' },
    ];

    const recentActivity = [
        { icon: '✅', title: 'Application sent to Stripe', time: '2 hours ago', color: 'bg-green-500/20' },
        { icon: '👀', title: 'Netflix viewed your profile', time: '5 hours ago', color: 'bg-blue-500/20' },
        { icon: '📅', title: 'Interview scheduled with Linear', time: '1 day ago', color: 'bg-violet-500/20' },
        { icon: '⭐', title: 'Saved by a recruiter at Meta', time: '2 days ago', color: 'bg-amber-500/20' },
        { icon: '📧', title: 'Message from Vercel HR', time: '3 days ago', color: 'bg-cyan-500/20' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Analytics Dashboard</h1>
                    <p className="text-slate-400">Track your job search performance</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-xl">
                    {['week', 'month', 'year'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${timeRange === range
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <StatCard key={stat.title} {...stat} delay={0.1 + index * 0.1} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Activity Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Weekly Activity</h2>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-2 text-slate-400">
                                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                                Applications
                            </span>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="flex items-end justify-between h-48 gap-4">
                        {weeklyData.map((data, index) => (
                            <motion.div
                                key={data.day}
                                initial={{ height: 0 }}
                                animate={{ height: `${(data.applications / maxApplications) * 100}%` }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                className="flex-1 flex flex-col items-center gap-2"
                            >
                                <div className="relative w-full group">
                                    <div className="absolute -inset-1 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-lg blur-sm opacity-0 group-hover:opacity-50 transition-opacity" />
                                    <div
                                        className="relative w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-lg transition-all duration-300"
                                        style={{ height: `${Math.max((data.applications / maxApplications) * 150, 20)}px` }}
                                    >
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                            {data.applications}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-500">
                        {weeklyData.map((data) => (
                            <span key={data.day} className="flex-1 text-center">{data.day}</span>
                        ))}
                    </div>
                </motion.div>

                {/* Profile Completion */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Profile Strength</h2>

                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <ProgressRing progress={78} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">78%</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mt-4 text-center">Your profile is in the top 15%</p>

                        <Link
                            href="/dashboard/profile"
                            className="mt-6 w-full py-3 text-center bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/30 rounded-xl text-blue-400 font-medium transition-all"
                        >
                            Improve Profile
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Skills in Demand */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Your Skills vs Market Demand</h2>

                    <div className="space-y-4">
                        {topSkills.map((item, index) => (
                            <motion.div
                                key={item.skill}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-medium">{item.skill}</span>
                                    <span className="text-slate-400 text-sm">{item.demand}%</span>
                                </div>
                                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.demand}%` }}
                                        transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>

                    <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800/30 transition-colors"
                            >
                                <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center text-lg flex-shrink-0`}>
                                    {activity.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate">{activity.title}</p>
                                    <p className="text-slate-500 text-xs">{activity.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
