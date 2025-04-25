import React, { useState, useEffect } from "react";
import ReportSection from "../components/ReportSection";
import AmplitudeFunnelChart from "../components/charts/AmplitudeFunnelChart";
import InsightsBox from "../components/InsightsBox";
import { colors } from "../utils/colors";
import dataService from "../data/dataService";
import { getGroupedInsightsFromCSV } from "../utils/csvParser";

const ConversionFunnelSection = () => {
  const [data, setData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const conversionData = await dataService.getConversionFunnelData();
        setData(conversionData);
        const grouped = await getGroupedInsightsFromCSV();
        setInsights(grouped.funnel || []);
      } catch (error) {
        console.error("Error loading conversion funnel data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ReportSection number="2" title="Conversion Funnel">
      <div className="mb-4 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Funnel Stage Performance</h3>
        {loading ? (
          <div className="text-center py-4">Loading data...</div>
        ) : (
          <AmplitudeFunnelChart data={data} />
        )}
      </div>
      <InsightsBox title="Conversion Insights" insights={insights} />
    </ReportSection>
  );
};

export default ConversionFunnelSection;
