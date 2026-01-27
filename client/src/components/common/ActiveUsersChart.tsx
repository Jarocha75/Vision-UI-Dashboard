import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { uv: 500 },
  { uv: 400 },
  { uv: 300 },
  { uv: 200 },
  { uv: 189 },
  { uv: 239 },
];

const margin = {
  top: 10,
  right: 0,
  left: 0,
  bottom: 10,
};

const ActiveUsersChart = () => {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={data} margin={margin}>
        <XAxis
          dataKey="uv"
          hide={true}
          tick={{ fill: "#A0AEC0", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="number"
          dataKey="uv"
          domain={[0, 500]}
          width={40}
          tick={{ fill: "#ffffff", fontSize: 12, fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#1A2035",
          }}
          wrapperStyle={{ outline: "none" }}
          labelStyle={{ color: "#A0AEC0" }}
          itemStyle={{ color: "white" }}
          cursor={false}
        />

        <Bar dataKey="uv" fill="#ffffff" barSize={15} activeBar={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActiveUsersChart;
