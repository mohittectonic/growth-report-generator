import React, { useEffect, useState } from "react";
import ReportSection from "../components/ReportSection";
import { getGroupedInsightsFromCSV } from "../utils/csvParser";

const RecommendationsSection = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const grouped = await getGroupedInsightsFromCSV();
        setRecommendations(grouped.recommendation || []);
      } catch (error) {
        console.error("Error loading recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <ReportSection number="6" title="Recommendations">
      {loading ? (
        <div className="text-center py-4">Loading recommendations...</div>
      ) : (
        <ul className="list-disc pl-6 space-y-2">
          {recommendations.map((rec, idx) => (
            <li
              key={idx}
              className={
                rec.positive === false ? "text-red-600" : "text-green-700"
              }
            >
              {rec.text}
            </li>
          ))}
        </ul>
      )}
    </ReportSection>
  );
};

export default RecommendationsSection;
