"use client";

import { useNoter } from "@/lib/contexts/NoterContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

interface SearchCommandProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
    const { notes, setActiveNoteId, setViewMode } = useNoter();
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery(""); // Reset query on close
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const filteredNotes = notes.filter(note =>
        !note.isTrashed &&
        (note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.content.toLowerCase().includes(query.toLowerCase()))
    );

    const handleSelect = (noteId: string) => {
        setActiveNoteId(noteId);
        setViewMode('notes');
        router.push("/panel/noter");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[60vh]">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                    <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search notes..."
                        className="flex-1 bg-transparent border-none outline-none text-lg text-zinc-800 dark:text-zinc-100 placeholder-zinc-400"
                    />
                    <div className="text-xs text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5">
                        ESC
                    </div>
                </div>

                {/* Results */}
                <div className="overflow-y-auto p-2">
                    {filteredNotes.length === 0 ? (
                        <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                            {query ? "No results." : "Type to search..."}
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filteredNotes.map(note => (
                                <button
                                    key={note.id}
                                    onClick={() => handleSelect(note.id)}
                                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 flex items-center gap-3 transition-colors group"
                                >
                                    <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{note.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-zinc-700 dark:text-zinc-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {note.title || "Untitled"}
                                        </div>
                                        {note.content && (
                                            <div className="text-xs text-zinc-400 truncate opacity-70">
                                                {note.content.substring(0, 100).replace(/\n/g, ' ')}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-[10px] text-zinc-400 shrink-0">
                                        {note.updatedAt.toLocaleDateString()}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-400 flex justify-between shrink-0">
                    <span>
                        Found: {filteredNotes.length}
                    </span>
                    <span className="flex gap-2">
                        <span>↑↓ navigate</span>
                        <span>↵ select</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
