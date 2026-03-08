'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';

const manualPains = [
'Juggling between multiple job boards',
'Limited to a few platforms you can manually check',
'High effort per application, Low output',
'Slow response to new openings',
'Inconsistent application quality'
];

const jarvisBenefits = [
'Personalized applications at scale',
'24/7 automated job applications',
'Consistent, optimized application quality',
'Broader coverage beyond manual job boards',
'Faster response to new openings'
];

export default function WhyJarvis() {
    return (
        <SectionWrapper id="why-jarvis" className="bg-gradient-to-b from-[#0a0a1a] to-[#050510]">
            {/* Section Header */}
            <div className="text-center mb-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4"
                >
                    Why Jarvis
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                >
                    Manual Applications vs{' '}
                    <span className="text-gradient">Job Jarvis</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg max-w-2xl mx-auto"
                >
                    See the difference between exhausting yourself with manual applications and letting Jarvis work for you.
                </motion.p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Manual Applications */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-red-400">Manual Applications</h3>
                    </div>

                    <ul className="space-y-4">
                        {manualPains.map((pain, index) => (
                            <motion.li
                                key={pain}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                                className="flex items-start gap-3"
                            >
                                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span className="text-slate-400">{pain}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* With Job Jarvis */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-blue-950/40 to-violet-950/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 shadow-lg shadow-blue-500/10"
                >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gradient">With Job Jarvis</h3>
                        </div>

                        <ul className="space-y-4">
                            {jarvisBenefits.map((benefit, index) => (
                                <motion.li
                                    key={benefit}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="flex items-start gap-3"
                                >
                                    <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-slate-300">{benefit}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
                {[
                    { value: '10x', label: 'More Applications' },
                    { value: '85%', label: 'Time Saved' },
                    { value: '24/7', label: 'Job Hunting' },
                    { value: '100%', label: 'Your Control' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        className="text-center"
                    >
                        <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                        <div className="text-slate-400 text-sm">{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}
