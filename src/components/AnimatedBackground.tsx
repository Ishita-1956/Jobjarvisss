'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
}

interface Spark {
    id: number;
    x: number;
    y: number;
    angle: number;
    length: number;
    speed: number;
    opacity: number;
}

interface GridLine {
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
}

export default function AnimatedBackground() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [sparks, setSparks] = useState<Spark[]>([]);
    const [gridLines, setGridLines] = useState<GridLine[]>([]);

    useEffect(() => {
        // Generate floating particles
        const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.2,
            color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)],
        }));
        setParticles(newParticles);

        // Generate tech sparks
        const newSparks: Spark[] = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            angle: Math.random() * 360,
            length: Math.random() * 60 + 40,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.6 + 0.2,
        }));
        setSparks(newSparks);

        // Generate circuit-like grid lines
        const newGridLines: GridLine[] = Array.from({ length: 20 }, (_, i) => {
            const isHorizontal = Math.random() > 0.5;
            const pos = Math.random() * 100;
            return {
                id: i,
                x1: isHorizontal ? 0 : pos,
                y1: isHorizontal ? pos : 0,
                x2: isHorizontal ? 100 : pos,
                y2: isHorizontal ? pos : 100,
                opacity: Math.random() * 0.15 + 0.05,
            };
        });
        setGridLines(newGridLines);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

            {/* Radial glow spots */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1.1, 1, 1.1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[80px]"
                />
            </div>

            {/* Circuit grid lines */}
            <svg className="absolute inset-0 w-full h-full">
                {gridLines.map((line) => (
                    <motion.line
                        key={line.id}
                        x1={`${line.x1}%`}
                        y1={`${line.y1}%`}
                        x2={`${line.x2}%`}
                        y2={`${line.y2}%`}
                        stroke="url(#gridGradient)"
                        strokeWidth="1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: line.opacity }}
                        transition={{ duration: 2, delay: line.id * 0.1 }}
                    />
                ))}
                <defs>
                    <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Tech Sparks - Electric lines shooting across */}
            {sparks.map((spark) => (
                <motion.div
                    key={spark.id}
                    className="absolute"
                    style={{
                        left: `${spark.x}%`,
                        top: `${spark.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, spark.opacity, spark.opacity, 0],
                        scale: [0, 1, 1, 0],
                        x: [0, Math.cos(spark.angle * Math.PI / 180) * spark.length],
                        y: [0, Math.sin(spark.angle * Math.PI / 180) * spark.length],
                    }}
                    transition={{
                        duration: spark.speed,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 3 + 2,
                        ease: 'easeOut',
                    }}
                >
                    <div
                        className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full shadow-lg shadow-cyan-400/50"
                        style={{
                            transform: `rotate(${spark.angle}deg)`,
                        }}
                    />
                </motion.div>
            ))}

            {/* Floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                    }}
                    animate={{
                        x: [0, particle.speedX * 100, 0],
                        y: [0, particle.speedY * 100, 0],
                        opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            {/* Pulsing nodes - tech connection points */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`node-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-blue-400"
                    style={{
                        left: `${15 + (i % 4) * 25}%`,
                        top: `${20 + Math.floor(i / 4) * 60}%`,
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3],
                        boxShadow: [
                            '0 0 10px #3b82f6',
                            '0 0 30px #3b82f6, 0 0 60px #3b82f6',
                            '0 0 10px #3b82f6',
                        ],
                    }}
                    transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                    }}
                />
            ))}

            {/* Scanning line effect */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                animate={{
                    top: ['0%', '100%', '0%'],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Hexagon grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 20V45L30 60L5 45V20L30 5Z' fill='none' stroke='%233b82f6' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/70" />
        </div>
    );
}
