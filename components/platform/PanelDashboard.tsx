"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PanelDashboard() {
    return (
        <div className="max-w-5xl mx-auto w-full py-8 md:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-600 mb-4">
                    Welcome to Deluno
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                    Your personal workspace for productivity. Select an app to get started.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {/* Noter Card */}
                <Link href="/panel/noter">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="glass p-6 rounded-2xl border border-white/20 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 transition-all cursor-pointer group h-full flex flex-col"
                        data-variant="card"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2 group-hover:text-indigo-500 transition-colors">Noter</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 flex-1">
                            Capture ideas, organize thoughts, and manage your knowledge base with a powerful Notion-style editor.
                        </p>
                        <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            Open App <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </motion.div>
                </Link>

                {/* Placeholder Card 1 */}
                <div className="glass p-6 rounded-2xl border border-white/20 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed h-full flex flex-col" data-variant="card">
                    <div className="w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">Planner</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 flex-1">
                        Coming soon. Manage your schedule and tasks effectively.
                    </p>
                    <div className="text-xs font-semibold px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-md self-start text-zinc-500">
                        In Development
                    </div>
                </div>

                {/* Placeholder Card 2 */}
                <div className="glass p-6 rounded-2xl border border-white/20 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed h-full flex flex-col" data-variant="card">
                    <div className="w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">Gallery</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 flex-1">
                        Coming soon. Organize your media assets in one place.
                    </p>
                    <div className="text-xs font-semibold px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-md self-start text-zinc-500">
                        Planned
                    </div>
                </div>
            </div>
        </div>
    );
}
