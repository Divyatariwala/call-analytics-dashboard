import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function ActivityTimeline({ data = [], type = "hour" }) {
  if (!data.length) return <p>Loading...</p>;

  const xKey = type === "day" ? "day" : "hour";

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey={xKey}
          label={{
            value: type === "day" ? "Day" : "Hour",
            position: "insideBottom",
            offset: -10
          }}
        />

        <YAxis
          label={{
            value: "Number of Calls",
            angle: -90,
            position: "insideLeft"
          }}
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="calls"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}