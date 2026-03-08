'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import JobJarvisLogo from '../JobJarvisLogo';
import { logout, User } from '@/lib/auth';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

const navItems: NavItem[] = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
        ),
    },
    {
        label: 'Job Feed',
        href: '/dashboard/jobs',
        badge: 24,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        label: 'My Applications',
        href: '/dashboard/applications',
        badge: 3,
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
    },
    {
        label: 'Analytics',
        href: '/dashboard/analytics',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

interface DashboardSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user?: User | null;
}

export default function DashboardSidebar({ isOpen, onClose, user }: DashboardSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const sidebarRef = useRef<HTMLElement>(null);

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

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const userInitial = user?.first_name?.[0]?.toUpperCase() || 'U';

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
                    fixed top-0 left-0 bottom-0 w-[240px] z-50
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:sticky lg:top-0 lg:z-auto lg:flex-shrink-0 lg:h-screen
                `}
            >
                {/* Glass background */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/98 to-slate-950/95 backdrop-blur-2xl border-r border-slate-800/50" />

                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/5 to-transparent" />

                <div className="relative flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-5 pb-6">
                        <Link href="/dashboard" className="flex items-center gap-3 group" onClick={onClose}>
                            <JobJarvisLogo size="md" />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href ||
                                (item.href !== '/dashboard' && pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="relative block"
                                >
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {/* Active background */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-transparent rounded-xl"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        {/* Active indicator line */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeLine"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-r-full"
                                            />
                                        )}

                                        {/* Icon */}
                                        <span className={`relative z-10 transition-colors ${isActive ? 'text-blue-400' : 'group-hover:text-blue-400'}`}>
                                            {item.icon}
                                        </span>

                                        {/* Label */}
                                        <span className="relative z-10 font-medium text-[15px] whitespace-nowrap">{item.label}</span>

                                        {/* Badge */}
                                        {item.badge && (
                                            <span className={`ml-auto relative z-10 px-2.5 py-0.5 text-[11px] font-bold rounded-full ${isActive
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-slate-700 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400'
                                                } transition-colors`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Section — Logout only */}
                    <div className="p-3 mt-auto border-t border-slate-800/40">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-700/40 hover:border-red-500/30 transition-all text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
