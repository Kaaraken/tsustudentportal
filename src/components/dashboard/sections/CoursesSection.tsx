import SectionWrapper from "../SectionWrapper";
import { Skeleton } from "@/components/ui/skeleton";

const CourseNotice = () => (
  <div className="rounded-xl border border-yellow-300/60 bg-yellow-100/60 p-6">
    <div className="text-4xl mb-3">📚</div>
    <h2 className="text-2xl font-bold text-foreground mb-2">საგნების რეგისტრაცია დახურულია</h2>
    <p className="text-muted-foreground">
      Course registration opens at the beginning of each semester. Your registered courses will appear here.
    </p>
  </div>
);

const CoursesSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-72" />
    <Skeleton className="h-28 w-full" />
    <Skeleton className="h-28 w-full" />
  </div>
);

const CoursesSection = () => (
  <SectionWrapper sectionKey="courses" emptyForm={<CourseNotice />} fallbackContent={<CourseNotice />} loadingContent={<CoursesSkeleton />}>
    {() => <CourseNotice />}
  </SectionWrapper>
);

export default CoursesSection;
