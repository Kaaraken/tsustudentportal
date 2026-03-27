import { useState } from "react";
import { Plus, Save, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

interface DocRow { name: string; date: string; }
const emptyRow = (): DocRow => ({ name: "", date: "" });

const DocumentsForm = () => {
  const { token } = useAuth();
  const { updateSectionData } = useData();
  const [rows, setRows] = useState<DocRow[]>([emptyRow()]);
  const [saving, setSaving] = useState(false);

  const update = (i: number, field: keyof DocRow, val: string) => {
    const next = [...rows];
    next[i] = { ...next[i], [field]: val };
    setRows(next);
  };

  const handleSave = async () => {
    const valid = rows.filter(r => r.name);
    if (!valid.length) { toast({ title: "Please add at least one document", variant: "destructive" }); return; }
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/manual/documents`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ data: valid }) });
      updateSectionData("documents", valid);
      toast({ title: "Documents saved!" });
    } catch { updateSectionData("documents", valid); toast({ title: "Saved locally" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4">Documents</h2>
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 bg-info/10 border border-info/30 text-info rounded-lg p-3 text-sm mb-6">
          <Info className="w-4 h-4 shrink-0" />
          We couldn't load this data automatically. Please enter it manually below.
        </div>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input placeholder="Document Name" value={row.name} onChange={e => update(i, "name", e.target.value)} />
              <Input type="date" value={row.date} onChange={e => update(i, "date", e.target.value)} />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={() => setRows([...rows, emptyRow()])}><Plus className="w-4 h-4 mr-1" /> Add Document</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-gold-light" onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-1" /> Save</Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsForm;
