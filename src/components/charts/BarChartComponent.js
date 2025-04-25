import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({
  data,
  dataKey,
  xAxisKey,
  yAxisKey,
  barColor,
  customTooltip,
  layoutVertical = false,
  formatNumber,
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={data}
      layout={layoutVertical ? "vertical" : "horizontal"}
      margin={{
        top: 5,
        right: 30,
        left: layoutVertical ? 150 : 20,
        bottom: layoutVertical ? 5 : 50,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {layoutVertical ? (
        <>
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey={xAxisKey} type="category" width={150} />
        </>
      ) : (
        <>
          <XAxis dataKey={xAxisKey} angle={-45} textAnchor="end" height={80} />
          <YAxis
            tickFormatter={
              formatNumber ? (value) => formatNumber(value) : undefined
            }
          />
        </>
      )}
      <Tooltip formatter={customTooltip} />
      <Bar
        dataKey={yAxisKey}
        fill={barColor}
        radius={layoutVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
);

export default BarChartComponent;
