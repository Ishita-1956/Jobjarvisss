'use client';

import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'Software Engineer',
        company: 'Now at Google',
        image: null,
        quote: 'I was spending 4-5 hours a day on applications. With Jarvis, I got 3x more interviews in half the time. Landed my dream job at Google!',
        result: '892 applications → 47 interviews',
    },
    {
        name: 'Marcus Johnson',
        role: 'Product Manager',
        company: 'Now at Stripe',
        image: null,
        quote: 'The personalized cover letters are incredible. Recruiters actually mentioned how tailored my applications were.',
        result: '456 applications → 28 interviews',
    },
    {
        name: 'Emily Rodriguez',
        role: 'UX Designer',
        company: 'Now at Figma',
        image: null,
        quote: 'I was skeptical at first, but Jarvis found opportunities I would have never discovered on my own. Game changer.',
        result: '312 applications → 19 interviews',
    },
];

const benefits = [
    'Get more interviews (not just more applications)',
    'Save hours every week on manual applying',
    'Stop guessing what works—use data instead',
    'Stay consistent without burning out',
    'Feel in control of your job search again',
];

export default function IndividualCTA() {
    return (
        <SectionWrapper className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[150px]" />
            </div>

            {/* Testimonials */}
            <div className="relative z-10 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
                        Success Stories
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        Join Thousands of{' '}
                        <span className="text-gradient-blue">Successful Job Seekers</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all"
                        >
                            {/* Quote */}
                            <p className="text-slate-300 leading-relaxed mb-6">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            {/* Result Badge */}
                            <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-4">
                                {testimonial.result}
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="text-white font-medium">{testimonial.name}</div>
                                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                                    <div className="text-blue-400 text-sm">{testimonial.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* What Changes Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
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
            </motion.div>
        </SectionWrapper>
    );
}
