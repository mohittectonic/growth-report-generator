import React from "react";
import ReportHeader from "./components/ReportHeader";
import ExecutiveSummarySection from "./sections/ExecutiveSummarySection";
import ConversionFunnelSection from "./sections/ConversionFunnelSection";
import ChannelAnalysisSection from "./sections/ChannelAnalysisSection";
import ProductCategorySection from "./sections/ProductCategorySection";
import DevicePlatformSection from "./sections/DevicePlatformSection";
import RecommendationsSection from "./sections/RecommendationsSection";

const VaareeGrowthReport = () => {
  // Calculate report dates - assuming the report covers the previous week
  const generateReportDates = () => {
    const currentDate = new Date();

    // Generate report date (today's date)
    const reportDate = new Date(currentDate);

    // Calculate end of previous week (Sunday of current week)
    const endDate = new Date(currentDate);
    const dayOfWeek = endDate.getDay(); // 0 is Sunday
    endDate.setDate(endDate.getDate() - dayOfWeek);

    // Calculate start of previous week (Monday of previous week)
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);

    // Format dates as strings
    const formatDate = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date);
    };

    return {
      reportDateStr: formatDate(reportDate),
      dateRangeStr: `${formatDate(startDate)} - ${formatDate(endDate)}`,
    };
  };

  // Get formatted dates
  const { reportDateStr, dateRangeStr } = generateReportDates();

  // Function to handle PDF download
  const handleDownloadPdf = () => {
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ReportHeader
        title="Vaaree Growth Report"
        subtitle={dateRangeStr}
        handleDownloadPdf={handleDownloadPdf}
      />

      {/* Report sections */}
      <ExecutiveSummarySection />
      <ConversionFunnelSection />
      <ChannelAnalysisSection />
      <ProductCategorySection />
      <DevicePlatformSection />
      <RecommendationsSection />

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Generated on {reportDateStr} by Analytics Team</p>
      </div>
    </div>
  );
};

export default VaareeGrowthReport;
