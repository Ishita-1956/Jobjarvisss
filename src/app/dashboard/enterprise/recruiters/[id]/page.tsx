'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Candidate {
    id: number;
    name: string;
    email: string;
    resume_path: string;
    verified: boolean;
}

interface RecruiterData {
    id: number;
    name: string;
    email: string;
}

export default function RecruiterDetailPage() {
    const params = useParams();
    const recruiterId = params.id;

    const [recruiter, setRecruiter] = useState<RecruiterData | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!recruiterId) return;

            try {
                // API: /recruiter-dashboard/<recruiter_id>
                const response = await fetch(`/recruiter-dashboard/${recruiterId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRecruiter(data.recruiter);
                    setCandidates(data.candidates || []);
                } else {
                    throw new Error("API Failed");
                }
            } catch (error) {
                console.log("Using Mock Data");
                setRecruiter({ id: Number(recruiterId), name: "Sarah Jenkins", email: "sarah.j@techcorp.com" });
                setCandidates([
                    { id: 201, name: "John Doe", email: "john.d@example.com", resume_path: "/mock/resume.pdf", verified: true },
                    { id: 202, name: "Jane Smith", email: "jane.s@example.com", resume_path: "", verified: false },
                    { id: 203, name: "Bob Wilson", email: "bob.w@example.com", resume_path: "/mock/resume2.pdf", verified: true },
                ]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [recruiterId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!recruiter) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-white mb-2">Recruiter Not Found</h2>
                <Link href="/dashboard/enterprise" className="text-violet-400 hover:text-violet-300">
                    &larr; Back to Dashboard
                </Link>
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
                    href="/dashboard/enterprise"
                    className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">{recruiter.name}</h1>
                    <p className="text-slate-400">Recruiter Details & Candidates</p>
                </div>
            </motion.div>

            {/* Candidates Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden"
            >
                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Managed Candidates</h2>
                    <span className="px-3 py-1 bg-violet-500/10 text-violet-400 text-xs font-medium rounded-full">
                        {candidates.length} Candidates
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-800/50 text-slate-200 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Resume</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {candidates.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                        No candidates assigned to this recruiter yet.
                                    </td>
                                </tr>
                            ) : (
                                candidates.map((candidate) => (
                                    <tr key={candidate.id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{candidate.name}</div>
                                            <div className="text-xs opacity-70">{candidate.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {candidate.verified ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                    Verified
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {candidate.resume_path ? (
                                                <span className="text-slate-300 flex items-center gap-1">
                                                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    Uploaded
                                                </span>
                                            ) : (
                                                <span className="text-slate-600 italic">Missing</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/dashboard/enterprise/candidates/${candidate.id}`}
                                                className="text-violet-400 hover:text-violet-300 font-medium hover:underline"
                                            >
                                                View Profile
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
