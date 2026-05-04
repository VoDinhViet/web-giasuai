"use client";

import { 
  IconCloudUpload, 
  IconFileZip,
  IconInfoCircle
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExercisesStepProps {
  exerciseFileName: string | null;
  onExerciseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
}

export function ExercisesStep({ exerciseFileName, onExerciseChange, isPending }: ExercisesStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bài tập & Tài liệu</CardTitle>
        <CardDescription>Tải lên các tài liệu bổ trợ cho khóa học</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className={cn(
            "relative flex min-h-[200px] flex-col items-center justify-center rounded-md border-2 border-dashed",
            exerciseFileName && "border-orange-500 bg-orange-50/10"
          )}
        >
          <input
            type="file"
            className="absolute inset-0 z-10 cursor-pointer opacity-0"
            accept=".zip, .pdf, .docx"
            onChange={onExerciseChange}
            disabled={isPending}
          />
          <div className="flex flex-col items-center gap-2 text-center p-4">
            {exerciseFileName ? (
              <>
                <IconFileZip className="text-orange-500" />
                <p className="text-sm font-medium">{exerciseFileName}</p>
                <Button variant="outline" size="sm">Thay đổi tệp</Button>
              </>
            ) : (
              <>
                <IconCloudUpload />
                <p className="text-sm">Tải lên bộ bài tập (Zip/PDF/Docs)</p>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-3 p-4 rounded-md border bg-zinc-50/50">
          <IconInfoCircle className="size-5 text-zinc-500" />
          <p className="text-xs text-zinc-600 leading-relaxed">
            Bạn nên nén tất cả tài liệu bài tập vào một file .zip và đặt tên theo đúng mã bài học trong file Excel để hệ thống tự động khớp.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
