import { BookOpen, CalendarDays, Plane, GraduationCap, CreditCard, FileText, Menu, X, UserCircle } from "lucide-react";
import { useState } from "react";

export type Section = "courses" | "schedule" | "mobility" | "program" | "payments" | "documents" | "profile";

const navItems: { id: Section; label: string; icon: typeof BookOpen }[] = [
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "mobility", label: "Mobility", icon: Plane },
  { id: "program", label: "Program", icon: GraduationCap },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "profile", label: "Profile", icon: UserCircle },
];

interface SidebarProps {
  active: Section;
  onNavigate: (section: Section) => void;
}

const Sidebar = ({ active, onNavigate }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1 p-3">
      {navItems.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
          >
            <item.icon className={`w-5 h-5 ${isActive ? "text-sidebar-primary" : ""}`} />
            <span>{item.label}</span>
            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary" />}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 gradient-navy animate-slide-in flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <span className="text-sidebar-foreground font-semibold">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="text-sidebar-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            {nav}
          </div>
        </div>
      )}

      <aside className="hidden lg:flex w-64 gradient-navy flex-col shrink-0">
        <div className="p-5 border-b border-sidebar-border">
          <p className="text-sidebar-foreground/60 text-xs uppercase tracking-wider font-semibold">Navigation</p>
        </div>
        {nav}
      </aside>
    </>
  );
};

export default Sidebar;
