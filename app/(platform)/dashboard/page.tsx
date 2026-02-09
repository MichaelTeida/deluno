import Link from "next/link";

export default function DashboardPage() {
    const apps = [
        {
            id: 'noter',
            name: 'Noter',
            description: 'Powerful documentation and note-taking tool with nested hierarchies.',
            icon: '📄',
            color: 'from-indigo-500 to-violet-600',
            href: '/panel/noter',
            status: 'Active'
        },
        {
            id: 'planner',
            name: 'Planner',
            description: 'Strategic planning and task management with visual timelines.',
            icon: '🎯',
            color: 'from-amber-400 to-orange-600',
            href: '#',
            status: 'Coming Soon'
        },
        {
            id: 'calendar',
            name: 'Calendar',
            description: 'Unified schedule management for all your projects.',
            icon: '📅',
            color: 'from-emerald-400 to-teal-600',
            href: '#',
            status: 'Planned'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
                    Welcome back
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    Choose an application to start working.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                    <Link
                        key={app.id}
                        href={app.href}
                        className={`group relative overflow-hidden glass p-6 flex flex-col gap-4 border-2 transition-all duration-300 ${app.href === '#' ? 'opacity-70 grayscale pointer-events-none' : 'hover:scale-[1.02] hover:border-indigo-500/50'}`}
                        data-variant="panel"
                    >
                        {/* App Icon */}
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-3xl shadow-lg ring-4 ring-white/10`}>
                            {app.icon}
                        </div>

                        {/* App Info */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{app.name}</h3>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${app.status === 'Active' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                                    {app.status}
                                </span>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {app.description}
                            </p>
                        </div>

                        {/* Subtle background glow on hover */}
                        <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
