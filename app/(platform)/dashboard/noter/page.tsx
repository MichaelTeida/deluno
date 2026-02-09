"use client";

import { useState } from "react";
import { Note, createNote } from "@/lib/noter";
import NoteList from "@/components/noter/NoteList";
import NoteEditor from "@/components/noter/NoteEditor";

const initialNotes: Note[] = [
    { id: "1", title: "Witaj w Noter", content: "To jest Twoja pierwsza notatka. Kliknij aby edytować.", parentId: null, icon: "📝", isExpanded: true, createdAt: new Date(), updatedAt: new Date() },
    { id: "2", title: "Pomysły na projekt", content: "- Idea 1\\n- Idea 2\\n- Idea 3", parentId: null, icon: "💡", isExpanded: true, createdAt: new Date(), updatedAt: new Date() },
    { id: "3", title: "Pod-notatka", content: "To jest zagnieżdżona notatka.", parentId: "2", icon: "📄", isExpanded: true, createdAt: new Date(), updatedAt: new Date() },
];

export default function NoterPage() {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [activeNoteId, setActiveNoteId] = useState<string | null>("1");

    const activeNote = notes.find(n => n.id === activeNoteId) || null;

    const handleAddNote = (parentId: string | null = null) => {
        const newNote = createNote(parentId);
        setNotes([...notes, newNote]);
        setActiveNoteId(newNote.id);
    };

    const handleUpdateNote = (id: string, updates: Partial<Note>) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
        ));
    };

    const handleDeleteNote = (id: string) => {
        const idsToDelete = new Set<string>();
        const collectChildren = (parentId: string) => {
            idsToDelete.add(parentId);
            notes.filter(n => n.parentId === parentId).forEach(n => collectChildren(n.id));
        };
        collectChildren(id);
        setNotes(notes.filter(n => !idsToDelete.has(n.id)));
        if (idsToDelete.has(activeNoteId || "")) {
            setActiveNoteId(notes.find(n => !idsToDelete.has(n.id))?.id || null);
        }
    };

    const rootNotes = notes.filter(n => n.parentId === null);

    return (
        <div className="flex h-full gap-4">
            {/* Notes Sidebar */}
            <div className="w-64 shrink-0 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-zinc-800">📓 Noter</h2>
                    <button
                        onClick={() => handleAddNote(null)}
                        className="glass w-8 h-8 flex items-center justify-center text-indigo-600 hover:bg-white/40"
                        data-variant="interactive"
                        title="Nowa notatka"
                    >
                        +
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <NoteList
                        notes={notes}
                        rootNotes={rootNotes}
                        activeNoteId={activeNoteId}
                        onSelect={setActiveNoteId}
                        onAdd={handleAddNote}
                        onDelete={handleDeleteNote}
                        onToggle={(id) => handleUpdateNote(id, { isExpanded: !notes.find(n => n.id === id)?.isExpanded })}
                    />
                </div>
            </div>

            {/* Note Editor */}
            <div className="flex-1 glass p-6" data-variant="panel">
                {activeNote ? (
                    <NoteEditor
                        note={activeNote}
                        onUpdate={(updates) => handleUpdateNote(activeNote.id, updates)}
                    />
                ) : (
                    <div className="h-full flex items-center justify-center text-zinc-400">
                        Wybierz lub utwórz notatkę
                    </div>
                )}
            </div>
        </div>
    );
}
