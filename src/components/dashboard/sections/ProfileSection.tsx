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
  const scheduleData = Array.isArray(sections.schedule?.data) ? sections.schedule.data : [];

  const courses = Array.isArray(programData?.courses) ? programData.courses : [];
  const totalEcts = courses.reduce((sum: number, c: any) => sum + (Number(String(c.ects || "0").replace(/[^\d.]/g, "")) || 0), 0);
  const remainingEcts = courses.reduce(
    (sum: number, c: any) => sum + (Number(String(c.remainingCredits || "0").replace(/[^\d.]/g, "")) || 0),
    0
  );
  const creditsCompleted = Math.max(totalEcts - remainingEcts, 0);
  const creditsTotal = totalEcts;

  const uniqueSubjects = Array.from(new Set(scheduleData.map((item: any) => item.subject).filter(Boolean)));
  const recentTransactions = Array.isArray(paymentsData?.transactions) ? paymentsData.transactions.slice(0, 3) : [];

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
            <p className="text-xl font-semibold text-muted-foreground">N/A</p>
            <p className="text-sm text-muted-foreground mt-1">მიუწვდომელია</p>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Credits</span>
              <span className="font-semibold text-foreground">{creditsCompleted} / {creditsTotal} კრედიტი დასრულებული</span>
            </div>
            <Progress value={creditsTotal > 0 ? (creditsCompleted / creditsTotal) * 100 : 0} className="h-3" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">გაზაფხული 2026 — სემესტრი 4</p>
            <p className="text-sm text-muted-foreground">Current Semester</p>
          </div>
        </div>
      </div>

      {/* This Semester Courses */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">This Semester at a Glance</h3>
        {sections.schedule ? (
          <div className="space-y-2">
            {uniqueSubjects.length > 0 ? (
              uniqueSubjects.map((subject, i) => (
                <div key={`${subject}-${i}`} className="text-sm text-foreground bg-muted/30 rounded-lg px-3 py-2">
                  {subject}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">სემესტრის საგნები დროებით მიუწვდომელია</p>
            )}
          </div>
        ) : (
          <Skeleton className="h-24 w-full" />
        )}
      </div>

      {/* Recent Payments */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Recent Payments</h3>
        {sections.payments ? (
          <div className="space-y-3">
            {recentTransactions.map((h: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <div>
                  <p className="text-foreground">{h.description || "-"}</p>
                  <p className="text-xs text-muted-foreground">{h.academicYear || "-"}</p>
                </div>
                <span className="font-medium text-foreground">{h.amount || "-"}</span>
              </div>
            ))}
            {recentTransactions.length === 0 && (
              <p className="text-sm text-muted-foreground">გადახდების ინფორმაცია არ მოიძებნა</p>
            )}
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
