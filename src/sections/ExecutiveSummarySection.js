import React, { useState, useEffect } from "react";
import ReportSection from "../components/ReportSection";
import DataTable from "../components/DataTable";
import InsightsBox from "../components/InsightsBox";
import { executiveSummaryColumns } from "../data/columnDefinitions";
import { executiveInsights } from "../data/insightsData";
import dataService from "../data/dataService";

const ExecutiveSummarySection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const executiveSummaryData =
          await dataService.getExecutiveSummaryData();
        setData(executiveSummaryData);
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
      <InsightsBox
        title="Key Insights"
        insights={executiveInsights}
        columns={2}
      />
    </ReportSection>
  );
};

export default ExecutiveSummarySection;
