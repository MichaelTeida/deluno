"use client";

import { AnimatedSection, StaggerItem } from "./AnimatedSection";

const TECH = [
    { name: "Next.js 16", color: "#000", darkColor: "#fff" },
    { name: "React 19", color: "#61dafb", darkColor: "#61dafb" },
    { name: "TypeScript", color: "#3178c6", darkColor: "#3178c6" },
    { name: "Tailwind CSS 4", color: "#06b6d4", darkColor: "#22d3ee" },
    { name: "Tiptap", color: "#6366f1", darkColor: "#818cf8" },
    { name: "Clerk", color: "#6c47ff", darkColor: "#a78bfa" },
    { name: "dnd-kit", color: "#e11d48", darkColor: "#fb7185" },
    { name: "framer-motion", color: "#e040fb", darkColor: "#e879f9" },
];

export default function TechStackSection() {
    return (
        <section className="py-32">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-5">
                        Built with the <span className="homepage-gradient-text">best tools</span>
                    </h2>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[520px] mx-auto">
                        Modern stack. Proven reliability. Open technologies.
                    </p>
                </AnimatedSection>

                <AnimatedSection stagger className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {TECH.map((t) => (
                        <StaggerItem key={t.name}>
                            <div className="glass rounded-xl p-5 flex flex-col items-center gap-3 text-center transition-all duration-300 hover:translate-y-[-2px]" data-variant="card">
                                <span
                                    className="text-lg font-bold"
                                    style={{ color: `var(--tech-color, ${t.color})` }}
                                >
                                    <span className="dark:hidden" style={{ color: t.color }}>{t.name}</span>
                                    <span className="hidden dark:inline" style={{ color: t.darkColor }}>{t.name}</span>
                                </span>
                            </div>
                        </StaggerItem>
                    ))}
                </AnimatedSection>
            </div>
        </section>
    );
}
