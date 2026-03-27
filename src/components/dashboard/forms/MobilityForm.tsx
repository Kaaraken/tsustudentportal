import { useState } from "react";
import { Save, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

const statuses = ["Interested", "Applied", "Under Review", "Approved", "Rejected"];

const MobilityForm = () => {
  const { token } = useAuth();
  const { updateSectionData } = useData();
  const [form, setForm] = useState({ programName: "", partnerUniversity: "", country: "", status: "Interested" });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.programName || !form.partnerUniversity) { toast({ title: "Please fill required fields", variant: "destructive" }); return; }
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/manual/mobility`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ data: form }) });
      updateSectionData("mobility", form);
      toast({ title: "Mobility data saved!" });
    } catch { updateSectionData("mobility", form); toast({ title: "Saved locally" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4">Mobility & Exchange</h2>
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 bg-info/10 border border-info/30 text-info rounded-lg p-3 text-sm mb-6">
          <Info className="w-4 h-4 shrink-0" />
          We couldn't load this data automatically. Please enter it manually below.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input placeholder="Program Name" value={form.programName} onChange={e => setForm({ ...form, programName: e.target.value })} />
          <Input placeholder="Partner University" value={form.partnerUniversity} onChange={e => setForm({ ...form, partnerUniversity: e.target.value })} />
          <Input placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
          <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          <Button className="bg-accent text-accent-foreground hover:bg-gold-light" onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-1" /> Save</Button>
        </div>
      </div>
    </div>
  );
};

export default MobilityForm;
