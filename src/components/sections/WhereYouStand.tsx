'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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
        glowColor: 'group-hover:shadow-blue-500/20',
        features: ['Auto-Apply Engine', 'Smart Job Matching', 'Live Analytics Dashboard'],
    },
    {
        id: 'enterprise',
        title: 'Staffing Companies',
        subtitle: "I have Bench consultant ,We market them ",
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
        glowColor: 'group-hover:shadow-violet-500/20',
        features: ['Candidate Hub', 'Bulk Activation', 'Team Collaboration'],
    },
];

export default function WhereYouStand() {
    return (
        <section id="where-you-stand" className="relative py-16 md:py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#080818] to-[#050510]" />

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />

                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                    }}
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-amber-500/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-white/10 text-white/80 text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 animate-pulse" />
                        Choose Your Path
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3"
                    >
                        Where Do You{' '}
                        <span className="relative inline-block">
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
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        <span className="text-white font-semibold">One engine. Two ways to win.</span>
                        <br />
                        Pick your side in the future of hiring.
                    </motion.p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {audiences.map((audience, index) => (
                        <Link href={audience.href} key={audience.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + index * 0.15 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className={`group relative h-full cursor-pointer`}
                            >
                                {/* Card Glow */}
                                <div className={`absolute -inset-1 bg-gradient-to-r ${audience.gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />

                                {/* Card */}
                                <div className={`relative h-full bg-slate-900/90 backdrop-blur-xl rounded-2xl border ${audience.borderColor} ${audience.hoverBorder} overflow-hidden transition-all duration-300 shadow-2xl ${audience.glowColor}`}>
                                    {/* Top Gradient Bar */}
                                    <div className={`h-1.5 bg-gradient-to-r ${audience.gradient}`} />

                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div>
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                                                    {audience.icon}
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-1">
                                                    {audience.title}
                                                </h3>
                                                <p className="text-slate-400 text-base">
                                                    {audience.subtitle}
                                                </p>
                                            </div>
                                            <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                                                <svg className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                                            {audience.description}
                                        </p>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {audience.stats.map((stat) => (
                                                <div key={stat.label} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/40 group-hover:border-slate-600/50 transition-colors">
                                                    <div className={`text-xl font-bold bg-gradient-to-r ${audience.gradient} bg-clip-text text-transparent`}>
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-slate-500 text-sm">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-3">
                                            {audience.features.map((feature) => (
                                                <div key={feature} className="flex items-center gap-3 text-slate-300">
                                                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${audience.gradient} flex items-center justify-center`}>
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Footer */}
                                    <div className={`px-8 py-4 bg-gradient-to-r ${audience.bgGradient} border-t border-slate-700/30`}>
                                        <span className="text-white font-medium flex items-center gap-2">
                                            Get Started
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-slate-500 text-sm mt-10"
                >
                    Not sure? You can always switch later from your dashboard.
                </motion.p>
            </div>
        </section>
    );
}
