import { useState } from "react";
import { Plus, Save, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

interface SemesterCourse { code: string; name: string; credits: string; grade: string; }
interface Semester { number: string; courses: SemesterCourse[]; }

const ProgramForm = () => {
  const { token } = useAuth();
  const { updateSectionData } = useData();
  const [programName, setProgramName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [totalCredits, setTotalCredits] = useState("");
  const [completedCredits, setCompletedCredits] = useState("");
  const [gpa, setGpa] = useState("");
  const [semesters, setSemesters] = useState<Semester[]>([{ number: "1", courses: [{ code: "", name: "", credits: "", grade: "" }] }]);
  const [saving, setSaving] = useState(false);

  const addSemester = () => setSemesters([...semesters, { number: String(semesters.length + 1), courses: [{ code: "", name: "", credits: "", grade: "" }] }]);
  const addCourse = (si: number) => {
    const next = [...semesters];
    next[si].courses.push({ code: "", name: "", credits: "", grade: "" });
    setSemesters(next);
  };

  const updateCourse = (si: number, ci: number, field: keyof SemesterCourse, val: string) => {
    const next = [...semesters];
    next[si].courses[ci] = { ...next[si].courses[ci], [field]: val };
    setSemesters(next);
  };

  const handleSave = async () => {
    if (!programName) { toast({ title: "Program name is required", variant: "destructive" }); return; }
    const data = { programName, faculty, totalCredits, completedCredits, gpa, semesters };
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/manual/program`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ data }) });
      updateSectionData("program", data);
      toast({ title: "Program data saved!" });
    } catch { updateSectionData("program", data); toast({ title: "Saved locally" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4">Degree Program</h2>
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 bg-info/10 border border-info/30 text-info rounded-lg p-3 text-sm mb-6">
          <Info className="w-4 h-4 shrink-0" />
          We couldn't load this data automatically. Please enter it manually below.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <Input placeholder="Program Name" value={programName} onChange={e => setProgramName(e.target.value)} />
          <Input placeholder="Faculty" value={faculty} onChange={e => setFaculty(e.target.value)} />
          <Input placeholder="GPA" value={gpa} onChange={e => setGpa(e.target.value)} />
          <Input placeholder="Total Credits" value={totalCredits} onChange={e => setTotalCredits(e.target.value)} />
          <Input placeholder="Completed Credits" value={completedCredits} onChange={e => setCompletedCredits(e.target.value)} />
        </div>

        {semesters.map((sem, si) => (
          <div key={si} className="mb-4 border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">Semester {sem.number}</h4>
              <Button variant="ghost" size="sm" onClick={() => addCourse(si)}><Plus className="w-3 h-3 mr-1" /> Add Course</Button>
            </div>
            <div className="space-y-2">
              {sem.courses.map((c, ci) => (
                <div key={ci} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Input placeholder="Code" value={c.code} onChange={e => updateCourse(si, ci, "code", e.target.value)} />
                  <Input placeholder="Name" value={c.name} onChange={e => updateCourse(si, ci, "name", e.target.value)} />
                  <Input placeholder="Credits" value={c.credits} onChange={e => updateCourse(si, ci, "credits", e.target.value)} />
                  <Input placeholder="Grade" value={c.grade} onChange={e => updateCourse(si, ci, "grade", e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={addSemester}><Plus className="w-4 h-4 mr-1" /> Add Semester</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-gold-light" onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-1" /> Save</Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramForm;
