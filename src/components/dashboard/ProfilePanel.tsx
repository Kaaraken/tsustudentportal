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

  const coursesValue = "რეგისტრაცია დახურულია";
  const gpaValue = "N/A";
  const documentsValue = "მიუწვდომელია";

  const balanceDueText = String(sections.payments?.data?.balanceDue || "");
  const balanceAmount = balanceDueText.split("ჯამური დავალიანება:")[1]?.trim() || "0.00";
  const balanceNumber = Number(balanceAmount.replace(/,/g, "")) || 0;
  const balanceValue = `${balanceAmount} ₾`;

  const dayMap: Record<string, number> = {
    ორშაბათი: 1,
    სამშაბათი: 2,
    ოთხშაბათი: 3,
    ხუთშაბათი: 4,
    პარასკევი: 5
  };
  const scheduleData = Array.isArray(sections.schedule?.data) ? sections.schedule.data : [];
  const now = new Date();
  const today = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const parsedClasses = scheduleData
    .map((item: any) => {
      const parts = String(item.time || "").replace("თარიღი, დრო: ", "").split(", ");
      const day = parts[0] || "";
      const timeRange = parts[1] || "";
      const start = timeRange.split(" - ")[0] || "";
      const [h, m] = start.split(":").map(Number);
      if (!dayMap[day] || Number.isNaN(h) || Number.isNaN(m)) {
        return null;
      }
      return {
        subject: item.subject || "-",
        day,
        dayNum: dayMap[day],
        startMinutes: h * 60 + m,
        start
      };
    })
    .filter(Boolean) as Array<{ subject: string; day: string; dayNum: number; startMinutes: number; start: string }>;

  const upcoming = parsedClasses
    .filter((c) => c.dayNum === today && c.startMinutes >= minutesNow)
    .sort((a, b) => a.startMinutes - b.startMinutes)[0];

  const nextDay = parsedClasses
    .filter((c) => c.dayNum > today)
    .sort((a, b) => a.dayNum - b.dayNum || a.startMinutes - b.startMinutes)[0];

  const wrappedDay = parsedClasses
    .filter((c) => c.dayNum < today)
    .sort((a, b) => a.dayNum - b.dayNum || a.startMinutes - b.startMinutes)[0];

  const nextClassItem = upcoming || nextDay || wrappedDay || null;
  const nextClass = nextClassItem ? `${nextClassItem.subject} — ${nextClassItem.day}, ${nextClassItem.start}` : "No upcoming classes";

  const mobilityStatus = "No active application";

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
            <StatCard icon={BookOpen} label="Courses" value={coursesValue} />
            <StatCard icon={BarChart3} label="GPA" value={gpaValue} />
            <StatCard icon={CalendarDays} label="Next Class" value={nextClass} />
            <StatCard icon={Plane} label="Mobility" value={mobilityStatus || "No active application"} />
            <StatCard
              icon={CreditCard}
              label="Balance"
              value={balanceValue}
              valueClass={balanceNumber > 0 ? "text-destructive" : "text-success"}
            />
            <StatCard icon={FileText} label="Documents" value={documentsValue} />
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
