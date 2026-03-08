'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';

const steps = [
    {
        number: '01',
        title: 'Select Your Role',
        description: 'Tell Jarvis what positions you\u2019re looking for, such as Frontend, Backend, Full Stack, or Product Manager.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        number: '02',
        title: 'Set Your Rules',
        description: 'Set your preferences for salary, location, remote work, company size, visa, and work authorization, and Jarvis follows them exactly.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
    },
    {
        number: '03',
        title: 'Jarvis Applies',
        description: 'Sit back while Jarvis finds matching jobs and sends personalized applications on your behalf.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        number: '04',
        title: 'Track Results',
        description: 'Monitor every application in your dashboard. See responses, schedule interviews, and land your dream job.',
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

export default function HowItWorks() {
    return (
        <SectionWrapper id="how-it-works" className="bg-gradient-to-b from-[#050510] to-[#0a0a1a] !pb-16">
            {/* Section Header */}
            <div className="text-center mb-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4"
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
                    Four Steps to Your{' '}
                    <span className="text-gradient">Job Search</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg max-w-2xl mx-auto"
                >
                    From profile setup to live applications, JobJarvis handles job matching, applications, and outreach.
                </motion.p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.number}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="relative group"
                    >
                        {/* Connection Line - with spacing from card edges */}
                        {index < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-12 left-[calc(100%+32px)] w-[25%] h-px bg-gradient-to-r from-blue-500/30 to-transparent z-0" />
                        )}

                        <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                            {/* Number Badge */}
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm mb-4 group-hover:from-blue-500/30 group-hover:to-violet-500/30 transition-all">
                                {step.number}
                            </div>

                            {/* Icon + Title */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                            </div>

                            {/* Description */}
                            <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
