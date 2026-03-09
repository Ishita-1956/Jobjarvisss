'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../Button';

export default function HeroSection() {

    const [isPlaying, setIsPlaying] = useState(false);

    const scrollToWhereYouStand = () => {
        const element = document.getElementById('where-you-stand');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-24">

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

                {/* Hero Text */}
                <div className="text-center max-w-4xl mx-auto">

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                    >
                        <span className="text-gradient">10×</span> Your Job Applications.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10"
                    >
                        Job Jarvis analyzes your profile and systematically runs applications,
                        recruiter outreach, and referral helping land interviews
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
                        >
                            Start Auto-Applying
                        </Button>

                        <Link href="/login">
                            <Button variant="secondary" size="lg">
                                See How It Works
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-10 flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Faster Job Search
                        </div>

                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Flexible Plans
                        </div>

                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Application Visibility
                        </div>
                    </motion.div>

                </div>

                {/* Video Demo directly in hero */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-16 relative"
                >

                    {!isPlaying ? (

                        <div
                            onClick={() => setIsPlaying(true)}
                            className="relative mx-auto max-w-4xl cursor-pointer group"
                        >

                            <div className="relative rounded-2xl overflow-hidden border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10">

                                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/50">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <div className="flex-1 text-center text-slate-500 text-sm">
                                        Job Jarvis — Watch Demo
                                    </div>
                                </div>

                                <div className="p-10 text-center text-slate-400">
                                    Click to watch how Job Jarvis automates your job search.
                                </div>

                            </div>

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl">

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-blue-500/40"
                                >
                                    <svg className="w-9 h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>

                            </div>

                        </div>

                    ) : (

                        <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden border border-slate-800/50 shadow-2xl shadow-blue-500/10">

                            <iframe
                                src="https://drive.google.com/file/d/1PmnrAtUZGKwbbyHQ7MwRbrIIf6PSyOyf/preview"
                                className="w-full aspect-video"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                            />

                            <button
                                onClick={() => setIsPlaying(false)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
                            >
                                ✕
                            </button>

                        </div>

                    )}

                </motion.div>

            </div>

        </section>
    );
}