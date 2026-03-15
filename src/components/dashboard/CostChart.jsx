import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function CostChart({ data }) {
  // Determine if the device is mobile
  const isMobile = window.innerWidth < 640;

  // Chart height for responsiveness
  const chartHeight = isMobile ? 250 : 350;

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="city"
          label={{
            value: "City",
            position: "insideBottom",
            style: { fontSize: 16, fontWeight: 600 },
            offset: -15 
          }}
          tick={{ fontSize: isMobile ? 11 : 14 }}
        />

        <YAxis
          label={{
            value: "Total Cost ($)",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 16, fontWeight: 600 },
            dx: isMobile ? 0 : 5,
            dy: isMobile ? 30 : 50
          }}
          tick={{ fontSize: isMobile ? 11 : 14  }}
        />

        <Tooltip />
        <Bar
          dataKey="totalCost"
          fill="#22c55e"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}