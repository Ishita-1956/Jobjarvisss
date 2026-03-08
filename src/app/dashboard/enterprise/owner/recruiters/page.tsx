'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getRecruiters, type Recruiter } from '@/lib/enterprise-api';

export default function OwnerRecruitersPage() {
    const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function load() {
            const data = await getRecruiters();
            setRecruiters(data);
            setIsLoading(false);
        }
        load();
    }, []);

    const filtered = recruiters.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-white"
                    >
                        Manage Recruiters
                    </motion.h1>
                    <p className="text-slate-400 mt-1">Overview of your recruitment team and their performance.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search recruiters..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 transition-colors w-64"
                        />
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Recruiter
                    </button>
                </div>
            </div>

            {/* Recruiters Grid or Empty State */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((recruiter, index) => (
                        <motion.div
                            key={recruiter.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className="group relative bg-slate-900/50 border border-slate-800/60 p-6 rounded-2xl hover:border-blue-500/30 transition-all hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.1)]"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 text-sm">
                                        {recruiter.name.split(' ').map(n => n[0]).join('').toUpperCase()}
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
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-slate-400 gap-2">
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="truncate">{recruiter.email}</span>
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
                                    <div className="text-xl font-bold text-white">{recruiter.stats.interviewing}</div>
                                    <div className="text-[10px] text-slate-500 uppercase">Interviews</div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Link
                                    href={`/dashboard/enterprise/owner/recruiters/${recruiter.id}`}
                                    className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors text-center"
                                >
                                    View Details
                                </Link>
                                <button className="flex-1 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/20">
                                    Assign Job
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <div className="w-20 h-20 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">No Recruiters Yet</h2>
                    <p className="text-slate-500 text-sm max-w-sm mb-6">
                        Start building your recruitment team by adding your first recruiter.
                    </p>
                    <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add First Recruiter
                    </button>
                </motion.div>
            )}
        </div>
    );
}
