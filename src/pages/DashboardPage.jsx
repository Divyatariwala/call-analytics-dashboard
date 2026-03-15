import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICards from "@/components/dashboard/KPICards";

import { fetchCalls } from "@/services/api";
import {
  calculateKPIs,
  getCallsPerHour,
  getCallDurationStats,
  getCostByCity,
  getCallsByCity
} from "@/utils/analytics";

import DurationChart from "@/components/dashboard/DurationChart";
import CostChart from "@/components/dashboard/CostChart";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import CallsByCity from "@/components/dashboard/CallsByCity";
import RecentCallsTable from "@/components/dashboard/RecentCallsTable";

export default function DashboardPage() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalls()
      .then((data) => setCalls(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
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

  return (
    <DashboardLayout>

      {/* KPI Cards */}
      <section>
        <KPICards kpis={kpis} />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
          <div className="h-[260px] sm:h-[300px] md:h-[340px]">
            <DurationChart data={durationStats} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
          <div className=" sm:h-[300px] md:h-[340px]">
            <CallsByCity data={cityData} />
          </div>
        </div>

      </section>

      {/* Timeline */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
        <div className="sm:h-[320px] md:h-[360px]">
          <ActivityTimeline data={timelineData} />
        </div>
      </section>

      {/* Cost Chart */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
        <div className=" sm:h-[320px] md:h-[360px]">
          <CostChart data={costData} />
        </div>
      </section>

      {/* Table */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
        <RecentCallsTable calls={calls} />
      </section>

    </DashboardLayout>
  );
}