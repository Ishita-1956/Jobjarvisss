'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface WhereYouStandModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const audiences = [
    {
        id: 'individuals',
        title: 'Individual Power',
        subtitle: "I'm looking for my next role",
        description: 'Your personal Mission Control center. Let Jarvis apply to hundreds of jobs while you focus on interviews and landing your dream role.',
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
        bgGradient: 'from-blue-500/10 to-cyan-500/10',
        borderColor: 'border-blue-500/30',
        hoverBorder: 'hover:border-blue-400/60',
        features: ['Auto-Apply Engine', 'Smart Job Matching', 'Live Analytics Dashboard'],
    },
    {
        id: 'enterprise',
        title: 'Enterprise Suite',
        subtitle: "I manage bench consultants and market them for relevant opportunities.",
        description: 'Your Command Center for talent. Source, screen, and manage candidates at scale with AI-powered precision.',
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
        gradient: 'from-violet-500 via-purple-500 to-amber-500',
        bgGradient: 'from-violet-500/10 to-amber-500/10',
        borderColor: 'border-violet-500/30',
        hoverBorder: 'hover:border-violet-400/60',
        features: ['Candidate Hub', 'Bulk Activation', 'Team Collaboration'],
    },
];

export default function WhereYouStandModal({ isOpen, onClose }: WhereYouStandModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="relative w-full max-w-4xl pointer-events-auto">
                            {/* Modal Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-amber-500/20 rounded-3xl blur-3xl" />

                            {/* Modal Content */}
                            <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/80 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                {/* Header */}
                                <div className="text-center pt-10 pb-6 px-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-white/10 text-white/80 text-sm font-medium mb-4"
                                    >
                                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 animate-pulse" />
                                        Choose Your Path
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        className="text-3xl sm:text-4xl font-bold text-white mb-3"
                                    >
                                        Where Do You{' '}
                                        <span className="relative">
                                            <span className="text-gradient">Stand</span>
                                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
                                        </span>
                                        ?
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-slate-400 text-lg max-w-xl mx-auto"
                                    >
                                        <span className="text-white font-semibold">One engine. Two ways to win.</span>
                                        <br />
                                        Pick your side in the future of hiring.
                                    </motion.p>
                                </div>

                                {/* Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 pt-2">
                                    {audiences.map((audience, index) => (
                                        <Link href={audience.href} key={audience.id} onClick={onClose}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.25 + index * 0.1 }}
                                                whileHover={{ y: -4, scale: 1.02 }}
                                                className="group relative h-full cursor-pointer"
                                            >
                                                {/* Card Glow */}
                                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${audience.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500`} />

                                                {/* Card */}
                                                <div className={`relative h-full bg-slate-800/80 backdrop-blur-sm rounded-2xl border ${audience.borderColor} ${audience.hoverBorder} overflow-hidden transition-all duration-300`}>
                                                    {/* Top Gradient */}
                                                    <div className={`h-1 bg-gradient-to-r ${audience.gradient}`} />

                                                    <div className="p-6">
                                                        {/* Header */}
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div>
                                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                                                    {audience.icon}
                                                                </div>
                                                                <h3 className="text-xl font-bold text-white mb-1">
                                                                    {audience.title}
                                                                </h3>
                                                                <p className="text-slate-400 text-sm">
                                                                    {audience.subtitle}
                                                                </p>
                                                            </div>
                                                            <div className="w-10 h-10 rounded-full bg-slate-700/50 border border-slate-600/50 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                                                <svg className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                        {/* Description */}
                                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                                            {audience.description}
                                                        </p>

                                                        {/* Stats */}
                                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                                            {audience.stats.map((stat) => (
                                                                <div key={stat.label} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                                                                    <div className={`text-xl font-bold bg-gradient-to-r ${audience.gradient} bg-clip-text text-transparent`}>
                                                                        {stat.value}
                                                                    </div>
                                                                    <div className="text-slate-500 text-xs">
                                                                        {stat.label}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Features */}
                                                        <div className="space-y-1.5">
                                                            {audience.features.map((feature) => (
                                                                <div key={feature} className="flex items-center gap-2 text-slate-400 text-sm">
                                                                    <svg className={`w-3.5 h-3.5 ${audience.id === 'individuals' ? 'text-blue-400' : 'text-violet-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                    {feature}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* CTA */}
                                                    <div className={`px-6 py-3 bg-gradient-to-r ${audience.bgGradient} border-t border-slate-700/30`}>
                                                        <span className="text-white text-sm font-medium group-hover:underline">
                                                            Get Started →
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Footer Note */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-center pb-6 px-8"
                                >
                                    <p className="text-slate-500 text-sm">
                                        Not sure? You can always switch later from your dashboard.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
