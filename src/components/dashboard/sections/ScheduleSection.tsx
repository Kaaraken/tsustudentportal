import { useState } from "react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "../SectionWrapper";
import ScheduleForm from "../forms/ScheduleForm";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 10 }, (_, i) => i + 8);

const fallbackClasses = [
  { day: 0, start: 9, duration: 2, name: "Linear Algebra", room: "Hall A-204", color: "bg-primary/15 text-primary border-l-4 border-primary" },
  { day: 0, start: 14, duration: 1.5, name: "English Lit.", room: "Room B-101", color: "bg-accent/15 text-accent-foreground border-l-4 border-accent" },
  { day: 1, start: 10, duration: 2, name: "Data Structures", room: "Lab C-302", color: "bg-info/15 text-foreground border-l-4 border-info" },
  { day: 1, start: 15, duration: 1, name: "Statistics", room: "Hall A-105", color: "bg-success/15 text-foreground border-l-4 border-success" },
  { day: 2, start: 9, duration: 2, name: "Quantum Mech.", room: "Lab D-201", color: "bg-warning/15 text-foreground border-l-4 border-warning" },
  { day: 2, start: 13, duration: 2, name: "Machine Learning", room: "Lab C-302", color: "bg-info/15 text-foreground border-l-4 border-info" },
  { day: 3, start: 10, duration: 1.5, name: "Linear Algebra", room: "Hall A-204", color: "bg-primary/15 text-primary border-l-4 border-primary" },
  { day: 3, start: 14, duration: 1.5, name: "English Lit.", room: "Room B-101", color: "bg-accent/15 text-accent-foreground border-l-4 border-accent" },
  { day: 4, start: 9, duration: 2, name: "Data Structures", room: "Lab C-302", color: "bg-info/15 text-foreground border-l-4 border-info" },
  { day: 4, start: 13, duration: 1, name: "Statistics", room: "Hall A-105", color: "bg-success/15 text-foreground border-l-4 border-success" },
];

const WeekView = ({ classes }: { classes: typeof fallbackClasses }) => {
  const [view, setView] = useState<"week" | "month">("week");

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Schedule</h2>
          <p className="text-muted-foreground text-sm">Week of March 23 – 29, 2026</p>
        </div>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <Button size="sm" variant={view === "week" ? "default" : "ghost"} onClick={() => setView("week")} className="text-xs">Week</Button>
          <Button size="sm" variant={view === "month" ? "default" : "ghost"} onClick={() => setView("month")} className="text-xs">Month</Button>
        </div>
      </div>

      {view === "week" ? (
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
                <div className="p-3" />
                {days.map((d) => (
                  <div key={d} className="p-3 text-center text-sm font-semibold text-foreground border-l border-border">{d}</div>
                ))}
              </div>
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border last:border-0">
                  <div className="p-2 text-xs text-muted-foreground text-right pr-3">{hour}:00</div>
                  {days.map((_, dayIndex) => {
                    const cls = classes.find((c) => c.day === dayIndex && c.start === hour);
                    return (
                      <div key={dayIndex} className="border-l border-border min-h-[52px] p-0.5 relative">
                        {cls && (
                          <div className={`${cls.color} rounded-md p-2 text-xs absolute inset-x-0.5`} style={{ height: `${cls.duration * 52}px` }}>
                            <p className="font-semibold truncate">{cls.name}</p>
                            <p className="opacity-70 truncate">{cls.room}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">
          <p>Month view coming soon</p>
        </div>
      )}
    </>
  );
};

const ScheduleSection = () => (
  <SectionWrapper
    sectionKey="schedule"
    emptyForm={<ScheduleForm />}
    fallbackContent={<WeekView classes={fallbackClasses} />}
  >
    {(data) => <WeekView classes={Array.isArray(data) ? data : fallbackClasses} />}
  </SectionWrapper>
);

export default ScheduleSection;
