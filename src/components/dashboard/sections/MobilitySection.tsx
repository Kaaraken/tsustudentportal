import SectionWrapper from "../SectionWrapper";
import { Skeleton } from "@/components/ui/skeleton";

const MobilityContent = () => (
  <div className="rounded-xl border border-blue-200/60 bg-blue-50/60 p-6">
    <div className="text-4xl mb-3">✈️</div>
    <h2 className="text-2xl font-bold text-foreground mb-2">მობილობა არ არის აქტიური</h2>
    <p className="text-muted-foreground">
      Exchange programs will appear here when the application period opens
    </p>
  </div>
);

const MobilitySkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-56" />
    <Skeleton className="h-28 w-full" />
    <Skeleton className="h-28 w-full" />
  </div>
);

const MobilitySection = () => (
  <SectionWrapper sectionKey="mobility" emptyForm={<MobilityContent />} fallbackContent={<MobilityContent />} loadingContent={<MobilitySkeleton />}>
    {() => <MobilityContent />}
  </SectionWrapper>
);

export default MobilitySection;
