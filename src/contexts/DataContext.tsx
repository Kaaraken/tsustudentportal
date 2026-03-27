import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { API_URL } from "@/config";
import { useAuth } from "./AuthContext";

export interface SectionData<T = any> {
  data: T;
  stale?: boolean;
  empty?: boolean;
  lastUpdated: number; // timestamp
}

interface AllData {
  courses: SectionData | null;
  schedule: SectionData | null;
  mobility: SectionData | null;
  program: SectionData | null;
  payments: SectionData | null;
  documents: SectionData | null;
}

interface DataContextValue {
  sections: AllData;
  loading: boolean;
  globalLoading: boolean;
  fetchAll: () => Promise<void>;
  refreshSection: (section: keyof AllData) => Promise<void>;
  updateSectionData: (section: keyof AllData, data: any) => void;
}

const emptyData: AllData = {
  courses: null,
  schedule: null,
  mobility: null,
  program: null,
  payments: null,
  documents: null,
};

const DataContext = createContext<DataContextValue | null>(null);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [sections, setSections] = useState<AllData>(emptyData);
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);

  const headers = useCallback(() => ({
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }), [token]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setGlobalLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/data/all`, { headers: headers() });
      if (res.ok) {
        const data = await res.json();
        const now = Date.now();
        setSections({
          courses: { data: data.courses?.data, stale: data.courses?.stale, empty: data.courses?.empty, lastUpdated: now },
          schedule: { data: data.schedule?.data, stale: data.schedule?.stale, empty: data.schedule?.empty, lastUpdated: now },
          mobility: { data: data.mobility?.data, stale: data.mobility?.stale, empty: data.mobility?.empty, lastUpdated: now },
          program: { data: data.program?.data, stale: data.program?.stale, empty: data.program?.empty, lastUpdated: now },
          payments: { data: data.payments?.data, stale: data.payments?.stale, empty: data.payments?.empty, lastUpdated: now },
          documents: { data: data.documents?.data, stale: data.documents?.stale, empty: data.documents?.empty, lastUpdated: now },
        });
      }
    } catch {
      // API not available — sections remain null, will use fallback data
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  }, [headers]);

  const refreshSection = useCallback(async (section: keyof AllData) => {
    setGlobalLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/data/${section}`, { headers: headers() });
      if (res.ok) {
        const data = await res.json();
        setSections(prev => ({
          ...prev,
          [section]: { data: data.data, stale: data.stale, empty: data.empty, lastUpdated: Date.now() },
        }));
      }
    } catch {
      // ignore
    } finally {
      setGlobalLoading(false);
    }
  }, [headers]);

  const updateSectionData = useCallback((section: keyof AllData, data: any) => {
    setSections(prev => ({
      ...prev,
      [section]: { data, stale: false, empty: false, lastUpdated: Date.now() },
    }));
  }, []);

  return (
    <DataContext.Provider value={{ sections, loading, globalLoading, fetchAll, refreshSection, updateSectionData }}>
      {children}
    </DataContext.Provider>
  );
};
