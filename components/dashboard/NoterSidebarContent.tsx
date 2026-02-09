"use client";

import { useNoter } from "@/lib/contexts/NoterContext";
import NoteList from "@/components/noter/NoteList";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export default function NoterSidebarContent() {
    const { notes, activeNoteId, setActiveNoteId, addNote, deleteNote, updateNote, reorderNotes, viewMode, setViewMode } = useNoter();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        if (active.id !== over.id) {
            const activeNote = notes.find(n => n.id === active.id);
            const overNote = notes.find(n => n.id === over.id);

            if (!activeNote || !overNote) return;

            // Find indices in the flat array
            const oldIndex = notes.findIndex(n => n.id === active.id);
            const newIndex = notes.findIndex(n => n.id === over.id);

            let newNotes = [...notes];

            // If parenting is different, update the active note's parent to match the target
            if (activeNote.parentId !== overNote.parentId) {
                const updatedActiveNote = { ...activeNote, parentId: overNote.parentId, updatedAt: new Date() };
                newNotes[oldIndex] = updatedActiveNote;
            }

            // Move the note in the array to the new position
            reorderNotes(arrayMove(newNotes, oldIndex, newIndex));
        }
    };

    const rootNotes = notes.filter(n => n.parentId === null && !n.isTrashed);
    const favoriteNotes = notes.filter(n => n.isFavorite && !n.isTrashed);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-4 pb-3">
            {/* Noter Header with + New */}
            <div className="flex items-center gap-3 py-3 border-b border-white/10">
                <h2 className="text-sm font-bold text-zinc-700 dark:text-zinc-200 uppercase tracking-wider">Noter</h2>
                <button
                    onClick={() => { addNote(null); setViewMode('notes'); }}
                    className="glass px-2 py-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex items-center gap-1"
                    data-variant="interactive"
                    title="New note"
                >
                    <span>+</span>
                    <span>NEW</span>
                </button>
            </div>

            {/* Dashboard Link */}
            <div>
                <div
                    onClick={() => { setViewMode('dashboard'); setActiveNoteId(null); }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${viewMode === 'dashboard' ? "bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "hover:bg-white/20 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"}`}
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
                                className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer text-sm transition-colors ${activeNoteId === note.id && viewMode === 'notes' ? "bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "hover:bg-white/20 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                            >
                                <span className="text-xs">{note.icon}</span>
                                <span className="truncate">{note.title || "Untitled"}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Private */}
            <div className="space-y-1">
                <div className="flex items-center justify-between px-3 mb-2">
                    <h3 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Private</h3>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                    <NoteList
                        notes={notes}
                        rootNotes={rootNotes}
                        activeNoteId={viewMode === 'notes' ? activeNoteId : null}
                        onSelect={(id) => { setActiveNoteId(id); setViewMode('notes'); }}
                        onAdd={(parentId) => { addNote(parentId); setViewMode('notes'); }}
                        onDelete={deleteNote}
                        onToggle={(id) => updateNote(id, { isExpanded: !notes.find(n => n.id === id)?.isExpanded })}
                    />
                </DndContext>
            </div>

            {/* Shared */}
            <div className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Shared</h3>
            </div>

            {/* Trash */}
            <div className="pt-2 border-t border-white/10 mt-2">
                <button
                    onClick={() => { setViewMode('trash'); setActiveNoteId(null); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${viewMode === 'trash' ? "bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" : "hover:bg-white/20 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Trash
                </button>
            </div>
        </div>
    );
}
