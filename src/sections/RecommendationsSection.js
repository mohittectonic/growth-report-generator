import React from "react";
import ReportSection from "../components/ReportSection";
import { recommendations } from "../data/insightsData";

const RecommendationsSection = () => {
  return (
    <ReportSection number="6" title="Recommendations">
      <div className="bg-white p-6 rounded-lg shadow">
        <ul className="space-y-4">
          {recommendations.map((recommendation) => (
            <li key={recommendation.id} className="flex">
              <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full mr-3 flex-shrink-0">
                {recommendation.id}
              </span>
              <div>{recommendation.text}</div>
            </li>
          ))}
        </ul>
      </div>
    </ReportSection>
  );
};

export default RecommendationsSection;
