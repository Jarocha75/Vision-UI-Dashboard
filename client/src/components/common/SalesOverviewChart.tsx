import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 300 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 350 },
  { name: "Apr", value: 290 },
  { name: "May", value: 420 },
  { name: "Jun", value: 510 },
  { name: "Jul", value: 430 },
  { name: "Aug", value: 380 },
  { name: "Sep", value: 470 },
  { name: "Oct", value: 410 },
  { name: "Nov", value: 390 },
  { name: "Dec", value: 530 },
];

const SalesOverviewChart = () => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
      >
        <defs>
          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3A7BFF" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#00E1FF" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="value"
          stroke="#3A7BFF"
          strokeWidth={3}
          fill="url(#salesGradient)"
        />

        <XAxis
          dataKey="name"
          tick={{ fill: "#A0AEC0", fontSize: 12 }}
          axisLine={true}
          tickLine={true}
        />

        <YAxis
          tick={{ fill: "#A0AEC0", fontSize: 12 }}
          axisLine={true}
          tickLine={true}
          width={45}
          domain={["dataMin - 20", "dataMax + 20"]}
        />

        <Tooltip
          contentStyle={{
            background: "#1A2035",
            borderRadius: 10,
            border: "none",
          }}
          labelStyle={{ color: "#A0AEC0" }}
          itemStyle={{ color: "white" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesOverviewChart;
