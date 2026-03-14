import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function Duj({ data }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 40,
          bottom: 40
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        {/* X Axis */}
        <XAxis
          dataKey="name"
          label={{
            value: "Call Type",
            position: "insideBottom",
            offset: -10
          }}
        />

        {/* Y Axis */}
        <YAxis
          type="number"
          label={{
            value: "Duration (seconds)",
            angle: -90,
            position: "insideLeft"
          }}
        />

        <Tooltip />

        <Bar
          dataKey="duration"
          fill="#6366f1"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}