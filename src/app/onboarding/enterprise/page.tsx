'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthAnimatedBackground from '@/components/AuthAnimatedBackground';
import { setEnterpriseRole, type EnterpriseRole } from '@/lib/enterprise-store';

interface FormData {
    first_name: string;
    last_name: string;
    phone: string;
    company_name: string;
    company_location: string;
    password: string;
    confirm_password: string;
    role: EnterpriseRole;
}

export default function EnterpriseOnboardingPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        phone: '',
        company_name: '',
        company_location: '',
        password: '',
        confirm_password: '',
        role: 'owner',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
    };

    const handleRoleSelect = (role: EnterpriseRole) => {
        setFormData(prev => ({ ...prev, role }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4321';
            const response = await fetch(`${API_BASE}/auth/complete-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    phone: formData.phone,
                    company_name: formData.company_name,
                    company_location: formData.company_location,
                    password: formData.password,
                    user_type: 'recruiter',
                    enterprise_role: formData.role,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the selected role and redirect to appropriate dashboard
                setEnterpriseRole(formData.role);
                router.push(`/dashboard/enterprise/${formData.role}`);
            } else {
                setError(data.message || 'Failed to save profile. Please try again.');
            }
        } catch {
            setError('Connection error. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <AuthAnimatedBackground />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-8 sm:py-12">
                <div className="max-w-lg mx-auto">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-5"
                    >
                        <Link href="/" className="inline-block">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white">
                                Job <span className="text-gradient-enterprise">Jarvis</span>
                            </h1>
                        </Link>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-violet-500/20 rounded-2xl blur-xl opacity-70" />

                        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5 sm:p-6 shadow-2xl">
                            <h2 className="text-lg font-semibold text-white text-center mb-1">Complete Your Profile</h2>
                            <p className="text-slate-500 text-xs text-center mb-4">Tell us about you and your company</p>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* Role Selection */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                        Your Role
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {([
                                            {
                                                value: 'owner' as EnterpriseRole,
                                                label: 'Owner',
                                                desc: 'Manage team & analytics',
                                                icon: (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                ),
                                                color: 'blue',
                                            },
                                            {
                                                value: 'recruiter' as EnterpriseRole,
                                                label: 'Recruiter',
                                                desc: 'Manage candidates',
                                                icon: (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                ),
                                                color: 'violet',
                                            },
                                        ]).map((option) => {
                                            const isSelected = formData.role === option.value;
                                            const colorClass = option.color === 'blue'
                                                ? {
                                                    border: isSelected ? 'border-blue-500 shadow-[0_0_15px_-3px_rgba(59,130,246,0.4)]' : 'border-slate-700/50 hover:border-blue-500/30',
                                                    bg: isSelected ? 'bg-blue-500/10' : 'bg-slate-800/50',
                                                    icon: isSelected ? 'text-blue-400' : 'text-slate-500',
                                                    text: isSelected ? 'text-blue-300' : 'text-slate-400',
                                                    dot: 'bg-blue-500',
                                                }
                                                : {
                                                    border: isSelected ? 'border-violet-500 shadow-[0_0_15px_-3px_rgba(139,92,246,0.4)]' : 'border-slate-700/50 hover:border-violet-500/30',
                                                    bg: isSelected ? 'bg-violet-500/10' : 'bg-slate-800/50',
                                                    icon: isSelected ? 'text-violet-400' : 'text-slate-500',
                                                    text: isSelected ? 'text-violet-300' : 'text-slate-400',
                                                    dot: 'bg-violet-500',
                                                };

                                            return (
                                                <motion.button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => handleRoleSelect(option.value)}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`relative p-3 rounded-xl border transition-all duration-300 text-left ${colorClass.border} ${colorClass.bg}`}
                                                >
                                                    <div className="flex items-center gap-2.5 mb-1">
                                                        <span className={`transition-colors duration-300 ${colorClass.icon}`}>
                                                            {option.icon}
                                                        </span>
                                                        <span className={`font-semibold text-sm transition-colors duration-300 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                                            {option.label}
                                                        </span>
                                                    </div>
                                                    <p className={`text-[11px] ml-[30px] transition-colors duration-300 ${colorClass.text}`}>
                                                        {option.desc}
                                                    </p>

                                                    {/* Selection indicator */}
                                                    <AnimatePresence>
                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                exit={{ scale: 0 }}
                                                                className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full ${colorClass.dot}`}
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
                                        placeholder="+1 (555) 000-0000"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
                                            placeholder="Acme Inc."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">
                                            Company Location
                                        </label>
                                        <input
                                            type="text"
                                            name="company_location"
                                            value={formData.company_location}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
                                            placeholder="San Francisco, CA"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">
                                            Create Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            value={formData.confirm_password}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all text-sm"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm mt-4"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 mx-auto border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        'Continue'
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
