"use client";

import { useTheme } from "next-themes";
import { UserProfile, useUser } from "@clerk/nextjs";
import { useState } from "react";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { isLoaded, isSignedIn } = useUser();
    const [activeTab, setActiveTab] = useState<'general' | 'account'>('general');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl flex overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in duration-200">

                {/* Sidebar */}
                <div className="w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-2">
                    <h2 className="text-lg font-bold px-2 mb-4 text-zinc-900 dark:text-zinc-100">Settings</h2>

                    <button
                        onClick={() => setActiveTab('general')}
                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'general' ? 'bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        General
                    </button>
                    <button
                        onClick={() => setActiveTab('account')}
                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'account' ? 'bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Account
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header */}
                    <div className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 shrink-0">
                        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                            {activeTab === 'general' ? 'General' : 'Account'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="glass w-8 h-8 flex items-center justify-center rounded-full text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                            data-variant="interactive"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8">
                        {activeTab === 'general' && (
                            <div className="space-y-8 max-w-xl">
                                {/* Appearance */}
                                <section>
                                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 uppercase tracking-wider">Appearance</h4>
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-3">
                                            <label className="text-sm text-zinc-600 dark:text-zinc-400">App Theme</label>
                                            <div className="grid grid-cols-3 gap-3">
                                                <button
                                                    onClick={() => setTheme("light")}
                                                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${theme === 'light' && resolvedTheme === 'light' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'}`}
                                                >
                                                    <div className="w-full aspect-video bg-white rounded-md border border-zinc-200 shadow-sm"></div>
                                                    <span className="text-xs font-medium">Light</span>
                                                </button>
                                                <button
                                                    onClick={() => setTheme("dark")}
                                                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${theme === 'dark' && resolvedTheme === 'dark' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'}`}
                                                >
                                                    <div className="w-full aspect-video bg-zinc-900 rounded-md border border-zinc-700 shadow-sm"></div>
                                                    <span className="text-xs font-medium">Dark</span>
                                                </button>
                                                <button
                                                    onClick={() => setTheme("system")}
                                                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${theme === 'system' ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'}`}
                                                >
                                                    <div className="w-full aspect-video bg-gradient-to-br from-white to-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-700 shadow-sm"></div>
                                                    <span className="text-xs font-medium">System</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'account' && (
                            <div className="h-full w-full">
                                {isLoaded && isSignedIn ? (
                                    <UserProfile
                                        appearance={{
                                            elements: {
                                                rootBox: "w-full h-full",
                                                card: "shadow-none border-none w-full h-full bg-transparent",
                                                navbar: "hidden",
                                                pageScrollBox: "p-0",
                                                headerTitle: "hidden",
                                                headerSubtitle: "hidden"
                                            }
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-zinc-500">
                                        Loading account settings...
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
