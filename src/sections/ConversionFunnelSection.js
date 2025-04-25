import React from "react";
import ReportSection from "../components/ReportSection";
import BarChartComponent from "../components/charts/BarChartComponent";
import InsightsBox from "../components/InsightsBox";
import { conversionFunnelData } from "../data/reportData";
import { funnelInsights } from "../data/insightsData";
import { colors } from "../utils/colors";

const ConversionFunnelSection = () => {
  return (
    <ReportSection number="2" title="Conversion Funnel">
      <div className="mb-4 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Funnel Stage Performance</h3>
        <BarChartComponent
          data={conversionFunnelData}
          xAxisKey="stage"
          yAxisKey="value"
          barColor={colors.primary}
          layoutVertical={true}
          customTooltip={(value) => [`${value.toFixed(2)}%`, "Conversion"]}
        />
      </div>
      <InsightsBox title="Conversion Insights" insights={funnelInsights} />
    </ReportSection>
  );
};

export default ConversionFunnelSection;
