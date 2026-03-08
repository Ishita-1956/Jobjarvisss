'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionWrapper from '../SectionWrapper';

const audiences = [
    {
        id: 'individuals',
        title: 'Job Seekers',
        subtitle: 'I\'m looking for my next role',
        description: 'Let Jarvis apply to hundreds of jobs while you focus on what matters—preparing for interviews and landing your dream job.',
        href: '/individuals',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        stats: [
            { value: '10x', label: 'More Applications' },
            { value: '85%', label: 'Time Saved' },
        ],
        gradient: 'from-blue-500 via-cyan-500 to-blue-600',
        glowColor: 'blue',
        features: ['Auto-Apply Engine', 'Smart Job Matching', 'Resume Optimization'],
    },
    {
        id: 'enterprise',
        title: 'Recruiters & Agencies',
        subtitle: 'I\'m hiring talent',
        description: 'Source, screen, and manage candidates at scale with AI-powered precision. Built for teams that move fast.',
        href: '/enterprise',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        stats: [
            { value: '3x', label: 'Faster Hiring' },
            { value: '60%', label: 'Cost Reduction' },
        ],
        gradient: 'from-violet-500 via-purple-500 to-indigo-600',
        glowColor: 'violet',
        features: ['Candidate Sourcing AI', 'Bulk Processing', 'Team Collaboration'],
    },
];

export default function AudienceSelector() {
    return (
        <SectionWrapper className="relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px]" />
            </div>

            {/* Section Header */}
            <div className="text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-white/10 text-white/80 text-sm font-medium mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 animate-pulse" />
                    Choose Your Experience
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
                >
                    Where Do You{' '}
                    <span className="relative">
                        <span className="text-gradient">Stand</span>
                        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                    </span>
                    ?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
                >
                    Pick your side in the future of hiring. Whether you&apos;re seeking opportunities or building teams, Jarvis has you covered.
                </motion.p>
            </div>

            {/* Audience Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
                {audiences.map((audience, index) => (
                    <Link href={audience.href} key={audience.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative h-full"
                        >
                            {/* Card Glow Effect */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${audience.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />

                            {/* Card Container */}
                            <div className="relative h-full bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800/50 group-hover:border-white/20 overflow-hidden transition-all duration-500">
                                {/* Top Gradient Bar */}
                                <div className={`h-1.5 bg-gradient-to-r ${audience.gradient}`} />

                                {/* Card Content */}
                                <div className="p-8">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                                {audience.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-1">
                                                {audience.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm">
                                                {audience.subtitle}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div className="w-12 h-12 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                            <svg className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        {audience.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {audience.stats.map((stat) => (
                                            <div key={stat.label} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                                                <div className={`text-2xl font-bold bg-gradient-to-r ${audience.gradient} bg-clip-text text-transparent`}>
                                                    {stat.value}
                                                </div>
                                                <div className="text-slate-500 text-sm">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Features Preview */}
                                    <div className="space-y-2">
                                        {audience.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2 text-slate-400 text-sm">
                                                <svg className={`w-4 h-4 ${audience.id === 'individuals' ? 'text-blue-400' : 'text-violet-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom CTA */}
                                <div className={`px-8 py-4 bg-gradient-to-r ${audience.id === 'individuals' ? 'from-blue-500/10 to-cyan-500/10' : 'from-violet-500/10 to-purple-500/10'} border-t border-slate-800/50`}>
                                    <span className="text-white font-medium group-hover:underline">
                                        Explore {audience.id === 'individuals' ? 'for Job Seekers' : 'for Enterprise'} →
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Divider */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center mt-16"
            >
                <div className="flex items-center gap-4">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-700" />
                    <span className="text-slate-500 text-sm">or scroll to learn more</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-700" />
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
