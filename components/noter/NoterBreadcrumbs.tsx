"use client";

import { useNoter } from "@/lib/contexts/NoterContext";
import { Note } from "@/lib/noter";
import Link from "next/link";
import { Fragment } from "react";

export default function NoterBreadcrumbs() {
    const { activeNote, notes, viewMode, setActiveNoteId, setViewMode } = useNoter();

    // If trash mode
    if (viewMode === 'trash') {
        return (
            <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-zinc-600 dark:text-zinc-300">Noter</span>
                <span className="text-zinc-400">/</span>
                <div className="glass px-3 py-1.5 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 pointer-events-none truncate" data-variant="interactive">
                    <span className="text-xs opacity-60 mr-1">🗑️</span>
                    Kosz
                </div>
            </div>
        );
    }

    // If dashboard mode (no active note)
    if (!activeNote) {
        return (
            <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-zinc-600 dark:text-zinc-300">Noter</span>
                <span className="text-zinc-400">/</span>
                <div className="glass px-3 py-1.5 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 pointer-events-none truncate" data-variant="interactive">
                    <span className="text-xs opacity-60 mr-1">📊</span>
                    Dashboard
                </div>
            </div>
        );
    }

    // Build breadcrumb trail for active note
    const breadcrumbs: Note[] = [];
    let current: Note | undefined = activeNote;

    while (current) {
        breadcrumbs.unshift(current);
        if (current.parentId) {
            current = notes.find(n => n.id === current?.parentId);
        } else {
            current = undefined;
        }
    }

    return (
        <div className="flex items-center gap-2 text-sm font-medium overflow-hidden">
            <Link
                href="/dashboard/noter"
                onClick={() => { setActiveNoteId(null); setViewMode('notes'); }}
                className="text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
                Noter
            </Link>

            {breadcrumbs.map((note, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                    <Fragment key={note.id}>
                        <span className="text-zinc-400">/</span>
                        {isLast ? (
                            <div className="glass px-3 py-1.5 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 pointer-events-none truncate max-w-[150px]" data-variant="interactive">
                                <span className="text-xs opacity-60 mr-1">{note.icon}</span>
                                {note.title || "Untitled"}
                            </div>
                        ) : (
                            <button
                                onClick={() => setActiveNoteId(note.id)}
                                className="glass px-3 py-1.5 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate max-w-[100px]"
                                data-variant="interactive"
                            >
                                <span className="text-xs opacity-60 mr-1">{note.icon}</span>
                                {note.title || "Bez tytułu"}
                            </button>
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
}
