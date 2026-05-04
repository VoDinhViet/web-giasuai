"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Youtube } from "@tiptap/extension-youtube";
import { Image } from "@tiptap/extension-image";
import { Extension, type RawCommands } from "@tiptap/core";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";
import { CharacterCount } from "@tiptap/extension-character-count";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Link as LinkIcon,
  Undo,
  Redo,
  Code,
  Minus,
  Type,
  AlignLeft,
  AlignCenter,
  Highlighter,
  Palette,
  Video,
  Image as ImageIcon,
  ChevronDown,
  CheckSquare,
  Hash,
  Settings2,
  Eye,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator as UISeparator } from "@/components/ui/separator";

// Custom Font Size Extension
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    } as RawCommands;
  },
});

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  onTitleChange?: (title: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const FONT_SIZES = [
  { label: "12px", value: "12px" },
  { label: "14px", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "24px", value: "24px" },
  { label: "32px", value: "32px" },
  { label: "48px", value: "48px" },
];

const COLORS = [
  { name: "Mặc định", color: "inherit" },
  { name: "Xám", color: "#64748b" },
  { name: "Đỏ", color: "#ef4444" },
  { name: "Cam", color: "#f97316" },
  { name: "Xanh lá", color: "#22c55e" },
  { name: "Xanh dương", color: "#3b82f6" },
  { name: "Tím", color: "#a855f7" },
];

const EXTENSIONS = (placeholder: string) => [
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
    horizontalRule: false,
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-indigo-600 font-bold underline cursor-pointer hover:text-indigo-800 transition-colors",
    },
  }),
  Placeholder.configure({ placeholder }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextStyle,
  FontSize,
  Color,
  Highlight.configure({ multicolor: true }),
  TaskList,
  TaskItem.configure({ nested: true }),
  HorizontalRule.configure({
    HTMLAttributes: { class: "border-t-2 border-zinc-100 my-12" },
  }),
  CharacterCount,
  Youtube.configure({
    width: 840,
    height: 480,
    HTMLAttributes: {
      class: "rounded-[2rem] shadow-2xl border-4 border-white my-12 mx-auto block max-w-full overflow-hidden",
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: "rounded-[2rem] shadow-xl border border-zinc-100 my-12 mx-auto block max-w-full transition-transform hover:scale-[1.02]",
    },
  }),
];

export function RichEditor({
  value,
  onChange,
  title,
  onTitleChange,
  placeholder = "Nhập nội dung bài giảng của bạn tại đây...",
  className,
  disabled,
}: RichEditorProps) {
  const [isPreview, setIsPreview] = React.useState(false);

  const editor = useEditor({
    extensions: EXTENSIONS(placeholder),
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "tiptap-editor px-20 py-16 cursor-text",
          disabled && "opacity-50 pointer-events-none",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "bg-white flex flex-col h-full animate-in fade-in duration-700",
          isPreview && "fixed inset-0 z-[100] bg-zinc-50",
        )}
      >
        {/* Simple & Beautiful Top Header */}
        <div className="h-14 border-b border-zinc-100 bg-white flex items-center justify-between px-6 sticky top-0 z-[60]">
          <div className="flex items-center gap-2">
            <EditorToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              tooltip="Hoàn tác"
            >
              <Undo className="h-4 w-4" />
            </EditorToolbarButton>
            <EditorToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              tooltip="Làm lại"
            >
              <Redo className="h-4 w-4" />
            </EditorToolbarButton>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-xl text-[10px] font-black uppercase tracking-widest",
                isPreview ? "text-indigo-600 bg-indigo-50" : "text-zinc-500",
              )}
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye className="size-3.5 mr-2" />
              {isPreview ? "Thoát xem thử" : "Xem thử"}
            </Button>
            <UISeparator orientation="vertical" className="h-4 mx-2" />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl text-zinc-400 hover:text-zinc-900 transition-all"
            >
              <Settings2 size={18} />
            </Button>
          </div>
        </div>

        {/* Floating Formatting Menu (WordPress Style) */}
        {editor && (
          <BubbleMenu editor={editor}>
            <div className="flex items-center gap-0.5 bg-zinc-900 text-white p-1 rounded-xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-200">
              <BubbleButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
              >
                <Bold size={14} />
              </BubbleButton>
              <BubbleButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
              >
                <Italic size={14} />
              </BubbleButton>
              <BubbleButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                active={editor.isActive("underline")}
              >
                <UnderlineIcon size={14} />
              </BubbleButton>
              <div className="w-px h-4 bg-white/20 mx-1" />
              <BubbleButton
                onClick={() => {
                  const url = window.prompt("Nhập URL:");
                  if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
                active={editor.isActive("link")}
              >
                <LinkIcon size={14} />
              </BubbleButton>
            </div>
          </BubbleMenu>
        )}

        <div className="flex-1 flex overflow-hidden">
          <div
            className={cn(
              "flex-1 flex flex-col min-h-0 relative",
              isPreview
                ? "max-w-4xl mx-auto py-10"
                : "bg-white overflow-hidden",
            )}
          >
            {/* Contextual Toolbar (Sticky below Header) */}
            {!isPreview && (
              <div className="flex-shrink-0 flex flex-wrap items-center gap-1.5 p-2 border-b border-zinc-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 px-6 shadow-sm">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 px-2 gap-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-all bg-zinc-50 hover:bg-zinc-100 border border-zinc-100"
                    >
                      <Hash className="size-3" /> Văn bản{" "}
                      <ChevronDown className="size-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44 rounded-2xl border-zinc-200 shadow-2xl p-1.5">
                    <DropdownMenuItem
                      className="text-[10px] font-black uppercase tracking-widest rounded-xl"
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                      }
                    >
                      H1 - Tiêu đề chính
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-[10px] font-black uppercase tracking-widest rounded-xl"
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                      }
                    >
                      H2 - Tiêu đề phụ
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-[10px] font-black uppercase tracking-widest rounded-xl"
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                      }
                    >
                      H3 - Mục nhỏ
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-[10px] font-black uppercase tracking-widest rounded-xl"
                      onClick={() =>
                        editor.chain().focus().setParagraph().run()
                      }
                    >
                      P - Văn bản thường
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Separator />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 px-2 gap-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-all bg-zinc-50 hover:bg-zinc-100 border border-zinc-100"
                    >
                      <Type className="size-3" /> Size <ChevronDown className="size-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44 rounded-2xl border-zinc-200 shadow-2xl p-1.5 grid grid-cols-2 gap-1">
                    {FONT_SIZES.map((size) => (
                      <DropdownMenuItem
                        key={size.value}
                        className="text-[10px] font-black uppercase tracking-widest cursor-pointer rounded-xl justify-center h-10"
                        onClick={() =>
                          editor.chain().focus().setFontSize(size.value).run()
                        }
                      >
                        {size.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Separator />

                <ToolbarGroup>
                  <EditorToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive("bold")}
                    tooltip="In đậm"
                  >
                    <Bold className="h-4 w-4" />
                  </EditorToolbarButton>
                  <EditorToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive("italic")}
                    tooltip="In nghiêng"
                  >
                    <Italic className="h-4 w-4" />
                  </EditorToolbarButton>
                  <EditorToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleUnderline().run()
                    }
                    active={editor.isActive("underline")}
                    tooltip="Gạch chân"
                  >
                    <UnderlineIcon className="h-4 w-4" />
                  </EditorToolbarButton>
                </ToolbarGroup>

                <Separator />

                <ToolbarGroup>
                  <EditorToolbarButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                    active={editor.isActive({ textAlign: "left" })}
                    tooltip="Căn trái"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </EditorToolbarButton>
                  <EditorToolbarButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                    active={editor.isActive({ textAlign: "center" })}
                    tooltip="Căn giữa"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </EditorToolbarButton>
                </ToolbarGroup>

                <Separator />

                <ToolbarGroup>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-zinc-400 bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 hover:text-zinc-900"
                      >
                        <Palette className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-44 p-2 grid grid-cols-4 gap-1.5 border-none shadow-2xl bg-zinc-900 rounded-2xl"
                      side="bottom"
                    >
                      {COLORS.map((c) => (
                        <button
                          key={c.color}
                          className="size-8 rounded-lg border border-white/10 transition-transform hover:scale-110 shadow-sm"
                          style={{ backgroundColor: c.color }}
                          title={c.name}
                          onClick={() =>
                            editor.chain().focus().setColor(c.color).run()
                          }
                        />
                      ))}
                    </PopoverContent>
                  </Popover>
                  <EditorToolbarButton
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: "#fef08a" })
                        .run()
                    }
                    active={editor.isActive("highlight")}
                    tooltip="Highlight"
                  >
                    <Highlighter className="h-4 w-4" />
                  </EditorToolbarButton>
                </ToolbarGroup>

                <Separator />

                <ToolbarGroup>
                  <EditorToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    active={editor.isActive("bulletList")}
                    tooltip="Danh sách"
                  >
                    <List className="h-4 w-4" />
                  </EditorToolbarButton>
                  <EditorToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleTaskList().run()
                    }
                    active={editor.isActive("taskList")}
                    tooltip="Công việc"
                  >
                    <CheckSquare className="h-4 w-4" />
                  </EditorToolbarButton>
                </ToolbarGroup>

                <Separator />

                <ToolbarGroup>
                  <EditorToolbarButton
                    onClick={() => {
                      const url = window.prompt("URL YouTube:");
                      if (url) editor.commands.setYoutubeVideo({ src: url });
                    }}
                    tooltip="YouTube"
                  >
                    <Video className="h-4 w-4" />
                  </EditorToolbarButton>
                  <EditorToolbarButton
                    onClick={() => {
                      const url = window.prompt("URL Ảnh:");
                      if (url)
                        editor.chain().focus().setImage({ src: url }).run();
                    }}
                    tooltip="Ảnh"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </EditorToolbarButton>
                  <EditorToolbarButton
                    onClick={() =>
                      editor.chain().focus().setHorizontalRule().run()
                    }
                    tooltip="Đường kẻ"
                  >
                    <Minus className="h-4 w-4" />
                  </EditorToolbarButton>
                  <EditorToolbarButton
                    onClick={() =>
                      editor.chain().focus().toggleCodeBlock().run()
                    }
                    active={editor.isActive("codeBlock")}
                    tooltip="Code"
                  >
                    <Code className="h-4 w-4" />
                  </EditorToolbarButton>
                </ToolbarGroup>
              </div>
            )}

            <div className="flex-1 min-h-0 bg-white overflow-y-auto custom-scrollbar scroll-smooth">
              <div className="max-w-5xl mx-auto min-h-full pt-10 pb-20 px-12">
                {onTitleChange && (
                  <div className="mb-4 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-1">Tiêu đề phiên học</label>
                    <textarea
                      rows={1}
                      className="w-full text-5xl font-black tracking-tight border-none bg-transparent p-0 focus:outline-none placeholder:text-zinc-100 text-zinc-900 resize-none overflow-hidden min-h-[1em]"
                      placeholder="Nhập tiêu đề..."
                      value={title || ""}
                      onChange={(e) => {
                        onTitleChange(e.target.value);
                        // Auto-resize
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                      onFocus={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          editor?.commands.focus();
                        }
                      }}
                    />
                  </div>
                )}
                <EditorContent editor={editor} className="flex-1" />
              </div>
            </div>

            {/* Footer Status Bar */}
            <div className="h-10 px-8 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              <div className="flex gap-8">
                <span className="flex items-center gap-1.5 underline decoration-zinc-200 underline-offset-4">
                  {editor.storage.characterCount.characters()} ký tự
                </span>
                <span className="flex items-center gap-1.5 underline decoration-zinc-200 underline-offset-4">
                  {editor.storage.characterCount.words()} từ
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-500 flex items-center gap-1.5">
                  <IconCheck size={12} stroke={4} /> Đã lưu
                </span>
                <UISeparator orientation="vertical" className="h-3" />
                <span className="flex items-center gap-1.5">
                  <Maximize2 size={12} /> Focus Mode
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function ToolbarGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1 px-1">{children}</div>;
}

function Separator() {
  return <div className="w-px h-5 bg-zinc-100 mx-1.5" />;
}

function EditorToolbarButton({
  onClick,
  active,
  disabled,
  tooltip,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-lg transition-all duration-300",
            active
              ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20"
              : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900",
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="bg-zinc-900 text-white border-none text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

function BubbleButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-1.5 rounded-lg transition-all",
        active ? "bg-white text-zinc-900 shadow-sm" : "hover:bg-white/10",
      )}
    >
      {children}
    </button>
  );
}

import { IconCheck } from "@tabler/icons-react";
