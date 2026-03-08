'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glow?: boolean;
}

export default function Card({
    children,
    className = '',
    hover = true,
    glow = false,
}: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={hover ? { y: -8, scale: 1.01 } : undefined}
            transition={{ duration: 0.3 }}
            className={`
        relative
        bg-gradient-to-br from-slate-900/80 to-slate-900/40
        backdrop-blur-xl
        border border-slate-800/50
        rounded-2xl
        p-6
        transition-all duration-300
        ${hover ? 'hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10' : ''}
        ${glow ? 'shadow-lg shadow-blue-500/20' : ''}
        ${className}
      `}
        >
            {glow && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 pointer-events-none" />
            )}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
