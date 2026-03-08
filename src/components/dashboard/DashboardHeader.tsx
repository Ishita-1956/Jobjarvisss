'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, logout } from '@/lib/auth';
import { getEnterpriseRole } from '@/lib/enterprise-store';

interface DashboardHeaderProps {
    user: User | null;
    onMenuClick: () => void;
}

export default function DashboardHeader({ user, onMenuClick }: DashboardHeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    const isEnterprise = pathname?.startsWith('/dashboard/enterprise');
    const role = isEnterprise
        ? (pathname?.includes('/enterprise/recruiter') ? 'recruiter'
            : pathname?.includes('/enterprise/owner') ? 'owner'
                : (typeof window !== 'undefined' ? getEnterpriseRole() : null))
        : null;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const profileLabel = isEnterprise
        ? (role === 'recruiter' ? 'Recruiter' : 'Owner')
        : 'Jobseeker';

    const profileLink = isEnterprise
        ? `/dashboard/enterprise/${role || 'owner'}/profile`
        : '/dashboard/profile';

    const avatarGradient = isEnterprise
        ? (role === 'recruiter' ? 'from-violet-500 to-purple-600' : 'from-blue-500 to-cyan-600')
        : 'from-violet-500 to-purple-600';

    const avatarShadow = isEnterprise
        ? (role === 'recruiter' ? 'shadow-violet-500/30' : 'shadow-blue-500/30')
        : 'shadow-violet-500/30';

    return (
        <header className="sticky top-0 z-40">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50" />

            <div className="relative flex items-center justify-between h-16 px-4 lg:px-6">
                {/* Left — mobile menu */}
                <div className="flex items-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </motion.button>
                </div>

                {/* Right — Profile Dropdown */}
                <div className="flex items-center gap-2 ml-auto">
                    <div ref={profileRef} className="relative">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-slate-800/50 transition-colors"
                        >
                            <div className="relative">
                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-semibold text-sm shadow-lg ${avatarShadow}`}>
                                    {user?.first_name?.[0]?.toUpperCase() || (isEnterprise ? (role === 'recruiter' ? 'R' : 'O') : 'U')}
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-white text-sm font-medium leading-tight">
                                    {user ? `${user.first_name} ${user.last_name}` : profileLabel}
                                </p>
                                <p className="text-slate-500 text-xs leading-tight">{profileLabel}</p>
                            </div>
                            <motion.svg
                                className="w-4 h-4 text-slate-500 hidden lg:block"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ rotate: isProfileOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </motion.svg>
                        </motion.button>

                        {/* Profile Dropdown */}
                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl shadow-black/50 overflow-hidden"
                                >
                                    {/* User Info */}
                                    <div className="p-4 border-b border-slate-800/50">
                                        <p className="text-white font-semibold text-sm">
                                            {user ? `${user.first_name} ${user.last_name}` : profileLabel}
                                        </p>
                                        <p className="text-slate-500 text-xs mt-0.5">
                                            {user?.email || `${profileLabel.toLowerCase()}@company.com`}
                                        </p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="p-2">
                                        <Link
                                            href={profileLink}
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors text-sm"
                                        >
                                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Edit Profile
                                        </Link>

                                        {isEnterprise && role === 'owner' && (
                                            <Link
                                                href="/dashboard/enterprise/owner/settings"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors text-sm"
                                            >
                                                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Company Settings
                                            </Link>
                                        )}
                                    </div>

                                    {/* Logout */}
                                    <div className="p-2 border-t border-slate-800/50">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sign Out
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
