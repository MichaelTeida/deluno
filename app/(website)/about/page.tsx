"use client";

import Link from "next/link";
import { AnimatedSection, StaggerItem } from "../_components/AnimatedSection";

const TEAM = [
    { name: "Michael", role: "Founder & Lead Developer", initials: "MT", gradient: "from-indigo-500 to-violet-600" },
    { name: "You?", role: "We are always looking for talent", initials: "??", gradient: "from-zinc-400 to-zinc-500" },
];

const VALUES = [
    {
        title: "Craft over speed",
        description: "We ship polished, not fast. Every pixel, transition, and interaction is intentional.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
    },
    {
        title: "Privacy as a promise",
        description: "Your data is yours. No ads, no mining, no selling. Simple.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    },
    {
        title: "Designed for humans",
        description: "Software should feel natural. We build for people who appreciate beautiful tools.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
    },
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20">
            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 text-center mb-28">
                <AnimatedSection>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
                        Built by people who <span className="homepage-gradient-text">care about tools</span>
                    </h1>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[560px] mx-auto leading-relaxed">
                        Deluno started from a simple frustration: why does every productivity app feel cluttered, slow, or ugly? We set out to build something different.
                    </p>
                </AnimatedSection>
            </section>

            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mb-28">
                <AnimatedSection className="text-center mb-14">
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">What drives us</h2>
                </AnimatedSection>
                <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {VALUES.map((v) => (
                        <StaggerItem key={v.title}>
                            <div className="glass p-8 rounded-2xl h-full transition-all duration-500 hover:translate-y-[-3px]" data-variant="card">
                                <div className="w-11 h-11 glass rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                                    {v.icon}
                                </div>
                                <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-2">{v.title}</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{v.description}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </AnimatedSection>
            </section>

            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mb-28">
                <AnimatedSection className="text-center mb-14">
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">The team</h2>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 mt-3 max-w-[460px] mx-auto">
                        Small by choice. Everyone on the team ships code, designs interfaces, and talks to users.
                    </p>
                </AnimatedSection>
                <AnimatedSection stagger className="flex justify-center gap-5 flex-wrap">
                    {TEAM.map((m) => (
                        <StaggerItem key={m.name}>
                            <div className="glass p-8 rounded-2xl text-center w-60 transition-all duration-500 hover:translate-y-[-3px]" data-variant="card">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white text-xl font-bold mx-auto mb-5 shadow-lg`}>
                                    {m.initials}
                                </div>
                                <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white">{m.name}</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{m.role}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </AnimatedSection>
            </section>

            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
                <AnimatedSection>
                    <div className="glass rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden" data-variant="panel">
                        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                            <div className="absolute top-0 right-1/4 w-[300px] h-[300px] opacity-20 homepage-glow-pulse"
                                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 60%)" }} />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
                                Want to be part of it?
                            </h2>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 max-w-[420px] mx-auto">
                                Whether as a user or a contributor, we would love to have you.
                            </p>
                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                <Link href="/sign-up" className="btn-glass text-sm" data-variant="cta" style={{ height: 44, padding: "0 1.75rem" }}>
                                    Try Deluno free
                                </Link>
                                <Link href="/contact" className="btn-glass text-sm" style={{ height: 44, padding: "0 1.75rem" }}>
                                    Get in touch
                                </Link>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    );
}
