"use client";

import { Note } from "@/lib/noter";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import NoteMenu from "./NoteMenu";

interface NoteEditorProps {
    note: Note;
    onUpdate: (updates: Partial<Note>) => void;
}

const ICONS = ["📄", "📝", "💡", "📋", "📌", "⭐", "🎯", "📊", "📁", "🔖"];

export default function NoteEditor({ note, onUpdate }: NoteEditorProps) {
    const [showIconPicker, setShowIconPicker] = useState(false);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.height = "auto";
            contentRef.current.style.height = contentRef.current.scrollHeight + "px";
        }
    }, [note.content]);

    return (
        <div className="h-full flex flex-col p-4 md:p-8 max-w-5xl mx-auto w-full">
            {/* Title Row */}
            <div className="flex items-center gap-3 mb-4">
                {/* Icon Picker */}
                <div className="relative">
                    <button
                        ref={buttonRef}
                        onClick={() => !note.isLocked && setShowIconPicker(!showIconPicker)}
                        className={`relative z-10 text-3xl transition-colors rounded-lg p-2 ${note.isLocked ? "opacity-50 cursor-not-allowed" : "hover:bg-white/30 dark:hover:bg-white/10"}`}
                        disabled={note.isLocked}
                        title={note.isLocked ? "Page locked" : "Change icon"}
                    >
                        {note.icon}
                    </button>
                    {showIconPicker && createPortal(
                        <>
                            <div className="fixed inset-0 z-[9998]" onClick={() => setShowIconPicker(false)} />
                            <div
                                className="fixed z-[9999] glass p-3 grid grid-cols-5 gap-2 shadow-2xl"
                                data-variant="panel"
                                style={{
                                    top: buttonRef.current?.getBoundingClientRect().bottom! + 8,
                                    left: buttonRef.current?.getBoundingClientRect().left!,
                                }}
                            >
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
                        </>,
                        document.body
                    )}
                </div>

                {/* Title Input */}
                <input
                    type="text"
                    value={note.title}
                    readOnly={note.isLocked}
                    onChange={(e) => !note.isLocked && onUpdate({ title: e.target.value })}
                    className={`flex-1 text-2xl font-bold text-zinc-800 dark:text-zinc-100 bg-transparent border-none outline-none placeholder-zinc-400 ${note.isLocked ? "cursor-not-allowed opacity-80" : ""}`}
                    placeholder={note.isLocked ? "Page Locked" : "Untitled"}
                />

                {/* Header Actions Portal */}
                {typeof document !== 'undefined' && document.getElementById('header-actions') && (
                    <HeaderActionsPortal note={note} onUpdate={onUpdate} />
                )}
            </div>

            {/* Meta Info */}
            <div className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
                Edited: <span suppressHydrationWarning>{note.updatedAt.toLocaleString("en-US")}</span>
            </div>

            {/* Content */}
            <div className="flex-1 relative">
                <textarea
                    ref={contentRef}
                    value={note.content}
                    readOnly={note.isLocked}
                    onChange={(e) => !note.isLocked && onUpdate({ content: e.target.value })}
                    className={`w-full h-full min-h-[200px] text-zinc-700 dark:text-zinc-300 bg-transparent border-none outline-none resize-none placeholder-zinc-400 dark:placeholder-zinc-600 leading-relaxed ${note.isLocked ? "cursor-not-allowed opacity-80" : ""}`}
                    placeholder={note.isLocked ? "Content is locked." : "Start writing..."}
                />
            </div>
        </div >
    );
}

function HeaderActionsPortal({ note, onUpdate }: { note: Note, onUpdate: (updates: Partial<Note>) => void }) {
    const [mounted, setMounted] = useState(false);
    const portalTarget = typeof document !== 'undefined' ? document.getElementById('header-actions') : null;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !portalTarget) return null;

    return createPortal(
        <div className="flex items-center gap-1">
            {/* Favorite Toggle */}
            <button
                onClick={() => onUpdate({ isFavorite: !note.isFavorite })}
                className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg transition-colors backdrop-blur-md border border-white/20 shadow-sm ${note.isFavorite ? "bg-amber-100/50 dark:bg-amber-900/30 text-amber-500 border-amber-200/50" : "bg-white/50 dark:bg-white/10 text-zinc-400 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-white/80 dark:hover:bg-white/20"}`}
                title={note.isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill={note.isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
            </button>

            {/* Context Menu */}
            <NoteMenu />
        </div>,
        portalTarget
    );
}
