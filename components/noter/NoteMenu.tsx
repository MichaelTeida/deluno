"use client";

import { useState, useRef, useEffect } from "react";
import { useNoter } from "@/lib/contexts/NoterContext";
import { usePathname } from "next/navigation";

export default function NoteMenu() {
    const { activeNote, addNote, updateNote, deleteNote } = useNoter();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!activeNote) return null;

    const handleDuplicate = () => {
        const { id, createdAt, updatedAt, ...rest } = activeNote;
        addNote(activeNote.parentId, { ...rest, title: `${activeNote.title} (Kopia)` });
        setIsOpen(false);
    };

    const handleFullWidth = () => {
        updateNote(activeNote.id, { isFullWidth: !activeNote.isFullWidth });
        setIsOpen(false);
    };

    const handleLock = () => {
        updateNote(activeNote.id, { isLocked: !activeNote.isLocked });
        setIsOpen(false);
    };

    const handleTrash = () => {
        if (confirm("Czy na pewno chcesz przenieść notatkę do kosza?")) {
            deleteNote(activeNote.id);
            setIsOpen(false);
        }
    };

    const handleExportPDF = () => {
        window.print();
        setIsOpen(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link skopiowany do schowka!");
        setIsOpen(false);
    };

    const wordCount = activeNote.content ? activeNote.content.split(/\s+/).filter(Boolean).length : 0;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="glass w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-zinc-400 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                data-variant="interactive"
                title="Options"
            >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 glass p-2 flex flex-col gap-1 z-50 shadow-xl" data-variant="panel">
                    <div className="px-2 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-white/10 mb-1">
                        Actions
                    </div>

                    <MenuOption onClick={handleDuplicate} icon="📄" label="Duplicate" />
                    <MenuOption onClick={handleFullWidth} icon={activeNote.isFullWidth ? "⬅➡" : "↔"} label={activeNote.isFullWidth ? "Standard Width" : "Full Width"} />
                    <MenuOption onClick={handleLock} icon={activeNote.isLocked ? "🔓" : "🔒"} label={activeNote.isLocked ? "Unlock Page" : "Lock Page"} />

                    <div className="h-[1px] bg-white/10 my-1" />

                    <MenuOption onClick={handleCopyLink} icon="🔗" label="Copy Link" />
                    <MenuOption onClick={handleExportPDF} icon="📤" label="Export to PDF" />
                    <MenuOption onClick={() => setIsOpen(false)} icon="📥" label="Import (BETA)" disabled />

                    <div className="h-[1px] bg-white/10 my-1" />

                    <MenuOption onClick={() => { }} icon="➡" label="Move to..." disabled />
                    <MenuOption onClick={handleTrash} icon="🗑️" label="Move to Trash" destructive />

                    <div className="h-[1px] bg-white/10 my-1" />

                    <div className="px-2 py-1 flex justify-between text-xs text-zinc-500">
                        <span>Words:</span>
                        <span className="font-mono">{wordCount}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

function MenuOption({ onClick, icon, label, destructive = false, disabled = false }: { onClick: () => void, icon: string, label: string, destructive?: boolean, disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-3 px-2 py-1.5 rounded-lg text-sm w-full text-left transition-colors
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20 dark:hover:bg-white/10'}
                ${destructive ? 'text-red-500 hover:text-red-600' : 'text-zinc-600 dark:text-zinc-300'}
            `}
        >
            <span className="w-5 text-center shrink-0">{icon}</span>
            <span className="truncate">{label}</span>
        </button>
    );
}
