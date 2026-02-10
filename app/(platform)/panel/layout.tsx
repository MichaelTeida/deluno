"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { NoterProvider, useNoter } from "@/lib/contexts/NoterContext";
import NoterSidebarContent from "@/components/dashboard/NoterSidebarContent";
import NoterBreadcrumbs from "@/components/noter/NoterBreadcrumbs";
import SettingsModal from "@/components/SettingsModal";
import SearchCommand from "@/components/SearchCommand";
import { useEffect } from "react";

function DashboardContent({ children }: { children: React.ReactNode }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isRailExpanded, setIsRailExpanded] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(256);
    const [isResizing, setIsResizing] = useState(false);
    const pathname = usePathname();
    const { activeNote } = useNoter();
    const { user } = useUser();

    const startResizing = (e: React.MouseEvent) => {
        setIsResizing(true);
        e.preventDefault();
    };

    useEffect(() => {
        if (!isResizing) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Disable resizing on mobile strictly
            if (typeof window !== 'undefined' && window.innerWidth < 768) return;

            let newWidth = e.clientX;
            // Add constraints
            if (newWidth < 100) {
                // Snap to close
                setIsSidebarVisible(false);
                setIsResizing(false);
                return;
            }
            if (newWidth < 200) newWidth = 200;
            if (newWidth > 480) newWidth = 480; // Increased max width slightly for large screens
            setSidebarWidth(newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            // Optional: Save to local storage here for persistence
            if (sidebarWidth >= 200) { // Only save if visible
                // save sidebarWidth
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        // Add cursor style to body to prevent flickering
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing]);

    const isNoter = pathname?.startsWith('/panel/noter');
    const pageTitle = isNoter
        ? 'Noter'
        : 'Dashboard';

    // Auto-close mobile menu on navigation
    useEffect(() => {
        setIsNavOpen(false);
    }, [pathname, activeNote?.id]);

    // Toggle Command Palette with Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    return (
        <div className="flex flex-col h-dvh w-full text-zinc-800 dark:text-zinc-200 p-2 md:p-4 gap-2 md:gap-4 overflow-hidden" style={{ paddingLeft: 'max(0.5rem, env(safe-area-inset-left))', paddingRight: 'max(0.5rem, env(safe-area-inset-right))' }}>

            {/* 1. TOP HEADER */}
            <header className="h-12 md:h-16 shrink-0 glass bg-white/40 dark:bg-black/30 flex items-center justify-between px-3 md:px-6 z-50" data-variant="panel">

                {/* Left: Mobile Menu + Logo & Breadcrumbs */}
                <div className="flex items-center gap-2 md:gap-4 lg:gap-6 overflow-hidden min-w-0 pr-2">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsNavOpen(!isNavOpen)}
                        className="md:hidden glass w-12 h-12 flex items-center justify-center text-zinc-600 rounded-full"
                        data-variant="interactive"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link href="/panel" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity shrink-0">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-[10px] md:text-xs shadow-lg">
                            DO
                        </div>
                        <span className="font-bold text-base md:text-lg tracking-tight text-zinc-900 dark:text-zinc-100 hidden sm:block shrink-0">Deluno</span>
                    </Link>

                    {/* Separator - Hidden on mobile */}
                    <div className="h-6 w-[1px] bg-black/10 hidden md:block"></div>

                    {/* Breadcrumbs - Simplified on mobile */}
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

                    {/* Compact breadcrumb on tablet */}
                    {/* Compact breadcrumb on tablet */}
                    <div className="hidden md:flex lg:hidden items-center">
                        <div className="btn-glass px-4 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 text-sm" data-variant="interactive">
                            {isNoter ? '📝 Notes' : '📊 Panel'}
                        </div>
                    </div>
                </div>

                {/* Right: User & Theme Menu */}
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

            {/* 2. MAIN BODY */}
            <div className="flex flex-1 w-full gap-2 md:gap-4 overflow-hidden min-h-0 relative">

                {/* Mobile Overlay */}
                {isNavOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[59] md:hidden"
                        onClick={() => setIsNavOpen(false)}
                    />
                )}

                {/* A. APPS RAIL - Hidden on mobile, shown on tablet+ */}
                <aside className={`
                    ${isRailExpanded ? 'w-52 px-3' : 'w-14 md:w-16 items-center'} 
                    glass bg-white/40 dark:bg-black/30 flex flex-col py-3 md:py-4 gap-2 z-40 shrink-0 
                    transition-all duration-300 ease-out
                    hidden md:flex
                `} data-variant="panel">
                    {/* App Icons */}
                    <div className={`flex flex-col gap-2 w-full flex-1 ${isRailExpanded ? 'items-start' : 'items-center'}`}>
                        {/* Apps - Home */}
                        <Link href="/panel" className="group relative w-full h-10 flex items-center">
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full transition-all duration-300 
                                ${isRailExpanded ? 'opacity-0 pointer-events-none' : (!isNoter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
                            `}></div>
                            <div className={`flex h-10 w-full items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`}>
                                <div className={`w-10 h-10 glass flex items-center justify-center shrink-0 transition-all ${!isNoter ? 'text-indigo-600 bg-white/40 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`} data-variant="interactive">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                    </svg>
                                </div>
                                {isRailExpanded && (
                                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 transition-all duration-300 whitespace-nowrap overflow-hidden ml-4">
                                        Apps
                                    </span>
                                )}
                            </div>
                        </Link>

                        {/* Noter */}
                        <Link href="/panel/noter" className="group relative w-full h-10 flex items-center">
                            {/* Active Indicator - Strictly hidden when expanded to avoid glitch */}
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full transition-all duration-300 
                                ${isRailExpanded ? 'opacity-0 pointer-events-none' : (isNoter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
                            `}></div>

                            <div className={`flex h-10 w-full items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`}>
                                <div className={`w-10 h-10 glass flex items-center justify-center shrink-0 transition-all ${isNoter ? 'text-indigo-600 bg-white/40 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`} data-variant="interactive">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                </div>
                                {isRailExpanded && (
                                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 transition-all duration-300 whitespace-nowrap overflow-hidden ml-4">
                                        Noter
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>

                    <div className={`flex flex-col gap-2 w-full mt-auto pt-3 md:pt-4 border-t border-white/10 ${isRailExpanded ? 'items-start' : 'items-center'}`}>
                        <button
                            onClick={() => setIsRailExpanded(!isRailExpanded)}
                            className={`w-full h-10 flex items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`}
                            title={isRailExpanded ? "Collapse" : "Expand"}
                        >
                            <div className="w-10 h-10 glass flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0" data-variant="interactive">
                                <svg className={`w-5 h-5 transition-transform ${isRailExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                            {isRailExpanded && (
                                <span className={`text-sm font-semibold text-zinc-600 dark:text-zinc-300 transition-all duration-300 whitespace-nowrap overflow-hidden ml-4`}>
                                    Collapse
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className={`w-full h-10 flex items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`}
                            title="Settings"
                        >
                            <div className="w-10 h-10 glass flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0" data-variant="interactive">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            {isRailExpanded && (
                                <span className="ml-4 text-sm font-semibold text-zinc-600 dark:text-zinc-300 transition-all duration-300 whitespace-nowrap overflow-hidden">
                                    Settings
                                </span>
                            )}
                        </button>

                        <Link href="/" className={`w-full h-10 flex items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`} title="Home">
                            <div className="w-10 h-10 glass flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0" data-variant="interactive">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </div>
                            {isRailExpanded && (
                                <span className="ml-4 text-sm font-semibold text-zinc-600 dark:text-zinc-300 transition-all duration-300 whitespace-nowrap overflow-hidden">
                                    Home
                                </span>
                            )}
                        </Link>
                    </div>
                </aside>

                {/* B. NAVIGATION SIDEBAR */}
                {/* B. NAVIGATION SIDEBAR */}
                <nav
                    className={`
                        glass bg-white/40 dark:bg-black/30 flex flex-col z-[60] md:z-30 shrink-0
                        fixed md:relative left-0 top-0 h-full md:h-auto
                        transition-transform duration-300 ease-out
                        ${isNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                        ${!isSidebarVisible && 'hidden md:flex'}
                    `}
                    data-variant="panel"
                    style={{
                        width: isSidebarVisible ? ((isMounted && window.innerWidth >= 768) ? sidebarWidth : '16rem') : 0,
                        opacity: isSidebarVisible ? 1 : 0,
                    }}
                >
                    {/* Resizer Handle */}
                    <div
                        className="absolute right-0 top-0 bottom-0 w-3 hover:w-3 cursor-col-resize z-50 transition-colors group flex justify-center"
                        onMouseDown={startResizing}
                    >
                        {/* Visual Line */}
                        <div className="w-[1px] h-full group-hover:bg-indigo-500/50 transition-colors"></div>
                        {/* Handle pill */}
                        <div className="absolute top-1/2 right-0.5 w-[3px] h-8 bg-zinc-300 dark:bg-zinc-600 rounded-full group-hover:bg-white" />
                    </div>

                    {/* Mobile Header */}
                    <div className="p-3 border-b border-white/10 flex items-center justify-between md:hidden">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-[10px]">DO</div>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-100">Deluno</span>
                        </div>
                        <button
                            onClick={() => setIsNavOpen(false)}
                            className="glass w-8 h-8 flex items-center justify-center text-zinc-500"
                            data-variant="interactive"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile App Rail Integrated */}
                    <div className="flex items-center border-b border-white/10 md:hidden p-2 gap-2 overflow-x-auto scrollbar-hide">
                        <Link href="/panel/noter" className={`glass p-2 shrink-0 ${isNoter ? 'text-indigo-600 bg-white/40' : 'text-zinc-500'}`} data-variant="interactive">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </Link>
                        <Link href="/panel" className="glass p-2 shrink-0 text-zinc-500" data-variant="interactive">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                            </svg>
                        </Link>
                    </div>

                    {/* Search Row */}
                    <div className="p-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <div
                                onClick={() => setIsSearchOpen(true)}
                                className="glass flex-1 px-3 py-2 flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 text-sm cursor-pointer"
                                data-variant="interactive"
                                data-no-shine="true"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                <span>Search</span>
                                <span className="ml-auto text-xs opacity-50 dark:opacity-40 hidden sm:block">Ctrl K</span>
                            </div>
                            <button
                                onClick={() => setIsSidebarVisible(false)}
                                className="glass w-8 h-8 items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 shrink-0 hidden md:flex"
                                data-variant="interactive"
                                title="Collapse panel"
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
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                </svg>
                                Panel
                            </div>
                        </div>
                    )}

                </nav>

                {/* C. MAIN CONTENT */}
                <main className="flex-1 glass bg-white/40 dark:bg-black/30 relative z-20 flex flex-col overflow-hidden min-w-0" data-variant="content">
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
                            <h1 className="text-base md:text-xl font-semibold text-zinc-800 dark:text-zinc-100 tracking-tight truncate">
                                {pageTitle}
                            </h1>
                            {!pathname?.endsWith('/panel') && (
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
                            {/* Portal Target for Note Actions */}
                        </div>
                    </div>

                    {/* Scrollable Canvas */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
                        <div className={`${activeNote?.isFullWidth ? 'max-w-full' : 'max-w-4xl'} mx-auto w-full px-2 md:px-0 transition-all duration-300 ease-in-out`}>
                            {children}
                        </div>
                    </div>

                    {/* FAB Help */}
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
