import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function DurationChart({ data }) {
  const isMobile = window.innerWidth < 640;
  return (
    <div className="w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[365px] ">
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            interval={0}
            tick={{ fontSize: isMobile ? 12 : 14, }}
            label={{
              value: "Call Type",
              position: "insideBottom",
              offset: -15,
              style: { fontSize: 16, fontWeight: 600 }
            }}
          />

          <YAxis
            tick={{ fontSize: 14 }}
            label={{
              value: "Duration (s)",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 16, fontWeight: 600 },
              dx: 7, 
              dy: 50
            }}
          />

          <Tooltip />

          <Bar
            dataKey="duration"
            fill="#6366f1"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}