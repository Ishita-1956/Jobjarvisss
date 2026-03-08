'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';

export default function About() {
    return (
        <SectionWrapper id="about" className="relative">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Section Header */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4"
                >
                    About Us
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8"
                >
                    Built by Job Seekers,{' '}
                    <span className="text-gradient">For Job Seekers</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 text-slate-400 text-lg leading-relaxed"
                >
                    <p>
                        We've been there. The endless scrolling through job boards. The copy-paste cycle of applications. The frustration of hearing nothing back after hours of effort.
                    </p>
                    <p>
                        Job Jarvis was born from a simple belief: <span className="text-white font-medium">your time is too valuable to spend on repetitive tasks</span>. The job market is competitive enough — you shouldn't have to compete with your own inbox.
                    </p>
                    <p>
                        Our AI handles the tedious work so you can focus on what actually matters: preparing for interviews, building your skills, and making genuine connections.
                    </p>
                </motion.div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 p-8 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800/50 rounded-2xl"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-xl text-white font-medium italic">
                        "We believe everyone deserves a fair shot at their dream job — without burning out in the process."
                    </p>
                    <p className="text-slate-500 mt-4">— The Job Jarvis Team</p>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
