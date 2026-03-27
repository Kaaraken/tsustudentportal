import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const courses = [
  { code: "MATH301", name: "Linear Algebra", instructor: "Dr. Sarah Chen", progress: 72, grade: "A-" },
  { code: "CS204", name: "Data Structures", instructor: "Prof. James Miller", progress: 85, grade: "A" },
  { code: "PHY201", name: "Quantum Mechanics", instructor: "Dr. Elena Rossi", progress: 60, grade: "B+" },
  { code: "ENG102", name: "English Literature", instructor: "Prof. David Park", progress: 90, grade: "A" },
  { code: "STAT202", name: "Probability & Statistics", instructor: "Dr. Lisa Wang", progress: 45, grade: "B" },
  { code: "CS310", name: "Machine Learning", instructor: "Prof. Alex Kumar", progress: 30, grade: "B+" },
];

const CoursesSection = () => {
  const [search, setSearch] = useState("");
  const filtered = courses.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
          <p className="text-muted-foreground text-sm">Spring 2026 Semester</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((course) => (
          <div key={course.code} className="glass-card rounded-xl p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold bg-accent/15 text-accent px-2.5 py-1 rounded-full">{course.grade}</span>
            </div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">{course.code}</p>
            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{course.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSection;
