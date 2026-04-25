"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Link as LinkIcon,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function RichEditor({ 
  value, 
  onChange, 
  placeholder = "Nhập nội dung mô tả...", 
  className,
  disabled 
}: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert max-w-none min-h-[150px] focus:outline-none p-4",
          disabled && "opacity-50 pointer-events-none"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const toggleLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className={cn("rounded-lg border border-input bg-background flex flex-col", className)}>
      <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-zinc-50/50 dark:bg-zinc-900/50">
        <EditorButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          disabled={disabled}
        >
          <Bold className="h-4 w-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          disabled={disabled}
        >
          <Italic className="h-4 w-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          disabled={disabled}
        >
          <UnderlineIcon className="h-4 w-4" />
        </EditorButton>
        
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <EditorButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          disabled={disabled}
        >
          <Heading1 className="h-4 w-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          disabled={disabled}
        >
          <Heading2 className="h-4 w-4" />
        </EditorButton>

        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <EditorButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          disabled={disabled}
        >
          <List className="h-4 w-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          disabled={disabled}
        >
          <ListOrdered className="h-4 w-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          disabled={disabled}
        >
          <Quote className="h-4 w-4" />
        </EditorButton>

        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <EditorButton
          onClick={toggleLink}
          active={editor.isActive("link")}
          disabled={disabled}
        >
          <LinkIcon className="h-4 w-4" />
        </EditorButton>

        <div className="flex-1" />

        <EditorButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo() || disabled}
        >
          <Undo className="h-4 w-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo() || disabled}
        >
          <Redo className="h-4 w-4" />
        </EditorButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function EditorButton({ 
  onClick, 
  active, 
  disabled, 
  children 
}: { 
  onClick: () => void; 
  active?: boolean; 
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-md transition-colors",
        active && "bg-zinc-200 dark:bg-zinc-800 text-primary"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
