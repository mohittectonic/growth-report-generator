import React from "react";
import ReportSection from "../components/ReportSection";
import TwoColumnLayout from "../components/TwoColumnLayout";
import PieChartComponent from "../components/charts/PieChartComponent";
import BarChartComponent from "../components/charts/BarChartComponent";
import InsightsBox from "../components/InsightsBox";
import { deviceData, platformData } from "../data/reportData";
import { deviceInsights } from "../data/insightsData";
import { colors } from "../utils/colors";

const DevicePlatformSection = () => {
  // Prepare data for device chart
  const deviceChartData = deviceData.map((item) => ({
    name: item.device,
    value: item.share,
  }));

  // Prepare data for platform comparison
  const platformChartData = platformData.map((item) => ({
    platform: item.platform,
    conversion: item.conversion,
    rps: item.rps,
  }));

  return (
    <ReportSection number="5" title="Device & Platform Analysis">
      <TwoColumnLayout
        leftTitle="Sessions by Device Type"
        leftContent={
          <PieChartComponent
            data={deviceChartData}
            dataKey="value"
            nameKey="name"
            colors={colors.chartColors}
          />
        }
        rightTitle="Platform Performance"
        rightContent={
          <BarChartComponent
            data={platformChartData}
            xAxisKey="platform"
            yAxisKey="conversion"
            barColor={colors.secondary}
            customTooltip={(value) => [`${value.toFixed(2)}%`, "Conversion"]}
          />
        }
      />
      <InsightsBox
        title="Device & Platform Insights"
        insights={deviceInsights}
      />
    </ReportSection>
  );
};

export default DevicePlatformSection;
