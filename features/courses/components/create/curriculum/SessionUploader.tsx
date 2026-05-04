"use client";

import * as React from "react";
import {
  IconCloudUpload,
  IconFileTypePdf,
  IconFileTypeDocx,
  IconFile,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";

interface SessionUploaderProps {
  file?: File | string | null;
  onContentChange: (file: File | null) => void;
}

export function SessionUploader({ file: contentFile, onContentChange }: SessionUploaderProps) {
  const [showPreview, setShowPreview] = React.useState(false);
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null);
  const docxRef = React.useRef<HTMLDivElement>(null);

  const hasFile = !!contentFile;
  const file = contentFile;
  
  const ext = file?.name?.split(".").pop()?.toLowerCase();
  const isPdf = ext === "pdf";
  const isDocx = ext === "docx" || ext === "doc";

  // Tạo Preview URL khi file thay đổi
  React.useEffect(() => {
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setObjectUrl(null);
    }
  }, [file]);

  // Render Preview cho DOCX
  React.useEffect(() => {
    if (!showPreview || !file || !isDocx || !docxRef.current || !(file instanceof File)) return;
    import("docx-preview").then(({ renderAsync }) => {
      renderAsync(file, docxRef.current!, undefined, { 
        className: "docx-preview-container", 
        inWrapper: false 
      });
    });
  }, [showPreview, file, isDocx]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxFiles: 1,
    onDropAccepted: ([dropped]) => {
      setShowPreview(false);
      onContentChange(dropped);
    },
  });

  if (hasFile && file) {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="flex items-center gap-4 py-3 border-b border-zinc-100 group/file">
          <div
            className={cn(
              "size-10 rounded-lg flex items-center justify-center transition-colors",
              isPdf
                ? "bg-red-50 text-red-500"
                : isDocx
                  ? "bg-blue-50 text-blue-500"
                  : "bg-zinc-50 text-zinc-600",
            )}
          >
            {isPdf ? (
              <IconFileTypePdf size={24} stroke={2} />
            ) : isDocx ? (
              <IconFileTypeDocx size={24} stroke={2} />
            ) : (
              <IconFile size={24} stroke={2} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-900 truncate">
              {file.name}
            </p>
            <p className="text-[11px] font-medium text-zinc-400 mt-0.5">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <div className="flex items-center gap-2">
            {objectUrl && (
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-3 gap-2 text-xs font-semibold rounded-lg transition-all",
                  showPreview 
                    ? "bg-primary/10 text-primary hover:bg-primary/20" 
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                )}
              >
                <IconEye size={14} stroke={2.5} />
                {showPreview ? "Đóng" : "Xem thử"}
              </Button>
            )}
            <Button
              onClick={() => onContentChange(null)}
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover/file:opacity-100"
            >
              <IconTrash size={16} stroke={2} />
            </Button>
          </div>
        </div>

        {showPreview && objectUrl && (
          <div className="rounded-lg border border-zinc-200 overflow-hidden bg-zinc-900 p-2 animate-in slide-in-from-top-4 duration-500">
            {isPdf && (
              <iframe
                src={objectUrl}
                className="w-full h-[600px] border-none rounded-lg bg-white"
              />
            )}
            {isDocx && (
              <div
                ref={docxRef}
                className="w-full min-h-[600px] bg-white p-12 overflow-auto rounded-lg"
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group cursor-pointer rounded-lg border-2 border-dashed transition-all",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-zinc-200 bg-zinc-50/30 hover:border-primary",
      )}
    >
      <input {...getInputProps()} />
      <Empty className="py-12 border-none">
        <EmptyMedia
          variant="icon"
          className="size-12 rounded-lg border border-zinc-100 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white duration-300"
        >
          <IconCloudUpload size={24} />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle className="text-sm font-bold text-zinc-900">
            Kéo thả tài liệu giáo án
          </EmptyTitle>
          <EmptyDescription className="text-[10px] font-bold uppercase tracking-widest">
            HỖ TRỢ PDF / DOCX • TỐI ĐA 50MB
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
