'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Application {
    id: number;
    jobTitle: string;
    jobLink: string;
    companyName: string;
    status: 'applied' | 'viewed' | 'interview' | 'offer' | 'rejected' | 'queued';
    comment: string;
    logo: string;
}

const mockApplications: Application[] = [
    { id: 1, jobTitle: 'Senior Frontend Engineer', jobLink: 'https://stripe.com/jobs/1', companyName: 'Stripe', status: 'interview', comment: 'Waiting for round 2', logo: '💳' },
    { id: 2, jobTitle: 'Full Stack Developer', jobLink: 'https://vercel.com/jobs/2', companyName: 'Vercel', status: 'applied', comment: 'Applied via Jarvis', logo: '▲' },
    { id: 3, jobTitle: 'Software Engineer', jobLink: 'https://linear.app/jobs/3', companyName: 'Linear', status: 'viewed', comment: 'Recruiter viewed profile', logo: '📊' },
    { id: 4, jobTitle: 'Backend Engineer', jobLink: 'https://notion.so/jobs/4', companyName: 'Notion', status: 'queued', comment: 'In queue for submission', logo: '📝' },
    { id: 5, jobTitle: 'Product Engineer', jobLink: 'https://figma.com/jobs/5', companyName: 'Figma', status: 'offer', comment: 'Negotiating salary', logo: '🎨' },
    { id: 6, jobTitle: 'Frontend Developer', jobLink: 'https://discord.com/jobs/6', companyName: 'Discord', status: 'rejected', comment: 'Position closed', logo: '💬' },
];

const statusConfig = {
    queued: { label: 'Queued', color: 'bg-slate-500', text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' },
    applied: { label: 'Applied', color: 'bg-blue-500', text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    viewed: { label: 'Viewed', color: 'bg-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    interview: { label: 'Interview', color: 'bg-violet-500', text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
    offer: { label: 'Offer', color: 'bg-green-500', text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
    rejected: { label: 'Rejected', color: 'bg-red-500', text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
};

const tabs = [
    { id: 'all', label: 'All', count: 8 },
    { id: 'queued', label: 'Queued', count: 1 },
    { id: 'applied', label: 'Applied', count: 2 },
    { id: 'viewed', label: 'Viewed', count: 2 },
    { id: 'interview', label: 'Interview', count: 1 },
    { id: 'offer', label: 'Offer', count: 1 },
    { id: 'rejected', label: 'Rejected', count: 1 },
];

// Application Row Component
function ApplicationRow({ app, index }: { app: Application; index: number }) {
    const config = statusConfig[app.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="group relative bg-slate-900/20 hover:bg-slate-800/40 border-b border-slate-800/50 transition-all duration-200"
        >
            <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center px-4 py-3 sm:px-6">
                {/* Job Title */}
                <div className="col-span-3 min-w-0">
                    <h3 className="text-white text-xs sm:text-sm font-medium truncate">
                        {app.jobTitle}
                    </h3>
                </div>

                {/* Job Link */}
                <div className="col-span-2 truncate">
                    <a href={app.jobLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-[10px] sm:text-xs">
                        View Post ↗
                    </a>
                </div>

                {/* Company Name */}
                <div className="col-span-2 truncate">
                    <span className="text-slate-400 text-xs sm:text-sm">{app.companyName}</span>
                </div>

                {/* Status */}
                <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
                        {config.label}
                    </span>
                </div>

                {/* Comment */}
                <div className="col-span-2 truncate">
                    <span className="text-slate-500 text-[10px] sm:text-xs italic">{app.comment}</span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end gap-1">
                    <button className="p-1 rounded hover:bg-slate-700 transition-colors text-slate-400 hover:text-white">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button className="p-1 rounded hover:bg-slate-700 transition-colors text-slate-400 hover:text-red-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function ApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredApps = mockApplications.filter(app => {
        if (searchQuery && !app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !app.companyName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    // Stats
    const stats = {
        total: mockApplications.length,
        active: mockApplications.filter(a => !['rejected'].includes(a.status)).length,
        interviews: mockApplications.filter(a => a.status === 'interview').length,
        offers: mockApplications.filter(a => a.status === 'offer').length,
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-2"
            >
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">My Applications</h1>
                <p className="text-slate-400 text-xs sm:text-sm">Track your progress and updates.</p>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/40 backdrop-blur-md rounded-xl border border-slate-800/50 overflow-hidden"
            >
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 sm:gap-4 px-4 py-3 sm:px-6 bg-slate-800/50 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <div className="col-span-3">Job Title</div>
                    <div className="col-span-2">Job Link</div>
                    <div className="col-span-2">Company</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Comment</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                {/* Applications List */}
                <div className="divide-y divide-slate-800/30">
                    <AnimatePresence mode="popLayout">
                        {mockApplications.map((app, index) => (
                            <ApplicationRow key={app.id} app={app} index={index} />
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

        </div>
    );
}
