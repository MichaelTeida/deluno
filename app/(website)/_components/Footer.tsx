"use client";

import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

const FOOTER_LINKS = {
    Product: [
        { label: "Features", href: "/#features" },
        { label: "Apps", href: "/#apps" },
        { label: "Pricing", href: "/pricing" },
        { label: "Noter", href: "/noter" },
    ],
    Company: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
    ],
    Legal: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
    ],
};

export default function Footer() {
    return (
        <AnimatedSection>
            <footer className="border-t border-zinc-200/60 dark:border-white/5">
                <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                        <div className="col-span-2 md:col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[8px] font-bold">
                                    DO
                                </div>
                                <span className="text-sm font-bold text-zinc-900 dark:text-white">Deluno</span>
                            </Link>
                            <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-[200px]">
                                Your workspace for every idea. Notes, tasks, and projects in one place.
                            </p>
                        </div>

                        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="text-xs font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">{category}</h4>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link href={link.href} className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-zinc-200/60 dark:border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-zinc-400 dark:text-zinc-600">
                            &copy; {new Date().getFullYear()} Deluno. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors" aria-label="Twitter/X">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="#" className="text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-colors" aria-label="GitHub">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </AnimatedSection>
    );
}
