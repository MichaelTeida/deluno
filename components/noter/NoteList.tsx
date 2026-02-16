"use client";

import { Note } from "@/lib/noter";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useMemo, CSSProperties } from "react";

const DragIcon = () => (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5zM12 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM8 12a.75.75 0 110-1.5.75.75 0 010 1.5zM8 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
    <svg className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

interface NoteItemProps {
    note: Note;
    notes: Note[];
    activeNoteId: string | null;
    depth?: number;
    onSelect: (id: string) => void;
    onAdd: (parentId: string | null) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export const NoteItem = memo(function NoteItem({
    note, notes, activeNoteId, depth = 0, onSelect, onAdd, onDelete, onToggle,
}: NoteItemProps) {
    const children = useMemo(() => notes.filter(n => n.parentId === note.id && !n.isTrashed), [notes, note.id]);
    const hasChildren = children.length > 0;
    const isActive = note.id === activeNoteId;

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: note.id });

    const sortableStyle: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    };

    const rowStyle: CSSProperties = {
        paddingLeft: `calc(12px + ${depth} * var(--sidebar-item-depth-indent))`,
        height: 'var(--height-button)',
        background: isActive ? 'var(--sidebar-item-active-bg)' : undefined,
        color: isActive ? 'var(--sidebar-item-active-text)' : 'var(--sidebar-item-text)',
    };

    return (
        <div ref={setNodeRef} style={sortableStyle} {...attributes} {...listeners}>
            <div
                className="group relative flex items-center gap-2 pr-2 rounded-lg cursor-pointer text-sm transition-colors min-w-0 select-none hover:bg-[var(--sidebar-item-hover-bg)]"
                style={rowStyle}
                onClick={() => onSelect(note.id)}
            >
                <span className="absolute left-0 w-3 h-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity z-20" style={{ color: 'var(--sidebar-item-muted)' }}>
                    <DragIcon />
                </span>

                {hasChildren && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggle(note.id); }}
                        className="absolute left-1.5 w-5 h-full flex items-center justify-center z-10 transition-colors"
                        style={{ color: 'var(--sidebar-item-muted)' }}
                    >
                        <ChevronIcon expanded={!!note.isExpanded} />
                    </button>
                )}

                <div className="w-4 flex items-center justify-center shrink-0 relative z-0">
                    <span className="text-sm transition-transform duration-200 group-hover:scale-125 cursor-default">{note.icon}</span>
                </div>

                <span className="flex-1 truncate relative z-0">{note.title}</span>

                <div className="hidden group-hover:flex items-center gap-1 relative z-10 pr-1">
                    <button
                        onClick={(e) => { e.stopPropagation(); onAdd(note.id); }}
                        className="w-5 h-5 flex items-center justify-center transition-colors"
                        style={{ color: 'var(--sidebar-item-muted)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sidebar-item-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--sidebar-item-muted)'}
                        title="Add sub-note"
                    >+</button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                        className="w-5 h-5 flex items-center justify-center transition-colors"
                        style={{ color: 'var(--sidebar-item-muted)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sidebar-item-accent-danger)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--sidebar-item-muted)'}
                        title="Delete"
                    >×</button>
                </div>
            </div>

            {hasChildren && note.isExpanded && (
                <SortableContext items={children.map(n => n.id)} strategy={verticalListSortingStrategy}>
                    {children.map(child => (
                        <NoteItem
                            key={child.id} note={child} notes={notes}
                            activeNoteId={activeNoteId} depth={depth + 1}
                            onSelect={onSelect} onAdd={onAdd} onDelete={onDelete} onToggle={onToggle}
                        />
                    ))}
                </SortableContext>
            )}
        </div>
    );
});

interface NoteListProps {
    notes: Note[];
    rootNotes: Note[];
    activeNoteId: string | null;
    onSelect: (id: string) => void;
    onAdd: (parentId: string | null) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export default function NoteList({ notes, rootNotes, activeNoteId, onSelect, onAdd, onDelete, onToggle }: NoteListProps) {
    return (
        <div className="space-y-0.5">
            <SortableContext items={rootNotes.map(n => n.id)} strategy={verticalListSortingStrategy}>
                {rootNotes.map(note => (
                    <NoteItem
                        key={note.id} note={note} notes={notes}
                        activeNoteId={activeNoteId}
                        onSelect={onSelect} onAdd={onAdd} onDelete={onDelete} onToggle={onToggle}
                    />
                ))}
            </SortableContext>
        </div>
    );
}
