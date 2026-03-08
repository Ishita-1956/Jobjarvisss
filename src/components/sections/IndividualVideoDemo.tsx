'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionWrapper from '../SectionWrapper';

export default function IndividualVideoDemo() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <SectionWrapper id="individual-video-demo" className="relative">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10">

                {/* Video Area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {!isPlaying ? (
                        <div
                            onClick={() => setIsPlaying(true)}
                            className="relative mx-auto max-w-5xl cursor-pointer group"
                        >
                            {/* Full Mac-style dashboard thumbnail */}
                            <div className="relative rounded-2xl overflow-hidden border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
                                {/* Mac top bar */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/50">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <div className="flex-1 text-center text-slate-500 text-sm">Job Jarvis — Watch Demo</div>
                                </div>

                                {/* Dashboard content */}
                                <div className="p-6">
                                    {/* Stats row */}
                                    <div className="grid grid-cols-4 gap-4 mb-4">
                                        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-3 border border-blue-500/20">
                                            <div className="text-slate-400 text-xs mb-1">Today</div>
                                            <div className="text-xl font-bold text-white">47</div>
                                            <div className="text-green-400 text-xs mt-1">+12 new</div>
                                        </div>
                                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                            <div className="text-slate-400 text-xs mb-1">Total</div>
                                            <div className="text-xl font-bold text-white">892</div>
                                            <div className="text-slate-500 text-xs mt-1">All time</div>
                                        </div>
                                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                            <div className="text-slate-400 text-xs mb-1">Interviews</div>
                                            <div className="text-xl font-bold text-white">23</div>
                                            <div className="text-green-400 text-xs mt-1">+5 this week</div>
                                        </div>
                                        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                                            <div className="text-slate-400 text-xs mb-1">Rate</div>
                                            <div className="text-xl font-bold text-gradient-blue">8.2%</div>
                                            <div className="text-slate-500 text-xs mt-1">Above avg</div>
                                        </div>
                                    </div>

                                    {/* Recent Applications feed */}
                                    <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="text-white font-medium text-sm">Recent Applications</div>
                                            <div className="flex items-center gap-2 text-green-400 text-xs">
                                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                Jarvis is working
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {[
                                                { company: 'Google', role: 'Senior Frontend Engineer', status: 'Applied', time: '2m ago' },
                                                { company: 'Stripe', role: 'Full Stack Developer', status: 'Applied', time: '15m ago' },
                                                { company: 'Notion', role: 'React Developer', status: 'Interview Scheduled!', time: '1h ago' },
                                            ].map((job, i) => (
                                                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${i === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-slate-700/50'}`}>
                                                            {job.company[0]}
                                                        </div>
                                                        <div>
                                                            <div className="text-white text-sm">{job.role}</div>
                                                            <div className="text-slate-500 text-xs">{job.company}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`text-xs ${job.status.includes('Interview') ? 'text-green-400' : 'text-blue-400'}`}>{job.status}</div>
                                                        <div className="text-slate-600 text-xs">{job.time}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl group-hover:bg-black/40 transition-all">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/40"
                                >
                                    <svg className="w-9 h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Label */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                                <span className="px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium backdrop-blur-md">
                                    ▶ Watch How It Works
                                </span>
                            </div>

                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl -z-10" />
                        </div>
                    ) : (
                        <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden border border-slate-800/50 shadow-2xl shadow-blue-500/10">
                            <iframe
                                src="https://drive.google.com/file/d/1PmnrAtUZGKwbbyHQ7MwRbrIIf6PSyOyf/preview"
                                className="w-full aspect-video"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                            />
                            <button
                                onClick={() => setIsPlaying(false)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-800 transition-colors text-lg"
                            >
                                ✕
                            </button>
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl -z-10" />
                        </div>
                    )}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
