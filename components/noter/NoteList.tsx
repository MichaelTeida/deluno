"use client";

import { Note } from "@/lib/noter";

interface NoteListProps {
    notes: Note[];
    rootNotes: Note[];
    activeNoteId: string | null;
    onSelect: (id: string) => void;
    onAdd: (parentId: string | null) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

function NoteItem({
    note,
    notes,
    activeNoteId,
    depth = 0,
    onSelect,
    onAdd,
    onDelete,
    onToggle,
}: {
    note: Note;
    notes: Note[];
    activeNoteId: string | null;
    depth?: number;
    onSelect: (id: string) => void;
    onAdd: (parentId: string | null) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}) {
    const children = notes.filter(n => n.parentId === note.id);
    const hasChildren = children.length > 0;
    const isActive = note.id === activeNoteId;

    return (
        <div>
            <div
                className={`group flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors ${isActive ? "bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "hover:bg-white/30 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300"
                    }`}
                style={{ paddingLeft: `${8 + depth * 16}px` }}
                onClick={() => onSelect(note.id)}
            >
                {/* Expand/Collapse */}
                {hasChildren ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggle(note.id); }}
                        className="w-4 h-4 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                        <svg className={`w-3 h-3 transition-transform ${note.isExpanded ? "rotate-90" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                ) : (
                    <span className="w-4" />
                )}

                {/* Icon */}
                <span className="text-sm">{note.icon}</span>

                {/* Title */}
                <span className="flex-1 truncate">{note.title}</span>

                {/* Actions */}
                <div className="hidden group-hover:flex items-center gap-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); onAdd(note.id); }}
                        className="w-5 h-5 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                        title="Dodaj pod-notatkę"
                    >
                        +
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                        className="w-5 h-5 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400"
                        title="Usuń"
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Children */}
            {hasChildren && note.isExpanded && (
                <div>
                    {children.map(child => (
                        <NoteItem
                            key={child.id}
                            note={child}
                            notes={notes}
                            activeNoteId={activeNoteId}
                            depth={depth + 1}
                            onSelect={onSelect}
                            onAdd={onAdd}
                            onDelete={onDelete}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function NoteList({ notes, rootNotes, activeNoteId, onSelect, onAdd, onDelete, onToggle }: NoteListProps) {
    return (
        <div className="space-y-0.5">
            {rootNotes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
                    notes={notes}
                    activeNoteId={activeNoteId}
                    onSelect={onSelect}
                    onAdd={onAdd}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}
