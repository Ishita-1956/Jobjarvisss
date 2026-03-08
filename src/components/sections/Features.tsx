'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';
import Card from '../Card';

const features = [
    {
        title: 'Auto-Apply Engine',
        description: 'Jarvis automatically submits applications to jobs that match your criteria. No manual clicking, no repetitive form filling.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'Smart Job Matching',
        description: 'AI analyzes job descriptions and matches them with your skills and preferences. Only relevant opportunities, no noise.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        gradient: 'from-violet-500 to-purple-500',
    },
    {
        title: 'Application Tracking',
        description: 'Every application logged in your dashboard. Track status, responses, and interview invitations in one place.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
        gradient: 'from-emerald-500 to-teal-500',
    },
    {
        title: 'Outreach Email & Referral Campaign',
        description: 'Automate recruiter outreach emails and referral request campaigns to expand your network and land more opportunities.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        gradient: 'from-orange-500 to-amber-500',
    },
    {
        title: 'Personalized Cover Letters',
        description: 'AI generates unique, tailored cover letters for each application based on the job requirements and your experience.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
        gradient: 'from-pink-500 to-rose-500',
    },
    {
        title: '24/7 Job Hunting',
        description: 'While you sleep, Jarvis works. New jobs posted at 3 AM? Applied. Never miss an opportunity again.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        gradient: 'from-indigo-500 to-blue-500',
    },
];

export default function Features() {
    return (
        <SectionWrapper id="features" className="relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Section Header */}
            <div className="text-center mb-10 relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-violet-400 text-sm font-semibold tracking-wider uppercase mb-4"
                >
                    Features
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                >
                    Everything You Need to{' '}
                    <span className="text-gradient-violet">Land That Job</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg max-w-2xl mx-auto"
                >
                    Powerful features designed to maximize your chances while minimizing your effort.
                </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {features.map((feature, index) => (
                    <Card key={feature.title} className="group" glow={index === 0}>
                        {/* Icon + Title */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
}
