import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import { fetchCalls } from "@/services/api";
import {
  calculateKPIs,
  getCallsPerHour,
  getCallsByCity,
  getCallDurationStats,
  getCostByCity
} from "@/utils/analytics";

import DurationChart from "@/components/dashboard/DurationChart";
import CostChart from "@/components/dashboard/CostChart";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import CallsByCity from "@/components/dashboard/CallsByCity";
import RecentCallsTable from "@/components/dashboard/RecentCallsTable";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalls()
      .then((data) => setCalls(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
          Loading calls...
        </div>
      </DashboardLayout>
    );
  }

  const kpis = calculateKPIs(calls);
  const durationStats = getCallDurationStats(calls);
  const costData = getCostByCity(calls);
  const timelineData = getCallsPerHour(calls);
  const cityData = getCallsByCity(calls);

  const kpiCards = [
    { label: "Total Calls", value: kpis.totalCalls, color: "bg-indigo-500" },
    { label: "Total Cost ($)", value: `$${kpis.totalCost}`, color: "bg-green-500" },
    { label: "Avg Duration (s)", value: kpis.avgDuration, color: "bg-yellow-500" },
    { label: "Successful Calls", value: kpis.successfulCalls, color: "bg-teal-500" },
    { label: "Failed Calls", value: kpis.failedCalls, color: "bg-red-500" },
  ];

  return (
    <DashboardLayout>
      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {kpiCards.map((kpi, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-center items-center p-6 rounded-xl shadow-xl text-white ${kpi.color} hover:shadow-2xl hover:scale-105 transition-all duration-300`}
          >
            <span className="text-sm uppercase opacity-80">{kpi.label}</span>
            <span className="text-2xl font-bold mt-2">{kpi.value}</span>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="shadow-xl rounded-xl hover:shadow-2xl transition-shadow flex flex-col">
          <CardHeader>
            <CardTitle>Call Duration Analytics</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <DurationChart data={durationStats} />
          </CardContent>
        </Card>

        <Card className="shadow-xl rounded-xl hover:shadow-2xl transition-shadow flex flex-col">
          <CardHeader>
            <CardTitle>Calls by City</CardTitle>
          </CardHeader>
          <CardContent className="flex-1  flex justify-center items-center">
            <CallsByCity data={cityData} />
          </CardContent>
        </Card>
      </section>

        <Card className="shadow-xl rounded-xl hover:shadow-2xl transition-shadow flex flex-col">
          <CardHeader>
            <CardTitle>Call Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 ">
            <ActivityTimeline data={timelineData} />
          </CardContent>
        </Card>

      <section className="grid grid-cols-1 gap-6 mt-6">
        <Card className="shadow-xl rounded-xl hover:shadow-2xl transition-shadow flex flex-col">
          <CardHeader>
            <CardTitle>Call Cost Analytics</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <CostChart data={costData} />
          </CardContent>
        </Card>
      </section>

      {/* Recent Calls Table */}
      <section className="mt-6">
        <Card className="shadow-xl rounded-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle>Recent Call Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentCallsTable calls={calls} />
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}