"use client";

import { useNoter } from "@/lib/contexts/NoterContext";

export default function TrashView() {
    const { notes, restoreNote, permanentlyDeleteNote } = useNoter();

    const trashedNotes = notes.filter(n => n.isTrashed);

    return (
        <div className="h-full flex flex-col p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-4 text-zinc-800 dark:text-zinc-100 mt-12 md:mt-0">Trash</h1>
            <p className="text-zinc-500 mb-8">Notes in Trash can be restored or permanently deleted.</p>

            {trashedNotes.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-zinc-400 italic">
                    Trash is empty.
                </div>
            ) : (
                <div className="space-y-2 overflow-y-auto custom-scrollbar pb-10">
                    {trashedNotes.map(note => (
                        <div key={note.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white/50 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-zinc-800 gap-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{note.icon}</span>
                                <div className="overflow-hidden">
                                    <div className="font-semibold text-zinc-700 dark:text-zinc-300 truncate">{note.title}</div>
                                    <div className="text-xs text-zinc-400">Last edited: {note.updatedAt.toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => restoreNote(note.id)}
                                    className="text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-1.5 text-xs font-medium bg-white/50 dark:bg-white/10 rounded-md transition-colors"
                                >
                                    Restore
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm("Are you sure you want to permanently delete this note? This action cannot be undone.")) {
                                            permanentlyDeleteNote(note.id);
                                        }
                                    }}
                                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 px-3 py-1.5 text-xs font-medium bg-red-50 dark:bg-red-900/20 rounded-md transition-colors border border-red-200 dark:border-red-900/30"
                                >
                                    Delete Forever
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
