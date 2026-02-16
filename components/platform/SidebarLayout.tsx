"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePlatform } from "@/lib/contexts/PlatformContext";

interface SidebarLayoutProps {
    children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
    const pathname = usePathname();
    const {
        isNavOpen, setIsNavOpen,
        isSidebarVisible, setIsSidebarVisible,
        sidebarWidth, startResizing,
        isSearchOpen, setIsSearchOpen,
    } = usePlatform();

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const isNoter = pathname?.startsWith('/panel/noter');

    return (
        <>
            {isNavOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[59] md:hidden"
                    onClick={() => setIsNavOpen(false)}
                />
            )}

            <nav
                className={`
                    glass bg-white/40 dark:bg-black/30 flex flex-col z-[60] md:z-30 shrink-0
                    fixed md:relative left-0 top-0 h-full md:h-auto
                    transition-transform duration-300 ease-out overflow-hidden
                    ${isNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${!isSidebarVisible && 'hidden'}
                `}
                data-variant="panel"
                style={{
                    width: isSidebarVisible ? ((isMounted && window.innerWidth >= 768) ? sidebarWidth : '16rem') : 0,
                    opacity: isSidebarVisible ? 1 : 0,
                }}
            >
                <div
                    className="absolute right-0 top-0 bottom-0 w-3 hover:w-3 cursor-col-resize z-50 transition-colors group flex justify-center"
                    onMouseDown={startResizing}
                >
                    <div className="w-[1px] h-full group-hover:bg-indigo-500/50 transition-colors"></div>
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

                {/* Mobile App Rail */}
                <div className="flex items-center border-b border-white/10 md:hidden p-2 gap-2 overflow-x-auto scrollbar-hide">
                    <Link href="/panel/noter" className={`glass p-2 shrink-0 ${isNoter ? 'text-indigo-600 bg-white/40' : 'text-zinc-500'}`} data-variant="interactive">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </Link>
                    <Link href="/panel" className="glass p-2 shrink-0 text-zinc-500" data-variant="interactive">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
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

                {/* App-Specific Sidebar Content — consistent padding from walls */}
                <div className="px-3 pt-1 flex-1 min-h-0 overflow-hidden flex flex-col">
                    {children}
                </div>
            </nav>
        </>
    );
}
