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

// Job Card Component
function JobCard({ job, index }: { job: Job; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative"
        >
            <div className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800/50 rounded-xl px-4 py-3 transition-all duration-300 hover:border-blue-500/30">
                <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform">
                        {job.logo}
                    </div>

                    {/* Title & Company */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                            {job.title}
                        </h3>
                        <p className="text-slate-400 text-xs font-medium truncate">{job.company}</p>
                    </div>

                    {/* Match & Time */}
                    <div className="flex flex-col items-end shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${job.match >= 90 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                            {job.match}% MATCH
                        </span>
                        <span className="text-slate-500 text-[11px] mt-0.5">{job.posted}</span>
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
        <div className="max-w-7xl mx-auto px-4 space-y-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-2xl font-bold text-white">Recommended Jobs</h1>
                    <p className="text-slate-400 text-sm">Based on your profile and preferences.</p>
                </div>
                <div className="hidden sm:block">
                    <Link
                        href="/dashboard/applications"
                        className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-sm text-slate-300 hover:text-white transition-colors"
                    >
                        View My Applications
                    </Link>
                </div>
            </motion.div>

            {/* Jobs list */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredJobs.map((job, index) => (
                        <JobCard key={job.id} job={job} index={index} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}