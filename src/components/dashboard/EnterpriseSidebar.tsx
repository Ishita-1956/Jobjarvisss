'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import JobJarvisLogo from '../JobJarvisLogo';
import { User } from '@/lib/auth';
import { getEnterpriseRole, type EnterpriseRole } from '@/lib/enterprise-store';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

const ownerNavItems: NavItem[] = [
    {
        label: 'Overview',
        href: '/dashboard/enterprise/owner',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
    },
    {
        label: 'Recruiters',
        href: '/dashboard/enterprise/owner/recruiters',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
    },
    {
        label: 'Candidates',
        href: '/dashboard/enterprise/owner/candidates',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
    {
        label: 'Analytics',
        href: '/dashboard/enterprise/owner/analytics',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

const recruiterNavItems: NavItem[] = [
    {
        label: 'Dashboard',
        href: '/dashboard/enterprise/recruiter',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
    },
    {
        label: 'My Candidates',
        href: '/dashboard/enterprise/recruiter/candidates',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },

    {
        label: 'Add Candidate',
        href: '/dashboard/enterprise/recruiter/candidates/new',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
        ),
    },
    {
        label: 'Analytics',
        href: '/dashboard/enterprise/recruiter/analytics',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

interface EnterpriseSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user?: User | null;
}

export default function EnterpriseSidebar({ isOpen, onClose, user }: EnterpriseSidebarProps) {
    const pathname = usePathname();
    const sidebarRef = useRef<HTMLElement>(null);
    const [role, setRole] = useState<EnterpriseRole | null>(null);

    useEffect(() => {
        // Detect role from URL path first, then fallback to localStorage
        if (pathname?.includes('/enterprise/recruiter')) {
            setRole('recruiter');
        } else if (pathname?.includes('/enterprise/owner')) {
            setRole('owner');
        } else {
            setRole(getEnterpriseRole());
        }
    }, [pathname]);

    // Close sidebar on outside click (mobile only)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);


    const navItems = role === 'recruiter' ? recruiterNavItems : ownerNavItems;
    const accentColor = role === 'recruiter' ? 'violet' : 'blue';
    const roleBadgeLabel = role === 'recruiter' ? 'Recruiter' : 'Owner';

    const accentClasses = {
        activeBorder: accentColor === 'blue' ? 'border-blue-500/20' : 'border-violet-500/20',
        activeBg: accentColor === 'blue' ? 'bg-blue-500/10' : 'bg-violet-500/10',
        activeShadow: accentColor === 'blue' ? 'shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]' : 'shadow-[0_0_15px_-3px_rgba(139,92,246,0.3)]',
        iconActive: accentColor === 'blue' ? 'text-blue-400' : 'text-violet-400',
        iconGlow: accentColor === 'blue' ? 'bg-blue-400/30' : 'bg-violet-400/30',
        indicatorBg: accentColor === 'blue' ? 'bg-blue-500' : 'bg-violet-500',
        indicatorShadow: accentColor === 'blue' ? 'shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'shadow-[0_0_10px_rgba(139,92,246,0.8)]',
        hoverBg: accentColor === 'blue' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(139, 92, 246, 0.05)',
        badgeBg: accentColor === 'blue' ? 'from-blue-500/20 to-purple-500/20' : 'from-violet-500/20 to-purple-500/20',
        badgeText: accentColor === 'blue' ? 'text-blue-300' : 'text-violet-300',
        badgeBorder: accentColor === 'blue' ? 'border-blue-500/20' : 'border-violet-500/20',
        headerGlow: accentColor === 'blue' ? 'from-blue-600/10 via-purple-600/5' : 'from-violet-600/10 via-purple-600/5',
        avatarGlow: accentColor === 'blue' ? 'shadow-blue-500/20' : 'shadow-violet-500/20',
        avatarGradient: accentColor === 'blue' ? 'from-blue-500 to-purple-600' : 'from-violet-500 to-purple-600',
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`
                    fixed top-0 left-0 bottom-0 w-[260px] z-50
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:sticky lg:top-0 lg:z-auto lg:flex-shrink-0 lg:h-screen
                `}
            >
                {/* Premium Enterprise Glass background */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 shadow-[4px_0_24px_-2px_rgba(0,0,0,0.5)] border-r border-slate-800/60" />

                {/* Decorative Elements */}
                <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${accentClasses.headerGlow} to-transparent pointer-events-none`} />
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

                <div className="relative flex flex-col h-full z-10">
                    {/* Logo & Role Badge */}
                    <div className="p-6 pb-6 border-b border-slate-800/40 bg-slate-900/20 backdrop-blur-sm">
                        <Link href="/dashboard/enterprise" className="flex flex-col gap-1 group" onClick={onClose}>
                            <JobJarvisLogo size="md" />
                            <div className="flex items-center gap-2 mt-2 ml-1">
                                <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-gradient-to-r ${accentClasses.badgeBg} ${accentClasses.badgeText} rounded border ${accentClasses.badgeBorder}`}>
                                    {roleBadgeLabel}
                                </span>
                                <span className="text-[10px] text-slate-500">v2.0</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
                        <div className="space-y-1">
                            <h3 className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                                {role === 'recruiter' ? 'Recruitment' : 'Management'}
                            </h3>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href ||
                                    (item.href !== '/dashboard/enterprise/owner' &&
                                        item.href !== '/dashboard/enterprise/recruiter' &&
                                        pathname.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className="relative block mb-1"
                                    >
                                        <motion.div
                                            whileHover={{ x: 4, backgroundColor: accentClasses.hoverBg }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`
                                                flex items-center gap-3.5 px-4 py-3 rounded-lg transition-all duration-300
                                                group border border-transparent
                                                ${isActive
                                                    ? `text-white ${accentClasses.activeBorder} ${accentClasses.activeBg} ${accentClasses.activeShadow}`
                                                    : 'text-slate-400 hover:text-white hover:border-slate-700/50'
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    relative z-10 transition-colors duration-300
                                                    ${isActive ? accentClasses.iconActive : `text-slate-500 group-hover:${accentClasses.iconActive}`}
                                                `}
                                            >
                                                {item.icon}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeIconGlow"
                                                        className={`absolute inset-0 ${accentClasses.iconGlow} blur-md rounded-full`}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                )}
                                            </span>
                                            <span className="relative z-10 font-medium text-[14px]">{item.label}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 ${accentClasses.indicatorBg} rounded-l-full ${accentClasses.indicatorShadow}`}
                                                />
                                            )}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>


                </div>
            </aside>
        </>
    );
}
