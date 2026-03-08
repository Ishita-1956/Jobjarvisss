'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    match: number;
    logo: string;
    tags: string[];
    isRemote: boolean;
    description: string;
}

const mockJobs: Job[] = [
    { id: 1, title: 'Senior Frontend Engineer', company: 'Stripe', location: 'San Francisco, CA', type: 'Full-time', salary: '$180k - $250k', posted: '2d ago', match: 96, logo: '💳', tags: ['React', 'TypeScript', 'GraphQL'], isRemote: true, description: 'Build the future of online payments' },
    { id: 2, title: 'Full Stack Developer', company: 'Vercel', location: 'Remote', type: 'Full-time', salary: '$140k - $200k', posted: '1d ago', match: 94, logo: '▲', tags: ['Next.js', 'Node.js', 'Postgres'], isRemote: true, description: 'Help developers ship faster' },
    { id: 3, title: 'Software Engineer', company: 'Linear', location: 'Remote', type: 'Full-time', salary: '$150k - $220k', posted: '3d ago', match: 91, logo: '📊', tags: ['React', 'TypeScript', 'Rust'], isRemote: true, description: 'Build the best issue tracker' },
    { id: 4, title: 'Backend Engineer', company: 'Notion', location: 'New York, NY', type: 'Full-time', salary: '$160k - $230k', posted: '5d ago', match: 89, logo: '📝', tags: ['Python', 'Go', 'Kubernetes'], isRemote: false, description: 'Scale Notion to millions' },
    { id: 5, title: 'Product Engineer', company: 'Figma', location: 'San Francisco, CA', type: 'Full-time', salary: '$170k - $240k', posted: '1w ago', match: 87, logo: '🎨', tags: ['React', 'C++', 'WebGL'], isRemote: true, description: 'Shape the future of design' },
    { id: 6, title: 'Frontend Developer', company: 'Shopify', location: 'Remote', type: 'Full-time', salary: '$130k - $180k', posted: '4d ago', match: 85, logo: '🛒', tags: ['React', 'Ruby', 'GraphQL'], isRemote: true, description: 'Empower entrepreneurs worldwide' },
    { id: 7, title: 'Senior Software Engineer', company: 'Coinbase', location: 'Remote', type: 'Full-time', salary: '$180k - $270k', posted: '2d ago', match: 83, logo: '🪙', tags: ['Go', 'React', 'Blockchain'], isRemote: true, description: 'Build the cryptoeconomy' },
    { id: 8, title: 'Staff Engineer', company: 'Airbnb', location: 'San Francisco, CA', type: 'Full-time', salary: '$200k - $300k', posted: '6d ago', match: 80, logo: '🏠', tags: ['React', 'Java', 'Kafka'], isRemote: false, description: 'Create a world of belonging' },
];

const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Staff+'];

// Job Card Component
function JobCard({ job, index }: { job: Job; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative"
        >
            {/* Glow effect */}
            <motion.div
                animate={{ opacity: isHovered ? 0.5 : 0 }}
                className={`absolute -inset-1 rounded-2xl blur-xl transition-all duration-500 ${job.match >= 90 ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30' :
                        job.match >= 80 ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30' :
                            'bg-gradient-to-r from-slate-500/20 to-slate-600/20'
                    }`}
            />

            {/* Card */}
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
                {/* Match badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${job.match >= 90 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        job.match >= 80 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                    {job.match}% Match
                </div>

                {/* Save button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSaved(!isSaved)}
                    className="absolute top-4 right-28 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                >
                    <svg
                        className={`w-4 h-4 transition-colors ${isSaved ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </motion.button>

                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-2xl border border-slate-600/50 flex-shrink-0 group-hover:scale-105 transition-transform">
                            {job.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate pr-24">
                                {job.title}
                            </h3>
                            <p className="text-slate-400 text-sm">{job.company}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{job.description}</p>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                        <span className="flex items-center gap-1.5 text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {job.salary}
                        </span>
                        {job.isRemote && (
                            <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-xs font-medium">
                                Remote
                            </span>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 rounded-lg bg-slate-700/50 text-slate-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 transition-colors cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <span className="text-slate-500 text-xs">{job.posted}</span>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg text-white text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all"
                        >
                            Quick Apply
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [remoteOnly, setRemoteOnly] = useState(false);
    const [sortBy, setSortBy] = useState('match');

    const filteredJobs = mockJobs
        .filter(job => {
            if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !job.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (selectedType !== 'All' && job.type !== selectedType) return false;
            if (remoteOnly && !job.isRemote) return false;
            return true;
        })
        .sort((a, b) => {
            if (sortBy === 'match') return b.match - a.match;
            if (sortBy === 'recent') return 0; // Would sort by date
            return 0;
        });

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Find Your Dream Job</h1>
                    <p className="text-slate-400">AI-matched opportunities tailored for you</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">{filteredJobs.length} jobs found</span>
                    <Link
                        href="/dashboard/applications"
                        className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-sm text-slate-300 hover:text-white transition-colors"
                    >
                        View Applications
                    </Link>
                </div>
            </motion.div>

            {/* Filters Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4"
            >
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search jobs, companies, or keywords..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 focus:border-blue-500/50 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {jobTypes.map((type) => (
                            <motion.button
                                key={type}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedType === type
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                        : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700'
                                    }`}
                            >
                                {type}
                            </motion.button>
                        ))}
                    </div>

                    {/* Remote Toggle */}
                    <button
                        onClick={() => setRemoteOnly(!remoteOnly)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${remoteOnly
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-slate-700/50 text-slate-400 hover:text-white border border-transparent'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Remote Only
                    </button>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-slate-700/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer"
                    >
                        <option value="match">Best Match</option>
                        <option value="recent">Most Recent</option>
                        <option value="salary">Highest Salary</option>
                    </select>
                </div>
            </motion.div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredJobs.map((job, index) => (
                        <JobCard key={job.id} job={job} index={index} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredJobs.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
                    <p className="text-slate-400">Try adjusting your filters or search query</p>
                </motion.div>
            )}

            {/* Load More */}
            {filteredJobs.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center pt-8"
                >
                    <button className="px-8 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-blue-500/30 rounded-xl text-white font-medium transition-all">
                        Load More Jobs
                    </button>
                </motion.div>
            )}
        </div>
    );
}
