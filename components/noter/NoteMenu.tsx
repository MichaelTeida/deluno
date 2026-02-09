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
        if (confirm("Are you sure you want to move this note to trash?")) {
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
                className={`glass w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-lg transition-colors ${isOpen ? 'bg-white/20 dark:bg-white/10' : ''}`}
                data-variant="interactive"
                title="Opcje notatki"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="4" cy="10" r="1.5" />
                    <circle cx="10" cy="10" r="1.5" />
                    <circle cx="16" cy="10" r="1.5" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 glass p-2 flex flex-col gap-1 z-50 shadow-xl" data-variant="panel">
                    <div className="px-2 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-white/10 mb-1">
                        Akcje
                    </div>

                    <MenuOption onClick={handleDuplicate} icon="📄" label="Duplikuj" />
                    <MenuOption onClick={handleFullWidth} icon={activeNote.isFullWidth ? "⬅➡" : "↔"} label={activeNote.isFullWidth ? "Standard width" : "Full width"} />
                    <MenuOption onClick={handleLock} icon={activeNote.isLocked ? "🔓" : "🔒"} label={activeNote.isLocked ? "Unlock page" : "Lock page"} />

                    <div className="h-[1px] bg-white/10 my-1" />

                    <MenuOption onClick={handleCopyLink} icon="🔗" label="Copy link" />
                    <MenuOption onClick={handleExportPDF} icon="📤" label="Export to PDF" />
                    <MenuOption onClick={() => setIsOpen(false)} icon="📥" label="Import (BETA)" disabled />

                    <div className="h-[1px] bg-white/10 my-1" />

                    <MenuOption onClick={() => { }} icon="➡" label="Move to..." disabled />
                    <MenuOption onClick={handleTrash} icon="🗑️" label="Move to trash" destructive />

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
