import { Progress } from "@/components/ui/progress";
import SectionWrapper from "../SectionWrapper";
import ProgramForm from "../forms/ProgramForm";

const fallbackSemesters = [
  { sem: "Fall 2024", courses: ["Calculus I", "Intro to CS", "Physics I", "Academic Writing"], credits: 16 },
  { sem: "Spring 2025", courses: ["Calculus II", "OOP Programming", "Physics II", "Philosophy"], credits: 16 },
  { sem: "Fall 2025", courses: ["Discrete Math", "Algorithms", "Electronics", "Statistics"], credits: 16 },
  { sem: "Spring 2026", courses: ["Linear Algebra", "Data Structures", "Quantum Mech.", "English Lit."], credits: 16, current: true },
];

const ProgramContent = () => {
  const totalRequired = 128;
  const completed = 60;
  const gpa = 3.72;

  return (
    <>
      <h2 className="text-2xl font-bold text-foreground mb-1">Degree Program</h2>
      <p className="text-muted-foreground text-sm mb-6">B.Sc. Computer Science & Mathematics</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-4xl font-bold text-accent">{gpa}</p>
          <p className="text-sm text-muted-foreground mt-1">Cumulative GPA</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Credits</span>
            <span className="font-semibold text-foreground">{completed}/{totalRequired}</span>
          </div>
          <Progress value={(completed / totalRequired) * 100} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">{Math.round((completed / totalRequired) * 100)}% complete</p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <p className="text-4xl font-bold text-foreground">4<span className="text-lg text-muted-foreground">/8</span></p>
          <p className="text-sm text-muted-foreground mt-1">Semesters Completed</p>
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-4">Course Plan</h3>
      <div className="space-y-4">
        {fallbackSemesters.map((s: any) => (
          <div key={s.sem} className={`glass-card rounded-xl p-5 ${s.current ? "ring-2 ring-accent" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">{s.sem}</h4>
                {s.current && <span className="text-[10px] font-bold bg-accent/15 text-accent px-2 py-0.5 rounded-full uppercase">Current</span>}
              </div>
              <span className="text-sm text-muted-foreground">{s.credits} credits</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {s.courses.map((c: string) => (
                <span key={c} className="text-xs bg-muted px-3 py-1.5 rounded-full text-foreground">{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ProgramSection = () => (
  <SectionWrapper
    sectionKey="program"
    emptyForm={<ProgramForm />}
    fallbackContent={<ProgramContent />}
  >
    {() => <ProgramContent />}
  </SectionWrapper>
);

export default ProgramSection;
