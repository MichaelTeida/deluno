"use client";

import Link from "next/link";
import { AnimatedSection, StaggerItem } from "./AnimatedSection";

const TIERS = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        features: ["Up to 50 notes", "Basic editor", "Single device", "Community support"],
        cta: "Start free",
        highlighted: false,
    },
    {
        name: "Alpha",
        price: "$0",
        period: "while in alpha",
        features: ["Unlimited notes", "Rich editor + blocks", "Multi-device sync", "Priority support", "Early adopter badge"],
        cta: "Join alpha",
        highlighted: true,
    },
    {
        name: "Pro",
        price: "$9",
        period: "/month",
        features: ["Everything in Alpha", "Team workspaces", "API access", "Advanced integrations", "Custom branding"],
        cta: "Coming soon",
        highlighted: false,
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="py-32">
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10">
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-5">
                        Simple, <span className="homepage-gradient-text">transparent</span> pricing
                    </h2>
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-[520px] mx-auto">
                        Start for free. Upgrade when you&apos;re ready.
                    </p>
                </AnimatedSection>

                <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {TIERS.map((tier) => (
                        <StaggerItem key={tier.name}>
                            <div
                                className={`glass rounded-2xl p-7 h-full flex flex-col relative transition-all duration-500 hover:translate-y-[-3px] ${tier.highlighted ? "ring-2 ring-indigo-500/40" : ""}`}
                                data-variant="card"
                            >
                                {tier.highlighted && (
                                    <div className="absolute -top-px left-6 right-6 h-[2px] rounded-b bg-gradient-to-r from-indigo-500 to-violet-500" />
                                )}
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{tier.name}</h3>
                                <div className="flex items-baseline gap-1 mb-5">
                                    <span className="text-3xl font-bold text-zinc-900 dark:text-white">{tier.price}</span>
                                    <span className="text-sm text-zinc-500 dark:text-zinc-500">{tier.period}</span>
                                </div>
                                <ul className="space-y-2.5 mb-8 flex-1">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                                            <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={tier.highlighted ? "/sign-up" : "#"}
                                    className={`btn-glass w-full justify-center text-sm ${tier.highlighted ? "" : ""}`}
                                    data-variant={tier.highlighted ? "cta" : undefined}
                                >
                                    {tier.cta}
                                </Link>
                            </div>
                        </StaggerItem>
                    ))}
                </AnimatedSection>
            </div>
        </section>
    );
}
