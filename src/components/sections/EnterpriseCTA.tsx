'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SectionWrapper from '../SectionWrapper';
import Button from '../Button';

/* ─── Testimonials ─── */
const testimonials = [
    {
        company: 'TalentBridge Staffing',
        industry: 'Staffing Company',
        logo: 'TB',
        quote:
            'We can now manage all our recruiters and their candidates in one place. The 5-candidate limit per recruiter actually improved our quality of service.',
        author: 'Sarah Mitchell',
        role: 'Staffing Director',
        results: [
            { metric: 'Placements', value: '↑ 85%' },
            { metric: 'Client Satisfaction', value: '↑ 40%' },
        ],
    },
    {
        company: 'RecruitFirst',
        industry: 'HR Consulting',
        logo: 'RF',
        quote:
            'Our team of 15 recruiters now handles 75 candidates efficiently. The AI job matching for candidates is a game-changer.',
        author: 'James Chen',
        role: 'Operations Manager',
        results: [
            { metric: 'Time Saved', value: '60%' },
            { metric: 'Candidate Success', value: '↑ 55%' },
        ],
    },
    {
        company: 'CareerHub Partners',
        industry: 'Executive Search',
        logo: 'CH',
        quote:
            'The platform made scaling our staffing company effortless. Adding new recruiters takes seconds, and candidates love the AI experience.',
        author: 'Emily Rodriguez',
        role: 'Founder & CEO',
        results: [
            { metric: 'Team Growth', value: '3x' },
            { metric: 'Revenue', value: '↑ 120%' },
        ],
    },
];

/* ─── Pricing Tiers ─── */
const pricingTiers = [
    {
        name: 'Single User',
        price: '$99',
        credits: '1 Credit',
        description: 'For individual job seekers',
        features: [
            '1 credit included',
            'AI-powered job matching',
            'Automated applications',
            'Profile optimization',
            'Email support',
        ],
    },
    {
        name: 'Team',
        price: '$500',
        credits: '5 Credits',
        description: 'For growing teams',
        features: [
            '5 credits included',
            'Multi-user access',
            'Advanced analytics',
            'Priority support',
            'Recruiter outreach',
            'Referral campaigns',
        ],
        popular: true,
    },
    {
        name: 'Staffing Company',
        price: '$5,000',
        credits: '120 Credits',
        description: 'Flexible · 12 months',
        features: [
            '120 credits included',
            'Unlimited team members',
            'Dedicated success manager',
            'Custom integrations',
            'SLA guarantee',
            'White-label options',
        ],
    },
];

/* ─── FAQ Categories & Items ─── */
interface FaqItem {
    question: string;
    answer: string;
    category: string;
}

const faqCategories = [
    { id: 'general', label: 'General', icon: '💡' },
    { id: 'ai', label: 'AI & Strategy', icon: '🧠' },
    { id: 'safety', label: 'Safety & Compliance', icon: '🔐' },
    { id: 'setup', label: 'Setup & Usage', icon: '⚙️' },
    { id: 'results', label: 'Results', icon: '📈' },
    { id: 'pricing', label: 'Pricing & Trust', icon: '💼' },
] as const;

const faqs: FaqItem[] = [
    /* General */
    { category: 'general', question: 'What is Job Jarvis?', answer: 'Job Jarvis is an AI-powered platform that analyzes your profile, builds a job search strategy, and runs job applications, recruiter outreach, and referral campaigns for you at scale.' },
    { category: 'general', question: 'Who is Job Jarvis for?', answer: 'Job Jarvis is built for job seekers, recruiters, and staffing teams who want to apply faster, cover more opportunities, and increase interview chances without manual work.' },
    { category: 'general', question: 'How is this different from applying manually or through a staffing company?', answer: 'Manual applying is slow and inconsistent. Most staffing companies apply to a limited number of roles per day. Job Jarvis systematically searches, matches, and applies across multiple sources at scale — consistently and strategically.' },
    { category: 'general', question: 'What exactly does Job Jarvis automate?', answer: 'It automates job discovery, role matching, application submission, recruiter outreach, referral workflows, and basic profile optimization.' },
    { category: 'general', question: 'Does Job Jarvis just spam applications?', answer: 'No. Job Jarvis matches your profile to roles, filters irrelevant jobs, and applies based on fit and strategy — not random blasting.' },
    /* AI & Strategy */
    { category: 'ai', question: 'How does Job Jarvis decide which jobs to apply to?', answer: 'It analyzes your resume, skills, experience, and preferences, then matches you to roles based on relevance, keywords, seniority, and hiring signals.' },
    { category: 'ai', question: 'Can I control what kinds of jobs it applies to?', answer: 'Yes. You can set role types, locations, keywords, experience level, companies to avoid, and other filters.' },
    { category: 'ai', question: 'Does it customize my resume or profile?', answer: 'Job Jarvis optimizes and adapts your profile for better matching and ATS visibility. (Customization level depends on your plan/setup.)' },
    { category: 'ai', question: 'Will this improve my chances of getting interviews?', answer: 'Job Jarvis increases your surface area (more relevant applications + outreach) and improves consistency — both of which statistically improve interview chances. No tool can guarantee a job, but this improves the odds.' },
    /* Safety & Compliance */
    { category: 'safety', question: 'Is this safe to use?', answer: 'Yes. Job Jarvis is designed to follow platform rules, avoid risky automation patterns, and prioritize safe, compliant workflows.' },
    { category: 'safety', question: 'Will this get my accounts banned?', answer: 'Job Jarvis avoids aggressive or spammy behavior patterns. However, platform rules change, so we focus on safe, human-like, and compliant usage.' },
    { category: 'safety', question: 'Do you store my passwords or private data?', answer: 'Sensitive data handling depends on your setup and integrations. Job Jarvis is built with security and privacy best practices in mind.' },
    { category: 'safety', question: 'Is this legal?', answer: 'Yes. Automating parts of job search and outreach is legal. You are responsible for how you use the tool and for complying with the terms of the platforms you use.' },
    /* Setup & Usage */
    { category: 'setup', question: 'How long does it take to set up?', answer: 'Most users can get started in minutes. Full optimization may take a bit longer depending on how detailed you want your profile and filters.' },
    { category: 'setup', question: 'Do I need technical skills to use Job Jarvis?', answer: 'No. Job Jarvis is built for non-technical users.' },
    { category: 'setup', question: 'Can I pause or stop automation anytime?', answer: 'Yes. You\'re always in control. You can pause, tweak, or stop campaigns whenever you want.' },
    { category: 'setup', question: 'Can I use this for multiple candidates or clients?', answer: 'Yes. Job Jarvis supports recruiter and staffing workflows for managing multiple candidates.' },
    /* Results & Expectations */
    { category: 'results', question: 'How many jobs can Job Jarvis apply to per day?', answer: '500+' },
    { category: 'results', question: 'When will I start seeing results?', answer: 'Some users see responses within days, others take weeks. Job markets vary by role, location, and profile strength.' },
    { category: 'results', question: 'Does Job Jarvis guarantee a job?', answer: 'No tool can guarantee a job. Job Jarvis maximizes your chances by increasing volume, relevance, and consistency.' },
    /* Pricing & Trust */
    { category: 'pricing', question: 'Is there a trial or demo?', answer: 'No.' },
    { category: 'pricing', question: 'Is this for individuals or companies?', answer: 'Both. Job Jarvis works for individual job seekers and for recruiters/staffing teams.' },
    { category: 'pricing', question: 'Why did you build Job Jarvis?', answer: 'Because job search and recruiting are full of repetitive, manual, low-value work. Job Jarvis was built so humans can focus on strategy and interviews — not copy-paste.' },
    { category: 'pricing', question: 'Is Job Jarvis just another "auto apply" tool?', answer: 'No. It\'s a full job search execution system: strategy, matching, applications, outreach, and tracking — not just clicking "apply".' },
];

/* ─── Slide navigation helpers ─── */
const CARDS_PER_VIEW = 3; // desktop

/* ─── Component ─── */
export default function EnterpriseCTA() {
    const [activeCategory, setActiveCategory] = useState<(typeof faqCategories)[number]['id']>('general');
    const [currentPage, setCurrentPage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState<1 | -1>(1);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const filteredFaqs = faqs.filter((f) => f.category === activeCategory);
    const totalPages = Math.ceil(filteredFaqs.length / CARDS_PER_VIEW);

    /* reset page when category changes */
    useEffect(() => {
        setCurrentPage(0);
        setDirection(1);
    }, [activeCategory]);

    /* advance to next category */
    const advanceToNextCategory = useCallback(() => {
        const catIds = faqCategories.map((c) => c.id);
        const currentIdx = catIds.indexOf(activeCategory);
        const nextIdx = (currentIdx + 1) % catIds.length;
        setActiveCategory(catIds[nextIdx]);
    }, [activeCategory]);

    /* auto-play: page-by-page, then next category */
    const goNextAuto = useCallback(() => {
        setDirection(1);
        setCurrentPage((prev) => {
            if (prev + 1 >= totalPages) {
                // category exhausted → move to next category
                setTimeout(advanceToNextCategory, 0);
                return 0;
            }
            return prev + 1;
        });
    }, [totalPages, advanceToNextCategory]);

    useEffect(() => {
        if (isPaused) return;
        intervalRef.current = setInterval(goNextAuto, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused, goNextAuto]);

    const goPrev = () => {
        setDirection(-1);
        setCurrentPage((prev) => {
            if (prev - 1 < 0) return totalPages - 1;
            return prev - 1;
        });
    };

    const goNextManual = () => {
        setDirection(1);
        setCurrentPage((prev) => {
            if (prev + 1 >= totalPages) {
                advanceToNextCategory();
                return 0;
            }
            return prev + 1;
        });
    };

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.95 }),
    };

    /* visible cards for the current page — no repetition */
    const getVisibleCards = () => {
        const start = currentPage * CARDS_PER_VIEW;
        return filteredFaqs.slice(start, start + CARDS_PER_VIEW);
    };

    return (
        <SectionWrapper className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-violet-500/10 rounded-full blur-[150px]" />
            </div>

            {/* ─── Testimonials ─── */}
            <div className="relative z-10 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6"
                >
                    <span className="text-violet-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
                        Success Stories
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Loved by{' '}
                        <span className="text-gradient-violet">Staffing Companies</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.company}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-violet-500/30 transition-all"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    {testimonial.logo}
                                </div>
                                <div>
                                    <div className="text-white font-medium">{testimonial.company}</div>
                                    <div className="text-slate-500 text-sm">{testimonial.industry}</div>
                                </div>
                            </div>
                            <p className="text-slate-300 leading-relaxed mb-4 text-sm">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {testimonial.results.map((result) => (
                                    <div key={result.metric} className="bg-violet-500/10 rounded-lg p-3 text-center">
                                        <div className="text-lg font-bold text-violet-400">{result.value}</div>
                                        <div className="text-slate-500 text-xs">{result.metric}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <span className="text-white">{testimonial.author}</span>
                                <span className="text-slate-500"> · {testimonial.role}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ─── Pricing ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 mb-10"
            >
                <div className="text-center mb-8">
                    <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
                        Simple Pricing
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Plans for Every{' '}
                        <span className="text-gradient-violet">Team Size</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        No hidden fees. No per-placement charges. Just straightforward credit-based pricing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border ${tier.popular ? 'border-violet-500/50' : 'border-slate-800/50'} hover:border-violet-500/40 transition-all duration-300 group`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-white mb-1">{tier.name}</h3>
                                <p className="text-slate-500 text-sm mb-4">{tier.description}</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                                </div>
                                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium">
                                    {tier.credits}
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-slate-400 text-sm">
                                        <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/signup/enterprise" className="w-full">
                                <Button
                                    variant={tier.popular ? 'primary' : 'secondary'}
                                    className={`w-full ${tier.popular ? '!bg-gradient-to-r !from-violet-500 !to-purple-600' : ''}`}
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ─── FAQ Slider Section ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 mb-10"
            >
                <div className="text-center mb-6">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-violet-400 text-sm font-semibold tracking-wider uppercase mb-4 block"
                    >
                        Got Questions?
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-4"
                    >
                        Frequently Asked{' '}
                        <span className="text-gradient-violet">Questions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-xl mx-auto"
                    >
                        Everything you need to know about Job Jarvis — browse by topic.
                    </motion.p>
                </div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-wrap justify-center gap-2 mb-6"
                >
                    {faqCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat.id
                                ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white border-violet-500/50 shadow-lg shadow-violet-500/20'
                                : 'bg-slate-900/50 text-slate-400 border-slate-700/50 hover:border-violet-500/30 hover:text-white'
                                }`}
                        >
                            <span className="mr-1.5">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Slider Container */}
                <div
                    className="relative max-w-5xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Arrow Left */}
                    <button
                        onClick={goPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-10 z-20 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-white hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-300 backdrop-blur-sm"
                        aria-label="Previous FAQ"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Cards */}
                    <div className="overflow-hidden px-2">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={`${activeCategory}-${currentPage}`}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-5"
                            >
                                {getVisibleCards().map((faq, idx) => (
                                    <motion.div
                                        key={faq.question}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.08 }}
                                        className="group relative bg-slate-900/60 backdrop-blur-md border border-slate-800/50 rounded-2xl p-4 hover:border-violet-500/40 transition-all duration-500 cursor-default"
                                    >
                                        {/* Gradient glow on hover */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 via-purple-500/0 to-violet-500/0 group-hover:from-violet-500/5 group-hover:via-purple-500/5 group-hover:to-violet-500/5 transition-all duration-500" />

                                        {/* Card Number Badge */}
                                        <div className="relative z-10">
                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center text-violet-400 text-sm font-bold mb-3 group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-all">
                                                Q
                                            </div>
                                            <h4 className="text-white font-semibold mb-3 leading-snug text-[15px]">
                                                {faq.question}
                                            </h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Arrow Right */}
                    <button
                        onClick={goNextManual}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-10 z-20 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-white hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-300 backdrop-blur-sm"
                        aria-label="Next FAQ"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dot Indicators — one per page */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentPage ? 1 : -1);
                                setCurrentPage(idx);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentPage
                                ? 'w-8 bg-gradient-to-r from-violet-500 to-purple-500'
                                : 'w-2 bg-slate-700 hover:bg-slate-600'
                                }`}
                            aria-label={`Go to page ${idx + 1}`}
                        />
                    ))}
                </div>
            </motion.div>

            {/* ─── Final CTA ─── */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
            >
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/50 rounded-3xl p-8 md:p-12 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-purple-500/10" />

                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Ready to{' '}
                            <span className="text-gradient-violet">Scale</span> Your Staffing Company?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto"
                        >
                            Join hundreds of staffing companies already using Jarvis to manage their teams and place candidates faster.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link href="/signup/enterprise">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="!bg-gradient-to-r !from-violet-500 !to-purple-600 hover:!shadow-violet-500/30"
                                    icon={
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    }
                                >
                                    Get Started
                                </Button>
                            </Link>
                            <Button variant="secondary" size="lg">
                                Talk to Sales
                            </Button>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 text-slate-500 text-sm"
                        >
                            Start automating your job search today
                        </motion.p>
                    </div>

                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
                </div>
            </motion.div>
        </SectionWrapper>
    );
}
