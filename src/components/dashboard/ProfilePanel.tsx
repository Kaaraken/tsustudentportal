import { X, BookOpen, BarChart3, CalendarDays, Plane, CreditCard, FileText, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfilePanelProps {
  open: boolean;
  onClose: () => void;
  onViewProfile?: () => void;
}

const ProfilePanel = ({ open, onClose, onViewProfile }: ProfilePanelProps) => {
  const { studentName, studentId, logout } = useAuth();
  const { sections } = useData();

  const initials = studentName
    ? studentName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "ST";

  // Derive stats from DataContext
  const coursesCount = sections.courses?.data?.length ?? null;
  const gpa = sections.program?.data?.gpa ?? null;
  const balance = sections.payments?.data?.balance ?? null;
  const docsCount = sections.documents?.data?.length ?? null;

  // Next class logic
  const scheduleData = sections.schedule?.data;
  let nextClass: string | null = null;
  if (scheduleData && Array.isArray(scheduleData) && scheduleData.length > 0) {
    const cls = scheduleData[0];
    nextClass = `${cls.name} — ${cls.room}, ${cls.start}:00`;
  }

  // Mobility status
  const mobilityStatus = sections.mobility?.data?.applicationStatus ?? null;

  const gpaColor = gpa !== null
    ? gpa >= 3.5 ? "text-success" : gpa >= 2.5 ? "text-warning" : "text-destructive"
    : "";

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  return (
    <>
      {/* Overlay */}
      {open && <div className="fixed inset-0 z-40 bg-foreground/20" onClick={onClose} />}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-card border-l border-border shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-semibold text-foreground">Profile</span>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Avatar & Name */}
          <div className="flex flex-col items-center p-6 pb-4">
            <div className="w-20 h-20 rounded-full bg-primary text-accent flex items-center justify-center text-2xl font-bold">
              {initials}
            </div>
            <h3 className="text-lg font-bold text-foreground mt-3">{studentName || "Student"}</h3>
            <p className="text-sm text-muted-foreground">{studentId}</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 px-6 pb-6">
            <StatCard icon={BookOpen} label="Courses" value={coursesCount !== null ? `${coursesCount} active` : null} />
            <StatCard icon={BarChart3} label="GPA" value={gpa !== null ? String(gpa) : null} valueClass={gpaColor} />
            <StatCard icon={CalendarDays} label="Next Class" value={nextClass || "No more classes today"} />
            <StatCard icon={Plane} label="Mobility" value={mobilityStatus || "No active application"} />
            <StatCard
              icon={CreditCard}
              label="Balance"
              value={balance !== null && balance !== undefined
                ? (balance > 0 ? `₾ ${balance} due` : "✓ Paid")
                : null}
              valueClass={balance !== null ? (balance > 0 ? "text-destructive" : "text-success") : ""}
            />
            <StatCard icon={FileText} label="Documents" value={docsCount !== null ? `${docsCount} available` : null} />
          </div>

          {/* Footer */}
          <div className="mt-auto p-6 pt-4 border-t border-border space-y-3">
            {onViewProfile && (
              <Button className="w-full" onClick={() => { onClose(); onViewProfile(); }}>
                View Full Profile
              </Button>
            )}
            <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const StatCard = ({ icon: Icon, label, value, valueClass }: {
  icon: typeof BookOpen;
  label: string;
  value: string | null;
  valueClass?: string;
}) => (
  <div className="glass-card rounded-lg p-3">
    <div className="flex items-center gap-1.5 mb-1">
      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    {value !== null ? (
      <p className={`text-sm font-semibold truncate ${valueClass || "text-foreground"}`}>{value}</p>
    ) : (
      <Skeleton className="h-4 w-16 mt-1" />
    )}
  </div>
);

export default ProfilePanel;
