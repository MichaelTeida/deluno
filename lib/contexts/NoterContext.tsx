"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Note, createNote } from "@/lib/noter";

interface NoterContextType {
    notes: Note[];
    activeNoteId: string | null;
    setActiveNoteId: (id: string | null) => void;
    addNote: (parentId?: string | null, noteData?: Partial<Note>) => void;
    updateNote: (id: string, updates: Partial<Note>) => void;
    deleteNote: (id: string) => void;
    activeNote: Note | null;
}

const NoterContext = createContext<NoterContextType | undefined>(undefined);

{ id: "1", title: "Witaj w Noter", content: "To jest Twoja pierwsza notatka. Kliknij aby edytować.", parentId: null, icon: "📝", isExpanded: true, isFavorite: false, isFullWidth: false, isLocked: false, isTrashed: false, createdAt: new Date(), updatedAt: new Date() },
{ id: "2", title: "Pomysły na projekt", content: "- Idea 1\n- Idea 2\n- Idea 3", parentId: null, icon: "💡", isExpanded: true, isFavorite: true, isFullWidth: false, isLocked: false, isTrashed: false, createdAt: new Date(), updatedAt: new Date() },
{ id: "3", title: "Pod-notatka", content: "To jest zagnieżdżona notatka.", parentId: "2", icon: "📄", isExpanded: true, isFavorite: false, isFullWidth: false, isLocked: false, isTrashed: false, createdAt: new Date(), updatedAt: new Date() },

export function NoterProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [activeNoteId, setActiveNoteId] = useState<string | null>("1");

    const activeNote = notes.find(n => n.id === activeNoteId) || null;

    const addNote = (parentId: string | null = null, noteData: Partial<Note> = {}) => {
        const newNote = { ...createNote(parentId), ...noteData, id: crypto.randomUUID(), createdAt: new Date(), updatedAt: new Date() };
        setNotes(prev => [...prev, newNote]);
        setActiveNoteId(newNote.id);
    };

    const updateNote = (id: string, updates: Partial<Note>) => {
        setNotes(prev => prev.map(note =>
            note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
        ));
    };

    const deleteNote = (id: string) => {
        const idsToDelete = new Set<string>();
        const collectChildren = (parentId: string) => {
            idsToDelete.add(parentId);
            notes.filter(n => n.parentId === parentId).forEach(n => collectChildren(n.id));
        };
        collectChildren(id);

        setNotes(prev => prev.filter(n => !idsToDelete.has(n.id)));
        if (idsToDelete.has(activeNoteId || "")) {
            setActiveNoteId(null);
        }
    };

    return (
        <NoterContext.Provider value={{
            notes,
            activeNoteId,
            setActiveNoteId,
            addNote,
            updateNote,
            deleteNote,
            activeNote
        }}>
            {children}
        </NoterContext.Provider>
    );
}

export function useNoter() {
    const context = useContext(NoterContext);
    if (context === undefined) {
        throw new Error("useNoter must be used within a NoterProvider");
    }
    return context;
}
