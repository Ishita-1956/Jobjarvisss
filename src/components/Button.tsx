'use client';

import { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const variants = {
  primary: `
    bg-gradient-to-r from-blue-500 to-violet-500
    text-white font-semibold
    hover:from-blue-400 hover:to-violet-400
    shadow-lg shadow-blue-500/25
    hover:shadow-blue-500/40
  `,
  secondary: `
    bg-transparent
    border border-slate-700
    text-white font-medium
    hover:border-blue-500/50
    hover:bg-blue-500/10
  `,
  ghost: `
    bg-transparent
    text-slate-300
    hover:text-white
    hover:bg-white/5
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        relative inline-flex items-center justify-center gap-2
        transition-all duration-300 ease-out
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
}

