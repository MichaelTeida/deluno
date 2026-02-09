"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { NoterProvider, useNoter } from "@/lib/contexts/NoterContext";
import NoterSidebarContent from "@/components/dashboard/NoterSidebarContent";

function DashboardContent({ children }: { children: React.ReactNode }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isRailExpanded, setIsRailExpanded] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const pathname = usePathname();
    const { activeNote } = useNoter();

    const isNoter = pathname?.startsWith('/dashboard/noter');
    const pageTitle = isNoter
        ? (activeNote?.title || 'Notatki')
        : 'Dashboard';

    return (
        <div className="flex flex-col h-screen w-full text-zinc-800 p-2 md:p-4 gap-2 md:gap-4 overflow-hidden">

            {/* 1. TOP HEADER */}
            <header className="h-14 md:h-16 shrink-0 glass flex items-center justify-between px-3 md:px-6 z-40" data-variant="panel">

                {/* Left: Mobile Menu + Logo & Breadcrumbs */}
                <div className="flex items-center gap-2 md:gap-4 lg:gap-6 overflow-hidden min-w-0">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="md:hidden glass w-9 h-9 flex items-center justify-center text-zinc-600"
                        data-variant="interactive"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity shrink-0">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-[10px] md:text-xs shadow-lg">
                            DO
                        </div>
                        <span className="font-bold text-base md:text-lg tracking-tight text-zinc-900 hidden sm:block shrink-0">Deluno</span>
                    </Link>

                    {/* Separator - Hidden on mobile */}
                    <div className="h-6 w-[1px] bg-black/10 hidden md:block"></div>

                    {/* Breadcrumbs - Simplified on mobile */}
                    <nav className="hidden lg:flex items-center gap-2 text-sm font-medium overflow-hidden">
                        <Link href="/dashboard" className="glass px-3 py-1.5 text-zinc-600 hover:text-indigo-600 transition-colors truncate" data-variant="interactive">
                            Przestrzeń
                        </Link>
                        <span className="text-zinc-400">/</span>
                        <div className="glass px-3 py-1.5 text-zinc-600 hover:text-indigo-600 transition-colors truncate" data-variant="interactive">
                            {isNoter ? 'Narzędzia' : 'Główna'}
                        </div>
                        <span className="text-zinc-400">/</span>
                        <div className="glass px-3 py-1.5 bg-white/20 text-indigo-700 pointer-events-none truncate" data-variant="interactive">
                            <span className="opacity-60 mr-1">{isNoter ? '📝' : '📊'}</span>
                            {isNoter ? 'Notatki' : 'Dashboard'}
                        </div>
                    </nav>

                    {/* Compact breadcrumb on tablet */}
                    <div className="hidden md:flex lg:hidden items-center">
                        <div className="glass px-3 py-1.5 bg-white/20 text-indigo-700 text-sm" data-variant="interactive">
                            {isNoter ? '📝 Notatki' : '📊 Dashboard'}
                        </div>
                    </div>
                </div>

                {/* Right: User & Theme Menu */}
                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    <UserButton afterSignOutUrl="/" />
                    <button className="glass w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-900" data-variant="interactive">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="4" cy="10" r="2" />
                            <circle cx="10" cy="10" r="2" />
                            <circle cx="16" cy="10" r="2" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* 2. MAIN BODY */}
            <div className="flex flex-1 w-full gap-2 md:gap-4 overflow-hidden min-h-0 relative">

                {/* Mobile Overlay */}
                {isNavOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
                        onClick={() => setIsNavOpen(false)}
                    />
                )}

                {/* A. APPS RAIL - Hidden on mobile, shown on tablet+ */}
                <aside className={`
                    ${isRailExpanded ? 'w-52 px-3' : 'w-14 md:w-16 items-center'} 
                    glass flex flex-col py-3 md:py-4 gap-2 z-40 shrink-0 
                    transition-all duration-300 ease-out
                    hidden md:flex
                `} data-variant="panel">
                    {/* App Icons */}
                    <div className={`flex flex-col gap-2 w-full flex-1 ${isRailExpanded ? 'items-start' : 'items-center'}`}>
                        <Link href="/dashboard/noter" className="group relative w-full h-10 flex items-center">
                            {/* Active Indicator - Strictly hidden when expanded to avoid glitch */}
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full transition-all duration-300 
                                ${isRailExpanded ? 'opacity-0 pointer-events-none' : (isNoter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
                            `}></div>

                            <div className={`flex h-10 w-full items-center ${isRailExpanded ? 'gap-3 px-1' : 'justify-center'}`}>
                                <div className={`w-9 h-9 md:w-10 md:h-10 glass flex items-center justify-center shrink-0 transition-all ${isNoter ? 'text-indigo-600 bg-white/40' : 'text-zinc-500 hover:text-indigo-600'}`} data-variant="interactive">
                                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                {isRailExpanded && (
                                    <span className="text-sm font-medium text-zinc-600 transition-all duration-300 whitespace-nowrap overflow-hidden ml-3">
                                        Notatki
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>

                    <div className={`flex flex-col gap-2 w-full mt-auto pt-3 md:pt-4 border-t border-white/10 ${isRailExpanded ? 'items-start' : 'items-center'}`}>
                        <button
                            onClick={() => setIsRailExpanded(!isRailExpanded)}
                            className={`w-full h-10 flex items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`}
                            title={isRailExpanded ? "Zwiń" : "Rozwiń"}
                        >
                            <div className="w-9 h-9 md:w-10 md:h-10 glass flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors shrink-0" data-variant="interactive">
                                <svg className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isRailExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            {isRailExpanded && (
                                <span className={`text-sm font-medium text-zinc-600 transition-all duration-300 whitespace-nowrap overflow-hidden ml-3`}>
                                    Zwiń
                                </span>
                            )}
                        </button>

                        <button className={`w-full h-10 flex items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`} title="Ustawienia">
                            <div className="w-9 h-9 md:w-10 md:h-10 glass flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors shrink-0" data-variant="interactive">
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v12m-5-9v3c0 2.5 2 4.5 5 4.5s5-2 5-4.5V5M12 14v7" />
                                </svg>
                            </div>
                            {isRailExpanded && (
                                <span className="ml-3 text-sm font-medium text-zinc-600 transition-all duration-300 whitespace-nowrap overflow-hidden">
                                    Ustawienia
                                </span>
                            )}
                        </button>

                        <Link href="/" className={`w-full h-10 flex items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`} title="Strona główna">
                            <div className="w-9 h-9 md:w-10 md:h-10 glass flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors shrink-0" data-variant="interactive">
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </div>
                            {isRailExpanded && (
                                <span className="ml-3 text-sm font-medium text-zinc-600 transition-all duration-300 whitespace-nowrap overflow-hidden">
                                    Główna
                                </span>
                            )}
                        </Link>
                    </div>
                </aside>

                {/* B. NAVIGATION SIDEBAR */}
                <nav className={`
                    ${isSidebarVisible ? 'w-64 md:w-56' : 'w-0 overflow-hidden opacity-0'} 
                    glass flex flex-col z-50 md:z-30 shrink-0
                    fixed md:relative left-0 top-0 h-full md:h-auto
                    transition-all duration-300 ease-out
                    ${isNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `} data-variant="panel">
                    {/* Mobile Header */}
                    <div className="p-3 border-b border-white/10 flex items-center justify-between md:hidden">
                        <span className="font-semibold text-zinc-800">Menu</span>
                        <button
                            onClick={() => setIsNavOpen(false)}
                            className="glass w-8 h-8 flex items-center justify-center text-zinc-500"
                            data-variant="interactive"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Search Row */}
                    <div className="p-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="glass flex-1 px-3 py-2 flex items-center gap-2 text-zinc-500 hover:text-zinc-800 text-sm cursor-pointer" data-variant="interactive" data-no-shine="true">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                <span>Search</span>
                                <span className="ml-auto text-xs opacity-50 hidden sm:block">⌘K</span>
                            </div>
                            <button
                                onClick={() => setIsSidebarVisible(false)}
                                className="glass w-8 h-8 items-center justify-center text-zinc-400 hover:text-zinc-700 shrink-0 hidden md:flex"
                                data-variant="interactive"
                                title="Zwiń panel"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Conditional Sidebar Content */}
                    {isNoter ? (
                        <NoterSidebarContent />
                    ) : (
                        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-4 pt-4 pb-3">
                            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/20 cursor-pointer text-sm text-indigo-700 font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                                Dashboard
                            </Link>

                            <div className="space-y-1">
                                <h3 className="px-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Favorites:</h3>
                                <div className="px-3 py-1.5 text-sm text-zinc-400 italic">Brak elementów</div>
                            </div>
                        </div>
                    )}

                    {/* Trash Row (Optional, if not already in content) */}
                    <div className="p-3 border-t border-white/10 mt-auto">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20 cursor-pointer text-sm text-zinc-500 font-medium transition-colors">
                            <svg className="w-4 h-4 opacity-60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            <span className="truncate">Trash</span>
                        </div>
                    </div>
                </nav>

                {/* C. MAIN CONTENT */}
                <main className="flex-1 glass relative z-20 flex flex-col overflow-hidden min-w-0" data-variant="content">
                    {/* Content Header */}
                    <div className="h-12 md:h-14 shrink-0 border-b border-white/20 flex items-center justify-between px-4 md:px-6">
                        <div className="flex items-center gap-3 max-w-[70%]">
                            {!isSidebarVisible && (
                                <button
                                    onClick={() => setIsSidebarVisible(true)}
                                    className="glass w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-700 hidden md:flex"
                                    data-variant="interactive"
                                    title="Pokaż panel"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            )}
                            <h1 className="text-base md:text-xl font-semibold text-zinc-800 tracking-tight truncate">
                                {pageTitle}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button className="glass h-8 md:h-9 px-3 md:px-4 text-xs md:text-sm font-medium text-zinc-600 flex items-center justify-center" data-variant="interactive">
                                Export
                            </button>
                            <button className="glass h-8 md:h-9 px-3 md:px-4 text-xs md:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border-none flex items-center justify-center" data-variant="interactive" data-no-shine="true">
                                + New
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Canvas */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                        {children}
                    </div>

                    {/* FAB Help */}
                    <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6">
                        <button className="glass w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg md:text-xl shadow-xl hover:scale-105 transition-transform" data-variant="interactive">
                            ?
                        </button>
                    </div>
                </main>

            </div>
        </div>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NoterProvider>
            <DashboardContent>
                {children}
            </DashboardContent>
        </NoterProvider>
    );
}
