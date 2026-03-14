import { Card, CardContent } from "@/components/ui/card";

export default function KPICards({ kpis }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card><CardContent>Total Calls: {kpis.totalCalls}</CardContent></Card>
      <Card><CardContent>Total Cost: ${kpis.totalCost}</CardContent></Card>
      <Card><CardContent>Avg Duration: {kpis.avgDuration}s</CardContent></Card>
      <Card><CardContent>Successful: {kpis.successfulCalls}</CardContent></Card>
      <Card><CardContent>Failed: {kpis.failedCalls}</CardContent></Card>
    </div>
  );
}