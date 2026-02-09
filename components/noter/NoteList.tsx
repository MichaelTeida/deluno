"use client";

import { Note } from "@/lib/noter";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useMemo } from "react";

interface NoteListProps {
    notes: Note[];
    rootNotes: Note[];
    activeNoteId: string | null;
    onSelect: (id: string) => void;
    onAdd: (parentId: string | null) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export const NoteItem = memo(function NoteItem({
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
    // Memoize children filtering
    const children = useMemo(() => notes.filter(n => n.parentId === note.id && !n.isTrashed), [notes, note.id]);
    const hasChildren = children.length > 0;
    const isActive = note.id === activeNoteId;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: note.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div
                className={`group flex items-center gap-2 px-2 rounded-lg cursor-pointer text-sm transition-colors min-w-0 select-none ${isActive ? "bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "hover:bg-white/30 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300"
                    }`}
                style={{ paddingLeft: `${8 + depth * 24}px`, height: 'var(--height-button)' }}
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
                    <span className="w-4 shrink-0" />
                )}

                {/* Icon */}
                <span className="text-sm shrink-0">{note.icon}</span>

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
                    <SortableContext items={children.map(n => n.id)} strategy={verticalListSortingStrategy}>
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
                    </SortableContext>
                </div>
            )}
        </div>
    );
}, (prev, next) => {
    // Custom comparison to avoid re-render if note didn't change and its children/status didn't change
    if (prev.activeNoteId !== next.activeNoteId) {
        if (prev.note.id === prev.activeNoteId || next.note.id === next.activeNoteId) return false;
    }
    if (prev.note !== next.note) return false;
    if (prev.notes !== next.notes) {
        // Deep check if any children changed? Expensive. 
        // For now, if notes array ref changes, we re-render. 
        // We can't easily avoid this without more complex state management.
        return false;
    }
    return true;
});

export default function NoteList({ notes, rootNotes, activeNoteId, onSelect, onAdd, onDelete, onToggle }: NoteListProps) {
    return (
        <div className="space-y-0.5">
            <SortableContext items={rootNotes.map(n => n.id)} strategy={verticalListSortingStrategy}>
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
            </SortableContext>
        </div>
    );
}
