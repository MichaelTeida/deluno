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
                            Nazwa workspace
                        </div>
                        <span className="text-zinc-400">/</span>
                        <div className="glass px-3 py-1.5 text-zinc-600 hover:text-indigo-600 transition-colors" data-variant="interactive">
                            Nazwa wybranego narzędzia
                        </div>
                        <span className="text-zinc-400">/</span>
                        <div className="glass px-3 py-1.5 text-zinc-600 hover:text-indigo-600 transition-colors" data-variant="interactive">
                            <span className="opacity-60 mr-1">📄</span> Element
                        </div>
                        <span className="text-zinc-400">/</span>
                        <div className="glass px-3 py-1.5 bg-white/20 text-indigo-700 pointer-events-none" data-variant="interactive">
                            <span className="opacity-60 mr-1">📄</span> Element 2
                        </div>
                    </nav>
                </div>

                {/* Right: Details & Options + 3 Dots Menu */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-500">Jakieś szczegóły i opcje</span>
                    <button className="glass w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-zinc-900" data-variant="interactive">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <circle cx="4" cy="10" r="2" />
                            <circle cx="10" cy="10" r="2" />
                            <circle cx="16" cy="10" r="2" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* 2. MAIN BODY - Floating Islands (Rail | Sidebar | Content) */}
            <div className="flex flex-1 w-full gap-4 overflow-hidden min-h-0">

                {/* A. APPS RAIL */}
                <aside className="w-16 glass flex flex-col items-center py-4 gap-2 z-40 shrink-0" data-variant="panel">
                    {/* App Icons - Top Section */}
                    <div className="flex flex-col gap-2 w-full items-center flex-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="group relative w-10 h-10 flex items-center justify-center">
                                {/* Active Indicator */}
                                <div className="absolute left-[-20px] w-1 h-6 bg-indigo-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                                <div className="w-10 h-10 glass flex items-center justify-center text-zinc-500 hover:text-indigo-600 transition-all" data-variant="interactive">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Icons: Expand, Settings, Home */}
                    <div className="flex flex-col gap-2 w-full items-center mt-auto pt-4 border-t border-white/10">
                        {/* Expand Sidebar (Double Arrow) */}
                        <button className="w-10 h-10 glass flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors" data-variant="interactive" title="Rozwiń sidebar">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        {/* Settings (Gear) */}
                        <button className="w-10 h-10 glass flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors" data-variant="interactive" title="Ustawienia">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>

                        {/* Home (House) */}
                        <Link href="/" className="w-10 h-10 glass flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors" data-variant="interactive" title="Strona główna">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Link>
                    </div>
                </aside>

                {/* B. NAVIGATION SIDEBAR */}
                <nav className="w-56 glass flex flex-col z-30 shrink-0" data-variant="panel">
                    {/* Search Row with Collapse Icon */}
                    <div className="p-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="glass flex-1 px-3 py-2 flex items-center gap-2 text-zinc-500 hover:text-zinc-800 text-sm cursor-pointer" data-variant="interactive" data-no-shine="true">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                <span>Search</span>
                                <span className="ml-auto text-xs opacity-50">⌘K</span>
                            </div>
                            <button className="glass w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-700 shrink-0" data-variant="interactive" title="Zwiń panel">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Link */}
                    <div className="px-3 py-2">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/20 cursor-pointer text-sm text-indigo-700 font-medium">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                            </svg>
                            Dashboard
                        </div>
                    </div>

                    {/* Scrollable Navigation Sections */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-4 pb-3">
                        {/* Favorites Section */}
                        <div className="space-y-1">
                            <h3 className="px-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Favorites:</h3>
                            {['Element', 'Element', 'Element'].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/20 cursor-pointer text-sm text-zinc-600 font-medium transition-colors">
                                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Private Section */}
                        <div className="space-y-1">
                            <h3 className="px-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Private:</h3>
                            {['Element', 'Element'].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/20 cursor-pointer text-sm text-zinc-600 font-medium transition-colors">
                                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    {item}
                                </div>
                            ))}
                            {/* Nested Elements */}
                            <div className="ml-4 border-l border-zinc-300/30 pl-2 space-y-1">
                                <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/20 cursor-pointer text-sm text-zinc-600 font-medium transition-colors">
                                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    Element 1
                                </div>
                                <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-indigo-50/50 cursor-pointer text-sm text-indigo-700 font-medium transition-colors">
                                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    Element 2
                                </div>
                            </div>
                            {['Element', 'Element'].map((item, idx) => (
                                <div key={`after-${idx}`} className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-white/20 cursor-pointer text-sm text-zinc-600 font-medium transition-colors">
                                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Shared Section */}
                        <div className="space-y-1">
                            <h3 className="px-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Shared:</h3>
                        </div>
                    </div>

                    {/* Trash at Bottom */}
                    <div className="p-3 border-t border-white/10">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20 cursor-pointer text-sm text-zinc-500 font-medium transition-colors">
                            <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Trash
                        </div>
                    </div>
                </nav>

                {/* C. MAIN CONTENT */}
                <main className="flex-1 glass relative z-20 flex flex-col overflow-hidden" data-variant="content">
                    {/* Content Header (Contextual) */}
                    <div className="h-14 shrink-0 border-b border-white/20 flex items-center justify-between px-6">
                        <h1 className="text-xl font-semibold text-zinc-800 tracking-tight">Dashboard Overview</h1>
                        <div className="flex items-center gap-2">
                            <button className="glass h-9 px-4 text-sm font-medium text-zinc-600 flex items-center justify-center" data-variant="interactive">
                                Export
                            </button>
                            <button className="glass h-9 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 border-none flex items-center justify-center" data-variant="interactive" data-no-shine="true">
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
