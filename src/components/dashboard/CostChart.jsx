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
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 40, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        {/* City axis */}
        <XAxis
          dataKey="city"
          label={{ value: "City", position: "insideBottom", offset: -10 }}
        />

        {/* Cost axis */}
        <YAxis
          label={{ value: "Total Cost ($)", angle: -90, position: "insideLeft" }}
        />

        <Tooltip />

        <Bar dataKey="totalCost" fill="#22c55e" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}