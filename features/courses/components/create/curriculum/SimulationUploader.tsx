"use client";

import * as React from "react";
import {
  IconCloudUpload,
  IconFileTypeZip,
  IconFile,
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

interface SimulationUploaderProps {
  simulationValue?: string;
  onValueChange: (val: string) => void;
}

export function SimulationUploader({
  simulationValue,
  onValueChange,
}: SimulationUploaderProps) {
  const [file, setFile] = React.useState<File | null>(null);

  const hasFile = !!simulationValue;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/zip": [".zip"],
      "application/x-zip-compressed": [".zip"],
    },
    maxFiles: 1,
    onDropAccepted: ([dropped]) => {
      setFile(dropped);
      onValueChange(dropped.name);
    },
  });

  if (hasFile) {
    return (
      <div className="animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center gap-6 p-6 rounded-lg border border-zinc-100 bg-zinc-50/50">
          <div className="size-12 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-purple-500">
            <IconFileTypeZip size={28} stroke={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-zinc-900 truncate tracking-tight">
              {simulationValue}
            </p>
            {file && (
              <p className="text-[10px] font-bold text-purple-600 mt-1 uppercase tracking-widest bg-purple-50 inline-block px-2 py-0.5 rounded-lg">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>
          <Button
            onClick={() => onValueChange("")}
            variant="ghost"
            size="icon"
            className="size-10 rounded-full text-zinc-300 hover:text-red-500 hover:bg-red-50"
          >
            <IconTrash size={20} stroke={2} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group cursor-pointer rounded-lg border-2 border-dashed transition-all",
        isDragActive
          ? "border-purple-500 bg-purple-50/30"
          : "border-zinc-200 bg-zinc-50/30 hover:border-purple-500",
      )}
    >
      <input {...getInputProps()} />
      <Empty className="py-12 border-none">
        <EmptyMedia
          variant="icon"
          className="size-12 rounded-lg border border-zinc-100 transition-all group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white duration-300"
        >
          <IconCloudUpload size={24} />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle className="text-sm font-bold text-zinc-900">
            Kéo thả file ZIP mô phỏng
          </EmptyTitle>
          <EmptyDescription className="text-[10px] font-bold uppercase tracking-widest">
            HỖ TRỢ .ZIP • TỐI ĐA 100MB
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
