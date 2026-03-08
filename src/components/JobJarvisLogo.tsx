'use client';

import { motion } from 'framer-motion';

interface JobJarvisLogoProps {
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
    showSubtext?: boolean;
    className?: string;
}

const sizeConfig = {
    sm: { icon: 'w-8 h-8', iconInner: 'w-4 h-4', text: 'text-lg', gap: 'gap-2' },
    md: { icon: 'w-10 h-10', iconInner: 'w-5 h-5', text: 'text-xl', gap: 'gap-3' },
    lg: { icon: 'w-12 h-12', iconInner: 'w-6 h-6', text: 'text-2xl', gap: 'gap-3' },
};

export default function JobJarvisLogo({
    size = 'md',
    showText = false,
    showSubtext = false,
    className = '',
}: JobJarvisLogoProps) {
    const config = sizeConfig[size];

    return (
        <div className={`flex items-center ${config.gap} ${className}`}>
            <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className={`${config.icon} rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/25 relative overflow-hidden`}
            >
                {/* Shimmer overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                {/* Lightning bolt icon */}
                <svg
                    className={`${config.iconInner} text-white relative z-10`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </svg>
                {/* Ambient glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-violet-400/20 blur-sm" />
            </motion.div>

            {showText && (
                <div>
                    <h1 className={`${config.text} font-bold text-white leading-tight`}>
                        Job
                        <span className="text-gradient">
                            Jarvis
                        </span>
                    </h1>
                    {showSubtext && (
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                            AI Career Assistant
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
