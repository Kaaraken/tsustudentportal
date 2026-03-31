import { RefreshCw, AlertTriangle } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";

interface SectionWrapperProps {
  sectionKey: "courses" | "schedule" | "mobility" | "program" | "payments" | "documents";
  children: (data: any) => React.ReactNode;
  emptyForm: React.ReactNode;
  fallbackContent: React.ReactNode;
  loadingContent?: React.ReactNode;
}

const formatAgo = (ts: number) => {
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins === 1) return "1 minute ago";
  return `${mins} minutes ago`;
};

const SectionWrapper = ({ sectionKey, children, emptyForm, fallbackContent, loadingContent }: SectionWrapperProps) => {
  const { sections, refreshSection, globalLoading, loading } = useData();
  const section = sections[sectionKey];

  if (loading && !section) {
    return <div className="relative">{loadingContent || fallbackContent}</div>;
  }

  // No API data loaded
  if (!section) {
    return <div className="relative">{fallbackContent}</div>;
  }

  // Section is empty — show manual entry form
  if (section.empty) {
    return <div>{emptyForm}</div>;
  }

  return (
    <div className="relative">
      {/* Refresh button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0 z-10"
        onClick={() => refreshSection(sectionKey)}
        disabled={globalLoading}
      >
        <RefreshCw className={`w-4 h-4 ${globalLoading ? "animate-spin" : ""}`} />
      </Button>

      {/* Stale banner */}
      {section.stale && (
        <div className="mb-4 flex items-center gap-2 bg-warning/10 border border-warning/30 text-warning rounded-lg p-3 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          ⚠ მონაცემები შეიძლება მოძველებული იყოს
        </div>
      )}

      {children(section.data)}

      {/* Last updated */}
      <p className="text-xs text-muted-foreground mt-6 text-right">
        Last updated: {formatAgo(section.lastUpdated)}
      </p>
    </div>
  );
};

export default SectionWrapper;
