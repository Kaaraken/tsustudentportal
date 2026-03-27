import { useState } from "react";
import { Plus, Save, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

interface CourseRow {
  code: string;
  name: string;
  instructor: string;
  credits: string;
  grade: string;
}

const emptyRow = (): CourseRow => ({ code: "", name: "", instructor: "", credits: "", grade: "" });

const CoursesForm = () => {
  const { token } = useAuth();
  const { updateSectionData } = useData();
  const [rows, setRows] = useState<CourseRow[]>([emptyRow()]);
  const [saving, setSaving] = useState(false);

  const update = (i: number, field: keyof CourseRow, val: string) => {
    const next = [...rows];
    next[i] = { ...next[i], [field]: val };
    setRows(next);
  };

  const handleSave = async () => {
    const valid = rows.filter(r => r.code && r.name);
    if (valid.length === 0) {
      toast({ title: "Please fill in at least one course", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/manual/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ data: valid }),
      });
      updateSectionData("courses", valid);
      toast({ title: "Courses saved successfully!" });
    } catch {
      toast({ title: "Failed to save. Data stored locally.", variant: "destructive" });
      updateSectionData("courses", valid);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4">My Courses</h2>
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 bg-info/10 border border-info/30 text-info rounded-lg p-3 text-sm mb-6">
          <Info className="w-4 h-4 shrink-0" />
          We couldn't load this data automatically. Please enter it manually below.
        </div>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <Input placeholder="Course Code" value={row.code} onChange={e => update(i, "code", e.target.value)} />
              <Input placeholder="Course Name" value={row.name} onChange={e => update(i, "name", e.target.value)} />
              <Input placeholder="Instructor" value={row.instructor} onChange={e => update(i, "instructor", e.target.value)} />
              <Input placeholder="Credits" value={row.credits} onChange={e => update(i, "credits", e.target.value)} />
              <Input placeholder="Grade" value={row.grade} onChange={e => update(i, "grade", e.target.value)} />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={() => setRows([...rows, emptyRow()])}>
            <Plus className="w-4 h-4 mr-1" /> Add Course
          </Button>
          <Button className="bg-accent text-accent-foreground hover:bg-gold-light" onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-1" /> Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursesForm;
