import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ActivityTimeline({ data = [], type = "hour" }) {
  if (!data.length) return <p className="text-center">Loading...</p>;

  const xKey = type === "day" ? "day" : "hour";

  return (
    <div className="w-full h-[250px] sm:h-[320px] md:h-[350px] ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 50, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            label={{ value: type === "day" ? "Day" : "Hour", 
              position: "insideBottom", 
              offset: -0, 
              style: { fontSize: 16, fontWeight: 600}, offset: -15 }}
              tick={{ fontSize: 14 }}
          />
          <YAxis
            label={{ value: "Number of Calls", angle: -90, position: "insideLeft", style: { fontSize: 16, fontWeight: 600}, dx: 10, 
            dy: 50 }}
            tick={{ fontSize: 14 }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="calls" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}