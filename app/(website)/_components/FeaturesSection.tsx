"use client";

import Image from "next/image";
import { AnimatedSection, StaggerItem } from "./AnimatedSection";

const FEATURES = [
    {
        title: "Rich text editor",
        description: "Write with a full-featured Tiptap editor — blocks, highlights, embeds, and keyboard shortcuts.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
    },
    {
        title: "Drag & drop blocks",
        description: "Rearrange content intuitively. Move paragraphs, images, and tasks with a single gesture.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>,
    },
    {
        title: "Real-time sync",
        description: "Changes saved instantly across all your devices. No refresh, no conflict, no data loss.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.015 4.356v4.992" /></svg>,
    },
    {
        title: "Secure by default",
        description: "End-to-end auth with Clerk. Your data is protected with industry-standard encryption.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    },
    {
        title: "Dark & light modes",
        description: "Switch themes instantly. Both modes are carefully tuned for readability and comfort.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>,
    },
    {
        title: "Keyboard-first",
        description: "Slash commands, shortcuts, and quick actions. Navigate and create without touching the mouse.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>,
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1440px] opacity-40 dark:opacity-20 scale-110 blur-[8px]">
                    <Image
                        src="/images/Features_Section_Background-1440x600_WebP_transparentBG.webp"
                        alt=""
                        width={1440}
                        height={600}
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-5">
                        Everything you need, <span className="homepage-gradient-text">nothing you don&apos;t</span>
                    </h2>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[520px] mx-auto">
                        Built with precision. Each feature earns its place.
                    </p>
                </AnimatedSection>

                <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map((ft) => (
                        <StaggerItem key={ft.title}>
                            <div className="glass p-7 rounded-2xl h-full transition-all duration-500 hover:translate-y-[-3px]" data-variant="website">
                                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
                                    {ft.icon}
                                </div>
                                <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-2">{ft.title}</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{ft.description}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </AnimatedSection>
            </div>
        </section>
    );
}
