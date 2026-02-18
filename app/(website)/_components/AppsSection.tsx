"use client";

import { AnimatedSection, StaggerItem } from "./AnimatedSection";

const APPS = [
    {
        name: "Noter",
        status: "Live",
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
        status: "Planned",
        tagline: "Task management",
        description: "Kanban boards, priorities, labels, and deadlines. Everything you need to ship on time.",
        href: "#",
        gradient: "from-emerald-500 to-teal-600",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        name: "Mailo",
        status: "Planned",
        tagline: "Email reinvented",
        description: "Zero inbox method, AI sorting, and quick replies. Communication made effortless.",
        href: "#",
        gradient: "from-blue-500 to-cyan-500",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
    },
    {
        name: "Calendo",
        status: "Planned",
        tagline: "Smart scheduling",
        description: "Beautiful calendar with smart scheduling links and team availability built-in.",
        href: "#",
        gradient: "from-orange-500 to-red-500",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
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
                            <a href={app.href} className="glass rounded-2xl p-8 block group transition-all duration-500 hover:translate-y-[-4px] relative overflow-hidden" data-variant="card">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        {app.icon}
                                    </div>
                                    {app.status === "Planned" && (
                                        <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                                            Planned
                                        </span>
                                    )}
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
