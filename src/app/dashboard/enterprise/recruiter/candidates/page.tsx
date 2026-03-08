'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getRecruiterCandidates, type Candidate } from '@/lib/enterprise-api';

type StatusFilter = 'All' | 'New' | 'Reviewing' | 'Interviewing' | 'Offer Sent' | 'Hired' | 'Rejected';

export default function RecruiterCandidatesPage() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

    useEffect(() => {
        async function load() {
            const data = await getRecruiterCandidates();
            setCandidates(data);
            setIsLoading(false);
        }
        load();
    }, []);

    const statuses: StatusFilter[] = ['All', 'New', 'Reviewing', 'Interviewing', 'Offer Sent', 'Hired', 'Rejected'];

    const filtered = candidates.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Offer Sent': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'Interviewing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Hired': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'Reviewing': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            default: return 'bg-slate-700/50 text-slate-300 border-slate-600/50';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
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
                        My Candidates
                    </motion.h1>
                    <p className="text-slate-400 mt-1">Manage your assigned candidates and track their progress.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500/50 transition-colors w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${statusFilter === status
                                ? 'bg-violet-500/20 text-violet-400 border-violet-500/30'
                                : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700'
                            }`}
                    >
                        {status}
                        {status !== 'All' && (
                            <span className="ml-1.5 opacity-60">
                                {candidates.filter(c => c.status === status).length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Card Grid or Empty State */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((candidate, index) => (
                        <motion.div
                            key={candidate.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group bg-slate-900/50 border border-slate-800/60 rounded-2xl p-5 hover:border-violet-500/30 transition-all hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.1)]"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                        {candidate.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold group-hover:text-violet-400 transition-colors">
                                            {candidate.name}
                                        </h3>
                                        <p className="text-xs text-slate-500">{candidate.title}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(candidate.status)}`}>
                                    {candidate.status}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4 text-sm">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="truncate text-xs">{candidate.email}</span>
                                </div>
                                {candidate.matchScore > 0 && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${candidate.matchScore > 90 ? 'bg-emerald-500' : candidate.matchScore > 70 ? 'bg-blue-500' : 'bg-amber-500'}`}
                                                style={{ width: `${candidate.matchScore}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-white">{candidate.matchScore}%</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 pt-3 border-t border-slate-800/40">
                                <Link
                                    href={`/dashboard/enterprise/recruiter/candidates/${candidate.id}`}
                                    className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors text-center"
                                >
                                    View Profile
                                </Link>
                                <Link
                                    href={`/dashboard/enterprise/recruiter/candidates/${candidate.id}?edit=true`}
                                    className="flex-1 py-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors border border-violet-500/20 text-center"
                                >
                                    Edit Profile
                                </Link>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">No Candidates Assigned</h2>
                    <p className="text-slate-500 text-sm max-w-sm">
                        Candidates will appear here once they are assigned to you by the owner.
                    </p>
                </motion.div>
            )}
        </div>
    );
}
