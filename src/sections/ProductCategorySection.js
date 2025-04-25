import React, { useState, useEffect } from "react";
import ReportSection from "../components/ReportSection";
import TwoColumnLayout from "../components/TwoColumnLayout";
import DataTable from "../components/DataTable";
import PieChartComponent from "../components/charts/PieChartComponent";
import InsightsBox from "../components/InsightsBox";
import { categoryColumns } from "../data/columnDefinitions";
import { categoryInsights } from "../data/insightsData";
import { colors } from "../utils/colors";
import dataService from "../data/dataService";

const ProductCategorySection = () => {
  const [data, setData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryData = await dataService.getCategoryData();
        setData(categoryData);

        // Prepare data for pie chart
        setPieChartData(
          categoryData.map((item) => ({
            name: item.category,
            value: item.share,
          }))
        );
      } catch (error) {
        console.error("Error loading product category data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ReportSection number="4" title="Product Category Performance">
      {loading ? (
        <div className="text-center py-4">Loading data...</div>
      ) : (
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
          rightContent={<DataTable columns={categoryColumns} data={data} />}
        />
      )}
      <InsightsBox title="Category Insights" insights={categoryInsights} />
    </ReportSection>
  );
};

export default ProductCategorySection;
