"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const NAV_LINKS = [
    { label: "Features", href: "/#features" },
    { label: "Apps", href: "/#apps" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
        >
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
                <nav
                    className="liquid-glass-v5 px-8 rounded-2xl transition-all duration-500 grid grid-cols-[auto_1fr_auto] items-center relative"
                    style={{ height: scrolled ? 54 : 58 }}
                >
                    <Link href="/" className="flex items-center gap-2.5 shrink-0 group z-10" aria-label="Deluno Home">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-[10px] tracking-tight shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
                            DO
                        </div>
                        <span className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                            Deluno
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 w-max">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 px-4 py-2 rounded-full"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-2.5 justify-end z-10 col-start-3">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="w-9 h-9 rounded-full glass flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
                                aria-label="Toggle theme"
                                data-variant="interactive"
                            >
                                {theme === "dark" ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                                )}
                            </button>
                        )}
                        <Link
                            href="/sign-in"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 px-3 py-2"
                        >
                            Log in
                        </Link>
                        <Link href="/sign-up" className="btn-glass text-sm" data-variant="cta" style={{ height: 36, padding: "0 1.5rem" }}>
                            Get Started Free
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden ml-auto w-10 h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 z-10 col-start-3"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" /></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M4 8h16M4 16h16" /></svg>
                        )}
                    </button>
                </nav>
            </div>

            {mobileOpen && (
                <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 mt-2">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden liquid-glass-v5 rounded-2xl p-4 shadow-xl"
                    >
                        <div className="flex flex-col gap-0.5">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 py-2.5 px-3 rounded-xl transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="my-2 border-zinc-200/50 dark:border-white/10" />
                            <div className="flex items-center justify-between px-3">
                                <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 py-2.5">
                                    Log in
                                </Link>
                                {mounted && (
                                    <button
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                        className="w-9 h-9 rounded-full glass flex items-center justify-center text-zinc-500 dark:text-zinc-400"
                                        data-variant="interactive"
                                        aria-label="Toggle theme"
                                    >
                                        {theme === "dark" ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                                        )}
                                    </button>
                                )}
                            </div>
                            <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="btn-glass text-center justify-center mt-1 text-sm" data-variant="cta">
                                Get Started Free
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.header>
    );
}
