"use client";

import { useNoter } from "@/lib/contexts/NoterContext";
import NoteList from "@/components/noter/NoteList";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter, KeyboardSensor, DragOverlay } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useEffect, useState, useId, useRef } from "react";

export default function NoterSidebarContent() {
    const { notes, activeNoteId, setActiveNoteId, addNote, deleteNote, updateNote, reorderNotes, viewMode, setViewMode } = useNoter();
    const router = useRouter();
    const [activeId, setActiveId] = useState<string | null>(null);
    const dndId = useId();
    // Use ref for immediate blocking synchronously
    const isCreatingRef = useRef(false);

    const handleCreateNote = () => {
        if (isCreatingRef.current) return;
        isCreatingRef.current = true;

        addNote(null);
        setViewMode('notes');

        // Debounce release
        setTimeout(() => {
            isCreatingRef.current = false;
        }, 500);
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5, // Start dragging after 5px movement
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200, // Wait 200ms before dragging to allow scrolling
                tolerance: 5, // Allow 5px movement during delay
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Listen for global "create-new-note" event from layout
    useEffect(() => {
        const handleCreateNewNote = () => {
            addNote(null);
            setViewMode('notes');
        };

        document.addEventListener('create-new-note', handleCreateNewNote);
        return () => document.removeEventListener('create-new-note', handleCreateNewNote);
    }, [addNote, setViewMode]);



    const rootNotes = notes.filter(n => n.parentId === null && !n.isTrashed);
    const favoriteNotes = notes.filter(n => n.isFavorite && !n.isTrashed);

    const isDescendant = (parentId: string, childId: string, notesList: typeof notes) => {
        let current = notesList.find(n => n.id === childId);
        while (current && current.parentId) {
            if (current.parentId === parentId) return true;
            current = notesList.find(n => n.id === current.parentId);
        }
        return false;
    };

    const handleDragOver = (event: any) => {
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id as string;
        const overId = over.id as string;
        if (activeId === overId) return;
        if (isDescendant(activeId, overId, notes)) return;
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        if (active.id !== over.id) {
            const activeNoteIndex = notes.findIndex(n => n.id === active.id);
            const overNoteIndex = notes.findIndex(n => n.id === over.id);

            if (activeNoteIndex === -1 || overNoteIndex === -1) return;

            const activeNote = notes[activeNoteIndex];
            const overNote = notes[overNoteIndex];

            if (isDescendant(activeNote.id, overNote.id, notes)) return;

            if (activeNote.parentId !== overNote.parentId) {
                updateNote(activeNote.id, { parentId: overNote.parentId });
            }

            reorderNotes(arrayMove(notes, activeNoteIndex, overNoteIndex));
        }
    };

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-4 pb-3">
            {/* Dashboard Link */}
            {/* Dashboard Link */}
            <div className="py-2">
                <div
                    onClick={() => { setActiveNoteId(null); setViewMode('dashboard'); }}
                    className={`flex items-center gap-3 px-3 rounded-lg cursor-pointer text-sm font-medium transition-colors select-none ${viewMode === 'dashboard' ? 'bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'hover:bg-white/20 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100'}`}
                    style={{ height: 'var(--height-button)' }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    Dashboard
                </div>
            </div>

            {/* Favorites */}
            <div className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Favorites</h3>
                {favoriteNotes.length === 0 ? (
                    <div className="px-3 py-1.5 text-xs text-zinc-400 dark:text-zinc-500 italic">No favorites</div>
                ) : (
                    <div className="space-y-0.5">
                        {favoriteNotes.map(note => (
                            <div
                                key={note.id}
                                onClick={() => { setActiveNoteId(note.id); setViewMode('notes'); }}
                                className={`flex items-center gap-2 px-3 cursor-pointer text-sm transition-colors select-none ${activeNoteId === note.id && viewMode === 'notes' ? "bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "hover:bg-white/20 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                                style={{ height: 'var(--height-button)' }}
                            >
                                <span className="text-xs">{note.icon}</span>
                                <span className="truncate">{note.title || "Untitled"}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Trash View / List */}
            {viewMode === 'trash' ? (
                <div className="space-y-1">
                    <div className="flex items-center justify-between px-3 mb-2">
                        <h3 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Trash</h3>
                        <button
                            onClick={() => {
                                // Empty trash logic could go here
                            }}
                            className="text-xs text-red-500 hover:text-red-600 transition-colors"
                        >
                            {/* Empty Trash */}
                        </button>
                    </div>
                    {notes.filter(n => n.isTrashed).length === 0 ? (
                        <div className="px-3 py-8 text-center flex flex-col items-center gap-2 opacity-50">
                            <svg className="w-8 h-8 text-zinc-400 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium">Trash is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-0.5">
                            {notes.filter(n => n.isTrashed).map(note => (
                                <div
                                    key={note.id}
                                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg group hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <span className="text-xs opacity-50">{note.icon}</span>
                                        <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate decoration-line-through">{note.title || "Untitled"}</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateNote(note.id, { isTrashed: false });
                                        }}
                                        className="text-indigo-500 hover:text-indigo-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Restore"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                /* Private Notes (Standard View) */
                <div className="space-y-1">
                    <div className="flex items-center justify-between px-3 mb-2">
                        <h3 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Private</h3>
                        <button
                            onClick={handleCreateNote}
                            className={`text-zinc-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-lg`}
                            title="Add note"
                        >
                            +
                        </button>
                    </div>
                    <DndContext
                        id={dndId}
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={(e) => setActiveId(e.active.id as string)}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                    >
                        <NoteList
                            notes={notes}
                            rootNotes={rootNotes}
                            activeNoteId={viewMode === 'notes' ? activeNoteId : null}
                            onSelect={(id) => { setActiveNoteId(id); setViewMode('notes'); }}
                            onAdd={(parentId) => { addNote(parentId); setViewMode('notes'); }}
                            onDelete={deleteNote}
                            onToggle={(id) => updateNote(id, { isExpanded: !notes.find(n => n.id === id)?.isExpanded })}
                        />
                        <DragOverlay zIndex={9999}>
                            {activeId ? (
                                <div className="opacity-90 rotate-2 cursor-grabbing pointer-events-none scale-105 transition-transform" style={{ width: 'var(--sidebar-width, 240px)' }}>
                                    <div
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-white shadow-xl backdrop-blur-md"
                                        style={{
                                            background: `linear-gradient(135deg, rgba(99, 102, 241, 0.55) 0%, rgba(79, 70, 229, 0.55) 100%)`,
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
                                            height: 'var(--height-button)'
                                        }}
                                    >
                                        <span className="text-sm">{notes.find(n => n.id === activeId)?.icon}</span>
                                        <span className="font-semibold text-sm truncate">{notes.find(n => n.id === activeId)?.title || "Untitled"}</span>
                                    </div>
                                </div>
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            )}

            {/* Shared */}
            <div className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Shared</h3>
            </div>

            {/* Trash */}
            <div className="pt-2 border-t border-white/10 mt-2">
                <button
                    onClick={() => { setViewMode('trash'); setActiveNoteId(null); }}
                    className={`w-full flex items-center gap-3 px-3 rounded-lg transition-colors text-sm font-medium ${viewMode === 'trash' ? "bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "hover:bg-white/20 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                    style={{ height: 'var(--height-button)' }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Trash
                </button>
            </div>
        </div >
    );
}

