import React, { useState, useEffect } from "react";
import ReportSection from "../components/ReportSection";
import DataTable from "../components/DataTable";
import InsightsBox from "../components/InsightsBox";
import { executiveSummaryColumns } from "../data/columnDefinitions";
import dataService from "../data/dataService";
import { getGroupedInsightsFromCSV } from "../utils/csvParser";

const ExecutiveSummarySection = () => {
  const [data, setData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const executiveSummaryData =
          await dataService.getExecutiveSummaryData();
        setData(executiveSummaryData);
        const grouped = await getGroupedInsightsFromCSV();
        setInsights(grouped.executive || []);
      } catch (error) {
        console.error("Error loading executive summary data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <ReportSection number="1" title="Executive Summary">
      <div className="mb-4">
        {loading ? (
          <div className="text-center py-4">Loading data...</div>
        ) : (
          <DataTable columns={executiveSummaryColumns} data={data} />
        )}
      </div>
      <InsightsBox title="Key Insights" insights={insights} columns={2} />
    </ReportSection>
  );
};

export default ExecutiveSummarySection;
