"use client";

import Link from "next/link";
import { AnimatedSection, StaggerItem } from "../_components/AnimatedSection";

const NOTER_FEATURES = [
    {
        title: "Rich text editing",
        description: "Powered by Tiptap with headings, lists, quotes, code blocks, inline badges, and more.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
    },
    {
        title: "Slash commands",
        description: "Type / to insert headings, lists, code blocks, dividers, and more. Fast, keyboard-first.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>,
    },
    {
        title: "Drag and drop sidebar",
        description: "Organize notes by dragging them between sections. Favorites, private, and shared categories.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
    },
    {
        title: "Real-time sync",
        description: "Every keystroke saves instantly. Open on your phone, continue on your laptop. Zero lag.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    },
    {
        title: "Dashboard view",
        description: "See all your notes at a glance with recent activity, favorites, and quick access.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" /></svg>,
    },
    {
        title: "Trash and recovery",
        description: "Accidentally deleted something? Restore it from trash with one click.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
    },
];

export default function NoterPage() {
    return (
        <div className="pt-32 pb-20">
            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 text-center mb-28">
                <AnimatedSection>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
                        <span className="homepage-gradient-text">Noter</span>
                    </h1>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[520px] mx-auto leading-relaxed mb-10">
                        Write, organize, and connect your thoughts. Rich text editing with slash commands, drag and drop ordering, and instant sync across all your devices.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/sign-up" className="btn-glass text-sm" data-variant="cta" style={{ height: 48, padding: "0 2rem" }}>
                            Start writing for free
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Link>
                        <Link href="/" className="btn-glass text-sm" style={{ height: 48, padding: "0 2rem" }}>
                            Back to overview
                        </Link>
                    </div>
                </AnimatedSection>
            </section>

            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mb-28">
                <AnimatedSection className="text-center mb-14">
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        Everything you need to write
                    </h2>
                </AnimatedSection>
                <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {NOTER_FEATURES.map((f) => (
                        <StaggerItem key={f.title}>
                            <div className="glass p-7 rounded-2xl h-full transition-all duration-500 hover:translate-y-[-3px]" data-variant="card">
                                <div className="w-11 h-11 glass rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
                                    {f.icon}
                                </div>
                                <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-2">{f.title}</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.description}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </AnimatedSection>
            </section>

            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
                <AnimatedSection>
                    <div className="glass rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden" data-variant="panel">
                        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                            <div className="absolute top-0 left-1/3 w-[350px] h-[350px] opacity-20 homepage-glow-pulse"
                                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 60%)" }} />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
                                Start writing with Noter
                            </h2>
                            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 max-w-[420px] mx-auto">
                                Free during alpha. Your notes sync instantly, look beautiful, and are always accessible.
                            </p>
                            <Link href="/sign-up" className="btn-glass text-sm" data-variant="cta" style={{ height: 48, padding: "0 2rem" }}>
                                Get started for free
                            </Link>
                        </div>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    );
}
