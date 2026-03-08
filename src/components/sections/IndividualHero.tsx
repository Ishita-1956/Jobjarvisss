'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '../Button';
import AnimatedBackground from '../AnimatedBackground';

export default function IndividualHero() {
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
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                    >
                        <span className="text-gradient">3X</span> Applications{' '}
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
                    >
                        Job Jarvis is your AI job search co-pilot that finds matching jobs, optimizes your resume, and applies for you so you can get more interviews without burning hours every day.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/signup/individual">
                            <Button
                                variant="primary"
                                size="lg"
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                }
                            >
                                Start Trial
                            </Button>
                        </Link>
                        <Button variant="secondary" size="lg">
                            Watch Demo
                        </Button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-12 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            No credit card required
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            50 free applications
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Full control always
                        </div>
                    </motion.div>
                </div>

                {/* Engaging Video CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-16 relative"
                >
                    <div className="relative mx-auto max-w-3xl">
                        <div
                            onClick={() => {
                                const el = document.getElementById('individual-video-demo');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="relative rounded-2xl overflow-hidden border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 cursor-pointer group hover:border-cyan-500/30 transition-all duration-500"
                        >
                            <div className="py-10 px-8 flex flex-col items-center text-center">
                                {/* Play Icon */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow"
                                >
                                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>

                                {/* Headline */}
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                                    See It In Action
                                </h3>
                                <p className="text-slate-400 text-base max-w-lg mb-6">
                                    Watch how Jarvis finds, matches, and applies to jobs for you , and you can focus on what matters most.
                                </p>

                                {/* Scroll indicator */}
                                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                    Watch How It Works
                                </div>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl -z-10 opacity-60" />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
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
