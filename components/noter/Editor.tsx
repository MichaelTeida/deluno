"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useState, useCallback, useRef } from 'react';

interface EditorProps {
    content: string;
    onUpdate: (content: string) => void;
    editable?: boolean;
    placeholder?: string;
}

interface SlashMenuItem {
    title: string;
    description: string;
    icon: string;
    command: (editor: any) => void;
}

const slashMenuItems: SlashMenuItem[] = [
    {
        title: 'Heading 1',
        description: 'Large heading',
        icon: 'H1',
        command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
        title: 'Heading 2',
        description: 'Medium heading',
        icon: 'H2',
        command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
        title: 'Heading 3',
        description: 'Small heading',
        icon: 'H3',
        command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
        title: 'Bullet List',
        description: 'Unordered list',
        icon: '•',
        command: (editor) => editor.chain().focus().toggleBulletList().run(),
    },
    {
        title: 'Numbered List',
        description: 'Ordered list',
        icon: '1.',
        command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    },
    {
        title: 'Blockquote',
        description: 'Quote block',
        icon: '❝',
        command: (editor) => editor.chain().focus().toggleBlockquote().run(),
    },
    {
        title: 'Divider',
        description: 'Horizontal rule',
        icon: '—',
        command: (editor) => editor.chain().focus().setHorizontalRule().run(),
    },
    {
        title: 'Code Block',
        description: 'Preformatted code',
        icon: '<>',
        command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    },
];

export default function Editor({ content, onUpdate, editable = true, placeholder = "Start writing..." }: EditorProps) {
    const [showToolbar, setShowToolbar] = useState(false);
    const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
    const [showSlash, setShowSlash] = useState(false);
    const [slashPos, setSlashPos] = useState({ top: 0, left: 0 });
    const [slashFilter, setSlashFilter] = useState('');
    const [slashIndex, setSlashIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const slashStartPos = useRef<number | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder }),
        ],
        content,
        editable,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML());
            handleSlashDetection(editor);
        },
        onSelectionUpdate: ({ editor }) => {
            const { from, to } = editor.state.selection;
            if (from !== to && editable) {
                const domRect = editor.view.coordsAtPos(from);
                const containerRect = containerRef.current?.getBoundingClientRect();
                if (containerRect) {
                    setToolbarPos({
                        top: domRect.top - containerRect.top - 48,
                        left: domRect.left - containerRect.left,
                    });
                    setShowToolbar(true);
                }
            } else {
                setShowToolbar(false);
            }
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[200px]',
            },
            handleKeyDown: (_view, event) => {
                if (showSlash) {
                    if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setSlashIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
                        return true;
                    }
                    if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        setSlashIndex(prev => Math.max(prev - 1, 0));
                        return true;
                    }
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        selectSlashItem(slashIndex);
                        return true;
                    }
                    if (event.key === 'Escape') {
                        event.preventDefault();
                        closeSlash();
                        return true;
                    }
                }
                return false;
            },
        },
    });

    const handleSlashDetection = useCallback((ed: any) => {
        const { from } = ed.state.selection;
        const textBefore = ed.state.doc.textBetween(
            Math.max(0, from - 20),
            from,
            '\n'
        );

        const slashMatch = textBefore.match(/\/([a-zA-Z0-9]*)$/);
        if (slashMatch) {
            if (slashStartPos.current === null) {
                slashStartPos.current = from - slashMatch[0].length;
            }
            setSlashFilter(slashMatch[1].toLowerCase());
            setSlashIndex(0);

            const coords = ed.view.coordsAtPos(from);
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (containerRect) {
                setSlashPos({
                    top: coords.bottom - containerRect.top + 4,
                    left: coords.left - containerRect.left,
                });
                setShowSlash(true);
            }
        } else {
            closeSlash();
        }
    }, []);

    const closeSlash = useCallback(() => {
        setShowSlash(false);
        setSlashFilter('');
        setSlashIndex(0);
        slashStartPos.current = null;
    }, []);

    const selectSlashItem = useCallback((index: number) => {
        if (!editor) return;
        const items = filteredItems;
        const item = items[index];
        if (!item) return;

        if (slashStartPos.current !== null) {
            const { from } = editor.state.selection;
            editor.chain()
                .focus()
                .deleteRange({ from: slashStartPos.current, to: from })
                .run();
        }

        item.command(editor);
        closeSlash();
    }, [editor, slashFilter, closeSlash]);

    const filteredItems = slashMenuItems.filter(item =>
        item.title.toLowerCase().includes(slashFilter)
    );

    useEffect(() => {
        if (editor) editor.setEditable(editable);
    }, [editable, editor]);

    if (!editor) return null;

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {/* Floating Toolbar */}
            {showToolbar && editable && (
                <div
                    className="absolute z-50 flex items-center gap-0.5 p-1 rounded-xl glass"
                    data-variant="panel"
                    style={{ top: toolbarPos.top, left: toolbarPos.left }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <ToolbarButton
                        active={editor.isActive('bold')}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        label="B"
                        bold
                    />
                    <ToolbarButton
                        active={editor.isActive('italic')}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        label="I"
                        italic
                    />
                    <ToolbarButton
                        active={editor.isActive('strike')}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        label="S"
                        strike
                    />
                    <div className="w-px h-5 bg-zinc-500/30 mx-1" />
                    <ToolbarButton
                        active={editor.isActive('heading', { level: 1 })}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        label="H1"
                    />
                    <ToolbarButton
                        active={editor.isActive('heading', { level: 2 })}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        label="H2"
                    />
                    <ToolbarButton
                        active={editor.isActive('heading', { level: 3 })}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        label="H3"
                    />
                    <div className="w-px h-5 bg-zinc-500/30 mx-1" />
                    <ToolbarButton
                        active={editor.isActive('bulletList')}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        label="•"
                    />
                    <ToolbarButton
                        active={editor.isActive('orderedList')}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        label="1."
                    />
                    <ToolbarButton
                        active={editor.isActive('blockquote')}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        label="❝"
                    />
                </div>
            )}

            {/* Slash Command Menu */}
            {showSlash && editable && filteredItems.length > 0 && (
                <div
                    className="absolute z-50 w-64 max-h-72 overflow-y-auto rounded-xl p-1.5 glass custom-scrollbar"
                    data-variant="panel"
                    style={{ top: slashPos.top, left: slashPos.left }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 px-2 py-1 mb-1">Blocks</p>
                    {filteredItems.map((item, i) => (
                        <button
                            key={item.title}
                            className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors ${i === slashIndex
                                    ? 'bg-indigo-500/20 text-white'
                                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                                }`}
                            onClick={() => selectSlashItem(i)}
                        >
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-xs font-mono shrink-0">
                                {item.icon}
                            </span>
                            <span className="text-left">
                                <span className="block font-medium text-sm">{item.title}</span>
                                <span className="block text-xs text-zinc-500">{item.description}</span>
                            </span>
                        </button>
                    ))}
                </div>
            )}

            <EditorContent editor={editor} className="h-full" />
        </div>
    );
}

function ToolbarButton({ active, onClick, label, bold, italic, strike }: {
    active: boolean;
    onClick: () => void;
    label: string;
    bold?: boolean;
    italic?: boolean;
    strike?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs transition-all ${active
                    ? 'bg-indigo-500/25 text-indigo-400 shadow-sm'
                    : 'text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
                } ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''} ${strike ? 'line-through' : ''}`}
        >
            {label}
        </button>
    );
}
