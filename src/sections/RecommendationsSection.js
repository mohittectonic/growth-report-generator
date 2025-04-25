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
        // Add an id for each recommendation (1-based)
        const recs = (grouped.recommendation || []).map((rec, idx) => ({
          ...rec,
          id: idx + 1,
        }));
        setRecommendations(recs);
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
      <div className="bg-white p-4 rounded-lg shadow">
        {loading ? (
          <div className="text-center py-4">Loading recommendations...</div>
        ) : (
          <ul className="space-y-3">
            {recommendations.map((rec) => (
              <li key={rec.id} className="flex items-start">
                <span className="bg-indigo-100 text-indigo-800 w-6 h-6 rounded-full inline-flex items-center justify-center flex-shrink-0 mr-2">
                  {rec.id}
                </span>
                <span>{rec.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ReportSection>
  );
};

export default RecommendationsSection;
