'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllCandidates, type Candidate } from '@/lib/enterprise-api';

type StatusFilter = 'All' | 'New' | 'Reviewing' | 'Interviewing' | 'Offer Sent' | 'Hired' | 'Rejected';

export default function OwnerCandidatesPage() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

    useEffect(() => {
        async function load() {
            const data = await getAllCandidates();
            setCandidates(data);
            setIsLoading(false);
        }
        load();
    }, []);

    const statuses: StatusFilter[] = ['All', 'New', 'Reviewing', 'Interviewing', 'Offer Sent', 'Hired', 'Rejected'];

    const filtered = candidates.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase());
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
                        Candidates Pipeline
                    </motion.h1>
                    <p className="text-slate-400 mt-1">Track candidates across all active job postings.</p>
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
                            className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 transition-colors w-64"
                        />
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20 text-sm">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${statusFilter === status
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
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

            {/* Table or Empty State */}
            {filtered.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/50 border border-slate-800/60 rounded-2xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900/80 border-b border-slate-800/80 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                    <th className="px-6 py-4">Candidate</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Recruiter</th>
                                    <th className="px-6 py-4">Match</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Applied</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {filtered.map((candidate, index) => (
                                    <motion.tr
                                        key={candidate.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="group hover:bg-slate-800/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white group-hover:text-blue-400 transition-colors">{candidate.name}</div>
                                            <div className="text-xs text-slate-500">{candidate.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300 text-sm">{candidate.title}</td>
                                        <td className="px-6 py-4">
                                            {candidate.recruiterName ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold">
                                                        {candidate.recruiterName.charAt(0)}
                                                    </div>
                                                    <span className="text-sm text-slate-400">{candidate.recruiterName}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-slate-600">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-14 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${candidate.matchScore > 90 ? 'bg-emerald-500' : candidate.matchScore > 70 ? 'bg-blue-500' : 'bg-amber-500'}`}
                                                        style={{ width: `${candidate.matchScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-white">{candidate.matchScore}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                                                {candidate.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{candidate.appliedDate}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/dashboard/enterprise/owner/candidates/${candidate.id}`}
                                                className="text-blue-400 hover:text-blue-300 text-xs font-medium hover:underline"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
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
                    <h2 className="text-xl font-semibold text-white mb-2">No Candidates in Pipeline</h2>
                    <p className="text-slate-500 text-sm max-w-sm">
                        Candidates will appear here once your recruiters start processing applications.
                    </p>
                </motion.div>
            )}
        </div>
    );
}
