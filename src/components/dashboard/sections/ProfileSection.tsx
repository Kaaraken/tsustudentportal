import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

const ProfileSection = () => {
  const { studentName, studentId } = useAuth();
  const { sections } = useData();

  const initials = studentName
    ? studentName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "ST";

  const programData = sections.program?.data;
  const coursesData = sections.courses?.data;
  const paymentsData = sections.payments?.data;
  const documentsData = sections.documents?.data;

  const gpa = programData?.gpa ?? 3.72;
  const creditsCompleted = programData?.creditsCompleted ?? 120;
  const creditsTotal = programData?.creditsTotal ?? 240;
  const gpaColor = gpa >= 3.5 ? "text-success" : gpa >= 2.5 ? "text-warning" : "text-destructive";

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
      {/* Personal Info */}
      <div className="glass-card rounded-xl p-6 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-24 h-24 rounded-full bg-primary text-accent flex items-center justify-center text-3xl font-bold shrink-0">
          {initials}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-foreground">{studentName || "Student"}</h2>
          <p className="text-muted-foreground">{studentId}</p>
          <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
            <Badge variant="secondary">Faculty of Exact & Natural Sciences</Badge>
            <Badge variant="secondary">B.Sc. Computer Science</Badge>
            <Badge variant="secondary">Year 2</Badge>
          </div>
        </div>
      </div>

      {/* Academic Overview */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Academic Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className={`text-4xl font-bold ${gpaColor}`}>{gpa}</p>
            <p className="text-sm text-muted-foreground mt-1">Current GPA</p>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Credits</span>
              <span className="font-semibold text-foreground">{creditsCompleted}/{creditsTotal}</span>
            </div>
            <Progress value={(creditsCompleted / creditsTotal) * 100} className="h-3" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round((creditsCompleted / creditsTotal) * 100)}% complete</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">Spring 2026 — Semester 4</p>
            <p className="text-sm text-muted-foreground">Current Semester</p>
          </div>
        </div>
      </div>

      {/* This Semester Courses */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">This Semester at a Glance</h3>
        {coursesData ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-muted-foreground font-medium">Course</th>
                  <th className="text-right p-2 text-muted-foreground font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(coursesData) ? coursesData : []).slice(0, 6).map((c: any, i: number) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-2 text-foreground">{c.name}</td>
                    <td className="p-2 text-right">
                      <Badge className="bg-accent/15 text-accent border-0">{c.grade}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Skeleton className="h-24 w-full" />
        )}
      </div>

      {/* Recent Payments */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Recent Payments</h3>
        {paymentsData?.history ? (
          <div className="space-y-3">
            {paymentsData.history.slice(0, 3).map((h: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <div>
                  <p className="text-foreground">{h.desc}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                <span className="font-medium text-foreground">{h.amount}</span>
              </div>
            ))}
          </div>
        ) : (
          <Skeleton className="h-16 w-full" />
        )}
      </div>

      {/* Documents */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Available Documents</h3>
        {documentsData && Array.isArray(documentsData) ? (
          <div className="flex flex-wrap gap-2">
            {documentsData.map((d: any, i: number) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-foreground bg-muted px-3 py-1.5 rounded-full">
                <FileText className="w-3.5 h-3.5" />
                {d.name}
              </div>
            ))}
          </div>
        ) : (
          <Skeleton className="h-10 w-full" />
        )}
      </div>

      {/* Activity */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-3">Activity</h3>
        <p className="text-sm text-muted-foreground">Member since: September 2024</p>
        <p className="text-sm text-muted-foreground">Last login: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProfileSection;
