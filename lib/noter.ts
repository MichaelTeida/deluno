export interface Note {
    id: string;
    title: string;
    content: string;
    parentId: string | null;
    icon: string;
    isExpanded: boolean;
    isFavorite: boolean;
    isFullWidth: boolean;
    isLocked: boolean;
    isTrashed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface NoterState {
    notes: Note[];
    activeNoteId: string | null;
}

export const createNote = (parentId: string | null = null): Note => ({
    id: crypto.randomUUID(),
    title: "Nowa notatka",
    content: "",
    parentId,
    icon: "📄",
    isExpanded: true,
    isFavorite: false,
    isFullWidth: false,
    isLocked: false,
    isTrashed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
});
