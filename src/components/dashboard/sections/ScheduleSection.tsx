import SectionWrapper from "../SectionWrapper";
import { Skeleton } from "@/components/ui/skeleton";

const dayOrder = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი"];

type ScheduleItem = {
  subject: string;
  lecturer?: string;
  auditorium?: string;
  time: string;
};

const parseScheduleItem = (item: ScheduleItem) => {
  const parts = (item.time || "").replace("თარიღი, დრო: ", "").split(", ");
  const day = parts[0] || "";
  const time = parts[1] || "";
  const lecturer = (item.lecturer || "").replace("პედაგოგ(ებ)ი: ", "").trim();
  const room = (item.auditorium || "").replace("აუდიტორია: ", "").trim();
  return { day, time, lecturer, room, subject: item.subject };
};

const ScheduleView = ({ raw }: { raw: any }) => {
  const list: ScheduleItem[] = Array.isArray(raw?.schedule) ? raw.schedule : Array.isArray(raw) ? raw : [];
  const parsed = list.map(parseScheduleItem).filter((item) => dayOrder.includes(item.day));
  const grouped = dayOrder.map((day) => ({
    day,
    classes: parsed.filter((item) => item.day === day)
  }));

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">განრიგი</h2>
        <p className="text-muted-foreground text-sm">კვირის მიხედვით</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {grouped.map(({ day, classes }) => (
          <div key={day} className="glass-card rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-3">{day}</h3>
            {classes.length === 0 ? (
              <p className="text-sm text-muted-foreground">ლექცია არ არის</p>
            ) : (
              <div className="space-y-3">
                {classes.map((cls, idx) => (
                  <div key={`${cls.subject}-${cls.time}-${idx}`} className="rounded-lg border border-border/60 bg-muted/20 p-3">
                    <p className="font-bold text-foreground">{cls.subject}</p>
                    <p className="text-sm text-muted-foreground">{cls.lecturer || "-"}</p>
                    <p className="text-sm text-muted-foreground">{cls.room || "-"}</p>
                    <p className="text-sm font-medium text-accent mt-1">{cls.time || "-"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ScheduleSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="glass-card rounded-xl p-4 space-y-3">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ))}
    </div>
  </div>
);

const ScheduleSection = () => (
  <SectionWrapper
    sectionKey="schedule"
    emptyForm={<ScheduleView raw={{ schedule: [] }} />}
    fallbackContent={<ScheduleView raw={{ schedule: [] }} />}
    loadingContent={<ScheduleSkeleton />}
  >
    {(data) => <ScheduleView raw={data} />}
  </SectionWrapper>
);

export default ScheduleSection;
