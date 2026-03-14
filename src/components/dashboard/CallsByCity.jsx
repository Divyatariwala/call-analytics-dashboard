import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

// Vibrant colors for slices
const COLORS = ["#6366f1", "#10b981", "#f97316", "#ef4444", "#14b8a6", "#8b5cf6"];

export default function CallsByCity({ data = [] }) {
  if (!data.length) return <p className="text-center">Loading...</p>;

  // Calculate total calls for center label
  const totalCalls = data.reduce((sum, item) => sum + item.calls, 0);

  return (
    <div className="flex justify-center items-center w-full relative">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="calls"
            nameKey="city"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={120}
            paddingAngle={6}
            label={false}             // Remove slice labels for cleaner look
            isAnimationActive={true}  // Smooth render animation
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}      // White separation line between slices
              />
            ))}
          </Pie>

          {/* Tooltip shows city name and calls on hover */}
          <Tooltip
            formatter={(value, name, props) => {
              return [`${value} calls`, props.payload.city];
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Total Calls in center */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none"
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>{totalCalls}</div>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>Total Calls</div>
      </div>
    </div>
  );
}