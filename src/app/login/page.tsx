'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthAnimatedBackground from '@/components/AuthAnimatedBackground';

type UserType = 'individual' | 'enterprise';

export default function LoginPage() {
    const [hoveredType, setHoveredType] = useState<UserType | null>(null);

    const userTypes = [
        {
            id: 'individual' as UserType,
            label: 'Job Seeker',
            subtitle: "I'm looking for jobs",
            description: 'Let Jarvis apply to hundreds of jobs while you focus on interviews.',
            href: '/login/individual',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            gradient: 'from-blue-500 via-cyan-500 to-blue-600',
            bgGradient: 'from-blue-500/10 to-cyan-500/10',
            borderColor: 'border-blue-500/30',
            hoverBorder: 'hover:border-blue-400/60',
            shadowColor: 'shadow-blue-500/20',
            features: ['Auto-apply to jobs', 'Smart job matching', 'Track applications'],
        },
        {
            id: 'enterprise' as UserType,
            label: 'Enterprise',
            subtitle: "I'm hiring talent",
            description: 'Source, screen, and manage candidates at scale with AI precision.',
            href: '/login/enterprise',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            gradient: 'from-violet-500 via-purple-500 to-violet-600',
            bgGradient: 'from-violet-500/10 to-purple-500/10',
            borderColor: 'border-violet-500/30',
            hoverBorder: 'hover:border-violet-400/60',
            shadowColor: 'shadow-violet-500/20',
            features: ['Team management', 'Bulk hiring tools', 'Analytics dashboard'],
        },
    ];

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <AuthAnimatedBackground />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10 py-8 sm:py-12">
                {/* Logo & Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6 sm:mb-8"
                >
                    <Link href="/" className="inline-block mb-4 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow mx-auto">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </Link>

                    <h2 className="text-base sm:text-lg font-bold text-white mb-2">
                        Login to Your Account
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
                        Choose your account type to continue
                    </p>
                </motion.div>

                {/* User Type Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-2 sm:px-0">
                    {userTypes.map((type, index) => (
                        <motion.div
                            key={type.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            onMouseEnter={() => setHoveredType(type.id)}
                            onMouseLeave={() => setHoveredType(null)}
                        >
                            <Link href={type.href}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative h-full cursor-pointer"
                                >
                                    {/* Card Glow */}
                                    <motion.div
                                        className={`absolute -inset-1 bg-gradient-to-r ${type.gradient} rounded-3xl blur-xl transition-opacity duration-500`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredType === type.id ? 0.4 : 0 }}
                                    />

                                    {/* Card */}
                                    <div className={`relative h-full bg-slate-900/80 backdrop-blur-xl rounded-2xl border ${type.borderColor} ${type.hoverBorder} overflow-hidden transition-all duration-300 shadow-2xl ${type.shadowColor}`}>
                                        {/* Top Gradient Bar */}
                                        <div className={`h-1.5 bg-gradient-to-r ${type.gradient}`} />

                                        <div className="p-5 sm:p-6">
                                            {/* Icon & Title */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${type.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                    {type.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">
                                                        {type.label}
                                                    </h3>
                                                    <p className="text-slate-400 text-sm">{type.subtitle}</p>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-slate-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                                {type.description}
                                            </p>

                                            {/* Features */}
                                            <div className="space-y-2 mb-4 sm:mb-6">
                                                {type.features.map((feature) => (
                                                    <div key={feature} className="flex items-center gap-2 text-slate-400 text-sm">
                                                        <svg className={`w-4 h-4 ${type.id === 'individual' ? 'text-blue-400' : 'text-violet-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <div className={`flex items-center justify-between p-3 sm:p-4 rounded-xl bg-gradient-to-r ${type.bgGradient} border ${type.borderColor}`}>
                                                <span className="text-white font-medium text-sm sm:text-base">Login as {type.label}</span>
                                                <motion.div
                                                    animate={{ x: hoveredType === type.id ? 4 : 0 }}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${type.id === 'individual' ? 'bg-blue-500/20 text-blue-400' : 'bg-violet-500/20 text-violet-400'}`}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-8 sm:mt-12 text-center px-4"
                >
                    <p className="text-slate-500 mb-4">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                            Sign up here
                        </Link>
                    </p>
                    <Link href="/" className="text-slate-600 hover:text-slate-400 transition-colors inline-flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
