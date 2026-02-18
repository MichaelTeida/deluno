"use client";

import { AnimatedSection, StaggerItem } from "./AnimatedSection";

const APPS = [
    {
        name: "Noter",
        tagline: "Rich notes with live blocks",
        description: "Tiptap rich editor, slash commands, drag & drop blocks, real-time sync across devices.",
        href: "/noter",
        gradient: "from-violet-500 to-indigo-600",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        ),
    },
    {
        name: "Tasko",
        tagline: "Task management, simplified",
        description: "Kanban boards, priorities, labels, and deadlines. Everything you need to ship on time.",
        href: "#",
        gradient: "from-emerald-500 to-teal-600",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

export default function AppsSection() {
    return (
        <section id="apps" className="py-32">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-5">
                        Apps built for <span className="homepage-gradient-text">focus</span>
                    </h2>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[520px] mx-auto">
                        Each tool in your workspace is crafted to do one thing exceptionally well.
                    </p>
                </AnimatedSection>

                <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {APPS.map((app) => (
                        <StaggerItem key={app.name}>
                            <a href={app.href} className="glass rounded-2xl p-8 block group transition-all duration-500 hover:translate-y-[-4px]" data-variant="card">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    {app.icon}
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{app.name}</h3>
                                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">{app.tagline}</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{app.description}</p>
                            </a>
                        </StaggerItem>
                    ))}
                </AnimatedSection>
            </div>
        </section>
    );
}
