import { useState } from "react";
import { Plus, Save, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface SlotRow { day: string; startTime: string; endTime: string; course: string; room: string; }
const emptyRow = (): SlotRow => ({ day: "Monday", startTime: "", endTime: "", course: "", room: "" });

const ScheduleForm = () => {
  const { token } = useAuth();
  const { updateSectionData } = useData();
  const [rows, setRows] = useState<SlotRow[]>([emptyRow()]);
  const [saving, setSaving] = useState(false);

  const update = (i: number, field: keyof SlotRow, val: string) => {
    const next = [...rows];
    next[i] = { ...next[i], [field]: val };
    setRows(next);
  };

  const handleSave = async () => {
    const valid = rows.filter(r => r.course && r.startTime);
    if (!valid.length) { toast({ title: "Please fill in at least one slot", variant: "destructive" }); return; }
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/manual/schedule`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ data: valid }) });
      updateSectionData("schedule", valid);
      toast({ title: "Schedule saved successfully!" });
    } catch { updateSectionData("schedule", valid); toast({ title: "Saved locally" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4">Schedule</h2>
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 bg-info/10 border border-info/30 text-info rounded-lg p-3 text-sm mb-6">
          <Info className="w-4 h-4 shrink-0" />
          We couldn't load this data automatically. Please enter it manually below.
        </div>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <Select value={row.day} onValueChange={v => update(i, "day", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
              <Input type="time" placeholder="Start" value={row.startTime} onChange={e => update(i, "startTime", e.target.value)} />
              <Input type="time" placeholder="End" value={row.endTime} onChange={e => update(i, "endTime", e.target.value)} />
              <Input placeholder="Course Name" value={row.course} onChange={e => update(i, "course", e.target.value)} />
              <Input placeholder="Room" value={row.room} onChange={e => update(i, "room", e.target.value)} />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={() => setRows([...rows, emptyRow()])}><Plus className="w-4 h-4 mr-1" /> Add Slot</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-gold-light" onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-1" /> Save</Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
