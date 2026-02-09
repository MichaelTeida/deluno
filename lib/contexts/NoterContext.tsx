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
    restoreNote: (id: string) => void;
    permanentlyDeleteNote: (id: string) => void;
    reorderNotes: (newNotes: Note[]) => void;
    viewMode: 'notes' | 'trash';
    setViewMode: (mode: 'notes' | 'trash') => void;
    activeNote: Note | null;
}

const NoterContext = createContext<NoterContextType | undefined>(undefined);

const initialNotes: Note[] = [
    { id: "1", title: "Welcome to Noter", content: "This is your first note. Click to edit.", parentId: null, icon: "📝", isExpanded: true, isFavorite: false, isFullWidth: false, isLocked: false, isTrashed: false, createdAt: new Date(), updatedAt: new Date() },
    { id: "2", title: "Project Ideas", content: "- Idea 1\n- Idea 2\n- Idea 3", parentId: null, icon: "💡", isExpanded: true, isFavorite: true, isFullWidth: false, isLocked: false, isTrashed: false, createdAt: new Date(), updatedAt: new Date() },
    { id: "3", title: "Sub-note", content: "This is a nested note.", parentId: "2", icon: "📄", isExpanded: true, isFavorite: false, isFullWidth: false, isLocked: false, isTrashed: false, createdAt: new Date(), updatedAt: new Date() },
];

export function NoterProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [activeNoteId, setActiveNoteId] = useState<string | null>("1");
    const [viewMode, setViewMode] = useState<'notes' | 'trash'>('notes');

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
        // Soft delete
        updateNote(id, { isTrashed: true });

        // Also trash children? Usually yes.
        const trashChildren = (parentId: string) => {
            notes.filter(n => n.parentId === parentId).forEach(child => {
                updateNote(child.id, { isTrashed: true });
                trashChildren(child.id);
            });
        };
        trashChildren(id);

        if (activeNoteId === id) {
            setActiveNoteId(null);
        }
    };

    const restoreNote = (id: string) => {
        updateNote(id, { isTrashed: false });
        // Restore parents if they are trashed? 
        // Logic: if parent is trashed, move to root? 
        // For simplicity: just restore.
    };

    const permanentlyDeleteNote = (id: string) => {
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

    const reorderNotes = (newNotes: Note[]) => {
        setNotes(newNotes);
    };

    return (
        <NoterContext.Provider value={{
            notes,
            activeNoteId,
            setActiveNoteId,
            addNote,
            updateNote,
            deleteNote,
            restoreNote,
            permanentlyDeleteNote,
            reorderNotes,
            viewMode,
            setViewMode,
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
