"use client";

import { Note } from "@/lib/noter";
import { useState, useRef, useEffect } from "react";

interface NoteEditorProps {
    note: Note;
    onUpdate: (updates: Partial<Note>) => void;
}

const ICONS = ["📄", "📝", "💡", "📋", "📌", "⭐", "🎯", "📊", "📁", "🔖"];

export default function NoteEditor({ note, onUpdate }: NoteEditorProps) {
    const [showIconPicker, setShowIconPicker] = useState(false);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    }, [note.content]);

    return (
        <div className="h-full flex flex-col px-1 md:px-0">
            {/* Title Row */}
            <div className="flex items-center gap-3 mb-4">
                {/* Icon Picker */}
                <div className="relative">
                    <button
                        onClick={() => !note.isLocked && setShowIconPicker(!showIconPicker)}
                        className={`relative z-10 text-3xl transition-colors rounded-lg p-2 ${note.isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-white/30 dark:hover:bg-white/10"}`}
                        disabled={note.isLocked}
                        title={note.isLocked ? "Notatka zablokowana" : "Zmień ikonę"}
                    >
                        {note.icon}
                    </button>
                    {showIconPicker && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowIconPicker(false)} />
                            <div className="absolute top-full left-0 mt-2 glass p-3 grid grid-cols-5 gap-2 z-50" data-variant="panel">
                                {ICONS.map(icon => (
                                    <button
                                        key={icon}
                                        onClick={() => { onUpdate({ icon }); setShowIconPicker(false); }}
                                        className="text-xl hover:bg-white/40 dark:hover:bg-white/20 rounded p-1 transition-colors"
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Favorite Toggle */}
                <button
                    onClick={() => onUpdate({ isFavorite: !note.isFavorite })}
                    className={`glass w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${note.isFavorite ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600 hover:text-amber-400"}`}
                    data-variant="interactive"
                    title={note.isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                >
                    <svg className="w-6 h-6" fill={note.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                </button>

                {/* Title Input */}
                <input
                    type="text"
                    value={note.title}
                    readOnly={note.isLocked}
                    onChange={(e) => !note.isLocked && onUpdate({ title: e.target.value })}
                    className={`flex-1 text-2xl font-bold text-zinc-800 dark:text-zinc-100 bg-transparent border-none outline-none placeholder-zinc-400 ${note.isLocked ? "cursor-not-allowed opacity-80" : ""}`}
                    placeholder={note.isLocked ? "Zablokowana" : "Tytuł notatki..."}
                />
            </div>

            {/* Meta Info */}
            <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
                Ostatnia edycja: <span suppressHydrationWarning>{note.updatedAt.toLocaleString("pl-PL")}</span>
            </div>

            {/* Content */}
            <div className="flex-1 relative">
                <textarea
                    ref={contentRef}
                    value={note.content}
                    readOnly={note.isLocked}
                    onChange={(e) => !note.isLocked && onUpdate({ content: e.target.value })}
                    className={`w-full h-full min-h-[200px] text-zinc-700 dark:text-zinc-300 bg-transparent border-none outline-none resize-none placeholder-zinc-400 dark:placeholder-zinc-600 leading-relaxed ${note.isLocked ? "cursor-not-allowed opacity-80" : ""}`}
                    placeholder={note.isLocked ? "Treść zablokowana do edycji." : "Zacznij pisać..."}
                />
            </div>
        </div>
    );
}
