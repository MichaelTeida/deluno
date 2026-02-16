"use client";

import { useNoter } from "@/lib/contexts/NoterContext";
import NoteList from "@/components/noter/NoteList";
import { usePlatform } from "@/lib/contexts/PlatformContext";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter, KeyboardSensor, DragOverlay, Modifier } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState, useId, useRef, useMemo, useCallback } from "react";

const adjustForContainerOffset: Modifier = ({ transform, draggingNodeRect, containerNodeRect }) => {
    if (!draggingNodeRect || !containerNodeRect) return transform;
    const nav = document.querySelector('nav[data-variant="panel"]');
    if (!nav) return transform;
    const navRect = nav.getBoundingClientRect();
    return {
        ...transform,
        x: transform.x - navRect.left,
        y: transform.y - navRect.top,
    };
};

export default function NoterSidebarContent() {
    const { notes, activeNoteId, setActiveNoteId, addNote, deleteNote, updateNote, reorderNotes, viewMode, setViewMode } = useNoter();
    const [activeId, setActiveId] = useState<string | null>(null);
    const { sidebarWidth } = usePlatform();
    const dndId = useId();
    const isCreatingRef = useRef(false);

    const handleCreateNote = () => {
        if (isCreatingRef.current) return;
        isCreatingRef.current = true;
        addNote(null);
        setViewMode('notes');
        setTimeout(() => { isCreatingRef.current = false; }, 500);
    };

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        const handler = () => { addNote(null); setViewMode('notes'); };
        document.addEventListener('create-new-note', handler);
        return () => document.removeEventListener('create-new-note', handler);
    }, [addNote, setViewMode]);

    const nonTrashedNotes = useMemo(() => notes.filter(n => !n.isTrashed), [notes]);
    const rootNotes = useMemo(() => nonTrashedNotes.filter(n => n.parentId === null), [nonTrashedNotes]);
    const favoriteNotes = useMemo(() => nonTrashedNotes.filter(n => n.isFavorite), [nonTrashedNotes]);
    const privateRootNotes = useMemo(() => rootNotes.filter(n => !n.isFavorite), [rootNotes]);

    const draggedNote = useMemo(() => activeId ? notes.find(n => n.id === activeId) : null, [activeId, notes]);

    const isDescendant = (parentId: string, childId: string) => {
        let current = notes.find(n => n.id === childId);
        while (current?.parentId) {
            if (current.parentId === parentId) return true;
            current = notes.find(n => n.id === current!.parentId);
        }
        return false;
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over || active.id === over.id) return;

        const activeNote = notes.find(n => n.id === active.id);
        const overNote = notes.find(n => n.id === over.id);
        if (!activeNote || !overNote) return;
        if (isDescendant(activeNote.id, overNote.id)) return;

        const targetParentId = overNote.parentId;

        const getSiblings = (parentId: string | null) =>
            notes.filter(n => n.parentId === parentId && !n.isTrashed && !n.isFavorite);

        const updatedNotes = [...notes];

        if (activeNote.parentId !== targetParentId) {
            const idx = updatedNotes.findIndex(n => n.id === activeNote.id);
            updatedNotes[idx] = { ...updatedNotes[idx], parentId: targetParentId, updatedAt: new Date() };
        }

        const siblings = getSiblings(targetParentId);
        const siblingIds = siblings.map(n => n.id);
        const fromIdx = siblingIds.indexOf(activeNote.id);
        const toIdx = siblingIds.indexOf(overNote.id);

        if (fromIdx === -1 || toIdx === -1) {
            reorderNotes(updatedNotes);
            return;
        }

        siblingIds.splice(fromIdx, 1);
        siblingIds.splice(toIdx, 0, activeNote.id);

        const siblingOrder = new Map(siblingIds.map((id, i) => [id, i]));
        updatedNotes.sort((a, b) => {
            const aOrder = siblingOrder.get(a.id);
            const bOrder = siblingOrder.get(b.id);
            if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
            if (aOrder !== undefined) return -1;
            if (bOrder !== undefined) return 1;
            return 0;
        });

        reorderNotes(updatedNotes);
    };

    const isActive = (id: string | null, mode: string) => id !== null && viewMode === mode;

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pb-3">
            {/* Dashboard */}
            <div className="py-2">
                <div
                    onClick={() => { setActiveNoteId(null); setViewMode('dashboard'); }}
                    className="flex items-center gap-2 px-3 rounded-lg cursor-pointer text-sm font-medium transition-colors select-none"
                    style={{
                        height: 'var(--height-button)',
                        background: viewMode === 'dashboard' ? 'var(--sidebar-item-active-bg)' : undefined,
                        color: viewMode === 'dashboard' ? 'var(--sidebar-item-active-text)' : 'var(--sidebar-item-text)',
                    }}
                >
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        </svg>
                    </div>
                    Dashboard
                </div>
            </div>

            {/* Favorites */}
            <div className="space-y-1">
                <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--sidebar-item-muted)' }}>Favorites</h3>
                {favoriteNotes.length === 0 ? (
                    <div className="py-1.5 text-xs italic" style={{ color: 'var(--sidebar-item-muted)' }}>No favorites</div>
                ) : (
                    <div className="space-y-0.5">
                        {favoriteNotes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => { setActiveNoteId(note.id); setViewMode('notes'); }}
                                className="flex items-center gap-2 px-3 cursor-pointer text-sm transition-colors select-none rounded-lg hover:bg-[var(--sidebar-item-hover-bg)]"
                                style={{
                                    height: 'var(--height-button)',
                                    background: activeNoteId === note.id && viewMode === 'notes' ? 'var(--sidebar-item-active-bg)' : undefined,
                                    color: activeNoteId === note.id && viewMode === 'notes' ? 'var(--sidebar-item-active-text)' : 'var(--sidebar-item-text)',
                                }}
                            >
                                <div className="w-4 flex items-center justify-center shrink-0">
                                    <span className="text-sm">{note.icon}</span>
                                </div>
                                <span className="truncate">{note.title || "Untitled"}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Private Notes */}
            <div className="space-y-1">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--sidebar-item-muted)' }}>Private</h3>
                    <button
                        onClick={handleCreateNote}
                        className="transition-colors text-lg pr-1"
                        style={{ color: 'var(--sidebar-item-muted)' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--sidebar-item-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--sidebar-item-muted)'}
                        title="Add note"
                    >+</button>
                </div>
                <DndContext
                    id={dndId}
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={(e) => setActiveId(e.active.id as string)}
                    onDragEnd={handleDragEnd}
                >
                    <NoteList
                        notes={nonTrashedNotes}
                        rootNotes={privateRootNotes}
                        activeNoteId={viewMode === 'notes' ? activeNoteId : null}
                        onSelect={(id) => { setActiveNoteId(id); setViewMode('notes'); }}
                        onAdd={(parentId) => { addNote(parentId); setViewMode('notes'); }}
                        onDelete={deleteNote}
                        onToggle={(id) => updateNote(id, { isExpanded: !notes.find(n => n.id === id)?.isExpanded })}
                    />
                    <DragOverlay
                        zIndex={9999}
                        modifiers={[adjustForContainerOffset]}
                    >
                        {draggedNote ? (
                            <div className="opacity-90 rotate-2 cursor-grabbing pointer-events-none scale-[1.02] transition-transform" style={{ width: sidebarWidth }}>
                                <div
                                    className="flex items-center gap-2 px-3 rounded-lg text-white shadow-xl backdrop-blur-md"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.55) 0%, rgba(79, 70, 229, 0.55) 100%)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                                        height: 'var(--height-button)',
                                    }}
                                >
                                    <span className="text-sm">{draggedNote.icon}</span>
                                    <span className="font-semibold text-sm truncate">{draggedNote.title || "Untitled"}</span>
                                </div>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>

            {/* Shared */}
            <div className="space-y-1">
                <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--sidebar-item-muted)' }}>Shared</h3>
            </div>

            {/* Trash */}
            <div className="pt-2 border-t border-white/10 mt-2">
                <button
                    onClick={() => { setViewMode('trash'); setActiveNoteId(null); }}
                    className="w-full flex items-center gap-2 px-3 rounded-lg transition-colors text-sm font-medium hover:bg-[var(--sidebar-item-hover-bg)]"
                    style={{
                        height: 'var(--height-button)',
                        background: viewMode === 'trash' ? 'var(--sidebar-item-active-bg)' : undefined,
                        color: viewMode === 'trash' ? 'var(--sidebar-item-active-text)' : 'var(--sidebar-item-text)',
                    }}
                >
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                    Trash
                </button>
            </div>
        </div>
    );
}
