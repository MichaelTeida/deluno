"use client";

import { useNoter } from "@/lib/contexts/NoterContext";
import NoteList from "@/components/noter/NoteList";

export default function NoterSidebarContent() {
    const { notes, activeNoteId, setActiveNoteId, addNote, deleteNote, updateNote } = useNoter();

    const rootNotes = notes.filter(n => n.parentId === null);

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-4 pb-3">
            {/* Dashboard Link */}
            <div className="py-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20 cursor-pointer text-sm text-zinc-600 font-medium transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    Dashboard
                </div>
            </div>

            {/* Favorites */}
            <div className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Favorites</h3>
                <div className="px-3 py-1.5 text-xs text-zinc-400 italic">Brak ulubionych</div>
            </div>

            {/* Private */}
            <div className="space-y-1">
                <div className="flex items-center justify-between px-3 mb-2">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Private</h3>
                    <button
                        onClick={() => addNote(null)}
                        className="text-zinc-400 hover:text-indigo-600 transition-colors text-lg"
                        title="Dodaj notatkę"
                    >
                        +
                    </button>
                </div>
                <NoteList
                    notes={notes}
                    rootNotes={rootNotes}
                    activeNoteId={activeNoteId}
                    onSelect={setActiveNoteId}
                    onAdd={addNote}
                    onDelete={deleteNote}
                    onToggle={(id) => updateNote(id, { isExpanded: !notes.find(n => n.id === id)?.isExpanded })}
                />
            </div>

            {/* Shared */}
            <div className="space-y-1">
                <h3 className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Shared</h3>
            </div>
        </div>
    );
}
