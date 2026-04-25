import { ClassDetailClientPage } from "@/features/classes/components/details/ClassDetailClientPage";
import { getClassDetail } from "@/features/classes/actions/get-class-detail";
import { getClassStats } from "@/features/classes/actions/get-class-stats";

interface Props {
  params: Promise<{
    classId: string;
  }>;
}

export default async function ClassDetailPage({ params }: Props) {
  const { classId } = await params;

  const [classData, stats] = await Promise.all([
    getClassDetail(classId),
    getClassStats(classId),
  ]);

  return (
    <ClassDetailClientPage
      classId={classId}
      initialData={classData}
      stats={stats}
    />
  );
}
