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
        const response = await res.json();
        const now = Date.now();

        const scheduleData = response.sections?.schedule?.data?.schedule || [];
        const paymentsData = response.sections?.payments?.data?.payments || {};
        const programData = response.sections?.program?.data?.program || {};

        setSections({
          courses: {
            data: response.sections?.courses?.data ?? null,
            stale: response.sections?.courses?.stale ?? true,
            empty: response.sections?.courses?.empty,
            lastUpdated: now
          },
          schedule: {
            data: scheduleData,
            stale: response.sections?.schedule?.stale ?? true,
            empty: response.sections?.schedule?.empty,
            lastUpdated: now
          },
          mobility: {
            data: response.sections?.mobility?.data ?? null,
            stale: response.sections?.mobility?.stale ?? true,
            empty: response.sections?.mobility?.empty,
            lastUpdated: now
          },
          program: {
            data: programData,
            stale: response.sections?.program?.stale ?? true,
            empty: response.sections?.program?.empty,
            lastUpdated: now
          },
          payments: {
            data: paymentsData,
            stale: response.sections?.payments?.stale ?? true,
            empty: response.sections?.payments?.empty,
            lastUpdated: now
          },
          documents: {
            data: response.sections?.documents?.data ?? null,
            stale: response.sections?.documents?.stale ?? true,
            empty: response.sections?.documents?.empty,
            lastUpdated: now
          }
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
