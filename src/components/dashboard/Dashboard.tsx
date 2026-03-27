import { useState } from "react";
import Sidebar, { Section } from "./Sidebar";
import TopNav from "./TopNav";
import LoadingBar from "./LoadingBar";
import CoursesSection from "./sections/CoursesSection";
import ScheduleSection from "./sections/ScheduleSection";
import MobilitySection from "./sections/MobilitySection";
import ProgramSection from "./sections/ProgramSection";
import PaymentsSection from "./sections/PaymentsSection";
import DocumentsSection from "./sections/DocumentsSection";
import ProfileSection from "./sections/ProfileSection";

const sectionComponents: Record<Section, React.FC> = {
  courses: CoursesSection,
  schedule: ScheduleSection,
  mobility: MobilitySection,
  program: ProgramSection,
  payments: PaymentsSection,
  documents: DocumentsSection,
  profile: ProfileSection,
};

const Dashboard = () => {
  const [active, setActive] = useState<Section>("courses");
  const ActiveComponent = sectionComponents[active];

  return (
    <div className="min-h-screen flex flex-col">
      <LoadingBar />
      <TopNav />
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
