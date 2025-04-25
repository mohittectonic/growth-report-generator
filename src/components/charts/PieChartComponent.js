import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartComponent = ({
  data,
  dataKey,
  nameKey,
  colors,
  formatNumber,
}) => (
  <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey={dataKey}
        nameKey={nameKey}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, "Share"]} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default PieChartComponent;
