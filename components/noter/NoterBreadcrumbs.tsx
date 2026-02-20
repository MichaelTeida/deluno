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
                <span className="btn-glass px-4 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" onClick={() => setViewMode('notes')}>Noter</span>
                <span className="text-zinc-400">/</span>
                <div className="btn-glass px-4 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 pointer-events-none truncate" data-variant="interactive">
                    <span className="text-xs opacity-60 mr-2">🗑️</span>
                    Trash
                </div>
            </div>
        );
    }

    // If dashboard mode (no active note)
    if (!activeNote) {
        return (
            <div className="flex items-center gap-2 text-sm font-medium">
                <span className="btn-glass px-4 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer" onClick={() => setViewMode('notes')}>Noter</span>
                <span className="text-zinc-400">/</span>
                <div className="btn-glass px-4 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 pointer-events-none truncate" data-variant="interactive">
                    <span className="text-xs opacity-60 mr-2">📊</span>
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
        <div className="w-full overflow-x-auto custom-scrollbar pb-1.5 pt-0.5">
            <div className="flex items-center gap-2 text-sm font-medium w-max min-w-full">
                <Link
                    href="/panel/noter"
                    onClick={() => { setActiveNoteId(null); setViewMode('notes'); }}
                    className="btn-glass px-4 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 flex items-center"
                    style={{ height: 'var(--height-button)' }}
                >
                    Noter
                </Link>

                {breadcrumbs.map((note, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <Fragment key={note.id}>
                            <span className="text-zinc-400 shrink-0">/</span>
                            {isLast ? (
                                <div className="btn-glass px-4 bg-white/20 dark:bg-white/10 text-indigo-700 dark:text-indigo-300 pointer-events-none shrink-0 flex items-center whitespace-nowrap" data-variant="interactive">
                                    <span className="text-xs opacity-60 mr-2 shrink-0">{note.icon}</span>
                                    <span className="whitespace-nowrap">{note.title || "Untitled"}</span>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setActiveNoteId(note.id)}
                                    className="btn-glass px-4 text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 flex items-center whitespace-nowrap"
                                    data-variant="interactive"
                                >
                                    <span className="text-xs opacity-60 mr-2 shrink-0">{note.icon}</span>
                                    <span className="whitespace-nowrap">{note.title || "Untitled"}</span>
                                </button>
                            )}
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}
