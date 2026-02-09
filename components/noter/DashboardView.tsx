"use client";

import { useNoter } from "@/lib/contexts/NoterContext";

export default function DashboardView() {
    const { notes, addNote, setActiveNoteId, setViewMode } = useNoter();

    // Filter out trashed notes
    const activeNotes = notes.filter(n => !n.isTrashed);
    const favoriteNotes = activeNotes.filter(n => n.isFavorite);
    const recentNotes = [...activeNotes].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 5);

    const handleCreateNote = () => {
        addNote(null);
        setViewMode('notes');
    };

    const handleOpenNote = (id: string) => {
        setActiveNoteId(id);
        setViewMode('notes');
    };

    return (
        <div className="h-full flex flex-col p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto w-full">
                {/* Greeting */}
                <h1 className="text-3xl font-bold mb-2 text-zinc-800 dark:text-zinc-100 mt-12 md:mt-0">Good morning!</h1>
                <p className="text-zinc-500 mb-8">Here is your dashboard.</p>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <button
                        onClick={handleCreateNote}
                        className="btn-glass p-0 h-auto w-full justify-start gap-4 transition-all hover:scale-[1.03] hover:brightness-110 active:scale-[0.97] group relative overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(79, 70, 229, 0.45) 100%)`,
                            minHeight: '80px',
                            padding: '1rem',
                            borderRadius: 'var(--radius-panel)', // Standardized radius
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(12px) saturate(1.6) url(#glass-clean-v5)',
                            boxShadow: 'var(--effect-glass-shadow)'
                        }}
                    >
                        <div
                            className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg group-hover:bg-white/20 transition-colors"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(12px) saturate(1.6) url(#glass-clean-v5)',
                                boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <div className="text-left flex flex-col items-start gap-0.5">
                            <div className="font-bold text-lg text-white group-hover:text-indigo-50 transition-colors">New Note</div>
                            <div className="text-xs text-indigo-100/90 font-medium group-hover:text-white/90 transition-colors">Create a new page in Noter</div>
                        </div>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                    </button>
                </div>

                {/* Favorites */}
                {favoriteNotes.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                            <span className="text-amber-400">★</span> Favorites
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {favoriteNotes.map(note => (
                                <div
                                    key={note.id}
                                    onClick={() => handleOpenNote(note.id)}
                                    className="glass p-4 rounded-xl cursor-pointer hover:bg-white/40 dark:hover:bg-white/10 transition-all group border border-white/10 hover:border-indigo-500/30"
                                    data-variant="card"
                                >
                                    <div className="text-2xl mb-2">{note.icon}</div>
                                    <div className="font-semibold text-zinc-700 dark:text-zinc-200 truncate group-hover:text-indigo-500 transition-colors">
                                        {note.title || "Untitled"}
                                    </div>
                                    <div className="text-xs text-zinc-400 mt-1">
                                        {note.updatedAt.toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent */}
                <div>
                    <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">Recently Edited</h2>
                    <div className="bg-white/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        {recentNotes.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                                <div className="text-4xl">📝</div>
                                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">No notes yet</h3>
                                <p className="text-sm text-zinc-500 mb-4">Create your first note to get started.</p>
                                <button
                                    onClick={handleCreateNote}
                                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm hover:underline"
                                >
                                    Create Note &rarr;
                                </button>
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {recentNotes.map(note => (
                                    <div
                                        key={note.id}
                                        onClick={() => handleOpenNote(note.id)}
                                        className="p-3 hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors group"
                                    >
                                        <span className="text-xl group-hover:scale-110 transition-transform">{note.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-indigo-500 transition-colors truncate">
                                                {note.title || "Untitled"}
                                            </div>
                                            <div className="text-xs text-zinc-400 truncate">
                                                {(note.content || "").substring(0, 50).replace(/\n/g, ' ') || "No additional text"}
                                            </div>
                                        </div>
                                        <div className="text-xs text-zinc-400 whitespace-nowrap">
                                            {note.updatedAt.toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
