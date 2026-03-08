'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '../Button';

export default function HeroSection() {
    const scrollToWhereYouStand = () => {
        const element = document.getElementById('where-you-stand');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-24">
                {/* Static gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                        >
                            <span className="text-gradient">10×</span> Your Job Applications.{' '}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
                        >
                            Job Jarvis analyzes your profile and systematically runs applications, recruiter outreach, and referral helping land interviews

                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={scrollToWhereYouStand}
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                }
                            >
                                Start Auto-Applying
                            </Button>
                            <Link href="/login">
                                <Button variant="secondary" size="lg">
                                    See How It Works
                                </Button>
                            </Link>
                        </motion.div>

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
                                Cancel anytime
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Full control over applications
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-16 relative"
                    >
                        <div className="relative mx-auto max-w-3xl">
                            {/* Engaging CTA Card */}
                            <div
                                onClick={() => {
                                    const el = document.getElementById('video-demo');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="relative rounded-2xl overflow-hidden border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 cursor-pointer group hover:border-blue-500/30 transition-all duration-500"
                            >
                                <div className="py-10 px-8 flex flex-col items-center text-center">
                                    {/* Play Icon */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow"
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
                                        Watch how Jarvis automates your entire job search, from profile setup to landing interviews.
                                    </p>

                                    {/* Scroll indicator */}
                                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                        Watch How It Works
                                    </div>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-500/20 rounded-3xl blur-3xl -z-10 group-hover:opacity-100 opacity-60 transition-opacity" />
                        </div>
                    </motion.div>
                </div>

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
        </>
    );
}
