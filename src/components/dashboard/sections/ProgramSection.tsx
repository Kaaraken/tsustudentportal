import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import SectionWrapper from "../SectionWrapper";

type ProgramCourse = {
  index?: string;
  name?: string;
  status?: string;
  ects?: string;
  remainingCredits?: string;
};

const parseNumber = (value?: string) => Number((value || "0").replace(/[^\d.]/g, "")) || 0;

const ProgramContent = ({ raw }: { raw: any }) => {
  const program = raw?.program ?? raw ?? {};
  const courses: ProgramCourse[] = Array.isArray(program?.courses) ? program.courses : [];
  const programName = (program?.programName || "").trim() || "კომპიუტერული მეცნიერება";
  const totalEcts = courses.reduce((sum, course) => sum + parseNumber(course.ects), 0);
  const remaining = courses.reduce((sum, course) => sum + parseNumber(course.remainingCredits), 0);
  const completed = Math.max(totalEcts - remaining, 0);
  const progress = totalEcts > 0 ? (completed / totalEcts) * 100 : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">{programName}</h2>
      <p className="text-muted-foreground text-sm mb-6">სასწავლო პროგრამა</p>

      <div className="glass-card rounded-xl p-5 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">კრედიტების პროგრესი</span>
          <span className="font-semibold text-foreground">
            {completed} / {totalEcts} კრედიტი დასრულებული
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">#</th>
                <th className="text-left p-3 font-medium text-muted-foreground">საგნის დასახელება</th>
                <th className="text-left p-3 font-medium text-muted-foreground">სტატუსი</th>
                <th className="text-left p-3 font-medium text-muted-foreground">ECTS</th>
                <th className="text-left p-3 font-medium text-muted-foreground">დარჩენილი</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => {
                const isElective = course.status === "არჩევითი";
                return (
                  <tr key={`${course.index || idx}-${course.name || ""}`} className="border-b border-border last:border-0">
                    <td className="p-3 text-muted-foreground">{course.index || idx + 1}</td>
                    <td className="p-3 text-foreground">{course.name || "-"}</td>
                    <td className="p-3">
                      <Badge
                        className={
                          isElective
                            ? "bg-blue-500/15 text-blue-600 border-0"
                            : "bg-red-500/15 text-red-600 border-0"
                        }
                      >
                        {course.status || "-"}
                      </Badge>
                    </td>
                    <td className="p-3 text-foreground">{course.ects || "-"}</td>
                    <td className="p-3 text-foreground">{course.remainingCredits || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {courses.length === 0 && (
            <div className="p-6 text-sm text-muted-foreground">მონაცემები დროებით მიუწვდომელია</div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProgramSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-72" />
    <Skeleton className="h-4 w-40" />
    <div className="glass-card rounded-xl p-5 space-y-3">
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-3 w-full" />
    </div>
    <div className="glass-card rounded-xl p-4 space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full" />
      ))}
    </div>
  </div>
);

const ProgramSection = () => (
  <SectionWrapper sectionKey="program" emptyForm={<ProgramContent raw={{}} />} fallbackContent={<ProgramContent raw={{}} />} loadingContent={<ProgramSkeleton />}>
    {(data) => <ProgramContent raw={data} />}
  </SectionWrapper>
);

export default ProgramSection;
