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
                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'general' ? 'bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'}`}
                    >
                        General
                    </button>
                    <button
                        onClick={() => setActiveTab('account')}
                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'account' ? 'bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'}`}
                    >
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
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
                        >
                            ✕
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
