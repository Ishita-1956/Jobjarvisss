'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Application {
    id: number;
    jobTitle: string;
    jobLink: string;
    companyName: string;
    status: 'applied' | 'viewed' | 'interview' | 'offer' | 'rejected' | 'queued' | 'skipped' | 'selected' | 'failed' | 'expired';
    comment: string;
    logo: string;
}

const mockApplications: Application[] = [
    { id: 1, jobTitle: 'Senior Frontend Engineer', jobLink: 'https://stripe.com/jobs/1', companyName: 'Stripe', status: 'interview', comment: 'Waiting for round 2', logo: '💳' },
    { id: 2, jobTitle: 'Full Stack Developer', jobLink: 'https://vercel.com/jobs/2', companyName: 'Vercel', status: 'applied', comment: 'Applied via Job Jarvis', logo: '▲' },
    { id: 3, jobTitle: 'Software Engineer', jobLink: 'https://linear.app/jobs/3', companyName: 'Linear', status: 'viewed', comment: 'Recruiter viewed profile', logo: '📊' },
    { id: 4, jobTitle: 'Backend Engineer', jobLink: 'https://notion.so/jobs/4', companyName: 'Notion', status: 'queued', comment: 'In queue for submission', logo: '📝' },
    { id: 5, jobTitle: 'Product Engineer', jobLink: 'https://figma.com/jobs/5', companyName: 'Figma', status: 'offer', comment: 'Negotiating salary', logo: '🎨' },
    { id: 6, jobTitle: 'Frontend Developer', jobLink: 'https://discord.com/jobs/6', companyName: 'Discord', status: 'rejected', comment: 'Position closed', logo: '💬' },
    { id: 7, jobTitle: 'React Developer', jobLink: 'https://shopify.com/jobs/7', companyName: 'Shopify', status: 'queued', comment: 'Resume optimized', logo: '🛒' },
    { id: 8, jobTitle: 'Staff Engineer', jobLink: 'https://meta.com/jobs/8', companyName: 'Meta', status: 'applied', comment: 'Applied 3 days ago', logo: '📱' },
    { id: 9, jobTitle: 'DevOps Engineer', jobLink: 'https://github.com/jobs/9', companyName: 'GitHub', status: 'selected', comment: 'Moving to final round', logo: '🐙' },
    { id: 10, jobTitle: 'Platform Engineer', jobLink: 'https://aws.com/jobs/10', companyName: 'AWS', status: 'queued', comment: 'In review queue', logo: '☁️' },
];

const statusConfig: Record<string, { label: string; text: string; bg: string; border: string }> = {
    queued: { label: 'Queued', text: 'text-slate-300', bg: 'bg-slate-500/10', border: 'border-slate-500/30' },
    applied: { label: 'Applied', text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    viewed: { label: 'Viewed', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    interview: { label: 'Interview', text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
    offer: { label: 'Offer', text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
    rejected: { label: 'Rejected', text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    skipped: { label: 'Skipped', text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
    selected: { label: 'Selected', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    failed: { label: 'Failed', text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
    expired: { label: 'Expired', text: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/30' },
};

const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'queued', label: 'Queued' },
    { id: 'applied', label: 'Applied' },
    { id: 'skipped', label: 'Skipped' },
    { id: 'selected', label: 'Selected' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'failed', label: 'Failed' },
    { id: 'expired', label: 'Expired' },
];

function ApplicationRow({ app, index }: { app: Application; index: number }) {
    const config = statusConfig[app.status] || statusConfig.queued;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="group relative bg-slate-900/20 hover:bg-slate-800/40 border-b border-slate-800/50 transition-all duration-200"
        >
            <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center px-4 py-3 sm:px-6">
                <div className="col-span-3 min-w-0">
                    <h3 className="text-white text-[11px] sm:text-xs font-medium truncate">
                        {app.jobTitle}
                    </h3>
                </div>
                <div className="col-span-2 truncate">
                    <a href={app.jobLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-[10px] sm:text-xs">
                        View Post ↗
                    </a>
                </div>
                <div className="col-span-2 truncate">
                    <span className="text-slate-400 text-xs sm:text-sm">{app.companyName}</span>
                </div>
                <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${config.bg} ${config.text} border ${config.border}`}>
                        {config.label}
                    </span>
                </div>
                <div className="col-span-2 truncate">
                    <span className="text-slate-500 text-[10px] sm:text-xs italic">{app.comment}</span>
                </div>
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
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredApps = mockApplications.filter(app => {
        if (searchQuery && !app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !app.companyName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (activeFilter !== 'all' && app.status !== activeFilter) return false;
        return true;
    });

    const getCount = (status: string) =>
        status === 'all' ? mockApplications.length : mockApplications.filter(a => a.status === status).length;

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

            {/* ═══════════════════ TOOLBAR BAR ═══════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-3"
            >
                {/* Top row: actions + search */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                        {/* Download CSV */}
                        <button className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download CSV
                        </button>
                        {/* Download Excel */}
                        <button className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Excel
                        </button>
                        {/* Date Range */}
                        <div className="relative">
                            <select className="appearance-none px-3 py-1.5 pr-7 rounded-lg text-[11px] font-semibold bg-slate-800/80 text-slate-300 border border-slate-600/50 hover:border-slate-500 transition-all cursor-pointer focus:outline-none focus:border-blue-500/50">
                                <option>Last 30 Days</option>
                                <option>Last 7 Days</option>
                                <option>Last 90 Days</option>
                                <option>All Time</option>
                            </select>
                            <svg className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search applications..."
                            className="w-48 sm:w-56 px-3 py-1.5 pl-8 rounded-lg text-[11px] bg-slate-800/80 text-slate-200 border border-slate-600/50 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        />
                        <svg className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Filter pills row */}
                <div className="flex items-center gap-1.5 flex-wrap">
                    {filterTabs.map((tab) => {
                        const count = getCount(tab.id);
                        const isActive = activeFilter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all border ${
                                    isActive
                                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                                        : 'bg-slate-800/60 text-slate-400 border-slate-700/40 hover:border-slate-600 hover:text-slate-300'
                                }`}
                            >
                                {tab.label}
                                <span className={`ml-1 text-[9px] font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                                    ({count})
                                </span>
                            </button>
                        );
                    })}
                </div>
            </motion.div>

            {/* ═══════════════════ TABLE ═══════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/40 backdrop-blur-md rounded-xl border border-slate-800/50 overflow-hidden"
            >
                <div className="grid grid-cols-12 gap-2 sm:gap-4 px-4 py-3 sm:px-6 bg-slate-800/50 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <div className="col-span-3">Job Title</div>
                    <div className="col-span-2">Job Link</div>
                    <div className="col-span-2">Company</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Comment</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-slate-800/30">
                    <AnimatePresence mode="popLayout">
                        {filteredApps.map((app, index) => (
                            <ApplicationRow key={app.id} app={app} index={index} />
                        ))}
                    </AnimatePresence>
                    {filteredApps.length === 0 && (
                        <div className="px-6 py-8 text-center text-slate-500 text-sm">
                            No applications found for this filter.
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
