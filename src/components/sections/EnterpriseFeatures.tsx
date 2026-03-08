'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';
import Card from '../Card';

const features = [
    {
        title: 'Team Management',
        description: 'Easily add and manage your recruitment team. Assign roles, track activity, and maintain full visibility over your agency operations.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        gradient: 'from-violet-500 to-purple-500',
    },
    {
        title: 'Candidate Pipeline',
        description: 'Each recruiter can manage up to 5 candidates at a time. Focused attention means better placements and happier clients.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        gradient: 'from-purple-500 to-indigo-500',
    },
    {
        title: 'Admin Dashboard',
        description: 'Company-wide overview for administrators. Monitor team performance, track placements, and manage your entire operation from one place.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        gradient: 'from-indigo-500 to-violet-500',
    },
    {
        title: 'Recruiter Workspace',
        description: 'Individual portal for each recruiter to manage their candidates. Streamlined workflow, progress tracking, and easy communication.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        gradient: 'from-fuchsia-500 to-purple-500',
    },
    {
        title: 'AI Job Matching',
        description: 'Candidates get the same powerful AI-powered job matching experience. Automated applications, interview prep, and smart recommendations.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        gradient: 'from-violet-500 to-pink-500',
    },
    {
        title: 'Analytics & Reports',
        description: 'Track placement rates, candidate progress, and recruiter performance. Data-driven insights to grow your staffing business.',
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        gradient: 'from-purple-500 to-violet-500',
    },
];

const roleCards = [
    {
        role: 'Admin',
        title: 'Company Owner',
        description: 'Full control over your agency',
        features: ['Manage recruiters', 'View all candidates', 'Billing & settings', 'Analytics dashboard'],
        color: 'violet',
    },
    {
        role: 'Recruiter',
        title: 'Team Member',
        description: 'Focus on your candidates',
        features: ['Add up to 5 candidates', 'Track their progress', 'Communication tools', 'Placement tracking'],
        color: 'purple',
    },
    {
        role: 'Candidate',
        title: 'Job Seeker',
        description: 'AI-powered job search',
        features: ['Automated applications', 'Job matching', 'Interview preparation', 'Career guidance'],
        color: 'cyan',
    },
];

export default function EnterpriseFeatures() {
    return (
        <SectionWrapper id="features" className="relative mt-24">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Section Header */}
            <div className="text-center mb-10 relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block text-violet-400 text-sm font-semibold tracking-wider uppercase mb-4"
                >
                    Platform Features
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                >
                    Built for{' '}
                    <span className="text-gradient-violet">Staffing Companies</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 text-lg max-w-2xl mx-auto"
                >
                    Everything you need to manage your recruitment team and help candidates land their dream jobs.
                </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mb-12">
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

            {/* Role Cards Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <div className="text-center mb-10">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Three Roles, One <span className="text-gradient-violet">Unified Platform</span>
                    </h3>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Clear separation of responsibilities with seamless collaboration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {roleCards.map((card, index) => (
                        <motion.div
                            key={card.role}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-slate-900/50 backdrop-blur-sm border rounded-2xl p-6 hover:border-${card.color}-500/50 transition-all group ${card.color === 'violet' ? 'border-violet-500/30' :
                                card.color === 'purple' ? 'border-purple-500/30' :
                                    'border-cyan-500/30'
                                }`}
                        >
                            {/* Role Badge */}
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${card.color === 'violet' ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' :
                                card.color === 'purple' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                    'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                }`}>
                                {card.role}
                            </div>

                            <h4 className="text-xl font-semibold text-white mb-2">{card.title}</h4>
                            <p className="text-slate-500 text-sm mb-4">{card.description}</p>

                            <ul className="space-y-2">
                                {card.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-slate-400 text-sm">
                                        <svg className={`w-4 h-4 ${card.color === 'violet' ? 'text-violet-400' :
                                            card.color === 'purple' ? 'text-purple-400' :
                                                'text-cyan-400'
                                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
