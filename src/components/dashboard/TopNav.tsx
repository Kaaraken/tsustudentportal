import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProfilePanel from "./ProfilePanel";

const TopNav = () => {
  const { studentName, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const initials = studentName
    ? studentName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "ST";

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img src="/tsu-logo.png" alt="TSU" style={{ height: "40px", width: "auto" }} />
          <span className="font-bold text-lg text-foreground hidden sm:block">TSU Student Portal</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-card" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2 hover:bg-muted rounded-lg p-1.5 pr-3 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary text-accent flex items-center justify-center text-sm font-semibold">
                {initials}
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">{studentName || "Student"}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <ProfilePanel open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
};

export default TopNav;
