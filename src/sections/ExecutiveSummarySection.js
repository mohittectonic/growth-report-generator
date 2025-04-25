import React from "react";
import ReportSection from "../components/ReportSection";
import DataTable from "../components/DataTable";
import InsightsBox from "../components/InsightsBox";
import { executiveSummaryData } from "../data/reportData";
import { executiveSummaryColumns } from "../data/columnDefinitions";
import { executiveInsights } from "../data/insightsData";

const ExecutiveSummarySection = () => {
  return (
    <ReportSection number="1" title="Executive Summary">
      <div className="mb-4">
        <DataTable
          columns={executiveSummaryColumns}
          data={executiveSummaryData}
        />
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
