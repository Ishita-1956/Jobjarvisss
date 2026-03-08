'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthAnimatedBackground from '@/components/AuthAnimatedBackground';
import { initiateGoogleOAuth, loginWithCredentials } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function EnterpriseLoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        emailOrId: '',
        password: '',
    });

    const handleGoogleLogin = () => {
        setIsGoogleLoading(true);
        initiateGoogleOAuth('recruiter');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await loginWithCredentials(formData.emailOrId, formData.password, 'recruiter');

        if (result.success && result.data) {
            if (result.data.redirect_url) {
                router.push(result.data.redirect_url);
            } else {
                router.push('/dashboard');
            }
        } else {
            setError(result.error || 'Login failed. Please check your credentials.');
        }

        setIsLoading(false);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <AuthAnimatedBackground />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-4 sm:py-6">
                <div className="max-w-md mx-auto">
                    {/* Logo & Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-4"
                    >
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h1 className="text-base font-bold text-white">
                                Job <span className="text-gradient">Jarvis</span>
                            </h1>
                        </Link>
                    </motion.div>

                    {/* Login Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-violet-500/30 rounded-2xl blur-lg opacity-60" />

                        <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="px-6 pt-5 pb-4 text-center border-b border-slate-800/50">
                                <h2 className="text-lg font-bold text-white mb-1">Enterprise Login</h2>
                                <p className="text-slate-400 text-sm">Access your recruitment dashboard</p>
                            </div>

                            {/* Form Content */}
                            <div className="p-5">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-3"
                                    >
                                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {error}
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">
                                            Email or Username
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="emailOrId"
                                                value={formData.emailOrId}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 pl-10 bg-slate-800/60 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                                                placeholder="Enter your email or username"
                                                required
                                            />
                                            <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-300 mb-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 pl-10 pr-10 bg-slate-800/60 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                                                placeholder="Enter your password"
                                                required
                                            />
                                            <svg className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end">
                                        <a href="#" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-lg text-white text-sm font-semibold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 mx-auto border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            'Sign In'
                                        )}
                                    </motion.button>
                                </form>

                                {/* Divider */}
                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-700/50"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-4 bg-slate-900/90 text-slate-500 text-sm">or continue with</span>
                                    </div>
                                </div>

                                {/* Google Login */}
                                <motion.button
                                    onClick={handleGoogleLogin}
                                    disabled={isGoogleLoading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg font-medium text-sm bg-white text-gray-800 hover:bg-gray-50 transition-all disabled:opacity-70 shadow-lg"
                                >
                                    {isGoogleLoading ? (
                                        <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span>Google</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 bg-slate-800/30 border-t border-slate-800/50 text-center">
                                <p className="text-slate-400 text-sm">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/signup/enterprise" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-4 text-center"
                    >
                        <Link href="/login" className="text-slate-500 hover:text-slate-300 transition-colors text-sm inline-flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to account type
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
