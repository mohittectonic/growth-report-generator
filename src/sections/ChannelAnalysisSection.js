import React from "react";
import ReportSection from "../components/ReportSection";
import TwoColumnLayout from "../components/TwoColumnLayout";
import DataTable from "../components/DataTable";
import PieChartComponent from "../components/charts/PieChartComponent";
import InsightsBox from "../components/InsightsBox";
import { utmSourceData } from "../data/reportData";
import { channelColumns } from "../data/columnDefinitions";
import { channelInsights } from "../data/insightsData";
import { colors } from "../utils/colors";

const ChannelAnalysisSection = () => {
  // Prepare data for pie chart
  const pieChartData = utmSourceData.map((item) => ({
    name: item.source,
    value: item.share,
  }));

  return (
    <ReportSection number="3" title="Channel Analysis">
      <TwoColumnLayout
        leftTitle="Traffic Distribution by Source"
        leftContent={
          <PieChartComponent
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            colors={colors.chartColors}
          />
        }
        rightTitle="Channel Performance"
        rightContent={
          <DataTable columns={channelColumns} data={utmSourceData} />
        }
      />
      <InsightsBox title="Channel Insights" insights={channelInsights} />
    </ReportSection>
  );
};

export default ChannelAnalysisSection;
