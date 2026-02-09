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
                        className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-xl flex items-center gap-3 transition-colors shadow-lg shadow-indigo-500/20"
                    >
                        <div className="bg-white/20 p-2 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <div className="font-semibold">New Note</div>
                            <div className="text-xs text-indigo-100">Create a new page in Noter</div>
                        </div>
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
                            <div className="p-4 text-center text-zinc-400 italic">No notes.</div>
                        ) : (
                            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {recentNotes.map(note => (
                                    <div
                                        key={note.id}
                                        onClick={() => handleOpenNote(note.id)}
                                        className="p-3 hover:bg-white/50 dark:hover:bg-white/5 cursor-pointer flex items-center gap-3 transition-colors group"
                                    >
                                        <span className="text-xl group-hover:scale-110 transition-transform">{note.icon}</span>
                                        <div className="flex-1">
                                            <div className="font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-indigo-500 transition-colors">
                                                {note.title || "Untitled"}
                                            </div>
                                            <div className="text-xs text-zinc-400">
                                                {note.content.substring(0, 50).replace(/\n/g, ' ')}...
                                            </div>
                                        </div>
                                        <div className="text-xs text-zinc-400">
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
