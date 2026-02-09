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
                        onClick={() => setShowIconPicker(!showIconPicker)}
                        className="relative z-10 text-3xl hover:bg-white/30 dark:hover:bg-white/10 rounded-lg p-2 transition-colors"
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

                {/* Title Input */}
                <input
                    type="text"
                    value={note.title}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    className="flex-1 text-2xl font-bold text-zinc-800 dark:text-zinc-100 bg-transparent border-none outline-none placeholder-zinc-400"
                    placeholder="Tytuł notatki..."
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
                    onChange={(e) => onUpdate({ content: e.target.value })}
                    className="w-full h-full min-h-[200px] text-zinc-700 dark:text-zinc-300 bg-transparent border-none outline-none resize-none placeholder-zinc-400 dark:placeholder-zinc-600 leading-relaxed"
                    placeholder="Zacznij pisać..."
                />
            </div>
        </div>
    );
}
