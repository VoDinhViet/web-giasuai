import { ClassesClientPage } from "@/features/classes/components/ClassesClientPage";
import { getClassStatistics } from "@/features/classes/actions/get-class-statistics";
import { getClasses } from "@/features/classes/actions/get-classes";
import { classSearchParamsCache } from "@/features/classes/params/class-params";
import { canAccess } from "@/lib/rbac";
import { getSession } from "@/lib/session";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyClassesManagePage({ searchParams }: PageProps) {
  // Parse search params using centralized nuqs cache
  const [params, session] = await Promise.all([
    searchParams.then(classSearchParamsCache.parse),
    getSession(),
  ]);
  const canViewStatistics = canAccess(
    session.role,
    session.permissions,
    "classes.statistics.read",
  );

  const [result, statistics] = await Promise.all([
    getClasses(params),
    canViewStatistics ? getClassStatistics() : Promise.resolve(null),
  ]);

  return (
    <ClassesClientPage
      initialClasses={result.data}
      pagination={result.pagination}
      statistics={statistics}
    />
  );
}
