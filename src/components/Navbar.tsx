'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Button from './Button';
import JobJarvisLogo from './JobJarvisLogo';

const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Why Jarvis', href: '#why-jarvis' },
    { name: 'About', href: '#about' },
];

const audienceLinks = [
    {
        name: 'For Job Seekers',
        href: '/individuals',
        description: 'Automate your job applications',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        name: 'For Staffing Company',
        href: '/enterprise',
        description: 'Scale your recruiting team',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        gradient: 'from-violet-500 to-purple-500',
    },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAudienceDropdownOpen, setIsAudienceDropdownOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGetStartedClick = () => {
        if (pathname === '/') {
            const element = document.getElementById('where-you-stand');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push('/');
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
                    ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50'
                    : 'bg-transparent'
                }
      `}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <Link href="/" className="flex items-center gap-2 group">
                        <JobJarvisLogo size="lg" />
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <div
                            className="relative"
                            onMouseEnter={() => setIsAudienceDropdownOpen(true)}
                            onMouseLeave={() => setIsAudienceDropdownOpen(false)}
                        >
                            <button className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium py-2">
                                Solutions
                                <svg className={`w-4 h-4 transition-transform ${isAudienceDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isAudienceDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                                    >
                                        <div className="p-2">
                                            {audienceLinks.map((link) => (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors group"
                                                >
                                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.gradient} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                        {link.icon}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-medium">{link.name}</div>
                                                        <div className="text-slate-500 text-sm">{link.description}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Login
                            </Button>
                        </Link>
                        <Button variant="primary" size="sm" onClick={handleGetStartedClick}>
                            Get Started
                        </Button>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-white"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50"
                    >
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex flex-col gap-2">
                                <div className="border-b border-slate-800/50 pb-4 mb-2">
                                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-3">Solutions</div>
                                    {audienceLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
                                        >
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.gradient} flex items-center justify-center text-white`}>
                                                {link.icon}
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">{link.name}</div>
                                                <div className="text-slate-500 text-sm">{link.description}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-slate-400 hover:text-white transition-colors duration-200 py-2"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="flex flex-col gap-2 pt-4 border-t border-slate-800">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="secondary" size="md" className="w-full">
                                            Login
                                        </Button>
                                    </Link>
                                    <Button variant="primary" size="md" className="w-full" onClick={handleGetStartedClick}>
                                        Get Started
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
