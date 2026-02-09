"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { NoterProvider, useNoter } from "@/lib/contexts/NoterContext";
import NoterSidebarContent from "@/components/dashboard/NoterSidebarContent";
import NoterBreadcrumbs from "@/components/noter/NoterBreadcrumbs";
import SettingsModal from "@/components/SettingsModal";
import SearchCommand from "@/components/SearchCommand";
import NoteMenu from "@/components/noter/NoteMenu";
import { useEffect } from "react";

function DashboardContent({ children }: { children: React.ReactNode }) {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isRailExpanded, setIsRailExpanded] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [isResizing, setIsResizing] = useState(false);

    const pathname = usePathname();
    const { activeNote, addNote, setViewMode } = useNoter();

    const isNoter = pathname?.startsWith('/panel/noter');
    const pageTitle = isNoter
        ? 'Noter'
        : 'Dashboard';

    // Handle resizing
    const startResizing = (e: React.MouseEvent) => {
        setIsResizing(true);
        e.preventDefault();
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            // Subtract rail width (64px) and some padding
            const newWidth = e.clientX - 64 - 16;
            if (newWidth > 200 && newWidth < 480) {
                setSidebarWidth(newWidth);
            }
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', stopResizing);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing]);

    // Command palette listener
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

    return (
        <div className="flex flex-col h-screen w-full text-zinc-800 dark:text-zinc-200 p-2 md:p-4 gap-2 md:gap-4 overflow-hidden" style={{ paddingLeft: 'max(0.5rem, env(safe-area-inset-left))', paddingRight: 'max(0.5rem, env(safe-area-inset-right))' }}>
            {/* 1. TOP HEADER */}
            <header className="h-14 md:h-16 shrink-0 glass flex items-center justify-between px-3 md:px-6 z-40" data-variant="panel">
                <div className="flex items-center gap-2 md:gap-4 lg:gap-6 overflow-hidden min-w-0 pr-2">
                    <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden glass w-9 h-9 flex items-center justify-center text-zinc-600" data-variant="interactive">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                    </button>

                    <Link href="/panel" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity shrink-0">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-[10px] md:text-xs shadow-lg">DO</div>
                        <span className="font-bold text-base md:text-lg tracking-tight text-zinc-900 dark:text-zinc-100 hidden sm:block shrink-0 mt-[-1px]">Deluno</span>
                    </Link>

                    <div className="h-6 w-[1px] bg-black/10 hidden md:block"></div>

                    <nav className="hidden lg:flex items-center gap-2 text-sm font-medium overflow-hidden">
                        {isNoter ? <NoterBreadcrumbs /> : (
                            <>
                                <Link href="/panel" className="glass px-3 py-1.5 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate" data-variant="interactive">Workspace</Link>
                                <span className="text-zinc-400">/</span>
                                <div className="glass px-3 py-1.5 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 pointer-events-none truncate" data-variant="interactive">
                                    <span className="text-xs opacity-60 mr-1">📊</span> Dashboard
                                </div>
                            </>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>

            {/* 2. MAIN BODY */}
            <div className="flex flex-1 w-full gap-2 md:gap-4 overflow-hidden min-h-0 relative">
                {isNavOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden" onClick={() => setIsNavOpen(false)} />}

                {/* Left Rails (Sidebar A) */}
                <aside className={`${isRailExpanded ? 'w-52 px-3' : 'w-14 md:w-16 items-center'} glass flex flex-col py-3 md:py-4 gap-2 z-40 shrink-0 transition-all duration-300 ease-out hidden md:flex`} data-variant="panel">
                    <div className={`flex flex-col gap-2 w-full flex-1 ${isRailExpanded ? 'items-start' : 'items-center'}`}>
                        <Link href="/panel/noter" className="group relative w-full h-10 flex items-center">
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full transition-all duration-300 ${isRailExpanded ? 'opacity-0' : (isNoter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}`}></div>
                            <div className={`flex h-10 w-full items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`}>
                                <div className={`w-10 h-10 glass flex items-center justify-center shrink-0 transition-all ${isNoter ? 'text-indigo-600 bg-white/40' : 'text-zinc-500 hover:text-indigo-600'}`} data-variant="interactive">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                                </div>
                                {isRailExpanded && <span className="text-sm font-semibold ml-4">Noter</span>}
                            </div>
                        </Link>
                    </div>

                    <div className={`flex flex-col gap-2 w-full mt-auto pt-4 border-t border-white/10 ${isRailExpanded ? 'items-start' : 'items-center'}`}>
                        <button onClick={() => setIsRailExpanded(!isRailExpanded)} className="w-full h-10 flex items-center justify-center" title="Collapse/Expand">
                            <div className="w-10 h-10 glass flex items-center justify-center text-zinc-500 hover:text-zinc-900 shrink-0" data-variant="interactive">
                                <svg className={`w-5 h-5 transition-transform ${isRailExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>
                            </div>
                            {isRailExpanded && <span className="text-sm font-semibold ml-4">Collapse</span>}
                        </button>
                        <button onClick={() => setIsSettingsOpen(true)} className="w-full h-10 flex items-center justify-center" title="Settings">
                            <div className="w-10 h-10 glass flex items-center justify-center text-zinc-500 hover:text-zinc-900 shrink-0" data-variant="interactive"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                            {isRailExpanded && <span className="text-sm font-semibold ml-4">Settings</span>}
                        </button>
                    </div>
                </aside>

                {/* Secondary Content Sidebar (Sidebar B) */}
                <aside
                    style={{ width: isSidebarVisible ? `${sidebarWidth}px` : '0px' }}
                    className={`h-full glass flex flex-col z-30 shrink-0 relative ${!isSidebarVisible && 'overflow-hidden'} ${!isResizing && 'transition-[width] duration-300'}`}
                    data-variant="panel"
                >
                    {/* Resizer handle */}
                    <div onMouseDown={startResizing} className="absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-indigo-500/30 transition-colors z-50 group">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-zinc-300 dark:bg-zinc-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-3 border-b border-white/10 flex items-center justify-between">
                        <div onClick={() => setIsSearchOpen(true)} className="glass flex-1 px-3 py-2 flex items-center gap-2 text-zinc-500 hover:text-zinc-800 text-sm cursor-pointer" data-variant="interactive" data-no-shine="true">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                            <span>Search</span>
                        </div>
                        <button onClick={() => setIsSidebarVisible(false)} className="glass w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-700 ml-2 hidden md:flex" data-variant="interactive" title="Collapse">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" /></svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {isNoter ? <NoterSidebarContent /> : (
                            <div className="p-4"><p className="text-sm text-zinc-500 italic">No app selected</p></div>
                        )}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 glass relative z-20 flex flex-col overflow-hidden min-w-0" data-variant="content">
                    <div className="h-12 md:h-14 shrink-0 border-b border-white/20 flex items-center justify-between px-4 md:px-6">
                        <div className="flex items-center gap-3">
                            {!isSidebarVisible && (
                                <button onClick={() => setIsSidebarVisible(true)} className="glass w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-700 hidden md:flex" data-variant="interactive" title="Show panel">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5" /></svg>
                                </button>
                            )}
                            <h1 className="text-base md:text-xl font-semibold opacity-90 truncate">{pageTitle}</h1>
                            {isNoter && (
                                <button onClick={() => { addNote(null); setViewMode('notes'); }} className="glass h-7 px-2.5 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 border-none flex items-center justify-center ml-2" data-variant="interactive" data-no-shine="true">
                                    + NEW
                                </button>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {isNoter && <NoteMenu />}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-8 relative custom-scrollbar">
                        <div className={`${activeNote?.isFullWidth ? 'max-w-full' : 'max-w-4xl'} mx-auto w-full transition-all duration-300`}>
                            {children}
                        </div>
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
