import React from "react";

// Insights Box Component
const InsightsBox = ({ title, insights, columns = 1 }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
    <div
      className={`grid grid-cols-1 ${
        columns > 1 ? `md:grid-cols-${columns}` : ""
      } gap-4`}
    >
      {Array.isArray(insights[0]) ? (
        insights.map((insightGroup, groupIndex) => (
          <div key={groupIndex}>
            <ul className="space-y-2">
              {insightGroup.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span
                    className={`${
                      insight.positive ? "text-green-500" : "text-red-500"
                    } mr-2`}
                  >
                    {insight.positive ? "▲" : "▼"}
                  </span>
                  <span>{insight.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <span
                className={`${
                  insight.positive ? "text-green-500" : "text-red-500"
                } mr-2`}
              >
                {insight.positive ? "▲" : "▼"}
              </span>
              <span>{insight.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default InsightsBox;
