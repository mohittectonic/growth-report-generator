import React from "react";
import ReportHeader from "./components/ReportHeader";
import ExecutiveSummarySection from "./sections/ExecutiveSummarySection";
import ConversionFunnelSection from "./sections/ConversionFunnelSection";
import ChannelAnalysisSection from "./sections/ChannelAnalysisSection";
import ProductCategorySection from "./sections/ProductCategorySection";
import DevicePlatformSection from "./sections/DevicePlatformSection";
import RecommendationsSection from "./sections/RecommendationsSection";

const VaareeGrowthReport = () => {
  // Function to handle PDF download
  const handleDownloadPdf = () => {
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ReportHeader
        title="Vaaree Growth Report"
        subtitle="April 17 - April 23, 2023"
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
        <p>Generated on April 24, 2023 by Analytics Team</p>
      </div>
    </div>
  );
};

export default VaareeGrowthReport;
