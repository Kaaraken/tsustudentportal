import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Login from "./Login";
import Dashboard from "@/components/dashboard/Dashboard";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => (
  <div className="min-h-screen flex flex-col">
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <Skeleton className="w-32 h-8" />
      <Skeleton className="w-24 h-8 rounded-full" />
    </div>
    <div className="flex flex-1">
      <div className="hidden lg:flex w-64 flex-col gap-3 p-5 gradient-navy">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-10 bg-sidebar-accent/30 rounded-lg" />
        ))}
      </div>
      <div className="flex-1 p-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { fetchAll, loading } = useData();
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !initialLoad) {
      setInitialLoad(true);
      fetchAll();
    }
  }, [isAuthenticated, initialLoad, fetchAll]);

  if (!isAuthenticated) return <Login />;
  if (loading && initialLoad) return <LoadingSkeleton />;
  return <Dashboard />;
};

export default Index;
