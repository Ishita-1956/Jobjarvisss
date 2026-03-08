'use client';

import { motion } from 'framer-motion';

export default function RecruiterAnalyticsPage() {
    const stats = [
        { label: 'Candidates Added', value: '—', icon: '👤' },
        { label: 'Screened', value: '—', icon: '🔍' },
        { label: 'Interviews Set', value: '—', icon: '📅' },
        { label: 'Offers Extended', value: '—', icon: '📨' },
        { label: 'Hires Made', value: '—', icon: '✅' },
        { label: 'Avg. Days to Hire', value: '—', icon: '⏱️' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-white">
                    My Analytics
                </motion.h1>
                <p className="text-slate-400 mt-1">Your personal recruitment performance metrics.</p>
            </div>

            {/* Time Range */}
            <div className="flex gap-2">
                {['Last 7 Days', 'Last 30 Days', 'Last Quarter'].map((range, i) => (
                    <button key={range} className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${i === 1 ? 'bg-violet-500/20 text-violet-400 border-violet-500/30' : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700'}`}>
                        {range}
                    </button>
                ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 text-center hover:border-violet-500/20 transition-colors">
                        <span className="text-2xl block mb-2">{stat.icon}</span>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Pipeline Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-violet-500 rounded-full" />
                    My Pipeline
                </h3>
                <div className="grid grid-cols-5 gap-3">
                    {[
                        { stage: 'New', count: '—', color: 'bg-slate-600' },
                        { stage: 'Screening', count: '—', color: 'bg-violet-500' },
                        { stage: 'Interview', count: '—', color: 'bg-blue-500' },
                        { stage: 'Offer', count: '—', color: 'bg-amber-500' },
                        { stage: 'Hired', count: '—', color: 'bg-emerald-500' },
                    ].map((item) => (
                        <div key={item.stage} className="text-center">
                            <div className={`h-2 ${item.color} rounded-full mb-3 opacity-60`} />
                            <div className="text-xl font-bold text-white">{item.count}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{item.stage}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/60">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-cyan-500 rounded-full" />
                    Activity Log
                </h3>
                <div className="text-center py-8">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-slate-800/60 flex items-center justify-center mb-3">
                        <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-slate-500 text-sm">No activity yet</p>
                    <p className="text-slate-600 text-xs mt-1">Your actions will be logged here</p>
                </div>
            </motion.div>
        </div>
    );
}
