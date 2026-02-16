"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
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
    { title: 'Text', description: 'Plain paragraph', icon: '¶', command: (e) => e.chain().focus().setParagraph().run() },
    { title: 'Heading 1', description: 'Large heading', icon: 'H1', command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run() },
    { title: 'Heading 2', description: 'Medium heading', icon: 'H2', command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run() },
    { title: 'Heading 3', description: 'Small heading', icon: 'H3', command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run() },
    { title: 'Bullet List', description: 'Unordered list', icon: '•', command: (e) => e.chain().focus().toggleBulletList().run() },
    { title: 'Numbered List', description: 'Ordered list', icon: '1.', command: (e) => e.chain().focus().toggleOrderedList().run() },
    { title: 'Task List', description: 'Checklist with checkboxes', icon: '☑', command: (e) => e.chain().focus().toggleTaskList().run() },
    { title: 'Blockquote', description: 'Quote block', icon: '❝', command: (e) => e.chain().focus().toggleBlockquote().run() },
    { title: 'Code Block', description: 'Preformatted code', icon: '⌨', command: (e) => e.chain().focus().toggleCodeBlock().run() },
    { title: 'Divider', description: 'Horizontal rule', icon: '—', command: (e) => e.chain().focus().setHorizontalRule().run() },
    { title: 'Highlight', description: 'Mark text with color', icon: '🖍', command: (e) => e.chain().focus().toggleHighlight().run() },
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
    const [linkUrl, setLinkUrl] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);

    const filteredItems = slashMenuItems.filter(item =>
        item.title.toLowerCase().includes(slashFilter)
    );

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder }),
            Underline,
            Highlight.configure({ multicolor: false }),
            TaskList,
            TaskItem.configure({ nested: true }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: 'editor-link' } }),
        ],
        content,
        editable,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML());
            handleSlashDetection(editor);
        },
        onBlur: ({ event }) => {
            // Close internal menus when clicking outside the editor ecosystem
            // Note: onMouseDown.preventDefault() on menus prevents this from firing when interacting with them
            setShowToolbar(false);
            setShowSlash(false);
        },
        onSelectionUpdate: ({ editor }) => {
            const { from, to } = editor.state.selection;
            if (from !== to && editable) {
                // Determine if we should show toolbar
                // If slash menu is active, don't show toolbar to avoid clutter
                if (!showSlash) {
                    const domRect = editor.view.coordsAtPos(from);
                    const containerRect = containerRef.current?.getBoundingClientRect();
                    if (containerRect) {
                        setToolbarPos({
                            top: domRect.top - containerRect.top - 52,
                            left: Math.max(0, domRect.left - containerRect.left - 40),
                        });
                        setShowToolbar(true);
                    }
                }
            } else {
                setShowToolbar(false);
                setShowLinkInput(false);
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
        const textBefore = ed.state.doc.textBetween(Math.max(0, from - 20), from, '\n');

        // Fix: Only trigger if slash is at start of line or preceded by space
        // Capture group 1 is the query text
        const slashMatch = textBefore.match(/(?:^|\s)\/([a-zA-Z0-9]*)$/);

        if (slashMatch) {
            // Adjust start position based on match (match[0] might include the space)
            const matchLength = slashMatch[0].length;
            const query = slashMatch[1];

            // If match started with space, offset by 1
            const isSpacePrefix = slashMatch[0].startsWith(' ');
            const realLength = isSpacePrefix ? matchLength - 1 : matchLength;

            if (slashStartPos.current === null) slashStartPos.current = from - realLength;

            setSlashFilter(query.toLowerCase());
            setSlashIndex(0);

            const coords = ed.view.coordsAtPos(from);
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (containerRect) {
                setSlashPos({
                    top: coords.bottom - containerRect.top + 8,
                    left: coords.left - containerRect.left,
                });
                setShowSlash(true);
                // Mutual exclusion: Hide toolbar when typing slash command
                setShowToolbar(false);
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
        const item = filteredItems[index];
        if (!item) return;

        if (slashStartPos.current !== null) {
            const { from } = editor.state.selection;
            editor.chain().focus().deleteRange({ from: slashStartPos.current, to: from }).run();
        }
        item.command(editor);
        closeSlash();
    }, [editor, filteredItems, closeSlash]);

    const addLink = useCallback(() => {
        if (!editor || !linkUrl) return;
        const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
        editor.chain().focus().setLink({ href: url }).run();
        setLinkUrl('');
        setShowLinkInput(false);
    }, [editor, linkUrl]);

    useEffect(() => {
        if (editor) editor.setEditable(editable);
    }, [editable, editor]);

    if (!editor) return null;

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {/* Floating Toolbar */}
            {showToolbar && editable && (
                <div
                    className="editor-floating-menu"
                    data-variant="panel"
                    style={{ top: toolbarPos.top, left: toolbarPos.left }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <div className="liquid-glass-v5 rounded-xl p-1.5 flex items-center gap-0.5">
                        <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} label="B" className="font-bold" title="Bold (Ctrl+B)" />
                        <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} label="I" className="italic" title="Italic (Ctrl+I)" />
                        <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} label="U" className="underline" title="Underline (Ctrl+U)" />
                        <ToolbarButton active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} label="S" className="line-through" title="Strikethrough" />
                        <ToolbarButton active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} label="<>" title="Inline Code" />
                        <ToolbarButton active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleHighlight().run()} label="🖍" title="Highlight" />

                        <Divider />

                        <ToolbarButton active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} label="H1" title="Heading 1" />
                        <ToolbarButton active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} label="H2" title="Heading 2" />
                        <ToolbarButton active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} label="H3" title="Heading 3" />

                        <Divider />

                        <ToolbarButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} label="≡" title="Align Left" />
                        <ToolbarButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} label="≡" className="text-center" title="Align Center" />
                        <ToolbarButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} label="≡" className="text-right" title="Align Right" />

                        <Divider />

                        <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} label="•" title="Bullet List" />
                        <ToolbarButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} label="1." title="Numbered List" />
                        <ToolbarButton active={editor.isActive('taskList')} onClick={() => editor.chain().focus().toggleTaskList().run()} label="☑" title="Task List" />
                        <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} label="❝" title="Blockquote" />

                        <Divider />

                        <ToolbarButton
                            active={editor.isActive('link')}
                            onClick={() => {
                                if (editor.isActive('link')) {
                                    editor.chain().focus().unsetLink().run();
                                } else {
                                    setShowLinkInput(!showLinkInput);
                                }
                            }}
                            label="🔗"
                            title="Link"
                        />
                    </div>

                    {showLinkInput && (
                        <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-zinc-200 dark:border-white/10">
                            <input
                                type="text"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') addLink(); }}
                                placeholder="https://..."
                                className="flex-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg px-2 py-1 text-xs text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-indigo-500/50"
                                autoFocus
                            />
                            <button onClick={addLink} className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400 dark:hover:bg-indigo-500/30 text-xs transition-colors">
                                Add
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Slash Command Menu */}
            {showSlash && editable && filteredItems.length > 0 && (
                <div
                    className="editor-slash-menu"
                    data-variant="panel"
                    style={{ top: slashPos.top, left: slashPos.left }}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <div className="liquid-glass-v5 rounded-xl p-1.5 custom-scrollbar max-h-72 overflow-y-auto">
                        <p className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2.5 py-1.5">Blocks</p>
                        {filteredItems.map((item, i) => (
                            <button
                                key={item.title}
                                className={`slash-menu-item ${i === slashIndex ? 'active' : ''}`}
                                onClick={() => selectSlashItem(i)}
                            >
                                <span className="slash-menu-icon">{item.icon}</span>
                                <span className="text-left">
                                    <span className="block font-medium text-[13px]">{item.title}</span>
                                    <span className="block text-[11px] text-zinc-600 dark:text-zinc-400">{item.description}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <EditorContent editor={editor} className="h-full" />


        </div>
    );
}

function ToolbarButton({ active, onClick, label, className = '', title }: {
    active: boolean;
    onClick: () => void;
    label: string;
    className?: string;
    title?: string;
}) {
    return (
        <button
            onClick={onClick}
            title={title}
            className={`toolbar-btn ${active ? 'active' : ''} ${className}`}
        >
            {label}
        </button>
    );
}

function Divider() {
    return <div className="w-px h-5 bg-zinc-200 dark:bg-white/10 mx-0.5" />;
}
