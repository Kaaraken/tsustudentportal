import { useData } from "@/contexts/DataContext";

const LoadingBar = () => {
  const { globalLoading } = useData();
  if (!globalLoading) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-muted overflow-hidden">
      <div className="h-full bg-accent animate-loading-bar" />
    </div>
  );
};

export default LoadingBar;
