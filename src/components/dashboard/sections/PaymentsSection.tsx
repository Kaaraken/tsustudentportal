import { DollarSign, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const history = [
  { date: "Mar 1, 2026", desc: "Tuition – Spring 2026", amount: "$4,250.00", status: "Paid" as const },
  { date: "Feb 15, 2026", desc: "Lab Fee – Data Structures", amount: "$150.00", status: "Paid" as const },
  { date: "Jan 20, 2026", desc: "Student Activity Fee", amount: "$75.00", status: "Paid" as const },
  { date: "Apr 1, 2026", desc: "Library Late Fee", amount: "$12.50", status: "Pending" as const },
];

const breakdown = [
  { item: "Tuition", amount: "$4,250.00" },
  { item: "Lab Fees", amount: "$300.00" },
  { item: "Technology Fee", amount: "$125.00" },
  { item: "Student Activity Fee", amount: "$75.00" },
  { item: "Health Insurance", amount: "$450.00" },
];

const PaymentsSection = () => (
  <div className="animate-fade-in">
    <h2 className="text-2xl font-bold text-foreground mb-6">Payments</h2>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Balance card */}
      <div className="lg:col-span-1 gradient-gold rounded-xl p-6 text-navy-dark">
        <DollarSign className="w-8 h-8 mb-2 opacity-80" />
        <p className="text-sm font-medium opacity-80">Current Balance Due</p>
        <p className="text-3xl font-bold mt-1">$12.50</p>
        <Button size="sm" className="mt-4 bg-navy-dark text-primary-foreground hover:bg-navy">
          <CreditCard className="w-4 h-4 mr-2" /> Make a Payment
        </Button>
      </div>

      {/* Breakdown */}
      <div className="lg:col-span-2 glass-card rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Spring 2026 Breakdown</h3>
        <div className="space-y-3">
          {breakdown.map((b) => (
            <div key={b.item} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{b.item}</span>
              <span className="font-medium text-foreground">{b.amount}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3 flex justify-between font-semibold text-foreground">
            <span>Total</span>
            <span>$5,200.00</span>
          </div>
        </div>
      </div>
    </div>

    {/* Payment history */}
    <h3 className="font-semibold text-foreground mb-4">Payment History</h3>
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Description</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="p-4 text-muted-foreground">{h.date}</td>
                <td className="p-4 text-foreground">{h.desc}</td>
                <td className="p-4 text-right font-medium text-foreground">{h.amount}</td>
                <td className="p-4 text-right">
                  <Badge variant={h.status === "Paid" ? "default" : "secondary"} className={h.status === "Paid" ? "bg-success/15 text-success border-0" : "bg-warning/15 text-warning border-0"}>
                    {h.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default PaymentsSection;
