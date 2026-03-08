'use client';

import { motion } from 'framer-motion';

const benefits = [
    'Get more interviews (not just more applications)',
    'Save hours every week on manual applying',
    'Stop guessing what works—use data instead',
    'Stay consistent without burning out',
    'Feel in control of your job search again',
];

export default function CTA() {
    return (
        <section className="relative py-16 md:py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0a1a] to-[#050510]" />

            {/* Gradient Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/50 rounded-3xl p-8 md:p-12 overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-violet-500/10" />

                    {/* Content */}
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center"
                        >
                            What changes when Job Jarvis runs your{' '}
                            <span className="text-gradient">job search</span>?
                        </motion.h2>

                        {/* Benefits List */}
                        <div className="space-y-4 mb-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + index * 0.08 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-slate-300 text-lg">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Closer Line */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="text-center text-lg sm:text-xl font-medium text-gradient"
                        >
                            Less stress. More momentum. Better results.
                        </motion.p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px]" />
                </div>
            </div>
        </section>
    );
}
