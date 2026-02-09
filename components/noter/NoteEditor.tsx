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
        <div className="h-full flex flex-col">
            {/* Title Row */}
            <div className="flex items-center gap-3 mb-4">
                {/* Icon Picker */}
                <div className="relative">
                    <button
                        onClick={() => setShowIconPicker(!showIconPicker)}
                        className="text-3xl hover:bg-white/30 rounded-lg p-2 transition-colors"
                    >
                        {note.icon}
                    </button>
                    {showIconPicker && (
                        <div className="absolute top-full left-0 mt-2 glass p-3 grid grid-cols-5 gap-2 z-10" data-variant="panel">
                            {ICONS.map(icon => (
                                <button
                                    key={icon}
                                    onClick={() => { onUpdate({ icon }); setShowIconPicker(false); }}
                                    className="text-xl hover:bg-white/40 rounded p-1 transition-colors"
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Title Input */}
                <input
                    type="text"
                    value={note.title}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    className="flex-1 text-2xl font-bold text-zinc-800 bg-transparent border-none outline-none placeholder-zinc-400"
                    placeholder="Tytuł notatki..."
                />
            </div>

            {/* Meta Info */}
            <div className="text-xs text-zinc-400 mb-4">
                Ostatnia edycja: {note.updatedAt.toLocaleString("pl-PL")}
            </div>

            {/* Content */}
            <div className="flex-1 relative">
                <textarea
                    ref={contentRef}
                    value={note.content}
                    onChange={(e) => onUpdate({ content: e.target.value })}
                    className="w-full h-full min-h-[200px] text-zinc-700 bg-transparent border-none outline-none resize-none placeholder-zinc-400 leading-relaxed"
                    placeholder="Zacznij pisać..."
                />
            </div>
        </div>
    );
}
