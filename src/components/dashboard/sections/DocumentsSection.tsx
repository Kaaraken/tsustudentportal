import SectionWrapper from "../SectionWrapper";
import { Skeleton } from "@/components/ui/skeleton";

const DocumentsContent = () => (
  <div className="rounded-xl border border-slate-300/60 bg-slate-100/60 p-6">
    <div className="text-4xl mb-3">📄</div>
    <h2 className="text-2xl font-bold text-foreground mb-2">დოკუმენტები არ არის ხელმისაწვდომი</h2>
    <p className="text-muted-foreground">Your documents will appear here once available</p>
  </div>
);

const DocumentsSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="h-28 w-full" />
    <Skeleton className="h-28 w-full" />
  </div>
);

const DocumentsSection = () => (
  <SectionWrapper sectionKey="documents" emptyForm={<DocumentsContent />} fallbackContent={<DocumentsContent />} loadingContent={<DocumentsSkeleton />}>
    {() => <DocumentsContent />}
  </SectionWrapper>
);

export default DocumentsSection;
