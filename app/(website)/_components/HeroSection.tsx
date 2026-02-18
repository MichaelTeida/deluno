"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TextReveal } from "./AnimatedSection";

export default function HeroSection() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for mouse movement
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Transform mouse position to subtle movement
    const moveX = useTransform(springX, [-500, 500], [-30, 30]);
    const moveY = useTransform(springY, [-500, 500], [-30, 30]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const moveXVal = clientX - window.innerWidth / 2;
            const moveYVal = clientY - window.innerHeight / 2;
            mouseX.set(moveXVal);
            mouseY.set(moveYVal);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden 
        [mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]
    [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]">
            {/* Background Illustration & Glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
                {/* Autonomous floating layer - Random movement & Rotation & Pulse */}
                <motion.div
                    animate={{
                        x: [0, 10, -5, 8, -10, 0],
                        y: [0, -15, 5, -10, 15, 0],
                        rotate: [0, 6, -5, 1, -5, 0],
                        scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{
                        x: { duration: 50, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 60, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 70, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 60, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{ x: moveX, y: moveY }}
                    className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-10 transition-opacity duration-1000"
                >
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src="/images/Hero_Illustration-1200x800_WebP_transparentBG.webp"
                            alt=""
                            width={1600}
                            height={1000}
                            className="w-[140%] md:w-[110%] h-auto max-w-none transform scale-125 md:scale-110"
                            priority
                        />
                    </div>
                </motion.div>

                <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full opacity-40 homepage-glow-pulse"
                    style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 65%)" }} />
                <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full opacity-30 homepage-glow-pulse homepage-delay-3"
                    style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)" }} />
            </div>

            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 text-center pt-28 pb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2.5 glass px-5 py-2 rounded-full mb-10" data-variant="website"
                    style={{ cursor: "default" }}
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide uppercase">Alpha access is live</span>
                </motion.div>

                <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-bold tracking-[-0.03em] leading-[1.05] mb-7">
                    <TextReveal className="text-zinc-900 dark:text-white block">One workspace.</TextReveal>
                    <span className="homepage-gradient-text block overflow-hidden">
                        <motion.span
                            className="inline-block"
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Every tool.
                        </motion.span>
                    </span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-[540px] mx-auto leading-relaxed mb-12"
                >
                    Notes, tasks, and projects in a single place. Designed for clarity, built for speed, polished to the last pixel.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/sign-up" className="btn-glass text-sm" data-variant="cta" style={{ height: 48, padding: "0 2rem" }}>
                        Start for free
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </Link>
                    <Link href="/#features" className="btn-glass text-sm" style={{ height: 48, padding: "0 2rem" }}>
                        See what&apos;s inside
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-14 flex flex-col items-center gap-3"
                >
                    <div className="flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        ))}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">Loved by early testers &middot; No credit card required</p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-600 flex justify-center pt-2">
                    <div className="w-1 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
}
