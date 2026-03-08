'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingShape {
    id: number;
    x: number;
    y: number;
    size: number;
    rotation: number;
    type: 'hexagon' | 'circle' | 'ring' | 'diamond';
    opacity: number;
    duration: number;
}

export default function AuthAnimatedBackground() {
    const [shapes, setShapes] = useState<FloatingShape[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Generate floating geometric shapes
        const newShapes: FloatingShape[] = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 80 + 40,
            rotation: Math.random() * 360,
            type: (['hexagon', 'circle', 'ring', 'diamond'] as const)[Math.floor(Math.random() * 4)],
            opacity: Math.random() * 0.08 + 0.02,
            duration: Math.random() * 20 + 15,
        }));
        setShapes(newShapes);
    }, []);

    const renderShape = (shape: FloatingShape) => {
        const baseClass = "absolute";

        switch (shape.type) {
            case 'hexagon':
                return (
                    <svg
                        viewBox="0 0 100 100"
                        className={baseClass}
                        style={{
                            width: shape.size,
                            height: shape.size,
                            left: `${shape.x}%`,
                            top: `${shape.y}%`,
                        }}
                    >
                        <polygon
                            points="50,3 94,25 94,75 50,97 6,75 6,25"
                            fill="none"
                            stroke="url(#shapeGradient)"
                            strokeWidth="1"
                            opacity={shape.opacity * 3}
                        />
                    </svg>
                );
            case 'circle':
                return (
                    <div
                        className={`${baseClass} rounded-full border border-blue-500/20`}
                        style={{
                            width: shape.size,
                            height: shape.size,
                            left: `${shape.x}%`,
                            top: `${shape.y}%`,
                            opacity: shape.opacity * 3,
                        }}
                    />
                );
            case 'ring':
                return (
                    <div
                        className={`${baseClass} rounded-full border-2 border-violet-500/15`}
                        style={{
                            width: shape.size * 1.5,
                            height: shape.size * 1.5,
                            left: `${shape.x}%`,
                            top: `${shape.y}%`,
                            opacity: shape.opacity * 2,
                        }}
                    />
                );
            case 'diamond':
                return (
                    <div
                        className={`${baseClass} border border-cyan-500/20`}
                        style={{
                            width: shape.size * 0.7,
                            height: shape.size * 0.7,
                            left: `${shape.x}%`,
                            top: `${shape.y}%`,
                            transform: 'rotate(45deg)',
                            opacity: shape.opacity * 3,
                        }}
                    />
                );
            default:
                return null;
        }
    };

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Deep base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

            {/* Mesh gradient overlay */}
            <div className="absolute inset-0 opacity-60">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
                            radial-gradient(ellipse 40% 30% at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
                        `
                    }}
                />
            </div>

            {/* Large animated gradient orbs */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)',
                    left: '-15%',
                    top: '-20%',
                    filter: 'blur(60px)',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
                    right: '-10%',
                    top: '10%',
                    filter: 'blur(80px)',
                }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.6, 0.9, 0.6],
                    x: [0, -40, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 70%)',
                    left: '30%',
                    bottom: '-15%',
                    filter: 'blur(70px)',
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
                    x: [0, -30, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Additional pulsing orb for depth */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 60%)',
                    right: '20%',
                    bottom: '20%',
                    filter: 'blur(50px)',
                }}
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            />

            {/* Floating geometric shapes */}
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <defs>
                    <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                    </linearGradient>
                </defs>
            </svg>

            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, shape.id % 2 === 0 ? 20 : -20, 0],
                        rotate: [shape.rotation, shape.rotation + 180, shape.rotation],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    {renderShape(shape)}
                </motion.div>
            ))}

            {/* Animated grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                    <linearGradient id="gridLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[...Array(5)].map((_, i) => (
                    <motion.line
                        key={`h-${i}`}
                        x1="0%"
                        y1={`${20 + i * 15}%`}
                        x2="100%"
                        y2={`${20 + i * 15}%`}
                        stroke="url(#gridLineGradient)"
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </svg>

            {/* Particle dots */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-blue-400"
                    style={{
                        left: `${10 + (i * 4.5)}%`,
                        top: `${15 + ((i * 17) % 70)}%`,
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.5, 0],
                        y: [0, -40, -80],
                    }}
                    transition={{
                        duration: 4 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: 'easeOut',
                    }}
                />
            ))}

            {/* Glowing accent lines */}
            <motion.div
                className="absolute left-0 right-0 h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.6), transparent)',
                    top: '40%',
                }}
                animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scaleX: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute top-0 bottom-0 w-px"
                style={{
                    background: 'linear-gradient(180deg, transparent, rgba(6, 182, 212, 0.5), rgba(139, 92, 246, 0.5), transparent)',
                    left: '60%',
                }}
                animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scaleY: [0.9, 1, 0.9],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30" />
        </div>
    );
}
