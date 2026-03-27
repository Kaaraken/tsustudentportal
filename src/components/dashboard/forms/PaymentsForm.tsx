import { useState } from "react";
import { Plus, Save, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";

interface TxRow { date: string; desc: string; amount: string; status: string; }
const emptyTx = (): TxRow => ({ date: "", desc: "", amount: "", status: "Pending" });

const PaymentsForm = () => {
  const { token } = useAuth();
  const { updateSectionData } = useData();
  const [balance, setBalance] = useState("");
  const [rows, setRows] = useState<TxRow[]>([emptyTx()]);
  const [saving, setSaving] = useState(false);

  const update = (i: number, field: keyof TxRow, val: string) => {
    const next = [...rows];
    next[i] = { ...next[i], [field]: val };
    setRows(next);
  };

  const handleSave = async () => {
    const data = { balance: parseFloat(balance) || 0, history: rows.filter(r => r.desc) };
    setSaving(true);
    try {
      await fetch(`${API_URL}/api/manual/payments`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ data }) });
      updateSectionData("payments", data);
      toast({ title: "Payments saved!" });
    } catch { updateSectionData("payments", data); toast({ title: "Saved locally" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4">Payments</h2>
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 bg-info/10 border border-info/30 text-info rounded-lg p-3 text-sm mb-6">
          <Info className="w-4 h-4 shrink-0" />
          We couldn't load this data automatically. Please enter it manually below.
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium text-foreground mb-1 block">Current Balance Due (₾)</label>
          <Input placeholder="0.00" value={balance} onChange={e => setBalance(e.target.value)} className="max-w-xs" />
        </div>
        <h4 className="font-semibold text-foreground mb-3">Transactions</h4>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Input type="date" value={row.date} onChange={e => update(i, "date", e.target.value)} />
              <Input placeholder="Description" value={row.desc} onChange={e => update(i, "desc", e.target.value)} />
              <Input placeholder="Amount" value={row.amount} onChange={e => update(i, "amount", e.target.value)} />
              <Select value={row.status} onValueChange={v => update(i, "status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={() => setRows([...rows, emptyTx()])}><Plus className="w-4 h-4 mr-1" /> Add Transaction</Button>
          <Button className="bg-accent text-accent-foreground hover:bg-gold-light" onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-1" /> Save</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsForm;
