import React from "react";
import ReportSection from "../components/ReportSection";
import TwoColumnLayout from "../components/TwoColumnLayout";
import DataTable from "../components/DataTable";
import PieChartComponent from "../components/charts/PieChartComponent";
import InsightsBox from "../components/InsightsBox";
import { categoryData } from "../data/reportData";
import { categoryColumns } from "../data/columnDefinitions";
import { categoryInsights } from "../data/insightsData";
import { colors } from "../utils/colors";

const ProductCategorySection = () => {
  // Prepare data for pie chart
  const pieChartData = categoryData.map((item) => ({
    name: item.category,
    value: item.share,
  }));

  return (
    <ReportSection number="4" title="Product Category Performance">
      <TwoColumnLayout
        leftTitle="Revenue Share by Category"
        leftContent={
          <PieChartComponent
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            colors={colors.chartColors}
          />
        }
        rightTitle="Category Trends"
        rightContent={
          <DataTable columns={categoryColumns} data={categoryData} />
        }
      />
      <InsightsBox title="Category Insights" insights={categoryInsights} />
    </ReportSection>
  );
};

export default ProductCategorySection;
