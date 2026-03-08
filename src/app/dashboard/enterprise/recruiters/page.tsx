'use client';

import { motion } from 'framer-motion';

export default function RecruitersPage() {
    // Mock Data for Recruiters
    const recruiters = [
        {
            id: 1,
            name: 'Sarah Miller',
            role: 'Senior Recruiter',
            email: 'sarah.m@enterprise.com',
            stats: { hired: 12, rejected: 45, active: 8 },
            avatar: 'SM'
        },
        {
            id: 2,
            name: 'Mike Ross',
            role: 'Technical Recruiter',
            email: 'mike.r@enterprise.com',
            stats: { hired: 8, rejected: 32, active: 12 },
            avatar: 'MR'
        },
        {
            id: 3,
            name: 'Jessica Pearson',
            role: 'Lead Headhunter',
            email: 'jessica.p@enterprise.com',
            stats: { hired: 24, rejected: 12, active: 5 },
            avatar: 'JP'
        },
        {
            id: 4,
            name: 'David Clark',
            role: 'Junior Recruiter',
            email: 'david.c@enterprise.com',
            stats: { hired: 2, rejected: 15, active: 18 },
            avatar: 'DC'
        },
        {
            id: 5,
            name: 'Rachel Zane',
            role: 'Recruiter',
            email: 'rachel.z@enterprise.com',
            stats: { hired: 6, rejected: 10, active: 10 },
            avatar: 'RZ'
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manage Recruiters</h1>
                    <p className="text-slate-400 mt-1">Overview of your recruitment team and their performance.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Recruiter
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recruiters.map((recruiter, index) => (
                    <motion.div
                        key={recruiter.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-slate-900/50 border border-slate-800/60 p-6 rounded-2xl hover:border-blue-500/30 transition-all hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.1)]"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                                    {recruiter.avatar}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                        {recruiter.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">
                                        {recruiter.role}
                                    </p>
                                </div>
                            </div>
                            <button className="text-slate-500 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-sm text-slate-400 gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {recruiter.email}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-4 border-t border-slate-800/50">
                            <div className="text-center">
                                <div className="text-xl font-bold text-white">{recruiter.stats.hired}</div>
                                <div className="text-[10px] text-slate-500 uppercase">Hired</div>
                            </div>
                            <div className="text-center border-l border-slate-800/50">
                                <div className="text-xl font-bold text-white">{recruiter.stats.active}</div>
                                <div className="text-[10px] text-slate-500 uppercase">Active</div>
                            </div>
                            <div className="text-center border-l border-slate-800/50">
                                <div className="text-xl font-bold text-white">{recruiter.stats.rejected}</div>
                                <div className="text-[10px] text-slate-500 uppercase">Rejected</div>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors">
                                View Activity
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/20">
                                Assign Job
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
