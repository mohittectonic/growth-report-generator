import React, { useState, useEffect } from "react";
import ReportSection from "../components/ReportSection";
import TwoColumnLayout from "../components/TwoColumnLayout";
import DataTable from "../components/DataTable";
import PieChartComponent from "../components/charts/PieChartComponent";
import InsightsBox from "../components/InsightsBox";
import { channelColumns } from "../data/columnDefinitions";
import { channelInsights } from "../data/insightsData";
import { colors } from "../utils/colors";
import dataService from "../data/dataService";

const ChannelAnalysisSection = () => {
  const [data, setData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const utmSourceData = await dataService.getUtmSourceData();
        setData(utmSourceData);

        // Prepare data for pie chart
        setPieChartData(
          utmSourceData.map((item) => ({
            name: item.source,
            value: item.share,
          }))
        );
      } catch (error) {
        console.error("Error loading channel analysis data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ReportSection number="3" title="Channel Analysis">
      {loading ? (
        <div className="text-center py-4">Loading data...</div>
      ) : (
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
          rightContent={<DataTable columns={channelColumns} data={data} />}
        />
      )}
      <InsightsBox title="Channel Insights" insights={channelInsights} />
    </ReportSection>
  );
};

export default ChannelAnalysisSection;
