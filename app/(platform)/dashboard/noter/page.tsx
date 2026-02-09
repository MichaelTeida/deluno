"use client";

import { useNoter } from "@/lib/contexts/NoterContext";
import NoteEditor from "@/components/noter/NoteEditor";
import DashboardView from "@/components/noter/DashboardView";
import TrashView from "@/components/noter/TrashView";

export default function NoterPage() {
    const { activeNote, updateNote, viewMode } = useNoter();

    if (viewMode === 'trash') {
        return <TrashView />;
    }

    return (
        <div className="h-full">
            {activeNote ? (
                <NoteEditor
                    note={activeNote}
                    onUpdate={(updates) => updateNote(activeNote.id, updates)}
                />
            ) : (
                <DashboardView />
            )}
        </div>
    );
}
