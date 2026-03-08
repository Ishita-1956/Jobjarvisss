'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '../Button';
import AnimatedBackground from '../AnimatedBackground';

export default function EnterpriseHero() {
    return (
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-24">
            <AnimatedBackground />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                    >
                        3X placements Speed{' '}
                        <span className="text-gradient-violet">&amp; 40% Cost Savings!</span>{' '}
                        <br className="hidden md:block" />

                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
                    >

                        Transform your Bench Sales Team with Jarvis designed to reduce costs, boost productivity, and improve candidate quality applications .

                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/signup/enterprise">
                            <Button
                                variant="primary"
                                size="lg"
                                className="!bg-gradient-to-r !from-violet-500 !to-purple-600 hover:!shadow-violet-500/30"
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                }
                            >
                                Register Your Company
                            </Button>
                        </Link>
                        <Button variant="secondary" size="lg">
                            See How It Works
                        </Button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-10 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Place Faster
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Run on a System
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Better ROI
                        </div>
                    </motion.div>
                </div>

                {/* Hero Visual - Hierarchy Illustration */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-12 relative"
                >
                    <div className="relative mx-auto max-w-4xl">
                        {/* Hierarchy Visualization */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl shadow-2xl shadow-violet-500/10 p-6">
                            {/* Top Bar */}
                            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800/50 -mx-6 -mt-6 mb-6">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="flex-1 text-center text-slate-500 text-sm">Organization Structure</div>
                            </div>

                            {/* Hierarchy Flow */}
                            <div className="flex flex-col items-center gap-4">
                                {/* Company/Admin */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="mt-2 px-3 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-medium">
                                        Company Admin
                                    </div>
                                </motion.div>

                                {/* Connector line down + split to 2 recruiters */}
                                <div className="relative w-72 h-6">
                                    <div className="absolute left-1/2 top-0 w-px h-3 bg-gradient-to-b from-violet-500/50 to-purple-500/50" />
                                    <div className="absolute left-[25%] right-[25%] top-3 h-px bg-purple-500/40" />
                                    <div className="absolute left-[25%] top-3 w-px h-3 bg-purple-500/40" />
                                    <div className="absolute right-[25%] top-3 w-px h-3 bg-purple-500/40" />
                                </div>

                                {/* 2 Recruiters with Candidates */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex items-start gap-8 sm:gap-16"
                                >
                                    {[1, 2].map((r) => (
                                        <div key={r} className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/80 to-indigo-500/80 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium">
                                                Recruiter {r}
                                            </div>

                                            {/* Connector to candidates */}
                                            <div className="w-px h-2 bg-cyan-500/40" />

                                            {/* 5 Candidates */}
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((c) => (
                                                    <div key={c} className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30 flex items-center justify-center">
                                                        <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-slate-500 text-xs">5 candidates</span>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-3xl -z-10" />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-2"
                >
                    <div className="w-1.5 h-3 bg-slate-500 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
