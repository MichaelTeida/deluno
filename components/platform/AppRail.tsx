"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlatform } from "@/lib/contexts/PlatformContext";

interface AppDefinition {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const apps: AppDefinition[] = [
    {
        name: "Apps",
        href: "/panel",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        ),
    },
    {
        name: "Noter",
        href: "/panel/noter",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        ),
    },
];

export default function AppRail() {
    const pathname = usePathname();
    const { isRailExpanded, setIsRailExpanded, setIsSettingsOpen } = usePlatform();

    const isActive = (href: string) => {
        if (href === "/panel") return pathname === "/panel";
        return pathname?.startsWith(href);
    };

    return (
        <aside className={`
            ${isRailExpanded ? 'w-52 px-3' : 'w-14 md:w-16 items-center'} 
            glass flex flex-col py-3 md:py-4 gap-2 z-40 shrink-0 
            transition-all duration-300 ease-out
            hidden md:flex
        `} data-variant="panel">
            <div className={`flex flex-col gap-2 w-full flex-1 ${isRailExpanded ? 'items-start' : 'items-center'}`}>
                {apps.map((app) => (
                    <Link key={app.href} href={app.href} className="group relative w-full h-10 flex items-center">
                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full transition-all duration-300 
                            ${isRailExpanded ? 'opacity-0 pointer-events-none' : (isActive(app.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')}
                        `}></div>
                        <div className={`flex h-10 w-full items-center ${isRailExpanded ? 'px-1' : 'justify-center'}`}>
                            <div className={`w-10 h-10 glass flex items-center justify-center shrink-0 transition-all ${isActive(app.href) ? 'text-indigo-600 bg-white/40 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`} data-variant="interactive">
                                {app.icon}
                            </div>
                            {isRailExpanded && (
                                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 transition-all duration-300 whitespace-nowrap overflow-hidden ml-4">
                                    {app.name}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
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
                        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 transition-all duration-300 whitespace-nowrap overflow-hidden ml-4">
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
    );
}
