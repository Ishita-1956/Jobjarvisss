'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthAnimatedBackground from '@/components/AuthAnimatedBackground';
import { initiateGoogleOAuth } from '@/lib/auth';

export default function IndividualSignUpPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignup = () => {
        setIsLoading(true);
        initiateGoogleOAuth('jobseeker');
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <AuthAnimatedBackground />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-8 sm:py-12">
                <div className="max-w-md mx-auto">
                    {/* Logo & Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold text-white">
                                Job <span className="text-gradient">Jarvis</span>
                            </h1>
                        </Link>
                    </motion.div>

                    {/* Signup Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-2xl blur-lg opacity-60" />

                        <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="px-8 pt-8 pb-6 text-center border-b border-slate-800/50">
                                <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
                                <p className="text-slate-400 text-sm">Join Job Jarvis to supercharge your job search</p>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Google Signup */}
                                <motion.button
                                    onClick={handleGoogleSignup}
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full flex items-center justify-center gap-3 py-4 px-4 rounded-xl font-medium bg-white text-gray-800 hover:bg-gray-50 transition-all disabled:opacity-70 shadow-lg"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span>Continue with Google</span>
                                        </>
                                    )}
                                </motion.button>

                                {/* Info text */}
                                <p className="mt-6 text-center text-xs text-slate-500">
                                    By signing up, you agree to our{' '}
                                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-5 bg-slate-800/30 border-t border-slate-800/50 text-center">
                                <p className="text-slate-400 text-sm">
                                    Already have an account?{' '}
                                    <Link href="/login/individual" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                        Sign in
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
                        className="mt-6 text-center"
                    >
                        <Link href="/signup" className="text-slate-500 hover:text-slate-300 transition-colors text-sm inline-flex items-center gap-2">
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
