'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';

const steps = [
    {
        number: '01',
        title: 'Create Your Profile',
        description: 'Upload your resume, set your job preferences, target roles, locations, and salary expectations. Jarvis learns what you\'re looking for.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Jarvis Finds Jobs',
        description: 'AI scans thousands of job boards and company sites 24/7 to find roles that match your profile and preferences perfectly.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Automatic Applications',
        description: 'For each matching job, Jarvis crafts a personalized application with tailored resume and cover letter, then applies on your behalf.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Land Interviews',
        description: 'Receive interview invitations directly. Track all responses in your dashboard. Focus on preparing while Jarvis keeps applying.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
    },
];

export default function IndividualHowItWorks() {
    return (
        <SectionWrapper id="how-it-works" className="relative !pb-16">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Section Header */}
            <div className="text-center mb-10 relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4"
                >
                    How It Works
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                >
                    From Setup to{' '}
                    <span className="text-gradient-blue">Interview</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg max-w-2xl mx-auto"
                >
                    Getting started is easy. Within minutes, Jarvis will be working for you around the clock.
                </motion.p>
            </div>

            {/* Steps */}
            <div className="relative z-10">
                {/* Connection Line - shortened with top/bottom inset so it doesn't touch edges */}
                <div className="absolute left-1/2 top-28 bottom-28 w-px bg-gradient-to-b from-blue-500/30 via-cyan-500/30 to-transparent hidden lg:block" />

                <div className="space-y-12 lg:space-y-0">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}
                        >
                            {/* Step Content */}
                            <div className={`lg:${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12 lg:col-start-2'}`}>
                                <div className={`inline-block ${index % 2 === 1 ? 'lg:text-left' : 'lg:text-right'}`}>
                                    {/* Number Badge */}
                                    <div className="inline-flex items-center gap-3 mb-4">
                                        <span className="text-blue-400/50 text-5xl font-bold">{step.number}</span>
                                    </div>

                                    {/* Card */}
                                    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                                                {step.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                                        </div>
                                        <p className="text-slate-400 leading-relaxed mt-2">{step.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
                                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
