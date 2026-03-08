'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function SectionWrapper({
    children,
    className = '',
    id,
}: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className={`
        relative
        py-6 md:py-8 lg:py-10
        overflow-hidden
        ${className}
      `}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                {children}
            </div>
        </motion.section>
    );
}
