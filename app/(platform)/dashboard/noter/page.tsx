"use client";

import { useNoter } from "@/lib/contexts/NoterContext";
import NoteEditor from "@/components/noter/NoteEditor";

export default function NoterPage() {
    const { activeNote, updateNote } = useNoter();

    return (
        <div className="h-full">
            {activeNote ? (
                <NoteEditor
                    note={activeNote}
                    onUpdate={(updates) => updateNote(activeNote.id, updates)}
                />
            ) : (
                <div className="h-full flex items-center justify-center text-zinc-400">
                    <div className="text-center">
                        <div className="text-4xl mb-4">📓</div>
                        <p>Wybierz notatkę z paska bocznego lub utwórz nową.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
