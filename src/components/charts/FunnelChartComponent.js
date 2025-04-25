import React from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Cell,
  LabelList,
  Tooltip,
} from "recharts";

// Enhanced Funnel Chart with colored segments and internal labels
const FunnelChartComponent = ({ data, nameKey, valueKey, colors }) => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <FunnelChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <Tooltip
            formatter={(value) => [`${value.toFixed(2)}%`, "Conversion"]}
          />
          <Funnel dataKey={valueKey} data={data} isAnimationActive>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            {/* Stage names on right side */}
            <LabelList
              position="right"
              dataKey={nameKey}
              style={{ fill: "#333", fontSize: 14, fontWeight: 500 }}
            />
            {/* Percentage values inside segments */}
            <LabelList
              position="inside"
              dataKey={valueKey}
              formatter={(val) => `${val.toFixed(2)}%`}
              style={{ fill: "#fff", fontSize: 12 }}
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelChartComponent;
