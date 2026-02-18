"use client";

import { AnimatedSection, StaggerItem } from "./AnimatedSection";

const TESTIMONIALS = [
    {
        name: "Anna K.",
        role: "Product designer",
        text: "Finally a workspace that doesn't feel like it was designed by committee. Every pixel is intentional.",
        stars: 5,
    },
    {
        name: "Tomek W.",
        role: "Indie hacker",
        text: "I replaced three separate tools with Deluno. The editor alone is worth switching for.",
        stars: 5,
    },
    {
        name: "Sarah M.",
        role: "Engineering lead",
        text: "The speed is unreal. Real-time sync, instant search, and it actually looks beautiful.",
        stars: 5,
    },
];

export default function TestimonialsSection() {
    return (
        <section className="py-32">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-5">
                        Loved by <span className="homepage-gradient-text">people who care</span>
                    </h2>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[520px] mx-auto">
                        Hear from alpha testers already using Deluno daily.
                    </p>
                </AnimatedSection>

                <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {TESTIMONIALS.map((t) => (
                        <StaggerItem key={t.name}>
                            <div className="glass rounded-2xl p-7 h-full flex flex-col" data-variant="website">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(t.stars)].map((_, i) => (
                                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                    ))}
                                </div>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 flex-1">&ldquo;{t.text}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </AnimatedSection>
            </div>
        </section>
    );
}
