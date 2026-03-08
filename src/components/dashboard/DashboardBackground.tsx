'use client';

import { useEffect, useRef } from 'react';

export default function DashboardBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            color: string;

            constructor(canvasWidth: number, canvasHeight: number) {
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.color = Math.random() > 0.5 ? '#3b82f6' : '#06b6d4';
            }

            update(canvasWidth: number, canvasHeight: number) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
                if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        function initParticles() {
            if (!canvas) return;
            const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
            particles = [];
            for (let i = 0; i < Math.min(particleCount, 50); i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        }

        function drawConnections() {
            if (!ctx || !canvas) return;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 150)})`;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient orbs
            const gradient1 = ctx.createRadialGradient(
                canvas.width * 0.2, canvas.height * 0.3, 0,
                canvas.width * 0.2, canvas.height * 0.3, 300
            );
            gradient1.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
            gradient1.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const gradient2 = ctx.createRadialGradient(
                canvas.width * 0.8, canvas.height * 0.7, 0,
                canvas.width * 0.8, canvas.height * 0.7, 400
            );
            gradient2.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
            gradient2.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient2;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update(canvas.width, canvas.height);
                particle.draw(ctx);
            });

            drawConnections();

            animationId = requestAnimationFrame(animate);
        }

        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0"
                style={{ opacity: 0.6 }}
            />
            {/* Grid pattern overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />
        </>
    );
}
