'use client';

import { motion } from 'framer-motion';

export default function CandidatesPage() {
    // Mock Data for Candidates
    const candidates = [
        {
            id: 1,
            name: 'John Doe',
            role: 'Senior React Developer',
            status: 'Interviewing',
            recruiter: 'Sarah Miller',
            applied: '2 days ago',
            match: '95%'
        },
        {
            id: 2,
            name: 'Jane Smith',
            role: 'Product Manager',
            status: 'Reviewing',
            recruiter: 'Mike Ross',
            applied: '1 day ago',
            match: '88%'
        },
        {
            id: 3,
            name: 'Alex Brown',
            role: 'Backend Engineer',
            status: 'Rejected',
            recruiter: 'David Clark',
            applied: '5 days ago',
            match: '45%'
        },
        {
            id: 4,
            name: 'Emily Davis',
            role: 'UX Designer',
            status: 'Offer Sent',
            recruiter: 'Jessica Pearson',
            applied: '1 week ago',
            match: '98%'
        },
        {
            id: 5,
            name: 'Michael Wilson',
            role: 'DevOps Engineer',
            status: 'New',
            recruiter: 'Sarah Miller',
            applied: '3 hours ago',
            match: '92%'
        },
        {
            id: 6,
            name: 'Lisa Anderson',
            role: 'Frontend Developer',
            status: 'Interviewing',
            recruiter: 'Mike Ross',
            applied: '4 hours ago',
            match: '85%'
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Offer Sent': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'Interviewing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Reviewing': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            default: return 'bg-slate-700/50 text-slate-300 border-slate-600/50';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Candidates Pipeline</h1>
                    <p className="text-slate-400 mt-1">Track candidates across all active job postings.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700">
                        Filter
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Candidate Table */}
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
                                <th className="px-6 py-4">Match Score</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Applied</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {candidates.map((candidate, index) => (
                                <motion.tr
                                    key={candidate.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group hover:bg-slate-800/30 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white group-hover:text-blue-400 transition-colors">{candidate.name}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">{candidate.role}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center font-bold">
                                                {candidate.recruiter.charAt(0)}
                                            </div>
                                            <span className="text-sm text-slate-400">{candidate.recruiter}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${parseInt(candidate.match) > 90 ? 'bg-emerald-500' :
                                                            parseInt(candidate.match) > 70 ? 'bg-blue-500' : 'bg-amber-500'
                                                        }`}
                                                    style={{ width: candidate.match }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-white">{candidate.match}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                                            {candidate.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{candidate.applied}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                            </svg>
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Mock) */}
                <div className="px-6 py-4 border-t border-slate-800/80 flex items-center justify-between text-sm text-slate-500">
                    <div>Showing 1-6 of 24 candidates</div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 hover:text-white transition-colors">Next</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
