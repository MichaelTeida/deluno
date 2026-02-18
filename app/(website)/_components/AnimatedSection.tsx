"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 16 },
    },
};

interface Props {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: boolean;
}

export function AnimatedSection({ children, className, delay = 0, stagger }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    if (stagger) {
        return (
            <motion.div
                ref={ref}
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={ref}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div variants={staggerItem} className={className}>
            {children}
        </motion.div>
    );
}

export function TextReveal({ children, className }: { children: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const words = children.split(" ");

    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "110%" }}
                        animate={inView ? { y: 0 } : { y: "110%" }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.04,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {word}
                        {i < words.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
