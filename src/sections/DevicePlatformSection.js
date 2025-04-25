import React, { useState, useEffect } from "react";
import ReportSection from "../components/ReportSection";
import TwoColumnLayout from "../components/TwoColumnLayout";
import PieChartComponent from "../components/charts/PieChartComponent";
import BarChartComponent from "../components/charts/BarChartComponent";
import InsightsBox from "../components/InsightsBox";
import { colors } from "../utils/colors";
import dataService from "../data/dataService";
import { getGroupedInsightsFromCSV } from "../utils/csvParser";

const DevicePlatformSection = () => {
  const [platformData, setPlatformData] = useState([]);
  const [deviceChartData, setDeviceChartData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load device data from os_funnel.csv
        const osData = await dataService.getDeviceData();
        // Filter to include only top devices and set up chart data
        const topDevices = osData
          .filter((item) => item.share >= 1)
          .map((item) => ({
            name: item.device,
            value: item.share,
          }));
        setDeviceChartData(topDevices);
        // Load platform data from event_source.csv
        const eventSourceData = await dataService.getPlatformData();
        setPlatformData(eventSourceData);
        const grouped = await getGroupedInsightsFromCSV();
        setInsights(grouped.device || []);
      } catch (error) {
        console.error("Error loading device/platform data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <ReportSection number="5" title="Device & Platform Analysis">
      {loading ? (
        <div className="text-center py-4">Loading data...</div>
      ) : (
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
              data={platformData}
              xAxisKey="platform"
              yAxisKey="conversion"
              barColor={colors.secondary}
              customTooltip={(value) => [`${value.toFixed(2)}%`, "Conversion"]}
            />
          }
        />
      )}
      <InsightsBox title="Device & Platform Insights" insights={insights} />
    </ReportSection>
  );
};

export default DevicePlatformSection;
