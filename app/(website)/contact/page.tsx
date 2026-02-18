"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { AnimatedSection, StaggerItem } from "../_components/AnimatedSection";

const CONTACT_OPTIONS = [
    {
        title: "General questions",
        description: "Product, features, or account inquiries. We respond within 24 hours.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
    },
    {
        title: "Partnership",
        description: "Interested in working together? We'd love to explore the opportunity.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
    },
    {
        title: "Bug reports",
        description: "Found something broken? Use the form below and we'll prioritize it.",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152-6.135c-.022-.584-.187-1.163-.49-1.673a3.001 3.001 0 00-3.498-1.39c-.555.156-1.058.468-1.397.899-.34.43-.83.724-1.361.763a1.71 1.71 0 01-1.361-.763 2.994 2.994 0 00-1.397-.899 3 3 0 00-3.498 1.39c-.303.51-.468 1.089-.49 1.673a23.91 23.91 0 01-1.152 6.134A24.082 24.082 0 0112 12.75z" /></svg>,
    },
];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="pt-32 pb-20">
            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 text-center mb-20">
                <AnimatedSection>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
                        Let&apos;s <span className="homepage-gradient-text">talk</span>
                    </h1>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[480px] mx-auto">
                        Have a question, idea, or just want to say hello? We read every message.
                    </p>
                </AnimatedSection>
            </section>

            <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mb-20">
                <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {CONTACT_OPTIONS.map((opt) => (
                        <StaggerItem key={opt.title}>
                            <div className="glass p-8 rounded-2xl h-full transition-all duration-500 hover:translate-y-[-3px]" data-variant="website">
                                <div className="w-11 h-11 glass rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-5">
                                    {opt.icon}
                                </div>
                                <h3 className="text-[15px] font-bold text-zinc-900 dark:text-white mb-2">{opt.title}</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{opt.description}</p>
                            </div>
                        </StaggerItem>
                    ))}
                </AnimatedSection>
            </section>

            <section className="w-full max-w-[640px] mx-auto px-6 md:px-10">
                <AnimatedSection>
                    <div className="glass rounded-2xl p-8 sm:p-10" data-variant="website">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-7">Send a message</h2>

                        {submitted ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center mx-auto mb-5">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Message sent!</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">We will get back to you as soon as possible.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-400 mb-2">Name</label>
                                        <input id="name" type="text" required
                                            className="w-full px-4 py-3 rounded-xl glass text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                                            placeholder="Your name" style={{ background: "var(--effect-glass-bg)" }} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-400 mb-2">Email</label>
                                        <input id="email" type="email" required
                                            className="w-full px-4 py-3 rounded-xl glass text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                                            placeholder="your@email.com" style={{ background: "var(--effect-glass-bg)" }} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-400 mb-2">Subject</label>
                                    <input id="subject" type="text" required
                                        className="w-full px-4 py-3 rounded-xl glass text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                                        placeholder="What is this about?" style={{ background: "var(--effect-glass-bg)" }} />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-400 mb-2">Message</label>
                                    <textarea id="message" required rows={5}
                                        className="w-full px-4 py-3 rounded-xl glass text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all resize-none"
                                        placeholder="Tell us everything..." style={{ background: "var(--effect-glass-bg)" }} />
                                </div>
                                <button type="submit" className="btn-glass w-full justify-center text-sm" data-variant="cta">
                                    Send message
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Prefer to talk informally? <Link href="/sign-up" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Join the alpha</Link> and message us from your workspace.
                        </p>
                    </div>
                </AnimatedSection>
            </section>
        </div>
    );
}
