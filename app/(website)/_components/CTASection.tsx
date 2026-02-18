"use client";

import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

export default function CTASection() {
    return (
        <section className="py-32">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
                <AnimatedSection>
                    <div className="glass rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden" data-variant="website">
                        <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full opacity-30 homepage-glow-pulse"
                            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)" }}
                            aria-hidden="true" />
                        <div className="absolute bottom-[-80px] left-[-80px] w-[250px] h-[250px] rounded-full opacity-25 homepage-glow-pulse homepage-delay-3"
                            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)" }}
                            aria-hidden="true" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-5">
                                Ready to build <span className="homepage-gradient-text">something great</span>?
                            </h2>
                            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[460px] mx-auto mb-10">
                                Join the alpha. Free access, no credit card, no commitment.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/sign-up" className="btn-glass text-sm" data-variant="cta" style={{ height: 48, padding: "0 2rem" }}>
                                    Get started free
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </Link>
                                <Link href="/contact" className="btn-glass text-sm" style={{ height: 48, padding: "0 2rem" }}>
                                    Contact us
                                </Link>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
