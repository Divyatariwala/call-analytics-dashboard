import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import KPICards from "@/components/dashboard/KPICards";

import { fetchCalls } from "@/services/api";
import {
  calculateKPIs,
  getCallsPerHour,
  getCallsPerDay,
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

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [timelineType, setTimelineType] = useState("hour");

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

  /* ---------------- FILTER CALLS ---------------- */

  const filteredCalls = calls
    .filter(call =>
      selectedCity === "all" ? true : call.city === selectedCity
    )
    .filter(call =>
      search === ""
        ? true
        : call.city.toLowerCase().includes(search.toLowerCase()) ||
        call.phone?.includes(search)
    );

  /* ---------------- ANALYTICS ---------------- */

  const kpis = calculateKPIs(filteredCalls);
  const durationStats = getCallDurationStats(filteredCalls);
  const costData = getCostByCity(filteredCalls);
  const cityData = getCallsByCity(filteredCalls);
  const timelineHourData = getCallsPerHour(filteredCalls);
  const timelineDayData = getCallsPerDay(filteredCalls);

  const timelineData =
    timelineType === "hour" ? timelineHourData : timelineDayData;

  /* ---------------- EXPORT CSV ---------------- */

  const exportCSV = () => {

    const rows = filteredCalls.map(c =>
  `${c.city},${c.callDuration},${c.callCost},${c.callStatus ? "Successful" : "Failed"}`
);

    const csv = [
      "City,Duration,Cost,Status",
      ...rows
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "calls.csv";
    a.click();
  };

  const cities = [...new Set(calls.map(c => c.city))];

  return (
    <DashboardLayout>

      {/* FILTERS */}
      <section className="flex flex-wrap gap-4 mb-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search city or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2"
        />

        {/* City Filter */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 
            bg-white text-gray-700 shadow-sm
            hover:border-indigo-400 hover:ring-2 hover:ring-indigo-200
            focus:outline-none focus:ring-2 focus:ring-indigo-400
            transition-all duration-200 cursor-pointer"
        >
          <option value="all">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        {/* Export CSV */}
        <button
          onClick={exportCSV}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg
  shadow-md
  hover:bg-indigo-700 hover:shadow-lg hover:scale-105
  active:scale-95
  transition-all duration-200"
        >
          Export CSV
        </button>

      </section>


      {/* KPI CARDS */}
      <section>
        <KPICards kpis={kpis} />
      </section>


      {/* CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
          <div className="h-[260px] sm:h-[300px] md:h-[340px]">
            <DurationChart data={durationStats} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
          <div className="sm:h-[300px] md:h-[340px]">
            <CallsByCity data={cityData} />
          </div>
        </div>

      </section>


      {/* TIMELINE */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">

        {/* Toggle Buttons */}
        <div className="flex gap-3 mb-4">

          <button
            onClick={() => setTimelineType("hour")}
            className={`px-4 py-1 rounded border transition-all duration-200
      ${timelineType === "hour"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-400"
              }`}
          >
            Hour
          </button>

          <button
            onClick={() => setTimelineType("day")}
            className={`px-4 py-1 rounded border transition-all duration-200
      ${timelineType === "day"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-400"
              }`}
          >
            Day
          </button>

        </div>

        <div className="sm:h-[320px] md:h-[360px]">
          <ActivityTimeline data={timelineData} type={timelineType} />
        </div>

      </section>


      {/* COST CHART */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6">
        <div className="sm:h-[320px] md:h-[360px]">
          <CostChart data={costData} />
        </div>
      </section>


      {/* TABLE */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
        <RecentCallsTable calls={filteredCalls} />
      </section>

    </DashboardLayout>
  );
}