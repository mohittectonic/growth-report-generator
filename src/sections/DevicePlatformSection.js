import React, { useState, useEffect } from "react";
import ReportSection from "../components/ReportSection";
import TwoColumnLayout from "../components/TwoColumnLayout";
import PieChartComponent from "../components/charts/PieChartComponent";
import ComparisonBarChart from "../components/charts/ComparisonBarChart";
import InsightsBox from "../components/InsightsBox";
import { colors } from "../utils/colors";
import { formatNumber } from "../utils/formatters";
import dataService from "../data/dataService";
import { getGroupedInsightsFromCSV } from "../utils/csvParser";

const DevicePlatformSection = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const device = await dataService.getDeviceData();
        setDeviceData(device);
        const platform = await dataService.getPlatformData();
        setPlatformData(platform);
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
    <ReportSection number="5" title="Device & Platform Insights">
      {loading ? (
        <div className="text-center py-4">Loading data...</div>
      ) : (
        <>
          <TwoColumnLayout
            leftTitle="Device Distribution"
            leftContent={
              <PieChartComponent
                data={deviceData}
                dataKey="share"
                nameKey="device"
                colors={colors.chartColors}
                formatNumber={formatNumber}
              />
            }
            rightTitle="Platform Comparison"
            rightContent={
              <ComparisonBarChart
                data={platformData}
                xAxisKey="platform"
                colors={[colors.primary, colors.secondary]}
                bars={[
                  { id: "left", orientation: "left", dataKey: "conversion", name: "Conversion Rate (%)" },
                  { id: "right", orientation: "right", dataKey: "rps", name: "Revenue per Session (₹)" }
                ]}
              />
            }
          />
          <div className="mt-4">
            <InsightsBox title="Device & Platform Insights" insights={insights} />
          </div>
        </>
      )}
    </ReportSection>
  );
};

export default DevicePlatformSection;
