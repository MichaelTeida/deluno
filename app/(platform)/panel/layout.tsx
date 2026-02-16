"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { PlatformProvider, usePlatform } from "@/lib/contexts/PlatformContext";
import { NoterProvider, useNoter } from "@/lib/contexts/NoterContext";
import AppRail from "@/components/platform/AppRail";
import SidebarLayout from "@/components/platform/SidebarLayout";
import NoterSidebarContent from "@/components/noter/NoterSidebarContent";
import NoterBreadcrumbs from "@/components/noter/NoterBreadcrumbs";
import SettingsModal from "@/components/SettingsModal";
import SearchCommand from "@/components/SearchCommand";

function PanelContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user } = useUser();
    const {
        isNavOpen, setIsNavOpen,
        isSidebarVisible, setIsSidebarVisible,
        isSettingsOpen, setIsSettingsOpen,
        isSearchOpen, setIsSearchOpen,
    } = usePlatform();

    const isNoter = pathname?.startsWith('/panel/noter');
    const isAppRoute = pathname !== '/panel';

    const noterContext = isNoter ? useNoterSafe() : null;
    const activeNote = noterContext?.activeNote ?? null;

    useEffect(() => {
        setIsNavOpen(false);
    }, [pathname, activeNote?.id]);

    const pageTitle = isNoter ? 'Noter' : 'Dashboard';

    return (
        <div className="flex flex-col h-dvh w-full text-zinc-800 dark:text-zinc-200 p-2 md:p-4 gap-2 md:gap-4 overflow-hidden" style={{ paddingLeft: 'max(0.5rem, env(safe-area-inset-left))', paddingRight: 'max(0.5rem, env(safe-area-inset-right))' }}>

            {/* HEADER */}
            <header className="h-12 md:h-16 shrink-0 glass bg-white/40 dark:bg-black/30 flex items-center justify-between px-3 md:px-6 z-50" data-variant="panel">
                <div className="flex items-center gap-2 md:gap-4 lg:gap-6 overflow-hidden min-w-0 pr-2">
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="md:hidden glass w-12 h-12 flex items-center justify-center text-zinc-600 rounded-full"
                        data-variant="interactive"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    <Link href="/panel" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity shrink-0">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-[10px] md:text-xs shadow-lg">
                            DO
                        </div>
                        <span className="font-bold text-base md:text-lg tracking-tight text-zinc-900 dark:text-zinc-100 hidden sm:block shrink-0">Deluno</span>
                    </Link>

                    <div className="h-6 w-[1px] bg-black/10 hidden md:block"></div>

                    <nav className="hidden lg:flex items-center gap-2 text-sm font-medium overflow-hidden">
                        {isNoter ? (
                            <NoterBreadcrumbs />
                        ) : (
                            <>
                                <Link href="/panel" className="btn-glass px-4 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate" data-variant="interactive">
                                    {user?.firstName || user?.username || 'Workspace'}
                                </Link>
                                <span className="text-zinc-400">/</span>
                                <div className="btn-glass px-4 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 pointer-events-none truncate" data-variant="interactive">
                                    <span className="text-xs opacity-60 mr-2">📊</span>
                                    Panel
                                </div>
                            </>
                        )}
                    </nav>

                    <div className="hidden md:flex lg:hidden items-center">
                        <div className="btn-glass px-4 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 text-sm" data-variant="interactive">
                            {isNoter ? '📝 Notes' : '📊 Panel'}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>

            {/* MAIN BODY */}
            <div className="flex flex-1 w-full gap-2 md:gap-4 overflow-hidden min-h-0 relative">

                <AppRail />

                <SidebarLayout>
                    {isNoter ? (
                        <NoterSidebarContent />
                    ) : (
                        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-4 pt-4 pb-3">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                                Panel
                            </div>
                        </div>
                    )}
                </SidebarLayout>

                {/* WORKSPACE */}
                <main className="flex-1 glass bg-white/40 dark:bg-black/30 relative z-20 flex flex-col overflow-hidden min-w-0" data-variant="content">
                    <div className="h-12 md:h-14 shrink-0 border-b border-white/20 flex items-center justify-between px-4 md:px-6">
                        <div className="flex items-center gap-3 max-w-[70%]">
                            {!isSidebarVisible && (
                                <button
                                    onClick={() => setIsSidebarVisible(true)}
                                    className="glass w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-700 hidden md:flex"
                                    data-variant="interactive"
                                    title="Show panel"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            )}
                            <h1 className="text-base md:text-xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight truncate">
                                {pageTitle}
                            </h1>
                            {isAppRoute && (
                                <button
                                    onClick={() => document.dispatchEvent(new CustomEvent('create-new-note'))}
                                    className="ml-4 btn-glass gap-2"
                                    data-variant="cta"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <span>New</span>
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0" id="header-actions">
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
                        <div className={`${activeNote?.isFullWidth ? 'max-w-full' : 'max-w-4xl'} mx-auto w-full px-2 md:px-0 transition-all duration-300 ease-in-out`}>
                            {children}
                        </div>
                    </div>

                    <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="glass w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg md:text-xl shadow-xl hover:scale-105 transition-transform"
                            data-variant="interactive"
                        >
                            ?
                        </button>
                    </div>
                </main>

            </div>
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <SearchCommand isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
}

function useNoterSafe() {
    try {
        return useNoter();
    } catch {
        return null;
    }
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PlatformProvider>
            <NoterProvider>
                <PanelContent>
                    {children}
                </PanelContent>
            </NoterProvider>
        </PlatformProvider>
    );
}
