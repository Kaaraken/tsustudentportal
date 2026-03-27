import { useState } from "react";
import Sidebar, { Section } from "./Sidebar";
import TopNav from "./TopNav";
import CoursesSection from "./sections/CoursesSection";
import ScheduleSection from "./sections/ScheduleSection";
import MobilitySection from "./sections/MobilitySection";
import ProgramSection from "./sections/ProgramSection";
import PaymentsSection from "./sections/PaymentsSection";
import DocumentsSection from "./sections/DocumentsSection";

interface DashboardProps {
  onLogout: () => void;
}

const sectionComponents: Record<Section, React.FC> = {
  courses: CoursesSection,
  schedule: ScheduleSection,
  mobility: MobilitySection,
  program: ProgramSection,
  payments: PaymentsSection,
  documents: DocumentsSection,
};

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [active, setActive] = useState<Section>("courses");
  const ActiveComponent = sectionComponents[active];

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav onLogout={onLogout} />
      <div className="flex flex-1">
        <Sidebar active={active} onNavigate={setActive} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto bg-background">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
