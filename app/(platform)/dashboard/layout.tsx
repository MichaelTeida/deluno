
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-screen w-full text-zinc-800 p-4 gap-4 overflow-hidden">

            {/* 1. TOP HEADER - Floating Island (Spans Full Width) */}
            <header className="h-16 shrink-0 glass flex items-center justify-between px-6 z-50" data-variant="panel">

                {/* Left: Logo & Breadcrumbs */}
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                            DO
                        </div>
                        <span className="font-bold text-lg tracking-tight text-zinc-900">Deluno</span>
                    </div>

                    {/* Separator */}
                    <div className="h-6 w-[1px] bg-black/10"></div>

                    {/* Breadcrumbs (Glass Pills) */}
                    <nav className="flex items-center gap-2 text-sm font-medium">
                        <div className="glass px-3 py-1.5 text-zinc-600 hover:text-indigo-600 transition-colors" data-variant="interactive">
                            MichaelTeida
                        </div>
                        <span className="text-zinc-400">/</span>
                        <div className="glass px-3 py-1.5 text-zinc-600 hover:text-indigo-600 transition-colors" data-variant="interactive">
                            deluno
                        </div>
                        <span className="text-zinc-400">/</span>
                        <div className="glass px-3 py-1.5 bg-white/20 text-indigo-700 pointer-events-none" data-variant="interactive">
                            Dashboard
                        </div>
                    </nav>
                </div>

                {/* Right: User/Actions */}
                <div className="flex items-center gap-3">
                    <div className="glass w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-900" data-variant="interactive">
                        🔔
                    </div>
                    <div className="glass px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-white/40" data-variant="interactive" data-no-shine="true">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-400 to-teal-300"></div>
                        <span className="text-xs font-semibold text-zinc-700">Michał</span>
                    </div>
                </div>
            </header>

            {/* 2. MAIN BODY - Floating Islands (Rail | Sidebar | Content) */}
            <div className="flex flex-1 w-full gap-4 overflow-hidden min-h-0">

                {/* A. APPS RAIL */}
                <aside className="w-20 glass flex flex-col items-center py-6 gap-6 z-40 shrink-0" data-variant="panel">
                    {/* App Icons */}
                    <div className="flex flex-col gap-4 w-full items-center">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group relative w-10 h-10 flex items-center justify-center">
                                {/* Active Indicator */}
                                <div className="absolute left-[-24px] w-1 h-8 bg-indigo-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                                <div className="w-10 h-10 glass flex items-center justify-center text-zinc-600 hover:text-indigo-600 transition-all" data-variant="interactive">
                                    <div className="w-5 h-5 bg-current mask-icon rounded-sm opacity-80"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto">
                        <div className="w-10 h-10 glass flex items-center justify-center text-zinc-500 hover:text-zinc-900" data-variant="interactive">
                            ⚙️
                        </div>
                    </div>
                </aside>

                {/* B. NAVIGATION SIDEBAR */}
                <nav className="w-64 glass flex flex-col z-30 shrink-0" data-variant="panel">
                    <div className="p-4">
                        <div className="glass w-full px-3 py-2.5 flex items-center gap-2 text-zinc-500 hover:text-zinc-800 text-sm" data-variant="interactive" data-no-shine="true">
                            🔍 <span>Search...</span>
                            <span className="ml-auto text-xs opacity-50">⌘K</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-6">
                        {/* Menu Sections */}
                        <div className="space-y-1">
                            <h3 className="px-3 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Workspace</h3>
                            {['Home', 'Activity', 'Settings'].map(item => (
                                <div key={item} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20 cursor-pointer text-sm text-zinc-600 font-medium transition-colors">
                                    <span className="opacity-70">▫️</span> {item}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-1">
                            <h3 className="px-3 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Favorites</h3>
                            {['Q4 Roadmap', 'Design Sys', 'Marketing'].map(item => (
                                <div key={item} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20 cursor-pointer text-sm text-zinc-600 font-medium transition-colors">
                                    <span className="opacity-70">⭐️</span> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* C. MAIN CONTENT */}
                <main className="flex-1 glass relative z-20 flex flex-col overflow-hidden" data-variant="content">
                    {/* Content Header (Contextual) */}
                    <div className="h-14 shrink-0 border-b border-white/20 flex items-center justify-between px-6">
                        <h1 className="text-xl font-semibold text-zinc-800 tracking-tight">Dashboard Overview</h1>
                        <div className="flex items-center gap-2">
                            <button className="glass px-3 py-1.5 text-xs font-medium text-zinc-600" data-variant="interactive">
                                Export
                            </button>
                            <button className="glass px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 border-none" data-variant="interactive" data-no-shine="true">
                                + New Item
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Canvas */}
                    <div className="flex-1 overflow-y-auto p-8 relative">
                        {children}
                    </div>

                    {/* FAB Help */}
                    <div className="absolute bottom-6 right-6">
                        <button className="glass w-12 h-12 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl shadow-xl hover:scale-105 transition-transform" data-variant="interactive">
                            ?
                        </button>
                    </div>
                </main>

            </div>
        </div>
    );
}
