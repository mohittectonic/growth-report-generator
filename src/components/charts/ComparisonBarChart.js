import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ComparisonBarChart = ({ data, xAxisKey, colors, bars }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisKey} />
      {bars.map((bar, index) => (
        <YAxis
          key={index}
          yAxisId={bar.id}
          orientation={bar.orientation}
          stroke={colors[index]}
        />
      ))}
      <Tooltip />
      <Legend />
      {bars.map((bar, index) => (
        <Bar
          key={index}
          yAxisId={bar.id}
          dataKey={bar.dataKey}
          name={bar.name}
          fill={colors[index]}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

export default ComparisonBarChart;
