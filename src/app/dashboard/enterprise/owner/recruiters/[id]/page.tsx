'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getRecruiterById, getCandidatesByRecruiter, type Recruiter, type Candidate } from '@/lib/enterprise-api';

export default function OwnerRecruiterDetailPage() {
    const params = useParams();
    const recruiterId = Number(params.id);

    const [recruiter, setRecruiter] = useState<Recruiter | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const [r, c] = await Promise.all([
                getRecruiterById(recruiterId),
                getCandidatesByRecruiter(recruiterId),
            ]);
            setRecruiter(r);
            setCandidates(c);
            setIsLoading(false);
        }
        load();
    }, [recruiterId]);

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
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <Link
                    href="/dashboard/enterprise/owner/recruiters"
                    className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {recruiter?.name || 'Recruiter Details'}
                    </h1>
                    <p className="text-slate-400">
                        {recruiter?.email || 'Recruiter profile and assigned candidates'}
                    </p>
                </div>
            </motion.div>

            {recruiter ? (
                <>
                    {/* Recruiter Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-blue-500/20">
                                {recruiter.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white">{recruiter.name}</h2>
                                <p className="text-blue-400 font-medium">{recruiter.role}</p>
                                <p className="text-slate-400 text-sm mt-1">{recruiter.email}</p>
                                {recruiter.phone && (
                                    <p className="text-slate-400 text-sm">{recruiter.phone}</p>
                                )}
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[
                                    { label: 'Hired', value: recruiter.stats.hired, color: 'text-emerald-400' },
                                    { label: 'Active', value: recruiter.stats.active, color: 'text-blue-400' },
                                    { label: 'Interviews', value: recruiter.stats.interviewing, color: 'text-amber-400' },
                                    { label: 'Rejected', value: recruiter.stats.rejected, color: 'text-red-400' },
                                ].map(s => (
                                    <div key={s.label} className="text-center px-4 py-3 bg-slate-800/40 rounded-xl">
                                        <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                                        <div className="text-[10px] text-slate-500 uppercase mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Candidates Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900/50 border border-slate-800/60 rounded-2xl overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Assigned Candidates</h2>
                            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20">
                                {candidates.length} Candidates
                            </span>
                        </div>

                        {candidates.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-800/30 text-slate-500 uppercase text-xs font-semibold">
                                        <tr>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Title</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Match</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50">
                                        {candidates.map(c => (
                                            <tr key={c.id} className="hover:bg-slate-800/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-white">{c.name}</div>
                                                    <div className="text-xs text-slate-500">{c.email}</div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-300">{c.title}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(c.status)}`}>
                                                        {c.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-14 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${c.matchScore > 90 ? 'bg-emerald-500' : c.matchScore > 70 ? 'bg-blue-500' : 'bg-amber-500'}`}
                                                                style={{ width: `${c.matchScore}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-xs font-bold text-white">{c.matchScore}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={`/dashboard/enterprise/owner/candidates/${c.id}`}
                                                        className="text-blue-400 hover:text-blue-300 font-medium text-xs hover:underline"
                                                    >
                                                        View Profile
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-14 h-14 rounded-xl bg-slate-800/80 flex items-center justify-center mb-4">
                                    <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-white font-medium mb-1">No Candidates Assigned</h3>
                                <p className="text-slate-500 text-sm">This recruiter hasn&apos;t been assigned any candidates yet.</p>
                            </div>
                        )}
                    </motion.div>
                </>
            ) : (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-white mb-2">Recruiter Not Found</h2>
                    <p className="text-slate-500 mb-4">The recruiter profile could not be loaded.</p>
                    <Link href="/dashboard/enterprise/owner/recruiters" className="text-blue-400 hover:text-blue-300">
                        &larr; Back to Recruiters
                    </Link>
                </div>
            )}
        </div>
    );
}
