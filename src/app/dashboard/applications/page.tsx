'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Application {
    id: number;
    company: string;
    position: string;
    status: 'queued' | 'applied' | 'viewed' | 'interview' | 'offer' | 'rejected';
    appliedDate: string;
    logo: string;
    salary: string;
    location: string;
    lastActivity: string;
}

const mockApplications: Application[] = [
    { id: 1, company: 'Stripe', position: 'Senior Frontend Engineer', status: 'interview', appliedDate: '2024-02-01', logo: '💳', salary: '$180k - $250k', location: 'San Francisco, CA', lastActivity: '2h ago' },
    { id: 2, company: 'Vercel', position: 'Full Stack Developer', status: 'applied', appliedDate: '2024-02-02', logo: '▲', salary: '$140k - $200k', location: 'Remote', lastActivity: '1d ago' },
    { id: 3, company: 'Linear', position: 'Software Engineer', status: 'viewed', appliedDate: '2024-02-03', logo: '📊', salary: '$150k - $220k', location: 'Remote', lastActivity: '5h ago' },
    { id: 4, company: 'Notion', position: 'Backend Engineer', status: 'queued', appliedDate: '2024-02-04', logo: '📝', salary: '$160k - $230k', location: 'New York, NY', lastActivity: 'Just now' },
    { id: 5, company: 'Figma', position: 'Product Engineer', status: 'offer', appliedDate: '2024-01-28', logo: '🎨', salary: '$170k - $240k', location: 'San Francisco, CA', lastActivity: '3d ago' },
    { id: 6, company: 'Discord', position: 'Frontend Developer', status: 'rejected', appliedDate: '2024-01-25', logo: '💬', salary: '$130k - $180k', location: 'Remote', lastActivity: '1w ago' },
    { id: 7, company: 'Shopify', position: 'React Developer', status: 'applied', appliedDate: '2024-02-05', logo: '🛒', salary: '$120k - $170k', location: 'Remote', lastActivity: '12h ago' },
    { id: 8, company: 'Coinbase', position: 'Senior Engineer', status: 'viewed', appliedDate: '2024-02-03', logo: '🪙', salary: '$180k - $270k', location: 'Remote', lastActivity: '6h ago' },
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
            className="group relative bg-gradient-to-r from-slate-800/40 to-slate-900/40 hover:from-slate-800/60 hover:to-slate-900/60 border-b border-slate-700/30 transition-all duration-300"
        >
            <div className="flex items-center gap-4 p-4">
                {/* Company Logo */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-2xl border border-slate-600/50 flex-shrink-0 group-hover:scale-105 transition-transform">
                    {app.logo}
                </div>

                {/* Job Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors truncate">
                        {app.position}
                    </h3>
                    <p className="text-slate-400 text-sm">{app.company}</p>
                </div>

                {/* Location */}
                <div className="hidden md:block w-36">
                    <span className="text-slate-400 text-sm flex items-center gap-1.5">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span className="truncate">{app.location}</span>
                    </span>
                </div>

                {/* Salary */}
                <div className="hidden lg:block w-36">
                    <span className="text-slate-400 text-sm">{app.salary}</span>
                </div>

                {/* Status */}
                <div className="w-28">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.text} ${config.border} border`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.color}`} />
                        {config.label}
                    </span>
                </div>

                {/* Last Activity */}
                <div className="hidden sm:block w-24 text-right">
                    <span className="text-slate-500 text-xs">{app.lastActivity}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default function ApplicationsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredApps = mockApplications.filter(app => {
        if (activeTab !== 'all' && app.status !== activeTab) return false;
        if (searchQuery && !app.position.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !app.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
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
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white mb-1">Applications Tracker</h1>
                <p className="text-slate-400">Track and manage all your job applications</p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {[
                    { label: 'Total Applications', value: stats.total, icon: '📋', gradient: 'from-blue-500 to-cyan-500' },
                    { label: 'Active Applications', value: stats.active, icon: '🚀', gradient: 'from-violet-500 to-purple-500' },
                    { label: 'Interviews Scheduled', value: stats.interviews, icon: '🎯', gradient: 'from-amber-500 to-orange-500' },
                    { label: 'Offers Received', value: stats.offers, icon: '🎉', gradient: 'from-green-500 to-emerald-500' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="relative group"
                    >
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity`} />
                        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-5 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl">{stat.icon}</span>
                            </div>
                            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                {stat.value}
                            </p>
                            <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Tabs & Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden"
            >
                {/* Tabs */}
                <div className="flex items-center gap-1 p-2 border-b border-slate-700/50 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                            <span className={`relative z-10 ml-2 px-1.5 py-0.5 text-xs rounded ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                                }`}>
                                {tab.count}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Search & Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-slate-800/30">
                    <div className="relative flex-1 max-w-md">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search applications..."
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 focus:border-blue-500/50 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl text-slate-300 hover:text-white text-sm font-medium transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Export
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white text-sm font-medium shadow-lg shadow-blue-500/25 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filter
                        </button>
                    </div>
                </div>

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-800/50 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    <div className="col-span-4">Position</div>
                    <div className="col-span-2">Location</div>
                    <div className="col-span-2">Salary</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-right">Activity</div>
                    <div className="col-span-1"></div>
                </div>

                {/* Applications List */}
                <div className="divide-y divide-slate-700/30">
                    <AnimatePresence mode="popLayout">
                        {filteredApps.map((app, index) => (
                            <ApplicationRow key={app.id} app={app} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredApps.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No applications found</h3>
                        <p className="text-slate-400">Try adjusting your filters or search query</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
