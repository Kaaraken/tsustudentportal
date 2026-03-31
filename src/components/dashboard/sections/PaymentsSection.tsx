import { DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import SectionWrapper from "../SectionWrapper";

type PaymentTx = {
  index?: string;
  academicYear?: string;
  description?: string;
  type?: string;
  amount?: string;
  paid?: string;
  balance?: string;
};

const parseBalanceInfo = (balanceDue?: string) => {
  const text = balanceDue || "";
  const balance = text.split("ჯამური დავალიანება:")[1]?.trim() || "0.00";
  const status = text.split(",")[0]?.trim() || "აკადემიურ რეგისტრაციაზე: -";
  const value = Number(balance.replace(/,/g, "")) || 0;
  return { balance, status, value };
};

const PaymentsContent = ({ raw }: { raw: any }) => {
  const payments = raw?.payments ?? raw ?? {};
  const transactions: PaymentTx[] = Array.isArray(payments?.transactions) ? payments.transactions : [];
  const balanceDueText = String(payments?.balanceDue || "");
  const { balance, status, value } = parseBalanceInfo(balanceDueText);

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">გადასახადები</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 rounded-xl p-6 border border-border bg-card">
          <DollarSign className="w-8 h-8 mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">ჯამური დავალიანება</p>
          <p className={`text-3xl font-bold mt-1 ${value > 0 ? "text-red-600" : "text-green-600"}`}>{balance} ₾</p>
          <Badge className="mt-3 bg-green-500/15 text-green-700 border-0">{status}</Badge>
        </div>
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <p className="text-sm text-muted-foreground">{balanceDueText || "მონაცემები მიუწვდომელია"}</p>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">აკადემიური წელი</th>
                <th className="text-left p-4 font-medium text-muted-foreground">აღწერა</th>
                <th className="text-right p-4 font-medium text-muted-foreground">თანხა</th>
                <th className="text-right p-4 font-medium text-muted-foreground">ნაშთი</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((row, i) => {
                const isPaid = (row.balance || "").trim() === "0.00";
                return (
                  <tr
                    key={`${row.index || i}-${row.description || ""}`}
                    className={`border-b border-border last:border-0 ${isPaid ? "bg-green-500/5" : "bg-yellow-500/10"}`}
                  >
                    <td className="p-4 text-muted-foreground">{row.academicYear || "-"}</td>
                    <td className="p-4 text-foreground">{row.description || "-"}</td>
                    <td className="p-4 text-right font-medium text-foreground">
                      {row.amount ? `${row.amount} ${row.paid || ""}`.trim() : "-"}
                    </td>
                    <td className="p-4 text-right font-medium text-foreground">{row.balance || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {transactions.length === 0 && <div className="p-6 text-sm text-muted-foreground">ტრანზაქციები არ მოიძებნა</div>}
        </div>
      </div>
    </div>
  );
};

const PaymentsSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-44" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Skeleton className="h-36 w-full" />
      <Skeleton className="h-36 w-full lg:col-span-2" />
    </div>
    <div className="glass-card rounded-xl p-4 space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  </div>
);

const PaymentsSection = () => (
  <SectionWrapper sectionKey="payments" emptyForm={<PaymentsContent raw={{}} />} fallbackContent={<PaymentsContent raw={{}} />} loadingContent={<PaymentsSkeleton />}>
    {(data) => <PaymentsContent raw={data} />}
  </SectionWrapper>
);

export default PaymentsSection;
